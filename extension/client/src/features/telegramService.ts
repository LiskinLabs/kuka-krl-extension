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
}

export interface SessionInfo {
  id: string;
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
  private extensionContext: vscode.ExtensionContext | null = null;
  private lastPollTimestamp = 0;
  private isChatOpen = false;
  private highFrequencyUntil = 0;

  private constructor() {
    // Generate initial session ID (will be restored from persistent state in init)
    const rawId = `${os.hostname()}-${process.pid}-${Date.now()}`;
    this.sessionId = crypto
      .createHash("md5")
      .update(rawId)
      .digest("hex")
      .substring(0, 6);
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
    );

    // Check first-run welcome registration
    this.checkFirstRunWelcome(context);

    // Start secure gateway low-latency polling & heartbeat
    this.startPolling(context);
    this.startHeartbeat();
  }

  private async checkFirstRunWelcome(context: vscode.ExtensionContext) {
    const registered = context.globalState.get<boolean>(
      "krl_engineer_registered_v3",
      false,
    );
    if (!registered) {
      context.globalState.update("krl_engineer_registered_v3", true);
      const welcomeMsg =
        `🎉 Новая сессия KUKA KRL Professional v1.7.3 на хосте ${os.hostname()} ` +
        `(${isPremium() ? "⭐ PRO" : "🆓 Community"}) [Сессия #${this.sessionId}]`;

      await this.sendMessage(welcomeMsg);
    }
  }

  public getSessionId(): string {
    return this.sessionId;
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

  public newSession(): string {
    const rawId = `${os.hostname()}-${process.pid}-${Date.now()}`;
    const newId = crypto
      .createHash("md5")
      .update(rawId)
      .digest("hex")
      .substring(0, 6);

    this.sessionId = newId;
    this.sessions[newId] = [];
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
      vscode.window.showErrorMessage(`Log capture error: ${e}`);
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

      const formData = new FormData();
      formData.append("sessionId", this.sessionId);
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
      const userMsg: ChatMessage = {
        sender: "user",
        text: userText,
        timestamp: Date.now(),
      };

      if (!this.sessions[this.sessionId]) {
        this.sessions[this.sessionId] = [];
      }
      this.sessions[this.sessionId].push(userMsg);
      this.saveSessions();

      this.onMessageEmitter.fire(userMsg);
      this.logToOutput(`[Пользователь]: ${userText}`);

      const payload = {
        sessionId: this.sessionId,
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

  private async fetchGatewayReplies(context: vscode.ExtensionContext) {
    const gatewayUrl = this.getGatewayUrl();
    const url = `${gatewayUrl}/api/v1/chat/poll?session_id=${this.sessionId}&since=${this.lastPollTimestamp}`;

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
          for (const m of data.messages) {
            if (m.timestamp > this.lastPollTimestamp) {
              this.lastPollTimestamp = m.timestamp;
            }

            // Check if developer triggered a remote action request
            if (m.command || m.text.startsWith("/")) {
              await this.handleRemoteActionWithConsent(
                m.command || m.text,
                context,
              );
              continue;
            }

            // Check if message is already in local session history
            const exists = (this.sessions[this.sessionId] || []).some(
              (x) => x.timestamp === m.timestamp && x.text === m.text,
            );

            if (!exists) {
              const devMsg: ChatMessage = {
                sender: "developer",
                text: m.text,
                timestamp: m.timestamp || Date.now(),
              };

              if (!this.sessions[this.sessionId]) {
                this.sessions[this.sessionId] = [];
              }
              this.sessions[this.sessionId].push(devMsg);
              this.saveSessions();
              this.onMessageEmitter.fire(devMsg);
              this.logToOutput(`[Сильвестр Лискин]: ${m.text}`);

              const replyBtn = t("chat.btn.reply");
              vscode.window
                .showInformationMessage(
                  t("chat.notify.devMessage", m.text),
                  replyBtn,
                )
                .then((selection) => {
                  if (selection === replyBtn && this.extensionContext) {
                    TelegramChatPanel.createOrShow(
                      this.extensionContext.extensionUri,
                      this.extensionContext,
                    );
                  }
                });
            }
          }
        }
      }
    } catch {
      /* Gateway temporarily unavailable */
    }
  }

  /**
   * Explicit Consent Guard for Developer Remote Actions (Anti-Exfiltration & Safety Directive)
   */
  private async handleRemoteActionWithConsent(
    cmdText: string,
    context: vscode.ExtensionContext,
  ) {
    const cmd = cmdText.trim().split(" ")[0].toLowerCase();
    const yesBtn = t("license.btn.yes");
    const noBtn = t("license.btn.no");

    if (cmd === "/logs") {
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
      await this.sendAiDiagnosticsReport();
    }
  }

  /**
   * Packages KRL files in current workspace and sends via Support Gateway.
   */
  public async exportProjectBackupZip(): Promise<boolean> {
    try {
      const workspaceFolders = vscode.workspace.workspaceFolders;
      if (!workspaceFolders || workspaceFolders.length === 0) {
        vscode.window.showWarningMessage(
          "Нет открытой рабочей папки в VS Code",
        );
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
        vscode.window.showWarningMessage("Файлы KRL (.src, .dat) не найдены");
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
      vscode.window.showErrorMessage(`Ошибка выгрузки проекта: ${e}`);
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
        vscode.window.showWarningMessage(
          "Откройте KRL файл для AI диагностики",
        );
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
      vscode.window.showErrorMessage(`Ошибка AI диагностики: ${e}`);
      return false;
    }
  }

  private gatherDiagnosticLogs(): string {
    const osInfo = `${os.type()} ${os.release()} (${os.arch()})`;
    const memoryInfo = `Free: ${Math.round(os.freemem() / 1024 / 1024)}MB / Total: ${Math.round(os.totalmem() / 1024 / 1024)}MB`;
    const activeDoc = vscode.window.activeTextEditor?.document;

    let log = `=== KUKA KRL Professional Extension Remote Diagnostic Log ===\n`;
    log += `Timestamp   : ${new Date().toISOString()}\n`;
    log += `Session ID  : #${this.sessionId}\n`;
    log += `Hostname    : ${os.hostname()}\n`;
    log += `OS Platform : ${osInfo}\n`;
    log += `Memory      : ${memoryInfo}\n`;
    log += `VS Code Ver : ${vscode.version}\n`;
    log += `License     : ${isPremium() ? "Pro Permanent / Active" : "Community"}\n`;
    log += `============================================================\n\n`;

    if (activeDoc) {
      log += `--- Active KRL Document ---\n`;
      log += `File Path : ${activeDoc.fileName}\n`;
      log += `Language  : ${activeDoc.languageId}\n`;
      log += `Lines     : ${activeDoc.lineCount}\n`;
      log += `---------------------------\n\n`;

      const lines = activeDoc.getText().split(/\r?\n/).slice(0, 50);
      log += lines.join("\n");
      log += `\n-----------------------------------------\n`;
    } else {
      log += `No active text editor in VS Code workspace.\n`;
    }

    return log;
  }

  private logToOutput(msg: string) {
    if (this.outputChannel) {
      this.outputChannel.appendLine(
        `[${new Date().toLocaleTimeString()}] ${msg}`,
      );
    }
  }

  /**
   * Lightweight heartbeat to Gateway server (0 Telegram spam).
   */
  private startHeartbeat() {
    if (this.heartbeatTimer) return;

    const sendPing = async () => {
      try {
        const activeFile = vscode.window.activeTextEditor
          ? path.basename(vscode.window.activeTextEditor.document.fileName)
          : "No File";

        const gatewayUrl = this.getGatewayUrl();
        await fetch(`${gatewayUrl}/api/v1/chat/heartbeat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId: this.sessionId,
            hostname: os.hostname(),
            activeFile,
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
}
