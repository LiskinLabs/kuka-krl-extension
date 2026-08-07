import * as vscode from "vscode";
import {
  TelegramChatService,
  ChatMessage,
  SessionInfo,
} from "./telegramService";
import { t } from "../i18n";

export class TelegramChatPanel {
  public static currentPanel: TelegramChatPanel | undefined;
  private readonly panel: vscode.WebviewPanel;
  private readonly extensionUri: vscode.Uri;
  private readonly context: vscode.ExtensionContext;
  private disposables: vscode.Disposable[] = [];

  private constructor(
    panel: vscode.WebviewPanel,
    extensionUri: vscode.Uri,
    context: vscode.ExtensionContext,
  ) {
    this.panel = panel;
    this.extensionUri = extensionUri;
    this.context = context;

    // Set webview content
    this.update();

    // Listen for panel closure
    this.panel.onDidDispose(() => this.dispose(), null, this.disposables);

    // Listen for messages from webview
    this.panel.webview.onDidReceiveMessage(
      async (message) => {
        const service = TelegramChatService.getInstance();

        switch (message.command) {
          case "sendMessage":
            if (message.text && message.text.trim()) {
              await service.sendMessage(message.text.trim());
              this.refreshWebview();
            }
            break;

          case "sendLogs":
            await service.sendDiagnosticLogs(
              this.context,
              t("chat.notify.logsSent"),
            );
            this.refreshWebview();
            break;

          case "sendFile":
            await service.promptAndSendFile();
            this.refreshWebview();
            break;

          case "newSession":
            const newId = service.newSession();
            vscode.window.showInformationMessage(
              t("chat.notify.newSession", newId),
            );
            this.refreshWebview();
            break;

          case "switchSession":
            if (message.sessionId) {
              service.switchSession(message.sessionId);
              this.refreshWebview();
            }
            break;

          case "deleteSession":
            if (message.sessionId) {
              const yesText = t("license.btn.yes");
              const noText = t("license.btn.no");
              const confirm = await vscode.window.showWarningMessage(
                t("chat.confirm.deleteSession", message.sessionId),
                yesText,
                noText,
              );
              if (confirm === yesText) {
                service.deleteSession(message.sessionId);
                vscode.window.showInformationMessage(
                  t("chat.notify.sessionDeleted", message.sessionId),
                );
                this.update();
              }
            }
            break;

          case "deleteAllSessions":
            {
              const yesText = t("license.btn.yes");
              const noText = t("license.btn.no");
              const confirm = await vscode.window.showWarningMessage(
                t("chat.confirm.deleteAllSessions"),
                yesText,
                noText,
              );
              if (confirm === yesText) {
                service.deleteAllSessions();
                vscode.window.showInformationMessage(
                  t("chat.notify.allSessionsDeleted"),
                );
                this.update();
              }
            }
            break;

          case "clearHistory":
            service.clearHistory();
            this.update();
            break;

          case "exportBackup":
            await vscode.commands.executeCommand("krl.exportBackupZip");
            break;

          case "sendAiDiag":
            await vscode.commands.executeCommand("krl.sendAiDiagnostics");
            break;
        }
      },
      null,
      this.disposables,
    );

    // Listen for real-time incoming messages from Telegram Bot
    const service = TelegramChatService.getInstance();
    service.onMessage(() => {
      this.refreshWebview();
    });
  }

  public static createOrShow(
    extensionUri: vscode.Uri,
    context: vscode.ExtensionContext,
  ) {
    const column = vscode.window.activeTextEditor
      ? vscode.window.activeTextEditor.viewColumn
      : undefined;

    if (TelegramChatPanel.currentPanel) {
      TelegramChatPanel.currentPanel.panel.reveal(column);
      TelegramChatPanel.currentPanel.refreshWebview();
      return;
    }

    const panel = vscode.window.createWebviewPanel(
      "kukaTelegramChat",
      t("chat.title"),
      column || vscode.ViewColumn.One,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
        localResourceRoots: [vscode.Uri.joinPath(extensionUri, "media")],
      },
    );

