import * as vscode from "vscode";
import * as fs from "fs";

/**
 * Returns categorized information and actionable engineering recommendations
 * for KUKA KRL diagnostics, localized according to active display language.
 */
function getIssueDetails(
  message: string,
  isRu: boolean,
): { category: string; tip: string } {
  const msgLower = message.toLowerCase();

  if (
    msgLower.includes("$tool") ||
    msgLower.includes("$base") ||
    msgLower.includes("initmov")
  ) {
    return {
      category: isRu
        ? "Кинематика и базовые координаты"
        : "Kinematics & Coordinate Frames",
      tip: isRu
        ? "Добавьте вызов BAS(#INITMOV, 0) или явно инициализируйте $TOOL = TOOL_DATA[...] и $BASE = BASE_DATA[...] перед этой инструкцией движения для исключения неконтролируемого перемещения манипулятора."
        : "Add BAS(#INITMOV, 0) call or explicitly initialize $TOOL = TOOL_DATA[...] and $BASE = BASE_DATA[...] prior to this motion instruction to prevent uncontrolled manipulator motion.",
    };
  }

  if (msgLower.includes("halt")) {
    return {
      category: isRu
        ? "Управление процессом и исполнением"
        : "Process & Execution Control",
      tip: isRu
        ? "Инструкция HALT полностью останавливает выполнение программы. Убедитесь, что эта точка останова предусмотрена циклограммой пусконаладки и не вызовет сбой непрерывного автоматического цикла на линии."
        : "HALT statement pauses program execution. Ensure this stop is planned in commissioning cycle and will not halt automatic production lines unexpectedly.",
    };
  }

  if (
    (msgLower.includes("wait for") || msgLower.includes("wait")) &&
    (msgLower.includes("timeout") || msgLower.includes("indefinite"))
  ) {
    return {
      category: isRu
        ? "Синхронизация датчиков и таймауты"
        : "Sensor Handshake & Safety Watchdog",
      tip: isRu
        ? "Добавьте таймаут по аппаратному таймеру робота: WAIT FOR ($IN[...] == TRUE) OR ($TIMER[1] > 3000), чтобы исключить зависание ячейки при обрыве провода или отказе датчика."
        : "Add hardware timer timeout: WAIT FOR ($IN[...] == TRUE) OR ($TIMER[1] > 3000) to protect cell from infinite freeze on sensor failure or wire break.",
    };
  }

  if (
    msgLower.includes("limit") ||
    msgLower.includes("24") ||
    msgLower.includes("exceeds") ||
    msgLower.includes("character")
  ) {
    return {
      category: isRu ? "Ограничения имен KRL" : "KRL Naming Constraints",
      tip: isRu
        ? "Контроллер KUKA KRC ограничивает длину идентификаторов 24 символами. Сократите имя переменной или функции для совместимости с внутренним компилятором KSS."
        : "KUKA KRC controllers limit identifier lengths to 24 characters. Shorten the variable or function name for KSS compiler compatibility.",
    };
  }

  if (
    msgLower.includes("switch") ||
    msgLower.includes("real") ||
    msgLower.includes("case")
  ) {
    return {
      category: isRu
        ? "Типы данных и ветвление KRL"
        : "KRL Data Types & Branching",
      tip: isRu
        ? "В конструкциях SWITCH/CASE допускаются только целочисленные типы (INT), символы (CHAR) и перечисления (ENUM). Замените вещественное число REAL на целое или ENUM."
        : "In SWITCH/CASE constructs, only integer types (INT), characters (CHAR), and enumerations (ENUM) are allowed. Replace REAL with INT or ENUM.",
    };
  }

  if (
    msgLower.includes("unreachable") ||
    msgLower.includes("return") ||
    msgLower.includes("dead")
  ) {
    return {
      category: isRu
        ? "Оптимизация и мёртвый код"
        : "Code Optimization & Dead Code",
      tip: isRu
        ? "Инструкция расположена после безусловного выхода (RETURN/HALT) и никогда не будет выполнена. Удалите мертвый код или перенесите его выше точки выхода."
        : "Instruction is located after unconditional exit (RETURN/HALT) and will never be executed. Remove dead code or move it above exit point.",
    };
  }

  if (msgLower.includes("not defined") || msgLower.includes("undefined")) {
    return {
      category: isRu
        ? "Область видимости переменных"
        : "Variable & Symbol Resolution",
      tip: isRu
        ? "Идентификатор не найден. Добавьте объявление DECL <TYPE> <NAME> локально в подпрограмме либо объявите переменную глобальной (DECL GLOBAL) в общесистемном файле $config.dat."
        : "Identifier not found. Add declaration DECL <TYPE> <NAME> locally or declare variable globally (DECL GLOBAL) in $config.dat.",
    };
  }

  if (
    msgLower.includes("block") ||
    msgLower.includes("unmatched") ||
    msgLower.includes("missing") ||
    msgLower.includes("mismatched")
  ) {
    return {
      category: isRu ? "Баланс блоков и структура" : "Block Balance & Structure",
      tip: isRu
        ? "Нарушена парность структурных блоков языка (IF..ENDIF, FOR..ENDFOR, WHILE..ENDWHILE, SPLINE..ENDSPLINE). Проверьте корректное закрытие оператора."
        : "Structural block pair mismatch (IF..ENDIF, FOR..ENDFOR, WHILE..ENDWHILE, SPLINE..ENDSPLINE). Check proper closing statement.",
    };
  }

  if (msgLower.includes("velocity") || msgLower.includes("speed")) {
    return {
      category: isRu
        ? "Пределы кинематической скорости"
        : "Kinematic Safety Limits",
      tip: isRu
        ? "Скорость превышает безопасный предел пусконаладки ($VEL_PTP > 100% или $VEL.CP > 3.0 м/с). Снизьте значение скорости для предотвращения динамических перегрузок редукторов робота."
        : "Velocity exceeds safe commissioning limit ($VEL_PTP > 100% or $VEL.CP > 3.0 m/s). Reduce velocity to prevent dynamic gearbox overload.",
    };
  }

  if (msgLower.includes("empty")) {
    return {
      category: isRu ? "Чистота логики" : "Logic Hygiene",
      tip: isRu
        ? "Пустой блок условий или цикла. Добавьте полезные инструкции либо удалите пустую конструкцию для чистоты кода."
        : "Empty condition or loop block. Add valid instructions or remove empty construct.",
    };
  }

  return {
    category: isRu ? "Общее качество KRL" : "General KRL Quality",
    tip: isRu
      ? "Проверьте синтаксис инструкции в соответствии со стандартами KUKA System Software (KSS 8.3–8.7)."
      : "Check instruction syntax according to KUKA System Software standards (KSS 8.3–8.7).",
  };
}

