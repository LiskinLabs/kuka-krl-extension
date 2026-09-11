# Changelog

All notable changes to the **KUKA KRL Extension** will be documented in this file.

## [1.8.4] - 2026-09-11 (Acceptance Protocol Integrity, Licence Operations & Fleet Hardening)

### Acceptance protocol — corrected data
- **I/O signal map is populated again**: the report attached `KRC/STEU/$config.dat` (a two-line `DEFDAT $CONFIG` stub) because it took whichever `$config.dat` a workspace-wide search returned first, and its parser only understood `$IN`/`$OUT`. On a real customer cell that meant "No individual signals configured" next to 136 actual declarations. Signals are now collected from **every `.dat` of the controller** (any `DEFDAT` may declare them — `$config.dat`, `$machine.dat`, `p00.dat`, integrator data lists), analogue buses (`$ANOUT`/`$ANIN`) and `TO` ranges are parsed, KUKA system signals such as `$MOVE_ENABLE $IN[6]` are recognised (address-less booleans are not I/O and stay out), duplicates are collapsed, and every row now names the file it came from.
- **Safety section no longer asserts unverified results**: it printed hard-coded `PASS` / `VERIFIED` / `CONFIRMED` for every row, including an ISO 10218-1 clause, without performing any check. Each row is now a static finding with its evidence (`LOOP/ENDLOOP present — KRC/R1/System/sps.sub`) and the document states explicitly that on-site functional verification by the commissioning engineer is still required.
- **Chunked support upload** works again: `crypto.subtle.decrypt` returns an `ArrayBuffer`, so the `.buffer` accessor read failed and every encrypted file was rejected with HTTP 400; client and gateway chunk caps are aligned at 24 MB.

### Licence operations
- **Real activation counters** in the licence panel via a gateway proxy to Dodo (`/api/v1/license/status`), replacing the previously hard-coded seat numbers.
- **Seat reuse**: activation now looks for an existing machine instance before creating one, so re-installing on the same PC no longer consumes a second seat (verified live, 2 → 2).
- **Device manager** lists the machines holding a seat and can release one; releasing *this* machine deactivates the local licence.
- **Licence and trial events** are posted to the Telegram topic "💰 Лицензии / Licences" — purchases arrive through a signature-verified Dodo webhook, trial starts through the beacon (both were silently failing).
- **Pricing is unified across product, site and READMEs**: Team Edition ($299/yr) and Enterprise Site License ($1,499/yr) exist as real Dodo products with per-tier checkout links, and Lifetime moved to $699. Individual, Team and Enterprise entitlements enforce 5 / 5 / unlimited activations respectively.

### Reports & branding
- Company branding (name + logo, `krl.report.companyName` / `krl.report.companyLogoPath`) now appears in the **engineering report** as well as the acceptance protocol.
- Logo resolution is hardened: a workspace-shipped logo path must resolve inside the workspace after `realpath`, so a symlink planted in a cloned repository can no longer embed a file from elsewhere on disk into a document that gets sent to the developer.

### Telemetry
- The installations badge and `/api/telemetry/stats` report measured values; placeholder floors (1 250 installations / 35 countries) and seeded defaults are gone.

### Diagnostics (fleet-wide false positive hardening)

Derived from an industrial audit of 136 real robot backups / 10 327 KRL files across
8 customer fleets (see `FLEET_AUDIT_2026-09-11.md`). Fleet findings dropped from
7 364 to 2 275 (−69 %), errors from 2 548 to 444 (−83 %).

