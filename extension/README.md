<p align="center">
  <img src="https://raw.githubusercontent.com/LiskinLabs/kuka-krl-extension-core/main/logo.png" width="160" alt="KUKA KRL Professional" />
</p>

<h1 align="center">KUKA KRL Professional</h1>

<p align="center">
  <b>The definitive industrial development suite for KUKA Robot Language.</b><br />
  Professional-grade IDE & LSP support built for KRC4 & KRC5 robotics.
</p>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension"><img src="https://img.shields.io/visual-studio-marketplace/v/LiskinLabs.kuka-krl-extension?style=for-the-badge&label=Marketplace&color=FF6600" alt="Version" /></a>
  <a href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension"><img src="https://img.shields.io/visual-studio-marketplace/i/LiskinLabs.kuka-krl-extension?style=for-the-badge&logo=visual-studio-code&label=Installs" alt="Installs" /></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Language-KRL-orange?style=flat-square" />
  <img src="https://img.shields.io/badge/Offline--First-Ready-green?style=flat-square" />
  <img src="https://img.shields.io/badge/Localization-EN%20|%20RU%20|%20TR-blue?style=flat-square" />
</p>

---

## ⚡ Engineered for Industrial Speed

Stop the slow, painful **"WorkVisual-to-Pendant-to-Controller"** iteration cycle. 

**KUKA KRL Professional** transforms VS Code and Cursor into a world-class offline IDE for industrial robot programmers. Write clean, crash-free code with real-time feedback, advanced syntax analytics, mathematical tools, and visual logic flow diagnostics before uploading files to the robot controller.

We offer two editions tailored to your workflow:
* 🟢 **Community Edition**: Core syntax support, basic autocompletion, and professional themes (100% free).
* 👑 **Pro Edition**: Advanced industrial diagnostics, structural visualization, mathematical calculators, and compliance tools designed for field engineers.

---

## 👑 Upgrade to Pro: Pricing & Licensing

Investing in a **KRL Pro License** is a game-changer for commissioning engineers. By catching a single syntax error or coordinate mismatch before it reaches the robot pendant, the extension **pays for itself instantly** in saved factory downtime.

We offer flexible, industrial-grade licensing through our official merchant, **Lemon Squeezy**:

| Plan | Price | Best For | License Type |
|:---|:---:|:---|:---|
| ⏱️ **Pro Monthly** | **$3.99** / mo | Short-term commissioning & trial | Subscription (14-day free trial, 3 PCs) |
| 📅 **Pro Annual** | **$39.99** / yr | Full-time robotics engineers *(Save 20%)* | Subscription (Priority updates, 3 PCs) |

<div align="center" style="margin: 30px 0;">
  <a href="https://liskin.lemonsqueezy.com/" style="text-decoration:none;">
    <kbd style="font-size: 1.4em; padding: 14px 28px; background-color: #FF6600; color: white; border-radius: 8px; font-weight: bold; border: 1px solid #d15500; cursor: pointer; box-shadow: 0 4px 6px rgba(0,0,0,0.15);">
      🛒 Buy KRL Extension Pro License
    </kbd>
  </a>
  <p style="margin-top: 12px; font-size: 0.95em; color: #555;">Instant activation key delivery via <b>Lemon Squeezy</b> (Merchant of Record)</p>
</div>

---

## 🚀 Key Professional Features

### 1. 🗺️ Interactive Flowchart Viewer
*Stop tracing nested logic by hand.* Turn massive, complex `.src` programs into visual, clean control-flow diagrams.
* **Bi-directional Navigation**: Click any block in the flowchart to jump to the exact line of code in the editor.
* **Subroutine Drill-Down**: Click subprogram calls (e.g., `GrabPart()`) to instantly load and display their flowcharts.
* **Detailed Info-mode**: Toggle flags, timers, and I/O states directly on the flowchart blocks with color indicators.
* **SVG Export**: Export vector graphics of your subprograms in one click to embed directly into client documentation.

### 2. 🛡️ Industrial Safety & Deep Logic Analyzer
*Catch syntax crashes, deadlocks, and physical collision risks before you run code on KRC.*
* **10-Point Industrial Inspection**: Scans for cartesian speed violations (`$VEL.CP > 2.0 m/s`), uninitialized motion calls (`LIN`/`PTP` without `$TOOL`/`$BASE`), infinite loops (`LOOP` without `EXIT`), sensor deadlocks (`WAIT FOR` without timers), and non-ASCII Cyrillic blockers.
* **VS Code Problems Integration**: Publishes all detected risks directly to the VS Code **Problems panel (`Ctrl+Shift+M`)** with one-click navigation to lines.

