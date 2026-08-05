import * as vscode from "vscode";
import { t } from "../i18n";
import {
  extractIoMatrixForAi,
  performAiSafetyCheck,
} from "../../../server/src/lib/aiTools";

export { extractIoMatrixForAi, performAiSafetyCheck };

/**
 * Registers AI Supportive Commands & Language Model Tools in VS Code.
 */
export function initAiTools(context: vscode.ExtensionContext) {
  // Command 1: Extract I/O Matrix for AI Prompt
  context.subscriptions.push(
    vscode.commands.registerCommand("krl.aiGetIoMatrix", async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showWarningMessage(t("No active editor found"));
        return;
      }

      const signals = extractIoMatrixForAi(editor.document.getText());
      const summary =
        signals.length > 0
          ? JSON.stringify(signals, null, 2)
          : "No explicit I/O signals found in document.";

      await vscode.env.clipboard.writeText(summary);
      vscode.window.showInformationMessage(
        `📋 I/O Matrix extracted to clipboard (${signals.length} signals)!`,
      );
    }),
  );

  // Command 2: Execute Safety Check for AI Diagnostic
  context.subscriptions.push(
    vscode.commands.registerCommand("krl.aiCheckSafety", async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showWarningMessage(t("No active editor found"));
        return;
      }

      const config = vscode.workspace.getConfiguration("krl");
      const maxSpeed = config.get<number>("maxCartesianVelocity", 2.0);
      const result = performAiSafetyCheck(editor.document.getText(), maxSpeed);
      if (result.safe) {
        vscode.window.showInformationMessage(
          `🛡️ Industrial Safety Check: CODE IS SAFE FOR KRC EXECUTION! (Max Limit: ${maxSpeed} m/s)`,
        );
      } else {
        vscode.window.showErrorMessage(
          `🚨 Safety Violations Found:\n${result.issues.join("\n")}`,
        );
      }
    }),
  );


}
