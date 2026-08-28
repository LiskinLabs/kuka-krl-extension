import * as vscode from "vscode";
import * as os from "os";
import * as fs from "fs";
import * as path from "path";
import * as crypto from "crypto";
import { isPremium } from "./license";
import { t } from "../i18n";
import { TelegramChatPanel } from "./telegramChatPanel";

export interface ChatMessage {
  sender: "user" | "developer";
  text: string;
  timestamp: number;
  attachment?: string;
  actionCommand?: string;
}

export interface SessionInfo {
  id: string;
  title?: string;
  msgCount: number;
  lastTime: number;
}

export class TelegramChatService {
  private static instance: TelegramChatService;
  private pollingTimer: NodeJS.Timeout | null = null;
  private heartbeatTimer: NodeJS.Timeout | null = null;
  private outputChannel: vscode.OutputChannel | null = null;
  private onMessageEmitter = new vscode.EventEmitter<ChatMessage>();
  public readonly onMessage = this.onMessageEmitter.event;

  private sessionId: string;
  private sessions: Record<string, ChatMessage[]> = {};
  private sessionTitles: Record<string, string> = {};
  private extensionContext: vscode.ExtensionContext | null = null;
  private sessionPollTimestamps: Record<string, number> = {};
  private isChatOpen = false;
  private highFrequencyUntil = 0;
  private executionLogs: string[] = [];
  private processedCommandKeys = new Set<string>();

  private constructor() {
    // Generate initial cryptographically random 16-hex-character session ID
    this.sessionId = crypto.randomBytes(8).toString("hex");
  }

  public static getInstance(): TelegramChatService {
    if (!TelegramChatService.instance) {
      TelegramChatService.instance = new TelegramChatService();
    }
    return TelegramChatService.instance;
  }

  public setChatOpen(open: boolean) {
    this.isChatOpen = open;
    if (open) {
      this.triggerImmediatePoll();
    }
  }

  public activateHighFrequencyPolling(durationMs: number = 180000) {
    this.highFrequencyUntil = Date.now() + durationMs;
  }

  public triggerImmediatePoll() {
    if (this.extensionContext) {
      this.fetchGatewayReplies(this.extensionContext).catch(() => {});
    }
  }

  /**
   * Get configured Liskin Labs Support Gateway URL.
   */
  private getGatewayUrl(): string {
    const config = vscode.workspace.getConfiguration("krl");
    const customUrl = config.get<string>("supportGatewayUrl");
    if (customUrl && customUrl.trim()) {
      return customUrl.trim().replace(/\/+$/, "");
    }
    return "https://kuka-krl-support-gateway.redminotpro5.workers.dev";
  }

  public init(context: vscode.ExtensionContext) {
    this.extensionContext = context;
    this.outputChannel =
      vscode.window.createOutputChannel("KUKA Telegram Chat");

    // Load cached sessions history
    const savedSessions = context.globalState.get<
      Record<string, ChatMessage[]>
    >("krl_telegram_sessions_store", {});
    this.sessions = savedSessions || {};

    // Load cached session topic titles
    const savedTitles = context.globalState.get<Record<string, string>>(
      "krl_telegram_session_titles",
      {},
    );
    this.sessionTitles = savedTitles || {};

    // Restore persistent session ID across restarts (Ensures offline replies reach the engineer)
    const savedActiveId = context.globalState.get<string>(
      "krl_telegram_active_session_id",
    );

    if (savedActiveId && this.sessions[savedActiveId]) {
      this.sessionId = savedActiveId;
    } else {
      const keys = Object.keys(this.sessions);
      if (keys.length > 0) {
        this.sessionId = keys[0];
      }
      context.globalState.update(
        "krl_telegram_active_session_id",
        this.sessionId,
      );
    }

    // Ensure current session exists in sessions store
    if (!this.sessions[this.sessionId]) {
      this.sessions[this.sessionId] = [];
    }

    // Initialize developer poll timestamps per session
    for (const [sId, msgs] of Object.entries(this.sessions)) {
      let maxDevTs = 0;
      for (const msg of msgs) {
        if (msg.sender === "developer" && msg.timestamp > maxDevTs) {
          maxDevTs = msg.timestamp;
        }
      }
      this.sessionPollTimestamps[sId] = maxDevTs;
    }

    // Register Commands
    context.subscriptions.push(
      vscode.commands.registerCommand("krl.openTelegramChat", () => {
        TelegramChatPanel.createOrShow(context.extensionUri, context);
      }),
      vscode.commands.registerCommand("krl.sendLogsToDeveloper", async () => {
        await this.sendDiagnosticLogs(context, "Логи расширения от инженера");
      }),
      vscode.commands.registerCommand("krl.sendFileToDeveloper", async () => {
        await this.promptAndSendFile();
      }),
      vscode.commands.registerCommand("krl.exportBackupZip", async () => {
        await this.exportProjectBackupZip();
      }),
      vscode.commands.registerCommand("krl.sendAiDiagnostics", async () => {
        await this.sendAiDiagnosticsReport();
      }),
      vscode.commands.registerCommand("krl.checkSupportStatus", async () => {
        await this.checkSupportStatus();
      }),
    );

    // Check first-run welcome registration
    this.checkFirstRunWelcome(context);

    // Start secure gateway low-latency polling & heartbeat
    this.startPolling(context);
    this.startHeartbeat();
  }

  private checkFirstRunWelcome(context: vscode.ExtensionContext) {
    const registered = context.globalState.get<boolean>(
      "krl_engineer_registered_v3",
      false,
    );
    if (!registered) {
      context.globalState.update("krl_engineer_registered_v3", true);
      this.logToOutput("KUKA KRL Professional session initialized.");
    }
  }

