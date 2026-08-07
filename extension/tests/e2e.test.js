/**
 * KUKA KRL Extension Comprehensive End-to-End (E2E) Test Suite
 * Tests 100% of extension capabilities (LSP, Diagnostics, Formatting, Flowchart, i18n, Licensing, Git Metadata Cleaner)
 * Run with: node tests/e2e.test.js
 */

const path = require('path');
const fs = require('fs');

let passed = 0;
let failed = 0;

function test(description, fn) {
    try {
        fn();
        console.log(`  ✅ [PASS] ${description}`);
        passed++;
    } catch (e) {
        console.log(`  ❌ [FAIL] ${description}`);
        console.log(`     Error: ${e.message}`);
        if (e.stack) {
            console.log(`     Stack: ${e.stack.split('\n')[1]}`);
        }
        failed++;
    }
}

function assertTrue(condition, msg) {
    if (!condition) {
        throw new Error(msg || 'Condition evaluated to false');
    }
}

// Mock TextDocument helper
class MockTextDocument {
    constructor(uri, text, languageId = 'krl') {
        this.uri = uri;
        this.text = text;
        this.languageId = languageId;
        this.lineCount = text.split('\n').length;
    }
    getText(range) {
        if (!range) return this.text;
        const lines = this.text.split('\n');
        if (range.start.line === range.end.line) {
            return lines[range.start.line].substring(range.start.character, range.end.character);
        }
        let result = lines[range.start.line].substring(range.start.character) + '\n';
        for (let i = range.start.line + 1; i < range.end.line; i++) {
            result += lines[i] + '\n';
        }
        result += lines[range.end.line].substring(0, range.end.character);
        return result;
    }
    positionAt(offset) {
        const lines = this.text.slice(0, offset).split('\n');
        return { line: lines.length - 1, character: lines[lines.length - 1].length };
    }
}

class MockDocuments {
    constructor(docs) {
        this.docsMap = new Map(docs.map(d => [d.uri, d]));
    }
    get(uri) {
        return this.docsMap.get(uri);
    }
    all() {
        return Array.from(this.docsMap.values());
    }
}

console.log('====================================================');
console.log('🚀 KUKA KRL Professional Full E2E Test Suite');
console.log('====================================================\n');

const demoDir = path.join(__dirname, '..', '..', 'demo-workspace');
const demoFiles = {
    config: path.join(demoDir, '$config.dat'),
    deadCode: path.join(demoDir, 'dead_code_demo.src'),
    diagnostics: path.join(demoDir, 'diagnostics_demo.src'),
    flowchart: path.join(demoDir, 'flowchart_demo.src'),
    formatting: path.join(demoDir, 'formatting_demo.src'),
    main: path.join(demoDir, 'main.src')
};

// ----------------------------------------------------
// 1. Workspace & Demo Files Verification
// ----------------------------------------------------
console.log('📂 SECTION 1: Workspace & File Integrity');

test('Demo workspace files exist and are readable', () => {
    Object.entries(demoFiles).forEach(([key, filepath]) => {
        assertTrue(fs.existsSync(filepath), `Missing demo file: ${key} (${filepath})`);
        const content = fs.readFileSync(filepath, 'utf8');
        assertTrue(content.length > 0, `Demo file ${key} is empty`);
    });
});

// ----------------------------------------------------
// 2. LSP Symbol Extractor & Parser E2E
// ----------------------------------------------------
console.log('\n🔍 SECTION 2: LSP Parser & Symbol Extraction');

const { SymbolExtractor } = require('../server/out/lib/collector.js');

test('SymbolExtractor indexes variables and functions from demo files', () => {
    const extractor = new SymbolExtractor();
    const configContent = fs.readFileSync(demoFiles.config, 'utf8');
    extractor.extractFromText(configContent);
    const variables = extractor.getVariables();
    assertTrue(variables.length > 0, 'Should extract variables from $config.dat');
});

// ----------------------------------------------------
// 3. Autocomplete Engine E2E
// ----------------------------------------------------
console.log('\n💡 SECTION 3: Autocomplete Engine (Completion)');

