# KUKA KRL VS Code Extension — Project Memory & DevSecOps Architecture

## 📌 Project Overview
- **Repository:** `LiskinLabs/kuka-krl-extension` / `LiskinLabs/kuka-krl-extension-core`
- **Current Version:** `1.7.5`
- **Language / Environment:** TypeScript (Node.js 20+), VS Code Extension API (`@vscode/vsce`), Cloudflare Workers (Backend Gateway).
- **Core Purpose:** Enterprise-grade IDE extension for KUKA KRL (KSS 8.3–8.7), supporting syntax highlighting, AST parsing, symbol navigation, diagnostics, offline programming, Flowcharts, Wonderlib, and remote assistance.

---

## 🛡️ DevSecOps & CI/CD Pipeline Standard (All-Green Guarantee)

All CI/CD workflows are configured and verified with **100% Green Status (`completed success`)**:

| Workflow | File | Triggers | Functions & Checks |
| :--- | :--- | :--- | :--- |
| **CI Verification** | `.github/workflows/ci.yml` | `push`, `pull_request` | • TypeScript compilation (`tsc --noEmit`)<br>• ESLint & code style<br>• 46 Unit tests + 36 E2E tests + 11 LSP tests + 47 Industrial Backup tests (100% PASS, 140/140 Total)<br>• VSIX packaging and obfuscation check |
| **Dependency Security Audit** | `.github/workflows/dependency-review.yml` | `push`, `pull_request`, weekly cron | • `npm audit` for dependencies vulnerabilities (CVEs)<br>• Supply Chain risk prevention |
| **CodeQL Advanced SAST** | `.github/workflows/codeql.yml` | `push`, `pull_request`, weekly cron | • Deep static analysis for JavaScript & TypeScript<br>• Detects injections, ReDoS, prototype pollution, data flow vulnerabilities<br>• Persists SARIF reports to build artifacts (`codeql-security-report`) |
| **Security & Spectra Assure** | `.github/workflows/security.yml` | `push`, `pull_request`, weekly cron | • ReversingLabs Spectra Assure Scanner (`rl-protect`) pinned to full commit SHAs<br>• Package manifest risk and binary malware validation<br>• Zero CVEs / Zero Malware / Zero Secrets Leakage<br>• Saves security reports to `reports/` |
| **Release & Publish VSIX** | `.github/workflows/release.yml` | `tags: v*`, manual dispatch | • Full test matrix execution (80 tests)<br>• Automated production VSIX packaging<br>• Creates official GitHub Release with changelog and downloadable binary |

---

## 🏛️ Core Industrial Feature Modules
1. **Modern KRL & iiQKA Fold Suite (`foldTools.ts`):**
   - 1-Click wrap selection into iiQKA Folds.
   - Convert legacy motions into optimized `SPLINE` blocks for KSS 8.3–8.7.
   - Inject `$TORQMON` Collision Guard frames around trajectory segments.
   - Safely clean & unwrap obsolete Inline Forms without modifying internal motion instructions.
2. **KRC Backup Diff & Coordinate Delta Math (`krcBackupDiff.ts`):**
   - Fast ZIP/TAR inspection of SmartPAD archive backups.
   - 6-axis spatial coordinate delta math ($\Delta X, \Delta Y, \Delta Z, \Delta A, \Delta B, \Delta C$) in millimeters and degrees.
   - Hardened with Zip Bomb and Path Traversal protections.
3. **Live Helpdesk Gateway & Remote Telepresence (`telegramChatPanel.ts`, `telegramService.ts`, `worker.js`):**
   - Two-way technical assistance chat with forum-topic isolation.
   - Smart Diff & Apply for instant one-click code remediation.
   - Remote Project Quality Passport generation (`/report`) sent directly to chat as markdown and summary.
   - Full project ZIP export with chunking (>45MB split) without skipping `.git` or `node_modules`.
   - Secure diagnostic commands (`/report`, `/ai_diag`, `/backup_zip`, `/logs`, `/sysinfo`, `/ping`).
4. **KUKA Control Center & Commands Architecture (`controlCenter.ts`, `commandsTreeView.ts`):**
   - Clean separation between Global Standalone Tools (Calculator, Snippet Generator, EKI Validator, Telegram Chat, Quality Report, Export ZIP, Backup Diff, GitGraph, Clean Git) and In-Editor Contextual Commands.
   - High-density In-Editor Reference Guide at the bottom of Control Center with keyboard shortcuts (`F12`, `Shift+F12`, `F2`, `Shift+Alt+F`, `Ctrl+Shift+[ / ]`).
   - Categorized and expanded KUKA Commands sidebar tree view for 1-click access to every single feature.
5. **Dodo Payments Merchant of Record Integration (`license.ts`, `worker.js`):**
   - Plans: Community ($0), Pro Monthly ($9.99/mo with 14-day trial), Pro Annual ($79.00/yr), Pro Lifetime ($349.00).
   - SecretStorage encryption, HMAC signature verification, 30-day offline buffer, 14-day grace period.

---

## 🔐 Zero-Token & Secrets Isolation Architecture
1. **Plaintext Secrets Policy:**
   - Plaintext tokens (e.g. `BOT_TOKEN`, `ADMIN_CHAT_ID`, private keys, API secrets) are **NEVER** committed to Git or hardcoded in source files (`wrangler.toml`, `.ts`, `.js`, `.py`).
2. **Local Development:**
   - Emulated using `.dev.vars` (Cloudflare Workers) and `.env.local` files, strictly ignored in root `.gitignore`.
3. **Cloud & Production:**
   - Injected via Cloudflare Worker Secrets (`wrangler secret put BOT_TOKEN`) and GitHub Repository Secrets (`RL_TOKEN`, `RLPORTAL_ACCESS_TOKEN`, `RL_PORTAL_ORG`, `RL_PORTAL_GROUP`).
4. **Session Privacy:**
   - Telemetry strictly opt-in (`isChatOpen === true`).
   - Session IDs generated using cryptographically random 16-hex bytes (`crypto.randomBytes(8).toString('hex')`).
   - Remote actions protected by strict command allowlists.

---
*Updated: 2026-09-03 | Antigravity Engine v2.0 | Liskin Labs Industrial Pro v8.0*
