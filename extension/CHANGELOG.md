# Changelog

All notable changes to the **KUKA KRL Extension** will be documented in this file.

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
