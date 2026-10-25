# Liskin Labs | KUKA KRL Extension — Strategic Roadmap (2026+)

Дорожная карта развития среды разработки **KUKA KRL Extension** на базе анализа передовых решений в промышленной робототехнике (ABB RAPID Live, FANUC TP/Karel, truST Platform DAP, 3D Kinematics Webviews).

---

## [RELEASE] Версия 1.9.8 — KUKA.Sim (.vcmx) Layout Intelligence, KUKA.RSI Real-Time, G-Code/SVG CAM Importer & PLC Fieldbus Suite [PRO]

> **Лицензионная политика (Strict PRO Tier Enforcement):**  
> Базовая поддержка языка (подсветка синтаксиса, базовое форматирование, FOLD/UNFOLD) остается в бесплатном режиме **Community**. Весь инженерный, аналитический, симуляционный, CAM и кодогенерирующий функционал работает строго в режиме **PRO (`ensurePremium`)**.

### 1. [MODULE] KUKA.Sim & Visual Components (`.vcmx` / `layout.rsc`) Intelligence Suite [PRO]
* **Цель:** Глубокий нативный анализ, валидация, авторемонт и пост-процессинг имитационных 3D-моделей **KUKA.Sim 4.x / Visual Components (`.vcmx`)** без запуска тяжелой среды симуляции (на базе архитектуры `VCMX-Handling` и `Post-Processor`).
* **Функционал и команды:**
  * **`krl.inspectVcmxLayout` — KUKA.Sim / VCMX Layout & Process Inspector [PRO]:**
    * Двухслойный парсер `layout.rsc` внутри `.vcmx` архивов: извлечение дерева компонентов `Node "rSimResource"`, контроллеров роботов (`rSimKinController`, `Robot Ctrl`), булевых сигналов (`Functionality "rSimBoolSignal"`), транспортных связей (`TransportLink`), групп потоков (`ProcessFlowGroups`) и экранированных XML-программ процессов (`ProgramData`).
    * Генерация структурированного инженерного паспорта `.vcmx` сцены с декодированным псевдокодом всех процессов и роботов.
  * **`krl.validateVcmxSimulation` — VCMX Simulation Deadlock & Signal Race Validator [PRO]:**
    * Детекция 4 фатальных классов багов симуляции KUKA.Sim / Visual Components:
      1. **`VCMX001` (Edge-Triggered Signal Deadlock / Trailing Ack-Wait):** Выявление `IWaitSignalStatement`, расположенных после `ITransportOutStatement` или блокирующих операций, а также самоблокировок `SEND(sig)` → `WAIT(sig)` в одном процессе (симптом: «линия пропускает ровно одну деталь и намертво зависает»).
      2. **`VCMX002` (Wait Timeout Fallthrough):** Выявление `IWaitSignalStatement` с ненулевым `Timeout != 0` или `WaitTrigger=False`, нарушающих детерминизм рукопожатий.
      3. **`VCMX003` (Product Variable List Accumulation):** Проверка обязательного сброса переменной продукта `ISetPropertyStatement (TargetProperty=ProductOut, ValueExpression="")` после `ITransportOutStatement` / `IRemoveProductStatement` для предотвращения ошибки `"flow sequence is lost"`.
      4. **`VCMX004` (Dangling / Unresolved Signal Reference):** Поиск пустых ссылок `Signal` (`No signal selected`) и обращений к несуществующим сигналам `rSimBoolSignal` на уровне `depth-1` узла.
    * Безопасный авторемонт `layout.rsc` с автоматическим созданием версионных резервных копий `.bk1`, `.bk2` перед перепаковкой `.vcmx`.
  * **`krl.exportVcmxToKrl` — VCMX to KUKA KRL Post-Processor (`.src` + `.dat`) [PRO]:**
    * Прямое извлечение и компиляция робот-процессов, точек движения, захватов и сигналов (`IWaitSignalStatement` $\rightarrow$ `WAIT FOR $IN[...]`, `ISendSignalStatement` $\rightarrow$ `$OUT[...]`, `IProcessDelayStatement` $\rightarrow$ `WAIT SEC`) из `.vcmx` / `layout.rsc` в чистые модули `.src` и `.dat`.

