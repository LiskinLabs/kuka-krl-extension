<h1 align="center">KUKA Engineering Toolkit for VS Code</h1>

<p align="center">
  <b>Industrial Offline Programming (OLP), Real-Time SCADA Monitor, Pre-Deployment Diagnostics & Model Context Protocol (MCP) AI Bridge for KUKA Robotics.</b><br />
  <i>The complete offline & online engineering suite for Visual Studio Code.</i><br />
  Engineered for <b>KRC2, KRC4 & KRC5 Controllers (KSS 5.x – 8.7+)</b>, <b>iiQKA (KSS 9.x / iiQWorks)</b>, and <b>VKRC (VASS 2.6 / VASS 6)</b>.
</p>

<p align="center">
  <a href="README.md"><b>English</b></a> •
  <a href="README.ru.md">Русский</a> •
  <a href="README.tr.md">Türkçe</a> •
  <a href="README.de.md">Deutsch</a> •
  <a href="README.es.md">Español</a> •
  <a href="README.it.md">Italiano</a>
</p>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension"><img src="https://badgen.net/vs-marketplace/v/LiskinLabs.kuka-krl-extension?style=flat&label=VS%20Code%20Marketplace&color=FF6600" alt="VS Code Marketplace" /></a>
  <a href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension"><img src="https://badgen.net/vs-marketplace/rating/LiskinLabs.kuka-krl-extension?style=flat&color=FF6600" alt="Marketplace Rating" /></a>
  <a href="https://open-vsx.org/extension/LiskinLabs/kuka-krl-extension"><img src="https://img.shields.io/open-vsx/v/LiskinLabs/kuka-krl-extension?style=flat-square&logo=eclipseche&logoColor=white&color=007ACC&label=Open%20VSX" alt="Open VSX" /></a>
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/releases"><img src="https://img.shields.io/badge/Release-v1.9.8-FF6600?style=flat-square&logo=visualstudiocode&logoColor=white" alt="Release v1.9.8" /></a>
  <a href="https://secure.software/vscode/packages/liskinlabs/kuka-krl-extension"><img src="https://img.shields.io/badge/Spectra%20Assure-PASSED%20(100%25)-10b981?style=flat-square&logo=shield&logoColor=white" alt="ReversingLabs Security Score" /></a>
  <a href="https://liskinlabs.github.io/kuka-krl-extension/"><img src="https://img.shields.io/badge/Fleet%20Verified-4.2M%2B%20LoC-10b981?style=flat-square" alt="Fleet Verified" /></a>
  <img src="https://img.shields.io/badge/Factory%20OT-Air--Gapped%20Safe-blue?style=flat-square" alt="Air-Gapped Safe" />
  <a href="https://github.com/LiskinLabs/kuka-krl-mcp"><img src="https://img.shields.io/badge/MCP%20Server-Connected-00D68F?style=flat-square" alt="MCP Server Connected" /></a>
</p>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension"><b>Install from Marketplace</b></a> •
  <a href="https://liskinlabs.github.io/kuka-krl-extension/"><b>Interactive 3D Web Showcase</b></a> •
  <a href="https://liskinlabs.github.io/kuka-krl-extension/guide/installation"><b>Documentation</b></a> •
  <a href="#licensing--edition-comparison"><b>Editions & Plans</b></a> •
  <a href="https://kuka-krl-support-gateway.redminotpro5.workers.dev/airgap"><b>Air-Gap Gateway</b></a>
</p>

---

## Industrial Reality: Zero Plant Downtime Before Downloading Code

> [!IMPORTANT]
> **Eliminate syntax errors, unclosed FOLDs, deadlocks, coordinate drift, and Advance Run drops in VS Code BEFORE transmitting code to the physical robot controller.**

Every industrial commissioning engineer, system integrator, and plant programmer knows the true cost of production defects:
* **Unplanned Line Stops ($10,000+ / hour)**: An uninitialized `$TOOL` or `$BASE`, an Advance Run drop triggering axis jerk, or an unexpected division-by-zero in `SPS.SUB` halts the automation cell during production ramps.
* **Night-Shift Point Drift**: Operators touch up taught points directly on the SmartPAD pendant without version control. Discovering what changed requires tedious manual comparison of dozens of `.dat` files.
* **Slow Feedback Loops**: Transferring code to physical controllers or booting heavy virtual setups just to catch basic syntax or fold mismatches wastes critical commissioning hours.

**Liskin Labs KUKA Engineering Toolkit** brings complete plant diagnostics, 3D kinematics, and real-time SCADA telemetry directly into Visual Studio Code.

