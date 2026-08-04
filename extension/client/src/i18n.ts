/**
 * Internationalization (i18n) module for KRL Language Support extension.
 * Provides localized strings for the client-side (VS Code extension host).
 */

import * as vscode from "vscode";

// Supported locales
type Locale = "en" | "ru" | "tr";

// Message keys
interface Messages {
  // Information messages
  "info.checkingAllFiles": string;
  "info.documentFormatted": string;
  "info.trailingWhitespaceRemoved": string;
  "info.noTrailingWhitespace": string;
  "info.declarationsSorted": string;
  "info.noDeclarationsToSort": string;
  "info.noSystemVariablesFound": string;

  // Warning messages
  "warning.noActiveKrlFile": string;
  "warning.invalidGlobalUsage": string;

  // Error messages
  "error.serverNotRunning": string;

  // Prompts
  "prompt.foldRegionName": string;
  "prompt.foldRegionPlaceholder": string;

  // Pickers
  "picker.systemVariables": string;
  "picker.selectSystemVariable": string;

  // Command Titles for Tree View
  "command.calculator": string;
  "command.cleanup": string;
  "command.formatDocument": string;
  "command.sortDeclarations": string;
  "command.foldAll": string;
  "command.unfoldAll": string;
  "command.refreshIOView": string;
  "command.showFlowchart": string;

  // Flowchart Viewer
  "flow.err.unreachable": string;
  "flow.err.infiniteLoop": string;
  "flow.err.emptyBranch": string;
  "flow.err.invalidGoto": string;
  "flow.err.uninitMotion": string;
  "flow.msg.emptyBranch": string;
  "flow.msg.infiniteLoop": string;
  "flow.msg.unreachableMotion": string;
  "flow.msg.unreachableCode": string;
  "flow.msg.uninitMotion": string;
  "flow.msg.invalidGoto": string;

  // Snippet Generator
  "snippet.title": string;
  "snippet.tab.message": string;
  "snippet.tab.grid": string;
  "snippet.tab.motion": string;
  "snippet.msg.title": string;
  "snippet.msg.desc": string;
  "snippet.msg.type": string;
  "snippet.msg.type.notify": string;
  "snippet.msg.type.quit": string;
  "snippet.msg.type.state": string;
  "snippet.msg.type.wait": string;
  "snippet.msg.key": string;
  "snippet.msg.key.placeholder": string;
  "snippet.msg.text": string;
  "snippet.msg.text.placeholder": string;
  "snippet.msg.param1": string;
  "snippet.msg.param1.placeholder": string;
  "snippet.insert": string;
  "snippet.grid.title": string;
  "snippet.grid.desc": string;
  "snippet.grid.base": string;
  "snippet.grid.rows": string;
  "snippet.grid.cols": string;
  "snippet.grid.spaceX": string;
  "snippet.grid.spaceY": string;
  "snippet.mot.title": string;
  "snippet.mot.desc": string;
  "snippet.mot.type": string;
  "snippet.mot.point": string;
  "snippet.mot.vel": string;
  "snippet.mot.approx": string;
  "snippet.mot.approx.none": string;
  "snippet.alert.inserted": string;
  "snippet.alert.noEditor": string;
}

