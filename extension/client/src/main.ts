import vscode = require("vscode");
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind,
  State,
} from "vscode-languageclient/node";
import * as path from "path";
import { t } from "./i18n";

import { IOTreeProvider } from "./ioTreeView";
import { CommandsTreeProvider } from "./commandsTreeView";

import { cleanupUnusedVariables } from "./features/cleanup";

import { showCalculator } from "./features/calculator";
import { initErrorLens } from "./features/errorLens";
import { showSnippetGenerator } from "./features/snippetGenerator";
import { generateReport } from "./features/reportGenerator";
import { showFlowchartViewer } from "./features/flowchartViewer";
import { initLicense, ensurePremium } from "./features/license";
import { initEkiValidator } from "./features/ekiValidator";
import { initAiTools } from "./features/aiTools";
import { initKrcBackupDiff } from "./features/krcBackupDiff";
import { initControlCenter } from "./features/controlCenter";
import { TelegramChatService } from "./features/telegramService";
import { registerGitLensKrl } from "./features/gitLensKrl";
import { registerTelemetry } from "./features/telemetry";
import {
  convertToIiqkaFold,
  convertLegacyToSpline,
  unwrapFolds,
  insertCollisionGuard,
  insertSplineBlock,
} from "./features/foldTools";

// KRL tanılama koleksiyonu
const krlDiagnostics = vscode.languages.createDiagnosticCollection("krl");
let lsClient: LanguageClient;

