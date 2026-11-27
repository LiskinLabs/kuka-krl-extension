<h1 align="center">KRL Engineering Toolkit for KUKA® Robotics</h1>

<p align="center">
  KRL language server, static safety diagnostics, zero-unpack backup diff, WorkVisual (<code>.wvs</code>) inspector, and live controller telemetry inside VS Code, Cursor &amp; Windsurf.<br />
  Supports <b>KR C2, KR C4 &amp; KR C5 (micro / -2)</b> · <code>KSS 5.4–8.7</code> · <code>VSS (VKRC) 8.3–8.7</code> · <code>iiQKA.OS2 9.0–9.3</code> · <b>100% Local Processing · Zero Cloud Code Uploads</b>
</p>

<p align="center">
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.md"><b>English</b></a> ·
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.ru.md">Русский</a> ·
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.de.md">Deutsch</a> ·
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.tr.md">Türkçe</a> ·
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.es.md">Español</a> ·
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.it.md">Italiano</a>
</p>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension"><img src="https://vsmarketplacebadges.dev/version-short/LiskinLabs.kuka-krl-extension.svg?style=flat-square&label=VS%20Code%20Marketplace&color=FF6600" alt="VS Code Marketplace" /></a>
  <a href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension"><img src="https://vsmarketplacebadges.dev/installs-short/LiskinLabs.kuka-krl-extension.svg?style=flat-square&label=Marketplace%20Installs&color=2563EB" alt="Installs" /></a>
  <a href="https://open-vsx.org/extension/LiskinLabs/kuka-krl-extension"><img src="https://img.shields.io/open-vsx/v/LiskinLabs/kuka-krl-extension?style=flat-square&logo=eclipseche&logoColor=white&color=007ACC&label=Open%20VSX" alt="Open VSX" /></a>
  <a href="https://open-vsx.org/extension/LiskinLabs/kuka-krl-extension"><img src="https://img.shields.io/open-vsx/dt/LiskinLabs/kuka-krl-extension?style=flat-square&logo=eclipseche&logoColor=white&color=007ACC&label=Open%20VSX%20Downloads" alt="Open VSX Downloads" /></a>
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/releases"><img src="https://img.shields.io/badge/Release-v1.9.27-FF6600?style=flat-square&logo=visualstudiocode&logoColor=white" alt="Release v1.9.27" /></a>
  <a href="https://secure.software/vscode/packages/liskinlabs/kuka-krl-extension"><img src="https://img.shields.io/badge/Spectra%20Assure-PASSED%20(0%20CVE)-10b981?style=flat-square&logo=shield&logoColor=white" alt="Spectra Assure Security Check" /></a>
  <a href="https://liskinlabs.com/"><img src="https://img.shields.io/badge/Fleet%20Audited-4.13M%2B%20LoC-10b981?style=flat-square" alt="Fleet Audited 4.13M+ LoC" /></a>
  <a href="https://liskinlabs.com/guide/pro-features"><img src="https://img.shields.io/badge/Commands-136%20(69%20Free%20%7C%2067%20Pro)-0EA5E9?style=flat-square" alt="136 Commands" /></a>
</p>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension"><b>Install from Marketplace</b></a> ·
  <a href="https://open-vsx.org/extension/LiskinLabs/kuka-krl-extension"><b>Install from Open VSX</b></a> ·
  <a href="https://liskinlabs.com/"><b>Documentation</b></a> · ·
  <a href="https://sim.liskinlabs.com/"><b>3D Simulator</b></a> ·
  <a href="mailto:info@liskinlabs.com"><b>info@liskinlabs.com</b></a>
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/blob/main/SUPPORT.md"><b>Support &amp; Air-Gap Licensing</b></a>
</p>

> **14-day Pro trial with no card required:** press `Ctrl+Shift+P` in VS Code and run **`KRL: Start 14-Day Free Trial`** (`krl.startTrial`), or compare plans with **`KRL: View Pricing Plans & Upgrade Options`** (`krl.openPricingPlans`).

