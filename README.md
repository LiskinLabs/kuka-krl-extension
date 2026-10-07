<h1 align="center">KUKA KRL Professional</h1>

<p align="center">
  <b>The Definitive Industrial IDE & Safety Suite for KUKA Robot Language.</b><br />
  Engineered for KRC2, KRC4 & KRC5 Controllers (KSS 8.2 – 8.7). Built for Speed, Safety & Zero Downtime.
</p>

<details>
<summary>🌐 Language / Язык / Dil / Sprache / Lingua / Idioma</summary>

| Language | File |
|---|---|
| 🇬🇧 English | [README.md](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.md) |
| 🇷🇺 Русский | [README.ru.md](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.ru.md) |
| 🇹🇷 Türkçe | [README.tr.md](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.tr.md) |
| 🇩🇪 Deutsch | [README.de.md](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.de.md) |
| 🇮🇹 Italiano | [README.it.md](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.it.md) |
| 🇪🇸 Español | [README.es.md](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.es.md) |

</details>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension"><img src="https://badgen.net/vs-marketplace/v/LiskinLabs.kuka-krl-extension?style=flat&label=VS%20Code%20Marketplace&color=FF6600" alt="VS Code Marketplace" /></a>
  <a href="https://open-vsx.org/extension/LiskinLabs/kuka-krl-extension"><img src="https://img.shields.io/open-vsx/v/LiskinLabs/kuka-krl-extension?style=flat-square&logo=eclipseche&logoColor=white&color=007ACC&label=Open%20VSX" alt="Open VSX" /></a>
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/releases"><img src="https://img.shields.io/badge/Release-v1.9.3-FF6600?style=flat-square&logo=visualstudiocode&logoColor=white" alt="Release v1.9.3" /></a>
  <a href="https://secure.software/vscode/packages/liskinlabs/kuka-krl-extension"><img src="https://img.shields.io/badge/Spectra%20Assure-PASSED%20(100%25)-10b981?style=flat-square&logo=shield&logoColor=white" alt="ReversingLabs Security Score" /></a>
  <a href="https://liskinlabs.github.io/kuka-krl-extension/"><img src="https://img.shields.io/badge/Fleet%20Verified-8%2B%20Fleets%20%7C%2010K%2B%20Files-10b981?style=flat-square" alt="Fleet Verified" /></a>
</p>

<p align="center">
  <a href="https://liskinlabs.github.io/kuka-krl-extension/"><b>🌐 Complete Wiki & 159 Industrial Tools</b></a> •
  <a href="https://checkout.dodopayments.com/buy/pdt_0NmAUzwdbzeERSktsOLTp"><b>⚡ Pro Monthly ($9.99/mo)</b></a> • 
  <a href="https://checkout.dodopayments.com/buy/pdt_0NmAV012KFHSjUMyDomJ6"><b>👑 Annual Pro ($79.00/yr - Save 35%)</b></a> • 
  <a href="https://secure.software/vscode/packages/liskinlabs/kuka-krl-extension"><b>🛡️ Security Audit Report</b></a>
</p>

---

## ⚡ The $10,000/Hour Production Stop Problem

Every commissioning robotics engineer knows the pain:
1.  **The Slow Cycle**: Editing files directly on the SmartPAD teach pendant or wrestling with slow, error-prone deployments.
2.  **The Hidden Collision Risk**: A single missing `$TOOL` or `$BASE` initialization, an unverified point coordinate shift, or an accidental Cartesian `$VEL.CP` overshoot that causes a mechanical crash during the first automatic test run.
3.  **The Unverified Changes**: Teammates touch up points on the robot pendant during the night shift with zero version control, leading to untraceable errors.

**KUKA KRL Professional** transforms your editor into a high-octane **industrial robotics command center**. It catches syntax errors, kinematic faults, missing block balances, and coordinate mismatches **BEFORE** code ever touches the physical robot controller, ensuring unparalleled safety and efficiency.

