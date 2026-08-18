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
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src ${this.panel.webview.cspSource} https: data:; script-src ${this.panel.webview.cspSource} 'unsafe-inline'; style-src ${this.panel.webview.cspSource} 'unsafe-inline'; font-src ${this.panel.webview.cspSource};">
  <title>${t("chat.title")}</title>
  <style>
    :root {
      --kuka-orange: #ff6600;
      --kuka-orange-glow: rgba(255, 102, 0, 0.35);
      --cyber-cyan: #00e5ff;
      --status-emerald: #10b981;
      --panel-bg: var(--vscode-editor-background, #0b0f17);
      --header-bg: var(--vscode-sideBar-background, #121824);
      --card-bg: rgba(255, 255, 255, 0.04);
      --card-border: var(--vscode-widget-border, rgba(255, 255, 255, 0.08));
      --text-main: var(--vscode-editor-foreground, #f1f5f9);
      --text-muted: var(--vscode-descriptionForeground, #94a3b8);
      --radius-sm: 6px;
      --radius-md: 10px;
      --radius-lg: 14px;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 0;
      font-family: var(--vscode-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif);
      font-size: var(--vscode-font-size, 13px);
      background-color: var(--panel-bg);
      color: var(--text-main);
      display: flex;
      flex-direction: column;
      height: 100vh;
      overflow: hidden;
    }

    /* Top Command Header */
    .chat-header {
      background: var(--header-bg);
      padding: 12px 18px;
      border-bottom: 1px solid var(--card-border);
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
      flex-shrink: 0;
      backdrop-filter: blur(12px);
    }
    .header-left {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .brand-badge {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 700;
      font-size: 14px;
      letter-spacing: -0.2px;
      color: var(--text-main);
    }
    .brand-icon {
      width: 24px;
      height: 24px;
      background: linear-gradient(135deg, var(--kuka-orange) 0%, #ff8533 100%);
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 12px var(--kuka-orange-glow);
      font-size: 13px;
    }
    .gateway-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(16, 185, 129, 0.12);
      border: 1px solid rgba(16, 185, 129, 0.3);
      color: var(--status-emerald);
      padding: 3px 8px;
      border-radius: 12px;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.2px;
    }
    .gateway-pulse {
      width: 6px;
      height: 6px;
      background: var(--status-emerald);
      border-radius: 50%;
      box-shadow: 0 0 6px var(--status-emerald);
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(1.2); }
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .session-selector-wrap {
      display: flex;
      align-items: center;
      background: rgba(255,255,255,0.05);
      border: 1px solid var(--card-border);
      border-radius: var(--radius-sm);
      padding: 2px 6px;
    }
    .session-select {
      background: transparent;
      color: var(--text-main);
      border: none;
      font-size: 12px;
      font-family: var(--vscode-editor-font-family, monospace);
      outline: none;
      cursor: pointer;
      padding: 4px 6px;
    }
    .session-select option {
      background: var(--header-bg);
      color: var(--text-main);
    }

    .action-btn {
      background: var(--card-bg);
      color: var(--text-main);
      border: 1px solid var(--card-border);
      padding: 6px 11px;
      border-radius: var(--radius-sm);
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .action-btn:hover {
      background: rgba(255,255,255,0.1);
      border-color: var(--kuka-orange);
      transform: translateY(-1px);
    }
    .action-btn.primary {
      background: var(--kuka-orange);
      border-color: var(--kuka-orange);
      color: #ffffff;
      box-shadow: 0 2px 10px var(--kuka-orange-glow);
    }
    .action-btn.primary:hover {
      background: #e65c00;
    }
    .action-btn.danger {
      background: rgba(239, 68, 68, 0.12);
      border-color: rgba(239, 68, 68, 0.3);
      color: #f87171;
    }
    .action-btn.danger:hover {
      background: #ef4444;
      color: #ffffff;
    }

    /* Message Stream */
    .chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 20px 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      scroll-behavior: smooth;
    }

    .empty-hero {
      margin: auto;
      text-align: center;
      max-width: 440px;
      padding: 30px 20px;
      border-radius: var(--radius-lg);
      background: linear-gradient(180deg, rgba(255, 102, 0, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%);
      border: 1px solid var(--card-border);
    }
    .empty-hero-icon {
      font-size: 48px;
      margin-bottom: 12px;
      filter: drop-shadow(0 0 16px var(--kuka-orange-glow));
    }
    .empty-hero-title {
      font-size: 16px;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 6px;
    }
    .empty-hero-desc {
      font-size: 12.5px;
      color: var(--text-muted);
      line-height: 1.5;
      margin-bottom: 16px;
    }
    .quick-pill-row {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      justify-content: center;
    }
    .quick-pill {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid var(--card-border);
      color: var(--text-main);
      font-size: 11.5px;
      padding: 5px 10px;
      border-radius: 20px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .quick-pill:hover {
      border-color: var(--kuka-orange);
      background: rgba(255, 102, 0, 0.15);
      color: #ffffff;
    }

    /* Message Bubbles */
    .msg-row {
      display: flex;
      flex-direction: column;
      max-width: 78%;
      animation: msgSlide 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
    @keyframes msgSlide {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .msg-row.user {
      align-self: flex-end;
      align-items: flex-end;
    }
    .msg-row.developer {
      align-self: flex-start;
      align-items: flex-start;
    }
    .msg-sender-tag {
      font-size: 10.5px;
      font-weight: 600;
      color: var(--text-muted);
      margin-bottom: 4px;
      padding: 0 4px;
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .msg-bubble {
      padding: 12px 16px;
      border-radius: var(--radius-md);
      font-size: 13.5px;
      line-height: 1.5;
      word-break: break-word;
      box-shadow: 0 4px 14px rgba(0,0,0,0.25);
      position: relative;
    }
    .msg-row.user .msg-bubble {
      background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
      color: #ffffff;
      border-bottom-right-radius: 2px;
      border: 1px solid rgba(59, 130, 246, 0.3);
    }
    .msg-row.developer .msg-bubble {
      background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
      color: #f8fafc;
      border-bottom-left-radius: 2px;
      border: 1px solid var(--card-border);
    }

    .msg-meta-row {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 6px;
      margin-top: 6px;
      font-size: 10px;
      opacity: 0.8;
    }
    .msg-ticks {
      color: var(--cyber-cyan);
      font-weight: 700;
    }

    /* Code Block Formatting */
    pre.code-block {
      background: rgba(0, 0, 0, 0.45);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 6px;
      padding: 10px 12px;
      margin: 8px 0;
      font-family: var(--vscode-editor-font-family, 'JetBrains Mono', monospace);
      font-size: 12px;
      overflow-x: auto;
      position: relative;
    }
    code.inline-code {
      background: rgba(0, 0, 0, 0.35);
      border: 1px solid rgba(255, 255, 255, 0.12);
      padding: 2px 6px;
      border-radius: 4px;
      font-family: var(--vscode-editor-font-family, 'JetBrains Mono', monospace);
      font-size: 12px;
      color: var(--cyber-cyan);
    }
    .krl-kw { color: #ff9933; font-weight: 700; }
    .krl-var { color: #38bdf8; font-weight: 600; }

    /* Footer & Smart Input Station */
    .chat-footer {
      background: var(--header-bg);
      padding: 14px 20px;
      border-top: 1px solid var(--card-border);
      display: flex;
      flex-direction: column;
      gap: 10px;
      flex-shrink: 0;
    }
    .input-row {
      display: flex;
      gap: 10px;
      align-items: flex-end;
    }
    .chat-input {
      flex: 1;
      background: rgba(0, 0, 0, 0.3);
      border: 1px solid var(--card-border);
      color: var(--text-main);
      padding: 11px 14px;
      border-radius: var(--radius-md);
      font-size: 13px;
      font-family: inherit;
      resize: none;
      min-height: 42px;
      max-height: 120px;
      outline: none;
      transition: border 0.2s;
      line-height: 1.4;
    }
    .chat-input:focus {
      border-color: var(--kuka-orange);
      box-shadow: 0 0 10px var(--kuka-orange-glow);
    }
    .send-btn {
      background: linear-gradient(135deg, var(--kuka-orange) 0%, #ff8533 100%);
      color: #ffffff;
      border: none;
      padding: 11px 20px;
      border-radius: var(--radius-md);
      font-weight: 700;
      font-size: 13px;
      cursor: pointer;
      height: 42px;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 3px 12px var(--kuka-orange-glow);
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .send-btn:hover {
      background: #e65c00;
      transform: translateY(-1px);
    }
    .footer-hint {
      font-size: 11px;
      color: var(--text-muted);
      display: flex;
      justify-content: space-between;
      padding: 0 4px;
    }
  </style>
</head>
<body>
  <div class="chat-header">
    <div class="header-left">
      <div class="brand-badge">
        <div class="brand-icon">⚡</div>
        <span>${t("chat.title")}</span>
      </div>
      <div class="gateway-pill" title="Connected to Liskin Labs Serverless Support Gateway">
        <div class="gateway-pulse"></div>
        <span>Cloudflare Relay: Online</span>
      </div>
    </div>
    <div class="header-right">
      <div class="session-selector-wrap" title="${t("chat.session.tooltip")}">
        <select id="session-select" class="session-select" onchange="switchSession(this.value)">
          ${this.renderSessionOptions(sessions, sessionId)}
        </select>
      </div>
      <button class="action-btn primary" onclick="newSession()" title="${t("chat.btn.new.tooltip")}">${t("chat.btn.new")}</button>
      <button class="action-btn" onclick="sendFile()" title="${t("chat.btn.file.tooltip")}">${t("chat.btn.file")}</button>
      <button class="action-btn" onclick="sendLogs()" title="${t("chat.btn.logs.tooltip")}">${t("chat.btn.logs")}</button>
      <button class="action-btn" onclick="sendAiDiag()" title="Run AI Industrial Safety Check">🛡️ Safety</button>
      <button class="action-btn danger" onclick="deleteCurrentSession()" title="${t("chat.btn.delete.tooltip")}">🗑️</button>
    </div>
  </div>

  <div class="chat-messages" id="messages-container">
    ${this.renderMessagesHtml(history)}
  </div>

  <div class="chat-footer">
    <div class="input-row">
      <textarea id="msg-input" class="chat-input" placeholder="${t("chat.input.placeholder")}" rows="1" onkeydown="handleKeyDown(event)" oninput="autoResize(this)"></textarea>
      <button class="send-btn" onclick="submitMessage()">
        <span>${t("chat.btn.send")}</span>
      </button>
    </div>
    <div class="footer-hint">
      <span>💡 Нажмите <b>Enter</b> для отправки, <b>Shift+Enter</b> для новой строки</span>
      <span>Bot: @kukakrlbot</span>
    </div>
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

    function autoResize(el) {
      el.style.height = 'auto';
      el.style.height = Math.min(el.scrollHeight, 120) + 'px';
    }

    function submitMessage() {
      const input = document.getElementById('msg-input');
      const text = input.value.trim();
      if (!text) return;
      
      vscode.postMessage({ command: 'sendMessage', text: text });
      input.value = '';
      input.style.height = '42px';
    }

    function handleKeyDown(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        submitMessage();
      }
    }

    function sendLogs() { vscode.postMessage({ command: 'sendLogs' }); }
    function sendFile() { vscode.postMessage({ command: 'sendFile' }); }
    function sendAiDiag() { vscode.postMessage({ command: 'sendAiDiag' }); }
    function newSession() { vscode.postMessage({ command: 'newSession' }); }
    function switchSession(id) { vscode.postMessage({ command: 'switchSession', sessionId: id }); }
    function insertQuickPrompt(text) {
      const input = document.getElementById('msg-input');
      input.value = text;
      input.focus();
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
        html += '<option value="' + s.id + '" ' + (isCurrent ? 'selected' : '') + '>#' + s.id + ' (' + s.msgCount + ' msgs | ' + timeStr + ')' + (isCurrent ? ' ★' : '') + '</option>';
      });
      select.innerHTML = html;
    }

    function formatRichText(raw) {
      if (!raw) return '';
      // Escape HTML
      let s = raw.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      
      // Code blocks
      s = s.replace(/\`\`\`(krl)?\\n?([\\s\\S]*?)\`\`\`/gi, function(m, lang, code) {
        return '<pre class="code-block">' + highlightKrl(code) + '</pre>';
      });

      // Inline code
      s = s.replace(/\`([^\`]+)\`/g, function(m, code) {
        return '<code class="inline-code">' + highlightKrl(code) + '</code>';
      });

      // Bold & Italic
      s = s.replace(/\\*\\*([^\\*]+)\\*\\*/g, '<b>$1</b>');
      s = s.replace(/\\*([^\\*]+)\\*/g, '<i>$1</i>');
      
      // Newlines
      return s.replace(/\\n/g, '<br>');
    }

    function highlightKrl(code) {
      return code
        .replace(/\\b(PTP|LIN|CIRC|SPTP|SLIN|SCIRC|SPLINE|ENDSPLINE|DEF|DEFDAT|DEFFCT|END|ENDDAT|ENDFCT|IF|THEN|ELSE|ENDIF|LOOP|ENDLOOP|WHILE|ENDWHILE|WAIT|FOR|SWITCH|CASE|DEFAULT|ENDSWITCH|HALT|RETURN|EXIT|GLOBAL|INTERRUPT|DECL|BAS)\\b/gi, '<span class="krl-kw">$1</span>')
        .replace(/(\\$[A-Z0-9_\\.]+)/gi, '<span class="krl-var">$1</span>');
    }

    function renderHistory(history) {
      const container = document.getElementById('messages-container');
      if (!history || history.length === 0) {
        container.innerHTML = '<div class="empty-hero">' +
          '<div class="empty-hero-icon">🤖</div>' +
          '<div class="empty-hero-title">' + currentLabels.emptyTitle + '</div>' +
          '<div class="empty-hero-desc">' + currentLabels.emptyDesc + '</div>' +
          '<div class="quick-pill-row">' +
            '<div class="quick-pill" onclick="insertQuickPrompt(\\'Как настроить EthernetKRL (EKI)?\\')">💡 Настройка EKI</div>' +
            '<div class="quick-pill" onclick="insertQuickPrompt(\\'Синтаксис PTP и аппроксимации C_PTP\\')">⚡ Синтаксис PTP</div>' +
            '<div class="quick-pill" onclick="sendLogs()">📊 Отправить логи</div>' +
          '</div>' +
        '</div>';
        return;
      }

      let html = '';
      history.forEach(m => {
        const isUser = m.sender === 'user';
        const senderTag = isUser ? currentLabels.userLabel : currentLabels.devLabel;
        const timeStr = new Date(m.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

        html += '<div class="msg-row ' + (isUser ? 'user' : 'developer') + '">' +
          '<div class="msg-sender-tag">' + senderTag + '</div>' +
          '<div class="msg-bubble">' +
            formatRichText(m.text) +
            '<div class="msg-meta-row">' +
              '<span>' + timeStr + '</span>' +
              (isUser ? '<span class="msg-ticks">' + currentLabels.deliveredLabel + '</span>' : '') +
            '</div>' +
          '</div>' +
        '</div>';
      });

      container.innerHTML = html;
      scrollToBottom();
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
        return `<option value="${s.id}" ${isCurrent ? "selected" : ""}>#${s.id} (${s.msgCount} msgs | ${timeStr})${isCurrent ? " ★" : ""}</option>`;
      })
      .join("");
  }

  private renderMessagesHtml(history: ChatMessage[]): string {
    if (!history || history.length === 0) {
      return `
        <div class="empty-hero">
          <div class="empty-hero-icon">🤖</div>
          <div class="empty-hero-title">${t("chat.empty.title")}</div>
          <div class="empty-hero-desc">${t("chat.empty.desc")}</div>
          <div class="quick-pill-row">
            <div class="quick-pill" onclick="insertQuickPrompt('Как настроить EthernetKRL (EKI)?')">💡 Настройка EKI</div>
            <div class="quick-pill" onclick="insertQuickPrompt('Синтаксис PTP и аппроксимации C_PTP')">⚡ Синтаксис PTP</div>
            <div class="quick-pill" onclick="sendLogs()">📊 Отправить логи</div>
          </div>
        </div>
      `;
    }

    return history
      .map((m) => {
        const isUser = m.sender === "user";
        const senderTag = isUser ? t("chat.sender.user") : t("chat.sender.dev");
        const timeStr = new Date(m.timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        return `
        <div class="msg-row ${isUser ? "user" : "developer"}">
          <div class="msg-sender-tag">${senderTag}</div>
          <div class="msg-bubble">
            ${this.formatRichText(m.text)}
            <div class="msg-meta-row">
              <span>${timeStr}</span>
              ${isUser ? `<span class="msg-ticks">${t("chat.status.delivered")}</span>` : ""}
            </div>
          </div>
        </div>
      `;
      })
      .join("");
  }

  private formatRichText(raw: string): string {
    if (!raw) {
      return "";
    }
    let s = this.escapeHtml(raw);

    // Triple-backtick code blocks
    s = s.replace(
      /```(krl)?<br>?([\s\S]*?)```/gi,
      (_m, _lang, code) =>
        `<pre class="code-block">${this.highlightKrl(code)}</pre>`,
    );

    // Inline code
    s = s.replace(
      /`([^`]+)`/g,
      (_m, code) =>
        `<code class="inline-code">${this.highlightKrl(code)}</code>`,
    );

    // Bold & Italic
    s = s.replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>");
    s = s.replace(/\*([^*]+)\*/g, "<i>$1</i>");

    return s;
  }

  private highlightKrl(code: string): string {
    return code
      .replace(
        /\b(PTP|LIN|CIRC|SPTP|SLIN|SCIRC|SPLINE|ENDSPLINE|DEF|DEFDAT|DEFFCT|END|ENDDAT|ENDFCT|IF|THEN|ELSE|ENDIF|LOOP|ENDLOOP|WHILE|ENDWHILE|WAIT|FOR|SWITCH|CASE|DEFAULT|ENDSWITCH|HALT|RETURN|EXIT|GLOBAL|INTERRUPT|DECL|BAS)\b/gi,
        '<span class="krl-kw">$1</span>',
      )
      .replace(/(\$[A-Z0-9_\.]+)/gi, '<span class="krl-var">$1</span>');
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
