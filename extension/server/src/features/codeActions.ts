import {
  CodeAction,
  CodeActionParams,
  CodeActionKind,
  TextEdit,
  Range,
  Position,
  Diagnostic,
} from "vscode-languageserver/node";
import { TextDocument } from "vscode-languageserver-textdocument";
import { TextDocuments } from "vscode-languageserver/node";
import { FunctionDeclaration, ServerState } from "../types";
import {
  t,
  matchesDiagnosticPattern,
  extractVariableFromMessage,
} from "../lib/i18n";
import * as fs from "fs";
import * as path from "path";
import { URI } from "vscode-uri";

interface TypoData {
  replacement: string;
}

export class CodeActionsProvider {
  /**
   * Kod eylemleri sağlar (Quick Fixes, Refactoring, Source Fix All, Organize Declarations).
   */
  public onCodeAction(
    params: CodeActionParams,
    documents: TextDocuments<TextDocument>,
    state: ServerState,
  ): CodeAction[] {
    const doc = documents.get(params.textDocument.uri);
    if (!doc) return [];

    const actions: CodeAction[] = [];
    const diagnostics = params.context.diagnostics;

    // 1. Source Actions: Fix All (source.fixAll, source.fixAll.krl)
    if (
      !params.context.only ||
      params.context.only.some(
        (k) =>
          k === CodeActionKind.SourceFixAll ||
          k === "source.fixAll" ||
          k === "source.fixAll.krl",
      )
    ) {
      const fixAllAction = this.getSourceFixAllAction(doc, diagnostics);
      if (fixAllAction) {
        actions.push(fixAllAction);
      }
    }

    // 2. Source Actions: Organize Declarations (source.organizeDeclarations, source.organizeImports)
    if (
      !params.context.only ||
      params.context.only.some(
        (k) =>
          k === CodeActionKind.SourceOrganizeImports ||
          k === "source.organizeDeclarations" ||
          k === "source.organizeDeclarations.krl",
      )
    ) {
      const organizeAction = this.getOrganizeDeclarationsAction(doc);
      if (organizeAction) {
        actions.push(organizeAction);
      }
    }

    // 3. Refactor Actions
    if (
      !params.context.only ||
      params.context.only.some((k) => k === CodeActionKind.RefactorExtract)
    ) {
      actions.push(...this.getExtractActions(doc, params.range, state));
    }

    // 4. Diagnostic-based Quick Fixes
    for (const diagnostic of diagnostics) {
      // Tanımsız değişken / alt program hatası için quick fix
      if (matchesDiagnosticPattern(diagnostic.message, "variableNotDefined")) {
        const varName = extractVariableFromMessage(diagnostic.message);
        if (varName) {
          // Point / E6POS / POS quick fixes
          const targetPointName = varName.toUpperCase().startsWith("X")
            ? varName
            : "x" + varName;
          actions.push(
            this.createDeclareVariableAction(
              doc,
              diagnostic,
              targetPointName,
              "E6POS",
              "={X 0.0,Y 0.0,Z 0.0,A 0.0,B 0.0,C 0.0,S 0,T 0}",
            ),
          );
          actions.push(
            this.createDeclareVariableAction(
              doc,
              diagnostic,
              varName,
              "POS",
              "={X 0.0,Y 0.0,Z 0.0,A 0.0,B 0.0,C 0.0}",
            ),
          );
          // INT olarak tanımla
          actions.push(
            this.createDeclareVariableAction(doc, diagnostic, varName, "INT"),
          );
          // REAL olarak tanımla
          actions.push(
            this.createDeclareVariableAction(doc, diagnostic, varName, "REAL"),
          );
          // BOOL olarak tanımla
          actions.push(
            this.createDeclareVariableAction(doc, diagnostic, varName, "BOOL"),
          );

          // Auto-EXT Inserter: Check if varName is an external subprogram/function in workspace
          const extAction = this.createAddExternalSubprogramAction(
            doc,
            diagnostic,
            varName,
            state,
          );
          if (extAction) {
            actions.push(extAction);
          }

          // Auto-Global to $config.dat
          const globalConfigAction = this.createDeclareGlobalInConfigDatAction(
            doc,
            diagnostic,
            targetPointName === varName ? varName : targetPointName,
            targetPointName === varName ? "INT" : "E6POS",
            targetPointName === varName
              ? " = 0"
              : "={X 0.0,Y 0.0,Z 0.0,A 0.0,B 0.0,C 0.0,S 0,T 0}",
            state,
          );
          if (globalConfigAction) {
            actions.push(globalConfigAction);
          }
        }
      }

      // GLOBAL without PUBLIC warning
      if (
        matchesDiagnosticPattern(diagnostic.message, "globalPublicMismatch")
      ) {
        const lines = doc.getText().split(/\r?\n/);
        const line = lines[diagnostic.range.start.line];

        if (
          diagnostic.message.includes("not PUBLIC") ||
          diagnostic.message.includes("PUBLIC değil") ||
          diagnostic.message.includes("не является PUBLIC")
        ) {
          // GLOBAL'ı kaldır
          actions.push(this.createRemoveGlobalAction(doc, diagnostic, line));
        } else if (
          diagnostic.message.includes("not GLOBAL") ||
          diagnostic.message.includes("GLOBAL değil") ||
          diagnostic.message.includes("не GLOBAL")
        ) {
          // GLOBAL ekle
          actions.push(this.createAddGlobalAction(doc, diagnostic, line));
        }
      }

      // Quick Fix для REAL в SWITCH — изменить тип на INT
      if (diagnostic.code === "realInSwitch") {
        actions.push(
          ...this.createChangeTypeActions(doc, diagnostic, "REAL", "INT"),
        );
      }

      // Quick Fix для дробного числа в INT — изменить тип на REAL или обернуть в ROUND()
      if (diagnostic.code === "shouldBeReal") {
        actions.push(
          ...this.createChangeTypeActions(doc, diagnostic, "INT", "REAL"),
        );
        actions.push(this.createWrapWithRoundAction(doc, diagnostic));
      }

      // Quick Fix for Typos (Did you mean...)
      if (diagnostic.code === "variableTypo") {
        actions.push(this.createFixTypoAction(doc, diagnostic));
      }

      // Quick Fix for Non-ASCII (Delete character)
      if (diagnostic.code === "nonAscii") {
        actions.push(this.createDeleteCharAction(doc, diagnostic));
      }

      // Quick Fix for Unused Variable
      if (matchesDiagnosticPattern(diagnostic.message, "unusedVariable")) {
        const data = diagnostic.data as { varName?: string } | undefined;
        if (data?.varName) {
          actions.push(
            this.createRemoveUnusedVariableAction(
              doc,
              diagnostic,
              data.varName,
            ),
          );
        }
      }
    }

    // Genel kod eylemleri (diagnostic'e bağlı değil)
    actions.push(...this.getGeneralActions(doc, params.range));

    return actions;
  }

