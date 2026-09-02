/**
 * Error Lens Pro for KUKA KRL
 * High-performance, ergonomic diagnostic visualizer with background highlights,
 * gutter icons, debounce delays, follow-cursor modes, alignment, status bar integration,
 * and quick productivity actions.
 */

import * as vscode from "vscode";
import * as path from "path";

let errorDecorations: vscode.TextEditorDecorationType | undefined;
let warningDecorations: vscode.TextEditorDecorationType | undefined;
let infoDecorations: vscode.TextEditorDecorationType | undefined;
let hintDecorations: vscode.TextEditorDecorationType | undefined;
let safetyDecorations: vscode.TextEditorDecorationType | undefined;

let statusBarItem: vscode.StatusBarItem | undefined;
let debounceTimer: NodeJS.Timeout | undefined;

/**
 * Initialize Error Lens feature
 */
export function initErrorLens(context: vscode.ExtensionContext): void {
  // Initialize Decoration Types
  recreateDecorationTypes(context);

  // Initialize Status Bar Item
  statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100,
  );
  statusBarItem.command = "editor.action.marker.nextInFiles";
  context.subscriptions.push(statusBarItem);

  // Register Error Lens Commands
  registerErrorLensCommands(context);

  // Event: Diagnostics Change
  context.subscriptions.push(
    vscode.languages.onDidChangeDiagnostics((e) => {
      const editor = vscode.window.activeTextEditor;
      if (
        editor &&
        editor.document.languageId === "krl" &&
        e.uris.some((uri) => uri.toString() === editor.document.uri.toString())
      ) {
        const config = vscode.workspace.getConfiguration("krl");
        if (config.get<boolean>("errorLens.onSave", false)) {
          // If onSave mode is enabled, ignore live diagnostics changes
          return;
        }
        triggerUpdate(editor, false);
      }
    }),
  );

  // Event: Active Text Editor Change
  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor((editor) => {
      if (editor && editor.document.languageId === "krl") {
        triggerUpdate(editor, true);
      } else if (statusBarItem) {
        statusBarItem.hide();
      }
    }),
  );

  // Event: Cursor Selection Change (for followCursor modes & status bar updates)
  context.subscriptions.push(
    vscode.window.onDidChangeTextEditorSelection((e) => {
      if (e.textEditor.document.languageId === "krl") {
        const config = vscode.workspace.getConfiguration("krl");
        const followCursor = config.get<string>(
          "errorLens.followCursor",
          "allLines",
        );
        if (followCursor !== "allLines") {
          // Re-render immediately on cursor move if cursor-filtering is active
          triggerUpdate(e.textEditor, true);
        } else {
          updateStatusBar(e.textEditor);
        }
      }
    }),
  );

  // Event: Document Save (for onSave mode)
  context.subscriptions.push(
    vscode.workspace.onDidSaveTextDocument((doc) => {
      const editor = vscode.window.activeTextEditor;
      if (editor && editor.document.uri.toString() === doc.uri.toString()) {
        triggerUpdate(editor, true);
      }
    }),
  );

  // Event: Configuration Change
  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration("krl.errorLens")) {
        recreateDecorationTypes(context);
        const editor = vscode.window.activeTextEditor;
        if (editor && editor.document.languageId === "krl") {
          triggerUpdate(editor, true);
        }
      }
    }),
  );

  // Initial Update
  if (
    vscode.window.activeTextEditor &&
    vscode.window.activeTextEditor.document.languageId === "krl"
  ) {
    triggerUpdate(vscode.window.activeTextEditor, true);
  }
}

/**
 * Recreates VS Code TextEditorDecorationTypes based on current configuration
 */
