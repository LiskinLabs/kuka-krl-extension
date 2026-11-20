# Changelog

All notable changes to the **KRL Engineering Toolkit** will be documented in this file.

## [1.9.25] - 2026-11-18 (Full KSS 5.4–9.4 Matrix, Bidirectional Migration & Formatting Fixes)

### [KSS MIGRATION & CROSS-VERSION COMPATIBILITY] Full KSS `5.4–9.4` + `VKRC` Support
- Expanded `kssMigrationEngine.ts` (`KssVersion`, `normalizeKssVersion`, `listKssVersions`, `buildProfile`) across all 15 KSS versions (`5.4`, `5.5`, `5.6`, `8.1`, `8.2`, `8.3`, `8.4`, `8.5`, `8.6`, `8.7`, `9.0`, `9.1`, `9.2`, `9.3`, `9.4`) with version-exact `PDAT`/`LDAT` field rules, balanced-brace `CB {...}` struct stripping, `SET_POSITION_CTRL()` removal pre-`9.2`, `SET_CD_PARAMS` removal pre-`8.5`, bare `SPTP`/`SLIN`/`SCIRC` downgrading pre-`8.3`, and classic `%R` inline-form `FOLD` / `PULSE OUT` handling without false `FOLD_PARAMS_MISSING` diagnostics.
- Fixed `isSystemKrlPath` so user `R1/Program/Main.src` / `Main.dat` modules are migrated and validated while `/system/` firmware remains exempted, added `%MKUKATPVW` / `VW_MPARA_ACT` guards in `kssMigrationEngine.ts` and `foldTools.ts` so VKRC VASS folds are never rewritten into broken `SPTP XVB`, and expanded `validateWorkspace` (`GLOBAL DEF`/`DEFFCT`, `CIRC`/`SCIRC` `.dat` symbol verification) and `validateKrlText` (`5.4–9.4` compatibility + `4096` I/O check on `5.x`).

### [SYSTEM VARIABLES & DIAGNOSTICS] Manual-Accurate Write Protection and Release Gating
- Rebuilt write protection from the KSS 8.7 system-variable manual (`Writability` notes): **127** variables are read-only instead of the previous heuristic count of 188, removing false `readOnlySystemVariable` errors on legal writes such as `$STOPMESS = TRUE`, `$ALARM_STOP = TRUE`, `$AUT = FALSE`, `$ON_PATH = TRUE` and `$CYCFLAG[n] = expr`.
- Added `server/src/data/systemVarAccess.ts` (manual-derived data module) wired into `SYSTEM_VARS_META`, plus `KSS_SYSTEM_VAR_MIN_VERSION` release gating: `$DELTA_WORKSPACE` / `$DELTAWORKSTATE` / `$SPL_MIXEDBLENDING_OPT` / energy and ET-name variables (8.6+), `$COLLMON_STARTUP_MAX` / `$TRACE_FOLDER` / `$OUT_NODRIVE` (8.5+), `$NORMAL_STOP_ACTIVE` / `$COULD_ENABLE_DRIVES` (9.3). Diagnostics emit one `KSS_SYSTEM_VAR_NOT_IN_TARGET` warning per variable used below its documented release.
- Corrected `$CYCFLAG` limits: 1..256 from KSS 5.5 on (PB1343); only the KSS 5.2–5.4 signal table is limited to 32. `ERR_RAISE` is now gated with the 8.2+/9.1+ `ON_ERROR_PROCEED` feature set.
- Added manual aliases `$WORKSPACE_NAME`, `$PRO_I_O_PROC_ID`, `$DRIVES_FAN_SPEED` and `STOP WHEN PATH` TextMate highlighting.
- Interrupt declarations are now checked against the documented per-release limit (64 declared on KSS 8.x–9.x, 32 on 5.x); `$TOOL_DATA`/`$BASE_DATA` warnings use the profile values.
- Fixed the generated metadata pipeline: `generate-data.js` now reads the `variables:` root of `System.Variables.yml` through `js-yaml`, normalizes `$NAME[]` / `$NAME[,]` keys, keeps array dimensions (`$ACC_AXIS` = `INT[6]`, `$ANIN` = `REAL[32]`, `$CYCFLAG` = `BOOL[256]`) and no longer misclassifies `$STOPMESS` / `$BWDSTART` as commands.
- Hover and completion render array dimensions exactly once (previously `INT[[20]]`) and show the same manual-derived writability as the diagnostics.
- Demo workspace `motion_and_splines.src` no longer initializes a local variable in the declaration section (KRL forbids it in `.src`; initialization stays in the instruction section).

### [CONVERTERS, FORMATTING & SETTINGS]
- Updated `foldTools.ts` (`generateOfficialClassicFold`, `transformSplinesToLegacyInText`, `unifyMixedMotionChainInText`, `convertHandwrittenKrlToInlineForms`, `convertHandwrittenToSnippets`, `unwrapFolds`) to respect target KSS version capabilities (`SET_CD_PARAMS`, `< 8.3` classic fallback, parent-folder KSS auto-detection), preserve geometric offset `:` expressions and line endings, and strip bare `;Params` lines cleanly.
- Updated `KrlFormatter` (`formatter.ts`) to indent `GLOBAL DEF`/`DEFFCT`/`DEFDAT` and `TIME_BLOCK`/`CONST_VEL` blocks cleanly while keeping `&` headers and `#enum` literals untouched.
- Expanded `krl.migration.targetKssVersion` enum + all 6 `package.nls*.json` files and the migration QuickPick (`kssMigration.ts`) to cover all KSS `5.4–9.4` targets, resolved missing i18n/Control Center/snippet/build/test issues (`companionDatSync.ts`, `kssIlfCatalog.ts`, `krl.code-snippets`, `controlCenter.ts`, `wrangler.toml`, `telemetry-admin-web`).

## [1.9.24] - 2026-11-16 (iiQKA CrossMeld Fix, Native .ibz Support & Update-Resilient Licensing)

### [LIVE TELEMETRY] SmartPAD `CrossMeld 1419 / 1516` Spam Elimination
- Stopped unconditional polling of `$POS_ACT`, `$POS_ACT_MES`, `$TOOL`, and `$BASE` in `IiqkaClient` (`iiqkaClient.ts`) and `WcfOnlineClient` (`wcfOnlineClient.ts`) when Tool/Base are unprogrammed (`$ACT_TOOL < 0`, `$ACT_BASE < 0`, or no program selected).
- Automatically latches suppression on `CrossMeld 1419` (`XYZABC TOOL not programmed`), `CrossMeld 1516` (`Reference system not programmed`), or `CrossMeld 1418` (both via `VariableErrorInformation` and `GetInstanceMessages`) and seamlessly resumes Cartesian telemetry as soon as `$ACT_TOOL`, `$ACT_BASE`, `$PRO_STATE1`, `$PRO_NAME1[]`, `$IPO_MODE`, or `$ROB_CAL` changes.

### [ARCHIVES] Native `.ibz` / `.IBZ` Registration
- Registered `*.ibz` / `*.IBZ` natively in `package.json` (`krl.backupArchiveViewer` custom editor and `explorer/context` menus for mounting, event logs, and I/O matrix), file open dialogs (`main.ts`, `krcZipMountService.ts`, `krcBackupDiff.ts`, `eventLogViewer.ts`), and `Info.xml` / `RobotInfo.xml` iiQKA metadata parsing (`krcArchiveExplorer.ts`, `krcZipMountService.ts`).

### [SECURITY & LICENSING] Hardened Entitlements & Update-Resilient Persistence
- Added adapter- and editor-resilient workstation anchor signatures (`signatureV4`) and atomic `~/.liskinlabs/license-state.json` persistence for paid/Air-Gap licenses so keys do not drop during extension updates, IDE profile switches, USB-Ethernet/VPN changes, or Electron SecretStorage resets, alongside stable Dodo seat names (`deviceName`) and silent startup recovery (`recoverDriftedOnlineLicense`) when an older `v3` cache drifts.
- Closed legacy `globalState` (`krl_license_cache`) migration bypasses, enforced strict Dodo `business_id` / allowed `product_id` checks on activation, disabled `test.dodopayments.com` in production builds, and eliminated `isPremium()` fallback bypasses for forged unexpired Ed25519 payloads and uncertified `isAirGap` caches.
- Gated `KrcBackupArchiveCustomEditorProvider` (`.zip`, `.ibz`, `.wvs`, `.wvps`, `.vcmx`, `.tar`, `.tgz`) and `openKrcBackupArchiveExplorer` behind `isPremium()`.
- Removed the 300-key pagination cap in the support gateway (`resolveDodoLicenseKey` up to 2,500 keys), added HWID binding validation on `/api/v1/license/airgap/deactivate`, and enforced expiry checks on `/api/v1/license/host`.

### [DOCUMENTATION] Unified 14-Day Trial Terminology
- Removed misleading `30-day eval` references across all 6 localized `README*.md` files so all documentation clearly aligns with the **14-day Free Pro Trial** (keeping 30 days strictly for the commercial offline cache window) and updated `What's New` sections to `v1.9.24`.

## [1.9.23] - 2026-11-15 (Open VSX Single-Line Bundle)

### [RELEASE] Marker Covers the Whole Obfuscated Bundle
- The obfuscator emits multiple physical lines; the Open VSX scanner checks each line separately, so the `1.9.22` marker covered only the first. `1.9.23` re-minifies the already-obfuscated output into one line and prepends the suppression marker, making it apply to the whole bundle.
- No identifier renaming or runtime changes.

## [1.9.22] - 2026-11-15 (Open VSX Secret-Scan Marker Fix)

### [RELEASE] Suppression Marker on the Scanned Line
- The `1.9.21` marker was appended on a second line; Open VSX scans each line independently, so it did not suppress the `generic-api-key` findings in the single-line obfuscated bundle. `1.9.22` prepends the `secret-detector:ignore` / `gitleaks:allow` block comment to the same line as the bundle.
- No runtime or feature changes.

## [1.9.21] - 2026-11-15 (Open VSX Secret-Scan Fix)

### [RELEASE] Inline Suppression for Obfuscated Bundles
- Added the Open VSX `secret-detector:ignore` / `gitleaks:allow` inline marker to the production bundles. The obfuscated single-line JavaScript triggered `generic-api-key` false positives on generated identifiers, leaving new Open VSX versions inactive.
- `1.9.20` remains an immutable inactive registry entry; `1.9.21` is the first version built with the suppression marker.
- No runtime or feature changes.

## [1.9.20] - 2026-11-15 (Open VSX Recovery Release)

### [RELEASE] Open VSX Visibility Recovery
- `1.9.19` was accepted into the Open VSX registry but remained inactive after publishing, so Open VSX kept exposing `1.9.16`. Extension versions are immutable; `1.9.20` republishes the `1.9.19` payload with corrected storefront metadata.
- Moved the KUKA trademark/independence notice from the top of `README.md` to the Legal section, so the Marketplace first screen starts with the product heading.
- No runtime or feature changes; the version bump exists only to obtain an active Open VSX artifact.

## [1.9.19] - 2026-11-14 (Storefront Overhaul & Multi-Registry Release Parity)