export interface ReportSummary {
  reportMarkdown: string;
  totalFiles: number;
  cleanFilesCount: number;
  issuesFileCount: number;
  healthIndex: string;
  statusBadge: string;
  totalErrors: number;
  totalWarnings: number;
  totalInfos: number;
  totalHints: number;
}

export async function buildProjectQualityReport(): Promise<ReportSummary> {
  // Trigger workspace validation first to ensure all workspace files have fresh diagnostics
  try {
    await vscode.commands.executeCommand("krl.validateWorkspace");
    await new Promise((resolve) => setTimeout(resolve, 400));
  } catch {
    /* ignore */
  }

  const files = await vscode.workspace.findFiles("**/*.{src,dat,sub}");
  const diagnostics = vscode.languages.getDiagnostics();
  const isRu = (vscode.env.language || "en").toLowerCase().startsWith("ru");

  let totalErrors = 0;
  let totalWarnings = 0;
  let totalHints = 0;
  let totalInfos = 0;

  // Aggregate diagnostics by URI string
  const fileDiagnostics = new Map<string, vscode.Diagnostic[]>();

  diagnostics.forEach(([uri, diags]) => {
    const isKrlFile = /\.(src|dat|sub)$/i.test(uri.fsPath);
    const krlDiags = diags.filter(
      (d) => d.source === "krl-language-support" || isKrlFile,
    );

    if (krlDiags.length > 0) {
      fileDiagnostics.set(uri.toString(), krlDiags);
      krlDiags.forEach((d) => {
        switch (d.severity) {
          case vscode.DiagnosticSeverity.Error:
            totalErrors++;
            break;
          case vscode.DiagnosticSeverity.Warning:
            totalWarnings++;
            break;
          case vscode.DiagnosticSeverity.Information:
            totalInfos++;
            break;
          case vscode.DiagnosticSeverity.Hint:
            totalHints++;
            break;
        }
      });
    }
  });

  const totalFiles = files.length;
  const issuesFileCount = fileDiagnostics.size;
  const cleanFilesCount = Math.max(0, totalFiles - issuesFileCount);
  const healthIndex =
    totalFiles > 0
      ? ((cleanFilesCount / totalFiles) * 100).toFixed(1)
      : "100.0";

  let statusBadge = isRu
    ? "🟢 ПАСПОРТ КАЧЕСТВА: ГОТОВ К ЗАГРУЗКЕ В KRC"
    : "🟢 QUALITY PASSPORT: CERTIFIED FOR KRC DEPLOYMENT";
  if (totalErrors > 0) {
    statusBadge = isRu
      ? "🔴 ЗАГРУЗКА ЗАБЛОКИРОВАНА: ТРЕБУЕТСЯ ИСПРАВЛЕНИЕ ОШИБОК"
      : "🔴 DEPLOYMENT BLOCKED: RESOLVE COMPILATION ERRORS";
  } else if (totalWarnings > 0) {
    statusBadge = isRu
      ? "🟡 ДОПУСК С ПРЕДУПРЕЖДЕНИЯМИ: ПРОВЕРИТЬ КООРДИНАТНЫЕ БАЗЫ"
      : "🟡 COMMISSIONING ADVISORY: REVIEW MOTION & FRAME WARNINGS";
  }

  const dateStr = new Date().toLocaleString();

  let report = `# 🤖 KUKA KRL Professional Project Quality & Acceptance Report\n`;
  report += `> **Liskin Labs Industrial Pro Edition | KUKA KRC4 / KRC5 (KSS 8.3 - 8.7)**\n`;
  report += isRu
    ? `> **Аналитический инспектор:** KRL Industrial Engine v1.7.4 | **Дата аудита:** ${dateStr}\n\n`
    : `> **Analytical Inspector:** KRL Industrial Engine v1.7.4 | **Audit Timestamp:** ${dateStr}\n\n`;
  report += `---\n\n`;

  // Section 1: Executive Summary Table
  report += isRu
    ? `## 📊 1. Сводный индекс надежности и статус готовности\n\n`
    : `## 📊 1. Executive Summary & Quality Health Index\n\n`;

  report += isRu
    ? `| Контрольный показатель | Значение | Инженерный вердикт |\n`
    : `| Benchmark Metric | Value | Engineering Verdict |\n`;
  report += `| :--- | :---: | :--- |\n`;

  report += isRu
    ? `| **Всего проверено модулей KRL** | **${totalFiles}** | Файлы \`.src\`, \`.dat\`, \`.sub\` |\n`
    : `| **Total KRL Modules Audited** | **${totalFiles}** | Files \`.src\`, \`.dat\`, \`.sub\` |\n`;

  report += isRu
    ? `| **Полностью чистые модули (0 дефектов)** | **${cleanFilesCount} / ${totalFiles}** | **${cleanFilesCount === totalFiles ? "🟢 100% CLEAN" : "🟢 СООТВЕТСТВУЮТ СТАНДАРТУ"}** |\n`
    : `| **Fully Compliant Modules (0 defects)** | **${cleanFilesCount} / ${totalFiles}** | **${cleanFilesCount === totalFiles ? "🟢 100% CLEAN" : "🟢 STANDARD COMPLIANT"}** |\n`;

  report += isRu
    ? `| **Модули, требующие внимания** | **${issuesFileCount} / ${totalFiles}** | ${issuesFileCount === 0 ? "🟢 0 файлов" : "🟡 Требуется ревизия"} |\n`
    : `| **Modules Requiring Attention** | **${issuesFileCount} / ${totalFiles}** | ${issuesFileCount === 0 ? "🟢 0 files" : "🟡 Review Recommended"} |\n`;

  report += isRu
    ? `| **Индекс качества проекта (Health Score)** | **${healthIndex}%** | **${statusBadge}** |\n\n`
    : `| **Project Quality Score (Health Score)** | **${healthIndex}%** | **${statusBadge}** |\n\n`;

  // Section 2: Issue Breakdown Table
  report += isRu
    ? `### 🔍 Распределение замечаний по категориям критичности:\n\n`
    : `### 🔍 Issue Distribution by Severity Category:\n\n`;

  report += isRu
    ? `| Уровень критичности | Кол-во | Влияние на робота | Требуемое действие |\n`
    : `| Severity Level | Count | Controller Impact | Action Required |\n`;
  report += `| :--- | :---: | :--- | :--- |\n`;

  report += isRu
    ? `| 🔴 **Критические ошибки (Errors)** | **${totalErrors}** | Ошибка компиляции KRC / Аварийный останов | Немедленно исправить перед загрузкой |\n`
    : `| 🔴 **Critical Errors (Errors)** | **${totalErrors}** | KRC compilation failure / Emergency stop | Resolve immediately before upload |\n`;

  report += isRu
    ? `| 🟡 **Предупреждения безопасности (Warnings)** | **${totalWarnings}** | Риск столкновения / Неинициализированные TOOL/BASE | Проверить привязку инструмента на SmartPAD |\n`
    : `| 🟡 **Safety & Motion Warnings** | **${totalWarnings}** | Collision risk / Uninitialized TOOL/BASE | Verify Tool/Base frames on SmartPAD |\n`;

  report += isRu
    ? `| 🔵 **Уведомления процесса (Information)** | **${totalInfos}** | Штатные остановы (HALT) / Паузы цикла | Контроль регламента пусконаладки |\n`
    : `| 🔵 **Process & Execution Info** | **${totalInfos}** | Controlled pauses (HALT) / Cycle halts | Commissioning routine verification |\n`;

  report += isRu
    ? `| ⚪ **Рекомендации по коду (Hints)** | **${totalHints}** | Неиспользуемые переменные / Оптимизация | Рефакторинг по усмотрению инженера |\n`
    : `| ⚪ **Code Cleanliness (Hints)** | **${totalHints}** | Unused variables / Cleanliness | Discretionary refactoring |\n`;

  report += isRu
    ? `| **ИТОГО ЗАМЕЧАНИЙ** | **${totalErrors + totalWarnings + totalInfos + totalHints}** | — | — |\n\n`
    : `| **TOTAL FINDINGS** | **${totalErrors + totalWarnings + totalInfos + totalHints}** | — | — |\n\n`;

  report += `---\n\n`;

  // Section 3: Detailed Issues by File
  report += isRu
    ? `## 📂 2. Детализированный реестр замечаний с кодом и рекомендациями\n\n`
    : `## 📂 2. Detailed Findings Register with Code Previews & Recommendations\n\n`;

  if (fileDiagnostics.size === 0) {
    report += isRu
      ? `### 🎉 Поздравляем! В кодовой базе проекта не обнаружено ни одной ошибки или предупреждения.\nВсе ${totalFiles} файлов полностью соответствуют эталонным требованиям KUKA KRL (KSS 8.3–8.7).\n\n`
      : `### 🎉 Outstanding! Zero errors or warnings detected across the entire workspace.\nAll ${totalFiles} modules fully comply with KUKA KRL standards (KSS 8.3–8.7).\n\n`;
  } else {
    const sortedUris = Array.from(fileDiagnostics.keys()).sort();

    for (const uriStr of sortedUris) {
      const uri = vscode.Uri.parse(uriStr);
      const diags = fileDiagnostics.get(uriStr)!;
      const relativePath = vscode.workspace.asRelativePath(uri);
      const isDat = relativePath.toLowerCase().endsWith(".dat");
      const isSub = relativePath.toLowerCase().endsWith(".sub");
      const fileTypeDesc = isRu
        ? isDat
          ? "Список данных (Data List)"
          : isSub
            ? "Фоновый модуль (Submit Interpreter)"
            : "Модуль программы (Source Program)"
        : isDat
          ? "Data List Module (.dat)"
          : isSub
            ? "Submit Interpreter Module (.sub)"
            : "Source Program Module (.src)";

      // Read file lines for snippet extraction
      let fileLines: string[] = [];
      try {
        if (fs.existsSync(uri.fsPath)) {
          const content = fs.readFileSync(uri.fsPath, "utf8");
          fileLines = content.split(/\r?\n/);
        }
      } catch {
        /* ignore read errors */
      }

      report += `### 📄 \`${relativePath}\`\n`;
      report += isRu
        ? `> **Тип модуля:** ${fileTypeDesc} | **Замечаний в файле:** ${diags.length}\n\n`
        : `> **Module Type:** ${fileTypeDesc} | **Findings in Module:** ${diags.length}\n\n`;

      diags.sort((a, b) => a.range.start.line - b.range.start.line);

      for (const d of diags) {
        const lineNum = d.range.start.line + 1;
        let icon = "⚪";
        let sevTitle = isRu ? "Подсказка (Hint)" : "Hint";
        switch (d.severity) {
          case vscode.DiagnosticSeverity.Error:
            icon = "🔴";
            sevTitle = isRu ? "Критическая ошибка (Error)" : "Critical Error";
            break;
          case vscode.DiagnosticSeverity.Warning:
            icon = "🟡";
            sevTitle = isRu ? "Предупреждение (Warning)" : "Warning";
            break;
          case vscode.DiagnosticSeverity.Information:
            icon = "🔵";
            sevTitle = isRu ? "Информация (Info)" : "Information";
            break;
          case vscode.DiagnosticSeverity.Hint:
            icon = "⚪";
            sevTitle = isRu ? "Подсказка (Hint)" : "Hint";
            break;
        }

        const rawLine =
          fileLines[d.range.start.line] !== undefined
            ? fileLines[d.range.start.line].trim()
            : "";
        const details = getIssueDetails(d.message, isRu);

        const lineLabel = isRu ? "Строка" : "Line";
        const catLabel = isRu ? "Категория" : "Category";
        const descLabel = isRu ? "Описание" : "Description";
        const recLabel = isRu
          ? "💡 Инженерная рекомендация"
          : "💡 Actionable Recommendation";

        report += `- ${icon} **${lineLabel} ${lineNum}:** ${rawLine ? `\`${rawLine}\`` : ""}\n`;
        report += `  - **${catLabel}:** *${details.category}* (${sevTitle})\n`;
        report += `  - **${descLabel}:** ${d.message}\n`;
        report += `  - ${recLabel}: ${details.tip}\n\n`;
      }
    }
  }

  report += `---\n\n`;

  // Section 3: Verified Clean Modules Collapsible Table
  if (cleanFilesCount > 0) {
    report += isRu
      ? `## ✅ 3. Реестр полностью проверенных чистых модулей (${cleanFilesCount} файлов)\n\n`
      : `## ✅ 3. Verified Compliant Modules (${cleanFilesCount} files)\n\n`;

    report += `<details>\n`;
    report += isRu
      ? `<summary><b>Нажмите, чтобы развернуть полный список ${cleanFilesCount} проверенных файлов без замечаний</b></summary>\n\n`
      : `<summary><b>Click to expand full list of ${cleanFilesCount} verified compliant files without defects</b></summary>\n\n`;

    report += isRu
      ? `| Статус | Путь к файлу проекта | Формат |\n`
      : `| Status | Project File Path | Format |\n`;
    report += `| :---: | :--- | :--- |\n`;

    const allRelativePaths = files
      .map((f) => vscode.workspace.asRelativePath(f))
      .sort();

    for (const relPath of allRelativePaths) {
      const isIssueFile = Array.from(fileDiagnostics.keys()).some((u) => {
        const r = vscode.workspace.asRelativePath(vscode.Uri.parse(u));
        return r.toLowerCase() === relPath.toLowerCase();
      });
      if (!isIssueFile) {
        const ext = relPath.substring(relPath.lastIndexOf(".")).toUpperCase();
        report += `| 🟢 OK | \`${relPath}\` | ${ext} |\n`;
      }
    }

    report += `\n</details>\n\n`;
    report += `---\n\n`;
  }

  // Section 4: KUKA Commissioning Safety Checklist
  report += isRu
    ? `## 🛡️ 4. Инженерный протокол пусконаладки на объекте (KUKA Commissioning Protocol)\n\n`
    : `## 🛡️ 4. On-Site Industrial Commissioning Protocol (KUKA Safety Checklist)\n\n`;

  report += isRu
    ? `Перед запуском программы в автоматическом цикле (\`#AUT\` / \`#EXT\`) обязательно выполните шаги проверки:\n\n`
    : `Before launching the robot program in automatic continuous mode (\`#AUT\` / \`#EXT\`), verify the following:\n\n`;

  if (isRu) {
    report += `- [ ] **Калибровка инструментов и баз:** Сверьте активные номера \`$TOOL\` и \`$BASE\` на пульте SmartPAD с номерами в программе.\n`;
    report += `- [ ] **Тестовый прогон в T1:** Выполните полный цикл в ручном режиме T1 на пониженной скорости (\`$OV_PRO\` <= 30%) при зажатом Deadman switch.\n`;
    report += `- [ ] **Проверка зон аппроксимации:** Убедитесь, что радиусы сглаживания (\`$APO.CDIS\` / \`$APO.CPTP\`) не приводят к срезанию траектории вблизи зажимных приспособлений.\n`;
    report += `- [ ] **Цепь аварийного останова и световые завесы:** Проверьте аварийный останов при пересечении световых барьеров и открытии ограждения ячейки.\n`;
    report += `- [ ] **Защита от зависания датчиков:** Подтвердите наличие таймерных таймаутов на всех ожиданиях \`WAIT FOR $IN[...]\`.\n\n`;
  } else {
    report += `- [ ] **Tool & Base Calibration:** Verify active \`$TOOL\` and \`$BASE\` numbers on SmartPAD match indices used in the program.\n`;
    report += `- [ ] **T1 Manual Dry Run:** Execute full cycle in manual T1 mode at reduced velocity (\`$OV_PRO\` <= 30%) with Deadman switch engaged.\n`;
    report += `- [ ] **Approximation Blending Check:** Verify blending radii (\`$APO.CDIS\` / \`$APO.CPTP\`) do not cut corners near clamps and fixtures.\n`;
    report += `- [ ] **Emergency Stop & Light Curtains:** Verify emergency stop response upon opening safety fence doors or breaking light curtains.\n`;
    report += `- [ ] **Sensor Timeout Guarding:** Confirm hardware timer timeouts on all \`WAIT FOR $IN[...]\` conditions to prevent cell freeze.\n\n`;
  }

  return {
    reportMarkdown: report,
    totalFiles,
    cleanFilesCount,
    issuesFileCount,
    healthIndex,
    statusBadge,
    totalErrors,
    totalWarnings,
    totalInfos,
    totalHints,
  };
}

export async function generateReport(): Promise<void> {
  const summary = await buildProjectQualityReport();
  const doc = await vscode.workspace.openTextDocument({
    content: summary.reportMarkdown,
    language: "markdown",
  });
  await vscode.window.showTextDocument(doc);
}
