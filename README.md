<h1 align="center">KUKA Engineering Toolkit for VS Code</h1>

<p align="center">
  <b>Industrial Pre-Flight Engineering & Safety Suite for KUKA Robot Language (KRL).</b><br />
  Comprehensive offline static analysis, SmartPAD backup diff, kinematic transforms & KRL modernization.<br />
  Engineered for <b>KRC2, KRC4 & KRC5 Controllers (KSS 5.x – 8.7+)</b>.
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
  <a href="https://liskinlabs.github.io/kuka-krl-extension/"><img src="https://img.shields.io/badge/Fleet%20Verified-4.2M%2B%20LoC-10b981?style=flat-square" alt="Fleet Verified" /></a>
</p>

<p align="center">
  <a href="https://liskinlabs.github.io/kuka-krl-extension/"><b>🌐 Documentation Wiki</b></a> •
  <a href="https://checkout.dodopayments.com/buy/pdt_0NmAUzwdbzeERSktsOLTp"><b>⚡ Engineer Pro ($19.00/mo)</b></a> • 
  <a href="https://checkout.dodopayments.com/buy/pdt_0NmAV012KFHSjUMyDomJ6"><b>👑 Annual Pro ($149.00/yr)</b></a> • 
  <a href="https://checkout.dodopayments.com/buy/pdt_0NnLCdgD69GiXDLRJ0K5v"><b>🏢 Team Edition ($499.00/yr)</b></a> •
  <a href="https://secure.software/vscode/packages/liskinlabs/kuka-krl-extension"><b>🛡️ Security Audit</b></a>
</p>

---

## ⚡ The Reality of Industrial Commissioning

Every commissioning robotics engineer and system integrator faces the same challenges:

1. **Unplanned Line Stops ($10,000+/hour)**: A single missing `$TOOL` or `$BASE` assignment, an Advance Run drop triggering axis jerk, or an unexpected division-by-zero in `SPS.SUB` halts the automation cell during production ramps.
2. **Night-Shift Point Drift**: Operators touch up taught points directly on the SmartPAD pendant without revision tracking. Discovering what changed requires tedious manual comparison of dozens of `.dat` files.
3. **Slow Feedback Loops**: Transferring code to physical controllers or booting heavy virtual setups just to catch basic syntax or fold mismatches wastes critical commissioning hours.

**KUKA Engineering Toolkit for VS Code** delivers **pre-flight static verification, backup intelligence, and kinematic transformations** directly in your editor before code ever touches a physical robot.

---

## 🎯 The Three Core Workflows

<p align="center">
  <img src="media/control_flow_graph.gif" width="740" alt="KUKA KRL Control Flow & Safety Diagnostics" />
</p>

### 1. 🛡️ AUDIT: Pre-Flight Safety & Static Reliability
Static code analysis designed specifically for KRL runtime behavior:
* **Frame & Tool Assignment Guard**: Verifies active `$TOOL` and `$BASE` initialization before any Cartesian motion (`LIN`, `CIRC`, `SLIN`, `SCIRC`) to prevent uncontrolled manipulator trajectories.
* **Advance Run Breaker Detection**: Flags peripheral I/O statements (`$OUT`, `$IN`, `WAIT FOR`) inside motion sequences that inadvertently drop `$ADVANCE` to 0, preventing continuous path blending (`$APO`) and causing mechanical vibration.
* **Deadlock & Wait Scanner**: Detects unconditioned `WAIT FOR $IN[...]` conditions and unhandled handshakes that can freeze production cycles.
* **Background SPS Submit Guard**: Audits `SPS.SUB` and background tasks for blocking statements (`WAIT SEC`, `WAIT FOR`) and potential arithmetic faults that can crash the controller's safety task.
* **Physical Reach Limit Validation**: Validates Cartesian target coordinates against reach boundaries of 183 KUKA robot models cataloged from official kinematics specifications.
* **Turn & Status (T/S) Kinematic Sanity**: Highlights potential axis unwinding and singularity zones across joint configurations ($A_1..A_6$).
* **Automotive VASS 26 Linter**: Enforces Volkswagen / Audi Group Body-in-White automation rules (`VE=0%` on `SPSMAKRO`, `A23=AUS` confirmation interlocks).

---

### 2. 🔍 COMPARE: SmartPAD Backup Diff & Kinematic Math
Deep inspection of KUKA controller backups without disk extraction:
* **Zero-Unpack Archive Inspection**: Open and explore `.zip` backups and `KRCDiag_*.zip` diagnostic packages in-memory.
* **Spatial Coordinate Delta ($\Delta$) Calculation**: Computes exact Cartesian and axis deltas between backup versions:
  $$\Delta X, \Delta Y, \Delta Z, \Delta A, \Delta B, \Delta C$$
