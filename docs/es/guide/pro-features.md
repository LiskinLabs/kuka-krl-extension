# Pro & Industrial Edition Features

Advanced static code analysis, logic visualization, industrial safety compliance, and fleet maintenance suite.

---

### 16. KUKA Control Center Dashboard (`krl.openControlCenter`)
Fluent UI command center providing 1-click access to all Pro diagnostics, backup analytics, trajectory builders, and licensing.

![KUKA Control Center Demo](/media/kuka_control_center.gif)

---

### 17. VS Code Telegram Support Chat Panel (`krl.openTelegramChat`)
Embedded support chat window directly inside the IDE connected with our dedicated Telegram Support Gateway for real-time engineering feedback and bug reports from the shop floor.

---

### 18. KRC Fleet Backups & Point Delta Spatial Inspector (`krl.compareKrcBackups`)
Compare physical SmartPAD `.zip` backups directly without manual extraction. Calculates 6-axis spatial coordinate deltas ($\Delta X, \Delta Y, \Delta Z, \Delta A, \Delta B, \Delta C$) between teaching versions and highlights hazardous point shifts exceeding safety tolerances.

![KRC Backup Diff Demo](/media/krc_backup_diff.gif)

---

### 19. Interactive Motion Trajectory & Spline Block Generator (`krl.insertMotionTrajectory`, `krl.insertSplineBlock`)
Visual motion sequence builder for standard and modern KSS motions (`PTP`, `LIN`, `CIRC`, `SPTP`, `SLIN`, `SCIRC`, `SPLINE Block`) featuring dynamic SVG vector trajectory diagrams and `$SGEAR_JERK` profile validation.

---

### 20. Native Copilot-Style Persistent AI Diff Review (`KrlReviewService`)
Professional multi-file diff staging system for AI-assisted refactoring. Displays pending changes inline, in side-by-side diff viewers, and via status bar indicators. Allows reviewing, accepting, or rejecting changes per-file or per-hunk (`krl.review.acceptFile`, `krl.review.rejectFile`, `krl.review.acceptHunk`, `krl.review.rejectHunk`).

---

### 21. KSS Spline Kinematic Separation & Modern Spline Converter (`krl.convertLegacyToSpline`)
Strict architectural segregation between standard legacy movements (`PTP`, `LIN`, `CIRC`) and modern Spline kinematics (`SPTP`, `SLIN`, `SCIRC`). Prevents illegal parameter mixing (e.g. `$APO.CDIS` inside Spline blocks) and provides 1-click batch conversion of legacy motion blocks into optimized Spline segments.

---

### 22. Interactive Flowchart Viewer & Control Flow Graph (`krl.showFlowchart`)
Transforms intricate `.src` subroutine logic into interactive Mermaid SVG diagrams in real time. Features bidirectional navigation (clicking graph nodes jumps directly to the source line) and 1-click vector SVG export for customer documentation and acceptance reports.

![Control Flow Graph Demo](/media/control_flow_graph.gif)
![Cell Flowchart SVG](/media/cell_flowchart.svg)

---

### 23. EthernetKRL (EKI) Suite & Telegram Generator (`krl.generateEkiTelegram`)
Validates EKI XML schemas and channel descriptors, tests socket telegram buffers, and auto-generates complete KRL network send/receive routines.

---

### 24. Industrial Safety & ISO 13849 Compliance Inspector (`krl.runSafetyCheck`)
Automated diagnostic inspector flagging uninitialized `$TOOL`/`$BASE`, missing `BAS(#INITMOV, 0)`, unmonitored `WAIT FOR` deadlocks, array index overruns (`TOOL_DATA[16]`), dual-channel `$SAFEIN` discrepancies, and invisible Cyrillic look-alike characters.

---

### 25. EVT Binary Event Log Decoder (`krl.viewEvtLog`)
High-speed zero-dependency decoder for KSS `.evt` binary diagnostic event archives. Decodes timestamps, event IDs, severity levels, and module origins into an interactive, filterable tabular log viewer.

---

### 26. Signal Matrix & I/O Spreadsheet Viewer (`krl.showIoMatrix`)
Interactive cross-reference table mapping all `$IN`, `$OUT`, `$ANIN`, and `$ANOUT` signals across the workspace. Search, filter by comment, detect unmapped or duplicated fieldbus channels, and export to CSV/Excel.

---

### 27. Trajectory Welding & Motion Statistics Profiler (`krl.calculateMotionStats`)
Comprehensive motion path profiler computing total cycle distances, motion segment counts, seam welding lengths, and velocity distributions across programs.

---

### 28. 3-Point Base/Tool Frame Calculator (`krl.showCalculator`)
3D frame transformation calculator (`BASE_DATA[x]` / `TOOL_DATA[x]`) computing Euler orientation angles (A, B, C) and transformation matrices from 3 physical touch points (Origin, X-axis, XY-plane).