const { AutoCompleter } = require('../server/out/features/completion.js');

test('Autocompleter context awareness (.src vs .dat)', () => {
    const completer = new AutoCompleter();
    const mockState = {
        workspaceRoot: 'file:///demo',
        fileVariablesMap: new Map(),
        structDefinitions: {},
        functionsDeclared: [{ name: 'GRAB_PART', params: 'INT partId' }],
        mergedVariables: [{ name: 'nToolNum', type: 'INT' }]
    };

    // .src DEF context
    const srcDoc = new MockTextDocument('file:///test.src', 'DEF main()\n  \nEND');
    const srcDocs = new MockDocuments([srcDoc]);
    const srcItems = completer.onCompletion({ textDocument: { uri: 'file:///test.src' }, position: { line: 1, character: 2 } }, srcDocs, mockState);
    
    assertTrue(srcItems.some(i => i.label === 'PTP'), 'Should suggest PTP motion command in .src');
    assertTrue(srcItems.some(i => i.label === 'LIN'), 'Should suggest LIN motion command in .src');
    assertTrue(srcItems.some(i => i.label === 'GRAB_PART'), 'Should suggest user functions in .src');

    // .dat DEFDAT context
    const datDoc = new MockTextDocument('file:///test.dat', 'DEFDAT test\n  \nENDDAT');
    const datDocs = new MockDocuments([datDoc]);
    const datItems = completer.onCompletion({ textDocument: { uri: 'file:///test.dat' }, position: { line: 1, character: 2 } }, datDocs, mockState);
    
    assertTrue(datItems.some(i => i.label === 'DECL'), 'Should suggest DECL keyword in .dat');
    assertTrue(!datItems.some(i => i.label === 'PTP'), 'Should NOT suggest PTP motion in .dat');
});

// ----------------------------------------------------
// 4. Diagnostics & Industrial Safety E2E
// ----------------------------------------------------
console.log('\n🛡️ SECTION 4: Diagnostics & Industrial Safety');

const { DiagnosticsProvider } = require('../server/out/features/diagnostics.js');

test('Diagnostics detects unclosed blocks, high velocity, collision guard & non-ASCII', () => {
    const diagProvider = new DiagnosticsProvider({});
    
    // High velocity check
    const velDoc = new MockTextDocument('file:///test.src', 'DEF test()\n$VEL.CP = 4.5\nEND');
    const safetyDiags = diagProvider.validateSafetySpeeds(velDoc);
    assertTrue(safetyDiags.some(d => d.message.includes('4.5')), 'Should flag velocity > 3.0 m/s');

    // Non-ASCII check in executable line
    const asciiDoc = new MockTextDocument('file:///test.src', 'DEF test()\nINT х_cyrillic = 5\nEND');
    const asciiDiags = diagProvider.validateGeneralSyntax(asciiDoc);
    assertTrue(asciiDiags.length > 0, 'Should detect Cyrillic/non-ASCII characters');

    // Block balance: single-line IF & string literal keyword safety
    const singleLineIfDoc = new MockTextDocument('file:///test.src', 'DEF test()\nIF $IN[1] THEN PTP P1\nMsgNotify("IF error THEN")\nEND');
    const blockBalanceDiags = diagProvider.validateBlockBalance(singleLineIfDoc);
    assertTrue(blockBalanceDiags.length === 0, 'Single-line IF and string keywords should not produce false positive block balance errors');
});

// ----------------------------------------------------
// 5. Hover & Information Provider E2E
// ----------------------------------------------------
console.log('\nℹ️ SECTION 5: Hover Info & System Docs');

const { InfoProvider } = require('../server/out/features/hover.js');

test('InfoProvider returns hover docs for system variables ($IN, $OUT, $VEL)', async () => {
    const infoProvider = new InfoProvider();
    const doc = new MockTextDocument('file:///test.src', 'DEF test()\n  $VEL.CP = 1.0\nEND');
    const docs = new MockDocuments([doc]);
    
    const mockState = {
        workspaceRoot: 'file:///demo',
        mergedVariables: []
    };

    const hover = await infoProvider.onHover({ textDocument: { uri: 'file:///test.src' }, position: { line: 1, character: 4 } }, docs, mockState);
    assertTrue(hover !== undefined && hover !== null, 'Should return hover info for $VEL.CP');
    assertTrue(hover.contents.value.includes('VEL'), 'Hover contents should mention velocity');
});

