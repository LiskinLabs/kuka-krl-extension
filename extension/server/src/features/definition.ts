import {
  DefinitionParams,
  Location,
  Position,
  Range,
} from "vscode-languageserver/node";
import { TextDocument } from "vscode-languageserver-textdocument";
import { TextDocuments } from "vscode-languageserver/node";
import { ServerState, EnclosuresLines } from "../types";
import { isSymbolDeclared, getWordAtPosition } from "../lib/parser";
import { KSS_87_SYSTEM_VARS } from "../lib/systemVars";
import { SYSTEM_VAR_DOCS } from "../lib/systemVarDocs";
import * as krlData from "../data/krl-ref.json";

export class SymbolResolver {
  /**
   * Tanım konumunu bulur - Go to Definition işlevi.
   */
  public async onDefinition(
    params: DefinitionParams,
    documents: TextDocuments<TextDocument>,
    state: ServerState,
  ): Promise<Location | undefined> {
    const doc = documents.get(params.textDocument.uri);
    if (!doc || !state.workspaceRoot) return;

    const lines = doc.getText().split(/\r?\n/);
    const lineText = lines[params.position.line];

    const wordAtPos = getWordAtPosition(lineText, params.position.character);
    if (!wordAtPos) return;
    const functionName = wordAtPos.word;

    // Feature 2: System Variables Definition
    let sysVarName = functionName.toUpperCase();
    if (!sysVarName.startsWith("$")) sysVarName = "$" + sysVarName;

    const sysVarsMap = krlData.systemVariables as Record<string, unknown>;
    const isSystemVar =
      Boolean(sysVarsMap[sysVarName]) ||
      Boolean(sysVarsMap[functionName.toUpperCase()]) ||
      KSS_87_SYSTEM_VARS.includes(sysVarName) ||
      SYSTEM_VAR_DOCS.some((d) => d.name.toUpperCase() === sysVarName);

    if (isSystemVar) {
      // Return location at current position to satisfy VS Code and avoid "No definition found"
      return Location.create(
        params.textDocument.uri,
        Range.create(params.position, params.position),
      );
    }

    // Hızlı önbellek araması: Önce fonksiyon olarak ara
    const cachedFunc = state.functionsDeclared.find(
      (f) => f.name.toUpperCase() === functionName.toUpperCase(),
    );
    if (cachedFunc) {
      return Location.create(cachedFunc.uri, {
        start: Position.create(cachedFunc.line, cachedFunc.startChar),
        end: Position.create(cachedFunc.line, cachedFunc.endChar),
      });
    }

    // Özel kullanıcı değişken tipi (Struct) olarak ara
    for (const key in state.structDefinitions) {
      if (key === functionName) {
        const resultStruc = await isSymbolDeclared(
          state.workspaceRoot,
          functionName,
          "struc",
        );
        if (resultStruc != undefined) {
          return Location.create(resultStruc.uri, {
            start: Position.create(resultStruc.line, resultStruc.startChar),
            end: Position.create(resultStruc.line, resultStruc.endChar),
          });
        }
      }
    }

    // Değişken olarak ara
    const enclosures = this.findEnclosuresLines(params.position.line, lines);

    // Hızlı önbellek araması: İlk önce yerel değişkenleri kontrol et
    const localVars = state.fileVariablesMap.get(params.textDocument.uri);
    if (localVars) {
      // 1. Kapsam içindeki yerel değişkeni bul
      const localMatch = localVars.find(
        (v) =>
          v.name.toUpperCase() === functionName.toUpperCase() &&
          v.range &&
          v.range.start.line >= enclosures.upperLine &&
          v.range.start.line <= enclosures.bottomLine,
      );
      if (localMatch && localMatch.range) {
        return Location.create(params.textDocument.uri, localMatch.range);
      }

      // 2. Aynı dosyada (örn. .dat kısmında) olan global/genel değişkeni bul
      const fileMatch = localVars.find(
        (v) => v.name.toUpperCase() === functionName.toUpperCase() && v.range,
      );
      if (fileMatch && fileMatch.range) {
        return Location.create(params.textDocument.uri, fileMatch.range);
      }
    }

    // 2.5. Eğer .src dosyasındaysak, ilgili .dat dosyasını kontrol et
    const uri = params.textDocument.uri.toLowerCase();
    if (uri.endsWith(".src")) {
      const datUriPattern = uri.substring(0, uri.length - 4) + ".dat";

      // Map keys case-sensitive olduğu için doğru uri'yi bul
      let datUri = "";
      for (const key of state.fileVariablesMap.keys()) {
        if (key.toLowerCase() === datUriPattern) {
          datUri = key;
          break;
        }
      }

      if (datUri) {
        const datVars = state.fileVariablesMap.get(datUri);
        if (datVars) {
          const datMatch = datVars.find(
            (v) =>
              v.name.toUpperCase() === functionName.toUpperCase() && v.range,
          );
          if (datMatch && datMatch.range) {
            return Location.create(datUri, datMatch.range);
          }
        }
      }
    }

    // 3. Yerel olarak bulunamadıysa mergedVariables'da global (veya diğer dosyalardaki) değişkenleri ara
    const globalMatch = state.mergedVariables.find(
      (v) =>
        v.name.toUpperCase() === functionName.toUpperCase() && v.uri && v.range,
    );

    if (globalMatch && globalMatch.uri && globalMatch.range) {
      return Location.create(globalMatch.uri, globalMatch.range);
    }

    return;
  }

  /**
   * Kapsam satırlarını bulur - DEF/DEFFCT/DEFDAT bloğunun sınırları.
   * Düzeltildi: includes yerine \b regex kullanılarak kesin eşleşme sağlandı.
   */
  private findEnclosuresLines(
    lineNumber: number,
    lines: string[],
  ): EnclosuresLines {
    let row = lineNumber;
    const result: EnclosuresLines = {
      upperLine: 0,
      bottomLine: lines.length - 1,
    };

    // Yukarı doğru ara - başlangıç sınırı
    while (row >= 0) {
      const line = lines[row];
      if (
        /^\s*(?:GLOBAL\s+)?(?:DEFFCT|DEFDAT)\b/i.test(line) ||
        /^\s*(?:GLOBAL\s+)?DEF\b(?!DAT|FCT)/i.test(line)
      ) {
        result.upperLine = row + 1;
        break;
      }
      row--;
    }

    // Satırı sıfırla
    row = lineNumber;

    // Aşağı doğru ara - bitiş sınırı
    while (row < lines.length) {
      const line = lines[row];
      if (
        /^\s*ENDFCT\b/i.test(line) ||
        /^\s*ENDDAT\b/i.test(line) ||
        /^\s*END\b(?!FOR|IF|WHILE|LOOP|SWITCH|FCT|DAT)/i.test(line)
      ) {
        result.bottomLine = row + 1;
        break;
      }
      row++;
    }

    return result;
  }
}
