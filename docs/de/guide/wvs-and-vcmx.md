# WorkVisual (.wvs) und KUKA.Sim (.vcmx) Suites

Prüfung von WorkVisual-Bustopologien, Feldbus-Signalen und Validierung von 3D-Simulationen ohne CAD-Start.

---

## Übersicht

Inbetriebnahme-Ingenieure arbeiten täglich mit **KUKA WorkVisual** (`.wvs`, `.wvps`) und **KUKA.Sim / Visual Components** (`.vcmx`, `layout.rsc`).

Diese Suites analysieren Projektarchive direkt im Arbeitsspeicher, exportieren SPS-Variablen, reparieren Simulations-Deadlocks und wandeln Simulationen in KRL-Code um.

---

## WorkVisual-Topologie-Inspektor (`krl.inspectWvsTopology`)

* **In-Memory-Analyse**: Direktes Auslesen binärer WorkVisual-Projekte im RAM.
* **KOP-Pakete & Steuerung**: Extrahiert KOP-Optionen, KSS-Version und Robotermodelle aus `Solution.MetaData`.
* **Feldbus-Topologie**: Analysiert EtherCAT-Koppler, Virtual I/O und Profinet-Netzwerke.
* **Export für SPS-CAD**: Signaltabellen (`$IN`, `$OUT`) nach **Siemens TIA Portal XML/SDF**, **Beckhoff TwinCAT 3 GVL** und **EPLAN CSV**.

---

## KUKA.Sim & Visual Components (.vcmx)

* **Zellen-Inspektor (`krl.inspectVcmxLayout`)**: Liest Kinematiken, Signale und Prozesse aus `layout.rsc`.
* **Deadlock- & Race-Validator (`krl.validateVcmxSimulation`)**: Behebt Deadlocks (`VCMX001`–`VCMX004`) mit Backup-Sicherheit.
* **VCMX-zu-KRL Postprozessor (`krl.exportVcmxToKrl`)**: Wandelt Simulationsschritte in `.src` und `.dat` Module um.
