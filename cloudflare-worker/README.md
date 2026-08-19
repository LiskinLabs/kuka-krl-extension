# 🚀 Liskin Labs | KUKA KRL Live Support Serverless Gateway

100% бесплатный серверный мост (Cloudflare Worker) для маршрутизации сообщений между расширением VS Code и Telegram супергруппой с темами (Forum Topics).

---

## ⚡ Преимущества:
1. **$0 / месяц** (Бесплатный тариф Cloudflare Workers: 100 000 запросов в день).
2. **Не нужен собственный домен или VPS** — Cloudflare выдает готовый HTTPS URL: `https://kuka-krl-support.<account>.workers.dev`.
3. **Безопасность** — Токен Telegram бота надежно скрыт на сервере Cloudflare.
4. **Масштабируемость** — Легко выдерживает 1000+ одновременных клиентов.
5. **Telegram Forum Topics** — Для каждого инженера в Telegram создается отдельная ветка (Topic).

---

## 🛠️ Быстрое развертывание (2 минуты):

### 1. Создайте бесплатный воркер в Cloudflare Dashboard:
1. Зайдите на [dash.cloudflare.com](https://dash.cloudflare.com) ➔ **Workers & Pages** ➔ **Create Worker**.
2. Вставьте код из файла [`worker.js`](worker.js) и нажмите **Deploy**.

### 2. Создайте KV хранилище (KV Namespace):
1. В боковом меню: **Workers & Pages** ➔ **KV**.
2. Нажмите **Create Namespace**, назовите `KUKA_CHAT_KV`.
3. В настройках созданного воркера: **Settings** ➔ **Variables** ➔ **KV Namespace Bindings** ➔ добавьте переменную с именем `CHAT_KV` и выберите ваше хранилище `KUKA_CHAT_KV`.

### 3. Задайте секреты:
В **Settings** ➔ **Variables** ➔ **Environment Variables**:
- `BOT_TOKEN`: ваш токен бота (например `8895123367:...`).
- `ADMIN_CHAT_ID`: ID вашей супергруппы в Telegram (например `-100...`).

### 4. Настройте Telegram Webhook:
Откройте браузер и перейдите по ссылке:
```
https://api.telegram.org/bot<ВАШ_ТОКЕН>/setWebhook?url=https://<ВАШ_ВОРКЕР>.workers.dev/webhook/telegram
```

Готово! Теперь вставьте URL вашего воркера в настройки VS Code (`krl.supportGatewayUrl`) или оставьте его по умолчанию в коде.
