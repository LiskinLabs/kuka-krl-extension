> *Markenhinweis: KUKA®, WorkVisual®, iiQWorks®, KUKA.Sim®, SmartPAD® und KRL sind eingetragene Marken der KUKA Aktiengesellschaft / KUKA Roboter GmbH. Das KRL Engineering Toolkit ist ein unabhängiges Engineering-Produkt von Liskin Labs und steht in keiner Verbindung zu KUKA. Offline-Analysen ergänzen, ersetzen jedoch niemals die physische Sicherheitsabnahme an der Steuerung.*

<h1 align="center">KRL Engineering Toolkit für KUKA® Roboter</h1>

<p align="center">
  <b>Fehlerfreien KRL-Code schneller in die Roboterzelle bringen.</b><br />
  Vorlauf- und Sicherheitsprüfung vor dem Download, Auto-Repair für 7 kritische Fehlerklassen, entpackungsfreier Backup-Diff, VASS-26-Linter &amp; Live-Telemetrie für KSS 8.x / iiQKA.OS direkt in VS Code, Cursor &amp; Windsurf.<br />
  Entwickelt für <b>KRC2, KRC4 &amp; KRC5</b> (<code>KSS 5.x–8.7</code> · <code>iiQKA.OS 9.x</code> · <code>VKRC / VASS 26</code>) · <b>100% lokaler RAM · Kein Cloud-Code-Upload</b>
</p>

<p align="center">
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.md">English</a> ·
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.ru.md">Русский</a> ·
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.de.md"><b>Deutsch</b></a> ·
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.tr.md">Türkçe</a> ·
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.es.md">Español</a> ·
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.it.md">Italiano</a>
</p>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension"><img src="https://img.shields.io/visual-studio-marketplace/v/LiskinLabs.kuka-krl-extension?style=flat-square&label=VS%20Code%20Marketplace&color=FF6600" alt="VS Code Marketplace" /></a>
  <a href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension"><img src="https://img.shields.io/visual-studio-marketplace/i/LiskinLabs.kuka-krl-extension?style=flat-square&label=Installs&color=2563EB" alt="Installationen" /></a>
  <a href="https://open-vsx.org/extension/LiskinLabs/kuka-krl-extension"><img src="https://img.shields.io/open-vsx/v/LiskinLabs/kuka-krl-extension?style=flat-square&logo=eclipseche&logoColor=white&color=007ACC&label=Open%20VSX" alt="Open VSX" /></a>
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/releases"><img src="https://img.shields.io/badge/Release-v1.9.24-FF6600?style=flat-square&logo=visualstudiocode&logoColor=white" alt="Release v1.9.24" /></a>
  <a href="https://secure.software/vscode/packages/liskinlabs/kuka-krl-extension"><img src="https://img.shields.io/badge/Spectra%20Assure-PASSED%20(0%20CVE)-10b981?style=flat-square&logo=shield&logoColor=white" alt="ReversingLabs Security Score" /></a>
  <a href="https://liskinlabs.github.io/kuka-krl-extension/"><img src="https://img.shields.io/badge/Fleet%20Audited-4.13M%2B%20LoC-10b981?style=flat-square" alt="4.13M+ Zeilen geprüft" /></a>
  <a href="https://liskinlabs.github.io/kuka-krl-extension/guide/pro-features"><img src="https://img.shields.io/badge/Commands-126%20(63%20Free%20%7C%2063%20Pro)-0EA5E9?style=flat-square" alt="126 Befehle" /></a>
</p>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension"><b>Im Marketplace installieren</b></a> ·
  <a href="https://open-vsx.org/extension/LiskinLabs/kuka-krl-extension"><b>Auf Open VSX installieren</b></a> ·
  <a href="https://checkout.dodopayments.com/buy/pdt_0NmAV012KFHSjUMyDomJ6?redirect_url=https%3A%2F%2Fkuka-krl-support-gateway.redminotpro5.workers.dev%2Fcheckout%2Fsuccess%3Flang%3Dde&singlePage=true&showDiscounts=true&discountCode=LAUNCH30"><b>Pro Annual (-30% LAUNCH30)</b></a> ·
  <a href="https://liskinlabs.github.io/kuka-krl-extension/"><b>Dokumentation</b></a> ·
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/blob/main/SUPPORT.md"><b>Support &amp; Air-Gap-Lizenzierung</b></a>
</p>