---

### 29. AI-Supportive Domain Context Tools (`@kuka /get-io-matrix`, `@kuka /check-safety`)
Native context providers and AST extraction tools enabling Google Antigravity IDE and GitHub Copilot to deeply understand KRL robot architectures, signal tables, and kinematics.

---

### 30. Industrial Acceptance Quality Report Generator (`krl.generateQualityReport`)
Generates comprehensive HTML and JSON code quality reports with safety scorecards, cyclomatic complexity metrics, and standard compliance audits for customer project sign-off.

---

### 31. 100% Adaptive Themes & Hexa-Locale Switcher
Factory-tuned dark, light, and high-contrast OLED themes with reactive SVG diagram rendering. Seamless 1-click switching across 6 industrial languages: English, German, Russian, Spanish, Italian, and Turkish.

---

### 32. Advanced KRL Kinematics & 6D Transformation Suite
Industrial offline trajectory and frame manipulation suite:
- **6D Trajectory Mirroring (`krl.mirrorTrajectory`)**: Cartesian reflection across Planes X, Y, Z with automated Turn bit manipulation ($A_1..A_6$).
- **6D Batch Point Transformation (`krl.batchShiftPoints`)**: Geometric operator multiplication (`:`) for Tool offsets, Base offsets, and direct vector shifts.
- **Reverse Motion Path Trajectory (`krl.reverseTrajectory`)**: Inverts sequence of motion targets while preserving circular trajectory segments and inline form folds.
- **Sequential Point Renumbering (`krl.renumberPoints`)**: Synchronized batch renaming of points across `.src` motions, inline form folds, and companion `.dat` symbols (`XP1`, `FP1`, `PPDAT1`).
- **Tool & Base Coordinate Inspector (`krl.toolBaseOverview`)**: Extracts, inspects, and exports all 64 `$TOOL_DATA` and `$BASE_DATA` frames to CSV.
- **KFD User Tech Package Parser (`.kfd`)**: Complete AST validation for custom Inline Form packages.

---

### 33. KUKA.Sim 4.10 & iiQWorks.Sim 1.3 Kinematic Safety Analyzers
Deep industrial simulation rules reverse-engineered from KUKA.Sim 4.10 & iiQWorks.Sim 1.3:
- **Status (S) & Turn (T) Range Validator**: Flags illegal kinematic Status ($S \notin 0..7$) and Turn bitmasks ($T \notin 0..63$).
- **Context-Aware RESUME Analyzer**: Flags illegal `RESUME` statements outside interrupt handling subroutines.
- **FOR Loop STEP 0 Detector**: Identifies infinite controller loop conditions where `FOR` loop step increment equals 0.
- **SUBMIT Interpreter Restrictions**: Flags illegal synchronous robot motion commands inside background `$SPS.SUB` tasks.
- **SYNC with SPLINE Sequence Guard**: Verifies synchronous trigger statements inside spline blocks.
- **Automotive Tech Package Protection**: Shields KUKA.ServoGun (`%MKUKATPSERVOTECH`), SpotTech, ArcTech, and GlueTech from corruption during refactoring.

---

### 34. Enterprise Fleet Reliability & Non-Destructive Code Verification
Verified across 9,804 real industrial plant modules (4.2M+ LoC across 17 robotics installations and 8 automotive/Tier-1 clients) with 0 line truncations, 0 block regressions, and 100% code preservation.

---

### 35. Reparación automática segura de KRL (`krl.fixAllSafeIssuesInFile`)
Corrección determinista en 1 clic de problemas sintácticos y estructurales seguros sin alterar la cinemática de movimiento:
- **Barrera de parada de avance (Advance Run)**: Inserta automáticamente `WAIT SEC 0` antes de señales de zonas de seguridad (`$OUT`, `$FLAG`, `PULSE`).
- **BRAKE obligatorio antes de RESUME**: Inyecta la instrucción de frenado `BRAKE` antes de `RESUME` en rutinas de interrupción.
- **Confirmación de carga útil ($LOAD)**: Agrega llamadas `BAS(#PAYLOAD, nTool)` tras asignaciones a `$LOAD`.
- **Limpieza de BOM y caracteres no ASCII**: Elimina UTF-8 BOM y normaliza caracteres tipográficos especiales.
- **Sincronización FOLD / ENDFOLD**: Ajusta etiquetas de cierre `;ENDFOLD` con sus cabeceras `;FOLD`.

---

### 36. Montaje en vivo de copias de seguridad KRC y sincronización bidireccional ZIP (`krl.mountBackupZipAsProject`)
Abre copias de seguridad de SmartPAD (`Robot1.zip`, `KRCDiag_*.zip`) directamente como carpeta de proyecto en VS Code sin descomprimir. Guardar (`Ctrl+S`) actualiza el archivo `.zip` en disco en <80ms.

