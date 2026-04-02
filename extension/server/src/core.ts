import {
  createConnection,
  TextDocuments,
  ProposedFeatures,
  InitializeParams,
  InitializeResult,
  TextDocumentSyncKind,
  Diagnostic,
  DefinitionParams,
  CompletionParams,
  HoverParams,
  FoldingRangeParams,
  DocumentSymbolParams,
  WorkspaceSymbolParams,
  RenameParams,
  PrepareRenameParams,
  ReferenceParams,
  SignatureHelpParams,
  CodeActionParams,
  CodeLensParams,
} from "vscode-languageserver/node";
import { TextDocument } from "vscode-languageserver-textdocument";
import { URI } from "vscode-uri";
import { ServerState, VariableInfo } from "./types";
import { SymbolResolver } from "./features/definition";
import { AutoCompleter } from "./features/completion";
import { DiagnosticsProvider } from "./features/diagnostics";
import { InfoProvider } from "./features/hover";
import { InlayHintsProvider } from "./features/inlayHints";
import { RegionProvider } from "./features/regions";
import { KrlFormatter, setFormattingSettings } from "./features/formatter";
import { DocumentSymbolsProvider } from "./features/symbols";
import { WorkspaceSymbolsProvider } from "./features/workspaceSymbols";
import { RenameProvider } from "./features/rename";
import { ReferencesProvider } from "./features/references";
import { SignatureHelpProvider } from "./features/signatureHelp";
import { CodeActionsProvider } from "./features/codeActions";
import { CodeLensProvider } from "./features/codeLens";
import { CallHierarchyProvider } from "./features/callHierarchy";
import { HighlightProvider } from "./features/highlights";
import { SymbolExtractor, extractStrucVariables } from "./lib/collector";
import { getAllDatFiles, getAllSourceFiles } from "./lib/fileSystem";
import { setLocale } from "./lib/i18n";
import { findWorkspaceRoot } from "./lib/workspaceResolver";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";

// DEBUG KAYIT - Hata ayıklama için log dosyası
const DEBUG_ENABLED = process.env.KRL_DEBUG === "true";
const logFile = DEBUG_ENABLED
  ? path.join(os.tmpdir(), "krl-server-debug.log")
  : "";

let logStream: fs.WriteStream | null = null;
if (DEBUG_ENABLED && logFile) {
  try {
    logStream = fs.createWriteStream(logFile, { flags: "a" });
  } catch {
    /* ignore */
  }
}

function log(msg: string) {
  if (!DEBUG_ENABLED || !logStream) return;
  logStream.write(`[${new Date().toISOString()}] ${msg}\n`);
}

log(`Sunucu başlatılıyor. PID: ${process.pid}`);

// Hata yakalama
process.on("uncaughtException", (err) => {
  log("Yakalanmamış Hata: " + err.toString());
  process.exit(1);
});

// Bağlantı oluştur
const connection = createConnection(ProposedFeatures.all);
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

// Global Durum
const state: ServerState = {
  workspaceRoot: null,
  fileVariablesMap: new Map(),
  variableStructTypes: {},
  structDefinitions: {},
  functionsDeclared: [],
  mergedVariables: [],
};

// Конфигурация
let serverConfig = {
  validateNonAscii: true,
  separateBeforeBlocks: false,
  separateAfterBlocks: false,
};

const validationTimeouts = new Map<string, NodeJS.Timeout>();
const VALIDATION_DELAY_MS = 750;
let workspaceInitialized = false;

function scheduleValidation(uri: string, validationFn: () => void) {
  const existingTimeout = validationTimeouts.get(uri);
  if (existingTimeout) clearTimeout(existingTimeout);
  const timeout = setTimeout(() => {
    validationTimeouts.delete(uri);
    validationFn();
  }, VALIDATION_DELAY_MS);
  validationTimeouts.set(uri, timeout);
}

// Özellikler
const definitions = new SymbolResolver();
const completions = new AutoCompleter();
const hoverInfo = new InfoProvider();
const regions = new RegionProvider();
const formatter = new KrlFormatter();
const documentSymbols = new DocumentSymbolsProvider();
const workspaceSymbols = new WorkspaceSymbolsProvider();
const renameProvider = new RenameProvider();
const referencesProvider = new ReferencesProvider();
const signatureHelp = new SignatureHelpProvider();
const codeActions = new CodeActionsProvider();
const codeLens = new CodeLensProvider();
const callHierarchy = new CallHierarchyProvider();
const highlights = new HighlightProvider();
const inlayHints = new InlayHintsProvider();
const diagnostics = new DiagnosticsProvider(connection);

// =======================
// Başlatma İşleyicileri
// =======================