> **Alle 63 Pro-Werkzeuge 14 Tage kostenlos testen — ohne Kreditkarte:** drücken Sie `Ctrl+Shift+P` in VS Code und starten Sie **`KRL: Start 14-Day Free Trial`** (`krl.startTrial`) oder vergleichen Sie Tarife über **`KRL: View Pro Plans & Pricing`** (`krl.openPricingPlans`).

<p align="center">
  <img src="https://raw.githubusercontent.com/LiskinLabs/kuka-krl-extension/main/docs/public/media/kuka_control_center.gif" width="780" alt="KRL Engineering Toolkit Control Center und Live-Steuerungstelemetrie" />
</p>

---

## Warum Inbetriebnehmer auf das KRL Engineering Toolkit umsteigen

Ein einziger vermeidbarer Anlagenstillstand beim Hochlauf kostet schnell **USD 10,000+ pro Stunde**. **Schon eine eingesparte Inbetriebnahmestunde amortisiert ein komplettes Jahresabo von Engineer Pro.**

| Störung in der Roboterzelle | Was Standard-Editoren übersehen | Wie KRL Engineering Toolkit es abfängt |
|---|---|---|
| **Interrupt-Abbruch (`KSS 1422`)** | Fehlendes `BRAKE` vor `RESUME` | Statischer Analyzer warnt vorab & `Ctrl+.` fügt **`BRAKE` vor `RESUME`** mit Diff-Vorschau ein |
| **Ungewollter Vorlaufstopp** | Hauptlauf-Anweisungen (`$OUT`, `WAIT`) in Überschleifbahnen | **Advance Run Guard** markiert jede vorlaufbrechende Zeile & schlägt `TRIGGER WHEN DISTANCE=...` vor |
| **Schicht-Punktdrift am SmartPAD** | Manuelles Nachteachen von `E6POS` ohne Versionierung | **Zero-Unpack Backup Diff** berechnet 6D-Deltas (`ΔX, ΔY, ΔZ, A, B, C`) in `< 80 ms` |
| **Inline-Form `;FOLD` / `.dat`-Drift** | Manuelle KRL-Änderungen weichen von `;Params` oder `FDAT` ab | **3-Wege-Integritätsprüfung** gleicht `;FOLD`, KRL, `PDAT`/`LDAT` & `.dat` exakt ab |
| **UTF-8 BOM & Sonderzeichen-Absturz** | Verstecktes `\xEF\xBB\xBF` oder Umlaute stoppen den KSS-Upload | **1-Klick Safe Auto-Repair** bereinigt Non-ASCII-Reste und `;FOLD`/`ENDFOLD`-Verschachtelungen |
| **Wartezeiten schwerer Engineering-Suites** | Komplett-IDE nur für Signal- oder `.wvs`-Inspektion starten | **Native Node.js-Bridge** liest `.wvs`-Topologien & KSS 8.x (`49002`) / iiQKA (`443`) ohne Hersteller-DLLs |

---

## Industrielle Nachweise & verifizierte Benchmarks

- **4.13M+ Zeilen Flotten-Audit**: End-to-End-Benchmark über `108` reale Werks-Backups (`4,136,829` Zeilen) in `25.4 s`.
- **Tiefe KSS-Wissensbasis**: `957` Systemvariablen, `116` Standardfunktionen, `111` Strukturen, `112` Enums, `183` KUKA-Roboterkinematiken und **`126` IDE-Befehle (`63` Free + `63` Pro)**.
- **Live an Steuerungen validiert**: Getestet auf `KSS 8.6.2 (OfficeLite)`, `KSS 8.7 (KR C5)`, `iiQKA 9.2.3 (VRC)` und `iiQKA 9.3.4 (KR C5)`.
- **OT-Sicherheit & Supply-Chain-Audit**: **ReversingLabs Spectra Assure PASSED (0 CVE)** · `100%` lokale RAM-Analyse · kein Cloud-Upload · **Air-Gap Ed25519 `.lic`** Offline-Aktivierung.

---

## Die 5 Engineering-Module im Überblick