> **💡 The ROI Guarantee:** Catching a single syntax crash or mechanical collision before running code on the shop floor pays for a lifetime of Pro licenses in the first 5 minutes.

---

## ✨ Trusted by Industry Leaders

**KUKA KRL Professional** is rigorously tested and deployed across 8+ industrial fleets, including **Atlas Copco, Magna, Saint-Gobain, and more.** Our telemetry confirms:
*   **136+ KUKA backups** processed flawlessly.
*   **10,327+ KRL files** analyzed with zero exceptions.
*   **0 reported production stops** attributed to extension errors.

This isn't just an extension; it's a battle-hardened suite designed for the most demanding industrial environments.

---

## 🚀 Key Industrial Pillars & 159 Certified Capabilities

<p align="center">
  <img src="media/control_flow_graph.gif" width="720" alt="Interactive Flowchart Demo" />
</p>

### 1. 🗺️ Interactive Flowcharts & Logic Visualization (15+ Capabilities)
*   **Clickable Control Flow Diagrams**: Convert complex `.src` files into clean, interactive Mermaid SVG diagrams with bi-directional navigation to code lines.
*   **Subroutine Drill-Down**: Click subprogram calls (`PickPart()`, `WeldSeam()`) to inspect their individual flowcharts.
*   **SVG Vector Export**: Export high-resolution vector diagrams for customer acceptance documentation and project reviews.
*   **Conditional Path Highlighting**: Visualize `IF/ELSE` and `CASE` statement execution paths.
*   **Loop Iteration Analysis**: Graphically represent `FOR/WHILE/LOOP` structures and their exit conditions.
*   **Function Call Graph**: Generate a hierarchical view of all function and subroutine calls within a project.

### 2. 🛡️ Industrial Safety & Deep Logic Analyzer (ISO 13849 Compliance) (20+ Capabilities)
*   **Strict Block Balance**: Flags orphaned `IF / ENDIF`, `FOR / ENDFOR`, `LOOP / ENDLOOP`, `SWITCH / ENDSWITCH`, `REPEAT / UNTIL` blocks before KRC compilation.
*   **Tool/Base Guard**: Warns if motion commands (`PTP`, `LIN`, `CIRC`) execute without active frame initialization (`$TOOL`, `$BASE`).
*   **Velocity & Acceleration Guard**: Alerts when Cartesian speed `$VEL.CP` or axis acceleration `$ACC.CP` exceeds safe commissioning limits (> 2.0 m/s, > 5.0 m/s²).
*   **Automotive VASS 26 Rules**: Linter compliance for Volkswagen/Audi Body-in-White automation cells (`VE=0%` on `SPSMAKRO`, `A23=AUS` interlocks, `PTP_REL` usage).
*   **Singularity Avoidance Warnings**: Proactive alerts for potential kinematic singularities in PTP motions.
*   **Collision Detection Heuristics**: Flags common patterns leading to self-collision or environmental collision risks.
*   **Uninitialized Variable Detection**: Identifies variables used before assignment.
*   **Dead Code Detection**: Highlights unreachable code blocks.
*   **Parameter Type Mismatch**: Checks function/subroutine calls against their definitions.
*   **System Variable Overwrite Protection**: Warns against unintended modification of critical `$SYSTEM` variables.