  private getExtractActions(
    doc: TextDocument,
    range: Range,
    state: ServerState,
  ): CodeAction[] {
    const text = doc.getText(range);
    if (!text || text.trim().length === 0 || !text.includes("\n")) return [];

    const actions: CodeAction[] = [];
    const localVars = state.fileVariablesMap.get(doc.uri) || [];
    const usedVars = new Set<string>();

    // Seçimdeki değişkenleri bul
    const regex = /\b([a-zA-Z_]\w*)\b/g;
    let match;
    while ((match = regex.exec(text)) !== null) {
      usedVars.add(match[1].toUpperCase());
    }

    // Seçimden önce tanımlanan ve seçimde kullanılan değişkenleri bul
    const params = localVars.filter((v) => {
      if (!usedVars.has(v.name.toUpperCase())) return false;

      // Eğer range varsa ve seçimden önce bitiyorsa
      if (v.range) {
        return (
          v.range.end.line < range.start.line ||
          (v.range.end.line === range.start.line &&
            v.range.end.character <= range.start.character)
        );
      }
      // Range yoksa (örn: PARAM), muhtemelen parametredir, ekle
      return v.type === "PARAM";
    });

    // Parametreleri oluştur
    const uniqueParams = Array.from(new Set(params));
    const callArgs = uniqueParams.map((p) => p.name).join(", ");
    // Güvenlik için tüm parametreleri referans (:OUT) olarak geçiriyoruz
    const defArgs = uniqueParams.map((p) => `${p.name}:OUT`).join(", ");
    const funcName = "newFunction";

    // Yeni fonksiyon içeriğini oluştur
    const decls = uniqueParams
      .map((p) => {
        if (p.type === "PARAM") {
          return `  ; DECL ??? ${p.name} ; Parameter from outer function`;
        }
        return `  DECL ${p.type} ${p.name}`;
      })
      .join("\n");

    const newFuncCode = `\n\nDEF ${funcName}(${defArgs})\n${decls}\n\n${text}\nEND\n`;

    actions.push({
      title: "Extract Function",
      kind: CodeActionKind.RefactorExtract,
      edit: {
        changes: {
          [doc.uri]: [
            TextEdit.replace(range, `${funcName}(${callArgs})`),
            TextEdit.insert(Position.create(doc.lineCount, 0), newFuncCode),
          ],
        },
      },
    });

    return actions;
  }

