<p align="center">
  <img src="https://raw.githubusercontent.com/LiskinLabs/kuka-krl-extension-core/main/logo.png" width="160" alt="KUKA KRL Professional" />
</p>

<h1 align="center">KUKA KRL Professional</h1>

<p align="center">
  <b>The Definitive Industrial IDE & Safety Suite for KUKA Robot Language.</b><br />
  Engineered for KRC2, KRC4 & KRC5 Controllers (KSS 8.2 – 8.7). Built for Speed, Safety & Zero Downtime.
</p>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension"><img src="https://img.shields.io/visual-studio-marketplace/v/LiskinLabs.kuka-krl-extension?style=for-the-badge&label=Marketplace&color=FF6600" alt="Version" /></a>
  <a href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension"><img src="https://img.shields.io/visual-studio-marketplace/i/LiskinLabs.kuka-krl-extension?style=for-the-badge&logo=visual-studio-code&label=Installs" alt="Installs" /></a>
  <a href="https://secure.software/vscode/packages/liskinlabs/kuka-krl-extension"><img src="https://img.shields.io/badge/Spectra%20Assure-PASSED%20(100%25)-10b981?style=for-the-badge&logo=shield" alt="ReversingLabs Security Score" /></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Language-KRL-orange?style=flat-square" />
  <img src="https://img.shields.io/badge/Compatible%20with-VS%20Code%20%7C%20Cursor%20%7C%20Antigravity-007ACC?style=flat-square" />
  <img src="https://img.shields.io/badge/Offline--First-100%25%20Factory%20Ready-green?style=flat-square" />
  <img src="https://img.shields.io/badge/Security-0%20Malware%20%7C%200%20CVEs-emerald?style=flat-square" />
  <img src="https://img.shields.io/badge/Localization-EN%20%7C%20RU%20%7C%20TR-blue?style=flat-square" />
</p>

<p align="center">
  <a href="https://liskinlabs.github.io/kuka-krl-extension/"><b>🌐 Interactive Wiki (26 Tools)</b></a> •
  <a href="https://liskinlabs.lemonsqueezy.com/checkout/buy/ab34799e-42d7-49b0-ad33-94b2d4fe0a7d"><b>⚡ 14-Day Free Trial ($3.99/mo)</b></a> •
  <a href="https://liskinlabs.lemonsqueezy.com/checkout/buy/886efdd8-90cc-4afd-856d-5d7b076ae9b7"><b>👑 Annual Pro ($39.99/yr - Save 20%)</b></a> •
  <a href="https://secure.software/vscode/packages/liskinlabs/kuka-krl-extension"><b>🛡️ Security Audit Report</b></a>
</p>

---

## ⚡ The $10,000/Hour Production Stop Problem

Every commissioning robotics engineer knows the pain:
1. **The Slow Cycle**: Editing files directly on the SmartPAD teach pendant or wrestling with slow WorkVisual deployments.
2. **The Hidden Collision Risk**: A single missing `$TOOL` or `$BASE` assignment, an unverified point coordinate shift, or an accidental Cartesian `$VEL.CP` overshoot that causes a mechanical crash during the first automatic test run.
3. **The Unverified Changes**: Teammates touch up points on the robot pendant during the night shift with zero version control.

**KUKA KRL Professional** transforms your editor into a high-octane **industrial robotics command center**. It catches syntax errors, kinematic faults, missing block balances, and coordinate mismatches **BEFORE** code ever touches the physical robot controller.

> **💡 The ROI Guarantee:** Catching a single syntax crash or mechanical collision before running code on the shop floor pays for a lifetime of Pro licenses in the first 5 minutes.

---

## 🚀 Key Professional Features

### 1. 🗺️ Interactive Flowchart & Control Flow Graph
*Stop tracing nested logic by hand.* Turn massive, complex `.src` programs into clean, interactive, clickable control-flow diagrams.
* **Bi-directional Code Jumping**: Click any flowchart block to instantly jump to the exact line of code.
* **Subroutine Drill-Down**: Click subprogram calls (e.g. `PickPart()`, `WeldSeam()`) to load and inspect their flowcharts.
* **Signals & Timers**: Visual color-coded status badges for I/O signals, flags, and timers.
* **SVG Vector Export**: Export high-resolution vector diagrams for client handovers and automation documentation.

