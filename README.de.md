> *Markenhinweis: KUKA®, WorkVisual®, iiQWorks®, KUKA.Sim®, SmartPAD® und KRL sind eingetragene Marken der KUKA Aktiengesellschaft / KUKA Roboter GmbH. Das KRL Engineering Toolkit ist ein unabhängiges Werkzeug von Liskin Labs und steht in keiner Verbindung zu KUKA. Offline-Analysen ersetzen niemals die Sicherheitsabnahme auf der realen Steuerung.*

<h1 align="center">KRL Engineering Toolkit für VS Code</h1>

<p align="center">
  <b>Industrielle KRL-IDE, statische Sicherheitsanalyse, Backup-Diff &amp; Live-Bridge für KUKA-Roboter.</b><br />
  Entwickelt für <b>KRC2, KRC4 und KRC5</b> (<code>KSS 5.x – 8.7</code> &amp; <code>KSS 9.x / iiQWorks / iiQKA.OS</code>) · <b>100% Offline-First · Kein Cloud-Code-Upload</b>
</p>

<p align="center">
  [English](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.md) · [Русский](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.ru.md) · [Deutsch](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.de.md) · [Türkçe](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.tr.md) · [Español](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.es.md) · [Italiano](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.it.md)
</p>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension"><img src="https://img.shields.io/visual-studio-marketplace/v/LiskinLabs.kuka-krl-extension?style=flat-square&label=VS%20Code%20Marketplace&color=FF6600" alt="VS Code Marketplace" /></a>
  <a href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension"><img src="https://img.shields.io/visual-studio-marketplace/i/LiskinLabs.kuka-krl-extension?style=flat-square&label=Installs&color=2563EB" alt="Installs" /></a>
  <a href="https://open-vsx.org/extension/LiskinLabs/kuka-krl-extension"><img src="https://img.shields.io/open-vsx/v/LiskinLabs/kuka-krl-extension?style=flat-square&logo=eclipseche&logoColor=white&color=007ACC&label=Open%20VSX" alt="Open VSX" /></a>
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/releases"><img src="https://img.shields.io/badge/Release-v1.9.18-FF6600?style=flat-square&logo=visualstudiocode&logoColor=white" alt="Release v1.9.18" /></a>
  <a href="https://secure.software/vscode/packages/liskinlabs/kuka-krl-extension"><img src="https://img.shields.io/badge/Spectra%20Assure-PASSED%20(100%25)-10b981?style=flat-square&logo=shield&logoColor=white" alt="ReversingLabs Security Score" /></a>
  <a href="https://liskinlabs.github.io/kuka-krl-extension/"><img src="https://img.shields.io/badge/Befehle-126-FF6600?style=flat-square" alt="126 Commands" /></a>
  <a href="https://liskinlabs.github.io/kuka-krl-extension/guide/pro-features"><img src="https://img.shields.io/badge/Pro%20Tools-63-0EA5E9?style=flat-square" alt="63 Pro Tools" /></a>
</p>

<p align="center">
  <a href="https://liskinlabs.github.io/kuka-krl-extension/de/guide/installation"><b>Installation &amp; Schnellstart</b></a> ·
  <a href="https://liskinlabs.github.io/kuka-krl-extension/de/"><b>Dokumentation &amp; 64 Guides</b></a> ·
  <a href="https://checkout.dodopayments.com/buy/pdt_0NmAV012KFHSjUMyDomJ6?redirect_url=https%3A%2F%2Fkuka-krl-support-gateway.redminotpro5.workers.dev%2Fcheckout%2Fsuccess%3Flang%3Dde&singlePage=true&showDiscounts=true&discountCode=LAUNCH30"><b>Pro Annual kaufen (-30%: LAUNCH30)</b></a> ·
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/blob/main/SUPPORT.md"><b>Support &amp; Air-Gap-Lizenzierung</b></a>
</p>

> **14 Tage Pro kostenlos testen — ohne Kreditkarte:** Befehlspalette in VS Code öffnen (`Strg+Umschalt+P`) und **`KRL: Start 14-Day Free Trial`** (`krl.startTrial`) oder **`KRL: Preise & Pro-Tarife`** (`krl.openPricingPlans`) ausführen.

