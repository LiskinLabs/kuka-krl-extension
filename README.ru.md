> *Уведомление о товарных знаках: KUKA®, WorkVisual®, iiQWorks®, KUKA.Sim®, SmartPAD® и KRL являются зарегистрированными товарными знаками KUKA Aktiengesellschaft / KUKA Roboter GmbH. KRL Engineering Toolkit — независимая разработка Liskin Labs и не аффилирована с компанией KUKA. Офлайн-проверки дополняют, но не заменяют обязательную проверку безопасности на реальном контроллере.*

<h1 align="center">KRL Engineering Toolkit для VS Code</h1>

<p align="center">
  <b>Промышленная KRL IDE, статический анализатор безопасности, сравнение бэкапов и live-мост к контроллерам KUKA.</b><br />
  Поддержка <b>KRC2, KRC4 и KRC5</b> (<code>KSS 5.x – 8.7</code> и <code>KSS 9.x / iiQWorks / iiQKA.OS</code>) · <b>100% Offline-First · Без отправки кода в облако</b>
</p>

<p align="center">
  [English](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.md) · [Русский](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.ru.md) · [Deutsch](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.de.md) · [Türkçe](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.tr.md) · [Español](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.es.md) · [Italiano](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.it.md)
</p>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension"><img src="https://img.shields.io/visual-studio-marketplace/v/LiskinLabs.kuka-krl-extension?style=flat-square&label=VS%20Code%20Marketplace&color=FF6600" alt="VS Code Marketplace" /></a>
  <a href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension"><img src="https://img.shields.io/visual-studio-marketplace/i/LiskinLabs.kuka-krl-extension?style=flat-square&label=Installs&color=2563EB" alt="Installs" /></a>
  <a href="https://open-vsx.org/extension/LiskinLabs/kuka-krl-extension"><img src="https://img.shields.io/open-vsx/v/LiskinLabs/kuka-krl-extension?style=flat-square&logo=eclipseche&logoColor=white&color=007ACC&label=Open%20VSX" alt="Open VSX" /></a>
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/releases"><img src="https://img.shields.io/badge/Release-v1.9.18-FF6600?style=flat-square&logo=visualstudiocode&logoColor=white" alt="Release v1.9.18" /></a>
  <a href="https://secure.software/vscode/packages/liskinlabs/kuka-krl-extension"><img src="https://img.shields.io/badge/Spectra%20Assure-PASSED%20(100%25)-10b981?style=flat-square&logo=shield&logoColor=white" alt="ReversingLabs Security Score" /></a>
  <a href="https://liskinlabs.github.io/kuka-krl-extension/"><img src="https://img.shields.io/badge/Команды-126-FF6600?style=flat-square" alt="126 Commands" /></a>
  <a href="https://liskinlabs.github.io/kuka-krl-extension/guide/pro-features"><img src="https://img.shields.io/badge/Pro%20Инструменты-63-0EA5E9?style=flat-square" alt="63 Pro Tools" /></a>
</p>

<p align="center">
  <a href="https://liskinlabs.github.io/kuka-krl-extension/ru/guide/installation"><b>Установка и быстрый старт</b></a> ·
  <a href="https://liskinlabs.github.io/kuka-krl-extension/ru/"><b>Документация и 64 гайда</b></a> ·
  <a href="https://checkout.dodopayments.com/buy/pdt_0NmAV012KFHSjUMyDomJ6?redirect_url=https%3A%2F%2Fkuka-krl-support-gateway.redminotpro5.workers.dev%2Fcheckout%2Fsuccess%3Flang%3Dru&singlePage=true&showDiscounts=true&discountCode=LAUNCH30"><b>Купить Pro Annual (-30%: LAUNCH30)</b></a> ·
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/blob/main/SUPPORT.md"><b>Поддержка и Air-Gap активация</b></a>
</p>

