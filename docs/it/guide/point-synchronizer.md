# Motore Tabella Punti e Sincronizzatore .DAT

Gestione delle coordinate spaziali, sincronizzazione automatica dei file dati e trasformazioni 6D.

---

## Panoramica

In KRL, le istruzioni di movimento nei file `.src` richiedono strutture coordinate (`E6POS`, `POS`, `FRAME`) e parametri (`FDAT`, `PDAT`, `LDAT`) dichiarati nei file `.dat`.

Il **Motore Tabella Punti e Auto-Sincronizzatore** (`krl.syncPointsToDat`, `krl.batchShiftPoints`, `krl.mirrorTrajectory`) garantisce l'integrità dei dati, individua punti orfani e permette la calibrazione cinematica mediante SVD Kabsch.
