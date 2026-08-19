const path = require('path');
const fs = require('fs');

let passed = 0;
let failed = 0;

function test(description, fn) {
    try {
        fn();
        console.log(`[PASS] ${description}`);
        passed++;
    } catch (e) {
        console.log(`[FAIL] ${description}`);
        console.log(`  Error: ${e.message}`);
        console.log(e.stack);
        failed++;
    }
}

function assertEqual(actual, expected, msg) {
    if (actual !== expected) {
        throw new Error(msg || `Expected ${expected}, got ${actual}`);
    }
}

function assertTrue(condition, msg) {
    if (!condition) {
        throw new Error(msg || 'Condition is false');
    }
}

console.log('=== KRL LSP Logic Tests ===\n');

// Mock TextDocument
class MockTextDocument {
    constructor(uri, text) {
        this.uri = uri;
        this.text = text;
    }
    getText() {
        return this.text;
    }
}

// Mock Documents
class MockDocuments {
    constructor(docs) {
        this.docs = docs;
    }
    get(uri) {
        return this.docs.find(d => d.uri === uri);
    }
}

// Mock State
const mockState = {
    fileVariablesMap: new Map(),
    structDefinitions: {},
    functionsDeclared: [
        { name: 'MY_USER_FUNC', params: 'INT a, REAL b' }
    ],
    mergedVariables: [
        { name: 'MY_VAR', type: 'INT' }
    ]
};

// --- Completion Test ---
const { AutoCompleter } = require('../server/out/features/completion.js');
console.log('--- Completion Tests ---');

test('Completion in Context.DEF provides functions and logic keywords', () => {
    const completer = new AutoCompleter();
    const doc = new MockTextDocument('file:///test.src', 'DEF MY_PROG()\n  \nEND');
    const docs = new MockDocuments([doc]);
    
    const params = {
        textDocument: { uri: 'file:///test.src' },
        position: { line: 1, character: 2 } // Line 1 is "  "
    };

    const items = completer.onCompletion(params, docs, mockState);
    
    // Check if MY_USER_FUNC is present
    const hasUserFunc = items.some(i => i.label === 'MY_USER_FUNC');
    assertTrue(hasUserFunc, 'MY_USER_FUNC should be suggested in DEF context');
    
    // Check if logic keywords like IF are present
    const hasIfKeyword = items.some(i => i.label === 'IF');
    assertTrue(hasIfKeyword, 'IF keyword should be suggested in DEF context');

    // Check if DEF keyword is absent (since nested DEF not allowed)
    const hasDefKeyword = items.some(i => i.label === 'DEF');
    assertTrue(!hasDefKeyword, 'DEF keyword should NOT be suggested inside DEF context');
});

test('Completion in Context.DAT provides only data keywords', () => {
    const completer = new AutoCompleter();
    const doc = new MockTextDocument('file:///test.dat', 'DEFDAT MY_PROG\n  \nENDDAT');
    const docs = new MockDocuments([doc]);
    
    const params = {
        textDocument: { uri: 'file:///test.dat' },
        position: { line: 1, character: 2 } // Line 1 is "  "
    };

    const items = completer.onCompletion(params, docs, mockState);
    
    // Check if logic keywords like IF are absent
    const hasIfKeyword = items.some(i => i.label === 'IF');
    assertTrue(!hasIfKeyword, 'IF keyword should NOT be suggested in DAT context');

    // Check if DECL is present
    const hasDeclKeyword = items.some(i => i.label === 'DECL');
    assertTrue(hasDeclKeyword, 'DECL keyword should be suggested in DAT context');
});

// --- Formatting Test ---
const { KrlFormatter } = require('../server/out/features/formatter.js');
console.log('\n--- Formatter Tests ---');