function recreateDecorationTypes(context: vscode.ExtensionContext): void {
  // Dispose previous decoration types
  if (errorDecorations) errorDecorations.dispose();
  if (warningDecorations) warningDecorations.dispose();
  if (infoDecorations) infoDecorations.dispose();
  if (hintDecorations) hintDecorations.dispose();
  if (safetyDecorations) safetyDecorations.dispose();

  const config = vscode.workspace.getConfiguration("krl");
  const bgMode = config.get<string>("errorLens.messageBackgroundMode", "line");
  const gutterEnabled = config.get<boolean>(
    "errorLens.gutterIconsEnabled",
    true,
  );
  const isItalic = config.get<boolean>("errorLens.fontStyleItalic", true);

  const errorGutter = gutterEnabled
    ? vscode.Uri.file(
        path.join(context.extensionPath, "client", "icons", "error.svg"),
      )
    : undefined;
  const warningGutter = gutterEnabled
    ? vscode.Uri.file(
        path.join(context.extensionPath, "client", "icons", "warning.svg"),
      )
    : undefined;
  const infoGutter = gutterEnabled
    ? vscode.Uri.file(
        path.join(context.extensionPath, "client", "icons", "info.svg"),
      )
    : undefined;
  const hintGutter = gutterEnabled
    ? vscode.Uri.file(
        path.join(context.extensionPath, "client", "icons", "hint.svg"),
      )
    : undefined;
  const safetyGutter = gutterEnabled
    ? vscode.Uri.file(
        path.join(context.extensionPath, "client", "icons", "safety.svg"),
      )
    : undefined;

  const fontStyle = isItalic ? "italic" : "normal";

  // Error Decoration Type
  errorDecorations = vscode.window.createTextEditorDecorationType({
    isWholeLine: bgMode === "line",
    backgroundColor: bgMode === "line" ? "rgba(255, 82, 82, 0.12)" : undefined,
    gutterIconPath: errorGutter,
    gutterIconSize: "contain",
    after: {
      margin: "0 0 0 2em",
      color: "#ff6b6b",
      fontStyle,
      backgroundColor:
        bgMode === "message" ? "rgba(255, 82, 82, 0.22)" : undefined,
    },
  });

  // Warning Decoration Type
  warningDecorations = vscode.window.createTextEditorDecorationType({
    isWholeLine: bgMode === "line",
    backgroundColor: bgMode === "line" ? "rgba(255, 193, 7, 0.12)" : undefined,
    gutterIconPath: warningGutter,
    gutterIconSize: "contain",
    after: {
      margin: "0 0 0 2em",
      color: "#ffa502",
      fontStyle,
      backgroundColor:
        bgMode === "message" ? "rgba(255, 193, 7, 0.22)" : undefined,
    },
  });

  // Info Decoration Type
  infoDecorations = vscode.window.createTextEditorDecorationType({
    isWholeLine: bgMode === "line",
    backgroundColor: bgMode === "line" ? "rgba(33, 150, 243, 0.10)" : undefined,
    gutterIconPath: infoGutter,
    gutterIconSize: "contain",
    after: {
      margin: "0 0 0 2em",
      color: "#70a1ff",
      fontStyle,
      backgroundColor:
        bgMode === "message" ? "rgba(33, 150, 243, 0.20)" : undefined,
    },
  });

  // Hint Decoration Type
  hintDecorations = vscode.window.createTextEditorDecorationType({
    isWholeLine: bgMode === "line",
    backgroundColor: bgMode === "line" ? "rgba(46, 204, 113, 0.08)" : undefined,
    gutterIconPath: hintGutter,
    gutterIconSize: "contain",
    after: {
      margin: "0 0 0 2em",
      color: "#2ecc71",
      fontStyle,
      backgroundColor:
        bgMode === "message" ? "rgba(46, 204, 113, 0.18)" : undefined,
    },
  });

  // Safety Decoration Type
  safetyDecorations = vscode.window.createTextEditorDecorationType({
    isWholeLine: bgMode === "line",
    backgroundColor: bgMode === "line" ? "rgba(231, 76, 60, 0.16)" : undefined,
    gutterIconPath: safetyGutter,
    gutterIconSize: "contain",
    after: {
      margin: "0 0 0 2em",
      color: "#ff4757",
      fontStyle,
      fontWeight: "bold",
      backgroundColor:
        bgMode === "message" ? "rgba(231, 76, 60, 0.28)" : undefined,
    },
  });

  context.subscriptions.push(
    errorDecorations,
    warningDecorations,
    infoDecorations,
    hintDecorations,
    safetyDecorations,
  );
}

/**
 * Triggers Error Lens update with debounce delay
 */
function triggerUpdate(editor: vscode.TextEditor, immediate: boolean): void {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
    debounceTimer = undefined;
  }

  if (immediate) {
    updateErrorLensDecorations(editor);
  } else {
    const config = vscode.workspace.getConfiguration("krl");
    const delay = config.get<number>("errorLens.delay", 300);
    debounceTimer = setTimeout(
      () => {
        updateErrorLensDecorations(editor);
      },
      Math.max(0, delay),
    );
  }
}