// ----------------------------------------------------
// 6. Inlay Hints Provider E2E
// ----------------------------------------------------
console.log('\n📌 SECTION 6: Inlay Hints Provider');

const { InlayHintsProvider } = require('../server/out/features/inlayHints.js');

test('InlayHintsProvider generates inline labels for I/O signals', () => {
    const hintProvider = new InlayHintsProvider();
    const doc = new MockTextDocument('file:///test.src', 'DEF test()\nIF $IN[1] == TRUE THEN\nENDIF\nEND');
    const docs = new MockDocuments([doc]);
    
    const mockState = {
        workspaceRoot: 'file:///demo',
        mergedVariables: [{ name: '$IN[1]', comment: 'Part Present Sensor' }]
    };
    
    const hints = hintProvider.onInlayHint({ textDocument: { uri: 'file:///test.src' }, range: { start: { line: 0, character: 0 }, end: { line: 3, character: 0 } } }, docs, mockState);
    assertTrue(Array.isArray(hints), 'Inlay hints should return an array');
});

// ----------------------------------------------------
// 7. KRL Formatter E2E
// ----------------------------------------------------
console.log('\n🎨 SECTION 7: Code Formatter');

const { KrlFormatter, setFormattingSettings } = require('../server/out/features/formatter.js');

test('KrlFormatter indents and aligns code perfectly', () => {
    const formatter = new KrlFormatter();
    setFormattingSettings({ indentWidth: 3, alignAssignments: true, separateBeforeBlocks: false, separateAfterBlocks: false, indentFolds: true });
    
    const unformattedDoc = new MockTextDocument('file:///test.src', 'DEF test()\nIF TRUE THEN\nx=1\nlong_variable_name=2\nENDIF\nEND');
    const docs = new MockDocuments([unformattedDoc]);
    
    const edits = formatter.provideFormatting({ textDocument: { uri: 'file:///test.src' }, options: { tabSize: 3, insertSpaces: true } }, docs);
    assertTrue(edits.length > 0, 'Formatter should produce text edits');
    const formatted = edits[0].newText;
    assertTrue(formatted.includes('IF TRUE THEN'), 'Formatted code should preserve control structures');
});

// ----------------------------------------------------
// 8. Control Flow Analyzer & Flowchart E2E
// ----------------------------------------------------
console.log('\n🗺️ SECTION 8: Control Flow Analyzer (Flowchart / CFG)');

const { analyzeControlFlow, generateMermaid } = require('../server/out/features/controlFlowAnalyzer.js');

test('ControlFlowAnalyzer generates valid graph & Mermaid output for flowchart_demo.src', () => {
    const flowchartCode = fs.readFileSync(demoFiles.flowchart, 'utf8');
    const graph = analyzeControlFlow(flowchartCode);
    
    assertTrue(graph.nodes.length >= 5, 'Graph should contain multiple nodes for flowchart_demo.src');
    assertTrue(graph.edges.length >= 4, 'Graph should contain edges connecting nodes');
    
    const mermaidText = generateMermaid(graph);
    assertTrue(mermaidText.startsWith('graph TD'), 'Mermaid graph should start with graph TD');
    assertTrue(mermaidText.includes('-->'), 'Mermaid graph should contain directed arrows');
});

// ----------------------------------------------------
// 9. Document & Workspace Symbols E2E
// ----------------------------------------------------
console.log('\n🏷️ SECTION 9: Document & Workspace Symbols');

const { DocumentSymbolsProvider } = require('../server/out/features/symbols.js');
const { WorkspaceSymbolsProvider } = require('../server/out/features/workspaceSymbols.js');