    TelegramChatPanel.currentPanel = new TelegramChatPanel(
      panel,
      extensionUri,
      context,
    );
  }

  private refreshWebview() {
    const service = TelegramChatService.getInstance();
    this.panel.webview.postMessage({
      command: "updateState",
      history: service.getHistory(),
      sessionId: service.getSessionId(),
      sessions: service.getAllSessions(),
      emptyTitle: t("chat.empty.title"),
      emptyDesc: t("chat.empty.desc"),
      userLabel: t("chat.sender.user"),
      devLabel: t("chat.sender.dev"),
      deliveredLabel: t("chat.status.delivered"),
    });
  }

  private update() {
    this.panel.webview.html = this.getHtmlForWebview();
  }

  public dispose() {
    TelegramChatPanel.currentPanel = undefined;
    this.panel.dispose();
    while (this.disposables.length) {
      const x = this.disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

  private getHtmlForWebview(): string {
    const service = TelegramChatService.getInstance();
    const sessionId = service.getSessionId();
    const history = service.getHistory();
    const sessions = service.getAllSessions();

    const emptyTitle = t("chat.empty.title");
    const emptyDesc = t("chat.empty.desc");
    const userLabel = t("chat.sender.user");
    const devLabel = t("chat.sender.dev");
    const deliveredLabel = t("chat.status.delivered");

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${t("chat.title")}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: var(--vscode-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif);
      font-size: var(--vscode-font-size, 13px);
      background-color: var(--vscode-editor-background, #0f172a);
      color: var(--vscode-editor-foreground, #f8fafc);
      display: flex;
      flex-direction: column;
      height: 100vh;
      box-sizing: border-box;
    }
    .chat-header {
      background: var(--vscode-sideBar-background, var(--vscode-editorGroupHeader-tabsBackground, #1e293b));
      padding: 10px 16px;
      border-bottom: 1px solid var(--vscode-widget-border, rgba(255,255,255,0.1));
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
      flex-shrink: 0;
    }
    .header-info {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .header-title {
      font-size: 14px;
      font-weight: 700;
      color: var(--vscode-editor-foreground, #ffffff);
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .session-select {
      background: var(--vscode-dropdown-background, var(--vscode-input-background, #0f172a));
      color: var(--vscode-dropdown-foreground, var(--vscode-input-foreground, #ffffff));
      border: 1px solid var(--vscode-dropdown-border, var(--vscode-input-border, #334155));
      padding: 4px 8px;
      border-radius: 6px;
      font-size: 11.5px;
      font-family: var(--vscode-editor-font-family, monospace);
      outline: none;
      cursor: pointer;
    }
    .header-actions {
      display: flex;
      gap: 6px;
      align-items: center;
    }
    .btn-action {
      background: var(--vscode-button-secondaryBackground, rgba(255, 255, 255, 0.08));
      color: var(--vscode-button-secondaryForeground, #e2e8f0);
      border: 1px solid var(--vscode-widget-border, transparent);
      padding: 5px 10px;
      border-radius: 6px;
      font-size: 11.5px;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 5px;
      transition: all 0.2s;
    }
    .btn-action:hover {
      background: var(--vscode-button-secondaryHoverBackground, rgba(255, 255, 255, 0.18));
    }
    .btn-primary {
      background: var(--vscode-button-background, #ff6600);
      color: var(--vscode-button-foreground, #ffffff);
      border: none;
    }
    .btn-primary:hover {
      background: var(--vscode-button-hoverBackground, #e65c00);
    }
    .btn-danger {
      background: var(--vscode-statusBarItem-errorBackground, #dc3545);
      color: #ffffff;
      border: none;
    }
    .btn-danger:hover {
      opacity: 0.9;
    }
    .chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .empty-state {
      margin: auto;
      text-align: center;
      color: var(--vscode-descriptionForeground, #94a3b8);
      max-width: 380px;
    }
    .empty-icon {
      font-size: 42px;
      margin-bottom: 8px;
    }
    .msg-row {
      display: flex;
      flex-direction: column;
      max-width: 80%;
    }
    .msg-row.user {
      align-self: flex-end;
      align-items: flex-end;
    }
    .msg-row.developer {
      align-self: flex-start;
      align-items: flex-start;
    }
    .msg-sender {
      font-size: 10px;
      color: var(--vscode-descriptionForeground, #94a3b8);
      margin-bottom: 3px;
      padding: 0 4px;
    }
    .msg-bubble {
      padding: 10px 14px;
      border-radius: 12px;
      font-size: 13px;
      line-height: 1.45;
      word-break: break-word;
      position: relative;
      box-shadow: 0 2px 6px rgba(0,0,0,0.15);
    }
    .msg-row.user .msg-bubble {
      background: var(--vscode-button-background, #1e40af);
      color: var(--vscode-button-foreground, #ffffff);
      border-bottom-right-radius: 2px;
    }
    .msg-row.developer .msg-bubble {
      background: var(--vscode-sideBar-background, #334155);
      color: var(--vscode-editor-foreground, #f1f5f9);
      border-bottom-left-radius: 2px;
      border: 1px solid var(--vscode-widget-border, #475569);
    }
    .msg-time {
      font-size: 9px;
      opacity: 0.75;
      margin-top: 4px;
      text-align: right;
    }
    .msg-status {
      font-size: 10px;
      color: var(--vscode-textLink-foreground, #38bdf8);
      margin-top: 2px;
      font-weight: 600;
    }
    .chat-footer {
      background: var(--vscode-sideBar-background, var(--vscode-editorGroupHeader-tabsBackground, #1e293b));
      padding: 12px 16px;
      border-top: 1px solid var(--vscode-widget-border, rgba(255,255,255,0.1));
      display: flex;
      gap: 10px;
      align-items: flex-end;
      flex-shrink: 0;
    }
    .chat-input {
      flex: 1;
      background: var(--vscode-input-background, #0f172a);
      border: 1px solid var(--vscode-input-border, #334155);
      color: var(--vscode-input-foreground, #ffffff);
      padding: 10px 12px;
      border-radius: 8px;
      font-size: 13px;
      font-family: inherit;
      resize: none;
      height: 38px;
      outline: none;
      box-sizing: border-box;
    }
    .chat-input:focus {
      border-color: var(--vscode-focusBorder, #ff6600);
    }
    .send-btn {
      background: var(--vscode-button-background, #ff6600);
      color: var(--vscode-button-foreground, #ffffff);
      border: none;
      padding: 10px 18px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 13px;
      cursor: pointer;
      height: 38px;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: background 0.15s;
    }
    .send-btn:hover {
      background: var(--vscode-button-hoverBackground, #e65c00);
    }
  </style>
</head>
<body>
  <div class="chat-header">
    <div class="header-info">
      <div class="header-title">
        <span>${t("chat.title")}</span>
      </div>
      <select id="session-select" class="session-select" onchange="switchSession(this.value)" title="${t("chat.session.tooltip")}">
        ${this.renderSessionOptions(sessions, sessionId)}
      </select>
    </div>
    <div class="header-actions">
      <button class="btn-action btn-primary" onclick="newSession()" title="${t("chat.btn.new.tooltip")}">${t("chat.btn.new")}</button>
      <button class="btn-action" onclick="sendFile()" title="${t("chat.btn.file.tooltip")}">${t("chat.btn.file")}</button>
      <button class="btn-action" onclick="sendLogs()" title="${t("chat.btn.logs.tooltip")}">${t("chat.btn.logs")}</button>
      <button class="btn-action btn-danger" onclick="deleteCurrentSession()" title="${t("chat.btn.delete.tooltip")}">${t("chat.btn.delete")}</button>
    </div>
  </div>

  <div class="chat-messages" id="messages-container">
    ${this.renderMessagesHtml(history)}
  </div>

  <div class="chat-footer">
    <textarea id="msg-input" class="chat-input" placeholder="${t("chat.input.placeholder")}" rows="1" onkeydown="handleKeyDown(event)"></textarea>
    <button class="send-btn" onclick="submitMessage()">${t("chat.btn.send")}</button>
  </div>

  <script>
    const vscode = acquireVsCodeApi();
    let currentLabels = {
      emptyTitle: ${JSON.stringify(emptyTitle)},
      emptyDesc: ${JSON.stringify(emptyDesc)},
      userLabel: ${JSON.stringify(userLabel)},
      devLabel: ${JSON.stringify(devLabel)},
      deliveredLabel: ${JSON.stringify(deliveredLabel)}
    };

    function submitMessage() {
      const input = document.getElementById('msg-input');
      const text = input.value.trim();
      if (!text) return;
      
      vscode.postMessage({ command: 'sendMessage', text: text });
      input.value = '';
    }

    function handleKeyDown(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        submitMessage();
      }
    }

    function sendLogs() {
      vscode.postMessage({ command: 'sendLogs' });
    }

    function sendFile() {
      vscode.postMessage({ command: 'sendFile' });
    }

    function newSession() {
      vscode.postMessage({ command: 'newSession' });
    }

    function switchSession(id) {
      vscode.postMessage({ command: 'switchSession', sessionId: id });
    }

    function deleteCurrentSession() {
      const select = document.getElementById('session-select');
      const id = select.value;
      vscode.postMessage({ command: 'deleteSession', sessionId: id });
    }

    function scrollToBottom() {
      const container = document.getElementById('messages-container');
      container.scrollTop = container.scrollHeight;
    }

    scrollToBottom();

    window.addEventListener('message', event => {
      const msg = event.data;
      if (msg.command === 'updateState') {
        if (msg.emptyTitle) currentLabels.emptyTitle = msg.emptyTitle;
        if (msg.emptyDesc) currentLabels.emptyDesc = msg.emptyDesc;
        if (msg.userLabel) currentLabels.userLabel = msg.userLabel;
        if (msg.devLabel) currentLabels.devLabel = msg.devLabel;
        if (msg.deliveredLabel) currentLabels.deliveredLabel = msg.deliveredLabel;

        renderSessionSelect(msg.sessions, msg.sessionId);
        renderHistory(msg.history);
      }
    });

    function renderSessionSelect(sessions, currentId) {
      const select = document.getElementById('session-select');
      if (!sessions || sessions.length === 0) return;

      let html = '';
      sessions.forEach(s => {
        const isCurrent = s.id === currentId;
        const timeStr = new Date(s.lastTime).toLocaleDateString([], {month:'numeric', day:'numeric'}) + ' ' + new Date(s.lastTime).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
        html += '<option value="' + s.id + '" ' + (isCurrent ? 'selected' : '') + '>Session #' + s.id + ' (' + s.msgCount + ' msgs | ' + timeStr + ')' + (isCurrent ? ' ★' : '') + '</option>';
      });
      select.innerHTML = html;
    }

    function renderHistory(history) {
      const container = document.getElementById('messages-container');
      if (!history || history.length === 0) {
        container.innerHTML = '<div class="empty-state"><div class="empty-icon">🤖</div><div style="font-weight:600; font-size:14px; margin-bottom:4px;">' + currentLabels.emptyTitle + '</div><div style="font-size:12px;">' + currentLabels.emptyDesc + '</div></div>';
        return;
      }

      let html = '';
      history.forEach(m => {
        const isUser = m.sender === 'user';
        const senderName = isUser ? currentLabels.userLabel : currentLabels.devLabel;
        const timeStr = new Date(m.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

        html += '<div class="msg-row ' + (isUser ? 'user' : 'developer') + '"><div class="msg-sender">' + senderName + '</div><div class="msg-bubble">' + escapeHtml(m.text) + '<div class="msg-time">' + timeStr + '</div>' + (isUser ? '<div class="msg-status">' + currentLabels.deliveredLabel + '</div>' : '') + '</div></div>';
      });

      container.innerHTML = html;
      scrollToBottom();
    }

    function escapeHtml(text) {
      const div = document.createElement('div');
      div.innerText = text;
      return div.innerHTML.replace(/\\n/g, '<br>');
    }
  </script>
</body>
</html>`;
  }

  private renderSessionOptions(
    sessions: SessionInfo[],
    currentId: string,
  ): string {
    if (!sessions || sessions.length === 0) {
      return `<option value="${currentId}">${t("chat.session.label", currentId, 0, "")}</option>`;
    }
    return sessions
      .map((s) => {
        const isCurrent = s.id === currentId;
        const timeStr =
          new Date(s.lastTime).toLocaleDateString([], {
            month: "numeric",
            day: "numeric",
          }) +
          " " +
          new Date(s.lastTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
        return `<option value="${s.id}" ${isCurrent ? "selected" : ""}>${t("chat.session.label", s.id, s.msgCount, timeStr)}${isCurrent ? " ★" : ""}</option>`;
      })
      .join("");
  }

  private renderMessagesHtml(history: ChatMessage[]): string {
    if (!history || history.length === 0) {
      return `
        <div class="empty-state">
          <div class="empty-icon">🤖</div>
          <div style="font-weight:600; font-size:14px; margin-bottom:4px;">${t("chat.empty.title")}</div>
          <div style="font-size:12px;">${t("chat.empty.desc")}</div>
        </div>
      `;
    }

    return history
      .map((m) => {
        const isUser = m.sender === "user";
        const senderName = isUser
          ? t("chat.sender.user")
          : t("chat.sender.dev");
        const timeStr = new Date(m.timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        return `
        <div class="msg-row ${isUser ? "user" : "developer"}">
          <div class="msg-sender">${senderName}</div>
          <div class="msg-bubble">
            ${this.escapeHtml(m.text)}
            <div class="msg-time">${timeStr}</div>
            ${isUser ? `<div class="msg-status">${t("chat.status.delivered")}</div>` : ""}
          </div>
        </div>
      `;
      })
      .join("");
  }

  private escapeHtml(text: string): string {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
      .replace(/\n/g, "<br>");
  }
}