connection.onInitialize((params: InitializeParams): InitializeResult => {
  state.workspaceRoot = params.rootUri
    ? URI.parse(params.rootUri).fsPath
    : null;
  diagnostics.setWorkspaceRoot(state.workspaceRoot);

  return {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Incremental,
      definitionProvider: true,
      hoverProvider: true,
      foldingRangeProvider: true,
      documentFormattingProvider: true,
      documentSymbolProvider: true,
      workspaceSymbolProvider: true,
      documentHighlightProvider: true,
      renameProvider: { prepareProvider: true },
      referencesProvider: true,
      signatureHelpProvider: {
        triggerCharacters: ["(", ","],
        retriggerCharacters: [","],
      },
      codeActionProvider: { codeActionKinds: ["quickfix", "refactor.extract"] },
      completionProvider: {
        triggerCharacters: [
          ".",
          "(",
          ",",
          " ",
          "=",
          "+",
          "-",
          "*",
          "/",
          "<",
          ">",
          "!",
          ..."abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_",
        ],
      },
      codeLensProvider: { resolveProvider: true },
      inlayHintProvider: true,
      callHierarchyProvider: true,
    },
  };
});

connection.onNotification(
  "custom/updateSettings",
  (settings: typeof serverConfig) => {
    serverConfig = { ...serverConfig, ...settings };
    setFormattingSettings({
      separateBeforeBlocks: serverConfig.separateBeforeBlocks,
      separateAfterBlocks: serverConfig.separateAfterBlocks,
    });
  },
);

connection.onNotification("custom/setLocale", (locale: string) =>
  setLocale(locale),
);

connection.onInitialized(async () => {
  if (!state.workspaceRoot) return;
  const datFiles = await getAllDatFiles(state.workspaceRoot);
  for (const filePath of datFiles) {
    try {
      const content = await fs.promises.readFile(filePath, "utf8");
      const uri = URI.file(filePath).toString();
      const extractor = new SymbolExtractor();
      extractor.extractFromText(content);
      state.fileVariablesMap.set(uri, extractor.getVariables());
      const structs = extractStrucVariables(content);
      Object.assign(state.structDefinitions, structs);
    } catch (err) {
      /* ignore */
    }
  }
  await extractFunctionsFromWorkspace(state.workspaceRoot);
  state.mergedVariables = mergeAllVariables(state.fileVariablesMap);
  diagnostics.updateFunctionCache(state.functionsDeclared.map((f) => f.name));
  workspaceInitialized = true;
});

async function extractFunctionsFromWorkspace(
  workspaceRoot: string,
): Promise<void> {
  const sourceFiles = await getAllSourceFiles(workspaceRoot);
  const defRegex =
    /^\s*(?:GLOBAL\s+)?(DEF|DEFFCT)\s+(?:\w+\s+)?(\w+)\s*\(([^)]*)\)/gim;
  for (const filePath of sourceFiles) {
    try {
      const content = await fs.promises.readFile(filePath, "utf8");
      const uri = URI.file(filePath).toString();
      const lines = content.split(/\r?\n/);
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        let match;
        defRegex.lastIndex = 0;
        while ((match = defRegex.exec(line)) !== null) {
          const funcName = match[2];
          if (
            !state.functionsDeclared.some(
              (f) => f.name.toUpperCase() === funcName.toUpperCase(),
            )
          ) {
            state.functionsDeclared.push({
              uri,
              line: i,
              startChar: line.indexOf(funcName),
              endChar: line.indexOf(funcName) + funcName.length,
              params: match[3]?.trim() || "",
              name: funcName,
            });
          }
        }
      }
    } catch (err) {
      /* ignore */
    }
  }
}

// ==========================
// Belge Olayları
// ==========================

documents.onDidOpen(async (event) => {
  const { document } = event;
  log(`[onDidOpen] Checking: ${document.uri}`);
  updateDocumentState(document);
  await validateDocument(document);
});

documents.onDidChangeContent(async (change) => {
  const { document } = change;
  updateDocumentState(document);
  scheduleValidation(document.uri, async () => {
    const currentDoc = documents.get(document.uri);
    if (currentDoc && currentDoc.version === document.version) {
      await validateDocument(currentDoc);
    }
  });
});

documents.onDidClose((e) => {
  const uri = e.document.uri;
  const existingTimeout = validationTimeouts.get(uri);
  if (existingTimeout) clearTimeout(existingTimeout);
  connection.sendDiagnostics({ uri, diagnostics: [] });
});

async function validateDocument(document: TextDocument): Promise<void> {
  try {
    let allDiagnostics: Diagnostic[] = [];
    if (workspaceInitialized) {
      allDiagnostics.push(
        ...diagnostics.validateVariablesUsage(document, state.mergedVariables),
      );
      const localVars = state.fileVariablesMap.get(document.uri);
      if (localVars)
        allDiagnostics.push(
          ...diagnostics.validateUnusedVariables(document, localVars),
        );
    }
    const isDat = document.uri.toLowerCase().endsWith(".dat");
    const isSrc = document.uri.toLowerCase().endsWith(".src");
    if (isDat) allDiagnostics.push(...diagnostics.validateDatFile(document));
    if (isSrc || isDat) {
      allDiagnostics.push(
        ...diagnostics.validateKrlConstraints(document),
        ...diagnostics.validateGeneralSyntax(document),
      );
    }
    if (isSrc) {
      allDiagnostics.push(
        ...diagnostics.validateSafetySpeeds(document),
        ...diagnostics.validateToolBaseInit(document),
        ...diagnostics.validateBlockBalance(document),
        ...diagnostics.validateDuplicateNames(document),
        ...diagnostics.validateDeadCode(document),
        ...diagnostics.validateEmptyBlocks(document),
        ...diagnostics.validateDangerousStatements(document),
        ...diagnostics.validateTypeUsage(document, state.mergedVariables),
      );
    }
    connection.sendDiagnostics({
      uri: document.uri,
      diagnostics: allDiagnostics,
    });
  } catch (e) {
    log(`Error validating ${document.uri}: ${e}`);
  }
}