  /**
   * Değişken bildirimi ekleyen kod eylemi oluşturur.
   */
  private createDeclareVariableAction(
    doc: TextDocument,
    diagnostic: Diagnostic,
    varName: string,
    varType: string,
    initialValue: string = "",
  ): CodeAction {
    const lines = doc.getText().split(/\r?\n/);

    // En uygun ekleme pozisyonunu bul
    let insertLine = 0;
    for (let i = 0; i < lines.length; i++) {
      // DEFDAT veya DEF bloğunun başlangıcını bul
      if (/^\s*(?:DEFDAT|DEF)\b/i.test(lines[i])) {
        insertLine = i + 1;
        break;
      }
      // Son DECL satırının altını bul
      if (/^\s*(?:GLOBAL\s+)?DECL\b/i.test(lines[i])) {
        insertLine = i + 1;
      }
    }

    const indent = this.getIndent(lines[insertLine] || "");
    const newDecl = `${indent}DECL ${varType} ${varName}${initialValue}\n`;

    return {
      title: t("action.declareAs", varName, varType),
      kind: CodeActionKind.QuickFix,
      diagnostics: [diagnostic],
      edit: {
        changes: {
          [doc.uri]: [TextEdit.insert(Position.create(insertLine, 0), newDecl)],
        },
      },
    };
  }

  /**
   * GLOBAL anahtar kelimesini kaldıran kod eylemi oluşturur.
   */
  private createRemoveGlobalAction(
    doc: TextDocument,
    diagnostic: Diagnostic,
    line: string,
  ): CodeAction {
    const newLine = line.replace(/\bGLOBAL\s+/i, "");

    return {
      title: t("action.removeGlobal"),
      kind: CodeActionKind.QuickFix,
      diagnostics: [diagnostic],
      edit: {
        changes: {
          [doc.uri]: [
            TextEdit.replace(
              Range.create(
                Position.create(diagnostic.range.start.line, 0),
                Position.create(diagnostic.range.start.line, line.length),
              ),
              newLine,
            ),
          ],
        },
      },
    };
  }

  /**
   * GLOBAL anahtar kelimesini ekleyen kod eylemi oluşturur.
   */
  private createAddGlobalAction(
    doc: TextDocument,
    diagnostic: Diagnostic,
    line: string,
  ): CodeAction {
    // DECL veya tip adından önce GLOBAL ekle
    let newLine: string;
    if (/^\s*DECL\b/i.test(line)) {
      newLine = line.replace(/^(\s*)DECL\b/i, "$1GLOBAL DECL");
    } else {
      newLine = line.replace(/^(\s*)(\w)/, "$1GLOBAL $2");
    }

    return {
      title: t("action.addGlobal"),
      kind: CodeActionKind.QuickFix,
      diagnostics: [diagnostic],
      edit: {
        changes: {
          [doc.uri]: [
            TextEdit.replace(
              Range.create(
                Position.create(diagnostic.range.start.line, 0),
                Position.create(diagnostic.range.start.line, line.length),
              ),
              newLine,
            ),
          ],
        },
      },
    };
  }

  /**
   * Genel kod eylemleri (refactoring vb.).
   */
  private getGeneralActions(doc: TextDocument, range: Range): CodeAction[] {
    const actions: CodeAction[] = [];
    const text = doc.getText(range);

    // Seçili metin varsa FOLD ile sar
    if (text && text.trim().length > 0 && text.includes("\n")) {
      actions.push({
        title: t("action.wrapWithFold"),
        kind: CodeActionKind.RefactorExtract,
        edit: {
          changes: {
            [doc.uri]: [
              TextEdit.replace(range, `;FOLD Region\n${text}\n;ENDFOLD`),
            ],
          },
        },
      });
    }

    return actions;
  }