test('Formatter indents correctly and aligns assignments', () => {
    const formatter = new KrlFormatter();
    const doc = new MockTextDocument('file:///test.src', 'DEF test()\nIF TRUE THEN\nA=1\nLONG_VAR=2\nENDIF\nEND');
    const settings = {
        krl: { indentWidth: 3, alignAssignments: true, separateBeforeBlocks: false, separateAfterBlocks: false, indentFolds: true }
    };
    
    // We need to set the global formattingSettings in the formatter module
    const formatterModule = require('../server/out/features/formatter.js');
    formatterModule.setFormattingSettings(settings.krl);
    
    const edits = formatter.provideFormatting({ textDocument: { uri: 'file:///test.src' }, options: { tabSize: 3, insertSpaces: true } }, new MockDocuments([doc]));
    
    const newText = edits[0].newText;
    console.log('Formatted text:\n' + newText);
    assertTrue(newText.includes('   IF TRUE THEN'), 'IF should be indented by 3');
    assertTrue(newText.includes('      A        = 1'), 'Assignment A should be indented by 6 and padded to match LONG_VAR');
    assertTrue(newText.includes('      LONG_VAR = 2'), 'Assignment LONG_VAR should be indented by 6');
});

// --- Diagnostics Tests ---
const { DiagnosticsProvider } = require('../server/out/features/diagnostics.js');
console.log('\n--- Diagnostics Tests ---');

test('Diagnostics detects unused variables and typo', () => {
    const diagProvider = new DiagnosticsProvider({});
    const doc = new MockTextDocument('file:///test.src', 'DEF test()\nDECL INT myVar\nmyVer = 1\nEND');
    const declaredVariables = [
        { name: 'myVar', isGlobal: false, type: 'INT', range: { start: { line: 1, character: 9 }, end: { line: 1, character: 14 } } }
    ];
    
    // Check unused
    const unused = diagProvider.validateUnusedVariables(doc, declaredVariables);
    assertTrue(unused.length === 1, 'Should detect 1 unused variable');
    assertTrue(unused[0].data.varName === 'myVar', 'Should identify myVar as unused');
    
    // Check usage / typo
    const usage = diagProvider.validateVariablesUsage(doc, declaredVariables);
    assertTrue(usage.length === 1, 'Should detect 1 undefined variable');
    assertTrue(usage[0].message.includes('myVer'), 'Should mention myVer is undefined');
    assertTrue(usage[0].message.includes('MYVAR'), 'Should suggest MYVAR'); // The spellchecker outputs uppercase MYVAR
});

test('Diagnostics detects high velocity', () => {
    const diagProvider = new DiagnosticsProvider({});
    const doc = new MockTextDocument('file:///test.src', 'DEF test()\n$VEL.CP = 3.5\n$VEL_PTP = 110\nEND');
    const safety = diagProvider.validateSafetySpeeds(doc);
    
    assertTrue(safety.length === 2, 'Should detect 2 safety warnings');
    assertTrue(safety[0].message.includes('3.5'), 'Should warn about 3.5 m/s');
    assertTrue(safety[1].message.includes('110'), 'Should warn about 110%');
});

test('Diagnostics detects dead global functions', () => {
    const diagProvider = new DiagnosticsProvider({});
    const doc = new MockTextDocument('file:///test.src', 'GLOBAL DEF MY_DEAD_FUNC()\nEND\nGLOBAL DEF MY_USED_FUNC()\nEND');
    
    const mockStateWithWords = {
        functionsDeclared: [
            { name: 'MY_DEAD_FUNC', uri: 'file:///test.src', isGlobal: true, line: 0, startChar: 11, endChar: 23 },
            { name: 'MY_USED_FUNC', uri: 'file:///test.src', isGlobal: true, line: 2, startChar: 11, endChar: 23 },
            { name: 'LOCAL_FUNC', uri: 'file:///test.src', isGlobal: false, line: 4, startChar: 0, endChar: 10 }
        ],
        fileWordCounts: new Map([
            ['file:///test.src', new Map([
                ['MY_DEAD_FUNC', 1], // only declared
                ['MY_USED_FUNC', 1]  // declared here
            ])],
            ['file:///other.src', new Map([
                ['MY_USED_FUNC', 3]  // used in another file
            ])]
        ])
    };
    
    const deadGlobalDiagnostics = diagProvider.validateDeadGlobalFunctions(doc, mockStateWithWords);
    
    assertTrue(deadGlobalDiagnostics.length === 1, 'Should detect exactly 1 dead global function');
    assertTrue(deadGlobalDiagnostics[0].message.includes('MY_DEAD_FUNC'), 'Should warn about MY_DEAD_FUNC');
});