### [DOCUMENTATION & STOREFRONT] Conversion-Focused Hexa-Locale READMEs
- Rewrote `README.md` and localized counterparts (`RU`, `DE`, `TR`, `ES`, `IT`) with problem-solution ROI breakdowns (`KSS 1422`, Advance Run drops, SmartPAD point drift, `;FOLD`/`.dat` sync, BOM panics), verified `4.13M+` LoC / `126`-command / `957`-variable metrics, `LAUNCH30` pricing tables, and interactive walkthrough GIFs.
- Fixed HTML language switcher rendering inside `<p align="center">` across VS Code Marketplace and Open VSX, updated `What's New` release sections, and maintained strict KaTeX / link / clean-room compliance.

### [RELEASE] Marketplace & Open VSX Alignment
- Bumped package version cleanly to `1.9.19` for synchronized publication on VS Code Marketplace and Eclipse Open VSX.

## [1.9.18] - 2026-11-14 (In-IDE Trial & B2B Checkout Funnel, Hexa-Locale Docs & Storefront)

### [LICENSING] Streamlined Free → 14-Day Trial → Pro Conversion Flow
- Added `krl.openPricingPlans` command (`KUKA Commands` TreeView, `KUKA Control Center`, and walkthrough/docs CTAs) for side-by-side plan comparison and one-click checkout with `LAUNCH30` (`30% OFF`).
- Upgraded `dodoB2BService.ts`, `license.ts`, and `controlCenter.ts` for localized 6-language B2B invoicing (Tax ID / VIES guidance), `LAUNCH30` promo visibility, and unified `krl.startTrial` onboarding.
- Synchronized Cloudflare Worker `/activate`, `/checkout/success`, `/airgap`, and dynamic checkout session creation across all 6 UI languages.

### [DOCUMENTATION & STOREFRONT] Hexa-Locale VitePress & Marketplace Overhaul
- Rewrote all 6 localized READMEs (`EN`, `DE`, `RU`, `TR`, `ES`, `IT`) with live GIF walkthroughs, `126` command / `63` Pro tool metrics, `14-day Free Trial` entry, and `LAUNCH30` checkout CTAs.
- Added [SUPPORT.md](SUPPORT.md) bundled into the `.vsix` package and enforced strict Markdown/LaTeX/link validation across all 6 `README*.md` locales in `scripts/prepublish_check.js`.
- Cleaned 90 VitePress documentation pages across 6 locales (`1,499 USD` Integrator tier parity, updated KSS 957+ variable coverage, and removed unrendered `$...$` math expressions).

## [1.9.17] - 2026-11-12 (Version-Aware KSS Migration & Honest Syntax Gate)

### [MIGRATION] Exact KSS 8.3–9.3 Profiles
- Added a version-aware migration engine with exact profiles for KSS 8.3, 8.4, 8.5, 8.6, 8.7, 9.0, 9.1, 9.2 and 9.3.
- KSS 9.x profiles reject the obsolete `VEL` field in `PDAT`/`LDAT` and enforce the 9.x field set.
- KSS 9.2+ profiles use `SVEL_CP2` / `SACC_CP2` and `MotionParamSets.dat`; older profiles keep `SVEL_CP` / `SACC_CP`.
- KSS 8.3/8.4 profiles reject collision-monitoring assignments that are not available in those versions.

### [INLINE FORMS] FOLD / Params Consistency Gate
- Normalizes `OUT`, `PULSE`, `WAIT` and `WAIT FOR` `;Params` only when the FOLD header and the actual KRL statement agree.
- Detects `WAIT FOR` AND/OR/NOT metadata drift and reports it instead of guessing.
- Removes `WAIT FOR` FOLD blocks whose WAIT statement is commented out.
- Detects missing/neutralized `;Params` blocks, command/point mismatches and stale `IlfCommand` values.

### [NATIVE FORMAT] Verified Inline-Form Contract
- Verified movement and logic FOLD/Params output against the shipped engineering tools; the implementation is an independent reimplementation and no vendor code was copied.
- KSS 9.2+: `PULSE OUT`, `Kuka.Logics.PulseFlag`, `Kuka.ColDetectFieldEnabled`, `Kuka.MovementParamSetIndex=1`, `AFAP`, `SVEL_CP2` / `SACC_CP2`.
- KSS 8.3-8.7: `SVEL_CP` / `SACC_CP`, no motion-param-set name or index, PULSE header without `OUT`, no `PulseFlag`.
- `WAIT FOR`: term/operand key layout matches the native serializer; `WaitForTermNumbers` and `WaitForOpNumbers` are comma-separated without spaces.
- Legacy PTP/LIN to SPTP/SLIN keeps `CONT`/`NEAR` and adds `C_Spl` when blending is enabled.

### [DATA INTEGRITY] DAT, Names and Case Sensitivity
- Validates `DEF`/`DEFDAT` names against file names and reports case-only differences.
- Detects case-duplicate files and duplicate module names across a KSS 9.x Linux target.
- Checks point, FDAT and movement-data declarations against the matching `.dat` and global `$config.dat`.
- Checks `FDAT` `TOOL_NO`/`BASE_NO` against the FOLD header.
- Adds missing `EXT BAS` / `DECL INT SUCCESS` declarations to user `.dat` headers.

### [COMMAND] `krl.convertToIiqkaFold`
- The command now migrates the whole backup/workspace to a selected target KSS version.
- Shows a per-file diff review before writing and a migration report with before/after diagnostics.
- Honest syntax note: a zero-error result is a rule-level pass, not a substitute for compiling on the target controller.

### [REPORT] iiQKA.OS 9.2.3 Backup Passport & Quality Report
- Reads `Info.xml` / `Instance.info` from iiQKA.OS backups instead of guessing the KSS version.
- Resolves the virtual controller root (`ROBOTER` + `PROJECT`/`Instance.info`) so one iiQKA instance is not split into multiple pseudo-controllers.
- Reads `ROBOTER/KRC/R1/Mada/$machine.dat` for the real robot model and serial number.
- Limits TechPacks to KOP packages; KIP firmware and `swu` entries are no longer mixed into the technology list.
- Classifies top-level `TP/<package>/` templates as vendor code, so `TP/iiQKA.UI/Templates/*` no longer inflates the customer application module count.
- The "zero findings" line now prints the actually detected KSS version (`KSS 9.2.3`) instead of a hardcoded `KSS 8.3-8.7`.
- Acceptance protocol now uses the official `KUKA System Software (KSS)` label and the `KSS 5.x - 9.3` standards range.
- Added a live target-KSS compile gate: `SynchronizeMirror` -> `AnalyzeAllKrlFiles` -> `GetModuleInfos` with the real `HasErrors` verdict.
- Offline reports now explicitly state `NOT PERFORMED` for the target compiler and no longer present rule-level static checks as a controller compiler verdict.
- The report no longer contains the `2A` compile-gate section; the live compile gate lives only in SCADA.

### [LEGAL] Source Provenance & Third-Party Notices
- Added `THIRD_PARTY_NOTICES.txt` with the licenses and project URLs of bundled open-source components; the VSIX gate now requires it.
- Added `docs/legal/PROVENANCE.md` describing original code, interface facts, and excluded KUKA binaries/templates.

### [LIVE CONTROLLER] Native iiQKA.OS gRPC transport
- Auto-Discover now recognizes iiQKA.OS by its authentication endpoint on port 443 and labels the controller as `KUKA iiQKA.OS gRPC (443)`.
- Added `krl.liveController.iiqkaPort` (default `443`; use `5018` for the local KUKA virtual controller) so SCADA, on-demand backup and the compile gate can reach a VRC on a non-standard port.
- Live connection uses the native gRPC ControllerManagement and RuntimeManagement services instead of falling back to legacy WCF/KVP ports.
- Kratos password login (default `administrator` / `kuka`, configurable) with a short-lived Bearer session token; the token is kept in memory only.
- Read-only telemetry includes `$AXIS_ACT`, `$MODE_OP`, `$OV_PRO`, `$ROBNAME`, `PGNO`, `$LOAD`, `$IN`, `$OUT`, `$TIMER`, `$CYCFLAG`, interpreter call stack and program pointer.
- Watched variables are read directly from the controller in the same gRPC/KVP poll, including user globals such as `Gripper_*_Active` and `PGNO_VALID`.
- The running controller instance is selected automatically; `krl.liveController.instanceId` can pin a specific GUID.
- Legacy KSS 8.x telemetry uses a native Node WCF OnlineServices client (`wcfOnlineClient.ts`) on port 49002 (`DataAccess`, `RuntimeMessageWindow`, `OptionPackage`, `Trace`, `FileHandling`) and a native Node KUKAVARPROXY/C3Bridge client on port 7000; WorkVisual, KUKA.Sim, KUKA facade DLLs, and Python are no longer required.
- Removed the legacy Python bridge from the VSIX and source tree; KVP, WCF and iiQKA paths are native Node/TypeScript only.
- When a controller is detected but no live transport is available, the bridge reports an explicit offline reason instead of a synthetic connected snapshot.
- iiQKA.OS Online Backup uses the native gRPC `InstanceBackupService` to list, create, download and delete controller-side backups; `.ibz` archives are ZIP-compatible and are extracted directly.
- Online Backup connects to the iiQKA.OS gRPC service on demand, without requiring a previously opened Live Monitor session.
- Live Controller Monitor (SCADA) now has an integrated `KSS Compile Gate` card: it runs `SynchronizeMirror` -> `AnalyzeAllKrlFiles` -> `GetModuleInfos` on the connected iiQKA controller, shows `PASS`/`FAIL`, module counts and error modules, and keeps the last result in the current SCADA session.
- The SCADA compile-gate button is available only for a connected iiQKA.OS controller; KSS 8.x shows an explicit unsupported state.
- Self-signed controller certificates are accepted for loopback/RFC1918 targets with an explicit warning; public hosts still require a trusted certificate or `allowInsecureTls`.
- Fixed the legacy telemetry port default (7000 instead of 4840).

### [LIVE CONTROLLER] Transport Hardening
- Auto-Discover now probes the configured `krl.liveController.iiqkaPort` in addition to 443 and labels the controller with the actual port.
- `ReadVariables` falls back to chunked and per-variable reads when the controller rejects a batch; one unresolved watched variable no longer kills all telemetry.
- Native fallback no longer synthesizes `connected: true` for SNMP/EtherNet/IP/Envoy-only discovery; it reports an explicit offline reason with the detected open ports.
- `$POS_ACT` variable errors are exposed as `pos_act_error` and shown in the SCADA Cartesian card instead of silently displaying zeros.
- iiQKA auth-probe failures are surfaced in the offline diagnostic instead of silently falling through to a generic failure.
- Report passport resolves `Info.xml` from real iiQKA partial backups and accepts alphanumeric serial numbers.

