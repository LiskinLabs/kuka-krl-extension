# Suite KUKA.RSI in Tempo Reale e Modulo CAM G-Code / SVG

Controllo sensoriale in tempo reale deterministico (ciclo da 4 ms) e conversione automatica di percorsi CNC e vettoriali in KRL.

---

## Panoramica

La suite **KUKA.RSI Real-Time** (`krl.validateRsiXml`, `krl.generateRsiCode`) supporta cicli ad anello chiuso `#IPO_FAST` (4 ms) e `#IPO` (12 ms) per correzione cartesiana (`#POSCORR`) o controllo assi ROS 2 (`#AXISCORR`).

Il modulo **CAM Tooling** (`krl.importGcodeToKrl`, `krl.generateVisionCalibration`, `krl.exportPlcTags`) converte programmi ISO G-Code e contorni SVG in traiettorie KRL pronte per l'officina.