---

## Core Interactive Modules

<details open>
<summary><b>1. SCADA Live Monitor & Real-Time Controller Telemetry [PRO]</b></summary>
<br>

Direct industrial Ethernet connection to physical KUKA KR C2, KR C4, KR C5 controllers and virtual OfficePC setups via WCF and KUKAVARPROXY (port 7000):
* **6-Axis Joint Telemetry Gauges**: Real-time visualization of `$AXIS_ACT`, `$AXIS_MOT`, dynamic motor torque load bars (`$TORQMON`), and soft limit warnings (`$SOFTP_END`, `$SOFTN_END`).
* **Cartesian TCP Telemetry**: Live readout of `$POS_ACT` (X, Y, Z, A, B, C) with active `$TOOL` and `$BASE` frame indicators.
* **Dynamic Digital I/O Matrix**: Live visual grid for `$IN[1..4096]`, `$OUT[1..4096]`, system flags `$FLAG`, and timers `$TIMER`.
* **SmartPAD Alarm Stream & Subtitles**: Streams active controller messages with automatic severity badges and synchronous subtitles in 6 languages (EN, RU, DE, TR, ES, IT).
* **Hot Controller Backup**: Download clean, complete `.zip` backup archives directly from running controllers over Ethernet without stopping automated production.

<p align="center">
  <img src="docs/public/media/kuka_control_center.gif" width="760" alt="KUKA SCADA Live Controller Monitor & Telemetry Dashboard" />
</p>
</details>

<details open>
<summary><b>2. SmartPAD Backup Diff & Spatial Coordinate Delta Math [PRO]</b></summary>
<br>

Instant in-memory comparison of KUKA robot backup archives (`.zip`, `KRCDiag_*.zip`) without manual extraction:
* **6-Axis Spatial Deltas ($\Delta X, \Delta Y, \Delta Z, \Delta A, \Delta B, \Delta C$)**: Identifies operator touch-up shifts on `E6POS` points between production shifts.
* **Color-Coded Tolerance Highlighting**: Visual warnings for coordinate changes exceeding user-configured safety boundaries (±1.0 mm / ±5.0 mm).
* **Two-Way .ZIP Mounting**: Mount backup archives directly as project folders in VS Code with in-memory saving under 80 ms.

<p align="center">
  <img src="docs/public/media/krc_backup_diff.gif" width="760" alt="KUKA SmartPAD Backup Diff & Coordinate Delta Math" />
</p>
</details>

<details>
<summary><b>3. Deterministic Safe Auto-Repair & Monaco Diff Review [PRO]</b></summary>
<br>

