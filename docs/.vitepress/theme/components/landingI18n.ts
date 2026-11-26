export type LocaleCode = 'ru' | 'en' | 'de' | 'tr' | 'es' | 'it'

export interface HeroMediaItem {
  id: string
  label: string
  caption: string
  src: string
  alt: string
}

export interface DiffScenario {
  id: string
  tabLabel: string
  issueTitle: string
  consequence: string
  beforeLabel: string
  afterLabel: string
  beforeCode: string
  afterCode: string
}

export interface ComparisonRow {
  feature: string
  plainSyntax: string
  workVisual: string
  krlToolkit: string
}

export interface FeaturedCapability {
  id: string
  title: string
  category: string
  tier: 'Free' | 'Pro'
  description: string
  commandId: string
  mediaSrc: string
  mediaAlt: string
}

export interface PricingTier {
  id: string
  name: string
  badge?: string
  seatsLabel: string
  priceUsd?: number
  monthlyUsd?: number
  periodYear: string
  periodMonth?: string
  freeLabel?: string
  description: string
  features: string[]
  ctaLabel: string
  productIdAnnual?: string
  productIdMonthly?: string
  isPrimary?: boolean
  isCommunity?: boolean
  isEnterprise?: boolean
}

export interface LandingLocaleData {
  code: LocaleCode
  label: string
  skipToContent: string
  header: {
    brandSubtitle: string
    navAriaLabel: string
    navItems: {
      workflows: string
      comparison: string
      pricing: string
      security: string
      docs: string
    }
    docsLink: string
    langButtonAria: string
    themeToggleToLight: string
    themeToggleToDark: string
    ctaInstall: string
    mobileMenuOpenAria: string
    mobileMenuCloseAria: string
  }
  hero: {
    eyebrow: string
    h1: string
    subtitle: string
    ctaInstall: string
    ctaTrial: string
    copyLabel: string
    copiedLabel: string
    copyCliAria: string
    factsLine: string
    viewModeScreenshots: string
    viewMode3d: string
    simFrameTitle: string
    simHint: string
    mediaSlides: HeroMediaItem[]
  }
  workflows: {
    eyebrow: string
    heading: string
    subtitle: string
    w1: {
      badge: string
      title: string
      body: string
      bullets: string[]
      mediaSrc: string
      mediaAlt: string
      mediaCaption: string
    }
    w2: {
      badge: string
      title: string
      body: string
      bullets: string[]
      diffHeading: string
      mediaSrc: string
      mediaAlt: string
      mediaCaption: string
      scenarios: DiffScenario[]
    }
    w3: {
      badge: string
      title: string
      body: string
      bullets: string[]
      mediaSrc: string
      mediaAlt: string
      mediaCaption: string
    }
  }
  comparison: {
    eyebrow: string
    heading: string
    subtitle: string
    tableCaption: string
    colCapability: string
    colPlain: string
    colWorkVisual: string
    colToolkit: string
    rows: ComparisonRow[]
    honestNoteTitle: string
    honestNoteBody: string
  }
  capabilities: {
    eyebrow: string
    heading: string
    subtitle: string
    featuredHeading: string
    showAllBtn: string
    collapseBtn: string
    registryNote: string
    searchPlaceholder: string
    searchAria: string
    allCategoryLabel: string
    emptyResults: string
    viewDemoBtn: string
    badgeFree: string
    badgePro: string
    featured: FeaturedCapability[]
    categoryNames: Record<string, string>
    typeNames: Record<string, string>
  }
  pricing: {
    eyebrow: string
    heading: string
    subtitle: string
    billingAnnual: string
    billingMonthly: string
    currencyAria: string
    openingCheckout: string
    lifetimeNotePrefix: string
    lifetimeLinkLabel: string
    lifetimeNoteSuffix: string
    enterprise100Note: string
    tiers: PricingTier[]
    billingStrip: {
      dodoTitle: string
      dodoText: string
      cancelTitle: string
      cancelText: string
      refundTitle: string
      refundText: string
      portalBtn: string
    }
    promoFootnote: string
    procurement: {
      eyebrow: string
      heading: string
      body: string
      points: string[]
      btnPortal: string
      btnAirGap: string
      btnVsCodeInvoice: string
    }
  }
  security: {
    eyebrow: string
    heading: string
    subtitle: string
    items: {
      title: string
      body: string
    }[]
    spectraLink: string
    githubLink: string
    privacyLink: string
  }
  author: {
    eyebrow: string
    heading: string
    name: string
    role: string
    photoSlotNote: string
    bio1: string
    bio2: string
    channelsHeading: string
    channels: {
      label: string
      detail: string
      href: string
      external?: boolean
    }[]
  }
  footer: {
    brandName: string
    brandDesc: string
    colProduct: string
    colResources: string
    colLegal: string
    links: {
      workflows: string
      comparison: string
      pricing: string
      security: string
      docs: string
      marketplace: string
      openVsx: string
      github: string
      portal: string
    }
    disclaimer: string
    copyright: string
  }
  modals: {
    closeAria: string
    closeBtn: string
    trialTitle: string
    trialSubtitle: string
    trialSteps: {
      step: string
      text: string
    }[]
    trialOpenVsCode: string
    trialGotIt: string
    toolModalCategoryLabel: string
    toolModalCompat: string
  }
}