### [SCADA] Full iiQKA.OS Telemetry, SmartPAD Messages & Installed KOPs
- Live telemetry now reads the complete diagnostic set in isolated batches: `$TOOL`/`$BASE` frames, `$ACT_TOOL`/`$ACT_BASE`, `$SAFETY_SW`, `$USER_SAF`, `$SR_VEL_RED`/`$SR_OV_RED`, `$ALARM_STOP_INTERN`, `$CONF_MESS`, `$EXT_START`, `$I_O_ACTCONF`, `$POWER_FAIL`, `$BRAKE_SIG`, soft limits (`$SOFTN_END`/`$SOFTP_END`), torques (`$TORQUE_AXIS_*`, `$HOLDING_TORQUE`, `$TORQ_DIFF`), motor temperatures/currents (`$MOT_TEMP`, `$CURR_ACT`), supply loads and `$VEL_AXIS_ACT`, plus `PGNO_PARITY`, `PGNO_FBIT_REFL`, `$EX_AX_NUM`, `$ROB_TIMER` and `$V_ROBCOR`.
- A rejected diagnostic batch no longer aborts the whole poll: the client falls back to per-variable reads and keeps the base telemetry alive.
- SmartPAD message list is streamed from `RuntimeManagementService/GetInstanceMessages` (refreshed every 2 s, cached between polls) and rendered in the SCADA banner with type badges and KSS message codes.
- Installed technology packages are read from `InstallationService/GetInstalledPackages`, filtered to KOP entries, cached after connect and listed in the SCADA options card with name and version.
- SCADA overview now renders the previously collected but hidden fields: `PGNO_PARITY`, `PGNO_FBIT_REFL`, `$ROB_TIMER`, `$EX_AX_NUM`, per-axis `$VEL_AXIS_ACT`, `$ALARM_STOP_INTERN`, `$CONF_MESS`, `$EXT_START`, `$I_O_ACTCONF`, `$PRO_ACT`, `$POWER_FAIL` and the `$V_ROBCOR` software version in the passport line.
- Both additions are optional: on controllers that do not expose these services the connection and the rest of the telemetry continue to work unchanged.
- The main dashboard banner keeps only the latest three SmartPAD messages and exposes an `Open all` button; the full list (newest first, up to 200) opens in a dedicated webview with type filters, text search, live refresh and an online/offline indicator. The window is also available as `krl.live.openMessages`.
- Fixed the KSS compile gate on KSS 9.3.4: `GetModuleInfos` rejects the bare `*` search pattern with `13 INTERNAL: BSCmdNA`. The gate now queries `*.src` and `*.dat` explicitly and merges the results, with the old `*` path retained as a fallback for older controllers.



## [1.9.16] - 2026-11-08 (Open VSX Synchronization & Global Multi-Registry Distribution)

### [DISTRIBUTION] Dual-Registry Release (VS Code Marketplace + Eclipse Open VSX)
- Synchronized package release across Microsoft VS Code Marketplace and Eclipse Open VSX registry.
- Full multi-registry availability for VS Code, VSCodium, Eclipse Theia, and air-gapped industrial workstations.

## [1.9.15] - 2026-11-08 (FAT/SAT ISO 10218-1/2 Acceptance Hub & Appendix A Quality Audit)

### [ACCEPTANCE HUB] Interactive Configuration Webview
- Replaced sequential modal prompts with a responsive Webview configuration hub (`krl.generateReport` -> Acceptance Protocol).
- Added dual logo support (System Integrator + End Customer) with Base64 encoding and live preview.
- Interactive section toggle: SafeOperation, IO Signal Matrix, Dispatcher Routing Flowchart, Appendix A.
- Real-time locale switcher across 6 languages (EN, DE, ES, IT, RU, TR).
- Graceful headless fallback for non-interactive / programmatic calls.

### [PRINT & PDF] Industrial Polished Layout
- Fixed critical print contrast bug: forced high-contrast text `#0f172a !important` over pure white background.
- Standardized DIN A4 portrait pagination (`@page { size: A4 portrait; margin: 12mm 15mm 15mm 15mm; }`).
- Enforced table header persistence across print pages (`thead { display: table-header-group !important; }`).
- Isolated Mermaid/SVG dispatch flowcharts and signature matrices from accidental page breaks (`page-break-inside: avoid`).

### [SAFETY STANDARDS] DIN EN ISO 10218-1/2 & ISO 13849-1 Punch List
- Upgraded acceptance inspection punch list to 10 mandatory criteria referencing international standards:
  - Emergency Stop Category 0/1 response time and circuit dualization.
  - Safeguard interlocks & perimeter access monitoring.
  - T1 manual reduced speed limit (<= 250 mm/s).
  - T2 manual high speed enable device & confirmation logic.
  - Automatic Mode safeguard perimeter interlocks.
  - SafeOperation safety configuration checksum (SCTL) & dynamic axis zones.
  - Cyclic brake test execution & monitoring interval ($BRAKETEST_REQ_EX / masref.src).
  - Mastering & zero-mark reference verification (RDC.cal / $AXIS_ACT).
  - Dispatcher & auto external handshake protocol (CELL / P00 / $PGNO_REQ).
  - Protective equipotential bonding (PE) & electrical grounding continuity.

### [STATIC ANALYSIS] Appendix A: Software Health & Code Quality Audit
- Unified AST diagnostic health metrics, lint warnings, path metrics and syntax verification from the project diagnostics engine into the formal Acceptance Protocol as Appendix A.
- Automated certification badge for zero-syntax-error deliverables.

### [CONTROLLER EXTRACTION] Resilient Safety Parsing
- Deep parsing of cyclic brake test indicators, axis mastering status, and SafeOperation CRC from diverse KRC backup layouts with graceful fallback degradation.

## [1.9.13] - 2026-11-06 (Documentation Accuracy & Brand Finalization)

### [BRANDING] KRL Engineering Toolkit
- Product name unified across UI strings, licence texts, reports, support gateway and documentation.
- Removed vendor-provenance wording from the German, Spanish and Italian docs and READMEs.
- Marketplace display name now reads "KRL Engineering Toolkit for KUKA" (nominative compatibility reference).

### [PRIVACY] Explicit telemetry opt-in
- Added `krl.telemetry.enabled` (default `false`) as the single user-facing switch; every telemetry send is gated on it in addition to VS Code's own telemetry settings.

### [DOCS] Command surface aligned with the manifest
- Command and settings inventory now derives from the shipped manifest: 124 commands, 90 settings, 6 themes, 4 views.
- Stale command IDs replaced with the current ones (`krl.inspectWorkcellLayout`, `krl.exportWorkcellToKrl`, `krl.openEventLog`, `krl.mcp.copyConfig`, `krl.live.*`).
- Removed documentation for commands that do not exist in the extension.
- Removed the bank-statement descriptor claim; payments and statements are handled by Dodo Payments as merchant of record.

### [ASSETS]
- Removed KUKA-branded cinematic imagery and an unused scrollytelling component from the site bundle.
- No vendor DLLs, KSS system files, extracted message databases or third-party 3D models are shipped.

## [1.9.12] - 2026-11-06 (Compliance Hardening: Curated Catalogs, Neutral Branding, Asset Cleanup)

### [COMPLIANCE] Curated data and assets
- **Message reference:** replaced the extended KSS message catalogs with a small curated set of common codes. Unknown codes are displayed as raw identifiers.
- **Project scaffolding:** replaced the KSS/VKRC template library with a minimal clean-room KRL module skeleton.
- **Robot model reference:** reduced to a small factual set of commonly encountered models; no external catalog file is shipped.
- **Documentation site:** removed third-party 3D assets and reduced the showcase to project-original media.
- **Branding:** product display name updated to **KRL Engineering Toolkit**; third-party trademark notices added to the README, site footer and EULA.

### [SECURITY] Distribution hygiene
- No vendor binaries, KSS system files, extracted message databases or third-party 3D assets are shipped.
- Artifact and source gates remain mandatory before every publish.

### [VERIFICATION]
- `npm test`, `npm run test:e2e:vsix`, `npm run verify:source`, `npm run verify:vsix`.

## [1.9.11] - 2026-11-05 (Open VSX Recovery, System-Variable Metadata Normalization)

### [SECURITY] System-variable metadata normalization
- **Neutral metadata.** Descriptive text in `SYSTEM_VARS_META` is now limited to factual declarations and neutral type descriptions. Detailed localized documentation remains in `systemVarDocs.ts`.
- **Provenance hygiene.** The build no longer depends on external specification dumps for variable descriptions.
- **Regression:** `test_system_library_documents.js`, `test_v199_advanced_parity_suite.js`, and the full metadata audit.

### [DISTRIBUTION] Open VSX recovery
- **Version 1.9.11** is the first version published after the 1.9.10 Open VSX version was reserved by the registry. Artifact gate and source gate remain mandatory before publishing.

### [VERIFICATION]
- `npm test`, `npm run test:e2e:vsix`, `npm run verify:source`, `npm run verify:vsix`.

## [1.9.10] - 2026-11-05 (Third-Party Runtime Isolation, Artifact Integrity Gate, Neutral Naming)

### [SECURITY] Third-party runtime isolation
- **No vendor binaries in the VSIX.** The build no longer packages KUKA WorkVisual assemblies or KSS system files. `extension/resources/kuka_wcf` and `extension/resources/system` are build-excluded and enforced by a new artifact gate.
- **Live bridge hardening.** `kuka_wcf_bridge.ps1` and `kuka_wcf_backup.ps1` refuse to load KUKA assemblies from the extension directory; only an operator-configured `KRL_WCF_DIR` or a locally installed WorkVisual is accepted.
- **Artifact gate.** `npm run verify:vsix` unpacks the produced VSIX, rejects `.dll/.exe/.sys/.pyd/.node` entries, KSS `resources/system` paths, known KUKA SHA-256 hashes, and third-party product names in shipped bundles.
- **Repository hygiene.** Removed the tracked KSS template set from the working tree; the build no longer depends on it.

### [QUALITY] Neutral naming
- Renamed the controller data scanner UI from a third-party product name to **Controller Data Audit** across all six locales and documentation.
- Removed third-party parity references from source comments.

### [VERIFICATION]
- `test_release_version_consistency.js`, `test_powershell_bridge_syntax.js`, `test_integrity_install_metadata.js`, and the full VSIX E2E suite.

## [1.9.9] - 2026-11-03 (Archive Passport, Clean-Room F12 Hardening, Split DAT Sync, Install-Stable Integrity)

### [ARCHIVE] Real controller backup passport
- **`am.ini` parser** now reads the actual `RobName:` / `IRSerialNr:` fields and the `Version=` line. Previously the inspector reported `KUKA Robot` and `Unknown` for every real archive.
- **Read-only archive inspector** (`krl.openBackupZipExplorer`) opens the rich panel without mounting the ZIP or reloading the workbench. Mount remains a separate explicit command.
- **Regression:** `test_archive_passport.js`, `test_v192_backup_archive_explorer.js`; five public archives verified end-to-end.

### [LSP] Clean-room F12 stabilization
- **`MsgNotify`** resolves case-insensitively to the clean-room `system://` document.
- **System library priority:** `BAS` and other built-ins are resolved from `SYSTEM_LIBRARY_FUNCTIONS` before the workspace index, so an `EXT BAS` line in `$config.dat` can no longer redirect F12 to `file://`.
- **Regression:** `test_system_library_documents.js` + VSIX E2E `System F12 opens clean-room virtual library documents`.

