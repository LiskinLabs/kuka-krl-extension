> *Уведомление о товарных знаках: KUKA®, WorkVisual®, iiQWorks®, KUKA.Sim®, SmartPAD® и KRL являются зарегистрированными товарными знаками KUKA Aktiengesellschaft / KUKA Roboter GmbH. KRL Engineering Toolkit является независимым инженерным продуктом Liskin Labs и не связан с компанией KUKA, не одобрен и не спонсируется ею. Автономные проверки дополняют, но не заменяют обязательную проверку безопасности на реальном контроллере.*

<h1 align="center">KRL Engineering Toolkit для роботов KUKA®</h1>

<p align="center">
  <b>Отправляйте проверенный KRL-код в ячейку без простоев и аварий.</b><br />
  Предполетный аудит безопасности, авторемонт 7 классов критических ошибок, diff бэкапов без распаковки, VASS 26 линтер и живая телеметрия KSS 8.x / iiQKA.OS прямо в VS Code, Cursor и Windsurf.<br />
  Создан для <b>KRC2, KRC4 и KRC5</b> (<code>KSS 5.x–8.7</code> · <code>iiQKA.OS 9.x</code> · <code>VKRC / VASS 26</code>) · <b>100% локально в RAM · Без отправки кода в облако</b>
</p>

<p align="center">
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.md">English</a> ·
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.ru.md"><b>Русский</b></a> ·
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.de.md">Deutsch</a> ·
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.tr.md">Türkçe</a> ·
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.es.md">Español</a> ·
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.it.md">Italiano</a>
</p>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension"><img src="https://img.shields.io/visual-studio-marketplace/v/LiskinLabs.kuka-krl-extension?style=flat-square&label=VS%20Code%20Marketplace&color=FF6600" alt="VS Code Marketplace" /></a>
  <a href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension"><img src="https://img.shields.io/visual-studio-marketplace/i/LiskinLabs.kuka-krl-extension?style=flat-square&label=Installs&color=2563EB" alt="Установки" /></a>
  <a href="https://open-vsx.org/extension/LiskinLabs/kuka-krl-extension"><img src="https://img.shields.io/open-vsx/v/LiskinLabs/kuka-krl-extension?style=flat-square&logo=eclipseche&logoColor=white&color=007ACC&label=Open%20VSX" alt="Open VSX" /></a>
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/releases"><img src="https://img.shields.io/badge/Release-v1.9.25-FF6600?style=flat-square&logo=visualstudiocode&logoColor=white" alt="Release v1.9.25" /></a>
  <a href="https://secure.software/vscode/packages/liskinlabs/kuka-krl-extension"><img src="https://img.shields.io/badge/Spectra%20Assure-PASSED%20(0%20CVE)-10b981?style=flat-square&logo=shield&logoColor=white" alt="ReversingLabs Security Score" /></a>
  <a href="https://liskinlabs.github.io/kuka-krl-extension/"><img src="https://img.shields.io/badge/Fleet%20Audited-4.13M%2B%20LoC-10b981?style=flat-square" alt="Проверено 4.13M+ строк" /></a>
  <a href="https://liskinlabs.github.io/kuka-krl-extension/guide/pro-features"><img src="https://img.shields.io/badge/Commands-126%20(63%20Free%20%7C%2063%20Pro)-0EA5E9?style=flat-square" alt="126 команд" /></a>
</p>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension"><b>Установить из Marketplace</b></a> ·
  <a href="https://open-vsx.org/extension/LiskinLabs/kuka-krl-extension"><b>Установить из Open VSX</b></a> ·
  <a href="https://checkout.dodopayments.com/buy/pdt_0NmAV012KFHSjUMyDomJ6?redirect_url=https%3A%2F%2Fkuka-krl-support-gateway.redminotpro5.workers.dev%2Fcheckout%2Fsuccess%3Flang%3Dru&singlePage=true&showDiscounts=true&discountCode=LAUNCH30"><b>Купить Pro на год (-30% LAUNCH30)</b></a> ·
  <a href="https://liskinlabs.github.io/kuka-krl-extension/"><b>Документация</b></a> ·
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/blob/main/SUPPORT.md"><b>Поддержка и Air-Gap</b></a>
</p>