export const LANDING_LOCALES: Record<LocaleCode, LandingLocaleData> = {
  ru: {
    code: 'ru',
    label: 'RU',
    skipToContent: 'Перейти к основному содержанию',
    header: {
      brandSubtitle: 'KUKA KRL для VS Code',
      navAriaLabel: 'Основная навигация',
      navItems: {
        workflows: 'Возможности',
        comparison: 'Сравнение',
        pricing: 'Тарифы',
        security: 'Безопасность',
        docs: 'Документация'
      },
      docsLink: '/ru/guide/installation',
      langButtonAria: 'Выбрать язык интерфейса',
      themeToggleToLight: 'Переключить на светлую тему',
      themeToggleToDark: 'Переключить на тёмную тему',
      ctaInstall: 'Установить бесплатно',
      mobileMenuOpenAria: 'Открыть меню',
      mobileMenuCloseAria: 'Закрыть меню'
    },
    hero: {
      eyebrow: 'Расширение для Visual Studio Code · KR C2 / KR C4 / KR C5 (micro / -2) · KSS 5.4–8.7, VSS (VKRC) и iiQKA.OS2 9.0–9.3',
      h1: 'Инженерная среда для KUKA KRL в VS Code: анализ кода, сравнение бэкапов и работа с .wvs',
      subtitle:
        'Находите ошибки Advance Run, пропущенные BRAKE и смещённые точки SmartPAD до загрузки программы на контроллер. Открывайте архивы бэкапов (.zip) и проекты WorkVisual (.wvs) напрямую в VS Code — локально и без облака.',
      ctaInstall: 'Установить в VS Code',
      ctaTrial: 'Попробовать Pro 14 дней',
      copyLabel: 'Копировать',
      copiedLabel: 'Скопировано',
      copyCliAria: 'Скопировать команду установки для VS Code CLI',
      factsLine:
        'Проверено на 108 реальных бэкапах (4,13 млн строк KRL) · Бесплатный базовый редактор · Работает полностью офлайн',
      viewModeScreenshots: 'Скриншоты VS Code',
      viewMode3d: '3D-просмотр траектории',
      simFrameTitle: 'Предпросмотр 3D-траектории KUKA KRL',
      simHint: 'Локальный веб-просмотр траектории. Загружается только при переключении на эту вкладку.',
      mediaSlides: [
        {
          id: 'control-center',
          label: 'Control Center',
          caption: 'Панель управления KUKA KRL Control Center и диагностика рабочей области в VS Code',
          src: '/media/kuka_control_center.gif',
          alt: 'Скриншот работы KUKA KRL Control Center внутри Visual Studio Code'
        },
        {
          id: 'backup-diff',
          label: 'Diff бэкапов .zip',
          caption: 'Сравнение архивов SmartPAD (.zip / KRCDiag) и подсчёт 6D-дельты точек E6POS без распаковки',
          src: '/media/krc_backup_diff.gif',
          alt: 'Сравнение бэкапов KRC и дельт координат E6POS в VS Code'
        },
        {
          id: 'io-signals',
          label: 'Сигналы I/O',
          caption: 'Инспектор сигналов $IN/$OUT и встроенные подсказки (Inlay Hints) для входов-выходов',
          src: '/media/krl_io_signals.gif',
          alt: 'Инспектор сигналов ввода-вывода KRL и встроенные подсказки в редакторе'
        },
        {
          id: 'autocomplete',
          label: 'LSP и типы',
          caption: 'Автодополнение 957 системных переменных KSS, функций и навигация F12 между .src и .dat',
          src: '/media/smart_autocomplete.gif',
          alt: 'Умное автодополнение системных переменных и функций KUKA KRL'
        }
      ]
    },
    workflows: {
      eyebrow: 'Ключевые сценарии',
      heading: 'Три рабочих сценария, которые экономят часы на пусконаладке',
      subtitle:
        'Инструмент решает рутинные задачи инженера-робототехника: поиск смещённых точек после смены, статический аудит логики KRL и разбор проектов WorkVisual без запуска тяжёлых сред.',
      w1: {
        badge: 'Сценарий 01 · Бэкапы SmartPAD',
        title: 'Сравнение бэкапов (.zip / KRCDiag) и дельты точек E6POS без распаковки',
        body: 'Монтируйте архивы контроллера (.zip, .ibz, KRCDiag) прямо в VS Code как обычную папку или сравнивайте две версии программы на лету. При правке точек на SmartPAD в ночную смену расширение вычисляет сдвиги координат (ΔX, ΔY, ΔZ, ΔA, ΔB, ΔC) и показывает их в стандартном Diff.',
        bullets: [
          'Работает прямо в оперативной памяти — на диске не остаются десятки временных папок.',
          'Выявляет точечные коррекции E6POS в .dat-файлах и отличает правку траектории от служебных изменений.',
          'Встроенный декодер бинарных журналов событий .evt (EVTX) переводит коды ошибок KSS.'
        ],
        mediaSrc: '/media/krc_backup_diff.gif',
        mediaAlt: 'Сравнение архива бэкапа SmartPAD и расчёт дельт координат в VS Code',
        mediaCaption: 'Запись из VS Code: сравнение бэкапов KRC и просмотр дельт точек'
      },
      w2: {
        badge: 'Сценарий 02 · Статический аудит и автоисправление',
        title: 'Проверка логики KRL и безопасные исправления через стандартный Diff',
        body: 'Анализатор находит типовые ошибки до переноса файлов на пульт: несинхронизированные выходы в сглаженном движении, пропуск BRAKE перед RESUME, движения внутри DRYRUN ... ENDDRYRUN, незаданные $TOOL/$BASE, UTF-8 BOM (запрещён в iiQKA.OS2) и несовместимости миграции KSS 5.4–9.3 / iiQKA.OS2 (PDAT/LDAT без VEL, SVEL_CP2, MotionParamSets.dat). Все исправления предлагаются через Diff с сохранением ;%{PE}-структур.',
        bullets: [
          'Сохраняет Inline-формы (;FOLD ... ;%{PE}) и кодировки UTF-8 без BOM (iiQKA.OS2) / CP1251 / Windows-1252.',
          'Проверяет DRYRUN ... ENDDRYRUN, баланс блоков, $IN/$OUT/$FLAG/$TIMER, SPS.SUB, VASS 26 / VKRC и миграцию PDAT/LDAT.',
          'Показывает техническую причину ошибки и конкретный участок траектории.'
        ],
        diffHeading: 'Примеры «До / После» с техническим пояснением',
        mediaSrc: '/media/type-validation-demo.gif',
        mediaAlt: 'Статическая диагностика KRL и проверка типов в VS Code',
        mediaCaption: 'Запись из VS Code: диагностика кода KRL и быстрые исправления',
        scenarios: [
          {
            id: 'advance_run',
            tabLabel: 'Срыв Advance Run ($OUT)',
            issueTitle: 'Остановка предпросмотра на сглаженной траектории',
            consequence:
              'Обращение к $OUT[12] без TRIGGER внутри движения C_DIS вызывает неявный останов указателя Advance Run. Робот делает короткую остановку в точке перехода вместо плавного обхода, что даёт прожог или рывок на контуре.',
            beforeLabel: 'До: неявный останов Advance Run',
            afterLabel: 'После: синхронизация через TRIGGER',
            beforeCode: `LIN XPICK_APPROACH C_DIS\n$OUT[12] = TRUE ; Срыв Advance Run: робот остановится перед следующей точкой\nLIN XPICK_PART`,
            afterCode: `LIN XPICK_APPROACH C_DIS\nTRIGGER WHEN DISTANCE=0 DELAY=0 DO $OUT[12] = TRUE\nLIN XPICK_PART ; Плавный проход C_DIS сохраняется`
          },
          {
            id: 'missing_brake',
            tabLabel: 'Пропуск BRAKE перед RESUME',
            issueTitle: 'Незапланированное дотягивание движения и ошибка стека (KSS 1584)',
            consequence:
              'RESUME в прерывании без предварительного BRAKE (или INTERRUPT WITH BRAKE) вызывает останов предпросмотра: робот доедет активный сегмент до конца вместо немедленного торможения, а при несоблюдении $ADVANCE=0 и уровня стека возникнет KSS 1584.',
            beforeLabel: 'До: нет BRAKE перед RESUME',
            afterLabel: 'После: штатный BRAKE перед RESUME',
            beforeCode: `DEF PART_SEARCH_ISR()\n  INTERRUPT OFF 10\n  RESUME ; Риск: без BRAKE робот дотянет текущий сегмент (и KSS 1584 при неверном стеке)\nEND`,
            afterCode: `DEF PART_SEARCH_ISR()\n  INTERRUPT OFF 10\n  BRAKE  ; Немедленный останов текущего движения (или INTERRUPT WITH BRAKE)\n  RESUME ; Безопасный возврат из прерывания\nEND`
          },
          {
            id: 'fold_bom',
            tabLabel: 'UTF-8 BOM и ;FOLD',
            issueTitle: 'Повреждение заголовков Inline-форм и кодировки',
            consequence:
              'Обычные текстовые редакторы добавляют UTF-8 BOM (\\xEF\\xBB\\xBF) или стирают служебный тег ;%{PE}. На SmartPAD такой файл открывается с ошибкой чтения формы или отклоняется компилятором KSS / iiQKA.OS2.',
            beforeLabel: 'До: потеря ;%{PE} и метаданных формы',
            afterLabel: 'После: восстановленная структура ;FOLD и CRLF',
            beforeCode: `; Обычный редактор удалил параметры ;%{PE}\n;FOLD INI\n  BAS (#INITMOV,0 )\n;ENDFOLD (INI)`,
            afterCode: `; Корректный заголовок KRL и концы строк CRLF без BOM\n;FOLD INI;%{PE}%R 8.6.1,%MKUKATPBASIS,%CINITMOV,%VINITMOV,%P 1:INITMOV, 2:0\n  BAS (#INITMOV,0 )\n;ENDFOLD (INI)`
          }
        ]
      },
      w3: {
        badge: 'Сценарий 03 · Проекты .wvs, .vcmx и Live-монитор',
        title: 'Разбор WorkVisual (.wvs), KUKA.Sim (.vcmx), iiQKA EKI/RSI 6.x и Live-монитор',
        body: 'Открывайте архивы WorkVisual (.wvs) для просмотра топологии EtherCAT/PROFINET и выгрузки таблиц сигналов в TIA Portal, TwinCAT 3 или EPLAN, а также генерируйте и проверяйте код iiQKA.EthernetKRL 6.x и iiQKA.RSI 6.x. В цеховой сети доступны WCF OnlineServices (49002), iiQKA gRPC (443), OPC UA probe (4840) и KUKAVARPROXY (7000).',
        bullets: [
          'Инспекция полевых шин .wvs, KOP-пакетов и парсинг конфигураций iiQKA.EthernetKRL 6.x / iiQKA.RSI 6.x без запуска WorkVisual.',
          'Опрос до 4096 входов/выходов с фильтром CFG по KrcIoSignals.xml и подписями SmartPAD UserTexts.kxr и $config.dat.',
          'Пароли к контроллеру хранятся в защищённом VS Code SecretStorage, без значений по умолчанию в коде.'
        ],
        mediaSrc: '/media/krl_io_signals.gif',
        mediaAlt: 'Просмотр сигналов ввода-вывода и связей контроллера в VS Code',
        mediaCaption: 'Запись из VS Code: таблица сигналов I/O и подсказки из проекта'
      }
    },
    comparison: {
      eyebrow: 'Честное сравнение',
      heading: 'Чем расширение отличается от обычной подсветки и WorkVisual',
      subtitle:
        'Ни один инструмент не закрывает все задачи одинаково хорошо. Ниже — точная граница того, где помогает KUKA KRL Toolkit, а где нужен штатный софт KUKA.',
      tableCaption: 'Сравнение возможностей обычной подсветки KRL, KUKA WorkVisual и KUKA KRL Toolkit',
      colCapability: 'Задача инженера',
      colPlain: 'Обычная подсветка KRL (TextMate)',
      colWorkVisual: 'KUKA WorkVisual / iiQWorks.Sim',
      colToolkit: 'KUKA KRL Toolkit (Community / Pro)',
      rows: [
        {
          feature: 'Операционные системы',
          plainSyntax: 'Windows / macOS / Linux',
          workVisual: 'Только Windows',
          krlToolkit: 'Windows / macOS / Linux (VS Code, Cursor)'
        },
        {
          feature: 'Навигация F12 между .src и .dat, переименование',
          plainSyntax: 'Нет (только раскраска ключевых слов)',
          workVisual: 'Базовая навигация',
          krlToolkit: 'Полный LSP, Find References, Call Hierarchy (Community)'
        },
        {
          feature: 'Диагностика Advance Run, BRAKE, ;FOLD и VASS 26',
          plainSyntax: 'Нет',
          workVisual: 'Частично при компиляции проекта',
          krlToolkit: 'Статический анализ в реальном времени и Diff-фикс (Pro)'
        },
        {
          feature: 'Сравнение .zip бэкапов и дельты E6POS без распаковки',
          plainSyntax: 'Нет',
          workVisual: 'Требует импорта проекта',
          krlToolkit: 'Монтирование .zip и 6D-дельта точек < 80 мс (Pro)'
        },
        {
          feature: 'Чтение проектов .wvs (топология и экспорт I/O)',
          plainSyntax: 'Нет',
          workVisual: 'Нативный формат',
          krlToolkit: 'Чтение топологии и экспорт в TIA / TwinCAT / EPLAN (Pro)'
        },
        {
          feature: 'Настройка железа PROFINET/EtherCAT и деплой на контроллер',
          plainSyntax: 'Нет',
          workVisual: 'Основное назначение',
          krlToolkit: 'Не поддерживается — нужен WorkVisual'
        },
        {
          feature: 'Сертификация безопасности (SIL / PL)',
          plainSyntax: 'Нет',
          workVisual: 'Конфигурация SafeOperation',
          krlToolkit: 'Не является safety-ПО (Non-SIL / Non-PL)'
        }
      ],
      honestNoteTitle: 'Важное ограничение',
      honestNoteBody:
        'KUKA KRL Toolkit не заменяет WorkVisual для настройки шин, SafeOperation и финального развёртывания проекта на контроллер, а также не является сертифицированным ПО безопасности (Non-SIL). Его задача — ускорить ревью кода, разбор бэкапов и подготовку программ до выхода к ячейке.'
    },
    capabilities: {
      eyebrow: 'Модули расширения',
      heading: 'Ключевые инструменты в одной установке',
      subtitle:
        'Ниже собраны 8 основных модулей, с которых начинают большинство инженеров. При необходимости раскройте полный реестр команд и настроек VS Code.',
      featuredHeading: 'Ключевые модули',
      showAllBtn: 'Показать все возможности',
      collapseBtn: 'Свернуть до ключевых',
      registryNote:
        'Расширенный режим отображает технический реестр команд и настроек VS Code из манифеста расширения. Названия команд приведены в том виде, в каком они отображаются в палитре VS Code (Ctrl+Shift+P).',
      searchPlaceholder: 'Поиск по названию или команде (например, backup, spline)...',
      searchAria: 'Фильтр возможностей по названию или идентификатору команды',
      allCategoryLabel: 'Все категории',
      emptyResults: 'По этому запросу ничего не найдено. Попробуйте изменить фильтр или очистить поиск.',
      viewDemoBtn: 'Подробнее',
      badgeFree: 'Community',
      badgePro: 'Pro',
      featured: [
        {
          id: 'krl.compareKrcBackup',
          title: 'Сравнение бэкапов KRC (.zip / KRCDiag)',
          category: 'Бэкапы и архивы',
          tier: 'Pro',
          description:
            'Монтирование .zip и .ibz без распаковки на диск, сравнение двух версий ячейки и расчёт 6D-дельт координат E6POS.',
          commandId: 'krl.compareKrcBackup',
          mediaSrc: '/media/krc_backup_diff.gif',
          mediaAlt: 'Демонстрация сравнения бэкапов KRC в VS Code'
        },
        {
          id: 'krl.fixAllSafeIssuesInFile',
          title: 'Статический аудит KRL и Diff-автофикс',
          category: 'Диагностика',
          tier: 'Pro',
          description:
            'Поиск ошибок Advance Run, пропусков BRAKE перед RESUME, UTF-8 BOM и проверка стандарта VASS 26 / VKRC с предпросмотром изменений.',
          commandId: 'krl.fixAllSafeIssuesInFile',
          mediaSrc: '/media/type-validation-demo.gif',
          mediaAlt: 'Демонстрация диагностики и проверки типов KRL'
        },
        {
          id: 'krl.inspectFieldbusTopology',
          title: 'Инспектор WorkVisual (.wvs) и экспорт I/O',
          category: 'Интеграция и шины',
          tier: 'Pro',
          description:
            'Просмотр топологии EtherCAT/PROFINET, установленных KOP-пакетов и экспорт таблиц сигналов в TIA Portal, TwinCAT и EPLAN.',
          commandId: 'krl.inspectFieldbusTopology',
          mediaSrc: '/media/krl_io_signals.gif',
          mediaAlt: 'Инспектор сигналов и топологии входов-выходов'
        },
        {
          id: 'krl.live.openDashboard',
          title: 'Live-монитор контроллера (WCF / KVP / iiQKA)',
          category: 'Связь с контроллером',
          tier: 'Pro',
          description:
            'Прямое чтение фреймов $TOOL/$BASE, осей, токов и до 4096 пинов I/O через WCF (49002), KUKAVARPROXY (7000) и iiQKA gRPC (443).',
          commandId: 'krl.live.openDashboard',
          mediaSrc: '/media/kuka_control_center.gif',
          mediaAlt: 'Панель управления и подключения к контроллеру KUKA'
        },
        {
          id: 'krl.showFlowchart',
          title: 'Интерактивная блок-схема программы',
          category: 'Анализ логики',
          tier: 'Pro',
          description:
            'Построение графа логики IF, SWITCH, LOOP и подпрограмм с переходом в строку кода по клику и экспортом в SVG.',
          commandId: 'krl.showFlowchart',
          mediaSrc: '/media/control_flow_graph.gif',
          mediaAlt: 'Интерактивная блок-схема логики программы KRL'
        },
        {
          id: 'krl.openEventLog',
          title: 'Декодер журналов событий .evt (EVTX)',
          category: 'Бэкапы и архивы',
          tier: 'Pro',
          description:
            'Офлайн-разбор бинарных архивов событий контроллера и перевод системных сообщений KSS без сторонних утилит.',
          commandId: 'krl.openEventLog',
          mediaSrc: '/media/kuka_control_center.gif',
          mediaAlt: 'Просмотр системных журналов KUKA в VS Code'
        },
        {
          id: 'krl.lspCore',
          title: 'Языковой сервер KRL (LSP) и навигация F12',
          category: 'Базовый редактор',
          tier: 'Free',
          description:
            'Бесплатное автодополнение 957 системных переменных и 116 функций, переход F12 между .src и .dat, форматирование и 6 тем.',
          commandId: 'krl.sortDeclarations',
          mediaSrc: '/media/smart_autocomplete.gif',
          mediaAlt: 'Автодополнение и навигация по коду KRL'
        },
        {
          id: 'krl.cleanupUnusedVariables',
          title: 'Поиск мёртвого кода и неиспользуемых точек',
          category: 'Диагностика',
          tier: 'Pro',
          description:
            'Выявление недостижимых веток и неиспользуемых переменных в .src и .dat перед очисткой проекта.',
          commandId: 'krl.cleanupUnusedVariables',
          mediaSrc: '/media/dead-code-demo.gif',
          mediaAlt: 'Поиск неиспользуемых переменных и мёртвого кода KRL'
        }
      ],
      categoryNames: {
        All: 'Все категории',
        'Core Language Features': 'Язык и синтаксис',
        'Diagnostics & Linting': 'Диагностика и линтер',
        'Code Editing & Formatting': 'Редактирование и формат',
        'Motion & Trajectory Tools': 'Траектории и движения',
        'KRC Backup & Project Management': 'Бэкапы KRC и проекты',
        'I/O & Signals': 'Сигналы I/O',
        'EKI & Communication': 'EKI и связь',
        'Git & Version Control Integration': 'Git и история версий',
        'Licensing & Support': 'Лицензирование и поддержка',
        'UI & Workflow Tools': 'Интерфейс и рабочие процессы',
        Reporting: 'Отчёты приёмки',
        'Themes & Icons': 'Темы и иконки'
      },
      typeNames: {
        Command: 'Команда',
        Configuration: 'Настройка',
        View: 'Панель',
        'Custom Editor': 'Редактор файла',
        Theme: 'Тема',
        'Icon Theme': 'Иконки',
        Language: 'Язык',
        'Snippet Collection': 'Сниппеты',
        'TextMate Grammar': 'Грамматика',
        'Language Model Tool': 'Инструмент ИИ',
        'View Container': 'Контейнер'
      }
    },
    pricing: {
      eyebrow: 'Тарифы и лицензирование',
      heading: 'Прозрачные тарифы без скрытых ограничений',
      subtitle:
        'Базовый редактор бесплатен для обучения и некоммерческих задач. Коммерческая лицензия нужна для производственной разработки и работы с Pro-модулями.',
      billingAnnual: 'Ежегодно',
      billingMonthly: 'Помесячно',
      currencyAria: 'Валюта отображения цен',
      openingCheckout: 'Переход к оплате...',
      lifetimeNotePrefix: 'Доступна также бессрочная лицензия на 1 ПК — ',
      lifetimeLinkLabel: 'Pro Lifetime',
      lifetimeNoteSuffix: ' (единоразовый платёж без продлений).',
      enterprise100Note: 'Для заводов на 100 рабочих мест — корпоративный план Enterprise Plant ($4 999 / год по счёту).',
      tiers: [
        {
          id: 'community',
          name: 'Community',
          seatsLabel: 'Бесплатно навсегда',
          freeLabel: 'Бесплатно',
          periodYear: '',
          description: 'Полноценный редактор KRL для учёбы, личных проектов и 30-дневной оценки внутри компании.',
          features: [
            'Подсветка синтаксиса KRL и 6 цеховых тем',
            'LSP-автодополнение (957 переменных, 116 функций)',
            'Навигация F12 между .src/.dat, FOLD/UNFOLD',
            'Базовый синтаксический разбор без лимита строк'
          ],
          ctaLabel: 'Установить бесплатно',
          isCommunity: true
        },
        {
          id: 'pro',
          name: 'Engineer Pro',
          badge: 'Популярный выбор',
          seatsLabel: '1 рабочее место',
          priceUsd: 149,
          monthlyUsd: 19,
          periodYear: '/ год',
          periodMonth: '/ мес',
          description: 'Все Pro-модули для пусконаладки и аудита. 14 дней бесплатно без привязки карты.',
          features: [
            'Аудит Advance Run, BRAKE, VASS 26 и автоисправление',
            'Сравнение .zip бэкапов и 6D-дельты точек E6POS',
            'Инспекция .wvs, .vcmx, журналы .evt и блок-схемы',
            'Live-монитор WCF / KVP / iiQKA и 30-дневный офлайн-кэш'
          ],
          ctaLabel: 'Оформить Pro',
          productIdAnnual: 'pdt_0NmAV012KFHSjUMyDomJ6',
          productIdMonthly: 'pdt_0NmAUzwdbzeERSktsOLTp',
          isPrimary: true
        },
        {
          id: 'team',
          name: 'Team',
          seatsLabel: 'До 5 мест',
          priceUsd: 499,
          periodYear: '/ год',
          description: 'Для инженерных групп и отделов пусконаладки с единым счётом на компанию.',
          features: [
            'До 5 рабочих станций с общим ключом команды',
            'Все возможности Engineer Pro для каждого участника',
            'Единый корпоративный счёт и управление местами',
            'Поддержка офлайн-активации (Air-Gap .lic)'
          ],
          ctaLabel: 'Выбрать Team',
          productIdAnnual: 'pdt_0NnLCdgD69GiXDLRJ0K5v'
        },
        {
          id: 'integrator',
          name: 'Integrator / Enterprise',
          seatsLabel: '20–100 мест',
          priceUsd: 1499,
          periodYear: '/ год',
          description: 'Для системных интеграторов и заводов с закрытыми цеховыми сетями.',
          features: [
            'От 20 рабочих мест (или 100 мест для всего завода)',
            'Подписанные Ed25519 .lic сертификаты для Air-Gap',
            'Выставление счёта (Invoice / SEPA / PO) и EU VAT 0%',
            'Приоритетная инженерная поддержка по сложным кейсам'
          ],
          ctaLabel: 'Оформить Integrator',
          productIdAnnual: 'pdt_0Nq5QVTrbkJbWAUf8qoyn',
          isEnterprise: true
        }
      ],
      billingStrip: {
        dodoTitle: 'Оплата и счета через Dodo Payments',
        dodoText: 'Международные карты, банковские переводы, автоматические PDF-квитанции и EU VAT Reverse Charge (0% при наличии VAT ID).',
        cancelTitle: 'Отмена в 1 клик',
        cancelText: 'Подписку можно отменить в любой момент из панели в VS Code (krl.manageSubscription) или в кабинете клиента.',
        refundTitle: 'Возврат в течение 14 дней',
        refundText: 'Если инструмент не подошёл для вашей ячейки KUKA, напишите через встроенный чат поддержки — оформим возврат без лишних вопросов.',
        portalBtn: 'Кабинет и счета Dodo'
      },
      promoFootnote:
        'Для первых оплат действует промокод LAUNCH30 (−30%, применяется автоматически при переходе к оплате). Суммы в EUR, RUB и TRY приведены справочно; расчёт на стороне Dodo Payments идёт в USD.',
      procurement: {
        eyebrow: 'Для компаний и отделов закупок',
        heading: 'Закупка для команды или юридического лица',
        body: 'Оформление на юридическое лицо через Merchant of Record Dodo Payments или прямой запрос счёта (Invoice / SEPA / Purchase Order) с поддержкой закрытых цеховых сетей.',
        points: [
          'Официальные закрывающие документы, налоговые PDF-счета и EU VIES Reverse Charge (0% VAT).',
          'Выдача оффлайн-файлов лицензии .lic (Ed25519) для рабочих станций без доступа к интернету.',
          'Быстрый запрос счёта из VS Code командой krl.requestCorporateInvoice или через личный портал.'
        ],
        btnPortal: 'Портал счетов Dodo',
        btnAirGap: 'Портал Air-Gap (.lic)',
        btnVsCodeInvoice: 'Запросить счёт в VS Code'
      }
    },
    security: {
      eyebrow: 'Безопасность и приватность',
      heading: 'Спроектировано для закрытых производственных сетей',
      subtitle:
        'Архитектура расширения строится на изоляции кода: ваши программы .src/.dat и архивы ячеек не передаются на внешние серверы.',
      items: [
        {
          title: '1. 100% локальная обработка',
          body: 'Разбор KRL, AST-проверки, расчёт дельт координат и чтение бэкапов .zip/.wvs выполняются локально на компьютере инженера. Исходный код роботов не покидает рабочую станцию.'
        },
        {
          title: '2. Офлайн-лицензирование (Air-Gap)',
          body: 'Для цеховых ноутбуков и ОТ-сетей без интернета поддерживается активация через криптографически подписанный файл лицензии .lic (Ed25519). Платные лицензии также имеют 30-дневный офлайн-буфер.'
        },
        {
          title: '3. Проверка безопасности пакета',
          body: 'Каждый релиз расширения проверяется сканером цепочки поставок ReversingLabs Spectra Assure (0 CVE). Открытая витрина, документация и трекер задач доступны на GitHub.'
        }
      ],
      spectraLink: 'Отчёт ReversingLabs Spectra Assure',
      githubLink: 'Публичный репозиторий на GitHub',
      privacyLink: 'Политика конфиденциальности (PRIVACY.md)'
    },
    author: {
      eyebrow: 'О разработчике и связь',
      heading: 'Кто делает этот инструмент',
      name: 'Сильвестр Лискин (LiskinLabs)',
      role: 'Инженер-робототехник, автор KUKA KRL Engineering Toolkit',
      photoSlotNote: 'Слот под фото автора (/author.jpg)',
      bio1: 'Я занимаюсь пусконаладкой промышленных роботов KUKA и разработкой ПО для робототехнических ячеек. Этот инструмент появился из повседневной практики на линиях: чтобы быстрее проверять бэкапы со SmartPAD, находить срывы Advance Run до запуска в цехе и не открывать тяжёлую среду ради просмотра одной таблицы I/O.',
      bio2: 'Нужен счёт на компанию, коммерческое предложение, помощь с нестандартным бэкапом или тест на закрытом предприятии? Напишите напрямую через встроенный чат поддержки или откройте задачу на GitHub — отвечаю лично.',
      channelsHeading: 'Прямые каналы связи и дистрибутивы',
      channels: [
        {
          label: 'Чат поддержки внутри VS Code',
          detail: 'Команда krl.openTelegramChat (быстрые вопросы и счета B2B)',
          href: 'vscode://LiskinLabs.kuka-krl-extension/support',
          external: false
        },
        {
          label: 'GitHub Issues и обсуждения',
          detail: 'Баг-репорты, граничные кейсы KRL и запросы функций',
          href: 'https://github.com/LiskinLabs/kuka-krl-extension/issues',
          external: true
        },
        {
          label: 'VS Code Marketplace',
          detail: 'Страница расширения, отзывы и история релизов',
          href: 'https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension',
          external: true
        },
        {
          label: 'Open VSX Registry',
          detail: 'Для Cursor, Windsurf и VSCodium',
          href: 'https://open-vsx.org/extension/LiskinLabs/kuka-krl-extension',
          external: true
        }
      ]
    },
    footer: {
      brandName: 'LiskinLabs',
      brandDesc: 'Инженерные инструменты для программирования и анализа систем KUKA KRL в Visual Studio Code.',
      colProduct: 'Разделы',
      colResources: 'Ресурсы',
      colLegal: 'Правовая информация',
      links: {
        workflows: 'Возможности',
        comparison: 'Сравнение',
        pricing: 'Тарифы',
        security: 'Безопасность и Air-Gap',
        docs: 'Документация',
        marketplace: 'VS Code Marketplace',
        openVsx: 'Open VSX',
        github: 'GitHub',
        portal: 'Кабинет Dodo Payments'
      },
      disclaimer:
        'Независимый программный продукт LiskinLabs (Сильвестр Лискин), не аффилированный с KUKA AG и Microsoft Corporation. KUKA, KRL, KRC, KSS, WorkVisual, KUKA.Sim и SmartPAD являются товарными знаками KUKA Roboter GmbH. Расширение не является сертифицированным ПО безопасности (Non-SIL / Non-PL) и не заменяет проверку программы на реальном контроллере в режиме T1.',
      copyright: '© 2024–2026 LiskinLabs (Сильвестр Лискин)'
    },
    modals: {
      closeAria: 'Закрыть окно',
      closeBtn: 'Закрыть',
      trialTitle: '14-дневный бесплатный доступ к Pro',
      trialSubtitle: 'Все Pro-модули работают 14 дней без банковской карты и привязки аккаунта.',
      trialSteps: [
        {
          step: '1. Установите расширение',
          text: 'Откройте Visual Studio Code и установите KRL Engineering Toolkit из Marketplace.'
        },
        {
          step: '2. Откройте палитру команд',
          text: 'Нажмите Ctrl+Shift+P (на macOS — Cmd+Shift+P).'
        },
        {
          step: '3. Запустите активацию триала',
          text: 'Введите и выполните команду krl.startTrial.'
        }
      ],
      trialOpenVsCode: 'Открыть в VS Code',
      trialGotIt: 'Понятно',
      toolModalCategoryLabel: 'Категория',
      toolModalCompat: 'Совместимо с KSS 5.x–8.7 (KRC2 / KRC4 / KRC5) и iiQKA'
    }
  },

  en: {
    code: 'en',
    label: 'EN',
    skipToContent: 'Skip to main content',
    header: {
      brandSubtitle: 'KUKA KRL for VS Code',
      navAriaLabel: 'Primary navigation',
      navItems: {
        workflows: 'Workflows',
        comparison: 'Comparison',
        pricing: 'Pricing',
        security: 'Security',
        docs: 'Docs'
      },
      docsLink: '/guide/installation',
      langButtonAria: 'Select interface language',
      themeToggleToLight: 'Switch to light theme',
      themeToggleToDark: 'Switch to dark theme',
      ctaInstall: 'Install Free',
      mobileMenuOpenAria: 'Open menu',
      mobileMenuCloseAria: 'Close menu'
    },
    hero: {
      eyebrow: 'Visual Studio Code Extension · KR C2 / KR C4 / KR C5 (micro / -2) · KSS 5.4–8.7, VSS (VKRC) & iiQKA.OS2 9.0–9.3',
      h1: 'Engineering workspace for KUKA KRL in VS Code: static analysis, backup diff, and .wvs inspection',
      subtitle:
        'Catch Advance Run stops, missing BRAKE statements, and night-shift SmartPAD point drift before loading code onto the controller. Open .zip backups and WorkVisual (.wvs) projects directly in VS Code — locally and offline.',
      ctaInstall: 'Install in VS Code',
      ctaTrial: 'Try Pro for 14 days',
      copyLabel: 'Copy',
      copiedLabel: 'Copied',
      copyCliAria: 'Copy VS Code CLI install command',
      factsLine: 'Benchmarked on 108 real backups (4.13M lines of KRL) · Free core editor · Works 100% offline',
      viewModeScreenshots: 'VS Code Screenshots',
      viewMode3d: '3D Trajectory View',
      simFrameTitle: 'KUKA KRL 3D Trajectory Preview',
      simHint: 'Local trajectory viewer. Loaded only when switched to this tab.',
      mediaSlides: [
        {
          id: 'control-center',
          label: 'Control Center',
          caption: 'KUKA KRL Control Center and workspace diagnostics inside Visual Studio Code',
          src: '/media/kuka_control_center.gif',
          alt: 'KUKA KRL Control Center running inside Visual Studio Code'
        },
        {
          id: 'backup-diff',
          label: '.zip Backup Diff',
          caption: 'Compare SmartPAD archives (.zip / KRCDiag) and compute 6D E6POS point deltas without unpacking',
          src: '/media/krc_backup_diff.gif',
          alt: 'KRC backup comparison and E6POS coordinate deltas in VS Code'
        },
        {
          id: 'io-signals',
          label: 'I/O Signals',
          caption: 'Hardware I/O inspector ($IN/$OUT) and inline Inlay Hints for signal comments',
          src: '/media/krl_io_signals.gif',
          alt: 'KRL I/O signal inspector and inline hints inside VS Code'
        },
        {
          id: 'autocomplete',
          label: 'LSP & Types',
          caption: 'Autocomplete for 957 KSS system variables, functions, and F12 navigation across .src and .dat',
          src: '/media/smart_autocomplete.gif',
          alt: 'Smart autocomplete for KUKA KRL system variables and functions'
        }
      ]
    },
    workflows: {
      eyebrow: 'Key Workflows',
      heading: 'Three daily workflows that save commissioning hours',
      subtitle:
        'Built around real shop-floor bottlenecks: tracking touched-up points across shifts, auditing KRL logic before deployment, and inspecting WorkVisual projects without booting heavy suites.',
      w1: {
        badge: 'Workflow 01 · SmartPAD Backups',
        title: 'Compare .zip / KRCDiag backups and E6POS point deltas without unpacking',
        body: 'Mount controller archives (.zip, .ibz, KRCDiag) directly inside VS Code or diff two cell revisions side by side. When operators touch up points on the SmartPAD during a shift, the tool calculates coordinate deltas (ΔX, ΔY, ΔZ, ΔA, ΔB, ΔC) in standard Diff.',
        bullets: [
          'Runs purely in memory — no leftover temporary folders cluttering your engineering laptop.',
          'Highlights E6POS shifts inside .dat files and separates trajectory edits from generated headers.',
          'Includes an offline binary .evt (EVTX) event log decoder with KSS fault translation.'
        ],
        mediaSrc: '/media/krc_backup_diff.gif',
        mediaAlt: 'Comparing SmartPAD backup archives and point deltas in VS Code',
        mediaCaption: 'Recorded in VS Code: KRC backup diff and point delta view'
      },
      w2: {
        badge: 'Workflow 02 · Static Audit & Safe Diff Fix',
        title: 'Static KRL analysis and diff-reviewed repairs',
        body: 'Detects common controller traps before code hits the pendant: unsynchronized $OUT calls breaking Advance Run, missing BRAKE before RESUME, motion inside DRYRUN ... ENDDRYRUN, unassigned $TOOL/$BASE frames, UTF-8 BOM (rejected by iiQKA.OS2), and KSS 5.4–9.3 / iiQKA.OS2 migration issues (PDAT/LDAT without VEL, SVEL_CP2, MotionParamSets.dat). Every repair opens in VS Code Diff while preserving ;%{PE} metadata.',
        bullets: [
          'Preserves Inline-Form checksums (;FOLD ... ;%{PE}) and UTF-8 without BOM (iiQKA.OS2), CP1251, and Windows-1252.',
          'Checks DRYRUN ... ENDDRYRUN blocks, block balance, $IN/$OUT/$FLAG/$TIMER bounds, SPS.SUB, VASS 26 / VKRC, and PDAT/LDAT migration.',
          'Explains the exact controller behavior behind each diagnostic warning.'
        ],
        diffHeading: 'Before / After examples with technical impact',
        mediaSrc: '/media/type-validation-demo.gif',
        mediaAlt: 'Static KRL diagnostics and type checking in VS Code',
        mediaCaption: 'Recorded in VS Code: KRL static diagnostics and quick fixes',
        scenarios: [
          {
            id: 'advance_run',
            tabLabel: 'Advance Run ($OUT)',
            issueTitle: 'Implicit Advance Run stop during blended motion',
            consequence:
              'Setting $OUT[12] directly inside C_DIS motion triggers an implicit Vorlaufstopp. The robot decelerates to a brief stop at the approximation point instead of blending smoothly through the path.',
            beforeLabel: 'Before: implicit Advance Run halt',
            afterLabel: 'After: motion-synchronized TRIGGER',
            beforeCode: `LIN XPICK_APPROACH C_DIS\n$OUT[12] = TRUE ; Breaks Advance Run: robot stops before next segment\nLIN XPICK_PART`,
            afterCode: `LIN XPICK_APPROACH C_DIS\nTRIGGER WHEN DISTANCE=0 DELAY=0 DO $OUT[12] = TRUE\nLIN XPICK_PART ; Continuous C_DIS blending preserved`
          },
          {
            id: 'missing_brake',
            tabLabel: 'Missing BRAKE before RESUME',
            issueTitle: 'Uncontrolled segment completion & stack fault (KSS 1584)',
            consequence:
              'Calling RESUME inside an interrupt subroutine without a preceding BRAKE (or INTERRUPT WITH BRAKE) causes an advance-run stop: the robot finishes the active segment instead of braking immediately, and violates KSS 1584 if $ADVANCE=0 / stack rules are not met.',
            beforeLabel: 'Before: missing BRAKE before RESUME',
            afterLabel: 'After: controlled stop before RESUME',
            beforeCode: `DEF PART_SEARCH_ISR()\n  INTERRUPT OFF 10\n  RESUME ; Hazard: completes active segment without BRAKE (and KSS 1584 on stack mismatch)\nEND`,
            afterCode: `DEF PART_SEARCH_ISR()\n  INTERRUPT OFF 10\n  BRAKE  ; Decelerate current motion immediately (or INTERRUPT WITH BRAKE)\n  RESUME ; Safe return from interrupt\nEND`
          },
          {
            id: 'fold_bom',
            tabLabel: 'UTF-8 BOM & ;FOLD',
            issueTitle: 'Corrupted Inline-Form tags and file encoding',
            consequence:
              'Generic text editors often prepend a UTF-8 BOM (\\xEF\\xBB\\xBF) or strip ;%{PE} parameters, causing SmartPAD HMI form errors or KSS / iiQKA.OS2 compiler rejections.',
            beforeLabel: 'Before: stripped ;%{PE} metadata',
            afterLabel: 'After: valid ;FOLD structure and CRLF',
            beforeCode: `; Generic editor stripped ;%{PE} inline-form parameters\n;FOLD INI\n  BAS (#INITMOV,0 )\n;ENDFOLD (INI)`,
            afterCode: `; Valid KRL header and CRLF line endings without BOM\n;FOLD INI;%{PE}%R 8.6.1,%MKUKATPBASIS,%CINITMOV,%VINITMOV,%P 1:INITMOV, 2:0\n  BAS (#INITMOV,0 )\n;ENDFOLD (INI)`
          }
        ]
      },
      w3: {
        badge: 'Workflow 03 · .wvs, .vcmx & Live Bridge',
        title: 'WorkVisual (.wvs), KUKA.Sim (.vcmx), iiQKA EKI/RSI 6.x & Live Monitor',
        body: 'Open WorkVisual (.wvs) archives to inspect EtherCAT/PROFINET topology, export I/O tables to TIA Portal, TwinCAT 3, or EPLAN, and validate/generate iiQKA.EthernetKRL 6.x & iiQKA.RSI 6.x modules. On controller networks, connect via WCF (49002), iiQKA gRPC (443), OPC UA probe (4840), or KUKAVARPROXY (7000).',
        bullets: [
          'Inspect .wvs fieldbus mappings, KOP packages, and iiQKA.EthernetKRL 6.x / iiQKA.RSI 6.x contexts on macOS, Linux, or Windows without WorkVisual.',
          'Stream up to 4,096 I/O signals with the CFG filter (KrcIoSignals.xml) and SmartPAD UserTexts.kxr / $config.dat labels.',
          'Controller credentials are stored per-host in VS Code SecretStorage with zero hardcoded passwords.'
        ],
        mediaSrc: '/media/krl_io_signals.gif',
        mediaAlt: 'Inspecting I/O signals and project bindings in VS Code',
        mediaCaption: 'Recorded in VS Code: I/O signal table and inlay hints'
      }
    },
    comparison: {
      eyebrow: 'Honest Comparison',
      heading: 'How this compares to plain syntax highlighters and WorkVisual',
      subtitle:
        'Each tool has a clear job. Here is where KUKA KRL Toolkit fits alongside standard KUKA engineering software.',
      tableCaption: 'Comparison between plain KRL highlighters, KUKA WorkVisual, and KUKA KRL Toolkit',
      colCapability: 'Engineering task',
      colPlain: 'Plain KRL Syntax (TextMate)',
      colWorkVisual: 'KUKA WorkVisual / iiQWorks.Sim',
      colToolkit: 'KUKA KRL Toolkit (Community / Pro)',
      rows: [
        {
          feature: 'Supported operating systems',
          plainSyntax: 'Windows / macOS / Linux',
          workVisual: 'Windows only',
          krlToolkit: 'Windows / macOS / Linux (VS Code, Cursor)'
        },
        {
          feature: 'Cross-file F12 navigation (.src ↔ .dat) & rename',
          plainSyntax: 'No (keyword highlighting only)',
          workVisual: 'Basic navigation',
          krlToolkit: 'Full LSP, Find References, Call Hierarchy (Community)'
        },
        {
          feature: 'Advance Run, BRAKE, ;FOLD & VASS 26 diagnostics',
          plainSyntax: 'No',
          workVisual: 'Partial during project build',
          krlToolkit: 'Real-time static analysis & Diff fixes (Pro)'
        },
        {
          feature: 'Zero-unpack .zip backup diff & E6POS deltas',
          plainSyntax: 'No',
          workVisual: 'Requires project import',
          krlToolkit: 'In-memory .zip mount & 6D deltas < 80 ms (Pro)'
        },
        {
          feature: 'WorkVisual (.wvs) topology & I/O export',
          plainSyntax: 'No',
          workVisual: 'Native authoring environment',
          krlToolkit: 'Read topology & export to TIA / TwinCAT / EPLAN (Pro)'
        },
        {
          feature: 'Fieldbus hardware setup & controller deploy',
          plainSyntax: 'No',
          workVisual: 'Primary purpose',
          krlToolkit: 'Not supported — use WorkVisual'
        },
        {
          feature: 'Safety certification (SIL / PL)',
          plainSyntax: 'No',
          workVisual: 'SafeOperation configuration',
          krlToolkit: 'Not safety-certified software (Non-SIL / Non-PL)'
        }
      ],
      honestNoteTitle: 'Clear boundary',
      honestNoteBody:
        'KUKA KRL Toolkit does not replace WorkVisual for hardware bus configuration, SafeOperation, or controller deployment, and it is not safety-certified software (Non-SIL). It is built to speed up daily code review, backup diffing, and pre-commissioning checks.'
    },
    capabilities: {
      eyebrow: 'Capabilities',
      heading: 'Core engineering modules in one extension',
      subtitle:
        'Start with the 8 primary modules below, or expand the full VS Code command and settings registry on demand.',
      featuredHeading: 'Featured Modules',
      showAllBtn: 'Show all capabilities',
      collapseBtn: 'Show featured only',
      registryNote:
        'Expanded view lists the underlying VS Code commands, settings, and views from the extension manifest.',
      searchPlaceholder: 'Filter by name or command ID (e.g., backup, spline)...',
      searchAria: 'Filter capabilities by name or command ID',
      allCategoryLabel: 'All categories',
      emptyResults: 'No matching capabilities found. Clear or adjust your filter.',
      viewDemoBtn: 'Details',
      badgeFree: 'Community',
      badgePro: 'Pro',
      featured: [
        {
          id: 'krl.compareKrcBackup',
          title: 'KRC Backup Diff (.zip / KRCDiag)',
          category: 'Backups & Archives',
          tier: 'Pro',
          description:
            'Mount .zip and .ibz backups in memory without extracting to disk, compare two revisions, and inspect 6D E6POS point deltas.',
          commandId: 'krl.compareKrcBackup',
          mediaSrc: '/media/krc_backup_diff.gif',
          mediaAlt: 'KRC backup diff demo in VS Code'
        },
        {
          id: 'krl.fixAllSafeIssuesInFile',
          title: 'Static KRL Audit & Diff Auto-Repair',
          category: 'Diagnostics',
          tier: 'Pro',
          description:
            'Detect Advance Run stops, missing BRAKE before RESUME, UTF-8 BOMs, and VASS 26 / VKRC issues with Diff review.',
          commandId: 'krl.fixAllSafeIssuesInFile',
          mediaSrc: '/media/type-validation-demo.gif',
          mediaAlt: 'Static KRL diagnostics and type validation demo'
        },
        {
          id: 'krl.inspectFieldbusTopology',
          title: 'WorkVisual (.wvs) & I/O Signal Export',
          category: 'Fieldbus & Integration',
          tier: 'Pro',
          description:
            'Inspect EtherCAT/PROFINET topology, installed KOP packages, and export signal tables to TIA Portal, TwinCAT, and EPLAN.',
          commandId: 'krl.inspectFieldbusTopology',
          mediaSrc: '/media/krl_io_signals.gif',
          mediaAlt: 'I/O signal inspector and fieldbus bindings'
        },
        {
          id: 'krl.live.openDashboard',
          title: 'Live Controller Monitor (WCF / KVP / iiQKA)',
          category: 'Controller Bridge',
          tier: 'Pro',
          description:
            'Read live $TOOL/$BASE frames, axis torques, and 4,096 I/O pins over WCF (49002), KUKAVARPROXY (7000), or iiQKA gRPC (443).',
          commandId: 'krl.live.openDashboard',
          mediaSrc: '/media/kuka_control_center.gif',
          mediaAlt: 'KUKA KRL Control Center and live controller bridge'
        },
        {
          id: 'krl.showFlowchart',
          title: 'Interactive Program Flowchart',
          category: 'Logic Analysis',
          tier: 'Pro',
          description:
            'Generate interactive IF, SWITCH, LOOP, and subroutine graphs with click-to-source navigation and SVG export.',
          commandId: 'krl.showFlowchart',
          mediaSrc: '/media/control_flow_graph.gif',
          mediaAlt: 'Interactive KRL control flow graph'
        },
        {
          id: 'krl.openEventLog',
          title: 'Binary Event Log Decoder (.evt / EVTX)',
          category: 'Backups & Archives',
          tier: 'Pro',
          description:
            'Decode controller binary .evt crash logs offline across 6 languages without external tools.',
          commandId: 'krl.openEventLog',
          mediaSrc: '/media/kuka_control_center.gif',
          mediaAlt: 'KUKA event log inspection in VS Code'
        },
        {
          id: 'krl.lspCore',
          title: 'KRL Language Server & F12 Navigation',
          category: 'Core Editor',
          tier: 'Free',
          description:
            'Free autocomplete for 957 system variables and 116 functions, cross-file F12 navigation (.src/.dat), formatter, and 6 themes.',
          commandId: 'krl.sortDeclarations',
          mediaSrc: '/media/smart_autocomplete.gif',
          mediaAlt: 'Smart KRL autocomplete and navigation'
        },
        {
          id: 'krl.cleanupUnusedVariables',
          title: 'Dead-Code & Unused Point Cleanup',
          category: 'Diagnostics',
          tier: 'Pro',
          description:
            'Identify unreachable branches and unused declarations in .src and .dat files before commissioning sign-off.',
          commandId: 'krl.cleanupUnusedVariables',
          mediaSrc: '/media/dead-code-demo.gif',
          mediaAlt: 'Dead code detection demo in VS Code'
        }
      ],
      categoryNames: {
        All: 'All categories'
      },
      typeNames: {}
    },
    pricing: {
      eyebrow: 'Pricing',
      heading: 'Straightforward licensing for individuals and teams',
      subtitle:
        'Core editor features are free for learning and non-commercial work. Commercial engineering and Pro tools require an active license.',
      billingAnnual: 'Annual',
      billingMonthly: 'Monthly',
      currencyAria: 'Display currency',
      openingCheckout: 'Opening checkout...',
      lifetimeNotePrefix: 'Need a one-time license for 1 PC? ',
      lifetimeLinkLabel: 'Pro Lifetime',
      lifetimeNoteSuffix: ' is available with no recurring renewal.',
      enterprise100Note: 'Plant-wide deployments up to 100 seats are covered by Enterprise Plant ($4,999 / year via invoice).',
      tiers: [
        {
          id: 'community',
          name: 'Community',
          seatsLabel: 'Free forever',
          freeLabel: 'Free',
          periodYear: '',
          description: 'Core KRL editor for learning, academic labs, and 30-day internal evaluation.',
          features: [
            'KRL syntax highlighting & 6 shop-floor themes',
            'LSP autocomplete (957 vars, 116 functions)',
            'Cross-file F12 navigation & FOLD/UNFOLD',
            'Unlimited file length & basic syntax checks'
          ],
          ctaLabel: 'Install Free',
          isCommunity: true
        },
        {
          id: 'pro',
          name: 'Engineer Pro',
          badge: 'Most popular',
          seatsLabel: '1 workstation',
          priceUsd: 149,
          monthlyUsd: 19,
          periodYear: '/ year',
          periodMonth: '/ mo',
          description: 'Full Pro commissioning and diagnostics suite. Includes a 14-day free trial without a card.',
          features: [
            'Advance Run, BRAKE, VASS 26 & Diff auto-repair',
            'Zero-unpack .zip backup diff & 6D E6POS deltas',
            '.wvs, .vcmx, .evt log decoder & flowcharts',
            'Live controller bridge & 30-day offline cache'
          ],
          ctaLabel: 'Get Pro',
          productIdAnnual: 'pdt_0NmAV012KFHSjUMyDomJ6',
          productIdMonthly: 'pdt_0NmAUzwdbzeERSktsOLTp',
          isPrimary: true
        },
        {
          id: 'team',
          name: 'Team',
          seatsLabel: 'Up to 5 seats',
          priceUsd: 499,
          periodYear: '/ year',
          description: 'For commissioning squads and automation groups under a single corporate invoice.',
          features: [
            'Up to 5 engineering workstations',
            'All Engineer Pro modules for every seat',
            'Single corporate invoice & seat management',
            'Offline Air-Gap (.lic) activation support'
          ],
          ctaLabel: 'Get Team',
          productIdAnnual: 'pdt_0NnLCdgD69GiXDLRJ0K5v'
        },
        {
          id: 'integrator',
          name: 'Integrator / Enterprise',
          seatsLabel: '20–100 seats',
          priceUsd: 1499,
          periodYear: '/ year',
          description: 'For system integrators and plants running segmented or air-gapped factory networks.',
          features: [
            '20 seats (or 100-seat Enterprise Plant option)',
            'Ed25519 signed .lic files for air-gapped cells',
            'Corporate Invoice / SEPA / PO & 0% EU VAT',
            'Priority engineering support on edge cases'
          ],
          ctaLabel: 'Get Integrator',
          productIdAnnual: 'pdt_0Nq5QVTrbkJbWAUf8qoyn',
          isEnterprise: true
        }
      ],
      billingStrip: {
        dodoTitle: 'Billing & invoices by Dodo Payments',
        dodoText: 'Cards, wire transfer, instant PDF tax receipts, and 0% EU VIES Reverse Charge with a valid VAT ID.',
        cancelTitle: '1-click cancellation',
        cancelText: 'Cancel anytime directly inside VS Code (krl.manageSubscription) or in the Customer Portal.',
        refundTitle: '14-day refund guarantee',
        refundText: 'If it does not fit your KUKA workflow, request a refund via the built-in VS Code support chat within 14 days.',
        portalBtn: 'Dodo Customer Portal'
      },
      promoFootnote:
        'Launch code LAUNCH30 (−30%) is applied automatically at checkout. Local EUR/RUB/TRY prices are indicative; checkout settles in USD.',
      procurement: {
        eyebrow: 'B2B & Procurement',
        heading: 'Purchasing for a team or legal entity',
        body: 'Order via Dodo Payments with automated VAT invoicing, or request a formal Purchase Order / SEPA invoice and offline Air-Gap keys for restricted plant networks.',
        points: [
          'Tax PDF receipts, corporate billing details, and EU VIES 0% VAT Reverse Charge.',
          'Signed Ed25519 .lic license files for air-gapped commissioning laptops.',
          'Request a company invoice directly from VS Code via krl.requestCorporateInvoice.'
        ],
        btnPortal: 'Dodo Invoice Portal',
        btnAirGap: 'Air-Gap Portal (.lic)',
        btnVsCodeInvoice: 'Request Invoice in VS Code'
      }
    },
    security: {
      eyebrow: 'Security & Air-Gap',
      heading: 'Built for isolated shop-floor networks',
      subtitle:
        'Your robot programs and cell backups stay on your engineering machine at every step.',
      items: [
        {
          title: '1. 100% local processing',
          body: 'KRL parsing, AST diagnostics, coordinate delta math, and .zip/.wvs inspection execute locally on your workstation CPU/RAM. No robot source code leaves your computer.'
        },
        {
          title: '2. Air-Gap offline licensing',
          body: 'For defense and automotive cells without outbound internet, activate seats with signed Ed25519 .lic files. Online commercial keys also include a 30-day offline grace cache.'
        },
        {
          title: '3. Supply-chain verification',
          body: 'Every release binary is scanned by ReversingLabs Spectra Assure (0 CVE). Documentation, issue tracker, and EULA are publicly available on GitHub.'
        }
      ],
      spectraLink: 'ReversingLabs Spectra Assure report',
      githubLink: 'Public GitHub repository',
      privacyLink: 'Privacy Policy (PRIVACY.md)'
    },
    author: {
      eyebrow: 'About & Direct Contact',
      heading: 'Who builds this tool',
      name: 'Silvestr Liskin (LiskinLabs)',
      role: 'Robotics Commissioning Engineer & Author of KUKA KRL Engineering Toolkit',
      photoSlotNote: 'Author photo slot (/author.jpg)',
      bio1: 'I work on industrial KUKA robotics commissioning and cell software. I built this extension out of day-to-day needs on the shop floor: catching Advance Run stops before loading a pendant, diffing SmartPAD backups cleanly, and inspecting .wvs I/O mappings without waiting for heavy desktop suites.',
      bio2: 'Need a company invoice, help with an unusual KRC archive, or an Air-Gap evaluation for your plant? Reach out via the built-in VS Code support chat or GitHub Issues — I answer personally.',
      channelsHeading: 'Verified support & distribution channels',
      channels: [
        {
          label: 'In-Editor Support Chat (VS Code)',
          detail: 'Run krl.openTelegramChat for direct engineering & B2B billing help',
          href: 'vscode://LiskinLabs.kuka-krl-extension/support',
          external: false
        },
        {
          label: 'GitHub Issues & Discussions',
          detail: 'Public bug reports, KRL parser edge cases, and feature requests',
          href: 'https://github.com/LiskinLabs/kuka-krl-extension/issues',
          external: true
        },
        {
          label: 'VS Code Marketplace',
          detail: 'Official extension listing, changelog, and reviews',
          href: 'https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension',
          external: true
        },
        {
          label: 'Open VSX Registry',
          detail: 'Distribution for Cursor, Windsurf, and VSCodium',
          href: 'https://open-vsx.org/extension/LiskinLabs/kuka-krl-extension',
          external: true
        }
      ]
    },
    footer: {
      brandName: 'LiskinLabs',
      brandDesc: 'Independent engineering tools for KUKA KRL development and static analysis in Visual Studio Code.',
      colProduct: 'Sections',
      colResources: 'Resources',
      colLegal: 'Legal',
      links: {
        workflows: 'Workflows',
        comparison: 'Comparison',
        pricing: 'Pricing',
        security: 'Security & Air-Gap',
        docs: 'Documentation',
        marketplace: 'VS Code Marketplace',
        openVsx: 'Open VSX',
        github: 'GitHub',
        portal: 'Dodo Customer Portal'
      },
      disclaimer:
        'Independent software by LiskinLabs (Silvestr Liskin), not affiliated with KUKA AG or Microsoft Corporation. KUKA, KRL, KRC, KSS, WorkVisual, KUKA.Sim, and SmartPAD are trademarks of KUKA Roboter GmbH. This tool is not safety-certified (Non-SIL / Non-PL) and does not replace physical T1 controller verification.',
      copyright: '© 2024–2026 LiskinLabs (Silvestr Liskin)'
    },
    modals: {
      closeAria: 'Close dialog',
      closeBtn: 'Close',
      trialTitle: '14-day free Pro trial',
      trialSubtitle: 'Evaluate all Pro modules for 14 days with no credit card required.',
      trialSteps: [
        {
          step: '1. Install the extension',
          text: 'Install KRL Engineering Toolkit from the VS Code Marketplace.'
        },
        {
          step: '2. Open Command Palette',
          text: 'Press Ctrl+Shift+P (or Cmd+Shift+P on macOS).'
        },
        {
          step: '3. Start the trial',
          text: 'Run the command krl.startTrial.'
        }
      ],
      trialOpenVsCode: 'Open in VS Code',
      trialGotIt: 'Got it',
      toolModalCategoryLabel: 'Category',
      toolModalCompat: 'Compatible with KSS 5.x–8.7 (KRC2 / KRC4 / KRC5) & iiQKA'
    }
  },

  de: {
    code: 'de',
    label: 'DE',
    skipToContent: 'Zum Hauptinhalt springen',
    header: {
      brandSubtitle: 'KUKA KRL für VS Code',
      navAriaLabel: 'Hauptnavigation',
      navItems: {
        workflows: 'Funktionen',
        comparison: 'Vergleich',
        pricing: 'Preise',
        security: 'Sicherheit',
        docs: 'Dokumentation'
      },
      docsLink: '/de/guide/installation',
      langButtonAria: 'Sprache auswählen',
      themeToggleToLight: 'Zum hellen Design wechseln',
      themeToggleToDark: 'Zum dunklen Design wechseln',
      ctaInstall: 'Kostenlos installieren',
      mobileMenuOpenAria: 'Menü öffnen',
      mobileMenuCloseAria: 'Menü schließen'
    },
    hero: {
      eyebrow: 'Erweiterung für Visual Studio Code · KR C2 / KR C4 / KR C5 (micro / -2) · KSS 5.4–8.7, VSS (VKRC) & iiQKA.OS2 9.0–9.3',
      h1: 'Engineering-Umgebung für KUKA KRL in VS Code: Codeanalyse, Backup-Diff und .wvs-Inspektion',
      subtitle:
        'Erkennen Sie Vorlaufstopps (Advance Run), fehlende BRAKE-Befehle und verschobene SmartPAD-Punkte vor der Übertragung auf die Steuerung. Öffnen Sie .zip-Backups und WorkVisual-Projekte (.wvs) direkt in VS Code — lokal und ohne Cloud.',
      ctaInstall: 'In VS Code installieren',
      ctaTrial: '14 Tage Pro testen',
      copyLabel: 'Kopieren',
      copiedLabel: 'Kopiert',
      copyCliAria: 'VS-Code-CLI-Installationsbefehl kopieren',
      factsLine: 'Geprüft an 108 realen Backups (4,13 Mio. Zeilen KRL) · Kostenloser Basis-Editor · Komplett offline',
      viewModeScreenshots: 'VS Code Screenshots',
      viewMode3d: '3D-Bahnvorschau',
      simFrameTitle: 'KUKA KRL 3D-Bahnvorschau',
      simHint: 'Lokaler Bahn-Viewer. Wird erst beim Wechsel auf diesen Tab geladen.',
      mediaSlides: [
        {
          id: 'control-center',
          label: 'Control Center',
          caption: 'KUKA KRL Control Center und Workspace-Diagnose direkt in Visual Studio Code',
          src: '/media/kuka_control_center.gif',
          alt: 'KUKA KRL Control Center in Visual Studio Code'
        },
        {
          id: 'backup-diff',
          label: '.zip Backup-Diff',
          caption: 'SmartPAD-Archive (.zip / KRCDiag) vergleichen und 6D-E6POS-Deltas ohne Entpacken berechnen',
          src: '/media/krc_backup_diff.gif',
          alt: 'KRC-Backup-Vergleich und E6POS-Koordinatendeltas in VS Code'
        },
        {
          id: 'io-signals',
          label: 'E/A-Signale',
          caption: 'Hardware-E/A-Inspektor ($IN/$OUT) und Inline-Inlay-Hints für Signalkommentare',
          src: '/media/krl_io_signals.gif',
          alt: 'KRL E/A-Signalinspektor und Inlay-Hints'
        },
        {
          id: 'autocomplete',
          label: 'LSP & Typen',
          caption: 'Autovervollständigung für 957 KSS-Systemvariablen und F12-Navigation zwischen .src und .dat',
          src: '/media/smart_autocomplete.gif',
          alt: 'Intelligente Autovervollständigung für KUKA KRL'
        }
      ]
    },
    workflows: {
      eyebrow: 'Kern-Workflows',
      heading: 'Drei Arbeitsabläufe, die Stunden bei der Inbetriebnahme sparen',
      subtitle:
        'Entwickelt für typische Aufgaben auf der Baustelle: geteachte Punkte nach Schichten abgleichen, KRL-Logik vorab prüfen und WorkVisual-Dateien ohne Wartezeit einsehen.',
      w1: {
        badge: 'Workflow 01 · SmartPAD-Backups',
        title: '.zip / KRCDiag-Backups vergleichen und E6POS-Deltas ohne Entpacken prüfen',
        body: 'Hängen Sie Steuerungsarchive (.zip, .ibz, KRCDiag) direkt in VS Code ein oder vergleichen Sie zwei Stände nebeneinander. Nach Punktänderungen am SmartPAD berechnet das Tool die 6D-Abweichungen (ΔX, ΔY, ΔZ, ΔA, ΔB, ΔC) im Standard-Diff.',
        bullets: [
          'Läuft vollständig im Arbeitsspeicher — keine temporären Ordner auf dem Notebook.',
          'Hebt E6POS-Änderungen in .dat-Dateien hervor und trennt Bahnanpassungen von Kopfdaten.',
          'Integrierter Offline-Decoder für binäre .evt-Ereignisprotokolle (EVTX).'
        ],
        mediaSrc: '/media/krc_backup_diff.gif',
        mediaAlt: 'Vergleich von SmartPAD-Backups in VS Code',
        mediaCaption: 'Aufnahme aus VS Code: KRC-Backup-Diff und Punktdeltas'
      },
      w2: {
        badge: 'Workflow 02 · Statische Prüfung & Diff-Fix',
        title: 'Statische KRL-Prüfung und sichere Korrekturen im VS Code Diff',
        body: 'Findet häufige KSS-Fehler vor der Inbetriebnahme: $OUT-Befehle, die den Vorlauf stoppen, fehlendes BRAKE vor RESUME, Bewegungen in DRYRUN ... ENDDRYRUN, nicht gesetzte $TOOL/$BASE-Frames, UTF-8-BOM (auf iiQKA.OS2 unzulässig) und Migrationsfehler KSS 5.4–9.3 / iiQKA.OS2 (PDAT/LDAT ohne VEL, SVEL_CP2, MotionParamSets.dat). Alle Fixes erscheinen im Diff unter Erhalt aller ;%{PE}-Inline-Forms.',
        bullets: [
          'Erhält Inline-Form-Prüfsummen (;FOLD ... ;%{PE}) sowie UTF-8 ohne BOM (iiQKA.OS2), CP1251 und Windows-1252.',
          'Prüft DRYRUN ... ENDDRYRUN, Blockbalance, $IN/$OUT/$FLAG/$TIMER-Grenzen, SPS.SUB, VASS 26 / VKRC und PDAT/LDAT-Migration.',
          'Erklärt die konkrete Auswirkung auf der Robotersteuerung.'
        ],
        diffHeading: 'Vorher / Nachher-Beispiele mit technischer Auswirkung',
        mediaSrc: '/media/type-validation-demo.gif',
        mediaAlt: 'Statische KRL-Diagnose in VS Code',
        mediaCaption: 'Aufnahme aus VS Code: KRL-Diagnose und Quick-Fixes',
        scenarios: [
          {
            id: 'advance_run',
            tabLabel: 'Vorlaufstopp ($OUT)',
            issueTitle: 'Impliziter Vorlaufstopp in überschliffener Bahn',
            consequence:
              'Ein direktes $OUT[12] zwischen C_DIS-Bewegungen löst einen Vorlaufstopp aus. Der Roboter hält am Überschleifpunkt kurz an, statt die Bahn flüssig fortzusetzen.',
            beforeLabel: 'Vorher: impliziter Vorlaufstopp',
            afterLabel: 'Nachher: synchronisierter TRIGGER',
            beforeCode: `LIN XPICK_APPROACH C_DIS\n$OUT[12] = TRUE ; Vorlaufstopp: Roboter bremst vor nächstem Punkt\nLIN XPICK_PART`,
            afterCode: `LIN XPICK_APPROACH C_DIS\nTRIGGER WHEN DISTANCE=0 DELAY=0 DO $OUT[12] = TRUE\nLIN XPICK_PART ; C_DIS-Überschleifen bleibt aktiv`
          },
          {
            id: 'missing_brake',
            tabLabel: 'Fehlendes BRAKE vor RESUME',
            issueTitle: 'Ungeplantes Zu-Ende-Fahren & Stackfehler (KSS 1584)',
            consequence:
              'Ein RESUME ohne vorheriges BRAKE (oder INTERRUPT WITH BRAKE) löst einen Vorlaufstopp aus: Der Roboter fährt den aktiven Satz noch zu Ende, statt sofort zu bremsen; bei falscher Stacktiefe bzw. $ADVANCE=0 folgt KSS 1584.',
            beforeLabel: 'Vorher: BRAKE vor RESUME fehlt',
            afterLabel: 'Nachher: kontrollierter Stopp vor RESUME',
            beforeCode: `DEF PART_SEARCH_ISR()\n  INTERRUPT OFF 10\n  RESUME ; Risiko: Satz wird ohne BRAKE zu Ende gefahren (und KSS 1584 bei Stackfehler)\nEND`,
            afterCode: `DEF PART_SEARCH_ISR()\n  INTERRUPT OFF 10\n  BRAKE  ; Aktuelle Bewegung sofort anhalten (oder INTERRUPT WITH BRAKE)\n  RESUME ; Sauberer Rücksprung\nEND`
          },
          {
            id: 'fold_bom',
            tabLabel: 'UTF-8 BOM & ;FOLD',
            issueTitle: 'Beschädigte Inline-Form-Header und Zeichenkodierung',
            consequence:
              'Standardeditoren fügen oft ein UTF-8 BOM ein oder entfernen ;%{PE}-Parameter, was auf dem SmartPAD oder dem iiQKA.OS2-Compiler zu Fehlern führt.',
            beforeLabel: 'Vorher: verlorene ;%{PE}-Parameter',
            afterLabel: 'Nachher: gültige ;FOLD-Struktur & CRLF',
            beforeCode: `; Editor hat ;%{PE}-Parameter entfernt\n;FOLD INI\n  BAS (#INITMOV,0 )\n;ENDFOLD (INI)`,
            afterCode: `; Gültiger KRL-Header mit CRLF ohne BOM\n;FOLD INI;%{PE}%R 8.6.1,%MKUKATPBASIS,%CINITMOV,%VINITMOV,%P 1:INITMOV, 2:0\n  BAS (#INITMOV,0 )\n;ENDFOLD (INI)`
          }
        ]
      },
      w3: {
        badge: 'Workflow 03 · .wvs, .vcmx & Live-Monitor',
        title: 'WorkVisual (.wvs), KUKA.Sim (.vcmx), iiQKA EKI/RSI 6.x & Live-Monitor',
        body: 'Öffnen Sie .wvs-Archive zur Prüfung von EtherCAT/PROFINET-Topologien, exportieren Sie E/A-Listen nach TIA Portal, TwinCAT 3 oder EPLAN und generieren Sie iiQKA.EthernetKRL 6.x & iiQKA.RSI 6.x Code. Im Anlagennetz stehen WCF (49002), iiQKA gRPC (443), OPC UA Probe (4840) und KUKAVARPROXY (7000) bereit.',
        bullets: [
          'Prüfen von .wvs-Feldbussen, KOP-Paketen und iiQKA.EthernetKRL 6.x / iiQKA.RSI 6.x auf Windows, macOS oder Linux ohne WorkVisual.',
          'Auslesen von bis zu 4.096 E/A-Signalen mit CFG-Filter (KrcIoSignals.xml) und Texten aus UserTexts.kxr / $config.dat.',
          'Zugangsdaten liegen pro Host verschlüsselt im VS Code SecretStorage.'
        ],
        mediaSrc: '/media/krl_io_signals.gif',
        mediaAlt: 'E/A-Signalinspektor in VS Code',
        mediaCaption: 'Aufnahme aus VS Code: E/A-Signaltabelle und Projektkommentare'
      }
    },
    comparison: {
      eyebrow: 'Ehrlicher Vergleich',
      heading: 'Abgrenzung zu Syntax-Highlightern und WorkVisual',
      subtitle:
        'Jedes Werkzeug hat seinen Platz. Die Übersicht zeigt genau, wo das Toolkit ergänzt und wo WorkVisual Pflicht bleibt.',
      tableCaption: 'Vergleich von TextMate-Syntax, KUKA WorkVisual und KUKA KRL Toolkit',
      colCapability: 'Aufgabe',
      colPlain: 'Einfache KRL-Syntax (TextMate)',
      colWorkVisual: 'KUKA WorkVisual / iiQWorks.Sim',
      colToolkit: 'KUKA KRL Toolkit (Community / Pro)',
      rows: [
        {
          feature: 'Plattformen',
          plainSyntax: 'Windows / macOS / Linux',
          workVisual: 'Nur Windows',
          krlToolkit: 'Windows / macOS / Linux (VS Code, Cursor)'
        },
        {
          feature: 'F12-Navigation (.src ↔ .dat) & Umbenennen',
          plainSyntax: 'Nein',
          workVisual: 'Basis-Navigation',
          krlToolkit: 'Vollständiger LSP, Referenzen, Call Hierarchy (Community)'
        },
        {
          feature: 'Prüfung auf Advance Run, BRAKE, ;FOLD & VASS 26',
          plainSyntax: 'Nein',
          workVisual: 'Teilweise beim Build',
          krlToolkit: 'Echtzeit-Analyse & Diff-Korrektur (Pro)'
        },
        {
          feature: '.zip Backup-Diff & E6POS-Deltas ohne Entpacken',
          plainSyntax: 'Nein',
          workVisual: 'Projektimport erforderlich',
          krlToolkit: 'In-Memory-Mount & 6D-Deltas < 80 ms (Pro)'
        },
        {
          feature: 'WorkVisual (.wvs) Topologie & E/A-Export',
          plainSyntax: 'Nein',
          workVisual: 'Natives Format',
          krlToolkit: 'Lesen & Export nach TIA / TwinCAT / EPLAN (Pro)'
        },
        {
          feature: 'Feldbus-Konfiguration & Projekt-Deployment',
          plainSyntax: 'Nein',
          workVisual: 'Hauptzweck',
          krlToolkit: 'Nicht unterstützt — WorkVisual erforderlich'
        },
        {
          feature: 'Sicherheitszertifizierung (SIL / PL)',
          plainSyntax: 'Nein',
          workVisual: 'SafeOperation-Konfiguration',
          krlToolkit: 'Keine Sicherheitssoftware (Non-SIL / Non-PL)'
        }
      ],
      honestNoteTitle: 'Klare Abgrenzung',
      honestNoteBody:
        'Das KUKA KRL Toolkit ersetzt WorkVisual nicht für Buskonfiguration, SafeOperation oder den Projekt-Deploy und ist keine zertifizierte Sicherheitssoftware (Non-SIL). Es beschleunigt Review, Backup-Abgleich und Codevorbereitung.'
    },
    capabilities: {
      eyebrow: 'Funktionsmodule',
      heading: 'Die wichtigsten Werkzeuge auf einen Blick',
      subtitle:
        'Beginnen Sie mit den 8 Hauptmodulen oder blenden Sie bei Bedarf die vollständige VS-Code-Befehlsliste ein.',
      featuredHeading: 'Hauptmodule',
      showAllBtn: 'Alle Funktionen anzeigen',
      collapseBtn: 'Auf Hauptmodule reduzieren',
      registryNote:
        'Die erweiterte Ansicht zeigt alle technischen Befehle und Einstellungen aus dem VS-Code-Erweiterungsmanifest.',
      searchPlaceholder: 'Nach Name oder Befehls-ID filtern (z. B. backup, spline)...',
      searchAria: 'Funktionen filtern',
      allCategoryLabel: 'Alle Kategorien',
      emptyResults: 'Keine passenden Einträge gefunden.',
      viewDemoBtn: 'Details',
      badgeFree: 'Community',
      badgePro: 'Pro',
      featured: [
        {
          id: 'krl.compareKrcBackup',
          title: 'KRC Backup-Diff (.zip / KRCDiag)',
          category: 'Backups & Archive',
          tier: 'Pro',
          description: 'Archive ohne Entpacken vergleichen und 6D-E6POS-Deltas prüfen.',
          commandId: 'krl.compareKrcBackup',
          mediaSrc: '/media/krc_backup_diff.gif',
          mediaAlt: 'KRC Backup-Diff in VS Code'
        },
        {
          id: 'krl.fixAllSafeIssuesInFile',
          title: 'Statische KRL-Prüfung & Diff-Fix',
          category: 'Diagnose',
          tier: 'Pro',
          description: 'Vorlaufstopps, fehlendes BRAKE, UTF-8 BOM und VASS 26 per Diff beheben.',
          commandId: 'krl.fixAllSafeIssuesInFile',
          mediaSrc: '/media/type-validation-demo.gif',
          mediaAlt: 'Statische KRL-Diagnose in VS Code'
        },
        {
          id: 'krl.inspectFieldbusTopology',
          title: 'WorkVisual (.wvs) & E/A-Export',
          category: 'Feldbus & Integration',
          tier: 'Pro',
          description: 'EtherCAT/PROFINET-Topologie lesen und nach TIA Portal, TwinCAT und EPLAN exportieren.',
          commandId: 'krl.inspectFieldbusTopology',
          mediaSrc: '/media/krl_io_signals.gif',
          mediaAlt: 'E/A-Signalinspektor'
        },
        {
          id: 'krl.live.openDashboard',
          title: 'Live-Monitor (WCF / KVP / iiQKA)',
          category: 'Steuerungsverbindung',
          tier: 'Pro',
          description: 'Live-Abfrage von $TOOL/$BASE, Achsmomenten und 4.096 E/As über WCF, KVP oder gRPC.',
          commandId: 'krl.live.openDashboard',
          mediaSrc: '/media/kuka_control_center.gif',
          mediaAlt: 'Control Center in VS Code'
        },
        {
          id: 'krl.showFlowchart',
          title: 'Interaktiver Ablaufplan',
          category: 'Logikanalyse',
          tier: 'Pro',
          description: 'Programmfluss für IF, SWITCH, LOOP mit Klick-Navigation und SVG-Export.',
          commandId: 'krl.showFlowchart',
          mediaSrc: '/media/control_flow_graph.gif',
          mediaAlt: 'Interaktiver Ablaufplan'
        },
        {
          id: 'krl.openEventLog',
          title: 'Binärer .evt-Log-Decoder',
          category: 'Backups & Archive',
          tier: 'Pro',
          description: 'Offline-Analyse von KUKA .evt-Ereignisprotokollen in 6 Sprachen.',
          commandId: 'krl.openEventLog',
          mediaSrc: '/media/kuka_control_center.gif',
          mediaAlt: 'Ereignisprotokoll-Analyse'
        },
        {
          id: 'krl.lspCore',
          title: 'KRL Language Server & F12',
          category: 'Basis-Editor',
          tier: 'Free',
          description: 'Kostenlose Vervollständigung für 957 Systemvariablen, F12-Sprünge und 6 Themes.',
          commandId: 'krl.sortDeclarations',
          mediaSrc: '/media/smart_autocomplete.gif',
          mediaAlt: 'KRL Autovervollständigung'
        },
        {
          id: 'krl.cleanupUnusedVariables',
          title: 'Totcode- & Variablenbereinigung',
          category: 'Diagnose',
          tier: 'Pro',
          description: 'Ungenutzte Variablen und nicht erreichbare Zweige vor Abnahme bereinigen.',
          commandId: 'krl.cleanupUnusedVariables',
          mediaSrc: '/media/dead-code-demo.gif',
          mediaAlt: 'Totcode-Analyse in VS Code'
        }
      ],
      categoryNames: { All: 'Alle Kategorien' },
      typeNames: {}
    },
    pricing: {
      eyebrow: 'Preise & Lizenzen',
      heading: 'Klare Lizenzmodelle für Einzelplätze und Teams',
      subtitle:
        'Der Basis-Editor ist für Ausbildung und nicht-kommerzielle Nutzung kostenlos. Für gewerbliche Inbetriebnahme und Pro-Module ist eine Lizenz erforderlich.',
      billingAnnual: 'Jährlich',
      billingMonthly: 'Monatlich',
      currencyAria: 'Währung auswählen',
      openingCheckout: 'Checkout wird geöffnet...',
      lifetimeNotePrefix: 'Alternativ als Einmalkauf für 1 Arbeitsplatz: ',
      lifetimeLinkLabel: 'Pro Lifetime',
      lifetimeNoteSuffix: ' ohne laufende Verlängerung.',
      enterprise100Note: 'Werksweite Lizenzen bis 100 Plätze sind über Enterprise Plant ($4.999 / Jahr auf Rechnung) verfügbar.',
      tiers: [
        {
          id: 'community',
          name: 'Community',
          seatsLabel: 'Dauerhaft kostenlos',
          freeLabel: 'Kostenlos',
          periodYear: '',
          description: 'KRL-Editor für Studium, private Projekte und 30-tägige interne Evaluierung.',
          features: [
            'KRL-Syntaxhervorhebung & 6 Werkhallen-Themes',
            'LSP-Autovervollständigung (957 Variablen, 116 Funktionen)',
            'F12-Navigation zwischen .src/.dat & FOLD/UNFOLD',
            'Unbegrenzte Dateigröße & Basissyntaxprüfung'
          ],
          ctaLabel: 'Kostenlos installieren',
          isCommunity: true
        },
        {
          id: 'pro',
          name: 'Engineer Pro',
          badge: 'Empfohlen',
          seatsLabel: '1 Arbeitsplatz',
          priceUsd: 149,
          monthlyUsd: 19,
          periodYear: '/ Jahr',
          periodMonth: '/ Monat',
          description: 'Alle Pro-Werkzeuge für Inbetriebnahme und Audit. 14 Tage kostenlos ohne Kreditkarte.',
          features: [
            'Vorlaufstopp-, BRAKE-, VASS-26- & Diff-Reparatur',
            '.zip Backup-Diff ohne Entpacken & 6D-Deltas',
            '.wvs-, .vcmx-, .evt-Decoder & Ablaufpläne',
            'Live-Bridge & 30 Tage Offline-Lizenzcache'
          ],
          ctaLabel: 'Pro wählen',
          productIdAnnual: 'pdt_0NmAV012KFHSjUMyDomJ6',
          productIdMonthly: 'pdt_0NmAUzwdbzeERSktsOLTp',
          isPrimary: true
        },
        {
          id: 'team',
          name: 'Team',
          seatsLabel: 'Bis zu 5 Plätze',
          priceUsd: 499,
          periodYear: '/ Jahr',
          description: 'Für Inbetriebnahmeteams mit zentraler Firmenrechnung.',
          features: [
            'Bis zu 5 Arbeitsstationen',
            'Voller Engineer-Pro-Funktionsumfang',
            'Einzelne Firmenrechnung & Platzverwaltung',
            'Air-Gap-Aktivierung (.lic) unterstützt'
          ],
          ctaLabel: 'Team wählen',
          productIdAnnual: 'pdt_0NnLCdgD69GiXDLRJ0K5v'
        },
        {
          id: 'integrator',
          name: 'Integrator / Enterprise',
          seatsLabel: '20–100 Plätze',
          priceUsd: 1499,
          periodYear: '/ Jahr',
          description: 'Für Systemintegratoren und Werke mit abgeschotteten OT-Netzen.',
          features: [
            '20 Plätze (optional 100 Plätze für ganze Werke)',
            'Signierte Ed25519 .lic-Dateien für Air-Gap-Zellen',
            'Rechnungskauf (Invoice / SEPA / PO) & 0 % EU-MwSt.',
            'Priorisierter Engineering-Support'
          ],
          ctaLabel: 'Integrator wählen',
          productIdAnnual: 'pdt_0Nq5QVTrbkJbWAUf8qoyn',
          isEnterprise: true
        }
      ],
      billingStrip: {
        dodoTitle: 'Abrechnung über Dodo Payments',
        dodoText: 'Kreditkarte, Überweisung, automatische PDF-Rechnungen und 0 % EU-Reverse-Charge mit gültiger USt-IdNr.',
        cancelTitle: 'Kündigung mit 1 Klick',
        cancelText: 'Jederzeit direkt in VS Code (krl.manageSubscription) oder im Kundenportal kündbar.',
        refundTitle: '14 Tage Geld-zurück',
        refundText: 'Falls das Tool nicht zu Ihrer KUKA-Umgebung passt, erstatten wir innerhalb von 14 Tagen über den VS-Code-Supportchat.',
        portalBtn: 'Dodo Kundenportal'
      },
      promoFootnote:
        'Der Einführungscode LAUNCH30 (−30 %) wird im Checkout automatisch angewendet. Anzeigen in EUR/RUB/TRY dienen als Richtwert; abgerechnet wird in USD.',
      procurement: {
        eyebrow: 'B2B & Einkauf',
        heading: 'Beschaffung für Teams und Unternehmen',
        body: 'Direkte Abwicklung über Merchant of Record Dodo Payments mit automatischem EU-VAT-Beleg oder Rechnungsstellung (Invoice / SEPA / PO) inklusive Air-Gap-Dateien.',
        points: [
          'Offizielle PDF-Rechnungen und 0 % EU-Reverse-Charge via VIES.',
          'Offline-Lizenzdateien (.lic, Ed25519) für Zellen ohne Internetzugang.',
          'Rechnungsanfrage direkt aus VS Code per krl.requestCorporateInvoice.'
        ],
        btnPortal: 'Dodo Rechnungsportal',
        btnAirGap: 'Air-Gap-Portal (.lic)',
        btnVsCodeInvoice: 'Rechnung in VS Code anfragen'
      }
    },
    security: {
      eyebrow: 'Sicherheit & Air-Gap',
      heading: 'Konzipiert für abgeschottete Werksnetze',
      subtitle: 'Ihr KRL-Quellcode und Ihre Steuerungsbackups verlassen Ihren Rechner nicht.',
      items: [
        {
          title: '1. 100 % lokale Verarbeitung',
          body: 'Parsing, AST-Diagnose, Deltaberechnung und .zip/.wvs-Analyse laufen ausschließlich lokal auf Ihrer Arbeitsstation.'
        },
        {
          title: '2. Air-Gap-Lizenzierung',
          body: 'Für isolierte Fertigungsnetze stehen signierte Ed25519-.lic-Dateien bereit. Online-Lizenzen nutzen zudem einen 30-Tage-Offline-Cache.'
        },
        {
          title: '3. Geprüfte Lieferkette',
          body: 'Jedes Release wird mit ReversingLabs Spectra Assure (0 CVE) geprüft. Dokumentation und Issue-Tracker sind öffentlich auf GitHub einsehbar.'
        }
      ],
      spectraLink: 'ReversingLabs Spectra Assure Bericht',
      githubLink: 'Öffentliches GitHub-Repository',
      privacyLink: 'Datenschutz (PRIVACY.md)'
    },
    author: {
      eyebrow: 'Entwickler & Kontakt',
      heading: 'Wer hinter dem Werkzeug steht',
      name: 'Silvestr Liskin (LiskinLabs)',
      role: 'Robotik-Ingenieur & Entwickler von KUKA KRL Engineering Toolkit',
      photoSlotNote: 'Platzhalter für Autorenfoto (/author.jpg)',
      bio1: 'Ich arbeite in der Inbetriebnahme von KUKA-Industrierobotern und Zellensoftware. Dieses Werkzeug entstand aus dem täglichen Bedarf auf der Baustelle: Vorlaufstopps vor dem SmartPAD-Test finden, Backups sauber abgleichen und .wvs-Signale ohne schwerfällige Desktop-Suiten prüfen.',
      bio2: 'Benötigen Sie ein B2B-Angebot, Hilfe bei einem speziellen KRC-Archiv oder einen Air-Gap-Test? Melden Sie sich direkt über den integrierten VS-Code-Supportchat oder GitHub Issues.',
      channelsHeading: 'Direkte Kanäle & Bezugsquellen',
      channels: [
        {
          label: 'Support-Chat direkt in VS Code',
          detail: 'Befehl krl.openTelegramChat für technische Fragen und B2B-Rechnungen',
          href: 'vscode://LiskinLabs.kuka-krl-extension/support',
          external: false
        },
        {
          label: 'GitHub Issues & Diskussionen',
          detail: 'Fehlerberichte, KRL-Sonderfälle und Funktionswünsche',
          href: 'https://github.com/LiskinLabs/kuka-krl-extension/issues',
          external: true
        },
        {
          label: 'VS Code Marketplace',
          detail: 'Offizielle Erweiterungsseite und Release-Verlauf',
          href: 'https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension',
          external: true
        },
        {
          label: 'Open VSX Registry',
          detail: 'Für Cursor, Windsurf und VSCodium',
          href: 'https://open-vsx.org/extension/LiskinLabs/kuka-krl-extension',
          external: true
        }
      ]
    },
    footer: {
      brandName: 'LiskinLabs',
      brandDesc: 'Unabhängige Entwicklungswerkzeuge für KUKA KRL in Visual Studio Code.',
      colProduct: 'Bereiche',
      colResources: 'Ressourcen',
      colLegal: 'Rechtliches',
      links: {
        workflows: 'Funktionen',
        comparison: 'Vergleich',
        pricing: 'Preise',
        security: 'Sicherheit & Air-Gap',
        docs: 'Dokumentation',
        marketplace: 'VS Code Marketplace',
        openVsx: 'Open VSX',
        github: 'GitHub',
        portal: 'Dodo Kundenportal'
      },
      disclaimer:
        'Unabhängige Software von LiskinLabs (Silvestr Liskin), nicht verbunden mit der KUKA AG oder Microsoft Corporation. KUKA, KRL, KRC, KSS, WorkVisual, KUKA.Sim und SmartPAD sind Marken der KUKA Roboter GmbH. Keine zertifizierte Sicherheitssoftware (Non-SIL / Non-PL); ersetzt keine Prüfung im T1-Betrieb an der realen Steuerung.',
      copyright: '© 2024–2026 LiskinLabs (Silvestr Liskin)'
    },
    modals: {
      closeAria: 'Dialog schließen',
      closeBtn: 'Schließen',
      trialTitle: '14 Tage Pro kostenlos testen',
      trialSubtitle: 'Alle Pro-Module 14 Tage lang ohne Kreditkarte testen.',
      trialSteps: [
        { step: '1. Erweiterung installieren', text: 'Installieren Sie KRL Engineering Toolkit über den VS Code Marketplace.' },
        { step: '2. Befehlspalette öffnen', text: 'Drücken Sie Strg+Umschalt+P (bzw. Cmd+Umschalt+P unter macOS).' },
        { step: '3. Testphase starten', text: 'Führen Sie den Befehl krl.startTrial aus.' }
      ],
      trialOpenVsCode: 'In VS Code öffnen',
      trialGotIt: 'Verstanden',
      toolModalCategoryLabel: 'Kategorie',
      toolModalCompat: 'Kompatibel mit KSS 5.x–8.7 (KRC2 / KRC4 / KRC5) & iiQKA'
    }
  },

  tr: {
    code: 'tr',
    label: 'TR',
    skipToContent: 'Ana içeriğe atla',
    header: {
      brandSubtitle: 'VS Code için KUKA KRL',
      navAriaLabel: 'Ana gezinme',
      navItems: {
        workflows: 'Özellikler',
        comparison: 'Karşılaştırma',
        pricing: 'Fiyatlar',
        security: 'Güvenlik',
        docs: 'Dokümantasyon'
      },
      docsLink: '/tr/guide/installation',
      langButtonAria: 'Arayüz dilini seçin',
      themeToggleToLight: 'Açık temaya geç',
      themeToggleToDark: 'Koyu temaya geç',
      ctaInstall: 'Ücretsiz Kur',
      mobileMenuOpenAria: 'Menüyü aç',
      mobileMenuCloseAria: 'Menüyü kapat'
    },
    hero: {
      eyebrow: 'Visual Studio Code Eklentisi · KR C2 / KR C4 / KR C5 (micro / -2) · KSS 5.4–8.7, VSS (VKRC) ve iiQKA.OS2 9.0–9.3',
      h1: 'VS Code içinde KUKA KRL mühendislik ortamı: kod analizi, yedek karşılaştırma ve .wvs inceleme',
      subtitle:
        'Programı kontrolöre yüklemeden önce Advance Run duruşlarını, eksik BRAKE komutlarını ve SmartPAD nokta kaymalarını yakalayın. .zip yedeklerini ve WorkVisual (.wvs) projelerini doğrudan VS Code’da açın — tamamen yerel ve bulutsuz.',
      ctaInstall: 'VS Code’da Kur',
      ctaTrial: '14 Gün Pro Dene',
      copyLabel: 'Kopyala',
      copiedLabel: 'Kopyalandı',
      copyCliAria: 'VS Code CLI kurulum komutunu kopyala',
      factsLine: '108 gerçek robot yedeği (4,13M satır KRL) üzerinde doğrulandı · Ücretsiz temel editör · %100 çevrimdışı',
      viewModeScreenshots: 'VS Code Ekranları',
      viewMode3d: '3D Yörünge Görünümü',
      simFrameTitle: 'KUKA KRL 3D Yörünge Önizlemesi',
      simHint: 'Yerel yörünge görüntüleyici. Yalnızca bu sekmeye geçildiğinde yüklenir.',
      mediaSlides: [
        {
          id: 'control-center',
          label: 'Control Center',
          caption: 'Visual Studio Code içinde KUKA KRL Control Center ve çalışma alanı teşhisi',
          src: '/media/kuka_control_center.gif',
          alt: 'VS Code içinde KUKA KRL Control Center'
        },
        {
          id: 'backup-diff',
          label: '.zip Yedek Diff',
          caption: 'SmartPAD arşivlerini (.zip / KRCDiag) açmadan karşılaştırma ve 6D E6POS nokta deltası',
          src: '/media/krc_backup_diff.gif',
          alt: 'VS Code içinde KRC yedek karşılaştırması'
        },
        {
          id: 'io-signals',
          label: 'I/O Sinyalleri',
          caption: '$IN/$OUT sinyal denetçisi ve satır içi sinyal ipuçları (Inlay Hints)',
          src: '/media/krl_io_signals.gif',
          alt: 'KRL I/O sinyal denetçisi'
        },
        {
          id: 'autocomplete',
          label: 'LSP ve Tipler',
          caption: '957 KSS sistem değişkeni için otomatik tamamlama ve .src/.dat arası F12 geçişi',
          src: '/media/smart_autocomplete.gif',
          alt: 'KUKA KRL akıllı otomatik tamamlama'
        }
      ]
    },
    workflows: {
      eyebrow: 'Temel Senaryolar',
      heading: 'Devreye almada saatler kazandıran üç temel iş akışı',
      subtitle:
        'Sahadaki gerçek ihtiyaçlar için tasarlandı: vardiya sonrası değişen noktaları görmek, kodu önceden denetlemek ve ağır araçları açmadan .wvs projelerini incelemek.',
      w1: {
        badge: 'Senaryo 01 · SmartPAD Yedekleri',
        title: '.zip / KRCDiag yedeklerini klasöre çıkarmadan karşılaştırma ve E6POS deltaları',
        body: 'Kontrolör arşivlerini (.zip, .ibz, KRCDiag) doğrudan VS Code’da bağlayın veya iki sürümü yan yana karşılaştırın. Operatör SmartPAD üzerinden nokta güncellediğinde sistem 6 eksenli farkları (ΔX, ΔY, ΔZ, ΔA, ΔB, ΔC) standart Diff ekranında gösterir.',
        bullets: [
          'Tamamen bellekte çalışır — diskinizde geçici klasör birikmez.',
          '.dat dosyalarındaki E6POS kaymalarını başlık değişikliklerinden ayırır.',
          'İkili .evt (EVTX) olay günlüklerini çevrimdışı çözer ve KSS kodlarını açıklar.'
        ],
        mediaSrc: '/media/krc_backup_diff.gif',
        mediaAlt: 'VS Code içinde SmartPAD yedek karşılaştırması',
        mediaCaption: 'VS Code kaydı: KRC yedek farkı ve nokta deltaları'
      },
      w2: {
        badge: 'Senaryo 02 · Statik Denetim ve Diff Düzeltme',
        title: 'KRL mantık denetimi ve Diff önizlemeli güvenli düzeltmeler',
        body: 'Dosyalar kontrolöre gitmeden önce yaygın hataları bulur: Advance Run durduran $OUT satırları, RESUME öncesi eksik BRAKE, DRYRUN ... ENDDRYRUN içi hareket, tanımsız $TOOL/$BASE, UTF-8 BOM (iiQKA.OS2 reddeder) ve KSS 5.4–9.3 / iiQKA.OS2 geçiş farkları (VEL içermeyen PDAT/LDAT, SVEL_CP2, MotionParamSets.dat). Düzeltmeler ;%{PE} formlarını bozmadan Diff olarak sunulur.',
        bullets: [
          'Inline-Form sağlama toplamlarını (;FOLD ... ;%{PE}) ve BOM olmadan UTF-8 (iiQKA.OS2), CP1251 ve Windows-1252 kodlamalarını korur.',
          'DRYRUN ... ENDDRYRUN, blok dengesi, $IN/$OUT/$FLAG/$TIMER sınırları, SPS.SUB, VASS 26 / VKRC ve PDAT/LDAT geçişini denetler.',
          'Her uyarının kontrolör üzerindeki teknik etkisini açıklar.'
        ],
        diffHeading: 'Teknik açıklamalı Önce / Sonra örnekleri',
        mediaSrc: '/media/type-validation-demo.gif',
        mediaAlt: 'VS Code içinde statik KRL doğrulama',
        mediaCaption: 'VS Code kaydı: KRL statik teşhis ve hızlı düzeltmeler',
        scenarios: [
          {
            id: 'advance_run',
            tabLabel: 'Advance Run ($OUT)',
            issueTitle: 'Yumuşatılmış yörüngede örtülü ön okuma duruşu',
            consequence:
              'C_DIS hareketi içindeki doğrudan $OUT[12] ataması Advance Run işaretçisini durdurur; robot geçiş noktasında akıcı devam etmek yerine kısa süreli duraklar.',
            beforeLabel: 'Önce: Advance Run duruşu',
            afterLabel: 'Sonra: TRIGGER ile senkronize',
            beforeCode: `LIN XPICK_APPROACH C_DIS\n$OUT[12] = TRUE ; Advance Run durur: robot sonraki noktada bekler\nLIN XPICK_PART`,
            afterCode: `LIN XPICK_APPROACH C_DIS\nTRIGGER WHEN DISTANCE=0 DELAY=0 DO $OUT[12] = TRUE\nLIN XPICK_PART ; C_DIS geçişi kesintisiz sürer`
          },
          {
            id: 'missing_brake',
            tabLabel: 'RESUME öncesi eksik BRAKE',
            issueTitle: 'Segmentin devam etmesi ve yığın hatası (KSS 1584)',
            consequence:
              'Kesme (interrupt) içinde BRAKE (veya INTERRUPT WITH BRAKE) olmadan RESUME çağırmak ön okuma duruşu tetikler: robot anında frenlemek yerine aktif hareketi tamamlar ve $ADVANCE=0 / yığın kuralları bozulursa KSS 1584 oluşur.',
            beforeLabel: 'Önce: RESUME öncesi BRAKE eksik',
            afterLabel: 'Sonra: RESUME öncesi BRAKE',
            beforeCode: `DEF PART_SEARCH_ISR()\n  INTERRUPT OFF 10\n  RESUME ; Risk: BRAKE olmadan aktif hareket sürer (yığın hatasında KSS 1584)\nEND`,
            afterCode: `DEF PART_SEARCH_ISR()\n  INTERRUPT OFF 10\n  BRAKE  ; Mevcut hareketi hemen durdur (veya INTERRUPT WITH BRAKE)\n  RESUME ; Kesmeden güvenli çıkış\nEND`
          },
          {
            id: 'fold_bom',
            tabLabel: 'UTF-8 BOM ve ;FOLD',
            issueTitle: 'Bozulmuş Inline-Form başlığı ve kodlama',
            consequence:
              'Genel metin editörleri UTF-8 BOM ekleyebilir veya ;%{PE} etiketini silebilir; bu durum SmartPAD veya iiQKA.OS2 derleyicisinde hataya yol açar.',
            beforeLabel: 'Önce: eksik ;%{PE} parametresi',
            afterLabel: 'Sonra: geçerli ;FOLD ve CRLF',
            beforeCode: `; Genel editör ;%{PE} parametrelerini sildi\n;FOLD INI\n  BAS (#INITMOV,0 )\n;ENDFOLD (INI)`,
            afterCode: `; BOM olmadan geçerli KRL başlığı ve CRLF\n;FOLD INI;%{PE}%R 8.6.1,%MKUKATPBASIS,%CINITMOV,%VINITMOV,%P 1:INITMOV, 2:0\n  BAS (#INITMOV,0 )\n;ENDFOLD (INI)`
          }
        ]
      },
      w3: {
        badge: 'Senaryo 03 · .wvs, .vcmx ve Canlı Monitör',
        title: 'WorkVisual (.wvs), KUKA.Sim (.vcmx), iiQKA EKI/RSI 6.x ve Canlı Monitör',
        body: 'EtherCAT/PROFINET topolojisini görmek, I/O listelerini TIA Portal, TwinCAT 3 veya EPLAN’a aktarmak ve iiQKA.EthernetKRL 6.x / iiQKA.RSI 6.x modüllerini doğrulamak için .wvs arşivlerini açın. Kontrolör ağında WCF (49002), iiQKA gRPC (443), OPC UA probe (4840) ve KUKAVARPROXY (7000) desteklenir.',
        bullets: [
          'WorkVisual kurmadan Windows, macOS veya Linux üzerinde .wvs saha veri yollarını ve iiQKA.EthernetKRL 6.x / iiQKA.RSI 6.x bağlamlarını inceleyin.',
          'KrcIoSignals.xml (CFG filtresi) ve SmartPAD UserTexts.kxr / $config.dat açıklamalarıyla 4.096 I/O pinini okuyun.',
          'Kontrolör parolaları varsayılan şifre olmadan VS Code SecretStorage içinde saklanır.'
        ],
        mediaSrc: '/media/krl_io_signals.gif',
        mediaAlt: 'VS Code içinde I/O sinyal inceleme',
        mediaCaption: 'VS Code kaydı: I/O sinyal tablosu ve açıklamalar'
      }
    },
    comparison: {
      eyebrow: 'Dürüst Karşılaştırma',
      heading: 'Basit söz dizimi renklendirme ve WorkVisual ile farkı',
      subtitle:
        'Her aracın yeri ayrıdır. Aşağıdaki tablo eklentinin nerede hız kazandırdığını ve nerede KUKA’nın kendi yazılımının gerektiğini gösterir.',
      tableCaption: 'Standart KRL vurgulayıcı, KUKA WorkVisual ve KUKA KRL Toolkit karşılaştırması',
      colCapability: 'Mühendislik görevi',
      colPlain: 'Basit KRL Renklendirme (TextMate)',
      colWorkVisual: 'KUKA WorkVisual / iiQWorks.Sim',
      colToolkit: 'KUKA KRL Toolkit (Community / Pro)',
      rows: [
        {
          feature: 'İşletim sistemleri',
          plainSyntax: 'Windows / macOS / Linux',
          workVisual: 'Yalnızca Windows',
          krlToolkit: 'Windows / macOS / Linux (VS Code, Cursor)'
        },
        {
          feature: '.src ↔ .dat arası F12 gezinme ve yeniden adlandırma',
          plainSyntax: 'Yok',
          workVisual: 'Temel gezinme',
          krlToolkit: 'Tam LSP, Referans Arama, Call Hierarchy (Community)'
        },
        {
          feature: 'Advance Run, BRAKE, ;FOLD ve VASS 26 analizi',
          plainSyntax: 'Yok',
          workVisual: 'Derleme sırasında kısmi',
          krlToolkit: 'Gerçek zamanlı statik analiz ve Diff düzeltme (Pro)'
        },
        {
          feature: 'Klasöre çıkarmadan .zip yedek farkı ve E6POS deltası',
          plainSyntax: 'Yok',
          workVisual: 'Proje içe aktarma gerekir',
          krlToolkit: 'Bellek içi .zip bağlama ve < 80 ms 6D delta (Pro)'
        },
        {
          feature: 'WorkVisual (.wvs) topolojisi ve I/O dışa aktarma',
          plainSyntax: 'Yok',
          workVisual: 'Yerel biçim',
          krlToolkit: 'Topoloji okuma ve TIA / TwinCAT / EPLAN aktarımı (Pro)'
        },
        {
          feature: 'Saha veri yolu donanım kurulumu ve kontrolöre yükleme',
          plainSyntax: 'Yok',
          workVisual: 'Ana kullanım amacı',
          krlToolkit: 'Desteklenmez — WorkVisual gerekir'
        },
        {
          feature: 'Güvenlik sertifikasyonu (SIL / PL)',
          plainSyntax: 'Yok',
          workVisual: 'SafeOperation yapılandırması',
          krlToolkit: 'Güvenlik sertifikalı yazılım değildir (Non-SIL)'
        }
      ],
      honestNoteTitle: 'Net sınır',
      honestNoteBody:
        'KUKA KRL Toolkit; donanım veri yolu kurulumu, SafeOperation veya projeyi kontrolöre dağıtmak için WorkVisual’ın yerini almaz ve güvenlik sertifikalı (SIL/PL) bir yazılım değildir. Günlük kod inceleme, yedek farkı ve ön kontrolleri hızlandırır.'
    },
    capabilities: {
      eyebrow: 'Modüller',
      heading: 'Tek kurulumda temel mühendislik araçları',
      subtitle:
        'Aşağıdaki 8 temel modülle başlayın veya gerekirse tüm VS Code komut ve ayar kaydını genişletin.',
      featuredHeading: 'Öne Çıkan Modüller',
      showAllBtn: 'Tüm özellikleri göster',
      collapseBtn: 'Öne çıkanlara daralt',
      registryNote:
        'Genişletilmiş görünüm, eklenti bildirimindeki teknik VS Code komutlarını ve ayarlarını listeler.',
      searchPlaceholder: 'Ad veya komut ID ile filtrele (örn. backup, spline)...',
      searchAria: 'Özellikleri filtrele',
      allCategoryLabel: 'Tüm kategoriler',
      emptyResults: 'Eşleşen sonuç bulunamadı.',
      viewDemoBtn: 'Detay',
      badgeFree: 'Community',
      badgePro: 'Pro',
      featured: [
        {
          id: 'krl.compareKrcBackup',
          title: 'KRC Yedek Karşılaştırma (.zip / KRCDiag)',
          category: 'Yedekler ve Arşivler',
          tier: 'Pro',
          description: 'Arşivleri açmadan karşılaştırın ve 6D E6POS nokta deltalarını görün.',
          commandId: 'krl.compareKrcBackup',
          mediaSrc: '/media/krc_backup_diff.gif',
          mediaAlt: 'KRC yedek karşılaştırma demosu'
        },
        {
          id: 'krl.fixAllSafeIssuesInFile',
          title: 'Statik KRL Denetimi ve Diff Onarımı',
          category: 'Teşhis',
          tier: 'Pro',
          description: 'Advance Run, BRAKE, UTF-8 BOM ve VASS 26 hatalarını Diff ile düzeltin.',
          commandId: 'krl.fixAllSafeIssuesInFile',
          mediaSrc: '/media/type-validation-demo.gif',
          mediaAlt: 'KRL statik doğrulama demosu'
        },
        {
          id: 'krl.inspectFieldbusTopology',
          title: 'WorkVisual (.wvs) ve I/O Dışa Aktarma',
          category: 'Saha Veri Yolu',
          tier: 'Pro',
          description: 'EtherCAT/PROFINET topolojisini okuyun ve TIA Portal, TwinCAT, EPLAN’a aktarın.',
          commandId: 'krl.inspectFieldbusTopology',
          mediaSrc: '/media/krl_io_signals.gif',
          mediaAlt: 'I/O sinyal denetçisi'
        },
        {
          id: 'krl.live.openDashboard',
          title: 'Canlı Kontrolör Monitörü (WCF / KVP / iiQKA)',
          category: 'Kontrolör Köprüsü',
          tier: 'Pro',
          description: 'WCF (49002), KVP (7000) veya gRPC (443) üzerinden $TOOL/$BASE ve 4.096 I/O izleyin.',
          commandId: 'krl.live.openDashboard',
          mediaSrc: '/media/kuka_control_center.gif',
          mediaAlt: 'Control Center paneli'
        },
        {
          id: 'krl.showFlowchart',
          title: 'Etkileşimli Akış Şeması',
          category: 'Mantık Analizi',
          tier: 'Pro',
          description: 'IF, SWITCH, LOOP akışını tıklanabilir grafik ve SVG olarak oluşturun.',
          commandId: 'krl.showFlowchart',
          mediaSrc: '/media/control_flow_graph.gif',
          mediaAlt: 'Etkileşimli KRL akış şeması'
        },
        {
          id: 'krl.openEventLog',
          title: 'İkili .evt Olay Günlüğü Çözücü',
          category: 'Yedekler ve Arşivler',
          tier: 'Pro',
          description: 'KUKA .evt günlüklerini 6 dilde çevrimdışı çözün.',
          commandId: 'krl.openEventLog',
          mediaSrc: '/media/kuka_control_center.gif',
          mediaAlt: 'Olay günlüğü inceleyici'
        },
        {
          id: 'krl.lspCore',
          title: 'KRL Dil Sunucusu ve F12 Gezinme',
          category: 'Temel Editör',
          tier: 'Free',
          description: '957 değişken tamamlama, .src/.dat F12 geçişi, biçimlendirici ve 6 tema.',
          commandId: 'krl.sortDeclarations',
          mediaSrc: '/media/smart_autocomplete.gif',
          mediaAlt: 'Akıllı tamamlama demosu'
        },
        {
          id: 'krl.cleanupUnusedVariables',
          title: 'Kullanılmayan Kod ve Nokta Temizliği',
          category: 'Teşhis',
          tier: 'Pro',
          description: 'Ulaşılamayan dalları ve kullanılmayan bildirimleri teslim öncesi temizleyin.',
          commandId: 'krl.cleanupUnusedVariables',
          mediaSrc: '/media/dead-code-demo.gif',
          mediaAlt: 'Kullanılmayan kod analizi'
        }
      ],
      categoryNames: { All: 'Tüm kategoriler' },
      typeNames: {}
    },
    pricing: {
      eyebrow: 'Fiyatlandırma',
      heading: 'Bireysel mühendisler ve ekipler için şeffaf lisanslar',
      subtitle:
        'Temel editör eğitim ve ticari olmayan kullanım için ücretsizdir. Ticari projeler ve Pro araçlar için aktif lisans gerekir.',
      billingAnnual: 'Yıllık',
      billingMonthly: 'Aylık',
      currencyAria: 'Para birimini seçin',
      openingCheckout: 'Ödeme sayfası açılıyor...',
      lifetimeNotePrefix: 'Tek seferlik 1 PC lisansı mı arıyorsunuz? ',
      lifetimeLinkLabel: 'Pro Lifetime',
      lifetimeNoteSuffix: ' yenilemesiz olarak mevcuttur.',
      enterprise100Note: '100 iş istasyonuna kadar fabrika kurulumları için Enterprise Plant ($4.999 / yıl fatura ile) sunulur.',
      tiers: [
        {
          id: 'community',
          name: 'Community',
          seatsLabel: 'Sonsuza kadar ücretsiz',
          freeLabel: 'Ücretsiz',
          periodYear: '',
          description: 'Eğitim, kişisel projeler ve şirket içi 30 günlük değerlendirme için temel editör.',
          features: [
            'KRL söz dizimi vurgusu ve 6 endüstriyel tema',
            'LSP tamamlama (957 değişken, 116 fonksiyon)',
            '.src/.dat arası F12 gezinme ve FOLD/UNFOLD',
            'Sınırsız satır sayısı ve temel sözdizimi kontrolü'
          ],
          ctaLabel: 'Ücretsiz Kur',
          isCommunity: true
        },
        {
          id: 'pro',
          name: 'Engineer Pro',
          badge: 'En çok tercih edilen',
          seatsLabel: '1 iş istasyonu',
          priceUsd: 149,
          monthlyUsd: 19,
          periodYear: '/ yıl',
          periodMonth: '/ ay',
          description: 'Devreye alma ve denetim için tüm Pro araçlar. Kartsız 14 gün ücretsiz deneme.',
          features: [
            'Advance Run, BRAKE, VASS 26 ve Diff onarımı',
            'Çıkarmadan .zip yedek farkı ve 6D E6POS deltası',
            '.wvs, .vcmx, .evt çözücü ve akış şemaları',
            'Canlı kontrolör köprüsü ve 30 gün çevrimdışı önbellek'
          ],
          ctaLabel: 'Pro Al',
          productIdAnnual: 'pdt_0NmAV012KFHSjUMyDomJ6',
          productIdMonthly: 'pdt_0NmAUzwdbzeERSktsOLTp',
          isPrimary: true
        },
        {
          id: 'team',
          name: 'Team',
          seatsLabel: '5 koltuğa kadar',
          priceUsd: 499,
          periodYear: '/ yıl',
          description: 'Tek kurumsal fatura altında çalışan otomasyon ve devreye alma ekipleri için.',
          features: [
            '5 adede kadar iş istasyonu',
            'Her koltuk için tüm Engineer Pro modülleri',
            'Tek şirket faturası ve lisans yönetimi',
            'Çevrimdışı Air-Gap (.lic) aktivasyon desteği'
          ],
          ctaLabel: 'Team Seç',
          productIdAnnual: 'pdt_0NnLCdgD69GiXDLRJ0K5v'
        },
        {
          id: 'integrator',
          name: 'Integrator / Enterprise',
          seatsLabel: '20–100 koltuk',
          priceUsd: 1499,
          periodYear: '/ yıl',
          description: 'Sistem entegratörleri ve internetsiz kapalı fabrika ağları için.',
          features: [
            '20 koltuk (veya 100 koltuklu Enterprise Plant)',
            'Air-Gap hücreler için imzalı Ed25519 .lic dosyaları',
            'Fatura / SEPA / PO ve %0 AB KDV (Reverse Charge)',
            'Karmaşık KRL vakalarında öncelikli mühendislik desteği'
          ],
          ctaLabel: 'Integrator Seç',
          productIdAnnual: 'pdt_0Nq5QVTrbkJbWAUf8qoyn',
          isEnterprise: true
        }
      ],
      billingStrip: {
        dodoTitle: 'Dodo Payments üzerinden faturalandırma',
        dodoText: 'Kart, banka havalesi, otomatik PDF vergi faturası ve geçerli VAT ID ile %0 AB KDV.',
        cancelTitle: 'Tek tıkla iptal',
        cancelText: 'Aboneliği dilediğiniz an VS Code içinden (krl.manageSubscription) veya müşteri portalından iptal edin.',
        refundTitle: '14 gün iade garantisi',
        refundText: 'KUKA ortamınıza uymazsa 14 gün içinde VS Code destek sohbetinden tam iade talep edebilirsiniz.',
        portalBtn: 'Dodo Müşteri Portalı'
      },
      promoFootnote:
        'LAUNCH30 (−%30) lansman kodu ödeme sayfasında otomatik uygulanır. EUR/RUB/TRY tutarları bilgi amaçlıdır; tahsilat USD üzerinden yapılır.',
      procurement: {
        eyebrow: 'B2B ve Satın Alma',
        heading: 'Ekip veya tüzel kişi adına satın alma',
        body: 'Dodo Payments üzerinden otomatik KDV faturası ile satın alın ya da kapalı ağlar için PO / SEPA faturası ve çevrimdışı .lic anahtarları talep edin.',
        points: [
          'Resmi PDF vergi faturaları ve AB VIES %0 KDV Reverse Charge desteği.',
          'İnternetsiz saha bilgisayarları için imzalı Ed25519 .lic lisans dosyaları.',
          'Doğrudan VS Code içinden krl.requestCorporateInvoice ile kurumsal fatura talebi.'
        ],
        btnPortal: 'Dodo Fatura Portalı',
        btnAirGap: 'Air-Gap Portalı (.lic)',
        btnVsCodeInvoice: 'VS Code’da Fatura İste'
      }
    },
    security: {
      eyebrow: 'Güvenlik ve Air-Gap',
      heading: 'Kapalı üretim ağları için tasarlandı',
      subtitle: 'Robot programlarınız ve hücre yedekleriniz hiçbir aşamada bilgisayarınızdan dışarı çıkmaz.',
      items: [
        {
          title: '1. %100 yerel işleme',
          body: 'KRL ayrıştırma, AST denetimi, nokta deltaları ve .zip/.wvs okuma işlemleri tamamen kendi bilgisayarınızda çalışır.'
        },
        {
          title: '2. Çevrimdışı Air-Gap lisanslama',
          body: 'İnternetsiz üretim hatları için imzalı Ed25519 .lic dosyaları desteklenir; çevrimiçi ticari anahtarlarda 30 günlük çevrimdışı önbellek bulunur.'
        },
        {
          title: '3. Paket güvenliği doğrulaması',
          body: 'Her sürüm ReversingLabs Spectra Assure (0 CVE) ile taranır. Dokümantasyon ve hata takipçisi GitHub’da açıktır.'
        }
      ],
      spectraLink: 'ReversingLabs Spectra Assure raporu',
      githubLink: 'Açık GitHub deposu',
      privacyLink: 'Gizlilik Politikası (PRIVACY.md)'
    },
    author: {
      eyebrow: 'Geliştirici ve İletişim',
      heading: 'Bu aracı kim geliştiriyor',
      name: 'Silvestr Liskin (LiskinLabs)',
      role: 'Robotik Devreye Alma Mühendisi & KUKA KRL Engineering Toolkit Geliştiricisi',
      photoSlotNote: 'Yazar fotoğrafı alanı (/author.jpg)',
      bio1: 'Endüstriyel KUKA robotlarının devreye alınması ve hücre yazılımları üzerine çalışıyorum. Bu eklenti sahadaki günlük ihtiyaçlardan doğdu: kodu SmartPAD’e atmadan Advance Run duruşlarını yakalamak, yedekleri hızlıca karşılaştırmak ve ağır yazılımları açmadan .wvs sinyallerini görmek.',
      bio2: 'Şirket faturası, özel bir KRC yedeği desteği veya kapalı ağda deneme için VS Code içindeki destek sohbetinden ya da GitHub Issues üzerinden doğrudan yazabilirsiniz.',
      channelsHeading: 'Doğrudan iletişim ve dağıtım kanalları',
      channels: [
        {
          label: 'VS Code İçi Destek Sohbeti',
          detail: 'Teknik destek ve B2B fatura talepleri için krl.openTelegramChat',
          href: 'vscode://LiskinLabs.kuka-krl-extension/support',
          external: false
        },
        {
          label: 'GitHub Issues',
          detail: 'Hata bildirimleri, KRL örnekleri ve özellik talepleri',
          href: 'https://github.com/LiskinLabs/kuka-krl-extension/issues',
          external: true
        },
        {
          label: 'VS Code Marketplace',
          detail: 'Resmi eklenti sayfası ve sürüm notları',
          href: 'https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension',
          external: true
        },
        {
          label: 'Open VSX Registry',
          detail: 'Cursor, Windsurf ve VSCodium kurulumu',
          href: 'https://open-vsx.org/extension/LiskinLabs/kuka-krl-extension',
          external: true
        }
      ]
    },
    footer: {
      brandName: 'LiskinLabs',
      brandDesc: 'Visual Studio Code içinde KUKA KRL geliştirme ve statik analiz için bağımsız mühendislik araçları.',
      colProduct: 'Bölümler',
      colResources: 'Kaynaklar',
      colLegal: 'Yasal Uyarı',
      links: {
        workflows: 'Özellikler',
        comparison: 'Karşılaştırma',
        pricing: 'Fiyatlar',
        security: 'Güvenlik ve Air-Gap',
        docs: 'Dokümantasyon',
        marketplace: 'VS Code Marketplace',
        openVsx: 'Open VSX',
        github: 'GitHub',
        portal: 'Dodo Müşteri Portalı'
      },
      disclaimer:
        'LiskinLabs (Silvestr Liskin) tarafından geliştirilen bağımsız yazılımdır; KUKA AG veya Microsoft Corporation ile bağlantısı yoktur. KUKA, KRL, KRC, KSS, WorkVisual, KUKA.Sim ve SmartPAD, KUKA Roboter GmbH’nin ticari markalarıdır. Güvenlik sertifikalı yazılım değildir (Non-SIL / Non-PL) ve gerçek kontrolörde T1 doğrulamasının yerini almaz.',
      copyright: '© 2024–2026 LiskinLabs (Silvestr Liskin)'
    },
    modals: {
      closeAria: 'Pencereyi kapat',
      closeBtn: 'Kapat',
      trialTitle: '14 günlük ücretsiz Pro denemesi',
      trialSubtitle: 'Tüm Pro modüllerini kredi kartı gerekmeden 14 gün deneyin.',
      trialSteps: [
        { step: '1. Eklentiyi kurun', text: 'VS Code Marketplace üzerinden KRL Engineering Toolkit’i kurun.' },
        { step: '2. Komut paletini açın', text: 'Ctrl+Shift+P (macOS’ta Cmd+Shift+P) tuşlarına basın.' },
        { step: '3. Denemeyi başlatın', text: 'krl.startTrial komutunu çalıştırın.' }
      ],
      trialOpenVsCode: 'VS Code’da Aç',
      trialGotIt: 'Anladım',
      toolModalCategoryLabel: 'Kategori',
      toolModalCompat: 'KSS 5.x–8.7 (KRC2 / KRC4 / KRC5) ve iiQKA uyumlu'
    }
  },

  es: {
    code: 'es',
    label: 'ES',
    skipToContent: 'Saltar al contenido principal',
    header: {
      brandSubtitle: 'KUKA KRL para VS Code',
      navAriaLabel: 'Navegación principal',
      navItems: {
        workflows: 'Funciones',
        comparison: 'Comparativa',
        pricing: 'Precios',
        security: 'Seguridad',
        docs: 'Documentación'
      },
      docsLink: '/es/guide/installation',
      langButtonAria: 'Seleccionar idioma',
      themeToggleToLight: 'Cambiar a tema claro',
      themeToggleToDark: 'Cambiar a tema oscuro',
      ctaInstall: 'Instalar gratis',
      mobileMenuOpenAria: 'Abrir menú',
      mobileMenuCloseAria: 'Cerrar menú'
    },
    hero: {
      eyebrow: 'Extensión para Visual Studio Code · KR C2 / KR C4 / KR C5 (micro / -2) · KSS 5.4–8.7, VSS (VKRC) e iiQKA.OS2 9.0–9.3',
      h1: 'Entorno de ingeniería para KUKA KRL en VS Code: análisis estático, diff de backups e inspección .wvs',
      subtitle:
        'Detecte paradas de Advance Run, falta de BRAKE y desviaciones de puntos del SmartPAD antes de cargar el programa en el controlador. Abra archivos .zip y proyectos WorkVisual (.wvs) directamente en VS Code — en local y sin nube.',
      ctaInstall: 'Instalar en VS Code',
      ctaTrial: 'Probar Pro 14 días',
      copyLabel: 'Copiar',
      copiedLabel: 'Copiado',
      copyCliAria: 'Copiar comando de instalación de VS Code CLI',
      factsLine: 'Validado en 108 backups reales (4,13M líneas KRL) · Editor base gratuito · 100 % sin conexión',
      viewModeScreenshots: 'Capturas VS Code',
      viewMode3d: 'Vista 3D de trayectoria',
      simFrameTitle: 'Vista previa 3D de trayectoria KUKA KRL',
      simHint: 'Visor local de trayectoria. Se carga solo al cambiar a esta pestaña.',
      mediaSlides: [
        {
          id: 'control-center',
          label: 'Control Center',
          caption: 'Panel KUKA KRL Control Center y diagnóstico del proyecto en Visual Studio Code',
          src: '/media/kuka_control_center.gif',
          alt: 'KUKA KRL Control Center en Visual Studio Code'
        },
        {
          id: 'backup-diff',
          label: 'Diff de .zip',
          caption: 'Comparación de backups SmartPAD (.zip / KRCDiag) y deltas 6D E6POS sin descomprimir',
          src: '/media/krc_backup_diff.gif',
          alt: 'Comparación de backups KRC en VS Code'
        },
        {
          id: 'io-signals',
          label: 'Señales I/O',
          caption: 'Inspector de señales $IN/$OUT y pistas en línea (Inlay Hints)',
          src: '/media/krl_io_signals.gif',
          alt: 'Inspector de señales I/O en VS Code'
        },
        {
          id: 'autocomplete',
          label: 'LSP y tipos',
          caption: 'Autocompletado de 957 variables KSS y navegación F12 entre .src y .dat',
          src: '/media/smart_autocomplete.gif',
          alt: 'Autocompletado inteligente para KUKA KRL'
        }
      ]
    },
    workflows: {
      eyebrow: 'Flujos clave',
      heading: 'Tres flujos de trabajo que ahorran horas en puesta en marcha',
      subtitle:
        'Diseñado para el trabajo diario en planta: revisar puntos modificados en turno, auditar lógica KRL y consultar proyectos .wvs sin esperar a suites pesadas.',
      w1: {
        badge: 'Flujo 01 · Backups SmartPAD',
        title: 'Comparar backups (.zip / KRCDiag) y deltas E6POS sin descomprimir',
        body: 'Monte archivos del controlador (.zip, .ibz, KRCDiag) directamente en VS Code o compare dos revisiones. Si un operario ajusta puntos desde el SmartPAD, la extensión calcula los deltas 6D (ΔX, ΔY, ΔZ, ΔA, ΔB, ΔC) en el Diff estándar.',
        bullets: [
          'Funciona en memoria RAM sin dejar carpetas temporales en el portátil.',
          'Destaca cambios E6POS en .dat separando ajustes de trayectoria de cabeceras.',
          'Decodificador sin conexión para registros binarios .evt (EVTX).'
        ],
        mediaSrc: '/media/krc_backup_diff.gif',
        mediaAlt: 'Comparación de archivos de backup SmartPAD en VS Code',
        mediaCaption: 'Grabado en VS Code: comparación KRC y deltas de puntos'
      },
      w2: {
        badge: 'Flujo 02 · Auditoría estática y Diff',
        title: 'Análisis estático KRL y correcciones revisadas por Diff',
        body: 'Detecta errores habituales antes de subir al controlador: $OUT que detienen el Advance Run, falta de BRAKE antes de RESUME, movimientos en DRYRUN ... ENDDRYRUN, marcos $TOOL/$BASE sin asignar, UTF-8 BOM (rechazado por iiQKA.OS2) e incompatibilidades KSS 5.4–9.3 / iiQKA.OS2 (PDAT/LDAT sin VEL, SVEL_CP2, MotionParamSets.dat). Cada corrección respeta ;%{PE}.',
        bullets: [
          'Conserva sumas Inline-Form (;FOLD ... ;%{PE}) y codificaciones UTF-8 sin BOM (iiQKA.OS2), CP1251 y Windows-1252.',
          'Comprueba DRYRUN ... ENDDRYRUN, balance de bloques, rangos $IN/$OUT/$FLAG/$TIMER, SPS.SUB, VASS 26 / VKRC y migración PDAT/LDAT.',
          'Explica la consecuencia técnica exacta en el controlador.'
        ],
        diffHeading: 'Ejemplos Antes / Después con impacto técnico',
        mediaSrc: '/media/type-validation-demo.gif',
        mediaAlt: 'Diagnóstico estático KRL en VS Code',
        mediaCaption: 'Grabado en VS Code: diagnóstico KRL y correcciones rápidas',
        scenarios: [
          {
            id: 'advance_run',
            tabLabel: 'Advance Run ($OUT)',
            issueTitle: 'Parada implícita de Advance Run en trayectoria continua',
            consequence:
              'Escribir $OUT[12] directamente entre movimientos C_DIS detiene el puntero de lectura anticipada: el robot frena brevemente en el punto en lugar de enlazar suavemente.',
            beforeLabel: 'Antes: detención de Advance Run',
            afterLabel: 'Después: TRIGGER sincronizado',
            beforeCode: `LIN XPICK_APPROACH C_DIS\n$OUT[12] = TRUE ; Detiene Advance Run antes del siguiente punto\nLIN XPICK_PART`,
            afterCode: `LIN XPICK_APPROACH C_DIS\nTRIGGER WHEN DISTANCE=0 DELAY=0 DO $OUT[12] = TRUE\nLIN XPICK_PART ; Mantiene trayectoria continua C_DIS`
          },
          {
            id: 'missing_brake',
            tabLabel: 'Falta BRAKE antes de RESUME',
            issueTitle: 'Finalización del segmento y fallo de pila (KSS 1584)',
            consequence:
              'Ejecutar RESUME sin BRAKE previo (o INTERRUPT WITH BRAKE) provoca una parada de lectura anticipada: el robot completa el segmento activo en lugar de frenar de inmediato, y dispara KSS 1584 si no se cumple $ADVANCE=0 o la profundidad de pila.',
            beforeLabel: 'Antes: falta BRAKE antes de RESUME',
            afterLabel: 'Después: BRAKE antes de RESUME',
            beforeCode: `DEF PART_SEARCH_ISR()\n  INTERRUPT OFF 10\n  RESUME ; Riesgo: completa el segmento sin BRAKE (y KSS 1584 si falla la pila)\nEND`,
            afterCode: `DEF PART_SEARCH_ISR()\n  INTERRUPT OFF 10\n  BRAKE  ; Detiene el movimiento de inmediato (o INTERRUPT WITH BRAKE)\n  RESUME ; Retorno seguro\nEND`
          },
          {
            id: 'fold_bom',
            tabLabel: 'UTF-8 BOM y ;FOLD',
            issueTitle: 'Cabeceras Inline-Form y codificación dañadas',
            consequence:
              'Los editores genéricos añaden UTF-8 BOM o eliminan ;%{PE}, provocando errores al abrir en SmartPAD o compilar en KSS / iiQKA.OS2.',
            beforeLabel: 'Antes: parámetros ;%{PE} perdidos',
            afterLabel: 'Después: ;FOLD válido y CRLF sin BOM',
            beforeCode: `; Un editor genérico borró los parámetros ;%{PE}\n;FOLD INI\n  BAS (#INITMOV,0 )\n;ENDFOLD (INI)`,
            afterCode: `; Cabecera KRL válida con CRLF sin BOM\n;FOLD INI;%{PE}%R 8.6.1,%MKUKATPBASIS,%CINITMOV,%VINITMOV,%P 1:INITMOV, 2:0\n  BAS (#INITMOV,0 )\n;ENDFOLD (INI)`
          }
        ]
      },
      w3: {
        badge: 'Flujo 03 · .wvs, .vcmx y Monitor en vivo',
        title: 'Inspección WorkVisual (.wvs), KUKA.Sim (.vcmx), iiQKA EKI/RSI 6.x y enlace Live',
        body: 'Abra archivos .wvs para inspeccionar topología EtherCAT/PROFINET, exportar señales I/O a TIA Portal, TwinCAT 3 o EPLAN y validar módulos iiQKA.EthernetKRL 6.x / iiQKA.RSI 6.x. En red de celda, conéctese vía WCF (49002), iiQKA gRPC (443), sonda OPC UA (4840) o KUKAVARPROXY (7000).',
        bullets: [
          'Revise redes .wvs, paquetes KOP y contextos iiQKA.EthernetKRL 6.x / iiQKA.RSI 6.x en Windows, macOS o Linux sin WorkVisual.',
          'Consulte hasta 4.096 pines I/O con filtro CFG (KrcIoSignals.xml) y textos SmartPAD UserTexts.kxr / $config.dat.',
          'Credenciales guardadas por controlador en VS Code SecretStorage.'
        ],
        mediaSrc: '/media/krl_io_signals.gif',
        mediaAlt: 'Inspector de señales I/O en VS Code',
        mediaCaption: 'Grabado en VS Code: tabla I/O y comentarios del proyecto'
      }
    },
    comparison: {
      eyebrow: 'Comparativa honesta',
      heading: 'Diferencia frente a resaltadores simples y WorkVisual',
      subtitle:
        'Cada herramienta tiene su función. Aquí se detalla dónde aporta el Toolkit y dónde sigue siendo necesario WorkVisual.',
      tableCaption: 'Comparativa entre resaltado KRL simple, KUKA WorkVisual y KUKA KRL Toolkit',
      colCapability: 'Tarea de ingeniería',
      colPlain: 'Resaltado KRL básico (TextMate)',
      colWorkVisual: 'KUKA WorkVisual / iiQWorks.Sim',
      colToolkit: 'KUKA KRL Toolkit (Community / Pro)',
      rows: [
        {
          feature: 'Sistemas operativos',
          plainSyntax: 'Windows / macOS / Linux',
          workVisual: 'Solo Windows',
          krlToolkit: 'Windows / macOS / Linux (VS Code, Cursor)'
        },
        {
          feature: 'Navegación F12 (.src ↔ .dat) y renombrado',
          plainSyntax: 'No',
          workVisual: 'Navegación básica',
          krlToolkit: 'LSP completo, Referencias, Call Hierarchy (Community)'
        },
        {
          feature: 'Diagnóstico Advance Run, BRAKE, ;FOLD y VASS 26',
          plainSyntax: 'No',
          workVisual: 'Parcial al compilar',
          krlToolkit: 'Análisis en tiempo real y reparación Diff (Pro)'
        },
        {
          feature: 'Diff de backups .zip y deltas E6POS sin extraer',
          plainSyntax: 'No',
          workVisual: 'Requiere importar proyecto',
          krlToolkit: 'Montaje en memoria y deltas 6D < 80 ms (Pro)'
        },
        {
          feature: 'Topología WorkVisual (.wvs) y exportación I/O',
          plainSyntax: 'No',
          workVisual: 'Entorno nativo',
          krlToolkit: 'Lectura y exportación a TIA / TwinCAT / EPLAN (Pro)'
        },
        {
          feature: 'Configuración hardware de bus y despliegue al robot',
          plainSyntax: 'No',
          workVisual: 'Uso principal',
          krlToolkit: 'No soportado — requiere WorkVisual'
        },
        {
          feature: 'Certificación de seguridad (SIL / PL)',
          plainSyntax: 'No',
          workVisual: 'Configuración SafeOperation',
          krlToolkit: 'No es software de seguridad (Non-SIL / Non-PL)'
        }
      ],
      honestNoteTitle: 'Límite claro',
      honestNoteBody:
        'KUKA KRL Toolkit no sustituye a WorkVisual para configurar buses de campo, SafeOperation ni desplegar al controlador, y no es software certificado de seguridad (Non-SIL). Agiliza la revisión diaria de código y backups.'
    },
    capabilities: {
      eyebrow: 'Módulos',
      heading: 'Herramientas principales en una sola extensión',
      subtitle:
        'Empiece con los 8 módulos clave o despliegue el registro completo de comandos y ajustes de VS Code.',
      featuredHeading: 'Módulos destacados',
      showAllBtn: 'Mostrar todas las funciones',
      collapseBtn: 'Ver solo los destacados',
      registryNote:
        'La vista ampliada muestra todos los comandos y ajustes técnicos registrados en el manifiesto de VS Code.',
      searchPlaceholder: 'Filtrar por nombre o comando (ej. backup, spline)...',
      searchAria: 'Filtrar funciones',
      allCategoryLabel: 'Todas las categorías',
      emptyResults: 'No se encontraron coincidencias.',
      viewDemoBtn: 'Detalles',
      badgeFree: 'Community',
      badgePro: 'Pro',
      featured: [
        {
          id: 'krl.compareKrcBackup',
          title: 'Diff de backups KRC (.zip / KRCDiag)',
          category: 'Backups y archivos',
          tier: 'Pro',
          description: 'Monte archivos .zip/.ibz en memoria y calcule deltas 6D E6POS sin descomprimir.',
          commandId: 'krl.compareKrcBackup',
          mediaSrc: '/media/krc_backup_diff.gif',
          mediaAlt: 'Demo de diff de backups KRC'
        },
        {
          id: 'krl.fixAllSafeIssuesInFile',
          title: 'Auditoría estática KRL y reparación Diff',
          category: 'Diagnóstico',
          tier: 'Pro',
          description: 'Detecte Advance Run, falta de BRAKE, UTF-8 BOM y VASS 26 con vista previa Diff.',
          commandId: 'krl.fixAllSafeIssuesInFile',
          mediaSrc: '/media/type-validation-demo.gif',
          mediaAlt: 'Diagnóstico estático KRL'
        },
        {
          id: 'krl.inspectFieldbusTopology',
          title: 'WorkVisual (.wvs) y exportación I/O',
          category: 'Buses e integración',
          tier: 'Pro',
          description: 'Inspeccione EtherCAT/PROFINET y exporte señales a TIA Portal, TwinCAT y EPLAN.',
          commandId: 'krl.inspectFieldbusTopology',
          mediaSrc: '/media/krl_io_signals.gif',
          mediaAlt: 'Inspector de señales I/O'
        },
        {
          id: 'krl.live.openDashboard',
          title: 'Monitor en vivo (WCF / KVP / iiQKA)',
          category: 'Enlace al controlador',
          tier: 'Pro',
          description: 'Lea $TOOL/$BASE, pares de ejes y 4.096 pines I/O por WCF, KVP o gRPC.',
          commandId: 'krl.live.openDashboard',
          mediaSrc: '/media/kuka_control_center.gif',
          mediaAlt: 'Panel Control Center'
        },
        {
          id: 'krl.showFlowchart',
          title: 'Diagrama de flujo interactivo',
          category: 'Análisis lógico',
          tier: 'Pro',
          description: 'Grafos interactivos IF, SWITCH y LOOP con salto al código y exportación SVG.',
          commandId: 'krl.showFlowchart',
          mediaSrc: '/media/control_flow_graph.gif',
          mediaAlt: 'Diagrama de flujo interactivo'
        },
        {
          id: 'krl.openEventLog',
          title: 'Decodificador de registros .evt (EVTX)',
          category: 'Backups y archivos',
          tier: 'Pro',
          description: 'Lectura sin conexión de archivos binarios .evt del controlador en 6 idiomas.',
          commandId: 'krl.openEventLog',
          mediaSrc: '/media/kuka_control_center.gif',
          mediaAlt: 'Inspector de registros .evt'
        },
        {
          id: 'krl.lspCore',
          title: 'Servidor de lenguaje KRL y F12',
          category: 'Editor base',
          tier: 'Free',
          description: 'Autocompletado de 957 variables, F12 entre .src/.dat, formateador y 6 temas.',
          commandId: 'krl.sortDeclarations',
          mediaSrc: '/media/smart_autocomplete.gif',
          mediaAlt: 'Autocompletado inteligente KRL'
        },
        {
          id: 'krl.cleanupUnusedVariables',
          title: 'Limpieza de código muerto y puntos',
          category: 'Diagnóstico',
          tier: 'Pro',
          description: 'Localice ramas inalcanzables y declaraciones sin uso antes de entregar la celda.',
          commandId: 'krl.cleanupUnusedVariables',
          mediaSrc: '/media/dead-code-demo.gif',
          mediaAlt: 'Detección de código muerto'
        }
      ],
      categoryNames: { All: 'Todas las categorías' },
      typeNames: {}
    },
    pricing: {
      eyebrow: 'Precios',
      heading: 'Licencias claras para ingenieros y equipos',
      subtitle:
        'Las funciones base son gratuitas para aprendizaje y uso no comercial. El uso comercial y los módulos Pro requieren licencia.',
      billingAnnual: 'Anual',
      billingMonthly: 'Mensual',
      currencyAria: 'Seleccionar moneda',
      openingCheckout: 'Abriendo pago...',
      lifetimeNotePrefix: '¿Prefiere pago único para 1 equipo? ',
      lifetimeLinkLabel: 'Pro Lifetime',
      lifetimeNoteSuffix: ' está disponible sin renovaciones.',
      enterprise100Note: 'Para plantas de hasta 100 puestos existe Enterprise Plant ($4,999 / año bajo factura).',
      tiers: [
        {
          id: 'community',
          name: 'Community',
          seatsLabel: 'Gratis para siempre',
          freeLabel: 'Gratis',
          periodYear: '',
          description: 'Editor KRL esencial para formación, uso personal y evaluación interna de 30 días.',
          features: [
            'Resaltado KRL y 6 temas industriales',
            'Autocompletado LSP (957 variables, 116 funciones)',
            'Navegación F12 (.src/.dat) y FOLD/UNFOLD',
            'Sin límite de líneas y comprobación sintáctica básica'
          ],
          ctaLabel: 'Instalar gratis',
          isCommunity: true
        },
        {
          id: 'pro',
          name: 'Engineer Pro',
          badge: 'Más elegido',
          seatsLabel: '1 puesto',
          priceUsd: 149,
          monthlyUsd: 19,
          periodYear: '/ año',
          periodMonth: '/ mes',
          description: 'Suite Pro completa para puesta en marcha. Prueba gratuita de 14 días sin tarjeta.',
          features: [
            'Auditoría Advance Run, BRAKE, VASS 26 y reparación Diff',
            'Diff de backups .zip sin extraer y deltas 6D E6POS',
            'Lectura .wvs, .vcmx, logs .evt y diagramas',
            'Puente en vivo y caché offline de 30 días'
          ],
          ctaLabel: 'Obtener Pro',
          productIdAnnual: 'pdt_0NmAV012KFHSjUMyDomJ6',
          productIdMonthly: 'pdt_0NmAUzwdbzeERSktsOLTp',
          isPrimary: true
        },
        {
          id: 'team',
          name: 'Team',
          seatsLabel: 'Hasta 5 puestos',
          priceUsd: 499,
          periodYear: '/ año',
          description: 'Para grupos de puesta en marcha con una sola factura corporativa.',
          features: [
            'Hasta 5 estaciones de trabajo',
            'Todas las funciones Engineer Pro por puesto',
            'Factura única de empresa y gestión de asientos',
            'Activación sin conexión Air-Gap (.lic)'
          ],
          ctaLabel: 'Elegir Team',
          productIdAnnual: 'pdt_0NnLCdgD69GiXDLRJ0K5v'
        },
        {
          id: 'integrator',
          name: 'Integrator / Enterprise',
          seatsLabel: '20–100 puestos',
          priceUsd: 1499,
          periodYear: '/ año',
          description: 'Para integradores de sistemas y plantas con redes aisladas.',
          features: [
            '20 puestos (u opción Enterprise Plant de 100 puestos)',
            'Certificados .lic firmados con Ed25519 para Air-Gap',
            'Factura / SEPA / PO y 0 % IVA intracomunitario',
            'Soporte prioritario en casos complejos'
          ],
          ctaLabel: 'Elegir Integrator',
          productIdAnnual: 'pdt_0Nq5QVTrbkJbWAUf8qoyn',
          isEnterprise: true
        }
      ],
      billingStrip: {
        dodoTitle: 'Pagos y facturas con Dodo Payments',
        dodoText: 'Tarjeta, transferencia, recibos fiscales PDF al instante y 0 % IVA UE con VAT ID válido.',
        cancelTitle: 'Cancelación en 1 clic',
        cancelText: 'Cancele en cualquier momento desde VS Code (krl.manageSubscription) o el portal de cliente.',
        refundTitle: 'Reembolso de 14 días',
        refundText: 'Si no encaja con su entorno KUKA, solicite el reembolso en 14 días desde el chat de soporte en VS Code.',
        portalBtn: 'Portal Dodo Payments'
      },
      promoFootnote:
        'El código de lanzamiento LAUNCH30 (−30 %) se aplica automáticamente al pagar. Los precios en EUR/RUB/TRY son orientativos; el cobro se realiza en USD.',
      procurement: {
        eyebrow: 'Empresas y compras',
        heading: 'Compra para equipos o personas jurídicas',
        body: 'Facturación automatizada con IVA mediante Dodo Payments o solicitud directa de factura / SEPA / Purchase Order y licencias Air-Gap.',
        points: [
          'Facturas fiscales PDF y exención VIES 0 % IVA UE.',
          'Archivos de licencia Ed25519 (.lic) para redes industriales sin internet.',
          'Solicite factura corporativa desde VS Code con krl.requestCorporateInvoice.'
        ],
        btnPortal: 'Portal de facturas Dodo',
        btnAirGap: 'Portal Air-Gap (.lic)',
        btnVsCodeInvoice: 'Solicitar factura en VS Code'
      }
    },
    security: {
      eyebrow: 'Seguridad y Air-Gap',
      heading: 'Pensado para redes industriales aisladas',
      subtitle: 'Sus programas KRL y backups permanecen en todo momento en su estación de trabajo.',
      items: [
        {
          title: '1. Procesamiento 100 % local',
          body: 'El análisis sintáctico, AST, cálculo de deltas y lectura de .zip/.wvs se ejecutan localmente en su equipo sin subir código a la nube.'
        },
        {
          title: '2. Licencias sin conexión (Air-Gap)',
          body: 'Las redes sin internet admiten activación mediante archivos firmados Ed25519 (.lic), además de 30 días de caché offline en licencias comerciales.'
        },
        {
          title: '3. Verificación de paquete',
          body: 'Cada versión se analiza con ReversingLabs Spectra Assure (0 CVE). Documentación y seguimiento de incidencias en GitHub.'
        }
      ],
      spectraLink: 'Informe ReversingLabs Spectra Assure',
      githubLink: 'Repositorio público en GitHub',
      privacyLink: 'Política de privacidad (PRIVACY.md)'
    },
    author: {
      eyebrow: 'Autor y contacto',
      heading: 'Quién desarrolla esta herramienta',
      name: 'Silvestr Liskin (LiskinLabs)',
      role: 'Ingeniero de robótica y autor de KUKA KRL Engineering Toolkit',
      photoSlotNote: 'Espacio para foto del autor (/author.jpg)',
      bio1: 'Trabajo en puesta en marcha de robots industriales KUKA y software de celda. Esta extensión nació de necesidades reales en planta: detectar paradas de Advance Run antes de ir al SmartPAD, comparar backups con precisión y revisar señales .wvs sin abrir suites pesadas.',
      bio2: '¿Necesita factura de empresa, ayuda con un archivo KRC concreto o probar el modo Air-Gap? Escríbame desde el chat integrado en VS Code o mediante GitHub Issues.',
      channelsHeading: 'Canales directos y distribución',
      channels: [
        {
          label: 'Chat de soporte en VS Code',
          detail: 'Comando krl.openTelegramChat para soporte técnico y facturas B2B',
          href: 'vscode://LiskinLabs.kuka-krl-extension/support',
          external: false
        },
        {
          label: 'GitHub Issues',
          detail: 'Reporte de errores, casos KRL y sugerencias',
          href: 'https://github.com/LiskinLabs/kuka-krl-extension/issues',
          external: true
        },
        {
          label: 'VS Code Marketplace',
          detail: 'Ficha oficial y registro de cambios',
          href: 'https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension',
          external: true
        },
        {
          label: 'Open VSX Registry',
          detail: 'Para Cursor, Windsurf y VSCodium',
          href: 'https://open-vsx.org/extension/LiskinLabs/kuka-krl-extension',
          external: true
        }
      ]
    },
    footer: {
      brandName: 'LiskinLabs',
      brandDesc: 'Herramientas independientes de ingeniería para KUKA KRL en Visual Studio Code.',
      colProduct: 'Secciones',
      colResources: 'Recursos',
      colLegal: 'Aviso legal',
      links: {
        workflows: 'Funciones',
        comparison: 'Comparativa',
        pricing: 'Precios',
        security: 'Seguridad y Air-Gap',
        docs: 'Documentación',
        marketplace: 'VS Code Marketplace',
        openVsx: 'Open VSX',
        github: 'GitHub',
        portal: 'Portal Dodo Payments'
      },
      disclaimer:
        'Software independiente de LiskinLabs (Silvestr Liskin), sin afiliación con KUKA AG ni Microsoft Corporation. KUKA, KRL, KRC, KSS, WorkVisual, KUKA.Sim y SmartPAD son marcas registradas de KUKA Roboter GmbH. No es software certificado de seguridad (Non-SIL / Non-PL) y no sustituye la validación física en modo T1.',
      copyright: '© 2024–2026 LiskinLabs (Silvestr Liskin)'
    },
    modals: {
      closeAria: 'Cerrar ventana',
      closeBtn: 'Cerrar',
      trialTitle: 'Prueba gratuita de Pro durante 14 días',
      trialSubtitle: 'Pruebe todos los módulos Pro durante 14 días sin tarjeta bancaria.',
      trialSteps: [
        { step: '1. Instale la extensión', text: 'Instale KRL Engineering Toolkit desde VS Code Marketplace.' },
        { step: '2. Abra la paleta de comandos', text: 'Pulse Ctrl+Shift+P (o Cmd+Shift+P en macOS).' },
        { step: '3. Inicie la prueba', text: 'Ejecute el comando krl.startTrial.' }
      ],
      trialOpenVsCode: 'Abrir en VS Code',
      trialGotIt: 'Entendido',
      toolModalCategoryLabel: 'Categoría',
      toolModalCompat: 'Compatible con KSS 5.x–8.7 (KRC2 / KRC4 / KRC5) e iiQKA'
    }
  },

  it: {
    code: 'it',
    label: 'IT',
    skipToContent: 'Vai al contenuto principale',
    header: {
      brandSubtitle: 'KUKA KRL per VS Code',
      navAriaLabel: 'Navigazione principale',
      navItems: {
        workflows: 'Funzionalità',
        comparison: 'Confronto',
        pricing: 'Prezzi',
        security: 'Sicurezza',
        docs: 'Documentazione'
      },
      docsLink: '/it/guide/installation',
      langButtonAria: 'Seleziona la lingua',
      themeToggleToLight: 'Passa al tema chiaro',
      themeToggleToDark: 'Passa al tema scuro',
      ctaInstall: 'Installa gratis',
      mobileMenuOpenAria: 'Apri menu',
      mobileMenuCloseAria: 'Chiudi menu'
    },
    hero: {
      eyebrow: 'Estensione per Visual Studio Code · KR C2 / KR C4 / KR C5 (micro / -2) · KSS 5.4–8.7, VSS (VKRC) e iiQKA.OS2 9.0–9.3',
      h1: 'Ambiente di ingegneria per KUKA KRL in VS Code: analisi statica, diff dei backup e ispezione .wvs',
      subtitle:
        'Individua arresti di Advance Run, comandi BRAKE mancanti e derive dei punti SmartPAD prima di caricare il programma sul controllore. Apri backup .zip e progetti WorkVisual (.wvs) direttamente in VS Code — in locale e senza cloud.',
      ctaInstall: 'Installa in VS Code',
      ctaTrial: 'Prova Pro 14 giorni',
      copyLabel: 'Copia',
      copiedLabel: 'Copiato',
      copyCliAria: 'Copia comando di installazione VS Code CLI',
      factsLine: 'Testato su 108 backup reali (4,13M righe KRL) · Editor base gratuito · 100% offline',
      viewModeScreenshots: 'Schermate VS Code',
      viewMode3d: 'Vista 3D traiettoria',
      simFrameTitle: 'Anteprima 3D traiettoria KUKA KRL',
      simHint: 'Visualizzatore locale della traiettoria. Caricato solo al passaggio su questa scheda.',
      mediaSlides: [
        {
          id: 'control-center',
          label: 'Control Center',
          caption: 'KUKA KRL Control Center e diagnostica del progetto in Visual Studio Code',
          src: '/media/kuka_control_center.gif',
          alt: 'KUKA KRL Control Center in Visual Studio Code'
        },
        {
          id: 'backup-diff',
          label: 'Diff backup .zip',
          caption: 'Confronto archivi SmartPAD (.zip / KRCDiag) e calcolo delta 6D E6POS senza estrazione',
          src: '/media/krc_backup_diff.gif',
          alt: 'Confronto backup KRC in VS Code'
        },
        {
          id: 'io-signals',
          label: 'Segnali I/O',
          caption: 'Ispettore segnali $IN/$OUT e suggerimenti inline (Inlay Hints)',
          src: '/media/krl_io_signals.gif',
          alt: 'Ispettore segnali I/O KRL'
        },
        {
          id: 'autocomplete',
          label: 'LSP e tipi',
          caption: 'Completamento per 957 variabili di sistema KSS e navigazione F12 tra .src e .dat',
          src: '/media/smart_autocomplete.gif',
          alt: 'Completamento intelligente per KUKA KRL'
        }
      ]
    },
    workflows: {
      eyebrow: 'Flussi principali',
      heading: 'Tre scenari operativi che fanno risparmiare ore in avviamento',
      subtitle:
        'Progettato per l’attività reale in reparto: verificare punti ritoccati tra turni, controllare il codice KRL prima della cella e leggere progetti .wvs senza avviare suite pesanti.',
      w1: {
        badge: 'Scenario 01 · Backup SmartPAD',
        title: 'Confronto backup (.zip / KRCDiag) e delta punti E6POS senza estrarre',
        body: 'Monta archivi del controllore (.zip, .ibz, KRCDiag) direttamente in VS Code oppure confronta due versioni. Se i punti vengono modificati sullo SmartPAD, lo strumento calcola i delta 6D (ΔX, ΔY, ΔZ, ΔA, ΔB, ΔC) nel Diff standard.',
        bullets: [
          'Elaborazione in memoria senza cartelle temporanee sul PC.',
          'Evidenzia le variazioni E6POS nei file .dat distinguendole dalle intestazioni.',
          'Decodifica offline dei log binari di sistema .evt (EVTX).'
        ],
        mediaSrc: '/media/krc_backup_diff.gif',
        mediaAlt: 'Confronto backup SmartPAD in VS Code',
        mediaCaption: 'Registrato in VS Code: diff backup KRC e delta coordinate'
      },
      w2: {
        badge: 'Scenario 02 · Audit statico e Diff-Fix',
        title: 'Analisi statica KRL e correzioni sicure con anteprima Diff',
        body: 'Rileva errori comuni prima del trasferimento sul pannello: $OUT che bloccano l’Advance Run, BRAKE mancanti prima di RESUME, movimenti in DRYRUN ... ENDDRYRUN, $TOOL/$BASE non assegnati, UTF-8 BOM (non ammesso su iiQKA.OS2) e migrazione KSS 5.4–9.3 / iiQKA.OS2 (PDAT/LDAT senza VEL, SVEL_CP2, MotionParamSets.dat). Ogni fix preserva ;%{PE}.',
        bullets: [
          'Mantiene checksum Inline-Form (;FOLD ... ;%{PE}) e codifiche UTF-8 senza BOM (iiQKA.OS2), CP1251 e Windows-1252.',
          'Verifica DRYRUN ... ENDDRYRUN, bilanciamento blocchi, limiti $IN/$OUT/$FLAG/$TIMER, SPS.SUB, VASS 26 / VKRC e migrazione PDAT/LDAT.',
          'Spiega la conseguenza tecnica esatta sul controllore.'
        ],
        diffHeading: 'Esempi Prima / Dopo con impatto tecnico',
        mediaSrc: '/media/type-validation-demo.gif',
        mediaAlt: 'Diagnostica statica KRL in VS Code',
        mediaCaption: 'Registrato in VS Code: diagnostica KRL e correzioni rapide',
        scenarios: [
          {
            id: 'advance_run',
            tabLabel: 'Advance Run ($OUT)',
            issueTitle: 'Arresto implicito di Advance Run in moto continuo',
            consequence:
              'Un’assegnazione diretta $OUT[12] tra movimenti C_DIS ferma il puntatore di prelettura: il robot rallenta fino a fermarsi brevemente invece di raccordare.',
            beforeLabel: 'Prima: arresto Advance Run',
            afterLabel: 'Dopo: TRIGGER sincronizzato',
            beforeCode: `LIN XPICK_APPROACH C_DIS\n$OUT[12] = TRUE ; Arresta Advance Run prima del segmento successivo\nLIN XPICK_PART`,
            afterCode: `LIN XPICK_APPROACH C_DIS\nTRIGGER WHEN DISTANCE=0 DELAY=0 DO $OUT[12] = TRUE\nLIN XPICK_PART ; Raccordo C_DIS continuo preservato`
          },
          {
            id: 'missing_brake',
            tabLabel: 'BRAKE mancante prima di RESUME',
            issueTitle: 'Completamento indesiderato del segmento & errore stack (KSS 1584)',
            consequence:
              'Eseguire RESUME senza BRAKE (o INTERRUPT WITH BRAKE) provoca uno stop di prelettura: il robot completa il segmento attivo anziché frenare subito, e genera KSS 1584 se $ADVANCE=0 o lo stack non sono rispettati.',
            beforeLabel: 'Prima: manca BRAKE prima di RESUME',
            afterLabel: 'Dopo: BRAKE prima di RESUME',
            beforeCode: `DEF PART_SEARCH_ISR()\n  INTERRUPT OFF 10\n  RESUME ; Rischio: completa il segmento senza BRAKE (e KSS 1584 se stack errato)\nEND`,
            afterCode: `DEF PART_SEARCH_ISR()\n  INTERRUPT OFF 10\n  BRAKE  ; Arresta subito il movimento (o INTERRUPT WITH BRAKE)\n  RESUME ; Ritorno sicuro\nEND`
          },
          {
            id: 'fold_bom',
            tabLabel: 'UTF-8 BOM e ;FOLD',
            issueTitle: 'Intestazioni Inline-Form e codifica danneggiate',
            consequence:
              'Editor generici aggiungono UTF-8 BOM o rimuovono ;%{PE}, causando errori su SmartPAD o dal compilatore KSS / iiQKA.OS2.',
            beforeLabel: 'Prima: parametri ;%{PE} rimossi',
            afterLabel: 'Dopo: struttura ;FOLD valida e CRLF',
            beforeCode: `; L'editor generico ha rimosso i parametri ;%{PE}\n;FOLD INI\n  BAS (#INITMOV,0 )\n;ENDFOLD (INI)`,
            afterCode: `; Intestazione KRL valida con CRLF senza BOM\n;FOLD INI;%{PE}%R 8.6.1,%MKUKATPBASIS,%CINITMOV,%VINITMOV,%P 1:INITMOV, 2:0\n  BAS (#INITMOV,0 )\n;ENDFOLD (INI)`
          }
        ]
      },
      w3: {
        badge: 'Scenario 03 · .wvs, .vcmx e Monitor Live',
        title: 'Ispezione WorkVisual (.wvs), KUKA.Sim (.vcmx), iiQKA EKI/RSI 6.x e ponte Live',
        body: 'Apri archivi .wvs per consultare topologia EtherCAT/PROFINET, esportare tabelle I/O verso TIA Portal, TwinCAT 3 o EPLAN e validare/generare moduli iiQKA.EthernetKRL 6.x e iiQKA.RSI 6.x. In rete collega VS Code tramite WCF (49002), iiQKA gRPC (443), probe OPC UA (4840) o KUKAVARPROXY (7000).',
        bullets: [
          'Analizza bus .wvs, pacchetti KOP e contesti iiQKA.EthernetKRL 6.x / iiQKA.RSI 6.x su Windows, macOS o Linux senza WorkVisual.',
          'Legge fino a 4.096 segnali I/O con filtro CFG (KrcIoSignals.xml) e descrizioni SmartPAD UserTexts.kxr / $config.dat.',
          'Credenziali salvate per host in VS Code SecretStorage.'
        ],
        mediaSrc: '/media/krl_io_signals.gif',
        mediaAlt: 'Ispettore segnali I/O in VS Code',
        mediaCaption: 'Registrato in VS Code: tabella I/O e commenti di progetto'
      }
    },
    comparison: {
      eyebrow: 'Confronto onesto',
      heading: 'Differenze rispetto a semplici evidenziatori e a WorkVisual',
      subtitle:
        'Ogni strumento ha il proprio ruolo. Qui sono chiari i vantaggi del Toolkit e dove resta necessario WorkVisual.',
      tableCaption: 'Confronto tra evidenziazione KRL base, KUKA WorkVisual e KUKA KRL Toolkit',
      colCapability: 'Attività ingegneristica',
      colPlain: 'Sintassi KRL base (TextMate)',
      colWorkVisual: 'KUKA WorkVisual / iiQWorks.Sim',
      colToolkit: 'KUKA KRL Toolkit (Community / Pro)',
      rows: [
        {
          feature: 'Sistemi operativi',
          plainSyntax: 'Windows / macOS / Linux',
          workVisual: 'Solo Windows',
          krlToolkit: 'Windows / macOS / Linux (VS Code, Cursor)'
        },
        {
          feature: 'Navigazione F12 (.src ↔ .dat) e rinomina',
          plainSyntax: 'No',
          workVisual: 'Navigazione base',
          krlToolkit: 'LSP completo, Riferimenti, Call Hierarchy (Community)'
        },
        {
          feature: 'Diagnostica Advance Run, BRAKE, ;FOLD e VASS 26',
          plainSyntax: 'No',
          workVisual: 'Parziale in compilazione',
          krlToolkit: 'Analisi statica live e correzione Diff (Pro)'
        },
        {
          feature: 'Diff backup .zip e delta E6POS senza estrazione',
          plainSyntax: 'No',
          workVisual: 'Richiede importazione',
          krlToolkit: 'Mount in memoria e delta 6D < 80 ms (Pro)'
        },
        {
          feature: 'Topologia WorkVisual (.wvs) ed export I/O',
          plainSyntax: 'No',
          workVisual: 'Ambiente nativo',
          krlToolkit: 'Lettura ed export verso TIA / TwinCAT / EPLAN (Pro)'
        },
        {
          feature: 'Configurazione hardware bus e deploy sul robot',
          plainSyntax: 'No',
          workVisual: 'Scopo principale',
          krlToolkit: 'Non supportato — serve WorkVisual'
        },
        {
          feature: 'Certificazione di sicurezza (SIL / PL)',
          plainSyntax: 'No',
          workVisual: 'Configurazione SafeOperation',
          krlToolkit: 'Non è software di sicurezza (Non-SIL / Non-PL)'
        }
      ],
      honestNoteTitle: 'Confine chiaro',
      honestNoteBody:
        'KUKA KRL Toolkit non sostituisce WorkVisual per configurazione bus, SafeOperation o deploy sul controllore e non è software certificato di sicurezza (Non-SIL). Velocizza revisione codice e confronto backup.'
    },
    capabilities: {
      eyebrow: 'Moduli',
      heading: 'Strumenti principali in un’unica estensione',
      subtitle:
        'Inizia dagli 8 moduli principali o espandi all’occorrenza l’elenco completo dei comandi e delle impostazioni VS Code.',
      featuredHeading: 'Moduli in evidenza',
      showAllBtn: 'Mostra tutte le funzionalità',
      collapseBtn: 'Mostra solo i principali',
      registryNote:
        'La vista estesa elenca i comandi e le impostazioni tecniche registrati nel manifest dell’estensione VS Code.',
      searchPlaceholder: 'Filtra per nome o ID comando (es. backup, spline)...',
      searchAria: 'Filtra funzionalità',
      allCategoryLabel: 'Tutte le categorie',
      emptyResults: 'Nessun risultato trovato.',
      viewDemoBtn: 'Dettagli',
      badgeFree: 'Community',
      badgePro: 'Pro',
      featured: [
        {
          id: 'krl.compareKrcBackup',
          title: 'Diff backup KRC (.zip / KRCDiag)',
          category: 'Backup e archivi',
          tier: 'Pro',
          description: 'Confronta archivi .zip/.ibz in memoria e calcola delta 6D E6POS senza estrarre.',
          commandId: 'krl.compareKrcBackup',
          mediaSrc: '/media/krc_backup_diff.gif',
          mediaAlt: 'Demo diff backup KRC'
        },
        {
          id: 'krl.fixAllSafeIssuesInFile',
          title: 'Audit statico KRL e riparazione Diff',
          category: 'Diagnostica',
          tier: 'Pro',
          description: 'Individua Advance Run, BRAKE mancanti, UTF-8 BOM e VASS 26 con anteprima Diff.',
          commandId: 'krl.fixAllSafeIssuesInFile',
          mediaSrc: '/media/type-validation-demo.gif',
          mediaAlt: 'Diagnostica statica KRL'
        },
        {
          id: 'krl.inspectFieldbusTopology',
          title: 'WorkVisual (.wvs) ed export I/O',
          category: 'Bus e integrazione',
          tier: 'Pro',
          description: 'Leggi topologia EtherCAT/PROFINET ed esporta segnali in TIA Portal, TwinCAT ed EPLAN.',
          commandId: 'krl.inspectFieldbusTopology',
          mediaSrc: '/media/krl_io_signals.gif',
          mediaAlt: 'Ispettore segnali I/O'
        },
        {
          id: 'krl.live.openDashboard',
          title: 'Monitor Live (WCF / KVP / iiQKA)',
          category: 'Collegamento controllore',
          tier: 'Pro',
          description: 'Leggi $TOOL/$BASE, coppie assi e 4.096 I/O via WCF, KVP o gRPC.',
          commandId: 'krl.live.openDashboard',
          mediaSrc: '/media/kuka_control_center.gif',
          mediaAlt: 'Pannello Control Center'
        },
        {
          id: 'krl.showFlowchart',
          title: 'Diagramma di flusso interattivo',
          category: 'Analisi logica',
          tier: 'Pro',
          description: 'Grafi IF, SWITCH e LOOP con salto al codice ed esportazione SVG.',
          commandId: 'krl.showFlowchart',
          mediaSrc: '/media/control_flow_graph.gif',
          mediaAlt: 'Diagramma di flusso KRL'
        },
        {
          id: 'krl.openEventLog',
          title: 'Decodificatore log binari .evt (EVTX)',
          category: 'Backup e archivi',
          tier: 'Pro',
          description: 'Ispezione offline dei log eventi .evt del controllore in 6 lingue.',
          commandId: 'krl.openEventLog',
          mediaSrc: '/media/kuka_control_center.gif',
          mediaAlt: 'Lettore log .evt'
        },
        {
          id: 'krl.lspCore',
          title: 'Language Server KRL e F12',
          category: 'Editor base',
          tier: 'Free',
          description: 'Completamento di 957 variabili, F12 tra .src/.dat, formattazione e 6 temi.',
          commandId: 'krl.sortDeclarations',
          mediaSrc: '/media/smart_autocomplete.gif',
          mediaAlt: 'Completamento intelligente KRL'
        },
        {
          id: 'krl.cleanupUnusedVariables',
          title: 'Pulizia codice morto e punti',
          category: 'Diagnostica',
          tier: 'Pro',
          description: 'Individua rami irraggiungibili e dichiarazioni inutilizzate prima della consegna.',
          commandId: 'krl.cleanupUnusedVariables',
          mediaSrc: '/media/dead-code-demo.gif',
          mediaAlt: 'Analisi codice morto'
        }
      ],
      categoryNames: { All: 'Tutte le categorie' },
      typeNames: {}
    },
    pricing: {
      eyebrow: 'Prezzi',
      heading: 'Licenze trasparenti per singoli e team',
      subtitle:
        'Le funzioni base sono gratuite per studio e uso non commerciale. L’uso commerciale e i moduli Pro richiedono una licenza.',
      billingAnnual: 'Annuale',
      billingMonthly: 'Mensile',
      currencyAria: 'Seleziona valuta',
      openingCheckout: 'Apertura checkout...',
      lifetimeNotePrefix: 'Cerchi una licenza perpetua per 1 PC? ',
      lifetimeLinkLabel: 'Pro Lifetime',
      lifetimeNoteSuffix: ' è disponibile con pagamento unico.',
      enterprise100Note: 'Per stabilimenti fino a 100 postazioni è disponibile Enterprise Plant ($4.999 / anno su fattura).',
      tiers: [
        {
          id: 'community',
          name: 'Community',
          seatsLabel: 'Gratis per sempre',
          freeLabel: 'Gratis',
          periodYear: '',
          description: 'Editor KRL essenziale per formazione, progetti personali e valutazione interna di 30 giorni.',
          features: [
            'Evidenziazione sintassi KRL e 6 temi industriali',
            'Completamento LSP (957 variabili, 116 funzioni)',
            'Navigazione F12 (.src/.dat) e FOLD/UNFOLD',
            'Nessun limite di righe e controlli sintattici base'
          ],
          ctaLabel: 'Installa gratis',
          isCommunity: true
        },
        {
          id: 'pro',
          name: 'Engineer Pro',
          badge: 'Più scelto',
          seatsLabel: '1 postazione',
          priceUsd: 149,
          monthlyUsd: 19,
          periodYear: '/ anno',
          periodMonth: '/ mese',
          description: 'Suite Pro completa per avviamento e audit. Prova gratuita di 14 giorni senza carta.',
          features: [
            'Audit Advance Run, BRAKE, VASS 26 e fix Diff',
            'Diff backup .zip senza estrarre e delta 6D E6POS',
            'Lettura .wvs, .vcmx, log .evt e diagrammi',
            'Ponte live e cache offline di 30 giorni'
          ],
          ctaLabel: 'Attiva Pro',
          productIdAnnual: 'pdt_0NmAV012KFHSjUMyDomJ6',
          productIdMonthly: 'pdt_0NmAUzwdbzeERSktsOLTp',
          isPrimary: true
        },
        {
          id: 'team',
          name: 'Team',
          seatsLabel: 'Fino a 5 postazioni',
          priceUsd: 499,
          periodYear: '/ anno',
          description: 'Per team di avviamento con un’unica fattura aziendale.',
          features: [
            'Fino a 5 postazioni di lavoro',
            'Tutte le funzioni Engineer Pro per ogni utente',
            'Fattura aziendale unica e gestione postazioni',
            'Attivazione offline Air-Gap (.lic)'
          ],
          ctaLabel: 'Scegli Team',
          productIdAnnual: 'pdt_0NnLCdgD69GiXDLRJ0K5v'
        },
        {
          id: 'integrator',
          name: 'Integrator / Enterprise',
          seatsLabel: '20–100 postazioni',
          priceUsd: 1499,
          periodYear: '/ anno',
          description: 'Per system integrator e stabilimenti con reti isolate.',
          features: [
            '20 postazioni (o opzione Enterprise Plant 100 postazioni)',
            'File .lic firmati Ed25519 per celle Air-Gap',
            'Fattura / SEPA / PO e IVA UE 0% (Reverse Charge)',
            'Supporto prioritario su casi complessi'
          ],
          ctaLabel: 'Scegli Integrator',
          productIdAnnual: 'pdt_0Nq5QVTrbkJbWAUf8qoyn',
          isEnterprise: true
        }
      ],
      billingStrip: {
        dodoTitle: 'Pagamenti e fatture tramite Dodo Payments',
        dodoText: 'Carte, bonifico, ricevute fiscali PDF immediate e IVA UE 0% con partita IVA VIES valida.',
        cancelTitle: 'Disdetta in 1 clic',
        cancelText: 'Annulla in qualsiasi momento da VS Code (krl.manageSubscription) o dal portale clienti.',
        refundTitle: 'Rimborso entro 14 giorni',
        refundText: 'Se non è adatto al tuo flusso KUKA, richiedi il rimborso entro 14 giorni dalla chat di supporto in VS Code.',
        portalBtn: 'Portale Dodo Payments'
      },
      promoFootnote:
        'Il codice lancio LAUNCH30 (−30%) viene applicato automaticamente al checkout. Gli importi in EUR/RUB/TRY sono indicativi; il pagamento avviene in USD.',
      procurement: {
        eyebrow: 'Aziende e acquisti',
        heading: 'Acquisto per team o aziende',
        body: 'Gestione fiscale tramite Merchant of Record Dodo Payments oppure richiesta diretta di fattura / SEPA / PO e chiavi Air-Gap.',
        points: [
          'Fatture PDF ufficiali e inversione contabile UE VIES 0%.',
          'File di licenza Ed25519 (.lic) per laptop di cantiere senza internet.',
          'Richiedi fattura aziendale da VS Code con krl.requestCorporateInvoice.'
        ],
        btnPortal: 'Portale fatture Dodo',
        btnAirGap: 'Portale Air-Gap (.lic)',
        btnVsCodeInvoice: 'Richiedi fattura in VS Code'
      }
    },
    security: {
      eyebrow: 'Sicurezza e Air-Gap',
      heading: 'Progettato per reti produttive isolate',
      subtitle: 'I programmi KRL e i backup restano sempre sulla postazione dell’ingegnere.',
      items: [
        {
          title: '1. Elaborazione 100% locale',
          body: 'Parsing KRL, analisi AST, calcolo delta e lettura .zip/.wvs avvengono in locale senza inviare codice sorgente al cloud.'
        },
        {
          title: '2. Licenze offline (Air-Gap)',
          body: 'Le reti isolate supportano file firmati Ed25519 (.lic), oltre a una cache offline di 30 giorni per le licenze commerciali.'
        },
        {
          title: '3. Verifica del pacchetto',
          body: 'Ogni rilascio è verificato tramite ReversingLabs Spectra Assure (0 CVE). Documentazione e issue tracker sono pubblici su GitHub.'
        }
      ],
      spectraLink: 'Report ReversingLabs Spectra Assure',
      githubLink: 'Repository pubblico GitHub',
      privacyLink: 'Privacy Policy (PRIVACY.md)'
    },
    author: {
      eyebrow: 'Autore e contatti',
      heading: 'Chi sviluppa questo strumento',
      name: 'Silvestr Liskin (LiskinLabs)',
      role: 'Ingegnere robotico e autore di KUKA KRL Engineering Toolkit',
      photoSlotNote: 'Spazio per foto autore (/author.jpg)',
      bio1: 'Lavoro nella messa in servizio di robot industriali KUKA e software di cella. Questa estensione nasce dall’esperienza sul campo: individuare errori Advance Run prima del test sullo SmartPAD, confrontare backup e leggere segnali .wvs senza aprire suite pesanti.',
      bio2: 'Serve una fattura aziendale, supporto su un archivio KRC particolare o un test in rete isolata? Scrivi tramite la chat integrata in VS Code o su GitHub Issues.',
      channelsHeading: 'Canali diretti e distribuzione',
      channels: [
        {
          label: 'Chat di supporto in VS Code',
          detail: 'Comando krl.openTelegramChat per supporto tecnico e fatture B2B',
          href: 'vscode://LiskinLabs.kuka-krl-extension/support',
          external: false
        },
        {
          label: 'GitHub Issues',
          detail: 'Segnalazioni bug, casi KRL e richieste funzionalità',
          href: 'https://github.com/LiskinLabs/kuka-krl-extension/issues',
          external: true
        },
        {
          label: 'VS Code Marketplace',
          detail: 'Scheda ufficiale e cronologia versioni',
          href: 'https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension',
          external: true
        },
        {
          label: 'Open VSX Registry',
          detail: 'Per Cursor, Windsurf e VSCodium',
          href: 'https://open-vsx.org/extension/LiskinLabs/kuka-krl-extension',
          external: true
        }
      ]
    },
    footer: {
      brandName: 'LiskinLabs',
      brandDesc: 'Strumenti ingegneristici indipendenti per lo sviluppo KUKA KRL in Visual Studio Code.',
      colProduct: 'Sezioni',
      colResources: 'Risorse',
      colLegal: 'Note legali',
      links: {
        workflows: 'Funzionalità',
        comparison: 'Confronto',
        pricing: 'Prezzi',
        security: 'Sicurezza e Air-Gap',
        docs: 'Documentazione',
        marketplace: 'VS Code Marketplace',
        openVsx: 'Open VSX',
        github: 'GitHub',
        portal: 'Portale Dodo Payments'
      },
      disclaimer:
        'Software indipendente di LiskinLabs (Silvestr Liskin), non affiliato a KUKA AG né a Microsoft Corporation. KUKA, KRL, KRC, KSS, WorkVisual, KUKA.Sim e SmartPAD sono marchi di KUKA Roboter GmbH. Non è software certificato per la sicurezza (Non-SIL / Non-PL) e non sostituisce la verifica fisica in T1.',
      copyright: '© 2024–2026 LiskinLabs (Silvestr Liskin)'
    },
    modals: {
      closeAria: 'Chiudi finestra',
      closeBtn: 'Chiudi',
      trialTitle: 'Prova gratuita Pro di 14 giorni',
      trialSubtitle: 'Valuta tutti i moduli Pro per 14 giorni senza carta di credito.',
      trialSteps: [
        { step: '1. Installa l’estensione', text: 'Installa KRL Engineering Toolkit dal VS Code Marketplace.' },
        { step: '2. Apri la Command Palette', text: 'Premi Ctrl+Shift+P (o Cmd+Shift+P su macOS).' },
        { step: '3. Avvia la prova', text: 'Esegui il comando krl.startTrial.' }
      ],
      trialOpenVsCode: 'Apri in VS Code',
      trialGotIt: 'Ho capito',
      toolModalCategoryLabel: 'Categoria',
      toolModalCompat: 'Compatibile con KSS 5.x–8.7 (KRC2 / KRC4 / KRC5) e iiQKA'
    }
  }
}

export const LOCALE_PATHS: Record<LocaleCode, string> = {
  en: '/',
  ru: '/ru/',
  de: '/de/',
  tr: '/tr/',
  es: '/es/',
  it: '/it/'
}
