<h1 align="center">KUKA Engineering Toolkit for VS Code</h1>

<p align="center">
  <b>Промышленная среда офлайн-программирования (OLP), SCADA-монитор реального времени, аудит безопасности и мост Model Context Protocol (MCP) для роботов KUKA.</b><br />
  <i>Премиальный инженерный комплекс нового поколения для Visual Studio Code.</i><br />
  Разработано для <b>KRC2, KRC4, KRC5 (KSS 5.x – 8.7+)</b>, <b>iiQKA (KSS 9.x / iiQWorks)</b> и <b>VKRC (VASS 2.6 / VASS 6)</b>.
</p>

<p align="center">
  <a href="README.md">English</a> •
  <a href="README.ru.md"><b>Русский</b></a> •
  <a href="README.tr.md">Türkçe</a> •
  <a href="README.de.md">Deutsch</a> •
  <a href="README.es.md">Español</a> •
  <a href="README.it.md">Italiano</a>
</p>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension"><img src="https://badgen.net/vs-marketplace/v/LiskinLabs.kuka-krl-extension?style=flat&label=VS%20Code%20Marketplace&color=FF6600" alt="VS Code Marketplace" /></a>
  <a href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension"><img src="https://badgen.net/vs-marketplace/rating/LiskinLabs.kuka-krl-extension?style=flat&color=FF6600" alt="Marketplace Rating" /></a>
  <a href="https://open-vsx.org/extension/LiskinLabs/kuka-krl-extension"><img src="https://img.shields.io/open-vsx/v/LiskinLabs/kuka-krl-extension?style=flat-square&logo=eclipseche&logoColor=white&color=007ACC&label=Open%20VSX" alt="Open VSX" /></a>
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/releases"><img src="https://img.shields.io/badge/Release-v1.9.8-FF6600?style=flat-square&logo=visualstudiocode&logoColor=white" alt="Release v1.9.8" /></a>
  <a href="https://secure.software/vscode/packages/liskinlabs/kuka-krl-extension"><img src="https://img.shields.io/badge/Spectra%20Assure-PASSED%20(100%25)-10b981?style=flat-square&logo=shield&logoColor=white" alt="ReversingLabs Security Score" /></a>
  <a href="https://liskinlabs.github.io/kuka-krl-extension/ru/"><img src="https://img.shields.io/badge/Fleet%20Verified-4.2M%2B%20LoC-10b981?style=flat-square" alt="Fleet Verified" /></a>
  <img src="https://img.shields.io/badge/Factory%20OT-Air--Gapped%20Safe-blue?style=flat-square" alt="Air-Gapped Safe" />
  <a href="https://github.com/LiskinLabs/kuka-krl-mcp"><img src="https://img.shields.io/badge/MCP%20Server-Connected-00D68F?style=flat-square" alt="MCP Server Connected" /></a>
</p>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension"><b>Установить из Marketplace</b></a> •
  <a href="https://liskinlabs.github.io/kuka-krl-extension/ru/"><b>Интерактивный 3D-симулятор и сайт</b></a> •
  <a href="https://liskinlabs.github.io/kuka-krl-extension/ru/guide/installation"><b>Документация</b></a> •
  <a href="#тарифы-и-сравнение-редакций"><b>Сравнение тарифов</b></a> •
  <a href="https://kuka-krl-support-gateway.redminotpro5.workers.dev/airgap"><b>Офлайн-шлюз Air-Gap</b></a>
</p>

---

## Промышленная реальность: ноль простоев до загрузки на робота

> [!IMPORTANT]
> **Устраняйте синтаксические ошибки, незакрытые FOLD, дедлоки, дрейф координат и сбросы Advance Run в VS Code ДО отправки кода в реальный контроллер.**

Каждый инженер-робототехник и интегратор на производстве сталкивается с реальной ценой программных дефектов:
* **Аварийный простой линии ($10,000+ в час)**: Неинициализированный фрейм `$TOOL` или `$BASE`, непреднамеренный срыв блендинга или ошибка деления на ноль в `SPS.SUB` останавливают роботизированный комплекс в разгар рабочей смены.
* **Ночной дрейф координат (Touch-Up)**: Операторы корректируют обученные точки на пульте SmartPAD без версионного контроля. Понять, кто и что изменил, вручную по десяткам `.dat` файлов практически невозможно.
* **Медленный цикл отладки**: Передача непроверенного кода на физический контроллер или запуск тяжеловесных виртуальных машин отнимает десятки часов на пусконаладке.

**Liskin Labs KUKA Engineering Toolkit** переносит полноценную среду заводской диагностики, 3D-кинематику и SCADA-телеметрию прямо в ваш редактор.

---

## Ключевые интерактивные модули

<details open>
<summary><b>1. SCADA Live Monitor & Телеметрия контроллера в реальном времени [PRO]</b></summary>
<br>

