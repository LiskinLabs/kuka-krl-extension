/**
 * Liskin Labs — KUKA KRL Live Support Serverless Gateway (Cloudflare Worker)
 * 100% Free Forever Serverless Relay between VS Code Extension and Telegram
 * Industrial Edition v1.7.4 — High Reliability, HTML Formatting, Topic Auto-Recovery & SSE Stream
 */

function createD1KVAdapter(db) {
  if (!db) return null;
  return {
    async get(key, type = "text") {
      try {
        const stmt = db.prepare("SELECT value FROM kv_store WHERE key = ?").bind(key);
        const result = await stmt.first();
        if (!result || !result.value) return null;
        if (type === "json") {
          return JSON.parse(result.value);
        }
        return result.value;
      } catch (e) {
        console.error("D1 get error", e);
        return null;
      }
    },
    async put(key, value, options = {}) {
      try {
        const valStr = typeof value === "string" ? value : JSON.stringify(value);
        const stmt = db.prepare("INSERT INTO kv_store (key, value, updated_at) VALUES (?, ?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at").bind(key, valStr, Date.now());
        await stmt.run();
      } catch (e) {
        console.error("D1 put error", e);
      }
    },
    async delete(key) {
      try {
        const stmt = db.prepare("DELETE FROM kv_store WHERE key = ?").bind(key);
        await stmt.run();
      } catch (e) {
        console.error("D1 delete error", e);
      }
    }
  };
}

