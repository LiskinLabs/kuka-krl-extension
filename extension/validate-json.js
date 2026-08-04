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

// Check icons in package.json against VS Code Codicons list
const validCodicons = new Set([
    'account','activate-breakpoints','add','archive','arrow-both','arrow-down','arrow-left','arrow-right',
    'arrow-small-down','arrow-small-left','arrow-small-right','arrow-small-up','arrow-up','azure',
    'beaker','bell','bell-dot','bold','book','bookmark','briefcase','broadcast','browser','bug',
    'calendar','calculator','case-sensitive','check','check-all','checklist','chevron-down','chevron-left',
    'chevron-right','chevron-up','circle-filled','circle-outline','clear-all','clippy','close',
    'code','comment','comment-discussion','compass','copy','database','debug-continue','debug-disconnect',
    'debug-pause','debug-restart','debug-start','debug-step-into','debug-step-out','debug-step-over',
    'debug-stop','diff','edit','ellipsis','empty-window','error','eye','eye-closed','file','file-binary',
    'file-code','file-directory','file-media','file-pdf','file-submodule','file-symlink-directory',
    'file-symlink-file','file-text','file-zip','filter','flame','fold','fold-down','fold-up','folder',
    'folder-active','folder-opened','gear','gift','git-branch','git-commit','git-compare','git-merge',
    'git-pull-request','github','globe','go-to-file','grabber','graph','history','home','horizontal-rule',
    'info','issue-reopened','issues','italic','jersey','key','keyboard','law','lightbulb','link',
    'link-external','list-flat','list-ordered','list-selection','list-tree','list-unordered','live-share',
    'loading','location','lock','mail','markdown','mention','milestone','mortar-board','move',
    'multiple-windows','notebook','octoface','organization','output','package','paintcan','pin',
    'play','plug','plus','preserve-case','preview','project','pulse','question','quote','radio-tower',
    'reactions','record','redo','references','refresh','regex','remote','remote-explorer','remove',
    'replace','replace-all','reply','repo','repo-clone','repo-force-push','repo-forked','repo-pull',
    'repo-push','report','request-changes','rocket','root-folder','rss','ruby','save','save-all',
    'save-as','screen-full','screen-normal','search','selection','settings','settings-gear','shield',
    'sign-in','sign-out','smiley','source-control','split-horizontal','split-vertical','squirrel','star',
    'stop','sync','sync-ignored','tag','tasklist','terminal','thumbsdown','thumbsup','tools','trash',
    'triangle-down','triangle-left','triangle-right','triangle-up','undo','unfold','unverified',
    'verified','versions','vm','watch','whitespace','whole-word','widget','dashboard','window','word-wrap','wrench','x','zap',
    'symbol-array','symbol-boolean','symbol-class','symbol-color','symbol-constant','symbol-enum',
    'symbol-enum-member','symbol-event','symbol-field','symbol-file','symbol-interface','symbol-key',
    'symbol-keyword','symbol-method','symbol-misc','symbol-namespace','symbol-numeric','symbol-operator',
    'symbol-parameter','symbol-property','symbol-ruler','symbol-snippet','symbol-string','symbol-structure',
    'symbol-variable'
]);

try {
    const pkgPath = path.join(__dirname, 'package.json');
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    if (pkg.contributes && pkg.contributes.commands) {
        pkg.contributes.commands.forEach(cmd => {
            if (cmd.icon && cmd.icon.startsWith('$(') && cmd.icon.endsWith(')')) {
                const iconName = cmd.icon.slice(2, -1);
                if (!validCodicons.has(iconName)) {
                    console.log(`[FAIL] Command "${cmd.command}" uses invalid Codicon name: "${cmd.icon}"`);
                    allValid = false;
                }
            }
        });
    }
} catch (e) {
    console.log(`[FAIL] Package icon validation error: ${e.message}`);
    allValid = false;
}

console.log('\n=== Summary ===');
console.log(allValid ? 'All files and icons are valid!' : 'Some files or icons have errors!');
process.exit(allValid ? 0 : 1);

