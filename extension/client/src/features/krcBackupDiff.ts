import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";
import * as os from "os";
import { t } from "../i18n";
import {
  extractFileFromZipBackup,
  comparePositionPoints,
  BackupDiffResult,
} from "../../../server/src/lib/krcBackupDiff";

import { ensurePremium } from "./license";

export { extractFileFromZipBackup, comparePositionPoints, BackupDiffResult };

let outputChannel: vscode.OutputChannel | undefined;

function getOutputChannel(): vscode.OutputChannel {
  if (!outputChannel) {
    outputChannel = vscode.window.createOutputChannel("KRC Backup Point Diff");
  }
  return outputChannel;
}

function cleanOldBackupTempFiles(tempDir: string) {
  try {
    if (fs.existsSync(tempDir)) {
      const files = fs.readdirSync(tempDir);
      for (const file of files) {
        const filePath = path.join(tempDir, file);
        const stat = fs.statSync(filePath);
        if (Date.now() - stat.mtimeMs > 3600 * 1000) {
          fs.unlinkSync(filePath);
        }
      }
    }
  } catch {
    /* ignore */
  }
}

/**
 * Registers KRC Backup Diff & Compare feature commands in VS Code.
 */
export function initKrcBackupDiff(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "krl.compareKrcBackup",
      ensurePremium(async () => {
        const editor = vscode.window.activeTextEditor;
        if (
          !editor ||
          (editor.document.languageId !== "krl" &&
            !editor.document.fileName.endsWith(".dat") &&
            !editor.document.fileName.endsWith(".src"))
        ) {
          vscode.window.showWarningMessage(t("warning.noActiveKrlFile"));
          return;
        }

        const activeDoc = editor.document;
        const fileName = path.basename(activeDoc.fileName);

        // 1. Show file picker for KRC Zip Backup
        const zipUris = await vscode.window.showOpenDialog({
          canSelectFiles: true,
          canSelectFolders: false,
          canSelectMany: false,
          filters: {
            "KRC Zip Backup (*.zip)": ["zip"],
            "All Files": ["*"],
          },
          openLabel: t("backup.picker.title"),
        });

        if (!zipUris || zipUris.length === 0) return;

        const zipPath = zipUris[0].fsPath;

        // 2. Extract matching file from zip backup
        const extractResult = extractFileFromZipBackup(zipPath, fileName);

        if (!extractResult.found || !extractResult.content) {
          vscode.window.showErrorMessage(t("backup.error.notFound", fileName));
          return;
        }

        // 3. Save extracted backup file to a temp location for side-by-side diff
        const tempDir = path.join(os.tmpdir(), "kuka_krl_backup_diff");
        if (!fs.existsSync(tempDir)) {
          fs.mkdirSync(tempDir, { recursive: true });
        }
        cleanOldBackupTempFiles(tempDir);

        const tempBackupFilePath = path.join(tempDir, `BACKUP_${fileName}`);
        fs.writeFileSync(tempBackupFilePath, extractResult.content, "utf8");

        const backupFileUri = vscode.Uri.file(tempBackupFilePath);

        // 4. Open VS Code Diff Viewer
        const title = `${fileName} (Workspace ↔ KRC Backup: ${path.basename(zipPath)})`;
        await vscode.commands.executeCommand(
          "vscode.diff",
          backupFileUri,
          activeDoc.uri,
          title,
        );

        // 5. If it's a .dat file, analyze position point deltas
        if (fileName.toLowerCase().endsWith(".dat")) {
          const diffResult = comparePositionPoints(
            activeDoc.getText(),
            extractResult.content,
            fileName,
          );

          const channel = getOutputChannel();
          channel.clear();
          channel.appendLine(
            "====================================================",
          );
          channel.appendLine(`🤖 KRC BACKUP POINT DELTA REPORT: ${fileName}`);
          channel.appendLine(`📦 Backup Source: ${zipPath}`);
          channel.appendLine(
            `📁 Archive Path : ${extractResult.zipInternalPath}`,
          );
          channel.appendLine(
            "====================================================\n",
          );

          if (!diffResult.hasChanges) {
            channel.appendLine(
              "✅ All points and coordinates are 100% IDENTICAL!",
            );
            vscode.window.showInformationMessage(
              t("backup.notify.identical", fileName),
            );
          } else {
            channel.appendLine(
              `📊 Total Points Analyzed: ${diffResult.totalPositions}`,
            );
            channel.appendLine(
              "----------------------------------------------------",
            );

            diffResult.positionDiffs.forEach((item) => {
              if (item.status === "CHANGED" && item.deltas) {
                channel.appendLine(
                  `🔴 [CHANGED POINT] ${item.type} ${item.name}:`,
                );
                for (const [cKey, deltaInfo] of Object.entries(item.deltas)) {
                  const sign = deltaInfo.delta > 0 ? "+" : "";
                  channel.appendLine(
                    `     - ${cKey}: Workspace=${deltaInfo.workspace} | Backup=${deltaInfo.backup} (Delta: ${sign}${deltaInfo.delta})`,
                  );
                }
              } else if (item.status === "ADDED") {
                channel.appendLine(
                  `🟢 [NEW POINT IN WORKSPACE] ${item.type} ${item.name}`,
                );
              } else if (item.status === "REMOVED") {
                channel.appendLine(
                  `🟡 [REMOVED IN WORKSPACE] ${item.type} ${item.name} (Present in Backup)`,
                );
              }
            });

            channel.appendLine(
              "\n====================================================",
            );
            channel.show(true);

            vscode.window.showWarningMessage(
              `⚠️ Point differences detected in ${fileName}! Check Output channel "KRC Backup Point Diff" for details.`,
            );
          }
        }
      }),
    ),
  );
}