<p align="center">
  <img src="https://raw.githubusercontent.com/LiskinLabs/kuka-krl-extension-core/main/extension/media/control_flow_graph.gif" width="720" alt="Interactive Flowchart Demo" />
</p>

---

### 2. 🛡️ Industrial Safety & Deep Logic Analyzer
*Eliminate syntax crashes, deadlocks, and mechanical collision risks before touching the controller.*
* **Strict Block Balance**: Flags orphaned `IF / ENDIF`, `FOR / ENDFOR`, and `LOOP / ENDLOOP` blocks before KRC compilation.
* **Tool/Base Guard**: Warns if motion commands (`PTP`, `LIN`, `CIRC`) execute without active `$TOOL` or `$BASE` initialization.
* **Velocity Inspector**: Alerts when Cartesian speed `$VEL.CP` exceeds safe commissioning limits (> 2.0 m/s).
* **Deadlock Blocker**: Flags missing timeouts on `WAIT FOR` conditions and infinite loops lacking `EXIT` statements.
* **Cyrillic & Non-ASCII Blocker**: Detects accidental non-ASCII keyboard layout characters that crash older KSS compilers silently.

<p align="center">
  <img src="https://raw.githubusercontent.com/LiskinLabs/kuka-krl-extension-core/main/extension/media/type-validation-demo.gif" width="720" alt="Safety and Diagnostics Demo" />
</p>

---

### 3. 📦 SmartPAD ZIP Backup Diff & Point Delta Math
*Inspect and compare live project code against SmartPAD `.zip` archive backups.*
* **Delta Math**: Calculates exact 6-axis spatial shifts (**ΔX, ΔY, ΔZ, ΔA, ΔB, ΔC**) for `E6POS`, `POS`, and `E6AXIS` points.
* **Zero-Touch Audit**: Instantly detect unverified point touch-ups made on the shop floor before they cause collisions.
* **Side-by-Side Visual Diff**: Color-coded graphical diff viewer built directly into VS Code.

<p align="center">
  <img src="https://raw.githubusercontent.com/LiskinLabs/kuka-krl-extension-core/main/extension/media/krc_backup_diff.gif" width="720" alt="SmartPAD Backup Diff Demo" />
</p>

---

### 4. 📐 3-Point Euler Frame Math & KUKA Control Center
*Direct coordinate system transformation calculator built into your editor.*
* **3-Point Method**: Compute `BASE_DATA` and `TOOL_DATA` origins and Euler rotation angles (A, B, C) from measured calibration points.
* **Direct `.dat` Insertion**: Insert calculated coordinate frames straight into data files with one click.
* **Zero Trigonometry Errors**: Eliminate spreadsheet calculations and manual orientation math on the plant floor.

<p align="center">
  <img src="https://raw.githubusercontent.com/LiskinLabs/kuka-krl-extension-core/main/extension/media/kuka_control_center.gif" width="720" alt="KUKA Control Center Demo" />
</p>

---

### 5. 🔍 Signal Inlay Hints & PLC Comment Mapping
*Understand I/O logic at a glance without flipping through electrical schematics.*
* Reads signal definitions directly from `$config.dat` and `kuka_signals.json`.
* Displays human-readable labels inline next to `$IN[x]`, `$OUT[y]`, `$ANIN[z]`, and `$FLAG[k]`.

<p align="center">
  <img src="https://raw.githubusercontent.com/LiskinLabs/kuka-krl-extension-core/main/extension/media/inlay_hints.gif" width="720" alt="Signal Inlay Hints Demo" />
</p>

---

### 6. ⚡ Automated Code Formatter & Matrix Alignment
*Turn messy handwritten code into clean, standardized industrial code in 1 keystroke (`Shift+Alt+F`).*
* Standards-compliant 3-space KUKA indentation.
* Aligns `=` assignment operators in `.dat` files for readable coordinate matrices.
* Case standardization for KRL keywords (`DEF`, `GLOBAL`, `INTERRUPT`, `CONTINUE`).

<p align="center">
  <img src="https://raw.githubusercontent.com/LiskinLabs/kuka-krl-extension-core/main/extension/media/code_formatter.gif" width="720" alt="Code Formatter Demo" />
