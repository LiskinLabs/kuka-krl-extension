# 🤖 KUKA KRL Professional Industrial Test Workspace
> **Liskin Labs Industrial Pro Edition | KUKA KRC4 / KRC5 (KSS 8.3 - 8.7)**

Добро пожаловать в эталонную расширенную рабочую область для комплексного тестирования абсолютно всех функций и модулей расширения **KUKA KRL Extension**.

---

## 📂 Полный реестр тестовых модулей

| Файл / Модуль | Назначение | Проверяемые функции расширения |
| :--- | :--- | :--- |
| **[`cell.src`](cell.src)** / **[`cell.dat`](cell.dat)** | Главный диспетчер производственной ячейки | Сквозной поиск вызовов по всему проекту (Go to Definition `F12`), автодополнение KRL, Inlay Hints I/O сигналов. |
| **[`pick_and_place.src`](pick_and_place.src)** / **[`pick_and_place.dat`](pick_and_place.dat)** | Цикл манипулятора с таймером и схватом | Проверка отсутствия ложных таймаутов на `WAIT FOR ... OR ($TIMER[1] > 3000)`, Inline формы, CollisionGuard. |
| **[`welding_process.src`](welding_process.src)** / **[`welding_process.dat`](welding_process.dat)** | Сварочный контур с непрерывным сплайном | KSS 8.6+ Modern SPLINE блоки (`SPLINE`, `SPTP`, `SLIN`, `SCIRC`), конвертация сплайнов, CodeLens. |
| **[`motion_and_splines.src`](motion_and_splines.src)** / **[`motion_and_splines.dat`](motion_and_splines.dat)** | Тестовый стенд всех типов движения | `PTP`, `LIN`, `CIRC`, координатные структуры `E6AXIS`, `E6POS`, `FRAME`, контроль безопасных скоростей ($VEL_PTP, $VEL.CP). |
| **[`logic_and_control_flow.src`](logic_and_control_flow.src)** / **[`logic_and_control_flow.dat`](logic_and_control_flow.dat)** | Все конструкции логики и переходов KRL | IF/THEN/ELSE, SWITCH/CASE, FOR/STEP, WHILE, LOOP/EXIT, REPEAT/UNTIL, INTERRUPT DECL, BRAKE, RESUME. |
| **[`signals_and_timers.src`](signals_and_timers.src)** / **[`signals_and_timers.dat`](signals_and_timers.dat)** | Сигналы I/O, таймеры и аналоговые порты | Цифровые $IN/$OUT, аналоговые $ANIN/$ANOUT, секундомеры $TIMER/$TIMER_STOP/$TIMER_FLAG, импульсы PULSE. |
| **[`subroutines_and_functions.src`](subroutines_and_functions.src)** / **[`subroutines_and_functions.dat`](subroutines_and_functions.dat)** | Подпрограммы, математические функции | Возврат значений `DEFFCT`, передача параметров `:IN`/`:OUT`, авто-сортировка объявлений (`krl.sortDeclarations`). |
| **[`diagnostics_demo.src`](diagnostics_demo.src)** | Эталонная витрина всех диагностик KRL | Валидация длины имен (>24 симв.), баланс блоков, строгий контроль типов `SWITCH`/`CASE`, мертвый код. |
| **[`eki_comm_demo.src`](eki_comm_demo.src)** / **[`eki_demo.xml`](eki_demo.xml)** | Модуль связи EthernetKRL (EKI) | Проверка XML схемы (`krl.validateEkiXml`), генератор кода KRL (`krl.generateEkiCode`). |
| **[`flowchart_demo.src`](flowchart_demo.src)** | Сложный граф логики выполнения | Построение графа потока управления (Flowchart / Mermaid viewer: `krl.showFlowchart`). |
| **[`formatting_demo.src`](formatting_demo.src)** | Неформатированный тестовый листинг | Форматирование документа (`krl.formatDocument`), отступы и выравнивание присваиваний `=`. |
| **[`git_clean_demo.src`](git_clean_demo.src)** / **[`git_clean_demo.dat`](git_clean_demo.dat)** | Файл с метаданными WorkVisual | Очистка служебных заголовков `&ACCESS`, `&REL`, `&PARAM` (`krl.cleanGitMetadata`). |
| **[`backup_delta_demo.dat`](backup_delta_demo.dat)** | Точки с дельтами координат | Инспектор бэкапов KRC и сравнение смещения точек (`krl.compareKrcBackup`). |
| **[`$config.dat`](%24config.dat)** | Общесистемный реестр сигналов и баз | Глобальные сигналы, структуры, перечисления `ENUM`, инструменты `TOOL_DATA` и `BASE_DATA`. |

