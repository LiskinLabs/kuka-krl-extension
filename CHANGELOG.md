# Changelog

All notable changes to the **KUKA KRL Extension** will be documented in this file.

## [1.9.2] - 2026-10-04 (Universal Industrial Safety Suite, KRCDiag Deep Audit & CSP Hardening)

### 🛡️ Universal Industrial Static Safety Suite (16 Automated Safety Gates)
- **ILF Metadata Desync Guard**: Detects discrepancies between Inline Form XML metadata parameters and active KRL statements.
- **Dynamic Load Data & Tool Index Integrity**: Verifies matching indices between `TOOL_DATA` and `LOAD_DATA`, flagging unconfigured dynamic payloads.
- **Actuator Sensor Pairing**: Detects blind actuator releases (waiting for `NOT Locked` without checking `Unlocked` feedback).
- **Mutual Exclusion Verifier**: Flags sequential `IF ... ENDIF` blocks controlling actuators and motion without mutual exclusion.
- **Advance Run Breaker (Vorlaufstopp) Detection**: Identifies synchronous subprogram calls and I/O reads breaking the continuous advance pointer between `C_DIS` approximation points.
- **Safety Zone Handshake Symmetry**: Enforces strict pairing between zone acquisition (`Zone_Request`) and release signals.
- **PTP Turn Bit Unwind Risk & 6D Operator Guard**: Warns on wrist axis 360° unwinding risks and improper manual coordinate inversions.

### 📦 KUKA Backup Archive Explorer & Inspector (Zero-Unpack Engine)
- **Direct Double-Click Opening for `.zip` Backups**: Double-clicking any KRC `.zip` backup or `KRCDiag_*.zip` in VS Code opens the KUKA Backup Archive Explorer instead of the binary file warning.
- **In-Memory Zero-Unpack Reading**: Lightning-fast in-memory parsing (<60ms for 50MB archives) via `SimpleZipReader` without extracting files to disk.
- **Automatic Robot Passport Extraction**: Automatically extracts Robot Name, Serial Number, KSS Version, Controller, and Kinematic Model from `am.ini`, `KRCDiag.log`, and `$machine.dat`.
- **Virtual Document Content Provider (`krc-archive://`)**: Double-clicking any `.src`, `.dat`, `.sub`, `$config.dat`, or `$machine.dat` inside the archive opens it in a native VS Code editor tab with complete KRL syntax highlighting, folding, and search.
- **In-Memory Static Analysis & Quality Report**: One-click static code analysis across all KRL programs inside the `.zip` archive without extracting to disk.
- **Direct Event Log Decoding from Archive**: Decode and inspect binary `.evt` event logs directly from `.zip` packages in the KUKA Event Log Inspector.

### 🔍 KRCDiag Deep Diagnostic Integration & Fleet Explorer
- **KRCDiag Archive & Folder Support**: Direct inspection of native controller diagnostic packages (`KRCDiag_*.zip`, event logs, trace data, and system topologies).
- **Event Log Inspector Directory Resolution**: Automatically resolves `EventLogs/` directory paths to primary event files (`KrcLogS.evt` / `KrcLog.evt`), eliminating directory read errors.
- **Fleet Hierarchy Deduplication**: Consolidates multi-controller backups under a unified parent robot root.

### ⚡ Control Center & CSP Security Fix
- **CSP Nonce Webview Resolution**: Fixed Content-Security-Policy script nonce handling in Control Center, restoring 100% interactivity for all UI controls, tabs, and diagnostic switches.
- **Live Background Services Quick Bar**: Direct one-click control for all background services (ErrorLens, SafetyLens, Git Blame, Continuous Workspace Scanner, and Master Airgap Silent Mode).
- **Complete Command Catalog**: All 75 extension tools and commands organized into dedicated logical functional categories with zero duplicate cards.

### ⚖️ Trademark & Brand Neutrality
- **Third-Party Trademark Sanitization**: Fully neutralized third-party editor brand names (e.g., OrangeEdit) across UI titles, command palettes, and documentation in favor of neutral engineering terminology (*Advanced Kinematics & Trajectory Suite*).

### 🔐 AppSec & Licensing Hardening
- **Asymmetric Ed25519 Airgap Licensing**: Replaced symmetric HMAC airgap validation with asymmetric Ed25519 signature verification (`LISKIN_LABS_AIRGAP_PUBLIC_KEY`), preventing key extraction from client bundles while retaining backward compatibility via timing-safe HMAC fallback.
- **Telemetry Command Injection Hardening**: Eliminated shell interpolation by switching from `child_process.exec` to parameterized `execFile("git", ...)`.
- **GDPR & VS Code Telemetry Compliance**: Added strict compliance checks enforcing user opt-in (`vscode.env.telemetryConfiguration.telemetryLevel === "all"`) and workspace trust boundary verification (`vscode.workspace.isTrusted`).