function updateDocumentState(document: TextDocument): void {
  if (document.uri.endsWith(".dat"))
    Object.assign(
      state.structDefinitions,
      extractStrucVariables(document.getText()),
    );
  const extractor = new SymbolExtractor();
  extractor.extractFromText(document.getText());
  state.fileVariablesMap.set(document.uri, extractor.getVariables());
  state.mergedVariables = mergeAllVariables(state.fileVariablesMap);
  updateFunctionsFromDocument(document);
  diagnostics.updateFunctionCache(state.functionsDeclared.map((f) => f.name));
}

function updateFunctionsFromDocument(document: TextDocument): void {
  const uri = document.uri;
  const content = document.getText();
  const defRegex =
    /^\s*(?:GLOBAL\s+)?(DEF|DEFFCT)\s+(?:\w+\s+)?(\w+)\s*\(([^)]*)\)/gim;
  state.functionsDeclared = state.functionsDeclared.filter(
    (f) => f.uri !== uri,
  );
  const lines = content.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    let match;
    defRegex.lastIndex = 0;
    while ((match = defRegex.exec(lines[i])) !== null) {
      const name = match[2];
      state.functionsDeclared.push({
        uri,
        line: i,
        startChar: lines[i].indexOf(name),
        endChar: lines[i].indexOf(name) + name.length,
        params: match[3]?.trim() || "",
        name,
      });
    }
  }
}

connection.onNotification("custom/validateWorkspace", async () => {
  if (!state.workspaceRoot) return;
  const files = await getAllSourceFiles(state.workspaceRoot);
  for (const filePath of files) {
    try {
      const content = await fs.promises.readFile(filePath, "utf8");
      const doc = TextDocument.create(
        URI.file(filePath).toString(),
        "krl",
        1,
        content,
      );
      await validateDocument(doc);
    } catch (e) {
      /* ignore */
    }
  }
});

// İstek İşleyicileri
connection.onDefinition((p) => definitions.onDefinition(p, documents, state));
connection.onCompletion((p) => completions.onCompletion(p, documents, state));
connection.onHover((p) => hoverInfo.onHover(p, documents, state));
connection.onFoldingRanges((p) => regions.onFoldingRanges(p, documents));
connection.onDocumentFormatting((p) =>
  formatter.provideFormatting(p, documents),
);
connection.onDocumentSymbol((p) =>
  documentSymbols.onDocumentSymbols(p, documents),
);
connection.onWorkspaceSymbol((p) =>
  workspaceSymbols.onWorkspaceSymbol(p, state),
);
connection.onPrepareRename((p) =>
  renameProvider.prepareRename(p, documents, state),
);
connection.onRenameRequest((p) => renameProvider.onRename(p, documents, state));
connection.onReferences((p) =>
  referencesProvider.onReferences(p, documents, state),
);
connection.onSignatureHelp((p) =>
  signatureHelp.onSignatureHelp(p, documents, state),
);
connection.onCodeAction((p) => codeActions.onCodeAction(p, documents, state));
connection.onCodeLens((p) => codeLens.onCodeLens(p, documents, state));
connection.onCodeLensResolve((l) => codeLens.onCodeLensResolve(l));
connection.onDocumentHighlight((p) =>
  highlights.onDocumentHighlight(p, documents),
);
connection.languages.callHierarchy.onPrepare((p) =>
  callHierarchy.prepareCallHierarchy(p, documents, state),
);
connection.languages.callHierarchy.onIncomingCalls((p) =>
  callHierarchy.incomingCalls(p, documents, state),
);
connection.languages.callHierarchy.onOutgoingCalls((p) =>
  callHierarchy.outgoingCalls(p, documents, state),
);

connection.languages.inlayHint.on((params) =>
  inlayHints.onInlayHint(params, documents, state),
);

function mergeAllVariables(map: Map<string, VariableInfo[]>): VariableInfo[] {
  const result: VariableInfo[] = [];
  const seen = new Set<string>();
  for (const [uri, vars] of map.entries()) {
    for (const v of vars) {
      if (!seen.has(v.name.toUpperCase())) {
        seen.add(v.name.toUpperCase());
        result.push({ ...v, uri });
      }
    }
  }
  return result;
}

connection.listen();
documents.listen(connection);
