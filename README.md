<h1 align="center">KUKA Engineering Toolkit for VS Code</h1>

<p align="center">
  <b>Industrial Offline Programming (OLP), Real-Time SCADA Monitor, Pre-Deployment Diagnostics & Model Context Protocol (MCP) AI Bridge for KUKA Robotics.</b><br />
  <i>The complete offline & online engineering suite for Visual Studio Code.</i><br />
  Engineered for <b>KRC2, KRC4 & KRC5 Controllers (KSS 5.x – 8.7+)</b>, <b>iiQKA (KSS 9.x / iiQWorks)</b>, and <b>VKRC (VASS 2.6 / VASS 6)</b>.
</p>

<details>
<summary>Language / Язык / Dil / Sprache / Lingua / Idioma</summary>

| Language | File |
|---|---|
| English | [README.md](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.md) |
| Русский | [README.ru.md](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.ru.md) |
| Türkçe | [README.tr.md](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.tr.md) |
| Deutsch | [README.de.md](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.de.md) |
| Italiano | [README.it.md](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.it.md) |
| Español | [README.es.md](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.es.md) |

</details>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension"><img src="https://badgen.net/vs-marketplace/v/LiskinLabs.kuka-krl-extension?style=flat&label=VS%20Code%20Marketplace&color=FF6600" alt="VS Code Marketplace" /></a>
  <a href="https://open-vsx.org/extension/LiskinLabs/kuka-krl-extension"><img src="https://img.shields.io/open-vsx/v/LiskinLabs/kuka-krl-extension?style=flat-square&logo=eclipseche&logoColor=white&color=007ACC&label=Open%20VSX" alt="Open VSX" /></a>
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/releases"><img src="https://img.shields.io/badge/Release-v1.9.8-FF6600?style=flat-square&logo=visualstudiocode&logoColor=white" alt="Release v1.9.8" /></a>
  <a href="https://secure.software/vscode/packages/liskinlabs/kuka-krl-extension"><img src="https://img.shields.io/badge/Spectra%20Assure-PASSED%20(100%25)-10b981?style=flat-square&logo=shield&logoColor=white" alt="ReversingLabs Security Score" /></a>
  <a href="https://liskinlabs.github.io/kuka-krl-extension/"><img src="https://img.shields.io/badge/Fleet%20Verified-4.2M%2B%20LoC-10b981?style=flat-square" alt="Fleet Verified" /></a>
  <img src="https://img.shields.io/badge/Factory%20OT-Air--Gapped%20Safe-blue?style=flat-square" alt="Air-Gapped Safe" />
  <a href="https://github.com/LiskinLabs/kuka-krl-mcp"><img src="https://img.shields.io/badge/MCP%20Server-Connected-00D68F?style=flat-square" alt="MCP Server Connected" /></a>
</p>

<p align="center">
  <a href="https://liskinlabs.github.io/kuka-krl-extension/"><b>Documentation Wiki</b></a> •
  <a href="https://checkout.dodopayments.com/buy/pdt_0NmAUzwdbzeERSktsOLTp"><b>Engineer Pro ($19/mo)</b></a> • 
  <a href="https://checkout.dodopayments.com/buy/pdt_0NmAV012KFHSjUMyDomJ6"><b>Annual Pro ($149/yr)</b></a> • 
  <a href="https://checkout.dodopayments.com/buy/pdt_0NmAcoqVCfuwQ6Xx7qyqr"><b>Lifetime Pro ($699)</b></a> • 
  <a href="https://checkout.dodopayments.com/buy/pdt_0NnLCdgD69GiXDLRJ0K5v"><b>Team Edition ($499/yr)</b></a> •
  <a href="https://secure.software/vscode/packages/liskinlabs/kuka-krl-extension"><b>Security Audit</b></a>
</p>

---

## Industrial Reliability: Zero Plant Downtime Before Downloading Code

