<h1 align="center">KUKA Engineering Toolkit для VS Code</h1>

<p align="center">
  <b>Промышленное автономное программирование (OLP), SCADA Live Monitor реального времени, диагностика до выгрузки на робота и Model Context Protocol (MCP) AI Bridge для робототехники KUKA.</b><br />
  <i>Полная офлайн- и онлайн-инженерная среда для Visual Studio Code.</i><br />
  Создан для контроллеров <b>KRC2, KRC4 и KRC5 (KSS 5.x – 8.7+)</b>, <b>iiQKA (KSS 9.x / iiQWorks)</b> и <b>VKRC (VASS 2.6 / VASS 6)</b>.
</p>

<details>
<summary>Language / Язык / Dil / Sprache / Lingua / Idioma</summary>

| Language | File |
|---|---|
| English | [README.md](README.md) |
| Русский | [README.ru.md](README.ru.md) |
| Türkçe | [README.tr.md](README.tr.md) |
| Deutsch | [README.de.md](README.de.md) |
| Italiano | [README.it.md](README.it.md) |
| Español | [README.es.md](README.es.md) |

</details>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension"><img src="https://badgen.net/vs-marketplace/v/LiskinLabs.kuka-krl-extension?style=flat&label=VS%20Code%20Marketplace&color=FF6600" alt="VS Code Marketplace" /></a>
  <a href="https://open-vsx.org/extension/LiskinLabs/kuka-krl-extension"><img src="https://img.shields.io/open-vsx/v/LiskinLabs/kuka-krl-extension?style=flat-square&logo=eclipseche&logoColor=white&color=007ACC&label=Open%20VSX" alt="Open VSX" /></a>
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/releases"><img src="https://img.shields.io/badge/Release-v1.9.8-FF6600?style=flat-square&logo=visualstudiocode&logoColor=white" alt="Release v1.9.8" /></a>
  <a href="https://secure.software/vscode/packages/liskinlabs/kuka-krl-extension"><img src="https://img.shields.io/badge/Spectra%20Assure-PASSED%20(100%25)-10b981?style=flat-square&logo=shield&logoColor=white" alt="ReversingLabs Security Score" /></a>
  <a href="https://liskinlabs.github.io/kuka-krl-extension/ru/"><img src="https://img.shields.io/badge/Fleet%20Verified-4.2M%2B%20LoC-10b981?style=flat-square" alt="Fleet Verified" /></a>
  <img src="https://img.shields.io/badge/Factory%20OT-Air--Gapped%20Safe-blue?style=flat-square" alt="Air-Gapped Safe" />
  <a href="https://github.com/LiskinLabs/kuka-krl-mcp"><img src="https://img.shields.io/badge/MCP%20Server-Connected-00D68F?style=flat-square" alt="MCP Server Connected" /></a>
</p>

<p align="center">
  <a href="https://liskinlabs.github.io/kuka-krl-extension/ru/"><b>Документация и база знаний</b></a> •
  <a href="https://checkout.dodopayments.com/buy/pdt_0NmAUzwdbzeERSktsOLTp"><b>Engineer Pro ($19/мес)</b></a> • 
  <a href="https://checkout.dodopayments.com/buy/pdt_0NmAV012KFHSjUMyDomJ6"><b>Annual Pro ($149/год)</b></a> • 
  <a href="https://checkout.dodopayments.com/buy/pdt_0NmAcoqVCfuwQ6Xx7qyqr"><b>Lifetime Pro ($699)</b></a> • 
  <a href="https://checkout.dodopayments.com/buy/pdt_0NnLCdgD69GiXDLRJ0K5v"><b>Team Edition ($499/год)</b></a> •
  <a href="https://secure.software/vscode/packages/liskinlabs/kuka-krl-extension"><b>Отчёт аудита безопасности</b></a>
</p>

---

## Промышленная надёжность: ноль простоев до загрузки на робота