export async function activate(context: vscode.ExtensionContext) {
  // Tree Views (Must register immediately to guarantee views and commands are populated)
  const ioTreeProvider = new IOTreeProvider();
  vscode.window.registerTreeDataProvider("krlIO", ioTreeProvider);
  context.subscriptions.push(
    vscode.commands.registerCommand("krl.refreshIOView", () => {
      ioTreeProvider.refresh();
    }),
    vscode.commands.registerCommand("krl.renameSignal", (item) => {
      ioTreeProvider.renameSignal(item);
    }),
  );

  const commandsTreeProvider = new CommandsTreeProvider();
  vscode.window.registerTreeDataProvider("krlCommands", commandsTreeProvider);

  // Initialize License System
  try {
    await initLicense(context);
  } catch (err) {
    console.error("Failed to initialize License system:", err);
  }

  // Initialize Error Lens
  try {
    initErrorLens(context);
  } catch (err) {
    console.error("Failed to initialize ErrorLens:", err);
  }

  // Initialize EthernetKRL Validator, AI Tools, KRC Backup Diff, Control Center & Telegram Chat
  try {
    initEkiValidator(context);
  } catch (err) {
    console.error("Failed to initialize EkiValidator:", err);
  }

  try {
    initAiTools(context);
  } catch (err) {
    console.error("Failed to initialize AiTools:", err);
  }

  try {
    initKrcBackupDiff(context);
  } catch (err) {
    console.error("Failed to initialize KrcBackupDiff:", err);
  }

  try {
    initControlCenter(context);
  } catch (err) {
    console.error("Failed to initialize ControlCenter:", err);
  }

  try {
    TelegramChatService.getInstance().init(context);
  } catch (err) {
    console.error("Failed to initialize TelegramService:", err);
  }

  try {
    registerGitLensKrl(context);
  } catch (err) {
    console.error("Failed to initialize GitLensKrl:", err);
  }

  try {
    registerTelemetry(context);
  } catch (err) {
    console.error("Failed to initialize Telemetry:", err);
  }

  // Sunucu yolunu belirle
  const serverPath = context.asAbsolutePath(
    path.join("server", "out", "core.js"),
  );

  const debugOptions = { execArgv: ["--nolazy", "--inspect=6009"] };
  const serverOptions: ServerOptions = {
    run: { module: serverPath, transport: TransportKind.stdio },
    debug: {
      module: serverPath,
      transport: TransportKind.stdio,
      options: debugOptions,
    },
  };

  // KRL için girinti kuralları
  vscode.languages.setLanguageConfiguration("krl", {
    indentationRules: {
      decreaseIndentPattern:
        /^\s*(ENDFOR|ELSE|ENDIF|ENDLOOP|UNTIL.*|ENDWHILE|ENDSWITCH|CASE.*|DEFAULT.*)(\s*;.*)?$/i,
      increaseIndentPattern:
        /^\s*(FOR.*|IF.*|ELSE|LOOP|REPEAT|WHILE.*|SWITCH.*|CASE.*|DEFAULT.*)(\s*;.*)?$/i,
    },
  });

  /**
   * Отправляет настройки на сервер.
   */
  function sendSettingsToServer() {
    if (lsClient.state === State.Running) {
      const config = vscode.workspace.getConfiguration("krl");
      lsClient.sendNotification("custom/updateSettings", {
        validateNonAscii: config.get<boolean>("validateNonAscii", true),
        separateBeforeBlocks: config.get<boolean>(
          "separateBeforeBlocks",
          false,
        ),
        separateAfterBlocks: config.get<boolean>("separateAfterBlocks", false),
        indentFolds: config.get<boolean>("indentFolds", true),
        alignAssignments: config.get<boolean>("alignAssignments", true),
        inlayHintsEnabled: config.get<boolean>("inlayHints.enabled", true),
        codeLensEnabled: config.get<boolean>("codeLens.enabled", true),
        callHierarchyEnabled: config.get<boolean>(
          "callHierarchy.enabled",
          true,
        ),
        documentHighlightsEnabled: config.get<boolean>(
          "documentHighlights.enabled",
          true,
        ),
      });
    }
  }

  // Слушаем изменения конфигурации
  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration("krl")) {
        sendSettingsToServer();
      }
    }),
  );

  const clientConfig: LanguageClientOptions = {
    documentSelector: [{ scheme: "file", language: "krl" }],
    synchronize: {
      fileEvents:
        vscode.workspace.createFileSystemWatcher("**/*.{dat,src,sub}"),
    },
  };

  lsClient = new LanguageClient(
    "krlContext",
    "KRL Language Support",
    serverOptions,
    clientConfig,
  );

  // =====================
  // Komut Kayıtları
  // =====================

  // Çalışma alanını doğrulama komutu
  context.subscriptions.push(
    vscode.commands.registerCommand("krl.validateWorkspace", () => {
      if (lsClient.state === State.Running) {
        lsClient.sendNotification("custom/validateWorkspace");
        vscode.window.showInformationMessage(t("info.checkingAllFiles"));
      } else {
        vscode.window.showErrorMessage(t("error.serverNotRunning"));
      }
    }),
    vscode.commands.registerCommand("krl.activateFileIcons", async () => {
      await vscode.workspace
        .getConfiguration("workbench")
        .update("iconTheme", "krl-icons", vscode.ConfigurationTarget.Global);
      vscode.window.showInformationMessage(
        "KUKA KRL: File Icons activated (.src, .dat, .sub, .kfd)!"
      );
    }),
  );

  // Belgeyi biçimlendir komutu
  context.subscriptions.push(
    vscode.commands.registerCommand("krl.formatDocument", async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor || editor.document.languageId !== "krl") {
        vscode.window.showWarningMessage(t("warning.noActiveKrlFile"));
        return;
      }
      await vscode.commands.executeCommand("editor.action.formatDocument");
      vscode.window.showInformationMessage(t("info.documentFormatted"));
    }),
  );

  // Sondaki boşlukları kaldır komutu
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "krl.removeTrailingWhitespace",
      async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor || editor.document.languageId !== "krl") {
          vscode.window.showWarningMessage(t("warning.noActiveKrlFile"));
          return;
        }

        const document = editor.document;
        const edits: vscode.TextEdit[] = [];

        for (let i = 0; i < document.lineCount; i++) {
          const line = document.lineAt(i);
          const trimmedLength = line.text.trimEnd().length;
          if (trimmedLength < line.text.length) {
            edits.push(
              vscode.TextEdit.delete(
                new vscode.Range(i, trimmedLength, i, line.text.length),
              ),
            );
          }
        }

        if (edits.length > 0) {
          const edit = new vscode.WorkspaceEdit();
          edit.set(document.uri, edits);
          await vscode.workspace.applyEdit(edit);
          vscode.window.showInformationMessage(
            t("info.trailingWhitespaceRemoved", edits.length),
          );
        } else {
          vscode.window.showInformationMessage(t("info.noTrailingWhitespace"));
        }
      },
    ),
  );

  // KUKA Git Metadata Cleaner
  // Katlama komutları (safe registration)
  try {
    context.subscriptions.push(
      vscode.commands.registerCommand("krl.foldAll", () =>
        vscode.commands.executeCommand("editor.foldAll"),
      ),
      vscode.commands.registerCommand("krl.unfoldAll", () =>
        vscode.commands.executeCommand("editor.unfoldAll"),
      ),
      vscode.commands.registerCommand("krl.findReferences", () =>
        vscode.commands.executeCommand("editor.action.referenceSearch.trigger"),
      ),
    );
  } catch {
    /* Fold commands already registered */
  }
  context.subscriptions.push(
    vscode.commands.registerCommand("krl.sendSelectionToChat", async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor || editor.selection.isEmpty) {
        vscode.window.showInformationMessage(
          t("chat.sendSelection.noSelection"),
        );
        return;
      }
      const selection = editor.document.getText(editor.selection);
      const startLine = editor.selection.start.line + 1;
      const endLine = editor.selection.end.line + 1;
      const fileName = require("path").basename(editor.document.fileName);
      const ext = fileName.split(".").pop() || "txt";
      const msg = `[${fileName}:${startLine}-${endLine}]\n\`\`\`${ext}\n${selection}\n\`\`\``;

      const input = await vscode.window.showInputBox({
        prompt: t("chat.sendSelection.prompt"),
      });
      const finalMsg = input ? `${input}\n\n${msg}` : msg;

      const service = TelegramChatService.getInstance();
      await service.sendMessage(finalMsg);
      vscode.window.showInformationMessage(t("chat.sendSelection.success"));
    }),
    vscode.commands.registerCommand("krl.cleanGitMetadata", async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor || editor.document.languageId !== "krl") {
        vscode.window.showWarningMessage(t("warning.noActiveKrlFile"));
        return;
      }

      const document = editor.document;
      const edits: vscode.TextEdit[] = [];
      const metadataRegex = /^&(ACCESS|REL|PARAM|COMMENT)\b/;

      for (let i = 0; i < document.lineCount; i++) {
        const line = document.lineAt(i);
        if (metadataRegex.test(line.text.trim())) {
          // Delete the line including the newline character if it's not the last line
          const range = line.rangeIncludingLineBreak;
          edits.push(vscode.TextEdit.delete(range));
        }
      }

      if (edits.length > 0) {
        const edit = new vscode.WorkspaceEdit();
        edit.set(document.uri, edits);
        await vscode.workspace.applyEdit(edit);
        vscode.window.showInformationMessage(
          `Removed ${edits.length} KUKA metadata line(s) for a clean Git commit.`,
        );
      } else {
        vscode.window.showInformationMessage("No KUKA metadata lines found.");
      }
    }),
  );

  // Smart Declaration Sorter for KRL .dat files (Pro Industrial Edition)
  context.subscriptions.push(
    vscode.commands.registerCommand("krl.sortDeclarations", async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor || editor.document.languageId !== "krl") {
        vscode.window.showWarningMessage(t("warning.noActiveKrlFile"));
        return;
      }

      const document = editor.document;
      const text = document.getText();
      const lines = text.split(/\r?\n/);

      let defdatStart = -1;
      let defdatEnd = -1;

      for (let i = 0; i < lines.length; i++) {
        if (/^\s*DEFDAT\b/i.test(lines[i])) defdatStart = i;
        else if (/^\s*ENDDAT\b/i.test(lines[i])) {
          defdatEnd = i;
          break;
        }
      }

      if (
        defdatStart === -1 ||
        defdatEnd === -1 ||
        defdatEnd <= defdatStart + 1
      ) {
        vscode.window.showInformationMessage(t("info.noDeclarationsToSort"));
        return;
      }

      interface DeclBlock {
        type: string;
        category: number; // 0: SIGNAL, 1: Primitive, 2: Geometry/Complex/Struct
        varName: string;
        channelNum: number;
        startIndex: number;
        endIndex: number;
        lines: string[];
      }

      const sortedEdits: { start: number; end: number; content: string }[] = [];
      let pendingComments: { text: string; index: number }[] = [];
      let currentSectionBlocks: DeclBlock[] = [];
      let foldDepth = 0;

      const flushCurrentSection = () => {
        if (currentSectionBlocks.length < 2) {
          currentSectionBlocks = [];
          return;
        }

        const typePriority = [
          "ENUM",
          "STRUC",
          "INT",
          "REAL",
          "BOOL",
          "CHAR",
          "STRING",
          "FRAME",
          "POS",
          "E6POS",
          "AXIS",
          "E6AXIS",
          "LOAD",
          "PDAT",
          "LDAT",
          "FDAT",
          "ODAT",
          "ADAT",
        ];

        currentSectionBlocks.sort((a, b) => {
          if (a.category !== b.category) return a.category - b.category;
          if (a.category === 0) return a.channelNum - b.channelNum; // SIGNAL by I/O channel number

          const prioA = typePriority.indexOf(a.type);
          const prioB = typePriority.indexOf(b.type);
          if (prioA !== prioB && prioA !== -1 && prioB !== -1)
            return prioA - prioB;

          return a.varName.localeCompare(b.varName);
        });

        const firstIdx = currentSectionBlocks[0].startIndex;
        const lastIdx =
          currentSectionBlocks[currentSectionBlocks.length - 1].endIndex;
        const content = currentSectionBlocks
          .map((b) => b.lines.join("\n"))
          .join("\n\n");

        sortedEdits.push({ start: firstIdx, end: lastIdx, content });
        currentSectionBlocks = [];
      };

      for (let i = defdatStart + 1; i < defdatEnd; i++) {
        const line = lines[i];
        const trimmed = line.trim();

        // Track FOLD blocks to avoid messing up KSS internal system FOLDs
        if (trimmed.toUpperCase().startsWith(";FOLD")) {
          foldDepth++;
          flushCurrentSection();
          pendingComments = [];
          continue;
        }
        if (trimmed.toUpperCase().startsWith(";ENDFOLD")) {
          if (foldDepth > 0) foldDepth--;
          flushCurrentSection();
          pendingComments = [];
          continue;
        }

        // Inside protected FOLD block, skip sorting to preserve KSS system integrity
        if (foldDepth > 0) {
          continue;
        }

        if (trimmed.startsWith(";")) {
          pendingComments.push({ text: line, index: i });
          continue;
        }

        if (!trimmed) {
          flushCurrentSection();
          pendingComments = [];
          continue;
        }

        // Broad Declaration Regexp supporting built-in and custom structs/enums/signals
        const declMatch = trimmed.match(
          /^\s*(?:GLOBAL\s+)?(?:DECL\s+)?(?:GLOBAL\s+)?([a-zA-Z0-9_]+)\s+([a-zA-Z0-9_]+)/i,
        );

        const isSignal = trimmed.toUpperCase().startsWith("SIGNAL");
        const isStrucOrEnum = /^\s*(?:STRUC|ENUM|EXT)\b/i.test(trimmed);

        if (declMatch || isSignal || isStrucOrEnum) {
          let type = declMatch ? declMatch[1].toUpperCase() : "DECL";
          let varName = declMatch ? declMatch[2] : "";

          if (isSignal) {
            type = "SIGNAL";
            const sigNameMatch = trimmed.match(/^SIGNAL\s+([a-zA-Z0-9_]+)/i);
            if (sigNameMatch) varName = sigNameMatch[1];
          } else if (isStrucOrEnum) {
            const strucMatch = trimmed.match(
              /^(?:STRUC|ENUM|EXT)\s+([a-zA-Z0-9_]+)/i,
            );
            if (strucMatch) {
              type = trimmed.split(/\s+/)[0].toUpperCase();
              varName = strucMatch[1];
            }
          }

          let category = 1;
          if (type === "SIGNAL") category = 0;
          else if (
            [
              "FRAME",
              "POS",
              "E6POS",
              "AXIS",
              "E6AXIS",
              "LOAD",
              "PDAT",
              "LDAT",
              "FDAT",
              "ODAT",
            ].includes(type)
          )
            category = 2;

          let channelNum = 0;
          if (type === "SIGNAL") {
            const inMatch = trimmed.match(/\$IN\[(\d+)\]/i);
            const outMatch = trimmed.match(/\$OUT\[(\d+)\]/i);
            if (inMatch) channelNum = parseInt(inMatch[1], 10);
            else if (outMatch) channelNum = 100000 + parseInt(outMatch[1], 10);
          }

          const blockLines: string[] = [];
          const blockStartIndex =
            pendingComments.length > 0 ? pendingComments[0].index : i;

          pendingComments.forEach((c) => blockLines.push(c.text));
          pendingComments = [];

          blockLines.push(line);

          // Collect array / struct element initializations (e.g. BASE_DATA[1]={...})
          let j = i + 1;
          while (j < defdatEnd && varName) {
            const nextLine = lines[j].trim();
            if (nextLine.startsWith(";") || !nextLine) break;
            const initMatch = nextLine.match(new RegExp(`^${varName}\\[`, "i"));
            if (initMatch) {
              blockLines.push(lines[j]);
              j++;
            } else {
              break;
            }
          }

          const blockEndIndex = j - 1;
          i = blockEndIndex;

          currentSectionBlocks.push({
            type,
            category,
            varName,
            channelNum,
            startIndex: blockStartIndex,
            endIndex: blockEndIndex,
            lines: blockLines,
          });
        } else {
          flushCurrentSection();
          pendingComments = [];
        }
      }

      flushCurrentSection();

      if (sortedEdits.length === 0) {
        vscode.window.showInformationMessage(t("info.noDeclarationsToSort"));
        return;
      }

      const edit = new vscode.WorkspaceEdit();
      // Apply edits in reverse order so line offsets stay accurate
      sortedEdits.reverse().forEach((se) => {
        const range = new vscode.Range(
          se.start,
          0,
          se.end,
          lines[se.end].length,
        );
        edit.replace(document.uri, range, se.content);
      });

      await vscode.workspace.applyEdit(edit);
      vscode.window.showInformationMessage(
        t("info.declarationsSorted", sortedEdits.length),
      );
    }),
  );

  // Clean up unused variables command
  context.subscriptions.push(
    vscode.commands.registerCommand("krl.cleanupUnusedVariables", () => {
      cleanupUnusedVariables();
    }),
  );

  // Calculator
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "krl.showCalculator",
      ensurePremium(() => {
        showCalculator(context);
      }),
    ),
  );

  // Snippet Generator
  context.subscriptions.push(
    vscode.commands.registerCommand("krl.openSnippetGenerator", () => {
      showSnippetGenerator(context);
    }),
  );

  // Report Generator
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "krl.generateReport",
      ensurePremium(() => {
        generateReport();
      }),
    ),
  );

  // Flowchart Viewer
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "krl.showFlowchart",
      ensurePremium(() => {
        showFlowchartViewer(context, lsClient);
      }),
    ),
  );

  // FOLD bölgesi ekle komutu
  context.subscriptions.push(
    vscode.commands.registerCommand("krl.insertFold", async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor || editor.document.languageId !== "krl") {
        vscode.window.showWarningMessage(t("warning.noActiveKrlFile"));
        return;
      }

      const name = await vscode.window.showInputBox({
        prompt: t("prompt.foldRegionName"),
        placeHolder: t("prompt.foldRegionPlaceholder"),
      });

      if (!name) return;

      const selection = editor.selection;
      const selectedText = editor.document.getText(selection);
      const indent =
        editor.document.lineAt(selection.start.line).text.match(/^\s*/)?.[0] ||
        "";

      const foldText = selectedText
        ? `${indent};FOLD ${name}\n${selectedText}\n${indent};ENDFOLD\n`
        : `${indent};FOLD ${name}\n${indent}\n${indent};ENDFOLD\n`;

      await editor.edit((editBuilder) => {
        if (selectedText) {
          editBuilder.replace(selection, foldText);
        } else {
          editBuilder.insert(selection.active, foldText);
        }
      });
    }),
    vscode.commands.registerCommand(
      "krl.convertToIiqkaFold",
      convertToIiqkaFold,
    ),
    vscode.commands.registerCommand(
      "krl.convertLegacyToSpline",
      convertLegacyToSpline,
    ),
    vscode.commands.registerCommand("krl.unwrapFold", unwrapFolds),
    vscode.commands.registerCommand(
      "krl.insertCollisionGuard",
      insertCollisionGuard,
    ),
    vscode.commands.registerCommand("krl.insertSplineBlock", insertSplineBlock),
  );

  // =====================
  // Otomatik İşlemler
  // =====================

  // Otomatik katlama işleyicisi
  const handleAutoFold = () => {
    const config = vscode.workspace.getConfiguration("krl");
    if (config.get<boolean>("autoFold", true)) {
      setTimeout(() => {
        vscode.commands.executeCommand("editor.foldAll");
      }, 500);
    }
  };

  context.subscriptions.push(
    vscode.workspace.onDidOpenTextDocument((doc) => {
      if (doc.languageId === "krl") {
        runSyntaxCheck(doc);
        handleAutoFold();
      }
    }),
  );

  let syntaxCheckTimeout: NodeJS.Timeout | undefined;

  context.subscriptions.push(
    vscode.workspace.onDidChangeTextDocument((e) => {
      if (e.document.languageId === "krl") {
        if (syntaxCheckTimeout) {
          clearTimeout(syntaxCheckTimeout);
        }
        syntaxCheckTimeout = setTimeout(() => {
          runSyntaxCheck(e.document);
          if (lsClient.state === State.Running) {
            lsClient.sendNotification("custom/validateFile", {
              uri: e.document.uri.toString(),
              text: e.document.getText(),
            });
          }
        }, 500);
      }
    }),
  );

  // Kaydetme öncesi işlemler
  context.subscriptions.push(
    vscode.workspace.onWillSaveTextDocument((e) => {
      if (e.document.languageId !== "krl") return;

      const config = vscode.workspace.getConfiguration("krl");

      // Sondaki boşlukları otomatik kaldır
      if (config.get<boolean>("removeTrailingWhitespaceOnFormat", true)) {
        const edits: vscode.TextEdit[] = [];
        for (let i = 0; i < e.document.lineCount; i++) {
          const line = e.document.lineAt(i);
          const trimmedLength = line.text.trimEnd().length;
          if (trimmedLength < line.text.length) {
            edits.push(
              vscode.TextEdit.delete(
                new vscode.Range(i, trimmedLength, i, line.text.length),
              ),
            );
          }
        }
        if (edits.length > 0) {
          e.waitUntil(Promise.resolve(edits));
        }
      }
    }),
  );

  // Formatter Status Bar Item (Prettier-style indicator for KRL files)
  const formatterStatusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100,
  );
  formatterStatusBarItem.command = "editor.action.formatDocument";
  context.subscriptions.push(formatterStatusBarItem);

  const updateFormatterStatusBar = (editor?: vscode.TextEditor) => {
    if (editor && editor.document.languageId === "krl") {
      const indentWidth = vscode.workspace
        .getConfiguration("krl")
        .get<number>("indentWidth", 3);
      formatterStatusBarItem.text = `$(sparkle) KRL: ${indentWidth}sp`;
      formatterStatusBarItem.tooltip = `KUKA KRL Formatter (${indentWidth} spaces). Click to Format Document (Shift+Alt+F)`;
      formatterStatusBarItem.show();
    } else {
      formatterStatusBarItem.hide();
    }
  };

  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor(updateFormatterStatusBar),
  );
  updateFormatterStatusBar(vscode.window.activeTextEditor);

  lsClient
    .start()
    .then(() => {
      // Отправляем локаль на сервер
      lsClient.sendNotification("custom/setLocale", vscode.env.language);

      // Отправляем настройки на сервер после запуска
      sendSettingsToServer();

      vscode.workspace.textDocuments.forEach((doc) => {
        if (doc.languageId === "krl") {
          runSyntaxCheck(doc);
        }
      });

      // Validate workspace immediately on startup
      lsClient.sendNotification("custom/validateWorkspace");
    })
    .catch((err) => {
      const msg = err instanceof Error ? err.message : String(err);
      vscode.window.showErrorMessage(
        `KRL Language Server failed to start: ${msg}`,
      );
    });

  context.subscriptions.push(krlDiagnostics);
}