> **14 дней Pro бесплатно — без банковской карты:** откройте палитру команд в VS Code (`Ctrl+Shift+P`) и запустите **`KRL: Start 14-Day Free Trial`** (`krl.startTrial`) или **`KRL: Просмотр тарифов Pro`** (`krl.openPricingPlans`).

<p align="center">
  <img src="https://raw.githubusercontent.com/LiskinLabs/kuka-krl-extension/main/docs/public/media/kuka_control_center.gif" width="760" alt="KUKA Control Center и панель live-телеметрии" />
</p>

---

## Находите ошибки до загрузки программы на робот

Каждый час простоя линии стоит от **10 000 USD**: пропущенный `$TOOL` или `$BASE`, случайный Advance Run stop (`$OUT` в движении без `TRIGGER`), отсутствие `BRAKE` перед `RESUME` (`KSS 1422`) или рассинхрон `;FOLD` и `.dat`.

**KRL Engineering Toolkit** объединяет **126 инженерных команд**, **957 системных переменных KSS**, **базу кинематики 183 моделей роботов KUKA**, аудит **VASS 26 / VKRC** и **прямой мониторинг контроллера** прямо в VS Code, Cursor, Windsurf и Open VSX.

| Возможности из коробки | Community (Бесплатно) | Pro / Team / Enterprise |
|---|---|---|
| Подсветка KRL, 6 цеховых тем, автодополнение (`957` системных переменных, `116` функций) | Без лимита строк | Без лимита строк |
| Переход `F12` между `.src` и `.dat`, поиск ссылок, форматирование, FOLD/ENDFOLD, сортировка | Включено | Включено |
| Диагностика синтаксиса, баланса блоков, базовые проверки фреймов и сниппеты KRL | Включено | Включено |
| Аудит безопасности перед загрузкой: Advance Run Guard, `S/T`, зона досягаемости 183 роботов | Триал / тест 30 дн. | Коммерческая работа |
| Автомотив-линтер VASS 26 / `VW_USER` (`101..501`) и 3-сторонний контроль `FOLD` vs `.dat` | — | Полный доступ |
| Живая телеметрия KSS 8.x WCF (порт `49002`) и iiQKA.OS, сообщения SmartPAD, Compile Gate | — | Полный доступ |
| Монтирование `.zip`/`.wvs` без распаковки, дельта точек (`ΔX/Y/Z`), 6D сдвиг/зеркало, декодер `.evt` | — | Полный доступ |

---

## Ключевые инженерные модули

### 1. Прямой мост к контроллерам и сообщения SmartPAD (`KSS 8.x` и `iiQKA.OS 9.x`)
Подключайтесь к контроллерам KUKA напрямую с инженерного ноутбука без тяжелых пакетов и сторонних DLL:
- **Нативный WCF-клиент KSS 8.x**: работает в чистом Node.js по порту `49002` — без WorkVisual, KUKA.Sim или Python.
- **Телеметрия `iiQKA.OS` (`KRC5` / `9.x`) и Compile Gate**: отображает `$TOOL`/`$BASE`, моменты/токи/температуры осей, PGNO, установленные KOP-пакеты и историю SmartPAD (`krl.live.openMessages`).
- **Инлайн-подсказки сигналов I/O**: подставляет реальные имена сигналов рядом с `$IN[x]`, `$OUT[y]` и `$FLAG[z]` прямо в коде.

<p align="center">
  <img src="https://raw.githubusercontent.com/LiskinLabs/kuka-krl-extension/main/docs/public/media/krl_io_signals.gif" width="760" alt="Инспектор сигналов ввода-вывода и инлайн-подсказки" />
</p>