  /**
   * Satır başındaki boşlukları alır.
   */
  private getIndent(line: string): string {
    const match = line.match(/^(\s*)/);
    return match ? match[1] : "";
  }

  /**
   * Создаёт действия для изменения типа переменной.
   */
  private createChangeTypeActions(
    doc: TextDocument,
    diagnostic: Diagnostic,
    fromType: string,
    toType: string,
  ): CodeAction[] {
    const actions: CodeAction[] = [];
    const data = diagnostic.data as
      | { varName?: string; line?: number }
      | undefined;
    if (!data?.varName) return actions;

    const text = doc.getText();
    const lines = text.split(/\r?\n/);

    // Ищем объявление переменной
    const declRegex = new RegExp(
      `^(\\s*(?:GLOBAL\\s+)?(?:DECL\\s+)?)(${fromType})(\\s+${data.varName}\\b)`,
      "i",
    );

    for (let i = 0; i < lines.length; i++) {
      const match = declRegex.exec(lines[i]);
      if (match) {
        const newLine = lines[i].replace(declRegex, `$1${toType}$3`);

        const title =
          toType === "INT" ? t("action.changeToInt") : t("action.changeToReal");

        actions.push({
          title,
          kind: CodeActionKind.QuickFix,
          diagnostics: [diagnostic],
          edit: {
            changes: {
              [doc.uri]: [
                TextEdit.replace(
                  Range.create(
                    Position.create(i, 0),
                    Position.create(i, lines[i].length),
                  ),
                  newLine,
                ),
              ],
            },
          },
        });
        break;
      }
    }

    return actions;
  }

  /**
   * Создаёт действие для оборачивания значения в ROUND().
   */
  private createWrapWithRoundAction(
    doc: TextDocument,
    diagnostic: Diagnostic,
  ): CodeAction {
    const data = diagnostic.data as
      | { varName?: string; value?: string; line?: number }
      | undefined;
    const lines = doc.getText().split(/\r?\n/);
    const lineIndex = diagnostic.range.start.line;
    const line = lines[lineIndex] || "";

    // Находим присваивание и оборачиваем значение в ROUND()
    const assignRegex = new RegExp(
      `(${data?.varName}\\s*=\\s*)(${data?.value?.replace(".", "\\.")})`,
      "i",
    );
    const newLine = line.replace(assignRegex, `$1ROUND($2)`);

    return {
      title: t("action.wrapWithRound"),
      kind: CodeActionKind.QuickFix,
      diagnostics: [diagnostic],
      edit: {
        changes: {
          [doc.uri]: [
            TextEdit.replace(
              Range.create(
                Position.create(lineIndex, 0),
                Position.create(lineIndex, line.length),
              ),
              newLine,
            ),
          ],
        },
      },
    };
  }

  /**
   * Create action to fix typo based on 'Did you mean' suggestion
   */
  private createFixTypoAction(
    doc: TextDocument,
    diagnostic: Diagnostic,
  ): CodeAction {
    const data = diagnostic.data as TypoData;
    return {
      title: t("action.fixTypo", data.replacement),
      kind: CodeActionKind.QuickFix,
      diagnostics: [diagnostic],
      isPreferred: true,
      edit: {
        changes: {
          [doc.uri]: [TextEdit.replace(diagnostic.range, data.replacement)],
        },
      },
    };
  }

  /**
   * Create action to delete invalid character
   */
  private createDeleteCharAction(
    doc: TextDocument,
    diagnostic: Diagnostic,
  ): CodeAction {
    return {
      title: t("action.deleteInvalidChar"),
      kind: CodeActionKind.QuickFix,
      diagnostics: [diagnostic],
      isPreferred: true,
      edit: {
        changes: {
          [doc.uri]: [TextEdit.del(diagnostic.range)],
        },
      },
    };
  }

