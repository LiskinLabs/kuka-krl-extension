# Monitor Live Monitor Industriale e Connessione in Tempo Reale

Telemetria in tempo reale e bridge di connessione per controllori KUKA KRC2, KRC4 e KRC5.

---

## Panoramica

Il **Monitor Live Monitor in tempo reale** (`krl.live.connect`, `krl.live.openDashboard`) stabilisce un collegamento Ethernet ad alta frequenza tra VS Code e controllori KUKA fisici o virtuali, fornendo feedback di coppia sui 6 assi, tracciamento TCP cartesiano, matrice di I/O a 4096 pin e sottotitoli multilingue per allarmi KSS.

---

## Novità della 1.9.17

- **Telemetria completa iiQKA.OS**: frame Tool/Base, interblocchi di sicurezza, coppia/temperatura/corrente/velocità per asse, limiti software, dettagli PGNO, pacchetti KOP installati e `$V_ROBCOR`.
- **Finestra messaggi SmartPAD**: la dashboard mostra gli ultimi tre messaggi; la cronologia completa (fino a 200, più recenti prima) si apre in un pannello dedicato con filtri, ricerca e aggiornamento live (`krl.live.openMessages`).
- **Compile gate del KSS di destinazione**: la scheda iiQKA.OS esegue `SynchronizeMirror -> AnalyzeAllKrlFiles -> GetModuleInfos` e riporta il verdetto reale per modulo. KSS 9.3 richiede pattern espliciti `*.src` / `*.dat` (il pattern `*` restituisce `13 INTERNAL: BSCmdNA`).
- **Trasporti validati**: WCF 49002 su KSS 8.6.2 (OfficeLite) e KSS 8.7 (KR C5); iiQKA gRPC su KSS 9.2.3 (VRC) e KSS 9.3.4 (KRC5).
