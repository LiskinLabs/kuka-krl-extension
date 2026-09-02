import {
  DocumentFormattingParams,
  DocumentRangeFormattingParams,
  TextDocuments,
  TextEdit,
  Range,
} from "vscode-languageserver/node";
import { TextDocument } from "vscode-languageserver-textdocument";
import { CODE_KEYWORDS } from "../lib/parser";

// Преобразуем массив ключевых слов в Set для O(1) поиска
const KEYWORDS = new Set(CODE_KEYWORDS);

// Girinti azaltan anahtar kelimeler - satır yazdırılmadan ÖNCE
const DECREASE_INDENT =
  /^\s*(END|ENDFCT|ENDDAT|ENDIF|ENDFOR|ENDWHILE|ENDLOOP|UNTIL|ENDSWITCH|CASE|DEFAULT|ELSE)\b/i;

// Girinti artıran anahtar kelimeler - satır yazdırıldıktan SONRA
const INCREASE_INDENT =
  /^\s*(DEF|DEFFCT|DEFDAT|IF|ELSE|FOR|WHILE|LOOP|REPEAT|SWITCH|CASE|DEFAULT)\b/i;

// Блоки, перед которыми можно добавить пустую строку
const BLOCK_START = /^\s*(FOR|IF|WHILE|LOOP|REPEAT|SWITCH)\b/i;

// Блоки, после которых можно добавить пустую строку
const BLOCK_END = /^\s*(ENDFOR|ENDIF|ENDWHILE|ENDLOOP|UNTIL|ENDSWITCH)\b/i;

// Настройки форматирования (получаются из клиента)
interface FormattingSettings {
  separateBeforeBlocks: boolean;
  separateAfterBlocks: boolean;
  indentFolds: boolean;
  alignAssignments: boolean;
  uppercaseKeywords: boolean;
}

// Хранилище настроек
let formattingSettings: FormattingSettings = {
  separateBeforeBlocks: false,
  separateAfterBlocks: false,
  indentFolds: true,
  alignAssignments: true,
  uppercaseKeywords: true,
};

/**
 * Устанавливает настройки форматирования.
 */
export function setFormattingSettings(
  settings: Partial<FormattingSettings>,
): void {
  formattingSettings = { ...formattingSettings, ...settings };
}

export class KrlFormatter {
  /**
   * Выполняет форматирование всего документа: отступы, выравнивание, регистр и поддержка ignore-директив.
   */
  provideFormatting(
    params: DocumentFormattingParams,
    documents: TextDocuments<TextDocument>,
  ): TextEdit[] {
    const document = documents.get(params.textDocument.uri);
    if (!document) {
      return [];
    }

    const text = document.getText();
    const lines = text.split(/\r?\n/);
    const tabSize = params.options.tabSize || 3;
    const insertSpaces = params.options.insertSpaces !== false;
    const indentChar = insertSpaces ? " ".repeat(tabSize) : "\t";

    const resultLines = this.formatLineRange(
      lines,
      0,
      lines.length - 1,
      indentChar,
    );

    // Align assignments if enabled
    if (formattingSettings.alignAssignments) {
      this.alignAssignments(resultLines);
    }

    // Формируем единый TextEdit для всего документа
    const newText = resultLines.join("\n");
    if (newText !== text.replace(/\r\n/g, "\n")) {
      return [
        TextEdit.replace(
          Range.create(
            0,
            0,
            lines.length,
            lines[lines.length - 1]?.length || 0,
          ),
          newText,
        ),
      ];
    }

    return [];
  }

  /**
   * Выполняет форматирование выделенного диапазона строк (Ctrl+K, Ctrl+F).
   */
  provideRangeFormatting(
    params: DocumentRangeFormattingParams,
    documents: TextDocuments<TextDocument>,
  ): TextEdit[] {
    const document = documents.get(params.textDocument.uri);
    if (!document) {
      return [];
    }

    const text = document.getText();
    const lines = text.split(/\r?\n/);
    const startLine = Math.max(0, params.range.start.line);
    const endLine = Math.min(lines.length - 1, params.range.end.line);

    const tabSize = params.options.tabSize || 3;
    const insertSpaces = params.options.insertSpaces !== false;
    const indentChar = insertSpaces ? " ".repeat(tabSize) : "\t";

    const formattedAll = this.formatLineRange(
      lines,
      0,
      lines.length - 1,
      indentChar,
    );

    // Extract only the edited range
    const rangeEdits: TextEdit[] = [];
    const newRangeText = formattedAll.slice(startLine, endLine + 1).join("\n");
    const oldRangeText = lines.slice(startLine, endLine + 1).join("\n");

    if (newRangeText !== oldRangeText) {
      rangeEdits.push(
        TextEdit.replace(
          Range.create(startLine, 0, endLine, lines[endLine]?.length || 0),
          newRangeText,
        ),
      );
    }

    return rangeEdits;
  }