  /**
   * Create action to remove unused variable
   */
  private createRemoveUnusedVariableAction(
    doc: TextDocument,
    diagnostic: Diagnostic,
    varName: string,
  ): CodeAction {
    let deleteRange = diagnostic.range;
    const text = doc.getText();
    const offset = doc.offsetAt(deleteRange.start);
    const endOffset = doc.offsetAt(deleteRange.end);

    // Look ahead for whitespace + comma
    const after = text.substring(endOffset);
    const matchCommaAfter = after.match(/^\s*,/);

    // Look behind for comma + whitespace
    const before = text.substring(0, offset);
    const matchCommaBefore = before.match(/,\s*$/);

    if (matchCommaAfter) {
      // Delete variable + comma + whitespace
      // e.g. "a, b" -> remove "a" -> ", b" (bad)
      // wait, "a, b". remove "a,". -> " b". OK.
      deleteRange = Range.create(
        deleteRange.start,
        doc.positionAt(endOffset + matchCommaAfter[0].length),
      );
    } else if (matchCommaBefore) {
      // Delete comma + whitespace + variable
      // e.g. "a, b". remove "b". -> "a". OK.
      deleteRange = Range.create(
        doc.positionAt(offset - matchCommaBefore[0].length),
        deleteRange.end,
      );
    }

    return {
      title: t("action.removeUnusedVariable", varName),
      kind: CodeActionKind.QuickFix,
      diagnostics: [diagnostic],
      isPreferred: true,
      edit: {
        changes: {
          [doc.uri]: [TextEdit.del(deleteRange)],
        },
      },
    };
  }

  /**
   * Generates a combined Source Fix All action for all auto-fixable diagnostics
   */
  private getSourceFixAllAction(
    doc: TextDocument,
    diagnostics: Diagnostic[],
  ): CodeAction | null {
    const edits: TextEdit[] = [];

    for (const diag of diagnostics) {
      if (diag.code === "variableTypo" && diag.data) {
        edits.push(
          TextEdit.replace(diag.range, (diag.data as TypoData).replacement),
        );
      } else if (diag.code === "nonAscii") {
        edits.push(TextEdit.del(diag.range));
      } else if (matchesDiagnosticPattern(diag.message, "unusedVariable")) {
        const data = diag.data as { varName?: string } | undefined;
        if (data?.varName) {
          const action = this.createRemoveUnusedVariableAction(
            doc,
            diag,
            data.varName,
          );
          if (action.edit?.changes?.[doc.uri]) {
            edits.push(...action.edit.changes[doc.uri]);
          }
        }
      }
    }

    if (edits.length === 0) return null;

    return {
      title: t("action.fixAllKrl"),
      kind: "source.fixAll.krl",
      isPreferred: true,
      edit: {
        changes: {
          [doc.uri]: edits,
        },
      },
    };
  }

  /**
   * Generates an action to organize and sort all declarations in the document
   */
  private getOrganizeDeclarationsAction(doc: TextDocument): CodeAction | null {
    const text = doc.getText();
    const organizedText = organizeKrlDeclarations(text);
    if (organizedText === text) return null;

    const fullRange = Range.create(
      Position.create(0, 0),
      doc.positionAt(text.length),
    );

    return {
      title: t("action.organizeDeclarations"),
      kind: "source.organizeDeclarations.krl",
      isPreferred: true,
      edit: {
        changes: {
          [doc.uri]: [TextEdit.replace(fullRange, organizedText)],
        },
      },
    };
  }

  /**
   * Auto-EXT Inserter: Adds external subprogram or function prototype
   */
  private createAddExternalSubprogramAction(
    doc: TextDocument,
    diagnostic: Diagnostic,
    varName: string,
    state: ServerState,
  ): CodeAction | null {
    if (!state.functionsDeclared || state.functionsDeclared.length === 0) {
      return null;
    }

    const upperName = varName.toUpperCase();
    const match = state.functionsDeclared.find(
      (f) => f.name.toUpperCase() === upperName && f.uri !== doc.uri,
    );

    if (!match) return null;

    const isFunction = match.params && match.params.includes(":");
    const extStatement = isFunction
      ? `EXTFCT BOOL ${match.name}(${match.params})`
      : `EXT ${match.name}(${match.params || ""})`;

    const lines = doc.getText().split(/\r?\n/);
    let insertLine = 0;
    for (let i = 0; i < lines.length; i++) {
      if (/^\s*(?:DEF|DEFFCT)\b/i.test(lines[i])) {
        insertLine = i + 1;
        break;
      }
      if (/^\s*(?:EXT|EXTFCT)\b/i.test(lines[i])) {
        insertLine = i + 1;
      }
    }

    return {
      title: isFunction
        ? t("action.addExternalFunction", "BOOL", match.name)
        : t("action.addExternalSubprogram", match.name),
      kind: CodeActionKind.QuickFix,
      diagnostics: [diagnostic],
      isPreferred: true,
      edit: {
        changes: {
          [doc.uri]: [
            TextEdit.insert(
              Position.create(insertLine, 0),
              `   ${extStatement}\n`,
            ),
          ],
        },
      },
    };
  }

