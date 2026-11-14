# Industrieller Live Monitor & Echtzeit-Steuerungsmonitor

Echtzeit-Telemetrie und Online-Steuerungsanbindung für KUKA KRC2, KRC4 und KRC5 Systeme.

---

## Übersicht

Der **Industrielle Live Controller Monitor** (`krl.live.connect`, `krl.live.openDashboard`) stellt eine direkte, hochfrequente Ethernet-Verbindung zwischen VS Code und physikalischen KUKA-Robotersteuerungen her.

Er bringt Hallen-Telemetrie, 6-Achs-Drehmomentanzeigen, kartesische TCP-Verfolgung, eine 4096-Pin E/A-Matrix und mehrsprachige KSS-Meldungen direkt in Ihren Entwicklungsbereich.

---

## Kernfunktionen

* **6-Achs-Echtzeit-Telemetrie**: Live-Erfassung von `$AXIS_ACT`, `$AXIS_MOT` und Motor-Drehmomentauslastung (`$TORQMON`).
* **Kartesische TCP-Position**: Live-Anzeige von `$POS_ACT` mit X, Y, Z, A, B, C Koordinaten und aktiven `$TOOL` / `$BASE` Referenzen.
* **4096-Pin E/A-Feld**: Visuelle Statusmatrix für digitale Eingänge (`$IN`) und Ausgänge (`$OUT`), sowie Merker (`$FLAG`) und Timer (`$TIMER`).
* **Mehrsprachige Alarmanzeige**: Sofortige Übersetzung und Anzeige von KSS-Meldungen mit detaillierten Hinweisen.

---

## Neu in 1.9.17

- **Vollständige iiQKA.OS-Telemetrie**: Tool-/Base-Frames, Sicherheitsverriegelungen, Moment/Temperatur/Strom/Geschwindigkeit pro Achse, Soft-Limits, PGNO-Details, installierte KOP-Pakete und `$V_ROBCOR`.
- **SmartPAD-Meldungsfenster**: Das Dashboard zeigt die letzten drei Meldungen; die vollständige Historie (bis 200, neueste zuerst) öffnet sich in einem eigenen Panel mit Filtern, Suche und Live-Aktualisierung (`krl.live.openMessages`).
- **KSS-Compile-Gate**: Die iiQKA.OS-Karte führt `SynchronizeMirror -> AnalyzeAllKrlFiles -> GetModuleInfos` aus und meldet das echte Modul-Ergebnis. KSS 9.3 benötigt explizite `*.src` / `*.dat`-Muster (das bloße `*` liefert `13 INTERNAL: BSCmdNA`).
- **Validierte Transporte**: WCF 49002 auf KSS 8.6.2 (OfficeLite) und KSS 8.7 (KR C5); iiQKA gRPC auf KSS 9.2.3 (VRC) und KSS 9.3.4 (KRC5).