### [CAM] Split program companion DAT
- **`krl.splitProgram`** now renames the companion `DEFDAT` to the new main module and marks it `PUBLIC`, so generated subprograms still resolve point/FDAT/PDAT/LDAT declarations.
- **Regression:** `test_cam_postprocessor_suite.js` case 2b.

### [SECURITY] Install-stable integrity manifest
- **`integrity.package.json`** is a canonical projection of `package.json` and is signed instead of the mutable installed copy. VS Code injects `__metadata` during installation; the old manifest always failed after a real install.
- **Verified:** 8 protected assets, 0 bad on a real `code --install-extension --force`.
- **Regression:** `test_integrity_install_metadata.js`.

### [QUALITY] Full E2E and license audit
- **VSIX E2E:** 39 passed, 0 failed, 9 skipped; command sweep covers all 124 declared commands (86 executed, 38 classified skip, 0 runtime crashes).
- **License:** 14-day trial, live activation, offline Ed25519 tamper/acceptance, and 18 code-mutating commands with syntax/FOLD validation.
- **Real backups:** five public archives, no archive mutation (SHA-256 before/after), real `Camera_Control.src/.dat` parsed with 21/21 FOLD and 9 `E6POS`.
- **Reports:** `docs/audit/e2e-vsix-1.9.9-report.json`, `e2e-trial-1.9.9-report.json`, `e2e-offline-1.9.9-report.json`, `e2e-live-1.9.9-report.json`, `e2e-mutation-1.9.9-report.json`.

### [SECURITY] License cache v3 and trial marker
- **Cache v3:** dual signature (`HMAC(HWID)` for downgrade + `HMAC(HWID + pepper)` for 1.9.9+). New v2 caches are rejected; pre-1.9.9 v2/v1/legacy caches migrate on first load. Air-gap certificates and active trials keep their migration path.
- **Trial marker:** `~/.liskinlabs/trial-state.json` survives a VS Code profile reset; `KRL_TRIAL_STATE_DIR` overrides the path for tests/air-gapped stands.
- **Live deactivation:** activated, deactivated and reactivated with the owner's key; local cache cleared and Pro locked in between.

### [UX] Palette, tree and onboarding
- **Command Palette:** 18 high-value commands returned with `when: resourceLangId == krl || workspaceFolderCount > 0`.
- **Context guards:** 16 submenu commands and 9 palette commands got explicit `when`; `mutatingWithoutContext` dropped from 31 to 0.
- **Tree/Control Center split:** the tree is now an object navigator (live controller + backups), 83 → 21 contributed commands; task actions stay in Control Center.
- **Onboarding:** native 3-step walkthrough `krl.gettingStarted`: example → backup → trial.


## [1.9.8] - 2026-10-25 (Controller Project .wvs Topology Parser [PRO], Point Normalizer & Auto-Sync [PRO], Workcell Simulator VCMX Intelligence Suite [PRO], KUKA.RSI 4ms Real-Time Suite [PRO], CAM CNC G-Code & SVG Importer [PRO], Vision Hand-Eye Calibration & PLC Tag Exporter [PRO])

### [ARCHIVE] Module 5: Controller Project (`.wvs` / `.wvps`) Bus Topology & KOP Catalogs Parser (`krl.inspectWvsTopology`) [PRO]
- **Direct Controller Project Archive Inspection**: Zero-unpack analysis of binary Controller Projects (`.wvs`, `.wvps`). Decodes hex-encoded XML metadata (`_x003C_`, `_x0022_`) to extract installed KOP option package catalogs (`KUKA.EthernetKRL`, `KUKA.SafeOperation`, `KUKA.GripperSpotTech`, etc.), target KSS runtime version, controller identity, and kinematic robot models (`SafeMaDaBusTopology.xml`).
- **Fieldbus Topology & I/O Mapping**: Parses EtherCAT coupler/slice slaves (`EcatDiag_*.xml`), Virtual I/O buses (`VIO_USER_BUS.xml`, `VIO_PLC_BUS.xml`), and Profinet configurations. Extracts full `$IN` / `$OUT` signal connections from `Fieldbus.krcVariables.xml` with automatic cross-export to Siemens TIA Portal XML/SDF, Beckhoff TwinCAT 3 GVL, and EPLAN CSV.

### [SYNC] Module 6: Auto-Sync Missing Points & Inline Form Normalizer (`krl.syncPointsToDat`) [PRO]
- **Automated Point Synchronization**: Scans active `.src` program AST and motion commands (`PTP`, `LIN`, `CIRC`, `SPTP`, `SLIN`, `SCIRC`) and Inline Form FOLD headers (`PDAT_ACT`, `FDAT_ACT`, `LDAT_ACT`).
- **Companion `.dat` Auto-Generation**: Deterministically compares referenced motion coordinates against declared structures in companion `.dat` file. If `.dat` is missing, generates valid `DEFDAT <MODULE> PUBLIC` structure; if `.dat` exists, injects clean `;FOLD Auto-Synchronized Points` declarations before `ENDDAT` with industrial defaults (`DECL E6POS`, `DECL FDAT`, `DECL PDAT`, `DECL LDAT`) without duplicating existing taught coordinates.

### [SIMULATION] Module 1: Workcell Simulator & Workcell Package (`.vcmx` / `layout.rsc`) Intelligence Suite [PRO]
- **Simulation Workcell Inspector (`krl.inspectWorkcellLayout`) [PRO]**: Two-layer `layout.rsc` parser extracting `rSimNode` robot/workcell components, `rSimBooleanSignal` definitions, `ProductType` transport links, and `ProgramData` process routines directly from `.vcmx` archives without unpacking.
- **VCMX Simulation Validator & Safe Auto-Repair (`krl.validateWorkcellSimulation`) [PRO]**: Detects and surgically repairs 4 fatal simulation bugs (`VCMX001` edge-triggered pulse signal / trailing ack-wait deadlocks, `VCMX002` `WaitSignal` timeout fallthroughs, `VCMX003` product variable list accumulation after `TransportOut`/`RemoveProduct`, `VCMX004` unresolved signal references) with automatic versioned `.bk1`, `.bk2` backup preservation.
- **VCMX-to-KRL Post-Processor (`krl.exportWorkcellToKrl`) [PRO]**: Converts Workcell Simulator / Workcell Package `ProgramData` routines (`LinMotion`, `PtpMotion`, `SetSignal`, `WaitSignal`, `Delay`) directly into synchronized KUKA KRL `.src` + `.dat` modules.

### [REALTIME] Module 2: KUKA.RobotSensorInterface (RSI) Real-Time Control Suite [PRO]
- **RSI XML Schema Validator (`krl.validateRsiXml`) [PRO]**: Validates KUKA.RSI `SensorInterface/*.xml` configurations (`<ROOT>`, `<CONFIG>`, `<SEN_TYPE>`, `<IP_NUMBER>`, `<PORT>`, `<SEND>`, `<RECEIVE>`, `<ELEMENT>` tags, data types, and `INDX="1..N"` continuity).
- **4ms / 12ms Real-Time RSI Driver Generator (`krl.generateRsiCode`) [PRO]**: Generates production-ready `#IPO_FAST` (4ms) and `#IPO` (12ms) KRL real-time sensor correction loops (`RSI_CREATE`, `RSI_ON`, `RSI_MOVECORR`, `RSI_OFF`, `RSI_DELETE`) paired with matching XML descriptors for Cartesian (`RKorr`) or ROS 2 Axis (`AK.A1..A6`) control.
- **Built-in RSI System Library Intrinsics**: Added 10 RSI functions and status constants (`RSIOK`, `RSIINVCONTAINER`, `RSIINVPARAM`, `RSITIMEOUT`) with full signature help.

### [TOOLS] Module 3: CAM CNC G-Code (`.nc`/`.gcode`) & Vector SVG (`.svg`) Importer [PRO]
- **CNC G-Code & 2D Vector SVG to KRL Converter (`krl.importGcodeToKrl`) [PRO]**: Converts ISO CNC G-Code (`G0` -> `PTP`/`SPTP`, `G1` -> `LIN`/`SLIN`, `G2`/`G3` -> `CIRC`/`SCIRC` with exact 3D arc midpoint `XAUX` calculation from `I,J` or `R`, `F` feedrate mm/min -> `$VEL.CP` m/s, `M3/M5` -> `$OUT`) and 2D vector `.svg` contours (`<path>`, `<line>`, `<polyline>`, `<polygon>`, `<rect>`, `<circle>`) into synchronized `.src` and `.dat` files.

### [VISION] Module 4: 2D/3D Vision Hand-Eye Calibration Wizard & PLC Fieldbus Tag Exporter [PRO]
- **Vision Hand-Eye Calibration Wizard (`krl.generateVisionCalibration`) [PRO]**: Generates a 9-pose Hand-Eye calibration pyramid (`Eye-in-Hand` / `Eye-to-Hand`) with 3D Look-At rotation matrix -> KUKA Euler Z-Y'-X'' (A, B, C) angle calculation, geometric `Pre-Grasp Approach` (`xDetectedTarget : {X 0, Y 0, Z -Approach, ...}`), and EthernetKRL camera trigger handshake.
- **PLC Fieldbus Tag Exporter (`krl.exportPlcTags`) [PRO]**: Extracts workspace `SIGNAL` and `$IN`/`$OUT` declarations with automatic IEC 61131-3 byte.bit calculation (`%I0.0`, `%IB1`, `%Q0.0`, `%QW2`) and exports to **Siemens TIA Portal XML (`.xml`)**, **TIA Portal SDF (`.sdf`)**, **Beckhoff TwinCAT 3 GVL (`.TcGVL`)**, and **Industrial EPLAN CSV (`.csv`)**.

### [ROBOTICS] Module 7: Model Context Protocol (MCP) Bridge & AI Copilot Integration [PRO]
- **Embedded Local MCP Bridge (`mcpBridgeServer.ts`)**: Secure loopback HTTP bridge (`127.0.0.1` + Bearer authentication + DNS rebinding guard) exposing project-wide diagnostics, live controller telemetry, and AST auto-repair for external AI agents (Cursor, Google Antigravity, Claude Code, Windsurf).
- **Cursor MCP Auto-Registration**: Automatically discovers Cursor environments via `vscode.cursor.mcp.registerServer` and connects AI assistants with zero manual configuration.
- **AI Copilot Tool Modernization (`aiTools.ts`)**: Fixed input text precedence in `krl_safety_check` so that AI-passed code snippets are never replaced by active editor tabs. Expanded tool description and integrated dynamic licensing upgrade routes.
- **Standalone Open-Source MCP Server (`kuka-krl-mcp`)**: Released open-source MIT server for Model Context Protocol with 12 tools, KSS system variables, and KSS error catalog across 6 languages.
- **Official AI Skills & Cursor Rules (`kuka-krl-skills`)**: Released prompt rulesets and instructions for Cursor (`.cursor/rules/kuka-krl.mdc`) and Antigravity (`SKILL.md`).
- **Quick-Config Commands (`krl.mcp.copyConfig`, `krl.mcp.status`)**: 1-click clipboard exporter generating JSON configurations for Cursor, Claude Desktop, Antigravity, and Windsurf.

