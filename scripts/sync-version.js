#!/usr/bin/env node
/**
 * Liskin Labs | Version Synchronization Script
 * Automatically propagates target version across all READMEs, localized guides,
 * VitePress documentation, and installation links.
 *
 * Usage:
 *   node scripts/sync-version.js [version]
 *   Example: node scripts/sync-version.js 1.9.8
 */

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..');

// 1. Determine target version
let targetVersion = process.argv[2];
if (!targetVersion) {
  // Check if docs/package.json or extension/package.json exists
  const candidatePkg = path.join(repoRoot, 'package.json');
  if (fs.existsSync(candidatePkg)) {
    try {
      targetVersion = JSON.parse(fs.readFileSync(candidatePkg, 'utf8')).version;
    } catch (e) {}
  }
}

if (!targetVersion) {
  // Try to extract from latest changelog header
  const changelogPath = path.join(repoRoot, 'CHANGELOG.md');
  if (fs.existsSync(changelogPath)) {
    const content = fs.readFileSync(changelogPath, 'utf8');
    const match = content.match(/##\s*\[(\d+\.\d+\.\d+)\]/);
    if (match) {
      targetVersion = match[1];
    }
  }
}

if (!targetVersion) {
  console.error('[!] Target version could not be determined. Please pass it as an argument:');
  console.error('    node scripts/sync-version.js <version> (e.g. 1.9.8)');
  process.exit(1);
}

console.log(`[*] Synchronizing project version to: v${targetVersion}\n`);

let updatedCount = 0;

function updateFile(filePath, transforms) {
  if (!fs.existsSync(filePath)) return;
  const original = fs.readFileSync(filePath, 'utf8');
  let updated = original;

  for (const { pattern, replacement } of transforms) {
    updated = updated.replace(pattern, replacement);
  }

  if (updated !== original) {
    fs.writeFileSync(filePath, updated, 'utf8');
    console.log(`  [OK] Updated: ${path.relative(repoRoot, filePath)}`);
    updatedCount++;
  }
}

// 2. Update README files (Release badges and VSIX links)
const readmeFiles = [
  'README.md',
  'README.ru.md',
  'README.de.md',
  'README.es.md',
  'README.it.md',
  'README.tr.md'
];

readmeFiles.forEach((file) => {
  const filePath = path.join(repoRoot, file);
  updateFile(filePath, [
    {
      pattern: /badge\/Release-v\d+\.\d+\.\d+-FF6600/g,
      replacement: `badge/Release-v${targetVersion}-FF6600`
    },
    {
      pattern: /alt="Release v\d+\.\d+\.\d+"/g,
      replacement: `alt="Release v${targetVersion}"`
    },
    {
      pattern: /kuka-krl-extension-\d+\.\d+\.\d+\.vsix/g,
      replacement: `kuka-krl-extension-${targetVersion}.vsix`
    }
  ]);
});

// 3. Update all localized installation guides in docs/
const locales = ['', 'ru', 'de', 'es', 'it', 'tr'];
locales.forEach((loc) => {
  const guidePath = loc
    ? path.join(repoRoot, 'docs', loc, 'guide', 'installation.md')
    : path.join(repoRoot, 'docs', 'guide', 'installation.md');

  updateFile(guidePath, [
    {
      pattern: /kuka-krl-extension-\d+\.\d+\.\d+\.vsix/g,
      replacement: `kuka-krl-extension-${targetVersion}.vsix`
    }
  ]);
});

// 4. Update docs/.vitepress/config.mts if suite version is referenced
const configMtsPath = path.join(repoRoot, 'docs', '.vitepress', 'config.mts');
if (fs.existsSync(configMtsPath)) {
  updateFile(configMtsPath, [
    {
      pattern: /v\d+\.\d+\.\d+\s+Engineering\s+Suites/g,
      replacement: `v${targetVersion} Engineering Suites`
    },
    {
      pattern: /v\d+\.\d+\.\d+\s+Mühendislik\s+Paketleri/g,
      replacement: `v${targetVersion} Mühendislik Paketleri`
    },
    {
      pattern: /Инженерные\s+комплексы\s+v\d+\.\d+\.\d+/g,
      replacement: `Инженерные комплексы v${targetVersion}`
    },
    {
      pattern: /v\d+\.\d+\.\d+\s+Suites\s+de\s+Ingeniería/g,
      replacement: `v${targetVersion} Suites de Ingeniería`
    },
    {
      pattern: /v\d+\.\d+\.\d+\s+Suite\s+Ingegneristiche/g,
      replacement: `v${targetVersion} Suite Ingegneristiche`
    }
  ]);
}

const featuresWikiPath = path.join(repoRoot, 'docs', '.vitepress', 'theme', 'components', 'FeaturesWiki.vue');
if (fs.existsSync(featuresWikiPath)) {
  updateFile(featuresWikiPath, [
    {
      pattern: /v\d+\.\d+\.\d+(?=\s+(?:Industrial Suite|Endüstriyel Paket))/g,
      replacement: `v${targetVersion}`
    },
    {
      pattern: /\(v\d+\.\d+\.\d+\)(?=\s*$)/gm,
      replacement: `(v${targetVersion})`
    }
  ]);
}

const vsCodeSimPath = path.join(repoRoot, 'docs', '.vitepress', 'theme', 'components', 'VsCodeWebSimulator.vue');
if (fs.existsSync(vsCodeSimPath)) {
  updateFile(vsCodeSimPath, [
    {
      pattern: /KRL Engineering Toolkit Language Server v\d+\.\d+\.\d+/g,
      replacement: `KRL Engineering Toolkit Language Server v${targetVersion}`
    }
  ]);
}

const landingPagePath = path.join(repoRoot, 'docs', '.vitepress', 'theme', 'components', 'LandingPage.vue');
if (fs.existsSync(landingPagePath)) {
  updateFile(landingPagePath, [
    {
      pattern: /KRL ENGINEERING TOOLKIT v\d+\.\d+\.\d+/g,
      replacement: `KRL ENGINEERING TOOLKIT v${targetVersion}`
    },
    {
      pattern: /KRL Engineering Toolkit v\d+\.\d+\.\d+/g,
      replacement: `KRL Engineering Toolkit v${targetVersion}`
    },
    {
      pattern: /KRL Engineering Toolkit IDE v\d+\.\d+\.\d+ Suite/g,
      replacement: `KRL Engineering Toolkit IDE v${targetVersion} Suite`
    }
  ]);
}

const inventoryJsonPath = path.join(repoRoot, 'docs', '.vitepress', 'theme', 'components', 'krl_tools_inventory.json');
if (fs.existsSync(inventoryJsonPath)) {
  updateFile(inventoryJsonPath, [
    {
      pattern: /"version":\s*"\d+\.\d+\.\d+"/,
      replacement: `"version": "${targetVersion}"`
    }
  ]);
}

console.log(`\n[✓] Version synchronization complete. Total files modified: ${updatedCount}`);
