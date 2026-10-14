# Интерактивная диагностика ошибок в строках (Error Lens Suite)

## 📋 Команды в этой группе

| Идентификатор команды (ID) | Название (RU) | Name (EN) |
| :--- | :--- | :--- |
| `krl.errorLens.toggle` | **Error Lens: Включить/выключить подсветку** | *Error Lens: Toggle (Enable/Disable)* |
| `krl.errorLens.toggleInlineMessage` | **Error Lens: Включить/выключить текст в строке** | *Error Lens: Toggle Inline Message Text* |
| `krl.errorLens.copyProblemMessage` | **Error Lens: Скопировать текст ошибки** | *Error Lens: Copy Problem Message* |
| `krl.errorLens.copyProblemCode` | **Error Lens: Скопировать код ошибки** | *Error Lens: Copy Problem Code* |
| `krl.errorLens.searchForProblem` | **Error Lens: Найти решение ошибки в интернете** | *Error Lens: Search Problem on Web* |
| `krl.errorLens.disableLine` | **Error Lens: Подавить предупреждение на текущей строке** | *Error Lens: Suppress Diagnostic on Current Line* |

## 🎯 Цель демонстрации и визуальный фокус
Экономия времени инженера: ошибки видны сразу без необходимости открывать панель Problems и наводить мышь.

## 📂 Демонстрационный файл / Окружение
- `demo-workspace/diagnostics_demo.src`

## 🎬 Пошаговый сценарий записи (Скрипт действий)
1. Открыть `demo-workspace/diagnostics_demo.src`.
2. Показать яркие inline-сообщения об ошибках прямо в конце строк (красные ошибки, желтые предупреждения, синяя инфо-подсветка).
3. Вызвать команду `Error Lens: Скопировать текст ошибки` и вставить в заметки.
4. Вызвать `Error Lens: Найти решение ошибки в интернете` -> открывается браузер с решением конкретной ошибки KRL.
5. На строке с некритичным предупреждением вызвать `Error Lens: Подавить предупреждение на текущей строке` -> вставляется комментарий подавления, подсветка исчезает.

## 📹 Рекомендуемый формат захвата
- **Формат:** GIF (7-10 сек) или Видео
- **Рекомендуемые имена итоговых файлов в эту папку:**
  - `error_lens_overview.gif`
  - `error_search_web.gif`
  - `error_suppress_line.gif`

> *Примечание: После создания скриншота, GIF или видео сохраняйте готовые файлы прямо в эту папку. Они будут автоматически синхронизироваться с сайтом документации и витриной маркетплейса.*