### 3. 📡 EthernetKRL (EKI) Suite & Smart XML Validator
*Seamless EthernetKRL network setup for vision systems and PLC communication.*
* **Smart XML Schema Validator**: Auto-detects `ETHERNETKRL` XML config files in your workspace and validates schema elements (`<CONFIGURATION>`, `<RECEIVE>`, `<SEND>`).
* **EKI Handler Generator**: Generates clean, ready-to-use KRL communication routines (`EKI_Init`, `EKI_Open`, `EKI_Get*`, `EKI_Send*`) in one click.

### 4. 📐 KUKA Frame Calculator
Calculate coordinate system transformations using the classic **3-Point Method** directly inside VS Code.
* No need to export coordinates to external spreadsheets or compute matrices on paper.
* Calculate `TOOL` offset or `BASE` origin transformations using measured points.
* Insert computed coordinates directly into your `.dat` files with a single click.

### 5. 📦 KRC Backup Diff & Point Delta Inspector
Inspect and compare `.src` and `.dat` files and $E6POS/POS/E6AXIS$ point coordinates directly against `.zip` backup archives from KRC4/KRC5 SmartPAD controllers.
* Calculate exact coordinate deltas ($\Delta X, \Delta Y, \Delta Z, \Delta A, \Delta B, \Delta C$).
* Graphical Side-by-Side Diff Viewer with Output Channel logs.

### 6. 🗺️ Motion Diagrams & KSS 8.3+ Spline Snippet Generator
Generate clean KRL code for `PTP`, `LIN`, `CIRC`, `SPTP`, `SLIN`, `SCIRC`, and `SPLINE Path Blocks` with real-time SVG Motion Scheme diagrams.
* Visualizes TCP path trajectories, velocity vectors, and Jerk-Control ($SGEAR_JERK$).
* Interactive selection for $C\_PTP$, $C\_DIS$, and $C\_Spl$ blending parameters.

---

## 🌐 Full Trilingual NLS Localization (EN / RU / TR)

KUKA KRL Professional natively supports **English**, **Russian**, and **Turkish** across all UI elements, Control Center dashboard, Telegram chat, Flowchart viewer, motion descriptions, and popup notifications.

---

## 🔒 Offline-First Guarantee (For Factory Floors)

We know that automation engineers work in interference-heavy environments, underground cells, and factories with **zero internet connection**. 

Our licensing module is built with an **Offline-First Architecture**:
* **Activation**: Connect once to activate your license key.
* **Cache**: The verified license state is safely cached on your machine.
* **Offline Access**: The extension does **not** lock you out if internet connection is lost. It will continue running all Pro features offline, only attempting to sync status silently in the background when connectivity becomes available.

---

## ⚙️ Configuration Settings

Configure extension behaviors in your `settings.json`:

| Setting | Default | Description |
|:---|:---:|:---|
| `krl.indentWidth` | `3` | Adjust indentation size (3 spaces is the KUKA standard). |
| `krl.alignAssignments` | `true` | Auto-align `=` symbols in `.dat` files for clean matrices. |
| `krl.errorLens.enabled` | `true` | Show diagnostic errors as inline text at the end of lines. |
| `krl.validateNonAscii` | `true` | Scan for characters that break older KRC compilers. |
| `krl.inlayHints.enabled` | `true` | Show descriptive names for I/O signals inline. |

---

## 📄 License & Credits

* **Publisher & Developer**: [Liskin Labs](https://gitlab.com/LiskinLabs) / [Silvestr Liskin](https://www.linkedin.com/in/silvestr-liskin-ab712920b/)
* **Themes**: 100% original KUKA-inspired themes (Industrial Dark, Midnight OLED, Blueprint)
* **Data Sources**: KRL grammar references based on [OpenKuka](https://github.com/openkuka)

**Licensed under a Proprietary EULA.**  
The Community Edition is free for personal and commercial use. Reverse-engineering, decompiling, or redistributing the extension or its Premium features is strictly prohibited. See the `LICENSE` file for full terms.

---

## 📅 Changelog

### v1.7.3 (Industrial Edition Update)
* 🌐 **Full Trilingual Localization**: Added 100% symmetric i18n support across EN, RU, and TR for Control Center, Flowchart viewer, EKI tools, Telegram chat, and VS Code notifications.
* 🛡️ **Deep Industrial Logic & Safety Inspection**: Expanded safety analyzer to detect 10 critical KRC risks including infinite loops, unbounded sensor WAITs, unchecked actuator motions, and backward GOTOs with direct publication to VS Code **Problems panel**.
* 📡 **Smart EKI XML Suite**: Auto-detects EthernetKRL XML files in workspace with QuickPick selection and instant KRL handler code generation.
* 💬 **Telegram Support Chat Session Manager**: Added native VS Code dialog confirmation for session deletion and full history cleanup with webview auto-reload.
