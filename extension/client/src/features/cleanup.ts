import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import { t } from "../i18n";

/**
 * Parses a DECL line to extract variable names.
 * Example: "DECL INT a, b[5], c" -> ["a", "b", "c"]
 */
function extractVariableNames(declLine: string): string[] {
  const parts = declLine.split(";"); // Remove comments after semicolon unless inside FOLD metadata
  let content = parts[0].trim();

  // Remove keywords
  content = content.replace(
    /^(GLOBAL\s+)?(CONST\s+)?(DECL\s+)?(GLOBAL\s+)?(CONST\s+)?/i,
    "",
  );

  const spaceMatch = content.match(/\s+/);
  if (!spaceMatch || spaceMatch.index === undefined) return [];

  const varListStr = content
    .substring(spaceMatch.index + spaceMatch[0].length)
    .trim();

  const variables: string[] = [];
  let current = "";
  let bracketDepth = 0;

  for (let i = 0; i < varListStr.length; i++) {
    const char = varListStr[i];
    if (char === "[") bracketDepth++;
    if (char === "]") bracketDepth--;
    if (char === "," && bracketDepth === 0) {
      variables.push(cleanVarName(current));
      current = "";
    } else {
      current += char;
    }
  }
  if (current) variables.push(cleanVarName(current));

  return variables.filter((v) => !!v);
}

function cleanVarName(raw: string): string {
  let name = raw.trim();
  // Remove array dim: a[5] -> a
  name = name.replace(/\[.*?\]/g, "");
  // Remove initialization: a = 5 -> a
  name = name.split("=")[0].trim();
  return name;
}