### 2. Предпусковой анализ безопасности, кинематики и VASS 26 / VKRC
Ловите критические сбои статическим анализом до переноса файлов на пульт оператора:
- **Контроль кинематики и сингулярностей**: предупреждения по сингулярности запястья/плеча, коллинеарным дугам `CIRC`, `$APO.CDIS > 50%`, битовым маскам `Status/Turn` и вылету за рабочий радиус (183 модели роботов).
- **3-Way Motion Integrity**: выявляет скрытые расхождения скорости `VB`, инструмента и базы между комментарием `;FOLD` и структурами `.dat`.
- **Пакет VASS 26 / VKRC**: полный аудит `Folge`, `UP`, `MakroSps`, `VW_USER` (`101..501`), защитных блокировок и допусков `Genau`.
- **Блок-схемы программ (Flowchart)**: интерактивные SVG-графы переходов, циклов и вызовов подпрограмм.

<p align="center">
  <img src="https://raw.githubusercontent.com/LiskinLabs/kuka-krl-extension/main/docs/public/media/type-validation-demo.gif" width="760" alt="Статическая проверка типов и правил безопасности KRL" />
</p>

### 3. Сравнение бэкапов SmartPAD, 6D-трансформации и бинарные логи `.evt`
Анализируйте архивы ячейки в цеху без создания тысяч временных файлов на диске:
- **Монтирование `.zip` и `.wvs` как виртуального проекта**: мгновенный просмотр архивов, декодирование бинарных журналов `.evt` (EVTX) на 6 языках и генерация протоколов приемки ISO 10218-1.
- **Инспектор дельт точек**: находит точные смещения координат (`ΔX, ΔY, ΔZ, A, B, C`) между сменами или архивами контроллера.
- **Пакетный сдвиг и зеркалирование траекторий**: пересчет координат и масок Turn с просмотром diff до записи и откатом по AST/CRC32.

<p align="center">
  <img src="https://raw.githubusercontent.com/LiskinLabs/kuka-krl-extension/main/docs/public/media/krc_backup_diff.gif" width="760" alt="Сравнение архивов SmartPAD и анализ дельты точек" />
</p>

### 4. Базовый языковой сервер KRL (Бесплатная версия Community)
Переход по `F12` между `.src` и `.dat`, автодополнение, форматирование, сворачивание `FOLD`/`ENDFOLD`, сортировка деклараций и проверка синтаксиса доступны **навсегда бесплатно без ограничения числа строк**.

<p align="center">
  <img src="https://raw.githubusercontent.com/LiskinLabs/kuka-krl-extension/main/docs/public/media/smart_autocomplete.gif" width="760" alt="Умное автодополнение KRL и документация системных переменных" />
</p>

---

## Лицензии, EULA и прозрачные тарифы

**Условия Community Edition:** бесплатно для личного обучения, академических/некоммерческих исследований и **30-дневной некоммерческой оценки** (не для серийного производства или сдачи коммерческих проектов — см. [LICENSE.txt](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/LICENSE.txt)). Для постоянной коммерческой и производственной пусконаладки требуется лицензия Pro, Team, Department или Enterprise.

> **Скидка 30% (`LAUNCH30`):** промокод **`LAUNCH30`** автоматически применен в ссылках оплаты ниже. Оплата проходит через **Dodo Payments** (Merchant of Record) с поддержкой международных карт, автоматическим учетом НДС/VAT и выдачей официальных PDF-счетов и квитанций.