<p align="center">
  <img src="https://raw.githubusercontent.com/LiskinLabs/kuka-krl-extension/main/docs/public/media/kuka_control_center.gif" width="760" alt="KUKA Control Center und Live-Telemetrie Demo" />
</p>

---

## Fehler abfangen, bevor der Code den Roboter berührt

Jede Stunde Linien-Stillstand kostet **über 10.000 USD** — verursacht durch Vorlaufstopps (`$OUT` im überschliffenen Satz), fehlende `BRAKE`-Anweisungen vor `RESUME` (`KSS 1422`) oder uninitialisierte `$TOOL`/`$BASE`-Frames.

**KRL Engineering Toolkit** liefert **126 Befehle**, **957 integrierte KSS-Systemvariablen**, **183 Robotermodell-Profile**, einen **VASS 26 / VKRC-Linter** und **direkte Steuerungs-Telemetrie** für VS Code, Cursor, Windsurf und Open VSX.

| Funktionsumfang | Community (Kostenlos) | Pro / Team / Enterprise |
|---|---|---|
| KRL-Syntax, 6 Hallen-Themes, Autocomplete (`957` KSS-Variablen, `116` Funktionen) | Unbegrenzte Zeilen | Unbegrenzte Zeilen |
| `F12`-Navigation (`.src` ↔ `.dat`), Referenzen, Formatter, FOLD/ENDFOLD, Deklarationssortierer | Enthalten | Enthalten |
| Syntax-Diagnose, Block-Balance-Check, Basis-Frame-Checks &amp; KRL-Snippets | Enthalten | Enthalten |
| Sicherheits-Audits: Vorlaufstopp-Schutz, `S/T`-Kinematik, Reichweitenprüfung (183 Roboter) | 30 Tage Evaluation | Produktiveinsatz |
| VASS 26 / `VW_USER` (`101..501`) Automotive-Linter &amp; Motion 3-Way-Sync (`FOLD` vs. `.dat`) | — | Produktiveinsatz |
| Live-Telemetrie KSS 8.x WCF (Port `49002`) &amp; iiQKA.OS, SmartPAD-Meldungen, Compile-Gate | — | Produktiveinsatz |
| Virtuelles `.zip`/`.wvs`-Mounten, Punkt-Delta-Diff (`ΔX/Y/Z`), 6D-Trajektorien &amp; `.evt`-Decoder | — | Produktiveinsatz |

---

## Industrielle Kernmodule

### 1. Live-Steuerungsbrücke &amp; SmartPAD-Meldungen (`KSS 8.x` &amp; `iiQKA.OS 9.x`)
- **Nativer KSS 8.x WCF-Client**: Läuft vollständig in Node.js über Port `49002` — ohne WorkVisual, KUKA.Sim, Python oder Hersteller-DLLs.
- **iiQKA.OS (`KRC5`) &amp; Compile-Gate**: Überwacht `$TOOL`/`$BASE`, Achsmomente/-ströme/-temperaturen, PGNO, KOP-Pakete und öffnet durchsuchbare SmartPAD-Meldungen (`krl.live.openMessages`).
- **Echtzeit-I/O-Inlay-Hints**: Blendet Hardware-Signalnamen direkt neben `$IN[x]`, `$OUT[y]` und `$FLAG[z]` ein.

<p align="center">
  <img src="https://raw.githubusercontent.com/LiskinLabs/kuka-krl-extension/main/docs/public/media/krl_io_signals.gif" width="760" alt="KRL I/O-Signalinspektor und Inlay-Hints" />
</p>

