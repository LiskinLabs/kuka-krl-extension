import * as vscode from "vscode";
import * as cp from "child_process";
import * as path from "path";

let blameStatusBarItem: vscode.StatusBarItem;
let inlineBlameDecorationType: vscode.TextEditorDecorationType;

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
 * Executes a Git CLI command in the working directory
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
 * Extracts Git Blame information for a specific file line
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
 * Updates both Status Bar item and Inline Blame Ghost Text
 */
async function updateBlame(editor: vscode.TextEditor | undefined) {
  if (!editor) {
    if (blameStatusBarItem) blameStatusBarItem.hide();
    return;
  }

  const doc = editor.document;
  if (doc.languageId !== "krl" && !doc.fileName.match(/\.(src|dat|sub)$/i)) {
    if (blameStatusBarItem) blameStatusBarItem.hide();
    if (inlineBlameDecorationType) editor.setDecorations(inlineBlameDecorationType, []);
    return;
  }

  const line = editor.selection.active.line + 1;
  const blame = await getLineBlame(doc.fileName, line);

  // 1. Update Status Bar
  if (!blame) {
    if (blameStatusBarItem) blameStatusBarItem.hide();
    if (inlineBlameDecorationType) editor.setDecorations(inlineBlameDecorationType, []);
    return;
  }

  if (blame.hash === "uncommitted") {
    blameStatusBarItem.text = `$(git-commit) You • Uncommitted Changes`;
    blameStatusBarItem.tooltip = `Line ${line}: Uncommitted changes in working tree\nClick for Git Blame actions.`;
  } else {
    const shortHash = blame.hash.substring(0, 7);
    blameStatusBarItem.text = `$(git-commit) ${blame.author}, ${blame.timeAgo} • ${blame.summary}`;
    blameStatusBarItem.tooltip = new vscode.MarkdownString(
      `### 🤖 KRL Git Blame (Line ${line})\n\n` +
        `**Commit:** \`${shortHash}\` — ${blame.summary}\n\n` +
        `**Author:** ${blame.author} <${blame.authorMail}>\n\n` +
        `**Date:** ${blame.date} (${blame.timeAgo})\n\n` +
        `---\n\n` +
        `*Click to inspect commit details, compare historical revisions, or diff with previous version.*`,
    );
  }

  blameStatusBarItem.command = "krl.showLineBlameDetails";
  blameStatusBarItem.show();

  // 2. Update Inline Blame Ghost Text (GitKraken Style)
  const config = vscode.workspace.getConfiguration("krl");
  const inlineEnabled = config.get<boolean>("gitLens.currentLine.enabled", true);

  if (inlineBlameDecorationType) {
    if (!inlineEnabled) {
      editor.setDecorations(inlineBlameDecorationType, []);
    } else {
      const lineIdx = line - 1;
      if (lineIdx < doc.lineCount) {
        const lineText = doc.lineAt(lineIdx).text;
        const ghostText =
          blame.hash === "uncommitted"
            ? `  $(git-commit) You • Uncommitted changes`
            : `  $(git-commit) ${blame.author}, ${blame.timeAgo} • ${blame.summary}`;

        editor.setDecorations(inlineBlameDecorationType, [
          {
            range: new vscode.Range(lineIdx, 0, lineIdx, lineText.length),
            renderOptions: {
              after: {
                contentText: ghostText,
              },
            },
          },
        ]);
      }
    }
  }
}

/**
 * Interactive Git commit history explorer with side-by-side Diff
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
 * Compare line's commit with the previous commit revision (Diff Before/After)
 */
async function diffWithPreviousCommand() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) return;

  const line = editor.selection.active.line + 1;
  const blame = await getLineBlame(editor.document.fileName, line);
  if (!blame || blame.hash === "uncommitted") {
    vscode.window.showInformationMessage(
      "Cannot diff previous revision: line contains uncommitted modifications.",
    );
    return;
  }

  const baseName = path.basename(editor.document.fileName);
  const uri = editor.document.uri;

  try {
    const previousUri = uri.with({
      scheme: "git",
      query: JSON.stringify({ path: uri.fsPath, ref: `${blame.hash}~1` }),
    });
    const currentCommitUri = uri.with({
      scheme: "git",
      query: JSON.stringify({ path: uri.fsPath, ref: blame.hash }),
    });

    await vscode.commands.executeCommand(
      "vscode.diff",
      previousUri,
      currentCommitUri,
      `${baseName} (${blame.hash.substring(0, 7)}~1 ↔ ${blame.hash.substring(0, 7)})`,
    );
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err);
    vscode.window.showErrorMessage(`Failed to open revision diff: ${errMsg}`);
  }
}