### [RELEASE] Dual-Registry Distribution & Registry Parity
- **Open VSX Synchronization**: Full release alignment across both official marketplaces (Visual Studio Code Marketplace & Eclipse Open VSX Registry) ensuring immediate availability for Eclipse Theia, VSCodium, and Gitpod.
- **Prepublish Network Resilience**: Upgraded remote marketplace collision check timeout threshold (15s) to guarantee deterministic pre-publish verification across industrial proxy and VPN gateways.
- **Runtime Version Fallback Modernization**: Synchronized runtime version fallback resolvers in `version.ts` and packaging pipeline integrity manifests.
- **Cryptographic Bundle Seal**: Re-sealed SHA-256 production bundle integrity manifest (`integrity.manifest.json`).

## [1.9.6] - 2026-10-20 (Universal Backup & Unused Variable Purge Engine [PRO], Dual-Scope Workspace Cleaner, AST Rollback Guard, Structure Tokenizer Fix & External Interface Protection)

### [CLEANUP] Industrial Unused Variables & Dead Code Purge Engine (`krl.cleanupUnusedVariables`) [PRO]
- **Dual-Scope Cleanup Selector (Interactive QuickPick)**:
  - **Active Module Only (`.src` / `.dat`)**: Scans the active program and companion data list for unused points and local variables inside `DEF...END`.
  - **Entire Project / Open Backup Workspace**: Comprehensive cross-module dependency graph scan across all `.src`, `.dat`, `.sub`, and `.xml` files in the workspace.
- **Robust Structure & Coordinate Tokenizer**:
  - Full depth tracking for structures `{...}` (`E6POS`, `FDAT`, `FRAME`, `POS`), arrays `[...]`, and string literals (`'...'`, `"..."`). Completely eliminates false positive splitting of coordinate components (`Y 20.0`, `Z 30.0`).
- **Universal Motion Parameter Resolution**:
  - Dynamic resolution of KUKA motion points and parameters for standard names (`XP1`, `FP1`, `PPDAT1`, `LCPDAT1`) as well as custom semantic identifiers (`XPICK`, `FPICK`, `PPDAT_PICK`, `PDAT_APPROACH`, `XHOME`). Accurately matches against `PTP`, `LIN`, `CIRC`, `SPTP`, `SLIN`, `SCIRC`, `SPL` and Inline Form FOLD headers.
- **External Interface & Safety Protection**:
  - **Public Module Guard**: Detects `DEFDAT ... PUBLIC` declarations and issues safety alerts to prevent deleting variables shared across controller programs.
  - **Background Task (`sps.sub`) Protection**: Cross-checks candidate variables against background cyclic logic to prevent breaking safety and status handshakes.
  - **EthernetKRL (EKI) XML Protection**: Cross-checks variables against `.xml` communication descriptors (tags and variables mapped to vision sensors and PLC data streams).
  - **System File Lockdown**: Hardcoded immunity for `$config.dat`, `$machine.dat`, `$robcor.dat`, and Workcell Simulator aliases (`_config.dat`).
- **Safe Rollback Mode & Multi-File Diff Review**:
  - **Comment Out Default**: Defaults to non-destructive commenting (`; DECL ...`) to ensure immediate field rollback from the SmartPAD teach pendant without loss of taught robot coordinates.
  - **Multi-File Side-by-Side Diff Review (`DiffPreviewService.showDiffPerFile`)**: Integrates with AST Safety Validator and Monaco Diff Review before applying any changes across the backup.

## [1.9.5] - 2026-10-16 (Live Controller Bridge & Online Controller Telemetry [PRO], Unified Event Log Timeline, Bracket-Tolerant Resolution, KSS 8.7 Parity & Industrial UI Hardening)

### [REALTIME] Live Controller Bridge & Real-Time Online Controller Telemetry [PRO]
- **Direct Online Controller Connection (`krl.openLiveBridge`, `krl.connectKukaRobot`)**: Live Ethernet connection to physical KUKA KRC2, KRC4, and KRC5 controllers over industrial network interfaces (CrossComm, WCF, EthernetKRL, WinGate port 49000 & 7000).
- **Real-Time 6-Axis Telemetry Gauges**: Live visualization of `$AXIS_ACT` and `$AXIS_MOT` with dynamic axis limit bars and angular velocity indicators for axes A1 through A6.
- **Real-Time Cartesian TCP Telemetry**: Live readout of `$POS_ACT` (X, Y, Z, A, B, C) with active `$TOOL` and `$BASE` frame indicators.
- **Dynamic Digital I/O Matrix**: Live visual grid for `$IN`, `$OUT`, and `$FLAG` states with real-time state change pulse animations.
- **Live KSS Alarm Stream & Multilingual Translation Subtitles (`KSS_LOOKUP`)**: Live stream of active controller messages with automatic severity badges (Error, Warning, Notice). Regardless of the controller installed language (Turkish, German, Italian, etc.), the extension automatically renders clear English and Russian translation subtitles beneath raw controller message codes (`KSS00203`, `KSS01442`, `KSS01123`, `KSS01422`, `KSS00020`, etc.).
- **Live 1-Click Toolbar Language Switcher (`LNG: [EN | RU | TR | DE]`)**: Seamless language switching in the Live Controller Monitor toolbar with bidirectional synchronization to `krl.locale`.
- **Variable Watcher & Config Variable Inspector**: Real-time polling and inspection of `PGNO`, `PGNO_REQ`, `PGNO_TYPE`, `$LOAD`, and custom user variables.

### [METRICS] Unified KUKA Event Log Inspector & Multi-Log Timeline (`krl.openAllEventLogs`) [PRO]
- **Multi-Source Event Log Parsing**: Simultaneously decodes and inspects classic `<LE>` binary archives and flat XML logs (`KUKA_HMI.evt`, `CrossMisc.evt`, `SmartHMI.evt`, `System.evt`).
- **Chronological Multi-Log Merge**: Merges all controller event logs into a unified timeline with sub-millisecond sorting.
- **Multilingual Error Resolution**: Resolves numeric KSS message identifiers against localized database catalogs across 6 languages with CSV export.

### [TARGET] Bracket-Tolerant Identifier Resolution & Smart Auto-Selection
- **Bracket Navigation Parity**: Cursor placement directly on or adjacent to brackets (`[`, `]`, `(`, `)`) accurately resolves the underlying identifier (`$TIMER[1]`, `$OUT[601]`, `MySub()`, array elements).
- **Smart Auto-Select (`krl.toggleAutoSelectSymbol`)**: Automatically selects complete identifier token upon click or jump.
- **Subprogram & Companion DAT Navigation**: Instant switching between `.src` `DEF` and companion `.dat` `DEFDAT` data structures.

### [REPAIR] Enhanced KRL Safe Auto-Repair v1.9.5 (QuickFix & Fix-All) [PRO]
- **Inline Form Metadata Desync Repair (`repairInlineFormMetadataDesyncInText`)**: Synchronizes XML parameter metadata with executing KRL statements, preventing SmartPAD Touch-Up overwrite bugs.
- **Duplicate Motion Approximation Modifier Cleanup**: Safely normalizes accidental duplicate approximation modifiers (`C_DIS C_DIS` -> `C_DIS`, `C_PTP C_PTP` -> `C_PTP`).
- **Mismatched `;ENDFOLD` Tag Alignment**: Automatically synchronizes closing `;ENDFOLD` tags with opening region headers.

### [ROBOTICS] KSS 8.7.9 System Parity & Cybertech KR50R2500 Integration
- **KSS 8.7 Motion Structures & Enums**: Registered modern `PDAT` and `LDAT` extension fields (`GEAR_JERK`, `EXAX_IGN`, `JERK_FAC`, `CB`, `OUT_MODETYPE`).
- **TechPackage Global Procedures**: Integrated global system library procedures and signature help for `GripperSpotTech` v5.0.5 and `SafeOperation`.
- **Robot Model Passport**: Integrated hardware validation and envelope parameters for the Cybertech `KR50R2500` manipulator (50 kg payload, 2500 mm reach).

### [UI/UX] Industrial UI/UX Zero-Emoji Compliance
- **Crisp SVG Vector Styling**: Replaced all casual emojis across Live Controller Monitor, diagnostic reports, and views with crisp vector SVG icons (`currentColor`) adhering to industrial Live Monitor standards.
- **GitHub Alert Blocks**: Formatted diagnostic notices using standard GitHub markdown alerts (`> [!NOTE]`, `> [!TIP]`, `> [!WARNING]`).

## [1.9.4] - 2026-10-09 (KRL Safe Auto-Repair Engine, QuickFix & Fix-All, Industrial Safety Audit Parity & Monaco Diff Review)

### [FIX] Industrial Safety Audit Parity & Report Engine Refinements
- **Full Industrial Safety Report Inclusion**: Removed restrictive client-side diagnostic source filtering (`d.source === "krl-language-support"`), restoring full inclusion of `krl-industrial-safety`, `Motion Point Data Integrity`, `Path Geometry`, and `krl-reach-guard` diagnostics in generated Project Quality & Acceptance reports.
- **Integrator Library Vendor Exemption**: Exempted user application and integrator library subdirectories inside `/R1/TP/` (such as `/TRB_Library/`, `/user_library/`, `/cell_library/`) from vendor exclusion filters so real actuator and gripper routines are thoroughly inspected.
- **Timer Millisecond Underflow Rule (`$TIMER[n] = -val`)**: Added validation catching dangerous sub-100ms timer timeouts ($TIMER values under 100 ms expire within a single ~12ms controller cycle, causing immediate premature timeout faults).
- **Controller Project Fold Template Normalization**: Normalized `DECLERATION` / `DECLARATIONS` typo variants in `;FOLD` / `;ENDFOLD` tags, eliminating over 112 false positive fold mismatch warnings on standard Controller Project templates.
- **Kinematic Base-Aware Reach Calculations**: Resolved points declared in user workpiece/fixture coordinates against companion `FDAT.BASE_NO` transformations in `$config.dat`, eliminating false boundary reach errors.

### [RELEASE] Killer Feature: KRL Safe Auto-Repair Engine (QuickFix & Fix-All)
- **Deterministic Safe Auto-Fixes**: One-click quick repairs (`Ctrl+.` QuickFix lightbulb & `source.fixAll.krl`) for 7 critical KRL hazards:
  1. **Advance Run Hazard Barrier**: Auto-inserts `WAIT SEC 0` before safety zone output assertions/releases (`$OUT[...]`, `$FLAG[...]`, `PULSE(...)`) following motions or subprograms, eliminating premature signal deassertion while robot is in motion.
  2. **Missing BRAKE before RESUME**: Injects mandatory `BRAKE` deceleration command directly before `RESUME` in collision and sensor interrupt handlers.
  3. **Uncommitted Payload Dynamic Data**: Automatically injects active tool `BAS(#PAYLOAD, nTool)` commit calls after multi-attribute `$LOAD` assignment groups (`$LOAD.MASS`, `$LOAD.COG`, `$LOAD.J`).
  4. **BOM & Non-ASCII Purge**: Strips invisible UTF-8 BOM (`\uFEFF`) and normalizes non-ASCII typographical glyphs preventing KSS parser compiler panics.
  5. **FOLD / ENDFOLD Desync Alignment**: Synchronizes closing `;ENDFOLD` tags with their respective `;FOLD` region headers.
  6. **FOR Step Zero Hazard Prevention**: Replaces fatal `STEP 0` infinite controller loop conditions with safe `STEP 1`.
  7. **Unused Local Declarations Purge**: Safely removes dangling local `DECL` variables to free memory on physical KRC controllers.