### 2. Pre-Deployment-Sicherheit, Kinematik &amp; VASS 26 / VKRC
- **Kinematik- &amp; Bahnprüfung**: Erkennt Achse-5-/Schulter-Singularitäten, kollineare `CIRC`-Punkte, `$APO.CDIS`-Überschreitungen, `Status/Turn`-Fehler und Reichweitenverletzungen für **183 KUKA-Modelle**.
- **3-Way Motion Data Integrity**: Vergleicht SmartPAD-`;FOLD`-Kommentare (`VB`, Tool, Base) gegen `.dat`-Strukturen (`PDAT`/`LDAT`/`FDAT`).
- **VASS 26 / VKRC Suite**: Prüft `Folge`, `UP`, `MakroSps`, `VW_USER` (`101..501`), Schutztür-Freigaben und `Genau`-Verhältnisse.
- **Interaktive Flussdiagramme**: SVG-Ablaufpläne komplexer KRL-Unterprogramme und Ablaufketten.

<p align="center">
  <img src="https://raw.githubusercontent.com/LiskinLabs/kuka-krl-extension/main/docs/public/media/type-validation-demo.gif" width="760" alt="Statische Sicherheitsanalyse und Typprüfung in KRL" />
</p>

### 3. Backup-Diff, 6D-Transformationen &amp; Binäre `.evt`-Protokolle
- **Zero-Extract `.zip` / `.wvs`-Explorer**: Durchsucht Controller-Archive im Arbeitsspeicher, dekodiert `.evt`-Ereignisprotokolle offline in 6 Sprachen und exportiert Abnahmeberichte (ISO 10218-1).
- **Point Delta Inspector**: Zeigt exakte Koordinatenabweichungen (`ΔX, ΔY, ΔZ, A, B, C`) zwischen Schichten oder Backups.
- **6D-Batch-Verschiebung &amp; Spiegelung**: Transformiert Positionen über Tool-/Base-Frames mit nativer Monaco-Diff-Vorschau.

<p align="center">
  <img src="https://raw.githubusercontent.com/LiskinLabs/kuka-krl-extension/main/docs/public/media/krc_backup_diff.gif" width="760" alt="SmartPAD Backup-Vergleich und Punkt-Delta-Inspektor" />
</p>

### 4. KRL Language Server (Kostenlose Community-Basis)
Jeder Roboterprogrammierer erhält `F12`-Navigation (`.src` ↔ `.dat`), Smart Autocomplete, Inlay-Hinweise, Formatierung, FOLD-Verwaltung und Echtzeit-Syntaxprüfung **dauerhaft kostenlos ohne Zeilenlimit**.

<p align="center">
  <img src="https://raw.githubusercontent.com/LiskinLabs/kuka-krl-extension/main/docs/public/media/smart_autocomplete.gif" width="760" alt="Smart Autocomplete und Systemvariablen-Referenz" />
</p>

---

## Editionen, EULA &amp; Transparente Preise

**Community-Lizenz:** Kostenlos für privates Lernen, akademische Forschung/Lehre sowie eine **30-tägige nicht-produktive Testphase** (siehe [LICENSE.txt](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/LICENSE.txt)). Für den laufenden kommerziellen und produktiven Einsatz ist eine Pro-, Team-, Department- oder Enterprise-Lizenz erforderlich.

> **Startaktion (`LAUNCH30`):** Code **`LAUNCH30`** gewährt **30% Rabatt** auf den Erstkauf (in den Links unten voraktiviert). Abwicklung über **Dodo Payments** (Merchant of Record) inkl. **0% EU-VIES Reverse Charge** bei gültiger USt-IdNr. und automatischer PDF-Rechnung.

