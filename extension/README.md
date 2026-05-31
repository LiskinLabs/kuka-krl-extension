<p align="center">
  <img src="logo.png" width="160" alt="KUKA KRL Extension" />
</p>

<h1 align="center">KUKA KRL Professional</h1>

<p align="center">
  <b>The definitive industrial development suite for KUKA Robot Language.</b><br />
  Professional-grade LSP support for KRC4 & KRC5 projects.
</p>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension"><img src="https://img.shields.io/visual-studio-marketplace/v/LiskinLabs.kuka-krl-extension?style=for-the-badge&label=Marketplace&color=FF6600" alt="Version" /></a>
  <a href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension"><img src="https://img.shields.io/visual-studio-marketplace/i/LiskinLabs.kuka-krl-extension?style=for-the-badge&logo=visual-studio-code&label=Installs" alt="Installs" /></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Language-KRL-orange?style=flat-square" />
  <img src="https://img.shields.io/badge/Localization-EN%20|%20RU%20|%20TR-blue?style=flat-square" />
</p>

---

## ⚡ Engineered for Performance

Stop the slow "WorkVisual-to-Pendant" cycle. **KUKA KRL Professional** transforms VS Code and Cursor into a powerhouse offline IDE for robot programming, providing real-time feedback, interactive visualizations, and industrial-grade safety checks.

We offer two editions of the extension: **Community Edition** (Free core tooling) and **Pro Edition** (Advanced diagnostics, flowcharts, and commissioning tools).

---

## 👑 Go Pro & Support Development

Unlock the full power of industrial offline programming. By purchasing a **Pro License**, you gain access to our advanced visualization, diagnostics, and calculator tools while supporting the active development of the project.

<div align="center">
  <a href="https://liskin.lemonsqueezy.com/checkout/buy/886efdd8-90cc-4afd-856d-5d7b076ae9b7" style="text-decoration:none;">
    <kbd style="font-size: 1.3em; padding: 8px 16px; background-color: #FF6600; color: white; border-radius: 6px; font-weight: bold; border: 1px solid #d15500;">
      🛒 Buy KRL Extension Pro License
    </kbd>
  </a>
  <p style="margin-top: 10px;">Secure subscription payments managed via <b>Lemon Squeezy</b> (Merchant of Record)</p>
</div>

---

## 📊 Feature Comparison

| Feature | Community (Free) | Pro (Premium) |
| :--- | :---: | :---: |
| **KRL Syntax Highlighting** (`.src`, `.dat`, `.sub`) | ✅ | ✅ |
| **50+ Specialized Themes** (including WorkVisual Dark/Light) | ✅ | ✅ |
| **Basic Contextual Autocomplete** | ✅ | ✅ |
| **FOLD / ENDFOLD Region Folding** | ✅ | ✅ |
| **Trilingual Localization** (EN, RU, TR) | ✅ | ✅ |
| **Interactive Flowchart Viewer** (Mermaid, zoom, pan, SVG download) | ❌ | **✅ Pro** |
| **Integrated KUKA Frame Calculator** (3-point method) | ❌ | **✅ Pro** |
| **Advanced Syntax & Block Balance Diagnostics** (balancing `IF/FOR/LOOP`) | ❌ | **✅ Pro** |
| **Safety Velocity & Tool/Base Initialization Warnings** | ❌ | **✅ Pro** |
| **Workspace-wide Dead-Code Analysis** (`GLOBAL DEF` usage check) | ❌ | **✅ Pro** |
| **Automated Code Quality Report Generator** | ❌ | **✅ Pro** |

---

## 🧠 Pro Features Deep-Dive

### 1. Interactive Flowchart Viewer [Pro]
Visualize complex nested logic into clean control flow diagrams inside VS Code.
- Click any flowchart block to immediately jump to the corresponding line in the editor.
- Click subprogram calls (e.g., `GrabPart()`) to instantly navigate and load the flowchart for that subroutine.
- Toggle **Detailed Mode** to show I/O operations and boolean flags with specialized emojis (🚗, ⏳, 💡).
- Export flowcharts directly to SVG for documentation.

