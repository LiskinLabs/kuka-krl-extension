import * as vscode from "vscode";
import * as cp from "child_process";
import * as path from "path";

let blameStatusBarItem: vscode.StatusBarItem;

interface BlameInfo {
  author: string;
  authorMail: string;
  timeAgo: string;
  date: string;
  summary: string;
  hash: string;
  line: number;
}

/**
 * Выполняет Git команду в директории файла.
 */
function execGit(args: string[], cwd: string): Promise<string> {
  return new Promise((resolve, reject) => {
    cp.execFile(
      "git",
      args,
      { cwd, maxBuffer: 10 * 1024 * 1024 },
      (err, stdout) => {
        if (err) {
          return reject(err);
        }
        resolve(stdout.trim());
      },
    );
  });
}

/**
 * Извлекает информацию Git Blame для конкретной строки файла.
 */
async function getLineBlame(
  filePath: string,
  lineNumber: number,
): Promise<BlameInfo | null> {
  const dir = path.dirname(filePath);
  try {
    const raw = await execGit(
      [
        "blame",
        "-L",
        `${lineNumber},${lineNumber}`,
        "--porcelain",
        "--",
        filePath,
      ],
      dir,
    );
    if (!raw) return null;

    const lines = raw.split("\n");
    const hash = lines[0].split(" ")[0];
    if (hash === "0000000000000000000000000000000000000000") {
      return {
        author: "You (Not Committed)",
        authorMail: "",
        timeAgo: "now",
        date: "Working Tree",
        summary: "Uncommitted changes in KRL program",
        hash: "uncommitted",
        line: lineNumber,
      };
    }

    let author = "Unknown";
    let authorMail = "";
    let authorTime = 0;
    let summary = "";

    for (const l of lines) {
      if (l.startsWith("author ")) author = l.substring(7);
      else if (l.startsWith("author-mail "))
        authorMail = l.substring(12).replace(/[<>]/g, "");
      else if (l.startsWith("author-time "))
        authorTime = parseInt(l.substring(12), 10);
      else if (l.startsWith("summary ")) summary = l.substring(8);
    }

    const timeAgo = formatTimeAgo(authorTime * 1000);
    const date = new Date(authorTime * 1000).toLocaleDateString();

    return {
      author,
      authorMail,
      timeAgo,
      date,
      summary,
      hash,
      line: lineNumber,
    };
  } catch {
    return null;
  }
}

function formatTimeAgo(ms: number): string {
  const diff = Date.now() - ms;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  const years = Math.floor(days / 365);
  return `${years}y ago`;
}

/**
 * Обновляет статусную строку с информацией об авторе строки KRL.
 */
async function updateBlameStatusBar(editor: vscode.TextEditor | undefined) {
  if (!editor) {
    if (blameStatusBarItem) blameStatusBarItem.hide();
    return;
  }

  const doc = editor.document;
  if (doc.languageId !== "krl" && !doc.fileName.match(/\.(src|dat|sub)$/i)) {
    if (blameStatusBarItem) blameStatusBarItem.hide();
    return;
  }

  const line = editor.selection.active.line + 1;
  const blame = await getLineBlame(doc.fileName, line);

  if (!blame) {
    if (blameStatusBarItem) blameStatusBarItem.hide();
    return;
  }

  if (blame.hash === "uncommitted") {
    blameStatusBarItem.text = `$(git-commit) You • Uncommitted Changes`;
    blameStatusBarItem.tooltip = `Line ${line}: Uncommitted changes in working tree`;
  } else {
    const shortHash = blame.hash.substring(0, 7);
    blameStatusBarItem.text = `$(git-commit) ${blame.author}, ${blame.timeAgo} • ${blame.summary}`;
    blameStatusBarItem.tooltip = new vscode.MarkdownString(
      `### 🤖 KRL Git Blame (Line ${line})\n\n` +
        `**Commit:** \`${shortHash}\` — ${blame.summary}\n\n` +
        `**Author:** ${blame.author} <${blame.authorMail}>\n\n` +
        `**Date:** ${blame.date} (${blame.timeAgo})\n\n` +
        `---\n\n` +
        `*Click to inspect commit details or compare historical revisions.*`,
    );
  }

  blameStatusBarItem.command = "krl.showLineBlameDetails";
  blameStatusBarItem.show();
}

/**
 * Интерактивный просмотр истории коммитов активного файла KRL с открытием Diff.
 */