> [!IMPORTANT]
> **Eliminate syntax errors, unclosed FOLDs, deadlocks, coordinate drift, and Advance Run drops in VS Code before transmitting code to the physical robot controller.**

* **Prevent Costly Line Stops ($10,000+ / hour)**: Verify Tool/Base coordinate systems, motion envelope boundaries, and `SPS.SUB` cyclic tasks before production starts.
* **Online SCADA Live Monitor**: Direct Ethernet connection to physical KR C4 / KR C5 controllers with live TCP tracking, 6-axis torque gauges, 4096-pin I/O grid, and multilingual alarm subtitles.
* **Automotive OLP & VKRC Suite**: 3-way fold integrity audit, SVD Kabsch Base Calibration, Point Table Engine (split view, orphan detection, tool/base recalculation, smart duplicate), KFD Form Engine, bidirectional KRC <-> VKRC converter, and Tech Points 3D diff.
* **SmartPAD Backup Intelligence**: Audit backup archives (`.zip` / `KRCDiag`) and detect night-shift point touch-ups with exact $\Delta X, \Delta Y, \Delta Z$ coordinate deltas.
* **WorkVisual (.wvs) & KUKA.Sim (.vcmx) Suites**: In-memory bus topology inspection, fieldbus signal mapping (EtherCAT/Profinet), simulation race validator (`VCMX001` - `VCMX004`), and post-processor.
* **KUKA.RSI & CAM Tooling**: 4ms `#IPO_FAST` real-time sensor control loop generator, ISO G-Code and 2D Vector SVG importer, and 9-pose Vision Hand-Eye calibration wizard.
* **Model Context Protocol (MCP) AI Bridge**: Connect Cursor, Antigravity, Claude Code, and Windsurf directly to live robot telemetry and offline workspace diagnostics.
* **Deterministic Safe Auto-Repair**: Resolve thousands of structural fold desyncs and syntax faults in 1 click with AST rollback protection and Monaco diff review.

---

## Industrial Reality & Immediate ROI

Every industrial commissioning engineer, system integrator, and plant programmer knows the true cost of production defects:

1. **Unplanned Line Stops ($10,000+ / hour)**: An uninitialized `$TOOL` or `$BASE`, an Advance Run drop triggering axis jerk, or an unexpected division-by-zero in `SPS.SUB` halts the automation cell during production ramps.
2. **Night-Shift Point Drift**: Operators touch up taught points directly on the SmartPAD pendant without version control. Discovering what changed requires tedious manual comparison of dozens of `.dat` files.
3. **Slow Feedback Loops**: Transferring code to physical controllers or booting heavy virtual setups just to catch basic syntax or fold mismatches wastes critical commissioning hours.

> [!TIP]
> **ROI Guarantee:** Catching a single uninitialized coordinate frame, reach envelope violation, or unclosed FOLD before downloading to the controller pays for an entire year of Team Edition in the first 5 minutes.

---

## The Eight Core Industrial Workflows

### 1. SCADA & TELEMETRY: Real-Time Online Controller Monitor [PRO]
Direct industrial Ethernet connection to physical KUKA KR C2, KR C4, and KR C5 controllers (`krl.connectKukaRobot`, `krl.openLiveBridge`):
* **Dual Communication Architecture**: Communicates via WCF OnlineServices and high-speed KUKAVARPROXY (port 7000) over factory OT network interfaces.
* **Real-Time 6-Axis Telemetry Gauges**: Live visualization of `$AXIS_ACT` and `$AXIS_MOT` with dynamic axis limit bars, angular velocities, and motor torque loads across axes A1 through A6.
* **Cartesian TCP Telemetry**: Live readout of `$POS_ACT` (X, Y, Z, A, B, C) with active `$TOOL` and `$BASE` frame indicators.
* **Dynamic Digital I/O Matrix**: Live visual grid for `$IN[1..4096]`, `$OUT[1..4096]`, and `$FLAG[1..1024]` with real-time state change pulse animations.
* **Live SmartPAD Alarm Stream & Translation Subtitles**: Live stream of active controller messages with automatic severity badges (Error, Warning, Notice). Regardless of the controller installed language (Turkish, German, Italian, etc.), the extension automatically renders clear English and Russian translation subtitles beneath raw controller message codes (`KSS00203`, `KSS01442`, `KSS01123`, `KSS01422`, `KSS00020`).
* **Hot Controller Backup**: Download clean, complete `.zip` backup archives directly from the running controller over Ethernet without stopping automated production.