export async function cleanupUnusedVariables() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    return;
  }

  const doc = editor.document;
  const ext = path.extname(doc.fileName).toLowerCase();

  const isKrlFile = [".src", ".dat", ".sub", ".krl", ".up"].includes(ext);
  if (!isKrlFile) {
    vscode.window.showWarningMessage(t("warning.noActiveKrlFile"));
    return;
  }

  let srcPath = doc.fileName;
  let datPath = doc.fileName;

  if (ext === ".src" || ext === ".sub" || ext === ".krl" || ext === ".up") {
    const candidateDat = doc.fileName.replace(/\.[^.]+$/i, ".dat");
    if (fs.existsSync(candidateDat)) {
      datPath = candidateDat;
    }
  } else if (ext === ".dat") {
    const candidateSrc = doc.fileName.replace(/\.dat$/i, ".src");
    if (fs.existsSync(candidateSrc)) {
      srcPath = candidateSrc;
    }
  }

  const datDoc = await vscode.workspace.openTextDocument(datPath);
  const srcDoc = await vscode.workspace.openTextDocument(srcPath);

  const datText = datDoc.getText();
  const rawSrcText = srcDoc.getText();

  // IMPORTANT FIX: Keep KUKA Inline Forms (;FOLD / ;ENDFOLD) intact in srcText
  // Only strip plain non-FOLD comments to prevent false positive deletions of motion points like P1, P2
  const srcLines = rawSrcText.split(/\r?\n/);
  const cleanSrcText = srcLines
    .map((l) => {
      const trimmed = l.trim();
      if (
        trimmed.toUpperCase().startsWith(";FOLD") ||
        trimmed.toUpperCase().startsWith(";ENDFOLD")
      ) {
        return l; // Preserve Inline Form metadata containing point names!
      }
      return l.split(";")[0]; // Strip regular user comments
    })
    .join("\n");

  const lines = datText.split(/\r?\n/);
  const unusedDecls: {
    lineIndex: number;
    foldStartIndex?: number;
    foldEndIndex?: number;
    varNames: string[];
  }[] = [];

  // 1. Find all declarations in DAT
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimLine = line.trim();

    // Skip plain comments that are not FOLD lines
    if (trimLine.startsWith(";") && !trimLine.toUpperCase().startsWith(";FOLD"))
      continue;

    // Skip GLOBAL declarations - unsafe to remove as they might be used in external modules
    if (/\bGLOBAL\b/i.test(trimLine)) continue;

    // Check if it is a DECL
    if (
      !/\b(DECL|INT|REAL|BOOL|CHAR|FRAME|POS|E6POS|E6AXIS|AXIS|LOAD|SIGNAL|STRING|STRUC|ENUM)\b/i.test(
        trimLine,
      )
    ) {
      continue;
    }

    // Exclude WorkVisual metadata headers like &ACCESS, &REL, &PARAM
    if (trimLine.startsWith("&")) continue;

    const vars = extractVariableNames(trimLine);
    if (vars.length === 0) continue;

    let isUsed = false;

    for (const v of vars) {
      const escapedV = v.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`\\b${escapedV}\\b`, "i");

      // Check usage in SRC (including Inline Form FOLD headers!)
      if (regex.test(cleanSrcText)) {
        isUsed = true;
        break;
      }

      // Check usage in DAT outside current line
      const datWithoutLine = lines.filter((_, idx) => idx !== i).join("\n");
      if (regex.test(datWithoutLine)) {
        isUsed = true;
        break;
      }
    }

    if (!isUsed) {
      // Detect if this line is wrapped inside a KUKA ;FOLD / ;ENDFOLD block in .dat
      let foldStart: number | undefined = undefined;
      let foldEnd: number | undefined = undefined;

      if (i > 0 && lines[i - 1].trim().toUpperCase().startsWith(";FOLD")) {
        foldStart = i - 1;
      }
      if (
        i < lines.length - 1 &&
        lines[i + 1].trim().toUpperCase().startsWith(";ENDFOLD")
      ) {
        foldEnd = i + 1;
      }

      unusedDecls.push({
        lineIndex: i,
        foldStartIndex: foldStart,
        foldEndIndex: foldEnd,
        varNames: vars,
      });
    }
  }

  if (unusedDecls.length === 0) {
    vscode.window.showInformationMessage(t("cleanup.notify.allUsed"));
    return;
  }

  // 2. Interactive Selection Preview
  const items: vscode.QuickPickItem[] = unusedDecls.map((decl) => {
    const lineContent = lines[decl.lineIndex].trim();
    const hasFold =
      decl.foldStartIndex !== undefined && decl.foldEndIndex !== undefined;
    return {
      label: decl.varNames.join(", "),
      description: `${t("io.line", decl.lineIndex + 1)}: ${lineContent}`,
      detail: hasFold
        ? t("cleanup.picker.foldDetail")
        : t("cleanup.picker.varDetail"),
      picked: true,
    };
  });

  const selectedItems = await vscode.window.showQuickPick(items, {
    placeHolder: t("cleanup.picker.selectPlaceholder", unusedDecls.length),
    canPickMany: true,
  });

  if (!selectedItems || selectedItems.length === 0) {
    return;
  }

  const selectedIndices = new Set<number>();
  selectedItems.forEach((item) => {
    const idx = items.indexOf(item);
    if (idx !== -1) selectedIndices.add(idx);
  });

  const finalDecls = unusedDecls.filter((_, idx) => selectedIndices.has(idx));

  // 3. Choice of Action: Delete or Comment Out
  const delLabel = t("cleanup.action.deleteLabel");
  const action = await vscode.window.showQuickPick(
    [
      {
        label: delLabel,
        description: t("cleanup.action.deleteDesc"),
      },
      {
        label: t("cleanup.action.commentLabel"),
        description: t("cleanup.action.commentDesc"),
      },
    ],
    { placeHolder: t("cleanup.action.placeholder") },
  );

  if (!action) return;

  const isDelete = action.label === delLabel;
  const edit = new vscode.WorkspaceEdit();

  for (const decl of finalDecls) {
    let startLine = decl.lineIndex;
    let endLine = decl.lineIndex;

    // If wrapped in FOLD/ENDFOLD, expand range to include FOLD envelope
    if (decl.foldStartIndex !== undefined && decl.foldEndIndex !== undefined) {
      startLine = decl.foldStartIndex;
      endLine = decl.foldEndIndex;
    }

    for (let l = startLine; l <= endLine; l++) {
      const lineObj = datDoc.lineAt(l);
      if (isDelete) {
        edit.delete(datDoc.uri, lineObj.rangeIncludingLineBreak);
      } else {
        if (!lineObj.text.trim().startsWith(";")) {
          edit.replace(datDoc.uri, lineObj.range, `; ${lineObj.text}`);
        }
      }
    }
  }

  await vscode.workspace.applyEdit(edit);
  const actionWord = isDelete
    ? t("cleanup.word.deleted")
    : t("cleanup.word.commented");
  vscode.window.showInformationMessage(
    t("cleanup.notify.success", actionWord, finalDecls.length),
  );
}