/**
 * Update Error Lens decorations for the given editor
 */
function updateErrorLensDecorations(editor: vscode.TextEditor): void {
  const config = vscode.workspace.getConfiguration("krl");
  const isEnabled = config.get<boolean>("errorLens.enabled", true);

  if (!isEnabled || editor.document.languageId !== "krl") {
    clearDecorations(editor);
    updateStatusBar(editor);
    return;
  }

  const inlineMsgEnabled = config.get<boolean>(
    "errorLens.inlineMessageEnabled",
    true,
  );
  const followCursor = config.get<string>("errorLens.followCursor", "allLines");
  const alignCol = config.get<number>("errorLens.alignMessage", 0);
  const msgTemplate = config.get<string>(
    "errorLens.messageTemplate",
    "$message",
  );
  const maxChars = config.get<number>("errorLens.maxCharsPerLine", 120);

  const diagnostics = vscode.languages.getDiagnostics(editor.document.uri);
  const cursorLine = editor.selection.active.line;

  // Filter diagnostics based on followCursor setting
  let filteredDiagnostics = diagnostics;
  if (followCursor === "activeLine") {
    filteredDiagnostics = diagnostics.filter(
      (d) => d.range.start.line === cursorLine,
    );
  } else if (followCursor === "closestProblem" && diagnostics.length > 0) {
    let closestLine = diagnostics[0].range.start.line;
    let minDiff = Math.abs(closestLine - cursorLine);
    for (const d of diagnostics) {
      const diff = Math.abs(d.range.start.line - cursorLine);
      if (diff < minDiff) {
        minDiff = diff;
        closestLine = d.range.start.line;
      }
    }
    filteredDiagnostics = diagnostics.filter(
      (d) => d.range.start.line === closestLine,
    );
  }

  const errors: vscode.DecorationOptions[] = [];
  const warnings: vscode.DecorationOptions[] = [];
  const infos: vscode.DecorationOptions[] = [];
  const hints: vscode.DecorationOptions[] = [];
  const safeties: vscode.DecorationOptions[] = [];

  // Group diagnostics by line (show highest severity per line)
  const lineToDiagMap = new Map<number, vscode.Diagnostic>();
  for (const diagnostic of filteredDiagnostics) {
    const line = diagnostic.range.start.line;
    const existing = lineToDiagMap.get(line);
    if (!existing || diagnostic.severity < existing.severity) {
      lineToDiagMap.set(line, diagnostic);
    }
  }

  for (const [line, diagnostic] of lineToDiagMap) {
    if (line >= editor.document.lineCount) continue;
    const lineText = editor.document.lineAt(line).text;

    // Format inline text
    let formattedText = "";
    if (inlineMsgEnabled) {
      const msgContent = formatDiagnosticMessage(
        diagnostic,
        msgTemplate,
        maxChars,
      );
      const prefix = getAlignmentPrefix(lineText, alignCol);
      formattedText = `${prefix}← ${msgContent}`;
    }

    const decoration: vscode.DecorationOptions = {
      range: new vscode.Range(line, 0, line, lineText.length),
      renderOptions: inlineMsgEnabled
        ? {
            after: {
              contentText: formattedText,
            },
          }
        : undefined,
    };

    // Check if diagnostic is a critical safety rule
    const isSafety =
      (diagnostic.source &&
        diagnostic.source.toLowerCase().includes("safety")) ||
      (typeof diagnostic.code === "string" &&
        (diagnostic.code.startsWith("SAF_") ||
          diagnostic.code.startsWith("VEL_")));

    if (isSafety) {
      safeties.push(decoration);
    } else {
      switch (diagnostic.severity) {
        case vscode.DiagnosticSeverity.Error:
          errors.push(decoration);
          break;
        case vscode.DiagnosticSeverity.Warning:
          warnings.push(decoration);
          break;
        case vscode.DiagnosticSeverity.Information:
          infos.push(decoration);
          break;
        case vscode.DiagnosticSeverity.Hint:
          hints.push(decoration);
          break;
      }
    }
  }

  if (errorDecorations) editor.setDecorations(errorDecorations, errors);
  if (warningDecorations) editor.setDecorations(warningDecorations, warnings);
  if (infoDecorations) editor.setDecorations(infoDecorations, infos);
  if (hintDecorations) editor.setDecorations(hintDecorations, hints);
  if (safetyDecorations) editor.setDecorations(safetyDecorations, safeties);

  updateStatusBar(editor);
}

