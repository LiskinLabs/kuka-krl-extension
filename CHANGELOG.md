# Changelog

All notable changes to the **KUKA KRL Extension** will be documented in this file.

## [1.8.8] - 2026-09-24 (Open VSX Automated Pipeline, DevSecOps License Protection & Clean Code Audit)

### 🚀 Open VSX & Dual-Registry Publishing Pipeline
- **Dedicated Open VSX Workflow Scripts**: Added `publish:ovsx` and `publish:all` commands with `--no-dependencies` bundler isolation to `package.json` to enable automated dual publishing to both VS Code Marketplace and Eclipse Open VSX.
- **Pre-Publish Dual Collision Verification**: Hardened `scripts/prepublish_check.js` to ensure version availability and manifest parity across both registries simultaneously before publishing.

### 🛡️ DevSecOps & License Protection Hardening
- **CI License Integrity Guard**: Fixed `.github/workflows/ci.yml` to prevent overwriting the comprehensive 8.8KB Commercial EULA (`extension/LICENSE.txt`) with the root stub during continuous integration runs.
- **ESLint & TypeScript Architecture Audit**: Cleaned up all unused parameters and imports across `aiTools.ts`, `foldTools.ts`, `ioMatrix.ts`, and `motionStats.ts`, reducing compiler warnings and ensuring strict code cleanliness.
- **Exported Tool & Base Resolver**: Exported `detectActiveToolAndBase` in `foldTools.ts` for unified trajectory kinematics analysis across tools.

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
- **Industrial Variable & Declaration Sorter (`krl.sortDeclarations`)**:
  - Automatically sorts and categorizes declarations (`DECL`, `SIGNAL`, structures, enums) by type and name.
  - **Multi-bit Signal Support**: Automatically handles I/O ranges like `SIGNAL GI_Program_No $IN[17] TO $IN[24]`.
  - **Immutable FOLD Boundary Protection**: Guarantees `;FOLD` and `;ENDFOLD` blocks remain strictly isolated and never corrupted during refactoring.
  - **System `$config.dat` Safety Guard**: Whole-file sorting is strictly confined to `;FOLD USER GLOBALS ... ;ENDFOLD`, leaving all 800+ lines of KSS controller configuration 100% untouched.
  - **Controller Firmware Protection**: Accidental bulk sorting on `$machine.dat` is safely guarded.
  - **Exhaustive Real Industrial Backup QA**: Verified across 16 real customer `$config.dat` archives and hundreds of plant `.dat` files with 100% FOLD integrity.
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