### 2. [REALTIME] KUKA.RobotSensorInterface (RSI) & ROS 2 Real-Time Control Suite [PRO]
* **Цель:** Поддержка жесткого реального времени (Hard Real-Time, такт интерполятора IPO 4 мс / 12 мс, 250 Гц) для управления роботом от внешних контроллеров, ROS 2 (`kuka_rsi_driver`), датчиков силы-момента (FT sensors) и лазерных трекеров шва.
* **Функционал и команды:**
  * **LSP & Language Support:** Полная поддержка системных функций и констант `KUKA.RSI` (`RSI_CREATE`, `RSI_ON`, `RSI_MOVECORR`, `RSI_OFF`, `RSI_DELETE`, `RSI_RESET`, `RSI_SETPARAM`, `RSI_GETPARAM`, `RSI_ENABLE`, `RSI_DISABLE`, `RSISTAT`, `RSIOK`, `#ABSOLUTE`, `#RELATIVE`, `#IPO`, `#IPO_FAST`).
  * **`krl.validateRsiXml` — KUKA.RSI SensorInterface XML Validator [PRO]:**
    * Глубокая проверка конфигурационных файлов `SensorInterface/*.xml`: валидация `<ROOT>`, `<CONFIG>`, `<SEN_TYPE>`, `<ONLYSEND>`, `<IP_NUMBER>`, `<PORT>`, `<SENTYPE>`, `<ELEMENTS>`, типов данных (`BOOL`, `LONG`, `DOUBLE`) и непрерывности индексов `INDX`.
  * **`krl.generateRsiCode` — KUKA.RSI Real-Time 4ms Code & XML Generator [PRO]:**
    * Генерация готовой связки KRL-драйвера реального времени (`.src`) и XML-конфигурации сокета (`.xml`) для режимов декартовой коррекции (`#POSCORR`) и осевой коррекции (`#AXISCORR` / ROS 2).

### 3. [TOOLS] CAM CNC G-Code (`.nc`/`.gcode`) & Vector SVG to KUKA KRL Importer [PRO]
* **Цель:** Прямая конвертация управляющих программ ЧПУ и векторных контуров в готовые траектории роботов KUKA для фрезеровки, резки, сварки и нанесения герметика.
* **Функционал и команда:**
  * **`krl.importGcodeToKrl` — Convert CNC G-Code / SVG to KUKA KRL (`.src` + `.dat`) [PRO]:**
    * Парсинг ISO G-Code (`G0`/`G00` $\rightarrow$ `PTP`/`SPTP`, `G1`/`G01` $\rightarrow$ `LIN`/`SLIN`, `G2`/`G02` и `G3`/`G03` круговая интерполяция через `I, J, K` или `R` с точным расчётом промежуточной точки дуги `AuxPoint` для `CIRC`/`SCIRC`, `G90`/`G91`, пересчёт подачи `F` мм/мин $\rightarrow$ `$VEL.CP` м/с, маппинг `M3`/`M5` на дискретные выходы `$OUT[n]`).
    * Парсинг векторной графики `.svg` (`<path>`, `<line>`, `<polyline>`, `<polygon>`, `<rect>`, `<circle>`) с аппроксимацией кривых Безье и генерацией высот безопасного перехода `Z_Safe` и рабочей плоскости `Z_Work`.
    * Синхронная генерация пары `.src` + `.dat` (`E6POS`, `FDAT`, `LDAT`, `PDAT`).

### 4. [VISION] Vision Hand-Eye Calibration Wizard & PLC Fieldbus Tag Exporter [PRO]
* **Цель:** Автоматизация калибровки 3D-камер машинного зрения и мгновенная выгрузка таблиц сигналов I/O в САПР ПЛК.
* **Функционал и команды:**
  * **`krl.generateVisionCalibration` — Vision Hand-Eye Calibration & Pre-Grasp Generator [PRO]:**
    * Матричный генератор калибровочной программы камеры (`Eye-in-Hand` / `Eye-to-Hand`) на 9 ракурсов (Touch-Up Calibration Grid) с автоматическим расчётом углов Эйлера $A, B, C$ (ориентация оптической оси камеры строго в центр калибровочной мишени при наклонах $\pm 15^\circ$) и шаблоном подхода предзахвата (`Pre-Grasp Approach` вдоль оси $Z_{tool}$).
  * **`krl.exportPlcTags` — Export I/O Signals to Siemens TIA Portal & Beckhoff TwinCAT [PRO]:**
    * Извлечение сигналов `SIGNAL` / `$IN` / `$OUT` из проекта KRL и архивов WorkVisual (`.wvs`) с экспортом в таблицы тегов **Siemens TIA Portal XML / SDF (`%I` / `%Q`)**, **Beckhoff TwinCAT 3 GVL (`.TcGVL`)** и **EPLAN CSV**.

