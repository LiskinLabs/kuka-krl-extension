import * as vscode from "vscode";
import * as os from "os";
import * as fs from "fs";
import * as path from "path";
import * as crypto from "crypto";
import { isPremium } from "./license";
import { t } from "../i18n";
import { TelegramChatPanel } from "./telegramChatPanel";

const BOT_TOKEN = "8895123367:AAHliBqzJ2Tz6lBSc_zfXRwMGawRzFVfDSU";
const TELEGRAM_API_BASE = `https://api.telegram.org/bot${BOT_TOKEN}`;

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
  private devChatId: number | string | null = null;
  private lastUpdateId = 0;
  private pollingTimer: NodeJS.Timeout | null = null;
  private outputChannel: vscode.OutputChannel | null = null;
  private onMessageEmitter = new vscode.EventEmitter<ChatMessage>();
  public readonly onMessage = this.onMessageEmitter.event;

  private sessionId: string;
  private sessions: Record<string, ChatMessage[]> = {};
  private extensionContext: vscode.ExtensionContext | null = null;

  private constructor() {
    // Default initial session ID
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

  public init(context: vscode.ExtensionContext) {
    this.extensionContext = context;
    this.outputChannel =
      vscode.window.createOutputChannel("KUKA Telegram Chat");

    // Load cached devChatId if available
    this.devChatId = context.globalState.get<number | string | null>(
      "krl_telegram_dev_chat_id",
      null,
    );

    // Load cached sessions history
    const savedSessions = context.globalState.get<
      Record<string, ChatMessage[]>
    >("krl_telegram_sessions_store", {});

    this.sessions = savedSessions || {};

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
    );

    // Start long-polling background worker & Heartbeat ping
    this.startPolling(context);
    this.startHeartbeat();
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
    // Sort descending by last activity time
    return list.sort((a, b) => b.lastTime - a.lastTime);
  }

  public switchSession(id: string): void {
    if (this.sessions[id]) {
      this.sessionId = id;
      this.saveSessions();
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
    return newId;
  }

  public clearHistory(): void {
    this.sessions[this.sessionId] = [];
    this.saveSessions();
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
  }

  public deleteAllSessions(): void {
    this.sessions = {};
    this.newSession();
    this.saveSessions();
  }

  private saveSessions(): void {
    if (this.extensionContext) {
      this.extensionContext.globalState.update(
        "krl_telegram_sessions_store",
        this.sessions,
      );
    }
  }

  /**
   * Prompts the user in VS Code to enter a message and sends it to Telegram.
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
   * Prompts user to pick any file from disk and send it to developer via Telegram.
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
      `📎 File: \`${fileName}\``,
    );
  }

  /**
   * Generates diagnostic logs and sends them to Telegram.
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
   * Sends a document / file / photo from VS Code to Telegram.
   */
  public async sendDocument(
    filePath: string,
    fileName: string,
    caption?: string,
  ): Promise<boolean> {
    try {
      if (!this.devChatId) {
        await this.fetchUpdatesAndDiscoverChatId();
      }

      if (!this.devChatId) {
        this.notifyDevNotConnected();
        return false;
      }

      if (!fs.existsSync(filePath)) {
        vscode.window.showErrorMessage(t("chat.notify.fileNotFound", filePath));
        return false;
      }

      const ext = path.extname(fileName).toLowerCase();
      const isPhoto = [
        ".png",
        ".jpg",
        ".jpeg",
        ".webp",
        ".gif",
        ".bmp",
      ].includes(ext);
      const apiEndpoint = isPhoto ? "sendPhoto" : "sendDocument";
      const fileField = isPhoto ? "photo" : "document";

      const fileBuffer = fs.readFileSync(filePath);
      const formData = new FormData();
      formData.append("chat_id", String(this.devChatId));

      const userRole = isPremium() ? "⭐ PRO (Industrial)" : "🆓 Community";
      const fullCaption =
        (caption ? `${caption}\n` : "") +
        `👤 *Engineer:* ${os.hostname()} (${userRole}) | *Session:* \`#${this.sessionId}\``;

      formData.append("caption", fullCaption);
      formData.append("parse_mode", "Markdown");

      const blob = new Blob([fileBuffer]);
      formData.append(fileField, blob, fileName);

      const response = await fetch(`${TELEGRAM_API_BASE}/${apiEndpoint}`, {
        method: "POST",
        body: formData,
      });

      const data = (await response.json()) as { ok: boolean };
      if (data.ok) {
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
        vscode.window.showErrorMessage(t("cc.notify.telegramFallback"));
        return false;
      }
    } catch (e) {
      vscode.window.showErrorMessage(`Telegram send error: ${e}`);
      return false;
    }
  }

  /**
   * Sends a message from VS Code to the Telegram Bot / Developer.
   */
  public async sendMessage(userText: string): Promise<boolean> {
    try {
      if (!this.devChatId) {
        await this.fetchUpdatesAndDiscoverChatId();
      }

      if (!this.devChatId) {
        this.notifyDevNotConnected();
        return false;
      }

      // Add to local history for current session
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

      // Format Telegram Markdown Message
      const userRole = isPremium() ? "⭐ PRO (Industrial)" : "🆓 Community";
      const payloadText =
        `💬 *Новое сообщение из VS Code*\n\n` +
        `👤 *От:* Инженер KRL (${userRole})\n` +
        `💻 *ПК:* \`${os.hostname()}\` | *Сессия:* \`#${this.sessionId}\`\n\n` +
        `📝 *Текст:*\n${this.escapeMarkdown(userText)}\n\n` +
        `✍️ _Ответьте на это сообщение в Telegram, чтобы передать ответ в VS Code!_`;

      const response = await fetch(`${TELEGRAM_API_BASE}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: this.devChatId,
          text: payloadText,
          parse_mode: "Markdown",
        }),
      });

      const data = (await response.json()) as { ok: boolean };
      if (data.ok) {
        vscode.window.showInformationMessage(t("cc.notify.telegramSent"));
        return true;
      } else {
        vscode.window.showErrorMessage(t("cc.notify.telegramFallback"));
        return false;
      }
    } catch (e) {
      vscode.window.showErrorMessage(`Ошибка отправки в Telegram: ${e}`);
      return false;
    }
  }

  /**
   * Periodically polls Telegram getUpdates for replies or commands from Developer.
   */
  private startPolling(context: vscode.ExtensionContext) {
    if (this.pollingTimer) return;

    const poll = async () => {
      try {
        await this.fetchUpdatesAndProcessReplies(context);
      } catch {
        /* ignore polling network glitches */
      } finally {
        this.pollingTimer = setTimeout(poll, 3500); // Check every 3.5 seconds
      }
    };

    poll();
  }

  private async fetchUpdatesAndDiscoverChatId() {
    try {
      const response = await fetch(
        `${TELEGRAM_API_BASE}/getUpdates?offset=${this.lastUpdateId + 1}`,
      );
      const data = (await response.json()) as {
        ok: boolean;
        result?: Array<{
          update_id: number;
          message?: { chat: { id: number } };
        }>;
      };

      if (data.ok && data.result && data.result.length > 0) {
        for (const update of data.result) {
          if (update.update_id > this.lastUpdateId) {
            this.lastUpdateId = update.update_id;
          }
          if (update.message?.chat?.id) {
            this.devChatId = update.message.chat.id;
          }
        }
      }
    } catch {
      /* ignore */
    }
  }

  private async fetchUpdatesAndProcessReplies(
    context: vscode.ExtensionContext,
  ) {
    const url = `${TELEGRAM_API_BASE}/getUpdates?offset=${this.lastUpdateId + 1}&timeout=2`;
    const response = await fetch(url);
    const data = (await response.json()) as {
      ok: boolean;
      result?: Array<{
        update_id: number;
        message?: {
          chat: { id: number };
          text?: string;
          reply_to_message?: {
            text?: string;
            caption?: string;
          };
        };
      }>;
    };

    if (!data.ok || !data.result || data.result.length === 0) {
      return;
    }

    for (const update of data.result) {
      if (update.update_id > this.lastUpdateId) {
        this.lastUpdateId = update.update_id;
      }

      const msg = update.message;
      if (!msg || !msg.text) continue;

      // Remember the developer chat ID
      if (msg.chat?.id) {
        this.devChatId = msg.chat.id;
        context.globalState.update("krl_telegram_dev_chat_id", msg.chat.id);
      }

      const rawText = msg.text.trim();

      // Remote Commands from Developer via Telegram Bot!
      if (rawText.startsWith("/")) {
        await this.handleRemoteCommand(rawText, context);
        continue;
      }

      // Smart Session Targeting Resolution
      let targetSessionId: string | null = null;

      // 1. Try extracting Session ID from reply_to_message
      const replyRef =
        msg.reply_to_message?.text || msg.reply_to_message?.caption || "";
      const matchReply =
        replyRef.match(/Сессия:\s*`?#?([a-f0-9]{6})`?/i) ||
        replyRef.match(/Session:\s*`?#?([a-f0-9]{6})`?/i);
      if (matchReply) {
        targetSessionId = matchReply[1].toLowerCase();
      }

      // 2. Try extracting hashtag from beginning of text (e.g., "#3a8c1f Привет")
      if (!targetSessionId) {
        const matchHashtag = rawText.match(/^#([a-f0-9]{6})\b/i);
        if (matchHashtag) {
          targetSessionId = matchHashtag[1].toLowerCase();
        }
      }

      // 3. Fallback: if only 1 session exists locally, target that session
      if (!targetSessionId && Object.keys(this.sessions).length === 1) {
        targetSessionId = this.sessionId;
      }

      // If no valid session match found in multi-session environment, notify developer to use Reply or Hashtag
      if (!targetSessionId || !this.sessions[targetSessionId]) {
        await this.sendRawTelegramText(
          `⚠️ *Сообщение не доставлено:*\n` +
            `Вы не указали, какому именно инженеру/сессии адресован ответ.\n\n` +
            `✍️ Нажмите *"Ответить"* (Reply) на конкретное сообщение инженера в Telegram или добавьте хэштег сессии в начале текста:\n` +
            `Например: \`#${this.sessionId} Ваш ответ...\``,
        );
        continue;
      }

      // Clean message text if hashtag was used
      const cleanText = rawText.replace(/^#[a-f0-9]{6}\s*/i, "");

      const devMsg: ChatMessage = {
        sender: "developer",
        text: cleanText,
        timestamp: Date.now(),
      };

      this.sessions[targetSessionId].push(devMsg);
      this.saveSessions();

      // If reply is for current active session, fire real-time event and notification
      if (targetSessionId === this.sessionId) {
        this.onMessageEmitter.fire(devMsg);
        this.logToOutput(`[Сильвестр Лискин (Telegram)]: ${cleanText}`);

        const replyBtn = t("chat.btn.reply");
        vscode.window
          .showInformationMessage(
            t("chat.notify.devMessage", cleanText),
            replyBtn,
          )
          .then((selection) => {
            if (selection === replyBtn) {
              TelegramChatPanel.createOrShow(context.extensionUri, context);
            }
          });
      }
    }
  }

  /**
   * Handles remote commands sent by Developer from Telegram Bot.
   */
  private async handleRemoteCommand(
    cmdText: string,
    context: vscode.ExtensionContext,
  ) {
    const cmd = cmdText.split(" ")[0].toLowerCase();

    if (cmd === "/start" || cmd === "/help") {
      const helpMsg =
        `🤖 *KUKA KRL Extension Remote Control Bot*\n\n` +
        `Доступные дистанционные команды:\n` +
        `• \`/logs\` — Автоматически выгрузить и прислать логи и отчёт состояния с ПК инженера\n` +
        `• \`/sysinfo\` — Показать системные характеристики ПК и открытые файлы\n` +
        `• \`/ping\` — Проверить статус активности VS Code у инженера`;
      await this.sendRawTelegramText(helpMsg);
    } else if (cmd === "/ping") {
      const pingMsg =
        `🟢 *VS Code Online & Active!*\n` +
        `💻 ПК: \`${os.hostname()}\` | Сессия: \`#${this.sessionId}\`\n` +
        `⏱ Время: ${new Date().toLocaleTimeString()}`;
      await this.sendRawTelegramText(pingMsg);
    } else if (cmd === "/sysinfo") {
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
      await this.sendRawTelegramText(sysMsg);
    } else if (cmd === "/logs") {
      await this.sendRawTelegramText(
        `⏳ *Запрос логов принят.* Собираем и отправляем данные с ПК инженера...`,
      );
      await this.sendDiagnosticLogs(
        context,
        `📊 *Логи выгружены по удаленному запросу /logs*`,
      );
    }
  }

  private async sendRawTelegramText(text: string) {
    if (!this.devChatId) return;
    try {
      await fetch(`${TELEGRAM_API_BASE}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: this.devChatId,
          text: text,
          parse_mode: "Markdown",
        }),
      });
    } catch {
      /* ignore */
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

      log += `--- Document Preview (First 50 lines) ---\n`;
      const lines = activeDoc.getText().split(/\r?\n/).slice(0, 50);
      log += lines.join("\n");
      log += `\n-----------------------------------------\n`;
    } else {
      log += `No active text editor in VS Code workspace.\n`;
    }

    return log;
  }

  private notifyDevNotConnected() {
    const openBtn = "Открыть Telegram (@kukakrlbot)";
    vscode.window
      .showWarningMessage(
        "⚠️ Чат с разработчиком ещё не инициализирован. Откройте @kukakrlbot в Telegram и нажмите /start!",
        openBtn,
      )
      .then((chosen) => {
        if (chosen === openBtn) {
          vscode.env.openExternal(vscode.Uri.parse("https://t.me/kukakrlbot"));
        }
      });
  }

  private logToOutput(msg: string) {
    if (this.outputChannel) {
      this.outputChannel.appendLine(
        `[${new Date().toLocaleTimeString()}] ${msg}`,
      );
    }
  }

  private startHeartbeat() {
    const sendPing = async () => {
      if (!this.devChatId) return;
      try {
        const activeFile = vscode.window.activeTextEditor
          ? path.basename(vscode.window.activeTextEditor.document.fileName)
          : "No File";
        const pingPayload = `#heartbeat | session:${this.sessionId} | host:${os.hostname()} | file:${activeFile} | pro:${isPremium()}`;
        await fetch(`${TELEGRAM_API_BASE}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: this.devChatId,
            text: pingPayload,
            disable_notification: true,
          }),
        });
      } catch {
        /* ignore background network hiccups */
      }
    };

    sendPing();
    setInterval(sendPing, 90000); // Ping every 90 seconds
  }

  private escapeMarkdown(text: string): string {
    return text.replace(/[_*`\[\]]/g, "\\$&");
  }
}
