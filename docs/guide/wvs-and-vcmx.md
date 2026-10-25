# WorkVisual (.wvs) & KUKA.Sim (.vcmx) Engineering Suites

Direct in-memory inspection of WorkVisual project topologies, fieldbus mappings, and 3D simulation validation.

---

## Overview

Modern robotics workflows depend on engineering project files from **KUKA WorkVisual** (`.wvs`, `.wvps`) and **KUKA.Sim / Visual Components** (`.vcmx`, `layout.rsc`). Previously, inspecting hardware bus mappings or debugging 3D simulation deadlocks required launching resource-heavy CAD packages.

The **WorkVisual & VCMX Suites** provide zero-unpack archive parsing, bus topology cross-exporting, simulation race validation, and direct simulation-to-KRL code generation directly within VS Code.

---

## WorkVisual (.wvs / .wvps) Topology Inspector (`krl.inspectWvsTopology`)

* **Zero-Unpack Archive Inspection**: Reads binary `.wvs` / `.wvps` project archives in-memory without disk extraction.
* **XML Metadata Decoder**: Decodes hex-encoded XML metadata (`_x003C_`, `_x0022_`) from `Solution.MetaData`.
* **KOP Catalog Extraction**: Extracts installed option package catalogs (`KUKA.EthernetKRL`, `KUKA.SafeOperation`, `KUKA.GripperSpotTech`, `KUKA.Profinet`), runtime KSS version, and controller serial identifiers.
* **Fieldbus Bus Mapping**: Parses EtherCAT couplers (`EcatDiag_*.xml`), Virtual I/O buses, and Profinet device slices.
* **Fieldbus Tag Exporter**: Automatically maps `$IN` and `$OUT` connections to **Siemens TIA Portal XML/SDF**, **Beckhoff TwinCAT 3 GVL**, and **EPLAN CSV**.

---

## KUKA.Sim & Visual Components (.vcmx) Suite

### 1. Simulation Workcell Inspector (`krl.inspectVcmxLayout`)
* **Two-Layer `layout.rsc` Parser**: Reads 3D cell components directly from `.vcmx` archives without unpacking.
* **Extracted Entities**: Manipulator kinematics (`rSimKinController`), discrete signals (`rSimBooleanSignal`), conveyor transport links (`ProductType`), and robot process logic (`ProgramData`).

### 2. Simulation Race & Deadlock Validator (`krl.validateVcmxSimulation`)
Detects and safely repairs four critical simulation flaws that cause 3D workcells to freeze:

| Bug Code | Classification | Root Cause & Impact |
|---|---|---|
| `VCMX001` | Edge-Triggered Deadlock | `IWaitSignalStatement` placed after `ITransportOutStatement` causing permanent cell stall after one cycle |
| `VCMX002` | Timeout Fallthrough | `IWaitSignalStatement` with non-zero timeout or disabled trigger violating deterministic handshakes |
| `VCMX003` | Product Leak | Missing product variable reset after `TransportOut` causing simulation engine flow breakdown |
| `VCMX004` | Dangling Signal | Empty or unresolved signal reference in component logic |

* **Safe Auto-Repair**: Applies surgical patches to `layout.rsc` with automated `.bk1`, `.bk2` backup preservation.

### 3. VCMX to KRL Post-Processor (`krl.exportVcmxToKrl`)
* Converts simulation process routines (`LinMotion`, `PtpMotion`, `SetSignal`, `WaitSignal`, `Delay`) directly into production-grade KRL `.src` and companion `.dat` modules.

---

## Commands

| Command | Identifier | Description |
|---|---|---|
| KUKA KRL: Inspect WorkVisual Topology | `krl.inspectWvsTopology` | Zero-unpack analysis of `.wvs` projects |
| KUKA KRL: Inspect VCMX Layout | `krl.inspectVcmxLayout` | Extract components & logic from `.vcmx` |
| KUKA KRL: Validate VCMX Simulation | `krl.validateVcmxSimulation` | Audit & repair simulation deadlocks |
| KUKA KRL: Export VCMX to KRL | `krl.exportVcmxToKrl` | Post-process simulation paths into KRL |
