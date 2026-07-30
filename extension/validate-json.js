const fs = require('fs');
const path = require('path');

const files = [
    'client/syntaxes/krl.tmLanguage.json',
    'client/snippets/krl.code-snippets',
    'client/themes/KRL_Industrial_Dark.json',
    'client/themes/KRL_Industrial_Light.json',
    'client/themes/KRL_Midnight_OLED.json',
    'client/themes/KRL_Blueprint.json',
    'client/themes/KRL_WorkVisual_Dark.json',
    'client/themes/KRL_WorkVisual_Light.json',
    'package.json'
];

console.log('=== JSON Validation ===\n');

let allValid = true;
files.forEach(file => {
    try {
        const fullPath = path.join(__dirname, file);
        const content = fs.readFileSync(fullPath, 'utf8');
        JSON.parse(content);
        console.log(`[OK] ${file}`);
    } catch (e) {
        console.log(`[FAIL] ${file}: ${e.message}`);
        allValid = false;
    }
});

console.log('\n=== Summary ===');
console.log(allValid ? 'All files are valid!' : 'Some files have errors!');
process.exit(allValid ? 0 : 1);