/**
 * Copy commit message for the active line
 */
async function copyCommitMessageCommand() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) return;

  const line = editor.selection.active.line + 1;
  const blame = await getLineBlame(editor.document.fileName, line);
  if (blame && blame.summary) {
    await vscode.env.clipboard.writeText(blame.summary);
    vscode.window.setStatusBarMessage(
      "$(check) Copied commit message to clipboard",
      3000,
    );
  }
}

/**
 * Toggle Inline Blame annotations
 */
async function toggleGitLensInlineBlameCommand() {
  const config = vscode.workspace.getConfiguration("krl");
  const current = config.get<boolean>("gitLens.currentLine.enabled", true);
  await config.update(
    "gitLens.currentLine.enabled",
    !current,
    vscode.ConfigurationTarget.Global,
  );
  vscode.window.showInformationMessage(
    !current
      ? "GitLens KRL: Inline Blame Enabled"
      : "GitLens KRL: Inline Blame Disabled",
  );
}

/**
 * Shows interactive Git Blame menu for current line
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
      label: "$(diff) Diff with Previous Revision (Before/After)",
      detail: `Compare ${blame.hash.substring(0, 7)} with its parent revision (${blame.hash.substring(0, 7)}~1)`,
    },
    {
      label: "$(history) View Full File History & Compare",
      detail: `Inspect all historical commits for ${path.basename(editor.document.fileName)}`,
    },
    {
      label: "$(git-commit) View Full Commit Details",
      detail: `${blame.hash.substring(0, 8)}: ${blame.summary} (${blame.author}, ${blame.date})`,
    },
    {
      label: "$(clippy) Copy Commit SHA",
      detail: blame.hash,
    },
    {
      label: "$(edit) Copy Commit Message",
      detail: blame.summary,
    },
    {
      label: "$(eye) Toggle Inline Blame Annotations",
      detail: "Enable or disable inline ghost text annotation at line ends",
    },
  ];

  const picked = await vscode.window.showQuickPick(items, {
    placeHolder: `KRL Git Blame: Line ${line} (Commit ${blame.hash.substring(0, 7)})`,
  });

  if (!picked) return;

  if (picked.label.includes("Diff with Previous Revision")) {
    await diffWithPreviousCommand();
  } else if (picked.label.includes("View Full File History")) {
    await viewFileHistoryCommand();
  } else if (picked.label.includes("View Full Commit Details")) {
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
  } else if (picked.label.includes("Copy Commit SHA")) {
    await vscode.env.clipboard.writeText(blame.hash);
    vscode.window.showInformationMessage(
      `Copied commit SHA (${blame.hash.substring(0, 7)}) to clipboard.`,
    );
  } else if (picked.label.includes("Copy Commit Message")) {
    await copyCommitMessageCommand();
  } else if (picked.label.includes("Toggle Inline Blame")) {
    await toggleGitLensInlineBlameCommand();
  }
}

interface CommitNode {
  hash: string;
  author: string;
  date: string;
  subject: string;
  files: string[];
  hasDat: boolean;
  hasSrc: boolean;
}

let gitGraphPanel: vscode.WebviewPanel | undefined = undefined;

/**
 * Opens Interactive KRL Git Graph Webview (Subway Tree + Point Deltas)
 */