> **Попробуйте все 63 Pro-инструмента бесплатно 14 дней — банковская карта не нужна:** нажмите `Ctrl+Shift+P` в VS Code и выполните **`KRL: Start 14-Day Free Trial`** (`krl.startTrial`), или сравните тарифы через **`KRL: View Pro Plans & Pricing`** (`krl.openPricingPlans`).

<p align="center">
  <img src="https://raw.githubusercontent.com/LiskinLabs/kuka-krl-extension/main/docs/public/media/kuka_control_center.gif" width="780" alt="Панель управления KRL Engineering Toolkit и живая телеметрия контроллера" />
</p>

---

## Почему инженеры-пусконаладчики отказываются от обычных текстовых редакторов

Один остановленный конвейер при запуске линии стоит от **USD 10,000+ в час**. **Всего один сэкономленный час пусконаладки окупает годовую лицензию Engineer Pro.**

| Проблема на робототехнической ячейке | Что пропускает обычный редактор | Как это останавливает KRL Engineering Toolkit |
|---|---|---|
| **Сбой прерывания (`KSS 1422`)** | Команда `RESUME` без предварительного `BRAKE` | Статический анализатор находит ошибку заранее, а `Ctrl+.` вставляет **`BRAKE` перед `RESUME`** с diff-предпросмотром |
| **Срыв предпросмотра (Advance Run)** | Выходы `$OUT` или ожидания внутри сглаженных движений | **Advance Run Guard** подсвечивает проблемную строку и подсказывает `TRIGGER WHEN DISTANCE=...` |
| **Смещение точек за ночную смену** | Операторы правят `E6POS` на SmartPAD без учета версий | **Zero-Unpack Backup Diff** считает 6D-дельты (`ΔX, ΔY, ΔZ, A, B, C`) за `< 80 мс` и подсвечивает сдвиги `±1.0 мм` |
| **Рассинхрон `;FOLD` и `.dat`** | Ручные правки KRL не совпадают с XML `;Params` или `FDAT` | **3-сторонний контроль целостности** выравнивает `;FOLD`, код, `PDAT`/`LDAT` и файл `.dat` |
| **Скрытый UTF-8 BOM и типографика** | Невидимый `\xEF\xBB\xBF` или длинные тире ломают компиляцию на KSS | **Авторемонт в 1 клик** удаляет не-ASCII символы и чинит вложенность `;FOLD`/`ENDFOLD` до загрузки на робота |
| **Долгий запуск тяжелых систем** | Запуск громоздкого ПО ради одной проверки сигналов или `.wvs` | **Чистый Node.js мост** читает топологию `.wvs` и телеметрию KSS 8.x (`49002`) / iiQKA (`443`) без сторонних DLL |

---

## Промышленная база и проверенные метрики

- **Проверено на 4.13M+ строк реального кода**: прогнано на `108` реальных промышленных бэкапах KUKA (`4,136,829` строк) за `25.4 с`.
- **Полная база знаний KSS**: `957` системных переменных, `116` функций, `111` структур, `112` перечислений, `183` кинематических профиля роботов KUKA и **`126` команд IDE (`63` Free + `63` Pro)**.
- **Боевая валидация на контроллерах**: протестировано в реальном времени на `KSS 8.6.2 (OfficeLite)`, `KSS 8.7 (KR C5)`, `iiQKA 9.2.3 (VRC)` и `iiQKA 9.3.4 (KR C5)`.
- **Безопасность цепочки поставок и OT-сетей**: **ReversingLabs Spectra Assure PASSED (0 CVE)** · `100%` локальная обработка в RAM · ноль отправок исходного кода · офлайн-лицензии **Air-Gap Ed25519 `.lic`**.