> [!IMPORTANT]
> **Устраняйте синтаксические ошибки, незакрытые FOLD, дедлоки, дрейф координат и сбросы Advance Run в VS Code до отправки кода в физический контроллер робота.**

* **Предотвращение простоев линии ($10,000+ / час)**: Проверка систем координат Tool/Base, границ рабочей зоны и циклических задач `SPS.SUB` до старта производства.
* **SCADA Live Monitor реального времени**: Прямое Ethernet-подключение к физическим контроллерам KR C4 / KR C5 с отслеживанием TCP, нагрузок на двигатели (моментов осей), матрицы 4096 I/O и субтитрами аварий SmartPAD.
* **Паритет и превосходство над DReS 6.7**: 3-сторонний аудит целостности FOLD, SVD-калибровка баз Кабша, Point Table Engine (сплит-вид, поиск сирот, пересчёт фреймов, умный дубликат), KFD Form Engine, двусторонний конвертер KRC <-> VKRC и 3D-дифф технологических точек.
* **Анализ бэкапов SmartPAD**: Аудит архивов (`.zip` / `KRCDiag`) с точным расчётом пространственных дельт $\Delta X, \Delta Y, \Delta Z$.
* **Комплексы WorkVisual (.wvs) и KUKA.Sim (.vcmx)**: Анализ топологии шин без распаковки, маппинг сигналов fieldbus (EtherCAT/Profinet), валидатор гонок симуляции (`VCMX001` - `VCMX004`) и пост-процессор.
* **KUKA.RSI и CAM-инструменты**: Генератор циклов реального времени 4 мс `#IPO_FAST`, импорт ISO G-Code и векторных контуров SVG, мастер 9-точечной калибровки машинного зрения Hand-Eye.
* **Мост Model Context Protocol (MCP) AI**: Подключение внешних ИИ-агентов (Cursor, Antigravity, Claude Code, Windsurf) напрямую к телеметрии реального контроллера и локальной диагностике проекта.
* **Детерминированный безопасный авторемонт**: Устранение тысяч структурных расхождений фолдов и синтаксических сбоев в 1 клик с защитой отката AST и Monaco diff review.

---

## Реальность производства и мгновенная окупаемость (ROI)

Каждый инженер-пусконаладчик, системный интегратор и разработчик РТК знает цену производственного брака:

1. **Внеплановый останов линии ($10,000+/час)**: Неинициализированный `$TOOL` или `$BASE`, сброс Vorlaufstopp с рывком манипулятора, или деление на ноль в `SPS.SUB` останавливают роботизированную ячейку в момент запуска серии.
2. **Ночной дрейф координат**: Операторы подправляют обученные точки на пульте SmartPAD без фиксации версий. Понять, что изменилось, требует ручного сопоставления десятков файлов `.dat`.
3. **Медленная обратная связь**: Загрузка кода на физические контроллеры или запуск тяжёлых виртуальных симуляторов ради выявления базовых синтаксических ошибок отнимает рабочие часы.

> [!TIP]
> **Гарантия окупаемости:** Обнаружение одной пропущенной системы координат, выхода за пределы досягаемости или незакрытого FOLD до загрузки на робота окупает годовую подписку Team Edition в первые 5 минут.

---

## Восемь ключевых производственных направлений