<p align="center">
  <img src="https://raw.githubusercontent.com/LiskinLabs/kuka-krl-extension/main/docs/public/media/kuka_control_center.gif" width="780" alt="KRL Engineering Toolkit Control Center and Live Controller Telemetry" />
</p>

---

## Common Controller Issues Caught Before Commissioning

| Controller Issue | Missed by Generic Editors | Handled by KRL Engineering Toolkit |
|---|---|---|
| **Missing `BRAKE` before `RESUME`** | `RESUME` in an interrupt without preceding `BRAKE` triggers an advance-run stop so the robot completes the active segment instead of braking immediately, and fails with `KSS 1584` on stack / `$ADVANCE=0` mismatch | Static analyzer flags missing `BRAKE` (or `INTERRUPT WITH BRAKE`), and `Ctrl+.` inserts `BRAKE` cleanly with Diff preview |
| **Advance Run Stops (`$OUT` / `WAIT`)** | Direct `$OUT` writes inside `C_DIS` / spline blending trigger a Vorlaufstopp | Detects advance-breaking statements and suggests `TRIGGER WHEN DISTANCE=0 DELAY=0 DO $OUT[...] = TRUE` |
| **SmartPAD Shift Point Drift** | Taught `E6POS` tweaks overwritten across shifts without change tracking | Mounts `.zip` / `.ibz` / `KRCDiag` archives in memory (`< 80 ms`) and computes 6D deltas (`ΔX, ΔY, ΔZ, A, B, C`) in standard Diff |
| **`;FOLD` / `.dat` / Version Mismatches** | Manual edits desync XML `;Params`, leave `PDAT.VEL` in KSS 9.x, or place motion inside `DRYRUN ... ENDDRYRUN` | Synchronizes `;FOLD`, `.dat`, `SVEL_CP2` / `PDAT` / `LDAT` across `KSS 5.4–9.3` (`14` profiles) and flags motion inside `DRYRUN` |
| **Encoding & UTF-8 BOM Corruption** | Stray `\xEF\xBB\xBF` breaks `iiQKA.OS2`, or wrong encoding corrupts Cyrillic / German comments | Preserves UTF-8 without BOM (`iiQKA.OS2`), `CP1251`, `Windows-1252`, and `UTF-16LE` with round-trip `.dat` sync |
| **Offline `.wvs` & I/O Inspection** | Booting heavy vendor suites on Windows just to inspect bus topology or signals | Opens `.wvs` / `.vcmx` on Windows, macOS, and Linux, or connects over official KUKA ports (`49002`, `443`, `4840`, `7000`) |

---

## Measured Scope & Security Baseline

- **Tested on 108 factory KUKA backups**: `4,136,829` lines of production KRL scanned end-to-end in `25.4 s`.
- **Built-in KSS reference**: `957` system variables (`127` manual-accurate read-only guards + version gating), `116+` KRL / EKI 6.x / RSI 6.x functions, `111` structs, `112` enums, `183` KUKA robot reach/kinematic profiles, and `136` commands (`69` Free + `67` Pro).
- **Controller-tested protocols**: `KSS 8.6.2 (OfficeLite)`, `KSS 8.7 (KR C5)`, `iiQKA.OS2 9.2.3 (VRC)`, and `iiQKA.OS2 9.3.4 (KR C5)`.
- **Security & Air-Gap**: ReversingLabs Spectra Assure PASSED (`0 CVE`), `100%` local RAM processing, zero cloud source uploads, offline Ed25519 `.lic` activation.

---

## Core Engineering Suites

