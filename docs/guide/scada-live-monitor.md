# Live Controller Monitor

Near-real-time telemetry and online controller bridge for KUKA `KR C2`, `KR C4`, and `KR C5` systems (`KR C5 micro`, `KR C5-2`).

---

## Overview

The **Live Controller Monitor** (`krl.live.connect`, `krl.live.openDashboard`) establishes a direct Ethernet connection between VS Code and physical KUKA robot controllers running `KSS 5.4–8.7`, `VSS (VKRC) 8.3–8.7`, and `iiQKA.OS2 9.0–9.3`.

It brings shop-floor telemetry, 6-axis joint torque feedback, Cartesian TCP tracking, a 4096-pin I/O matrix, SVG watch trends, a 7-check controller health view, and live SmartPAD alarms directly into your engineering workspace.

> **Runtime requirement:** `KSS 8.x` live telemetry uses the built-in native WCF OnlineServices client (port `49002`); WorkVisual, KUKA.Sim and vendor DLLs are not required. `iiQKA.OS2 9.0–9.3` uses native gRPC over TLS (`443`), and KUKAVARPROXY / C3Bridge (`7000`) remains an optional fallback for legacy `KR C2`/`KR C4` cells. Controller credentials are stored per-host in VS Code `SecretStorage`. The extension does not bundle KUKA software. SMB backup requires the controller's KRC share.

---

## Architecture & Official KUKA Ports

The live monitor selects the native transport for each controller generation (cross-checked against official KUKA port specifications `GC464` and `GC855`):

1. **WCF OnlineServices (`TCP 49002`)**: Native Windows service running on `KR C4` / `KR C5` `smartHMI` platforms (`KSS 8.x` / `VSS`). Talked to directly from Node.js over `[MS-NMF]` + `[MC-NBFS]` — no WorkVisual, KUKA.Sim or vendor DLLs required.
2. **iiQKA.OS2 gRPC / SmartHMI (`TCP 443`, Ory Kratos auth)**: Native Node.js client for `iiQKA.OS2 9.0–9.3` (`KR C5` / `KR C5 micro` / `KR C5-2`) with live telemetry and remote compile gate.
3. **OPC UA Server (`TCP 4840`)**: Non-intrusive connectivity probe verifying OPC UA server availability (`KSS 8.x` / `iiQKA.OS2`).
4. **KUKAVARPROXY / C3Bridge (`TCP 7000`)**: High-frequency cyclical variable bridge for `$AXIS_ACT`, `$POS_ACT`, `$TORQMON`, and `$IN`/`$OUT` polling on `KR C2` and `KR C4`.
5. **Ethernet KRL (`TCP/UDP 54600–54615`) & RSI (`49152+` / `60809` on iiQKA.OS2)**: Configurable XML/JSON sensor and real-time trajectory correction interfaces.

```
+-------------------------------------------------------------+
|                VS Code Engineering Workstation              |
|    (KRL Engineering Toolkit + Live Dashboard + SecretStore) |
+-------------------------------------------------------------+
                              |
                     Industrial Ethernet
                    (TCP/IP, OT Subnet)
                              |
                              v
+-------------------------------------------------------------+
|                 KUKA Physical Controller                    |
|  +----------------------+  +------------------------------+ |
|  | WCF (49002)          |  | KUKAVARPROXY (7000)          | |
|  | iiQKA gRPC (443)     |  | OPC UA Probe (4840)          | |
|  +----------------------+  +------------------------------+ |
|  | SmartPAD Alarms      |  | $AXIS_ACT, $POS_ACT, $TORQMON| |
|  | Compile Gate / KOP   |  | $IN[1..4096], KrcIoSignals   | |
|  +----------------------+  +------------------------------+ |
+-------------------------------------------------------------+
```

---

## Core Capabilities

### 1. Real-Time 6-Axis Telemetry Gauges
* **Live Joint Tracking**: Real-time readout of `$AXIS_ACT` and `$AXIS_MOT` for axes A1 through A6.
* **Torque Load & Velocity Bars**: Dynamic load bars displaying current motor torques against `$TORQMON` limits, highlighting mechanical stress points before axis overloads occur.
* **Axis Limit Indicators**: Color-coded proximity warnings when joints approach physical soft limits (`$SOFTP_END`, `$SOFTN_END`).