async function viewFileHistoryCommand() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showWarningMessage("No active KRL editor found.");
    return;
  }

  const filePath = editor.document.fileName;
  const dir = path.dirname(filePath);
  const baseName = path.basename(filePath);

  try {
    const logRaw = await execGit(
      [
        "log",
        "--follow",
        "--pretty=format:%h%x09%an%x09%ad%x09%s",
        "--date=short",
        "-n",
        "30",
        "--",
        filePath,
      ],
      dir,
    );

    if (!logRaw) {
      vscode.window.showInformationMessage(
        `No Git history found for ${baseName}.`,
      );
      return;
    }

    const entries = logRaw.split("\n").map((l) => {
      const [hash, author, date, subject] = l.split("\t");
      return {
        label: `$(git-commit) ${hash} — ${subject}`,
        description: `${author}, ${date}`,
        hash,
        subject,
      };
    });

    const selected = await vscode.window.showQuickPick(entries, {
      placeHolder: `Select a Git commit revision of ${baseName} to compare with current file:`,
    });

    if (selected) {
      const uri = editor.document.uri;
      const commitUri = uri.with({
        scheme: "git",
        query: JSON.stringify({ path: uri.fsPath, ref: selected.hash }),
      });
      await vscode.commands.executeCommand(
        "vscode.diff",
        commitUri,
        uri,
        `${baseName} (${selected.hash}) ↔ Current Workspace`,
      );
    }
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err);
    vscode.window.showErrorMessage(`Failed to fetch Git history: ${errMsg}`);
  }
}

/**
 * Показывает контекстное меню с опциями Git Blame для текущей строки.
 */
async function showLineBlameDetailsCommand() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) return;

  const line = editor.selection.active.line + 1;
  const blame = await getLineBlame(editor.document.fileName, line);
  if (!blame) return;

  if (blame.hash === "uncommitted") {
    vscode.window.showInformationMessage(
      `Line ${line} contains uncommitted modifications.`,
    );
    return;
  }

  const items: vscode.QuickPickItem[] = [
    {
      label: "$(git-commit) View Full Commit Message",
      detail: `${blame.hash.substring(0, 8)}: ${blame.summary} (${blame.author}, ${blame.date})`,
    },
    {
      label: "$(history) View File Revisions History",
      detail: `Inspect all historical versions of ${path.basename(editor.document.fileName)}`,
    },
    {
      label: "$(clippy) Copy Commit SHA",
      detail: blame.hash,
    },
  ];

  const picked = await vscode.window.showQuickPick(items, {
    placeHolder: `KRL Git Blame: Line ${line} (Commit ${blame.hash.substring(0, 7)})`,
  });

  if (!picked) return;

  if (picked.label.includes("View Full Commit Message")) {
    try {
      const showRaw = await execGit(
        ["show", "--stat", blame.hash],
        path.dirname(editor.document.fileName),
      );
      vscode.window.showInformationMessage(
        `${blame.summary}\n\n${showRaw.slice(0, 300)}...`,
      );
    } catch {
      vscode.window.showInformationMessage(
        `${blame.summary} by ${blame.author}`,
      );
    }
  } else if (picked.label.includes("View File Revisions History")) {
    await viewFileHistoryCommand();
  } else if (picked.label.includes("Copy Commit SHA")) {
    await vscode.env.clipboard.writeText(blame.hash);
    vscode.window.showInformationMessage(
      `Copied commit SHA (${blame.hash.substring(0, 7)}) to clipboard.`,
    );
  }
}

/**
 * Инициализирует GitLens-модуль для KUKA KRL.
 */
export function registerGitLensKrl(context: vscode.ExtensionContext) {
  blameStatusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100,
  );
  blameStatusBarItem.name = "KUKA KRL Git Blame";
  context.subscriptions.push(blameStatusBarItem);

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "krl.viewFileHistory",
      viewFileHistoryCommand,
    ),
    vscode.commands.registerCommand(
      "krl.showLineBlameDetails",
      showLineBlameDetailsCommand,
    ),
  );

  // Слушатель смены активного редактора и перемещения курсора
  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor((e) => updateBlameStatusBar(e)),
    vscode.window.onDidChangeTextEditorSelection((e) =>
      updateBlameStatusBar(e.textEditor),
    ),
  );

  if (vscode.window.activeTextEditor) {
    updateBlameStatusBar(vscode.window.activeTextEditor);
  }
}
