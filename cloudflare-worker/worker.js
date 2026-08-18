/**
 * Liskin Labs — KUKA KRL Live Support Serverless Gateway (Cloudflare Worker)
 * 100% Free Forever Serverless Relay between VS Code Extension and Telegram
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const BOT_TOKEN = env.BOT_TOKEN || "8895123367:AAHliBqzJ2Tz6lBSc_zfXRwMGawRzFVfDSU";

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

    // 1. Health check
    if (url.pathname === "/" || url.pathname === "/health") {
      return new Response(
        JSON.stringify({
          status: "online",
          service: "Liskin Labs KUKA Industrial Support Gateway",
          adminConnected: Boolean(CHAT_ID),
          timestamp: Date.now()
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 2. Client sends message from VS Code
    if (url.pathname === "/api/v1/chat/message" && request.method === "POST") {
      try {
        const body = await request.json();
        const { sessionId, text, hostname, role, activeFile } = body;

        if (!sessionId || !text) {
          return new Response(JSON.stringify({ error: "Missing sessionId or text" }), {
            status: 400,
            headers: corsHeaders,
          });
        }

        // Save user message to KV Store
        if (env.CHAT_KV) {
          const key = `session:${sessionId}`;
          const currentData = (await env.CHAT_KV.get(key, "json")) || { messages: [], lastTime: Date.now() };
          currentData.messages.push({ sender: "user", text, timestamp: Date.now() });
          currentData.hostname = hostname || "ПК";
          currentData.role = role || "⭐ PRO";
          currentData.activeFile = activeFile || "Нет";
          currentData.lastTime = Date.now();
          await env.CHAT_KV.put(key, JSON.stringify(currentData), { expirationTtl: 86400 * 30 }); // 30 days
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
            } catch (e) {
              /* ignore if single chat */
            }
          }

          const payload = {
            chat_id: CHAT_ID,
            text: `💬 *[${role || "KRL"}] ${hostname || "Инженер"}* (\`#${sessionId}\`):\n\n${text}`,
            parse_mode: "Markdown",
          };
          if (threadId) {
            payload.message_thread_id = parseInt(threadId, 10);
          }

          await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
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

    // 4. Client polls for developer replies
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
        }
        return new Response(JSON.stringify({ ok: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      } catch {
        return new Response(JSON.stringify({ ok: false }), { headers: corsHeaders });
      }
    }

    // 6. Telegram Webhook (When you write or reply in Telegram)
    if (url.pathname === `/webhook/telegram` && request.method === "POST") {
      try {
        const update = await request.json();
        const msg = update.message || update.channel_post;

        if (msg) {
          const incomingChatId = msg.chat && msg.chat.id;

          // Auto-discover and register Admin Chat ID
          if (incomingChatId && env.CHAT_KV) {
            await env.CHAT_KV.put("config:admin_chat_id", String(incomingChatId));

            // If user typed /start or /connect, reply with confirmation
            if (msg.text && (msg.text.startsWith("/start") || msg.text.startsWith("/connect") || msg.text.toLowerCase().includes("привет"))) {
              await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  chat_id: incomingChatId,
                  text: `🟢 *Liskin Labs Support Gateway подключен!*\n\nID вашего чата: \`${incomingChatId}\`\nТип: *${msg.chat.type}*\n\nТеперь все сообщения от инженеров из VS Code будут приходить прямо сюда. Вы можете отвечать на них прямо в этом чате.`,
                  parse_mode: "Markdown"
                }),
              });
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

            // 3. Check Reply-To message text
            if (!targetSessionId && msg.reply_to_message) {
              const ref = msg.reply_to_message.text || msg.reply_to_message.caption || "";
              const m = ref.match(/#([a-f0-9]{6})\b/i);
              if (m) {
                targetSessionId = m[1].toLowerCase();
              }
            }

            if (targetSessionId) {
              const key = `session:${targetSessionId}`;
              const currentData = (await env.CHAT_KV.get(key, "json")) || { messages: [], lastTime: Date.now() };
              const cleanText = msg.text.replace(/^#[a-f0-9]{6}\s*/i, "").trim();

              currentData.messages.push({
                sender: "developer",
                text: cleanText,
                timestamp: Date.now(),
              });
              currentData.lastTime = Date.now();

              await env.CHAT_KV.put(key, JSON.stringify(currentData), { expirationTtl: 86400 * 30 });
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