### 1. Live-Steuerungstelemetrie, SmartPAD-Meldungen & Compile Gate `[PRO]`
Direkte Ethernet-Verbindung — **ohne WorkVisual, KUKA.Sim, Python oder Hersteller-DLLs**:
- **Nativer KSS 8.x WCF OnlineServices (`49002`) & KUKAVARPROXY/C3Bridge (`7000`)**: reiner TypeScript/Node.js-Stack ohne Zusatzlaufzeit.
- **iiQKA.OS (`KRC5` / `9.x`) gRPC-Bridge (`443`) & Compile Gate**: liest `$TOOL`/`$BASE`, Sicherheitskreise, Achs-Drehmomente/-Temperaturen, Software-Endschalter, PGNO-Signale, installierte KOPs und startet Steuerungs-Checks (`SynchronizeMirror -> AnalyzeAllKrlFiles -> GetModuleInfos`).
- **Echtzeit-I/O-Matrix & SmartPAD-Historie**: Inline-Hinweise neben `$IN[1..4096]`, `$OUT[1..4096]`, `$FLAG[z]`, Online-Backup (`.zip` / `.ibz`) und filterbares 200-Einträge-Meldungsfenster (`krl.live.openMessages`).

<p align="center">
  <img src="https://raw.githubusercontent.com/LiskinLabs/kuka-krl-extension/main/docs/public/media/krl_io_signals.gif" width="760" alt="Echtzeit I/O-Signalinspektor und Inlay-Hinweise" />
</p>

### 2. Pre-Flight Sicherheits-Linter, 7-Gefahren Auto-Repair & VASS 26 / VKRC `[PRO]`
- **Deterministischer Safe Auto-Repair (`krl.fixAllSafeIssuesInFile`)**: behebt BOM/Non-ASCII, fehlendes `BRAKE` vor `RESUME`, `$LOAD`/`BAS(#TOOL)`, `;FOLD`/`ENDFOLD`-Versatz, `FOR STEP 0`, doppelte `C_DIS`/`C_PTP` und Inline-Form `;Params` über Monaco Diff Review mit AST-Rollback. Plus Projekt-Bereinigung (`krl.cleanupUnusedVariables`).
- **Kinematik- & Hüllkurvenprüfung für 183 KUKA-Roboter**: erkennt Singularitäten, kollineare `CIRCLE`-Punkte, `$APO.CDIS`-Überschneidungen, `Status`/`Turn`-Fehler und Reichweitengrenzen.
- **KSS `8.3 – 9.3` Migration (`krl.convertToIiqkaFold`)**: präzise `PDAT`/`LDAT`-Profile (`SVEL_CP2`/`SACC_CP2`, `MotionParamSets.dat`) und `;FOLD`/`;Params`-Konsistenz.
- **Volkswagen VASS 26 / VKRC Suite**: prüft `Folge`, `UP`, `MakroSps`, `VW_USER` (`101..501`), Schutztür-Verriegelungen und `Genau`-Toleranzen.

<p align="center">
  <img src="https://raw.githubusercontent.com/LiskinLabs/kuka-krl-extension/main/docs/public/media/type-validation-demo.gif" width="760" alt="Statische KRL-Sicherheitsvalidierung und Typprüfung" />
</p>

### 3. Entpackungsfreier Backup-Diff, `.wvs`-Feldbus, `.vcmx` & `.evt`-Decoder `[PRO]`
- **Direktes `.zip` / `.ibz` / `KRCDiag` / `.wvs`-Mounting**: öffnet Archive in VS Code (`< 80 ms` RAM-Speicherung) und dekodiert Windows-EVTX `.evt`-Logs in 6 Sprachen offline.
- **6D-Punkt-Delta & Batch-Transformationen**: vergleicht Backups (`ΔX, ΔY, ΔZ, A, B, C`) und verschiebt/spiegelt `E6POS`-Bahnen mit Diff-Vorschau.
- **WorkVisual `.wvs` Feldbus-Export (`krl.inspectFieldbusTopology`)**: extrahiert KOP-Kataloge, EtherCAT/PROFINET-Topologie und exportiert nach **Siemens TIA Portal**, **Beckhoff TwinCAT 3** und **EPLAN**.
- **`.vcmx`-Zellenvalidator & ISO-Abnahme**: erkennt `VCMX001–VCMX004`-Deadlocks (`krl.inspectWorkcellLayout`, `krl.validateWorkcellSimulation`) und erstellt druckfertige **ISO 10218-1/-2 Abnahmeprotokolle**.

<p align="center">
  <img src="https://raw.githubusercontent.com/LiskinLabs/kuka-krl-extension/main/docs/public/media/krc_backup_diff.gif" width="760" alt="SmartPAD Backup-Diff und Koordinaten-Deltas" />