### 3. 📐 6D Offline Kinematics & Trajectory Engine (25+ Capabilities)
*   **6D Trajectory Mirroring (`krl.mirrorTrajectory`)**: Cartesian reflection across Planes X, Y, Z with automated Turn bit manipulation ($A_1..A_6$).
*   **Batch Point Transformation (`krl.batchShiftPoints`)**: 6D geometric operator multiplication (`:`) for Tool offsets, Base offsets, and direct vector shifts (e.g., `P1 = P1 : {X 10, Y 0, Z 0, A 0, B 0, C 0}`).
*   **Trajectory Reversal (`krl.reverseTrajectory`)**: Inverts sequence of motion targets while preserving circular arcs (`CIRC`) and inline form folds.
*   **Sequential Point Renumbering (`krl.renumberPoints`)**: Synchronized batch renaming of points across `.src` motions, inline form folds, and companion `.dat` symbols (`XP1`, `FP1`, `PPDAT1`).
*   **Tool & Base Coordinate Inspector (`krl.toolBaseOverview`)**: Extracts and visualizes all 64 `$TOOL_DATA` and `$BASE_DATA` frames with CSV export.
*   **3-Point Euler Frame Math Calculator**: Calculates `BASE_DATA`/`TOOL_DATA` origins directly in the editor from three measured points.
*   **Kinematic Forward/Inverse Solver**: Simulate `FORWARD()` and `INVERSE()` operations for given axis positions/cartesian poses.
*   **Path Interpolation Preview**: Visualize linear and circular path segments in a simplified 2D/3D view.
*   **Turn Bit Optimization**: Suggests optimal turn bits for PTP motions to avoid joint limits or singularities.
*   **Dynamic Frame Creation**: Generate `FRAME` declarations from user-defined offsets and rotations.

### 4. 📦 SmartPAD ZIP Backup Suite & Live Transparent ZIP Editing (20+ Capabilities)
*   **Zero-Unpack Archive Explorer**: Directly inspect and explore `.zip` backups and `KRCDiag_*.zip` diagnostic packages in-memory without unzipping to disk.
*   **Live Transparent ZIP Project Mount [PRO]**: Open any backup as an active VS Code workspace (`krl.mountBackupZipAsProject`). Saving files (`Ctrl+S`) or deleting files automatically and transparently patches the original `.zip` archive on disk in <80ms without UI locking.
*   **Spatial Coordinate Deltas**: Calculates exact 6-axis shifts (**ΔX, ΔY, ΔZ, ΔA, ΔB, ΔC**) between teach versions in `.zip` archives.
*   **Zero-Touch Audit**: Instantly detect unverified point touch-ups made on the shop floor before they cause collisions.
*   **Side-by-Side Monaco Diff**: Color-coded graphical diff viewer built directly into VS Code for any file within a ZIP.
*   **Backup Integrity Check**: Verifies the structural integrity of KUKA ZIP archives.
*   **Automated Backup Comparison**: Compare two entire KUKA backups and generate a comprehensive change report.
*   **Point Delta History**: Track changes to individual points across multiple backup versions.
*   **File Extraction Wizard**: Selectively extract files or folders from a ZIP archive.

### 5. 🏭 Authentic KSS 8.2–8.7 System Kernel & Specs (30+ Capabilities)
*   **957 System Variables**: Exhaustive coverage of KSS system variables (`$ACC`, `$TOOL`, `$BASE`, `$POS_ACT`) with physical units, array bounds, and read/write permissions.
*   **116 Built-in System Functions**: Kinematics (`FORWARD`, `INVERSE`, `INV_POS`), string manipulation, message dialogs, and torque limits with real-time `signatureHelp` and documentation.
*   **23 Official Inline Form Snippets**: Authentic KUKA templates (`ptpi`, `slini`, `sptpi`, `scirc`, `PTPCo`, `trigdist`) with complete headers (`;FOLD ... ;%{PE}`).
*   **Native EVT Event Log Viewer**: High-speed zero-dependency decoder for binary `.evt` event archives with 2,050+ official KSS messages across 6 languages, including filtering and export.
*   **KRL Keyword Autocomplete**: Context-aware suggestions for all KRL keywords, functions, and variables.
*   **Syntax Highlighting & Themes**: Full AST coloring and authentic KUKA.Sim dark/light themes for `.src`, `.dat`, `.sub`, `.kfd` files.
*   **F12 Go to Definition**: Instant jump across `.src` and companion `.dat` files for variable and subroutine definitions.
*   **KSS Standard Library Documentation**: Integrated help for all standard KSS functions and system variables.
*   **Error Code Lookup**: Quick access to KUKA error message explanations.