  /**
   * Auto-Global to $config.dat: Adds global declaration to $config.dat
   */
  private createDeclareGlobalInConfigDatAction(
    doc: TextDocument,
    diagnostic: Diagnostic,
    varName: string,
    varType: string,
    initialValue: string,
    state: ServerState,
  ): CodeAction | null {
    const configDatUri = this.findOrCreateConfigDatUri(doc, state);
    if (!configDatUri) return null;

    const globalDecl = `GLOBAL DECL ${varType} ${varName}${initialValue}`;
    const insertEdit = this.createConfigDatInsertEdit(
      configDatUri,
      globalDecl,
    );

    return {
      title: t("action.declareGlobalConfigDat", varType, varName),
      kind: CodeActionKind.QuickFix,
      diagnostics: [diagnostic],
      edit: {
        changes: {
          [configDatUri]: [insertEdit],
        },
      },
    };
  }

  /**
   * Locate or create $config.dat URI in workspace
   */
  private findOrCreateConfigDatUri(
    doc: TextDocument,
    state: ServerState,
  ): string | null {
    // 1. Check indexed files
    for (const fileUri of state.fileVariablesMap.keys()) {
      if (fileUri.toLowerCase().endsWith("$config.dat")) {
        return fileUri;
      }
    }

    // 2. Check workspace root
    if (state.workspaceRoot) {
      const candidates = [
        path.join(state.workspaceRoot, "KRC", "R1", "System", "$config.dat"),
        path.join(state.workspaceRoot, "R1", "System", "$config.dat"),
        path.join(state.workspaceRoot, "System", "$config.dat"),
        path.join(state.workspaceRoot, "$config.dat"),
      ];
      for (const cand of candidates) {
        if (fs.existsSync(cand)) {
          return URI.file(cand).toString();
        }
      }
      return URI.file(path.join(state.workspaceRoot, "$config.dat")).toString();
    }

    // 3. Sibling fallback
    try {
      const parsed = URI.parse(doc.uri);
      const sibling = path.join(path.dirname(parsed.fsPath), "$config.dat");
      return URI.file(sibling).toString();
    } catch {
      return null;
    }
  }

  /**
   * Generates TextEdit for inserting declaration into $config.dat
   */
  private createConfigDatInsertEdit(
    configDatUri: string,
    insertText: string,
  ): TextEdit {
    let content = "";
    try {
      const fsPath = URI.parse(configDatUri).fsPath;
      if (fs.existsSync(fsPath)) {
        content = fs.readFileSync(fsPath, "utf8");
      }
    } catch {
      content = "";
    }

    if (!content || content.trim().length === 0) {
      const newFile = `DEFDAT $CONFIG PUBLIC\n\n  ${insertText}\n\nENDDAT\n`;
      return TextEdit.insert(Position.create(0, 0), newFile);
    }

    const lines = content.split(/\r?\n/);
    let insertLine = lines.length;
    for (let i = lines.length - 1; i >= 0; i--) {
      if (/^\s*ENDDAT\b/i.test(lines[i])) {
        insertLine = i;
        break;
      }
    }

    return TextEdit.insert(
      Position.create(insertLine, 0),
      `  ${insertText}\n`,
    );
  }
}

/**
 * Organizes and categorizes KRL declarations
 */