### 📦 VSIX Package Optimization
- **VSIX Bundle Slimming**: Slashing extension package size to ~5.3 MB (>80% reduction) with lazy activation and fast startup events.

## [1.9.1] - 2026-10-01 (Enterprise Fleet Verification, Hardened Folds & Legal Compliance)

### 🛡️ Enterprise Fleet Verification (9,804 Modules / 4.2M+ LoC Tested)
- **100% Non-Destructive Code Modernization**: Hardened `convertLegacyToSpline` and `insertSplineBlock` against runaway fold scans in legacy robot programs with missing or malformed `;ENDFOLD` tags.
- **Tech Package Protection**: Automated preservation of specialized welding and dispensing packages (KUKA.ServoGun `%MKUKATPSERVOTECH`, SpotTech, ArcTech, GlueTech).
- **Fleet Quality Audit**: Verified across all 17 customer robotics installations and 8 automotive/Tier-1 clients with zero line losses, zero block regressions, and 100% preservation of companion `.dat` symbols.
- **Branding & Trademark Cleansing**: Cleaned all UI labels, NLS localization files, and technical logs under standard Nominative Fair Use guidelines.

## [1.9.0] - 2026-10-01 (Industrial 6D Kinematics, Advanced Simulation Safety & KSS 8.7 Megarelease)

### 🚀 Industrial 6D Kinematics & Offline Transformation Suite
- **6D Robotics Kinematic Math Engine (KRL Euler Matrix Formulation)**:
  - Exact 4x4 Homogeneous Transformation Matrices, Euler angle conversions ($R_z(A) \cdot R_y(B) \cdot R_x(C)$), frame inversion, and KUKA geometric operator (`:`).
  - Bitwise manipulation of `STATUS` (0..7) and `TURN` (0..63) bitmasks matching KUKA controller specs.
- **⭐ 6D Trajectory & Point Mirroring (`krl.mirrorTrajectory`) [Pro Tier]**:
  - Mirrors motion paths across Cartesian planes X (YZ-plane), Y (XZ-plane), or Z (XY-plane).
  - Inverts corresponding Turn bitmasks: Plane X ($T \oplus 32$), Plane Y ($T \oplus 40$), Plane Z ($T \oplus 48$), with optional A1 Turn bit reflection ($T \oplus 1$).
  - Full side-by-side VS Code Diff-Preview before committing coordinate changes to `.src` and companion `.dat` files.
- **⭐ 6D Batch Point Transformation & Shift (`krl.batchShiftPoints`) [Pro Tier]**:
  - Batch shifts selected positions across `.src` and `.dat` using Tool Offset ($P : \Delta F$), Base Offset ($\Delta F : P$), or Cartesian Delta vector.
  - Interactive Preview via Diff Editor before applying updates.
- **Bidirectional Trajectory Reversal (`krl.reverseTrajectory`) [Free Tier]**:
  - Inverts motion path order backwards with intelligent circular motion handling (swaps target and auxiliary points for `CIRC` / `SCIRC`) and preserves `;FOLD` envelopes.
- **Point Renumbering & Symbol Synchronization (`krl.renumberPoints`) [Free Tier]**:
  - Sequentially batch renumbers motion points in `.src` files (`XP1`, `XP2`, ...) and automatically renames corresponding companion declarations in `.dat` (`XP1`, `FP1`, `PPDAT1`).
- **Tool & Base Coordinate Inspector & CSV Exporter (`krl.toolBaseOverview`) [Free Tier]**:
  - Scans active files and `$config.dat` for `TOOL_DATA[1..64]`, `BASE_DATA[1..32]`, `LOAD_DATA[1..64]`.
  - Displays coordinates, Euler angles, and names (`TOOL_NAME`, `BASE_NAME`), with one-click export to industrial spreadsheet CSV format.
- **KUKA Form Definition (KFD) AST Parser & Linter (`kfdParser.ts`)**:
  - Validates `.kfd` technology option package forms (`DEFTP`, `ENDTP`, `DECL PARAM`, `DECL PLIST`, `DECL FOLD`, `DECL INLINEFORM`).
  - Detects unclosed package scopes, mismatched curly braces, duplicate parameter definitions, and size mismatches with real-time editor diagnostics.

### 🔬 Advanced Kinematic & Simulation Safety Analyzers (KSS 8.3–8.7)
- **Status (S) & Turn (T) Kinematic Validator (`validateStatusAndTurn`)**:
  - Validates Status $S$ literal values and assignments: strictly enforces range $0..7$ (`'B000'`..`'B111'`). Out of range values trigger KSS error 1033 (*Status/Turn ungültig*).
  - Validates Turn $T$ literal values and assignments: strictly enforces 6-axis range $0..63$ (`'B000000'`..`'B111111'`).
  - **4-Axis Palletizer Kinematics Guard**: Enforces constant Status $S = 2$ (`'B010'`) for palletizer robots (e.g. `KR 300-2 PA`, `KR 470 PA`, `KR 700 PA`), preventing singular configuration faults.