### 1. SCADA И ТЕЛЕМЕТРИЯ: Онлайн-монитор контроллера реального времени [PRO]
Прямое промышленное подключение по Ethernet к реальным контроллерам KUKA KR C2, KR C4 и KR C5 (`krl.connectKukaRobot`, `krl.openLiveBridge`):
* **Двойная архитектура связи**: Работает через WCF OnlineServices и высокоскоростной шлюз KUKAVARPROXY (порт 7000) по защищённым сетям АСУ ТП.
* **Шестиосевая шкала телеметрии в реальном времени**: Живое отображение `$AXIS_ACT` и `$AXIS_MOT` с динамическими шкалами пределов осей, угловыми скоростями и моментами двигателей A1..A6.
* **Декартова телеметрия TCP**: Чтение координат `$POS_ACT` (X, Y, Z, A, B, C) с активными индикаторами `$TOOL` и `$BASE`.
* **Динамическая матрица дискретных сигналов**: Визуальная сетка для `$IN[1..4096]`, `$OUT[1..4096]` и `$FLAG[1..1024]` с пульсацией изменения состояний.
* **Поток аварий SmartPAD и субтитры перевода**: Живой поток сообщений с контроллера с цветовой градацией важности. Независимо от языка контроллера (немецкий, турецкий, итальянский и др.), расширение отображает понятные субтитры на русском и английском языках под системными кодами сообщений (`KSS00203`, `KSS01442`, `KSS01123`, `KSS01422`, `KSS00020`).
* **Горячее скачивание бэкапа**: Выгрузка полных архивов бэкапа `.zip` напрямую с работающего робота по Ethernet без останова технологического цикла.

<p align="center">
  <img src="extension/media/kuka_control_center.gif" width="740" alt="KUKA SCADA Live Controller Monitor Dashboard" />
</p>

---

### 2. АУДИТ И ОТЧЁТНОСТЬ: Промышленная безопасность и приёмо-сдаточные протоколы [PRO]
Статический анализ кода, оптимизированный под особенности интерпретатора KRL:
* **Автоматический приёмо-сдаточный протокол ячейки (`krl.generateAcceptanceReport`)**: Комплексный инженерный отчёт с показателем здоровья кода (0–100%), расчётом штрафов времени цикла из-за остановов Vorlaufstopp (~250–450 мс на точку), детекцией дедлоков и проверкой пределов досягаемости по 183 моделям роботов KUKA. Экспорт в Markdown и PDF для передачи заказчику.
* **Контроль систем координат Tool/Base**: Проверка инициализации `$TOOL` и `$BASE` перед любым пространственным движением (`LIN`, `CIRC`, `SLIN`, `SCIRC`).
* **Контроль Advance Run и плавности движения**: Поиск периферийных команд (`$OUT`, `$IN`, `WAIT FOR`) внутри траекторий движения, сбрасывающих `$ADVANCE` до 0, с рекомендациями по использованию `TRIGGER WHEN PATH / DISTANCE` и `CONTINUE`.
* **Сканер дедлоков и ожиданий**: Поиск некорректных условий `WAIT FOR $IN[...]` и разорванных рукопожатий с ПЛК.
* **Защита циклической задачи SPS.SUB**: Аудит фоновых задач на наличие блокирующих вызовов (`WAIT SEC`, `WAIT FOR`) и риска деления на ноль.
* **Проверка пределов рабочей зоны**: Геометрическая валидация координат относительно паспортов досягаемости 183 роботов KUKA.
* **Линтер автомобильных стандартов VASS 2.6 / VASS 6**: Контроль правил концерна Volkswagen/Audi (`VE=0%` на `SPSMAKRO`, подтверждение `A23=AUS`, поддержка 22 технологических пакетов VW UserTech).

<p align="center">
  <img src="extension/media/type-validation-demo.gif" width="740" alt="KUKA Pre-Flight Static Analysis & Quality Audit" />
</p>

---

### 3. СРАВНЕНИЕ: Дифф бэкапов SmartPAD и кинематическая математика [PRO]
Глубокая инспекция бэкапов контроллера без распаковки архивов:
* **Инспекция архивов в памяти (Zero-Unpack)**: Открытие архивов `.zip` и диагностических пакетов `KRCDiag_*.zip` по виртуальному протоколу `krc-archive://`.
* **Расчёт пространственных дельт (\Delta)**: Вычисление точных смещений декартовых и угловых координат между версиями:
  $$\Delta X, \Delta Y, \Delta Z, \Delta A, \Delta B, \Delta C$$
