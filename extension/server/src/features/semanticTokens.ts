import {
  SemanticTokensBuilder,
  SemanticTokensLegend,
  SemanticTokensParams,
  SemanticTokens,
} from "vscode-languageserver/node";
import { TextDocument } from "vscode-languageserver-textdocument";
import { TextDocuments } from "vscode-languageserver/node";
import { ServerState } from "../types";
import { CODE_KEYWORDS } from "../lib/parser";

// Определяем типы токенов и их модификаторы
const tokenTypes = [
  "variable",
  "function",
  "type",
  "enumMember",
  "keyword",
  "macro",
  "number",
];
const tokenModifiers = ["declaration", "readonly", "static", "defaultLibrary"];

export const semanticTokensLegend: SemanticTokensLegend = {
  tokenTypes: tokenTypes,
  tokenModifiers: tokenModifiers,
};

export class SemanticTokensProvider {
  public provideSemanticTokens(
    params: SemanticTokensParams,
    documents: TextDocuments<TextDocument>,
    state: ServerState,
  ): SemanticTokens {
    const document = documents.get(params.textDocument.uri);
    if (!document) {
      return { data: [] };
    }

    const builder = new SemanticTokensBuilder();
    const text = document.getText();
    const lines = text.split(/\r?\n/);

    // Получаем локальные и глобальные переменные для текущего файла
    const localVars = state.fileVariablesMap.get(document.uri) || [];
    const allVars = [...localVars, ...state.mergedVariables];

    // Regex для поиска всех слов, похожих на переменные/функции
    const wordRegex = /[a-zA-Z_$][a-zA-Z0-9_$]*/g;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Пропускаем комментарии KRL
      const commentIdx = line.indexOf(";");
      const searchLine = commentIdx >= 0 ? line.substring(0, commentIdx) : line;

      let match;
      wordRegex.lastIndex = 0;
      while ((match = wordRegex.exec(searchLine)) !== null) {
        const word = match[0];
        const startChar = match.index;

        // Игнорируем зарезервированные слова
        if (this.isKrlKeyword(word)) {
          // builder.push(i, startChar, word.length, tokenTypes.indexOf("keyword"), 0);
          continue;
        }

        // Проверяем, является ли это функцией
        const isFunction = state.functionsDeclared.some(
          (f) => f.name.toUpperCase() === word.toUpperCase(),
        );
        if (isFunction) {
          builder.push(
            i,
            startChar,
            word.length,
            tokenTypes.indexOf("function"),
            0,
          );
          continue;
        }

        // Проверяем переменные
        const variable = allVars.find(
          (v) => v.name.toUpperCase() === word.toUpperCase(),
        );
        if (variable) {
          let tokenType = tokenTypes.indexOf("variable");
          let tokenModifier = 0;

          if (variable.type.toUpperCase() === "ENUM") {
            tokenType = tokenTypes.indexOf("enumMember");
          } else if (variable.type.toUpperCase() === "STRUC") {
            tokenType = tokenTypes.indexOf("type");
          } else if (variable.type.toUpperCase() === "SIGNAL") {
            tokenType = tokenTypes.indexOf("macro");
          }

          if (variable.isGlobal) {
            tokenModifier |= 1 << tokenModifiers.indexOf("static");
          }

          builder.push(i, startChar, word.length, tokenType, tokenModifier);
        } else if (word.startsWith("$")) {
          // Системные переменные KUKA (начинаются с $)
          builder.push(
            i,
            startChar,
            word.length,
            tokenTypes.indexOf("variable"),
            (1 << tokenModifiers.indexOf("readonly")) |
              (1 << tokenModifiers.indexOf("defaultLibrary")),
          );
        }
      }
    }

    return builder.build();
  }

  private isKrlKeyword(word: string): boolean {
    return CODE_KEYWORDS.includes(word.toUpperCase());
  }
}