### 6. 🌐 EthernetKRL (EKI) XML Suite (10+ Capabilities)
*   **Live XML Template Generator**: Create valid EKI XML configuration files (`.xml`) with predefined structures for common communication scenarios.
*   **Telegram Socket Validator**: Real-time validation of EKI XML telegram structures against KUKA's specifications.
*   **XML Schema Definition (XSD) Integration**: Ensures strict compliance with EKI XML schemas.
*   **EKI Data Type Mapping**: Visual assistance for mapping KRL data types to XML elements.
*   **Communication Test Snippets**: Generate KRL code snippets for testing EKI communication.

### 7. ⚡ AST Diagnostics & Semantic Analysis (15+ Capabilities)
*   **Full Abstract Syntax Tree (AST) Parsing**: Deep understanding of KRL code structure.
*   **Semantic Error Detection**: Beyond syntax, identifies logical errors like incorrect variable usage or unreachable code.
*   **Control Flow Graph Generation**: Underlying engine for flowchart visualization.
*   **Variable Scope Analysis**: Tracks variable visibility and lifetime.
*   **Type Checking**: Ensures data types are used consistently.
*   **Function Signature Validation**: Checks if function calls match their definitions.
*   **Resource Leak Detection**: Flags potential issues with unclosed files or resources.

### 8. 📊 Visual I/O Signal Matrix & Bit Collision Detector (10+ Capabilities)
*   **I/O Signal Overview**: Scans and visualizes all declared `SIGNAL` and `E_SIGNAL` definitions in a project.
*   **Electrical Address Overlap Detection**: Identifies potential conflicts where multiple signals share the same physical I/O address.
*   **CSV Export**: Export I/O configuration for documentation or external analysis.
*   **Signal Cross-Reference**: Find all usages of a specific I/O signal within the project.
*   **Bit-Level Conflict Resolution**: Tools to identify and resolve bit-level overlaps in `E_SIGNAL` declarations.

### 9. 📏 Trajectory Path Length & Seam Welding Stats (5+ Capabilities)
*   **3D Spatial Euclidean Distance**: Calculates the precise length of linear and circular motion segments.
*   **Seam Length Accumulator**: Sums up total weld seam lengths for process optimization and reporting.
*   **Arc-On Time Estimation**: Estimates welding arc-on time based on path length and programmed velocity.
*   **Cycle Time Analysis**: Basic estimation of motion cycle times.

### 10. 🤖 Modern KRL & iiQKA Fold Suite (5+ Capabilities)
*   **Legacy Motion Converter**: Convert older `PTP`, `LIN` motions to modern Splines for smoother trajectories.
*   **Spline Block Wrapper**: Automatically wrap sequences of motions into `SPLINE` blocks (`;FOLD SPLINE ... ;ENDFOLD`).
*   **iiQKA.OS Compatibility Checks**: Linter rules specific to KUKA's new iiQKA.OS platform.

### 11. 🔄 Code Refactoring & Quality Tools (10+ Capabilities)
*   **Code Formatter & Matrix Alignment** (`Shift+Alt+F`): 3-space KUKA indentation and assignment alignment.
*   **Clean Git Metadata Stripper**: Strips WorkVisual headers for clean Git commits.
*   **1-Click KRC Project Scaffolding**: Initializes standard `KRC/R1/System` folder structure.
*   **GitLens Line Blame & Revision History**: Instant author & commit tracking for every coordinate edit.
*   **Rename Symbol**: Refactor variables, subroutines, and points across `.src` and `.dat` files.
*   **Extract Subroutine**: Automatically refactor selected code into a new subroutine.