* **Shop-Floor Touch-Up Audit**: Instantly identify which points were retaught on the robot pendant during night shifts, highlighting subtle tool offsets.
* **Native EVT Event Log Viewer**: High-speed decoder for binary `.evt` controller logs, resolving 2,050+ official KSS diagnostic events across 6 languages.
* **Live Transparent ZIP Project Mount [PRO]**: Open any KRC backup archive directly as a workspace (`krl.mountBackupZipAsProject`). Saving files (`Ctrl+S`) updates the `.zip` archive on disk in <80ms without UI locking.

---

### 3. 📐 TRANSFORM: Kinematic Math & KRL Modernization
Batch motion path manipulation and standard migration:
* **1-Click Spline Modernization**: Automatically converts legacy motion blocks (`PTP`, `LIN`, `CIRC`) into modern KSS 8.3–8.7 Spline blocks (`SPTP`, `SLIN`, `SCIRC`) with valid `;FOLD ... ;%{PE}` parameters and companion `.dat` data structures (`CPDAT`, `PDAT`).
* **6D Trajectory Mirroring (`krl.mirrorTrajectory`)**: Reflects Cartesian paths across planes X, Y, or Z with automated Turn bit manipulation ($A_1..A_6$).
* **Batch Point Transformation (`krl.batchShiftPoints`)**: Applies 6D geometric frame operations (`:`) for Tool offsets, Base re-referencing, and vector shifts.
* **Synchronized Point Renumbering (`krl.renumberPoints`)**: Synchronizes point renaming across `.src` motions, inline form folds, and companion `.dat` declarations (`XP1`, `FP1`, `PPDAT1`).
* **Visual I/O Signal Matrix**: Scans signal declarations and detects overlapping physical bit addresses across fieldbus mappings.

---

## 📊 Feature Comparison Matrix

| Capability | Community (Free) | Engineer Pro | Team Edition | Enterprise Site |
|:---|:---:|:---:|:---:|:---:|
| **KRL Syntax Highlighting & Themes** (`.src`, `.dat`, `.sub`, `.kfd`) | ✅ | ✅ | ✅ | ✅ |
| **Smart Autocomplete & System Specs** (957+ vars, 116 functions) | ✅ | ✅ | ✅ | ✅ |
| **KSS Standard System Library & F12 Go to Definition** | ✅ | ✅ | ✅ | ✅ |
| **Code Formatter & Indentation Alignment** (`Shift+Alt+F`) | ✅ | ✅ | ✅ | ✅ |
| **GitLens Line Blame & Version Tracking** | ✅ | ✅ | ✅ | ✅ |
| **Zero-Unpack Archive Explorer** (`.zip` / `KRCDiag`) | ✅ | ✅ | ✅ | ✅ |
| **Interactive Flowchart & Control Flow Graph** | ❌ | **✅ Pro** | **✅ Team** | **✅ Enterprise** |
| **Pre-Flight Safety Audit & Deep Logic Analyzer** | ❌ | **✅ Pro** | **✅ Team** | **✅ Enterprise** |
| **SmartPAD Backup Diff & Spatial Delta Math ($\Delta X,Y,Z$)** | ❌ | **✅ Pro** | **✅ Team** | **✅ Enterprise** |
| **Live Transparent ZIP Workspace Mount & Auto-Sync** | ❌ | **✅ Pro** | **✅ Team** | **✅ Enterprise** |
| **1-Click Modern Spline Converter & Fold Generator** | ❌ | **✅ Pro** | **✅ Team** | **✅ Enterprise** |
| **6D Trajectory Mirroring, Batch Shift & Renumbering** | ❌ | **✅ Pro** | **✅ Team** | **✅ Enterprise** |
| **Binary `.evt` Event Log Viewer (2,050+ KSS codes)** | ❌ | **✅ Pro** | **✅ Team** | **✅ Enterprise** |
| **Visual I/O Signal Matrix & Bit Collision Detector** | ❌ | **✅ Pro** | **✅ Team** | **✅ Enterprise** |
| **Air-Gapped Offline Node-Locking (Factory OT Safe)** | ❌ | **✅ Pro (1 Workstation)** | **✅ Team (25 Workstations)** | **✅ Site (200 Workstations)** |
| **Automotive VASS 26 Rules & VW_USER Tech** | ❌ | **✅ Pro** | **✅ Team** | **✅ Enterprise** |
| **B2B Invoicing with Tax ID / EU VAT Reverse Charge** | ❌ | ❌ | **✅ Team** | **✅ Enterprise** |
| **Company-Branded Robot Acceptance Protocols (PDF)** | ❌ | ❌ | ❌ | **✅ Enterprise** |
| **Custom Plant Linting Rules & Dedicated Priority SLA** | ❌ | ❌ | ❌ | **✅ Enterprise** |

---

## 💳 Pricing & Commercial Licensing

