const fs = require('fs');
const path = require('path');

function extractLocaleKeys(filePath, localeVar) {
    const content = fs.readFileSync(filePath, 'utf8');
    const regex = new RegExp('(?:const|let|var)\\s+' + localeVar + '\\s*(?::\\s*\\w+)?\\s*=\\s*\\{([\\s\\S]*?)\\};', 'm');
    const match = content.match(regex);
    if (!match) return {};
    const body = match[1];
    const keyMap = {};
    const keyRegex = /"([^"]+)"\s*:\s*(`[^`]*`|"[^"]*"|'[^']*')/g;
    let km;
    while ((km = keyRegex.exec(body)) !== null) {
        keyMap[km[1]] = km[2];
    }
    return keyMap;
}

console.log('=== 1. CLIENT i18n AUDIT ===');
const clientPath = path.join(__dirname, '..', 'client', 'src', 'i18n.ts');
const clientEn = extractLocaleKeys(clientPath, 'en');
const clientRu = extractLocaleKeys(clientPath, 'ru');
const clientTr = extractLocaleKeys(clientPath, 'tr');

console.log('Client EN keys count:', Object.keys(clientEn).length);
console.log('Client RU keys count:', Object.keys(clientRu).length);
console.log('Client TR keys count:', Object.keys(clientTr).length);

const allClientKeys = new Set([...Object.keys(clientEn), ...Object.keys(clientRu), ...Object.keys(clientTr)]);
let clientIssues = [];
for (const k of allClientKeys) {
    if (!clientEn[k]) clientIssues.push({ key: k, missingIn: 'EN' });
    if (!clientRu[k]) clientIssues.push({ key: k, missingIn: 'RU' });
    if (!clientTr[k]) clientIssues.push({ key: k, missingIn: 'TR' });

    // Check placeholder parity {0}, {1}, {2}
    if (clientEn[k] && clientRu[k] && clientTr[k]) {
        const phEn = (clientEn[k].match(/\{\d+\}/g) || []).sort().join(',');
        const phRu = (clientRu[k].match(/\{\d+\}/g) || []).sort().join(',');
        const phTr = (clientTr[k].match(/\{\d+\}/g) || []).sort().join(',');
        if (phEn !== phRu || phEn !== phTr) {
            clientIssues.push({ key: k, issue: 'Placeholder mismatch', EN: phEn, RU: phRu, TR: phTr });
        }
    }
}
console.log('Client Issues:', clientIssues.length === 0 ? 'None (100% Symmetric & Valid)' : clientIssues);

console.log('\n=== 2. SERVER i18n AUDIT ===');
const serverPath = path.join(__dirname, '..', 'server', 'src', 'lib', 'i18n.ts');
const serverEn = extractLocaleKeys(serverPath, 'en');
const serverRu = extractLocaleKeys(serverPath, 'ru');
const serverTr = extractLocaleKeys(serverPath, 'tr');

console.log('Server EN keys count:', Object.keys(serverEn).length);
console.log('Server RU keys count:', Object.keys(serverRu).length);
console.log('Server TR keys count:', Object.keys(serverTr).length);

const allServerKeys = new Set([...Object.keys(serverEn), ...Object.keys(serverRu), ...Object.keys(serverTr)]);
let serverIssues = [];
for (const k of allServerKeys) {
    if (!serverEn[k]) serverIssues.push({ key: k, missingIn: 'EN' });
    if (!serverRu[k]) serverIssues.push({ key: k, missingIn: 'RU' });
    if (!serverTr[k]) serverIssues.push({ key: k, missingIn: 'TR' });

    if (serverEn[k] && serverRu[k] && serverTr[k]) {
        const phEn = (serverEn[k].match(/\{\d+\}/g) || []).sort().join(',');
        const phRu = (serverRu[k].match(/\{\d+\}/g) || []).sort().join(',');
        const phTr = (serverTr[k].match(/\{\d+\}/g) || []).sort().join(',');
        if (phEn !== phRu || phEn !== phTr) {
            serverIssues.push({ key: k, issue: 'Placeholder mismatch', EN: phEn, RU: phRu, TR: phTr });
        }
    }
}
console.log('Server Issues:', serverIssues.length === 0 ? 'None (100% Symmetric & Valid)' : serverIssues);

console.log('\n=== 3. PACKAGE.NLS AUDIT ===');
const nlsEn = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.nls.json'), 'utf8'));
const nlsRu = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.nls.ru.json'), 'utf8'));
const nlsTr = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.nls.tr.json'), 'utf8'));

console.log('NLS EN count:', Object.keys(nlsEn).length);
console.log('NLS RU count:', Object.keys(nlsRu).length);
console.log('NLS TR count:', Object.keys(nlsTr).length);

const allNlsKeys = new Set([...Object.keys(nlsEn), ...Object.keys(nlsRu), ...Object.keys(nlsTr)]);
let nlsIssues = [];
for (const k of allNlsKeys) {
    if (!nlsEn[k]) nlsIssues.push({ key: k, missingIn: 'EN' });
    if (!nlsRu[k]) nlsIssues.push({ key: k, missingIn: 'RU' });
    if (!nlsTr[k]) nlsIssues.push({ key: k, missingIn: 'TR' });
}
console.log('NLS Issues:', nlsIssues.length === 0 ? 'None (100% Symmetric & Valid)' : nlsIssues);

console.log('\n=== 4. HARDCODED USER-FACING STRING SCANNER ===');
const featuresDir = path.join(__dirname, '..', 'client', 'src', 'features');
const files = fs.readdirSync(featuresDir).filter(f => f.endsWith('.ts'));

let notificationAudit = [];
files.forEach(file => {
    const content = fs.readFileSync(path.join(featuresDir, file), 'utf8');
    const lines = content.split('\n');
    lines.forEach((line, idx) => {
        if (line.includes('vscode.window.showInformationMessage') ||
            line.includes('vscode.window.showWarningMessage') ||
            line.includes('vscode.window.showErrorMessage') ||
            line.includes('vscode.window.createWebviewPanel')) {
            if (!line.includes('t(') && !line.includes('createWebviewPanel')) {
                notificationAudit.push({ file, line: idx + 1, code: line.trim() });
            }
        }
    });
});
console.log('Direct notification calls without t():', notificationAudit);

