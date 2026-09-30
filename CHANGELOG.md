# Changelog

All notable changes to the **KUKA KRL Extension** will be documented in this file.

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