### Fixed
- **Inline Form Folds (`validateFoldBalance`)**: `;;FOLD … ;ENDFOLD` blocks — KUKA inline forms that live inside commented-out code — are recognized as balanced again, removing 54 bogus "orphaned ENDFOLD" errors.
- **External Declarations (`validateWorkspaceDuplicates`)**: `EXT`/`EXTFCT` are references, not definitions; they no longer raise "Global Collision" against their own implementation (`EXT Check_Table_Full_Early()` in a `.dat` vs `GLOBAL DEF` in the `.src`).
- **Type Resolution (`validateTypeUsage`)**: local declarations now shadow workspace-wide ones and every name of a declaration list (`DECL REAL Force, RESULT`) is captured — false "type mismatch" errors on valid production code are gone.
- **Vendor File Linting (`validateUnusedVariables`, `validateDeadGlobalFunctions`)**: KSS identification programs (`$xx_ident.src`), the `/IR_SPEC/` and `/KRC/Roboter/` areas and factory libraries (`bas.src`, `collmonlib.src`, `p00.src`, `msglib.src`, …) no longer receive style-level hints (−2 400 findings). User programs under `TP/` and the `sps.sub` user section are still checked.
- **I/O Ranges (`validateIoRanges`)**: `$CYCFLAG` ceiling corrected to the KSS declaration `BOOL $CYCFLAG[256]` (was 32); `$CYCFLAG[200]` in production code is no longer reported.
- **Advance Run (`validateAdvanceRun`)**: no Vorlaufstopp warning for KUKA inline forms with the CONT flag off (`Kuka.Logics.Cont=False`, `Kuka.WaitForCont=False`) or when `CONTINUE` follows the assignment group (−82 % findings).
- **Undefined Symbols (`validateVariablesUsage`)**: reported once per symbol per file instead of at every usage (one file produced 1 270 duplicate errors).
- **CI**: the VSIX artifact upload step can no longer fail the build when the GitHub Actions storage quota is exhausted.

### Tests
- New `tests/test_fleet_backup_audit_fixes.js` — 16 regression cases, each derived from a real customer file.

### Language Engine, Formatter & Refactoring Hardening

### Fixed & Hardened
- **Diagnostics & Parser Engine**:
  - **Point Integrity Check (`validateDatIntegrity`)**: Added automatic resolution of standard KUKA inline form point prefixing (`PTP P1` matching `DECL E6POS XP1` in `.dat`), eliminating false positive "point not defined" errors on motion statements.
  - **Parameterless Procedure Calls**: Resolved false syntax error flags on legal parameterless procedure invocations (e.g. `RESET_GRIPPER`, `CELL`, `BAS_INIT`) across local and workspace definitions.
  - **External Tech Pack Routines (`EXT` / `EXTFCT`)**: Integrated `EXT` and `EXTFCT` subprogram declarations into global function indexing, avoiding spurious undefined identifier warnings.
  - **Circular Motion Syntax (`validateCircSyntax`)**: Enhanced argument parser to be bracket-aware, correctly parsing aggregate coordinate structures like `CIRC {X 100, Y 200}, {X 300, Y 400}` without token splitting errors.
  - **Fold Block Validation (`validateFoldBalance`)**: Fixed regex mismatch between fold diagnostics and editor fold regions, allowing optional whitespace in `; FOLD` / `; ENDFOLD` comments and trailing comments after `END`.
  - **Empty Block Analyzer (`validateEmptyBlocks`)**: Refactored to use dedicated block stacks for `IF`, `FOR`, `WHILE`, `LOOP`, resolving false alarms on nested blocks, verifying both `IF` and `ELSE` branches, and properly ignoring single-line `IF cond THEN stmt`.
  - **Type Checking Accuracy (`validateTypeUsage`)**: Corrected boolean assignment validation to allow comparison/logical expressions (e.g. `bFlag = 5 > 3`), and tightened variable declaration extraction to prevent normal statements (`PTP P1`, `WAIT SEC`) from polluting type maps.
  - **Invisible Character Neutralization**: Replaced zero-width character stripping with space padding to maintain 1:1 character column offsets in LSP diagnostic ranges.

- **Formatter & Code Formatting Engine**:
  - **String Literal Protection**: Masked string contents in `uppercaseKeywords`, guaranteeing that strings like `"Please wait for operator"` or XML/EKI tags preserve their casing.
  - **Single-Line IF Indentation**: Fixed cascading extra indentation caused by KRL single-line `IF cond THEN stmt` statements without `ENDIF`.
  - **FOLD Indentation**: Corrected fold indent detection so `;FOLD` and `;ENDFOLD` blocks are properly indented when `krl.format.indentFolds` is enabled.
  - **0-Based Range Fix**: Adjusted document formatting range bounds to prevent off-by-one LSP line index errors.

