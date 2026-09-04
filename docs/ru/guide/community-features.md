# 🟢 Community Edition — Бесплатные базовые функции KUKA KRL Professional

Подробный обзор 15 бесплатных базовых функций расширения для разработчиков и инженеров-робототехников.

---

### 1. Синтаксическая подсветка KRL (Syntax Highlighting)
Полный парсинг синтаксиса `.src`, `.dat`, `.sub`. Подсветка ключевых слов, типов данных (`INT`, `REAL`, `BOOL`, `E6POS`), системных переменных KSS 8.7 и FOLD-метаданных WorkVisual.

#### До установки (стандартный монотонный текст):
![Syntax Highlighting До](/media/syntax_before.png)

#### После установки (Контрастная инженерная подсветка):
![Syntax Highlighting После](/media/syntax_after.png)

---

### 2. Эксклюзивные темы KUKA (6 KUKA Themes)
6 профессиональных тем оформления, оптимизированных для промышленных ноутбуков и дисплеев SmartPAD:
1. **Industrial Dark** (фирменный стиль KUKA `#FF6600`)
2. **WorkVisual Dark**
3. **WorkVisual Light**
4. **Midnight OLED**
5. **Blueprint**
6. **Industrial Light**

*Переключение:* `Ctrl + K` `Ctrl + T`

![Theme 1](/media/kuka_theme_1.png)
![Theme 2](/media/kuka_theme_2.png)
![Theme 3](/media/kuka_theme_3.png)
![Theme 4](/media/kuka_theme_4.png)

---

### 3. Умное автодополнение и спецификации ядра KUKA.Sim 4.10
Глубокое автодополнение кода на основе официальных спецификаций ядра KUKA.Sim 4.10 и сред выполнения KRC:
* **957 системных переменных (`$`):** Точные типы (`FRAME`, `CP`, `INT`, `REAL`, `BOOL`, `E6POS`), размерности (217 массивов), статус `Read/Write` или `Read-Only`, оригинальные комментарии KUKA и физические единицы.
* **116 встроенных функций ядра:** Кинематика (`FORWARD`, `INVERSE`, `INV_POS`, `TOOL_ADJ`), строки, преобразование типов, сообщения и контроль момента с интерактивными подсказками параметров (`signatureHelp`).
* **111 структур и 112 ENUM (443 значения):** Дополнение полей через точку (`.`) для пользовательских и системных структур (`$TOOL.`, `$ACC.`), а также дополнение по `#` для системных перечислений (`#AUT`, `#T1`, `#P_FREE`, `#QUIT`).
* **23 официальных XML-сниппета KUKA (34 шаблона):** Полная замена устаревших шаблонов на оригинальные FOLD Inline Forms от Kuka Roboter GmbH (`ptpi`, `slini`, `sptpi`, `scirc`, `PTPCo`, `ptprel`, `trigdist`, `sigin`, `wsec`, `Forr`).

![Smart Autocomplete Demo](/media/smart_autocomplete.gif)

---

### 4. Мультиязычность (EN / RU / TR)
Полная локализация интерфейса расширения, подсказок, меню команд и дашборда Control Center на русский, английский и турецкий языки.

---

### 5. Inlay Hints для сигналов ($IN / $OUT / $ANIN / $ANOUT)
Виртуальные полупрозрачные подсказки имен сигналов прямо в коде (например, `$IN[1]` `: diPartReady`).

![Inlay Hints Demo](/media/inlay_hints.gif)

---

### 6. Всплывающая информация (Hover Info & Read/Write Status)
При наведении курсора на системную переменную отображается описание из руководств KSS 8.7, тип данных и права доступа (**Read-Only / Read-Write**).

![Hover Info Demo](/media/hover_info.gif)

---

### 7. Кросс-файловая навигация (.src ↔ .dat Go-to-Definition)
Быстрый переход по `F12` / `Ctrl+Click` от использования точки/переменной в файле алгоритма `.src` к ее объявлению в `.dat`.

![Go-to-Definition Demo](/media/goto_definition.gif)

---

### 8. Поиск всех ссылок (Find All References — `Shift+Alt+F12`)
Показывает все места использования функции, точки или сигналов во всем проекте.

![Find All References Demo](/media/find_all_references.gif)

---

### 9. Глобальный форматировщик KRL (Code Formatter)
Автоматическое выравнивание знаков `=` и вложенности блоков `IF/FOR/WHILE` по нажатию `Shift + Alt + F`.

![Code Formatter Demo](/media/code_formatter.gif)

---