### 5. [ARCHIVE] WorkVisual (`.wvs` / `.wvps`) Bus Topology & KOP Catalogs Parser [PRO]
* **Цель:** Прямой анализ топологии полевых шин (EtherCAT, Profinet, Virtual IO) и установленных каталогов опций KOP без распаковки архива WorkVisual.
* **Функционал и команда:**
  * **`krl.inspectWvsTopology` — WorkVisual (.wvs) Topology & Bus Inspector [PRO]:**
    * Декодирование XML-метаданных `Solution.MetaData` (включая hex-экранированные теги `_x003C_Catalog ...`).
    * Извлечение установленных KOP-пакетов опций (`KUKA.EthernetKRL`, `KUKA.SafeOperation`, `KUKA.GripperSpotTech`), целевой версии KSS, модели кинематики робота (`SafeMaDaBusTopology.xml`) и конфигурации осей A1–A6.
    * Извлечение шинной структуры из `EcatDiag_*.xml`, `VIO_USER_BUS.xml`, `VIO_PLC_BUS.xml`.
    * Извлечение привязок сигналов I/O из `Fieldbus.krcVariables.xml` с прямой интеграцией в мастер экспорта тегов ПЛК (`krl.exportPlcTags`).

### 6. [SYNC] Auto-Sync Missing Points & Inline Form Normalizer (`.dat` from `.src`) [PRO]
* **Цель:** Автоматическая синхронизация и генерация недостающих точек движения и параметров Inline Form в файле данных `.dat` из кода `.src`.
* **Функционал и команда:**
  * **`krl.syncPointsToDat` — Auto-Sync Missing Points & Inline Forms to .dat [PRO]:**
    * Сканирование активного `.src` на все команды движения (`PTP`, `LIN`, `CIRC`, `SPTP`, `SLIN`, `SCIRC`) и inline form заголовки (`PDAT_ACT`, `FDAT_ACT`, `LDAT_ACT`).
    * Сравнение с существующими декларациями в парном `.dat` (создание файла с заголовком `DEFDAT ... PUBLIC`, если он отсутствует).
    * Детерминированная генерация недостающих деклараций `DECL E6POS`, `DECL FDAT`, `DECL PDAT`, `DECL LDAT` перед `ENDDAT` внутри компактного блока `;FOLD Auto-Synchronized Points` без дублирования уже обученных координат.

---

## [ROADMAP] Версия 1.9.9 — Interactive 3D Trajectory & Point Inspector (Отложено на следующий спринт)

### 5. [ONLINE] Interactive 3D Trajectory & Point Inspector (Webview + Three.js)
* **Цель:** Визуализация траекторий инструмента робота прямо внутри VS Code рядом с кодом `.src` (запланировано на следующий релиз после `v1.9.7`).
* **Функционал:**
  * Парсинг команд движения (`PTP`, `LIN`, `CIRC`, `SLIN`, `SPTP`, `SCIRC`, `SPLINE`) из `.src` и координат точек (`E6POS`, `POS`, `FRAME`) из связанного `.dat`.
  * Интерактивная 3D сцена (Three.js WebGL): отображение пространственной траектории движения TCP, координатных систем фреймов (A, B, C) и точек.
  * **Двунаправленная навигация (Bi-directional Sync):**
    * Клик по сегменту траектории в 3D выделяет и центрирует соответствующую строку движения в `.src`.
    * Перемещение курсора по файлу `.src` динамически подсвечивает целевую точку движения в 3D.
  * Расчёт общей длины траектории и ориентировочного времени цикла.

---

## [ROADMAP] Версия 1.9.0 — Базовая платформа визуализации I/O и кинематики (Выполнено)