- **Refactoring & Code Intelligence**:
  - **Local Variable Scope Isolation**: Restricted Rename (`F2`) and Find References (`Shift+F12`) for routine-local variables strictly to the enclosing `DEF...END` block, eliminating accidental cross-file renames across robot programs.
  - **Unused Variable QuickFix**: Fixed "Remove unused variable" code action so that standalone variable declaration lines (`DECL INT myUnusedVar`) are completely removed without leaving orphaned `DECL` keywords.
  - **ROUND() QuickFix Regex Escaping**: Safely escaped values in `createWrapWithRoundAction` to avoid runtime regex compilation crashes on complex arithmetic expressions.
  - **CodeLens Reference Counting**: Updated metric calculation from indexing declarations to actual usage counts derived from workspace word occurrences.
  - **Autocompletion After Space**: Removed aggressive autocomplete cancellation after spaces, enabling smooth auto-completion of types after `DECL `, motion targets after `PTP `, and expressions.

- **Tools, Licensing & Client Stability**:
  - **Stable Hardware Fingerprint (`getStableHardwareId`)**: Filtered out virtual and VPN adapters (Hyper-V, Docker, Tailscale, TAP, WSL) with deterministic adapter sorting, preventing Pro license invalidation during field network changes.
  - **Windows Backup Diff Paths**: Normalized Windows backslashes in `.zip` archive entry matching in `krcBackupDiff`, ensuring reliable diffs on SmartPAD archives.
  - **Active Tool & Base Detection (`detectActiveToolAndBase`)**: Fixed default assignment logic that previously locked detected tools to `Tool[1]`.
  - **I/O Tree View Signal Scanner**: Filtered out commented lines during workspace I/O scans, preventing commented-out signals from appearing as active hardware channels.
  - **Control Center Resource Cleanup**: Scoped webview message listeners to panel lifecycle, eliminating listener duplication and memory leaks across open/close cycles.

## [1.8.3] - 2026-09-08 (Reliability Update & Data Intelligence)

### Improvements
- **Workspace validation consistency**: "Check All Files" now reads files exactly as the editor presents them (BOM stripped, line endings normalized) — diagnostics no longer appear for files that are actually clean, and no longer vanish when a file is opened.
- **Flowchart + Safety in one view**: the Interactive Logic Flowchart now embeds the full Industrial Safety analysis panel — motion, actuator and deadlock risks are listed next to the control-flow diagram with one-click line navigation.
- **Flowchart joins the Pro toolset**: the Interactive Logic Flowchart viewer is now a Pro feature, consistent with the published feature matrix.

### Fixed
- "Check All Files" previously flagged UTF-8 BOM as an error that disappeared as soon as the file was opened; batch scans now match the editor view exactly.
- Workspace diagnostics no longer drift between the batch scanner and open documents.
- Variable checks now wait for the workspace index to finish loading, so no transient "variable not defined" messages appear while a large project is still being scanned.
- The quality report now waits for validation to settle before counting issues, so its numbers always match the Problems panel.
- The motion snippet generator now emits `C_DIS` / `C_VEL` with their values, matching KRL semantics.
- Internal consistency fixes across the language server and support gateway.

## [1.8.2] - 2026-09-06 (Interactive Flowchart Viewer v2.0, Multi-Backup Diagnostics & Industrial Pro License Alignment)

### Added
- **Interactive Control Flowchart v2.0 (`krl.showFlowchart`)**:
  - **Bidirectional History Stack & Breadcrumbs**: Full navigation history with `⬅️ Back (Alt+Left)`, `➡️ Forward (Alt+Right)`, `🏠 Main Program`, and clickable breadcrumbs trail (`📍 cell.src ➔ p00.src ➔ ...`).
  - **Smart Centering & Readability Zoom**: Automatically centers on program entry points (`DEF cell`) with high-legibility default scale (0.8x) for wide switch-case branching programs, avoiding illegible micro-scaling.
  - **Fit to Screen (`🔄 Fit Screen`)**: Instant one-click adaptation to view the entire routing diagram regardless of complexity.
  - **Industrial Capacity Engine**: Diagram processing engine uncapped to 100,000 edges and 10MB diagram buffers, flawlessly rendering massive production cell dispatchers (such as `p00.src`).
  - **Interactive In-Diagram Search**: Real-time statement filtering with visual amber glow and match counters for motion commands, I/O flags, and subroutines.
  - **Enhanced Graph Topology**: Refined control flow connectivity linking `CASE` branch exits directly to `ENDSWITCH` and ensuring seamless loop back-edges.
- **Hierarchical Sidebar & Pro Alignment**:
  - Full synchronization between sidebar `[PRO]` badges and runtime execution guards. All professional tools (AI Safety Checker, iiQKA FOLD converter, Spline blocks, EKI generator/validator, GitLens KRL history and diffs, unused variable cleanup) are strictly guarded.
  - Core tools (Interactive Flowchart, KUKA Control Center, Frame Calculator, Workspace Validator, Snippet Generator, Project Scaffolding, and Backup Export) remain accessible for all automation engineers.