  public getSessionId(): string {
    return this.sessionId;
  }

  public getSessionTitle(id?: string): string {
    const targetId = id || this.sessionId;
    return this.sessionTitles[targetId] || "";
  }

  public setSessionTitle(id: string, title: string): void {
    if (title && title.trim()) {
      this.sessionTitles[id] = title.trim();
    } else {
      delete this.sessionTitles[id];
    }
    this.saveSessions();
  }

  public getHistory(): ChatMessage[] {
    return this.sessions[this.sessionId] || [];
  }

  public getAllSessions(): SessionInfo[] {
    const list: SessionInfo[] = [];
    for (const [id, msgs] of Object.entries(this.sessions)) {
      const lastMsg = msgs[msgs.length - 1];
      list.push({
        id,
        title: this.sessionTitles[id] || "",
        msgCount: msgs.length,
        lastTime: lastMsg ? lastMsg.timestamp : Date.now(),
      });
    }
    return list.sort((a, b) => b.lastTime - a.lastTime);
  }

  public switchSession(id: string): void {
    if (this.sessions[id]) {
      this.sessionId = id;
      this.saveSessions();
      this.triggerImmediatePoll();
    }
  }

  public newSession(customTitle?: string): string {
    const newId = crypto.randomBytes(8).toString("hex");

    this.sessionId = newId;
    this.sessions[newId] = [];
    this.sessionPollTimestamps[newId] = 0;
    if (customTitle && customTitle.trim()) {
      this.sessionTitles[newId] = customTitle.trim();
    }
    this.saveSessions();
    this.triggerImmediatePoll();
    return newId;
  }

  public clearHistory(): void {
    const currentId = this.sessionId;
    this.sessions[currentId] = [];
    this.saveSessions();
    this.notifySessionDeleted(currentId, "очистил историю чата").catch(
      () => {},
    );
  }

  public deleteSession(id: string): void {
    delete this.sessions[id];
    delete this.sessionTitles[id];
    const sessionKeys = Object.keys(this.sessions);
    if (sessionKeys.length === 0) {
      this.newSession();
    } else if (this.sessionId === id) {
      this.sessionId = sessionKeys[0];
    }
    this.saveSessions();
    this.notifySessionDeleted(id, "удалил сессию").catch(() => {});
  }

  public deleteAllSessions(): void {
    const oldIds = Object.keys(this.sessions);
    this.sessions = {};
    this.sessionTitles = {};
    this.newSession();
    this.saveSessions();
    for (const id of oldIds) {
      this.notifySessionDeleted(id, "удалил все сессии").catch(() => {});
    }
  }

  /**
   * Notifies the Support Gateway that a session has been closed or deleted by the engineer.
   */
  public async notifySessionDeleted(
    id: string,
    action: string = "удалил сессию",
  ): Promise<void> {
    try {
      const gatewayUrl = this.getGatewayUrl();
      await fetch(`${gatewayUrl}/api/v1/chat/close_session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: id,
          sessionTitle: this.sessionTitles[id] || undefined,
          hostname: os.hostname(),
          action,
          timestamp: Date.now(),
        }),
      });
    } catch {
      /* Gateway offline */
    }
  }

  private saveSessions(): void {
    if (this.extensionContext) {
      this.extensionContext.globalState.update(
        "krl_telegram_sessions_store",
        this.sessions,
      );
      this.extensionContext.globalState.update(
        "krl_telegram_session_titles",
        this.sessionTitles,
      );
      this.extensionContext.globalState.update(
        "krl_telegram_active_session_id",
        this.sessionId,
      );
    }
  }

  /**
   * Prompts the user in VS Code to enter a message and sends it via Gateway.
   */
  public async promptAndSendMessage(): Promise<boolean> {
    const text = await vscode.window.showInputBox({
      prompt: t("cc.prompt.telegram"),
      placeHolder: t("cc.prompt.telegram.placeholder"),
      ignoreFocusOut: true,
    });

    if (!text || !text.trim()) {
      return false;
    }

    return await this.sendMessage(text.trim());
  }

  /**
   * Prompts user to pick any file from disk and send it to developer via Gateway.
   */
  public async promptAndSendFile(): Promise<boolean> {
    const uris = await vscode.window.showOpenDialog({
      canSelectFiles: true,
      canSelectFolders: false,
      canSelectMany: false,
      openLabel: t("chat.notify.filePickLabel"),
      filters: {
        "Supported Files": [
          "png",
          "jpg",
          "jpeg",
          "webp",
          "gif",
          "bmp",
          "src",
          "dat",
          "sub",
          "log",
          "txt",
          "zip",
          "rar",
          "7z",
          "pdf",
          "xml",
          "json",
          "csv",
        ],
        "All Files (*.*)": ["*"],
      },
    });

    if (!uris || uris.length === 0) {
      return false;
    }

    const filePath = uris[0].fsPath;
    const fileName = path.basename(filePath);
    return await this.sendDocument(
      filePath,
      fileName,
      `📎 Файл от инженера: \`${fileName}\``,
    );
  }

  /**
   * Generates diagnostic logs and sends them via Gateway.
   */
  public async sendDiagnosticLogs(
    context: vscode.ExtensionContext,
    customCaption?: string,
  ): Promise<boolean> {
    try {
      const logsText = this.gatherDiagnosticLogs();
      const tempDir = context.globalStorageUri?.fsPath || os.tmpdir();
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }
      const logFilePath = path.join(
        tempDir,
        `krl-extension-${this.sessionId}.log`,
      );
      fs.writeFileSync(logFilePath, logsText, "utf8");

      const caption =
        customCaption ||
        `📊 *Extension Diagnostic Log*\n` +
          `💻 Host: \`${os.hostname()}\` | Session: \`#${this.sessionId}\``;

      return await this.sendDocument(
        logFilePath,
        `krl-log-${this.sessionId}.log`,
        caption,
      );
    } catch (e) {
      vscode.window.showErrorMessage(
        t("chat.error.logCaptureFailed", String(e)),
      );
      return false;
    }
  }