</p>

### 4. Interaktive Ablaufpläne, KUKA.RSI 4ms, CAM G-Code & MCP-Brücke `[PRO]`
- **Bidirektionaler SVG-Programmablaufplan (`krl.showFlowchart`)**: Klick auf `IF`, `SWITCH`, `LOOP` oder `FOR` springt direkt zur KRL-Zeile; sauberer SVG-Export für Kundendokumentationen.
- **KUKA.RSI 4ms (`krl.validateRsiXml`, `krl.generateRsiCode`)** & **CNC G-Code / SVG (`krl.importGcodeToKrl`)** & **9-Posen Hand-Auge-Kalibrierung (`krl.generateVisionCalibration`)**.
- **Lokales MCP AI Gateway (`127.0.0.1`)**: bindet Cursor, Claude Code und Windsurf sicher an `krl_live_telemetry`, `krl_workspace_diagnostics`, `krl_safe_auto_repair` und `krl_system_variable_spec` an.

<p align="center">
  <img src="https://raw.githubusercontent.com/LiskinLabs/kuka-krl-extension/main/docs/public/media/control_flow_graph.gif" width="760" alt="Interaktiver KRL-Kontrollflussgraph" />
</p>

### 5. Hochleistungs-KRL Language Server — dauerhaft kostenlos `[FREE CORE]`
Voller täglicher KRL-Editor ohne Zeilenlimit (`63` kostenlose Werkzeuge): `F12` dateiübergreifend (`.src` ↔ `.dat`), Verwendungsnachweise, Umbenennung, Inlay-Signale, Deklarationssortierer, `;FOLD`-Faltung, **`957` KSS-Systemvariablen**, **`116` Funktionen**, **`111` Structs**, **`112` Enums** und **6 Industrie-Themes**.

<p align="center">
  <img src="https://raw.githubusercontent.com/LiskinLabs/kuka-krl-extension/main/docs/public/media/smart_autocomplete.gif" width="760" alt="Intelligente KRL-Autovervollständigung" />
</p>

---

## Editionen, Lizenzmodell & Transparente Preise

**Community Edition:** Kostenlos für Studium, Lehre und nicht-kommerzielle Nutzung ([LICENSE.txt](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/LICENSE.txt)). Alle Pro-Module lassen sich über die **14-tägige kostenlose Testphase** (`krl.startTrial`) testen; der produktive Einsatz erfordert eine Pro-, Team-, Department- oder Enterprise-Lizenz.

> **Start-Rabatt (`LAUNCH30`):** Code **`LAUNCH30`** gewährt **30% Rabatt** (direkt in den Links vorausgefüllt). Abwicklung über **Dodo Payments** (Merchant of Record) mit automatischen Rechnungen und **0% EU-USt (Reverse Charge mit USt-IdNr.)**.