<p align="center">
  <img src="extension/media/kuka_control_center.gif" width="740" alt="KUKA SCADA Live Controller Monitor & Telemetry Dashboard" />
</p>

---

### 2. AUDIT & REPORT: Pre-Flight Safety & Quality Acceptance Protocols [PRO]
Static code analysis designed specifically for KRL runtime behavior:
* **Automated Cell Quality & Acceptance Protocol (`krl.generateAcceptanceReport`)**: Generates complete technical handover reports with Health Score (0–100%), Vorlaufstopp cycle time penalty calculation (~250–450 ms per point), deadlock detection, and reach envelope validation across 183 cataloged KUKA robot models. Exportable to Markdown and PDF for customer acceptance.
* **Frame & Tool Assignment Guard**: Verifies active `$TOOL` and `$BASE` initialization before any Cartesian motion (`LIN`, `CIRC`, `SLIN`, `SCIRC`) to prevent uncontrolled manipulator trajectories.
* **Advance Run & Path Blending Guard**: Identifies peripheral I/O statements (`$OUT`, `$IN`, `WAIT FOR`) inside motion sequences that drop `$ADVANCE` to 0, with precision recommendations for `TRIGGER WHEN PATH / DISTANCE` and `CONTINUE`.
* **Deadlock & Wait Scanner**: Detects unconditioned `WAIT FOR $IN[...]` conditions and unhandled handshakes that can freeze production cycles.
* **Background SPS Submit Guard**: Audits `SPS.SUB` and background tasks for blocking statements (`WAIT SEC`, `WAIT FOR`) and potential arithmetic faults that can crash the controller's safety task.
* **Physical Reach Limit Validation**: Validates Cartesian target coordinates against reach boundaries of 183 KUKA robot models cataloged from official kinematics specifications.
* **Automotive VASS 2.6 / VASS 6 Linter**: Enforces Volkswagen / Audi Group Body-in-White automation standards (`VE=0%` on `SPSMAKRO`, `A23=AUS` confirmation interlocks, and 22 VW UserTech technology packages).

<p align="center">
  <img src="extension/media/type-validation-demo.gif" width="740" alt="KUKA Pre-Flight Static Analysis & Quality Audit" />
</p>

---

### 3. COMPARE: SmartPAD Backup Diff & Kinematic Math [PRO]
Deep inspection of KUKA controller backups without disk extraction:
* **Zero-Unpack Archive Inspection**: Open and explore `.zip` backups and `KRCDiag_*.zip` diagnostic packages in-memory via virtual `krc-archive://` protocol.
* **Spatial Coordinate Delta (\Delta) Calculation**: Computes exact Cartesian and axis deltas between backup versions:
  $$\Delta X, \Delta Y, \Delta Z, \Delta A, \Delta B, \Delta C$$
* **Shop-Floor Touch-Up Audit**: Instantly identify which points were retaught on the robot pendant during night shifts, highlighting subtle tool offsets.
* **Native EVT Event Log Viewer**: High-speed pure-TypeScript decoder for binary `.evt` controller logs, resolving 2,050+ official KSS diagnostic events across 6 languages with error filtering and 1-click jump to `.src` line.
* **Live Transparent ZIP Project Mount (`krl.mountBackupZipAsProject`)**: Open any KRC backup archive directly as a workspace. Saving files (`Ctrl+S`) updates the `.zip` archive on disk in <80ms without UI locking.

