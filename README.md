> *Trademark notice: KUKA®, WorkVisual®, iiQWorks®, KUKA.Sim®, SmartPAD®, and KRL are registered trademarks of KUKA Aktiengesellschaft / KUKA Roboter GmbH. KRL Engineering Toolkit is an independent engineering product by Liskin Labs and is not affiliated with, endorsed by, or sponsored by KUKA. Offline checks complement, and never replace, physical controller-side safety validation.*

<h1 align="center">KRL Engineering Toolkit for VS Code</h1>

<p align="center">
  <b>Industrial KRL IDE, Static Safety Analyzer, Backup Diff &amp; Live Controller Bridge for KUKA Robots.</b><br />
  Built for <b>KRC2, KRC4, and KRC5</b> (<code>KSS 5.x – 8.7</code> &amp; <code>KSS 9.x / iiQWorks / iiQKA.OS</code>) · <b>100% Offline-First · Zero Cloud Code Uploads</b>
</p>

<p align="center">
  [English](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.md) · [Русский](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.ru.md) · [Deutsch](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.de.md) · [Türkçe](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.tr.md) · [Español](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.es.md) · [Italiano](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.it.md)
</p>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension"><img src="https://img.shields.io/visual-studio-marketplace/v/LiskinLabs.kuka-krl-extension?style=flat-square&label=VS%20Code%20Marketplace&color=FF6600" alt="VS Code Marketplace" /></a>
  <a href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension"><img src="https://img.shields.io/visual-studio-marketplace/i/LiskinLabs.kuka-krl-extension?style=flat-square&label=Installs&color=2563EB" alt="Installs" /></a>
  <a href="https://open-vsx.org/extension/LiskinLabs/kuka-krl-extension"><img src="https://img.shields.io/open-vsx/v/LiskinLabs/kuka-krl-extension?style=flat-square&logo=eclipseche&logoColor=white&color=007ACC&label=Open%20VSX" alt="Open VSX" /></a>
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/releases"><img src="https://img.shields.io/badge/Release-v1.9.18-FF6600?style=flat-square&logo=visualstudiocode&logoColor=white" alt="Release v1.9.18" /></a>
  <a href="https://secure.software/vscode/packages/liskinlabs/kuka-krl-extension"><img src="https://img.shields.io/badge/Spectra%20Assure-PASSED%20(100%25)-10b981?style=flat-square&logo=shield&logoColor=white" alt="ReversingLabs Security Score" /></a>
  <a href="https://liskinlabs.github.io/kuka-krl-extension/"><img src="https://img.shields.io/badge/Commands-126-FF6600?style=flat-square" alt="126 Commands" /></a>
  <a href="https://liskinlabs.github.io/kuka-krl-extension/guide/pro-features"><img src="https://img.shields.io/badge/Pro%20Tools-63-0EA5E9?style=flat-square" alt="63 Pro Tools" /></a>
</p>

<p align="center">
  <a href="https://liskinlabs.github.io/kuka-krl-extension/guide/installation"><b>Install &amp; Quick Start</b></a> ·
  <a href="https://liskinlabs.github.io/kuka-krl-extension/"><b>Docs &amp; 64 Tool Guides</b></a> ·
  <a href="https://checkout.dodopayments.com/buy/pdt_0NmAV012KFHSjUMyDomJ6?redirect_url=https%3A%2F%2Fkuka-krl-support-gateway.redminotpro5.workers.dev%2Fcheckout%2Fsuccess%3Flang%3Den&singlePage=true&showDiscounts=true&discountCode=LAUNCH30"><b>Buy Pro Annual (30% Off: LAUNCH30)</b></a> ·
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/blob/main/SUPPORT.md"><b>Support &amp; Air-Gap Licensing</b></a>
</p>

> **Try all 63 Pro engineering tools free for 14 days — no credit card required:** press `Ctrl+Shift+P` in VS Code and run **`KRL: Start 14-Day Free Trial`** (`krl.startTrial`), or run **`KRL: View Pro Plans & Pricing`** (`krl.openPricingPlans`).