// English (default)
const en: Messages = {
  "info.checkingAllFiles": "KRL: Checking all files...",
  "info.documentFormatted": "KRL: Document formatted.",
  "info.trailingWhitespaceRemoved":
    "KRL: Trailing whitespace removed from {0} lines.",
  "info.noTrailingWhitespace": "KRL: No trailing whitespace found.",
  "info.declarationsSorted": "KRL: {0} declarations sorted by type.",
  "info.noDeclarationsToSort": "KRL: No declarations to sort.",

  "warning.noActiveKrlFile": "No active KRL file.",
  "warning.invalidGlobalUsage": "Invalid 'GLOBAL' modifier usage.",

  "error.serverNotRunning": "KRL Server is not running.",

  "prompt.foldRegionName": "Enter name for FOLD region",
  "prompt.foldRegionPlaceholder": "e.g.: Initialization, Movement, Gripper",

  "info.noSystemVariablesFound": "No system variables found in workspace.",
  "picker.systemVariables": "System Variables",
  "picker.selectSystemVariable": "Select a system variable to find...",

  "command.openControlCenter": "Open Control Center",
  "command.openControlCenter.tooltip":
    "Open KUKA KRL Professional Control Center Dashboard",
  "command.calculator": "3-Point Frame Calculator",
  "command.calculator.tooltip": "Open Base/Tool Coordinate Calculator",
  "command.cleanup": "Clean Up Unused Variables",
  "command.cleanup.tooltip": "Remove unused variables and dead subroutines",
  "command.formatDocument": "Format Document",
  "command.formatDocument.tooltip": "Format current KRL file",
  "command.sortDeclarations": "Sort Declarations",
  "command.sortDeclarations.tooltip": "Sort variables by type",
  "command.foldAll": "Fold All",
  "command.foldAll.tooltip": "Collapse all regions",
  "command.unfoldAll": "Unfold All",
  "command.unfoldAll.tooltip": "Expand all regions",
  "command.refreshIOView": "Refresh I/O View",
  "command.refreshIOView.tooltip": "Refresh I/O Signal List",
  "command.showFlowchart": "Interactive Logic Flowchart",
  "command.showFlowchart.tooltip":
    "Visualize KRL control-flow graph and logic branches",
  "command.compareKrcBackup": "KRC Backup Diff & Point Delta",
  "command.compareKrcBackup.tooltip":
    "Compare codebase & point coordinates against KRC ZIP backup",
  "command.openSnippetGenerator": "Snippet & Motion Generator",
  "command.openSnippetGenerator.tooltip":
    "Open Interactive Trajectory Diagrams & Snippet Builder",
  "command.aiCheckSafety": "Safety & Velocity Check",
  "command.aiCheckSafety.tooltip":
    "Run strict industrial safety checks ($VEL.CP, uninit tools/bases)",
  "command.aiGetIoMatrix": "Extract I/O Matrix",
  "command.aiGetIoMatrix.tooltip":
    "Extract physical signal mappings for AI context and docs",
  "command.validateEkiXml": "EthernetKRL (EKI) Validator",
  "command.validateEkiXml.tooltip": "Validate EKI XML schema files",
  "command.generateEkiCode": "Generate EKI Handler Routine",
  "command.generateEkiCode.tooltip":
    "Generate KRL communication subprogram for EthernetKRL",
  "command.cleanGitMetadata": "Clean WorkVisual Git Metadata",
  "command.cleanGitMetadata.tooltip":
    "Strip &ACCESS, &REL, &PARAM from WorkVisual files",
  "command.generateReport": "Generate Acceptance Report",
  "command.generateReport.tooltip":
    "Generate structured quality acceptance report",

  "cc.engTools": "Engineering Pro Tools",
  "cc.safetyDiag": "Safety Diagnostics & Quality",
  "cc.accountHub": "Engineer Pro Account Hub",
  "cc.tab.profile": "Profile & Key",
  "cc.tab.devices": "Device Manager",
  "cc.tab.billing": "Subscription & Billing",
  "cc.tab.support": "Support & Feedback",
  "cc.btn.openFlowchart": "Open Flowchart",
  "cc.btn.inspectBackup": "Inspect Backup",
  "cc.btn.generateSnippets": "Generate Snippets",
  "cc.btn.openCalculator": "Open Calculator",
  "cc.btn.ekiValidator": "EKI Validator",
  "cc.btn.generateHandler": "Generate Handler",
  "cc.btn.cleanGitMetadata": "Clean Git Metadata",
  "cc.btn.runSafetyCheck": "Run Safety Check",
  "cc.btn.generateReport": "Generate Report",
  "cc.btn.extractIoMatrix": "Extract I/O Matrix",

  "flow.err.unreachable": "Unreachable Code",
  "flow.err.infiniteLoop": "Infinite Loop",
  "flow.err.emptyBranch": "Empty Branch",
  "flow.err.invalidGoto": "Invalid GOTO",
  "flow.err.uninitMotion": "Uninitialized Motion",
  "flow.msg.emptyBranch": "IF condition on line {0} has an empty branch.",
  "flow.msg.infiniteLoop": "LOOP on line {0} has no EXIT/HALT commands.",
  "flow.msg.unreachableMotion":
    "Motion command on line {0} is unreachable after flow interruption.",
  "flow.msg.unreachableCode":
    "Code on line {0} is unreachable due to flow interruption (RETURN/EXIT/HALT).",
  "flow.msg.uninitMotion":
    "Motion on line {0} lacks prior TOOL/BASE initialization (needs BAS(#INITMOV) or $TOOL/$BASE).",
  "flow.msg.invalidGoto":
    "Target label '{0}' for GOTO on line {1} is undefined in this file.",

  "snippet.title": "KRL Snippet Generator",
  "snippet.tab.message": "Message Builder",
  "snippet.tab.grid": "Grid Pattern",
  "snippet.tab.motion": "Motion (PTP/LIN)",
  "snippet.msg.title": "KUKA User Message",
  "snippet.msg.desc": "Generates code for KUKA User Messages (KrlMsg).",
  "snippet.msg.type": "Type",
  "snippet.msg.type.notify": "Notify (Log)",
  "snippet.msg.type.quit": "Quit (Acknowledge)",
  "snippet.msg.type.state": "State (Status)",
  "snippet.msg.type.wait": "Wait (Blocking)",
  "snippet.msg.key": "Key (Unique ID)",
  "snippet.msg.key.placeholder": "e.g. MyMsg1",
  "snippet.msg.text": "Message Text (use %1, %2 for params)",
  "snippet.msg.text.placeholder": "e.g. Value is %1",
  "snippet.msg.param1": "Parameter 1 (Optional)",
  "snippet.msg.param1.placeholder": "e.g. nCount",
  "snippet.insert": "Insert Snippet",
  "snippet.grid.title": "Palletizing Grid",
  "snippet.grid.desc": "Generates nested loops for a grid pattern.",
  "snippet.grid.base": "Base Point Name",
  "snippet.grid.rows": "Rows (X)",
  "snippet.grid.cols": "Cols (Y)",
  "snippet.grid.spaceX": "Spacing X (mm)",
  "snippet.grid.spaceY": "Spacing Y (mm)",
  "snippet.mot.title": "Motion Command",
  "snippet.mot.desc": "Generates standard PTP or LIN movement blocks.",
  "snippet.mot.type": "Motion Type",
  "snippet.mot.point": "Point Name",
  "snippet.mot.vel": "Velocity (m/s or %)",
  "snippet.mot.approx": "Approximation",
  "snippet.mot.approx.none": "None",
  "snippet.alert.inserted": "Snippet inserted!",
  "snippet.alert.noEditor": "No active KRL editor found!",
};