  /**
   * Sends a document / file / photo from VS Code to the Support Gateway.
   */
  public async sendDocument(
    filePath: string,
    fileName: string,
    caption?: string,
  ): Promise<boolean> {
    try {
      if (!fs.existsSync(filePath)) {
        vscode.window.showErrorMessage(t("chat.notify.fileNotFound", filePath));
        return false;
      }

      const fileBuffer = fs.readFileSync(filePath);
      const ext = path.extname(fileName).toLowerCase();
      const isPhoto = [
        ".png",
        ".jpg",
        ".jpeg",
        ".webp",
        ".gif",
        ".bmp",
      ].includes(ext);

      const topicTitle = this.getSessionTitle(this.sessionId);
      const formData = new FormData();
      formData.append("sessionId", this.sessionId);
      if (topicTitle) {
        formData.append("sessionTitle", topicTitle);
        formData.append("topicTitle", topicTitle);
      }
      formData.append("hostname", os.hostname());
      formData.append(
        "role",
        isPremium() ? "⭐ PRO (Industrial)" : "🆓 Community",
      );
      formData.append("caption", caption || `📎 File: ${fileName}`);
      formData.append("fileName", fileName);

      const blob = new Blob([fileBuffer]);
      formData.append("file", blob, fileName);

      const gatewayUrl = this.getGatewayUrl();
      const response = await fetch(`${gatewayUrl}/api/v1/chat/file`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const respData = (await response.json().catch(() => ({}))) as {
          ok?: boolean;
          telegramDelivery?: { ok?: boolean; error?: string; description?: string };
        };

        if (respData.telegramDelivery && respData.telegramDelivery.ok === false) {
          this.logToOutput(
            `[Gateway Warning]: Telegram delivery issue: ${respData.telegramDelivery.description || respData.telegramDelivery.error}`,
            "WARN",
          );
        }

        const fileMsg: ChatMessage = {
          sender: "user",
          text: isPhoto
            ? `🖼️ [Screenshot / Image]: ${fileName}`
            : `📎 [File]: ${fileName}`,
          timestamp: Date.now(),
          attachment: fileName,
        };

        if (!this.sessions[this.sessionId]) {
          this.sessions[this.sessionId] = [];
        }
        this.sessions[this.sessionId].push(fileMsg);
        this.saveSessions();
        this.onMessageEmitter.fire(fileMsg);

        const icon = isPhoto ? "🖼️ Image" : "📄 File";
        vscode.window.showInformationMessage(
          t("chat.notify.fileSent", icon, fileName),
        );
        this.logToOutput(`[Sent ${icon}]: ${fileName}`);
        return true;
      } else {
        vscode.window.showErrorMessage(t("chat.notify.devNotConnected"));
        return false;
      }
    } catch {
      vscode.window.showErrorMessage(t("chat.notify.devNotConnected"));
      return false;
    }
  }

