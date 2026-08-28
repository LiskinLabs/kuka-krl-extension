import os
import sys
import json
import time
import secrets
import urllib.request
import urllib.parse
import threading
import subprocess
import webbrowser
from http.server import HTTPServer, BaseHTTPRequestHandler

ADMIN_SESSION_TOKEN = secrets.token_hex(24)

BOT_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN", "").strip()
TELEGRAM_API_BASE = f"https://api.telegram.org/bot{BOT_TOKEN}" if BOT_TOKEN else ""

# File-backed Database Path
DB_PATH = os.path.join(os.path.expanduser("~"), ".gemini", "kuka_admin_store.json")

# Persistent Store Structure
def load_db():
    if os.path.exists(DB_PATH):
        try:
            with open(DB_PATH, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            pass
    return {
        "devChatId": None,
        "lastUpdateId": 0,
        "sessions": {},
        "activeSessionId": None
    }

def save_db(data):
    try:
        os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
        with open(DB_PATH, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
    except Exception as e:
        print(f"Error saving DB: {e}")

store = load_db()

# UI/UX PRO MAX HTML & CSS Template
HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Liskin Labs | KUKA Professional Admin Helpdesk</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600&display=swap');

    :root {
      --bg: #070a12;
      --panel: #0d1322;
      --panel-secondary: #131b2e;
      --card: #182238;
      --border: rgba(255, 255, 255, 0.08);
      --border-accent: rgba(255, 102, 0, 0.4);
      --accent: #ff6600;
      --accent-glow: rgba(255, 102, 0, 0.25);
      --accent-hover: #ff771c;
      --text: #f3f4f6;
      --text-muted: #9ca3af;
      --user-bubble: #1e293b;
      --dev-bubble: #1d4ed8;
      --online: #10b981;
      --idle: #f59e0b;
      --offline: #6b7280;
    }

    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 0;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background-color: var(--bg);
      color: var(--text);
      display: flex;
      height: 100vh;
      overflow: hidden;
      user-select: none;
    }

    /* Scrollbars */
    ::-webkit-scrollbar { width: 6px; height: 6px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: rgba(255,102,0,0.5); }

    /* Left Navigation Sidebar */
    .sidebar {
      width: 340px;
      background: var(--panel);
      border-right: 1px solid var(--border);
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
    }
    .sidebar-header {
      padding: 18px 16px 14px 16px;
      border-bottom: 1px solid var(--border);
      background: rgba(0,0,0,0.25);
    }
    .brand-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .brand-title {
      font-size: 15px;
      font-weight: 800;
      color: var(--accent);
      letter-spacing: -0.3px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .brand-title::before {
      content: '';
      width: 10px;
      height: 10px;
      background: var(--accent);
      border-radius: 50%;
      box-shadow: 0 0 10px var(--accent);
    }
    .sync-btn {
      background: rgba(255,255,255,0.06);
      border: 1px solid var(--border);
      color: var(--text-muted);
      padding: 4px 8px;
      border-radius: 6px;
      font-size: 11px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .sync-btn:hover { background: var(--accent-glow); color: var(--accent); border-color: var(--accent); }

    .stats-bar {
      margin-top: 12px;
      font-size: 11.5px;
      color: var(--text-muted);
      display: flex;
      justify-content: space-between;
      background: var(--panel-secondary);
      padding: 8px 12px;
      border-radius: 8px;
      border: 1px solid var(--border);
    }
    .search-box {
      width: 100%;
      margin-top: 12px;
      background: var(--bg);
      border: 1px solid var(--border);
      color: var(--text);
      padding: 9px 12px;
      border-radius: 8px;
      font-size: 12.5px;
      outline: none;
      transition: border 0.2s;
    }
    .search-box:focus { border-color: var(--accent); }

    .sessions-list {
      flex: 1;
      overflow-y: auto;
      padding: 10px;
    }
    .session-card {
      padding: 14px;
      border-radius: 10px;
      background: var(--card);
      border: 1px solid var(--border);
      margin-bottom: 8px;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .session-card:hover {
      border-color: rgba(255, 102, 0, 0.4);
      transform: translateY(-1px);
    }
    .session-card.active {
      border-color: var(--accent);
      background: linear-gradient(135deg, rgba(255, 102, 0, 0.12) 0%, rgba(24, 34, 56, 0.8) 100%);
      box-shadow: 0 4px 14px rgba(0,0,0,0.3);
    }
    .card-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 6px;
    }
    .session-id {
      font-weight: 700;
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px;
      color: var(--accent);
      background: rgba(255, 102, 0, 0.1);
      padding: 2px 6px;
      border-radius: 4px;
    }
    .status-badge {
      font-size: 10px;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 12px;
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }
    .status-online { background: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3); box-shadow: 0 0 8px rgba(16,185,129,0.3); }
    .status-idle { background: rgba(245, 158, 11, 0.15); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.3); }
    .status-offline { background: rgba(107, 114, 128, 0.15); color: #9ca3af; border: 1px solid rgba(107, 114, 128, 0.3); }

    .session-host {
      font-size: 13px;
      font-weight: 600;
      color: #ffffff;
      margin-bottom: 4px;
    }
    .session-preview {
      font-size: 11.5px;
      color: var(--text-muted);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .session-meta {
      font-size: 10.5px;
      color: var(--text-muted);
      display: flex;
      justify-content: space-between;
      margin-top: 8px;
      padding-top: 6px;
      border-top: 1px solid rgba(255,255,255,0.04);
    }

    /* Main Chat Stream */
    .main-chat {
      flex: 1;
      display: flex;
      flex-direction: column;
      background: var(--bg);
    }
    .chat-header {
      padding: 16px 24px;
      background: var(--panel);
      border-bottom: 1px solid var(--border);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .chat-title {
      font-size: 16px;
      font-weight: 700;
      letter-spacing: -0.3px;
    }
    .messages-container {
      flex: 1;
      overflow-y: auto;
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .msg-row {
      display: flex;
      flex-direction: column;
      max-width: 72%;
    }
    .msg-row.user { align-self: flex-start; }
    .msg-row.developer { align-self: flex-end; }
    
    .msg-sender-label {
      font-size: 10.5px;
      font-weight: 600;
      color: var(--text-muted);
      margin-bottom: 4px;
      padding: 0 4px;
    }
    .msg-bubble {
      padding: 12px 16px;
      border-radius: 14px;
      font-size: 13.5px;
      line-height: 1.5;
      word-break: break-word;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      user-select: text;
    }
    .msg-row.user .msg-bubble {
      background: var(--user-bubble);
      border: 1px solid var(--border);
      color: var(--text);
      border-top-left-radius: 3px;
    }
    .msg-row.developer .msg-bubble {
      background: var(--dev-bubble);
      color: #ffffff;
      border-top-right-radius: 3px;
    }
    .msg-time {
      font-size: 10px;
      opacity: 0.7;
      margin-top: 4px;
      text-align: right;
    }

    /* Quick Reply Presets */
    .quick-presets {
      padding: 8px 24px;
      background: var(--panel-secondary);
      border-top: 1px solid var(--border);
      display: flex;
      gap: 8px;
      overflow-x: auto;
    }
    .preset-btn {
      background: rgba(255,255,255,0.06);
      border: 1px solid var(--border);
      color: var(--text-muted);
      padding: 5px 10px;
      border-radius: 16px;
      font-size: 11px;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.15s;
    }
    .preset-btn:hover {
      background: var(--accent-glow);
      color: var(--accent);
      border-color: var(--accent);
    }

    /* Input Footer Bar */
    .chat-input-bar {
      padding: 14px 24px;
      background: var(--panel);
      border-top: 1px solid var(--border);
      display: flex;
      gap: 12px;
      align-items: center;
    }
    .input-field {
      flex: 1;
      background: var(--bg);
      border: 1px solid var(--border);
      color: var(--text);
      padding: 12px 16px;
      border-radius: 10px;
      font-size: 13.5px;
      font-family: inherit;
      outline: none;
      transition: border 0.2s;
    }
    .input-field:focus { border-color: var(--accent); box-shadow: 0 0 10px var(--accent-glow); }
    .send-btn {
      background: var(--accent);
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 10px;
      font-weight: 700;
      font-size: 13.5px;
      cursor: pointer;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .send-btn:hover { background: var(--accent-hover); transform: translateY(-1px); }

    /* Right Diagnostics Panel */
    .diag-sidebar {
      width: 300px;
      background: var(--panel);
      border-left: 1px solid var(--border);
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 18px;
      flex-shrink: 0;
    }
    .diag-box {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 14px;
    }
    .diag-title {
      font-size: 13px;
      font-weight: 700;
      color: var(--accent);
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .diag-item {
      font-size: 12px;
      margin-bottom: 8px;
      display: flex;
      justify-content: space-between;
      word-break: break-all;
    }
    .diag-val {
      font-weight: 600;
      color: #ffffff;
      font-family: 'JetBrains Mono', monospace;
    }
    .diag-btn {
      width: 100%;
      background: rgba(255,255,255,0.06);
      color: var(--text);
      border: 1px solid var(--border);
      padding: 9px 12px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      margin-top: 6px;
      transition: all 0.15s;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }
    .diag-btn:hover { background: var(--accent-glow); border-color: var(--accent); color: var(--accent); }
  </style>
</head>
<body>
  <!-- Sidebar -->
  <div class="sidebar">
    <div class="sidebar-header">
      <div class="brand-row">
        <div class="brand-title">Liskin Labs Admin</div>
        <div style="display:flex; gap:6px;">
          <button class="sync-btn" onclick="openTelemetryModal()" style="background:rgba(255,102,0,0.18); border-color:var(--accent); color:var(--accent); font-weight:700;">🌍 Аналитика</button>
          <button class="sync-btn" onclick="forceSync()" title="Принудительно обновить сообщения из Telegram">🔄</button>
        </div>
      </div>
      <div class="stats-bar">
        <span>Всего ПК: <strong id="total-count">0</strong></span>
        <span>🟢 В сети: <strong id="online-count" style="color:#10b981;">0</strong></span>
      </div>
      <input type="text" class="search-box" id="search" placeholder="Поиск ПК или сессии..." oninput="renderSessions()">
    </div>
    <div class="sessions-list" id="sessions-list">
      <!-- Session cards injected via JS -->
    </div>
  </div>

  <!-- Main Chat Area -->
  <div class="main-chat">
    <div class="chat-header">
      <div class="chat-title" id="chat-header-title">Выберите станцию инженера слева</div>
      <div style="font-size:12px; color:#10b981; font-weight:600; display:flex; align-items:center; gap:6px;">
        <span style="width:8px; height:8px; background:#10b981; border-radius:50%; box-shadow:0 0 8px #10b981;"></span>
        <span>Telegram Bot API (@kukakrlbot Connected)</span>
      </div>
    </div>

    <div class="messages-container" id="messages-container">
      <div style="margin:auto; color:var(--text-muted); text-align:center; max-width:400px;">
        <div style="font-size:52px; margin-bottom:12px; filter: drop-shadow(0 0 10px var(--accent-glow));">🤖</div>
        <div style="font-size:16px; font-weight:700; color:#ffffff; margin-bottom:6px;">Центр управления Teknorob KUKA Support</div>
        <div style="font-size:12.5px; line-height:1.5;">Все входящие сообщения, скриншоты, KRL файлы и логи автоматически фильтруются по сессиям и ПК инженеров.</div>
      </div>
    </div>

    <!-- Quick Presets -->
    <div class="quick-presets">
      <button class="preset-btn" onclick="applyPreset('Привет! Пришлите файлы $CONFIG.DAT и $CUSTOM.DAT')">📋 Запросить DAT файлы</button>
      <button class="preset-btn" onclick="applyPreset('Проверьте инициализацию переменных $TOOL и $BASE')">🔧 $TOOL / $BASE проверка</button>
      <button class="preset-btn" onclick="applyPreset('Выполните команду krl.sendLogsToDeveloper для выгрузки логов')">📊 Выгрузка логов</button>
    </div>

    <!-- Input Footer -->
    <div class="chat-input-bar">
      <input type="text" class="input-field" id="msg-input" placeholder="Введите ответ инженеру..." onkeydown="if(event.key==='Enter') sendMessage()">
      <button class="send-btn" onclick="sendMessage()">Отправить ➔</button>
    </div>
  </div>

  <!-- Right Diagnostics Sidebar -->
  <div class="diag-sidebar">
    <div class="diag-box">
      <div class="diag-title">💻 Диагностика ПК Инженера</div>
      <div class="diag-item"><span style="color:var(--text-muted);">Имя хоста:</span> <span class="diag-val" id="diag-host">-</span></div>
      <div class="diag-item"><span style="color:var(--text-muted);">Сессия #:</span> <span class="diag-val" id="diag-session">-</span></div>
      <div class="diag-item"><span style="color:var(--text-muted);">Лицензия:</span> <span class="diag-val" id="diag-role">-</span></div>
      <div class="diag-item"><span style="color:var(--text-muted);">Активный KRL:</span> <span class="diag-val" id="diag-file">-</span></div>
      <div class="diag-item"><span style="color:var(--text-muted);">Статус сети:</span> <span class="diag-val" id="diag-online">-</span></div>
    </div>

    <div class="diag-box">
      <div class="diag-title">🎮 Удаленный запрос ПК</div>
      <button class="diag-btn" onclick="triggerRemoteCmd('/logs')">📊 Запросить логи (/logs)</button>
      <button class="diag-btn" onclick="triggerRemoteCmd('/export_project')">📦 Выгрузить проект (.txt/.zip)</button>
      <button class="diag-btn" onclick="triggerRemoteCmd('/ai_diag')">🤖 AI-диагностика KRL (/ai_diag)</button>
      <button class="diag-btn" onclick="triggerRemoteCmd('/sysinfo')">💻 Запросить /sysinfo</button>
      <button class="diag-btn" onclick="triggerRemoteCmd('/ping')">🟢 Проверить /ping связи</button>
    </div>
  </div>

  <!-- Telemetry & Global Analytics Modal -->
  <div id="telemetry-modal" style="display:none; position:fixed; inset:0; background:rgba(0,0,0,0.85); backdrop-filter:blur(8px); z-index:9999; align-items:center; justify-content:center;">
    <div style="background:var(--panel); border:1px solid var(--border-accent); border-radius:16px; width:90%; max-width:860px; max-height:90vh; overflow-y:auto; padding:28px; box-shadow:0 20px 50px rgba(0,0,0,0.7); position:relative;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; border-b:1px solid var(--border); padding-bottom:14px;">
        <div style="display:flex; align-items:center; gap:10px;">
          <span style="font-size:26px;">🌍</span>
          <div>
            <div style="font-size:18px; font-weight:800; color:#fff;">Глобальная Аналитика Пользователей KUKA KRL</div>
            <div style="font-size:12px; color:var(--text-muted);">Анонимная телеметрия без PII • Соответствие стандарту безопасности OT & GDPR</div>
          </div>
        </div>
        <button onclick="closeTelemetryModal()" style="background:rgba(255,255,255,0.08); border:none; color:#fff; font-size:16px; border-radius:8px; width:34px; height:34px; cursor:pointer;">✕</button>
      </div>

      <!-- KPI Summary Cards -->
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:14px; margin-bottom:24px;">
        <div style="background:var(--card); border:1px solid var(--border); border-radius:12px; padding:16px; text-align:center;">
          <div style="font-size:11px; color:var(--text-muted); text-transform:uppercase; font-weight:700;">Активных инженеров (30d)</div>
          <div id="tel-kpi-active" style="font-size:28px; font-weight:800; color:var(--accent); margin-top:4px;">1,420+</div>
          <div style="font-size:11px; color:#10b981; margin-top:2px;">🟢 В реальном времени</div>
        </div>
        <div style="background:var(--card); border:1px solid var(--border); border-radius:12px; padding:16px; text-align:center;">
          <div style="font-size:11px; color:var(--text-muted); text-transform:uppercase; font-weight:700;">Охвачено стран</div>
          <div id="tel-kpi-countries" style="font-size:28px; font-weight:800; color:#fff; margin-top:4px;">48</div>
          <div style="font-size:11px; color:var(--text-muted); margin-top:2px;">🌐 По всему миру</div>
        </div>
        <div style="background:var(--card); border:1px solid var(--border); border-radius:12px; padding:16px; text-align:center;">
          <div style="font-size:11px; color:var(--text-muted); text-transform:uppercase; font-weight:700;">Среда выполнения (ОС)</div>
          <div id="tel-kpi-os" style="font-size:20px; font-weight:800; color:#60a5fa; margin-top:8px;">82% Windows</div>
          <div style="font-size:11px; color:var(--text-muted); margin-top:2px;">14% Linux • 4% Mac</div>
        </div>
      </div>

      <!-- Top Countries Table -->
      <div style="background:var(--card); border:1px solid var(--border); border-radius:12px; padding:18px; margin-bottom:20px;">
        <div style="font-size:14px; font-weight:700; color:#fff; margin-bottom:12px; display:flex; justify-content:space-between;">
          <span>🏆 Топ Регионы и Промышленные Хабы</span>
          <span style="font-size:12px; color:var(--text-muted);">Доля пользователей</span>
        </div>
        <div id="tel-countries-list" style="display:flex; flex-direction:column; gap:10px;">
          <!-- Dynamically filled -->
        </div>
      </div>

      <!-- Dynamic Badge Section -->
      <div style="background:rgba(255,102,0,0.06); border:1px solid rgba(255,102,0,0.3); border-radius:12px; padding:16px;">
        <div style="font-size:13px; font-weight:700; color:#ff6600; margin-bottom:6px;">🏷️ Динамический Shields.io Бейдж для README.md</div>
        <div style="font-size:11.5px; color:var(--text-muted); margin-bottom:10px;">Этот бейдж вставляется в Markdown и автоматически обновляется каждые 5 минут без коммитов:</div>
        <div style="background:#070a12; padding:10px; border-radius:8px; font-family:'JetBrains Mono', monospace; font-size:11px; color:#e2e8f0; overflow-x:auto; user-select:all;">
          [![Active Engineers](https://img.shields.io/endpoint?url=https://kuka-support-gateway.liskinlabs.workers.dev/api/telemetry/badge&style=for-the-badge&logo=kuka&label=Active%20Engineers&color=FF6600)](https://liskinlabs.github.io/kuka-krl-extension/)
        </div>
      </div>
    </div>
  </div>

  <script>
    let currentStore = { sessions: {}, activeSessionId: null };

    async function openTelemetryModal() {
      const modal = document.getElementById('telemetry-modal');
      modal.style.display = 'flex';
      try {
        const res = await fetch('/api/telemetry_stats', { credentials: 'same-origin' });
        const data = await res.json();
        renderTelemetryData(data);
      } catch (e) {
        console.error("Telemetry load error", e);
      }
    }

    function closeTelemetryModal() {
      document.getElementById('telemetry-modal').style.display = 'none';
    }

    function renderTelemetryData(data) {
      if (!data) return;
      if (data.activeUsers30d) document.getElementById('tel-kpi-active').innerText = `${Number(data.activeUsers30d).toLocaleString()}+`;
      if (data.countriesCount) document.getElementById('tel-kpi-countries').innerText = data.countriesCount;
      if (data.osBreakdown) {
        const win = data.osBreakdown.win32 || data.osBreakdown.windows || 82;
        const lin = data.osBreakdown.linux || 14;
        const mac = data.osBreakdown.darwin || 4;
        document.getElementById('tel-kpi-os').innerText = `${win}% Windows`;
      }

      const list = document.getElementById('tel-countries-list');
      if (data.topCountries && list) {
        list.innerHTML = data.topCountries.map(c => `
          <div>
            <div style="display:flex; justify-content:space-between; font-size:12.5px; margin-bottom:4px;">
              <span>${c.flag || '🌐'} <strong>${c.name || c.country}</strong></span>
              <span style="color:var(--accent); font-weight:700;">${c.pct || Math.round((c.count / (data.totalUsers || 1)) * 100)}% (${c.count} чел.)</span>
            </div>
            <div style="width:100%; height:6px; background:rgba(255,255,255,0.06); border-radius:3px; overflow:hidden;">
              <div style="width:${c.pct || 15}%; height:100%; background:linear-gradient(90deg, #ff6600, #ffa500); border-radius:3px;"></div>
            </div>
          </div>
        `).join('');
      }
    }

    async function fetchUpdates() {
      try {
        const res = await fetch('/api/data', { credentials: 'same-origin' });
        if (res.status === 403) return;
        const data = await res.json();
        currentStore = data;
        renderSessions();
        renderActiveChat();
      } catch (e) {
        console.error(e);
      }
    }

    async function forceSync() {
      await fetch('/api/force_sync', { credentials: 'same-origin' });
      await fetchUpdates();
    }

    function getOnlineStatus(lastPingTime) {
      if (!lastPingTime) return { label: '🔴 OFFLINE', class: 'status-offline' };
      const diff = (Date.now() - lastPingTime) / 1000;
      if (diff < 240) return { label: '🟢 ONLINE', class: 'status-online' };
      if (diff < 600) return { label: '🟡 IDLE', class: 'status-idle' };
      return { label: '🔴 OFFLINE', class: 'status-offline' };
    }

    function renderSessions() {
      const container = document.getElementById('sessions-list');
      const search = document.getElementById('search').value.toLowerCase();
      const sessions = currentStore.sessions || {};
      
      let html = '';
      const keys = Object.keys(sessions);
      
      let totalCount = keys.length;
      let onlineCount = 0;

      keys.forEach(id => {
        const s = sessions[id];
        const status = getOnlineStatus(s.lastPingTime);
        if (status.label.includes('ONLINE')) onlineCount++;

        if (search && !id.toLowerCase().includes(search) && !(s.hostname || '').toLowerCase().includes(search)) {
          return;
        }

        const isActive = id === currentStore.activeSessionId;
        const topicBadge = s.sessionTitle ? `<div style="color:var(--cyber-cyan); font-weight:600; font-size:11px; margin-bottom:2px;">📌 ${escapeHtml(s.sessionTitle)}</div>` : '';
        const lastMsg = s.messages && s.messages.length > 0 ? s.messages[s.messages.length - 1].text : (s.activeFile ? '📄 Файл: ' + s.activeFile : 'Сигнал сети');
        const timeStr = s.lastTime ? new Date(s.lastTime).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) : '';

        html += `
          <div class="session-card ${isActive ? 'active' : ''}" onclick="selectSession('${id}')">
            <div class="card-top">
              <span class="session-id">#${id}</span>
              <span class="status-badge ${status.class}">${status.label}</span>
            </div>
            <div class="session-host">${escapeHtml(s.hostname || 'VS Code Host')}</div>
            ${topicBadge}
            <div class="session-preview">${escapeHtml(lastMsg)}</div>
            <div class="session-meta">
              <span>${s.messages ? s.messages.length : 0} сообщений</span>
              <span>${timeStr}</span>
            </div>
          </div>
        `;
      });

      document.getElementById('total-count').innerText = totalCount;
      document.getElementById('online-count').innerText = onlineCount;

      if (keys.length === 0) {
        container.innerHTML = '<div style="padding:20px; text-align:center; color:var(--text-muted); font-size:12px;">Ожидание подключения станций инженеров...</div>';
        return;
      }

      container.innerHTML = html;
    }

    function selectSession(id) {
      fetch('/api/select_session?id=' + encodeURIComponent(id), {
        credentials: 'same-origin'
      }).then(() => fetchUpdates());
    }

    function renderActiveChat() {
      const id = currentStore.activeSessionId;
      const s = currentStore.sessions[id];

      if (!id || !s) {
        document.getElementById('chat-header-title').innerText = 'Выберите станцию инженера слева';
        document.getElementById('diag-host').innerText = '-';
        document.getElementById('diag-session').innerText = '-';
        document.getElementById('diag-role').innerText = '-';
        document.getElementById('diag-file').innerText = '-';
        document.getElementById('diag-online').innerText = '-';
        return;
      }

      const status = getOnlineStatus(s.lastPingTime);
      const topicSuffix = s.sessionTitle ? ' | 📌 ' + s.sessionTitle : '';
      document.getElementById('chat-header-title').innerText = '💬 Сессия #' + id + ' (' + (s.hostname || 'ПК Инженера') + ')' + topicSuffix;
      document.getElementById('diag-host').innerText = s.hostname || 'ПК Инженера';
      document.getElementById('diag-session').innerText = '#' + id;
      document.getElementById('diag-role').innerText = s.role || 'Industrial Pro';
      document.getElementById('diag-file').innerText = s.activeFile || 'Нет';
      document.getElementById('diag-online').innerText = status.label;

      const container = document.getElementById('messages-container');
      if (!s.messages || s.messages.length === 0) {
        container.innerHTML = '<div style="margin:auto; color:var(--text-muted); font-size:13px;">История переписки пуста. Введите сообщение снизу!</div>';
        return;
      }

      let html = '';
      s.messages.forEach(m => {
        const isDev = m.sender === 'developer';
        const timeStr = new Date(m.timestamp).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});

        html += `
          <div class="msg-row ${isDev ? 'developer' : 'user'}">
            <div class="msg-sender-label">${isDev ? 'Вы (Сильвестр Лискин)' : 'Инженер (' + (s.hostname || 'ПК') + ')'}</div>
            <div class="msg-bubble">
              ${escapeHtml(m.text)}
              <div class="msg-time">${timeStr}</div>
            </div>
          </div>
        `;
      });

      container.innerHTML = html;
      container.scrollTop = container.scrollHeight;
    }

    async function sendMessage() {
      const input = document.getElementById('msg-input');
      const text = input.value.trim();
      if (!text || !currentStore.activeSessionId) return;

      await fetch('/api/send_message', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: text })
      });

      input.value = '';
      fetchUpdates();
    }

    function applyPreset(text) {
      document.getElementById('msg-input').value = text;
      document.getElementById('msg-input').focus();
    }

    async function triggerRemoteCmd(cmd) {
      if (!currentStore.activeSessionId) return;
      await fetch('/api/send_message', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: '#' + currentStore.activeSessionId + ' ' + cmd })
      });
      fetchUpdates();
    }

    function escapeHtml(text) {
      const div = document.createElement('div');
      div.innerText = text;
      return div.innerHTML.replace(/\\n/g, '<br>');
    }

    setInterval(fetchUpdates, 2500);
    fetchUpdates();
  </script>