<p align="center">
  <img src="extension/media/krc_backup_diff.gif" width="740" alt="KUKA SmartPAD Backup Diff & Coordinate Delta Math" />
</p>

---

### 4. POINT TABLE & SYNCHRONIZER: Companion .DAT Engine [PRO]
Automated motion point management and full synchronization:
* **Auto-Sync Missing Points to .DAT (`krl.syncPointsToDat`)**: Scans `.src` programs for motion commands (`PTP`, `LIN`, `CIRC`, `SPTP`, `SLIN`, `SCIRC`) and Inline Form FOLD headers (`PDAT_ACT`, `FDAT_ACT`, `LDAT_ACT`). Generates missing companion `.dat` files or injects clean `;FOLD Auto-Synchronized Points` declarations (`DECL E6POS`, `DECL FDAT`, `DECL PDAT`, `DECL LDAT`) without duplicating existing coordinates.
* **Split-View Point Table**: Side-by-side editing of motion commands and companion point structures with real-time coordinate validation.
* **Orphan Point Detector**: Identifies declared points in `.dat` that are never referenced in `.src` routines, protecting against variable table bloat.
* **SVD Kabsch 3-Point Calibration**: Recalculates `TOOL_DATA` and `BASE_DATA` frames with Euler angles (A, B, C) directly from measured calibration positions.
* **6D Trajectory Mirroring (`krl.mirrorTrajectory`)**: Reflects Cartesian paths across planes X, Y, or Z with automated Turn bit manipulation ($A_1..A_6$).
* **Batch Point Transformation (`krl.batchShiftPoints`)**: Applies 6D geometric frame operations (`:`) for Tool offsets, Base re-referencing, and vector shifts.
* **Synchronized Point Renumbering (`krl.renumberPoints`)**: Synchronizes point renaming across `.src` motions, inline form folds, and companion `.dat` declarations (`XP1`, `FP1`, `PPDAT1`).

---

### 5. WORKVISUAL & VCMX: Bus Topology & Simulation Suite [PRO]
Native project inspection and simulation validation without launching heavy external software:
* **WorkVisual (.wvs / .wvps) Topology Inspector (`krl.inspectWvsTopology`)**: Zero-unpack analysis of WorkVisual binary projects. Decodes hex-encoded XML metadata (`_x003C_`, `_x0022_`) to extract installed KOP option package catalogs (`KUKA.EthernetKRL`, `KUKA.SafeOperation`, `KUKA.GripperSpotTech`), target KSS version, and robot model kinematics (`SafeMaDaBusTopology.xml`).
* **Fieldbus Topology & Signal Extraction**: Parses EtherCAT coupler/slice slaves (`EcatDiag_*.xml`), Virtual I/O buses (`VIO_USER_BUS.xml`, `VIO_PLC_BUS.xml`), and Profinet configurations. Extracts full `$IN` / `$OUT` signal connections from `Fieldbus.krcVariables.xml` with automatic cross-export to Siemens TIA Portal XML/SDF, Beckhoff TwinCAT 3 GVL, and EPLAN CSV.
* **KUKA.Sim VCMX Workcell Inspector (`krl.inspectVcmxLayout`)**: Two-layer `layout.rsc` parser extracting `rSimNode` robot/workcell components, `rSimBooleanSignal` definitions, `ProductType` transport links, and `ProgramData` process routines directly from `.vcmx` archives.
* **VCMX Simulation Validator & Safe Auto-Repair (`krl.validateVcmxSimulation`)**: Detects and repairs 4 fatal simulation bugs (`VCMX001` edge-triggered pulse signal deadlocks, `VCMX002` `WaitSignal` timeout fallthroughs, `VCMX003` product variable list accumulation, `VCMX004` unresolved signal references) with automatic `.bk1`, `.bk2` backup preservation.
* **VCMX-to-KRL Post-Processor (`krl.exportVcmxToKrl`)**: Converts KUKA.Sim / Visual Components `ProgramData` routines (`LinMotion`, `PtpMotion`, `SetSignal`, `WaitSignal`, `Delay`) directly into synchronized KRL `.src` and `.dat` modules.