*Preview:*
<div align="center">
  <img src="media/dead-code-demo.gif" width="600" alt="Flowchart Viewer Demo" />
</div>

### 2. Industrial-Grade Safety & Diagnostics [Pro]
Catch logical and compilation errors before you load files onto the controller.
- **Strict Block Integrity:** Verifies correct block endings (`IF/ENDIF`, `LOOP/ENDLOOP`, `FOR/ENDFOR`), filtering out KRL commands like `WAIT FOR`.
- **Tool/Base Initialization Warning:** Flags movements (`PTP`, `LIN`) if no active `$TOOL` or `$BASE` has been set in the routine.
- **Safety Threshold Checks:** Issues warnings for dangerously high velocity values (`$VEL.CP` over 3.0 m/s).
- **Non-ASCII Detection:** Identifies Cyrillic or special characters in executable code that trigger silent compilation failures on KRC loaders.

*Preview:*
<div align="center">
  <img src="media/type-validation-demo.gif" width="600" alt="Diagnostics Demo" />
</div>

### 3. KUKA Frame Calculator [Pro]
Calculate active robot transformations (`TOOL` and `BASE` coordinate frames) inside the editor using the 3-point method. Saves time and eliminates manual paperwork during commissioning.

---

## ⚙️ Configuration

Tune the IDE behavior via `settings.json`:

| Setting | Default | Description |
|:---|:---:|:---|
| `krl.indentWidth` | `3` | Match the KUKA Pendant standard (3 spaces). |
| `krl.alignAssignments` | `true` | Vertically align `=` signs for clean `.dat` files. |
| `krl.errorLens.enabled` | `true` | Show diagnostics as inline text at the end of lines. |
| `krl.validateNonAscii` | `true` | Prevent "invisible" characters from breaking builds. |

---

## 🚀 Why Upgrade to Pro? (Value for Automation Engineers)

Investing in a **KRL Pro License** is a game-changer for professional robot programmers. It addresses the main friction points of commissioning and offline programming:

### 1. Zero-Collision Safety Guard
* **Movements Validation:** Moving a 6-axis industrial robot without setting an active `$TOOL` or `$BASE` is one of the most common causes of physical collisions during automatic commissioning. Pro features flag missing initializations before you upload the files to the KRC controller.
* **Speed Threshold Monitoring:** Dangerous programming errors, such as setting `$VEL.CP` or `$VEL_AXIS` above safe manual limits in untested areas, are immediately caught and flagged.

### 2. Visual Debugging of Complex Logic
* **Flowchart Navigation:** Debugging legacy code with nested `IF-THEN-ELSE` branches or deep subprogram calls can take hours on a pendant. The Interactive Flowchart Viewer displays the logic layout instantly.
* **Code Syncing:** Click on any block in the flowchart, and your cursor jumps to the exact line in your KRL file. Click on a subroutine to drill down into its flow.

### 3. Smart Code Cleanliness & Compliance
* **Dead-Code Analysis:** Detect globally defined subroutines and variables that are never called or referenced, helping you keep your controller memory light and compliant with automotive standards (VASS, BMW, etc.).
* **Non-ASCII Character Blocker:** Non-ASCII characters (e.g. Cyrillic comments inside executable lines) can cause silent compilation failures on older KRC loaders. Pro diagnostics pinpoint these characters instantly.

### 4. Direct commissioning tools in VS Code
* **Frame Calculator:** No need for manual matrix calculations or spreadsheets. Calculate transformations using 3-point alignment directly in the editor and insert them right into your `.dat` files.
* **Code Reports:** Instantly export a codebase health report for project handover to client engineering leads, demonstrating compliance and professional code structure.

---

## 📄 Credits & License

*   **Developer**: [Liskin Labs](https://gitlab.com/LiskinLabs) / [Silvestr Liskin](https://www.linkedin.com/in/silvestr-liskin-ab712920b/)
*   **Themes**: Adapted from [Bearded Theme](https://github.com/BeardedBear/bearded-theme) (GPL-3.0)
*   **Data**: Reference data via [OpenKuka](https://github.com/openkuka)

Licensed under the GPL-3.0 License.