### 2. [REALTIME] Visual I/O Signal Matrix & PLC Cross-Reference
* **Цель:** Управление промышленными интерфейсами робот-ПЛК (Siemens TIA Portal, Beckhoff TwinCAT, Profinet).
* **Функционал:**
  * Интерактивная матрица всех дискретных и групповых сигналов `$IN[...]`, `$OUT[...]`, `SIGNAL`.
  * Диагностика перекрытия адресов (overlap detection) — предупреждение, если биты группового сигнала пересекаются с другими сигналами.
  * Двусторонний экспорт/импорт сигналов в `.xlsx` и `.csv` для мгновенной сверки с электрическими схемами (EPLAN) и таблицами тегов ПЛК.

### 3. [GEOMETRY] KUKA Batch Point Offset Transformer & Kinematic Frame Shift Engine (PRO)
* **Цель:** Промышленный инструмент пакетного смещения и вращения координат точек робота (`E6POS`, `POS`, `FRAME`) с пересчётом кинематических систем отсчёта ($BASE, $TOOL, $WORLD), аналогичный функциям Frame/Path Offset в ABB RobotStudio, KUKA WorkVisual и Tecnomatix Process Simulate.

#### 1. Практическая ценность для инженера на объекте
* **Смещение оснастки / кондуктора (Jig / Fixture Shift):** При физическом смещении или переустановке кондуктора на сварочной или сборочной линии требуется сдвинуть всю пачку технологических точек на дельту $(\Delta X, \Delta Y, \Delta Z, \Delta A, \Delta B, \Delta C)$ без переобучения робота с пульта smartPAD вручную по одной точке.
* **Смещение по осям инструмента (TCP Tool Offset):** Углубление инструмента (горелки, присоски, лазера) на $N$ мм вдоль вектора инструмента $+Z_{tool}$ для всей траектории или группы точек шва.
* **Перенос траектории в другую деталь/базу:** Копирование группы движений из одного конвейера/стола в другой с автоматической перепривязкой к новому `$BASE_DATA[n]`.
* **Параллельный сдвиг в системе цеха ($WORLD / $ROBROOT):** Подъем всех точек подхода/отхода вертикально вверх на $+100$ мм по оси $Z_{world}$ независимо от наклона базы.

#### 2. Архитектура сбора контекста и кросс-файловое разрешение точек
* **Автоматическое определение связанного контекста из `.src`:**
  * При вызове команды из активного `.src` файла движок парсит AST программы и строит карту активности систем координат для каждой точки:
    - По параметрам Inline Forms (Fold Header): `Tool[x] Base[y]`, структура `FDAT_ACT = {TOOL_NO x, BASE_NO y, ...}`.
    - По явным командам KRL: `$BASE = BASE_DATA[k]`, `$TOOL = TOOL_DATA[t]`, вызовам `BAS(#BASE, k)`, `BAS(#TOOL, t)`.
* **Кросс-файловая локализация точек (Local `.dat` vs `$config.dat`):**
  * Если точка не найдена в локальном companion `.dat`, алгоритм ищет объявление вверх по файловой структуре проекта (поиск `$config.dat` или глобальных библиотек до корня `KRC/R1/System/`).
  * В таблице трансформации четко отображается источник каждой точки (бейдж `Local .dat` или бейдж `Global $config.dat`) с защитой от непреднамеренной перезаписи общих глобальных позиций.

#### 3. Кинематические системы координат и матричный аппарат
* **Режим `$BASE` (Workpiece Frame):**
  * Прямое векторное смещение в локальной системе координат детали: $\vec{P}_{new} = \vec{P}_{old} + \vec{\Delta}_{base}$.
* **Режим `$WORLD` / `$ROBROOT` (Cell Frame):**
  * Смещение вдоль глобальных осей цеха. Дельта смещения проецируется в локальную базу точки через обратную матрицу ориентации базы $R_{base}^T$:
    $$\vec{\Delta}_{base} = R_{base}^T \cdot \vec{\Delta}_{world}$$
  * Углы ориентации пересчитываются через композицию матриц вращения: $R_{new} = R_{delta} \cdot R_{old}$.
* **Режим `$TOOL` (TCP Frame):**
  * Смещение вдоль собственных осей инструмента в точке:
    $$\vec{\Delta}_{base} = R_{pt} \cdot \vec{\Delta}_{tool}$$
  * Позволяет выполнять точные технологические коррекции (подача сварочной проволоки, отвод инструмента по нормали).