### 1. Live Controller Bridge, Fieldbus I/O & Health Check `[PRO]`
Direct Ethernet communication from Node.js/TypeScript without WorkVisual, KUKA.Sim, Python, or third-party vendor DLLs:
- **Official KUKA Ports (`GC464` / `GC855`)**: `WCF OnlineServices` (`TCP 49002`), `iiQKA.OS2` gRPC/TLS (`TCP 443`, Ory Kratos auth), read-only `OPC UA` probe (`TCP 4840`), `KUKAVARPROXY / C3Bridge` (`TCP 7000`), and Ethernet KRL / RSI descriptors (`54600–54615`, `49152+` / `60809`).
- **Zero-Config Discovery & `SecretStorage`**: Automatic controller discovery with no hardcoded IPs or default passwords, optional Cross-Subnet Scout (`krl.liveController.autoScanSubnets`), and per-host encrypted credentials in VS Code `SecretStorage` (`krl.live.changeCredentials`).
- **4096-Pin I/O, `KrcIoSignals.xml` `CFG` Filter & `UserTexts.kxr`**: Reads `$config.dat`, `$machine.dat`, PROFINET/iiQWorks module labels, and SmartPAD `UserTexts.kxr` descriptions; supports 128-pin paging, direct `$IN[n]` jump, Watch SVG sparkline trends, Logbook / SmartPAD Messages (`krl.live.openMessages`), 7-check Health tab, and target Compile Gate with retry.

<p align="center">
  <img src="https://raw.githubusercontent.com/LiskinLabs/kuka-krl-extension/main/docs/public/media/krl_io_signals.gif" width="760" alt="Real-Time I/O Signal Inspector and Inlay Hints" />
</p>

### 2. Static Safety Diagnostics, Safe Auto-Repair & Migration `[PRO]`
- **Deterministic Diff Auto-Repair (`krl.fixAllSafeIssuesInFile`)**: Fixes missing `BRAKE` before `RESUME`, BOM / non-ASCII artifacts, uncommitted `$LOAD` / `BAS(#TOOL)`, `;FOLD`/`;ENDFOLD` mismatches, `FOR STEP 0`, duplicate blending modifiers (`C_DIS`, `C_PTP`), and Inline-Form `;Params` drift inside VS Code Diff with AST rollback guard and unused variable cleanup (`krl.cleanupUnusedVariables`).
- **Documentation-Aligned KRL & `iiQKA.OS2` Parity**: Enforces `KSS 5.4–8.7` / `iiQKA.OS2 9.0–9.3` approximation matrix (`C_APX`, `C_SPL`), `TRIGGER WHEN DISTANCE/PATH`, `SPLINE ... ENDSPLINE`, interrupt limits (`32/16` vs `64/32`), `DRYRUN ... ENDDRYRUN` motion prohibition (`krl-dryrun-motion`), analytical wrist singularity (`|A5| <= 5°`), `SPS.SUB` diagnostics, and reach checks across `183` KUKA robots.
- **Bidirectional `KSS 5.4–9.3` Migration (`krl.convertToIiqkaFold`)**: `14` KSS profiles covering `PDAT`/`LDAT` rules (`VEL` removal, `SVEL_CP2`/`SACC_CP2`, `MotionParamSets.dat`), VKRC VASS preservation, and **Volkswagen VASS 26 / VKRC** linting (`Folge`, `UP`, `MakroSps`, `VW_USER 101..501`).

<p align="center">
  <img src="https://raw.githubusercontent.com/LiskinLabs/kuka-krl-extension/main/docs/public/media/type-validation-demo.gif" width="760" alt="KRL Static Safety Validation and Type Checking" />
</p>

### 3. Zero-Unpack Archives, `.wvs` Fieldbus Export & `.vcmx` `[PRO]`
- **In-Memory `.zip` / `.ibz` / `KRCDiag` Mount**: Open archives as VS Code workspaces (`< 80 ms` save sync), diff 6D `E6POS` point deltas, run batch frame shifts/mirroring, and decode binary Windows `.evt` (EVTX) / `krc.log` event logs offline across 6 languages.
- **WorkVisual `.wvs` Inspector (`krl.inspectFieldbusTopology`)**: Parses KOP catalogs and EtherCAT/PROFINET I/O tables and exports directly to **Siemens TIA Portal**, **Beckhoff TwinCAT 3**, and **EPLAN**.
- **`.vcmx` Validator & ISO Acceptance Protocols**: Checks `VCMX001–VCMX004` simulation deadlocks (`krl.inspectWorkcellLayout`, `krl.validateWorkcellSimulation`) and generates printable **ISO 10218-1/-2 Commissioning Acceptance Reports** (`krl.generateReport`).

