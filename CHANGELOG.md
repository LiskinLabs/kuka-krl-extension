# Changelog

All notable changes to the **KUKA KRL Extension** will be documented in this file.

## [1.8.7] - 2026-09-17 (Industrial Field Suite, Interactive Diff Preview, Point Transformer v2 & Full i18n)

### 🔍 Interactive Visual Diff Preview & User Approval (`DiffPreviewService`)
- **Native Diff Preview**: Trajectory modifications, fold conversions, code cleanup, and point offset transformations provide a visual diff preview before file modification is committed.
- **Explicit User Confirmation**: Actions require user confirmation via prompt dialogs (`✅ Apply Changes` / `❌ Discard Changes`), applied atomically via `vscode.workspace.applyEdit`.
- **Integrated Actions**:
  - `krl.convertToIiqkaFold`: Batch-converts motions into modern inline folds across movements.
  - `krl.convertLegacyToSpline`: Legacy PTP/LIN to SPLINE converter.
  - `krl.unwrapFolds`, `krl.insertCollisionGuard`, `krl.insertSplineBlock`: Trajectory and fold structural tools.
  - `krl.cleanupUnusedVariables`: Cleans or comments unused declarations in `.DAT` files with visual review.
  - `krl.removeTrailingWhitespace`, `krl.cleanGitMetadata`, `krl.sortDeclarations`, `krl.insertFold`.
  - `krl.transformPointOffsets`: Batch point coordinate transformation with full diff preview before saving.

### 📐 Batch Point Offset Transformer v2 (Full BASE Selection from `$config.dat`)
- **Robot BASE Selection**: Automatically detects and loads all configured robot bases (`BASE_DATA[1..32]`, `BASE_NAME[1..32]`) from `$config.dat` across the active workspace, as well as `BASE[0]` ($WORLD).
- **Companion .DAT Auto-detection**: Automatically loads the paired `.dat` file when opening an active `.src` program.
- **Point Base Detection**: Scans `.DAT` files for corresponding `FDAT` blocks (`BASE_NO`) and displays a dedicated blue `BASE N` badge next to each point in the table.
- **Accurate World-to-Base Kinematic Transformation**: Point offsets transformed using the inverse Euler rotation matrix $R^T_{base} \cdot \vec{\Delta}_{world}$ based on the selected robot base's $A, B, C$ angles.
- **Real-Time Projection Display**: Added live projection notice displaying resulting base displacement components ($\Delta X_{base}, \Delta Y_{base}, \Delta Z_{base}$) in real time.

### 🌐 100% Comprehensive Internationalization (i18n)
- **Automatic VS Code Language Following**: Seamlessly adopts the VS Code interface language (`vscode.env.language`) across all supported languages (RU, DE, ES, IT, TR, EN), with manual override support in settings.
- **Full Translation Parity**: Complete translation coverage across all tree view categories, command titles, and tooltips.

### 🛠️ Industrial Event Log & UI Hardening (v1.8.7 Update)
- **Instant Event Log Rendering (SSR)**: Implemented Server-Side Pre-Rendering for `.evt` logs inside `EventLogViewerPanel` — all event records are rendered directly into HTML on the extension host, ensuring 0ms instantaneous display upon opening without waiting for client hydration.
- **Content Security Policy (CSP) Compliance**: Added explicit Content Security Policy meta tags across all industrial webviews (`eventLogViewer`, `ioMatrix`, `pointOffsetTransformer`, `motionStats`), ensuring strict compatibility with VS Code / Antigravity IDE sandbox policies and permitting uninterrupted inline script execution.
- **Dedicated `.evt` File Icon in KRL Theme**: Introduced an official vector icon (`krl-evt.svg`) for KUKA event log files (`.evt`) in the Explorer file tree.
- **Unified Global Language Switching (`krl.locale` & `krl.switchLanguage`)**:
  - Added interactive QuickPick command `krl.switchLanguage` to quickly change the UI and diagnostics locale across all 6 supported languages (EN, DE, RU, ES, IT, TR).
  - Synchronized `krl.locale` setting with all industrial inspectors, status bar, and report generators.

### ⚡ Industrial Robotics Field Engineering Suite (PRO)
- **Visual I/O Signal Matrix & Overlap Detector (`krl.showIoMatrix`)**:
  - Scans workspace declarations for `$IN`, `$OUT`, `$ANIN`, and `$ANOUT`.
  - Calculates multi-bit signal spans and automatically identifies overlapping PLC hardware addresses.
  - Interactive Webview matrix with search, type filters, direct jump to source line, and CSV export.
- **Trajectory Path Length & Motion Stats (`krl.estimateMotionStats`)**:
  - Exact 3D spatial Euclidean distance calculation in meters across all motion commands.
  - Automatic classification and segmentation of PTP, LIN, CIRC, and Spline motions.
  - **Welding Cycle Intelligence**: Automatically detects `ARCON`/`ARCOFF` blocks, isolates weld seams, computes total weld seam length (mm / m), and calculates arc-on cycle time.
- **Batch Point Offset Transformer (`krl.transformPointOffsets`)**:
  - Interactive Webview panel with real-time 3D isometric coordinate schema diagram.
  - Dual reference coordinate frames: **BASE** (workpiece/fixture frame) and **WORLD** (global robot Cartesian coordinates using inverse Euler rotation matrix $R^T_{base} \cdot \vec{\Delta}_{world}$).
  - Dynamic point selection, custom point addition/removal, live before/after delta calculation, and surgical atomic updates to `.dat` files with full undo preservation.
- **Decode & View KUKA Event Log (.evt) (`krl.openEventLog`)**:
  - 100% pure TypeScript zero-dependency binary decoder for KRC Windows EVTX event logs (`KrcLogS.evt`, `KrcLogB.evt`, `KrcLogP.evt`, etc.).
  - Registered `KukaEventLogCustomEditorProvider` as the default custom editor in VS Code for `.evt` files — double-clicking any event log in the workspace opens the interactive viewer instantly.
  - Built-in offline diagnostic dictionary of official KUKA KSS CrossMeld messages across **all 6 supported languages**: EN (2,050), DE (2,051), RU (1,997), ES (2,048), IT (2,048), and TR (1,997).
  - Dynamic parameter substitution (`{0}`, `{1}`), fault severity classification (`ERROR`, `WARNING`, `INFO`, `DIALOG`), CSV/diagnostic report export, and one-click navigation to referenced KRL source files and line numbers.
- **100% Adaptive Themes & Zero Fixed Colors**:
  - Complete elimination of hardcoded/fixed CSS colors across all extension webviews.
  - Native integration with any VS Code theme via `--vscode-*` CSS variables, with explicit adaptations for Light Themes (`body.vscode-light`) and High Contrast (`body.vscode-high-contrast`).
  - Dynamic 6-language switcher (EN, DE, RU, ES, IT, TR) integrated into all industrial tools.
- **Pro Licensing Protection**: All 4 industrial engineering tools are guarded with `ensurePremium`.

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
- **Direct Support Hotline**: Replaced legacy 4-hour SLA references with direct real-time developer telepresence support via Telegram (`@kukakrlbot`).