* **Аудит ночных правок на линии**: Мгновенное выявление точек, подправленных операторами на пульте во время ночной смены.
* **Нативный просмотрщик бинарных логов `.evt`**: Pure-TS декодер системных журналов событий контроллера KSS, охватывающий 2,050+ кодов ошибок на 6 языках с переходом на строку программы `.src` в 1 клик.
* **Прозрачный монтаж Live ZIP в проект (`krl.mountBackupZipAsProject`)**: Работа с бэкапом как с открытой папкой. При сохранении (`Ctrl+S`) архив на диске обновляется за <80 мс без блокировки редактора.

<p align="center">
  <img src="extension/media/krc_backup_diff.gif" width="740" alt="KUKA SmartPAD Backup Diff & Coordinate Delta Math" />
</p>

---

### 4. ТАБЛИЦА ТОЧЕК И СИНХРОНИЗАТОР: Движок парных файлов данных .DAT [PRO]
Управление точками траектории и гарантированная синхронизация структуры:
* **Автосинхронизация точек в .DAT (`krl.syncPointsToDat`)**: Сканирует `.src` на команды движения (`PTP`, `LIN`, `CIRC`, `SPTP`, `SLIN`, `SCIRC`) и заголовки фолдов (`PDAT_ACT`, `FDAT_ACT`, `LDAT_ACT`). Создаёт недостающий `.dat` или добавляет блок `;FOLD Auto-Synchronized Points` (`DECL E6POS`, `DECL FDAT`, `DECL PDAT`, `DECL LDAT`) без перезаписи существующих обученных точек.
* **Сплит-режим таблицы точек**: Параллельное редактирование кода движения и структур координат с валидацией в реальном времени.
* **Поиск неиспользуемых точек**: Обнаружение забытых координат в `.dat`, не вызываемых в подпрограммах `.src`.
* **Калибровка баз по методу Кабша (SVD)**: Расчёт рамок `TOOL_DATA` и `BASE_DATA` с углами Эйлера (A, B, C) по физически измеренным точкам.
* **6D зеркалирование траекторий (`krl.mirrorTrajectory`)**: Отражение траекторий относительно плоскостей X, Y, Z с коррекцией битов конфигурации осей ($A_1..A_6$).
* **Пакетное смещение точек (`krl.batchShiftPoints`)**: 6D геометрические операции с фреймами (`:`) для смещения инструмента, перепривязки баз и векторных сдвигов.
* **Синхронная перенумерация точек (`krl.renumberPoints`)**: Пакетное переименование точек в файлах `.src`, inline form folds и `.dat` (`XP1`, `FP1`, `PPDAT1`).

---

### 5. WORKVISUAL И VCMX: Топология шин и симуляция 3D [PRO]
Анализ проектов и верификация логики имитационных моделей без запуска стороннего ПО:
* **Инспектор топологии WorkVisual (.wvs / .wvps) (`krl.inspectWvsTopology`)**: Анализ бинарных проектов WorkVisual в памяти. Декодирование hex-экранированных XML-метаданных с извлечением каталогов опций KOP (`KUKA.EthernetKRL`, `KUKA.SafeOperation`, `KUKA.GripperSpotTech`), версии KSS и кинематики (`SafeMaDaBusTopology.xml`).
* **Топология шин и извлечение сигналов**: Разбор конфигураций EtherCAT (`EcatDiag_*.xml`), Virtual I/O и Profinet с автоматическим экспортом тегов в Siemens TIA Portal XML/SDF, Beckhoff TwinCAT 3 GVL и EPLAN CSV.
* **Инспектор ячеек KUKA.Sim VCMX (`krl.inspectVcmxLayout`)**: Парсер `layout.rsc` для извлечения узлов роботов, сигналов `rSimBooleanSignal` и технологических процессов прямо из файлов `.vcmx`.
* **Валидатор и авторемонт симуляций VCMX (`krl.validateVcmxSimulation`)**: Детекция и устранение 4 критических сбоев симуляции (`VCMX001` зависания сигналов по фронту, `VCMX002` сбои таймаутов `WaitSignal`, `VCMX003` накопление переменных продуктов, `VCMX004` потерянные ссылки сигналов) с сохранением копий `.bk1`, `.bk2`.
* **Пост-процессор VCMX в KRL (`krl.exportVcmxToKrl`)**: Конвертация процессов симуляции в синхронизированные модули KRL `.src` и `.dat`.