---

## Основные инженерные модули

### 1. Живая телеметрия контроллера, сообщения SmartPAD и Compile Gate `[PRO]`
Прямое подключение по промышленному Ethernet — **WorkVisual, KUKA.Sim, Python и сторонние DLL не требуются**:
- **Нативный WCF OnlineServices для KSS 8.x (`49002`) и KUKAVARPROXY/C3Bridge (`7000`)**: транспорт полностью на TypeScript/Node.js без внешних рантаймов.
- **gRPC-мост iiQKA.OS (`KRC5` / `9.x`, порт `443`) и Compile Gate**: читает активные фреймы `$TOOL`/`$BASE`, блокировки безопасности, моменты/токи/температуры по осям, программные ограничители, PGNO-флаги, пакеты KOP и запускает компиляцию на контроллере (`SynchronizeMirror -> AnalyzeAllKrlFiles -> GetModuleInfos`).
- **Монитор сигналов I/O и журнал SmartPAD**: встроенные подсказки имен сигналов рядом с `$IN[1..4096]`, `$OUT[1..4096]`, `$FLAG[z]`, горячие бэкапы `.zip` / `.ibz` и окно истории SmartPAD на 200 записей (`krl.live.openMessages`).

<p align="center">
  <img src="https://raw.githubusercontent.com/LiskinLabs/kuka-krl-extension/main/docs/public/media/krl_io_signals.gif" width="760" alt="Инспектор сигналов ввода-вывода и встроенные подсказки" />
</p>

### 2. Предполетный аудит безопасности, авторемонт 7 угроз и VASS 26 / VKRC `[PRO]`
Ловите ошибки кинематики, стандартов OEM и миграции KSS до переноса программы на пульт:
- **Детерминированный авторемонт 7 классов сбоев (`krl.fixAllSafeIssuesInFile`)**: чистит BOM/не-ASCII, вставляет `BRAKE` перед `RESUME`, добавляет `BAS(#TOOL)` после `$LOAD`, синхронизирует `;FOLD`/`ENDFOLD`, исправляет бесконечный цикл `FOR STEP 0`, убирает дубли `C_DIS`/`C_PTP` и выравнивает XML `;Params` через безопасный Monaco Diff с откатом по AST-хэшу. Плюс глобальная очистка мертвого кода (`krl.cleanupUnusedVariables`).
- **Контроль кинематики для 183 моделей KUKA**: обнаруживает сингулярности запястья/плеча, коллинеарные точки `CIRCLE`, перекрытие `$APO.CDIS`, сбои `Status`/`Turn` и выход за рабочую зону.
- **Миграция версий `KSS 8.3 – 9.3` (`krl.convertToIiqkaFold`)**: точные профили `PDAT`/`LDAT` (`SVEL_CP2`/`SACC_CP2`, `MotionParamSets.dat`) и проверка согласованности `;FOLD`/`;Params`.
- **Линтер Volkswagen VASS 26 / VKRC**: автономная проверка `Folge`, `UP`, `MakroSps`, `VW_USER` (`101..501`), защитных блокировок и допусков `Genau`.

<p align="center">
  <img src="https://raw.githubusercontent.com/LiskinLabs/kuka-krl-extension/main/docs/public/media/type-validation-demo.gif" width="760" alt="Статическая проверка безопасности и типов KRL" />
</p>