// Russian
const ru: Messages = {
  "info.checkingAllFiles": "KRL: Проверка всех файлов...",
  "info.documentFormatted": "KRL: Документ отформатирован.",
  "info.trailingWhitespaceRemoved": "KRL: Удалены пробелы в конце {0} строк.",
  "info.noTrailingWhitespace": "KRL: Пробелы в конце строк не найдены.",
  "info.declarationsSorted": "KRL: {0} объявлений отсортировано по типу.",
  "info.noDeclarationsToSort": "KRL: Нет объявлений для сортировки.",

  "warning.noActiveKrlFile": "Нет активного KRL файла.",
  "warning.invalidGlobalUsage": "Неверное использование модификатора 'GLOBAL'.",

  "error.serverNotRunning": "KRL сервер не запущен.",

  "prompt.foldRegionName": "Введите имя для FOLD-региона",
  "prompt.foldRegionPlaceholder": "например: Инициализация, Движение, Захват",

  "info.noSystemVariablesFound":
    "Системные переменные не найдены в рабочем пространстве.",
  "picker.systemVariables": "Системные переменные",
  "picker.selectSystemVariable": "Выберите системную переменную для поиска...",

  "command.openControlCenter": "Открыть Панель управления",
  "command.openControlCenter.tooltip":
    "Открыть главную панель управления KUKA Control Center",
  "command.calculator": "3D Калькулятор фреймов",
  "command.calculator.tooltip":
    "Калькулятор 3D фреймов баз и инструментов KUKA",
  "command.cleanup": "Очистка неиспользуемых переменных",
  "command.cleanup.tooltip": "Удалить неиспользуемые переменные и мертвый код",
  "command.formatDocument": "Форматировать документ",
  "command.formatDocument.tooltip": "Отформатировать текущий файл KRL",
  "command.sortDeclarations": "Сортировать объявления",
  "command.sortDeclarations.tooltip": "Сортировать объявления по типам данных",
  "command.foldAll": "Свернуть всё",
  "command.foldAll.tooltip": "Свернуть все блоки ;FOLD",
  "command.unfoldAll": "Развернуть всё",
  "command.unfoldAll.tooltip": "Развернуть все блоки ;FOLD",
  "command.refreshIOView": "Обновить сигналы I/O",
  "command.refreshIOView.tooltip": "Обновить дерево сигналов I/O",
  "command.showFlowchart": "Интерактивная блок-схема",
  "command.showFlowchart.tooltip": "Интерактивная блок-схема и граф логики KRL",
  "command.compareKrcBackup": "Сравнение KRC Бэкапа и дельт точек",
  "command.compareKrcBackup.tooltip":
    "Сравнить код и дельты точек E6POS с ZIP-бэкапом KRC",
  "command.openSnippetGenerator": "Генератор сниппетов и движений",
  "command.openSnippetGenerator.tooltip":
    "Интерактивные схемы траекторий и мастер сниппетов",
  "command.aiCheckSafety": "Проверка безопасности и скоростей",
  "command.aiCheckSafety.tooltip":
    "Проверить скорости $VEL.CP, инициализацию $TOOL/$BASE и кириллицу",
  "command.aiGetIoMatrix": "Извлечь матрицу I/O сигналов",
  "command.aiGetIoMatrix.tooltip":
    "Выгрузка матрицы физических сигналов $IN/$OUT для ИИ и документации",
  "command.validateEkiXml": "Валидатор EthernetKRL (EKI) XML",
  "command.validateEkiXml.tooltip": "Проверить XML-схемы обмена EthernetKRL",
  "command.generateEkiCode": "Генератор KRL-обработчика EKI",
  "command.generateEkiCode.tooltip":
    "Сгенерировать подпрограмму KRL для сетевого обмена EthernetKRL",
  "command.cleanGitMetadata": "Очистка Git-метаданных WorkVisual",
  "command.cleanGitMetadata.tooltip":
    "Очистить заголовки &ACCESS, &REL, &PARAM для чистых Git-коммитов",
  "command.generateReport": "Сформировать отчёт качества кода",
  "command.generateReport.tooltip":
    "Сформировать итоговый отчёт качества кода для сдачи заказчику",

  "cc.engTools": "Инженерные Pro-Инструменты",
  "cc.safetyDiag": "Диагностика Безопасности и Качества",
  "cc.accountHub": "Личный кабинет инженера Pro",
  "cc.tab.profile": "Профиль и Ключ",
  "cc.tab.devices": "Менеджер устройств",
  "cc.tab.billing": "Подписка и Счета",
  "cc.tab.support": "Поддержка и Обратная связь",
  "cc.btn.openFlowchart": "Открыть блок-схему",
  "cc.btn.inspectBackup": "Сравнить Бэкап",
  "cc.btn.generateSnippets": "Сниппеты и Траектории",
  "cc.btn.openCalculator": "Открыть Калькулятор",
  "cc.btn.ekiValidator": "Валидатор EKI",
  "cc.btn.generateHandler": "Создать обработчик EKI",
  "cc.btn.cleanGitMetadata": "Очистить Git-метаданные",
  "cc.btn.runSafetyCheck": "Проверить безопасность",
  "cc.btn.generateReport": "Сформировать отчёт",
  "cc.btn.extractIoMatrix": "Извлечь матрицу I/O",

  "flow.err.unreachable": "Недостижимый код",
  "flow.err.infiniteLoop": "Бесконечный цикл",
  "flow.err.emptyBranch": "Пустая ветка",
  "flow.err.invalidGoto": "Неверный GOTO",
  "flow.err.uninitMotion": "Без инициализации",
  "flow.msg.emptyBranch":
    "Условие IF на строке {0} имеет пустую ветку (не содержит исполняемого кода).",
  "flow.msg.infiniteLoop":
    "Цикл LOOP на строке {0} не имеет команд выхода (EXIT/HALT) и является бесконечным.",
  "flow.msg.unreachableMotion":
    "Команда движения на строке {0} недостижима после прерывания потока выполнения.",
  "flow.msg.unreachableCode":
    "Код на строке {0} недостижим из-за прерывания потока (RETURN/EXIT/HALT) выше.",
  "flow.msg.uninitMotion":
    "Движение на строке {0} вызвано без предварительной инициализации TOOL/BASE.",
  "flow.msg.invalidGoto":
    "Целевая метка '{0}' для перехода GOTO на строке {1} не определена в файле.",

  "snippet.title": "Генератор KRL Сниппетов",
  "snippet.tab.message": "Сообщения KUKA",
  "snippet.tab.grid": "Паттерн Сетки",
  "snippet.tab.motion": "Движение (PTP/LIN)",
  "snippet.msg.title": "Пользовательские сообщения",
  "snippet.msg.desc": "Генерация кода для сообщений (KrlMsg).",
  "snippet.msg.type": "Тип сообщения",
  "snippet.msg.type.notify": "Уведомление (Notify)",
  "snippet.msg.type.quit": "С подтверждением (Quit)",
  "snippet.msg.type.state": "Статусное (State)",
  "snippet.msg.type.wait": "Ожидание (Wait)",
  "snippet.msg.key": "Ключ (Уникальный ID)",
  "snippet.msg.key.placeholder": "напр. MyMsg1",
  "snippet.msg.text": "Текст (используйте %1, %2 для параметров)",
  "snippet.msg.text.placeholder": "напр. Значение равно %1",
  "snippet.msg.param1": "Параметр 1 (Опционально)",
  "snippet.msg.param1.placeholder": "напр. nCount",
  "snippet.insert": "Вставить Сниппет",
  "snippet.grid.title": "Сетка Паллетирования",
  "snippet.grid.desc": "Генерация вложенных циклов для сетки.",
  "snippet.grid.base": "Имя базовой точки",
  "snippet.grid.rows": "Строки (X)",
  "snippet.grid.cols": "Столбцы (Y)",
  "snippet.grid.spaceX": "Шаг по X (мм)",
  "snippet.grid.spaceY": "Шаг по Y (мм)",
  "snippet.mot.title": "Команда движения",
  "snippet.mot.desc": "Генерация стандартных движений PTP или LIN.",
  "snippet.mot.type": "Тип движения",
  "snippet.mot.point": "Имя точки",
  "snippet.mot.vel": "Скорость (м/с или %)",
  "snippet.mot.approx": "Сглаживание",
  "snippet.mot.approx.none": "Нет (Точно)",
  "snippet.alert.inserted": "Сниппет вставлен!",
  "snippet.alert.noEditor": "Активный KRL файл не найден!",
};