Automated resolution of 7 critical classes of industrial hazards in 1 click (`Ctrl+.` QuickFix & `krl.fixAllSafeIssuesInFile`):
1. **BOM & Non-ASCII Purge**: Strips invisible UTF-8 BOM (`\xEF\xBB\xBF`), typographical quotes, dashes, and umlauts, preventing KSS compiler panics.
2. **Mandatory BRAKE before RESUME**: Injects mandatory `BRAKE` deceleration commands directly before `RESUME` in collision and sensor interrupt handlers (eliminating KSS01442).
3. **Committed Dynamic Payload BAS(#TOOL)**: Injects `BAS(#TOOL, currentTool)` commit calls after `$LOAD` / `LOAD_DATA` mutations, preventing motor overload.
4. **FOLD / ENDFOLD Desync Alignment**: Synchronizes closing `;ENDFOLD` tags with their respective `;FOLD` region headers.
5. **FOR Step Zero Hazard Prevention**: Replaces fatal `STEP 0` infinite controller loop conditions with safe `STEP 1`.
6. **Duplicate Approximation Modifiers Cleanup**: Normalizes accidental duplicate blending modifiers (`C_DIS`, `C_PTP`).
7. **Inline Form Metadata Desync Alignment**: Synchronizes XML parameter metadata with executing KRL statements (`$OUT[...]`), preventing SmartPAD Touch-Up from overwriting programmer logic.

*For deep unused variable and dead code purge across entire project backups, use the dedicated **Universal Backup & Unused Variable Purge Engine** (`krl.cleanupUnusedVariables`) with `$config.dat`, `sps.sub`, and EthernetKRL protections.*
*The native Monaco Diff Editor enables operators to review changes line-by-line (`Ctrl+Enter` to accept, `Esc` to reject) with AST Rollback Guard safety.*

<p align="center">
  <img src="docs/public/media/type-validation-demo.gif" width="760" alt="KUKA Pre-Flight Static Analysis & Quality Audit" />
</p>
</details>

<details>
<summary><b>4. Interactive Flowchart & Control Flow Graph [PRO]</b></summary>
<br>

Real-time generation of interactive vector flowcharts from active `.src` program code:
* **Bi-directional Navigation**: Clicking any node in the flowchart jumps directly to the corresponding line in the KRL code editor.
* **Control Flow Visualization**: Clear structural visualization of `IF-ELSE`, `SWITCH-CASE`, `LOOP`, `FOR`, and subroutine invocations.
* **Vector SVG Export**: Export clean SVG diagrams for acceptance documentation and technical client dossiers.

<p align="center">
  <img src="docs/public/media/control_flow_graph.gif" width="760" alt="KUKA Control Flow Graph & Flowchart Generator" />
</p>
</details>

<details>
<summary><b>5. WorkVisual (.wvs) & KUKA.Sim (.vcmx) Suites [PRO]</b></summary>
<br>

* **WorkVisual Project Inspector (`krl.inspectWvsTopology`)**: In-memory inspection of binary `.wvs` projects without running heavy CAD packages. Extracts KOP catalogs (`EthernetKRL`, `SafeOperation`, `GripperTech`), EtherCAT/Profinet topology, and exports I/O signal lists to **Siemens TIA Portal**, **Beckhoff TwinCAT 3**, and **EPLAN**.
* **KUKA.Sim 3D Simulation Validator (`krl.inspectVcmxLayout`, `krl.validateVcmxSimulation`)**: Extracts kinematics and discrete signals from `.vcmx`, detects 4 fatal simulation deadlocks (`VCMX001`–`VCMX004`), and converts simulation processes into clean `.src` + `.dat` KRL modules.
</details>

<details>
<summary><b>6. Hard Real-Time RSI (4ms) & CAM G-Code / SVG Importer [PRO]</b></summary>
<br>

* **KUKA.RobotSensorInterface (`krl.validateRsiXml`, `krl.generateRsiCode`)**: Validates XML socket descriptors and generates `#IPO_FAST` (4ms / 250Hz) real-time driver loops for optical seam tracking (`#POSCORR`) and ROS 2 axis control (`#AXISCORR`).
* **CAM CNC G-Code & 2D SVG Importer (`krl.importGcodeToKrl`)**: Converts CNC toolpaths (ISO G-Code `G0`, `G1`, `G2`, `G3`) and SVG vector graphics into robot motion programs with automatic approach heights.
* **Vision Hand-Eye Calibration Wizard (`krl.generateVisionCalibration`)**: 9-pose calibration pyramid for 3D machine vision cameras with automated Euler angle calculations.
</details>

<details>
<summary><b>7. Embedded Model Context Protocol (MCP) AI Bridge [PRO]</b></summary>
<br>

Local authenticated AI gateway (`127.0.0.1`) connecting Cursor, Google Antigravity, Claude Code, and Windsurf directly to the physical robot controller:
* Live controller telemetry readout (`krl_live_telemetry`).
* Workspace static diagnostics (`krl_workspace_diagnostics`).
* Deterministic auto-repair execution (`krl_safe_auto_repair`).
* Database of 957+ KSS system variable specifications (`krl_system_variable_spec`).
</details>

<details>
<summary><b>8. Enterprise Air-Gap Offline Licensing (.lic File Exchange) [PRO]</b></summary>
<br>

Built specifically for high-security automotive and aerospace manufacturing plants with isolated OT networks:
* **Hardware ID Request Export (`krl.exportHardwareIdFile`)**: Exports a cryptographically signed machine fingerprint file `liskin-hardware-id.lic` for transfer across plant boundaries via secure USB media.
* **License Generation**: Generate signed license file `liskin-krl-license.lic` at the [Air-Gap Portal](https://kuka-krl-support-gateway.redminotpro5.workers.dev/airgap).
* **Instant Offline Import (`krl.importOfflineLicenseFile`)**: Asymmetric Ed25519 signature verification inside VS Code completely offline with zero telemetry and zero network polling.
</details>

---

## Licensing & Edition Comparison

We separate core language editing (free forever for all roboticists) from advanced industrial engineering suites for system integrators and production plants. Current pricing, volume discounts, and subscription options are managed centrally on our [official website](https://liskinlabs.github.io/kuka-krl-extension/).

| Feature / Capability | Community (Free) | Engineer Pro (1 PC) | Team Edition (5 PCs) | Enterprise Plant (100 PCs) |
|:---|:---:|:---:|:---:|:---:|
| **Syntax Highlighting, FOLD/UNFOLD, KUKA Themes** | ✓ | ✓ | ✓ | ✓ |
| **Basic Diagnostics, Code Formatting, Inlay Hints** | ✓ | ✓ | ✓ | ✓ |
| **Language Server Protocol (LSP) Autocomplete** | ✓ | ✓ | ✓ | ✓ |
| **SCADA Live Monitor & 4096 I/O Telemetry** | — | ✓ | ✓ | ✓ |
| **SmartPAD Backup Diff & Spatial Deltas ($\Delta X, Y, Z$)** | — | ✓ | ✓ | ✓ |
| **Deterministic Safe Auto-Repair & Monaco Diff Review** | — | ✓ | ✓ | ✓ |
| **Interactive Flowchart & Control Flow Graph** | — | ✓ | ✓ | ✓ |
| **Point Table Split View & SVD Base Calibration** | — | ✓ | ✓ | ✓ |
| **Auto-Sync Missing Points to Companion .DAT** | — | ✓ | ✓ | ✓ |
| **WorkVisual (.wvs) Topology & PLC Fieldbus Export** | — | ✓ | ✓ | ✓ |
| **KUKA.Sim (.vcmx) Deadlock Engine & Post-Processor** | — | ✓ | ✓ | ✓ |
| **KUKA.RSI (4ms IPO) & CAM CNC G-Code / SVG Importer** | — | ✓ | ✓ | ✓ |
| **9-Pose Vision Hand-Eye Calibration Wizard** | — | ✓ | ✓ | ✓ |
| **Model Context Protocol (MCP) AI Bridge** | — | ✓ | ✓ | ✓ |
| **Offline Air-Gap Activation via .lic Files** | — | **1 Workstation** | **5 Workstations** | **100 Workstations** |
| **Centralized B2B Invoicing & EU VAT Reverse Charge** | — | — | ✓ | ✓ |
| **Automated KUKA Fleet Backup Hub & Strict SLA** | — | — | — | ✓ |
| **Custom OEM Plant Linting (VW VASS, Audi, BMW)** | — | — | — | ✓ |

<p align="center">
  <a href="https://liskinlabs.github.io/kuka-krl-extension/#pricing"><b>👉 View Plans, Discounts & Instant Checkout on Official Website</b></a><br />
  <i>Instant digital key delivery, international credit/debit card support, and B2B corporate wire transfers (SEPA / Wire / ACH).</i>
</p>

---

## 3D Simulation & Online Documentation

* **Interactive 3D Robot Showcase**: [https://liskinlabs.github.io/kuka-krl-extension/](https://liskinlabs.github.io/kuka-krl-extension/)
* **Complete Knowledge Base & Guides**: [https://liskinlabs.github.io/kuka-krl-extension/guide/features](https://liskinlabs.github.io/kuka-krl-extension/guide/features)
* **Air-Gap Offline Licensing Gateway**: [https://kuka-krl-support-gateway.redminotpro5.workers.dev/airgap](https://kuka-krl-support-gateway.redminotpro5.workers.dev/airgap)
* **Open Source MCP Server on GitHub**: [LiskinLabs/kuka-krl-mcp](https://github.com/LiskinLabs/kuka-krl-mcp)

---

## Legal Disclaimers, Trademarks & Safety Compliance

### Mandatory Safety & Industrial Compliance (ISO 10218-1/-2 & ISO 13849-1)
**KUKA Engineering Toolkit** is an independent engineering development, static analysis, and backup diff suite developed by **Liskin Labs**. It is **NOT safety-certified software (Non-SIL / Non-PL)** and does **not** replace mandatory physical commissioning procedures, reduced override verification (`$OV_PRO <= 30%` in T1 mode on the physical KUKA SmartPAD teach pendant), or formal risk assessments required by **ISO 10218-1/-2** and **ISO 13849-1**. Always perform manual path dry-runs in T1 mode before engaging automated production.

### Trademarks & Brand Neutrality
* **KUKA®, KRL®, KRC®, WorkVisual®, iiQWorks®, and SmartPAD®** are registered trademarks of **KUKA AG** / **KUKA Deutschland GmbH**.
* **Visual Studio Code® and VS Code®** are registered trademarks of **Microsoft Corporation**.
* This software extension is an independent development by **Liskin Labs** and is **not** affiliated with, sponsored, endorsed, or certified by KUKA AG or Microsoft Corporation. All product names, logos, and brands are property of their respective owners and are used strictly for identification and interoperability purposes under nominative fair use.