<p align="center">
  <img src="https://raw.githubusercontent.com/LiskinLabs/kuka-krl-extension/main/docs/public/media/krc_backup_diff.gif" width="760" alt="KRC SmartPAD Backup Diff and Point Delta Inspector" />
</p>

### 4. Flowcharts, `iiQKA.RSI 6.x` / `EKI 6.x`, CAM G-Code & MCP `[PRO]`
- **SVG Control Flow Graph (`krl.showFlowchart`)**: Interactive diagram for `IF`, `SWITCH`, `LOOP`, `FOR`, and subprograms with click-to-line navigation and SVG export.
- **`KUKA.RSI` & `iiQKA.RSI 6.x` / `EKI 6.x` (`krl.validateRsiXml`, `krl.generateRsiCode`, `krl.generateEkiCode`)**: Validates XML descriptors and generates both classic (`RSI_CREATE`/`RSI_ON`/`EKI_STATUS`) and `iiQKA 6.x` (`RSI_LOAD`/`RSI_ACTIVATE`/`RSI_PROCESS_ON()`/`EKI_Load`) code.
- **CAM G-Code / SVG Importer (`krl.importGcodeToKrl`) & Hand-Eye Calibration (`krl.generateVisionCalibration`)**: Converts CNC `G0`–`G3` / SVG contours to KRL and generates 9-pose vision calibration routines.
- **Local MCP Bridge (`127.0.0.1`)**: Exposes read-only diagnostics, telemetry, and variable lookups locally to Cursor, Claude Code, and Windsurf.

<p align="center">
  <img src="https://raw.githubusercontent.com/LiskinLabs/kuka-krl-extension/main/docs/public/media/control_flow_graph.gif" width="760" alt="KUKA Interactive Control Flow Graph Generator" />
</p>

### 5. KRL Language Server — Free for Personal & Academic Use `[FREE CORE]`
- `F12` Go-to-Definition (`.src` <-> `.dat`), Find References, module-isolated Rename Symbol, Call Hierarchy, and Document Outline (`69` Free Commands).
- Autocomplete and hover documentation for `957` system variables, `116+` functions, `111` structs, `112` enums, and inline I/O signal hints.
- `;FOLD` folding, verbatim `;%{PE}` ILF formatting, `CP1251`/`Windows-1252` decoding, declaration sorter, block balance checks, and 6 shop-floor color themes.

<p align="center">
  <img src="https://raw.githubusercontent.com/LiskinLabs/kuka-krl-extension/main/docs/public/media/smart_autocomplete.gif" width="760" alt="Smart KRL Autocomplete and System Variable Documentation" />
</p>

> **Engineering Boundary:** KRL Engineering Toolkit complements — and does not replace — **KUKA WorkVisual** or **iiQWorks.Sim** for fieldbus hardware configuration, SafeOperation setup, and final controller deployment. It is **not safety-certified software (Non-SIL / Non-PL)**.

---

## Licensing & Pricing

**Community Edition:** Free for personal learning, academic teaching, and non-commercial research ([LICENSE.txt](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/LICENSE.txt)). Commercial use and Pro modules include a **14-day free trial** (`krl.startTrial`) before requiring a commercial license.