| Paket | Listenpreis | Mit `LAUNCH30` (-30%) | Plätze / Laufzeit | Ideal für | Kaufen |
|---|---|---|---|---|---|
| **Community** | USD 0 | USD 0 | Privat / Lehre · +14 T. Pro-Test | Ausbildung &amp; Basis-Editing | [Kostenlos installieren](https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension) |
| **Pro Monthly** | USD 19 / Mon | **USD 13.30 / Mon** | 1 Arbeitsplatz · Monatlich kündbar | Kurze Inbetriebnahmen | [Monatsabo](https://checkout.dodopayments.com/buy/pdt_0NmAUzwdbzeERSktsOLTp?redirect_url=https%3A%2F%2Fkuka-krl-support-gateway.redminotpro5.workers.dev%2Fcheckout%2Fsuccess%3Flang%3Dde&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Pro Annual** *(Empfehlung)* | USD 149 / Jahr | **USD 104.30 / Jahr** | 1 Arbeitsplatz · 1 Jahr Updates | Vollzeit-Programmierer | [Jahresabo (-30%)](https://checkout.dodopayments.com/buy/pdt_0NmAV012KFHSjUMyDomJ6?redirect_url=https%3A%2F%2Fkuka-krl-support-gateway.redminotpro5.workers.dev%2Fcheckout%2Fsuccess%3Flang%3Dde&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Pro Lifetime** | USD 699 einmalig | **USD 489.30 einmalig** | 1 Arbeitsplatz · Unbefristet | Freiberufler & Berater | [Lifetime kaufen](https://checkout.dodopayments.com/buy/pdt_0NmAcoqVCfuwQ6Xx7qyqr?redirect_url=https%3A%2F%2Fkuka-krl-support-gateway.redminotpro5.workers.dev%2Fcheckout%2Fsuccess%3Flang%3Dde&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Team Edition** | USD 499 / Jahr | **USD 349.30 / Jahr** | **5 Plätze** · Sammelrechnung | Kleine Integrationsteams | [Team (5 Plätze)](https://checkout.dodopayments.com/buy/pdt_0NnLCdgD69GiXDLRJ0K5v?redirect_url=https%3A%2F%2Fkuka-krl-support-gateway.redminotpro5.workers.dev%2Fcheckout%2Fsuccess%3Flang%3Dde&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Department / Integrator** | USD 1,499 / Jahr | **USD 1,049.30 / Jahr** | **20 Plätze** · Air-Gap Support | Systemintegratoren | [Department (20 Plätze)](https://checkout.dodopayments.com/buy/pdt_0Nq5QVTrbkJbWAUf8qoyn?redirect_url=https%3A%2F%2Fkuka-krl-support-gateway.redminotpro5.workers.dev%2Fcheckout%2Fsuccess%3Flang%3Dde&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Enterprise Plant** | USD 4,999 / Jahr | Auf Anfrage (PO) | **100 Plätze** · Prioritäts-SLA | Werke & OEMs | [Firmenrechnung anfordern](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/SUPPORT.md#2-14-day-free-trial-upgrades--billing-dodo-payments-mor) |

Bereits lizenziert? **[Online aktivieren](https://kuka-krl-support-gateway.redminotpro5.workers.dev/activate)** · **[Air-Gap `.lic` generieren](https://kuka-krl-support-gateway.redminotpro5.workers.dev/airgap)** · **[Kundenportal & USt-Rechnungen](https://customer.dodopayments.com/login/bus_0NlrxPhrg9eHzPZKAgsF1)**

---

## Schnellstart & Air-Gap-Industrietauglichkeit

```bash
code --install-extension LiskinLabs.kuka-krl-extension
```

- **100% lokaler Arbeitsspeicher**: Programme und EVTX-Logs verlassen niemals Ihren Laptop ([PRIVACY.md](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/PRIVACY.md)).
- **Offline-Cache für gekaufte Lizenzen (30 Tage + 14 Tage Kulanzfrist)** sowie vollständiger **Ed25519 `.lic` Air-Gap-Modus** (`krl.exportHardwareIdFile` / `krl.importOfflineLicenseFile`; die kostenlose Testversion läuft **14 Tage**).

---

## Neu in v1.9.24

- **`CrossMeld 1419/1516`-Fix, natives `.ibz` &amp; update-sichere Lizenz (`v1.9.24`)**: Kein SmartPAD-Benachrichtigungs-Spam bei Online-Verbindung ohne aktives Programm/Base, native `.ibz`/`.IBZ`-Unterstützung, gehärtete Ed25519/Dodo-Prüfung mit `v4`-Spiegelung über Updates/Adapterwechsel hinweg sowie einheitlicher **14-Tage-Testzeitraum**.
- **Open VSX Single-Line Fix (`v1.9.20 – v1.9.23`)**: Einzeiliges Obfuscation-Bundle mit Inline-Scanner-Marker.
- **In-IDE Trial &amp; B2B Checkout (`v1.9.18 – v1.9.19`)**: `krl.openPricingPlans`, 14-Tage-Test (`krl.startTrial`) ohne Karte und `LAUNCH30` (`30%`), plus nativer KSS 8.x (`49002`) / iiQKA.OS 9.x Client (`krl.live.openMessages`).
- **Vollständiges Änderungsprotokoll**: [CHANGELOG.md](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/CHANGELOG.md).

---

## Sicherheitshinweis (ISO 10218-1/-2 & ISO 13849-1)

**KRL Engineering Toolkit** ist eine nicht sicherheitszertifizierte Engineering-Software (**Non-SIL / Non-PL**) von **Liskin Labs** und ersetzt keine physische T1-Sichtprüfung (`$OV_PRO <= 30%` am SmartPAD) oder Risikobeurteilung nach **ISO 10218-1/-2** und **ISO 13849-1**.