### 3. Сравнение бэкапов без распаковки, `.wvs` топология, `.vcmx` и декодер `.evt` `[PRO]`
Работайте прямо внутри архивов, не засоряя ноутбук временными папками:
- **Монтирование `.zip`, `.ibz`, `KRCDiag` и `.wvs`**: открывайте архивы как проекты VS Code (`< 80 мс` на сохранение в RAM) и расшифровывайте бинарные логи Windows EVTX `.evt` на 6 языках без интернета.
- **6D-сравнение точек и пакетные трансформации**: сопоставляйте смены и версии ячеек (`ΔX, ΔY, ΔZ, A, B, C`), сдвигайте или зеркальте траектории `E6POS` в нужных фреймах Tool/Base с предпросмотром diff.
- **Инспектор полевых шин `.wvs` (`krl.inspectFieldbusTopology`)**: извлекает KOP-пакеты, топологию EtherCAT/PROFINET и экспортирует таблицы сигналов напрямую в **Siemens TIA Portal**, **Beckhoff TwinCAT 3** и **EPLAN**.
- **Валидатор `.vcmx` и протоколы ISO**: отлавливает 4 типа взаимоблокировок симуляции (`VCMX001–VCMX004` via `krl.inspectWorkcellLayout`, `krl.validateWorkcellSimulation`) и формирует **акты приемки ISO 10218-1/-2**.

<p align="center">
  <img src="https://raw.githubusercontent.com/LiskinLabs/kuka-krl-extension/main/docs/public/media/krc_backup_diff.gif" width="760" alt="Сравнение бэкапов SmartPAD и дельта координат" />
</p>

### 4. Интерактивные блок-схемы, KUKA.RSI 4ms, CAM G-Code и MCP-мост для ИИ `[PRO]`
- **Двунаправленная SVG блок-схема (`krl.showFlowchart`)**: клик по любому блоку `IF`, `SWITCH`, `LOOP`, `FOR` или подпрограмме переводит курсор на нужную строку `.src`; экспорт в векторный SVG для документации заказчику.
- **KUKA.RobotSensorInterface 4ms (`krl.validateRsiXml`, `krl.generateRsiCode`)**: валидация XML-сокетов и генерация циклов реального времени `#IPO_FAST` (`250 Гц`) для `#POSCORR` и `#AXISCORR`.
- **Импортер CNC G-Code / SVG (`krl.importGcodeToKrl`) и калибровка 9 поз (`krl.generateVisionCalibration`)**: преобразование траекторий `G0`–`G3` и SVG в KRL и расчет Hand-Eye матрицы камеры.
- **Локальный MCP ИИ-шлюз (`127.0.0.1`)**: инструменты `krl_live_telemetry`, `krl_workspace_diagnostics`, `krl_safe_auto_repair` и `krl_system_variable_spec` для Cursor, Claude Code и Windsurf без облачных запросов.

<p align="center">
  <img src="https://raw.githubusercontent.com/LiskinLabs/kuka-krl-extension/main/docs/public/media/control_flow_graph.gif" width="760" alt="Генератор интерактивных блок-схем KUKA KRL" />
</p>

### 5. Быстрый Language Server для KRL — бесплатно навсегда для каждого инженера `[FREE CORE]`
Даже без покупки Pro вы получаете полноценную IDE для KRL без ограничения на число строк (`63` бесплатных инструмента):
- Мгновенный переход `F12` между `.src` и `.dat`, поиск всех ссылок, переименование символов, структура документа и иерархия вызовов.
- Контекстное автодополнение и справка для **`957` системных переменных**, **`116` функций**, **`111` структур** и **`112` перечислений**, плюс встроенные подсказки I/O.
- Автоматическое сворачивание `;FOLD` / `;ENDFOLD`, сортировка деклараций, балансировщик блоков, форматтер и **6 промышленных цветовых тем** (включая цеховые темные и OLED-режимы).

<p align="center">
  <img src="https://raw.githubusercontent.com/LiskinLabs/kuka-krl-extension/main/docs/public/media/smart_autocomplete.gif" width="760" alt="Умное автодополнение KRL и документация системных переменных" />
</p>

---

## Редакции, лицензия и прозрачные цены

**Community Edition:** бесплатна навсегда для личного обучения, преподавания и некоммерческих исследований ([LICENSE.txt](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/LICENSE.txt)). Для коммерческой оценки Pro-модулей предусмотрен **14-дневный бесплатный триал** (`krl.startTrial`); постоянная коммерческая работа требует лицензии Pro, Team, Department или Enterprise.

