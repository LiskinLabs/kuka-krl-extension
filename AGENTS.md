# Strict Marketplace Publishing Policy Directive

## 🛑 MANDATORY CORE DIRECTIVE: ZERO UNAUTHORIZED MARKETPLACE PUBLISHING
1. **Категорически запрещено публиковать расширение на VS Code Marketplace (`vsce publish`) и Open VSX (`ovsx publish`) БЕЗ ЯВНОГО, ПРЯМОГО СОГЛАСИЯ СИЛЬВЕСТРА.**
2. Автоматический GitHub Actions workflow (`Release & Publish VSIX`) для сборки и создания релизов на GitHub при пуше релизных тегов `v*` разрешён и должен работать автоматически.
3. Перед отправкой любой версии на публичные маркетплейсы (VS Code Marketplace, Open VSX) агент **ОБЯЗАН** явно спросить пользователя в чате:  
   *«Пакет vX.Y.Z собран и протестирован. Вы подтверждаете публикацию на VS Code Marketplace и Open VSX?»* — и ждать явного ответа: «Да, публикуй».
4. До прямого согласия Сильвестра на публикацию в маркетплейс разрешены: написание кода, локальная компиляция, тесты (`npm test`), локальная сборка `.vsix` (`vsce package`) и работа штатных CI/CD пайплайнов GitHub Actions.