<p align="center">
  <img src="https://raw.githubusercontent.com/LiskinLabs/kuka-krl-extension/main/docs/public/media/kuka_control_center.gif" width="760" alt="KRL Engineering Toolkit Control Center and Live Controller Telemetry" />
</p>

---

## Built to Catch Faults Before Code Touches the Robot

Commissioning downtime costs **USD 10,000+ per hour** when a robot stalls on a broken fold, triggers an Advance Run stop (`$OUT` inside continuous motion), misses `BRAKE` before `RESUME` (`KSS 1422`), or runs with an unassigned `$TOOL`/`$BASE` frame.

**KRL Engineering Toolkit** brings **126 commands**, **957 built-in KSS system variables**, **183 robot kinematic profiles**, **VASS 26 / VKRC auditing**, and **live controller telemetry** into VS Code, Cursor, Windsurf, and Open VSX editors.

| What You Get Out of the Box | Free Community Edition | Pro / Team / Enterprise |
|---|---|---|
| Full KRL lexer, 6 shop-floor themes, smart autocomplete (`957` KSS vars, `116` functions) | Unlimited lines | Unlimited lines |
| Cross-file `F12` Go-to-Definition, Find All References, Outline, FOLD/ENDFOLD &amp; Declaration Sorter | Included | Included |
| Syntax diagnostics, block balancing, basic frame checks &amp; industrial snippet generator | Included | Included |
| Pre-deployment safety lint: Advance Run Guard, `S/T` kinematics, 183-robot reach check | Evaluation (30 days) | Full production |
| VASS 26 / `VW_USER` (`101..501`) automotive linter &amp; Motion 3-Way Integrity (`FOLD` vs `.dat`) | — | Full production |
| Live KSS 8.x WCF (port `49002`) &amp; iiQKA.OS telemetry, SmartPAD messages &amp; Compile Gate | — | Full production |
| Zero-unpack `.zip` / `.wvs` Explorer, Point Delta Diff (`ΔX/Y/Z`), 6D Transforms &amp; `.evt` Log Decoder | — | Full production |

---

## Core Engineering Capabilities

### 1. Live Controller Bridge &amp; SmartPAD Diagnostics (KSS 8.x &amp; iiQKA.OS 9.x)
Connect directly to KUKA controllers without launching heavy engineering suites or redistributing third-party DLLs:
- **Native KSS 8.x WCF Client**: Streams telemetry directly over port `49002` from pure Node.js (`0` WorkVisual/KUKA.Sim/Python dependencies).
- **iiQKA.OS (`KRC5` / `9.x`) gRPC Bridge &amp; Compile Gate**: Inspects active `$TOOL`/`$BASE`, axis torques/currents/temperatures, soft limits, PGNO signals, installed KOP packages, and runs controller-side compile checks (`krl.live.openMessages`).
- **Real-Time I/O &amp; Signal Inlay Hints**: Displays signal aliases inline next to `$IN[x]`, `$OUT[y]`, and `$FLAG[z]` directly in the editor.

<p align="center">
  <img src="https://raw.githubusercontent.com/LiskinLabs/kuka-krl-extension/main/docs/public/media/krl_io_signals.gif" width="760" alt="Real-Time I/O Signal Inspector and Inlay Hints" />
</p>

### 2. Pre-Deployment Safety, Kinematics &amp; Automotive Standards (VASS 26 / VKRC)
Detect runtime faults statically before loading a single `.src` file to the SmartPAD:
- **Kinematic &amp; Trajectory Guards**: Catches wrist/shoulder singularities, `CIRCLE` collinear/coincident points, `$APO.CDIS` over-approximation, `Status`/`Turn` bitmask errors, and Cartesian envelope violations across **183 KUKA robot models**.
- **Motion 3-Way Data Integrity**: Detects silent mismatches between SmartPAD `;FOLD` parameters (`VB`, tool, base) and underlying `.dat` records (`PDAT`/`LDAT`/`FDAT`).
- **Volkswagen VASS 26 / VKRC Suite**: Full offline diagnostics for `Folge`, `UP`, `MakroSps`, `VW_USER` (`101..501`), safety gate interlocks, and `Genau` tolerances.
- **Interactive Logic Flowchart Visualizer**: Generates zoomable SVG call/branch graphs for complex motion sequences.

