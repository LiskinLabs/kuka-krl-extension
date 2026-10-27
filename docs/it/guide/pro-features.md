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

### 35. Riparazione automatica sicura di KRL (`krl.fixAllSafeIssuesInFile`)
Risoluzione deterministica in 1 clic di 7 classi di difetti sintattici e strutturali sicuri senza alterare la cinematica:
- **Pulizia BOM e caratteri non ASCII**: Rimozione di UTF-8 BOM (`\xEF\xBB\xBF`), virgolette tipografiche, trattini lunghi e normalizzazione dei caratteri speciali per evitare errori del compilatore KSS.
- **Sincronizzazione FOLD / ENDFOLD**: Allineamento dei tag di chiusura `;ENDFOLD` con i rispettivi `;FOLD`.
- **Prevenzione loop infinito FOR STEP 0**: Sostituzione del passo critico `STEP 0` con l'incremento sicuro `STEP 1`.
- **BRAKE obbligatorio prima di RESUME**: Iniezione dell'istruzione di frenata `BRAKE` prima di `RESUME` nelle routine di interrupt (elimina KSS01442).
- **Convalida carico utile ($LOAD)**: Aggiunta delle chiamate `BAS(#TOOL, currentTool)` dopo le assegnazioni a `$LOAD` per prevenire sovraccarichi dei motori.
- **Normalizzazione modificatori di approssimazione duplicati**: Pulizia dei token di blending duplicati accidentalmente (`C_DIS`, `C_PTP`).
- **Sincronizzazione metadati Inline Form**: Allineamento dei parametri XML con le istruzioni KRL (`$OUT[...]`), impedendo sovrascritture indesiderate durante il Touch-Up su SmartPAD.
- **Rollback Guard e Monaco Diff**: Protezione con ripristino immediato in caso di regressioni e anteprima visiva su Monaco Diff Editor.

> [!NOTE]
> **Eliminazione delle variabili inutilizzate:** Gestita in modo dedicato tramite `krl.cleanupUnusedVariables` (**Universal Backup & Unused Variable Purge Engine [PRO]**) con protezione per `$config.dat`, `sps.sub` e interfacce EthernetKRL.

---

### 36. Montaggio in tempo reale dei backup KRC e sincronizzazione ZIP bidirezionale (`krl.mountBackupZipAsProject`)
Apertura diretta dei backup di SmartPAD (`Robot1.zip`, `KRCDiag_*.zip`) come cartella di lavoro in VS Code senza estrazione. Il salvataggio (`Ctrl+S`) aggiorna il file `.zip` in meno di 80ms.

---

### 37. Profilatore dinamico di traiettoria e predittore di singolarità
Simulazione cinematica preventiva e analisi dei rischi prima del caricamento sul controllore:
- **Singolarità del polso (Wrist)**: Rilevamento dei movimenti lineari vicini a $A_5 \approx 0^\circ \pm 5^\circ$.
- **Limiti di portata**: Avvisi per traiettorie che superano il 96% del raggio massimo.
- **Analisi delle perdite di tempo ciclo**: Calcolo dei ritardi causati dagli arresti di avanzamento (Vorlaufstopp).

---

### 38. SCADA Live Bridge e connessione al controllore in tempo reale (`krl.live.connect`, `krl.live.openDashboard`) [PRO]
Ponte bidirezionale hardware di telemetria e diagnostica per controllori fisici KUKA KRC4/KRC5 e OfficePC tramite CrossComm WCF, OPC UA o EthernetKRL:
- **Coordinate e stato in tempo reale**: Posizioni cartesiane TCP ($X, Y, Z, A, B, C$) e angoli degli assi ($A_1..A_6$).
- **Modi operativi e interblocchi**: Modo operativo (T1, T2, AUT, EXT), abilitazione azionamenti (`$PERI_RDY`) e arresto d'emergenza (`$ALARM_STOP`).
- **Tracciamento interprete e puntatore di programma**: Stato di Submit (`$SPS`) e interprete robot (`$PRO_STATE`), nome programma (`$PRO_NAME`) e riga corrente (`$PRO_IP`).
- **Override dinamico**: Visualizzazione e regolazione dell'override di velocità (`$OV_PRO`).
- **Diagnostica I/O di campo**: Monitoraggio in tempo reale di ingressi/uscite digitali (`$IN` / `$OUT` 1..4096) e flag (`$FLAG`).

