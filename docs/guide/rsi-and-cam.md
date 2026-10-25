# KUKA.RSI Real-Time Suite & CAM CNC/SVG Importer

Hard real-time sensor control (4ms IPO) and automated toolpath generation from CNC G-Code and 2D vector drawings.

---

## Overview

High-precision industrial applications require tight sensor integration (seam tracking, force-torque grinding) and complex motion paths (milling, dispensing, deburring).

The **KUKA.RSI Real-Time Suite** (`krl.validateRsiXml`, `krl.generateRsiCode`) provides tools for KUKA RobotSensorInterface 4ms/12ms sensor loops, while the **CAM Tooling Suite** (`krl.importGcodeToKrl`, `krl.generateVisionCalibration`, `krl.exportPlcTags`) bridges CNC CAD/CAM programs directly into KRL trajectories.

---

## KUKA.RSI (RobotSensorInterface) Real-Time Suite

* **Hard Real-Time Control**: Supports high-frequency `#IPO_FAST` (4ms / 250 Hz) and `#IPO` (12ms / 83 Hz) sensor correction cycles.
* **SensorInterface XML Schema Validator (`krl.validateRsiXml`)**: Validates `SensorInterface/*.xml` descriptors, checking `<ROOT>`, `<CONFIG>`, `<IP_NUMBER>`, `<PORT>`, element data types (`BOOL`, `LONG`, `DOUBLE`), and index continuity (`INDX="1..N"`).
* **Real-Time Driver Generator (`krl.generateRsiCode`)**: Generates synchronized KRL driver routines (`RSI_CREATE`, `RSI_ON`, `RSI_MOVECORR`, `RSI_OFF`, `RSI_DELETE`) and XML socket configurations for:
  - **Cartesian Correction (`#POSCORR`)**: External optical and laser seam tracker feedback.
  - **Axis Correction (`#AXISCORR`)**: Real-time multi-axis joint control for ROS 2 (`kuka_rsi_driver`).

---

## CAM CNC G-Code & Vector SVG Importer (`krl.importGcodeToKrl`)

Direct conversion of CNC machining programs and 2D vector contours into synchronized KRL `.src` and `.dat` modules:

### 1. ISO CNC G-Code Parsing
* **Linear Moves**: `G0`/`G00` -> `PTP` / `SPTP`, `G1`/`G01` -> `LIN` / `SLIN`.
* **Circular Arc Interpolation**: `G2`/`G3` circular blocks converted to KRL `CIRC` / `SCIRC` with exact 3D midpoint (`XAUX`) calculation from arc parameters `I, J, K` or radius `R`.
* **Feedrate Conversion**: Translates CNC feedrates `F` (mm/min) into KUKA continuous-path velocities `$VEL.CP` (m/s).
* **M-Code Mapping**: Maps auxiliary codes (`M3`, `M5`, `M8`, `M9`) to digital output signals `$OUT[...]`.

### 2. 2D Vector SVG Toolpath Generation
* **Vector Elements**: Parses `<path>`, `<polyline>`, `<polygon>`, `<rect>`, and `<circle>` SVG geometry.
* **Bezier Curve Approximation**: High-density spline approximation for complex curves.
* **Safe Height Transitions**: Automatically inserts `Z_Safe` approach and retract motions between contours.

---

## Vision Hand-Eye Calibration Wizard (`krl.generateVisionCalibration`)

* **9-Pose Calibration Pyramid**: Generates a standard calibration grid for both `Eye-in-Hand` and `Eye-to-Hand` 2D/3D camera setups.
* **Euler Angles Calculation**: Computes 3D camera Look-At rotation matrices converted into KUKA Euler angles (A, B, C).
* **Pre-Grasp Approach Pattern**: Generates safe approach vectors along the tool Z axis (`$TOOL`) before part pick-up.

---

## Commands

| Command | Identifier | Description |
|---|---|---|
| KUKA KRL: Validate RSI XML Configuration | `krl.validateRsiXml` | Validate `SensorInterface/*.xml` schemas |
| KUKA KRL: Generate Real-Time RSI Driver | `krl.generateRsiCode` | Generate 4ms/12ms RSI control loops |
| KUKA KRL: Import CNC G-Code / SVG to KRL | `krl.importGcodeToKrl` | Convert G-Code / SVG into `.src` + `.dat` |
| KUKA KRL: Vision Hand-Eye Calibration Wizard | `krl.generateVisionCalibration` | 9-pose camera calibration generator |
| KUKA KRL: Export PLC Fieldbus Tags | `krl.exportPlcTags` | Export I/O to TIA Portal, TwinCAT, EPLAN |
