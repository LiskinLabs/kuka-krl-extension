# Live Controller Monitor

Near-real-time telemetry and online controller bridge for KUKA KRC2, KRC4, and KRC5 systems.

---

## Overview

The **Live Controller Monitor** (`krl.live.connect`, `krl.live.openDashboard`) establishes a direct, high-frequency Ethernet connection between VS Code and physical KUKA robot controllers running KSS 5.x through 8.7+ and iiQKA 9.x.

It brings shop-floor telemetry, 6-axis joint torque feedback, Cartesian TCP tracking, a 4096-pin I/O matrix, and live SmartPAD alarms with multilingual subtitles directly into your engineering workspace.

> **Runtime requirement:** KSS 8.x live telemetry uses the built-in native WCF OnlineServices client (port 49002); WorkVisual, KUKA.Sim and vendor DLLs are not required. iiQKA.OS 9.x uses native gRPC, and KUKAVARPROXY/C3Bridge remains an optional fallback. The extension does not bundle KUKA software. SMB backup requires the controller's KRC share.

---

## Architecture & Communication Protocols

The live monitor uses a resilient dual-driver communication architecture:

1. **WCF OnlineServices**: Native encrypted Windows service running on KRC4/KRC5 smartHMI platforms. The extension talks to it directly from Node.js over `[MS-NMF]` + `[MC-NBFS]` on port 49002 — no WorkVisual, KUKA.Sim or vendor DLLs.
2. **KUKAVARPROXY (Port 7000)**: Ultra-low-latency variable bridge delivering high-frequency cyclical polling for real-time kinematics and I/O channels.
3. **CrossComm (WinGate Port 49000)**: Legacy cross-communication driver for KRC2 and early KRC4 controllers.
4. **iiQKA.OS gRPC**: Kratos-authenticated native Node.js client on port 443/5018 for KSS 9.x controllers.

```
+-------------------------------------------------------------+
|                VS Code Engineering Workstation              |
|        (KRL Engineering Toolkit + Live Dashboard)      |
+-------------------------------------------------------------+
                              |
                     Industrial Ethernet
                    (TCP/IP, OT Subnet)
                              |
                              v
+-------------------------------------------------------------+
|                 KUKA Physical Controller                    |
|  +--------------------+  +--------------------------------+ |
|  | WCF OnlineServices |  |  KUKAVARPROXY (Port 7000)      | |
|  +--------------------+  +--------------------------------+ |
|  | SmartPAD Alarms    |  |  $AXIS_ACT, $POS_ACT, $TORQMON | |
|  | Option Packages    |  |  $IN[1..4096], $OUT[1..4096]   | |
|  +--------------------+  +--------------------------------+ |
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

### 3. Dynamic Digital & Analog I/O Matrix
* **4096-Pin Discrete Grid**: Multi-bank visual grid for `$IN[1..4096]` and `$OUT[1..4096]` channels.
* **Internal Flags & Timers**: Live inspection of `$FLAG[1..1024]` and `$TIMER[1..64]`.
* **Pulse Animations**: Visual glow animations on state transitions to trace PLC handshake timing during production cycles.

### 4. SmartPAD Alarm Stream & Multilingual Translation Subtitles
* **Live Message Timeline**: Real-time stream of controller events, status messages, and emergency stops.
* **Automatic Severity Tagging**: Instant categorisation into Error, Warning, Dialog, and Status notices.
* **Multilingual Subtitles (`KSS_LOOKUP`)**: Eliminates language barriers during international commissioning. If the physical controller displays messages in German or Turkish, the extension displays English and Russian reference descriptions beneath the raw message code (e.g. `KSS00203`, `KSS01442`, `KSS01123`).

### 5. Hot Controller Backup over Ethernet
* **Online Archiving**: Download complete, clean `.zip` controller backup archives directly over Ethernet.
* **Read-only telemetry:** The telemetry client is non-blocking.
* **Online backup:** The backup is a controller-side operation; validate it on a non-production controller before use.

---

## Commands & Keybindings

| Command | Identifier | Description |
|---|---|---|
| KUKA KRL: Connect to KUKA Robot | `krl.live.connect` | Open live Ethernet connection modal |
| KUKA KRL: Open Live Monitor Dashboard | `krl.live.openDashboard` | Launch real-time telemetry dashboard |
| KUKA KRL: Open SmartPAD Messages | `krl.live.openMessages` | Open the full SmartPAD message history (up to 200, filters/search) |
| KUKA KRL: Download Controller Backup | `krl.live.fetchBackup` | Download a `.zip` backup from the controller |

---

## What's new in 1.9.17

- **Full iiQKA.OS telemetry**: tool/base frames, safety interlocks, per-axis torque/temperature/current/velocity, soft limits, PGNO details, installed KOP packages and `$V_ROBCOR`.
- **SmartPAD message window**: the dashboard keeps the latest three messages; the full history (up to 200, newest first) opens in a dedicated panel with type filters, search and live refresh (`krl.live.openMessages`).
- **Target-KSS compile gate**: the iiQKA.OS card runs `SynchronizeMirror -> AnalyzeAllKrlFiles -> GetModuleInfos` and reports the real module verdict. KSS 9.3 requires explicit `*.src` / `*.dat` patterns (the bare `*` returns `13 INTERNAL: BSCmdNA`).
- **Validated transports**: WCF 49002 on KSS 8.6.2 (OfficeLite) and KSS 8.7 (KR C5); iiQKA gRPC on KSS 9.2.3 (VRC) and KSS 9.3.4 (KRC5).