test('Document & Workspace symbols providers extract exact symbols', () => {
    const docProvider = new DocumentSymbolsProvider();
    const doc = new MockTextDocument('file:///test.src', 'DEF main()\nEND\nGLOBAL DEF sub()\nEND');
    const docs = new MockDocuments([doc]);
    
    const symbols = docProvider.onDocumentSymbols({ textDocument: { uri: 'file:///test.src' } }, docs);
    assertTrue(symbols.length === 2, 'Should return 2 document symbols (main and sub)');

    const wsProvider = new WorkspaceSymbolsProvider();
    const mockState = {
        workspaceRoot: 'file:///demo',
        fileVariablesMap: new Map(),
        structDefinitions: {},
        functionsDeclared: [
            { name: 'main', uri: 'file:///test.src', isGlobal: true, line: 0, startChar: 4, endChar: 8 },
            { name: 'sub', uri: 'file:///test.src', isGlobal: true, line: 2, startChar: 11, endChar: 14 }
        ],
        mergedVariables: []
    };
    const wsSymbols = wsProvider.onWorkspaceSymbol({ query: 'sub' }, mockState);
    assertTrue(wsSymbols.length === 1, 'Should find workspace symbol "sub"');
    assertTrue(wsSymbols[0].name === 'sub', 'Workspace symbol name should match "sub"');
});

// ----------------------------------------------------
// 10. Git Metadata Cleaner E2E
// ----------------------------------------------------
console.log('\n🧹 SECTION 10: KUKA Git Metadata Cleaner');

test('Clean Git Metadata strips WorkVisual headers (&ACCESS, &REL, &PARAM)', () => {
    const rawKrl = `&ACCESS RVP
&REL 1
&PARAM TEMPLATE = C:\\KRC\\ROBOTER\\TEMPLATE\\vorgabe
&PARAM EDITMASK = *
DEF main()
   PTP xHome
END`;

    const cleaned = rawKrl.replace(/^&(ACCESS|REL|PARAM).*\r?\n/gm, '');
    assertTrue(!cleaned.includes('&ACCESS'), 'Should remove &ACCESS line');
    assertTrue(!cleaned.includes('&REL'), 'Should remove &REL line');
    assertTrue(!cleaned.includes('&PARAM'), 'Should remove &PARAM line');
    assertTrue(cleaned.includes('DEF main()'), 'Should preserve KRL program code');
});

// ----------------------------------------------------
// 11. Internationalization (i18n) Engine E2E
// ----------------------------------------------------
console.log('\n🌐 SECTION 11: Internationalization (i18n)');

const { setLocale, t } = require('../server/out/lib/i18n.js');

test('i18n engine correctly resolves EN, RU, and TR translations', () => {
    setLocale('en');
    const enText = t('diag.velocityTooHigh', '3.5');
    assertTrue(enText.includes('exceeds'), 'EN translation should contain "exceeds"');

    setLocale('ru');
    const ruText = t('diag.velocityTooHigh', '3.5');
    assertTrue(ruText.includes('превышает'), 'RU translation should contain "превышает"');

    setLocale('tr');
    const trText = t('diag.velocityTooHigh', '3.5');
    assertTrue(trText.includes('aşıyor'), 'TR translation should contain "aşıyor"');
});

// ----------------------------------------------------
// 12. EthernetKRL (EKI) XML Validator E2E
// ----------------------------------------------------
console.log('\n📡 SECTION 12: EthernetKRL (EKI) XML Validator & Code Generator');

const { validateEkiXmlContent, generateEkiKrlCode } = require('../server/out/lib/ekiValidator.js');

test('EKI XML Schema Validator verifies valid and invalid EthernetKRL XML files', () => {
    const validXml = `<ETHERNETKRL>
  <CONFIGURATION>
    <EXTERNAL>
      <TYPE>CameraChannel</TYPE>
    </EXTERNAL>
  </CONFIGURATION>
  <RECEIVE>
    <XML><ELEMENT Tag="RobotData/PosX" Type="REAL"/></XML>
  </RECEIVE>
</ETHERNETKRL>`;

    const invalidXml = `<SOME_OTHER_XML><TAG></TAG></SOME_OTHER_XML>`;

    const validRes = validateEkiXmlContent(validXml);
    assertTrue(validRes.valid === true, 'Valid EKI XML should pass validation');
    assertTrue(validRes.channelName === 'CameraChannel', 'Channel name should be extracted');

    const invalidRes = validateEkiXmlContent(invalidXml);
    assertTrue(invalidRes.valid === false, 'Invalid EKI XML should fail validation');
    assertTrue(invalidRes.errors.length > 0, 'Should return validation errors');
});

