# Changelog

All notable changes to the **KUKA KRL Extension** will be documented in this file.

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