  /**
   * Sends a message from VS Code to the Support Gateway.
   */
  public async sendMessage(userText: string): Promise<boolean> {
    try {
      let finalMsg = userText;
      const mentionRegex = /@([\w\-\.]+)/g;
      let match;
      const mentions = [];
      while ((match = mentionRegex.exec(userText)) !== null) {
        mentions.push(match[1]);
      }

      if (mentions.length > 0 && vscode.workspace.workspaceFolders) {
        const wsRoot = vscode.workspace.workspaceFolders[0].uri;
        for (const fileName of mentions) {
          try {
            const searchPattern = new vscode.RelativePattern(wsRoot.fsPath, `**/${fileName}`);
            const files = await vscode.workspace.findFiles(searchPattern, '**/node_modules/**', 1);
            if (files.length > 0) {
              const uint8Array = await vscode.workspace.fs.readFile(files[0]);
              const content = new TextDecoder().decode(uint8Array);
              const ext = fileName.split('.').pop() || 'txt';
              finalMsg += `\n\n📄 **${fileName}**:\n\`\`\`${ext}\n${content.substring(0, 2000)}\n\`\`\``;
            }
          } catch (e) {
            console.error("Mention resolution failed", e);
          }
        }
      }

      const userMsg: ChatMessage = {
        sender: "user",
        text: finalMsg,
        timestamp: Date.now(),
      };

      if (!this.sessions[this.sessionId]) {
        this.sessions[this.sessionId] = [];
      }
      this.sessions[this.sessionId].push(userMsg);
      this.saveSessions();

      this.onMessageEmitter.fire(userMsg);
      this.logToOutput(`[Пользователь]: ${userText}`);

      const topicTitle = this.getSessionTitle(this.sessionId);
      const payload = {
        sessionId: this.sessionId,
        sessionTitle: topicTitle || undefined,
        topicTitle: topicTitle || undefined,
        text: userText,
        hostname: os.hostname(),
        platform: `${os.platform()} ${os.release()} (${os.arch()})`,
        vscodeVersion: vscode.version,
        extensionVersion: "1.7.3",
        role: isPremium() ? "⭐ PRO (Industrial)" : "🆓 Community",
        activeFile: vscode.window.activeTextEditor
          ? path.basename(vscode.window.activeTextEditor.document.fileName)
          : "Нет",
        timestamp: Date.now(),
      };

      this.activateHighFrequencyPolling(180000);
      setTimeout(() => this.triggerImmediatePoll(), 600);
      setTimeout(() => this.triggerImmediatePoll(), 1800);

      const gatewayUrl = this.getGatewayUrl();

      // Post to Gateway REST API endpoint
      const resp = await fetch(`${gatewayUrl}/api/v1/chat/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (resp.ok) {
        const respData = (await resp.json().catch(() => ({}))) as {
          ok?: boolean;
          telegramDelivery?: { ok?: boolean; error?: string; description?: string };
        };

        if (respData.telegramDelivery && respData.telegramDelivery.ok === false) {
          this.logToOutput(
            `[Gateway Warning]: Telegram delivery issue: ${respData.telegramDelivery.description || respData.telegramDelivery.error}`,
            "WARN",
          );
        }

        vscode.window.showInformationMessage(t("cc.notify.telegramSent"));
        return true;
      } else {
        // Fallback for legacy admin-app endpoint
        await fetch(`${gatewayUrl}/api/post_from_vscode`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        vscode.window.showInformationMessage(t("cc.notify.telegramSent"));
        return true;
      }
    } catch {
      vscode.window.showWarningMessage(t("chat.notify.devNotConnected"));
      return false;
    }
  }

  /**
   * Periodically polls Gateway for developer replies with 0 race condition.
   * Uses adaptive interval: 1.2s when actively chatting or panel is open, 3.5s when idle.
   */
  private startPolling(context: vscode.ExtensionContext) {
    if (this.pollingTimer) return;

    const poll = async () => {
      try {
        await this.fetchGatewayReplies(context);
      } catch {
        /* Ignore transient network hiccups */
      } finally {
        const isHighFreq =
          this.isChatOpen || Date.now() < this.highFrequencyUntil;
        const interval = isHighFreq ? 1200 : 3500;
        this.pollingTimer = setTimeout(poll, interval);
      }
    };

    poll();
  }

  private getLastDevTimestamp(sessionId: string): number {
    const msgs = this.sessions[sessionId] || [];
    let maxDevTs = 0;
    for (const m of msgs) {
      if (m.sender === "developer" && m.timestamp > maxDevTs) {
        maxDevTs = m.timestamp;
      }
    }
    return this.sessionPollTimestamps[sessionId] ?? maxDevTs;
  }

  private async fetchGatewayReplies(context: vscode.ExtensionContext) {
    const gatewayUrl = this.getGatewayUrl();
    const currentSession = this.sessionId;
    const since = this.getLastDevTimestamp(currentSession);
    const url = `${gatewayUrl}/api/v1/chat/poll?session_id=${currentSession}&since=${since}`;

    try {
      const resp = await fetch(url);
      if (resp.ok) {
        const data = (await resp.json()) as {
          messages?: Array<{
            text: string;
            timestamp: number;
            command?: string;
          }>;
        };

        if (data && data.messages && data.messages.length > 0) {
          this.processIncomingMessages(data.messages, currentSession, context);
        }
      }

      // Background batch poll for any other known sessions
      const otherSessionIds = Object.keys(this.sessions).filter(
        (id) => id !== currentSession,
      );
      if (otherSessionIds.length > 0) {
        const batchUrl = `${gatewayUrl}/api/v1/chat/poll?session_ids=${encodeURIComponent(otherSessionIds.slice(0, 15).join(","))}&since=0`;
        const batchResp = await fetch(batchUrl);
        if (batchResp.ok) {
          const batchData = (await batchResp.json()) as {
            sessionMessages?: Record<
              string,
              Array<{ text: string; timestamp: number; command?: string }>
            >;
          };
          if (batchData && batchData.sessionMessages) {
            for (const [sid, msgs] of Object.entries(batchData.sessionMessages)) {
              if (msgs && msgs.length > 0) {
                this.processIncomingMessages(msgs, sid, context);
              }
            }
          }
        }
      }
    } catch {
      /* Gateway temporarily unavailable */
    }
  }

  private processIncomingMessages(
    messages: Array<{ text: string; timestamp: number; command?: string }>,
    targetSessionId: string,
    context: vscode.ExtensionContext,
  ) {
    for (const m of messages) {
      if (m.timestamp > (this.sessionPollTimestamps[targetSessionId] || 0)) {
        this.sessionPollTimestamps[targetSessionId] = m.timestamp;
      }

      // Check if developer triggered a remote action request
      const isCommand = Boolean(
        m.command || (m.text && m.text.startsWith("/")),
      );
      if (isCommand) {
        const cmdStr = (m.command || m.text).trim();
        const cmdKey = `${targetSessionId}:${m.timestamp}:${cmdStr}`;

        // Prevent replay: execute command ONLY IF:
        // 1. It has never been processed in this runtime session
        // 2. If recent (within 5 minutes): request immediate consent
        // 3. If offline/older: insert an interactive action card into chat timeline
        const isRecent = Boolean(
          m.timestamp && Math.abs(Date.now() - m.timestamp) < 300000,
        );
        if (!this.processedCommandKeys.has(cmdKey)) {
          this.processedCommandKeys.add(cmdKey);
          if (isRecent) {
            this.handleRemoteActionWithConsent(cmdStr, context).catch(() => {});
          } else {
            this.insertPendingActionCard(cmdStr, m.timestamp);
          }
        }
        continue;
      }

      // Check if message is already in local session history
      const exists = (this.sessions[targetSessionId] || []).some(
        (x) => x.timestamp === m.timestamp && x.text === m.text,
      );

      if (!exists) {
        const devMsg: ChatMessage = {
          sender: "developer",
          text: m.text,
          timestamp: m.timestamp || Date.now(),
        };

        if (!this.sessions[targetSessionId]) {
          this.sessions[targetSessionId] = [];
        }
        this.sessions[targetSessionId].push(devMsg);
        this.saveSessions();
        this.onMessageEmitter.fire(devMsg);
        this.logToOutput(`[Сильвестр Лискин (#${targetSessionId})]: ${m.text}`);

        const replyBtn = t("chat.btn.reply");
        vscode.window
          .showInformationMessage(
            t("chat.notify.devMessage", m.text),
            replyBtn,
          )
          .then((selection) => {
            if (selection === replyBtn && this.extensionContext) {
              if (this.sessionId !== targetSessionId) {
                this.switchSession(targetSessionId);
              }
              TelegramChatPanel.createOrShow(
                this.extensionContext.extensionUri,
                this.extensionContext,
              );
            }
          });
      }
    }
  }

  /**
   * Inserts an interactive action card into session history for offline/pending developer requests.
   */
  public insertPendingActionCard(cmdText: string, timestamp?: number): void {
    const cmd = cmdText.trim().split(" ")[0].toLowerCase();
    let actionTitle = "";

    if (cmd === "/logs") {
      actionTitle = "📊 Запрос выгрузки логов расширения";
    } else if (cmd === "/export_project" || cmd === "/backup") {
      actionTitle = "📁 Запрос экспорта проекта KRL";
    } else if (cmd === "/sysinfo") {
      actionTitle = "💻 Запрос системной информации ПК";
    } else if (cmd === "/ai_diag") {
      actionTitle = "🤖 Запрос AI-диагностики безопасности KRL";
    } else {
      return;
    }

    const actionMsg: ChatMessage = {
      sender: "developer",
      text: `🛠️ **Запрос от Сильвестр Лискин:**\n${actionTitle}`,
      timestamp: timestamp || Date.now(),
      actionCommand: cmd,
    };

    if (!this.sessions[this.sessionId]) {
      this.sessions[this.sessionId] = [];
    }

    const exists = this.sessions[this.sessionId].some(
      (x) => x.timestamp === actionMsg.timestamp && x.actionCommand === cmd,
    );
    if (!exists) {
      this.sessions[this.sessionId].push(actionMsg);
      this.saveSessions();
      this.onMessageEmitter.fire(actionMsg);
    }
  }

  /**
   * Explicit Consent Guard for Developer Remote Actions (Anti-Exfiltration & Safety Directive)
   */
  private async readAndSendFile(fileName: string) {
    if (!vscode.workspace.workspaceFolders || vscode.workspace.workspaceFolders.length === 0) {
      vscode.window.showErrorMessage("Нет открытого Workspace.");
      return;
    }
    const wsRoot = vscode.workspace.workspaceFolders[0].uri.fsPath;
    const searchPattern = new vscode.RelativePattern(wsRoot, `**/${fileName}`);
    const files = await vscode.workspace.findFiles(searchPattern, '**/node_modules/**', 1);
    
    if (files.length === 0) {
      this.sendMessage(`❌ Файл ${fileName} не найден в рабочем пространстве.`);
      return;
    }
    try {
      const uint8Array = await vscode.workspace.fs.readFile(files[0]);
      const content = new TextDecoder().decode(uint8Array);
      const ext = fileName.split('.').pop() || 'txt';
      this.sendMessage(`📄 **${fileName}**:\n\`\`\`${ext}\n${content.substring(0, 3000)}\n\`\`\``);
      vscode.window.showInformationMessage(`Файл ${fileName} отправлен.`);
    } catch (err) {
      vscode.window.showErrorMessage(`Ошибка при чтении файла`);
    }
  }

  public async handleRemoteActionWithConsent(
    cmdText: string,
    context: vscode.ExtensionContext,
  ) {
    const cmd = cmdText.trim().split(" ")[0].toLowerCase();
    const yesBtn = t("license.btn.yes");
    const noBtn = t("license.btn.no");

    if (cmd === "/read_file") {
      const fileName = cmdText.trim().substring("/read_file".length).trim();
      const actionName = `Чтение файла: ${fileName}`;
      const confirm = await vscode.window.showWarningMessage(
        `Telegram Support запрашивает удаленное действие: ${actionName}`,
        { modal: true },
        yesBtn,
        noBtn,
      );
      if (confirm === yesBtn) {
        await this.readAndSendFile(fileName);
      }
    } else if (cmd === "/logs") {
      const actionName = t("chat.consent.actionLogs");
      const confirm = await vscode.window.showWarningMessage(
        t("chat.consent.remoteAction", actionName),
        { modal: true },
        yesBtn,
        noBtn,
      );
      if (confirm === yesBtn) {
        await this.sendDiagnosticLogs(
          context,
          "📊 Логи выгружены по подтвержденному удаленному запросу /logs",
        );
      }
    } else if (cmd === "/export_project" || cmd === "/backup") {
      const actionName = t("chat.consent.actionProject");
      const confirm = await vscode.window.showWarningMessage(
        t("chat.consent.remoteAction", actionName),
        { modal: true },
        yesBtn,
        noBtn,
      );
      if (confirm === yesBtn) {
        await this.exportProjectBackupZip();
      }
    } else if (cmd === "/sysinfo") {
      const actionName = t("chat.consent.actionSysinfo");
      const confirm = await vscode.window.showWarningMessage(
        t("chat.consent.remoteAction", actionName),
        { modal: true },
        yesBtn,
        noBtn,
      );
      if (confirm === yesBtn) {
        const activeFile =
          vscode.window.activeTextEditor?.document.fileName ||
          "Нет открытого файла";
        const sysMsg =
          `💻 *Системная информация ПК Инженера*\n\n` +
          `• *Хост:* \`${os.hostname()}\`\n` +
          `• *ОС:* ${os.type()} ${os.release()} (${os.arch()})\n` +
          `• *Память:* ${Math.round(os.freemem() / 1024 / 1024)}MB свободно из ${Math.round(os.totalmem() / 1024 / 1024)}MB\n` +
          `• *VS Code:* v${vscode.version}\n` +
          `• *Статус:* ${isPremium() ? "⭐ PRO License" : "🆓 Community"}\n` +
          `• *Активный файл:* \`${path.basename(activeFile)}\``;
        await this.sendMessage(sysMsg);
      }
    } else if (cmd === "/ai_diag") {
      const actionName = "AI-диагностика безопасности KRL";
      const confirm = await vscode.window.showWarningMessage(
        t("chat.consent.remoteAction", actionName),
        { modal: true },
        yesBtn,
        noBtn,
      );
      if (confirm === yesBtn) {
        await this.sendAiDiagnosticsReport();
      }
    }
  }

  /**
   * Packages KRL files in current workspace and sends via Support Gateway.
   */
  public async exportProjectBackupZip(): Promise<boolean> {
    try {
      const workspaceFolders = vscode.workspace.workspaceFolders;
      if (!workspaceFolders || workspaceFolders.length === 0) {
        vscode.window.showWarningMessage(t("chat.warning.noWorkspace"));
        return false;
      }

      const rootPath = workspaceFolders[0].uri.fsPath;
      const krlFiles: string[] = [];

      const scanDir = (dir: string) => {
        if (!fs.existsSync(dir)) return;
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);
          if (entry.isDirectory()) {
            if (!entry.name.startsWith(".") && entry.name !== "node_modules") {
              scanDir(fullPath);
            }
          } else if (entry.isFile()) {
            const ext = path.extname(entry.name).toLowerCase();
            if (
              [".src", ".dat", ".sub", ".krl", ".xml", ".ini"].includes(ext)
            ) {
              krlFiles.push(fullPath);
            }
          }
        }
      };

      scanDir(rootPath);

      if (krlFiles.length === 0) {
        vscode.window.showWarningMessage(t("chat.warning.noKrlFiles"));
        return false;
      }

      let combinedContent = `=== KUKA KRL AUTOMATIC PROJECT EXPORT ===\n`;
      combinedContent += `Project Root: ${rootPath}\n`;
      combinedContent += `Timestamp: ${new Date().toISOString()}\n`;
      combinedContent += `Total Files: ${krlFiles.length}\n`;
      combinedContent += `==========================================\n\n`;

      for (const f of krlFiles.slice(0, 30)) {
        const rel = path.relative(rootPath, f);
        combinedContent += `\n--- FILE: ${rel} ---\n`;
        combinedContent += fs.readFileSync(f, "utf8");
        combinedContent += `\n---------------------\n`;
      }

      const exportFilePath = path.join(
        os.tmpdir(),
        `kuka-project-${this.sessionId}.krl.txt`,
      );
      fs.writeFileSync(exportFilePath, combinedContent, "utf8");

      return await this.sendDocument(
        exportFilePath,
        `kuka-project-${this.sessionId}.txt`,
        `📁 *Выгруженный проект KRL (${krlFiles.length} файлов)*`,
      );
    } catch (e) {
      vscode.window.showErrorMessage(t("chat.error.exportFailed", String(e)));
      return false;
    }
  }