</p>

---

## 📊 Feature Comparison Matrix (26 Tools)

| Feature | Community (Free) | Pro Industrial | Benefit for Engineers |
|:---|:---:|:---:|:---|
| **KRL Syntax Highlighting** (`.src`, `.dat`, `.sub`, `.kfd`) | ✅ | ✅ | Full AST coloring for all KUKA file formats |
| **Smart Autocomplete** (350+ KSS vars) | ✅ | ✅ | Instant completion for motions, structures & system vars |
| **6 Contrast Themes** (Midnight OLED, WorkVisual, Blueprint) | ✅ | ✅ | Designed for outdoor sunlight & dark plant cells |
| **Signal Inlay Hints & Hover Docs** | ✅ | ✅ | Inline PLC signal labels & parameter signatures |
| **Code Formatter & Matrix Alignment** | ✅ | ✅ | Instant 1-click cleanup (`Shift+Alt+F`) |
| **Trilingual Localization** (EN, RU, TR) | ✅ | ✅ | Full native UI & diagnostic messages |
| **Interactive Flowchart Viewer** (Mermaid SVG) | ❌ | **✅ Pro** | Visual control-flow logic & 2-way code jump |
| **Strict Block Balance Diagnostic** | ❌ | **✅ Pro** | Catches unclosed `IF/LOOP/FOR` blocks |
| **Velocity & Safety Inspector** ($VEL.CP) | ❌ | **✅ Pro** | Prevents dangerous Cartesian overspeeds |
| **Tool / Base Guard** | ❌ | **✅ Pro** | Flags motion before frame initialization |
| **SmartPAD ZIP Backup Diff & Point Delta** | ❌ | **✅ Pro** | Computes exact coordinate deltas (ΔX, ΔY, ΔZ) |
| **3-Point Euler Frame Math Calculator** | ❌ | **✅ Pro** | Calculates `BASE_DATA`/`TOOL_DATA` in editor |
| **EthernetKRL (EKI) XML Suite** | ❌ | **✅ Pro** | Live XML template generator & validator |
| **Dead Code & Scope Checker** | ❌ | **✅ Pro** | Finds unused variables & dead subroutines |
| **Motion Diagrams & Spline Generator** | ❌ | **✅ Pro** | Visualizes spline curves for KSS 8.3+ |
| **100% Offline Factory Access** | ✅ | **✅ Pro** | Zero internet required on shop floor |

---

## 👑 Upgrade to Pro: Pricing & Instant Licensing

We offer flexible, industrial-grade licensing through our verified merchant of record, **Lemon Squeezy**. All transactions are encrypted and support Credit Cards, Apple Pay, Google Pay, and PayPal across 135+ countries with automatic VAT/tax invoices.

### 💳 Plans:

