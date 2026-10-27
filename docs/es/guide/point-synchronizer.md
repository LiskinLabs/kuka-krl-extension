# Motor de Tabla de Puntos y Sincronizador .DAT

Gestión de coordenadas espaciales, sincronización automática de archivos de datos y transformaciones 6D.

---

## Descripción general

En la arquitectura KRL, las instrucciones de movimiento de los archivos `.src` hacen referencia a puntos (`E6POS`, `POS`, `FRAME`) y parámetros (`FDAT`, `PDAT`, `LDAT`) declarados en los archivos `.dat`.

El **Motor de Tabla de Puntos y Autosincronizador** (`krl.syncPointsToDat`, `krl.batchShiftPoints`, `krl.mirrorTrajectory`) garantiza la integridad de los datos, detecta puntos huérfanos y realiza calibraciones cinemáticas mediante SVD Kabsch.