| Возможность | Community (Бесплатно) | Pro / Team / Department / Enterprise |
|---|---|---|
| Подсветка KRL, 6 тем, автодополнение (`957` переменных, `116` функций) | Безлимитно | Безлимитно |
| Навигация `F12`, поиск ссылок, форматирование и сортировка деклараций | Включено | Включено |
| Диагностика синтаксиса, баланс блоков, базовые фреймы и сниппеты | Включено | Включено |
| Аудит Advance Run Guard, `S/T` кинематики и зоны досягаемости (183 робота) | 14-дневный Pro триал | Полный доступ |
| Авторемонт 7 угроз, линтер VASS 26 / `VW_USER` (`101..501`) и целостность `;FOLD`/`.dat` | 14-дневный Pro триал | Полный доступ |
| Живая телеметрия KSS 8.x WCF (`49002`) и iiQKA.OS gRPC (`443`) + Compile Gate | 14-дневный Pro триал | Полный доступ |
| Diff бэкапов `.zip`/`.wvs`/`.vcmx`/`.evt`, блок-схемы, RSI, CAM и локальный MCP | 14-дневный Pro триал | Полный доступ |
| Офлайн-активация Air-Gap Ed25519 `.lic` и корпоративный B2B-инвойс | — | Включено |

> **Стартовая скидка 30% (`LAUNCH30`):** промокод **`LAUNCH30`** дает **скидку 30%** (уже применен в ссылках ниже). Оплата через **Dodo Payments** (Merchant of Record): международные карты, банковские переводы, автоматические счета и **0% EU VIES Reverse Charge**.

