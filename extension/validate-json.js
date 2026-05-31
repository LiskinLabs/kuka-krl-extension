const fs = require('fs');
const path = require('path');

const files = [
    'client/syntaxes/krl.tmLanguage.json',
    'client/snippets/krl.code-snippets',
    'client/themes/KRL_Bearded_Arc.json',
    'client/themes/KRL_WorkVisual_Dark.json',
    'package.json'
];

console.log('=== JSON Validation ===\n');

let allValid = true;
files.forEach(file => {
    try {
        const content = fs.readFileSync(file, 'utf8');
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
