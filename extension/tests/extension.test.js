/**
 * KRL Extension Tests
 * Run with: node tests/extension.test.js
 */

const fs = require('fs');
const path = require('path');

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

const { execSync } = require('child_process');

console.log('=== KRL Extension Tests ===\n');

// Test 0: TypeScript Strict Type Check & Linter
console.log('--- Static Type & Linting Checks ---');

test('Server TypeScript compilation (tsc --noEmit) passes with 0 errors', () => {
    const serverDir = path.join(__dirname, '..', 'server');
    execSync('npx tsc --noEmit', { cwd: serverDir, stdio: 'pipe' });
});

test('Client TypeScript compilation (tsc --noEmit) passes with 0 errors', () => {
    const clientDir = path.join(__dirname, '..', 'client');
    execSync('npx tsc --noEmit', { cwd: clientDir, stdio: 'pipe' });
});

test('Codicons in package.json match valid VS Code icon set', () => {
    const VALID_CODICONS = new Set([
        'check-all', 'fold', 'unfold', 'code', 'whitespace', 'clear-all',
        'list-ordered', 'symbol-namespace', 'refresh', 'trash', 'symbol-numeric',
        'edit', 'beaker', 'report', 'git-merge', 'key', 'lock', 'info',
        'file-code', 'symbol-interface', 'list-flat', 'shield', 'widget',
        'diff', 'comment-discussion', 'dashboard', 'references', 'output', 'file-submodule'
    ]);
    const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
    const commands = pkg.contributes.commands || [];
    commands.forEach(cmd => {
        if (cmd.icon && cmd.icon.startsWith('$(') && cmd.icon.endsWith(')')) {
            const iconName = cmd.icon.substring(2, cmd.icon.length - 1);
            assertTrue(VALID_CODICONS.has(iconName), `Invalid or unknown Codicon "${iconName}" in command ${cmd.command}`);
        }
    });
});

// Test 1: Grammar file structure
console.log('\n--- Grammar Tests ---');

test('Grammar file exists', () => {
    const grammarPath = path.join(__dirname, '..', 'client', 'syntaxes', 'krl.tmLanguage.json');
    assertTrue(fs.existsSync(grammarPath), 'Grammar file not found');
});

test('Grammar has correct scopeName', () => {
    const grammar = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'client', 'syntaxes', 'krl.tmLanguage.json'), 'utf8'));
    assertEqual(grammar.scopeName, 'source.krl');
});

test('Grammar contains KRL keywords', () => {
    const grammar = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'client', 'syntaxes', 'krl.tmLanguage.json'), 'utf8'));
    const content = JSON.stringify(grammar);
    assertTrue(content.includes('PTP'), 'PTP keyword missing');
    assertTrue(content.includes('LIN'), 'LIN keyword missing');
    assertTrue(content.includes('CIRC'), 'CIRC keyword missing');
    assertTrue(content.includes('DECL'), 'DECL keyword missing');
    assertTrue(content.includes('E6POS'), 'E6POS type missing');
});

test('Grammar contains new keywords from Reference Guide', () => {
    const grammar = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'client', 'syntaxes', 'krl.tmLanguage.json'), 'utf8'));
    const content = JSON.stringify(grammar);
    assertTrue(content.includes('IMPORT'), 'IMPORT keyword missing');
    assertTrue(content.includes('MAXIMUM'), 'MAXIMUM keyword missing');
    assertTrue(content.includes('CHANNEL'), 'CHANNEL keyword missing');
});

test('Grammar contains system variables', () => {
    const grammar = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'client', 'syntaxes', 'krl.tmLanguage.json'), 'utf8'));
    const content = JSON.stringify(grammar);
    assertTrue(content.includes('VEL'), 'VEL missing');
    assertTrue(content.includes('ACC'), 'ACC missing');
    assertTrue(content.includes('BASE'), 'BASE missing');
    assertTrue(content.includes('TOOL'), 'TOOL missing');
});

test('Grammar contains OpenKuka.KRL enums', () => {
    const grammar = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'client', 'syntaxes', 'krl.tmLanguage.json'), 'utf8'));
    const content = JSON.stringify(grammar);
    assertTrue(content.includes('P_FREE'), '#P_FREE enum missing');
    assertTrue(content.includes('P_ACTIVE'), '#P_ACTIVE enum missing');
    assertTrue(content.includes('CMD_OK'), '#CMD_OK enum missing');
});