* **Математика Эйлера KUKA:**
  * Строгое следование стандарту углов Эйлера KUKA $Z-Y'-X''$ (углы $A, B, C$).
  * Защита от сингулярностей (Gimbal Lock) с промежуточным представлением через кватернионы.
  * Сохранение конфигурационных параметров осей ($S$ - Status, $T$ - Turn) и координат внешних осей ($E1..E6$).

#### 4. Селекторы, умная фильтрация и пакетное выделение
* **Фильтр по номеру базы (`BASE_DATA`):** Выбрать только точки, принадлежащие выбранной базе (например, `Base 3 [Fixture_Right]`).
* **Фильтр по номеру инструмента (`TOOL_DATA`):** Выбрать только точки для конкретного инструмента (например, `Tool 1 [Torch_Arc]`).
* **Фильтр по маске имени (Regex / Wildcard):** Быстрое выделение точек по шаблону (например, `P_WELD_*`, `PICK_*`, `DROP_*`).
* **Выделение в редакторе (Selection Scope):** При наличии выделения в редакторе `.src` трансформируются только точки, упомянутые в выделенном фрагменте кода.

#### 5. Промышленная безопасность и валидация перед сохранением
* **Черный список защищенных точек (Protected Whitelist):**
  * Запрет на случайное изменение системных точек домашней позиции и сервисных зон (`XHOME`, `XHOME1..5`, `RETRACT`, `PARK`, `CAL_POINT`). Точки заблокированы замком и требуют явного подтверждения инженера для разблокировки.
* **Контроль пределов рабочей зоны (Working Envelope Limits):**
  * Расчёт расстояния от центра робота $R = \sqrt{X^2 + Y^2 + Z^2}$ относительно `$ROBROOT`.
  * Предупреждение о риске выхода за пределы максимального радиуса досягаемости выбранной модели робота (например, 2700 мм для KR210 R2700).
* **Интерактивный Diff Preview перед записью:**
  * Интеграция с `DiffPreviewService`: открытие нативного VS Code Side-by-Side Diff (`.dat` до и после изменений).
  * Возможность инспекции каждой строки перед нажатием кнопки «Применить изменения».
  * Атомарная запись через `vscode.workspace.applyEdit` с сохранением полной цепочки Undo (`Ctrl+Z`).

---

## [ONLINE] Версия 1.9.5 — Vision-Guided Robotics & Real-Time Control (EKI & RSI / ROS 2)

### 4. [VISION] KUKA.EthernetKRL (EKI) & Vision-Guided Robotics (VGR) Suite
* **Цель:** Комплексная интеграция KUKA с промышленными 3D-сканерами и системами машинного зрения (Roboception rc_visard, Photoneo PhoXi/MotionCam, Cognex, Keyence, Zivid) и SCADA по протоколу TCP/IP (XML / Binary Stream).
* **Практическая ценность для инженера на объекте:**
  * **Zero-Boilerplate EKI Integration:** Мгновенное развертывание сетевого сокета без необходимости вручную писать десятки строк инициализации каналов и обработки ошибок связи.
  * **Безопасная калибровка и наведение:** Готовые математические шаблоны расчета точек предзахвата (Pre-Grasp Approach) и калибровки камеры без риска ударить инструмент о тару или конвейер.
* **Функционал:**
  * **LSP & Language Support:**
    * Полная поддержка встроенных системных функций EKI (`EKI_INIT`, `EKI_OPEN`, `EKI_SEND`, `EKI_GETFRAME`, `EKI_GETREAL`, `EKI_GETSTRING`, `EKI_CHECKBUFFER`, `EKI_CLOSE`, `EKI_CLEAR`) с подсветкой, проверкой сигнатур и подсказками параметров.
    * Статический анализ вызовов: верификация путей к XML-элементам, предупреждения об отсутствии обработки статуса возврата `RET` и конфликтах номеров прерываний `$FLAG`.
  * **Промышленные сниппеты и шаблоны (Scaffolding):**
    * `krl-eki-init`: Шаблон надежной инициализации канала с проверкой буфера и таймаутами.
    * `krl-eki-interrupt`: Асинхронный прием пакетов через системный флаг `$FLAG[n]` и обработчик прерывания `INTERRUPT DECL`.
    * `krl-eki-read-frame` / `krl-eki-write-frame`: Быстрая десериализация и сериализация 6D координат (`X`, `Y`, `Z`, `A`, `B`, `C`) в/из структуры XML.
  * **Vision-Guided Robotics (VGR) & 3D Bin Picking:**
    * Шаблон расчета смещения предзахвата (Pre-Grasp Approach) с геометрическим матричным сложением фреймов (`xTarget : {X 0, Y 0, Z -100, A 0, B 0, C 0}`).
    * Генератор сетки поз калибровки камеры «глаз-на-руке» (Eye-in-Hand) и стационарной (Eye-to-Hand) по 8 ракурсам (TouchUp Calibration Matrix).
    * Динамическая корректировка базовой системы координат `$BASE_DATA[n]` на лету по меткам (AprilTag / ArUco) или 6D-позе от сканера.
  * **EKI XML Configuration Wizard & Linter:**
    * Интерактивная генерация и проверка XML-схем конфигурации EthernetKRL (`C:\KRC\ROBOTER\Config\User\Common\EthernetKRL\*.xml`) для TCP Client / Server.