Прямое Ethernet-подключение к физическим контроллерам KUKA KR C2, KR C4, KR C5 и виртуальным OfficePC по протоколам WCF и KUKAVARPROXY (порт 7000):
* **6-осевая телеметрия шарниров**: Отслеживание `$AXIS_ACT`, динамические шкалы крутящих моментов осей `$TORQMON` и предупреждения о приближении к программным концевикам (`$SOFTP_END`, `$SOFTN_END`).
* **Декартов TCP-трекинг**: Мгновенный вывод координат `$POS_ACT` (X, Y, Z, A, B, C) и номеров активных систем координат Tool/Base.
* **Матрица 4096 дискретных I/O**: Живая сетка состояния `$IN[1..4096]`, `$OUT[1..4096]`, системных флагов `$FLAG` и таймеров `$TIMER`.
* **Субтитры сообщений SmartPAD**: Потоковый перехват активных аварий контроллера с синхронным переводом системных кодов KSS на 6 языков (RU, EN, DE, TR, ES, IT).
* **Горячий бэкап на лету**: Скачивание чистого `.zip`-архива проекта с работающего контроллера без остановки автоматического цикла.

<p align="center">
  <img src="docs/public/media/kuka_control_center.gif" width="760" alt="KUKA SCADA Live Controller Monitor & Telemetry Dashboard" />
</p>
</details>

<details open>
<summary><b>2. Аудит бэкапов SmartPAD и пространственный расчёт дельт точек [PRO]</b></summary>
<br>

Мгновенный сравнительный анализ архивов роботов KUKA (`.zip`, `KRCDiag_*.zip`) прямо в оперативной памяти без распаковки:
* **Расчёт 6-осевых дельт ($\Delta X, \Delta Y, \Delta Z, \Delta A, \Delta B, \Delta C$)**: Выявление скрытых смещений координат точек `E6POS`, выполненных операторами на смене.
* **Цветовая индикация допусков**: Автоматическая подсветка критических отклонений, выходящих за технологический допуск безопасности (±1.0 мм / ±5.0 мм).
* **Двустороннее монтирование .ZIP**: Открытие архива как рабочей папки в VS Code с возможностью редактирования и сохранения файлов напрямую в ZIP менее чем за 80 мс.

<p align="center">
  <img src="docs/public/media/krc_backup_diff.gif" width="760" alt="KUKA SmartPAD Backup Diff & Coordinate Delta Math" />
</p>
</details>

<details>
<summary><b>3. Детерминированный безопасный авторемонт кода и Monaco Diff Review [PRO]</b></summary>
<br>

