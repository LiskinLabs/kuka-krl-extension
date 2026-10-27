# KUKA.RSI Echtzeit-Suite und CAM CNC G-Code / SVG Importer

Harte Echtzeit-Sensorkorrektur (4ms IPO-Zyklus) und automatische KRL-Codegenerierung aus CNC- und Vektordateien.

---

## Übersicht

Die **KUKA.RSI Real-Time Suite** (`krl.validateRsiXml`, `krl.generateRsiCode`) automatisiert die Erstellung von RobotSensorInterface-Korrekturschleifen (4 ms / 12 ms), während die **CAM Tooling Suite** CNC-Programme und SVG-Vektoren direkt in KRL umwandelt.

---

## KUKA.RSI (RobotSensorInterface)

* **4ms / 12ms Echtzeit-Korrektur**: Unterstützung für `#IPO_FAST` (4 ms / 250 Hz) und `#IPO` (12 ms / 83 Hz).
* **XML-Schemavalidator (`krl.validateRsiXml`)**: Prüft `SensorInterface/*.xml`-Dateien auf syntaktische und typbezogene Korrektheit.
* **Treiber-Generator (`krl.generateRsiCode`)**: Generiert fertige Module für kartesische (`#POSCORR`) oder Achskorrektur (`#AXISCORR` / ROS 2).

---

## CAM CNC G-Code & SVG-Vektor-Importer (`krl.importGcodeToKrl`)

* **ISO G-Code**: Konvertiert `G0`/`G1`/`G2`/`G3` mit Berechnung räumlicher Zwischenpunkte (`AuxPoint`) und Zuordnung von Vorschubwerten und M-Befehlen.
* **SVG-Vektoren**: Zerlegt Pfade und Kurven mit Bezier-Approximation, setzt Sicherheitsebenen `Z_Safe` und Bearbeitungsebenen `Z_Work`.

---

## Hand-Auge-Kamerakalibrierung (`krl.generateVisionCalibration`)

* **9-Punkt-Pyramide**: Look-At Rotationsmatrix zur Berechnung der KUKA Euler-Winkel ($A, B, C$) für `Eye-in-Hand` und `Eye-to-Hand`.