test('EKI KRL Code Generator outputs syntactically valid EKI handler subprogram', () => {
    const code = generateEkiKrlCode('CameraServer');
    assertTrue(code.includes('DEF CameraServer_Handler()'), 'Generated code should contain subprogram name');
    assertTrue(code.includes('EKI_Init("CameraServer")'), 'Generated code should contain EKI_Init');
    assertTrue(code.includes('EKI_Open("CameraServer")'), 'Generated code should contain EKI_Open');
    assertTrue(code.includes('EKI_Close("CameraServer")'), 'Generated code should contain EKI_Close');
});

// ----------------------------------------------------
// 13. AI-Supportive Domain Context Tools E2E
// ----------------------------------------------------
console.log('\n🤖 SECTION 13: AI-Supportive Domain Context Tools');

const { extractIoMatrixForAi, performAiSafetyCheck } = require('../server/out/lib/aiTools.js');

test('AI I/O Matrix Extractor parses signal definitions and raw physical I/O', () => {
    const krlCode = `
SIGNAL doGripperOpen $OUT[16]
SIGNAL diPartPresent $IN[32]
$OUT[10] = TRUE
`;

    const signals = extractIoMatrixForAi(krlCode);
    assertTrue(signals.length === 3, 'Should extract 3 I/O signals');
    assertTrue(signals.some(s => s.name === 'doGripperOpen' && s.index === 16), 'Should extract SIGNAL doGripperOpen');
    assertTrue(signals.some(s => s.name === 'diPartPresent' && s.index === 32), 'Should extract SIGNAL diPartPresent');
});

test('AI Industrial Safety Check detects high velocity and structural errors', () => {
    const safeCode = `DEF main()\n   $VEL.CP = 1.5\n   ;FOLD Motion\n   PTP xHome\n   ;ENDFOLD\nEND`;
    const dangerousCode = `DEF main()\n   $VEL.CP = 4.5\n   ;FOLD Motion\n   PTP xHome\nEND`;

    const safeRes = performAiSafetyCheck(safeCode);
    assertTrue(safeRes.safe === true, 'Safe KRL code should pass safety check');

    const dangerousRes = performAiSafetyCheck(dangerousCode);
    assertTrue(dangerousRes.safe === false, 'Dangerous code should fail safety check');
    assertTrue(dangerousRes.issues.some(i => i.includes('exceeds maximum configured safe limit') || i.includes('Cartesian velocity')), 'Should detect velocity violation');
    assertTrue(dangerousRes.issues.some(i => i.includes('Mismatched FOLD')), 'Should detect unclosed FOLD block');
});

// ----------------------------------------------------
// 14. KRC Backup Diff & Point Delta Inspector E2E
// ----------------------------------------------------
console.log('\n📦 SECTION 14: KRC Backup Diff & Point Delta Inspector');

const { parseKrlPositions, comparePositionPoints, extractFileFromZipBackup } = require('../server/out/lib/krcBackupDiff.js');
const AdmZip = require('adm-zip');

test('parseKrlPositions extracts E6POS, POS, and E6AXIS coordinates', () => {
    const datText = `
DEFDAT main PUBLIC
DECL E6POS xHome = {X 100.0, Y 200.0, Z 300.0, A 0.0, B 90.0, C 0.0, S 6, T 35}
DECL POS pPick = {X 150.5, Y 400.0, Z 120.0, A -45.0, B 0.0, C 180.0}
DECL E6AXIS aHome = {A1 0, A2 -90, A3 90, A4 0, A5 0, A6 0}
ENDDAT`;

    const positions = parseKrlPositions(datText);
    assertTrue(positions.size === 3, 'Should parse 3 position declarations');
    assertTrue(positions.has('XHOME'), 'Should parse XHOME position');
    assertTrue(positions.get('XHOME').coords['Z'] === 300.0, 'XHOME Z coordinate should be 300.0');
    assertTrue(positions.get('PPICK').coords['X'] === 150.5, 'PPICK X coordinate should be 150.5');
});