- **FOR Loop Step Zero Guard (`ForInterpreter`)**:
  - Prohibits `STEP 0` in `FOR` loop declarations, preventing infinite interpreter loops (KSS `InterpreterException: Step 0 is not allowed`).
- **RESUME Statement Constraints (`ResumeInterpreter`)**:
  - Prohibits `RESUME` in background SUBMIT interpreter (`sps.sub`).
  - Prohibits `RESUME` in main routines outside of active interrupt service routines (ISR).
  - Flags `RESUME` for `GLOBAL INTERRUPT DECL`, preventing illegal stack unwinding across global module boundaries.
- **SUBMIT Interpreter Motion Prohibitions (`SubmitMotionNotAllowed`, `RobotStopOnlyInSubmit`)**:
  - Strictly forbids robot motion statements (`PTP`, `LIN`, `CIRC`, `SPTP`, `SLIN`, `SCIRC`) in background `sps.sub` files.
  - Enforces that `ROBOT_STOP()` can only be called from SUBMIT background tasks.
- **SYNC Followed by Spline Incompatibility Guard (`SyncFollowedBySplineNotAllowed`)**:
  - Flags invalid sequences where `SYNC` is immediately followed by a `SPLINE` block or motion.

### 📐 KSS Standard Project Templates & Snippets
- **Interactive KUKA Template Scaffolding Wizard (`krl.scaffoldKrcFiles`)**:
  - Generates verified project templates:
    - **CELL.SRC**: Production Automatic External handler with P00 handshake, $STOPMESS, and PGNO dispatch.
    - **Standard Module**: Standard KUKA Application module (`.src` + `.dat`).
    - **UserSubmit Task**: Multi-Submit task for KSS 8.3/8.5/8.7 background processing (`SPS1.SUB` .. `SPS5.SUB`).
    - **⭐ VKRC Folge Module (Pro Tier)**: Full Volkswagen VASS sequence module with `TPVW`, `SPS_TRIG`, `PENTER`, `PEXIT`.
    - **⭐ VKRC Makro Function (Pro Tier)**: Volkswagen VASS macro function with advance run `ADV` discrimination.
- **Official Spline Inline Form Snippets**:
  - Added snippets for `SLINI`, `SPTI`, `SCIRCI` with `%MKUKATPBASIS,%CSPLINE`, `SVEL_CP`, `STOOL2`, `SBASE`, `USE_CM_PRO_VALUES`.
  - Added `STOPWHEN` and `ON_ERROR_PROCEED` snippets.

## [1.8.11] - 2026-10-01 (Advanced Industrial Stopping Distances & Brake Test Diagnostics)

### 🔬 Industrial Diagnostics & Safe Stopping Distances
- **Exact Interrupt Priority Model (`InterruptPriorityValidation`)**:
  - Enforces strict KSS KRC interrupt priority constraints decompiled directly from `Kuka.Sim.Programming.Statements.Validation`:
    - Valid user interrupt priorities: `1..2` and `4..39` (`value != 3`).
    - **Priority 3 Strictly Forbidden**: Reserved by KSS system core (AutoExt / system task coordination).
    - **Priorities 40..80 Forbidden**: Allocated strictly to KUKA technology packages (`KUKA.SafeOperation`, `KUKA.RoboTeam`, `KUKA.ArcTech`, `KUKA.LaserTech`).
    - **Priorities 81..128**: Dedicated to background `SUBMIT` interpreter (`sps.sub`) and system tasks.
- **RoboTeam Tool & Base Identifier Length Guard (`RoboTeamAnalyzer`)**:
  - Enforces KUKA's 20-character maximum limit (`MaxNameLengthOfToolBase = 20`) on `TOOL_NAME[n]` and `BASE_NAME[n]` string identifiers. Prevents internal memory corruption and multi-robot RoboTeam sync failures.
- **Brake Test Motion Approximation Prohibition (`BrakeTestConfigurationAnalyzer` & `StoppingDistanceService`)**:
  - Prohibits continuous path approximation (`C_PTP`, `C_DIS`, `C_ORI`, `C_VEL`, `C_SPL`) on motion commands within Brake Test routines (`BRAKETEST`, `BrakeTestReq`), enforcing complete stops required for mechanical holding brake torque measurement (`BlendingNotSupported`).