---

### 6. RSI REAL-TIME & CAM TOOLING: 4ms Sensor Control & G-Code/SVG Importer [PRO]
High-precision motion generation and hard real-time sensor integration:
* **KUKA.RSI SensorInterface XML Validator (`krl.validateRsiXml`)**: Validates `SensorInterface/*.xml` configurations (`<ROOT>`, `<CONFIG>`, `<SEN_TYPE>`, `<IP_NUMBER>`, `<PORT>`, `<SEND>`, `<RECEIVE>`, `<ELEMENT>` tags, data types, and `INDX="1..N"` continuity).
* **4ms / 12ms Real-Time RSI Driver Generator (`krl.generateRsiCode`)**: Generates production-ready `#IPO_FAST` (4ms) and `#IPO` (12ms) KRL real-time sensor correction loops (`RSI_CREATE`, `RSI_ON`, `RSI_MOVECORR`, `RSI_OFF`, `RSI_DELETE`) paired with matching XML descriptors for Cartesian (`RKorr`) or ROS 2 Axis (`AK.A1..A6`) control.
* **CAM CNC G-Code & Vector SVG Importer (`krl.importGcodeToKrl`)**: Converts ISO CNC G-Code (`G0` -> `PTP`/`SPTP`, `G1` -> `LIN`/`SLIN`, `G2`/`G3` -> `CIRC`/`SCIRC` with exact 3D arc midpoint `XAUX` calculation from `I,J` or `R`, `F` feedrate mm/min -> `$VEL.CP` m/s, `M3/M5` -> `$OUT`) and 2D vector `.svg` contours into synchronized `.src` and `.dat` files.
* **Vision Hand-Eye Calibration Wizard (`krl.generateVisionCalibration`)**: Generates a 9-pose Hand-Eye calibration pyramid (`Eye-in-Hand` / `Eye-to-Hand`) with 3D Look-At rotation matrix -> KUKA Euler Z-Y'-X'' (A, B, C) angle calculation, geometric Pre-Grasp Approach, and EthernetKRL camera trigger handshake.
* **PLC Fieldbus Tag Exporter (`krl.exportPlcTags`)**: Extracts workspace `SIGNAL` and `$IN`/`$OUT` declarations with automatic IEC 61131-3 byte.bit calculation and exports to Siemens TIA Portal XML/SDF, Beckhoff TwinCAT 3 GVL, and EPLAN CSV.

---

### 7. AUTO-REPAIR: Safe QuickFix & Batch Correction with Monaco Diff Review [PRO]
Deterministic one-click resolution of safety and structural issues without altering motion kinematics (`krl.fixAllSafeIssues`):
* **FOLD Header Synchronization**: Normalizes and aligns mismatched `;FOLD` and `;ENDFOLD` headers and strips malformed parentheses across hundreds of files in seconds.
* **Unclosed FOLD Auto-Capping**: Safely closes dangling `;FOLD INI` and system sections before routine termination.
* **FOR STEP 0 Elimination**: Replaces fatal `STEP 0` infinite loops with safe `STEP 1` to prevent controller lockup.
* **BRAKE Command Injection**: Guarantees mandatory deceleration command directly before `RESUME` in interrupt routines.
* **Payload Commit Injection**: Inserts active tool `BAS(#PAYLOAD, nTool)` commit calls after multi-attribute `$LOAD` assignment groups.
* **BOM & Non-ASCII Purge**: Cleans UTF-8 BOM and non-ASCII typographical characters that trigger KSS compiler panics.
* **AST Safety Rollback Guard**: Every repair is verified by an automated secondary AST syntax pass. If any new error or block imbalance is detected, the transaction is instantly rolled back to pristine code.
* **Interactive Monaco Diff Review**: Inspect candidate changes in side-by-side Red/Green diff with "Accept All", "Accept (Ctrl+Enter)", or "Reject (Esc)" before writing to disk.