  /**
   * Scans active editor file with AI diagnostic rules and sends report.
   */
  public async sendAiDiagnosticsReport(): Promise<boolean> {
    try {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showWarningMessage(t("chat.warning.noEditorOpen"));
        return false;
      }

      const code = editor.document.getText();
      const fileName = path.basename(editor.document.fileName);

      const issues: string[] = [];
      if (!code.match(/\$VEL\.CP\s*=/i)) {
        issues.push("⚠️ Не установлена скорость движения $VEL.CP!");
      }
      if (!code.match(/\$TOOL\s*=/i)) {
        issues.push("⚠️ Не задан инструмент $TOOL (TOOL_DATA)!");
      }
      if (!code.match(/\$BASE\s*=/i)) {
        issues.push("⚠️ Не задана база $BASE (BASE_DATA)!");
      }
      if (!code.match(/DEF\b/i) || !code.match(/END\b/i)) {
        issues.push("🚨 Незавершенная структура подпрограммы DEF ... END!");
      }
      if (code.match(/PTP\s+[A-Z0-9_]+\s+VEL\s*=\s*100%/i)) {
        issues.push(
          "⚠️ Высокая скорость PTP 100%! Возможен риск столкновения!",
        );
      }

      const summary =
        issues.length > 0
          ? issues.join("\n")
          : "✅ Замечаний безопасности не обнаружено. Структура KRL в норме.";

      const reportText =
        `🤖 *AI АВТОДИАГНОСТИКА KRL*\n\n` +
        `📄 *Файл:* \`${fileName}\`\n` +
        `💻 *ПК:* \`${os.hostname()}\` | *Сессия:* \`#${this.sessionId}\`\n\n` +
        `📊 *Результаты проверки:*\n${summary}`;

      return await this.sendMessage(reportText);
    } catch (e) {
      vscode.window.showErrorMessage(t("chat.error.aiDiagFailed", String(e)));
      return false;
    }
  }

  public logToOutput(
    msg: string,
    level: "INFO" | "WARN" | "ERROR" = "INFO",
    error?: unknown,
  ) {
    const timestamp = new Date().toLocaleTimeString();
    const errText =
      error instanceof Error ? error.stack || error.message : String(error);
    const formatted = `[${timestamp}] [${level}] ${msg}${error ? ` | Error: ${errText}` : ""}`;

    if (this.executionLogs.length > 150) {
      this.executionLogs.shift();
    }
    this.executionLogs.push(formatted);

    if (this.outputChannel) {
      this.outputChannel.appendLine(formatted);
    }
  }

  private gatherDiagnosticLogs(): string {
    const osInfo = `${os.type()} ${os.release()} (${os.arch()})`;
    const memFreeMb = Math.round(os.freemem() / 1024 / 1024);
    const memTotalMb = Math.round(os.totalmem() / 1024 / 1024);
    const memUsagePercent = Math.round(
      ((memTotalMb - memFreeMb) / memTotalMb) * 100,
    );
    const nodeMem = process.memoryUsage();
    const nodeHeapMb = Math.round(nodeMem.heapUsed / 1024 / 1024);

    const activeEditor = vscode.window.activeTextEditor;
    const activeDoc = activeEditor?.document;
    const config = vscode.workspace.getConfiguration("krl");

    let log = `================================================================================\n`;
    log += `               KUKA KRL PROFESSIONAL INDUSTRIAL DIAGNOSTIC REPORT               \n`;
    log += `================================================================================\n`;
    log += `Generated Timestamp : ${new Date().toISOString()} (Local: ${new Date().toLocaleString()})\n`;
    log += `Active Session ID   : #${this.sessionId}\n`;
    log += `Extension Version   : v1.7.3 (Industrial Suite)\n`;
    log += `License Status      : ${isPremium() ? "⭐ PRO (Industrial Commercial License)" : "🆓 Community Edition"}\n`;
    log += `--------------------------------------------------------------------------------\n`;
    log += `💻 SYSTEM & RUNTIME ENVIRONMENT\n`;
    log += `• Hostname          : ${os.hostname()}\n`;
    log += `• OS Platform       : ${osInfo}\n`;
    log += `• System Memory     : ${memFreeMb} MB Free / ${memTotalMb} MB Total (${memUsagePercent}% utilized)\n`;
    log += `• Node.js Heap      : ${nodeHeapMb} MB (Runtime: ${process.version})\n`;
    log += `• VS Code Version   : ${vscode.version} (App: ${vscode.env.appName})\n`;
    log += `• UI Locale         : ${vscode.env.language}\n`;
    log += `• Active Theme Kind : ColorThemeKind #${vscode.window.activeColorTheme.kind}\n`;
    log += `--------------------------------------------------------------------------------\n`;
    log += `⚙️ KRL EXTENSION CONFIGURATION\n`;
    log += `• krl.indentWidth        : ${config.get<number>("indentWidth", 3)}\n`;
    log += `• krl.alignAssignments   : ${config.get<boolean>("alignAssignments", true)}\n`;
    log += `• krl.errorLens.enabled  : ${config.get<boolean>("errorLens.enabled", true)}\n`;
    log += `• krl.validateNonAscii   : ${config.get<boolean>("validateNonAscii", true)}\n`;
    log += `• krl.inlayHints.enabled : ${config.get<boolean>("inlayHints.enabled", true)}\n`;
    log += `• krl.supportGatewayUrl  : ${this.getGatewayUrl()}\n`;
    log += `--------------------------------------------------------------------------------\n`;

    // Workspace & KRL Files Analysis
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (workspaceFolders && workspaceFolders.length > 0) {
      log += `📁 WORKSPACE OVERVIEW\n`;
      log += `• Root Folder : ${workspaceFolders[0].uri.fsPath}\n`;
      log += `• Folders Cnt : ${workspaceFolders.length}\n`;

      try {
        const krlFiles: string[] = [];
        const scanDir = (dir: string, depth: number = 0) => {
          if (depth > 5 || !fs.existsSync(dir)) return;
          const entries = fs.readdirSync(dir, { withFileTypes: true });
          for (const entry of entries) {
            const p = path.join(dir, entry.name);
            if (entry.isDirectory()) {
              if (
                !entry.name.startsWith(".") &&
                entry.name !== "node_modules"
              ) {
                scanDir(p, depth + 1);
              }
            } else if (entry.isFile()) {
              const ext = path.extname(entry.name).toLowerCase();
              if ([".src", ".dat", ".sub", ".krl", ".xml"].includes(ext)) {
                krlFiles.push(p);
              }
            }
          }
        };
        scanDir(workspaceFolders[0].uri.fsPath);
        log += `• KRL Files Found (${krlFiles.length}):\n`;
        for (const kf of krlFiles.slice(0, 30)) {
          const stats = fs.statSync(kf);
          const rel = path.relative(workspaceFolders[0].uri.fsPath, kf);
          log += `  - ${rel} (${(stats.size / 1024).toFixed(1)} KB)\n`;
        }
        if (krlFiles.length > 30) {
          log += `  ... and ${krlFiles.length - 30} more KRL files\n`;
        }
      } catch (err) {
        log += `• Error scanning workspace: ${err}\n`;
      }
    } else {
      log += `📁 WORKSPACE: No open workspace folder in VS Code.\n`;
    }

    log += `--------------------------------------------------------------------------------\n`;

    // Active Document & Detailed Compiler/LSP Diagnostics
    if (activeDoc) {
      log += `📄 ACTIVE DOCUMENT ANALYSIS\n`;
      log += `• File Path : ${activeDoc.fileName}\n`;
      log += `• Language  : ${activeDoc.languageId}\n`;
      log += `• Metrics   : ${activeDoc.lineCount} lines, ${activeDoc.getText().length} chars\n`;
      log += `• Dirty/Mod : ${activeDoc.isDirty ? "YES (Unsaved changes)" : "NO (Saved to disk)"}\n`;

      const docDiagnostics = vscode.languages.getDiagnostics(activeDoc.uri);
      log += `\n🚨 ACTIVE FILE COMPILER & LANGUAGE DIAGNOSTICS (${docDiagnostics.length} issues):\n`;
      if (docDiagnostics.length === 0) {
        log += `  ✅ 0 Errors / 0 Warnings reported on active file.\n`;
      } else {
        docDiagnostics.forEach((diag, idx) => {
          const sevStr =
            diag.severity === vscode.DiagnosticSeverity.Error
              ? "❌ ERROR"
              : diag.severity === vscode.DiagnosticSeverity.Warning
                ? "⚠️ WARNING"
                : diag.severity === vscode.DiagnosticSeverity.Information
                  ? "ℹ️ INFO"
                  : "💡 HINT";
          const line = diag.range.start.line + 1;
          const col = diag.range.start.character + 1;
          log += `  [#${idx + 1}] ${sevStr} (Line ${line}, Col ${col}) [${diag.source || "krl"}]: ${diag.message}\n`;
        });
      }

      // Summary of all diagnostics across workspace
      const allDiags = vscode.languages.getDiagnostics();
      let totalWsErrors = 0;
      let totalWsWarnings = 0;
      allDiags.forEach(([_, diags]) => {
        diags.forEach((d) => {
          if (d.severity === vscode.DiagnosticSeverity.Error) totalWsErrors++;
          if (d.severity === vscode.DiagnosticSeverity.Warning)
            totalWsWarnings++;
        });
      });
      log += `\n📊 WORKSPACE DIAGNOSTICS SUMMARY: ${totalWsErrors} Total Errors, ${totalWsWarnings} Total Warnings across all files.\n`;

      log += `\n📊 ACTIVE FILE STRUCTURE SUMMARY: Language ID: ${activeDoc.languageId}, Lines: ${activeDoc.lineCount}, Size: ${activeDoc.getText().length} chars\n`;
      log += `(Note: Raw source code lines are masked for IP security and industrial NDA compliance)\n`;
      log += `-------------------------------------------------\n`;
    } else {
      log += `📄 ACTIVE DOCUMENT: No active text editor currently open in VS Code.\n`;
    }

    log += `--------------------------------------------------------------------------------\n`;

    // Extension Execution Logs & Errors Ring Buffer
    log += `📋 EXTENSION RUNTIME EXECUTION & ERROR LOGS (${this.executionLogs.length} entries):\n`;
    if (this.executionLogs.length === 0) {
      log += `  (No runtime errors logged in current session)\n`;
    } else {
      this.executionLogs.forEach((entry) => {
        log += `  ${entry}\n`;
      });
    }

    log += `================================================================================\n`;
    log += `                             END OF DIAGNOSTIC LOG                             \n`;
    log += `================================================================================\n`;

    return log;
  }

  /**
   * Lightweight heartbeat to Gateway server (Safe & Privacy-Compliant).
   */
  private startHeartbeat() {
    if (this.heartbeatTimer) return;

    const sendPing = async () => {
      try {
        const config = vscode.workspace.getConfiguration("krl");
        const telemetryEnabled = config.get<boolean>("telemetry.enabled", true);
        if (!telemetryEnabled) return;

        // Privacy Guard: Only attach active file name if user actually has chat open
        const activeFile =
          this.isChatOpen && vscode.window.activeTextEditor
            ? path.basename(vscode.window.activeTextEditor.document.fileName)
            : undefined;

        const topicTitle = this.getSessionTitle(this.sessionId);
        const gatewayUrl = this.getGatewayUrl();
        await fetch(`${gatewayUrl}/api/v1/chat/heartbeat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId: this.sessionId,
            sessionTitle: topicTitle || undefined,
            hostname: os.hostname(),
            activeFile: activeFile || "Idle",
            role: isPremium() ? "⭐ PRO (Industrial)" : "🆓 Community",
            timestamp: Date.now(),
          }),
        });
      } catch {
        /* Gateway offline */
      }
    };

    sendPing();
    this.heartbeatTimer = setInterval(sendPing, 60000); // Heartbeat every 60 seconds
  }

  /**
   * Diagnostic test checking connection to the Support Gateway and Telegram bot.
   */
  public async checkSupportStatus(): Promise<void> {
    try {
      const gatewayUrl = this.getGatewayUrl();
      const resp = await fetch(`${gatewayUrl}/api/v1/status`);
      if (resp.ok) {
        const data = (await resp.json()) as {
          online?: boolean;
          botConfigured?: boolean;
          botUsername?: string;
          adminChatConfigured?: boolean;
          adminChatId?: string;
          webhookUrl?: string;
          pendingUpdateCount?: number;
          lastWebhookError?: string | null;
        };
        const botStatus = data.botConfigured
          ? `🟢 Бот @${data.botUsername || "connected"}`
          : "🔴 Бот не настроен";
        const adminStatus = data.adminChatConfigured
          ? "🟢 Чат администратора подключен"
          : "🟡 Чат администратора ожидает /connect";
        const hookStatus = data.lastWebhookError
          ? `⚠️ Ошибка вебхука: ${data.lastWebhookError}`
          : "🟢 Вебхук активен";
        vscode.window.showInformationMessage(
          `📡 Статус шлюза поддержки:\n• ${botStatus}\n• ${adminStatus}\n• ${hookStatus}`,
        );
      } else {
        vscode.window.showWarningMessage(
          `Шлюз поддержки ответил HTTP кодом: ${resp.status}`,
        );
      }
    } catch (e) {
      vscode.window.showErrorMessage(
        `Не удалось подключиться к шлюзу поддержки: ${e}`,
      );
    }
  }
}