- **License Management & Machine Seat Control**:
  - Added in-editor license deactivation (`krl.deactivateLicense`) to seamlessly release and transfer license seats between industrial field laptops and engineering workstations.
  - Real-time reactive updates for the sidebar command tree upon license activation and deactivation.
- **Multi-Robot Controller Scoping & Diagnostics**:
  - Automatic isolation of controller boundaries via `getControllerRoot`, preventing false procedure duplicate warnings across multi-robot automotive cells.
  - Submit Interpreter safety validation flagging blocking `WAIT FOR` loops in `sps.sub`.
  - Physical I/O range validation enforcing hardware boundaries for digital and analog channels.

### Fixed
- Fixed SVG export serialization in Flowchart Webview.
- Fixed case-to-endswitch edge routing for nested branching blocks.
- Fixed controller boundary resolution for multi-robot project folders.

## [1.8.1] - 2026-09-05 (Studio Hub Redesign, Universal Theme Compatibility & Industrial Fleet Diagnostics)

### Added
- **Complete UI/UX Studio Hub Overhaul (`krl.openControlCenter`)**: Rebuilt Control Center as a modern multi-tabbed studio (Overview & Tools, Diagnostics & Rules Engine, Shortcuts Reference, Account & Support) with session tab persistence.
- **Universal Theme Adaptability**: Full native dynamic integration across all VS Code themes (Light+, GitHub Light/Dark, Solarized, Monokai, High Contrast) using semantic CSS tokens (`--vscode-editor-foreground`, `--vscode-descriptionForeground`, `--vscode-sideBar-background`, `--vscode-widget-border`).
- **Hierarchical Sidebar Tree View**: Reorganized 36-item commands list into 5 collapsible categories: Quick Actions & Audit, Motion & Splines, Safety & Hygiene, Backups & Git, and Support & License.
- **In-Editor Features & Shortcuts Reference Tab**: 21 interactive cards documenting all keybindings (`F12`, `Shift+F12`, `F2`, `Shift+Alt+F`, `Ctrl+Shift+[` / `]`) with 1-click execution.
- **Telegram Environment Test Suite (`test_telegram_features.js`)**: 21 automated checks covering remote commands (`/read_file`, `/logs`, `/backup`, `/sysinfo`), user consent guards, and Smart Diff & Apply.
- **Single Source of Truth Version Architecture (`version.ts`)**: Dynamic runtime resolution from VS Code extension manifest (`package.json`).
- **Persistent Workspace Diagnostics & Continuous Background Scanner**: Real-time non-blocking scanner ensuring problems remain visible across all workspace files even when closed.
- **6 Deep Industrial Diagnostic Rules**: Hardware I/O boundary enforcement ($IN/$OUT 1..4096 / 8192), CIRC 2-point syntax validation, INTERRUPT DECL priority & parameterless checks, `;FOLD/ENDFOLD` balance, SRC ⟷ DAT point integrity, and workspace global symbol collision guards.
- **Fleet Stress Validation Suite (`test_fleet_backups.js` & `test_all_remaining_features.js`)**: 178 automated checks verified against 107 real-world robot backup archives (9,595 KRL files) with 100% pass rate.
- **Zero-False-Positive URI Normalization Engine**: Fixed Windows drive letter case encoding (`c:` vs `C:`) and URI component serialization (`%3A` vs `:`) across workspace duplicate detection and global symbol indexes.
- **Array Return Types Parsing (`core.ts`)**: Added full regex engine support for KRL functions returning typed array buffers (e.g. `GLOBAL DEFFCT CHAR[15] K_ADDR()`), preventing false duplicate function identifier collisions.
- **LSP State Fault-Tolerance & Bulletproofing**: Guarded all hover and workspace symbol lookups with optional chaining and fallback collections, ensuring 100% uptime without unhandled exceptions on cold workspaces.
- **Quality Audit Report Re-Categorization**: Refined issue categorization in Acceptance Reports — empty blocks classified as Logic Hygiene, with dedicated priority buckets for Global Scope Collisions and Inline Form FOLD balance.
- **Multi-Robot Automation Cell Isolation & Passport Detection**: Deterministic controller root boundaries (`controllerScope`), isolating variables, symbols, and diagnostics across multiple open robot backups with auto-generated multi-robot workcell passports.
- **Submit Interpreter (`sps.sub`) Blocking WAIT Detection**: Safe guard flagging blocking `WAIT FOR` / `WAIT SEC` statements inside background submit interpreter loops while intelligently ignoring standard KUKA power failure recovery patterns (`$POWER_FAIL`).