| Plan | Price | Trial / Discount | License Terms | Checkout |
|:---|:---:|:---:|:---|:---:|
| 🟢 **Community** | **$0** | 100% Free Forever | Personal & Commercial Use | [Install Free](https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension) |
| ⏱️ **Pro Monthly** | **$3.99** / mo | **14-Day Free Trial** | All 26 Pro Tools • Up to 3 PCs | [Start 14-Day Trial](https://liskinlabs.lemonsqueezy.com/checkout/buy/ab34799e-42d7-49b0-ad33-94b2d4fe0a7d) |
| 👑 **Pro Annual** | **$39.99** / yr | **Save 20%** | Priority Updates & Support • 3 PCs | [Get Annual Pro](https://liskinlabs.lemonsqueezy.com/checkout/buy/886efdd8-90cc-4afd-856d-5d7b076ae9b7) |

<div align="center" style="margin: 25px 0;">
  <a href="https://liskinlabs.lemonsqueezy.com/checkout/buy/ab34799e-42d7-49b0-ad33-94b2d4fe0a7d" style="text-decoration:none;">
    <kbd style="font-size: 1.25em; padding: 12px 28px; background-color: #FF6600; color: white; border-radius: 10px; font-weight: bold; border: 1px solid #d15500; cursor: pointer; box-shadow: 0 4px 15px rgba(255,102,0,0.35);">
      ⚡ Start 14-Day Free Trial ($3.99/mo)
    </kbd>
  </a>
  &nbsp;&nbsp;
  <a href="https://liskinlabs.lemonsqueezy.com/checkout/buy/886efdd8-90cc-4afd-856d-5d7b076ae9b7" style="text-decoration:none;">
    <kbd style="font-size: 1.25em; padding: 12px 28px; background-color: #161b22; color: #FF6600; border-radius: 10px; font-weight: bold; border: 1px solid #FF6600; cursor: pointer; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
      👑 Get Annual Pro ($39.99/yr - Save 20%)
    </kbd>
  </a>
  <p style="margin-top: 10px; font-size: 0.9em; color: #888;">Instant activation key delivery via <b>Lemon Squeezy</b> • Cancel anytime in 1 click</p>
</div>

---

## 🔒 Offline-First Guarantee (For Factory Floors)

Automation engineers work in interference-heavy environments, underground automotive cells, and plants with **zero internet connectivity**.

Our licensing module is built with an **Offline-First Architecture**:
1. **Activation**: Connect once to activate your license key.
2. **Local OS Keychain**: The verified license state is safely cached on your machine.
3. **Zero Lockouts**: The extension will **never** lock you out if internet drops. All Pro features continue running offline indefinitely.

---

## 🛡️ Enterprise Security Certification

KUKA KRL Professional is certified by **ReversingLabs Spectra Assure** with a **100% Security Health Score**:
* 🟢 **0 Malware** (Clean binary inspection)
* 🟢 **0 CVE Vulnerabilities** in all dependencies
* 🟢 **0 Secret / Token Leaks**
* 🟢 **0 MITRE ATT&CK Indicators**

Official Security Audit: [https://secure.software/vscode/packages/liskinlabs/kuka-krl-extension](https://secure.software/vscode/packages/liskinlabs/kuka-krl-extension)

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action | Scope |
|:---|:---|:---|
| `Shift + Alt + F` | Format Document (KRL 3-space indentation & matrix align) | Active Editor |
| `Ctrl + Alt + F` | Open Interactive Flowchart / Control Flow Graph | `.src` File |
| `Ctrl + Alt + D` | Run Industrial Safety & Diagnostic Inspection | Workspace |
| `Ctrl + Alt + B` | Open SmartPAD Backup Diff & Point Delta Inspector | Active Project |
| `Ctrl + Alt + K` | Launch KUKA Control Center & 3-Point Frame Math | Active Editor |
| `Ctrl + Space` | Trigger Smart KSS System Autocomplete | Cursor Position |

---

## ⚙️ Configuration Settings

Configure extension behaviors in your `settings.json`:

| Setting | Default | Description |
|:---|:---:|:---|
| `krl.indentWidth` | `3` | Indentation size (3 spaces is the official KUKA standard). |
| `krl.alignAssignments` | `true` | Auto-align `=` symbols in `.dat` files for clean matrices. |
| `krl.errorLens.enabled` | `true` | Show diagnostic errors inline at the end of lines. |
| `krl.validateNonAscii` | `true` | Scan for Cyrillic/non-ASCII characters that break older KSS compilers. |
| `krl.inlayHints.enabled` | `true` | Show descriptive names for I/O signals inline. |

---

## 🌐 Trilingual Documentation & Wiki

* 📖 **English Documentation**: [https://liskinlabs.github.io/kuka-krl-extension/](https://liskinlabs.github.io/kuka-krl-extension/)
* 🇷🇺 **Русская документация и Вики**: [https://liskinlabs.github.io/kuka-krl-extension/ru/](https://liskinlabs.github.io/kuka-krl-extension/ru/)
* 🇹🇷 **Türkçe Dokümantasyon ve Wiki**: [https://liskinlabs.github.io/kuka-krl-extension/tr/](https://liskinlabs.github.io/kuka-krl-extension/tr/)

---

## 📄 License & Credits

* **Publisher & Developer**: [Liskin Labs](https://github.com/LiskinLabs) / [Silvestr Liskin](https://www.linkedin.com/in/silvestr-liskin-ab712920b/)
* **Security Auditor**: [ReversingLabs Spectra Assure](https://secure.software/vscode/packages/liskinlabs/kuka-krl-extension)
* **Official Merchant of Record**: [Lemon Squeezy](https://liskinlabs.lemonsqueezy.com/)