/**
 * Format diagnostic message using template and character limits
 */
function formatDiagnosticMessage(
  diagnostic: vscode.Diagnostic,
  template: string,
  maxChars: number,
): string {
  let severityLabel = "Error";
  switch (diagnostic.severity) {
    case vscode.DiagnosticSeverity.Error:
      severityLabel = "Error";
      break;
    case vscode.DiagnosticSeverity.Warning:
      severityLabel = "Warning";
      break;
    case vscode.DiagnosticSeverity.Information:
      severityLabel = "Info";
      break;
    case vscode.DiagnosticSeverity.Hint:
      severityLabel = "Hint";
      break;
  }

  let text = template
    .replace("$message", diagnostic.message)
    .replace("$code", diagnostic.code ? String(diagnostic.code) : "")
    .replace("$source", diagnostic.source || "KRL")
    .replace("$severity", severityLabel);

  if (maxChars > 0 && text.length > maxChars) {
    text = text.substring(0, maxChars - 3) + "...";
  }

  return text;
}

/**
 * Calculate spacing for column alignment
 */
function getAlignmentPrefix(lineText: string, alignCol: number): string {
  if (alignCol <= 0) {
    return "  ";
  }
  const currentLen = lineText.length;
  const padding = Math.max(2, alignCol - currentLen);
  return " ".repeat(padding);
}

/**
 * Update Status Bar indicator for active KRL document
 */
function updateStatusBar(editor?: vscode.TextEditor): void {
  if (!statusBarItem) return;

  const config = vscode.workspace.getConfiguration("krl");
  const isEnabled = config.get<boolean>("errorLens.enabled", true);
  const statusBarEnabled = config.get<boolean>(
    "errorLens.statusBarEnabled",
    true,
  );

  if (
    !isEnabled ||
    !statusBarEnabled ||
    !editor ||
    editor.document.languageId !== "krl"
  ) {
    statusBarItem.hide();
    return;
  }

  const diagnostics = vscode.languages.getDiagnostics(editor.document.uri);
  const errors = diagnostics.filter(
    (d) => d.severity === vscode.DiagnosticSeverity.Error,
  ).length;
  const warnings = diagnostics.filter(
    (d) => d.severity === vscode.DiagnosticSeverity.Warning,
  ).length;

  const cursorLine = editor.selection.active.line;
  const lineDiags = diagnostics.filter(
    (d) => d.range.start.line === cursorLine,
  );

  if (lineDiags.length > 0) {
    const mainDiag = lineDiags[0];
    const icon =
      mainDiag.severity === vscode.DiagnosticSeverity.Error
        ? "$(error)"
        : mainDiag.severity === vscode.DiagnosticSeverity.Warning
          ? "$(warning)"
          : "$(info)";

    const shortMsg =
      mainDiag.message.length > 40
        ? mainDiag.message.substring(0, 37) + "..."
        : mainDiag.message;

    statusBarItem.text = `${icon} L${cursorLine + 1}: ${shortMsg}`;
    statusBarItem.tooltip = `KRL Diagnostic (Line ${cursorLine + 1}):\n${mainDiag.message}\nSource: ${mainDiag.source || "KRL"}\n\nClick to jump to next problem.`;
  } else if (errors > 0 || warnings > 0) {
    statusBarItem.text = `$(error) ${errors} $(warning) ${warnings}`;
    statusBarItem.tooltip = `KRL Workspace Diagnostics:\n• ${errors} errors\n• ${warnings} warnings\n\nClick to jump to next problem.`;
  } else {
    statusBarItem.text = `$(check) KRL Clean`;
    statusBarItem.tooltip = `KRL Document is valid.\nZero syntax or safety violations.`;
  }

  statusBarItem.show();
}

/**
 * Clear all Error Lens decorations
 */
function clearDecorations(editor: vscode.TextEditor): void {
  if (errorDecorations) editor.setDecorations(errorDecorations, []);
  if (warningDecorations) editor.setDecorations(warningDecorations, []);
  if (infoDecorations) editor.setDecorations(infoDecorations, []);
  if (hintDecorations) editor.setDecorations(hintDecorations, []);
  if (safetyDecorations) editor.setDecorations(safetyDecorations, []);
}

/**
 * Register Error Lens commands & quick actions
 */