| Tarif | Listenpreis | Mit `LAUNCH30` (-30%) | Aktivierungen / Laufzeit | Zielgruppe | Kaufen |
|---|---|---|---|---|---|
| **Community** | 0 USD | 0 USD | Privat / Forschung / 30 T. Eval | Lernen &amp; nicht-kommerzielle Projekte | [Kostenlos installieren](https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension) |
| **Pro Monthly** | 19 USD / Mon. | **13.30 USD / Mon.** | 1 Workstation · Monatlich kündbar | Kurze Inbetriebnahmen | [Monthly wählen](https://checkout.dodopayments.com/buy/pdt_0NmAUzwdbzeERSktsOLTp?redirect_url=https%3A%2F%2Fkuka-krl-support-gateway.redminotpro5.workers.dev%2Fcheckout%2Fsuccess%3Flang%3Dde&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Pro Annual** *(Empfohlen)* | 149 USD / Jahr | **104.30 USD / Jahr** | 1 Workstation · 1 Jahr Updates | Robotik-Ingenieure | [Annual (-30%)](https://checkout.dodopayments.com/buy/pdt_0NmAV012KFHSjUMyDomJ6?redirect_url=https%3A%2F%2Fkuka-krl-support-gateway.redminotpro5.workers.dev%2Fcheckout%2Fsuccess%3Flang%3Dde&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Pro Lifetime** | 699 USD einm. | **489.30 USD einm.** | 1 Workstation · Dauerhaft | Freie Inbetriebnehmer | [Lifetime wählen](https://checkout.dodopayments.com/buy/pdt_0NmAcoqVCfuwQ6Xx7qyqr?redirect_url=https%3A%2F%2Fkuka-krl-support-gateway.redminotpro5.workers.dev%2Fcheckout%2Fsuccess%3Flang%3Dde&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Team Edition** | 499 USD / Jahr | **349.30 USD / Jahr** | **5 Workstations** · Firmenrechnung | Roboterzellen-Teams | [Team (5 Plätze)](https://checkout.dodopayments.com/buy/pdt_0NnLCdgD69GiXDLRJ0K5v?redirect_url=https%3A%2F%2Fkuka-krl-support-gateway.redminotpro5.workers.dev%2Fcheckout%2Fsuccess%3Flang%3Dde&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Department / Integrator** | 1,499 USD / Jahr | **1,049.30 USD / Jahr** | **20 Workstations** · Air-Gap | Systemintegratoren | [Integrator (20 Plätze)](https://checkout.dodopayments.com/buy/pdt_0Nq5QVTrbkJbWAUf8qoyn?redirect_url=https%3A%2F%2Fkuka-krl-support-gateway.redminotpro5.workers.dev%2Fcheckout%2Fsuccess%3Flang%3Dde&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Enterprise Plant** | 4,999 USD / Jahr | Auf Anfrage (PO) | **100 Workstations** · Prioritäts-Support | Werke &amp; OEM-Linien | [Firmenangebot anfordern](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/SUPPORT.md#2-14-day-free-trial-upgrades--billing-dodo-payments-mor) |

Bereits lizenziert? **[Online aktivieren](https://kuka-krl-support-gateway.redminotpro5.workers.dev/activate?lang=de)** · **[Air-Gap `.lic`-Portal](https://kuka-krl-support-gateway.redminotpro5.workers.dev/airgap)** · **[Kundenportal &amp; Rechnungen](https://customer.dodopayments.com/login/bus_0NlrxPhrg9eHzPZKAgsF1)**

---

## Werkshallen- &amp; Air-Gap-Tauglichkeit

- **100% lokal im Arbeitsspeicher**: Keine `.src`-, `.dat`- oder `.wvs`-Daten verlassen jemals Ihren Rechner ([PRIVACY.md](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/PRIVACY.md)).
- **30 Tage Offline-Cache + 14 Tage Karenzzeit**: Aktive Lizenzen laufen in abgeschotteten Zellen zuverlässig weiter.
- **Vollständiger Air-Gap-Betrieb**: Signierte Ed25519-`.lic`-Dateien über das [Air-Gap-Portal](https://kuka-krl-support-gateway.redminotpro5.workers.dev/airgap) per `krl.importOfflineLicenseFile`.

---

## Neu in v1.9.17

- **Nativer KSS 8.x WCF-Client**: Direkte Telemetrie über Port `49002` in Node.js ohne WorkVisual, KUKA.Sim oder Hersteller-DLLs.
- **iiQKA.OS-Telemetrie &amp; SmartPAD-Historie**: Tool/Base-Frames, Sicherheitsverriegelungen, Achsmomente/-ströme/-temperaturen, PGNO, KOPs und `krl.live.openMessages`.
- **Target KSS Compile-Gate &amp; Migration (`KSS 8.3 – 9.3`)**: Live validiert auf KSS 8.6.2, KSS 8.7, iiQKA 9.2.3 und iiQKA 9.3.4 ([CHANGELOG.md](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/CHANGELOG.md)).
