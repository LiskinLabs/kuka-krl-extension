# Industrial SCADA & Real-Time Controller Monitor

Real-time telemetry and online controller bridge for KUKA KRC2, KRC4, and KRC5 systems.

---

## Overview

The **Industrial SCADA Live Monitor** (`krl.connectKukaRobot`, `krl.openLiveBridge`) establishes a direct, high-frequency Ethernet connection between VS Code and physical KUKA robot controllers running KSS 5.x through 8.7+ and iiQKA 9.x.

It brings shop-floor telemetry, 6-axis joint torque feedback, Cartesian TCP tracking, a 4096-pin I/O matrix, and live SmartPAD alarms with multilingual subtitles directly into your engineering workspace.

---

## Architecture & Communication Protocols

The SCADA monitor uses a resilient dual-driver communication architecture:

1. **WCF OnlineServices**: Native encrypted Windows service running on KRC4/KRC5 smartHMI platforms. Provides authenticated access to system status, controller option packages, and filesystem archives.
2. **KUKAVARPROXY (Port 7000)**: Ultra-low-latency variable bridge delivering high-frequency cyclical polling for real-time kinematics and I/O channels.
3. **CrossComm (WinGate Port 49000)**: Legacy cross-communication driver for KRC2 and early KRC4 controllers.

```
+-------------------------------------------------------------+
|                VS Code Engineering Workstation              |
|        (KUKA KRL Extension + Embedded SCADA Dashboard)      |
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
* **Multilingual Subtitles (`KSS_LOOKUP`)**: Eliminates language barriers during international commissioning. If the physical controller displays messages in German or Turkish, the extension displays authentic English and Russian translations beneath the raw message code (e.g. `KSS00203`, `KSS01442`, `KSS01123`).

### 5. Hot Controller Backup over Ethernet
* **Zero Downtime Archiving**: Download complete, clean `.zip` controller backup archives directly over Ethernet.
* **Non-Blocking Operation**: The backup is generated and streamed without halting robot motion or interrupting automated production lines.

---

## Commands & Keybindings

| Command | Identifier | Description |
|---|---|---|
| KUKA KRL: Connect to KUKA Robot | `krl.connectKukaRobot` | Open live Ethernet connection modal |
| KUKA KRL: Open SCADA Live Dashboard | `krl.openLiveBridge` | Launch real-time telemetry dashboard |
| KUKA KRL: Download Controller Backup | `krl.downloadLiveBackup` | Stream hot `.zip` backup from controller |
