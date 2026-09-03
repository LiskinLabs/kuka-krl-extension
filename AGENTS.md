# Strict Marketplace Publishing Policy Directive

## 🛑 MANDATORY CORE DIRECTIVE: ZERO UNAUTHORIZED MARKETPLACE PUBLISHING
1. **Категорически запрещено публиковать расширение на VS Code Marketplace (`vsce publish`) и Open VSX (`ovsx publish`) БЕЗ ЯВНОГО, ПРЯМОГО СОГЛАСИЯ СИЛЬВЕСТРА.**
2. Автоматический GitHub Actions workflow (`Release & Publish VSIX`) для сборки и создания релизов на GitHub при пуше релизных тегов `v*` разрешён и должен работать автоматически.
3. Перед отправкой любой версии на публичные маркетплейсы (VS Code Marketplace, Open VSX) агент **ОБЯЗАН** явно спросить пользователя в чате:  
   *«Пакет vX.Y.Z собран и протестирован. Вы подтверждаете публикацию на VS Code Marketplace и Open VSX?»* — и ждать явного ответа: «Да, публикуй».
4. До прямого согласия Сильвестра на публикацию в маркетплейс разрешены: написание кода, локальная компиляция, тесты (`npm test`), локальная сборка `.vsix` (`vsce package`) и работа штатных CI/CD пайплайнов GitHub Actions.

---

## 🔒 MANDATORY DIRECTIVE: STRICT REPOSITORY ISOLATION & SOURCE CODE PROTECTION
1. **`kuka-krl-extension` (`LiskinLabs/kuka-krl-extension-core`) — СТРОГО ПРИВАТНЫЙ РЕПОЗИТОРИЙ:**
   - Содержит **полный исходный код TypeScript** (`extension/client/src/`, `extension/server/src/`), тесты, скрипты обфускации (`esbuild.js`), Cloudflare Worker и Admin App.
   - Вся разработка, компиляция, тестирование (`npm test`, `e2e`), обфускация и упаковка `.vsix` ведутся **ИСКЛЮЧИТЕЛЬНО ЗДЕСЬ**.
2. **`kuka-krl-extension-public` (`LiskinLabs/kuka-krl-extension`) — ПУБЛИЧНЫЙ РЕПОЗИТОРИЙ-ВИТРИНА:**
   - **КАТЕГОРИЧЕСКИ ЗАПРЕЩЕНО** помещать или коммитить сюда исходный код TypeScript (`extension/.../src/`), внутренние тесты или бэкенд.
   - Репозиторий предназначен исключительно как публичная витрина: сайт документации (`docs/`), скомпилированный сайт (`public/`), демо-проекты (`demo-workspace/`), витрина `README.md`, `CHANGELOG.md`, `LICENSE` (Commercial EULA) и деплой сайта (`deploy-docs.yml`).
   - Защита интеллектуальной собственности Silvestr Liskin / Liskin Labs обеспечивается 100% изоляцией: в открытом доступе исходного кода НЕТ и никогда не должно быть.
