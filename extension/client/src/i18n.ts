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

  "command.calculator": "KRL Calculator",
  "command.cleanup": "Clean Up Variables",
  "command.formatDocument": "Format Document",
  "command.sortDeclarations": "Sort Declarations",
  "command.foldAll": "Fold All",
  "command.unfoldAll": "Unfold All",
  "command.refreshIOView": "Refresh I/O",
  "command.showFlowchart": "Show Flowchart",

  "flow.err.unreachable": "Unreachable Code",
  "flow.err.infiniteLoop": "Infinite Loop",
  "flow.err.emptyBranch": "Empty Branch",
  "flow.err.invalidGoto": "Invalid GOTO",
  "flow.err.uninitMotion": "Uninitialized Motion",
  "flow.msg.emptyBranch": "IF condition on line {0} has an empty branch.",
  "flow.msg.infiniteLoop": "LOOP on line {0} has no EXIT/HALT commands.",
  "flow.msg.unreachableMotion": "Motion command on line {0} is unreachable after flow interruption.",
  "flow.msg.unreachableCode": "Code on line {0} is unreachable due to flow interruption (RETURN/EXIT/HALT).",
  "flow.msg.uninitMotion": "Motion on line {0} lacks prior TOOL/BASE initialization (needs BAS(#INITMOV) or $TOOL/$BASE).",
  "flow.msg.invalidGoto": "Target label '{0}' for GOTO on line {1} is undefined in this file.",

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

  "command.calculator": "KRL Калькулятор",
  "command.cleanup": "Очистка переменных",
  "command.formatDocument": "Форматировать документ",
  "command.sortDeclarations": "Сортировать объявления",
  "command.foldAll": "Свернуть всё",
  "command.unfoldAll": "Развернуть всё",
  "command.refreshIOView": "Обновить I/O",
  "command.showFlowchart": "Блок-схема",

  "flow.err.unreachable": "Недостижимый код",
  "flow.err.infiniteLoop": "Бесконечный цикл",
  "flow.err.emptyBranch": "Пустая ветка",
  "flow.err.invalidGoto": "Неверный GOTO",
  "flow.err.uninitMotion": "Без инициализации",
  "flow.msg.emptyBranch": "Условие IF на строке {0} имеет пустую ветку (не содержит исполняемого кода).",
  "flow.msg.infiniteLoop": "Цикл LOOP на строке {0} не имеет команд выхода (EXIT/HALT) и является бесконечным.",
  "flow.msg.unreachableMotion": "Команда движения на строке {0} недостижима после прерывания потока выполнения.",
  "flow.msg.unreachableCode": "Код на строке {0} недостижим из-за прерывания потока (RETURN/EXIT/HALT) выше.",
  "flow.msg.uninitMotion": "Движение на строке {0} вызвано без предварительной инициализации TOOL/BASE.",
  "flow.msg.invalidGoto": "Целевая метка '{0}' для перехода GOTO на строке {1} не определена в файле.",

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

  "command.calculator": "KRL Hesap Makinesi",
  "command.cleanup": "Değişkenleri Temizle",
  "command.formatDocument": "Belgeyi Biçimlendir",
  "command.sortDeclarations": "Bildirimleri Sırala",
  "command.foldAll": "Tümünü Katla",
  "command.unfoldAll": "Tümünü Aç",
  "command.refreshIOView": "I/O Listesini Yenile",
  "command.showFlowchart": "Akış Şeması",

  "flow.err.unreachable": "Ulaşılamayan Kod",
  "flow.err.infiniteLoop": "Sonsuz Döngü",
  "flow.err.emptyBranch": "Boş Dal",
  "flow.err.invalidGoto": "Geçersiz GOTO",
  "flow.err.uninitMotion": "Başlatılmamış Hareket",
  "flow.msg.emptyBranch": "{0}. satırdaki IF koşulunun boş bir dalı var.",
  "flow.msg.infiniteLoop": "{0}. satırdaki LOOP döngüsünde EXIT/HALT komutları yok.",
  "flow.msg.unreachableMotion": "{0}. satırdaki hareket komutuna akış kesintisi nedeniyle ulaşılamıyor.",
  "flow.msg.unreachableCode": "{0}. satırdaki koda akış kesintisi (RETURN/EXIT/HALT) nedeniyle ulaşılamıyor.",
  "flow.msg.uninitMotion": "{0}. satırdaki hareket, TOOL/BASE başlatılması olmadan çağrıldı (BAS(#INITMOV) gerekir).",
  "flow.msg.invalidGoto": "{1}. satırdaki GOTO hedef etiketi '{0}' dosyada tanımlanmamış.",

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
