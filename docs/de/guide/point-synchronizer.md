# Punkttabellen-Engine & .DAT-Dateisynchronisierer

Verwaltung von Punktkoordinaten, automatische Datenstruktursynchronisation und kinematische Transformationen.

---

## Übersicht

In KRL verweisen Bewegungsbefehle in `.src`-Dateien auf räumliche Koordinaten (`E6POS`, `POS`, `FRAME`) und Technologieparameter (`FDAT`, `PDAT`, `LDAT`) in `.dat`-Dateien.

Der **Punkttabellen-Engine & Auto-Synchronisierer** (`krl.syncPointsToDat`, `krl.batchShiftPoints`, `krl.mirrorTrajectory`) garantiert vollständige Datenintegrität, findet verwaiste Punkte und berechnet 6D-Transformationen.

---

## Kernfunktionen

* **Automatische .DAT-Punkteabgleichung (`krl.syncPointsToDat`)**: Analysiert Bewegungsbefehle im `.src` und injiziert fehlende Deklarationen in den companion `.dat`.
* **Split-View Punkttabelle**: Gleichzeitige Ansicht von Bewegungsbefehlen und Vektorkoordinaten.
* **Erkennung verwaister Punkte**: Identifiziert nicht genutzte Punkte zur Speicherbereinigung.
* **SVD Kabsch Werkzeug- und Basiskalibrierung**: Präzise Berechnung von `TOOL_DATA` und `BASE_DATA` über Singulärwertzerlegung.
* **6D-Trajektorienspiegelung und Batch-Shift**: Spiegelung von Trajektorien an X/Y/Z-Ebenen und räumliches Verschieben von Punktegruppen.