// Test 2: Snippets
console.log('\n--- Snippets Tests ---');

test('Snippets file exists', () => {
    const snippetsPath = path.join(__dirname, '..', 'client', 'snippets', 'krl.code-snippets');
    assertTrue(fs.existsSync(snippetsPath), 'Snippets file not found');
});

test('Snippets file is valid JSON', () => {
    const snippetsPath = path.join(__dirname, '..', 'client', 'snippets', 'krl.code-snippets');
    const snippets = JSON.parse(fs.readFileSync(snippetsPath, 'utf8'));
    assertTrue(typeof snippets === 'object', 'Snippets is not an object');
});

test('Snippets contain motion commands', () => {
    const snippets = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'client', 'snippets', 'krl.code-snippets'), 'utf8'));
    const keys = Object.keys(snippets);
    assertTrue(keys.length > 40, `Expected more than 40 snippets, got ${keys.length}`);
});

test('Snippets contain COPEN/CREAD/CWRITE', () => {
    const snippets = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'client', 'snippets', 'krl.code-snippets'), 'utf8'));
    const content = JSON.stringify(snippets);
    assertTrue(content.includes('COPEN'), 'COPEN snippet missing');
    assertTrue(content.includes('CREAD'), 'CREAD snippet missing');
    assertTrue(content.includes('CWRITE'), 'CWRITE snippet missing');
});

test('Snippets contain E6POS/E6AXIS declarations', () => {
    const snippets = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'client', 'snippets', 'krl.code-snippets'), 'utf8'));
    assertTrue(snippets['E6POS Declaration'], 'E6POS Declaration snippet missing');
    assertTrue(snippets['E6AXIS Declaration'], 'E6AXIS Declaration snippet missing');
});

// Test 3: Themes
console.log('\n--- Theme Tests ---');

test('Industrial Dark Theme exists', () => {
    const themePath = path.join(__dirname, '..', 'client', 'themes', 'KRL_Industrial_Dark.json');
    assertTrue(fs.existsSync(themePath), 'Industrial Dark Theme not found');
});

test('Theme has KRL-specific rules', () => {
    const theme = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'client', 'themes', 'KRL_Industrial_Dark.json'), 'utf8'));
    const content = JSON.stringify(theme);
    assertTrue(content.includes('keyword.control.krl'), 'KRL control keywords scope missing');
    assertTrue(content.includes('keyword.function.movement.krl'), 'KRL movement scope missing');
});

test('All themes are valid JSON', () => {
    const themesDir = path.join(__dirname, '..', 'client', 'themes');
    const themes = fs.readdirSync(themesDir).filter(f => f.endsWith('.json'));
    themes.forEach(theme => {
        try {
            JSON.parse(fs.readFileSync(path.join(themesDir, theme), 'utf8'));
        } catch (e) {
            throw new Error(`Failed to parse theme: ${theme}`);
        }
    });
    assertTrue(themes.length >= 6, `Expected at least 6 themes, got ${themes.length}`);
});

// Test 4: Package.json
console.log('\n--- Package Tests ---');

test('Package.json version is valid semantic version', () => {
    const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
    assertTrue(/^\d+\.\d+\.\d+$/.test(pkg.version), `Invalid package version format: ${pkg.version}`);
});

test('Package.json has all themes registered', () => {
    const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
    const themes = pkg.contributes.themes;
    assertTrue(themes.length >= 6, `Expected at least 6 themes, got ${themes.length}`);
    const labels = themes.map(t => t.label);
    assertTrue(labels.includes('KRL Industrial Dark'), 'KRL Industrial Dark theme not registered');
    assertTrue(labels.includes('KRL Blueprint'), 'KRL Blueprint theme not registered');
    assertTrue(labels.includes('KRL WorkVisual Dark (Standard)'), 'KRL WorkVisual Dark theme not registered');
});

test('Package.json has KRL language definition', () => {
    const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
    const languages = pkg.contributes.languages;
    assertTrue(languages.length > 0, 'No languages defined');
    assertTrue(languages[0].id === 'krl', 'KRL language not defined');
});

// Test 5: Wonderlib Functions
console.log('\n--- Wonderlib Tests ---');

