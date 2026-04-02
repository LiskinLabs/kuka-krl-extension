import {
  InlayHint,
  InlayHintKind,
  InlayHintParams,
  TextDocuments,
  Position,
} from "vscode-languageserver/node";
import { TextDocument } from "vscode-languageserver-textdocument";
import { ServerState } from "../types";

export class InlayHintsProvider {
  public onInlayHint(
    params: InlayHintParams,
    documents: TextDocuments<TextDocument>,
    state: ServerState,
  ): InlayHint[] {
    const document = documents.get(params.textDocument.uri);
    if (!document) return [];

    const text = document.getText();
    const hints: InlayHint[] = [];

    // Regex for: $IN[12], $OUT[5], TOOL_DATA[1], BASE_DATA[2]
    const regex = /(\$(?:IN|OUT|ANIN|ANOUT)|(?:TOOL|BASE)_DATA)\[(\d+)\]/gi;

    let match;
    while ((match = regex.exec(text)) !== null) {
      const type = match[1].toUpperCase();
      const index = parseInt(match[2], 10);
      const startOffset = match.index + match[0].length;
      const position = document.positionAt(startOffset);

      let name = "";

      if (type.includes("DATA")) {
        // Look for TOOL_NAME[index] or BASE_NAME[index]
        const prefix = type.split("_")[0]; // TOOL or BASE
        const searchKey = `$${prefix}`;
        const alias = state.mergedVariables.find(
          (v) =>
            v.signalType === searchKey &&
            v.signalIndex === index &&
            v.type === "NAME_ALIAS",
        );
        if (alias) {
          name = alias.name;
        }
      } else {
        // Look for SIGNAL assigned to this $IN/$OUT index
        const signal = state.mergedVariables.find(
          (v) =>
            v.signalType === type &&
            v.signalIndex === index &&
            v.type === "SIGNAL",
        );
        if (signal) {
          name = signal.name;
        }
      }

      if (name) {
        hints.push({
          position: position,
          label: `: ${name}`,
          kind: InlayHintKind.Parameter,
          paddingLeft: true,
        });
      }
    }

    return hints;
  }
}