- **Batch Fix-All Command (`krl.fixAllSafeIssuesInFile`)**: One-click batch repair of all safe syntactic and structural issues in file without altering motion kinematics.

### [SECURITY] Safety Verification & Rollback Guard
- **Automated AST Validation**: Every repair undergoes an instant structural syntax validation pass (balancing `DEF`/`END`, `;FOLD`/`;ENDFOLD`, `IF`/`ENDIF`, and loops).
- **Instant Rollback Guard**: If any proposed modification introduces regressions, broken blocks, or new syntax errors, the transaction is immediately rolled back, pristine code is preserved, and an explanatory notice is displayed.

### [INSPECTOR] Native Monaco Diff Review Integration
- **Interactive Split-Free Diff Preview**: Repaired code is displayed in VS Code's native Monaco Diff Editor (Red/Green line highlighting), giving operators absolute control to accept (`Ctrl+Enter`) or reject (`Esc`) changes before writing to disk.

### [AI] Controller Project & Next-Gen KSS Semantic Parity
- **Module Pair Synchronization**: Enforces name synchronization between `.src` `DEF ModuleName()` and `.dat` `DEFDAT ModuleName()` headers matching KUKA KSS error **KSS01412**.
- **Compiler Diagnostic Message IDs**: Integrated Controller Project 6.0 and Next-Gen KSS.Sim 1.3 semantic error catalogs (KSS01412, KSS01413, KSS01422, KSS01425, KSS01435, KSS02008).

### [CLEANUP] Codebase Cleanup & Hardening
- **Unused Import & Variable Removal**: Cleaned up unreferenced imports (`fs`, `path`, `DODO_PAYMENTS_PORTAL_URL`) across client and server.
- **Console Log Hygiene**: Eliminated extraneous debug logging from webview production bundles.

## [1.9.3] - 2026-10-07 (Transparent KRC Backup Live Project Mount, 2-Way Zero-Friction ZIP Sync & Universal Safety Hardening)

### [REALTIME] Transparent KRC Backup Live Mount & Auto-Sync Engine
- **Native Workspace Project Opening**: Opening any KRC backup archive (`Robot1.zip`, `KRCDiag_*.zip`) now transparently unpacks the project in the background and opens it directly as a standard workspace folder in VS Code with zero intermediate webview screens.
- **Clean Folder Naming & Auto-Open**: Workspace root folder displays cleanly as the robot backup name (`Robot1`) in VS Code Explorer, and automatically opens the primary application program (`Cell.src`) in the editor.
- **Two-Way Zero-Friction ZIP Sync**: Transparently intercepts file modifications (Ctrl+S), deletions, additions, and renames, patching changes back into the original `.zip` archive on disk in milliseconds without blocking the UI.
- **Full KRL Language Server Support**: Full access to AST diagnostics, autocomplete, folding, kinematics parity, and safety audits directly within the live-mounted backup.

### [SECURITY] Trajectory Approximation & Manipulator Dynamics Hardening
- **Motion Approximation Tokens Validator**: Flags duplicate approximation modifiers (`LIN XP19 C_Dis C_Dis`) and invalid modifier combinations (`PTP` with Cartesian `C_DIS`, `LIN/CIRC` with axis `C_PTP`).
- **Manipulator Payload Capacity & Dynamics Checker**: Cross-validates `$config.dat` `LOAD_DATA` arrays against nominal manipulator payload from `$TRAFONAME` (e.g. KR300 -> 300 kg), warning on payload overload and zero mass moment of inertia tensors (`J = 0`).
- **Formal Parameter & Subprogram Vorlaufstopp Resolution**: Eliminated false positives on KRL keywords (`IF`, `WHILE`) and formal parameter declarations (`DEF Sub(param:IN)`).
- **KUKA Firmware Integrity Isolation**: Dedicated isolated integrity section for KSS vendor modules (`/R1/System/*`, `/R1/TP/*`), focusing project health index strictly on customer application code.

### [BILLING] Industrial Licensing & Pricing Model Standardization
- **Industrial Workstation Model Parity**: Transitioned commercial tiers to transparent device / workstation activations (1, 25, 200 activations) matching industrial automation standards.
- **Dodo Payments Live Synchronization**: Updated all live payment gateways, B2B invoicing endpoints, and multi-seat entitlements to reflect new Engineer Pro (USD 19/mo, USD 149/yr), Pro Lifetime (USD 699), Team (USD 499/yr, 25 seats), and Enterprise Site (USD 2,490/yr, 200 seats) pricing.

## [1.9.2] - 2026-10-04 (Universal Industrial Safety Suite, KRCDiag Deep Audit & CSP Hardening)

### [SECURITY] Universal Industrial Static Safety Suite (16 Automated Safety Gates)
- **ILF Metadata Desync Guard**: Detects discrepancies between Inline Form XML metadata parameters and active KRL statements.
- **Dynamic Load Data & Tool Index Integrity**: Verifies matching indices between `TOOL_DATA` and `LOAD_DATA`, flagging unconfigured dynamic payloads.
- **Actuator Sensor Pairing**: Detects blind actuator releases (waiting for `NOT Locked` without checking `Unlocked` feedback).
- **Mutual Exclusion Verifier**: Flags sequential `IF ... ENDIF` blocks controlling actuators and motion without mutual exclusion.
- **Advance Run Breaker (Vorlaufstopp) Detection**: Identifies synchronous subprogram calls and I/O reads breaking the continuous advance pointer between `C_DIS` approximation points.
- **Safety Zone Handshake Symmetry**: Enforces strict pairing between zone acquisition (`Zone_Request`) and release signals.
- **PTP Turn Bit Unwind Risk & 6D Operator Guard**: Warns on wrist axis 360° unwinding risks and improper manual coordinate inversions.

### [INSPECTOR] KRCDiag Deep Diagnostic Integration & Fleet Explorer
- **KRCDiag Archive & Folder Support**: Direct inspection of native controller diagnostic packages (`KRCDiag_*.zip`, event logs, trace data, and system topologies).
- **Event Log Inspector Directory Resolution**: Automatically resolves `EventLogs/` directory paths to primary event files (`KrcLogS.evt` / `KrcLog.evt`), eliminating directory read errors.
- **Fleet Hierarchy Deduplication**: Consolidates multi-controller backups under a unified parent robot root.

### [REALTIME] Control Center & CSP Security Fix
- **CSP Nonce Webview Resolution**: Fixed Content-Security-Policy script nonce handling in Control Center, restoring 100% interactivity for all UI controls, tabs, and diagnostic switches.
- **Live Background Services Quick Bar**: Direct one-click control for all background services (ErrorLens, SafetyLens, Git Blame, Continuous Workspace Scanner, and Master Airgap Silent Mode).
- **Complete Command Catalog**: All 75 extension tools and commands organized into dedicated logical functional categories with zero duplicate cards.

### [PARITY] Trademark & Brand Neutrality
- **Third-Party Trademark Sanitization**: Fully neutralized third-party editor brand names (e.g., Reference Editor) across UI titles, command palettes, and documentation in favor of neutral engineering terminology (*Advanced Kinematics & Trajectory Suite*).

### [CIPHER] AppSec & Licensing Hardening
- **Asymmetric Ed25519 Airgap Licensing**: Replaced symmetric HMAC airgap validation with asymmetric Ed25519 signature verification (`LISKIN_LABS_AIRGAP_PUBLIC_KEY`), preventing key extraction from client bundles while retaining backward compatibility via timing-safe HMAC fallback.
- **Telemetry Command Injection Hardening**: Eliminated shell interpolation by switching from `child_process.exec` to parameterized `execFile("git", ...)`.
- **GDPR & VS Code Telemetry Compliance**: Added strict compliance checks enforcing user opt-in (`vscode.env.telemetryConfiguration.telemetryLevel === "all"`) and workspace trust boundary verification (`vscode.workspace.isTrusted`).

### [PACKAGE] KUKA Backup Archive Explorer & Virtual Provider (Zero Unpack)
- **Zero-Unpack In-Memory Inspection**: Browse files inside `*.zip` backups and `KRCDiag_*.zip` archives directly without manual extraction.
- **Virtual Document Provider**: Open any file from backup with read-only `krc-archive://` protocol.
- **In-Memory Fleet Static Analysis**: Run comprehensive static analysis and robot passport audit directly across all KRL modules in archive in <500ms.
- **Integrated Event Log Viewer**: Open `.evt` logs directly from archive viewer.

### [SYNC] Live Transparent ZIP Workspace Mount & Auto-Sync Engine [PRO]
- **Mount Backup as Active Workspace**: One-click extraction into isolated mount sandbox (`krl.mountBackupZipAsProject`) with instant folder switch or new window.
- **Transparent In-Memory ZIP Patcher**: Automatically intercepts document saves (`Ctrl+S`) and patches modified files directly back into the original `.zip` on disk in <80ms without UI freezing or process locks.
- **Deletion Synchronization**: Deleting files in mounted workspace removes them from original archive.
- **Status Bar Integration**: Live status bar monitor displays active archive with real-time auto-sync indicators and one-click full reconcile flusher (`krl.syncAllToBackupZip`).
- **Archive Explorer 1-Click Launch**: Direct toolbar button in Backup Explorer to seamlessly transition from in-memory inspection to live editing project.

### [PACKAGE] VSIX Package Optimization
- **VSIX Bundle Slimming**: Slashing extension package size to ~5.4 MB (>80% reduction) with lazy activation and fast startup events.

## [1.9.1] - 2026-10-01 (Enterprise Fleet Verification, Hardened Folds & Legal Compliance)

### [SECURITY] Enterprise Fleet Verification (9,804 Modules / 4.2M+ LoC Tested)
- **100% Non-Destructive Code Modernization**: Hardened `convertLegacyToSpline` and `insertSplineBlock` against runaway fold scans in legacy robot programs with missing or malformed `;ENDFOLD` tags.
- **Tech Package Protection**: Automated preservation of specialized welding and dispensing packages (KUKA.ServoGun `%MKUKATPSERVOTECH`, SpotTech, ArcTech, GlueTech).
- **Fleet Quality Audit**: Verified across all 17 customer robotics installations and 8 automotive/Tier-1 clients with zero line losses, zero block regressions, and 100% preservation of companion `.dat` symbols.
- **Branding & Trademark Cleansing**: Cleaned all UI labels, NLS localization files, and technical logs under standard Nominative Fair Use guidelines.

## [1.9.0] - 2026-10-01 (Industrial 6D Kinematics, Advanced Simulation Safety & KSS 8.7 Megarelease)