<p align="center">
  <img src="https://raw.githubusercontent.com/LiskinLabs/kuka-krl-extension/main/docs/public/media/type-validation-demo.gif" width="760" alt="KRL Static Safety Validation and Type Checking" />
</p>

### 3. SmartPAD Archive Diff, 6D Transforms &amp; Binary `.evt` Logs
Inspect plant backups on site without cluttering your laptop with extracted folders:
- **Zero-Unpack ZIP &amp; `.wvs` Archive Mount**: Browse KRC backups as virtual workspaces, decode `.evt` Windows EVTX controller logs offline across 6 languages, and export CE/ISO 10218-1 acceptance reports.
- **Point Delta Inspector**: Compares backups side-by-side and flags 3D coordinate shifts (`ΔX, ΔY, ΔZ, A, B, C`) between shifts or cell versions.
- **6D Trajectory Batch Shift &amp; Mirroring**: Transforms selected motion points across Tool/Base frames with native VS Code Diff previews and AST checksum rollback safety.

<p align="center">
  <img src="https://raw.githubusercontent.com/LiskinLabs/kuka-krl-extension/main/docs/public/media/krc_backup_diff.gif" width="760" alt="KRC SmartPAD Backup Diff and Point Delta Inspector" />
</p>

### 4. High-Speed KRL Language Server (Free Community Foundation)
Every KRL engineer gets instant `F12` cross-file navigation (`.src` <-> `.dat`), inlay signal hints, KRL formatting, `FOLD`/`ENDFOLD` folding, declaration sorting, hover docs, and real-time syntax checking **forever free with zero line limits**.

<p align="center">
  <img src="https://raw.githubusercontent.com/LiskinLabs/kuka-krl-extension/main/docs/public/media/smart_autocomplete.gif" width="760" alt="Smart KRL Autocomplete and System Variable Documentation" />
</p>

---

## Editions, EULA &amp; Transparent Pricing

**Community Edition License:** Free forever for personal learning, academic teaching/non-commercial research, and a **30-day non-production commercial evaluation** (see [LICENSE.txt](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/LICENSE.txt)). Ongoing commercial engineering and plant commissioning require an active Pro, Team, Department, or Enterprise license.

> **Launch Promo (`LAUNCH30`):** Apply promo code **`LAUNCH30`** for **30% off** your checkout (pre-applied in the direct checkout links below). Processed via **Dodo Payments** (Merchant of Record) with global VAT/Sales Tax handling, **0% EU VIES Reverse Charge**, and automatic PDF tax invoices.