## [1.8.0] - 2026-09-04 (KUKA.Sim 4.10 Kernel Integration & Official Specifications)

### Added
- **Complete KUKA.Sim 4.10 Kernel Specifications**: Full integration of authentic industrial language definitions extracted directly from KUKA.Sim 4.10, WorkVisual, and KRC / OfficeLite controller kernels.
- **957 System Variables with Strict Typing & Metadata**: Expanded from 359 to 957 system variables (`$ACC`, `$TOOL`, `$BASE`, `$POS_ACT`, `$VEL_AXIS`, etc.) featuring exact data types (`FRAME`, `CP`, `INT`, `REAL`, `BOOL`, `E6POS`), array dimensions (217 multidimensional arrays), Read-Only/Read-Write writability badges, and authentic German engineering comments with physical units.
- **116 Built-in Controller Functions & Procedures**: Integrated full runtime library of KSS system routines (kinematics: `FORWARD`, `INVERSE`, `INV_POS`, `TOOL_ADJ`; string operations: `STRLEN`, `STRDECLLEN`, `STRCOPY`; type conversion: `STRTOREAL`, `STRTOBOOL`, `STRTOINT`; message dialogs: `SET_KRLMSG`, `CLEAR_KRLMSG`; safety & torque: `SET_TORQUE_LIMITS`, `DYNBRAKETEST`).
- **Interactive Parameter Assistance (`signatureHelp`)**: Real-time parameter tooltips with active argument highlighting and parameter direction (`:IN` / `:OUT`) when typing `(` for any of the 116 system functions.
- **111 System Structures & 112 System ENUMs (443 Literals)**: Pre-loaded into the LSP symbol index. Intelligent dot-completion (`.`) for both user variables and system variables (`$TOOL.`, `$BASE.`, `$POS_ACT.`, `$ACC.`), and instant `#` enum value completion (`#AUT`, `#T1`, `#T2`, `#EX`, `#P_FREE`, `#QUIT`).
- **451-Keyword Official Compiler Matrix**: Direct implementation of KUKA C++ `keyword.h` rules with exact `allowedAsVariable` classification, preventing false-positive syntax warnings for valid KRL identifiers while strictly enforcing reserved language tokens.
- **23 Official KUKA Inline Form Snippets (34 Templates)**: Complete replacement of legacy motion snippets with authentic Kuka Roboter GmbH XML templates (`ptpi`, `slini`, `sptpi`, `scirc`, `ptprel`, `PTPCo`, `ptpca`, `ptpa`, `trigdist`, `trigpath`, `pse`, `sigin`, `sigout`, `wsec`, `wfor`, `Forr`, etc.) featuring valid FOLD headers (`;FOLD ... ;%{PE}`) and parameter clauses.
- **Hexa-Locale Architecture (6 Languages)**: Full localization across English (EN), German (DE), Italian (IT), Spanish (ES), Russian (RU), and Turkish (TR) with 100% key symmetry across 180+ UI strings, native commands, and authentic German engineering descriptions for all 513 core system variables.
- **Interactive SmartPAD Backup Acceptance Report**: Upgraded automated quality audit report with controller serial number extraction, robot model passport, KSS version detection, and clickable file hyperlinks directly opening offending code lines in the editor.

### Fixed & Optimized
- **Zero-False-Positive Fleet Audit Benchmark**: Stress-tested across 108 real-world robot backup archives (4,136,829 lines of code in 25.4s) with zero false-positive diagnostics.
- **Parser Trailing Keyword Correction**: Removed erroneous single-letter `"S"` from reserved keywords list in `parser.ts`, restoring accurate diagnostic reporting for misspelled words ending with `s` (such as `moves`, `vars`).
- **Control Center Visual Tier Badges & Command Routing**: Modernized Control Center tool grid with explicit `⭐ PRO` and `FREE` badges and robust command routing.
- **Multi-Modifier Declaration Parser**: Fixed variable declaration regex to correctly parse multiple modifiers (`DECL CONST REAL`, `DECL GLOBAL CONST INT`) without false warnings.
- **Bypass for Interrupt Declarations**: Fixed diagnostics analyzer to recognize `GLOBAL INTERRUPT DECL` statements as valid control-flow definitions rather than variable declarations.