- **KRC Flat-Namespace Duplicate Module Guard (`DuplicateFileAnalyzer`)**:
  - Detects duplicate module file names across subfolders within the same controller workspace (`KRC:\R1\...`). In KSS, module files share a global namespace in `/R1/`; duplicate basenames cause fatal loader collisions.
- **High-Resolution Robot Photo in Quality & Audit Reports (`reportGenerator.ts`)**:
  - Embedded real robot preview photo in Section 1 (Hardware & System Passports) of generated Project Quality and Audit reports, resolved automatically via local WorkVisual / KUKA.Sim catalog.
- **Dynamic Stopping Distance Calculation in Acceptance Reports (`acceptanceReport.ts`)**:
  - Integrated dynamic stopping distance and stopping time models for STOP 0, STOP 1, and STOP 2 categories per EN ISO 10218-1 and `Kuka.Sim.StoppingDistance.dll`.
- **Enhanced Robot Model Regex Parsing & Auto-Detection**:
  - Fixed prefix parsing so that generation-2 and variant notations (e.g., `KR210R2700_2 C4 FLR`, `KR210R2700-2 KRC5`) accurately resolve to their official robot catalog images (`KR 210 R2700 prime`).
  - Added auto-detection paths for `KUKA.Sim 4.10` and `iiQWorks.Sim 1.3` RuntimeTools.

## [1.8.10] - 2026-10-01 (KUKA WorkVisual Compiler Analyzers, Robot Image Bridge & Acceptance Reports Integration)

### 📸 KUKA WorkVisual Robot Image Bridge & Acceptance Protocol Reports
- **Official Robot Photo in Acceptance Protocols (`krl.generateAcceptanceReport`)**: Acceptance reports generated for customer site buy-offs and CE/ISO 10218 safety audits now embed the official high-resolution robot render inside "Card 1: Robot Passport ($machine.dat)".
- **Local WorkVisual Asset Detection**: Seamlessly detects installed KUKA WorkVisual (3.0, 4.0, 5.0, 6.0) on the engineer's workstation (`C:\Program Files (x86)\KUKA\WorkVisual 6.0\Tools\RuntimeTools`).
- **Fuzzy Kinematics Model Resolver**: Robust matching for both KRC4 and KRC5 notations (e.g., `#KR210R2700_2 C4 FLR`, `KR210R2700-2 KRC5`, `KR210R2700_2 C5 FLR` all reliably map to official kinematic render `KR 210 R2700 prime`).
- **Copyright-Compliant Dynamic Extraction**: Extracts preview renders (`Preview.jpg`) directly from the local licensed `KRC4_robot_images.zip` using `KRC4_robots.xml` (183 official models) without redistributing proprietary assets.
- **KUKA Fleet Robot Explorer Integration**: Discovered robot controllers and multi-robot cells in the active workspace display the official robot photo directly in the VS Code TreeView explorer.
- **Robot Model Viewer (`krl.viewRobotImage`)**: 1-click preview of the active robot cell's photo inside VS Code editor.

### 🔬 KUKA WorkVisual 6.0 Compiler Analyzers Reverse-Engineering Integration
- **`InvalidFileHeader` Guard (`krl.diagnostics.checkFileHeaders`)**: Flags comments or blank lines preceding KSS compiler directives (`&ACCESS` and `&REL`) that break compilation on physical KRC controllers.
- **`InvalidBrakeStatement` Guard (`krl.diagnostics.checkBrakeUsage`)**: Strictly prohibits `BRAKE` / `BRAKE F` in background Submit interpreter (`.sub`), and enforces that `BRAKE` in `.src` files can only be executed within declared `INTERRUPT` service routines.
- **`DeclarationHidesGlobalVariable` & `HiddenModuleField` (`krl.diagnostics.checkShadowedVariables`)**: Warns when local variables in `.src` routines shadow global variables in `$config.dat` or module variables in `.dat`, preventing accidental state corruption.
- **`FrameChangeInsideSplineBlock` (`splineFrameChangeForbidden`)**: Prohibits altering coordinate frames (`$BASE`, `$TOOL`, `BAS(#BASE/TOOL/FRAMES/INITMOV)`, `FDAT_ACT`) inside `SPLINE ... ENDSPLINE` envelopes per KSS motion planning rules.
- **`KrlStartsWithOne` & `ArrayIndexTooBig`**: Enforces 1-based array indexing across declarations and expressions, prohibiting index 0 (with proper exemption for `$BASE_DATA[0]`), and capping array dimensions at the KSS limit of 32766.
- **`SystemNameUsed` Guard**: Restricts user variable and subprogram declarations from beginning with `$` (reserved strictly for KSS system variables).
- **`SwitchWithoutCase` Guard**: Flags `SWITCH` blocks that close with `ENDSWITCH` without any `CASE` or `DEFAULT` branches.
- **`UnreachableCode` after `HALT`**: Identifies dead code paths immediately following `HALT` statements.