| Plan | Price (List) | Price w/ `LAUNCH30` (-30%) | Activations / Term | Best For | Action |
|---|---|---|---|---|---|
| **Community** | USD 0 | USD 0 | Personal / Academic / 30-day eval | Learning &amp; non-commercial KRL editing | [Install Free](https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension) |
| **Pro Monthly** | USD 19 / mo | **USD 13.30 / mo** | 1 workstation · Cancel anytime | Short commissioning trips | [Buy Monthly](https://checkout.dodopayments.com/buy/pdt_0NmAUzwdbzeERSktsOLTp?redirect_url=https%3A%2F%2Fkuka-krl-support-gateway.redminotpro5.workers.dev%2Fcheckout%2Fsuccess%3Flang%3Den&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Pro Annual** *(Recommended)* | USD 149 / yr | **USD 104.30 / yr** | 1 workstation · 1 year updates | Full-time robotics engineers | [Buy Annual (-30%)](https://checkout.dodopayments.com/buy/pdt_0NmAV012KFHSjUMyDomJ6?redirect_url=https%3A%2F%2Fkuka-krl-support-gateway.redminotpro5.workers.dev%2Fcheckout%2Fsuccess%3Flang%3Den&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Pro Lifetime** | USD 699 once | **USD 489.30 once** | 1 workstation · Perpetual | Independent consultants | [Buy Lifetime](https://checkout.dodopayments.com/buy/pdt_0NmAcoqVCfuwQ6Xx7qyqr?redirect_url=https%3A%2F%2Fkuka-krl-support-gateway.redminotpro5.workers.dev%2Fcheckout%2Fsuccess%3Flang%3Den&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Team Edition** | USD 499 / yr | **USD 349.30 / yr** | **5 workstations** · Single PO/invoice | Automation cell teams | [Buy Team (5 Seats)](https://checkout.dodopayments.com/buy/pdt_0NnLCdgD69GiXDLRJ0K5v?redirect_url=https%3A%2F%2Fkuka-krl-support-gateway.redminotpro5.workers.dev%2Fcheckout%2Fsuccess%3Flang%3Den&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Department / Integrator** | USD 1,499 / yr | **USD 1,049.30 / yr** | **20 workstations** · Air-Gap support | System integration firms | [Buy Department (20 Seats)](https://checkout.dodopayments.com/buy/pdt_0Nq5QVTrbkJbWAUf8qoyn?redirect_url=https%3A%2F%2Fkuka-krl-support-gateway.redminotpro5.workers.dev%2Fcheckout%2Fsuccess%3Flang%3Den&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Enterprise Plant** | USD 4,999 / yr | Custom PO Quote | **100 workstations** · Priority relay | Manufacturing plants &amp; OEMs | [Request Corporate Invoice](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/SUPPORT.md#2-14-day-free-trial-upgrades--billing-dodo-payments-mor) |

Already purchased? **[Activate License Online](https://kuka-krl-support-gateway.redminotpro5.workers.dev/activate)** · **[Generate Air-Gap `.lic` File](https://kuka-krl-support-gateway.redminotpro5.workers.dev/airgap)** · **[Customer Portal &amp; VAT Invoices](https://customer.dodopayments.com/login/bus_0NlrxPhrg9eHzPZKAgsF1)**

---

## Shop-Floor &amp; Air-Gap Resilience

- **100% Local Processing**: All `.src`, `.dat`, `.sub`, `.wvs`, and `.evt` files stay in local RAM. Zero robot code ever leaves your machine ([PRIVACY.md](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/PRIVACY.md)).
- **30-Day Offline Cache + 14-Day Grace**: Once validated, commercial licenses run offline inside shielded factory cells for 30 days without re-checking.
- **Full Air-Gap Mode**: Issue cryptographically signed Ed25519 `.lic` files from the [Air-Gap Portal](https://kuka-krl-support-gateway.redminotpro5.workers.dev/airgap) and import via `krl.importOfflineLicenseFile`.

---

## What's New in v1.9.17

- **Native KSS 8.x WCF Client**: Runs port `49002` KSS 8.x telemetry purely inside Node.js without WorkVisual, KUKA.Sim, Python, or third-party DLLs.
- **Complete iiQKA.OS Telemetry &amp; SmartPAD Window**: Adds Tool/Base frames, safety interlocks, per-axis torque/temp/current/velocity, PGNO flags, KOP inventory, and searchable SmartPAD history (`krl.live.openMessages`).
- **Target KSS Compile Gate &amp; Version-Aware Migration (`KSS 8.3 – 9.3`)**: Accurate `PDAT`/`LDAT` profiles and FOLD/Params parity validated live on KSS 8.6.2, KSS 8.7, iiQKA 9.2.3, and iiQKA 9.3.4.
- **Full Release History**: See [CHANGELOG.md](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/CHANGELOG.md).