---

### 37. Perfilador dinámico de trayectorias y predictor de singularidades
Simulación cinemática previa y análisis de riesgos antes de transferir el programa al robot físico:
- **Singularidad de muñeca (Wrist)**: Detección de trayectorias lineales cerca de $A_5 \approx 0^\circ \pm 5^\circ$.
- **Límites de alcance**: Alertas al superar el 96% del radio máximo de alcance.
- **Análisis de tiempo de ciclo**: Cálculo de pérdidas de tiempo por paradas de avance (Vorlaufstopp).

---

### 38. Puente SCADA en vivo y conexión en tiempo real con el controlador (`krl.live.connect`, `krl.live.openDashboard`) [PRO]
Enlace directo de telemetría bidireccional a controladores físicos KUKA KRC4/KRC5 y OfficePC mediante CrossComm WCF, OPC UA o EthernetKRL:
- **Coordenadas y estado en vivo**: Posiciones cartesianas TCP ($X, Y, Z, A, B, C$) y ángulos de ejes ($A_1..A_6$).
- **Modos de operación y enclavamientos**: Modo de servicio (T1, T2, AUT, EXT), habilitación de accionamientos (`$PERI_RDY`) y parada de emergencia (`$ALARM_STOP`).
- **Seguimiento de intérprete y puntero**: Estado de Submit (`$SPS`) e intérprete del robot (`$PRO_STATE`), nombre de programa (`$PRO_NAME`) y puntero de línea (`$PRO_IP`).
- **Override dinámico**: Visualización y ajuste del override de velocidad (`$OV_PRO`).
- **Diagnóstico de bus de campo E/S**: Monitorización en vivo de entradas y salidas digitales (`$IN` / `$OUT` 1..4096) y marcas (`$FLAG`).

---

### 39. Multi-inspector de registros de eventos KSS y línea temporal unificada (`krl.openAllEventLogs`) [PRO]
Agregador de registros de diagnóstico del controlador (`KrcLog.evt`, `KSSLog.evt`, etc.) en una línea de tiempo cronológica con traducción multilingüe de códigos de error KSS.

---

### 40. Resolución de símbolos tolerante a corchetes y arrays
Procesamiento robusto del AST para expresiones complejas, indexación de arreglos y acceso a estructuras KRL (ej. `$OUT[12]`, `$COUNT_I[1]`, `LOAD_DATA[1].M`).

---

### 41. Reparación automática de desincronización de metadatos Inline Form (ILF) (`krl.fixAllSafeIssuesInFile`) [PRO]
Sincronización determinista entre parámetros de movimiento KRL en pliegues `;FOLD PTP/LIN` y comentarios XML ocultos.

---

### 42. Compatibilidad con KSS 8.7.9 y catálogo ampliado de robots
Modelos cinemáticos para KSS 8.7.9 (incluyendo KR 50 R2500 y GripperSpotTech) y verificación integral de modelos de carga dinámica (masa, centro de gravedad y tensores de inercia).

---

### 43. Analizador de topología de buses y paquetes KOP WorkVisual (`krl.inspectWvsTopology`) [PRO]
Análisis de proyectos binarios KUKA WorkVisual directamente en memoria sin descomprimir archivos:
- **Catálogos de opciones KOP**: Extracción de paquetes instalados (`KUKA.EthernetKRL`, `KUKA.SafeOperation`, `KUKA.GripperSpotTech`, `KUKA.Profinet`), versión de KSS y perfiles cinemáticos desde `Solution.MetaData`.
- **Topología de buses EtherCAT y Profinet**: Análisis de módulos EtherCAT (`EcatDiag_*.xml`), buses Virtual I/O y redes Profinet con mapeo de direcciones.
- **Exportación de señales a CAD de PLC**: Exportación de tablas `$IN` y `$OUT` a formatos **Siemens TIA Portal XML/SDF**, **Beckhoff TwinCAT 3 GVL** y **EPLAN CSV**.

---

### 44. Autosincronización de puntos y normalizador companion .DAT (`krl.syncPointsToDat`) [PRO]
Sincronización determinista de puntos espaciales y parámetros de movimiento entre archivos `.src` y `.dat`:
- **Escaneo de movimientos en AST**: Inspecciona comandos (`PTP`, `LIN`, `CIRC`, `SPTP`, `SLIN`, `SCIRC`) y cabeceras de formularios (`PDAT_ACT`, `FDAT_ACT`, `LDAT_ACT`).
- **Creación automática de .DAT**: Genera una estructura válida `DEFDAT <MODULE> PUBLIC` cuando falta el archivo de datos.
- **Inyección de puntos faltantes**: Añade declaraciones (`DECL E6POS`, `DECL FDAT`, `DECL PDAT`, `DECL LDAT`) en un bloque `;FOLD Auto-Synchronized Points` antes de `ENDDAT`, conservando las coordenadas enseñadas.

