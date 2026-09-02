import * as vscode from "vscode";
import * as cp from "child_process";
import * as path from "path";
import { t } from "../i18n";

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
    if (inlineBlameDecorationType)
      editor.setDecorations(inlineBlameDecorationType, []);
    return;
  }

  const line = editor.selection.active.line + 1;
  const blame = await getLineBlame(doc.fileName, line);

  // 1. Update Status Bar
  if (!blame) {
    if (blameStatusBarItem) blameStatusBarItem.hide();
    if (inlineBlameDecorationType)
      editor.setDecorations(inlineBlameDecorationType, []);
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
  const inlineEnabled = config.get<boolean>(
    "gitLens.currentLine.enabled",
    true,
  );

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
 * View the Git history of the selected lines / motion trajectory block (git log -L)
 */
async function viewLineHistoryCommand() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showWarningMessage("No active KRL editor found.");
    return;
  }

  const filePath = editor.document.fileName;
  const dir = path.dirname(filePath);
  const baseName = path.basename(filePath);

  let startLine = editor.selection.start.line + 1;
  let endLine = editor.selection.end.line + 1;
  if (startLine > endLine) {
    [startLine, endLine] = [endLine, startLine];
  }

  try {
    const raw = await execGit(
      [
        "log",
        "-L",
        `${startLine},${endLine}:${filePath}`,
        "--pretty=format:%h%x09%an%x09%ad%x09%s",
        "--date=short",
        "-n",
        "25",
      ],
      dir,
    );

    if (!raw) {
      vscode.window.showInformationMessage(
        `No line history found for ${baseName} (lines ${startLine}-${endLine}).`,
      );
      return;
    }

    const seenHashes = new Set<string>();
    const entries: Array<{ label: string; description: string; hash: string }> =
      [];

    const lines = raw.split("\n");
    for (const line of lines) {
      if (!line.includes("\t")) continue;
      const [hash, author, date, subject] = line.split("\t");
      if (hash && !seenHashes.has(hash)) {
        seenHashes.add(hash);
        entries.push({
          label: `$(git-commit) ${hash} — ${subject}`,
          description: `${author}, ${date}`,
          hash,
        });
      }
    }

    if (entries.length === 0) {
      vscode.window.showInformationMessage(
        `No commit entries found for lines ${startLine}-${endLine}.`,
      );
      return;
    }

    const selected = await vscode.window.showQuickPick(entries, {
      placeHolder: `History for ${baseName} (lines ${startLine}..${endLine}) — Select commit to diff:`,
    });

    if (selected) {
      const uri = editor.document.uri;
      const previousUri = uri.with({
        scheme: "git",
        query: JSON.stringify({ path: uri.fsPath, ref: `${selected.hash}~1` }),
      });
      const commitUri = uri.with({
        scheme: "git",
        query: JSON.stringify({ path: uri.fsPath, ref: selected.hash }),
      });

      await vscode.commands.executeCommand(
        "vscode.diff",
        previousUri,
        commitUri,
        `${baseName} (Lines ${startLine}-${endLine}: ${selected.hash.substring(0, 7)}~1 ↔ ${selected.hash.substring(0, 7)})`,
      );
    }
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err);
    vscode.window.showErrorMessage(`Failed to fetch line history: ${errMsg}`);
  }
}

/**
 * Compare any two arbitrary commit revisions of the active KRL file
 */
async function compareTwoRevisionsCommand() {
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
        "40",
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

    const revA = await vscode.window.showQuickPick(entries, {
      placeHolder: `Step 1/2: Select Base Revision (Revision A) for ${baseName}:`,
    });
    if (!revA) return;

    const revB = await vscode.window.showQuickPick(entries, {
      placeHolder: `Step 2/2: Select Target Revision (Revision B) to compare against ${revA.hash}:`,
    });
    if (!revB) return;

    const uri = editor.document.uri;
    const uriA = uri.with({
      scheme: "git",
      query: JSON.stringify({ path: uri.fsPath, ref: revA.hash }),
    });
    const uriB = uri.with({
      scheme: "git",
      query: JSON.stringify({ path: uri.fsPath, ref: revB.hash }),
    });

    await vscode.commands.executeCommand(
      "vscode.diff",
      uriA,
      uriB,
      `${baseName} (${revA.hash} ↔ ${revB.hash})`,
    );
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err);
    vscode.window.showErrorMessage(`Failed to compare revisions: ${errMsg}`);
  }
}