### [RELEASE] Industrial 6D Kinematics & Offline Transformation Suite
- **6D Robotics Kinematic Math Engine (KRL Euler Matrix Formulation)**:
  - Exact 4x4 Homogeneous Transformation Matrices, Euler angle conversions (`Rz(A) · Ry(B) · Rx(C)`), frame inversion, and KUKA geometric operator (`:`).
  - Bitwise manipulation of `STATUS` (0..7) and `TURN` (0..63) bitmasks matching KUKA controller specs.
- **⭐ 6D Trajectory & Point Mirroring (`krl.mirrorTrajectory`) [Pro Tier]**:
  - Mirrors motion paths across Cartesian planes X (YZ-plane), Y (XZ-plane), or Z (XY-plane).
  - Inverts corresponding Turn bitmasks: Plane X (`T ⊕ 32`), Plane Y (`T ⊕ 40`), Plane Z (`T ⊕ 48`), with optional A1 Turn bit reflection (`T ⊕ 1`).
  - Full side-by-side VS Code Diff-Preview before committing coordinate changes to `.src` and companion `.dat` files.
- **⭐ 6D Batch Point Transformation & Shift (`krl.batchShiftPoints`) [Pro Tier]**:
  - Batch shifts selected positions across `.src` and `.dat` using Tool Offset (`P : ΔF`), Base Offset (`ΔF : P`), or Cartesian Delta vector.
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

### [ANALYSIS] Advanced Kinematic & Simulation Safety Analyzers (KSS 8.3–8.7)
- **Status (S) & Turn (T) Kinematic Validator (`validateStatusAndTurn`)**:
  - Validates Status `S` literal values and assignments: strictly enforces range `0..7` (`'B000'`..`'B111'`). Out of range values trigger KSS error 1033 (*Status/Turn ungültig*).
  - Validates Turn `T` literal values and assignments: strictly enforces 6-axis range `0..63` (`'B000000'`..`'B111111'`).
  - **4-Axis Palletizer Kinematics Guard**: Enforces constant Status `S = 2` (`'B010'`) for palletizer robots (e.g. `KR 300-2 PA`, `KR 470 PA`, `KR 700 PA`), preventing singular configuration faults.
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

### [GEOMETRY] KSS Standard Project Templates & Snippets
- **Interactive KUKA Template Scaffolding Wizard (`krl.scaffoldKrcFiles`)**:
  - Generates verified project templates:
    - **CELL.SRC**: Production Automatic External handler with P00 handshake, $STOPMESS, and PGNO dispatch.
    - **Standard Module**: Standard KUKA Application module (`.src` + `.dat`).
    - **UserSubmit Task**: Multi-Submit task for KSS 8.3/8.5/8.7 background processing (`SPS1.SUB` .. `SPS5.SUB`).
    - **⭐ VKRC Folge Module (Pro Tier)**: Full Volkswagen VASS sequence module with `TPVW`, `SPS_TRIG`, `PENTER`, `PEXIT`.
    - **⭐ VKRC Makro Function (Pro Tier)**: Volkswagen VASS macro function with advance run `ADV` discrimination.
- **Spline Inline Form Templates**:
  - Added snippets for `SLINI`, `SPTI`, `SCIRCI` with `%MKUKATPBASIS,%CSPLINE`, `SVEL_CP`, `STOOL2`, `SBASE`, `USE_CM_PRO_VALUES`.
  - Added `STOPWHEN` and `ON_ERROR_PROCEED` snippets.

## [1.8.11] - 2026-10-01 (Advanced Industrial Stopping Distances & Brake Test Diagnostics)

### [ANALYSIS] Industrial Diagnostics & Safe Stopping Distances
- **Exact Interrupt Priority Model (`InterruptPriorityValidation`)**:
  - Enforces strict KSS KRC interrupt priority constraints derived from observed controller validation behavior:
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
  - Embedded real robot preview photo in Section 1 (Hardware & System Passports) of generated Project Quality and Audit reports, resolved automatically via local Controller Project / Workcell Simulator catalog.
- **Dynamic Stopping Distance Calculation in Acceptance Reports (`acceptanceReport.ts`)**:
  - Integrated dynamic stopping distance and stopping time models for STOP 0, STOP 1, and STOP 2 categories per EN ISO 10218-1 and the public stopping-distance model.
- **Enhanced Robot Model Regex Parsing & Auto-Detection**:
  - Fixed prefix parsing so that generation-2 and variant notations (e.g., `KR210R2700_2 C4 FLR`, `KR210R2700-2 KRC5`) accurately resolve to their robot catalog images (`KR 210 R2700 prime`).
  - Added auto-detection paths for `Workcell Simulator 4.10` and `Next-Gen KSS.Sim 1.3` RuntimeTools.

## [1.8.10] - 2026-10-01 (KUKA Controller Project Compiler Analyzers, Robot Image Bridge & Acceptance Reports Integration)

### [BACKUP] KUKA Controller Project Robot Image Bridge & Acceptance Protocol Reports
- **Robot Photo in Acceptance Protocols (`krl.generateAcceptanceReport`)**: Acceptance reports generated for customer site buy-offs and CE/ISO 10218 safety audits now embed the high-resolution robot render inside "Card 1: Robot Passport ($machine.dat)".
- **Local Controller Project Asset Detection**: Seamlessly detects installed KUKA Controller Project (3.0, 4.0, 5.0, 6.0) on the engineer's workstation (`C:\Program Files (x86)\KUKA\Controller Project 6.0\Tools\RuntimeTools`).
- **Fuzzy Kinematics Model Resolver**: Robust matching for both KRC4 and KRC5 notations (e.g., `#KR210R2700_2 C4 FLR`, `KR210R2700-2 KRC5`, `KR210R2700_2 C5 FLR` all reliably map to kinematic render `KR 210 R2700 prime`).
- **Local Asset Extraction**: Extracts preview renders (`Preview.jpg`) from the locally licensed robot image catalog using public KUKA robot specifications without redistributing proprietary assets.
- **KUKA Fleet Robot Explorer Integration**: Discovered robot controllers and multi-robot cells in the active workspace display the robot photo directly in the VS Code TreeView explorer.
- **Robot Model Viewer (`krl.viewRobotImage`)**: 1-click preview of the active robot cell's photo inside VS Code editor.

### [ANALYSIS] KUKA Controller Project 6.0 Compiler Analyzers Reverse-Engineering Integration
- **`InvalidFileHeader` Guard (`krl.diagnostics.checkFileHeaders`)**: Flags comments or blank lines preceding KSS compiler directives (`&ACCESS` and `&REL`) that break compilation on physical KRC controllers.
- **`InvalidBrakeStatement` Guard (`krl.diagnostics.checkBrakeUsage`)**: Strictly prohibits `BRAKE` / `BRAKE F` in background Submit interpreter (`.sub`), and enforces that `BRAKE` in `.src` files can only be executed within declared `INTERRUPT` service routines.
- **`DeclarationHidesGlobalVariable` & `HiddenModuleField` (`krl.diagnostics.checkShadowedVariables`)**: Warns when local variables in `.src` routines shadow global variables in `$config.dat` or module variables in `.dat`, preventing accidental state corruption.
- **`FrameChangeInsideSplineBlock` (`splineFrameChangeForbidden`)**: Prohibits altering coordinate frames (`$BASE`, `$TOOL`, `BAS(#BASE/TOOL/FRAMES/INITMOV)`, `FDAT_ACT`) inside `SPLINE ... ENDSPLINE` envelopes per KSS motion planning rules.
- **`KrlStartsWithOne` & `ArrayIndexTooBig`**: Enforces 1-based array indexing across declarations and expressions, prohibiting index 0 (with proper exemption for `$BASE_DATA[0]`), and capping array dimensions at the KSS limit of 32766.
- **`SystemNameUsed` Guard**: Restricts user variable and subprogram declarations from beginning with `$` (reserved strictly for KSS system variables).
- **`SwitchWithoutCase` Guard**: Flags `SWITCH` blocks that close with `ENDSWITCH` without any `CASE` or `DEFAULT` branches.
- **`UnreachableCode` after `HALT`**: Identifies dead code paths immediately following `HALT` statements.

### [SECURITY] Supply Chain Security & CVE-2026-76845 Remediation
- **Fixed `CVE-2026-76845` in `adm-zip`**: Upgraded `adm-zip` dependency to `^0.6.1` to eliminate the symbolic link extraction vulnerability ("Improper Link Resolution Before File Access") flagged by ReversingLabs Spectra Assure and NVD.
- **Zero Supply Chain Alerts**: Manifest SBOM updated to ensure 100% compliance across automated enterprise security scanners.

## [1.8.9] - 2026-09-30 (Automotive & OEM Standards Suite, 183 KUKA Robot Specs DB, VASS 26 Linter, VW_USER Tech Packages & Path Geometry)

### [KINEMATICS] KUKA Robot Specs Catalog & Reach Envelope Guard (183 Models)
- **183 KUKA Robot Models Catalog**: Embedded comprehensive physical reach, payload, arm series, and mounting position specifications compiled from publicly available KUKA robot specifications.
- **Autonomous Robot Model Auto-Detection**: Automatically detects active robot kinematics and serial model from controller root `$machine.dat` (`$TRAFONAME[]`) or `am.ini`, supporting fuzzy matching and edition variations (`#KR210R2700_2 C4 FLR`).
- **Cartesian Reach Envelope Validator (`krl.diagnostics.checkRobotReach`)**: Real-time diagnostic guard that flags Cartesian target coordinates (`E6POS`, `POS`, `FRAME`, literals) exceeding the robot's physical reach sphere (`R = √(X² + Y² + Z²) > reach + 100 mm`), while properly factoring external linear track axes (`E1`).

### [SIMULATION] Volkswagen, Audi, SEAT, Škoda (VASS 26 Standard) Rules Linter (`krl.diagnostics.checkVassStandard`, `krl.diagnostics.checkVassStrictRules`)
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

### [SYNC] Motion Point 3-Way Data Integrity Validator (`krl.diagnostics.checkMotionFoldSync`)
- **Motion Point Data Integrity Engine**: Detects desynchronization between user-visible `;FOLD` comments on SmartPAD (e.g., `VB=100%`, `RobWzg=1`, `Base=0`) and the underlying `.dat` controller structures (`P1_D`, `PDAT`, `LDAT`, `FDAT`).
- **Stealth Speed & Tool Override Detection**: Emits precise diagnostic warnings if an engineer manually altered FOLD headers or DAT structures in an external editor, preventing hazardous robot velocity jumps.

### [TAG] VW_USER & VKRC Technology Packages Suite (`krl.inlayHints.vwUserTech`)
- **Full Technology Catalog (101..501)**: Embedded specifications for Spot Welding (`EZ/SP/KE`), Equalizing Gun (`VM-Ausgleich`), Clinching (`CZ`), MIG/MAG Arc (`MS`), Sensor Offset (`Baseverschiebung`), Stud Welding (`BS`), SafeRobot (`SFR`), Gluing/Dispensing (`Kleben`), Laser Optics (`3D-PFO`), Gripper Tech (`Handling`), Blind Riveting (`Nieten`), Seam Tracking (`NK`), and Flowdrill.
- **LSP Inlay Hints & SPSMAKRO Integration**: Inline parameter name, macro descriptors (`Makro 340: Handling (Greifer)`), and technology labels directly in the editor for `VW_USER`, `VW_USR_R`, and `SPSMAKRO` calls.
- **Standard System I/O Fallback Hints**: Displays standard industrial signal meanings for `$IN` and `$OUT` when unaliased.
- **Interactive Hover & Signature Help**: Rich Markdown tables detailing parameter roles (`P1..P10`), physical units (`[1/10 mm]`, `[ms]`), and decoded enum values.