---

### 6. СИСТЕМЫ РЕАЛЬНОГО ВРЕМЕНИ RSI И CAM: 4мс управление и импорт G-Code/SVG [PRO]
Высокоточные технологические траектории и управление в жёстком реальном времени:
* **Валидатор схем KUKA.RSI XML (`krl.validateRsiXml`)**: Проверка конфигураций `SensorInterface/*.xml` (`<ROOT>`, `<CONFIG>`, `<IP_NUMBER>`, `<PORT>`, `<SEND>`, `<RECEIVE>`, непрерывность индексов `INDX`).
* **Генератор драйвера реального времени RSI 4 мс / 12 мс (`krl.generateRsiCode`)**: Создание промышленных циклов коррекции `#IPO_FAST` (4 мс) и `#IPO` (12 мс) для декартовой (`RKorr`) или угловой (ROS 2 Axis `AK.A1..A6`) коррекции.
* **Импортер CAM ЧПУ G-Code и векторной графики SVG (`krl.importGcodeToKrl`)**: Преобразование кадров ISO G-Code (`G0` -> `PTP`/`SPTP`, `G1` -> `LIN`/`SLIN`, `G2`/`G3` -> `CIRC`/`SCIRC` с расчётом центра дуги `XAUX`, подачи `F` -> `$VEL.CP`, `M3/M5` -> `$OUT`) и векторных контуров `.svg` в готовые пары `.src` и `.dat`.
* **Мастер калибровки машинного зрения Hand-Eye (`krl.generateVisionCalibration`)**: 9-позиционная калибровочная пирамида (Eye-in-Hand / Eye-to-Hand) с расчётом матрицы ориентации камеры в углы Эйлера KUKA (A, B, C), траекторией безопасного подхода и протоколом обмена EthernetKRL.
* **Экспорт тегов ПЛК (`krl.exportPlcTags`)**: Сканирование объявлений `SIGNAL` и `$IN`/`$OUT` с расчётом адресов IEC 61131-3 и выгрузкой в Siemens TIA Portal XML/SDF, Beckhoff TwinCAT 3 GVL и EPLAN CSV.

---

### 7. АВТОРЕМОНТ: Безопасный QuickFix и пакетные правки с Monaco Diff Review [PRO]
Детерминированное устранение структурных и синтаксических сбоев без искажения кинематики движения (`krl.fixAllSafeIssues`):
* **Синхронизация заголовков FOLD**: Выравнивание несовпадающих пар `;FOLD` и `;ENDFOLD` с удалением повреждённых скобок по всему проекту.
* **Закрытие незавершённых FOLD**: Безопасная расстановка закрывающих тегов для секций `;FOLD INI` перед окончанием подпрограмм.
* **Устранение FOR STEP 0**: Замена зависающих циклов с шагом `STEP 0` на безопасный шаг `STEP 1`.
* **Инъекция команды BRAKE**: Гарантированная вставка команды торможения перед `RESUME` в обработчиках прерываний.
* **Фиксация массы полезной нагрузки**: Добавление вызова `BAS(#PAYLOAD, nTool)` после блока присвоений `$LOAD`.
* **Удаление BOM и не-ASCII символов**: Очистка символов чужой раскладки, вызывающих сбои компиляторов KSS.
* **Защитный откат AST**: Каждая правка проверяется повторным проходом AST-парсера; при малейшем нарушении баланса транзакция откатывается к исходному коду.
* **Интерактивный Monaco Diff Review**: Просмотр кандидатов правок в двухпанельном сравнении с кнопками «Принять все», «Принять (Ctrl+Enter)» или «Отклонить (Esc)».