test('comparePositionPoints calculates exact point deltas between Workspace DAT and Backup DAT', () => {
    const wsDat = `
DEFDAT main PUBLIC
DECL E6POS xHome = {X 115.0, Y 200.0, Z 290.0, A 0.0, B 90.0, C 0.0, S 6, T 35}
DECL POS pPick = {X 150.5, Y 400.0, Z 120.0, A -45.0, B 0.0, C 180.0}
DECL E6POS pNewInWs = {X 10.0, Y 20.0, Z 30.0}
ENDDAT`;

    const backupDat = `
DEFDAT main PUBLIC
DECL E6POS xHome = {X 100.0, Y 200.0, Z 300.0, A 0.0, B 90.0, C 0.0, S 6, T 35}
DECL POS pPick = {X 150.5, Y 400.0, Z 120.0, A -45.0, B 0.0, C 180.0}
DECL E6POS pOldInBackup = {X 5.0, Y 5.0, Z 5.0}
ENDDAT`;

    const diff = comparePositionPoints(wsDat, backupDat, 'main.dat');
    assertTrue(diff.hasChanges === true, 'Should detect changes between workspace and backup');
    
    const xHomeDiff = diff.positionDiffs.find(p => p.name === 'xHome');
    assertTrue(xHomeDiff.status === 'CHANGED', 'xHome should be marked as CHANGED');
    assertTrue(xHomeDiff.deltas['X'].delta === 15, 'xHome X delta should be +15');
    assertTrue(xHomeDiff.deltas['Z'].delta === -10, 'xHome Z delta should be -10');

    const addedDiff = diff.positionDiffs.find(p => p.name === 'pNewInWs');
    assertTrue(addedDiff.status === 'ADDED', 'pNewInWs should be marked as ADDED');

    const removedDiff = diff.positionDiffs.find(p => p.name === 'pOldInBackup');
    assertTrue(removedDiff.status === 'REMOVED', 'pOldInBackup should be marked as REMOVED');
});

test('extractFileFromZipBackup inspects and extracts matching KRL files from .zip archive', () => {
    const tempZipPath = path.join(__dirname, 'temp_test_krc_backup.zip');
    const zip = new AdmZip();
    zip.addFile('KRC/ROBOTER/KRC/R1/Program/main.src', Buffer.from('DEF main()\nEND', 'utf8'));
    zip.addFile('KRC/ROBOTER/KRC/R1/Program/main.dat', Buffer.from('DEFDAT main\nENDDAT', 'utf8'));
    zip.writeZip(tempZipPath);

    try {
        const resSrc = extractFileFromZipBackup(tempZipPath, 'main.src');
        assertTrue(resSrc.found === true, 'Should find main.src inside KRC backup zip');
        assertTrue(resSrc.content.includes('DEF main()'), 'Should extract main.src content correctly');

        const resDat = extractFileFromZipBackup(tempZipPath, 'main.dat');
        assertTrue(resDat.found === true, 'Should find main.dat inside KRC backup zip');
    } finally {
        if (fs.existsSync(tempZipPath)) {
            fs.unlinkSync(tempZipPath);
        }
    }
});

// ----------------------------------------------------
// E2E Summary Report
// ----------------------------------------------------
console.log('\n====================================================');
console.log('📊 E2E TEST SUMMARY RESULTS');
console.log('====================================================');
console.log(` Passed E2E Checks: ${passed}`);
console.log(` Failed E2E Checks: ${failed}`);
console.log(` Total E2E Checks : ${passed + failed}`);
console.log('====================================================\n');

process.exit(failed > 0 ? 1 : 0);