All commercial licenses are billed through our verified merchant of record, **Dodo Payments**. Transactions support Credit Cards, SEPA Bank Wire, ACH, Apple Pay, and Google Pay across 135+ countries with instant tax invoicing and automated VAT reverse-charge compliance.

| Tier | Price | Scope & Workstations | Target Audience | Checkout / Quote |
|:---|:---:|:---|:---|:---:|
| 🟢 **Community** | **$0** | 1 Workstation | Basic editing, syntax, formatting, file inspection | [Free Install](https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension) |
| ⏱️ **Engineer Pro (Monthly)** | **$19.00** / mo | 1 Workstation Activation | Commissioning sprints, short projects, contractor audits | [Get Pro Monthly](https://checkout.dodopayments.com/buy/pdt_0NmAUzwdbzeERSktsOLTp) |
| 👑 **Engineer Pro (Annual)** | **$149.00** / yr | 1 Workstation Activation | Senior robotics engineers, plant programmers, offline planners | [Get Annual Pro](https://checkout.dodopayments.com/buy/pdt_0NmAV012KFHSjUMyDomJ6) |
| 🏆 **Pro Lifetime** | **$699.00** once | 1 Workstation Activation | Perpetual license, lifetime updates, permanent offline cert | [Get Lifetime](https://checkout.dodopayments.com/buy/pdt_0NmAcoqVCfuwQ6Xx7qyqr) |
| 🏢 **Team Edition** | **$499.00** / yr | B2B — Invoice & Quote | All 50 Industrial Pro Tools • 25 Workstation Activations • KRC2–KRC5 | [Get Team Edition](https://checkout.dodopayments.com/buy/pdt_0NnLCdgD69GiXDLRJ0K5v) |
| 🏭 **Enterprise Site** | **$2,490.00** / yr | 200 Workstation Activations | All 50 Pro Tools • 200 Plant Workstations • Branded Reports | [Get Enterprise](https://checkout.dodopayments.com/buy/pdt_0NnLCdkLwd0dECkpSE1JP) |

---

## 🏢 B2B Procurement, Invoicing & VAT Compliance

For corporate purchasing departments and system integrators:

* **Official Quotations & Invoices**: Generate a formal PDF commercial quotation (Angebot) directly from VS Code via command `krl.requestCorporateInvoice` (`Ctrl+Shift+P`).
* **Tax ID & EU VAT Reverse Charge**: Dodo Payments validates company VAT numbers through official databases (EU VIES, UK HMRC, US EIN) to apply 0% Reverse-Charge VAT on cross-border business purchases.
* **Corporate Wire Transfers**: Supports SEPA Bank Wire (EUR), ACH (USD), and wire transfers with automated remittance matching.
* **Air-Gapped Factory Deployment**: For isolated OT environments without internet access, generate signed cryptographic offline license certificates valid for 365 days.

---

## 🌐 Documentation & Knowledge Portal

* 📖 **English Documentation**: [https://liskinlabs.github.io/kuka-krl-extension/](https://liskinlabs.github.io/kuka-krl-extension/)
* 🇷🇺 **Русская документация и база знаний**: [https://liskinlabs.github.io/kuka-krl-extension/ru/](https://liskinlabs.github.io/kuka-krl-extension/ru/)
* 🇹🇷 **Türkçe Dokümantasyon ve Wiki**: [https://liskinlabs.github.io/kuka-krl-extension/tr/](https://liskinlabs.github.io/kuka-krl-extension/tr/)

---

## ⚖️ Legal Disclaimers, Trademarks & Safety Compliance

### 🛡️ Mandatory Safety & Industrial Compliance (ISO 10218-1/-2 & ISO 13849-1)
**KUKA KRL Professional** is an independent engineering development, static analysis, and backup diff suite developed by **Liskin Labs**. It is **NOT safety-certified software (Non-SIL / Non-PL)** and does **not** replace mandatory physical commissioning procedures, reduced override verification (`$OV_PRO <= 30%` in T1 mode on the physical KUKA SmartPAD teach pendant), or formal risk assessments required by **ISO 10218-1/-2** and **ISO 13849-1**. Always perform manual path dry-runs in T1 mode before engaging automated production.

### 🏷️ Trademarks & Brand Neutrality
* **KUKA®, KRL®, KRC®, WorkVisual®, and SmartPAD®** are registered trademarks of **KUKA AG** / **KUKA Deutschland GmbH**.
* **Visual Studio Code® and VS Code®** are registered trademarks of **Microsoft Corporation**.
* This software extension is an independent development by **Liskin Labs** and is **not** affiliated with, sponsored, endorsed, or certified by KUKA AG or Microsoft Corporation. All product names, logos, and brands are property of their respective owners and are used strictly for identification and interoperability purposes under nominative fair use.
