/**
 * Liskin Labs — KUKA KRL Live Support Serverless Gateway (Cloudflare Worker)
 * 100% Free Forever Serverless Relay between VS Code Extension and Telegram
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const BOT_TOKEN = env.BOT_TOKEN;

    // Dynamic Admin Chat ID lookup (from env var or KV memory)
    let CHAT_ID = env.ADMIN_CHAT_ID;
    if (!CHAT_ID && env.CHAT_KV) {
      CHAT_ID = await env.CHAT_KV.get("config:admin_chat_id");
    }

    // CORS headers for VS Code Webview / fetch
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // Helper: generate inline keyboard buttons for Telegram
    function getTelegramInlineKeyboard(sessionId) {
      return {
        inline_keyboard: [
          [
            { text: "📥 Скачать логи", callback_data: `cmd:/logs:${sessionId}` },
            { text: "📦 Экспорт проекта", callback_data: `cmd:/export_project:${sessionId}` },
          ],
          [
            { text: "🤖 AI-диагностика", callback_data: `cmd:/ai_diag:${sessionId}` },
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

    // Helper: send message to Telegram
    async function sendTelegramMessage(chatId, text, threadId = null, replyMarkup = null) {
      if (!BOT_TOKEN || !chatId) return null;
      try {
        const payload = {
          chat_id: chatId,
          text,
          parse_mode: "Markdown",
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
        return await resp.json();
      } catch (e) {
        return { ok: false, error: e.message };
      }
    }

    // 1. Health check & Webhook Setup Route
    if (url.pathname === "/" || url.pathname === "/health") {
      let webhookInfo = null;
      if (BOT_TOKEN) {
        try {
          const whResp = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getWebhookInfo`);
          webhookInfo = await whResp.json();
        } catch {}
      }

      let lastActiveSession = null;
      if (env.CHAT_KV) {
        lastActiveSession = await env.CHAT_KV.get("config:last_active_session");
      }

      return new Response(
        JSON.stringify({
          status: "online",
          service: "Liskin Labs KUKA Industrial Support Gateway v1.7.3",
          adminConnected: Boolean(CHAT_ID),
          adminChatId: CHAT_ID || null,
          lastActiveSession: lastActiveSession || null,
          webhook: webhookInfo?.result || null,
          setupWebhookUrl: `${url.origin}/api/v1/setup_webhook`,
          timestamp: Date.now(),
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 1.1 Easy 1-Click Telegram Webhook Auto-Configuration
    if (url.pathname === "/api/v1/setup_webhook" || url.pathname === "/setup") {
      if (!BOT_TOKEN) {
        return new Response(JSON.stringify({ error: "BOT_TOKEN env secret is missing" }), {
          status: 500,
          headers: corsHeaders,
        });
      }
      const targetWebhookUrl = `${url.origin}/webhook/telegram`;
      const tgResp = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/setWebhook?url=${encodeURIComponent(targetWebhookUrl)}&drop_pending_updates=true`
      );
      const tgData = await tgResp.json();
      return new Response(JSON.stringify({ webhookUrl: targetWebhookUrl, telegramResult: tgData }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 2. Client sends message from VS Code
    if (url.pathname === "/api/v1/chat/message" && request.method === "POST") {
      try {
        const body = await request.json();
        const { sessionId, text, hostname, role, activeFile, isNotice } = body;

        if (!sessionId || !text) {
          return new Response(JSON.stringify({ error: "Missing sessionId or text" }), {
            status: 400,
            headers: corsHeaders,
          });
        }

        // Save user message and update last active session in KV Store
        if (env.CHAT_KV) {
          const key = `session:${sessionId}`;
          const currentData = (await env.CHAT_KV.get(key, "json")) || { messages: [], lastTime: Date.now() };
          currentData.messages.push({ sender: "user", text, timestamp: Date.now() });
          currentData.hostname = hostname || "ПК";
          currentData.role = role || "⭐ PRO";
          currentData.activeFile = activeFile || "Нет";
          currentData.lastTime = Date.now();
          await env.CHAT_KV.put(key, JSON.stringify(currentData), { expirationTtl: 86400 * 30 }); // 30 days
          await env.CHAT_KV.put("config:last_active_session", sessionId);
        }

        // Forward to Telegram
        if (BOT_TOKEN && CHAT_ID) {
          let threadId = null;

          if (env.CHAT_KV) {
            threadId = await env.CHAT_KV.get(`topic:${sessionId}`);
          }

          // Try creating forum topic if in a forum supergroup
          if (!threadId) {
            try {
              const topicName = `[${role && role.includes("PRO") ? "PRO" : "FREE"}] ${hostname || "PC"} (#${sessionId})`;
              const createTopicResp = await fetch(
                `https://api.telegram.org/bot${BOT_TOKEN}/createForumTopic`,
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    chat_id: CHAT_ID,
                    name: topicName.substring(0, 120),
                  }),
                }
              );
              const createTopicData = await createTopicResp.json();
              if (createTopicData.ok && createTopicData.result?.message_thread_id) {
                threadId = String(createTopicData.result.message_thread_id);
                if (env.CHAT_KV) {
                  await env.CHAT_KV.put(`topic:${sessionId}`, threadId);
                  await env.CHAT_KV.put(`thread:${threadId}`, sessionId);
                }
              }
            } catch {
              /* ignore if single chat */
            }
          }

          const msgText = isNotice
            ? `ℹ️ *[${role || "KRL"}] ${hostname || "Инженер"}* (\`#${sessionId}\`):\n${text}`
            : `💬 *[${role || "KRL"}] ${hostname || "Инженер"}* (\`#${sessionId}\`):\n\n${text}`;

          const inlineKeyboard = isNotice ? null : getTelegramInlineKeyboard(sessionId);

          await sendTelegramMessage(CHAT_ID, msgText, threadId, inlineKeyboard);
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

    // 3. Client uploads file / screenshot
    if (url.pathname === "/api/v1/chat/file" && request.method === "POST") {
      try {
        const formData = await request.formData();
        const sessionId = formData.get("sessionId");
        const hostname = formData.get("hostname") || "ПК";
        const role = formData.get("role") || "⭐ PRO";
        const caption = formData.get("caption") || "📎 Файл от инженера";
        const file = formData.get("file");

        if (env.CHAT_KV && sessionId) {
          await env.CHAT_KV.put("config:last_active_session", String(sessionId));
        }

        if (file && BOT_TOKEN && CHAT_ID) {
          const tgFormData = new FormData();
          tgFormData.append("chat_id", CHAT_ID);
          tgFormData.append("caption", `👤 *[${role}] ${hostname}* (\`#${sessionId}\`)\n${caption}`);
          tgFormData.append("parse_mode", "Markdown");
          tgFormData.append("document", file);

          if (env.CHAT_KV && sessionId) {
            const threadId = await env.CHAT_KV.get(`topic:${sessionId}`);
            if (threadId) {
              tgFormData.append("message_thread_id", threadId);
            }
          }

          await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`, {
            method: "POST",
            body: tgFormData,
          });
        }

        return new Response(JSON.stringify({ ok: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), {
          status: 500,
          headers: corsHeaders,
        });
      }
    }

    // 4. Client polls for developer replies & remote commands
    if (url.pathname === "/api/v1/chat/poll" && request.method === "GET") {
      const sessionId = url.searchParams.get("session_id");
      const since = parseInt(url.searchParams.get("since") || "0", 10);

      let devMessages = [];
      if (sessionId && env.CHAT_KV) {
        const data = await env.CHAT_KV.get(`session:${sessionId}`, "json");
        if (data && data.messages) {
          devMessages = data.messages.filter(
            (m) => m.sender === "developer" && (since === 0 || m.timestamp > since)
          );
        }
      }

      return new Response(JSON.stringify({ ok: true, messages: devMessages }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
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
            // Clear or mark closed in KV
            const key = `session:${sessionId}`;
            const currentData = (await env.CHAT_KV.get(key, "json")) || { messages: [] };
            currentData.isClosed = true;
            currentData.closedAt = Date.now();
            await env.CHAT_KV.put(key, JSON.stringify(currentData), { expirationTtl: 86400 * 7 });
          }

          const closeNotice =
            `🗑️ *[KRL Support] Инженер ${action || "удалил сессию"}* (\`#${sessionId}\` на ПК \`${hostname || "PC"}\`)\n` +
            `⚠️ _Диалог закрыт на стороне пользователя в VS Code. Ответы в этот чат больше не будут доставлены._`;

          await sendTelegramMessage(CHAT_ID, closeNotice, threadId);
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

    // 7. Telegram Webhook (Processes Developer Replies, Commands & Inline Button Clicks)
    if (url.pathname === `/webhook/telegram` && request.method === "POST") {
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
            const command = parts[0]; // e.g. /logs, /export_project, /ai_diag, /sysinfo
            let targetSessionId = parts[1];

            if (!targetSessionId && env.CHAT_KV) {
              targetSessionId = await env.CHAT_KV.get("config:last_active_session");
            }

            if (targetSessionId && env.CHAT_KV) {
              const key = `session:${targetSessionId}`;
              const currentData = (await env.CHAT_KV.get(key, "json")) || { messages: [], lastTime: Date.now() };

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
                "/export_project": "📦 Запрос проекта",
                "/ai_diag": "🤖 AI-диагностика",
                "/sysinfo": "ℹ️ Инфо о системе",
              };
              const title = commandTitles[command] || command;

              await answerCallbackQuery(cb.id, `⏳ ${title} отправлен в VS Code (#${targetSessionId})`);

              if (BOT_TOKEN && cbChatId) {
                await sendTelegramMessage(
                  cbChatId,
                  `⏳ *[Команда]* \`${command}\` отправлена инженеру в сессию \`#${targetSessionId}\`.\n` +
                    `_В VS Code инженера отобразится запрос на подтверждение выгрузки данных._`,
                  threadId
                );
              }
            } else {
              await answerCallbackQuery(cb.id, "❌ Сессия не найдена или завершена");
            }
          }
          return new Response("OK", { status: 200 });
        }

        // 7.2 Handle Text Messages & Replies
        const msg = update.message || update.channel_post;

        if (msg) {
          const incomingChatId = msg.chat && msg.chat.id;

          // Auto-discover and register Admin Chat ID
          if (incomingChatId && env.CHAT_KV) {
            await env.CHAT_KV.put("config:admin_chat_id", String(incomingChatId));

            // If user typed /start or /connect, reply with confirmation and quick guide
            if (
              msg.text &&
              (msg.text.startsWith("/start") ||
                msg.text.startsWith("/connect") ||
                msg.text.toLowerCase().includes("привет"))
            ) {
              await sendTelegramMessage(
                incomingChatId,
                `🟢 *Liskin Labs Support Gateway подключен!*\n\n` +
                  `ID вашего чата: \`${incomingChatId}\`\n` +
                  `Тип: *${msg.chat.type}*\n\n` +
                  `🔹 *Как отвечать инженерам:*\n` +
                  `1. В супергруппах с темами — просто пишите в теме сессии.\n` +
                  `2. В обычном чате — нажимайте **«Ответить» (Reply)** на сообщение сессии или пишите хештег \`#a1b2c3\`.\n` +
                  `3. Также вы можете нажимать **быстрые кнопки** под каждым сообщением для скачивания логов и проектов.`
              );
              return new Response("OK", { status: 200 });
            }
          }

          if (msg.text && env.CHAT_KV) {
            let targetSessionId = null;

            // 1. Check Forum Topic thread ID
            if (msg.message_thread_id) {
              targetSessionId = await env.CHAT_KV.get(`thread:${msg.message_thread_id}`);
            }

            // 2. Check Hashtag (#a1b2c3)
            if (!targetSessionId) {
              const m = msg.text.match(/#([a-f0-9]{6})\b/i);
              if (m) {
                targetSessionId = m[1].toLowerCase();
              }
            }

            // 3. Check Reply-To message text or caption
            if (!targetSessionId && msg.reply_to_message) {
              const ref = msg.reply_to_message.text || msg.reply_to_message.caption || "";
              const m = ref.match(/#([a-f0-9]{6})\b/i);
              if (m) {
                targetSessionId = m[1].toLowerCase();
              }
            }

            // 4. Smart Fallback: Last Active Session
            if (!targetSessionId) {
              targetSessionId = await env.CHAT_KV.get("config:last_active_session");
            }

            if (targetSessionId) {
              const key = `session:${targetSessionId}`;
              const currentData = (await env.CHAT_KV.get(key, "json")) || { messages: [], lastTime: Date.now() };
              const cleanText = msg.text.replace(/^#[a-f0-9]{6}\s*/i, "").trim();

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

              // If developer sent a command via text, send confirmation
              if (isRemoteCommand && BOT_TOKEN && incomingChatId) {
                await sendTelegramMessage(
                  incomingChatId,
                  `⏳ *[Команда]* \`${command}\` отправлена инженеру в сессию \`#${targetSessionId}\`.`,
                  msg.message_thread_id
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

    return new Response("Not Found", { status: 404, headers: corsHeaders });
  },
};