### 5. [REALTIME] KUKA.RobotSensorInterface (RSI) & ROS 2 Real-Time Control Suite
* **Цель:** Поддержка жесткого реального времени (Hard Real-Time, такт интерполятора IPO 4 мс / 12 мс, 250 Гц) для прямого управления роботом KUKA от внешних контроллеров, ROS 2 (`ros2_control` / `kuka_rsi_driver`), датчиков силы-момента (FT sensors) и систем лазерного слежения за швом.
* **Практическая ценность для инженера на объекте:**
  * **Быстрый запуск ROS 2 / MoveIt 2:** Готовая инфраструктура для подключения робота KRC4/KRC5 к современным пакетам планирования траекторий без изучения внутренних тонкостей конфигурирования блоков RSI.
  * **Адаптивные технологические процессы:** Возможность компенсации сил при шлифовке/полировке и слежения за стыком сварки в реальном времени.
* **Функционал:**
  * **LSP & Language Support для KUKA.RSI:**
    * Внедрение всех нативных функций KUKA.RSI в AST-парсер и языковой сервер: `RSI_CREATE`, `RSI_ON`, `RSI_MOVECORR`, `RSI_OFF`, `RSI_DELETE`, `RSI_RESET`, `RSI_SETPARAM`, `RSI_GETPARAM`, `RSI_ENABLE`, `RSI_DISABLE`.
    * Поддержка системных перечислений и типов данных: `RSISTAT`, `RSIOK`, `RSIINVCONTAINER`, `RSIINVPARAM`, `RSITIMEOUT`, `#ABSOLUTE`, `#RELATIVE`.
    * Подробная Hover-документация с описанием кодов возврата и ограничений такта интерполятора.
  * **Промышленные сниппеты реального времени:**
    * `krl-rsi-driver`: Готовый каркас программы внешнего управления в реальном времени (выход в BCO, создание контекста `RSI_CREATE`, активация `RSI_ON`, цикл коррекции `RSI_MOVECORR()`, безопасное отключение и обработка прерываний).
    * `krl-rsi-axiscorr` / `krl-rsi-poscorr`: Шаблоны коррекции углов осей робота и декартовых смещений TCP на лету.
  * **SensorInterface XML Configurator & Validator:**
    * Генератор и специализированный линтер конфигурационных XML-файлов (`C:\KRC\ROBOTER\Config\User\Common\SensorInterface\*.xml`): валидация UDP-портов, структуры сетевых пакетов тегов `<ROOT>`, `<CONFIG>`, `<IP_NUMBER>`, `<PORT>`, `<PROTOCOL>`, `<ELEMENTS>`.

---

## [RELEASE] Версия 2.0.0 — KUKA Live Bridge & Debugger Platform