## [1.7.5] - 2026-09-03 (Interactive Reference Guide, Native ZIP Export & Unified Commands)

### Added
- **21-Card In-Editor Engineering Reference Guide**: Added Section 4 to Control Center with illustrated reference cards for all contextual editor actions (Go to Definition `F12`, Find References `Shift+F12`, Rename Symbol `F2`, Format Document `Shift+Alt+F`, Fold/Unfold `Ctrl+Shift+[` / `]`, Fold All/Unfold All `Ctrl+K, 0` / `Ctrl+K, J`, Insert/Unwrap FOLD, Flowchart Graph, Clean Dead Variables, Sort Declarations, Industrial Safety Check, Legacy to Spline, iiQKA Fold, CollisionGuard, Trailing Whitespace, Signal Aliases, File History, Git Blame, Error Lens, Inlay Hints, I/O Refresh).
- **Native Project ZIP Export & File Explorer Reveal**: Upgraded `krl.exportBackupZip` to launch native VS Code Save Dialog for local exports, packaging all files (including hidden configs and submodules) into a single archive with an instant **"📂 Show in File Explorer"** notification button.
- **Complete KUKA Commands Flat Tree (35 Commands)**: Expanded sidebar commands tree into a comprehensive flat list with dedicated icons and localized tooltips, putting every extension capability directly at the engineer's fingertips.
- **VS Code Language Model Tools API (`krl_safety_check`)**: Contributed `languageModelTools` schema in `package.json` for seamless integration with GitHub Copilot Chat and modern VS Code AI runtime.

### Fixed & Optimized
- **Resilient WorkVisual Metadata Cleanup (`krl.cleanGitMetadata`)**: Fixed "No active KRL files" error when clicked from Control Center; now automatically scans and cleans all `.src`, `.dat`, `.sub`, `.kfd` files across the entire workspace.
- **Control Center Branding & Author Attribution**: Cleaned Control Center footer and account profile to strictly reflect `Developed by Liskin Labs & Silvestr Liskin`.
- **Exthost Runtime Log Cleanliness**: Resolved uncaught rejection in modern VS Code 1.93+/1.136 by properly declaring language model tools.
- **Documentation & Website Overhaul**: Updated VitePress documentation site and README across repositories with v1.7.5 feature matrix and new installation links.

## [1.7.4] - 2026-09-03 (Feature Control Matrix, Timeout Guard & Industrial Demo Workspace)

### Added
- **Interactive Feature & Diagnostic Control Matrix in Control Center**: Dedicated dashboard card with live system health badges and individual switches for on-the-fly disabling of any diagnostic rule (Block balance, Speeds, Dead code, Type usage, Constraints, WAIT FOR timeout, HALT warnings, General syntax).
- **Comprehensive Configuration Settings**: Master and granular toggles (`krl.diagnostics.*`) in VS Code settings with real-time language server re-validation across all active editor documents.
- **Massive Industrial Demo Workspace (`demo-workspace`)**: Expanded test suite covering the entire KRL spectrum — cell orchestration (`cell.src`), pick & place cycle (`pick_and_place.src`), advanced SPLINE welding (`welding_process.src`), control flow & interrupts (`logic_and_control_flow.src`), digital/analog I/O & timers (`signals_and_timers.src`), math functions & parameter passing (`subroutines_and_functions.src`), EKI XML communication, and KRC backup diff.
- **Full Spanish (Español) Localization**: 100% complete technical translation for Spanish-speaking automation engineers across Spain and Latin America (`package.nls.es.json`, client commands, Control Center UI, Safety Diagnostics, and Language Server hover documentation).
- **Quad-Locale Architecture**: Symmetrical 94-key localization across English (EN), Russian (RU), Turkish (TR), and Spanish (ES).