---

### 8. AI COPILOT & MODEL CONTEXT PROTOCOL (MCP) BRIDGE [PRO]
The KUKA KRL extension includes an **embedded local MCP Bridge** (`127.0.0.1`) that connects external AI coding assistants (**Cursor, Google Antigravity, Claude Code CLI, Windsurf**) directly to your industrial workspace:
* **Real-Time Robot Telemetry via MCP (`krl_live_telemetry`)**: External AI agents can query live hardware telemetry (joint angles, Cartesian TCP, active tool/base, operating mode, active program, alarms) directly from physical controllers.
* **Automatic Cursor Registration**: Automatically configures the KRL MCP server in Cursor via `vscode.cursor.mcp.registerServer` on startup.
* **1-Click MCP Config Exporter**: Use command `KUKA KRL: Copy MCP Configuration` (`Ctrl+Shift+P`) to copy client-specific JSON configs for Claude Desktop, Cursor, Antigravity, and Windsurf.
* **Open-Source Standalone MCP Server**: Standalone MCP server available at [**LiskinLabs/kuka-krl-mcp**](https://github.com/LiskinLabs/kuka-krl-mcp) (MIT) with 12 tools for KSS system variables, alarms, and offline static analysis.
* **Official AI Rules & Skills**: Prompt rulesets for Cursor (`.cursor/rules/kuka-krl.mdc`) and Antigravity (`SKILL.md`) available at [**LiskinLabs/kuka-krl-skills**](https://github.com/LiskinLabs/kuka-krl-skills).

---

## Feature Comparison Matrix

| Capability | Community (Free) | Engineer Pro | Team Edition | Enterprise Site |
|:---|:---:|:---:|:---:|:---:|
| **KRL Syntax Highlighting & Themes** (`.src`, `.dat`, `.sub`, `.kfd`) | Yes | Yes | Yes | Yes |
| **Smart Autocomplete & System Specs** (957+ vars, 116 functions) | Yes | Yes | Yes | Yes |
| **KSS Standard System Library & F12 Go to Definition** | Yes | Yes | Yes | Yes |
| **Code Formatter & Indentation Alignment** (`Shift+Alt+F`) | Yes | Yes | Yes | Yes |
| **GitLens Line Blame & Version Tracking** | Yes | Yes | Yes | Yes |
| **Zero-Unpack Archive Explorer** (`.zip` / `KRCDiag`) | Yes | Yes | Yes | Yes |
| **SCADA Live Controller Monitor & Telemetry** | [PREVIEW] | **Pro** | **Team** | **Enterprise** |
| **Hot Controller Backup over Ethernet** | — | **Pro** | **Team** | **Enterprise** |
| **KRL Safe Auto-Repair with AST Rollback Guard** | — | **Pro** | **Team** | **Enterprise** |
| **Auto-Sync Missing Points to Companion .DAT** | — | **Pro** | **Team** | **Enterprise** |
| **Interactive Flowchart & Control Flow Graph** | — | **Pro** | **Team** | **Enterprise** |
| **Pre-Flight Safety Audit & Deep Logic Analyzer** | — | **Pro** | **Team** | **Enterprise** |
| **Automated Cell Quality & Acceptance Reports (Markdown/PDF)** | — | **Pro** | **Team** | **Enterprise** |
| **SmartPAD Backup Diff & Spatial Delta Math (\Delta X,Y,Z)** | — | **Pro** | **Team** | **Enterprise** |
| **Live Transparent ZIP Workspace Mount & Auto-Sync** | — | **Pro** | **Team** | **Enterprise** |
| **WorkVisual (.wvs) Topology & KOP Catalogs Parser** | — | **Pro** | **Team** | **Enterprise** |
| **KUKA.Sim (.vcmx) Suite & Post-Processor** | — | **Pro** | **Team** | **Enterprise** |
| **KUKA.RSI 4ms Real-Time Suite & Driver Generator** | — | **Pro** | **Team** | **Enterprise** |
| **CAM CNC G-Code & Vector SVG Importer** | — | **Pro** | **Team** | **Enterprise** |
| **Vision Hand-Eye Calibration Wizard (9-Pose)** | — | **Pro** | **Team** | **Enterprise** |
| **PLC Fieldbus Tag Exporter (TIA Portal, TwinCAT, EPLAN)** | — | **Pro** | **Team** | **Enterprise** |
| **Binary `.evt` Event Log Viewer (2,050+ KSS codes)** | — | **Pro** | **Team** | **Enterprise** |
| **Visual I/O Signal Matrix & Bit Collision Detector** | — | **Pro** | **Team** | **Enterprise** |
| **Air-Gapped Offline Node-Locking (Factory OT Safe)** | — | **Pro (1 Seat)** | **Team (5 Seats)** | **Site (100 Seats)** |
| **Automotive VASS 2.6 / VASS 6 Rules & VW UserTech** | — | **Pro** | **Team** | **Enterprise** |
| **Copilot AI Language Model Tools (`krl_safety_check`)** | — | **Pro** | **Team** | **Enterprise** |
| **Model Context Protocol (MCP) Bridge (`krl_live_telemetry`)** | — | **Pro** | **Team** | **Enterprise** |
| **B2B Invoicing & Quotations (`krl.requestCorporateInvoice`)** | Yes | Yes | Yes | Yes |
| **Company-Branded Robot Acceptance Protocols (PDF)** | — | — | — | **Enterprise** |
| **Custom Plant Linting Rules & Dedicated Priority SLA** | — | — | — | **Enterprise** |

---

## Pricing & Commercial Licensing

All commercial licenses are billed through our verified merchant of record, **Dodo Payments**. Transactions support Credit Cards, SEPA Bank Wire, ACH, Apple Pay, and Google Pay across 135+ countries with instant tax invoicing and automated VAT reverse-charge compliance.

| Tier | Price | Scope & Workstations | Target Audience | Checkout / Quote |
|:---|:---:|:---|:---|:---:|
| **Community** | **$0** | 1 Workstation | Basic editing, syntax, formatting, file inspection | [Free Install](https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension) |
| **Engineer Pro (Monthly)** | **$19** / mo | 1 Workstation Activation | Commissioning sprints, short projects, contractor audits | [Get Pro Monthly](https://checkout.dodopayments.com/buy/pdt_0NmAUzwdbzeERSktsOLTp) |
| **Engineer Pro (Annual)** | **$149** / yr | 1 Workstation Activation | Senior robotics engineers, plant programmers, offline planners | [Get Annual Pro](https://checkout.dodopayments.com/buy/pdt_0NmAV012KFHSjUMyDomJ6) |
| **Pro Lifetime** | **$699** once | 1 Workstation Activation | Perpetual license, lifetime updates, permanent offline cert | [Get Lifetime](https://checkout.dodopayments.com/buy/pdt_0NmAcoqVCfuwQ6Xx7qyqr) |
| **Team Edition** | **$499** / yr | B2B — 5 Workstations | All Industrial Pro Tools & Analyzers • 5 Workstation Activations • KRC2–KRC5 | [Get Team Edition](https://checkout.dodopayments.com/buy/pdt_0NnLCdgD69GiXDLRJ0K5v) |
| **Department / Integrator** | **$1,499** / yr | B2B — Up to 20 Workstations | Robotics integrators, line builders, plant engineering departments (up to 20 PCs) | [Get Department License](https://checkout.dodopayments.com/buy/pdt_0Nq5QVTrbkJbWAUf8qoyn) |
| **Enterprise Site** | **$4,999** / yr | B2B — Up to 100 Workstations | Full manufacturing plant or large integrator • 100 Workstations • Branded Reports & Priority SLA | [Get Enterprise](https://checkout.dodopayments.com/buy/pdt_0NnLCdkLwd0dECkpSE1JP) |

### Anti-Chargeback Buyer Guarantees (Zero Risk)
* **Clear Bank Statement Descriptor**: Transactions appear cleanly as **LISKINLABS KUKA** or **KUKA KRL VSCODE** on your credit card or bank statement.
* **In-Editor Subscription Management & 1-Click Cancel**: Easily view your status or cancel subscriptions anytime directly within VS Code via Command Palette (`Ctrl+Shift+P` → `KUKA KRL: Manage Subscription / Support`).
* **100% Immediate Refund Guarantee**: If you ever experience an issue or require a refund, simply reach out to us via the in-editor support chat; refunds are processed immediately without dispute delays.

---

## B2B Procurement, Invoicing & Air-Gapped Factory Deployment

For corporate purchasing departments and system integrators:
* **Official Quotations & Invoices**: Generate a formal PDF commercial quotation (Angebot) directly from VS Code via command `krl.requestCorporateInvoice` (`Ctrl+Shift+P`).
* **Tax ID & EU VAT Reverse Charge**: Dodo Payments validates company VAT numbers through official databases (EU VIES, UK HMRC, US EIN) to apply 0% Reverse-Charge VAT on cross-border business purchases.
* **Corporate Wire Transfers**: Supports SEPA Bank Wire (EUR), ACH (USD), and wire transfers with automated remittance matching.
* **Air-Gapped Factory Deployment**: For isolated OT plant environments without internet access, import and export cryptographically signed `.lic` license files (Ed25519) via the offline portal `https://kuka-krl-support-gateway.redminotpro5.workers.dev/airgap` with 100% offline verification.

---

## Documentation & Knowledge Portal

* **English Documentation**: [https://liskinlabs.github.io/kuka-krl-extension/](https://liskinlabs.github.io/kuka-krl-extension/)
* **Русская документация и база знаний**: [https://liskinlabs.github.io/kuka-krl-extension/ru/](https://liskinlabs.github.io/kuka-krl-extension/ru/)
* **Türkçe Dokümantasyon ve Wiki**: [https://liskinlabs.github.io/kuka-krl-extension/tr/](https://liskinlabs.github.io/kuka-krl-extension/tr/)

---

## Legal Disclaimers, Trademarks & Safety Compliance

### Mandatory Safety & Industrial Compliance (ISO 10218-1/-2 & ISO 13849-1)
**KUKA Engineering Toolkit** is an independent engineering development, static analysis, and backup diff suite developed by **Liskin Labs**. It is **NOT safety-certified software (Non-SIL / Non-PL)** and does **not** replace mandatory physical commissioning procedures, reduced override verification (`$OV_PRO <= 30%` in T1 mode on the physical KUKA SmartPAD teach pendant), or formal risk assessments required by **ISO 10218-1/-2** and **ISO 13849-1**. Always perform manual path dry-runs in T1 mode before engaging automated production.

### Trademarks & Brand Neutrality
* **KUKA®, KRL®, KRC®, WorkVisual®, iiQWorks®, and SmartPAD®** are registered trademarks of **KUKA AG** / **KUKA Deutschland GmbH**.
* **Visual Studio Code® and VS Code®** are registered trademarks of **Microsoft Corporation**.
* This software extension is an independent development by **Liskin Labs** and is **not** affiliated with, sponsored, endorsed, or certified by KUKA AG or Microsoft Corporation. All product names, logos, and brands are property of their respective owners and are used strictly for identification and interoperability purposes under nominative fair use.