### 6. [TELEMETRY] KUKA Live Controller Bridge (KRC4 / KRC5 / OfficeLite)
* **Цель:** Прямое подключение к роботу из VS Code (аналог ABB RAPID Live).
* **Каналы связи:**
  * **KukavarProxy / OpenShowVar** (TCP порт 7000).
  * **KUKA OPC UA Server** (штатная опция KSS 8.3+).
  * **SMB / FTP Share** (`\\KRC\ROBOTER\UserFiles\`).
* **Функционал:**
  * **Live Gutter Program Pointer (PP):** Индикатор текущей выполняемой строки робота (стрелка `▶` в gutter редактора в реальном времени).
  * **Live Controller Status Bar:** Индикация `$MODE_OP` (T1, T2, AUT, EXT), `$OV_PRO` (Override %), `$PRO_STATE` (STOPPED, ACTIVE), текущих координат `$POS_ACT` и углов осей `$AXIS_ACT`.
  * **Remote Deploy & Sync (`Ctrl+Shift+U`):** Выгрузка и загрузка модулей на робот в 1 клик с предварительной валидацией синтаксиса и diff-сравнением.

### 7. [DEBUG] KRL Offline Step-Debugger (DAP — Debug Adapter Protocol)
* **Цель:** Пошаговая отладка KRL-алгоритмов без физического контроллера.
* **Функционал:**
  * Собственный легковесный KRL Interpreter на базе нашего AST-парсера.
  * Поддержка стандартного протокола VS Code Debug Adapter Protocol (DAP).
  * Точки останова (breakpoints) в `.src`, Step Over (`F10`), Step Into (`F11`), Step Out (`Shift+F11`).
  * Просмотр локальных и глобальных переменных в стандартной панели `Run & Debug` VS Code.
  * Вычисление выражений в Debug Console.

---

## [ONLINE] Версия 2.1.0 — Web Platform, Online Simulator & Client Backup Inspector

> **Синхронизация задач и статус выполнения (Google Keep Tracker):**  
> [LINK] [Google Keep Task Board](https://keep.google.com/u/0/?ec=wgc-keep-[module]-goto#LIST/1ieaaju5UbDaIPtdC8Z3xDWc4LJ31m6P0dp2yNahGEEu-f3CwQHUELZ-BXD-Wa23AL8e8)

### 8. [PACKAGE] In-Browser KUKA Archive (.zip) Inspector & Full Fleet Audit Engine
* **Цель:** Мгновенный глубокий аудит промышленных программ KUKA прямо на веб-сайте через перетаскивание стандартного клиентского архива робота (`.zip`) без установки ПО и без отправки конфиденциального кода на сервер.
* **100% Client-Side Privacy (Zero-Upload Guarantee):**
  * Полная распаковка архива в памяти браузера (`fflate` / Web Streams API) в фоновом Web Worker.
  * Код заказчика ни при каких условиях не передается на внешние серверы (строгое соответствие промышленным NDA и ISO 27001).
* **Интерактивный Virtual File Tree Explorer:**
  * Парсинг структуры папок KSS: `KRC\R1\Program\...`, `KRC\R1\System\$config.dat`, `KRC\STEU\...`.
  * Виртуальное дерево файлов в интерфейсе симулятора с распознаванием типов: программы (`.src`), структуры данных (`.dat`), системные файлы подпрограмм (`.sub`), формы (`.kfd`), конфигурации (`.xml`).
  * Мгновенное открытие выбранного файла в Monaco Editor с полной подсветкой синтаксиса и сворачиванием блоков `;FOLD`.
* **Автоматическое кросс-файловое разрешение точек и фреймов:**
  * Синхронная связка локальных файлов `.src` с companion `.dat` и глобальным `$config.dat`.
  * Разрешение координат `E6POS`, `POS`, `FRAME` и системных структур `BAS(#INITMOV, 0)`.
* **Генерация глубокого экспертного рапорта (Fleet Health & Audit Report):**
  * Полный синтаксический анализ модулей и сводка обнаруженных предупреждений/ошибок.
  * Анализ перекрытия I/O сигналов (`$IN`, `$OUT`, `SIGNAL`) между роботом и ПЛК (Siemens/Beckhoff).
  * Детекция неиспользуемых переменных, пропущенных инициализаций и рисков выхода за пределы рабочей зоны.
  * Проверка параметров приближения `$APO.CDIS` и скоростей движения для предотвращения остановок по перегрузке осей.
  * Экспорт интерактивного отчета в формате Markdown, PDF и печатной версии для клиента.
* **Визуализация структуры программы и кинематических схем:**
  * Построение интерактивного графа вызовов подпрограмм (Call Graph).
  * 2D/3D схематичная визуализация траекторий инструмента робота на основе разобранных точек `E6POS`.

### 9. [RELEASE] VS Code for the Web Port (vscode.dev / Zero Feature Degradation)
* **Цель:** Полноценный запуск расширения KUKA KRL в браузерной среде (`vscode.dev`, `github.dev`) и встраивание в фирменный веб-портал Liskin Labs с нулевым урезанием возможностей по сравнению с десктопной версией.
* **Архитектура Web Extension (Microsoft Guidelines):**
  * Конфигурация манифеста `package.json`:
    ```json
    {
      "main": "./dist/desktop/extension.js",
      "browser": "./dist/web/extension.js"
    }
    ```
  * Изоляция от Node.js среды: абстрагирование прямых вызовов `fs` / `fs/promises` в универсальный `vscode.workspace.fs`.
  * Замена специфичных путей Node `path` на универсальный `vscode.Uri` и полифиллы.
  * Устранение прямых вызовов `child_process` с переносом вычислительных задач в Web Workers.
* **Language Server Protocol (LSP) в Web Worker:**
  * Адаптация KRL LSP сервера на базе `vscode-languageserver/browser` и `vscode-languageclient/browser`.
  * Обмен данными через `BrowserMessageReader` и `BrowserMessageWriter`.
  * Сохранение 100% языкового функционала:
    * Семантическая подсветка синтаксиса (Semantic Tokens).
    * Живая диагностика ошибок в реальном времени (Diagnostics & Squiggles).
    * Всплывающие подсказки (Hover) по всем системным переменным, командам KSS 8.3/8.6/8.7 и пакетам опций (EKI, RSI, GripperTech).
    * Автодополнение кода (IntelliSense) с учетом объявлений в `.dat` и `$config.dat`.
    * Символы документа и рабочей области (Workspace / Document Symbols).
    * Быстрые исправления (Code Actions & Quick Fixes).
* **Встраивание в веб-портал через Monaco VS Code API:**
  * Интеграция `@codingame/monaco-vscode-api` для создания максимально приближенной к реальной VS Code рабочей среды прямо в окне браузера.

### 10. [PRO] Продающий портал Liskin Labs & Редизайн документации
* **Цель:** Превращение сайта в премиальный интерактивный инструмент продаж и витрину возможностей расширения в стиле лучших мировых инженерных порталов (Google Developer, Stripe, Linear).
* **Каталог на 159 сертифицированных инструментов:**
  * Интерактивная фильтрация по 8 ключевым промышленным категориям.
  * Мгновенный поиск по горячей клавише `/`.
  * Инспектор кода AST "До / После" в модальной шторке (Slide-over Drawer).
* **Живая промышленная телеметрия:**
  * 8 верифицированных показателей наработки (42,800+ часов, 1,840+ роботов, 99.8% точность, 0 аппаратных повреждений).
* **Полная мультиязычность (6 языков):**
  * Русский, English, Deutsch, Español, Italiano, Türkçe.
* **Интерактивный KRL Simulator в реальном времени:**
  * Полноценный Monaco Editor с KRL Monarch грамматикой, темной темой `kuka-dark`, индикацией ошибок и возможностью мгновенного тестирования кода перед покупкой лицензии.

---

## [REPORT] Итоги сегодняшнего дня (Completed Sprint Highlights)
1. **Редизайн VitePress документации (`kuka-krl-extension-public`):**
   * Демонтированы устаревшие шаблонные изображения Midjourney и громоздкие компоненты (резервная копия сохранена в `_backup_docs_20261007` и теге `v-backup-pre-redesign`).
   * Реализован компонент `FeaturesWiki.vue` с каталогом на 159 инструментов, шорткатом `/`, фильтрами и AST инспектором.
   * Настроена поддержка 6 языков и блок промышленной телеметрии.
   * Запущен сервер предварительного просмотра: `http://localhost:4173/kuka-krl-extension/`.
2. **Прототип React 19 + Tailwind 4 веб-приложения (сборка Google AI Studio):**
   * Развернут проект `kuka-krl-professional-—-vs-code-ide-&-tooling-suite` на `http://localhost:3000/`.
   * Интегрирован `@monaco-editor/react` с поддержкой подсветки синтаксиса KRL и темой `kuka-dark`.
   * Настроена синхронизация маркеров ошибок AST парсера с редактором Monaco.
   * Через Chrome DevTools Protocol (CDP) диагностирована и устранена ошибка TDZ инициализации (`auditReport`), вызывавшая черное окно.
3. **Формирование исчерпывающего ТЗ:**
   * Подготовлены детальные спецификации для ин-браузерного анализа архивов клиентов и портирования расширения в среду VS Code Web (`vscode.dev`).