| Tier | Standard Price | Seats & Terms | Intended For | Checkout |
|---|---|---|---|---|
| **Community** | USD 0 | Personal / Academic · 14-day Pro trial | Learning & non-commercial work | [Install Free](https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension) |
| **Pro Monthly** | USD 19 / mo | 1 workstation · Cancel anytime | Short commissioning trips | [Subscribe Monthly](https://checkout.dodopayments.com/buy/pdt_0NmAUzwdbzeERSktsOLTp?redirect_url=https%3A%2F%2Fapi.liskinlabs.com%2Fcheckout%2Fsuccess%3Flang%3Den&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Pro Annual** | USD 149 / yr | 1 workstation · 1 year updates | Full-time KUKA engineers | [Buy Annual](https://checkout.dodopayments.com/buy/pdt_0NmAV012KFHSjUMyDomJ6?redirect_url=https%3A%2F%2Fapi.liskinlabs.com%2Fcheckout%2Fsuccess%3Flang%3Den&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Pro Lifetime** | USD 699 once | 1 workstation · Perpetual | Independent consultants | [Buy Lifetime](https://checkout.dodopayments.com/buy/pdt_0NmAcoqVCfuwQ6Xx7qyqr?redirect_url=https%3A%2F%2Fapi.liskinlabs.com%2Fcheckout%2Fsuccess%3Flang%3Den&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Team** | USD 499 / yr | 5 workstations · Single invoice | Engineering teams | [Buy Team](https://checkout.dodopayments.com/buy/pdt_0NnLCdgD69GiXDLRJ0K5v?redirect_url=https%3A%2F%2Fapi.liskinlabs.com%2Fcheckout%2Fsuccess%3Flang%3Den&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Department** | USD 1,499 / yr | 20 workstations · Air-Gap support | System integrators | [Buy Department](https://checkout.dodopayments.com/buy/pdt_0Nq5QVTrbkJbWAUf8qoyn?redirect_url=https%3A%2F%2Fapi.liskinlabs.com%2Fcheckout%2Fsuccess%3Flang%3Den&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Enterprise** | USD 4,999 / yr | 100 workstations · PO & SLA | Plants & OEMs | [B2B Procurement](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/SUPPORT.md#2-14-day-free-trial-upgrades--billing-dodo-payments-mor) |

<sub>Launch promo code `LAUNCH30` (30% off) is pre-applied in checkout links above. Payments and VAT/VIES invoices are processed by Dodo Payments (Merchant of Record). Already licensed: <a href="https://api.liskinlabs.com/activate">Activate Online</a> · <a href="https://api.liskinlabs.com/airgap">Generate Air-Gap .lic</a> · <a href="https://customer.dodopayments.com/login/bus_0NlrxPhrg9eHzPZKAgsF1">Customer Portal</a> · <a href="mailto:info@liskinlabs.com">info@liskinlabs.com</a>.</sub>

---

## Quick Start & Air-Gap Operation

```bash
code --install-extension LiskinLabs.kuka-krl-extension
```

1. Open a KRL workspace or archive (`.src`, `.dat`, `.sub`, `.zip`, `.ibz`, `.wvs`, `.vcmx`, `.evt`).
2. Press `Ctrl+Shift+P` -> **`KRL: Start 14-Day Free Trial`** (`krl.startTrial`) or **`KRL: Open Control Center`** (`krl.openControlCenter`).
3. Audit code offline or connect live over Ethernet (`49002` KSS 8.x WCF, `443` iiQKA.OS2 gRPC, `7000` KVP, `4840` OPC UA probe).

- **Local Storage Only**: Robot code, archives, and logs stay on your workstation ([PRIVACY.md](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/PRIVACY.md)).
- **Paid Offline Grace & Air-Gap `.lic`**: Activated commercial seats operate offline for 30 days between checks, or permanently via Ed25519 `.lic` certificates (`krl.exportHardwareIdFile` / `krl.importOfflineLicenseFile`).
- **Release History**: [CHANGELOG.md](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/CHANGELOG.md).

---

## Safety Compliance & Legal Notices

**KRL Engineering Toolkit** is developed by **Liskin Labs** (`Non-SIL / Non-PL`). Offline diagnostics do not replace physical controller verification, reduced-speed `T1` testing (`$OV_PRO <= 30%`) on the KUKA SmartPAD, or safety risk assessment under **ISO 10218-1/-2** and **ISO 13849-1**.

KUKA®, WorkVisual®, iiQWorks®, KUKA.Sim®, SmartPAD®, and KRL are registered trademarks of KUKA Aktiengesellschaft / KUKA Roboter GmbH. KRL Engineering Toolkit is an independent software product and is not affiliated with, endorsed by, or sponsored by KUKA.