---

### 39. Multi-ispettore registri eventi KSS e cronologia unificata (`krl.openAllEventLogs`) [PRO]
Aggregatore dei file di registro del controllore (`KrcLog.evt`, `KSSLog.evt`, ecc.) in una sequenza temporale con traduzione multilingue dei codici di errore KSS.

---

### 40. Risoluzione dei simboli con tolleranza per parentesi quadre e array
Elaborazione robusta dell'AST per espressioni complesse, indici di array e campi di strutture KRL (es. `$OUT[12]`, `$COUNT_I[1]`, `LOAD_DATA[1].M`).

---

### 41. Correzione automatica della desincronizzazione metadati Inline Form (ILF) (`krl.fixAllSafeIssuesInFile`) [PRO]
Allineamento deterministico tra istruzioni di movimento KRL nei fold `;FOLD PTP/LIN` e commenti XML interni.

---

### 42. Compatibilità KSS 8.7.9 ed espansione modelli robot
Modelli cinematici aggiornati per KSS 8.7.9 (inclusi KR 50 R2500 e GripperSpotTech) e verifica completa dei parametri di carico dinamico (massa, baricentro e tensori d'inerzia).

---

### 43. Analizzatore topologia bus e cataloghi pacchetti KOP WorkVisual (`krl.inspectWvsTopology`) [PRO]
Analisi diretta in memoria dei progetti binari KUKA WorkVisual senza estrazione manuale:
- **Cataloghi opzioni KOP**: Estrazione dei pacchetti tecnologici (`KUKA.EthernetKRL`, `KUKA.SafeOperation`, `KUKA.GripperSpotTech`, `KUKA.Profinet`), versione runtime KSS e profili cinematici da `Solution.MetaData`.
- **Topologia bus EtherCAT e Profinet**: Analisi dei moduli slave EtherCAT (`EcatDiag_*.xml`), bus Virtual I/O e reti Profinet con mappatura degli indirizzi.
- **Esportazione segnali verso CAD PLC**: Esportazione immediata delle tabelle `$IN` e `$OUT` nei formati **Siemens TIA Portal XML/SDF**, **Beckhoff TwinCAT 3 GVL** ed **EPLAN CSV**.

---

### 44. Autosincronizzazione punti e normalizzatore companion .DAT (`krl.syncPointsToDat`) [PRO]
Sincronizzazione deterministica di coordinate spaziali e parametri di movimento tra `.src` e `.dat`:
- **Scansione comandi di movimento AST**: Ispezione di tutte le istruzioni (`PTP`, `LIN`, `CIRC`, `SPTP`, `SLIN`, `SCIRC`) e delle intestazioni dei moduli (`PDAT_ACT`, `FDAT_ACT`, `LDAT_ACT`).
- **Creazione automatica file .DAT**: Generazione automatica di una struttura valida `DEFDAT <MODULE> PUBLIC` se il file dati è assente.
- **Inserimento dichiarazioni mancanti**: Aggiunta delle definizioni (`DECL E6POS`, `DECL FDAT`, `DECL PDAT`, `DECL LDAT`) in un blocco ordinato `;FOLD Auto-Synchronized Points` prima di `ENDDAT`, preservando le coordinate acquisite.

---

### 45. Suite intelligente KUKA.Sim e Visual Components (.vcmx) [PRO]
Validazione e post-elaborazione di archivi di simulazione 3D `.vcmx` (`krl.inspectVcmxLayout`, `krl.validateVcmxSimulation`, `krl.exportVcmxToKrl`):
- **Ispettore isola robotica VCMX**: Parser a due livelli di `layout.rsc` per estrarre cinematica robot, segnali e logiche di processo senza avviare software CAD complessi.
- **Validatore deadlock e corse critiche di simulazione**: Rileva e ripara 4 errori critici (`VCMX001` deadlock sui fronti, `VCMX002` timeout di attesa, `VCMX003` perdite variabili di prodotto, `VCMX004` segnali orfani) con backup `.bk1`/`.bk2`.
- **Post-processore da VCMX a KRL**: Converte sequenze di simulazione (`LinMotion`, `PtpMotion`, `SetSignal`, `WaitSignal`) in moduli KRL sincronizzati `.src` + `.dat`.

---

### 46. Suite in tempo reale KUKA.RobotSensorInterface (RSI) 4ms [PRO]
Sviluppo e convalida di anelli di controllo sensori ad alta frequenza (`krl.validateRsiXml`, `krl.generateRsiCode`):
- **Validatore schemi RSI XML**: Verifica di `SensorInterface/*.xml`, parametri socket, tipi di dato e continuità indici `INDX`.
- **Generatore driver RSI 4ms / 12ms**: Generazione di loop KRL `#IPO_FAST` (4ms / 250Hz) e `#IPO` (12ms / 83Hz) per correzione cartesiana (`#POSCORR`) e controllo assi ROS 2 (`#AXISCORR`).
- **Libreria intrinseca di sistema**: Supporto per `RSI_CREATE`, `RSI_ON`, `RSI_MOVECORR`, `RSI_OFF`, `RSI_DELETE` e relative costanti.

---

### 47. Importatore CAM CNC G-Code e vettori SVG (`krl.importGcodeToKrl`) [PRO]
Converte percorsi utensile CAD/CAM e profili 2D in codice KRL operativo:
- **Elaborazione ISO G-Code**: Conversione `G0` $\rightarrow$ `PTP`/`SPTP`, `G1` $\rightarrow$ `LIN`/`SLIN` e archi `G2`/`G3` $\rightarrow$ `CIRC`/`SCIRC` calcolando il punto intermedio 3D `AuxPoint`. Mappatura avanzamento in `$VEL.CP` e comandi M su `$OUT[...]`.
- **Importazione grafica vettoriale SVG**: Analisi di elementi `<path>`, `<polyline>`, `<polygon>`, `<circle>` con approssimazione curve di Bézier e piani di sicurezza `Z_Safe` e lavoro `Z_Work`.

---

### 48. Calibrazione visiva Hand-Eye a 9 punti ed esportatore tag PLC [PRO]
- **Piramide di calibrazione Hand-Eye (`krl.generateVisionCalibration`)**: Calcolo degli angoli di Eulero KUKA ($A, B, C$) tramite matrice Look-At per telecamere `Eye-in-Hand` ed `Eye-to-Hand`.
- **Esportatore tag bus di campo PLC (`krl.exportPlcTags`)**: Mappatura delle dichiarazioni `SIGNAL`, `$IN`, `$OUT` in indirizzi IEC 61131-3 (`%I0.0`, `%Q0.0`) per TIA Portal XML/SDF, TwinCAT 3 GVL ed EPLAN CSV.

---

### 49. Ponte integrato Model Context Protocol (MCP) per IA [PRO]
Gateway locale sicuro per assistenti di intelligenza artificiale (`127.0.0.1`):
- **Integrazione diretta con Cursor, Antigravity, Claude Code e Windsurf**: Espone telemetria in tempo reale (`krl_live_telemetry`), diagnostica statica (`krl_workspace_diagnostics`), autoriparazione del codice (`krl_safe_auto_repair`) e specifiche di 957+ variabili di sistema KSS.
- **Copia configurazione rapida**: Comando `krl.copyMcpConfig` per copiare le impostazioni JSON pronte per Claude Desktop e Cursor.

---

### 50. Licenze Enterprise Air-Gap offline (.lic) [PRO]
- **Esportazione richiesta Hardware ID (.lic) (`krl.exportHardwareIdFile`)**: Crea il file firmato `liskin-hardware-id.lic` per il trasferimento sicuro tramite USB in impianti industriali isolati.
- **Importazione licenza firmata (.lic) (`krl.importOfflineLicenseFile`)**: Valida la firma crittografica Ed25519 da `liskin-krl-license.lic` istantaneamente offline e attiva la modalità PRO in modo permanente.