/**
 * Shows interactive Git Blame menu for current line
 */
async function showLineBlameDetailsCommand(_context?: vscode.ExtensionContext) {
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
      label: "$(history) View Selected Lines History (git log -L)",
      detail: `Inspect the history of lines ${editor.selection.start.line + 1}..${editor.selection.end.line + 1}`,
    },
    {
      label: "$(git-merge) Compare Any Two Revisions",
      detail: `Pick two arbitrary historical commits of ${path.basename(editor.document.fileName)} and compare them`,
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
  } else if (picked.label.includes("View Selected Lines History")) {
    await viewLineHistoryCommand();
  } else if (picked.label.includes("Compare Any Two Revisions")) {
    await compareTwoRevisionsCommand();
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
  parents: string[];
  author: string;
  date: string;
  subject: string;
  refs: string[];
  files: string[];
  hasDat: boolean;
  hasSrc: boolean;
  hasXml: boolean;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

let gitGraphPanel: vscode.WebviewPanel | undefined = undefined;

/**
 * Opens Interactive KRL Git Graph Webview (Subway Tree + Point Deltas)
 */
export async function openKrlGitGraphCommand(
  context: vscode.ExtensionContext,
) {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  const cwd =
    workspaceFolders && workspaceFolders.length > 0
      ? workspaceFolders[0].uri.fsPath
      : vscode.window.activeTextEditor
        ? path.dirname(vscode.window.activeTextEditor.document.fileName)
        : process.cwd();

  if (gitGraphPanel) {
    gitGraphPanel.reveal(vscode.ViewColumn.One);
    return;
  }

  gitGraphPanel = vscode.window.createWebviewPanel(
    "krlGitGraph",
    `📊 ${t("gitgraph.title")}`,
    vscode.ViewColumn.One,
    {
      enableScripts: true,
      retainContextWhenHidden: true,
      localResourceRoots: [vscode.Uri.joinPath(context.extensionUri, "media")],
    },
  );

  gitGraphPanel.onDidDispose(() => {
    gitGraphPanel = undefined;
  });

  const checkIsGitRepo = async (): Promise<boolean> => {
    try {
      const res = await execGit(["rev-parse", "--is-inside-work-tree"], cwd);
      return res.trim() === "true";
    } catch {
      return false;
    }
  };

  const getCurrentBranch = async (): Promise<string> => {
    try {
      const res = await execGit(["rev-parse", "--abbrev-ref", "HEAD"], cwd);
      return res.trim() || "HEAD";
    } catch {
      return "HEAD";
    }
  };

  const getRemoteInfo = async (): Promise<string | null> => {
    try {
      const res = await execGit(["remote", "get-url", "origin"], cwd);
      return res.trim() || null;
    } catch {
      return null;
    }
  };

  const loadCommits = async (): Promise<CommitNode[]> => {
    try {
      const raw = await execGit(
        [
          "log",
          "-n",
          "150",
          "--pretty=format:__COMMIT__%h|%p|%an|%ad|%s|%d",
          "--name-only",
          "--date=short",
        ],
        cwd,
      );
      if (!raw) return [];
      const chunks = raw.split("__COMMIT__").filter((c) => c.trim().length > 0);
      const commits: CommitNode[] = [];
      for (const chunk of chunks) {
        const lines = chunk.trim().split("\n");
        const [header, ...fileLines] = lines;
        const [hash, parentsRaw, author, date, subject, refsRaw] =
          header.split("|");
        const parents = parentsRaw ? parentsRaw.trim().split(" ") : [];
        const refs = refsRaw
          ? refsRaw
              .replace(/^\s*\(/, "")
              .replace(/\)\s*$/, "")
              .split(",")
              .map((r) => r.trim())
              .filter((r) => r.length > 0)
          : [];

        const files = fileLines
          .map((f) => f.trim())
          .filter((f) => f.length > 0);
        const hasDat = files.some((f) => f.toLowerCase().endsWith(".dat"));
        const hasSrc = files.some(
          (f) =>
            f.toLowerCase().endsWith(".src") ||
            f.toLowerCase().endsWith(".sub"),
        );
        const hasXml = files.some((f) => f.toLowerCase().endsWith(".xml"));

        commits.push({
          hash: hash || "",
          parents,
          author: author || "Unknown",
          date: date || "",
          subject: subject || "",
          refs,
          files,
          hasDat,
          hasSrc,
          hasXml,
        });
      }
      return commits;
    } catch {
      return [];
    }
  };

  const updateWebview = async () => {
    if (!gitGraphPanel) return;
    const isRepo = await checkIsGitRepo();
    const commits = isRepo ? await loadCommits() : [];
    const currentBranch = isRepo ? await getCurrentBranch() : "";
    const remoteUrl = isRepo ? await getRemoteInfo() : null;

    const totalCommits = commits.length;
    const datCommitsCount = commits.filter((c) => c.hasDat).length;
    const srcCommitsCount = commits.filter((c) => c.hasSrc).length;

    gitGraphPanel.webview.html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src ${gitGraphPanel.webview.cspSource} https: data:; script-src ${gitGraphPanel.webview.cspSource} 'unsafe-inline'; style-src ${gitGraphPanel.webview.cspSource} 'unsafe-inline';">
  <title>${t("gitgraph.title")}</title>
  <style>
    :root {
      --bg: var(--vscode-editor-background);
      --fg: var(--vscode-editor-foreground);
      --card-bg: var(--vscode-welcomePage-tileBackground, rgba(255, 255, 255, 0.04));
      --card-border: var(--vscode-welcomePage-tileBorder, rgba(255, 255, 255, 0.1));
      --accent: #FF6600;
      --accent-hover: #e05500;
      --accent-dim: rgba(255, 102, 0, 0.12);
      --muted: var(--vscode-descriptionForeground, rgba(128, 128, 128, 0.8));
      --input-bg: var(--vscode-input-background, rgba(255, 255, 255, 0.05));
      --input-fg: var(--vscode-input-foreground, inherit);
      --input-border: var(--vscode-input-border, rgba(255, 255, 255, 0.15));
      --btn-secondary-bg: var(--vscode-button-secondaryBackground, rgba(255, 255, 255, 0.1));
      --btn-secondary-fg: var(--vscode-button-secondaryForeground, #fff);
      --table-hover: var(--vscode-list-hoverBackground, rgba(255, 255, 255, 0.05));
      --table-selected: var(--vscode-list-activeSelectionBackground, rgba(255, 102, 0, 0.15));
      --dat-color: #388bfd;
      --dat-bg: rgba(56, 139, 253, 0.15);
      --src-color: #3fb950;
      --src-bg: rgba(63, 185, 80, 0.15);
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 20px 24px;
      background: var(--bg);
      color: var(--fg);
      font-family: var(--vscode-font-family, system-ui, -apple-system, sans-serif);
      font-size: 13px;
      line-height: 1.4;
      display: flex;
      flex-direction: column;
      height: 100vh;
      overflow: hidden;
    }
    .top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 14px;
      padding-bottom: 12px;
      border-bottom: 2px solid var(--accent);
      flex-shrink: 0;
      gap: 12px;
      flex-wrap: wrap;
    }
    .brand-title {
      font-size: 18px;
      font-weight: 800;
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 0;
    }
    .branch-pill {
      font-size: 11px;
      font-weight: 700;
      background: var(--accent);
      color: #fff;
      padding: 3px 8px;
      border-radius: 12px;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .remote-pill {
      font-size: 11px;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid var(--card-border);
      padding: 3px 8px;
      border-radius: 12px;
      color: var(--muted);
      max-width: 260px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .stats-bar {
      display: flex;
      gap: 8px;
      font-size: 11.5px;
    }
    .stat-badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 2px 7px;
      border-radius: 4px;
      font-weight: 600;
      background: var(--card-bg);
      border: 1px solid var(--card-border);
    }
    .stat-dat { color: var(--dat-color); border-color: rgba(56, 139, 253, 0.3); }
    .stat-src { color: var(--src-color); border-color: rgba(63, 185, 80, 0.3); }

    .controls-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      gap: 12px;
      flex-shrink: 0;
      flex-wrap: wrap;
    }
    .filters {
      display: flex;
      gap: 6px;
    }
    .filter-btn {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      color: var(--fg);
      padding: 5px 12px;
      border-radius: 5px;
      font-size: 12px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.15s ease;
      opacity: 0.85;
    }
    .filter-btn:hover {
      opacity: 1;
      border-color: var(--accent);
      background: var(--accent-dim);
    }
    .filter-btn.active {
      background: var(--accent);
      border-color: var(--accent);
      color: #fff;
      opacity: 1;
      box-shadow: 0 2px 6px rgba(255, 102, 0, 0.3);
    }
    .search-box {
      flex: 1;
      min-width: 220px;
      max-width: 360px;
    }
    .search-input {
      width: 100%;
      background: var(--input-bg);
      color: var(--input-fg);
      border: 1px solid var(--input-border);
      padding: 6px 10px;
      border-radius: 5px;
      font-size: 12px;
      outline: none;
    }
    .search-input:focus {
      border-color: var(--accent);
    }
    .btn-action {
      background: var(--accent);
      color: #fff;
      border: none;
      padding: 6px 12px;
      border-radius: 5px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      transition: all 0.15s;
    }
    .btn-action:hover {
      background: var(--accent-hover);
      transform: translateY(-1px);
    }
    .btn-secondary {
      background: var(--btn-secondary-bg);
      color: var(--btn-secondary-fg);
      border: 1px solid var(--card-border);
    }

    /* Main Split View: Table on Top / Left, Inspector on Bottom */
    .graph-workspace {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-height: 0;
      border: 1px solid var(--card-border);
      border-radius: 8px;
      background: var(--card-bg);
      overflow: hidden;
    }
    .table-container {
      flex: 1;
      overflow-y: auto;
      overflow-x: auto;
    }
    table.git-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 12.5px;
    }
    table.git-table thead th {
      position: sticky;
      top: 0;
      background: var(--card-bg);
      border-bottom: 1px solid var(--card-border);
      padding: 8px 12px;
      font-weight: 700;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      opacity: 0.8;
      z-index: 10;
    }
    table.git-table tbody tr {
      border-bottom: 1px solid rgba(128, 128, 128, 0.08);
      cursor: pointer;
      transition: background 0.12s;
    }
    table.git-table tbody tr:hover {
      background: var(--table-hover);
    }
    table.git-table tbody tr.selected {
      background: var(--table-selected);
      border-left: 3px solid var(--accent);
    }
    td {
      padding: 6px 12px;
      vertical-align: middle;
      white-space: nowrap;
    }
    .td-graph {
      padding: 0 6px;
      width: 1%;
      vertical-align: middle;
    }
    .td-subject {
      white-space: normal;
      word-break: break-word;
      min-width: 240px;
    }
    .ref-badge {
      font-size: 10px;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 4px;
      margin-right: 6px;
      display: inline-flex;
      align-items: center;
      gap: 3px;
    }
    .ref-head { background: var(--accent); color: #fff; }
    .ref-remote { background: #1f6feb; color: #fff; }
    .ref-tag { background: #d29922; color: #000; font-weight: 800; }
    .krl-badge {
      font-size: 9.5px;
      font-weight: 700;
      padding: 1px 5px;
      border-radius: 3px;
      margin-left: 6px;
      text-transform: uppercase;
    }
    .krl-dat { background: var(--dat-bg); color: var(--dat-color); border: 1px solid rgba(56, 139, 253, 0.3); }
    .krl-src { background: var(--src-bg); color: var(--src-color); border: 1px solid rgba(63, 185, 80, 0.3); }
    .commit-hash-cell {
      font-family: var(--vscode-editor-font-family, monospace);
      font-weight: 700;
      color: var(--accent);
      cursor: pointer;
    }
    .commit-hash-cell:hover {
      text-decoration: underline;
    }

    /* Bottom Inspector Drawer */
    .inspector-drawer {
      height: 220px;
      border-top: 2px solid var(--accent);
      background: var(--bg);
      padding: 14px 18px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      overflow-y: auto;
      flex-shrink: 0;
    }
    .inspector-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
    }
    .inspector-title {
      font-size: 14px;
      font-weight: 800;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .inspector-files {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .inspector-file-btn {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      color: var(--fg);
      padding: 4px 10px;
      border-radius: 5px;
      font-size: 11.5px;
      font-family: var(--vscode-editor-font-family, monospace);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.15s;
    }
    .inspector-file-btn:hover {
      border-color: var(--accent);
      background: var(--accent-dim);
      color: var(--accent);
    }

    .no-git-container {
      padding: 48px 24px;
      text-align: center;
      background: var(--card-bg);
      border: 1px dashed var(--accent);
      border-radius: 12px;
      max-width: 600px;
      margin: 40px auto;
    }
    .no-git-icon { font-size: 48px; margin-bottom: 16px; }
    .no-git-title { font-size: 18px; font-weight: 800; margin-bottom: 8px; }
    .no-git-desc { font-size: 13px; color: var(--muted); line-height: 1.6; margin-bottom: 24px; }
  </style>
</head>
<body>
  <div class="top-bar">
    <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
      <h1 class="brand-title"><span>📊</span> ${t("gitgraph.title")}</h1>
      ${currentBranch ? `<span class="branch-pill">🌿 ${escapeHtml(currentBranch)}</span>` : ""}
      ${
        remoteUrl
          ? `<span class="remote-pill" title="${escapeHtml(remoteUrl)}">🐙 ${escapeHtml(remoteUrl.replace(/^.*github\.com[\/:]/, "github:"))}</span>`
          : `<span class="remote-pill">📁 Local Air-Gapped Repository</span>`
      }
    </div>
    <div style="display: flex; gap: 6px; align-items: center;">
      <button class="btn-action btn-secondary" onclick="fetchRemote()" title="${t("gitgraph.btn.fetch")}">🔄 ${t("gitgraph.btn.fetch")}</button>
      <button class="btn-action btn-secondary" onclick="pullRemote()" title="${t("gitgraph.btn.pull")}">📥 ${t("gitgraph.btn.pull")}</button>
      <button class="btn-action btn-secondary" onclick="pushRemote()" title="${t("gitgraph.btn.push")}">📤 ${t("gitgraph.btn.push")}</button>
      <button class="btn-action" onclick="snapshot()">📸 ${t("gitgraph.btn.snapshot")}</button>
    </div>
  </div>

  ${
    !isRepo || commits.length === 0
      ? `
    <div class="no-git-container">
      <div class="no-git-icon">📦</div>
      <div class="no-git-title">${t("gitgraph.noGit.title")}</div>
      <div class="no-git-desc">${t("gitgraph.noGit.desc")}</div>
      <div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
        <button class="btn-action" onclick="initGit()">${t("gitgraph.noGit.btnInit")}</button>
        <button class="btn-action btn-secondary" onclick="openBackupDiff()">${t("gitgraph.noGit.btnBackup")}</button>
      </div>
    </div>
  `
      : `
    <div class="controls-row">
      <div class="filters">
        <button class="filter-btn active" onclick="setFilter('all', event)">${t("gitgraph.filter.all", totalCommits)}</button>
        <button class="filter-btn" onclick="setFilter('dat', event)">📍 ${t("gitgraph.filter.dat")} (${datCommitsCount})</button>
        <button class="filter-btn" onclick="setFilter('src', event)">⚡ ${t("gitgraph.filter.src")} (${srcCommitsCount})</button>
      </div>
      <div class="search-box">
        <input class="search-input" id="searchInput" type="text" placeholder="${t("gitgraph.search.placeholder")}" oninput="onSearch()" />
      </div>
    </div>

    <div class="graph-workspace">
      <div class="table-container">
        <table class="git-table">
          <thead>
            <tr>
              <th style="width: 70px;">Graph</th>
              <th>Description & Branches</th>
              <th style="width: 100px;">Date</th>
              <th style="width: 140px;">Author</th>
              <th style="width: 80px;">Commit</th>
            </tr>
          </thead>
          <tbody id="commitsTbody"></tbody>
        </table>
      </div>

      <div class="inspector-drawer" id="inspectorDrawer" style="display: none;">
        <div class="inspector-header">
          <div class="inspector-title" id="inspTitle"></div>
          <div style="display: flex; gap: 6px;">
            <button class="btn-action btn-secondary" onclick="copySelectedHash()">📋 ${t("gitgraph.btn.copyHash")}</button>
            <button class="btn-action btn-secondary" onclick="checkoutSelected()">🔄 ${t("gitgraph.details.checkout")}</button>
            <button class="btn-action btn-secondary" onclick="createBranchSelected()">🌿 ${t("gitgraph.details.branchHere")}</button>
          </div>
        </div>
        <div id="inspMeta" style="font-size: 11.5px; color: var(--muted);"></div>
        <div style="font-weight: 700; font-size: 12px; margin-top: 4px;">${t("gitgraph.details.files")}:</div>
        <div class="inspector-files" id="inspFiles"></div>
      </div>
    </div>
  `
  }

  <script>
    const vscode = acquireVsCodeApi();
    const allCommits = ${JSON.stringify(commits)};
    const branchPalette = ['#FF6600', '#00bcd4', '#4caf50', '#ab47bc', '#ff9800', '#29b6f6', '#e91e63', '#26a69a'];
    let activeFilter = 'all';
    let searchQuery = '';
    let selectedCommit = null;

    function setFilter(f, evt) {
      activeFilter = f;
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      if (evt && evt.target) evt.target.classList.add('active');
      render();
    }

    function onSearch() {
      searchQuery = (document.getElementById('searchInput').value || '').toLowerCase().trim();
      render();
    }

    function selectCommit(hash) {
      selectedCommit = allCommits.find(c => c.hash === hash) || null;
      document.querySelectorAll('#commitsTbody tr').forEach(tr => {
        tr.classList.toggle('selected', tr.getAttribute('data-hash') === hash);
      });
      renderInspector();
    }

    function renderInspector() {
      const drawer = document.getElementById('inspectorDrawer');
      if (!drawer) return;
      if (!selectedCommit) {
        drawer.style.display = 'none';
        return;
      }
      drawer.style.display = 'flex';
      document.getElementById('inspTitle').innerHTML = '<span>📦 #' + selectedCommit.hash + '</span> ' + escapeHtml(selectedCommit.subject);
      document.getElementById('inspMeta').innerHTML = '👤 ' + escapeHtml(selectedCommit.author) + ' &nbsp;|&nbsp; 🕒 ' + selectedCommit.date + ' &nbsp;|&nbsp; 🔗 Parents: ' + (selectedCommit.parents.join(', ') || 'Root');

      const filesContainer = document.getElementById('inspFiles');
      if (selectedCommit.files.length === 0) {
        filesContainer.innerHTML = '<span style="color:var(--muted); font-size:12px;">No modified files</span>';
      } else {
        filesContainer.innerHTML = selectedCommit.files.map(f => {
          const isDat = f.toLowerCase().endsWith('.dat');
          const isSrc = f.toLowerCase().endsWith('.src') || f.toLowerCase().endsWith('.sub');
          const isXml = f.toLowerCase().endsWith('.xml');
          const icon = isDat ? '📍' : isSrc ? '⚡' : isXml ? '🌐' : '📄';
          return '<button class="inspector-file-btn" onclick="openFileDiff(\\'' + selectedCommit.hash + '\\', \\'' + escapeHtml(f) + '\\')" title="${t("gitgraph.details.diffWorkspace")}">' + icon + ' ' + escapeHtml(f) + '</button>';
        }).join('');
      }
    }

    function copySelectedHash() {
      if (selectedCommit) {
        vscode.postMessage({ command: 'copyHash', hash: selectedCommit.hash });
      }
    }

    function checkoutSelected() {
      if (selectedCommit) {
        vscode.postMessage({ command: 'checkout', hash: selectedCommit.hash });
      }
    }

    function createBranchSelected() {
      if (selectedCommit) {
        vscode.postMessage({ command: 'createBranch', hash: selectedCommit.hash });
      }
    }

    function openFileDiff(hash, file) {
      vscode.postMessage({ command: 'openDiff', hash, file });
    }

    function snapshot() {
      vscode.postMessage({ command: 'snapshot' });
    }

    function initGit() {
      vscode.postMessage({ command: 'initGit' });
    }

    function openBackupDiff() {
      vscode.postMessage({ command: 'openBackupDiff' });
    }

    function fetchRemote() {
      vscode.postMessage({ command: 'fetch' });
    }

    function pullRemote() {
      vscode.postMessage({ command: 'pull' });
    }

    function pushRemote() {
      vscode.postMessage({ command: 'push' });
    }

    function escapeHtml(str) {
      if (!str) return '';
      return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    function render() {
      const tbody = document.getElementById('commitsTbody');
      if (!tbody) return;

      const filtered = allCommits.filter(c => {
        if (activeFilter === 'dat' && !c.hasDat) return false;
        if (activeFilter === 'src' && !c.hasSrc) return false;

        if (searchQuery) {
          const inSubject = (c.subject || '').toLowerCase().includes(searchQuery);
          const inAuthor = (c.author || '').toLowerCase().includes(searchQuery);
          const inHash = (c.hash || '').toLowerCase().includes(searchQuery);
          const inFiles = c.files.some(f => f.toLowerCase().includes(searchQuery));
          return inSubject || inAuthor || inHash || inFiles;
        }

        return true;
      });

      if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding:32px; color:var(--muted); font-size:13px;">${t("gitgraph.empty")}</td></tr>';
        return;
      }

      // Compute graph lanes
      let activeBranches = [];
      const rowHeight = 32;
      const colWidth = 14;

      const rowsHtml = filtered.map((c, idx) => {
        let lane = activeBranches.indexOf(c.hash);
        if (lane === -1) {
          lane = activeBranches.indexOf(null);
          if (lane === -1) {
            lane = activeBranches.length;
            activeBranches.push(c.hash);
          } else {
            activeBranches[lane] = c.hash;
          }
        }

        const color = branchPalette[lane % branchPalette.length];
        const cx = 10 + lane * colWidth;
        const cy = 16;

        // SVG lines
        let svg = '<svg width="' + Math.max(60, (activeBranches.length + 1) * colWidth + 10) + '" height="' + rowHeight + '" style="vertical-align:middle; display:block;">';
        
        // Pass-through lines for other active lanes
        activeBranches.forEach((b, lIndex) => {
          if (b && lIndex !== lane) {
            const lx = 10 + lIndex * colWidth;
            const lColor = branchPalette[lIndex % branchPalette.length];
            svg += '<line x1="' + lx + '" y1="0" x2="' + lx + '" y2="' + rowHeight + '" stroke="' + lColor + '" stroke-width="2" opacity="0.6"/>';
          }
        });

        // Current commit line
        svg += '<line x1="' + cx + '" y1="0" x2="' + cx + '" y2="' + (idx === filtered.length - 1 ? cy : rowHeight) + '" stroke="' + color + '" stroke-width="2"/>';
        // Commit Node Circle
        svg += '<circle cx="' + cx + '" cy="' + cy + '" r="4.5" fill="' + color + '" stroke="var(--bg)" stroke-width="2"/>';
        svg += '</svg>';

        // Update active branches for next row
        if (c.parents.length > 0) {
          activeBranches[lane] = c.parents[0];
          for (let p = 1; p < c.parents.length; p++) {
            activeBranches.push(c.parents[p]);
          }
        } else {
          activeBranches[lane] = null;
        }

        // Ref badges
        const refBadges = (c.refs || []).map(r => {
          const isHead = r.includes('HEAD') || r.includes('main') || r.includes('master');
          const isRemote = r.includes('origin') || r.includes('upstream');
          const isTag = r.includes('tag:');
          const badgeClass = isTag ? 'ref-tag' : isHead ? 'ref-head' : isRemote ? 'ref-remote' : 'ref-head';
          return '<span class="ref-badge ' + badgeClass + '">' + escapeHtml(r) + '</span>';
        }).join('');

        // KRL file type badges
        const krlBadges = [];
        if (c.hasDat) krlBadges.push('<span class="krl-badge krl-dat">📍 .DAT</span>');
        if (c.hasSrc) krlBadges.push('<span class="krl-badge krl-src">⚡ .SRC</span>');
        if (c.hasXml) krlBadges.push('<span class="krl-badge" style="background:rgba(171,71,188,0.15);color:#ab47bc;border:1px solid rgba(171,71,188,0.3);">🌐 .XML</span>');

        const isSelected = selectedCommit && selectedCommit.hash === c.hash;

        return '<tr class="' + (isSelected ? 'selected' : '') + '" data-hash="' + c.hash + '" onclick="selectCommit(\\'' + c.hash + '\\')">' +
          '<td class="td-graph">' + svg + '</td>' +
          '<td class="td-subject">' + refBadges + escapeHtml(c.subject) + krlBadges.join('') + '</td>' +
          '<td style="color:var(--muted); font-size:11.5px;">' + c.date + '</td>' +
          '<td style="color:var(--muted);">' + escapeHtml(c.author) + '</td>' +
          '<td class="commit-hash-cell" title="${t("gitgraph.btn.copyHash")}">' + c.hash + '</td>' +
          '</tr>';
      }).join('');

      tbody.innerHTML = rowsHtml;
      if (filtered.length > 0 && !selectedCommit) {
        selectCommit(filtered[0].hash);
      }
    }

    if (allCommits.length > 0) {
      render();
    }
  </script>
</body>
</html>`;
  };

  await updateWebview();

  gitGraphPanel.webview.onDidReceiveMessage(async (msg) => {
    switch (msg.command) {
      case "openDiff":
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
        break;

      case "copyHash":
        if (msg.hash) {
          await vscode.env.clipboard.writeText(msg.hash);
          vscode.window.showInformationMessage(
            `Commit hash #${msg.hash} copied to clipboard.`,
          );
        }
        break;

      case "checkout":
        if (msg.hash) {
          try {
            await execGit(["checkout", msg.hash], cwd);
            vscode.window.showInformationMessage(
              `Checked out commit #${msg.hash}`,
            );
            await updateWebview();
          } catch (e) {
            vscode.window.showErrorMessage(`Checkout failed: ${String(e)}`);
          }
        }
        break;

      case "createBranch":
        if (msg.hash) {
          const branchName = await vscode.window.showInputBox({
            prompt: "Enter new branch name:",
            placeHolder: "feature/touchup-cell-2",
            ignoreFocusOut: true,
          });
          if (branchName && branchName.trim()) {
            try {
              await execGit(["checkout", "-b", branchName.trim(), msg.hash], cwd);
              vscode.window.showInformationMessage(
                `Created and checked out branch '${branchName.trim()}' at #${msg.hash}`,
              );
              await updateWebview();
            } catch (e) {
              vscode.window.showErrorMessage(
                `Create branch failed: ${String(e)}`,
              );
            }
          }
        }
        break;

      case "fetch":
        try {
          await execGit(["fetch", "--all", "--prune"], cwd);
          vscode.window.showInformationMessage("Fetched all remote updates.");
          await updateWebview();
        } catch (e) {
          vscode.window.showErrorMessage(`Fetch failed: ${String(e)}`);
        }
        break;

      case "pull":
        try {
          await execGit(["pull"], cwd);
          vscode.window.showInformationMessage("Pulled latest changes.");
          await updateWebview();
        } catch (e) {
          vscode.window.showErrorMessage(`Pull failed: ${String(e)}`);
        }
        break;

      case "push":
        try {
          await execGit(["push"], cwd);
          vscode.window.showInformationMessage("Pushed commits to remote.");
          await updateWebview();
        } catch (e) {
          vscode.window.showErrorMessage(`Push failed: ${String(e)}`);
        }
        break;

      case "initGit":
        try {
          await execGit(["init"], cwd);
          await execGit(["add", "."], cwd);
          await execGit(
            ["commit", "-m", "feat(krl): initial project snapshot"],
            cwd,
          );
          vscode.window.showInformationMessage(t("gitgraph.notify.initSuccess"));
          await updateWebview();
        } catch (e) {
          vscode.window.showErrorMessage(
            t("gitgraph.notify.initError", String(e)),
          );
        }
        break;

      case "snapshot":
        try {
          const comment = await vscode.window.showInputBox({
            prompt: t("gitgraph.prompt.snapshot"),
            placeHolder: "Point touch-up / calibration snapshot",
            ignoreFocusOut: true,
          });
          if (comment && comment.trim()) {
            await execGit(["add", "**/*.dat", "**/*.src", "**/*.sub"], cwd);
            await execGit(
              ["commit", "-m", `touchup(points): ${comment.trim()}`],
              cwd,
            );
            vscode.window.showInformationMessage(
              t("gitgraph.notify.snapshotSuccess"),
            );
            await updateWebview();
          }
        } catch (e) {
          vscode.window.showErrorMessage(String(e));
        }
        break;

      case "openBackupDiff":
        await vscode.commands.executeCommand("krl.compareKrcBackup");
        break;
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
      "krl.viewLineHistory",
      viewLineHistoryCommand,
    ),
    vscode.commands.registerCommand(
      "krl.compareTwoRevisions",
      compareTwoRevisionsCommand,
    ),
    vscode.commands.registerCommand("krl.viewGitGraph", () =>
      openKrlGitGraphCommand(context),
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
