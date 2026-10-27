const fs = require('fs');
const path = require('path');

const BT = '`';

function sanitize(dir) {
  const files = fs.readdirSync(dir, { recursive: true, withFileTypes: true });
  for (const f of files) {
    if (f.isFile() && f.name === 'README.md') {
      const full = path.join(f.parentPath || f.path, f.name);
      let content = fs.readFileSync(full, 'utf8');
      let changed = false;
      if (content.includes('<LE>')) {
        content = content.replace(/<LE>/g, `${BT}<LE>${BT}`);
        changed = true;
      }
      if (content.includes('<CONFIG>')) {
        content = content.replace(/<CONFIG>/g, `${BT}<CONFIG>${BT}`);
        changed = true;
      }
      if (content.includes('<IP_NUMBER>')) {
        content = content.replace(/<IP_NUMBER>/g, `${BT}<IP_NUMBER>${BT}`);
        changed = true;
      }
      if (content.includes('<PORT>')) {
        content = content.replace(/<PORT>/g, `${BT}<PORT>${BT}`);
        changed = true;
      }
      if (content.includes('<INDX>')) {
        content = content.replace(/<INDX>/g, `${BT}<INDX>${BT}`);
        changed = true;
      }
      if (changed) {
        fs.writeFileSync(full, content, 'utf8');
        console.log('Sanitized:', full);
      }
    }
  }
}

sanitize('C:/Projects/01_Robotics/kuka-krl-extension-public/docs/public/media');
sanitize('C:/Projects/01_Robotics/kuka-krl-extension-public/public/media');