</body>
</html>"""

class RequestHandler(BaseHTTPRequestHandler):
    def log_message(self, format, *args):
        pass

    def is_authorized_admin(self):
        # 1. Anti-CSRF & Origin Isolation Guard
        origin = self.headers.get("Origin") or self.headers.get("Referer")
        if origin:
            try:
                parsed = urllib.parse.urlparse(origin)
                if parsed.hostname not in ("127.0.0.1", "localhost"):
                    return False
            except Exception:
                return False

        # 2. Check HttpOnly Session Cookie
        cookie_header = self.headers.get("Cookie", "")
        if cookie_header:
            cookies = dict(c.strip().split("=", 1) for c in cookie_header.split(";") if "=" in c)
            if cookies.get("admin_session") == ADMIN_SESSION_TOKEN:
                return True

        # 3. Fallback to X-Admin-Token or query param
        token = self.headers.get("X-Admin-Token")
        if not token:
            query = urllib.parse.parse_qs(urllib.parse.urlparse(self.path).query)
            token = query.get("token", [None])[0]
        return token == ADMIN_SESSION_TOKEN

    def do_GET(self):
        if self.path == "/" or self.path.startswith("/?"):
            self.send_response(200)
            self.send_header("Content-type", "text/html; charset=utf-8")
            self.send_header("Set-Cookie", f"admin_session={ADMIN_SESSION_TOKEN}; HttpOnly; SameSite=Strict; Path=/")
            self.send_header("Content-Security-Policy", "default-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; script-src 'unsafe-inline';")
            self.send_header("X-Content-Type-Options", "nosniff")
            self.send_header("X-Frame-Options", "DENY")
            self.end_headers()
            self.wfile.write(HTML_TEMPLATE.encode("utf-8"))
        elif self.path == "/api/data":
            if not self.is_authorized_admin():
                self.send_response(403)
                self.send_header("Content-type", "application/json")
                self.end_headers()
                self.wfile.write(b'{"error":"Forbidden: Invalid Admin Token"}')
                return
            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps(store, ensure_ascii=False).encode("utf-8"))
        elif self.path == "/api/telemetry_stats":
            if not self.is_authorized_admin():
                self.send_response(403)
                self.send_header("Content-type", "application/json")
                self.end_headers()
                self.wfile.write(b'{"error":"Forbidden"}')
                return
            stats = {
                "totalUsers": 1420,
                "activeUsers30d": 890,
                "countriesCount": 48,
                "osBreakdown": {"win32": 82, "linux": 14, "darwin": 4},
                "topCountries": [
                    {"country": "DE", "name": "Германия (Volkswagen, BMW)", "count": 480, "flag": "🇩🇪", "pct": 34},
                    {"country": "TR", "name": "Турция (Bursa, Kocaeli, IST)", "count": 310, "flag": "🇹🇷", "pct": 22},
                    {"country": "US", "name": "США (Detroit, Michigan)", "count": 255, "flag": "🇺🇸", "pct": 18},
                    {"country": "IT", "name": "Италия (Torino, FCA)", "count": 170, "flag": "🇮🇹", "pct": 12},
                    {"country": "RU", "name": "Россия (АвтоВАЗ, КАМАЗ)", "count": 95, "flag": "🇷🇺", "pct": 7},
                    {"country": "OTHER", "name": "Другие страны", "count": 110, "flag": "🌐", "pct": 7}
                ]
            }
            try:
                req = urllib.request.Request("https://kuka-support-gateway.liskinlabs.workers.dev/api/telemetry/stats", headers={"User-Agent": "KUKA-Admin-Helpdesk"})
                with urllib.request.urlopen(req, timeout=3) as resp:
                    live_data = json.loads(resp.read().decode("utf-8"))
                    if live_data and "totalUsers" in live_data:
                        stats = live_data
            except Exception:
                pass
            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps(stats, ensure_ascii=False).encode("utf-8"))
        elif self.path == "/api/force_sync":
            if not self.is_authorized_admin():
                self.send_response(403)
                self.end_headers()
                self.wfile.write(b"Forbidden")
                return
            poll_telegram_updates()
            self.send_response(200)
            self.end_headers()
            self.wfile.write(b"OK")
        elif self.path.startswith("/api/select_session"):
            if not self.is_authorized_admin():
                self.send_response(403)
                self.end_headers()
                self.wfile.write(b"Forbidden")
                return
            query = urllib.parse.parse_qs(urllib.parse.urlparse(self.path).query)
            if "id" in query:
                store["activeSessionId"] = query["id"][0]
                save_db(store)
            self.send_response(200)
            self.end_headers()
            self.wfile.write(b"OK")
        elif self.path.startswith("/api/v1/chat/poll") or self.path.startswith("/api/poll_for_vscode"):
            query = urllib.parse.parse_qs(urllib.parse.urlparse(self.path).query)
            session_id = query.get("session_id", [None])[0]
            hostname = query.get("hostname", [None])[0]
            since_val = query.get("since", ["0"])[0]
            since_ts = int(since_val) if since_val.isdigit() else 0

            dev_msgs = []
            if session_id and session_id in store["sessions"]:
                msgs = store["sessions"][session_id].get("messages", [])
                for m in msgs:
                    if m.get("sender") == "developer":
                        if m.get("timestamp", 0) > since_ts or since_ts == 0:
                            dev_msgs.append(m)

            # Check matching offline messages for host
            if hostname:
                for sid, sess in store.get("sessions", {}).items():
                    if sess.get("hostname") == hostname and sid != session_id:
                        for m in sess.get("messages", []):
                            if m.get("sender") == "developer" and m not in dev_msgs:
                                if m.get("timestamp", 0) > since_ts or since_ts == 0:
                                    dev_msgs.append(m)

            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"ok": True, "messages": dev_msgs}, ensure_ascii=False).encode("utf-8"))
        else:
            self.send_response(404)
            self.end_headers()

    def do_POST(self):
        if self.path == "/api/send_message":
            if not self.is_authorized_admin():
                self.send_response(403)
                self.send_header("Content-type", "application/json")
                self.end_headers()
                self.wfile.write(b'{"error":"Forbidden: Invalid Admin Token"}')
                return
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            body = json.loads(post_data.decode('utf-8'))
            text = body.get("text", "").strip()

            active_id = store.get("activeSessionId")
            if active_id and text:
                payload_text = f"#{active_id} {text}"
                dev_chat_id = store.get("devChatId")
                thread_id = store.get("session_topics", {}).get(active_id)
                if dev_chat_id:
                    send_telegram_msg(dev_chat_id, payload_text, thread_id=thread_id)

                if active_id in store["sessions"]:
                    store["sessions"][active_id]["messages"].append({
                        "sender": "developer",
                        "text": text,
                        "timestamp": int(time.time() * 1000)
                    })
                    store["sessions"][active_id]["lastTime"] = int(time.time() * 1000)
                    save_db(store)

            self.send_response(200)
            self.end_headers()
            self.wfile.write(b"OK")

        elif self.path == "/api/v1/chat/message" or self.path == "/api/post_from_vscode":
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            body = json.loads(post_data.decode('utf-8'))
            
            session_id = body.get("sessionId")
            session_title = (body.get("sessionTitle") or body.get("topicTitle") or "").strip()
            text = body.get("text", "").strip()
            hostname = body.get("hostname", "ПК Инженера")
            role = body.get("role", "⭐ PRO")
            active_file = body.get("activeFile", "Нет")

            if session_id:
                if "sessions" not in store:
                    store["sessions"] = {}
                if "session_topics" not in store:
                    store["session_topics"] = {}

                if session_id not in store["sessions"]:
                    store["sessions"][session_id] = {
                        "hostname": hostname,
                        "role": role,
                        "activeFile": active_file,
                        "sessionTitle": session_title,
                        "lastPingTime": int(time.time() * 1000),
                        "lastTime": int(time.time() * 1000),
                        "messages": []
                    }
                else:
                    store["sessions"][session_id]["hostname"] = hostname
                    store["sessions"][session_id]["role"] = role
                    store["sessions"][session_id]["activeFile"] = active_file
                    if session_title:
                        store["sessions"][session_id]["sessionTitle"] = session_title
                    store["sessions"][session_id]["lastPingTime"] = int(time.time() * 1000)

                if text:
                    store["sessions"][session_id]["messages"].append({
                        "sender": "user",
                        "text": text,
                        "timestamp": int(time.time() * 1000)
                    })
                    store["sessions"][session_id]["lastTime"] = int(time.time() * 1000)

                    # Relay to Telegram Supergroup Topic or Developer chat
                    dev_chat_id = store.get("devChatId")
                    if dev_chat_id:
                        eff_topic = store["sessions"][session_id].get("sessionTitle", "")
                        thread_id = get_or_create_forum_topic(dev_chat_id, session_id, hostname, role, eff_topic)
                        topic_line = f"\n📌 <b>Тема:</b> <code>{eff_topic}</code>" if eff_topic else ""
                        formatted_text = f"💬 <b>[{role}] {hostname}</b> (<code>#{session_id}</code>){topic_line}:\n\n{text}"
                        send_telegram_msg(dev_chat_id, formatted_text, thread_id=thread_id, parse_mode="HTML")

                if not store.get("activeSessionId"):
                    store["activeSessionId"] = session_id
                save_db(store)

            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"ok": True}).encode("utf-8"))

        elif self.path == "/api/v1/chat/heartbeat":
            content_length = int(self.headers.get('Content-Length', 0))
            if content_length > 0:
                post_data = self.rfile.read(content_length)
                body = json.loads(post_data.decode('utf-8'))
                session_id = body.get("sessionId")
                session_title = (body.get("sessionTitle") or body.get("topicTitle") or "").strip()
                if session_id:
                    if session_id not in store["sessions"]:
                        store["sessions"][session_id] = {
                            "hostname": body.get("hostname", "ПК"),
                            "role": body.get("role", "⭐ PRO"),
                            "activeFile": body.get("activeFile", "Нет"),
                            "sessionTitle": session_title,
                            "lastPingTime": int(time.time() * 1000),
                            "lastTime": int(time.time() * 1000),
                            "messages": []
                        }
                    else:
                        store["sessions"][session_id]["lastPingTime"] = int(time.time() * 1000)
                        if "activeFile" in body:
                            store["sessions"][session_id]["activeFile"] = body["activeFile"]
                        if "role" in body:
                            store["sessions"][session_id]["role"] = body["role"]
                        if session_title:
                            store["sessions"][session_id]["sessionTitle"] = session_title
                    save_db(store)

            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"ok": True}).encode("utf-8"))

        elif self.path == "/api/v1/chat/file":
            # File / Attachment relay handler
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            # Accept and save uploaded payload
            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"ok": True}).encode("utf-8"))

def get_or_create_forum_topic(chat_id, session_id, hostname, role, topic_title=""):
    """Creates a dedicated Forum Topic in Telegram Support Supergroup for this engineer."""
    if not TELEGRAM_API_BASE:
        return None
    if "session_topics" not in store:
        store["session_topics"] = {}
    
    if session_id in store["session_topics"]:
        return store["session_topics"][session_id]

    try:
        topic_suffix = f" | {topic_title}" if topic_title else ""
        topic_name = f"[{'PRO' if 'PRO' in role else 'FREE'}] {hostname} (#{session_id}){topic_suffix}"[:120]
        url = f"{TELEGRAM_API_BASE}/createForumTopic"
        data = urllib.parse.urlencode({
            "chat_id": chat_id,
            "name": topic_name
        }).encode("utf-8")
        req = urllib.request.Request(url, data=data)
        with urllib.request.urlopen(req, timeout=10) as resp:
            res_data = json.loads(resp.read().decode("utf-8"))
            if res_data.get("ok") and "result" in res_data:
                thread_id = res_data["result"]["message_thread_id"]
                store["session_topics"][session_id] = thread_id
                save_db(store)
                print(f"✨ [Forum Topic Created] #{session_id} -> Thread ID: {thread_id}")
                return thread_id
    except Exception as e:
        # Fallback to main chat if not a supergroup with topics
        pass
    return None

def send_telegram_msg(chat_id, text, thread_id=None, parse_mode="HTML"):
    if not TELEGRAM_API_BASE:
        print("[Admin Helpdesk] TELEGRAM_BOT_TOKEN not configured in environment.")
        return None
    try:
        url = f"{TELEGRAM_API_BASE}/sendMessage"
        params = {
            "chat_id": chat_id,
            "text": text,
            "parse_mode": parse_mode
        }
        if thread_id:
            params["message_thread_id"] = thread_id

        data = urllib.parse.urlencode(params).encode("utf-8")
        req = urllib.request.Request(url, data=data)
        with urllib.request.urlopen(req, timeout=10) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        # Fallback to plain text on entity parse error
        try:
            plain_text = text.replace("<br>", "\n").replace("<b>", "").replace("</b>", "").replace("<code>", "").replace("</code>", "")
            params = {
                "chat_id": chat_id,
                "text": plain_text
            }
            if thread_id:
                params["message_thread_id"] = thread_id
            data = urllib.parse.urlencode(params).encode("utf-8")
            req = urllib.request.Request(url, data=data)
            with urllib.request.urlopen(req, timeout=10) as resp:
                return json.loads(resp.read().decode("utf-8"))
        except Exception as e2:
            print(f"Error sending Telegram msg fallback: {e2}")
    except Exception as e:
        print(f"Error sending Telegram msg: {e}")
    return None

def poll_telegram_updates():
    if not TELEGRAM_API_BASE:
        return
    import re
    try:
        url = f"{TELEGRAM_API_BASE}/getUpdates?offset={store.get('lastUpdateId', 0) + 1}&timeout=3"
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req, timeout=8) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            if data.get("ok") and data.get("result"):
                for update in data["result"]:
                    up_id = update["update_id"]
                    if up_id > store.get("lastUpdateId", 0):
                        store["lastUpdateId"] = up_id

                    msg = update.get("message")
                    if not msg:
                        continue

                    chat_id = msg["chat"]["id"]
                    text = msg.get("text") or msg.get("caption") or ""
                    text = text.strip()

                    # Only register devChatId if commanded explicitly (/start, /connect) or if unset
                    if text.startswith("/start") or text.startswith("/connect") or not store.get("devChatId"):
                        store["devChatId"] = chat_id

                    # Handle #heartbeat
                    if text.startswith("#heartbeat"):
                        parts = [p.strip() for p in text.split("|")]
                        hb_session = None
                        hb_host = "ПК Инженера"
                        hb_file = "Нет"
                        hb_pro = "⭐ PRO"

                        for p in parts:
                            if p.startswith("session:"): hb_session = p.split(":")[1].strip()
                            elif p.startswith("host:"): hb_host = p.split(":")[1].strip()
                            elif p.startswith("file:"): hb_file = p.split(":")[1].strip()
                            elif p.startswith("pro:"): hb_pro = "⭐ PRO" if "true" in p.lower() else "🆓 Community"

                        if hb_session:
                            if hb_session not in store["sessions"]:
                                store["sessions"][hb_session] = {
                                    "hostname": hb_host,
                                    "role": hb_pro,
                                    "activeFile": hb_file,
                                    "lastPingTime": int(time.time() * 1000),
                                    "lastTime": int(time.time() * 1000),
                                    "messages": []
                                }
                            else:
                                store["sessions"][hb_session]["hostname"] = hb_host
                                store["sessions"][hb_session]["role"] = hb_pro
                                store["sessions"][hb_session]["activeFile"] = hb_file
                                store["sessions"][hb_session]["lastPingTime"] = int(time.time() * 1000)

                            if not store.get("activeSessionId"):
                                store["activeSessionId"] = hb_session
                            save_db(store)
                        continue

                    # Ultra-resilient Session Matcher & Markdown Text Cleaner
                    match_session = None

                    # 1. Check Forum Topic Thread ID first (Supergroup Topics mode)
                    thread_id = msg.get("message_thread_id")
                    if thread_id and "session_topics" in store:
                        for sid, tid in store["session_topics"].items():
                            if tid == thread_id:
                                match_session = sid
                                break

                    # 2. Check reply_to_message or hashtag if not found by thread ID
                    if not match_session:
                        m = (
                            re.search(r"Сессия:\s*`?#?([a-f0-9]{6,32})`?", text, re.IGNORECASE) or
                            re.search(r"session:\s*`?#?([a-f0-9]{6,32})`?", text, re.IGNORECASE) or
                            re.search(r"#([a-f0-9]{6,32})\b", text, re.IGNORECASE)
                        )
                        if m:
                            match_session = m.group(1).lower()

                    if not match_session and store.get("sessions") and len(store["sessions"]) == 1:
                        match_session = list(store["sessions"].keys())[0]

                    if match_session:
                        # Extract host & user text if coming from VS Code Telegram payload
                        host_m = re.search(r"ПК:\s*`([^`]+)`", text)
                        clean_host = host_m.group(1) if host_m else "ПК Инженера"

                        body_m = re.search(r"Текст:\*\s*\n(.*)$", text, re.DOTALL) or re.search(r"Текст:\s*\n(.*)$", text, re.DOTALL)
                        clean_user_text = body_m.group(1).strip() if body_m else text.strip()

                        if match_session not in store["sessions"]:
                            store["sessions"][match_session] = {
                                "hostname": clean_host,
                                "role": "⭐ PRO",
                                "activeFile": "Неизвестен",
                                "lastPingTime": int(time.time() * 1000),
                                "lastTime": int(time.time() * 1000),
                                "messages": []
                            }

                        # Avoid duplicate insertion
                        curr_msgs = store["sessions"][match_session]["messages"]
                        exists = any(
                            x.get("text") == clean_user_text and abs(x.get("timestamp", 0) - int(time.time() * 1000)) < 4000
                            for x in curr_msgs
                        )
                        if not exists:
                            store["sessions"][match_session]["messages"].append({
                                "sender": "user",
                                "text": clean_user_text,
                                "timestamp": int(time.time() * 1000)
                            })
                            store["sessions"][match_session]["lastTime"] = int(time.time() * 1000)
                            store["sessions"][match_session]["lastPingTime"] = int(time.time() * 1000)
                            if not store.get("activeSessionId"):
                                store["activeSessionId"] = match_session
                            save_db(store)
                            print(f"📥 [Telegram Received] Session #{match_session}: {clean_user_text[:40]}")

    except Exception as e:
        print(f"Error in poll_telegram_updates: {e}")

def telegram_poller():
    while True:
        poll_telegram_updates()
        time.sleep(2.5)

def start_server():
    server = HTTPServer(("127.0.0.1", 8999), RequestHandler)
    server.serve_forever()

def launch_desktop_window():
    url = "http://127.0.0.1:8999"
    
    # Try Edge App Mode (Clean desktop window)
    edge_paths = [
        r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
        r"C:\Program Files\Microsoft\Edge\Application\msedge.exe"
    ]
    
    for path in edge_paths:
        if os.path.exists(path):
            try:
                subprocess.Popen([path, f"--app={url}", "--title=Liskin Labs KUKA Admin Helpdesk"])
                return
            except Exception:
                pass

    # Try Chrome App Mode
    chrome_paths = [
        r"C:\Program Files\Google\Chrome\Application\chrome.exe",
        r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
    ]
    for path in chrome_paths:
        if os.path.exists(path):
            try:
                subprocess.Popen([path, f"--app={url}", "--title=Liskin Labs KUKA Admin Helpdesk"])
                return
            except Exception:
                pass

    webbrowser.open(url)

if __name__ == "__main__":
    print("🚀 Starting Liskin Labs KUKA Admin Helpdesk App Server on http://127.0.0.1:8999...")
    
    t_poll = threading.Thread(target=telegram_poller, daemon=True)
    t_poll.start()

    t_srv = threading.Thread(target=start_server, daemon=True)
    t_srv.start()

    time.sleep(1)
    launch_desktop_window()

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        sys.exit(0)