| Тариф | Базовая цена | С промокодом `LAUNCH30` (-30%) | Лимит активаций | Для кого | Действие |
|---|---|---|---|---|---|
| **Community** | 0 USD | 0 USD | Личное / ВУЗ / тест 30 дн. | Обучение и некоммерческие задачи | [Установить](https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension) |
| **Pro Monthly** | 19 USD / мес | **13.30 USD / мес** | 1 рабочая станция · Отмена в любой момент | Разовые командировки на объект | [Оформить Monthly](https://checkout.dodopayments.com/buy/pdt_0NmAUzwdbzeERSktsOLTp?redirect_url=https%3A%2F%2Fkuka-krl-support-gateway.redminotpro5.workers.dev%2Fcheckout%2Fsuccess%3Flang%3Dru&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Pro Annual** *(Рекомендуем)* | 149 USD / год | **104.30 USD / год** | 1 рабочая станция · 1 год обновлений | Инженеры-робототехники | [Купить Annual (-30%)](https://checkout.dodopayments.com/buy/pdt_0NmAV012KFHSjUMyDomJ6?redirect_url=https%3A%2F%2Fkuka-krl-support-gateway.redminotpro5.workers.dev%2Fcheckout%2Fsuccess%3Flang%3Dru&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Pro Lifetime** | 699 USD разово | **489.30 USD разово** | 1 рабочая станция · Бессрочно | Независимые наладчики | [Купить Lifetime](https://checkout.dodopayments.com/buy/pdt_0NmAcoqVCfuwQ6Xx7qyqr?redirect_url=https%3A%2F%2Fkuka-krl-support-gateway.redminotpro5.workers.dev%2Fcheckout%2Fsuccess%3Flang%3Dru&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Team Edition** | 499 USD / год | **349.30 USD / год** | **5 рабочих станций** · Единый счет | Инженерные бригады и отделы | [Купить Team (5 мест)](https://checkout.dodopayments.com/buy/pdt_0NnLCdgD69GiXDLRJ0K5v?redirect_url=https%3A%2F%2Fkuka-krl-support-gateway.redminotpro5.workers.dev%2Fcheckout%2Fsuccess%3Flang%3Dru&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Department / Integrator** | 1,499 USD / год | **1,049.30 USD / год** | **20 рабочих станций** · Air-Gap | Системные интеграторы | [Купить Integrator (20 мест)](https://checkout.dodopayments.com/buy/pdt_0Nq5QVTrbkJbWAUf8qoyn?redirect_url=https%3A%2F%2Fkuka-krl-support-gateway.redminotpro5.workers.dev%2Fcheckout%2Fsuccess%3Flang%3Dru&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Enterprise Plant** | 4,999 USD / год | Индивидуальный PO-инвойс | **100 рабочих станций** · Приоритетная связь | Заводы и OEM-производители | [Запросить корпоративный счет](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/SUPPORT.md#2-14-day-free-trial-upgrades--billing-dodo-payments-mor) |

Уже есть ключ? **[Активировать онлайн](https://kuka-krl-support-gateway.redminotpro5.workers.dev/activate?lang=ru)** · **[Портал Air-Gap `.lic`](https://kuka-krl-support-gateway.redminotpro5.workers.dev/airgap)** · **[Личный кабинет и PDF-инвойсы](https://customer.dodopayments.com/login/bus_0NlrxPhrg9eHzPZKAgsF1)**

---

## Автономная работа в закрытых цеховых сетях

- **100% локальная обработка**: исходники `.src`, `.dat`, `.sub`, бэкапы и логи не покидают ОЗУ вашего ПК ([PRIVACY.md](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/PRIVACY.md)).
- **Офлайн-кэш 30 дней + 14 дней Grace Period**: после проверки лицензия продолжает работать без интернета в цеху.
- **Полный Air-Gap**: генерация подписанных ключом Ed25519 файлов `.lic` на [портале Air-Gap](https://kuka-krl-support-gateway.redminotpro5.workers.dev/airgap) и импорт командой `krl.importOfflineLicenseFile`.

---

## Что нового в v1.9.17

- **Нативный WCF-клиент KSS 8.x**: прямая телеметрия по порту `49002` внутри Node.js без WorkVisual, KUKA.Sim, Python или сторонних DLL.
- **Полная телеметрия `iiQKA.OS` и окно сообщений SmartPAD**: фреймы Tool/Base, блокировки безопасности, момент/температура/ток/скорость по осям, PGNO, пакеты KOP и журнал `krl.live.openMessages`.
- **Compile Gate для `iiQKA.OS` и миграция `KSS 8.3 – 9.3`**: точные профили PDAT/LDAT и проверка `FOLD/Params`, протестированные на KSS 8.6.2, KSS 8.7, iiQKA 9.2.3 и iiQKA 9.3.4.
- **Полная история изменений**: [CHANGELOG.md](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/CHANGELOG.md).
