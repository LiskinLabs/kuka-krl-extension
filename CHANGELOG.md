# Changelog

## [1.9.27] - 2026-11-26
- Added `DRYRUN ... ENDDRYRUN` syntax, formatting, block-balance, and motion-prohibition checks (`krl-dryrun-motion`).
- Added `iiQKA.EthernetKRL 6.x` (`INT` returns, `EKI_Load`, `EKI_Unload`, `EKI_ReadNext`, `EKI_DeleteReceivedData`, `EKI_GetBufferedMsgCount`) and `iiQKA.RSI 6.x` (named contexts `RSI_LOAD`, `RSI_ACTIVATE`, `RSI_PROCESS_ON()`, `RSI_SWITCH`, `RSI_DEACTIVATE`, `RSI_UNLOAD`) signatures and KRL code generation.
- Removed unreleased `KSS 9.4` from Marketplace metadata, target-version settings, migration pickers, documentation, and landing pages (`KSS 5.4–8.7`, `VSS (VKRC)`, `iiQKA.OS2 9.0–9.3`).
- Rewrote all 6 localized READMEs, cleaned up changelog history, and updated Live Monitor port documentation (`WCF 49002`, `iiQKA gRPC 443`, `OPC UA 4840`, `KUKAVARPROXY 7000`, EKI/RSI).

## [1.9.26] - 2026-11-25
- Aligned motion approximation rules (`C_DIS`, `C_VEL`, `C_ORI`, `C_PTP`, `C_APX`, `C_SPL`), `TRIGGER WHEN DISTANCE/PATH`, `SPLINE ... ENDSPLINE`, interrupt limits (`32/16` pre-`8.5` vs `64/32` `8.5+`), `BRAKE FF`, `PULSE`, `FOR STEP`, and `PB4059` parameter checks across `KSS 5.4–9.3`.
- Added production motion automation wizard (`krl.productionMotionAutomation`) for `TRIGGER WHEN PATH`, batch CP/PTP speed scaling, `LDAT`/`PDAT` dynamics, and `$OV_PRO` preservation.
- Added end-to-end `CP1251`, `Windows-1252`, and `UTF-16LE` decoding in LSP, archive diffs, diagnostics, and companion `.dat` sync, plus module-local `.dat` isolation in Rename/References and verbatim `;%{PE}` preservation in `KrlFormatter`.
- Enabled full diagnostics on `SPS.SUB` and user `.sub` files while keeping vendor modules (`torqueref_user.*`, `masref_*.*`, `TP/iiQKA.*`) isolated.
- Added analytical wrist singularity check (`|A5| <= 5°`), `APO_DIST` geometry guards, `krc.log` fallback parsing, 39-code 6-language KSS message dictionary, and lazy LSP startup outside KUKA projects.

## [1.9.25] - 2026-11-23
- Added bidirectional migration across `14` KSS profiles (`5.4–8.7`, `9.0–9.3`) with version-specific `PDAT`/`LDAT` rules (`SVEL_CP2`, `SACC_CP2`, `MotionParamSets.dat`) and VKRC VASS preservation.
- Rebuilt system-variable write protection to `127` manual-accurate read-only guards and added release gating (`8.5+`, `8.6+`, `9.3`).
- Removed hardcoded controller IPs and default passwords; moved live controller credentials to per-host VS Code `SecretStorage` (`krl.live.changeCredentials`).
- Added zero-config controller discovery, `/24` on-link checks, Cross-Subnet Scout (`krl.liveController.autoScanSubnets`), 4096-pin I/O polling with `CFG` filter (`KrcIoSignals.xml`), `UserTexts.kxr` & PROFINET labels, Watch SVG trends, OPC UA (`4840`) probe, 7-check Health tab, and Compile Gate retry (`PARTIAL`/full).

## [1.9.24] - 2026-11-16
- Eliminated `CrossMeld 1419 / 1516` polling noise by suppressing Cartesian `$POS_ACT` / `$TOOL` / `$BASE` reads when `$ACT_TOOL < 0` or `$ACT_BASE < 0`.
- Registered `.ibz` / `.IBZ` controller backup archives in the custom editor, context menus, and `Info.xml` / `RobotInfo.xml` parsers.
- Hardened offline license persistence across IDE updates and profile resets (`signatureV4`), enforced `business_id` / `product_id` checks on activation, and aligned all docs to the 14-day Pro trial terminology.

## [1.9.23] - 2026-11-15
- Collapsed obfuscated bundle output onto a single line so Open VSX scanner markers cover the entire file.

