import * as vscode from "vscode";
import { t } from "../i18n";
import {
  validateEkiXmlContent,
  generateEkiKrlCode,
} from "../../../server/src/lib/ekiValidator";

export { validateEkiXmlContent, generateEkiKrlCode };

/**
 * Registers EKI commands in VS Code.
 */
export function initEkiValidator(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("krl.validateEkiXml", async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showWarningMessage(t("No active editor found"));
        return;
      }

      const text = editor.document.getText();
      const result = validateEkiXmlContent(text);

      if (result.valid) {
        vscode.window.showInformationMessage(
          `✅ EKI XML Config (${result.channelName}): Valid EthernetKRL Schema!`,
        );
      } else {
        vscode.window.showErrorMessage(
          `❌ EKI XML Config Errors:\n${result.errors.join("\n")}`,
        );
      }
    }),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("krl.generateEkiCode", async () => {
      const channelName = await vscode.window.showInputBox({
        prompt: "Enter EthernetKRL (EKI) Channel Name",
        value: "XmlCommunication",
      });

      if (!channelName) return;

      const code = generateEkiKrlCode(channelName);
      const doc = await vscode.workspace.openTextDocument({
        language: "krl",
        content: code,
      });
      await vscode.window.showTextDocument(doc);
    }),
  );
}