### 🛡️ Supply Chain Security & CVE-2026-76845 Remediation
- **Fixed `CVE-2026-76845` in `adm-zip`**: Upgraded `adm-zip` dependency to `^0.6.1` to eliminate the symbolic link extraction vulnerability ("Improper Link Resolution Before File Access") flagged by ReversingLabs Spectra Assure and NVD.
- **Zero Supply Chain Alerts**: Manifest SBOM updated to ensure 100% compliance across automated enterprise security scanners.

## [1.8.9] - 2026-09-30 (Automotive & OEM Standards Suite, 183 KUKA Robot Specs DB, VASS 26 Linter, VW_USER Tech Packages & Path Geometry)

### 🦾 Official KUKA Robot Specs Catalog & Reach Envelope Guard (183 Models)
- **183 Official KUKA Robot Models Catalog**: Embedded comprehensive physical reach, payload, arm series, and mounting position specifications parsed directly from KUKA Kinematics Specifications (`KRC4_robots.xml`).
- **Autonomous Robot Model Auto-Detection**: Automatically detects active robot kinematics and serial model from controller root `$machine.dat` (`$TRAFONAME[]`) or `am.ini`, supporting fuzzy matching and edition variations (`#KR210R2700_2 C4 FLR`).
- **Cartesian Reach Envelope Validator (`krl.diagnostics.checkRobotReach`)**: Real-time diagnostic guard that flags Cartesian target coordinates (`E6POS`, `POS`, `FRAME`, literals) exceeding the robot's physical reach sphere ($R = \sqrt{X^2+Y^2+Z^2} > \text{reach} + 100\text{ mm}$), while properly factoring external linear track axes ($E1$).

### 🏭 Volkswagen, Audi, SEAT, Škoda (VASS 26 Standard) Rules Linter (`krl.diagnostics.checkVassStandard`, `krl.diagnostics.checkVassStrictRules`)
- **Macro Call Approximation Guard**: Enforces VASS 26 exact stop rule (`SPSMAKRO` only allowed with `VE=0%`). Warns if continuous path approximation (`VE > 0%`) is programmed, preventing dangerous PLC desynchronization.
- **Safety Interlock Gate Handshake**: Flags `A23 = AUS` (cell safety zone release) missing mandatory safety gate confirmation (`WARTE BIS E17` or `WARTE BIS E23`).
- **Folge Safe Start Speed**: Validates that the first motion point of a Folge program (`folge*.src`) runs at safe reduced velocity (`VB <= 20%`, `VE = 0%`).
- **Wait Condition Exact Stop (`WARTE BIS E...`)**: Flags motion points containing wait conditions programmed with continuous approximation (`VE > 0%`).
- **Sequence End Exact Stop**: Ensures the final motion point of a sequence routine concludes with exact stop (`VE = 0%`).
- **PTP Sequence Boundaries**: Enforces VASS standard rule requiring the first and last motion point of a Folge or UP sequence to be `PTP` (or `KPTP`/`SPTP`) for deterministic kinematic homing.
- **KLIN Seam Genau Ratio**: Enforces VASS 26 rule for gluing/dispensing (`KLIN` seam points), requiring the `Genau` approximation parameter to equal exactly 20% of `VB` path speed (`Genau = VB * 0.2`).
- **SPSTrig & VE Synchronization**: Validates `SPSTrig = 0` when `VE = 100%`, and `SPSTrig = 5` when `VE = 0%`.
- **SUCHLAUF Motion Type Constraint**: Enforces `LIN` motion type for touch-sense search routines (`SUCHLAUF`).
- **KRL Comment Length Limit**: Warns when inline form comment strings exceed KSS 128-character hardware buffer limit.

### 🔄 Motion Point 3-Way Data Integrity Validator (`krl.diagnostics.checkMotionFoldSync`)
- **Motion Point Data Integrity Engine**: Detects desynchronization between user-visible `;FOLD` comments on SmartPAD (e.g., `VB=100%`, `RobWzg=1`, `Base=0`) and the underlying `.dat` controller structures (`P1_D`, `PDAT`, `LDAT`, `FDAT`).
- **Stealth Speed & Tool Override Detection**: Emits precise diagnostic warnings if an engineer manually altered FOLD headers or DAT structures in an external editor, preventing hazardous robot velocity jumps.

