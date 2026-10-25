# Point Table Engine & Companion .DAT Auto-Synchronizer

Automated coordinate management, companion data synchronization, and kinematic point transformation.

---

## Overview

In KUKA KRL programming, motion trajectories in `.src` files rely on companion `.dat` files declaring spatial coordinates (`E6POS`, `POS`, `FRAME`, `E6AXIS`) and motion parameters (`FDAT`, `PDAT`, `LDAT`).

Manual synchronization between `.src` and `.dat` during commissioning frequently causes runtime compiler faults (`XP1 undeclared variable`) or accidental overwrites during SmartPAD Touch-Up operations.

The **Point Table Engine & Auto-Synchronizer** (`krl.syncPointsToDat`, `krl.batchShiftPoints`, `krl.mirrorTrajectory`) automates companion data consistency, orphan coordinate detection, and 6D geometric frame calculations.

---

## Key Capabilities

### 1. Auto-Sync Missing Points to Companion .DAT (`krl.syncPointsToDat`)
* **AST Motion Command Scanner**: Scans active `.src` routines for motion statements (`PTP`, `LIN`, `CIRC`, `SPTP`, `SLIN`, `SCIRC`) and Inline Form FOLD headers (`PDAT_ACT`, `FDAT_ACT`, `LDAT_ACT`).
* **Companion .DAT Auto-Generation**: If the companion `.dat` file is missing, the engine creates a standard `DEFDAT <MODULE> PUBLIC` structure.
* **Non-Destructive Declaration Injection**: Injects missing coordinate declarations (`DECL E6POS`, `DECL FDAT`, `DECL PDAT`, `DECL LDAT`) into a clean `;FOLD Auto-Synchronized Points` block before `ENDDAT`. Existing taught coordinates are strictly preserved.

### 2. Split-View Point Table
* **Synchronized Side-by-Side View**: Inspect `.src` motion lines alongside their companion `.dat` position vectors.
* **In-Line Validation**: Validates Cartesian coordinates against manipulator reach boundaries in real time.

### 3. Orphan Point Detector
* **Dead Coordinate Audit**: Scans `.dat` files for declared points that are never referenced in any `.src` routine.
* **Memory Optimization**: Identifies candidate obsolete points for safe removal, preventing variable memory exhaustion on legacy KSS controllers.

### 4. SVD Kabsch 3-Point Base & Tool Calibration
* **Exact Coordinate Alignment**: Calculates `TOOL_DATA` and `BASE_DATA` frames using Singular Value Decomposition (SVD Kabsch algorithm) directly from physical calibration points.
* **Euler Angles (A, B, C)**: Computes authentic KUKA Euler rotation angles ($Z-Y'-X''$) with gimbal lock prevention.

### 5. 6D Trajectory Mirroring & Batch Point Shift
* **Geometric Mirroring (`krl.mirrorTrajectory`)**: Mirrors motion paths across Cartesian planes X, Y, or Z with automated Status and Turn bit recalculation.
* **Batch Frame Shift (`krl.batchShiftPoints`)**: Applies 6D geometric transformations (`:`) for tool offsets, base re-referencing, and fixture repositioning without manual pendant re-teaching.

---

## Commands

| Command | Identifier | Description |
|---|---|---|
| KUKA KRL: Auto-Sync Missing Points to .DAT | `krl.syncPointsToDat` | Scan `.src` and inject missing declarations |
| KUKA KRL: Batch Shift Coordinates | `krl.batchShiftPoints` | Apply 6D spatial frame offset to point group |
| KUKA KRL: Mirror Trajectory Across Plane | `krl.mirrorTrajectory` | Reflect trajectory with Turn bit correction |
| KUKA KRL: Renumber Motion Points | `krl.renumberPoints` | Synchronized renaming of points across files |