### 2. Cartesian TCP Position & Coordinate Frames
* **Current TCP Readout**: Real-time position tracking (`$POS_ACT`) with X, Y, Z millimeter coordinates and Euler orientation angles A, B, C.
* **Active Frame Status**: Displays currently loaded `$TOOL` (Tool Number and dimensions) and `$BASE` (Workpiece coordinate reference).

### 3. Dynamic 4096-Pin I/O Matrix & Watch SVG Trends
* **4096-Pin Discrete Grid + `CFG` Filter**: Multi-bank visual grid for `$IN[1..4096]` and `$OUT[1..4096]` channels with a **CFG** filter synced to WorkVisual `KrcIoSignals.xml` and SmartPAD `UserTexts.kxr` / `$config.dat` descriptions.
* **Internal Flags & Timers**: Live inspection of `$FLAG[1..1024]` and `$TIMER[1..64]`.
* **Watch SVG Trends & Pulse Highlights**: Live SVG sparkline trends for watched signals and visual edge transitions to trace PLC handshake timing during production cycles.

### 4. SmartPAD Alarm Stream, 7-Check Health Tab & Compile Gate
* **Live Message Timeline**: Real-time stream of controller events, status messages, and emergency stops (up to 200 messages in `krl.live.openMessages` with search and type filters).
* **7-Check Health Tab**: Consolidated operational check covering drives, safety stops, mode (`T1`/`T2`/`AUT`/`EXT`), SPS status, active connection, and KSS/iiQKA version.
* **Zero-Config Discovery & Cross-Subnet Scout**: Automatically locates online KRC and iiQKA controllers across local subnets and routed shop-floor VLANs.
* **Target-KSS Compile Gate with Retry**: Executes `SynchronizeMirror -> AnalyzeAllKrlFiles -> GetModuleInfos` with retry handling when the controller bus is busy (`KSS 9.3+` requires explicit `*.src` / `*.dat` patterns).
* **Multilingual Subtitles (`KSS_LOOKUP`)**: Displays English and Russian reference descriptions beneath raw controller message codes during international commissioning.

### 5. Hot Controller Backup over Ethernet
* **Online Archiving**: Download complete, clean `.zip` controller backup archives directly over Ethernet (SMB `KRC` share or controller transport).
* **Read-only telemetry:** The telemetry client is non-blocking.
* **Online backup:** The backup is a controller-side operation; validate it on a non-production controller before use.

---

## Commands & Keybindings

| Command | Identifier | Description |
|---|---|---|
| KUKA KRL: Connect to KUKA Robot | `krl.live.connect` | Open live connection wizard (WCF / gRPC / KVP / Scout) |
| KUKA KRL: Open Live Monitor Dashboard | `krl.live.openDashboard` | Launch real-time telemetry, Watch SVG trends & Health tab |
| KUKA KRL: Open SmartPAD Messages | `krl.live.openMessages` | Open full SmartPAD message history (up to 200, filters/search) |
| KUKA KRL: Download Controller Backup | `krl.live.fetchBackup` | Download a `.zip` backup from the controller |

---

## Highlights in v1.9.25–1.9.27

- **Zero-Config Discovery & Cross-Subnet Scout**: Locate online KRC / iiQKA controllers across routed industrial subnets without manual IP scanning.
- **`CFG` I/O Filter, `UserTexts.kxr` & OPC UA `4840` Probe**: Filter 4,096 I/O pins down to active channels declared in `KrcIoSignals.xml` with SmartPAD labels, SVG watch trends, and port `4840` reachability checks.
- **7-Check Health Tab & Resilient Compile Gate**: Single-view cell readiness diagnostics plus retry-safe `SynchronizeMirror -> AnalyzeAllKrlFiles -> GetModuleInfos` verification for `KSS 9.3+`.
- **Hardened Credentials (`SecretStorage`)**: Per-host controller credentials live exclusively in VS Code `SecretStorage` with zero default passwords.