### 🏷️ VW_USER & VKRC Technology Packages Suite (`krl.inlayHints.vwUserTech`)
- **Full Technology Catalog (101..501)**: Embedded specifications for Spot Welding (`EZ/SP/KE`), Equalizing Gun (`VM-Ausgleich`), Clinching (`CZ`), MIG/MAG Arc (`MS`), Sensor Offset (`Baseverschiebung`), Stud Welding (`BS`), SafeRobot (`SFR`), Gluing/Dispensing (`Kleben`), Laser Optics (`3D-PFO`), Gripper Tech (`Handling`), Blind Riveting (`Nieten`), Seam Tracking (`NK`), and Flowdrill.
- **LSP Inlay Hints & SPSMAKRO Integration**: Inline parameter name, macro descriptors (`Makro 340: Handling (Greifer)`), and technology labels directly in the editor for `VW_USER`, `VW_USR_R`, and `SPSMAKRO` calls.
- **Standard System I/O Fallback Hints**: Displays standard industrial signal meanings for `$IN` and `$OUT` when unaliased.
- **Interactive Hover & Signature Help**: Rich Markdown tables detailing parameter roles ($P1..P10$), physical units (`[1/10 mm]`, `[ms]`), and decoded enum values.

### 📐 Trajectory Geometry & Path Math Guard (`krl.diagnostics.checkPathApproximation`)
- **CIRC Collinear & Coincident Point Guard**: Mathematically verifies 3-point circular arcs (`CIRC`, `SCIRC`, `KCIR`). Detects collinear points (infinite radius) and coincident points ($Aux = Target$) that crash KUKA motion planner at runtime.
- **$APO.CDIS 50% Segment Over-Approximation & Silent Reduction**: Enforces KSS trajectory constraint: flags `$APO.CDIS` exceeding 50% of the segment length and warns about silent approximation reduction by controller.
- **Switch Points Range Verification (`TRIGGER WHEN PATH` & `Schaltpkt`)**: Compares switch point trigger distances against preceding and outgoing physical motion segments. Flags out-of-bounds trigger distances before controller runtime errors.
- **Long Motion Segments Detection**: Identifies continuous seam motions (`KLIN`, `LIN`) exceeding 50 mm without intermediate support points to preserve bead application geometry.
- **FOLD & ENDFOLD Name Matching Validation**: Validates name parity between `;FOLD <name>` and `;ENDFOLD (<name>)` to protect SmartPAD outline structure.

### 🚗 Volkswagen VKRC Full Integration & Automotive Architecture
- **Autonomous VKRC Workspace Detection (`vkrcService`)**: Heuristically analyzes project files for Volkswagen VKRC structures (Folge, UP, MakroSps, MakroStep, MakroTrigger, VW_USER) and controller root parameters.
- **Pro Gated Industrial Standard**: Free community users receive clear, non-intrusive notifications when opening VKRC projects, with one-click access to a 14-day full-featured trial or direct corporate invoicing.
- **Dedicated VKRC Status Bar & Diagnostics**: Real-time status bar widget showing active VKRC mode, with deep AST parsing and syntax diagnostics for automotive assembly lines.

### 💳 Unified B2B Invoicing via Dodo Payments (Merchant of Record)
- **Official Checkout & Customer Portal**: Fully retired homemade HTML quote generator in favor of hosted Dodo Payments checkout with automated EU VAT validation (VIES Reverse Charge 0% for European businesses).
- **Direct PDF Invoice Retrieval (`krl.downloadLatestInvoice`)**: Integrated direct download of official Dodo PDF invoices directly inside VS Code with merchant details for enterprise accounting.

### 🛠️ Industrial UI Refresh & Strict Codicon Standardization
- **Complete Cartoon Emoji Eradication**: Replaced all informal emojis across the entire UI/UX with native VS Code Codicons (`ThemeIcon`), precision SVG vectors, and engineering bracketed tags (`[PRO]`, `[TECH]`, `[VASS 26]`, `[MOVE]`, `[CALL]`, `[WAIT]`, `[IO]`, `[CMD]`, `[PTP]`, `[LIN]`, `[CIRC]`).
- **Standardized TreeViews & QuickPicks**: Clean visual hierarchy across Commands TreeView, I/O TreeView, CodeLens, Hover tooltips, and Control Flow Diagrams.

### 🎛️ UI/UX Control Center Two-Way Sync & 6-Language Parity
- **Independent Feature Switches**: Added dedicated toggles for each new automotive engine under "Critical Safety & Hardware Limits" and "Automotive & OEM Standards (Volkswagen, Audi, SEAT, Škoda — VASS 26)".
- **Strict 6-Language NLS & Client Parity**: All configuration settings, diagnostics, and Control Center descriptions fully localized across English, Russian, German, Spanish, Italian, and Turkish with zero hardcoded strings.

## [1.8.8] - 2026-09-24 (Open VSX Automated Pipeline, DevSecOps License Protection & Clean Code Audit)

