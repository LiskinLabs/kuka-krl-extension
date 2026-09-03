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
    const rootDir = path.join(__dirname, '..');
    const tscBin = path.join(rootDir, 'node_modules', '.bin', process.platform === 'win32' ? 'tsc.cmd' : 'tsc');
    if (fs.existsSync(tscBin)) {
        execSync(`"${tscBin}" -p server --noEmit`, { cwd: rootDir, stdio: 'pipe' });
    } else {
        execSync('npx tsc -p server --noEmit', { cwd: rootDir, stdio: 'pipe' });
    }
});

test('Client TypeScript compilation (tsc --noEmit) passes with 0 errors', () => {
    const rootDir = path.join(__dirname, '..');
    const tscBin = path.join(rootDir, 'node_modules', '.bin', process.platform === 'win32' ? 'tsc.cmd' : 'tsc');
    if (fs.existsSync(tscBin)) {
        execSync(`"${tscBin}" -p client --noEmit`, { cwd: rootDir, stdio: 'pipe' });
    } else {
        execSync('npx tsc -p client --noEmit', { cwd: rootDir, stdio: 'pipe' });
    }
});

test('Codicons in package.json match valid VS Code icon set', () => {
    const VALID_CODICONS = new Set([
        'check-all', 'fold', 'unfold', 'code', 'whitespace', 'clear-all',
        'list-ordered', 'symbol-namespace', 'refresh', 'trash', 'symbol-numeric',
        'edit', 'beaker', 'report', 'git-merge', 'key', 'lock', 'info',
        'file-code', 'symbol-interface', 'list-flat', 'shield', 'widget',
        'diff', 'comment-discussion', 'dashboard', 'references', 'output', 'file-submodule',
        'archive', 'pulse', 'credit-card', 'globe', 'account', 'git-commit', 'history', 'source-control'
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

test('Control Center has the correct Dodo Payments Checkout URL', () => {
    const licensePath = path.join(__dirname, '..', 'client', 'src', 'features', 'license.ts');
    const licenseContent = fs.readFileSync(licensePath, 'utf8');
    assertTrue(licenseContent.includes('https://checkout.dodopayments.com/buy/pdc_0NmAaL3aw5WKbMZgAVCDZ'), 'Checkout URL is missing or incorrect in license.ts');

    const controlCenterPath = path.join(__dirname, '..', 'client', 'src', 'features', 'controlCenter.ts');
    const ccContent = fs.readFileSync(controlCenterPath, 'utf8');
    assertTrue(ccContent.includes('DODO_PAYMENTS_CHECKOUT_URL'), 'DODO_PAYMENTS_CHECKOUT_URL missing in controlCenter.ts');
});

test('Dodo Payments Business ID (bus_0NlrxPhrg9eHzPZKAgsF1) and Product ID exist in license.ts', () => {
    const licensePath = path.join(__dirname, '..', 'client', 'src', 'features', 'license.ts');
    const content = fs.readFileSync(licensePath, 'utf8');
    assertTrue(content.includes('DODO_BUSINESS_ID = "bus_0NlrxPhrg9eHzPZKAgsF1"'), 'DODO_BUSINESS_ID missing in license.ts');
    assertTrue(content.includes('DODO_PRODUCT_ID_ANNUAL = "pdt_0NmAV012KFHSjUMyDomJ6"'), 'DODO_PRODUCT_ID_ANNUAL missing in license.ts');
});

test('PRICING_PLANS contains Monthly, Annual, and Lifetime tiers', () => {
    const licensePath = path.join(__dirname, '..', 'client', 'src', 'features', 'license.ts');
    const content = fs.readFileSync(licensePath, 'utf8');
    assertTrue(content.includes('pro_monthly'), 'pro_monthly tier missing in PRICING_PLANS');
    assertTrue(content.includes('pro_annual'), 'pro_annual tier missing in PRICING_PLANS');
    assertTrue(content.includes('pro_lifetime'), 'pro_lifetime tier missing in PRICING_PLANS');
    assertTrue(content.includes('DODO_PRODUCT_ID_LIFETIME = "pdt_0NmAcoqVCfuwQ6Xx7qyqr"'), 'DODO_PRODUCT_ID_LIFETIME missing in license.ts');
    assertTrue(content.includes('GRACE_PERIOD_MS = 14 * 24 * 60 * 60 * 1000'), '14-day GRACE_PERIOD_MS missing in license.ts');
});

test('GitLens KRL Version Control features and commands are registered', () => {
    const pkgPath = path.join(__dirname, '..', 'package.json');
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    const commands = pkg.contributes.commands.map(c => c.command);
    assertTrue(commands.includes('krl.viewFileHistory'), 'krl.viewFileHistory missing in package.json');
    assertTrue(commands.includes('krl.showLineBlameDetails'), 'krl.showLineBlameDetails missing in package.json');

    const gitLensPath = path.join(__dirname, '..', 'client', 'src', 'features', 'gitLensKrl.ts');
    assertTrue(fs.existsSync(gitLensPath), 'gitLensKrl.ts file is missing');
});

test('Dodo Payments API calls use application/json specification', () => {
    const licensePath = path.join(__dirname, '..', 'client', 'src', 'features', 'license.ts');
    const content = fs.readFileSync(licensePath, 'utf8');
    assertTrue(content.includes('application/json'), 'application/json Content-Type missing in license.ts');
    assertTrue(content.includes('callDodoPaymentsApi'), 'callDodoPaymentsApi helper missing in license.ts');
});

test('License security enforces SecretStorage encryption, HMAC signature, and zero hardcoded plaintext keys', () => {
    const licensePath = path.join(__dirname, '..', 'client', 'src', 'features', 'license.ts');
    const content = fs.readFileSync(licensePath, 'utf8');
    assertTrue(content.includes('SECRET_STORAGE_KEY'), 'SECRET_STORAGE_KEY missing in license.ts');
    assertTrue(content.includes('computeCacheSignature'), 'computeCacheSignature HMAC helper missing in license.ts');
    assertTrue(!content.includes('"TEKNOROB-LEAD"'), 'Plaintext TEKNOROB-LEAD string must NOT be hardcoded in license.ts');
});

test('Modern KRL & iiQKA Fold Suite features and commands are registered and functional', () => {
    const pkgPath = path.join(__dirname, '..', 'package.json');
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    const commands = pkg.contributes.commands.map(c => c.command);
    assertTrue(commands.includes('krl.convertToIiqkaFold'), 'krl.convertToIiqkaFold missing in package.json');
    assertTrue(commands.includes('krl.convertLegacyToSpline'), 'krl.convertLegacyToSpline missing in package.json');
    assertTrue(commands.includes('krl.unwrapFold'), 'krl.unwrapFold missing in package.json');
    assertTrue(commands.includes('krl.insertCollisionGuard'), 'krl.insertCollisionGuard missing in package.json');
    assertTrue(commands.includes('krl.insertSplineBlock'), 'krl.insertSplineBlock missing in package.json');

    const foldToolsPath = path.join(__dirname, '..', 'client', 'src', 'features', 'foldTools.ts');
    assertTrue(fs.existsSync(foldToolsPath), 'foldTools.ts file is missing');
    const content = fs.readFileSync(foldToolsPath, 'utf8');
    assertTrue(content.includes('parseMotionLine'), 'parseMotionLine helper missing in foldTools.ts');
    assertTrue(content.includes('convertToIiqkaFold'), 'convertToIiqkaFold missing in foldTools.ts');
    assertTrue(content.includes('convertLegacyToSpline'), 'convertLegacyToSpline missing in foldTools.ts');
});

// Test 7: Multilingual i18n Symmetry
console.log('\n--- i18n Symmetry Tests ---');

test('Client and Server i18n locales are symmetric for EN, RU, TR, and ES', () => {
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
    const clientEs = extractLocaleKeys(clientPath, 'es');

    assertEqual(clientEn.size, clientRu.size, 'Client EN and RU key counts must match');
    assertEqual(clientEn.size, clientTr.size, 'Client EN and TR key counts must match');
    assertEqual(clientEn.size, clientEs.size, 'Client EN and ES key counts must match');

    const serverPath = path.join(__dirname, '..', 'server', 'src', 'lib', 'i18n.ts');
    const serverEn = extractLocaleKeys(serverPath, 'en');
    const serverRu = extractLocaleKeys(serverPath, 'ru');
    const serverTr = extractLocaleKeys(serverPath, 'tr');
    const serverEs = extractLocaleKeys(serverPath, 'es');

    assertEqual(serverEn.size, serverRu.size, 'Server EN and RU key counts must match');
    assertEqual(serverEn.size, serverTr.size, 'Server EN and TR key counts must match');
    assertEqual(serverEn.size, serverEs.size, 'Server EN and ES key counts must match');

    const nlsEn = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.nls.json'), 'utf8'));
    const nlsRu = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.nls.ru.json'), 'utf8'));
    const nlsTr = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.nls.tr.json'), 'utf8'));
    const nlsEs = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.nls.es.json'), 'utf8'));

    assertEqual(Object.keys(nlsEn).length, Object.keys(nlsRu).length, 'Package NLS EN and RU key counts must match');
    assertEqual(Object.keys(nlsEn).length, Object.keys(nlsTr).length, 'Package NLS EN and TR key counts must match');
    assertEqual(Object.keys(nlsEn).length, Object.keys(nlsEs).length, 'Package NLS EN and ES key counts must match');
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

// Test 12: Support Gateway & Enterprise Relay Configuration Tests
console.log('\n--- Support Gateway & Zero-Token Security Tests ---');

test('package.json contributes krl.supportGatewayUrl with valid live URL', () => {
    const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
    const config = pkg.contributes.configuration.properties['krl.supportGatewayUrl'];
    assertTrue(config !== undefined, 'krl.supportGatewayUrl setting is missing from package.json');
    assertTrue(config.default.startsWith('https://'), 'Default gateway URL must use HTTPS');
    assertTrue(config.default.includes('workers.dev'), 'Default gateway URL points to live Cloudflare Worker');
});

test('telegramService.ts contains ZERO hardcoded BOT_TOKEN', () => {
    const tgServicePath = path.join(__dirname, '..', 'client', 'src', 'features', 'telegramService.ts');
    const content = fs.readFileSync(tgServicePath, 'utf8');
    assertTrue(!content.includes('BOT_TOKEN ='), 'telegramService.ts must not define BOT_TOKEN constant');
    assertTrue(!content.includes('api.telegram.org/bot'), 'telegramService.ts must not call Telegram API directly');
    assertTrue(content.includes('/api/v1/chat/message'), 'telegramService.ts routes messages through /api/v1/chat/message');
    assertTrue(content.includes('/api/v1/chat/poll'), 'telegramService.ts polls through /api/v1/chat/poll');
});

test('telegramService.ts enforces explicit user consent before executing remote actions', () => {
    const tgServicePath = path.join(__dirname, '..', 'client', 'src', 'features', 'telegramService.ts');
    const content = fs.readFileSync(tgServicePath, 'utf8');
    assertTrue(content.includes('handleRemoteActionWithConsent'), 'Missing handleRemoteActionWithConsent guard');
    assertTrue(content.includes('vscode.window.showWarningMessage'), 'Remote actions must show modal warning message');
    assertTrue(content.includes('modal: true'), 'Consent prompt must be modal to prevent background exfiltration');
});

test('Cloudflare Worker configuration files and bindings exist and are valid', () => {
    const workerPath = path.join(__dirname, '..', '..', 'cloudflare-worker', 'worker.js');
    const wranglerPath = path.join(__dirname, '..', '..', 'cloudflare-worker', 'wrangler.toml');
    assertTrue(fs.existsSync(workerPath), 'worker.js must exist in cloudflare-worker directory');
    assertTrue(fs.existsSync(wranglerPath), 'wrangler.toml must exist in cloudflare-worker directory');
    const wranglerContent = fs.readFileSync(wranglerPath, 'utf8');
    assertTrue(wranglerContent.includes('binding = "CHAT_KV"'), 'wrangler.toml must bind CHAT_KV namespace');
});

test('Language configuration JSON exists and defines valid comment and bracket pairs', () => {
    const langConfigPath = path.join(__dirname, '..', 'client', 'krl-language-configuration.json');
    assertTrue(fs.existsSync(langConfigPath), 'krl-language-configuration.json must exist');
    const langConfig = JSON.parse(fs.readFileSync(langConfigPath, 'utf8'));
    assertTrue(langConfig.comments && langConfig.comments.lineComment === ';', 'KRL line comment must be ";"');
    assertTrue(Array.isArray(langConfig.brackets), 'Brackets array must be defined');
    assertTrue(Array.isArray(langConfig.autoClosingPairs), 'Auto closing pairs must be defined');
});

test('KRL TextMate Grammar contains advanced Spline motion keywords and system functions', () => {
    const grammarPath = path.join(__dirname, '..', 'client', 'syntaxes', 'krl.tmLanguage.json');
    const grammar = JSON.parse(fs.readFileSync(grammarPath, 'utf8'));
    const grammarStr = JSON.stringify(grammar);
    assertTrue(grammarStr.includes('SPLINE'), 'Grammar must contain SPLINE keyword');
    assertTrue(grammarStr.includes('ENDSPLINE'), 'Grammar must contain ENDSPLINE keyword');
    assertTrue(grammarStr.includes('SPTP'), 'Grammar must contain SPTP keyword');
    assertTrue(grammarStr.includes('SLIN'), 'Grammar must contain SLIN keyword');
    assertTrue(grammarStr.includes('SCIRC'), 'Grammar must contain SCIRC keyword');
});

// Test 13: ReversingLabs Spectra Assure & Supply Chain Compliance Tests
console.log('\n--- Spectra Assure & Supply Chain Security Tests ---');

test('All Webview features enforce strict Content-Security-Policy (CSP) headers', () => {
    const webviewFiles = [
        'flowchartViewer.ts',
        'telegramChatPanel.ts',
        'controlCenter.ts',
        'snippetGenerator.ts',
        'calculator.ts'
    ];
    for (const fileName of webviewFiles) {
        const filePath = path.join(__dirname, '..', 'client', 'src', 'features', fileName);
        assertTrue(fs.existsSync(filePath), `Webview feature file missing: ${fileName}`);
        const content = fs.readFileSync(filePath, 'utf8');
        assertTrue(content.includes('Content-Security-Policy'), `${fileName} missing Content-Security-Policy meta tag`);
        assertTrue(content.includes("default-src 'none'"), `${fileName} CSP must declare default-src 'none'`);
    }
});

test('All Webview embedded JavaScript scripts are syntactically valid with zero errors', () => {
    const webviewFiles = [
        'calculator.ts',
        'controlCenter.ts',
        'flowchartViewer.ts',
        'snippetGenerator.ts',
        'telegramChatPanel.ts'
    ];
    for (const fileName of webviewFiles) {
        const filePath = path.join(__dirname, '..', 'client', 'src', 'features', fileName);
        assertTrue(fs.existsSync(filePath), `Webview feature file missing: ${fileName}`);
        const content = fs.readFileSync(filePath, 'utf8');
        const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
        let match;
        let scriptCount = 0;
        while ((match = scriptRegex.exec(content)) !== null) {
            scriptCount++;
            const scriptBody = match[1];
            if (!scriptBody.trim()) continue;

            // Sanitize template string interpolations like ${...} for syntax checking
            let sanitized = scriptBody;
            // 1. Strings containing interpolations: "foo ${bar} baz" -> "mock_str"
            sanitized = sanitized.replace(/"[^"\r\n]*\$\{[\s\S]*?\}[^"\r\n]*"/g, '"mock_str"');
            sanitized = sanitized.replace(/'[^'\r\n]*\$\{[\s\S]*?\}[^'\r\n]*'/g, "'mock_str'");
            // 2. Pure JS interpolations: ${JSON.stringify(...)} -> "mock_val"
            sanitized = sanitized.replace(/\$\{[\s\S]*?\}/g, '"mock_val"');

            try {
                new Function('acquireVsCodeApi', 'window', 'document', sanitized);
            } catch (err) {
                throw new Error(`Syntax error in Webview script inside ${fileName} (script #${scriptCount}): ${err.message}`);
            }
        }
        assertTrue(scriptCount > 0, `No <script> tag found in Webview file: ${fileName}`);
    }
});

test('Cloudflare Worker HTML pages contain valid syntax and zero dead links', () => {
    const workerPath = path.join(__dirname, '..', '..', 'cloudflare-worker', 'worker.js');
    assertTrue(fs.existsSync(workerPath), 'worker.js missing');
    const content = fs.readFileSync(workerPath, 'utf8');
    assertTrue(content.includes('vscode://LiskinLabs.kuka-krl-extension/activate'), 'worker.js must contain 1-click URI handler for VS Code');
    assertTrue(content.includes('/activate') && content.includes('/webhook/dodo'), 'worker.js must handle activation and dodo webhook endpoints');
});

test('Client and server source code contains zero unsafe eval or dynamic code execution', () => {
    function checkDirForUnsafeCode(dir) {
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const fullPath = path.join(dir, file);
            const stat = fs.statSync(fullPath);
            if (stat.isDirectory()) {
                checkDirForUnsafeCode(fullPath);
            } else if (file.endsWith('.ts') && !file.endsWith('.d.ts')) {
                const code = fs.readFileSync(fullPath, 'utf8');
                assertTrue(!code.includes('eval('), `Unsafe eval() found in ${fullPath}`);
                assertTrue(!code.includes('new Function('), `Unsafe new Function() found in ${fullPath}`);
                assertTrue(!code.includes('vm.runIn'), `Unsafe vm.runIn* execution found in ${fullPath}`);
            }
        }
    }
    checkDirForUnsafeCode(path.join(__dirname, '..', 'client', 'src'));
    checkDirForUnsafeCode(path.join(__dirname, '..', 'server', 'src'));
});

test('GitHub Actions CI and Security workflows exist and validate VSIX artifacts', () => {
    const ciPath = path.join(__dirname, '..', '..', '.github', 'workflows', 'ci.yml');
    const secPath = path.join(__dirname, '..', '..', '.github', 'workflows', 'security.yml');
    assertTrue(fs.existsSync(ciPath), 'ci.yml workflow missing');
    assertTrue(fs.existsSync(secPath), 'security.yml workflow missing');
    const secContent = fs.readFileSync(secPath, 'utf8');
    assertTrue(secContent.includes('gh-action-rl-scanner'), 'security.yml must integrate ReversingLabs Spectra Assure action');
});

test('organizeKrlDeclarations organizes, groups, and sorts KRL declarations', () => {
    const { organizeKrlDeclarations } = require('../server/out/features/codeActions');
    const rawKrl = [
        'DEF my_program()',
        '  DECL INT nCounter = 0',
        '  DECL E6POS XP_HOME = {X 0, Y 0, Z 0, A 0, B 0, C 0}',
        '  SIGNAL do_clamp $OUT[1]',
        '  EXT Sub_Palletize(INT:IN)',
        '  GLOBAL DECL REAL rSpeed = 1.5',
        '  DECL BOOL bReady = FALSE',
        '  PTP XP_HOME',
        'END'
    ].join('\n');

    const organized = organizeKrlDeclarations(rawKrl);
    assertTrue(organized.includes('; --- External Declarations ---'), 'Must contain External Declarations header');
    assertTrue(organized.includes('; --- I/O Signals ---'), 'Must contain I/O Signals header');
    assertTrue(organized.includes('; --- Global Declarations ---'), 'Must contain Global Declarations header');
    assertTrue(organized.includes('; --- Variables ---'), 'Must contain Variables header');
    assertTrue(organized.includes('; --- Positions & Frames ---'), 'Must contain Positions & Frames header');
    assertTrue(organized.includes('PTP XP_HOME'), 'Must preserve execution statements');
});

test('GitLens KRL commands and configuration are registered in package.json', () => {
    const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
    const commandNames = pkg.contributes.commands.map(c => c.command);
    assertTrue(commandNames.includes('krl.diffWithPrevious'), 'Must contribute krl.diffWithPrevious command');
    assertTrue(commandNames.includes('krl.copyCommitMessage'), 'Must contribute krl.copyCommitMessage command');
    assertTrue(commandNames.includes('krl.toggleGitLensInlineBlame'), 'Must contribute krl.toggleGitLensInlineBlame command');
    assertTrue(pkg.contributes.configuration.properties['krl.gitLens.currentLine.enabled'] !== undefined, 'Must contribute krl.gitLens.currentLine.enabled setting');
});

// Summary
console.log('\n=== Test Summary ===');
console.log(`Passed: ${passed}`);
console.log(`Failed: ${failed}`);
console.log(`Total: ${passed + failed}`);

process.exit(failed > 0 ? 1 : 0);

