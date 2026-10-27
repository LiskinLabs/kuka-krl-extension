# Suite WorkVisual (.wvs) e KUKA.Sim (.vcmx)

Analisi della topologia di bus WorkVisual e validazione di simulazioni 3D senza aprire ambienti CAD complessi.

---

## Panoramica

Consente l'analisi in memoria di progetti **KUKA WorkVisual** (`.wvs`, `.wvps`) e modelli **KUKA.Sim / Visual Components** (`.vcmx`, `layout.rsc`).

* **Topologia WorkVisual (`krl.inspectWvsTopology`)**: Estrae pacchetti KOP, versione runtime KSS ed esporta le tabelle di I/O per **Siemens TIA Portal**, **Beckhoff TwinCAT 3** ed **EPLAN**.
* **Validatore simulazione VCMX (`krl.validateVcmxSimulation`)**: Individua e corregge deadlock di segnale (`VCMX001`–`VCMX004`).
* **Post-processore (`krl.exportVcmxToKrl`)**: Converte logiche di simulazione in codice KRL `.src` e `.dat`.
