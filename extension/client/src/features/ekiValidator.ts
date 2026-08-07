import * as vscode from "vscode";
import * as path from "path";
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
      let targetUri: vscode.Uri | undefined;
      const editor = vscode.window.activeTextEditor;

      // 1. Check if currently active editor is an XML file
      if (editor) {
        const ext = path.extname(editor.document.uri.fsPath).toLowerCase();
        const text = editor.document.getText();
        if (ext === ".xml" || text.includes("<ETHERNETKRL>")) {
          targetUri = editor.document.uri;
        }
      }

      // 2. Search workspace for .xml files if active editor is not an EKI XML
      if (!targetUri) {
        const xmlFiles = await vscode.workspace.findFiles(
          "**/*.xml",
          null,
          100,
        );
        const ekiXmlFiles = [];

        for (const file of xmlFiles) {
          try {
            const doc = await vscode.workspace.openTextDocument(file);
            if (doc.getText().includes("<ETHERNETKRL>")) {
              ekiXmlFiles.push(file);
            }
          } catch {
            /* ignore read errors */
          }
        }

        if (ekiXmlFiles.length === 1) {
          targetUri = ekiXmlFiles[0];
        } else if (ekiXmlFiles.length > 1) {
          const items = ekiXmlFiles.map((f) => ({
            label: path.basename(f.fsPath),
            description: vscode.workspace.asRelativePath(f),
            detail: f.fsPath,
            uri: f,
          }));

          const picked = await vscode.window.showQuickPick(items, {
            placeHolder: t("eki.picker.selectXml"),
          });
          if (picked) {
            targetUri = picked.uri;
          }
        }
      }

      // 3. If an XML file was found/selected, validate it!
      if (targetUri) {
        try {
          const doc = await vscode.workspace.openTextDocument(targetUri);
          const result = validateEkiXmlContent(doc.getText());

          if (result.valid) {
            vscode.window.showInformationMessage(
              t(
                "eki.notify.valid",
                result.channelName || path.basename(targetUri.fsPath),
              ),
            );
          } else {
            vscode.window.showErrorMessage(
              `${t("eki.error.title")}\n${result.errors.join("\n")}`,
            );
          }
          return;
        } catch (e) {
          vscode.window.showErrorMessage(`Error reading EKI XML: ${e}`);
          return;
        }
      }

      // 4. Fallback: No XML found in active editor or workspace
      const btnGen = t("eki.btn.generate");
      const btnSelect = t("eki.btn.select");
      const selection = await vscode.window.showWarningMessage(
        t("eki.warning.notXml"),
        btnGen,
        btnSelect,
      );

      if (selection === btnGen) {
        vscode.commands.executeCommand("krl.generateEkiCode");
      } else if (selection === btnSelect) {
        const chosen = await vscode.window.showOpenDialog({
          canSelectFiles: true,
          canSelectFolders: false,
          canSelectMany: false,
          openLabel: t("eki.picker.selectXml"),
          filters: { "EKI XML Config": ["xml"] },
        });

        if (chosen && chosen.length > 0) {
          const doc = await vscode.workspace.openTextDocument(chosen[0]);
          const result = validateEkiXmlContent(doc.getText());
          if (result.valid) {
            vscode.window.showInformationMessage(
              t(
                "eki.notify.valid",
                result.channelName || path.basename(chosen[0].fsPath),
              ),
            );
          } else {
            vscode.window.showErrorMessage(
              `${t("eki.error.title")}\n${result.errors.join("\n")}`,
            );
          }
        }
      }
    }),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("krl.generateEkiCode", async () => {
      const channelName = await vscode.window.showInputBox({
        prompt: t("eki.prompt.channelName"),
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