| Тариф | Стандартная цена | Цена по `LAUNCH30` (-30%) | Лимит и срок | Оптимально для | Оформление |
|---|---|---|---|---|---|
| **Community** | USD 0 | USD 0 | Обучение · +14 дн. Pro триал | Учебы и личных проектов | [Установить бесплатно](https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension) |
| **Pro Monthly** | USD 19 / мес | **USD 13.30 / мес** | 1 ПК · Отмена в любой момент | Разовые командировки | [Купить на месяц](https://checkout.dodopayments.com/buy/pdt_0NmAUzwdbzeERSktsOLTp?redirect_url=https%3A%2F%2Fkuka-krl-support-gateway.redminotpro5.workers.dev%2Fcheckout%2Fsuccess%3Flang%3Dru&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Pro Annual** *(Хит)* | USD 149 / год | **USD 104.30 / год** | 1 ПК · 1 год обновлений | Инженеров-робототехников | [Купить на год (-30%)](https://checkout.dodopayments.com/buy/pdt_0NmAV012KFHSjUMyDomJ6?redirect_url=https%3A%2F%2Fkuka-krl-support-gateway.redminotpro5.workers.dev%2Fcheckout%2Fsuccess%3Flang%3Dru&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Pro Lifetime** | USD 699 навсегда | **USD 489.30 навсегда** | 1 ПК · Бессрочно | Независимых интеграторов | [Купить бессрочно](https://checkout.dodopayments.com/buy/pdt_0NmAcoqVCfuwQ6Xx7qyqr?redirect_url=https%3A%2F%2Fkuka-krl-support-gateway.redminotpro5.workers.dev%2Fcheckout%2Fsuccess%3Flang%3Dru&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Team Edition** | USD 499 / год | **USD 349.30 / год** | **5 ПК** · Единый счет | Инженерных групп | [Купить Team (5 мест)](https://checkout.dodopayments.com/buy/pdt_0NnLCdgD69GiXDLRJ0K5v?redirect_url=https%3A%2F%2Fkuka-krl-support-gateway.redminotpro5.workers.dev%2Fcheckout%2Fsuccess%3Flang%3Dru&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Department / Integrator** | USD 1,499 / год | **USD 1,049.30 / год** | **20 ПК** · Air-Gap режим | Системных интеграторов | [Купить Department (20 мест)](https://checkout.dodopayments.com/buy/pdt_0Nq5QVTrbkJbWAUf8qoyn?redirect_url=https%3A%2F%2Fkuka-krl-support-gateway.redminotpro5.workers.dev%2Fcheckout%2Fsuccess%3Flang%3Dru&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Enterprise Plant** | USD 4,999 / год | По запросу (PO) | **100 ПК** · Приоритетная поддержка | Заводов и OEM-концернов | [Запросить счет B2B](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/SUPPORT.md#2-14-day-free-trial-upgrades--billing-dodo-payments-mor) |

Уже есть ключ? **[Онлайн-активация](https://kuka-krl-support-gateway.redminotpro5.workers.dev/activate)** · **[Создать Air-Gap файл `.lic`](https://kuka-krl-support-gateway.redminotpro5.workers.dev/airgap)** · **[Кабинет клиента и счета](https://customer.dodopayments.com/login/bus_0NlrxPhrg9eHzPZKAgsF1)**

---

## Быстрый старт за 30 секунд и работа в закрытом контуре (Air-Gap)

```bash
code --install-extension LiskinLabs.kuka-krl-extension
```

1. **Откройте папку с проектом KRL или архив** (`.src`, `.dat`, `.sub`, `.zip`, `.ibz`, `.wvs`, `.vcmx`, `.evt`).
2. Нажмите `Ctrl+Shift+P` → **`KRL: Start 14-Day Free Trial`** (`krl.startTrial`) для мгновенной разблокировки всех `63` Pro-инструментов, или откройте **`KRL: Open Control Center`** (`krl.openControlCenter`).
3. **Аудируйте код автономно или подключайтесь к контроллеру** (`49002` KSS 8.x WCF, `7000` KVP или `443` iiQKA.OS gRPC).

- **100% в локальной памяти**: код, бэкапы и логи EVTX не покидают ваш ноутбук ([PRIVACY.md](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/PRIVACY.md)).
- **Офлайн-кэш для платных ключей (30 дней + 14 дней запаса)**: активированные коммерческие рабочие места работают в цехах без интернета (бесплатный Pro-триал длится **14 дней**).
- **Полный Air-Gap `.lic`**: выгрузите ID оборудования через `krl.exportHardwareIdFile`, получите подписанный Ed25519-файл на [портале Air-Gap](https://kuka-krl-support-gateway.redminotpro5.workers.dev/airgap) и импортируйте командой `krl.importOfflineLicenseFile`.

---

## Что нового в v1.9.24

- **Фикс `CrossMeld 1419/1516`, поддержка `.ibz` и стойкая лицензия (`v1.9.24`)**: устранён спам уведомлений SmartPAD при онлайн-подключении без активной программы/базы, добавлена нативная поддержка расширений `.ibz`/`.IBZ`, усилена криптопроверка лицензий + добавлено зеркало `v4` против слета при обновлениях и смене USB/VPN-адаптеров, а документация приведена к 14-дневному триалу.
- **Open VSX Single-Line Fix (`v1.9.20 – v1.9.23`)**: единый однострочный бандл со встроенным маркером подавления ложных срабатываний сканера секретов Open VSX.
- **Триал в IDE и B2B-оплата (`v1.9.18 – v1.9.19`)**: `krl.openPricingPlans`, 14-дневный триал `krl.startTrial`, `LAUNCH30` (`-30%`) и нативный WCF/iiQKA.OS клиент.
- **Полная история версий**: [CHANGELOG.md](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/CHANGELOG.md).

---

## Безопасность (ISO 10218-1/-2 и ISO 13849-1) и правовая информация

**KRL Engineering Toolkit** — независимый инструмент разработки и статической диагностики от **Liskin Labs**. Продукт **НЕ является сертифицированным ПО безопасности (Non-SIL / Non-PL)** и не заменяет физическую отладку в ручном режиме (`$OV_PRO <= 30%` в `T1` на SmartPAD) и оценку рисков по **ISO 10218-1/-2** и **ISO 13849-1**.