export async function openKrlGitGraphCommand(context: vscode.ExtensionContext) {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  const cwd = workspaceFolders && workspaceFolders.length > 0
    ? workspaceFolders[0].uri.fsPath
    : (vscode.window.activeTextEditor ? path.dirname(vscode.window.activeTextEditor.document.fileName) : process.cwd());

  if (gitGraphPanel) {
    gitGraphPanel.reveal(vscode.ViewColumn.One);
    return;
  }

  gitGraphPanel = vscode.window.createWebviewPanel(
    "krlGitGraph",
    "📊 KUKA KRL Revision Graph & Timeline",
    vscode.ViewColumn.One,
    {
      enableScripts: true,
      retainContextWhenHidden: true,
    }
  );

  gitGraphPanel.onDidDispose(() => {
    gitGraphPanel = undefined;
  });

  const loadCommits = async (): Promise<CommitNode[]> => {
    try {
      const raw = await execGit(
        ["log", "-n", "50", "--pretty=format:__COMMIT__%h|%an|%ad|%s", "--name-only", "--date=short"],
        cwd
      );
      if (!raw) return [];
      const chunks = raw.split("__COMMIT__").filter((c) => c.trim().length > 0);
      const commits: CommitNode[] = [];
      for (const chunk of chunks) {
        const lines = chunk.trim().split("\n");
        const [header, ...fileLines] = lines;
        const [hash, author, date, subject] = header.split("|");
        const files = fileLines.map((f) => f.trim()).filter((f) => f.length > 0);
        const hasDat = files.some((f) => f.toLowerCase().endsWith(".dat"));
        const hasSrc = files.some((f) => f.toLowerCase().endsWith(".src") || f.toLowerCase().endsWith(".sub"));
        commits.push({
          hash: hash || "",
          author: author || "Unknown",
          date: date || "",
          subject: subject || "",
          files,
          hasDat,
          hasSrc,
        });
      }
      return commits;
    } catch {
      return [];
    }
  };

  const commits = await loadCommits();

  gitGraphPanel.webview.html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    :root {
      --bg: #0d1117;
      --card: #161b22;
      --border: #30363d;
      --accent: #ff6600;
      --text: #e6edf3;
      --muted: #8b949e;
      --dat-badge: #1f6feb;
      --src-badge: #238636;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0; padding: 20px;
      background: var(--bg); color: var(--text);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    .header {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: 20px; border-bottom: 1px solid var(--border); padding-bottom: 15px;
    }
    .title { font-size: 18px; font-weight: bold; display: flex; align-items: center; gap: 8px; }
    .filters { display: flex; gap: 8px; }
    .filter-btn {
      background: var(--card); border: 1px solid var(--border); color: var(--text);
      padding: 6px 12px; border-radius: 6px; font-size: 12px; cursor: pointer; font-weight: 600;
    }
    .filter-btn.active { background: var(--accent); border-color: var(--accent); color: white; }
    .timeline { display: flex; flex-direction: column; gap: 10px; }
    .commit-card {
      background: var(--card); border: 1px solid var(--border); border-radius: 8px;
      padding: 14px; display: flex; flex-direction: column; gap: 8px; transition: border 0.15s;
    }
    .commit-card:hover { border-color: var(--accent); }
    .commit-top { display: flex; justify-content: space-between; align-items: center; }
    .commit-hash { font-family: monospace; color: var(--accent); font-weight: bold; background: rgba(255,102,0,0.1); padding: 2px 6px; border-radius: 4px; }
    .commit-msg { font-weight: 600; font-size: 14px; margin-top: 4px; }
    .commit-meta { font-size: 12px; color: var(--muted); display: flex; gap: 12px; align-items: center; }
    .badge { font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 4px; text-transform: uppercase; }
    .badge-dat { background: rgba(31,111,235,0.2); color: #58a6ff; border: 1px solid rgba(31,111,235,0.4); }
    .badge-src { background: rgba(35,134,54,0.2); color: #3fb950; border: 1px solid rgba(35,134,54,0.4); }
    .file-list { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 6px; padding-top: 6px; border-top: 1px solid rgba(255,255,255,0.06); }
    .file-item {
      font-family: monospace; font-size: 11px; color: var(--text); background: rgba(255,255,255,0.04);
      padding: 3px 8px; border-radius: 4px; cursor: pointer; display: flex; align-items: center; gap: 4px; border: 1px solid transparent;
    }
    .file-item:hover { border-color: var(--accent); background: rgba(255,102,0,0.15); color: var(--accent); }
  </style>
</head>
<body>
  <div class="header">
    <div class="title"><span>📊</span> KUKA KRL Revision Graph & Point Timeline</div>
    <div class="filters">
      <button class="filter-btn active" onclick="setFilter('all')">All Commits (${commits.length})</button>
      <button class="filter-btn" onclick="setFilter('dat')">📍 Point Touch-ups (.DAT)</button>
      <button class="filter-btn" onclick="setFilter('src')">⚡ Logic Changes (.SRC)</button>
    </div>
  </div>

  <div class="timeline" id="timeline"></div>

  <script>
    const vscode = acquireVsCodeApi();
    const allCommits = ${JSON.stringify(commits)};
    let activeFilter = 'all';

    function setFilter(f) {
      activeFilter = f;
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      event.target.classList.add('active');
      render();
    }

    function openFileDiff(hash, file) {
      vscode.postMessage({ command: 'openDiff', hash, file });
    }

    function render() {
      const container = document.getElementById('timeline');
      const filtered = allCommits.filter(c => {
        if (activeFilter === 'dat') return c.hasDat;
        if (activeFilter === 'src') return c.hasSrc;
        return true;
      });

      if (filtered.length === 0) {
        container.innerHTML = '<div style="text-align:center; padding:40px; color:var(--muted);">No matching KRL commits found.</div>';
        return;
      }

      container.innerHTML = filtered.map(c => {
        const badges = [];
        if (c.hasDat) badges.push('<span class="badge badge-dat">📍 Points Touch-up</span>');
        if (c.hasSrc) badges.push('<span class="badge badge-src">⚡ Logic Mod</span>');

        const filesHtml = c.files.map(f => \`<span class="file-item" onclick="openFileDiff('\${c.hash}', '\${f}')">📄 \${f}</span>\`).join('');

        return \`
          <div class="commit-card">
            <div class="commit-top">
              <span class="commit-hash">\${c.hash}</span>
              <div style="display:flex; gap:6px;">\${badges.join('')}</div>
            </div>
            <div class="commit-msg">\${c.subject}</div>
            <div class="commit-meta">
              <span>👤 \${c.author}</span>
              <span>🕒 \${c.date}</span>
              <span>📦 \${c.files.length} files</span>
            </div>
            \${c.files.length > 0 ? \`<div class="file-list">\${filesHtml}</div>\` : ''}
          </div>
        \`;
      }).join('');
    }

    render();
  </script>
</body>
</html>`;

  gitGraphPanel.webview.onDidReceiveMessage(async (msg) => {
    if (msg.command === "openDiff") {
      try {
        const fileUri = vscode.Uri.file(path.join(cwd, msg.file));
        const commitUri = fileUri.with({
          scheme: "git",
          query: JSON.stringify({ path: fileUri.fsPath, ref: msg.hash }),
        });
        await vscode.commands.executeCommand(
          "vscode.diff",
          commitUri,
          fileUri,
          `${path.basename(msg.file)} (${msg.hash}) ↔ Workspace`,
        );
      } catch (err: unknown) {
        const errMsg = err instanceof Error ? err.message : String(err);
        vscode.window.showErrorMessage(`Failed to open commit diff: ${errMsg}`);
      }
    }
  });
}

/**
 * Initializes GitLens module for KUKA KRL
 */
export function registerGitLensKrl(context: vscode.ExtensionContext) {
  // Status bar
  blameStatusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    95,
  );
  blameStatusBarItem.name = "KUKA KRL Git Blame";
  context.subscriptions.push(blameStatusBarItem);

  // Inline Ghost Text Decoration
  inlineBlameDecorationType = vscode.window.createTextEditorDecorationType({
    after: {
      margin: "0 0 0 3.5em",
      color: "rgba(150, 150, 150, 0.55)",
      fontStyle: "italic",
    },
  });
  context.subscriptions.push(inlineBlameDecorationType);

  // Commands
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "krl.viewFileHistory",
      viewFileHistoryCommand,
    ),
    vscode.commands.registerCommand(
      "krl.viewGitGraph",
      () => openKrlGitGraphCommand(context),
    ),
    vscode.commands.registerCommand(
      "krl.showLineBlameDetails",
      showLineBlameDetailsCommand,
    ),
    vscode.commands.registerCommand(
      "krl.diffWithPrevious",
      diffWithPreviousCommand,
    ),
    vscode.commands.registerCommand(
      "krl.copyCommitMessage",
      copyCommitMessageCommand,
    ),
    vscode.commands.registerCommand(
      "krl.toggleGitLensInlineBlame",
      toggleGitLensInlineBlameCommand,
    ),
  );

  // Editor event listeners
  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor((e) => updateBlame(e)),
    vscode.window.onDidChangeTextEditorSelection((e) =>
      updateBlame(e.textEditor),
    ),
    vscode.workspace.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration("krl.gitLens")) {
        updateBlame(vscode.window.activeTextEditor);
      }
    }),
  );

  if (vscode.window.activeTextEditor) {
    updateBlame(vscode.window.activeTextEditor);
  }
}