// --- Control Flow Analyzer Tests ---
const { analyzeControlFlow, generateMermaid } = require('../server/out/features/controlFlowAnalyzer.js');
console.log('\n--- Control Flow Analyzer Tests ---');

test('CFG: Linear program produces correct graph', () => {
    const code = 'DEF MyProg()\nBAS(#INITMOV, 0)\nPTP xHome\nLIN xTarget\nEND';
    const graph = analyzeControlFlow(code);

    assertTrue(graph.nodes.length >= 4, 'Should have at least 4 nodes (DEF, BAS, PTP, LIN, END)');
    assertTrue(graph.edges.length >= 3, 'Should have at least 3 edges');

    const startNode = graph.nodes.find(n => n.type === 'start');
    assertTrue(!!startNode, 'Should have a start node');
    assertTrue(startNode.label.includes('MyProg'), 'Start node should mention MyProg');

    const endNode = graph.nodes.find(n => n.type === 'end');
    assertTrue(!!endNode, 'Should have an end node');

    // No errors expected (BAS #INITMOV counts as init)
    const uninitErrors = graph.errors.filter(e => e.type === 'uninitMotion');
    // BAS(#INITMOV) is init, so no uninitMotion errors
    assertEqual(uninitErrors.length, 0, 'No uninitMotion errors expected after BAS(#INITMOV)');
});

test('CFG: IF/ELSE produces decision node', () => {
    const code = 'DEF Test()\nIF bFlag == TRUE THEN\nPTP xA\nELSE\nPTP xB\nENDIF\nEND';
    const graph = analyzeControlFlow(code);

    const decisions = graph.nodes.filter(n => n.type === 'decision');
    assertTrue(decisions.length >= 1, 'Should have at least 1 decision node for IF');

    // Should have TRUE/FALSE labeled edges
    const labeledEdges = graph.edges.filter(e => e.label === 'TRUE' || e.label === 'FALSE');
    assertTrue(labeledEdges.length >= 1, 'Should have labeled TRUE/FALSE edges');
});

test('CFG: LOOP without EXIT produces infiniteLoop error', () => {
    const code = 'DEF Test()\nLOOP\nWAIT SEC 1\nENDLOOP\nEND';
    const graph = analyzeControlFlow(code);

    const loopErrors = graph.errors.filter(e => e.type === 'infiniteLoop');
    assertTrue(loopErrors.length === 1, 'Should detect exactly 1 infinite loop error');
});

test('CFG: Unreachable code after RETURN', () => {
    const code = 'DEF Test()\nRETURN\nPTP xHome\nEND';
    const graph = analyzeControlFlow(code);

    // PTP after RETURN should be detected (uninitMotion OR unreachable)
    const unreachable = graph.errors.filter(e => e.type === 'unreachable');
    assertTrue(unreachable.length >= 1, 'Should detect unreachable code after RETURN');
});

test('CFG: generateMermaid produces valid output', () => {
    const code = 'DEF Test()\nIF x THEN\nPTP xA\nENDIF\nEND';
    const graph = analyzeControlFlow(code);
    const mmd = generateMermaid(graph);

    assertTrue(mmd.startsWith('graph TD'), 'Mermaid output should start with graph TD');
    assertTrue(mmd.includes('classDef errorNode'), 'Should define error node style');
    assertTrue(mmd.includes('-->'), 'Should contain edges');
});

// Summary
console.log('\n=== LSP Test Summary ===');
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);
console.log(`Total: ${passed + failed}`);

process.exit(failed > 0 ? 1 : 0);