export function organizeKrlDeclarations(text: string): string {
  const lines = text.split(/\r?\n/);
  if (lines.length <= 2) return text;

  // Find start of declarations: after DEFDAT or DEF
  let startIdx = -1;
  let endIdx = lines.length;

  for (let i = 0; i < lines.length; i++) {
    if (/^\s*(?:DEFDAT|DEF|DEFFCT)\b/i.test(lines[i])) {
      startIdx = i + 1;
      break;
    }
  }

  if (startIdx === -1) {
    startIdx = 0;
  }

  // Find end of declarations (ENDDAT or first execution instruction)
  for (let i = startIdx; i < lines.length; i++) {
    const l = lines[i].trim();
    if (/^\s*ENDDAT\b/i.test(l) || /^\s*END\b/i.test(l)) {
      endIdx = i;
      break;
    }
    // If inside .src, first executable motion / logic statement marks end of declarations
    if (
      /^(?:PTP|LIN|CIRC|SPTP|SLIN|SCIRC|HALT|WAIT|IF|FOR|WHILE|LOOP|SWITCH|EXIT|RETURN|CONTINUE|TRIGGER|INTERRUPT|ON_ERROR|BRAKE)\b/i.test(
        l,
      ) ||
      /^(?:\$TOOL|\$BASE|\$VEL|\$ACC|\$APO|\$OV_PRO)\s*=/i.test(l) ||
      /^BAS\s*\(/i.test(l)
    ) {
      endIdx = i;
      break;
    }
  }

  const headerLines = lines.slice(0, startIdx);
  const declLines = lines.slice(startIdx, endIdx);
  const restLines = lines.slice(endIdx);

  const exts: string[] = [];
  const strucs: string[] = [];
  const signals: string[] = [];
  const consts: string[] = [];
  const globals: string[] = [];
  const coordinates: string[] = [];
  const primitives: string[] = [];
  const others: string[] = [];

  for (const line of declLines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (trimmed.startsWith(";")) {
      // Skip banner comments to avoid duplication
      if (/^;\s*---/i.test(trimmed)) continue;
    }

    if (/^(?:EXT|EXTFCT)\b/i.test(trimmed)) {
      exts.push(line);
    } else if (/^(?:STRUC|ENUM)\b/i.test(trimmed)) {
      strucs.push(line);
    } else if (/\bSIGNAL\b/i.test(trimmed)) {
      signals.push(line);
    } else if (/\bCONST\b/i.test(trimmed)) {
      consts.push(line);
    } else if (/\bGLOBAL\s+DECL\b/i.test(trimmed)) {
      globals.push(line);
    } else if (
      /\bDECL\s+(?:E6POS|POS|FRAME|AXIS|E6AXIS|LOAD|TOOL)\b/i.test(trimmed)
    ) {
      coordinates.push(line);
    } else if (
      /\bDECL\s+(?:INT|REAL|BOOL|CHAR|STRING)\b/i.test(trimmed) ||
      /^(?:INT|REAL|BOOL|CHAR|STRING)\s+/i.test(trimmed)
    ) {
      primitives.push(line);
    } else {
      others.push(line);
    }
  }

  const sortAlphabetical = (a: string, b: string) =>
    a.trim().localeCompare(b.trim(), undefined, { sensitivity: "base" });

  exts.sort(sortAlphabetical);
  strucs.sort(sortAlphabetical);
  signals.sort(sortAlphabetical);
  consts.sort(sortAlphabetical);
  globals.sort(sortAlphabetical);
  primitives.sort(sortAlphabetical);
  coordinates.sort(sortAlphabetical);
  others.sort(sortAlphabetical);

  const newDeclBlock: string[] = [];

  if (exts.length > 0) {
    newDeclBlock.push("  ; --- External Declarations ---");
    newDeclBlock.push(...exts);
    newDeclBlock.push("");
  }
  if (strucs.length > 0) {
    newDeclBlock.push("  ; --- Types & Structures ---");
    newDeclBlock.push(...strucs);
    newDeclBlock.push("");
  }
  if (signals.length > 0) {
    newDeclBlock.push("  ; --- I/O Signals ---");
    newDeclBlock.push(...signals);
    newDeclBlock.push("");
  }
  if (consts.length > 0) {
    newDeclBlock.push("  ; --- Constants ---");
    newDeclBlock.push(...consts);
    newDeclBlock.push("");
  }
  if (globals.length > 0) {
    newDeclBlock.push("  ; --- Global Declarations ---");
    newDeclBlock.push(...globals);
    newDeclBlock.push("");
  }
  if (primitives.length > 0) {
    newDeclBlock.push("  ; --- Variables ---");
    newDeclBlock.push(...primitives);
    newDeclBlock.push("");
  }
  if (coordinates.length > 0) {
    newDeclBlock.push("  ; --- Positions & Frames ---");
    newDeclBlock.push(...coordinates);
    newDeclBlock.push("");
  }
  if (others.length > 0) {
    newDeclBlock.push(...others);
    newDeclBlock.push("");
  }

  // Remove trailing empty lines
  while (
    newDeclBlock.length > 0 &&
    newDeclBlock[newDeclBlock.length - 1] === ""
  ) {
    newDeclBlock.pop();
  }

  return [...headerLines, ...newDeclBlock, ...restLines].join("\n");
}