function registerErrorLensCommands(context: vscode.ExtensionContext): void {
  // Command: Toggle Error Lens
  context.subscriptions.push(
    vscode.commands.registerCommand("krl.errorLens.toggle", async () => {
      const config = vscode.workspace.getConfiguration("krl");
      const current = config.get<boolean>("errorLens.enabled", true);
      await config.update(
        "errorLens.enabled",
        !current,
        vscode.ConfigurationTarget.Global,
      );
      vscode.window.showInformationMessage(
        !current ? "KRL Error Lens: Enabled" : "KRL Error Lens: Disabled",
      );
    }),
  );

  // Command: Toggle Inline Message Text
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "krl.errorLens.toggleInlineMessage",
      async () => {
        const config = vscode.workspace.getConfiguration("krl");
        const current = config.get<boolean>(
          "errorLens.inlineMessageEnabled",
          true,
        );
        await config.update(
          "errorLens.inlineMessageEnabled",
          !current,
          vscode.ConfigurationTarget.Global,
        );
        vscode.window.showInformationMessage(
          !current
            ? "KRL Inline Messages: Enabled"
            : "KRL Inline Messages: Disabled",
        );
      },
    ),
  );

  // Command: Copy Problem Message at cursor
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "krl.errorLens.copyProblemMessage",
      async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor || editor.document.languageId !== "krl") return;

        const diagnostics = vscode.languages.getDiagnostics(
          editor.document.uri,
        );
        const cursorLine = editor.selection.active.line;
        const lineDiag = diagnostics.find(
          (d) => d.range.start.line === cursorLine,
        );

        if (lineDiag) {
          await vscode.env.clipboard.writeText(lineDiag.message);
          vscode.window.setStatusBarMessage(
            "$(check) KRL problem message copied to clipboard",
            3000,
          );
        } else {
          vscode.window.showInformationMessage(
            "No diagnostic found at the current line.",
          );
        }
      },
    ),
  );

  // Command: Copy Problem Code at cursor
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "krl.errorLens.copyProblemCode",
      async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor || editor.document.languageId !== "krl") return;

        const diagnostics = vscode.languages.getDiagnostics(
          editor.document.uri,
        );
        const cursorLine = editor.selection.active.line;
        const lineDiag = diagnostics.find(
          (d) => d.range.start.line === cursorLine,
        );

        if (lineDiag && lineDiag.code) {
          await vscode.env.clipboard.writeText(String(lineDiag.code));
          vscode.window.setStatusBarMessage(
            `$(check) Diagnostic code '${lineDiag.code}' copied to clipboard`,
            3000,
          );
        } else if (lineDiag) {
          vscode.window.showInformationMessage(
            "Selected diagnostic has no specific error code.",
          );
        } else {
          vscode.window.showInformationMessage(
            "No diagnostic found at the current line.",
          );
        }
      },
    ),
  );

  // Command: Search Problem on Web
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "krl.errorLens.searchForProblem",
      async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor || editor.document.languageId !== "krl") return;

        const diagnostics = vscode.languages.getDiagnostics(
          editor.document.uri,
        );
        const cursorLine = editor.selection.active.line;
        const lineDiag = diagnostics.find(
          (d) => d.range.start.line === cursorLine,
        );

        if (lineDiag) {
          const query = encodeURIComponent(`KUKA KRL ${lineDiag.message}`);
          vscode.env.openExternal(
            vscode.Uri.parse(`https://www.google.com/search?q=${query}`),
          );
        } else {
          vscode.window.showInformationMessage(
            "No diagnostic found at current line to search.",
          );
        }
      },
    ),
  );

  // Command: Suppress / Disable Diagnostic on Current Line
  context.subscriptions.push(
    vscode.commands.registerCommand("krl.errorLens.disableLine", async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor || editor.document.languageId !== "krl") return;

      const diagnostics = vscode.languages.getDiagnostics(editor.document.uri);
      const cursorLine = editor.selection.active.line;
      const lineDiag = diagnostics.find(
        (d) => d.range.start.line === cursorLine,
      );

      const code = lineDiag?.code ? ` ${lineDiag.code}` : "";
      const commentText = ` ; @krl-ignore${code}`;

      const line = editor.document.lineAt(cursorLine);
      await editor.edit((editBuilder) => {
        editBuilder.insert(line.range.end, commentText);
      });
      vscode.window.setStatusBarMessage(
        "$(check) Inserted suppression comment on line",
        3000,
      );
    }),
  );
}