---

## ⚡ Полный чек-лист для тестирования всех функций расширения

### 1. KUKA Control Center & Управление проверками на лету
- Откройте Control Center кнопкой в строке состояния или `Ctrl+Shift+P` -> `krl.openControlCenter`.
- Обратите внимание на верхнюю карточку **«СИСТЕМНЫЙ МОНИТОРИНГ И УПРАВЛЕНИЕ ФУНКЦИЯМИ»**:
  - Отображаются бейджи статуса всех систем: AST Parser, Диагностический движок, Flowchart, EKI, KRC Backup Diff, Telegram связь, CI Quality (140/140 Pass).
  - Попробуйте переключить любой тумблер (например, `Таймаут WAIT FOR`, `Предупреждение о HALT`, `Баланс блоков` или `Синтаксический валидатор`) — настройки мгновенно вступают в силу в редакторе в реальном времени!

### 2. Тестирование таймеров и отсутствия ложных таймаутов
- Откройте [`pick_and_place.src`](pick_and_place.src#L38-L41) или [`signals_and_timers.src`](signals_and_timers.src#L38-L41).
- Убедитесь, что строка `WAIT FOR ($IN[39] == TRUE) OR ($TIMER[1] > 3000)` **не выдает никаких предупреждений о таймауте**!
- В строке состояния и ErrorLens нет назойливых сообщений.
- При необходимости строгой проверки можно включить тумблер `Таймаут WAIT FOR` в Control Center.

### 3. Навигация и переходы по определениям (Go to Definition F12)
- Откройте [`cell.src`](cell.src), наведите курсор на `pick_and_place()` или `welding_process()` и нажмите `F12`.
- Расширение мгновенно переходит к определению подпрограммы в соответствующем файле.
- Нажмите `F12` на переменной `$IN[39]` или глобальной структуре — откроется `$config.dat`.

### 4. Визуализатор графа потока управления (Flowchart Viewer)
- Откройте [`flowchart_demo.src`](flowchart_demo.src) или [`logic_and_control_flow.src`](logic_and_control_flow.src).
- Вызовите команду `KRL: Показать граф потока управления (Flowchart)`.
- На экране откроется интерактивный SVG-граф с подсветкой переходов, условий и циклов.

### 5. Форматирование кода (KRL Formatter)
- Откройте [`formatting_demo.src`](formatting_demo.src).
- Нажмите `Shift+Alt+F` или выполните команду `KRL: Форматировать документ`.
- Обратите внимание на безупречное выравнивание знаков `=` и вложенные отступы блоков IF/FOR.

### 6. Модуль EthernetKRL (EKI)
- Откройте [`eki_demo.xml`](eki_demo.xml).
- Вызовите `KRL: Проверить XML схему EthernetKRL (EKI)` — подтвердится корректность структуры элементов и буферов.
- Вызовите `KRL: Сгенерировать KRL код из EKI XML` — сгенерируется готовый шаблон программы приема-передачи.

### 7. Сравнение бэкапов KRC и дельта-математика
- Откройте [`backup_delta_demo.dat`](backup_delta_demo.dat).
- Вызовите команду `KRL: Сравнить бэкап KRC (Архив SmartPAD)` для вычисления дельт координат ($\Delta X, \Delta Y, \Delta Z, \Delta A, \Delta B, \Delta C$).

### 8. Очистка метаданных WorkVisual для Git
- Откройте [`git_clean_demo.src`](git_clean_demo.src).
- Вызовите команду `KRL: Очистить метаданные WorkVisual для Git` — заголовки `&ACCESS` и `&REL` будут очищены для чистого коммита в репозиторий.