// Turkish
const tr: Messages = {
  "info.checkingAllFiles": "KRL: Tüm dosyalar kontrol ediliyor...",
  "info.documentFormatted": "KRL: Belge biçimlendirildi.",
  "info.trailingWhitespaceRemoved":
    "KRL: {0} satırdan sondaki boşluklar kaldırıldı.",
  "info.noTrailingWhitespace": "KRL: Sondaki boşluk bulunamadı.",
  "info.declarationsSorted": "KRL: {0} bildirim türe göre sıralandı.",
  "info.noDeclarationsToSort": "KRL: Sıralanacak bildirim bulunamadı.",

  "warning.noActiveKrlFile": "Aktif bir KRL dosyası yok.",
  "warning.invalidGlobalUsage": "Geçersiz 'GLOBAL' değiştirici kullanımı.",

  "error.serverNotRunning": "KRL Sunucusu çalışmıyor.",

  "prompt.foldRegionName": "FOLD bölgesi için isim girin",
  "prompt.foldRegionPlaceholder": "örn: Başlatma, Hareket, Gripper",

  "info.noSystemVariablesFound":
    "Çalışma alanında sistem değişkeni bulunamadı.",
  "picker.systemVariables": "Sistem Değişkenleri",
  "picker.selectSystemVariable": "Aramak için bir sistem değişkeni seçin...",

  "command.openControlCenter": "Kontrol Merkezini Aç",
  "command.openControlCenter.tooltip":
    "KUKA KRL Profesyonel Kontrol Merkezini Aç",
  "command.calculator": "3D Frame Hesaplayıcı",
  "command.calculator.tooltip": "KUKA Base/Tool Koordinat Hesaplayıcı",
  "command.cleanup": "Kullanılmayan Değişkenleri Temizle",
  "command.cleanup.tooltip":
    "Kullanılmayan değişkenleri ve ölü kodları temizle",
  "command.formatDocument": "Belgeyi Biçimlendir",
  "command.formatDocument.tooltip": "Mevcut KRL dosyasını biçimlendir",
  "command.sortDeclarations": "Bildirimleri Sırala",
  "command.sortDeclarations.tooltip": "Bildirimleri türlerine göre sırala",
  "command.foldAll": "Tümünü Katla",
  "command.foldAll.tooltip": "Tüm ;FOLD bölgelerini katla",
  "command.unfoldAll": "Tümünü Aç",
  "command.unfoldAll.tooltip": "Tüm ;FOLD bölgelerini aç",
  "command.refreshIOView": "I/O Listesini Yenile",
  "command.refreshIOView.tooltip": "I/O Sinyal Listesini Yenile",
  "command.showFlowchart": "Etkileşimli Akış Şeması",
  "command.showFlowchart.tooltip":
    "KRL akış şemasını ve mantık dallarını görselleştir",
  "command.compareKrcBackup": "KRC Yedek Karşılaştırma & Nokta Farkı",
  "command.compareKrcBackup.tooltip":
    "Kod ve E6POS nokta koordinatlarını KRC ZIP yedeği ile karşılaştır",
  "command.openSnippetGenerator": "Snippet & Hareket Oluşturucu",
  "command.openSnippetGenerator.tooltip":
    "Etkileşimli Yörünge Diyagramları & Snippet Oluşturucu",
  "command.aiCheckSafety": "Güvenlik & Hız Kontrolü",
  "command.aiCheckSafety.tooltip":
    "Katı endüstriyel güvenlik kontrollerini çalıştır ($VEL.CP, başlatılmamış tool/base)",
  "command.aiGetIoMatrix": "I/O Matrisini Çıkar",
  "command.aiGetIoMatrix.tooltip":
    "Yapay zeka bağlamı ve belgeler için fiziksel sinyal haritasını çıkar",
  "command.validateEkiXml": "EthernetKRL (EKI) Doğrulayıcı",
  "command.validateEkiXml.tooltip": "EKI XML şema dosyalarını doğrula",
  "command.generateEkiCode": "EKI İşleyici Rutini Oluştur",
  "command.generateEkiCode.tooltip":
    "EthernetKRL için KRL iletişim alt programı oluştur",
  "command.cleanGitMetadata": "WorkVisual Git Üst Bilgilerini Temizle",
  "command.cleanGitMetadata.tooltip":
    "Git farklarını temiz tutmak için &ACCESS, &REL, &PARAM başlıklarını kaldır",
  "command.generateReport": "Kalite Kabul Raporu Oluştur",
  "command.generateReport.tooltip":
    "Yapılandırılmış kod kalite kabul raporu oluştur",

  "cc.engTools": "Mühendislik Pro Araçları",
  "cc.safetyDiag": "Güvenlik Teşhisi & Kalite",
  "cc.accountHub": "Pro Mühendis Hesap Merkezi",
  "cc.tab.profile": "Profil & Anahtar",
  "cc.tab.devices": "Cihaz Yöneticisi",
  "cc.tab.billing": "Abonelik & Faturalandırma",
  "cc.tab.support": "Destek & Geri Bildirim",
  "cc.btn.openFlowchart": "Akış Şemasını Aç",
  "cc.btn.inspectBackup": "Yedeği İncele",
  "cc.btn.generateSnippets": "Snippet Oluştur",
  "cc.btn.openCalculator": "Hesaplayıcıyı Aç",
  "cc.btn.ekiValidator": "EKI Doğrulayıcı",
  "cc.btn.generateHandler": "İşleyici Oluştur",
  "cc.btn.cleanGitMetadata": "Git Üst Bilgilerini Temizle",
  "cc.btn.runSafetyCheck": "Güvenlik Kontrolünü Çalıştır",
  "cc.btn.generateReport": "Rapor Oluştur",
  "cc.btn.extractIoMatrix": "I/O Matrisini Çıkar",

  "flow.err.unreachable": "Ulaşılamayan Kod",
  "flow.err.infiniteLoop": "Sonsuz Döngü",
  "flow.err.emptyBranch": "Boş Dal",
  "flow.err.invalidGoto": "Geçersiz GOTO",
  "flow.err.uninitMotion": "Başlatılmamış Hareket",
  "flow.msg.emptyBranch": "{0}. satırdaki IF koşulunun boş bir dalı var.",
  "flow.msg.infiniteLoop":
    "{0}. satırdaki LOOP döngüsünde EXIT/HALT komutları yok.",
  "flow.msg.unreachableMotion":
    "{0}. satırdaki hareket komutuna akış kesintisi nedeniyle ulaşılamıyor.",
  "flow.msg.unreachableCode":
    "{0}. satırdaki koda akış kesintisi (RETURN/EXIT/HALT) nedeniyle ulaşılamıyor.",
  "flow.msg.uninitMotion":
    "{0}. satırdaki hareket, TOOL/BASE başlatılması olmadan çağrıldı (BAS(#INITMOV) gerekir).",
  "flow.msg.invalidGoto":
    "{1}. satırdaki GOTO hedef etiketi '{0}' dosyada tanımlanmamış.",

  "snippet.title": "KRL Snippet Oluşturucu",
  "snippet.tab.message": "Mesaj Oluşturucu",
  "snippet.tab.grid": "Izgara Deseni",
  "snippet.tab.motion": "Hareket (PTP/LIN)",
  "snippet.msg.title": "KUKA Kullanıcı Mesajı",
  "snippet.msg.desc": "KUKA Kullanıcı Mesajları (KrlMsg) için kod üretir.",
  "snippet.msg.type": "Tip",
  "snippet.msg.type.notify": "Bildirim (Notify)",
  "snippet.msg.type.quit": "Onay (Quit)",
  "snippet.msg.type.state": "Durum (State)",
  "snippet.msg.type.wait": "Bekleme (Wait)",
  "snippet.msg.key": "Anahtar (Benzersiz ID)",
  "snippet.msg.key.placeholder": "örn. MyMsg1",
  "snippet.msg.text": "Mesaj Metni (%1, %2 kullanabilirsiniz)",
  "snippet.msg.text.placeholder": "örn. Değer: %1",
  "snippet.msg.param1": "Parametre 1 (İsteğe Bağlı)",
  "snippet.msg.param1.placeholder": "örn. nCount",
  "snippet.insert": "Snippet Ekle",
  "snippet.grid.title": "Paletleme Izgarası",
  "snippet.grid.desc": "Izgara deseni için iç içe döngüler oluşturur.",
  "snippet.grid.base": "Temel Nokta Adı",
  "snippet.grid.rows": "Satırlar (X)",
  "snippet.grid.cols": "Sütunlar (Y)",
  "snippet.grid.spaceX": "Boşluk X (mm)",
  "snippet.grid.spaceY": "Boşluk Y (mm)",
  "snippet.mot.title": "Hareket Komutu",
  "snippet.mot.desc": "Standart PTP veya LIN hareket blokları oluşturur.",
  "snippet.mot.type": "Hareket Tipi",
  "snippet.mot.point": "Nokta Adı",
  "snippet.mot.vel": "Hız (m/s veya %)",
  "snippet.mot.approx": "Yaklaşım (Approximation)",
  "snippet.mot.approx.none": "Yok",
  "snippet.alert.inserted": "Snippet eklendi!",
  "snippet.alert.noEditor": "Aktif bir KRL düzenleyici bulunamadı!",
};

const locales: Record<Locale, Messages> = { en, ru, tr };

/**
 * Get current VS Code display language.
 */
function getCurrentLocale(): Locale {
  const vscodeLang = vscode.env.language;
  if (vscodeLang.startsWith("ru")) return "ru";
  if (vscodeLang.startsWith("tr")) return "tr";
  return "en";
}

/**
 * Get localized message by key.
 * Supports placeholders: {0}, {1}, etc.
 */
export function t(key: keyof Messages, ...args: (string | number)[]): string {
  const locale = getCurrentLocale();
  let message = locales[locale][key] || locales.en[key] || key;

  // Replace placeholders
  args.forEach((arg, index) => {
    message = message.replace(`{${index}}`, String(arg));
  });

  return message;
}

/**
 * Get all message keys for a specific locale.
 */
export function getMessages(locale: Locale = "en"): Messages {
  return locales[locale];
}