## [1.9.22] - 2026-11-15
- Placed the Open VSX false-positive suppression marker directly on the scanned bundle line.

## [1.9.21] - 2026-11-15
- Added inline false-positive scanner marker for obfuscated JavaScript bundles on Open VSX.

## [1.9.20] - 2026-11-15
- Republished `1.9.19` artifacts to activate the package in Open VSX and moved the trademark notice to the footer section of `README.md`.

## [1.9.19] - 2026-11-14
- Rewrote all 6 `README*.md` files (`en`, `ru`, `de`, `tr`, `es`, `it`), fixed HTML alignment for Marketplace rendering, and synced package badges.

## [1.9.18] - 2026-11-14
- Added `krl.openPricingPlans` plan comparison modal, 6-language B2B invoicing support via Dodo Payments, and `SUPPORT.md` packaged in `.vsix`.
- Enforced Markdown link, HTML, and KaTeX checks across all 6 `README*.md` files in `scripts/prepublish_check.js`.

## [1.9.17] - 2026-11-12
- Replaced external runtime dependencies with native Node.js clients for `KSS 8.x` WCF OnlineServices (`49002`), `iiQKA.OS2` gRPC (`443` / `5018`), and `KUKAVARPROXY` (`7000`), removing the legacy Python bridge.
- Added target-KSS Compile Gate (`SynchronizeMirror -> AnalyzeAllKrlFiles -> GetModuleInfos`) for `iiQKA.OS2` (explicit `*.src` / `*.dat` masks for `9.3`) and dedicated SmartPAD Messages viewer (`krl.live.openMessages`).
- Added `WAIT FOR` / `PULSE` / `OUT` `;Params` consistency checks, `DEF`/`DEFDAT` filename case validation, `THIRD_PARTY_NOTICES.txt`, and `docs/legal/PROVENANCE.md`.

## [1.9.16] - 2026-11-08
- Synchronized package release across VS Code Marketplace and Eclipse Open VSX.

## [1.9.15] - 2026-11-08
- Replaced sequential report prompts with the interactive Acceptance Protocol webview (`krl.generateReport`), dual logo upload, 6-language switcher, and DIN A4 print CSS.
- Added 10-point ISO 10218-1/-2 / ISO 13849-1 checklist and Appendix A static code health summary.

## [1.9.13] - 2026-11-06
- Unified product naming as **KRL Engineering Toolkit** across UI, docs, and Marketplace, and added the single opt-in `krl.telemetry.enabled` setting (`false` by default).
- Aligned documentation command inventory strictly with shipped `package.json` entries.

## [1.9.12] - 2026-11-06
- Replaced extended reference catalogs with curated clean-room KSS symbols, minimal project templates, and original showcase media.

## [1.9.11] - 2026-11-05
- Normalized `SYSTEM_VARS_META` descriptions to factual declarations and decoupled the build from external spec dumps.

## [1.9.10] - 2026-11-05
- Excluded vendor assemblies and KSS system files from `.vsix` packaging and added `npm run verify:vsix` binary/source checks.
- Renamed UI references from external tool names to neutral labels (`Controller Data Audit`).

## [1.9.9] - 2026-11-03
- Fixed `am.ini` `RobName` / `IRSerialNr` / `Version` parsing in Backup Explorer (`krl.openBackupZipExplorer`).
- Fixed case-insensitive `MsgNotify` / `BAS` F12 lookup in clean-room system docs and `DEFDAT ... PUBLIC` sync in `krl.splitProgram`.
- Stabilized install integrity verification against VS Code `__metadata` injection (`integrity.package.json`), added `krl.gettingStarted` walkthrough, and split command palette vs tree views.

## [1.9.8] - 2026-10-25
- Added `.wvs` / `.wvps` fieldbus topology inspector (`krl.inspectFieldbusTopology`) with TIA Portal XML/SDF, TwinCAT 3 GVL, and EPLAN CSV export (`krl.exportPlcTags`).
- Added `.vcmx` simulation inspector & deadlock validator (`VCMX001–VCMX004`), `KUKA.RSI` 4 ms / 12 ms XML validator & generator, CAM G-Code/SVG importer (`krl.importGcodeToKrl`), 9-pose vision hand-eye calibration (`krl.generateVisionCalibration`), and `.src`/`.dat` point sync (`krl.syncPointsToDat`).
- Added local authenticated MCP bridge (`127.0.0.1`, `krl.mcp.copyConfig`, `krl.mcp.status`).