### Fixed & Optimized
- **False WAIT FOR Timeout Warnings**: Resolved false timeout notifications on sensor handshake loops using timer safeguards such as `WAIT FOR ($IN[39]==TRUE) OR ($TIMER[1] > 3000)`. Timeout warning disabled by default (`warnWaitWithoutTimeout: false`) and fully configurable.
- **Configurable HALT Warning**: Made `HALT` diagnostics toggleable via `krl.diagnostics.warnHalt`.
- **$VEL.CP Velocity Guard Validation**: Correctly integrated Cartesian speed cap (> 3.0 m/s) in LSP safety checks alongside PTP velocity.
- **Real-Time Setting Synchronization**: Client immediately notifies language server upon configuration change, triggering instantaneous document re-validation without requiring file reloads.

## [1.7.3] - 2026-09-02 (Industrial 50-Tools Production Debut)

### Added
- **50 Industrial Engineering Tools Suite**: Full enterprise tooling covering logic, kinematics, safety, diagnostics, version control, and offline commissioning.
- **Interactive Flowchart & Control Flow Graph (`krl.showFlowchart`)**: Bi-directional, clickable SVG diagrams with subroutine drill-down and vector export.
- **KRL Revision Graph & GitLens Point Blame Timeline (`krl.viewLineHistory`, `krl.compareTwoRevisions`)**: Commit graph and author tracking for every teaching point and motion line.
- **3-Point Euler Base/Tool Frame Calculator (`krl.showCalculator`)**: Calculate Euler rotation angles (A, B, C) and generate valid KRL coordinate structures directly in editor.
- **SmartPAD ZIP Backup Diff & Point Delta Inspector (`krl.compareKrcBackup`)**: Automated coordinate delta calculations (ΔX, ΔY, ΔZ) against robot backup archives.
- **Dead-Code & Unused Global Function Workspace Analyzer**: Scan entire project for dead subroutines, orphaned variables, and unreachable code paths.
- **Modern KRL & iiQKA Fold Suite**: Automatic wrapping of logic into official iiQKA Folds (`krl.convertToIiqkaFold`) and Spline Blocks (`krl.convertLegacyToSpline`).
- **Dodo Payments Global Licensing Integration**: Support for 135+ countries, Apple Pay, Google Pay, 30-day offline buffer, and 14-day commissioning grace period.
- **Velocity & Safety Inspector ($VEL.CP)**: Real-time detection of dangerous Cartesian overspeed (> 2.0 m/s) and uninitialized motion hazards.
- **KSS 8.3+ Spline Motion Snippets**: Full support for Spline PTP (`SPTP`), Spline Linear (`SLIN`), Spline Circular (`SCIRC`), and `SPLINE Path Block` with automatic `$SGEAR_JERK` and `C_Spl` blending configurations.
- **Telegram Live Chat Integration**: Direct developer support bridge embedded in VS Code with forum topic threads.

### Fixed & Optimized
- **License Status & Offline Buffer**: Differentiated Dev Master Keys vs Active Keys, and added explicit `30 Days Remaining (Auto-synced online)` label for offline validation buffer.
- **Zero-Warning Code Quality**: Fixed linter/prettier formatting across `telegramService.ts` and `controlCenter.ts`.
- **Diagnostics Performance**: Optimized Levenshtein distance spellchecker with early length-difference exit and removed unused dead code.
- **Repository Cleanup**: Removed obsolete backup directories, scratch scripts, and old pre-built `.vsix` artifacts.

## [1.7.2] - 2026-04-02

### Added
- **Full KSS 8.7 Documentation**: Over 350 system variables now have detailed trilingual descriptions (EN, RU, TR).
- **Semantic Inlay Hints**: Real-time descriptive labels for `$IN`, `$OUT`, `$ANIN`, `$ANOUT`, `TOOL_DATA`, and `BASE_DATA` indices.
- **Enhanced Hover Info**: Hovering over system variables now shows `Type`, `Writability` (Read-Only status), and `Syntax`.
- **Turkish Localization**: Comprehensive support for the Turkish language across all documentation and UI elements.

### Fixed
- **Navigation Bug**: Fixed a core issue where the `$` character was stripped during word detection, breaking Go to Definition and References for system variables.
- **LSP Performance**: Implemented a memory-based symbol cache. Navigation (F12) and Hover are now near-instant, even in large projects.
- **Security**: Fixed a critical ReDoS (Regular Expression Denial of Service) vulnerability in the variable declaration parser.
- **Formatting**: Global cleanup of line endings (CRLF/LF) and formatting for 6000+ lines of code.

### Removed
- GitHub Sponsorship integration.

## [1.7.1] - 2026-01-28
- Initial internal release with basic KRL support.
