# Suite KUKA.RSI en Tiempo Real y Módulo CAM G-Code / SVG

Control en tiempo real estricto (ciclo de 4 ms) e importación de mecanizado CNC y gráficos vectoriales a KRL.

---

## Descripción general

La suite **KUKA.RSI Real-Time** (`krl.validateRsiXml`, `krl.generateRsiCode`) facilita la creación de lazos de corrección `#IPO_FAST` (4 ms) y `#IPO` (12 ms) para corrección cartesiana (`#POSCORR`) o control de ejes ROS 2 (`#AXISCORR`).

El módulo **CAM Tooling** (`krl.importGcodeToKrl`, `krl.generateVisionCalibration`, `krl.exportPlcTags`) convierte código ISO G-Code y curvas SVG en trayectorias KRL listas para producción.