### 10. Быстрое сворачивание / разворачивание FOLD (Quick Fold Toolbar)
Иконки 🙈 (`krl.foldAll`) и 📖 (`krl.unfoldAll`) в тулбаре для сжатия и разворачивания всех блоков FOLD.

![Quick Fold Toolbar Demo](/media/quick_fold_toolbar.gif)

---

### 11. Полное дерево команд KUKA COMMANDS
Удобная боковая панель с категоризированным деревом всех команд расширения.

![KUKA COMMANDS Demo](/media/kuka_commands.gif)

---

### 12. Панель сигналов KRL I/O Signals
Панель сигналов входов/выходов с быстрой фильтрацией и поиском.

![KRL I/O Signals Demo](/media/krl_io_signals.gif)

---

### 13. Очистка неиспользуемых переменных (Unused Variable Cleaner)
Удаление ненужных объявлений `DECL` из `.dat` файлов без нарушения структуры FOLD.

---

### 14. Очиститель Git-метаданных WorkVisual (Git Metadata Cleaner)
Срезает заголовки `&ACCESS`, `&REL`, `&PARAM` для создания чистых коммитов в Git.

![Git Metadata Cleaner Demo](/media/git_metadata_cleaner.gif)

---

### 15. Сортировка объявлений (Sort Declarations)
Сортировка типов переменных (`INT`, `REAL`, `BOOL`, `E6POS`) в `.dat` файлах.

![Sort Declarations Demo](/media/sort_declarations.gif)

---

### 16. Аутентичная и разнообразная цветовая палитра KUKA.Sim & WorkVisual
Специализированная схема раскраски синтаксиса KRL на базе оригинальных правил `KRLDark.xshd` (KUKA.Sim AvalonEdit) и `KRL.xshd` (WorkVisual):
- **Команды движения (`PTP`, `LIN`, `CIRC`, `PTP_REL`, `LIN_REL`):** Выделены жирным шрифтом для мгновенной ориентации оператора на траектории.
- **Логические операторы (`AND`, `OR`, `NOT`, `EXOR`, `B_AND`, `B_OR`):** Отдельный контрастный синий цвет.
- **Знаки сравнения и математики (`==`, `<>`, `<=`, `>=`, `+`, `-`, `*`, `/`):** Оливково-зеленый оттенок для легкого чтения формул.
- **Шестнадцатеричные и двоичные числа (`'H0A'`, `&HFF`, `'B0101'`):** Фирменный неоново-пурпурный цвет `#FF00FF`.
- **Служебные директивы заголовков (`&ACCESS`, `&REL`, `&PARAM`):** Мягкий фиолетовый оттенок `#646695`.

---

### 17. Эталонная библиотека KSS 8.7 и навигация F12 (Go to Definition)
В расширение встроена полная эталонная системная библиотека стандартных модулей KSS 8.7:
- Системные функции: `BAS()`, `MsgNotify()`, `MsgQuit()`, `MsgDialog()`, `USE_CM_PRO_VALUES()` и др.
- Системные массивы и переменные: `TOOL_NAME[]`, `BASE_NAME[]`, `COLLMON_ACTIVE` и др.
- Полная поддержка `F12` (Go to Definition) и подсказок параметров (`signatureHelp`) с прямым переходом к эталонным файлам `bas.src`, `MsgLib.src`, `collmonlib.src` и `$config.dat`. Никаких ложных предупреждений «Unknown function» для стандартного стека KSS!

---

### 18. Генерация структуры проекта KRC в 1 клик (`krl.scaffoldKrcFiles`)
Команда создания стандартной заводской файловой структуры контроллера KSS 8.7:
- Создает каталоги `KRC/R1/System/`, `KRC/R1/Program/`, `KRC/R1/TP/`.
- Автоматически разворачивает эталонные файлы `$config.dat`, `bas.src`, `MsgLib.src`, `collmonlib.src`, `sps.sub`, `$machine.dat`, `$robcor.dat`, `$custom.dat`, `$option.dat`.

---

### 19. Инспектор заводских значений (Factory Defaults) и лимитер $ADVANCE
- **Заводские умолчания в Hover:** При наведении на ключевые параметры движения отображаются официальные заводские значения из спецификаций ядра KUKA.Sim (`operate.defaultvalues`): `$ADVANCE = 3`, `$VEL.CP = 2.0 m/s`, `$ACC.CP = 2.3 m/s²`, `$JERK.CP = 500.0 m/s³`.
- **Защита $ADVANCE:** Предупреждение линтера, если `$ADVANCE` выходит за допустимый диапазон `0..5`, предотвращая аварийные сбои планировщика движения робота.

