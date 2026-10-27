# Industrieller SCADA & Echtzeit-Steuerungsmonitor

Echtzeit-Telemetrie und Online-Steuerungsanbindung für KUKA KRC2, KRC4 und KRC5 Systeme.

---

## Übersicht

Der **Industrielle SCADA Live Monitor** (`krl.connectKukaRobot`, `krl.openLiveBridge`) stellt eine direkte, hochfrequente Ethernet-Verbindung zwischen VS Code und physikalischen KUKA-Robotersteuerungen her.

Er bringt Hallen-Telemetrie, 6-Achs-Drehmomentanzeigen, kartesische TCP-Verfolgung, eine 4096-Pin E/A-Matrix und mehrsprachige KSS-Meldungen direkt in Ihren Entwicklungsbereich.

---

## Kernfunktionen

* **6-Achs-Echtzeit-Telemetrie**: Live-Erfassung von `$AXIS_ACT`, `$AXIS_MOT` und Motor-Drehmomentauslastung (`$TORQMON`).
* **Kartesische TCP-Position**: Live-Anzeige von `$POS_ACT` mit X, Y, Z, A, B, C Koordinaten und aktiven `$TOOL` / `$BASE` Referenzen.
* **4096-Pin E/A-Feld**: Visuelle Statusmatrix für digitale Eingänge (`$IN`) und Ausgänge (`$OUT`), sowie Merker (`$FLAG`) und Timer (`$TIMER`).
* **Mehrsprachige Alarmanzeige**: Sofortige Übersetzung und Anzeige von KSS-Meldungen mit detaillierten Hinweisen.
