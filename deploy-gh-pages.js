const { execSync } = require('child_process');
const fs = require('fs');

const cwd = 'C:/Projects/01_Robotics/kuka-krl-extension-public';

try {
  execSync('git checkout -B gh-pages', { cwd });
  execSync('git rm -rf .', { cwd });
  
  const publicDir = 'C:/Projects/01_Robotics/kuka-krl-extension/public';
  const files = fs.readdirSync(publicDir);
  files.forEach(f => {
    fs.cpSync(publicDir + '/' + f, cwd + '/' + f, { recursive: true });
  });

  fs.writeFileSync(cwd + '/.nojekyll', '');

  execSync('git add -A', { cwd });
  execSync('git commit -m "deploy: site build for GitHub Pages"', { cwd });
  execSync('git push -f origin gh-pages', { cwd });
  execSync('git checkout main', { cwd });
  console.log('SUCCESSFULLY_PUSHED_GH_PAGES');
} catch (e) {
  console.error('Error:', e);
  try { execSync('git checkout main', { cwd }); } catch (_) {}
}