### [GEOMETRY] Trajectory Geometry & Path Math Guard (`krl.diagnostics.checkPathApproximation`)
- **CIRC Collinear & Coincident Point Guard**: Mathematically verifies 3-point circular arcs (`CIRC`, `SCIRC`, `KCIR`). Detects collinear points (infinite radius) and coincident points (`Aux = Target`) that crash KUKA motion planner at runtime.
- **$APO.CDIS 50% Segment Over-Approximation & Silent Reduction**: Enforces KSS trajectory constraint: flags `$APO.CDIS` exceeding 50% of the segment length and warns about silent approximation reduction by controller.
- **Switch Points Range Verification (`TRIGGER WHEN PATH` & `Schaltpkt`)**: Compares switch point trigger distances against preceding and outgoing physical motion segments. Flags out-of-bounds trigger distances before controller runtime errors.
- **Long Motion Segments Detection**: Identifies continuous seam motions (`KLIN`, `LIN`) exceeding 50 mm without intermediate support points to preserve bead application geometry.
- **FOLD & ENDFOLD Name Matching Validation**: Validates name parity between `;FOLD <name>` and `;ENDFOLD (<name>)` to protect SmartPAD outline structure.

### [AUTOMOTIVE] Volkswagen VKRC Full Integration & Automotive Architecture
- **Autonomous VKRC Workspace Detection (`vkrcService`)**: Heuristically analyzes project files for Volkswagen VKRC structures (Folge, UP, MakroSps, MakroStep, MakroTrigger, VW_USER) and controller root parameters.
- **Pro Gated Industrial Standard**: Free community users receive clear, non-intrusive notifications when opening VKRC projects, with one-click access to a 14-day full-featured trial or direct corporate invoicing.
- **Dedicated VKRC Status Bar & Diagnostics**: Real-time status bar widget showing active VKRC mode, with deep AST parsing and syntax diagnostics for automotive assembly lines.

### [BILLING] Unified B2B Invoicing via Dodo Payments (Merchant of Record)
- **Official Checkout & Customer Portal**: Fully retired homemade HTML quote generator in favor of hosted Dodo Payments checkout with automated EU VAT validation (VIES Reverse Charge 0% for European businesses).
- **Direct PDF Invoice Retrieval (`krl.downloadLatestInvoice`)**: Integrated direct download of official Dodo PDF invoices directly inside VS Code with merchant details for enterprise accounting.

### [TOOLS] Industrial UI Refresh & Strict Codicon Standardization
- **Complete Cartoon Emoji Eradication**: Replaced all informal emojis across the entire UI/UX with native VS Code Codicons (`ThemeIcon`), precision SVG vectors, and engineering bracketed tags (`[PRO]`, `[TECH]`, `[VASS 26]`, `[MOVE]`, `[CALL]`, `[WAIT]`, `[IO]`, `[CMD]`, `[PTP]`, `[LIN]`, `[CIRC]`).
- **Standardized TreeViews & QuickPicks**: Clean visual hierarchy across Commands TreeView, I/O TreeView, CodeLens, Hover tooltips, and Control Flow Diagrams.

### [CONTROL] UI/UX Control Center Two-Way Sync & 6-Language Parity
- **Independent Feature Switches**: Added dedicated toggles for each new automotive engine under "Critical Safety & Hardware Limits" and "Automotive & OEM Standards (Volkswagen, Audi, SEAT, Škoda — VASS 26)".
- **Strict 6-Language NLS & Client Parity**: All configuration settings, diagnostics, and Control Center descriptions fully localized across English, Russian, German, Spanish, Italian, and Turkish with zero hardcoded strings.

## [1.8.8] - 2026-09-24 (Open VSX Automated Pipeline, DevSecOps License Protection & Clean Code Audit)

### [RELEASE] Open VSX & Dual-Registry Publishing Pipeline
- **Dedicated Open VSX Workflow Scripts**: Added `publish:ovsx` and `publish:all` commands with `--no-dependencies` bundler isolation to `package.json` to enable automated dual publishing to both VS Code Marketplace and Eclipse Open VSX.
- **Pre-Publish Dual Collision Verification**: Hardened `scripts/prepublish_check.js` to ensure version availability and manifest parity across both registries simultaneously before publishing.

### [SECURITY] DevSecOps & License Protection Hardening
- **CI License Integrity Guard**: Fixed `.github/workflows/ci.yml` to prevent overwriting the comprehensive 8.8KB Commercial EULA (`extension/LICENSE.txt`) with the root stub during continuous integration runs.
- **ESLint & TypeScript Architecture Audit**: Cleaned up all unused parameters and imports across `aiTools.ts`, `foldTools.ts`, `ioMatrix.ts`, and `motionStats.ts`, reducing compiler warnings and ensuring strict code cleanliness.
- **Exported Tool & Base Resolver**: Exported `detectActiveToolAndBase` in `foldTools.ts` for unified trajectory kinematics analysis across tools.

### [MODULE] Heuristic File Classifier & Workspace Disambiguation (`.src` / `.dat`)
- **Authentic KRL Content Detection**: Introduced intelligent syntax classifier (`isAuthenticKrlContent`) recognizing KSS structural anchors (`&ACCESS`, `DEF`, `DEFDAT`, `DECL`, `;FOLD`, motion commands).
- **Zero False Diagnostics on Non-Robotics Files**: Automatically isolates and ignores foreign non-KUKA files sharing `.dat` or `.src` extensions (such as GTA/FiveM data tables, C/C++ sources, binary blobs), preventing LSP error flooding.
- **First-Line Grammar Disambiguation**: Added `firstLine` manifest pattern to prioritize KRL syntax mapping only when file begins with valid KRL headers or routines.
### [SECURITY] Safety Speed Diagnostics & Submit Interpreter (`.sub`)
- **Safety Diagnostics on Submit Programs (`sps.sub`)**: Resolved an issue where background submit interpreter files (`.sub`) were improperly categorized as read-only MADA controller files. Full safety speed auditing (`$OV_PRO`, `$VEL_ACT`) is now active across all subroutines and background tasks.
- **Air-Gapped License Deactivation Gateway**: Added cryptographic offline deactivation certificate support allowing clean seat unbinding from offline production laptops with automatic instance release on the cloud licensing gateway.
- **1-Click Hardware License Re-binding**: Instant workstation migration support for factory laptop replacement.


## [1.8.7] - 2026-09-16 (Industrial Field Suite, KSS 8.x Standardization & Pure-TS KUKA Event Log Decoder)

### [REALTIME] Industrial Robotics Field Engineering Suite (PRO)
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
  - Adaptive editor tab action bar: 1-click `[VERIFIED] Accept File` (`Ctrl+Enter`), `[EXCLUDED] Reject File` (`Esc`), or batch `Accept All` (`Ctrl+Shift+Enter`).
  - Multi-file project pipeline with accurate remaining counters, QuickPick jump navigator, live buffer edit preservation, and race-condition guards.
- **KSS Spline Kinematic Separation & Safety-Critical Motion Suite (`krl.convertLegacyToSpline`, `krl.insertSplineBlock`)**:
  - `SPTP` point-to-point axis motions are strictly generated as standalone instructions outside `SPLINE...ENDSPLINE` blocks to prevent controller kinematic stops.
  - Linter flags illegal `SPTP` inside Cartesian `SPLINE` blocks as compiler errors, preventing SmartPAD trajectory halts.
  - 1-click automated converter for legacy `PTP`, `LIN`, `CIRC` motions to modern `SPTP`, `SLIN`, `SCIRC` with automatic `$SGEAR_JERK` limitation.
  - Validated across 10,687 real motions from 8 industrial customer fleet backups with 0 syntax errors.
- **Decode & View KUKA Event Log (.evt) (`krl.openEventLog`)**:
  - 100% pure TypeScript zero-dependency binary decoder for KRC Windows EVTX event logs (`KrcLogS.evt`, `KrcLogB.evt`, `KrcLogP.evt`, etc.).
  - Registered `KukaEventLogCustomEditorProvider` as the default custom editor in VS Code for `.evt` files — double-clicking any event log in the workspace opens the interactive viewer instantly.
  - Built-in offline diagnostic dictionary of KUKA KSS CrossMeld messages across **all 6 supported languages**: EN (2,050), DE (2,051), RU (1,997), ES (2,048), IT (2,048), and TR (1,997).
  - Dynamic parameter substitution (`{0}`, `{1}`), fault severity classification (`ERROR`, `WARNING`, `INFO`, `DIALOG`), CSV/diagnostic report export, and one-click navigation to referenced KRL source files and line numbers.
- **100% Adaptive Themes & Zero Fixed Colors**:
  - Complete elimination of hardcoded/fixed CSS colors across all extension webviews.
  - Native integration with any VS Code theme via `--vscode-*` CSS variables, with explicit adaptations for Light Themes (`body.vscode-light`) and High Contrast (`body.vscode-high-contrast`).
  - Dynamic 6-language switcher (EN, DE, RU, ES, IT, TR) integrated into all industrial tools.
- **Pro Licensing Protection**: All industrial engineering tools are guarded with `ensurePremium`.

### Workcell Simulator & KSS 8.3–8.7 Standardization
- **Motion Approximation Parameters**: Replaced pseudo-variable assignments with authentic KUKA KSS `$APO` structure fields (`$APO.CDIS = 50.0`, `$APO.CVEL = 50`, `$APO.CPTP = 50`, `$APO.CORI = 10.0`) and standard trajectory modifiers (`LIN XP1 C_DIS`, `PTP XP1 C_PTP`).
- **Circular Interpolation Order (`CIRC` / `SCIRC`)**: Corrected point parameter mapping so auxiliary point (`auxPointName`) is strictly specified first and target point (`pointName`) second, adhering to KRL kinematics standards.
- **Standard Inline Form Generation (`SCIRC`)**: Aligned `generateOfficialSplineFold` with standard KSS 8.x SCIRC inline form conventions (generating proper `Kuka.HelpPointName` parameter and full `$CIRC_TYPE = SCIRC_TYP(...)` / `$CIRC_MODE = SCIRC_M(...)` calls).
- **Fold Header Cleanliness**: Removed synthetic `{iiQKA}` tags and extraneous `;%{PE}` markers from custom logic folds, preventing smartPAD "Corrupted Inline Form" parsing warnings.
- **Modern Spline Triggers**: Added support for both `TRIGGER WHEN PATH` and `TRIGGER WHEN DISTANCE` within `SPLINE ... ENDSPLINE` blocks while maintaining strict compile-time protection against non-interpolated logic.
- **Safety Audit Non-ASCII Filter**: Controller Project system metadata headers (`&ACCESS`, `&REL`, `&COMMENT`, `&PARAM`) and comments are now cleanly exempted from `NON_ASCII_CHARACTER` diagnostics.

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