test('Wonderlib functions file exists', () => {
    const wonderlibPath = path.join(__dirname, '..', 'server', 'src', 'lib', 'wonderlibFunctions.ts');
    assertTrue(fs.existsSync(wonderlibPath), 'wonderlibFunctions.ts not found');
});

test('Wonderlib contains expected functions', () => {
    const content = fs.readFileSync(path.join(__dirname, '..', 'server', 'src', 'lib', 'wonderlibFunctions.ts'), 'utf8');
    assertTrue(content.includes('DISTANCE_POINT_POINT'), 'DISTANCE_POINT_POINT missing');
    assertTrue(content.includes('SPRINTF'), 'SPRINTF missing');
    assertTrue(content.includes('IN_RANGE'), 'IN_RANGE missing');
});

// Test 6: Licensing & Links
console.log('\n--- Licensing Tests ---');

test('Control Center has the correct Lemon Squeezy Checkout URL', () => {
    const licensePath = path.join(__dirname, '..', 'client', 'src', 'features', 'license.ts');
    const licenseContent = fs.readFileSync(licensePath, 'utf8');
    assertTrue(licenseContent.includes('https://liskin.lemonsqueezy.com/checkout/buy/886efdd8-90cc-4afd-856d-5d7b076ae9b7'), 'Checkout URL is missing or incorrect in license.ts');

    const controlCenterPath = path.join(__dirname, '..', 'client', 'src', 'features', 'controlCenter.ts');
    const ccContent = fs.readFileSync(controlCenterPath, 'utf8');
    assertTrue(ccContent.includes('LEMON_SQUEEZY_CHECKOUT_URL'), 'LEMON_SQUEEZY_CHECKOUT_URL missing in controlCenter.ts');
});

test('Lemon Squeezy Store ID (393141) and Product ID (1103272) exist in license.ts', () => {
    const licensePath = path.join(__dirname, '..', 'client', 'src', 'features', 'license.ts');
    const content = fs.readFileSync(licensePath, 'utf8');
    assertTrue(content.includes('LEMON_SQUEEZY_STORE_ID = 393141'), 'LEMON_SQUEEZY_STORE_ID 393141 missing in license.ts');
    assertTrue(content.includes('LEMON_SQUEEZY_PRODUCT_ID = 1103272'), 'LEMON_SQUEEZY_PRODUCT_ID 1103272 missing in license.ts');
});

test('PRICING_PLANS contains Monthly and Annual subscription tiers', () => {
    const licensePath = path.join(__dirname, '..', 'client', 'src', 'features', 'license.ts');
    const content = fs.readFileSync(licensePath, 'utf8');
    assertTrue(content.includes('pro_monthly'), 'pro_monthly tier missing in PRICING_PLANS');
    assertTrue(content.includes('pro_annual'), 'pro_annual tier missing in PRICING_PLANS');
});

test('Lemon Squeezy API calls use application/x-www-form-urlencoded specification', () => {
    const licensePath = path.join(__dirname, '..', 'client', 'src', 'features', 'license.ts');
    const content = fs.readFileSync(licensePath, 'utf8');
    assertTrue(content.includes('application/x-www-form-urlencoded'), 'x-www-form-urlencoded Content-Type missing in license.ts');
    assertTrue(content.includes('callLemonSqueezyApi'), 'callLemonSqueezyApi helper missing in license.ts');
});

// Test 7: Multilingual i18n Symmetry
console.log('\n--- i18n Symmetry Tests ---');