export function deactivate(): Thenable<void> | undefined {
  krlDiagnostics.clear();
  krlDiagnostics.dispose();
  if (!lsClient) {
    return undefined;
  }
  return lsClient.stop();
}

/**
 * İstemci tarafında hafif sözdizimi kontrolü.
 */
function runSyntaxCheck(document: vscode.TextDocument): void {
  const issues: vscode.Diagnostic[] = [];

  for (let i = 0; i < document.lineCount; i++) {
    const line = document.lineAt(i);
    const text = stripKrlComment(line.text).trim();

    if (!text) continue;

    // Skip KUKA system lines (&ACCESS, &COMMENT, etc.)
    if (text.startsWith("&")) continue;

    // GLOBAL kullanımını kontrol et
    if (/\bGLOBAL\b/i.test(text)) {
      const validContext =
        /\b(DECL|DEF|DEFFCT|STRUC|SIGNAL|ENUM)\b/i.test(text) ||
        /\b(INT|REAL|FRAME|CHAR|BOOL|STRING|E6AXIS|E6POS|AXIS|LOAD|POS)\b/i.test(
          text,
        );
      if (!validContext) {
        const idx = line.text.toUpperCase().indexOf("GLOBAL");
        issues.push(
          new vscode.Diagnostic(
            new vscode.Range(i, idx, i, idx + 6),
            t("warning.invalidGlobalUsage"),
            vscode.DiagnosticSeverity.Warning,
          ),
        );
      }
    }
  }

  krlDiagnostics.set(document.uri, issues);
}

/**
 * Убирает комментарий из строки KRL, учитывая строковые литералы.
 * Символ `;` внутри `"..."` не считается началом комментария.
 */
function stripKrlComment(line: string): string {
  let inString = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inString = !inString;
    } else if (ch === ";" && !inString) {
      return line.substring(0, i);
    }
  }
  return line;
}