---

### 8. ИИ-АССИСТЕНТ И МОСТ MODEL CONTEXT PROTOCOL (MCP) [PRO]
Расширение содержит **встроенный локальный мост MCP** (`127.0.0.1`), связывающий современные среды ИИ-разработки (**Cursor, Google Antigravity, Claude Code CLI, Windsurf**) с вашим промышленным проектом:
* **Телеметрия робота через MCP (`krl_live_telemetry`)**: Внешние ИИ-агенты могут в реальном времени считывать данные с физического контроллера (углы осей, координаты TCP, активные инструменты, режим работы, программу, ошибки).
* **Автоматическая регистрация в Cursor**: Настройка параметров сервера MCP в Cursor через `vscode.cursor.mcp.registerServer` при старте.
* **Экспорт конфигураций в 1 клик**: Команда `KUKA KRL: Copy MCP Configuration` (`Ctrl+Shift+P`) для копирования настроек под Claude Desktop, Cursor, Antigravity и Windsurf.
* **Открытый автономный сервер MCP**: Репозиторий [**LiskinLabs/kuka-krl-mcp**](https://github.com/LiskinLabs/kuka-krl-mcp) (MIT) с 12 инструментами анализа системных переменных и каталога ошибок KSS.
* **Промышленные правила и скиллы для ИИ**: Базы знаний для Cursor (`.cursor/rules/kuka-krl.mdc`) и Antigravity (`SKILL.md`) на [**LiskinLabs/kuka-krl-skills**](https://github.com/LiskinLabs/kuka-krl-skills).

---

## Таблица сравнения возможностей

| Возможность | Community (Free) | Engineer Pro | Team Edition | Enterprise Site |
|:---|:---:|:---:|:---:|:---:|
| **Подсветка синтаксиса KRL и темы** (`.src`, `.dat`, `.sub`, `.kfd`) | Да | Да | Да | Да |
| **Умное автодополнение и спецификации** (957+ переменных, 116 функций) | Да | Да | Да | Да |
| **Системная библиотека KSS и переход по F12** | Да | Да | Да | Да |
| **Форматирование кода и выравнивание отступов** (`Shift+Alt+F`) | Да | Да | Да | Да |
| **GitLens построчный Blame и история правок** | Да | Да | Да | Да |
| **Просмотр архивов без распаковки** (`.zip` / `KRCDiag`) | Да | Да | Да | Да |
| **SCADA Live Monitor и онлайн-телеметрия контроллера** | [PREVIEW] | **Pro** | **Team** | **Enterprise** |
| **Горячее скачивание бэкапа по Ethernet** | — | **Pro** | **Team** | **Enterprise** |
| **Безопасный авторемонт KRL с защитой отката AST** | — | **Pro** | **Team** | **Enterprise** |
| **Автосинхронизация точек движения в парный .DAT** | — | **Pro** | **Team** | **Enterprise** |
| **Интерактивная блок-схема и граф потока управления** | — | **Pro** | **Team** | **Enterprise** |
| **Пре-релизный аудит безопасности и анализ логики** | — | **Pro** | **Team** | **Enterprise** |
| **Приёмо-сдаточные протоколы ячейки (Markdown/PDF)** | — | **Pro** | **Team** | **Enterprise** |
| **Сравнение бэкапов SmartPAD и дельты координат (\Delta X,Y,Z)** | — | **Pro** | **Team** | **Enterprise** |
| **Монтаж Live ZIP в проект с фоновым автосохранением** | — | **Pro** | **Team** | **Enterprise** |
| **Инспектор топологии WorkVisual (.wvs) и каталогов KOP** | — | **Pro** | **Team** | **Enterprise** |
| **Комплекс KUKA.Sim (.vcmx) и пост-процессор** | — | **Pro** | **Team** | **Enterprise** |
| **Комплекс KUKA.RSI 4 мс реального времени и генератор драйвера** | — | **Pro** | **Team** | **Enterprise** |
| **Импортер CAM ЧПУ G-Code и векторов SVG** | — | **Pro** | **Team** | **Enterprise** |
| **Мастер калибровки машинного зрения Hand-Eye (9 точек)** | — | **Pro** | **Team** | **Enterprise** |
| **Экспорт тегов fieldbus ПЛК (TIA Portal, TwinCAT, EPLAN)** | — | **Pro** | **Team** | **Enterprise** |
| **Декодер бинарных логов `.evt` (2,050+ сообщений KSS)** | — | **Pro** | **Team** | **Enterprise** |
| **Матрица сигналов ввода-вывода и детектор коллизий** | — | **Pro** | **Team** | **Enterprise** |
| **Офлайн-лицензирование для изолированных сетей завода** | — | **Pro (1 ПК)** | **Team (5 ПК)** | **Site (100 ПК)** |
| **Автомобильные стандарты VASS 2.6 / VASS 6 и VW UserTech** | — | **Pro** | **Team** | **Enterprise** |
| **Инструменты языковых моделей Copilot (`krl_safety_check`)** | — | **Pro** | **Team** | **Enterprise** |
| **Мост Model Context Protocol (MCP) (`krl_live_telemetry`)** | — | **Pro** | **Team** | **Enterprise** |
| **Формирование коммерческих предложений и B2B-счетов** | Да | Да | Да | Да |
| **Брендированные PDF-протоколы приёмки оборудования** | — | — | — | **Enterprise** |
| **Индивидуальные правила линтинга предприятия и SLA** | — | — | — | **Enterprise** |

---

## Тарифы и лицензирование

Все коммерческие лицензии оформляются через официального платёжного оператора **Dodo Payments**. Доступны банковские карты, безналичный расчёт по счёту (SEPA / Wire / ACH), Apple Pay и Google Pay в 135+ странах с мгновенным формированием закрывающих налоговых документов (Invoice, VAT Reverse Charge).

| Тариф | Стоимость | Объём лицензии | Назначение | Оформление |
|:---|:---:|:---|:---|:---:|
| **Community** | **$0** | 1 рабочая станция | Базовое редактирование, подсветка синтаксиса, навигация | [Установить бесплатно](https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension) |
| **Engineer Pro (Месяц)** | **$19** / мес | 1 рабочая станция | Командировки, пусконаладочные спринты, аудит чужих программ | [Купить Pro на месяц](https://checkout.dodopayments.com/buy/pdt_0NmAUzwdbzeERSktsOLTp) |
| **Engineer Pro (Год)** | **$149** / год | 1 рабочая станция | Постоянная разработка, офлайн-сертификат на 1 год, все модули | [Купить Pro на год](https://checkout.dodopayments.com/buy/pdt_0NmAV012KFHSjUMyDomJ6) |
| **Pro Пожизненный** | **$699** раз | 1 рабочая станция | Бессрочная лицензия, пожизненные обновления | [Купить Lifetime](https://checkout.dodopayments.com/buy/pdt_0NmAcoqVCfuwQ6Xx7qyqr) |
| **Team Edition** | **$499** / год | B2B — 5 рабочих мест | Все модули Pro • 5 рабочих мест предприятия • KRC2–KRC5 | [Купить Team Edition](https://checkout.dodopayments.com/buy/pdt_0NnLCdgD69GiXDLRJ0K5v) |
| **Department / Integrator** | **$1,499** / год | B2B — До 20 рабочих мест | До 20 рабочих мест для интеграторов и проектных отделов АСУ ТП | [Купить Department](https://checkout.dodopayments.com/buy/pdt_0Nq5QVTrbkJbWAUf8qoyn) |
| **Enterprise Site** | **$4,999** / год | B2B — До 100 рабочих мест | Полный заводской комплекс • 100 рабочих мест • Брендирование и SLA | [Купить Enterprise](https://checkout.dodopayments.com/buy/pdt_0NnLCdkLwd0dECkpSE1JP) |

### Гарантии покупателя (Zero Risk)
* **Прозрачный дескриптор в выписке**: Списания отображаются как **LISKINLABS KUKA** или **KUKA KRL VSCODE**.
* **Управление подпиской в 1 клик прямо в редакторе**: Отмена или смена тарифа в любое время через палитру команд (`Ctrl+Shift+P` → `KUKA KRL: Manage Subscription / Support`).
* **Моментальный возврат средств (100% Refund Guarantee)**: При любом обращении мы оформляем полный возврат средств через чат поддержки в редакторе без споров и задержек.

---

## Корпоративные закупки, безналичный расчёт и автономный режим

Для отделов снабжения и системных интеграторов:
* **Коммерческие предложения и счета (Angebot / Quote)**: Формирование официального коммерческого предложения в PDF прямо из редактора через команду `krl.requestCorporateInvoice` (`Ctrl+Shift+P`).
* **Проверка Tax ID и нулевой НДС (EU VAT Reverse Charge)**: Автоматическая валидация ИНН/VAT в реестрах VIES для применения 0% НДС при международных B2B-сделках.
* **Банковские переводы**: Прямые переводы на расчётный счёт (SEPA EUR, ACH USD, Wire Transfer).
* **Автономные лицензии для закрытых заводов (Air-Gapped Factory Deployment)**: Для режимных предприятий без доступа к интернету формируются криптографически подписанные офлайн-сертификаты со сроком действия 365 дней.

---

## Документация и база знаний

* **Русская документация и база знаний**: [https://liskinlabs.github.io/kuka-krl-extension/ru/](https://liskinlabs.github.io/kuka-krl-extension/ru/)
* **English Documentation**: [https://liskinlabs.github.io/kuka-krl-extension/](https://liskinlabs.github.io/kuka-krl-extension/)
* **Türkçe Dokümantasyon ve Wiki**: [https://liskinlabs.github.io/kuka-krl-extension/tr/](https://liskinlabs.github.io/kuka-krl-extension/tr/)

---

## Правовой статус, безопасность и соответствие стандартам

### Промышленная безопасность (ГОСТ Р ИСО 10218-1/-2, ISO 10218-1/-2, ISO 13849-1)
**KUKA Engineering Toolkit** является независимым инженерным инструментом статического анализа, разработки и сравнения бэкапов, разработанным **Liskin Labs**. Продукт **НЕ является сертифицированным средством безопасности (Non-SIL / Non-PL)** и **не заменяет** обязательные процедуры физической пусконаладки на реальном роботе, проверку траекторий при пониженной скорости (`$OV_PRO <= 30%` в ручном режиме T1 на пульте KUKA SmartPAD), а также официальную оценку рисков согласно стандартам **ISO 10218-1/-2** и **ISO 13849-1**. Всегда выполняйте пробный ручной прогон траекторий в режиме T1 перед включением автоматического цикла.

### Товарные знаки и бренды
* **KUKA®, KRL®, KRC®, WorkVisual®, iiQWorks® и SmartPAD®** являются зарегистрированными товарными знаками **KUKA AG** / **KUKA Deutschland GmbH**.
* **Visual Studio Code® и VS Code®** являются зарегистрированными товарными знаками **Microsoft Corporation**.
* Данное программное обеспечение является независимой разработкой **Liskin Labs** и **не** связано, не спонсируется, не одобряется и не сертифицировано KUKA AG или Microsoft Corporation. Все упомянутые товарные знаки используются исключительно для идентификации совместимости в рамках добросовестного использования (nominative fair use).