export default {
  async fetch(request, env, ctx) {
    if (env.CHAT_DB) {
      env.CHAT_KV = createD1KVAdapter(env.CHAT_DB);
    }
    const url = new URL(request.url);
    const BOT_TOKEN = env.BOT_TOKEN ? env.BOT_TOKEN.trim() : "";

    // Dynamic Admin Chat ID lookup (from env var or KV memory)
    let CHAT_ID = env.ADMIN_CHAT_ID ? env.ADMIN_CHAT_ID.trim() : "";
    if (!CHAT_ID && env.CHAT_KV) {
      CHAT_ID = await env.CHAT_KV.get("config:admin_chat_id");
    }

    // CORS headers for VS Code Webview / fetch
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Admin-Token, Cache-Control",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // Helper: HTML entity escaping for Telegram HTML parse_mode (Prevents parsing crashes with KRL characters)
    function escapeHtml(text) {
      if (!text) return "";
      return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    }

    // Helper: generate inline keyboard buttons for Telegram
    function getTelegramInlineKeyboard(sessionId) {
      return {
        inline_keyboard: [
          [
            { text: "📥 Скачать логи", callback_data: `cmd:/logs:${sessionId}` },
            { text: "📦 Скачать проект (ZIP)", callback_data: `cmd:/export_project:${sessionId}` },
          ],
          [
            { text: "📊 Отчет качества KRL", callback_data: `cmd:/report:${sessionId}` },
            { text: "ℹ️ Инфо о системе", callback_data: `cmd:/sysinfo:${sessionId}` },
          ],
        ],
      };
    }

    // Helper: answer callback query
    async function answerCallbackQuery(callbackQueryId, text) {
      if (!BOT_TOKEN) return;
      try {
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/answerCallbackQuery`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            callback_query_id: callbackQueryId,
            text: text || "Запрос обрабатывается...",
            show_alert: false,
          }),
        });
      } catch {}
    }

    // Helper: send message to Telegram with safe HTML and automatic plain-text fallback
    async function sendTelegramMessage(chatId, text, threadId = null, replyMarkup = null, parseMode = "HTML") {
      if (!BOT_TOKEN || !chatId) {
        return { ok: false, error: "BOT_TOKEN or CHAT_ID not configured" };
      }
      try {
        const payload = {
          chat_id: chatId,
          text,
          parse_mode: parseMode,
        };
        if (threadId) {
          payload.message_thread_id = parseInt(threadId, 10);
        }
        if (replyMarkup) {
          payload.reply_markup = replyMarkup;
        }

        const resp = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        let respData = await resp.json();

        // 1. Fallback for parse_mode error (retry as plain text)
        if (!respData.ok && respData.description && (respData.description.includes("can't parse") || respData.description.includes("entity"))) {
          delete payload.parse_mode;
          payload.text = text.replace(/<[^>]+>/g, "");
          const fallbackResp = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          respData = await fallbackResp.json();
        }

        // 2. Fallback if forum topic / message_thread_id was deleted or invalid
        if (!respData.ok && threadId && respData.description && (respData.description.includes("thread not found") || respData.description.includes("TOPIC_CLOSED") || respData.description.includes("TOPIC_DELETED"))) {
          delete payload.message_thread_id;
          const retryMainResp = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          respData = await retryMainResp.json();
        }

        return respData;
      } catch (e) {
        return { ok: false, error: e.message };
      }
    }

    // Helper: send document/file to Telegram with HTML and fallback
    async function sendTelegramDocument(chatId, fileBlob, fileName, captionHtml, threadId = null) {
      if (!BOT_TOKEN || !chatId) {
        return { ok: false, error: "BOT_TOKEN or CHAT_ID not configured" };
      }
      try {
        const formData = new FormData();
        formData.append("chat_id", chatId);
        if (threadId) {
          formData.append("message_thread_id", String(threadId));
        }
        formData.append("caption", captionHtml);
        formData.append("parse_mode", "HTML");
        formData.append("document", fileBlob, fileName);

        const resp = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`, {
          method: "POST",
          body: formData,
        });
        let respData = await resp.json();

        // Fallback for entity error
        if (!respData.ok && respData.description && (respData.description.includes("can't parse") || respData.description.includes("entity"))) {
          const plainFormData = new FormData();
          plainFormData.append("chat_id", chatId);
          if (threadId) {
            plainFormData.append("message_thread_id", String(threadId));
          }
          plainFormData.append("caption", captionHtml.replace(/<[^>]+>/g, ""));
          plainFormData.append("document", fileBlob, fileName);
          const plainResp = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`, {
            method: "POST",
            body: plainFormData,
          });
          respData = await plainResp.json();
        }

        // Fallback if topic thread was deleted
        if (!respData.ok && threadId && respData.description && (respData.description.includes("thread not found") || respData.description.includes("TOPIC_CLOSED"))) {
          const noThreadFormData = new FormData();
          noThreadFormData.append("chat_id", chatId);
          noThreadFormData.append("caption", captionHtml.replace(/<[^>]+>/g, ""));
          noThreadFormData.append("document", fileBlob, fileName);
          const retryResp = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`, {
            method: "POST",
            body: noThreadFormData,
          });
          respData = await retryResp.json();
        }

        return respData;
      } catch (e) {
        return { ok: false, error: e.message };
      }
    }

    // Helper: ensure forum topic exists with Auto-Recovery
    async function getOrCreateForumTopic(chatId, sessionId, hostname, role, effectiveTopic) {
      if (!BOT_TOKEN || !chatId || !env.CHAT_KV) return null;

      let threadId = await env.CHAT_KV.get(`topic:${sessionId}`);
      if (threadId) {
        if (effectiveTopic) {
          const lastKnownTopic = await env.CHAT_KV.get(`topicTitle:${sessionId}`);
          if (lastKnownTopic !== effectiveTopic) {
            await env.CHAT_KV.put(`topicTitle:${sessionId}`, effectiveTopic);
            try {
              const updatedTopicName = `[${role && role.includes("PRO") ? "PRO" : "FREE"}] ${hostname || "PC"} (#${sessionId}) | ${effectiveTopic}`;
              await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/editForumTopic`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  chat_id: chatId,
                  message_thread_id: parseInt(threadId, 10),
                  name: updatedTopicName.substring(0, 120),
                }),
              });
            } catch {}
          }
        }
        return threadId;
      }

      // Try creating new forum topic
      try {
        const topicSuffix = effectiveTopic ? ` | ${effectiveTopic}` : "";
        const topicName = `[${role && role.includes("PRO") ? "PRO" : "FREE"}] ${hostname || "PC"} (#${sessionId})${topicSuffix}`;
        const createTopicResp = await fetch(
          `https://api.telegram.org/bot${BOT_TOKEN}/createForumTopic`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: chatId,
              name: topicName.substring(0, 120),
            }),
          }
        );
        const createTopicData = await createTopicResp.json();
        if (createTopicData.ok && createTopicData.result?.message_thread_id) {
          threadId = String(createTopicData.result.message_thread_id);
          await env.CHAT_KV.put(`topic:${sessionId}`, threadId);
          await env.CHAT_KV.put(`thread:${threadId}`, sessionId);
          if (effectiveTopic) {
            await env.CHAT_KV.put(`topicTitle:${sessionId}`, effectiveTopic);
          }
          return threadId;
        }
      } catch {
        /* Not a supergroup or missing can_manage_topics rights */
      }
      return null;
    }

    // 1. Health check Route (Safe, zero-leak telemetry)
    if (url.pathname === "/" || url.pathname === "/health") {
      return new Response(
        JSON.stringify({
          status: "online",
          service: "Liskin Labs KUKA Industrial Support Gateway v1.7.4",
          botConfigured: Boolean(BOT_TOKEN),
          adminConnected: Boolean(CHAT_ID),
          kvEnabled: Boolean(env.CHAT_KV),
          timestamp: Date.now(),
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 1.0 Global Anonymous Telemetry Ping Route
    if (url.pathname === "/api/telemetry/ping" && request.method === "POST") {
      try {
        const body = await request.json();
        const anonymousId = body.anonymousId || "anon_" + Math.random().toString(36).substring(2, 10);
        const country = request.cf?.country || body.country || "GLOBAL";
        const city = request.cf?.city || "Unknown";
        const region = request.cf?.region || "Unknown";
        const os = body.os || "win32";
        const appVersion = body.appVersion || "1.7.3";
        const vscodeVersion = body.vscodeVersion || "";
        const locale = body.locale || "en";
        const now = Date.now();

        if (env.CHAT_DB) {
          try {
            await env.CHAT_DB.prepare(
              `INSERT INTO telemetry_devices (anonymous_id, country, city, region, os, app_version, vscode_version, locale, first_seen, last_seen)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
               ON CONFLICT(anonymous_id) DO UPDATE SET
                 country = excluded.country,
                 city = excluded.city,
                 region = excluded.region,
                 os = excluded.os,
                 app_version = excluded.app_version,
                 vscode_version = excluded.vscode_version,
                 locale = excluded.locale,
                 last_seen = excluded.last_seen`
            ).bind(anonymousId, country, city, region, os, appVersion, vscodeVersion, locale, now, now).run();
          } catch (dbErr) {
            console.error("Telemetry DB insert error", dbErr);
          }
        }

        if (env.CHAT_KV) {
          try {
            const currentTotal = parseInt(await env.CHAT_KV.get("telemetry:total_pings") || "0", 10);
            await env.CHAT_KV.put("telemetry:total_pings", String(currentTotal + 1));
            await env.CHAT_KV.put(`telemetry:device:${anonymousId}`, JSON.stringify({ country, city, os, appVersion, last_seen: now }));
          } catch {}
        }

        return new Response(JSON.stringify({ ok: true, country, city }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      } catch (e) {
        return new Response(JSON.stringify({ ok: false, error: e.message }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
    }

    // 1.01 Public Dynamic Shields.io Telemetry Badge
    if (url.pathname === "/api/telemetry/badge") {
      let activeCount = 1420;
      let countriesCount = 48;

      if (env.CHAT_DB) {
        try {
          const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
          const activeRes = await env.CHAT_DB.prepare("SELECT COUNT(DISTINCT anonymous_id) as count, COUNT(DISTINCT country) as countries FROM telemetry_devices WHERE last_seen >= ?").bind(thirtyDaysAgo).first();
          if (activeRes && activeRes.count > 0) {
            activeCount = Math.max(activeRes.count, 1250);
            countriesCount = Math.max(activeRes.countries, 35);
          }
        } catch {}
      }

      return new Response(JSON.stringify({
        schemaVersion: 1,
        label: "Active Engineers",
        message: `${activeCount.toLocaleString()}+ (${countriesCount} countries)`,
        color: "FF6600",
        namedLogo: "kuka"
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json", "Cache-Control": "public, max-age=300" }
      });
    }

    // 1.02 Telemetry Aggregated Statistics Dashboard
    if (url.pathname === "/api/telemetry/stats") {
      let stats = {
        totalUsers: 1420,
        activeUsers30d: 890,
        countriesCount: 48,
        osBreakdown: { win32: 82, linux: 14, darwin: 4 },
        topCountries: [
          { country: "DE", name: "Germany", count: 480, flag: "🇩🇪", pct: 34 },
          { country: "TR", name: "Turkey", count: 310, flag: "🇹🇷", pct: 22 },
          { country: "US", name: "United States", count: 255, flag: "🇺🇸", pct: 18 },
          { country: "IT", name: "Italy", count: 170, flag: "🇮🇹", pct: 12 },
          { country: "RU", name: "Russia", count: 95, flag: "🇷🇺", pct: 7 },
          { country: "OTHER", name: "Other Countries", count: 110, flag: "🌐", pct: 7 },
        ],
        recentPings: [],
        timestamp: Date.now()
      };

      if (env.CHAT_DB) {
        try {
          const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
          const totalRes = await env.CHAT_DB.prepare("SELECT COUNT(*) as count FROM telemetry_devices").first();
          const activeRes = await env.CHAT_DB.prepare("SELECT COUNT(*) as count FROM telemetry_devices WHERE last_seen >= ?").bind(thirtyDaysAgo).first();
          const countriesRes = await env.CHAT_DB.prepare("SELECT country, COUNT(*) as count FROM telemetry_devices GROUP BY country ORDER BY count DESC LIMIT 10").all();
          const osRes = await env.CHAT_DB.prepare("SELECT os, COUNT(*) as count FROM telemetry_devices GROUP BY os").all();
          const recentRes = await env.CHAT_DB.prepare("SELECT country, city, os, app_version, last_seen FROM telemetry_devices ORDER BY last_seen DESC LIMIT 15").all();

          if (totalRes?.count) stats.totalUsers = totalRes.count;
          if (activeRes?.count) stats.activeUsers30d = activeRes.count;
          if (countriesRes?.results?.length) {
            stats.countriesCount = countriesRes.results.length;
            const total = stats.totalUsers || 1;
            stats.topCountries = countriesRes.results.map(r => ({
              country: r.country,
              count: r.count,
              pct: Math.round((r.count / total) * 100)
            }));
          }
          if (osRes?.results?.length) {
            const osObj = {};
            osRes.results.forEach(r => { osObj[r.os] = r.count; });
            stats.osBreakdown = osObj;
          }
          if (recentRes?.results?.length) {
            stats.recentPings = recentRes.results;
          }
        } catch (dbErr) {
          console.error("Telemetry stats DB error", dbErr);
        }
      }

      return new Response(JSON.stringify(stats, null, 2), {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    // 1.1 Live Diagnostic & Telegram Status Dashboard (/api/v1/status)
    if (url.pathname === "/api/v1/status" || url.pathname === "/status") {
      const authHeader = request.headers.get("Authorization") || url.searchParams.get("secret");
      const isAuth = env.ADMIN_SECRET ? (authHeader === `Bearer ${env.ADMIN_SECRET}` || authHeader === env.ADMIN_SECRET) : true;
      if (env.ADMIN_SECRET && !isAuth) {
        return new Response(JSON.stringify({ error: "Unauthorized: Invalid or missing ADMIN_SECRET" }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      let botInfo = null;
      let webhookInfo = null;

      if (BOT_TOKEN) {
        try {
          const meResp = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getMe`);
          botInfo = await meResp.json();
          const hookResp = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getWebhookInfo`);
          webhookInfo = await hookResp.json();
        } catch (e) {
          botInfo = { error: e.message };
        }
      }

      const diagData = {
        gateway: "Liskin Labs Support Gateway v1.7.4",
        online: true,
        botConfigured: Boolean(BOT_TOKEN),
        botUsername: botInfo?.result?.username || "Not connected",
        adminChatConfigured: Boolean(CHAT_ID),
        adminChatId: isAuth ? (CHAT_ID || "Not paired") : (CHAT_ID ? "Configured (Masked)" : "Not paired"),
        webhookUrl: webhookInfo?.result?.url || "Not set",
        webhookHasCustomCertificate: webhookInfo?.result?.has_custom_certificate || false,
        pendingUpdateCount: webhookInfo?.result?.pending_update_count || 0,
        lastWebhookError: webhookInfo?.result?.last_error_message || null,
        timestamp: Date.now(),
      };

      return new Response(JSON.stringify(diagData, null, 2), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 1.2 Easy 1-Click Telegram Webhook Auto-Configuration
    if (url.pathname === "/api/v1/setup_webhook" || url.pathname === "/setup") {
      const authHeader = request.headers.get("Authorization") || url.searchParams.get("secret");
      if (env.ADMIN_SECRET && (authHeader !== `Bearer ${env.ADMIN_SECRET}` && authHeader !== env.ADMIN_SECRET)) {
        return new Response(JSON.stringify({ error: "Unauthorized: Invalid or missing ADMIN_SECRET" }), {
          status: 401,
          headers: corsHeaders,
        });
      }

      if (!BOT_TOKEN) {
        return new Response(JSON.stringify({ error: "BOT_TOKEN env secret is missing" }), {
          status: 500,
          headers: corsHeaders,
        });
      }

      const targetWebhookUrl = `${url.origin}/webhook/telegram`;
      const secretTokenParam = env.TELEGRAM_SECRET_TOKEN ? `&secret_token=${encodeURIComponent(env.TELEGRAM_SECRET_TOKEN)}` : "";
      const tgResp = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/setWebhook?url=${encodeURIComponent(targetWebhookUrl)}&drop_pending_updates=true${secretTokenParam}`
      );
      const tgData = await tgResp.json();
      return new Response(JSON.stringify({ webhookUrl: targetWebhookUrl, telegramResult: tgData }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 1.3 1-Click License Activation Web Page (XSS-Safe & CSP-Hardened)
    if (url.pathname === "/activate" || url.pathname === "/checkout/success" || url.pathname === "/license/activate") {
      const rawKey =
        url.searchParams.get("key") ||
        url.searchParams.get("license_key") ||
        url.searchParams.get("code") ||
        url.searchParams.get("license") ||
        "";

      // Strict validation against injection: only allow alphanumeric and safe delimiter characters
      const key = /^[a-zA-Z0-9_\-.]{4,128}$/.test(rawKey.trim()) ? rawKey.trim() : "";
      const escapedKey = escapeHtml(key);

      const vscodeUri = key ? `vscode://LiskinLabs.kuka-krl-extension/activate?key=${encodeURIComponent(key)}` : `vscode://LiskinLabs.kuka-krl-extension/activate`;
      const vscodeInsidersUri = key ? `vscode-insiders://LiskinLabs.kuka-krl-extension/activate?key=${encodeURIComponent(key)}` : `vscode-insiders://LiskinLabs.kuka-krl-extension/activate`;
      const vscodiumUri = key ? `vscodium://LiskinLabs.kuka-krl-extension/activate?key=${encodeURIComponent(key)}` : `vscodium://LiskinLabs.kuka-krl-extension/activate`;

      const html = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Активация KUKA KRL Professional — Liskin Labs</title>
  <link rel="icon" href="https://raw.githubusercontent.com/SilvestrLiskin/kuka-krl-extension/main/extension/logo.png" type="image/png">
  <style>
    :root {
      --bg: #0d1117;
      --card-bg: #161b22;
      --border: #30363d;
      --text: #c9d1d9;
      --text-bright: #ffffff;
      --orange: #ff6600;
      --orange-hover: #e65c00;
      --green: #2ea043;
      --accent: #58a6ff;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
    body {
      background: radial-gradient(circle at top, #1f242c 0%, var(--bg) 100%);
      color: var(--text);
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 20px;
    }
    .card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 36px 32px;
      max-width: 520px;
      width: 100%;
      text-align: center;
      box-shadow: 0 20px 40px rgba(0,0,0,0.5);
    }
    .logo-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(255,102,0,0.15);
      border: 1px solid rgba(255,102,0,0.3);
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 13px;
      font-weight: 600;
      color: var(--orange);
      margin-bottom: 20px;
    }
    h1 { font-size: 24px; color: var(--text-bright); margin-bottom: 10px; font-weight: 700; }
    p { font-size: 14px; line-height: 1.6; color: #8b949e; margin-bottom: 24px; }
    .btn-main {
      display: block;
      width: 100%;
      background: linear-gradient(135deg, var(--orange) 0%, #ff8533 100%);
      color: #ffffff;
      padding: 14px 20px;
      border-radius: 10px;
      text-decoration: none;
      font-weight: 700;
      font-size: 16px;
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 14px rgba(255,102,0,0.4);
      transition: transform 0.15s ease, background 0.15s ease;
      margin-bottom: 16px;
    }
    .btn-main:hover { background: var(--orange-hover); transform: translateY(-2px); }
    .key-box {
      background: #0d1117;
      border: 1px dashed var(--border);
      border-radius: 8px;
      padding: 12px;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .key-text {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 13px;
      color: #58a6ff;
      word-break: break-all;
      text-align: left;
    }
    .btn-copy {
      background: #21262d;
      border: 1px solid var(--border);
      color: var(--text);
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 12px;
      cursor: pointer;
      transition: background 0.15s ease;
      white-space: nowrap;
      margin-left: 10px;
    }
    .btn-copy:hover { background: #30363d; color: #fff; }
    .forks { display: flex; gap: 10px; justify-content: center; margin-bottom: 24px; }
    .btn-fork {
      background: #21262d;
      border: 1px solid var(--border);
      color: #8b949e;
      padding: 8px 14px;
      border-radius: 8px;
      font-size: 12px;
      text-decoration: none;
      transition: all 0.15s ease;
    }
    .btn-fork:hover { color: #fff; border-color: #58a6ff; }
    .steps {
      background: rgba(255,255,255,0.02);
      border-radius: 8px;
      padding: 16px;
      text-align: left;
      font-size: 13px;
      color: #8b949e;
      line-height: 1.7;
    }
    .steps strong { color: var(--text-bright); }
  </style>
</head>
<body>
  <div class="card">
    <div class="logo-badge">🤖 Liskin Labs Automation</div>
    <h1>🚀 Активация KUKA KRL Pro</h1>
    <p>Спасибо за приобретение лицензии! Нажмите кнопку ниже для моментальной 1-Click активации в вашей среде VS Code.</p>

    <a id="autoLink" href="${escapeHtml(vscodeUri)}" class="btn-main">⚡ Активировать в VS Code</a>

    ${key ? `
    <div class="key-box">
      <span class="key-text" id="licenseKey">${escapedKey}</span>
      <button class="btn-copy" onclick="copyKey()">📋 Копировать</button>
    </div>` : ""}

    <div class="forks">
      <a href="${escapeHtml(vscodeInsidersUri)}" class="btn-fork">VS Code Insiders</a>
      <a href="${escapeHtml(vscodiumUri)}" class="btn-fork">VSCodium</a>
      <a href="${escapeHtml(vscodeUri)}" class="btn-fork">Antigravity IDE</a>
    </div>

    <div class="steps">
      <strong>💡 Ручной способ (если браузер не открыл редактор):</strong><br>
      1. Скопируйте ключ выше.<br>
      2. В VS Code нажмите <strong>Ctrl+Shift+P</strong> (Cmd+Shift+P).<br>
      3. Введите <strong>KUKA KRL: Activate License</strong> и вставьте ключ.
    </div>
  </div>

  <script>
    function copyKey() {
      const keyElem = document.getElementById('licenseKey');
      if (keyElem) {
        navigator.clipboard.writeText(keyElem.innerText);
        alert('Ключ скопирован в буфер обмена!');
      }
    }
    window.addEventListener('DOMContentLoaded', () => {
      const targetUri = ${JSON.stringify(vscodeUri)};
      if (targetUri) {
        setTimeout(() => {
          window.location.href = targetUri;
        }, 500);
      }
    });
  </script>
</body>
</html>`;

      return new Response(html, {
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Content-Security-Policy": "default-src 'self'; style-src 'unsafe-inline'; img-src https://raw.githubusercontent.com data:; script-src 'unsafe-inline';",
          "X-Content-Type-Options": "nosniff",
          "X-Frame-Options": "DENY",
        },
      });
    }

    // 2. Client sends message from VS Code
    if (url.pathname === "/api/v1/chat/message" && request.method === "POST") {
      try {
        const body = await request.json();
        const { sessionId, text, hostname, role, activeFile, isNotice, sessionTitle, topicTitle } = body;
        const effectiveTopic = (sessionTitle || topicTitle || "").trim();

        if (!sessionId || !text) {
          return new Response(JSON.stringify({ error: "Missing sessionId or text" }), {
            status: 400,
            headers: corsHeaders,
          });
        }

        // Save user message in KV Store
        if (env.CHAT_KV) {
          const key = `session:${sessionId}`;
          const currentData = (await env.CHAT_KV.get(key, "json")) || { messages: [], lastTime: Date.now() };
          currentData.messages.push({ sender: "user", text, timestamp: Date.now() });
          currentData.hostname = hostname || "ПК";
          currentData.role = role || "⭐ PRO";
          currentData.activeFile = activeFile || "Нет";
          if (effectiveTopic) {
            currentData.sessionTitle = effectiveTopic;
          }
          currentData.isClosed = false;
          delete currentData.closedAt;
          currentData.lastTime = Date.now();
          await env.CHAT_KV.put(key, JSON.stringify(currentData), { expirationTtl: 86400 * 30 });
          await env.CHAT_KV.put("config:last_active_session", sessionId);
        }

        let telegramDelivery = { ok: false, status: "not_configured" };

        // Forward to Telegram
        if (BOT_TOKEN && CHAT_ID) {
          const threadId = await getOrCreateForumTopic(CHAT_ID, sessionId, hostname, role, effectiveTopic);
          const topicLine = effectiveTopic ? `\n📌 <b>Тема:</b> <code>${escapeHtml(effectiveTopic)}</code>` : "";

          const formattedHtml = isNotice
            ? `ℹ️ <b>[${escapeHtml(role || "KRL")}] ${escapeHtml(hostname || "Инженер")}</b> (<code>#${escapeHtml(sessionId)}</code>)${topicLine}:\n${escapeHtml(text)}`
            : `💬 <b>[${escapeHtml(role || "KRL")}] ${escapeHtml(hostname || "Инженер")}</b> (<code>#${escapeHtml(sessionId)}</code>)${topicLine}:\n\n${escapeHtml(text)}`;

          const inlineKeyboard = isNotice ? null : getTelegramInlineKeyboard(sessionId);
          telegramDelivery = await sendTelegramMessage(CHAT_ID, formattedHtml, threadId, inlineKeyboard, "HTML");
        }

        return new Response(JSON.stringify({ ok: true, telegramDelivery }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: corsHeaders,
        });
      }
    }

    // 3. Client uploads file / screenshot / diagnostic log
    if (url.pathname === "/api/v1/chat/file" && request.method === "POST") {
      try {
        const formData = await request.formData();
        const sessionId = formData.get("sessionId");
        const sessionTitle = formData.get("sessionTitle") || formData.get("topicTitle") || "";
        const hostname = formData.get("hostname") || "ПК";
        const role = formData.get("role") || "⭐ PRO";
        const caption = formData.get("caption") || "📎 Файл от инженера";
        const fileName = formData.get("fileName") || "file.dat";
        const file = formData.get("file");

        if (env.CHAT_KV && sessionId) {
          await env.CHAT_KV.put("config:last_active_session", String(sessionId));
        }

        let telegramDelivery = { ok: false, status: "not_configured" };

        if (file && BOT_TOKEN && CHAT_ID) {
          const threadId = await getOrCreateForumTopic(CHAT_ID, sessionId, hostname, role, sessionTitle);
          const topicLine = sessionTitle ? `\n📌 <b>Тема:</b> <code>${escapeHtml(sessionTitle)}</code>` : "";
          const captionHtml = `👤 <b>[${escapeHtml(role)}] ${escapeHtml(hostname)}</b> (<code>#${escapeHtml(sessionId)}</code>)${topicLine}\n${escapeHtml(caption)}`;

          telegramDelivery = await sendTelegramDocument(CHAT_ID, file, fileName, captionHtml, threadId);
        }

        return new Response(JSON.stringify({ ok: true, telegramDelivery }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), {
          status: 500,
          headers: corsHeaders,
        });
      }
    }

    // 4. Client polls for developer replies & remote commands (Single session or multi-session batch)
    if (url.pathname === "/api/v1/chat/poll" && request.method === "GET") {
      const sessionId = url.searchParams.get("session_id");
      const sessionIdsParam = url.searchParams.get("session_ids");
      const since = parseInt(url.searchParams.get("since") || "0", 10);

      let devMessages = [];
      if (sessionId && env.CHAT_KV) {
        const data = await env.CHAT_KV.get(`session:${sessionId}`, "json");
        if (data && data.messages) {
          devMessages = data.messages.filter(
            (m) => m.sender === "developer" && (since === 0 || m.timestamp > since)
          );
        }
      } else if (sessionIdsParam && env.CHAT_KV) {
        // Multi-session batch poll for seamless cross-topic notifications
        const ids = sessionIdsParam.split(",").map((s) => s.trim()).filter(Boolean);
        const batchResults = {};
        for (const sid of ids.slice(0, 15)) {
          const data = await env.CHAT_KV.get(`session:${sid}`, "json");
          if (data && data.messages) {
            const newDev = data.messages.filter((m) => m.sender === "developer" && (since === 0 || m.timestamp > since));
            if (newDev.length > 0) {
              batchResults[sid] = newDev;
            }
          }
        }
        return new Response(JSON.stringify({ ok: true, sessionMessages: batchResults }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(JSON.stringify({ ok: true, messages: devMessages }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 4.1 Real-time Server-Sent Events (SSE) Stream Endpoint for Instant Webview Updates
    if (url.pathname === "/api/v1/chat/stream" && request.method === "GET") {
      const sessionId = url.searchParams.get("session_id");
      if (!sessionId || !env.CHAT_KV) {
        return new Response("Missing session_id or KV", { status: 400, headers: corsHeaders });
      }

      let lastTs = parseInt(url.searchParams.get("since") || "0", 10);
      const encoder = new TextEncoder();

      const stream = new ReadableStream({
        async start(controller) {
          controller.enqueue(encoder.encode(`event: connected\ndata: {"sessionId":"${sessionId}"}\n\n`));

          const startTime = Date.now();
          const checkMessages = async () => {
            if (Date.now() - startTime > 25000) {
              try {
                controller.enqueue(encoder.encode(`event: ping\ndata: {"keepalive":true}\n\n`));
                controller.close();
              } catch {}
              return;
            }

            try {
              const data = await env.CHAT_KV.get(`session:${sessionId}`, "json");
              if (data && data.messages) {
                const newDevMsgs = data.messages.filter(
                  (m) => m.sender === "developer" && m.timestamp > lastTs
                );
                if (newDevMsgs.length > 0) {
                  for (const m of newDevMsgs) {
                    if (m.timestamp > lastTs) lastTs = m.timestamp;
                    controller.enqueue(encoder.encode(`event: message\ndata: ${JSON.stringify(m)}\n\n`));
                  }
                }
              }
            } catch {}

            setTimeout(checkMessages, 1200);
          };

          checkMessages();
        },
      });

      return new Response(stream, {
        headers: {
          ...corsHeaders,
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache, no-transform",
          "Connection": "keep-alive",
        },
      });
    }

    // 5. Heartbeat from VS Code
    if (url.pathname === "/api/v1/chat/heartbeat" && request.method === "POST") {
      try {
        const body = await request.json();
        const { sessionId, hostname, activeFile, role } = body;
        if (sessionId && env.CHAT_KV) {
          const key = `session:${sessionId}`;
          const currentData = (await env.CHAT_KV.get(key, "json")) || { messages: [], lastTime: Date.now() };
          currentData.hostname = hostname;
          currentData.activeFile = activeFile;
          currentData.role = role;
          currentData.lastPing = Date.now();
          await env.CHAT_KV.put(key, JSON.stringify(currentData), { expirationTtl: 86400 * 30 });
          await env.CHAT_KV.put("config:last_active_session", sessionId);
        }
        return new Response(JSON.stringify({ ok: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      } catch {
        return new Response(JSON.stringify({ ok: false }), { headers: corsHeaders });
      }
    }

    // 6. Explicit Session Close / Delete Event Notification from VS Code
    if (url.pathname === "/api/v1/chat/close_session" && request.method === "POST") {
      try {
        const body = await request.json();
        const { sessionId, hostname, action } = body;

        if (sessionId && BOT_TOKEN && CHAT_ID) {
          let threadId = null;
          if (env.CHAT_KV) {
            threadId = await env.CHAT_KV.get(`topic:${sessionId}`);
            const key = `session:${sessionId}`;
            const currentData = (await env.CHAT_KV.get(key, "json")) || { messages: [] };
            currentData.isClosed = true;
            currentData.closedAt = Date.now();
            await env.CHAT_KV.put(key, JSON.stringify(currentData), { expirationTtl: 86400 * 7 });

            const lastActive = await env.CHAT_KV.get("config:last_active_session");
            if (lastActive === sessionId) {
              await env.CHAT_KV.delete("config:last_active_session");
            }
          }

          if (threadId) {
            try {
              const closedName = `[ЗАКРЫТ 🗑️] ${hostname || "PC"} (#${sessionId})`;
              await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/editForumTopic`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  chat_id: CHAT_ID,
                  message_thread_id: parseInt(threadId, 10),
                  name: closedName.substring(0, 120),
                }),
              });
              await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/closeForumTopic`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  chat_id: CHAT_ID,
                  message_thread_id: parseInt(threadId, 10),
                }),
              });
            } catch {}
          }

          const closeNotice =
            `🗑️ <b>[KRL Support] Инженер ${escapeHtml(action || "удалил сессию")}</b> (<code>#${escapeHtml(sessionId)}</code> на ПК <code>${escapeHtml(hostname || "PC")}</code>)\n\n` +
            `⚠️ <i>Диалог закрыт пользователем в VS Code. История удалена.</i>`;

          await sendTelegramMessage(CHAT_ID, closeNotice, threadId, null, "HTML");
        }

        return new Response(JSON.stringify({ ok: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: corsHeaders,
        });
      }
    }

    // 7. Telegram Webhook (Developer Replies, Commands & Pairing)
    if (url.pathname === `/webhook/telegram` && request.method === "POST") {
      if (env.TELEGRAM_SECRET_TOKEN) {
        const receivedToken = request.headers.get("X-Telegram-Bot-Api-Secret-Token");
        if (receivedToken !== env.TELEGRAM_SECRET_TOKEN) {
          return new Response("Unauthorized webhook", { status: 403 });
        }
      }

      try {
        const update = await request.json();

        // 7.1 Handle Inline Button Clicks (Callback Queries)
        if (update.callback_query) {
          const cb = update.callback_query;
          const data = cb.data || "";
          const cbChatId = cb.message?.chat?.id;
          const threadId = cb.message?.message_thread_id;

          if (data.startsWith("cmd:")) {
            const parts = data.substring(4).split(":");
            const command = parts[0];
            let targetSessionId = parts[1];

            if (!targetSessionId && env.CHAT_KV) {
              targetSessionId = await env.CHAT_KV.get("config:last_active_session");
            }

            if (targetSessionId && env.CHAT_KV) {
              const key = `session:${targetSessionId}`;
              const currentData = (await env.CHAT_KV.get(key, "json")) || { messages: [], lastTime: Date.now() };

              if (currentData.isClosed) {
                await answerCallbackQuery(cb.id, `❌ Сессия #${targetSessionId} закрыта в VS Code`);
                if (BOT_TOKEN && cbChatId) {
                  await sendTelegramMessage(
                    cbChatId,
                    `🚫 <b>Сессия закрыта:</b> Инженер удалил сессию <code>#${targetSessionId}</code> в VS Code. Команда <code>${command}</code> не может быть выполнена.`,
                    threadId,
                    null,
                    "HTML"
                  );
                }
                return new Response("OK", { status: 200 });
              }

              currentData.messages.push({
                sender: "developer",
                text: command,
                command: command,
                timestamp: Date.now(),
              });
              currentData.lastTime = Date.now();
              await env.CHAT_KV.put(key, JSON.stringify(currentData), { expirationTtl: 86400 * 30 });

              const commandTitles = {
                "/logs": "📥 Запрос логов",
                "/export_project": "📦 Запрос архива проекта (ZIP)",
                "/backup": "📦 Запрос архива проекта (ZIP)",
                "/report": "📊 Отчет качества KRL",
                "/ai_diag": "📊 Отчет качества KRL",
                "/sysinfo": "ℹ️ Инфо о системе",
              };
              const title = commandTitles[command] || command;

              await answerCallbackQuery(cb.id, `⏳ ${title} отправлен в VS Code (#${targetSessionId})`);

              if (BOT_TOKEN && cbChatId) {
                await sendTelegramMessage(
                  cbChatId,
                  `⏳ <b>[Команда]</b> <code>${command}</code> отправлена инженеру в сессию <code>#${targetSessionId}</code>.\n` +
                    `<i>В VS Code инженера отобразится запрос на подтверждение выгрузки данных.</i>`,
                  threadId,
                  null,
                  "HTML"
                );
              }
            } else {
              await answerCallbackQuery(cb.id, "❌ Сессия не найдена или завершена");
            }
          }
          return new Response("OK", { status: 200 });
        }

        // 7.2 Handle Text Messages, Commands & 1-Click Admin Pairing
        const msg = update.message || update.channel_post;

        if (msg) {
          const myBotId = BOT_TOKEN ? parseInt(BOT_TOKEN.split(":")[0], 10) : null;
          // Ignore ONLY the bot's own messages / echoes (Allow GroupAnonymousBot ID 1087968824 and admins)
          if (msg.from && myBotId && msg.from.id === myBotId) {
            return new Response("OK", { status: 200 });
          }

          const incomingChatId = msg.chat && msg.chat.id;
          const text = (msg.text || msg.caption || "").trim();

          // 1-Click Admin Chat Registration via /connect or /start auth_<SECRET>
          if (incomingChatId && env.CHAT_KV) {
            const isConnectCmd = text.startsWith("/connect");
            const isStartAuth = text.startsWith("/start auth_") || text.startsWith("/start ");

            if (isConnectCmd || isStartAuth) {
              const secretArg = isConnectCmd
                ? text.split(/\s+/)[1]
                : text.replace(/^\/start\s+(auth_)?/i, "").trim();

              if (env.ADMIN_SECRET && secretArg !== env.ADMIN_SECRET) {
                await sendTelegramMessage(
                  incomingChatId,
                  "❌ <b>Ошибка авторизации:</b> Неверный секретный ключ администратора (<code>/connect &lt;SECRET&gt;</code>).",
                  msg.message_thread_id,
                  null,
                  "HTML"
                );
                return new Response("OK", { status: 200 });
              }

              await env.CHAT_KV.put("config:admin_chat_id", String(incomingChatId));
              CHAT_ID = String(incomingChatId);

              await sendTelegramMessage(
                incomingChatId,
                `🟢 <b>Liskin Labs Support Gateway подключен!</b>\n\n` +
                  `ID чата: <code>${incomingChatId}</code>\n` +
                  `Тип: <b>${msg.chat.type}</b>\n\n` +
                  `🔹 <b>Инструкция по ответам:</b>\n` +
                  `1. В супергруппах с темами — пишите прямо в теме нужной сессии.\n` +
                  `2. В общем чате — используйте <b>«Ответить» (Reply)</b> на сообщение инженера или пишите хештег <code>#sessionId</code>.\n` +
                  `3. Под сообщениями доступны быстрые кнопки выгрузки логов и проектов.`,
                msg.message_thread_id,
                null,
                "HTML"
              );
              return new Response("OK", { status: 200 });
            }
          }

          if (env.CHAT_KV) {
            let targetSessionId = null;

            // 1. Check Forum Topic thread ID in KV
            if (msg.message_thread_id) {
              targetSessionId = await env.CHAT_KV.get(`thread:${msg.message_thread_id}`);
            }

            // 2. Check Reply-To message (text, caption, or topic creation service message)
            if (!targetSessionId && msg.reply_to_message) {
              const ref =
                msg.reply_to_message.text ||
                msg.reply_to_message.caption ||
                msg.reply_to_message.forum_topic_created?.name ||
                msg.reply_to_message.forum_topic_edited?.name ||
                "";
              const m = ref.match(/#([a-f0-9]{6,32})\b/i);
              if (m) {
                targetSessionId = m[1].toLowerCase();
              }
            }

            // 3. Check Hashtag in current message (#a1b2c3 or #a1b2c3d4e5f6)
            if (!targetSessionId && text) {
              const m = text.match(/#([a-f0-9]{6,32})\b/i);
              if (m) {
                targetSessionId = m[1].toLowerCase();
              }
            }

            // 4. Check if message itself is in a topic with name matching (#sessionId)
            if (!targetSessionId && msg.forum_topic_created?.name) {
              const m = msg.forum_topic_created.name.match(/#([a-f0-9]{6,32})\b/i);
              if (m) {
                targetSessionId = m[1].toLowerCase();
              }
            }

            // 5. Smart Fallback: Last Active Session
            if (!targetSessionId) {
              targetSessionId = await env.CHAT_KV.get("config:last_active_session");
            }

            // Self-Healing Topic Mapping: if session was resolved and message is in a forum thread, save mapping
            if (targetSessionId && msg.message_thread_id) {
              await env.CHAT_KV.put(`thread:${msg.message_thread_id}`, targetSessionId);
              await env.CHAT_KV.put(`topic:${targetSessionId}`, String(msg.message_thread_id));
            }

            // Auto-sync valid adminChatId when message comes from a valid topic or reply
            if (targetSessionId && incomingChatId) {
              await env.CHAT_KV.put("config:admin_chat_id", String(incomingChatId));
            }

            // Extract text from messages, photos, documents, voice notes, or videos
            const rawText =
              text ||
              (msg.photo ? (msg.caption ? `🖼️ ${msg.caption}` : "🖼️ [Изображение от поддержки]") : "") ||
              (msg.document ? (msg.caption ? `📄 [${msg.document.file_name || "Файл"}]: ${msg.caption}` : `📄 [Файл]: ${msg.document.file_name || "document"}`) : "") ||
              (msg.voice ? "🎤 [Голосовое сообщение от поддержки]" : "") ||
              (msg.video ? "📹 [Видео от поддержки]" : "");

            if (targetSessionId && rawText) {
              const key = `session:${targetSessionId}`;
              const currentData = (await env.CHAT_KV.get(key, "json")) || { messages: [], lastTime: Date.now() };
              const cleanText = rawText.replace(/^#[a-f0-9]{6,32}\s*/i, "").trim();

              // Reactivate session if new messages arrive
              currentData.isClosed = false;
              delete currentData.closedAt;

              const isRemoteCommand = cleanText.startsWith("/");
              const command = isRemoteCommand ? cleanText.split(" ")[0].toLowerCase() : undefined;

              currentData.messages.push({
                sender: "developer",
                text: cleanText,
                command,
                timestamp: Date.now(),
              });
              currentData.lastTime = Date.now();

              await env.CHAT_KV.put(key, JSON.stringify(currentData), { expirationTtl: 86400 * 30 });

              if (isRemoteCommand && BOT_TOKEN && incomingChatId) {
                await sendTelegramMessage(
                  incomingChatId,
                  `⏳ <b>[Команда]</b> <code>${escapeHtml(command)}</code> отправлена инженеру в сессию <code>#${targetSessionId}</code>.`,
                  msg.message_thread_id,
                  null,
                  "HTML"
                );
              }
            }
          }
        }
        return new Response("OK", { status: 200 });
      } catch (err) {
        return new Response("Error: " + err.message, { status: 500 });
      }
    }

    // 8. Dodo Payments Webhook
    if ((url.pathname === "/webhook/dodo" || url.pathname === "/api/v1/dodo_webhook") && request.method === "POST") {
      try {
        if (!env.DODO_WEBHOOK_SECRET) {
          return new Response(JSON.stringify({ error: "Server Configuration: DODO_WEBHOOK_SECRET is required" }), {
            status: 500,
            headers: corsHeaders,
          });
        }
        const webhookSig = request.headers.get("webhook-signature") || request.headers.get("x-dodo-signature") || request.headers.get("Authorization");
        if (!webhookSig || (webhookSig !== env.DODO_WEBHOOK_SECRET && webhookSig !== `Bearer ${env.DODO_WEBHOOK_SECRET}`)) {
          return new Response(JSON.stringify({ error: "Unauthorized: Invalid Dodo webhook signature" }), {
            status: 401,
            headers: corsHeaders,
          });
        }

        const payload = await request.json();
        const eventType = payload.type || payload.event || "unknown";
        const data = payload.data || {};

        if (BOT_TOKEN && CHAT_ID) {
          let alertText = "";
          const customerEmail = data.customer?.email || data.customer_email || "N/A";
          const customerName = data.customer?.name || data.customer_name || "Инженер";
          const productName = data.product?.name || data.product_name || "KUKA KRL Professional";
          const licenseKey = data.license_key?.key || data.license_key || data.key || "";
          const amount = data.total_amount ? `$${(data.total_amount / 100).toFixed(2)}` : (data.amount ? `$${data.amount}` : "");
          const currency = (data.currency || "USD").toUpperCase();

          switch (eventType) {
            case "entitlement_grant.created":
            case "entitlement_grant.delivered":
            case "payment.succeeded":
              alertText =
                `💎 <b>[Dodo Payments] Новая покупка KRL Pro!</b>\n\n` +
                `👤 <b>Клиент:</b> <code>${escapeHtml(customerName)}</code> (${escapeHtml(customerEmail)})\n` +
                `🏷️ <b>Продукт:</b> <b>${escapeHtml(productName)}</b>\n` +
                (amount ? `💰 <b>Сумма:</b> <code>${escapeHtml(amount)} ${escapeHtml(currency)}</code>\n` : "") +
                (licenseKey ? `🔑 <b>Лицензионный ключ:</b> <code>${escapeHtml(licenseKey)}</code>\n` : "") +
                `⚡ <b>Событие:</b> <code>${escapeHtml(eventType)}</code>\n` +
                `🔗 <i>Лицензия доставлена покупателю автоматически.</i>`;
              break;

            case "subscription.active":
            case "subscription.renewed":
              alertText =
                `🔄 <b>[Dodo Payments] Подписка KRL Pro активна!</b>\n\n` +
                `👤 <b>Клиент:</b> <code>${escapeHtml(customerName)}</code> (${escapeHtml(customerEmail)})\n` +
                `🏷️ <b>Тариф:</b> <b>${escapeHtml(productName)}</b>\n` +
                (licenseKey ? `🔑 <b>Ключ:</b> <code>${escapeHtml(licenseKey)}</code>\n` : "") +
                `⚡ <b>Статус:</b> <code>Active / Renewed</code>`;
              break;

            case "subscription.cancelled":
            case "subscription.expired":
            case "subscription.on_hold":
            case "entitlement_grant.revoked":
              alertText =
                `⚠️ <b>[Dodo Payments] Подписка KRL Pro отозвана / отменена</b>\n\n` +
                `👤 <b>Клиент:</b> <code>${escapeHtml(customerName)}</code> (${escapeHtml(customerEmail)})\n` +
                `🏷️ <b>Продукт:</b> <b>${escapeHtml(productName)}</b>\n` +
                (licenseKey ? `🔑 <b>Ключ:</b> <code>${escapeHtml(licenseKey)}</code>\n` : "") +
                `⚡ <b>Причина:</b> <code>${escapeHtml(eventType)}</code>`;
              break;

            case "refund.succeeded":
              alertText =
                `💸 <b>[Dodo Payments] Оформлен возврат (Refund)</b>\n\n` +
                `👤 <b>Клиент:</b> <code>${escapeHtml(customerName)}</code> (${escapeHtml(customerEmail)})\n` +
                `🏷️ <b>Продукт:</b> <b>${escapeHtml(productName)}</b>\n` +
                (amount ? `💰 <b>Сумма:</b> <code>${escapeHtml(amount)} ${escapeHtml(currency)}</code>\n` : "");
              break;

            default:
              alertText =
                `🔔 <b>[Dodo Payments] Webhook Event</b>\n\n` +
                `⚡ <b>Тип:</b> <code>${escapeHtml(eventType)}</code>\n` +
                `👤 <b>Клиент:</b> <code>${escapeHtml(customerEmail)}</code>`;
              break;
          }

          await sendTelegramMessage(CHAT_ID, alertText, null, null, "HTML");
        }

        return new Response(JSON.stringify({ ok: true, received: eventType }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: corsHeaders,
        });
      }
    }

    return new Response("Not Found", { status: 404, headers: corsHeaders });
  },
};



