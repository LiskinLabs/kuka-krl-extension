import * as vscode from "vscode";
import { t } from "../i18n";
import {
  extractIoMatrixForAi,
  performAiSafetyCheck,
} from "../../../server/src/lib/aiTools";

export { extractIoMatrixForAi, performAiSafetyCheck };

const safetyDiagnosticCollection =
  vscode.languages.createDiagnosticCollection("krl-safety");

/**
 * Registers AI Supportive Commands & Language Model Tools in VS Code.
 */
export function initAiTools(context: vscode.ExtensionContext) {
  context.subscriptions.push(safetyDiagnosticCollection);

  // Command 1: Execute Industrial Safety & Logic Check
  context.subscriptions.push(
    vscode.commands.registerCommand("krl.aiCheckSafety", async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showWarningMessage(t("warning.noActiveKrlFile"));
        return;
      }

      const doc = editor.document;
      const config = vscode.workspace.getConfiguration("krl");
      const maxSpeed = config.get<number>("maxCartesianVelocity", 2.0);

      const result = performAiSafetyCheck(doc.getText(), maxSpeed);

      // Publish diagnostics to VS Code Problems Panel
      const diagnostics: vscode.Diagnostic[] = result.detailedIssues.map(
        (issue) => {
          const lineIdx = Math.max(0, issue.line - 1);
          const lineText = doc.lineAt(lineIdx).text;
          const range = new vscode.Range(lineIdx, 0, lineIdx, lineText.length);

          let severity = vscode.DiagnosticSeverity.Warning;
          if (issue.severity === "error") {
            severity = vscode.DiagnosticSeverity.Error;
          } else if (issue.severity === "info") {
            severity = vscode.DiagnosticSeverity.Information;
          }

          const diag = new vscode.Diagnostic(range, issue.message, severity);
          diag.source = "KRC Industrial Safety & Logic Analyzer";
          diag.code = issue.code;
          return diag;
        },
      );

      safetyDiagnosticCollection.set(doc.uri, diagnostics);

      const errorsCount = result.detailedIssues.filter(
        (i) => i.severity === "error",
      ).length;
      const warningsCount = result.detailedIssues.filter(
        (i) => i.severity === "warning",
      ).length;
      const infoCount = result.detailedIssues.filter(
        (i) => i.severity === "info",
      ).length;
      const totalRisks = warningsCount + infoCount;

      if (errorsCount === 0 && totalRisks === 0) {
        vscode.window.showInformationMessage(t("safety.notify.safe", maxSpeed));
      } else {
        const flowBtn = t("cc.btn.openFlowchart");
        let msg = "";
        if (errorsCount > 0) {
          msg = t("safety.alert.critical", errorsCount, totalRisks);
        } else {
          msg = t("safety.alert.warning", totalRisks);
        }

        const choice = await vscode.window.showErrorMessage(msg, flowBtn);
        if (choice === flowBtn) {
          vscode.commands.executeCommand("krl.showFlowchart");
        }
      }
    }),
  );

  interface VscLmApi {
    registerTool(
      name: string,
      tool: {
        invoke(options: { input?: string }): Promise<unknown>;
      },
    ): void;
    LanguageModelToolResult: new (parts: unknown[]) => unknown;
    LanguageModelTextPart: new (text: string) => unknown;
  }

  // Register VS Code LM Tools API if supported by host IDE (VS Code / Antigravity IDE)
  const vscLm = (vscode as unknown as { lm?: VscLmApi }).lm;
  if (vscLm && typeof vscLm.registerTool === "function") {
    try {
      vscLm.registerTool("krl_safety_check", {
        async invoke(options: { input?: string }) {
          const editor = vscode.window.activeTextEditor;
          const text = editor ? editor.document.getText() : options.input || "";
          const res = performAiSafetyCheck(text);
          return new vscLm.LanguageModelToolResult([
            new vscLm.LanguageModelTextPart(JSON.stringify(res, null, 2)),
          ]);
        },
      });
      vscLm.registerTool("krl_io_matrix", {
        async invoke(options: { input?: string }) {
          const editor = vscode.window.activeTextEditor;
          const text = editor ? editor.document.getText() : options.input || "";
          const res = extractIoMatrixForAi(text);
          return new vscLm.LanguageModelToolResult([
            new vscLm.LanguageModelTextPart(JSON.stringify(res, null, 2)),
          ]);
        },
      });
    } catch {
      // LM Tools API not supported or already registered
    }
  }
}