test('Client and Server i18n locales are symmetric for EN, RU, and TR', () => {
    function extractLocaleKeys(filePath, localeName) {
        const content = fs.readFileSync(filePath, 'utf8');
        const localeBlockRegex = new RegExp(`const ${localeName}:\\s*(?:Messages|ServerMessages)\\s*=\\s*\\{([\\s\\S]*?)\\};`, 'm');
        const match = content.match(localeBlockRegex);
        if (!match) return new Set();
        const block = match[1];
        const keys = new Set();
        const keyMatches = block.matchAll(/"([^"]+)":/g);
        for (const k of keyMatches) {
            keys.add(k[1]);
        }
        return keys;
    }

    const clientPath = path.join(__dirname, '..', 'client', 'src', 'i18n.ts');
    const clientEn = extractLocaleKeys(clientPath, 'en');
    const clientRu = extractLocaleKeys(clientPath, 'ru');
    const clientTr = extractLocaleKeys(clientPath, 'tr');

    assertEqual(clientEn.size, clientRu.size, 'Client EN and RU key counts must match');
    assertEqual(clientEn.size, clientTr.size, 'Client EN and TR key counts must match');

    const serverPath = path.join(__dirname, '..', 'server', 'src', 'lib', 'i18n.ts');
    const serverEn = extractLocaleKeys(serverPath, 'en');
    const serverRu = extractLocaleKeys(serverPath, 'ru');
    const serverTr = extractLocaleKeys(serverPath, 'tr');

    assertEqual(serverEn.size, serverRu.size, 'Server EN and RU key counts must match');
    assertEqual(serverEn.size, serverTr.size, 'Server EN and TR key counts must match');

    const nlsEn = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.nls.json'), 'utf8'));
    const nlsRu = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.nls.ru.json'), 'utf8'));
    const nlsTr = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.nls.tr.json'), 'utf8'));

    assertEqual(Object.keys(nlsEn).length, Object.keys(nlsRu).length, 'Package NLS EN and RU key counts must match');
    assertEqual(Object.keys(nlsEn).length, Object.keys(nlsTr).length, 'Package NLS EN and TR key counts must match');
});

// Test 9: Webview CSP & Panel ViewColumns Architecture
console.log('\n--- Webview & Panel Architecture Tests ---');

test('Flowchart Webview CSP contains unsafe-eval and cspSource', () => {
    const flowchartPath = path.join(__dirname, '..', 'client', 'src', 'features', 'flowchartViewer.ts');
    const content = fs.readFileSync(flowchartPath, 'utf8');
    assertTrue(content.includes("'unsafe-eval'"), "flowchartViewer.ts CSP missing 'unsafe-eval'");
    assertTrue(content.includes('${cspSource}'), "flowchartViewer.ts CSP missing ${cspSource}");
    assertTrue(content.includes('flowchartRenderDiv'), "flowchartViewer.ts missing flowchartRenderDiv isolated container");
});

test('Snippet Generator Panel uses ViewColumn.Beside for side-by-side split view', () => {
    const snippetPath = path.join(__dirname, '..', 'client', 'src', 'features', 'snippetGenerator.ts');
    const content = fs.readFileSync(snippetPath, 'utf8');
    assertTrue(content.includes('vscode.ViewColumn.Beside'), 'snippetGenerator.ts must use ViewColumn.Beside to open beside active editor');
    assertTrue(!content.includes('column || vscode.ViewColumn.One'), 'snippetGenerator.ts must not replace active tab column');
});

// Test 10: Obfuscator & Build Settings Safety
console.log('\n--- Obfuscator Config Safety Tests ---');

test('esbuild.js obfuscator settings are safe for VS Code extension architecture', () => {
    const esbuildPath = path.join(__dirname, '..', 'esbuild.js');
    const content = fs.readFileSync(esbuildPath, 'utf8');
    assertTrue(content.includes('renameGlobals: false'), 'esbuild.js renameGlobals must be false');
    assertTrue(content.includes('debugProtection: false'), 'esbuild.js debugProtection must be false');
    assertTrue(content.includes('selfDefending: false'), 'esbuild.js selfDefending must be false');
    assertTrue(content.includes('reservedNames:'), 'esbuild.js reservedNames missing');
    assertTrue(content.includes('^activate$'), 'esbuild.js reservedNames must protect activate entry point');
    assertTrue(content.includes('^deactivate$'), 'esbuild.js reservedNames must protect deactivate entry point');
});

// Test 11: Extension Activation & Async Lifecycle Safety
console.log('\n--- Activation & Async Lifecycle Safety Tests ---');

test('main.ts exports async activate and awaits initLicense', () => {
    const mainTsPath = path.join(__dirname, '..', 'client', 'src', 'main.ts');
    const content = fs.readFileSync(mainTsPath, 'utf8');
    assertTrue(content.includes('export async function activate'), 'main.ts activate function must be async');
    assertTrue(content.includes('await initLicense(context)'), 'main.ts must await initLicense(context) to avoid race condition');
    assertTrue(content.includes('.catch(('), 'main.ts lsClient.start() must have .catch() error handler');
});

// Summary
console.log('\n=== Test Summary ===');
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);
console.log(`Total: ${passed + failed}`);

process.exit(failed > 0 ? 1 : 0);