---

### 45. Suite de inteligencia KUKA.Sim y Visual Components (.vcmx) [PRO]
Validación y posprocesamiento de simulaciones 3D `.vcmx` (`krl.inspectVcmxLayout`, `krl.validateVcmxSimulation`, `krl.exportVcmxToKrl`):
- **Inspector de celdas VCMX**: Analizador de dos niveles de `layout.rsc` para extraer cinemática, señales y rutinas sin abrir software CAD pesado.
- **Validador de interbloqueos de simulación**: Detecta y repara 4 errores críticos de simulación (`VCMX001` interbloqueos por flanco, `VCMX002` tiempos de espera, `VCMX003` fugas de variables, `VCMX004` referencias perdidas) con copias `.bk1`/`.bk2`.
- **Posprocesador de VCMX a KRL**: Transforma rutinas de simulación (`LinMotion`, `PtpMotion`, `SetSignal`, `WaitSignal`) en módulos `.src` y `.dat`.

---

### 46. Suite en tiempo real KUKA.RobotSensorInterface (RSI) 4ms [PRO]
Desarrollo y validación de lazos de control de sensores en tiempo real (`krl.validateRsiXml`, `krl.generateRsiCode`):
- **Validador de esquemas RSI XML**: Comprobación de archivos `SensorInterface/*.xml`, parámetros de socket, tipos de datos y continuidad de índices `INDX`.
- **Generador de controladores RSI 4ms / 12ms**: Creación de bucles `#IPO_FAST` (4ms / 250Hz) y `#IPO` (12ms / 83Hz) para correcciones cartesianas (`#POSCORR`) y control de ejes ROS 2 (`#AXISCORR`).
- **Biblioteca intrínseca del sistema**: Definiciones y ayuda de firmas para `RSI_CREATE`, `RSI_ON`, `RSI_MOVECORR`, `RSI_OFF`, `RSI_DELETE`.

---

### 47. Importador CAM CNC G-Code y vectores SVG (`krl.importGcodeToKrl`) [PRO]
Convierte trayectorias de mecanizado CNC y contornos 2D en código KRL:
- **Conversión de ISO G-Code**: `G0` $\rightarrow$ `PTP`/`SPTP`, `G1` $\rightarrow$ `LIN`/`SLIN`, y `G2`/`G3` $\rightarrow$ `CIRC`/`SCIRC` calculando el punto intermedio 3D `AuxPoint`. Conversión de avance a `$VEL.CP` y códigos M (`M3`, `M5`) a `$OUT[...]`.
- **Importación de vectores SVG**: Procesamiento de elementos `<path>`, `<polyline>`, `<polygon>`, `<circle>` con aproximación Bézier y planos automáticos de seguridad `Z_Safe` y corte `Z_Work`.

---

### 48. Asistente de calibración visual Hand-Eye y exportador de tags PLC [PRO]
- **Pirámide de calibración de 9 puntos (`krl.generateVisionCalibration`)**: Cálculo de ángulos Euler KUKA ($A, B, C$) mediante matriz de rotación Look-At para configuraciones `Eye-in-Hand` y `Eye-to-Hand`.
- **Exportador de señales de bus de campo (`krl.exportPlcTags`)**: Mapeo de `SIGNAL`, `$IN`, `$OUT` a direcciones IEC 61131-3 (`%I0.0`, `%Q0.0`) y exportación a TIA Portal XML/SDF, TwinCAT 3 GVL y EPLAN CSV.

---

### 49. Puente integrado Model Context Protocol (MCP) para IA [PRO]
Pasarela segura local para asistentes de inteligencia artificial (`127.0.0.1`):
- **Conexión directa con Cursor, Antigravity, Claude Code y Windsurf**: Proporciona telemetría en tiempo real (`krl_live_telemetry`), diagnóstico estático (`krl_workspace_diagnostics`), autorreparación (`krl_safe_auto_repair`) y especificaciones de 957+ variables del sistema KSS.
- **Copia de configuración en 1 clic**: Comando `krl.copyMcpConfig` para configurar Claude Desktop y Cursor al instante.

---

### 50. Licenciamiento Enterprise Air-Gap sin conexión (.lic) [PRO]
- **Exportar solicitud Hardware ID (.lic) (`krl.exportHardwareIdFile`)**: Genera el archivo firmado `liskin-hardware-id.lic` para transporte seguro vía USB en plantas industriales aisladas.
- **Importar licencia firmada (.lic) (`krl.importOfflineLicenseFile`)**: Valida la firma criptográfica Ed25519 de `liskin-krl-license.lic` completamente offline y activa de forma permanente el modo PRO.