### 🚀 Open VSX & Dual-Registry Publishing Pipeline
- **Dedicated Open VSX Workflow Scripts**: Added `publish:ovsx` and `publish:all` commands with `--no-dependencies` bundler isolation to `package.json` to enable automated dual publishing to both VS Code Marketplace and Eclipse Open VSX.
- **Pre-Publish Dual Collision Verification**: Hardened `scripts/prepublish_check.js` to ensure version availability and manifest parity across both registries simultaneously before publishing.

### 🛡️ DevSecOps & License Protection Hardening
- **CI License Integrity Guard**: Fixed `.github/workflows/ci.yml` to prevent overwriting the comprehensive 8.8KB Commercial EULA (`extension/LICENSE.txt`) with the root stub during continuous integration runs.
- **ESLint & TypeScript Architecture Audit**: Cleaned up all unused parameters and imports across `aiTools.ts`, `foldTools.ts`, `ioMatrix.ts`, and `motionStats.ts`, reducing compiler warnings and ensuring strict code cleanliness.
- **Exported Tool & Base Resolver**: Exported `detectActiveToolAndBase` in `foldTools.ts` for unified trajectory kinematics analysis across tools.

### 🧩 Heuristic File Classifier & Workspace Disambiguation (`.src` / `.dat`)
- **Authentic KRL Content Detection**: Introduced intelligent syntax classifier (`isAuthenticKrlContent`) recognizing KSS structural anchors (`&ACCESS`, `DEF`, `DEFDAT`, `DECL`, `;FOLD`, motion commands).
- **Zero False Diagnostics on Non-Robotics Files**: Automatically isolates and ignores foreign non-KUKA files sharing `.dat` or `.src` extensions (such as GTA/FiveM data tables, C/C++ sources, binary blobs), preventing LSP error flooding.
- **First-Line Grammar Disambiguation**: Added `firstLine` manifest pattern to prioritize KRL syntax mapping only when file begins with valid KRL headers or routines.
### 🛡️ Safety Speed Diagnostics & Submit Interpreter (`.sub`)
- **Safety Diagnostics on Submit Programs (`sps.sub`)**: Resolved an issue where background submit interpreter files (`.sub`) were improperly categorized as read-only MADA controller files. Full safety speed auditing (`$OV_PRO`, `$VEL_ACT`) is now active across all subroutines and background tasks.
- **Air-Gapped License Deactivation Gateway**: Added cryptographic offline deactivation certificate support allowing clean seat unbinding from offline production laptops with automatic instance release on the cloud licensing gateway.
- **1-Click Hardware License Re-binding**: Instant workstation migration support for factory laptop replacement.


## [1.8.7] - 2026-09-16 (Industrial Field Suite, KUKA.Sim 4.10 Standardization & Pure-TS KUKA Event Log Decoder)

### ⚡ Industrial Robotics Field Engineering Suite (PRO)
- **Visual I/O Signal Matrix & Overlap Detector (`krl.showIoMatrix`)**:
  - Scans workspace declarations for `$IN`, `$OUT`, `$ANIN`, and `$ANOUT`.
  - Calculates multi-bit signal spans and automatically identifies overlapping PLC hardware addresses.
  - Interactive Webview matrix with search, type filters, direct jump to source line, and CSV export.
- **Trajectory Path Length & Motion Stats (`krl.estimateMotionStats`)**:
  - Exact 3D spatial Euclidean distance calculation in meters across all motion commands.
  - Automatic classification and segmentation of PTP, LIN, CIRC, and Spline motions.
  - **Welding Cycle Intelligence**: Automatically detects `ARCON`/`ARCOFF` blocks, isolates weld seams, computes total weld seam length (mm / m), and calculates arc-on cycle time.
- **Native Copilot-Style Persistent AI Diff Review (`KrlReviewService`)**:
  - Zero modal dialogs: all code transformations (spline conversions, fold modernizations, cleanup) open in VS Code native side-by-side Monaco Diff Editor (`original ↔ proposed`).
  - Adaptive editor tab action bar: 1-click `✅ Accept File` (`Ctrl+Enter`), `❌ Reject File` (`Esc`), or batch `Accept All` (`Ctrl+Shift+Enter`).
  - Multi-file project pipeline with accurate remaining counters, QuickPick jump navigator, live buffer edit preservation, and race-condition guards.
- **KSS Spline Kinematic Separation & Safety-Critical Motion Suite (`krl.convertLegacyToSpline`, `krl.insertSplineBlock`)**:
  - `SPTP` point-to-point axis motions are strictly generated as standalone instructions outside `SPLINE...ENDSPLINE` blocks to prevent controller kinematic stops.
  - Linter flags illegal `SPTP` inside Cartesian `SPLINE` blocks as compiler errors, preventing SmartPAD trajectory halts.
  - 1-click automated converter for legacy `PTP`, `LIN`, `CIRC` motions to modern `SPTP`, `SLIN`, `SCIRC` with automatic `$SGEAR_JERK` limitation.
  - Validated across 10,687 real motions from 8 industrial customer fleet backups with 0 syntax errors.