  /**
   * Внутренний движок форматирования строк с поддержкой ; krl-ignore и ; krl-format-off
   */
  private formatLineRange(
    lines: string[],
    startLine: number,
    endLine: number,
    indentChar: string,
  ): string[] {
    const resultLines: string[] = [];
    let indentLevel = 0;
    let formatDisabled = false;
    let skipNextLine = false;

    for (let i = 0; i < lines.length; i++) {
      const originalLine = lines[i];
      const trimmed = originalLine.trim();

      // Check format toggle comments (; krl-format-off / ; krl-format-on)
      if (
        /^\s*;\s*krl-format-off\b/i.test(trimmed) ||
        /^\s*;\s*prettier-ignore-start\b/i.test(trimmed)
      ) {
        formatDisabled = true;
        resultLines.push(originalLine);
        continue;
      }
      if (
        /^\s*;\s*krl-format-on\b/i.test(trimmed) ||
        /^\s*;\s*prettier-ignore-end\b/i.test(trimmed)
      ) {
        formatDisabled = false;
        resultLines.push(originalLine);
        continue;
      }

      // Check single line ignore directive (; krl-ignore / ; prettier-ignore)
      if (
        /^\s*;\s*krl-ignore\b/i.test(trimmed) ||
        /^\s*;\s*prettier-ignore\b/i.test(trimmed)
      ) {
        skipNextLine = true;
        resultLines.push(originalLine);
        continue;
      }

      if (formatDisabled || skipNextLine) {
        skipNextLine = false;
        resultLines.push(originalLine);
        continue;
      }

      if (trimmed.length === 0) {
        resultLines.push("");
        continue;
      }

      // String-safe comment separation
      let commentIndex = -1;
      let inStr = false;
      for (let j = 0; j < trimmed.length; j++) {
        if (trimmed[j] === '"') inStr = !inStr;
        else if (trimmed[j] === ";" && !inStr) {
          commentIndex = j;
          break;
        }
      }
      let codePart =
        commentIndex >= 0 ? trimmed.substring(0, commentIndex) : trimmed;

      // Uppercase keywords
      if (formattingSettings.uppercaseKeywords) {
        codePart = this.uppercaseKeywords(codePart);
      }

      const formattedLine =
        commentIndex >= 0
          ? codePart + trimmed.substring(commentIndex)
          : codePart;

      // Indent decrement before line output
      if (DECREASE_INDENT.test(codePart)) {
        indentLevel = Math.max(0, indentLevel - 1);
      }

      if (formattingSettings.indentFolds && /^\s*;?ENDFOLD\b/i.test(codePart)) {
        indentLevel = Math.max(0, indentLevel - 1);
      }

      // Space before block
      if (
        formattingSettings.separateBeforeBlocks &&
        BLOCK_START.test(codePart)
      ) {
        if (
          resultLines.length > 0 &&
          resultLines[resultLines.length - 1].trim() !== ""
        ) {
          resultLines.push("");
        }
      }

      const indentString = indentChar.repeat(indentLevel);
      resultLines.push(indentString + formattedLine);

      // Space after block
      if (formattingSettings.separateAfterBlocks && BLOCK_END.test(codePart)) {
        if (i < lines.length - 1 && lines[i + 1].trim() !== "") {
          resultLines.push("");
        }
      }

      // Indent increment after line output
      if (INCREASE_INDENT.test(codePart)) {
        if (!(/^IF\b/i.test(codePart) && /\bENDIF\b/i.test(codePart))) {
          indentLevel++;
        }
      }

      if (formattingSettings.indentFolds && /^\s*;?FOLD\b/i.test(codePart)) {
        indentLevel++;
      }
    }

    return resultLines;
  }

  /**
   * Aligns consecutive variable assignments.
   */
  private alignAssignments(lines: string[]): void {
    const assignmentRegex = /^(\s*)([\w\[\]\.\$]+)\s*=(?!=)\s*(.+)$/;

    let i = 0;
    while (i < lines.length) {
      const group: {
        index: number;
        indent: string;
        lhs: string;
        rhs: string;
      }[] = [];

      while (i < lines.length) {
        const line = lines[i];
        const match = assignmentRegex.exec(line);

        if (match) {
          if (group.length > 0 && group[0].indent !== match[1]) {
            break;
          }
          group.push({
            index: i,
            indent: match[1],
            lhs: match[2].trim(),
            rhs: match[3].trim(),
          });
          i++;
        } else {
          break;
        }
      }

      if (group.length > 1) {
        const maxLhs = Math.max(...group.map((g) => g.lhs.length));

        for (const item of group) {
          lines[item.index] =
            `${item.indent}${item.lhs.padEnd(maxLhs)} = ${item.rhs}`;
        }
      }

      if (group.length === 0) i++;
    }
  }

  /**
   * Kod içindeki anahtar kelimeleri büyük harfe dönüştürür.
   */
  private uppercaseKeywords(text: string): string {
    return text.replace(/\b[a-zA-Z_][a-zA-Z0-9_]*\b/g, (match) => {
      if (KEYWORDS.has(match.toUpperCase())) {
        return match.toUpperCase();
      }
      return match;
    });
  }
}