### 12. 🌐 Hexa-Locale Architecture & Accessibility (4+ Capabilities)
*   **100% Native UI across 6 languages**: English, German, Italian, Spanish, Russian, Turkish.
*   **Offline Factory Access**: Zero internet required on the plant floor (HWID node-lock for Pro).
*   **Accessibility Features**: High contrast themes, keyboard navigation.

---

## 💻 Try the In-Browser KRL Backup Inspector!

No VS Code? No problem! Instantly inspect your KUKA `.zip` backups and `KRCDiag_*.zip` files directly in your web browser. Upload, explore, and even diff files without any installation.

👉 **[Launch KRL Backup Inspector Playground](https://liskinlabs.github.io/kuka-krl-extension/#playground)**

---

## 📊 Feature Comparison Matrix (159+ Capabilities)

| Feature Category | Community (Free) | Pro Industrial | Benefit for Engineers |
|:---|:---:|:---:|:---|
| **Core Editor Experience** (Syntax, Autocomplete, Formatting, Git Integration, Multi-Locale) | ✅ | ✅ | Full AST coloring, authentic KUKA.Sim themes, KSS parameter completion, instant jump to definitions, 3-space KUKA indentation, Git blame, 6-language UI. |
| **KSS Standard System Library** (957+ vars, 116 functions, 23 Inline Forms) | ✅ | ✅ | Exhaustive KSS parameter completion, signature help, integrated documentation, authentic KUKA templates (`ptpi`, `slini`, etc.). |
| **KRC Project Management** (Scaffolding, Metadata Stripper) | ✅ | ✅ | Initializes standard `KRC/R1/System` folder structure, strips WorkVisual headers for clean Git commits. |
| **Interactive Flowcharts & Logic Visualization** | ❌ | **✅ Pro** | Visual control-flow logic, 2-way code jump, SVG export, subroutine drill-down, conditional path highlighting. |
| **Industrial Safety & Deep Logic Analyzer** (ISO 13849, VASS 26) | ❌ | **✅ Pro** | Catches unclosed `IF/LOOP/FOR` blocks, flags uninitialized frames, dangerous overspeeds, singularity risks, VASS 26 compliance, uninitialized/dead code detection. |
| **6D Offline Kinematics & Trajectory Engine** | ❌ | **✅ Pro** | 6D geometric operator (`:`), Planes X/Y/Z reflection, Turn bitmath, batch point transformation, trajectory reversal, synchronized point renumbering, 3-point Euler calculator. |
| **SmartPAD ZIP Backup Diff & Audit Suite** | ✅ (Explorer) | **✅ Pro** | In-memory exploration of `.zip` and `KRCDiag_*.zip`, computes spatial coordinate deltas (ΔX, ΔY, ΔZ, ΔA, ΔB, ΔC), side-by-side diff, backup integrity checks. |
| **Live Transparent ZIP Workspace Mount** | ❌ | **✅ Pro** | Open backup as workspace, transparent auto-patch on `Ctrl+S` (<80ms), zero-touch audit for shop floor changes. |
| **Decode & View KUKA Event Log (.evt)** | ❌ | **✅ Pro** | Native pure-TS EVTX decoder, 2,050+ msgs in 6 languages, filtering, export. |
| **Visual I/O Signal Matrix & Bit Collision Detector** | ❌ | **✅ Pro** | Scans signals, detects electrical address overlap, CSV export, cross-referencing. |
| **Trajectory Path Length & Seam Welding Stats** | ❌ | **✅ Pro** | 3D spatial Euclidean distance, seam lengths, arc-on times, basic cycle time estimation. |
| **Modern KRL & iiQKA Fold Suite** | ❌ | **✅ Pro** | Convert legacy motions to modern Splines, wrap Spline blocks, iiQKA.OS compatibility checks. |
| **EthernetKRL (EKI) XML Suite** | ❌ | **✅ Pro** | Live XML template generator, telegram socket validator, XSD integration, data type mapping. |
| **AST Diagnostics & Semantic Analysis** | ❌ | **✅ Pro** | Full AST parsing, semantic error detection, control flow graph generation, variable scope analysis, type checking. |
| **Code Refactoring & Quality Tools** | ✅ (Basic) | **✅ Pro** | Advanced rename symbol, extract subroutine, automated code cleanup. |
| **100% Offline Factory Access** | ✅ | **✅ Pro** | Zero internet required on the plant floor (HWID node-lock for Pro). |

---

## 👑 Pricing & Instant Licensing

We offer flexible, industrial-grade licensing through our verified merchant of record, **Dodo Payments**. All transactions support Credit Cards, Apple Pay, Google Pay, and PayPal across 135+ countries with automatic VAT/tax invoices.

| Plan | Price | Billing | Features & Scope | Checkout |
|:---|:---:|:---|:---|:---:|
| 🟢 **Community** | **$0** | Free Forever | Core Editor Experience, KSS Standard Library, Basic Project Management | [Install Free](https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension) |
| ⏱️ **Pro Monthly** | **$9.99** / mo | Monthly | All 159 Industrial Pro Tools • 1 PC • KRC2/KRC4/KRC5 • Priority Support | [Get Pro Monthly](https://checkout.dodopayments.com/buy/pdt_0NmAUzwdbzeERSktsOLTp) |
| 👑 **Annual Pro** | **$79.00** / yr | Annual (Save 35%) | All 159 Industrial Pro Tools • 1 PC • Priority Support & Feature Requests | [Get Annual Pro](https://checkout.dodopayments.com/buy/pdt_0NmAV012KFHSjUMyDomJ6) |

> 🏢 **Enterprise & Site Invoicing:** Need multi-seat team licenses or bank wire transfers (EUR/USD)? Run `krl.requestCorporateInvoice` inside VS Code or email **licensing@teknorob.com**.

---

## 🌐 Documentation & Knowledge Base

Visit our complete interactive documentation portal for in-depth tutorials, API references, and industrial case studies:

*   📖 **English Documentation**: [https://liskinlabs.github.io/kuka-krl-extension/](https://liskinlabs.github.io/kuka-krl-extension/)
*   🇷🇺 **Русская документация и Вики**: [https://liskinlabs.github.io/kuka-krl-extension/ru/](https://liskinlabs.github.io/kuka-krl-extension/ru/)
*   🇹🇷 **Türkçe Dokümantasyon ve Wiki**: [https://liskinlabs.github.io/kuka-krl-extension/tr/](https://liskinlabs.github.io/kuka-krl-extension/tr/)
*   🇩🇪 **Deutsche Dokumentation und Wiki**: [https://liskinlabs.github.io/kuka-krl-extension/de/](https://liskinlabs.github.io/kuka-krl-extension/de/)
*   🇮🇹 **Documentazione e Wiki in Italiano**: [https://liskinlabs.github.io/kuka-krl-extension/it/](https://liskinlabs.github.io/kuka-krl-extension/it/)
*   🇪🇸 **Documentación y Wiki en Español**: [https://liskinlabs.github.io/kuka-krl-extension/es/](https://liskinlabs.github.io/kuka-krl-extension/es/)

---

## ⚖️ Trademarks & Legal Disclaimer

*   **KUKA®, KRL®, KRC®, WorkVisual®, SmartPAD®**, and **iiQKA.OS®** are registered trademarks of **KUKA AG** / **KUKA Deutschland GmbH**.
*   **Visual Studio Code® and VS Code®** are registered trademarks of **Microsoft Corporation**.
*   This software extension is an independent development by **Liskin Labs** and is **not** affiliated with, sponsored, endorsed, or certified by KUKA AG, Microsoft Corporation. All product names, logos, and brands are property of their respective owners and are used solely for identification and compatibility purposes under nominative fair use.
```
