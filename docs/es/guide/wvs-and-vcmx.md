# Suites WorkVisual (.wvs) y KUKA.Sim (.vcmx)

Inspección de topología de buses WorkVisual y validación de simulaciones 3D sin iniciar entornos CAD pesados.

---

## Descripción general

Permite analizar archivos de proyecto **KUKA WorkVisual** (`.wvs`, `.wvps`) y modelos **KUKA.Sim / Visual Components** (`.vcmx`, `layout.rsc`) directamente en memoria.

* **Topología WorkVisual (`krl.inspectWvsTopology`)**: Extrae paquetes KOP, versión de KSS y genera listas de señales para **Siemens TIA Portal**, **Beckhoff TwinCAT 3** y **EPLAN**.
* **Validador de simulación VCMX (`krl.validateVcmxSimulation`)**: Identifica y soluciona interbloqueos de señales (`VCMX001`–`VCMX004`).
* **Posprocesador (`krl.exportVcmxToKrl`)**: Convierte procesos de simulación en código KRL `.src` y `.dat`.