Автоматическое устранение 7 критических классов производственных рисков в один клик (`Ctrl+.` QuickFix & `krl.fixAllSafeIssuesInFile`):
1. **Устранение скрытых UTF-8 BOM и не-ASCII символов**: Удаление байтового BOM (`\xEF\xBB\xBF`), замена типографских кавычек, тире и умлаутов, предотвращая фатальный сбой компилятора KSS.
2. **Обязательный BRAKE перед RESUME**: Защита от аварийных ударов при выходе из прерываний датчиков и коллизий (устранение аварии KSS01442).
3. **Фиксация динамической нагрузки BAS(#TOOL)**: Автоматическая передача модели массы и инерции в интерполятор после изменения атрибутов `$LOAD` / `LOAD_DATA`.
4. **Выравнивание структуры FOLD / ENDFOLD**: Автоматическая синхронизация повреждённых пользовательских и системных фолдов SmartPAD.
5. **Защита от бесконечного цикла STEP 0**: Замена фатального шага `STEP 0` на безопасный инкремент `STEP 1` в циклах `FOR`.
6. **Нормализация дубликатов аппроксимации**: Очистка случайных дубликатов модификаторов сглаживания (`C_DIS`, `C_PTP`).
7. **Синхронизация метаданных Inline Form**: Защита от затирания логики программиста при Touch-Up на пульте SmartPAD (синхронизация XML `;Params` и кода `$OUT`).

*Для глубокой очистки неиспользуемых переменных и мертвого кода во всем проекте используется отдельный инструмент: **Universal Backup & Unused Variable Purge Engine** (`krl.cleanupUnusedVariables`) с защитой `$config.dat`, фоновых задач `sps.sub` и EthernetKRL.*
*Интерактивный Monaco Diff Editor позволяет оператору пошагово принять (`Ctrl+Enter`) или отклонить правки до записи на диск с защитой AST Rollback Guard.*

<p align="center">
  <img src="docs/public/media/type-validation-demo.gif" width="760" alt="KUKA Pre-Flight Static Analysis & Quality Audit" />
</p>
</details>

<details>
<summary><b>4. Интерактивная векторная блок-схема и Control Flow Graph [PRO]</b></summary>
<br>

Генерация интерактивной блок-схемы алгоритма программы `.src` в реальном времени:
* **Двунаправленная навигация**: Клик по блоку схемы мгновенно перемещает курсор в редакторе к соответствующей строке кода KRL.
* **Визуализация циклов и ветвлений**: Наглядное отображение логики `IF-ELSE`, `SWITCH-CASE`, `LOOP`, `FOR` и вызовов подпрограмм.
* **Экспорт векторной графики**: Сохранение схем в формате SVG для проектной документации и паспортов ячеек.

<p align="center">
  <img src="docs/public/media/control_flow_graph.gif" width="760" alt="KUKA Control Flow Graph & Flowchart Generator" />
</p>
</details>

<details>
<summary><b>5. Комплексы WorkVisual (.wvs) и KUKA.Sim (.vcmx) [PRO]</b></summary>
<br>

* **Инспектор проектов WorkVisual (`krl.inspectWvsTopology`)**: Чтение бинарных проектов `.wvs` в памяти без запуска САПР, извлечение каталогов опций KOP (`EthernetKRL`, `SafeOperation`, `GripperTech`), топологии шин EtherCAT / Profinet и мгновенный экспорт таблицы тегов в **Siemens TIA Portal**, **Beckhoff TwinCAT 3** и **EPLAN**.
* **Аудит 3D-симуляций KUKA.Sim (`krl.inspectVcmxLayout`, `krl.validateVcmxSimulation`)**: Извлечение кинематики и дискретных сигналов из `.vcmx`, выявление 4 фатальных дедлоков симуляции (`VCMX001`–`VCMX004`) и постпроцессинг симуляции в синхронизированные модули KRL `.src` + `.dat`.
</details>

<details>
<summary><b>6. Системы жесткого реального времени RSI (4 мс) и CAM G-Code / SVG [PRO]</b></summary>
<br>

* **KUKA.RobotSensorInterface (`krl.validateRsiXml`, `krl.generateRsiCode`)**: Валидация XML-схем сокетов и генерация модулей драйверов реального времени `#IPO_FAST` (4 мс / 250 Гц) для оптической коррекции шва (`#POSCORR`) и управления осями через ROS 2 (`#AXISCORR`).
* **CAM ЧПУ G-Code и 2D SVG импортер (`krl.importGcodeToKrl`)**: Конвертация траекторий фрезеровки, резки и сварки ISO G-Code (`G0`, `G1`, `G2`, `G3`) и векторных чертежей SVG в траектории робота с автоматической расстановкой безопасных высот.
* **Мастер калибровки Hand-Eye (`krl.generateVisionCalibration`)**: 9-точечная калибровочная пирамида для 3D-камер с автоматическим расчётом углов Эйлера KUKA.
</details>

<details>
<summary><b>7. Встроенный сервер Model Context Protocol (MCP) для ИИ [PRO]</b></summary>
<br>

Локальный шлюз интеграции ИИ (`127.0.0.1`), связывающий современные среды разработки (**Cursor, Google Antigravity, Claude Code, Windsurf**) напрямую с роботом:
* Доступ ИИ к живой телеметрии контроллера (`krl_live_telemetry`).
* Статический аудит кода проекта (`krl_workspace_diagnostics`).
* Детерминированное автоисправление (`krl_safe_auto_repair`).
* База данных типов и пределов 957+ системных переменных KSS (`krl_system_variable_spec`).
</details>

<details>
<summary><b>8. Корпоративная автономная активация Air-Gap по файлам .lic [PRO]</b></summary>
<br>

Полная готовность к работе на закрытых оборонных и автомобильных предприятиях с изолированными OT-сетями без доступа к интернету:
* **Экспорт запроса (`krl.exportHardwareIdFile`)**: Выгрузка цифрового отпечатка оборудования в файл `liskin-hardware-id.lic` для переноса через доверенный USB.
* **Генерация лицензии**: Создание криптографически подписанного файла `liskin-krl-license.lic` на [веб-портале Air-Gap](https://kuka-krl-support-gateway.redminotpro5.workers.dev/airgap).
* **Импорт лицензии (`krl.importOfflineLicenseFile`)**: Мгновенная валидация асимметричной подписи Ed25519 в VS Code со 100% офлайн-работой без фоновых опросов сети.
</details>

---

## Тарифы и сравнение редакций

Мы разделяем базовые функции редактирования для сообщества и профессиональные инженерные комплексы для интеграторов и заводов. Актуальные цены, условия подписок и скидки всегда доступны на нашем [официальном интерактивном портале](https://liskinlabs.github.io/kuka-krl-extension/ru/).

| Возможность / Инструмент | Community (Free) | Engineer Pro (ПК) | Team Edition (5 ПК) | Enterprise Plant (100 ПК) |
|:---|:---:|:---:|:---:|:---:|
| **Подсветка синтаксиса, FOLD/UNFOLD, темы KUKA** | ✓ | ✓ | ✓ | ✓ |
| **Базовая диагностика, автодополнение, Inlay Hints** | ✓ | ✓ | ✓ | ✓ |
| **Форматирование кода и выравнивание присваиваний** | ✓ | ✓ | ✓ | ✓ |
| **SCADA Live Monitor и 4096 I/O телеметрия** | — | ✓ | ✓ | ✓ |
| **Сравнение бэкапов SmartPAD и дельты $\Delta X, Y, Z$** | — | ✓ | ✓ | ✓ |
| **Безопасный авторемонт Safe Auto-Repair & Monaco Diff** | — | ✓ | ✓ | ✓ |
| **Интерактивные векторные блок-схемы (Flowchart)** | — | ✓ | ✓ | ✓ |
| **Point Table сплит-редактор и SVD-калибровка баз** | — | ✓ | ✓ | ✓ |
| **Автосинхронизация точек в companion .DAT** | — | ✓ | ✓ | ✓ |
| **WorkVisual (.wvs) топология и экспорт тегов ПЛК** | — | ✓ | ✓ | ✓ |
| **KUKA.Sim (.vcmx) валидатор дедлоков и постпроцессор** | — | ✓ | ✓ | ✓ |
| **KUKA.RSI (4 мс такт) и CAM ЧПУ G-Code / SVG импортер** | — | ✓ | ✓ | ✓ |
| **Мастер 9-точечной калибровки Hand-Eye** | — | ✓ | ✓ | ✓ |
| **Мост Model Context Protocol (MCP) для ИИ** | — | ✓ | ✓ | ✓ |
| **Автономный Air-Gap режим (обмен файлами .lic)** | — | **1 рабочее место** | **5 рабочих мест** | **100 рабочих мест** |
| **Единый B2B-счёт, акты и нулевой НДС (EU Reverse Charge)** | — | — | ✓ | ✓ |
| **Автоматический KUKA Fleet Backup Hub & SLA** | — | — | — | ✓ |
| **Индивидуальные правила линтинга (VW VASS, Audi, BMW)** | — | — | — | ✓ |

<p align="center">
  <a href="https://liskinlabs.github.io/kuka-krl-extension/ru/#pricing"><b>👉 Посмотреть тарифы, скидки и оформить подписку на сайте</b></a><br />
  <i>Мгновенная доставка лицензионного ключа, оплата картами любых стран и безналичный расчёт для юридических лиц (B2B Wire / SEPA / ACH).</i>
</p>

---

## 3D-Симулятор и документация онлайн

* **Интерактивный портал и 3D-демонстрация**: [https://liskinlabs.github.io/kuka-krl-extension/ru/](https://liskinlabs.github.io/kuka-krl-extension/ru/)
* **Полная база знаний и руководство пользователя**: [https://liskinlabs.github.io/kuka-krl-extension/ru/guide/features](https://liskinlabs.github.io/kuka-krl-extension/ru/guide/features)
* **Портал офлайн-активации Air-Gap**: [https://kuka-krl-support-gateway.redminotpro5.workers.dev/airgap](https://kuka-krl-support-gateway.redminotpro5.workers.dev/airgap)
* **Открытый MCP-сервер на GitHub**: [LiskinLabs/kuka-krl-mcp](https://github.com/LiskinLabs/kuka-krl-mcp)

---

## Правовой статус, безопасность и стандарты

### Промышленная безопасность (ISO 10218-1/-2, ISO 13849-1)
**KUKA Engineering Toolkit** является независимым инженерным инструментом статического анализа, разработки и сравнения бэкапов, разработанным **Liskin Labs**. Продукт **НЕ является сертифицированным средством безопасности (Non-SIL / Non-PL)** и **не заменяет** обязательные процедуры физической пусконаладки на реальном роботе, проверку траекторий при пониженной скорости (`$OV_PRO <= 30%` в ручном режиме T1 на пульте KUKA SmartPAD), а также официальную оценку рисков согласно стандартам **ISO 10218-1/-2** и **ISO 13849-1**. Всегда выполняйте пробный ручной прогон траекторий в режиме T1 перед включением автоматического цикла.

### Товарные знаки и бренды
* **KUKA®, KRL®, KRC®, WorkVisual®, iiQWorks® и SmartPAD®** являются зарегистрированными товарными знаками **KUKA AG** / **KUKA Deutschland GmbH**.
* **Visual Studio Code® и VS Code®** являются зарегистрированными товарными знаками **Microsoft Corporation**.
* Данное программное обеспечение является независимой разработкой **Liskin Labs** и **не** связано, не спонсируется, не одобряется и не сертифицировано KUKA AG или Microsoft Corporation. Все упомянутые товарные знаки используются исключительно для идентификации совместимости в рамках добросовестного использования (nominative fair use).
