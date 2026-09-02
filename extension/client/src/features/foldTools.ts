import * as vscode from "vscode";
import { t } from "../i18n";

/**
 * Modern KRL & iiQKA Fold Suite for KUKA KRL Professional.
 * Supports KSS 8.3–8.7, KRC4/KRC5 and iiQKA KUKA OS 2.x standards.
 */

export interface MotionParseResult {
  motionType: "PTP" | "LIN" | "CIRC" | "SPTP" | "SLIN" | "SCIRC";
  pointName: string;
  isApprox: boolean;
  approxType?: string;
  velocityStr?: string;
  toolIndex: number;
  baseIndex: number;
  rawLine: string;
}

/**
 * Parses a single KRL motion line into structured components.
 */
export function parseMotionLine(line: string): MotionParseResult | null {
  const cleanLine = line.split(";")[0].trim();
  if (!cleanLine) return null;

  // Regex matching standard and spline motion commands
  const motionRegex =
    /^(PTP|LIN|CIRC|SPTP|SLIN|SCIRC)\s+([A-Za-z0-9_#]+)(?:\s*,\s*([A-Za-z0-9_#]+))?(.*)$/i;
  const match = cleanLine.match(motionRegex);
  if (!match) return null;

  const motionType = match[1].toUpperCase() as MotionParseResult["motionType"];
  const pointName = match[2];
  const rest = match[4] || "";

  const isApprox = /\b(CONT|C_DIS|C_PTP|C_ORI|C_VEL)\b/i.test(rest);
  const approxMatch = rest.match(/\b(CONT|C_DIS|C_PTP|C_ORI|C_VEL)\b/i);
  const approxType = approxMatch ? approxMatch[1].toUpperCase() : undefined;

  let toolIndex = 1;
  let baseIndex = 1;

  const toolMatch =
    rest.match(/Tool\[(\d+)\]/i) || rest.match(/TOOL_DATA\[(\d+)\]/i);
  if (toolMatch) toolIndex = parseInt(toolMatch[1], 10);

  const baseMatch =
    rest.match(/Base\[(\d+)\]/i) || rest.match(/BASE_DATA\[(\d+)\]/i);
  if (baseMatch) baseIndex = parseInt(baseMatch[1], 10);

  const velMatch = rest.match(/Vel\s*=\s*([0-9.]+)\s*(%|m\/s)/i);
  const velocityStr = velMatch ? `${velMatch[1]} ${velMatch[2]}` : undefined;

  return {
    motionType,
    pointName,
    isApprox,
    approxType,
    velocityStr,
    toolIndex,
    baseIndex,
    rawLine: cleanLine,
  };
}

/**
 * Searches companion DAT or active SRC for the nearest active Tool and Base index.
 */
function detectActiveToolAndBase(
  document: vscode.TextDocument,
  currentLine: number,
): { tool: number; base: number } {
  let tool = 1;
  let base = 1;

  for (let i = currentLine; i >= 0; i--) {
    const text = document.lineAt(i).text.split(";")[0];
    const toolMatch = text.match(
      /\$(?:ACT_)?TOOL\s*=\s*(?:TOOL_DATA\[(\d+)\]|(\d+))/i,
    );
    if (toolMatch && !tool) {
      tool = parseInt(toolMatch[1] || toolMatch[2], 10) || 1;
    }
    const baseMatch = text.match(
      /\$(?:ACT_)?BASE\s*=\s*(?:BASE_DATA\[(\d+)\]|(\d+))/i,
    );
    if (baseMatch && !base) {
      base = parseInt(baseMatch[1] || baseMatch[2], 10) || 1;
    }
    if (tool !== 1 && base !== 1) break;
  }

  return { tool: tool || 1, base: base || 1 };
}

/**
 * Command: Convert selection to standard iiQKA Motion Fold
 */
export async function convertToIiqkaFold(): Promise<void> {
  const editor = vscode.window.activeTextEditor;
  if (!editor || editor.document.languageId !== "krl") {
    vscode.window.showWarningMessage(t("warning.noActiveKrlFile"));
    return;
  }

  const document = editor.document;
  const selection = editor.selection;
  const range = selection.isEmpty
    ? document.lineAt(selection.active.line).range
    : new vscode.Range(
        document.lineAt(selection.start.line).range.start,
        document.lineAt(selection.end.line).range.end,
      );

  const selectedText = document.getText(range);
  const lines = selectedText.split(/\r?\n/).filter((l) => l.trim().length > 0);

  if (lines.length === 0) {
    vscode.window.showWarningMessage(t("fold.notify.noSelection"));
    return;
  }

  const startLineIdx = selection.start.line;
  const indent = document.lineAt(startLineIdx).text.match(/^\s*/)?.[0] || "";
  const { tool: detectedTool, base: detectedBase } = detectActiveToolAndBase(
    document,
    startLineIdx,
  );

  const convertedBlocks: string[] = [];

  for (const line of lines) {
    const parsed = parseMotionLine(line);

    if (parsed) {
      let modernMotionType: string = parsed.motionType;
      if (parsed.motionType === "PTP") modernMotionType = "SPTP";
      if (parsed.motionType === "LIN") modernMotionType = "SLIN";
      if (parsed.motionType === "CIRC") modernMotionType = "SCIRC";

      const cleanPoint = parsed.pointName.startsWith("X")
        ? parsed.pointName.substring(1)
        : parsed.pointName;
      const xPoint = parsed.pointName.startsWith("X")
        ? parsed.pointName
        : `X${parsed.pointName}`;
      const fPoint = `F${cleanPoint}`;
      const pdatName = `P${cleanPoint}_DAT`;

      const toolIdx = parsed.toolIndex || detectedTool || 1;
      const baseIdx = parsed.baseIndex || detectedBase || 1;
      const contStr = parsed.isApprox ? " CONT" : "";
      const velDisplay =
        parsed.velocityStr || (modernMotionType === "SPTP" ? "100 %" : "2 m/s");

      const foldBlock = [
        `${indent};FOLD {iiQKA} ${modernMotionType} ${cleanPoint}${contStr} Vel=${velDisplay} ${pdatName} Tool[${toolIdx}]:Tool${toolIdx} Base[${baseIdx}]:Base${baseIdx} ;%{PE}`,
        `${indent};FOLD Parameters ;%{h}`,
        `${indent};Params: MotionType=${modernMotionType}; Point=${cleanPoint}; Vel=${velDisplay}; Tool=${toolIdx}; Base=${baseIdx}; Cont=${parsed.isApprox}`,
        `${indent};ENDFOLD`,
        modernMotionType === "SPTP"
          ? `${indent}${modernMotionType} ${xPoint} WITH $VEL_AXIS[1] = SVEL_JOINT(100.0), $TOOL = STOOL2(${fPoint}), $BASE = SBASE(${fPoint}), $IPO_MODE = #BASE`
          : `${indent}${modernMotionType} ${xPoint} WITH $VEL.CP = 2.0, $TOOL = STOOL2(${fPoint}), $BASE = SBASE(${fPoint}), $IPO_MODE = #BASE`,
        `${indent};ENDFOLD`,
      ].join("\n");

      convertedBlocks.push(foldBlock);
    } else {
      const foldBlock = [
        `${indent};FOLD {iiQKA} Logic: ${line.trim()} ;%{PE}`,
        `${indent}  ${line.trim()}`,
        `${indent};ENDFOLD`,
      ].join("\n");
      convertedBlocks.push(foldBlock);
    }
  }

  const replacement = convertedBlocks.join("\n");
  await editor.edit((editBuilder) => {
    editBuilder.replace(range, replacement);
  });

  vscode.window.showInformationMessage(t("fold.notify.iiqkaSuccess"));
}

/**
 * Command: Convert legacy motions (PTP, LIN, CIRC) to modern Spline motions (SPTP, SLIN, SCIRC)
 */
export async function convertLegacyToSpline(): Promise<void> {
  const editor = vscode.window.activeTextEditor;
  if (!editor || editor.document.languageId !== "krl") {
    vscode.window.showWarningMessage(t("warning.noActiveKrlFile"));
    return;
  }

  const document = editor.document;
  const selection = editor.selection;
  const isSelectionEmpty = selection.isEmpty;

  const range = isSelectionEmpty
    ? new vscode.Range(0, 0, document.lineCount, 0)
    : new vscode.Range(
        document.lineAt(selection.start.line).range.start,
        document.lineAt(selection.end.line).range.end,
      );

  const text = document.getText(range);
  const lines = text.split(/\r?\n/);
  let count = 0;

  const transformed = lines.map((line) => {
    const trimmed = line.trim();
    if (
      trimmed.startsWith(";") ||
      /^(SPTP|SLIN|SCIRC|SPLINE|ENDSPLINE)\b/i.test(trimmed)
    ) {
      return line;
    }

    const parsed = parseMotionLine(line);
    if (!parsed) return line;

    count++;
    const indent = line.match(/^\s*/)?.[0] || "";
    let newMotion = "";

    const xPoint = parsed.pointName.startsWith("X")
      ? parsed.pointName
      : `X${parsed.pointName}`;

    if (parsed.motionType === "PTP") {
      const contClause = parsed.isApprox ? " WITH $APO.CPTP = 100.0" : "";
      newMotion = `${indent}SPTP ${xPoint}${contClause}`;
    } else if (parsed.motionType === "LIN") {
      const contClause = parsed.isApprox ? " WITH $APO.CDIS = 50.0" : "";
      newMotion = `${indent}SLIN ${xPoint}${contClause}`;
    } else if (parsed.motionType === "CIRC") {
      newMotion = `${indent}SCIRC ${xPoint}`;
    } else {
      return line;
    }

    return newMotion;
  });

  if (count === 0) {
    vscode.window.showInformationMessage(t("fold.notify.noLegacyMotions"));
    return;
  }

  await editor.edit((editBuilder) => {
    editBuilder.replace(range, transformed.join("\n"));
  });

  vscode.window.showInformationMessage(t("fold.notify.splineSuccess", count));
}

/**
 * Command: Unwrap / Strip FOLD envelopes from selection or entire file
 */
export async function unwrapFolds(): Promise<void> {
  const editor = vscode.window.activeTextEditor;
  if (!editor || editor.document.languageId !== "krl") {
    vscode.window.showWarningMessage(t("warning.noActiveKrlFile"));
    return;
  }

  const document = editor.document;
  const selection = editor.selection;
  const isSelectionEmpty = selection.isEmpty;

  const range = isSelectionEmpty
    ? new vscode.Range(0, 0, document.lineCount, 0)
    : new vscode.Range(
        document.lineAt(selection.start.line).range.start,
        document.lineAt(selection.end.line).range.end,
      );

  const text = document.getText(range);
  const lines = text.split(/\r?\n/);
  let foldCount = 0;

  const cleanedLines = lines.filter((line) => {
    const trimmed = line.trim().toUpperCase();
    if (trimmed.startsWith(";FOLD") || trimmed.startsWith(";ENDFOLD")) {
      foldCount++;
      return false;
    }
    if (
      trimmed.startsWith(";&ACCESS") ||
      trimmed.startsWith(";&REL") ||
      trimmed.startsWith(";&PARAM")
    ) {
      return false;
    }
    return true;
  });

  if (foldCount === 0) {
    vscode.window.showInformationMessage(t("fold.notify.noFoldsFound"));
    return;
  }

  await editor.edit((editBuilder) => {
    editBuilder.replace(range, cleanedLines.join("\n"));
  });

  vscode.window.showInformationMessage(t("fold.notify.unwrapped", foldCount));
}

/**
 * Command: Insert CollisionGuard / Torque Monitoring Envelope around selection
 */
export async function insertCollisionGuard(): Promise<void> {
  const editor = vscode.window.activeTextEditor;
  if (!editor || editor.document.languageId !== "krl") {
    vscode.window.showWarningMessage(t("warning.noActiveKrlFile"));
    return;
  }

  const document = editor.document;
  const selection = editor.selection;
  const range = selection.isEmpty
    ? document.lineAt(selection.active.line).range
    : new vscode.Range(
        document.lineAt(selection.start.line).range.start,
        document.lineAt(selection.end.line).range.end,
      );

  const selectedText = document.getText(range);
  const indent =
    document.lineAt(selection.start.line).text.match(/^\s*/)?.[0] || "";

  const collisionGuardBlock = [
    `${indent};FOLD {Safety} Collision Monitoring Protection ON ;%{PE}`,
    `${indent}TRIGGER WHEN DISTANCE = 0 DELAY = 0 DO $COLL_MON = #ON`,
    `${indent}TRIGGER WHEN DISTANCE = 1 DELAY = 0 DO $COLL_MON = #OFF`,
    `${indent};ENDFOLD`,
    selectedText || `${indent}SLIN XP_PART_APPROACH`,
    `${indent};FOLD {Safety} Collision Monitoring OFF ;%{PE}`,
    `${indent}$COLL_MON = #OFF`,
    `${indent};ENDFOLD`,
  ].join("\n");

  await editor.edit((editBuilder) => {
    editBuilder.replace(range, collisionGuardBlock);
  });

  vscode.window.showInformationMessage(t("fold.notify.collisionGuard"));
}

/**
 * Command: Wrap in Modern SPLINE Block (KSS 8.3–8.7)
 */
export async function insertSplineBlock(): Promise<void> {
  const editor = vscode.window.activeTextEditor;
  if (!editor || editor.document.languageId !== "krl") {
    vscode.window.showWarningMessage(t("warning.noActiveKrlFile"));
    return;
  }

  const document = editor.document;
  const selection = editor.selection;
  const indent =
    document.lineAt(selection.start.line).text.match(/^\s*/)?.[0] || "";

  const velInput = await vscode.window.showInputBox({
    prompt: t("fold.prompt.splineVel"),
    value: "2.0",
    placeHolder: "e.g. 2.0 (m/s)",
  });

  if (velInput === undefined) return;
  const vel = parseFloat(velInput) || 2.0;

  const selectedText = selection.isEmpty ? "" : document.getText(selection);
  const innerCode = selectedText
    ? selectedText
        .split(/\r?\n/)
        .map((l) => `${indent}  ${l.trim()}`)
        .join("\n")
    : `${indent}  SLIN XP1\n${indent}  SPL XP2\n${indent}  SLIN XP3`;

  const splineBlock = [
    `${indent};FOLD {Spline} CP Motion Sequence ;%{PE}`,
    `${indent}SPLINE WITH $VEL.CP = ${vel.toFixed(1)}, $ACC.CP = 10.0, $ORI_TYPE = #VAR`,
    innerCode,
    `${indent}ENDSPLINE`,
    `${indent};ENDFOLD`,
  ].join("\n");

  await editor.edit((editBuilder) => {
    if (selection.isEmpty) {
      editBuilder.insert(selection.active, splineBlock);
    } else {
      editBuilder.replace(selection, splineBlock);
    }
  });

  vscode.window.showInformationMessage(t("fold.notify.splineBlockCreated"));
}