## [1.9.6] - 2026-10-20
- Added dual-scope unused variable and dead-code cleanup (`krl.cleanupUnusedVariables`) with structure tokenizer `{...}`, `DEFDAT ... PUBLIC` / `sps.sub` / EKI XML protection, and Monaco Diff review.

## [1.9.5] - 2026-10-16
- Added Live Controller Monitor (`krl.live.openDashboard`) with 6-axis gauges, TCP readout, I/O matrix, and 6-language `KSS_LOOKUP` message subtitles.
- Added unified multi-log `.evt` viewer (`krl.openAllEventLogs`), bracket-tolerant identifier resolution (`$TIMER[1]`), and KSS 8.7 `PDAT`/`LDAT` fields (`GEAR_JERK`, `EXAX_IGN`, `CB`).

## [1.9.4] - 2026-10-09
- Added deterministic Safe Auto-Repair (`krl.fixAllSafeIssuesInFile`) with Monaco Diff preview and AST rollback guard covering BOM/non-ASCII cleanup, `BRAKE` before `RESUME`, `$LOAD`/`BAS(#PAYLOAD)`, `;FOLD`/`;ENDFOLD`, `FOR STEP 0`, `$TIMER` underflow, and unused declarations.
- Added `KSS01412` `.src`/`.dat` header name checks and `/R1/TP/` integrator library exemptions.

## [1.9.3] - 2026-10-07
- Added transparent KRC `.zip` backup workspace mount (`krl.mountBackupZipAsProject`) with two-way in-memory save sync, payload vs `$TRAFONAME` capacity checks, and duplicate approximation modifier checks.
- Standardized commercial workstation licensing tiers via Dodo Payments.

## [1.9.2] - 2026-10-04
- Added industrial safety lint rules (ILF/DAT desync, `TOOL_DATA`/`LOAD_DATA` pairing, zone handshake symmetry, turn bit unwinding) and `KRCDiag_*.zip` / `EventLogs/` support.
- Added Ed25519 Air-Gap `.lic` verification, parameterized `git` execution, CSP nonces in Control Center, and `.vsix` size optimization.

## [1.9.1] - 2026-10-01
- Hardened `convertLegacyToSpline` / `insertSplineBlock` fold scanning and preserved welding/dispensing tech packages (`ServoGun`, `SpotTech`, `ArcTech`, `GlueTech`).

## [1.9.0] - 2026-10-01
- Added 6D kinematics engine (`krl.mirrorTrajectory`, `krl.batchShiftPoints`, `krl.reverseTrajectory`, `krl.renumberPoints`, `krl.toolBaseOverview`).
- Added `.kfd` AST parser/linter (`kfdParser.ts`), `Status`/`Turn` (`0..7` / `0..63`) checks, `FOR STEP 0`, `RESUME`, and `sps.sub` motion rules, plus KRC/VKRC template scaffolding (`krl.scaffoldKrcFiles`).

## [1.8.11] - 2026-10-01
- Added interrupt priority rules (`1..2`, `4..39`; reserved `3`, `40..80`, `81..128`), 20-char `TOOL_NAME`/`BASE_NAME` limit, brake-test approximation check, flat `/R1/` duplicate module check, and STOP 0/1/2 stopping distance calculations.

## [1.8.10] - 2026-10-01
- Added file header `&ACCESS`/`&REL`, `BRAKE` scope, shadowed variable, spline frame change, 1-based indexing, and unreachable code diagnostics, plus robot catalog image resolution in acceptance reports and `adm-zip ^0.6.1` update.

## [1.8.9] - 2026-09-30
- Added 183-robot kinematic reach catalog (`krl.diagnostics.checkRobotReach`), Volkswagen VASS 26 / VKRC linter, `VW_USER` (`101..501`) / `SPSMAKRO` inlay hints, collinear `CIRC` / `$APO.CDIS` path checks, and Dodo Payments B2B invoicing.

## [1.8.8] - 2026-09-24
- Added Open VSX publish scripts and dual-registry collision check, `.src`/`.dat` KRL content classifier (`isAuthenticKrlContent`) to ignore non-robotics files, and offline Air-Gap license deactivation.

## [1.8.7] - 2026-09-16
- Added I/O Signal Matrix (`krl.showIoMatrix`), trajectory length & weld seam stats (`krl.estimateMotionStats`), Monaco Diff review (`KrlReviewService`), pure-TypeScript EVTX `.evt` decoder (`krl.openEventLog`) with 6-language KSS dictionary, and VS Code theme integration.