- **Decode & View KUKA Event Log (.evt) (`krl.openEventLog`)**:
  - 100% pure TypeScript zero-dependency binary decoder for KRC Windows EVTX event logs (`KrcLogS.evt`, `KrcLogB.evt`, `KrcLogP.evt`, etc.).
  - Registered `KukaEventLogCustomEditorProvider` as the default custom editor in VS Code for `.evt` files — double-clicking any event log in the workspace opens the interactive viewer instantly.
  - Built-in offline diagnostic dictionary of official KUKA KSS CrossMeld messages across **all 6 supported languages**: EN (2,050), DE (2,051), RU (1,997), ES (2,048), IT (2,048), and TR (1,997).
  - Dynamic parameter substitution (`{0}`, `{1}`), fault severity classification (`ERROR`, `WARNING`, `INFO`, `DIALOG`), CSV/diagnostic report export, and one-click navigation to referenced KRL source files and line numbers.
- **100% Adaptive Themes & Zero Fixed Colors**:
  - Complete elimination of hardcoded/fixed CSS colors across all extension webviews.
  - Native integration with any VS Code theme via `--vscode-*` CSS variables, with explicit adaptations for Light Themes (`body.vscode-light`) and High Contrast (`body.vscode-high-contrast`).
  - Dynamic 6-language switcher (EN, DE, RU, ES, IT, TR) integrated into all industrial tools.
- **Pro Licensing Protection**: All industrial engineering tools are guarded with `ensurePremium`.

### KUKA.Sim & KSS 8.3–8.7 Standardization
- **Motion Approximation Parameters**: Replaced pseudo-variable assignments with authentic KUKA KSS `$APO` structure fields (`$APO.CDIS = 50.0`, `$APO.CVEL = 50`, `$APO.CPTP = 50`, `$APO.CORI = 10.0`) and standard trajectory modifiers (`LIN XP1 C_DIS`, `PTP XP1 C_PTP`).
- **Circular Interpolation Order (`CIRC` / `SCIRC`)**: Corrected point parameter mapping so auxiliary point (`auxPointName`) is strictly specified first and target point (`pointName`) second, adhering to KRL kinematics standards.
- **Official Inline Form Generation (`SCIRC`)**: Aligned `generateOfficialSplineFold` with official KUKA.Sim 4.10 `scirc.snippet` (generating proper `Kuka.HelpPointName` parameter and full `$CIRC_TYPE = SCIRC_TYP(...)` / `$CIRC_MODE = SCIRC_M(...)` calls).
- **Fold Header Cleanliness**: Removed synthetic `{iiQKA}` tags and extraneous `;%{PE}` markers from custom logic folds, preventing smartPAD "Corrupted Inline Form" parsing warnings.
- **Modern Spline Triggers**: Added support for both `TRIGGER WHEN PATH` and `TRIGGER WHEN DISTANCE` within `SPLINE ... ENDSPLINE` blocks while maintaining strict compile-time protection against non-interpolated logic.
- **Safety Audit Non-ASCII Filter**: WorkVisual system metadata headers (`&ACCESS`, `&REL`, `&COMMENT`, `&PARAM`) and comments are now cleanly exempted from `NON_ASCII_CHARACTER` diagnostics.

### Gateway & Remote Telemetry Hardening
- **Telegram API Message Splitting**: Added sequential auto-chunking (3800 characters) for large diagnostic chat payloads exceeding Telegram's 4096-character limit.
- **Caption Length Sanitization**: Automatically trims document captions to 1020 characters to prevent Telegram Bot API `MEDIA_CAPTION_TOO_LONG` rejections.
- **Workspace Mention Snippets**: Resolved payload assignment bug in `telegramService.ts` ensuring `@file` workspace snippets are fully delivered to remote developer sessions.

### Demo-Workspace & Automated Test Suite
- **Reference Workspace Enrichment**: Added tests for prohibited spline statements, malformed circular motions, modern spline blocks, torque monitoring envelopes (`$TORQMON`), and legacy inline form conversions in `demo-workspace`.
- **Automated Regression Suite**: Integrated `test_v187_industrial_suite.js` into standard `npm test`, achieving 100% pass rate across 140+ LSP, diagnostic, and industrial tool checks.

### Transparent Licensing Economics
- **Device Activations Model**: Streamlined all licensing tiers exclusively around hardware device activations: 5 device activations for Individual Pro, 25 device activations for Team Edition, and Unlimited device activations for Enterprise Plant.
- **Direct Support Hotline**: Replaced legacy 4-hour SLA references with direct real-time developer telepresence support via integrated Telegram Support Gateway.
