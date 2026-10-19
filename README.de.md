<h1 align="center">KUKA Engineering Toolkit</h1>

<p align="center">
  <b>Industrielles Engineering, Diagnose und Pre-Deployment-Analyse fÃ¼r KUKA-Roboter.</b><br />
  <i>VerfÃ¼gbar als VS Code Erweiterung.</i><br />
  Entwickelt fÃ¼r <b>KRC2-, KRC4- und KRC5-Steuerungen (KSS 5.x â€“ 8.7+)</b>.
</p>

<details>
<summary>Language / Ğ¯Ğ·Ñ‹Ğº / Dil / Sprache / Lingua / Idioma</summary>

| Language | File |
|---|---|
| English | [README.md](README.md) |
| Ğ ÑƒÑÑĞºĞ¸Ğ¹ | [README.ru.md](README.ru.md) |
| TÃ¼rkÃ§e | [README.tr.md](README.tr.md) |
| Deutsch | [README.de.md](README.de.md) |
| Italiano | [README.it.md](README.it.md) |
| EspaÃ±ol | [README.es.md](README.es.md) |

</details>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension"><img src="https://badgen.net/vs-marketplace/v/LiskinLabs.kuka-krl-extension?style=flat&label=VS%20Code%20Marketplace&color=FF6600" alt="VS Code Marketplace" /></a>
  <a href="https://open-vsx.org/extension/LiskinLabs/kuka-krl-extension"><img src="https://img.shields.io/open-vsx/v/LiskinLabs/kuka-krl-extension?style=flat-square&logo=eclipseche&logoColor=white&color=007ACC&label=Open%20VSX" alt="Open VSX" /></a>
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/releases"><img src="https://img.shields.io/badge/Release-v1.9.5-FF6600?style=flat-square&logo=visualstudiocode&logoColor=white" alt="Release v1.9.5" /></a>
  <a href="https://secure.software/vscode/packages/liskinlabs/kuka-krl-extension"><img src="https://img.shields.io/badge/Spectra%20Assure-PASSED%20(100%25)-10b981?style=flat-square&logo=shield&logoColor=white" alt="ReversingLabs Security Score" /></a>
  <a href="https://liskinlabs.github.io/kuka-krl-extension/"><img src="https://img.shields.io/badge/Fleet%20Verified-4.2M%2B%20LoC-10b981?style=flat-square" alt="Fleet Verified" /></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Language-KRL-orange?style=flat-square" />
  <img src="https://img.shields.io/badge/Controllers-KRC2%20%7C%20KRC4%20%7C%20KRC5-007ACC?style=flat-square" />
  <img src="https://img.shields.io/badge/Compatibility-KSS%208.x%20%7C%20KSS%209.x%20(iiQWorks)-FF6600?style=flat-square" />
  <img src="https://img.shields.io/badge/Built--in%20Specs-957%20Vars%20%7C%20116%20Functions-10b981?style=flat-square" />
  <img src="https://img.shields.io/badge/Offline--First-100%25%20Factory%20Ready-green?style=flat-square" />
  <img src="https://img.shields.io/badge/Security-0%20Malware%20%7C%200%20CVEs-emerald?style=flat-square" />
  <img src="https://img.shields.io/badge/Localization-EN%20%7C%20DE%20%7C%20IT%20%7C%20ES%20%7C%20RU%20%7C%20TR-blue?style=flat-square" />
</p>

<p align="center">
  <a href="https://liskinlabs.github.io/kuka-krl-extension/"><b>Interaktives Wiki & Dokumentation</b></a> â€¢
  <a href="https://checkout.dodopayments.com/buy/pdt_0NmAUzwdbzeERSktsOLTp"><b>Pro Monthly ($19.99/Monat)</b></a> â€¢ 
  <a href="https://checkout.dodopayments.com/buy/pdt_0NmAV012KFHSjUMyDomJ6"><b>Pro jÃ¤hrlich ($149.00/Jahr â€“ 35% sparen)</b></a> â€¢ 
  <a href="https://secure.software/vscode/packages/liskinlabs/kuka-krl-extension"><b>Sicherheitsaudit-Bericht</b></a>
</p>

---

## Bevor der Code auf den Roboter kommt (Before the robot)

> **KUKA-Programme, Backups, Ereignisprotokolle, I/O-Signale, Koordinaten und Bewegungspfade analysieren, bevor Ã„nderungen auf die physische Steuerung Ã¼bertragen werden.**

* **ProduktionsstillstÃ¤nde verhindern**: Programmier-, Konfigurations- und Kollisionsrisiken vor dem Serienanlauf aufdecken.
* **Ã„nderungen verstehen**: SmartPAD-Backups vergleichen und exakt ermitteln, was sich in `.src`- und `.dat`-Dateien geÃ¤ndert hat.
* **Engineering standardisieren**: KRL-Projekte automatisiert anhand eigener Werksstandards und Automobilrichtlinien (VASS 26) prÃ¼fen.

---

## Das Problem: $10.000 pro Stunde Produktionsstillstand

Jeder Inbetriebnahme-Ingenieur kennt den Schmerz:
1. **Der langsame Zyklus**: Dateien direkt am SmartPAD-K-Bedienpanel bearbeiten oder sich mit trÃ¤gen WorkVisual-Deployments herumÃ¤rgern.
2. **Das versteckte Kollisionsrisiko**: Eine einzige fehlende `$TOOL`- oder `$BASE`-Zuweisung, eine ungeprÃ¼fte Koordinatenverschiebung oder eine versehentliche kartesische `$VEL.CP`-Ãœberschreitung, die beim ersten Automatiktest einen mechanischen Crash verursacht.
3. **Die ungeprÃ¼ften Ã„nderungen**: Kollegen passen Punkte in der Nachtschicht am Panel an â€“ ganz ohne Versionskontrolle.

**KUKA KRL Professional** verwandelt Ihren Editor in ein leistungsstarkes **Industrie-Robotik-Kommandozentrum**. Es fÃ¤ngt Syntaxfehler, kinematische Fehler, fehlende Blockbalancen und Koordinatenabweichungen ab, **BEVOR** der Code jemals die physische Robotersteuerung erreicht.

> **Die ROI-Garantie:** Ein einziger Syntax-Crash oder eine mechanische Kollision, die vor dem Einsatz auf dem Hallenboden abgefangen wird, bezahlt in den ersten 5 Minuten eine lebenslange Pro-Lizenz.

---

## Professionelle SchlÃ¼sselfunktionen

### 1. Interaktives Flussdiagramm & Kontrollflussgraph
*Schluss mit dem manuellen Entwirren verschachtelter Logik.* Verwandle riesige, komplexe `.src`-Programme in saubere, interaktive, anklickbare Kontrollflussdiagramme.
* **Bidirektionales Code-Springen**: Klick auf einen Block â€“ sofortiger Sprung zur exakten Codezeile.
* **Unterprogramm-Drill-Down**: Klick auf Aufrufe (z. B. `PickPart()`, `WeldSeam()`) lÃ¤dt deren Flussdiagramme.
* **Signale & Timer**: Farbcodierte Status-Badges fÃ¼r E/A-Signale, Flags und Timer.
* **Integriertes Sicherheits-Panel**: Die vollstÃ¤ndige Industrie-Sicherheitsanalyse lÃ¤uft fÃ¼r das angezeigte Programm â€“ Bewegungs-, Aktor- und Deadlock-Risiken mit Ein-Klick-Zeilennavigation.
* **SVG-Vektorexport**: HochauflÃ¶sende Vektordiagramme fÃ¼r KundenÃ¼bergaben und Automatisierungsdokumentation.

<p align="center">
  <img src="docs/public/media/control_flow_graph.gif" width="720" alt="Interactive Flowchart Demo" />
</p>

---

### 2. Industrie-Sicherheit & Tiefenlogik-Analysator
*Beseitigen Sie Syntax-Crashes, Deadlocks und Kollisionsrisiken, bevor der Code die Steuerung erreicht.*
* **Strikte Blockbalance**: Markiert verwaiste `IF / ENDIF`-, `FOR / ENDFOR`- und `LOOP / ENDLOOP`-BlÃ¶cke vor der KRC-Kompilierung.
* **Tool/Base-PrÃ¼fung**: Warnt, wenn Bewegungsbefehle (`PTP`, `LIN`, `CIRC`) ohne aktive `$TOOL`- oder `$BASE`-Initialisierung ausgefÃ¼hrt werden.
* **Geschwindigkeitsinspektor**: Warnt, wenn die kartesische Geschwindigkeit `$VEL.CP` sichere Inbetriebnahme-Grenzen Ã¼berschreitet (> 2,0 m/s).
* **Deadlock-Blocker**: Markiert fehlende Timeouts bei `WAIT FOR`-Bedingungen und Endlosschleifen ohne `EXIT`.
* **Kyrillisch- & Nicht-ASCII-Blocker**: Erkennt versehentliche Nicht-ASCII-Zeichen, die Ã¤ltere KSS-Compiler stillschweigend abstÃ¼rzen lassen.

<p align="center">
  <img src="docs/public/media/type-validation-demo.gif" width="720" alt="Safety and Diagnostics Demo" />
</p>

---

### 3. SmartPAD-ZIP-Backup-Diff & Punkt-Delta-Mathematik
*Vergleichen Sie Live-Projektcode mit `.zip`-Archiv-Backups vom SmartPAD.*
* **Delta-Mathematik**: Berechnet exakte 6-Achs-Verschiebungen (**Î”X, Î”Y, Î”Z, Î”A, Î”B, Î”C**) fÃ¼r `E6POS`-, `POS`- und `E6AXIS`-Punkte.
* **Null-Kontakt-Audit**: Erkennt ungeprÃ¼fte Punktkorrekturen vom Hallenboden, bevor sie Kollisionen verursachen.
* **Side-by-Side-Diff**: Farbcodierter grafischer Diff-Viewer direkt in VS Code.

<p align="center">
  <img src="docs/public/media/krc_backup_diff.gif" width="720" alt="SmartPAD Backup Diff Demo" />
</p>

---

### 4. GitLens-starke KRL-Versionskontrolle
*Verfolgen Sie jede KoordinatenÃ¤nderung und Programmmodifikation prÃ¤zise.*
* **Zeilen-Blaming**: Autor, Zeitstempel und Commit-Details in der Statusleiste fÃ¼r jede KRL-Zeile.
* **Commit-Inspektor**: Klick auf das Blame in der Statusleiste zeigt vollstÃ¤ndige Commit-Diffs, Metadaten und Verlauf.
* **Visuelle Dateihistorie (`krl.viewFileHistory`)**: Vergleich des aktuellen Codes mit jedem historischen Git-Commit im Side-by-Side-Diff.

---

### 5. 3-Punkt-Euler-Frame-Mathematik & KUKA Control Center
*Direkter Koordinatensystem-Umrechnungsrechner direkt im Editor.*
* **3-Punkt-Methode**: Berechnet `BASE_DATA`- und `TOOL_DATA`-UrsprÃ¼nge und Euler-Winkel (A, B, C) aus gemessenen Kalibrierpunkten.
* **Direktes `.dat`-EinfÃ¼gen**: Berechnete Koordinatenrahmen mit einem Klick in Datendateien einfÃ¼gen.
* **Null Trigonometriefehler**: Schluss mit Tabellenkalkulationen und manueller Orientierungsmathematik im Werk.

<p align="center">
  <img src="docs/public/media/kuka_control_center.gif" width="720" alt="KUKA Control Center Demo" />
</p>

---

### 6. Signal-Inlay-Hinweise & PLC-Kommentar-Mapping
*Verstehen Sie die E/A-Logik auf einen Blick, ohne elektrische SchaltplÃ¤ne zu wÃ¤lzen.*
* Liest Signaldefinitionen direkt aus `$config.dat` und `kuka_signals.json`.
* Zeigt lesbare Bezeichnungen neben `$IN[x]`, `$OUT[y]`, `$ANIN[z]` und `$FLAG[k]`.

<p align="center">
  <img src="docs/public/media/inlay_hints.gif" width="720" alt="Signal Inlay Hints Demo" />
</p>

---

### 7. Automatischer Code-Formatter & Matrix-Ausrichtung
*Verwandeln Sie handschriftliches Chaos mit einem Tastendruck (`Shift+Alt+F`) in sauberen, standardisierten Industrie-Code.*
* Normgerechte 3-Leerzeichen-EinrÃ¼ckung nach KUKA-Standard.
* Richtet `=`-Zuweisungen in `.dat`-Dateien fÃ¼r lesbare Koordinatenmatrizen aus.
* GroÃŸ-/Kleinschreibungs-Normalisierung fÃ¼r KRL-SchlÃ¼sselwÃ¶rter (`DEF`, `GLOBAL`, `INTERRUPT`, `CONTINUE`).

<p align="center">
  <img src="docs/public/media/code_formatter.gif" width="720" alt="Code Formatter Demo" />
</p>

---

### 8. KRL-Spezifikationsdatenbank & 957+ Systemvariablen
*UnabhÃ¤ngig entwickelte Spezifikationen, die den KRL-Sprachstandards und der offiziellen KSS- und iiQWorks-Dokumentation entsprechen.*
* **957 Systemvariablen**: VollstÃ¤ndige Abdeckung der KSS-8.3â€“8.7/9.0-Systemvariablen (`$ACC`, `$TOOL`, `$BASE`, `$POS_ACT`, `$VEL_AXIS` u. a.) mit physikalischen Einheiten, Array-Grenzen (217 Arrays) und Read-Only-Status.
* **116 eingebaute Systemfunktionen & Wonderlib**: Volle LaufzeitunterstÃ¼tzung fÃ¼r Kinematik (`FORWARD`, `INVERSE`, `INV_POS`, `TOOL_ADJ`), String-Operationen, Typkonvertierung, Meldungsdialoge, Drehmomentgrenzen und Wonderlib-Routinen mit Echtzeit-`signatureHelp`.
* **111 Strukturen & 112 ENUMs (443 Literale)**: Intelligente Punkt-VervollstÃ¤ndigung (`$TOOL.`, `$ACC.`, `POINT.`) und `#`-Enum-AutovervollstÃ¤ndigung (`#AUT`, `#T1`, `#P_FREE`, `#QUIT`).
* **23 standardmÃ¤ÃŸige KRL-Inline-Form-Snippets (34 Vorlagen)**: BewÃ¤hrte KRL-Vorlagen (`ptpi`, `slini`, `sptpi`, `scirc`, `PTPCo`, `ptprel`, `trigdist`, `sigin`, `wsec`, `Forr`) mit vollstÃ¤ndigen Inline-Form-Headern (`;FOLD ... ;%{PE}`).
* **451-SchlÃ¼sselwort-KRL-Matrix**: VollstÃ¤ndige Abdeckung der KRL-Standardsyntaxregeln â€“ null False-Positive-Syntaxwarnungen.
* **Einfache AnfÃ¼hrungszeichen fÃ¼r Hex & BinÃ¤r**: Volle Parser- und DiagnoseunterstÃ¼tzung fÃ¼r `'B000001'` (binÃ¤r), `'HFF'` (hexadezimal) und Zeichenliterale.
* **Zero-False-Positive-Flottenaudit (4,1 Mio.+ Zeilen)**: Verifiziert an 107 realen Produktions-Roboterbackups mit 0 falschen Diagnosen.

<p align="center">
  <img src="docs/public/media/smart_autocomplete.gif" width="720" alt="Smart Autocomplete Demo" />
</p>

---

### 9. Gehe zu Definition & Alle Referenzen finden
*Sofortige AST-Indizierung Ã¼ber den gesamten Projektordner.* Springen Sie von jedem Funktions- oder Variablenaufruf direkt zur Deklaration in getrennten `.src`- und `.dat`-Dateien.

<p align="center">
  <img src="docs/public/media/goto_definition.gif" width="720" alt="Go to Definition Demo" />
</p>

---

### 10. Umfangreiche Hover-Dokumentation & Schreib-/Lesestatus
*Sofortige ParametererklÃ¤rungen und Sicherheitswarnungen.* Bewegen Sie den Mauszeiger Ã¼ber eine KSS-Systemvariable, um physikalische Einheiten, Schreib-/Leseberechtigungen und Beschreibungen aus dem KSS-Handbuch zu sehen.

<p align="center">
  <img src="docs/public/media/hover_info.gif" width="720" alt="Hover Info Demo" />
</p>

---

### 11. Git-Metadaten-Reinigung & Servicemetadaten-Stripper
*Halten Sie die Versionskontrolle sauber.* Entfernen Sie Servicedirektiven (`&ACCESS`, `&REL`, `&PARAM`, `&COMMENT`) mit einem Klick â€“ keine rauschenden Git-Diffs mehr bei automatisierten Commits.

<p align="center">
  <img src="docs/public/media/git_metadata_cleaner.gif" width="720" alt="Git Metadata Cleaner Demo" />
</p>

---

### 12. Modernes KRL & iiQKA-FOLD-Suite
*Heben Sie Ihren Code mit einem Klick auf moderne KUKA-Standards.*
* **Auswahl in iiQKA-FOLD konvertieren (`krl.wrapIiQkaFold`)**: Eigene Logik in standardisierte iiQKA-FaltblÃ¶cke verpacken.
* **In Spline-Block konvertieren (`krl.wrapSplineBlock`)**: Linear- und Kreisbewegungen in leistungsfÃ¤hige `SPLINE`- / `ENDSPLINE`-BlÃ¶cke fÃ¼r KSS 8.3â€“8.7 verpacken.
* **Kollisionsschutz-Injektor (`krl.insertCollisionGuard`)**: Injiziert automatisch `$TORQMON`-DrehmomentÃ¼berwachungsrahmen um kritische Bewegungszonen.
* **FOLDs bereinigen & entfalten (`krl.cleanUnwrapFolds`)**: Veraltete Inline-Forms sicher entfalten, interne Bewegungsbefehle bleiben erhalten.

---

### 13. Live-Support-Gateway & Remote-TeleprÃ¤senz
*Direkter Zwei-Wege-Support-Chat mit den Entwicklern â€“ direkt in VS Code.*
* **Interaktives Chat-Panel**: Sofortige forenbasierte Thread-Synchronisierung mit dem Entwicklungs-Support.
* **Smart Diff & Apply**: Ein-Klick-PrÃ¼fung und automatische Ãœbernahme von Code-Fixes, die der technische Support vorschlÃ¤gt.
* **Remote-TeleprÃ¤senz & Diagnose**: Optionale, abgesicherte Telemetriebefehle (`/ai_diag`, `/logs`, `/sysinfo`, `/ping`) fÃ¼r schnelle Inbetriebnahme-UnterstÃ¼tzung.

---

### 14. Schnell-Fold-Leiste & Deklarationssortierung
*Verwalten Sie riesige Programme mÃ¼helos.* Ein-Klick-Faltung von FOLD-BlÃ¶cken und Unterprogrammen sowie automatische Sortierung von Variablendeklarationen.

<p align="center">
  <img src="docs/public/media/quick_fold_toolbar.gif" width="720" alt="Quick Fold Toolbar Demo" />
</p>

---

### 15. Dead-Code- & Unused-Global-Function-Analyse
*Verhindern Sie Code-AufblÃ¤hung und Ã¼brig gebliebene Testroutinen.* Finden Sie unaufgerufene Unterprogramme, ungenutzte Variablen und unerreichbare Codezweige im gesamten Workspace.

<p align="center">
  <img src="docs/public/media/dead-code-demo.gif" width="720" alt="Dead Code Analysis Demo" />
</p>

---

### 16. Hochkontrast-Syntaxpalette & KSS-Systembibliothek
*Umfangreiche Farbpalette und Systemkontext fÃ¼r professionelle KRL-Entwicklung.*
* **VielfÃ¤ltige Hochkontrast-Palette**: Farbschemata im Industriestil (KRL Dark und Light). Differenzierte Scopes fÃ¼r Bewegungsbefehle (fett), bitweise/logische Operatoren, mathematische Symbole, Systemdirektiven (`&ACCESS`, `&REL`) und Hex-/BinÃ¤rzahlen (`'H...'`, `'B...'`).
* **KSS-8.7-Standard-Systembibliothek**: Eingebaute Definitionen, Parameterhilfe und `F12` (Gehe zu Definition) fÃ¼r `BAS()`, `MsgNotify()`, `MsgQuit()`, `MsgDialog()`, `USE_CM_PRO_VALUES()`, `TOOL_NAME[]` und `BASE_NAME[]` â€“ direkt zu den offiziellen KSS-8.7-Referenzmodulen.
* **1-Klick-KSS-8.7-ProjektgerÃ¼st (`krl.scaffoldKrcFiles`)**: Erzeugt automatisch den Standard-Ordnerbaum `KRC/R1/System/`, `KRC/R1/Program/` und `KRC/R1/TP/` mit `$config.dat`, `bas.src`, `MsgLib.src`, `collmonlib.src` und `sps.sub`.
* **Werksvorgaben & Advance-Run-Limiter**: Sofortige Hover-Anzeige der offiziellen Werkswerte (`operate.defaultvalues`) fÃ¼r `$ADVANCE = 3`, `$VEL.CP = 2,0 m/s`, `$ACC.CP = 2,3 m/sÂ²`, `$JERK.CP = 500,0 m/sÂ³` und automatische Linter-Warnungen, wenn `$ADVANCE` den gÃ¼ltigen Bereich `0..5` Ã¼berschreitet.

---

## Feature-Vergleichsmatrix

| Feature | Community (kostenlos) | Pro Industrial | Nutzen fÃ¼r Ingenieure |
|:---|:---:|:---:|:---|
| **KRL-Syntaxhervorhebung** (`.src`, `.dat`, `.sub`, `.kfd`) | Ja | Ja | VollstÃ¤ndige AST-FÃ¤rbung mit KUKA-KRL-Farbpalette |
| **KRL-Themes (Dark & Light)** | Ja | Ja | Industrielle Farbschemata mit hohem Kontrast |
| **Smarte AutovervollstÃ¤ndigung & System-Spezifikationen** (957+ Variablen, 116 Funktionen, 111 Strukturen) | Ja | Ja | VollstÃ¤ndige KSS-Systemvariablen & Signaturhilfe |
| **KSS-8.7-Standard-Systembibliothek & F12-Definition** | Ja | Ja | Sofortiger F12-Sprung zu `bas.src`, `MsgLib.src`, `$config.dat` |
| **1-Klick-KRC-ProjektgerÃ¼st** | Ja | Ja | Initialisiert die Standard-`KRC/R1/System`-Ordnerstruktur |
| **Werksvorgaben-Hover & $ADVANCE-Limiter** | Ja | Ja | Zeigt Werksvorgaben und warnt bei `$ADVANCE > 5` |
| **23 standardmÃ¤ÃŸige Inline-Form-Snippets** (34 Bewegungs- & Logikvorlagen) | Ja | Ja | VollstÃ¤ndige `;FOLD ... ;%{PE}`-Vorlagen |
| **Signal-Inlay-Hinweise & Hover-Dokumentation** | Ja | Ja | Inline-PLC-Signalbeschriftungen & Parametersignaturen |
| **Code-Formatter & Matrix-Ausrichtung** | Ja | Ja | Sofortige 1-Klick-Bereinigung (`Shift+Alt+F`) |
| **GitLens-Zeilenblame & Verlauf** | Ja | Ja | Sofortige Autor- & Commit-Verfolgung fÃ¼r jeden Punkt |
| **Hexa-Locale-Architektur** (EN, DE, IT, ES, RU, TR) | Ja | Ja | VollstÃ¤ndige native UI, 515 UI-SchlÃ¼ssel & 1.073 Ãœbersetzungen von Systemvariablendokumentation |
| **Git-Metadaten-Reinigung** | Ja | Ja | Entfernt Servicemetadaten-Header (`&ACCESS`, `&REL`) fÃ¼r saubere Git-Diffs |
| **Control Center & 21-Karten-Referenzleitfaden** | Ja | Ja | Echtzeit-Diagnoseschalter & In-Editor-Shortcut-Guide |
| **Voller flacher 36-Befehle-Seitenleistenbaum** | Ja | Ja | Jeder Erweiterungsbefehl mit einem Klick erreichbar |
| **Nativer Projekt-ZIP-Export & Remote-TeleprÃ¤senz** | Ja | Ja | 1-Klick-Vollbackup in den Explorer oder zu Telegram |
| **Copilot-AI-Language-Model-Tools-Integration (`krl_safety_check`)** | â€” | **Pro** | SicherheitsprÃ¼fung direkt von der VS-Code-AI aufrufbar |
| **B2B-Rechnungen & Angebote (`krl.requestCorporateInvoice`)** | Ja | Ja | B2B-Angebotsanforderung mit USt-IdNr. / Reverse Charge direkt im Editor |
| **Grundlegende Syntax- und DiagnoseprÃ¼fung** | Ja (Bonus) | Ja | KRL-Syntaxvalidierung & grundlegende Fehlererkennung |
| **KSS 9.x / iiQWorks 9.+ & KSS 8.3â€“8.7 KompatibilitÃ¤t** | Ja | Ja | Volle UnterstÃ¼tzung fÃ¼r KSS 9.x, iiQWorks sowie KRC2â€“KRC5 |
| **SmartPAD-Backup-QualitÃ¤ts-Abnahmebericht** | â€” | **Pro** | Automatisiertes Projekt-Audit mit Roboterpass und klickbaren Hyperlinks |
| **Modernes KRL & iiQKA-FOLD-Suite** | â€” | **Pro** | iiQKA-FOLDs, Spline-BlÃ¶cke & Kollisionsschutz |
| **Interaktiver Flussdiagramm-Viewer** (Mermaid SVG) | â€” | **Pro** | Visuelle Kontrollflusslogik & 2-Wege-Code-Sprung |
| **Strikte Blockbalance-Diagnose** | â€” | **Pro** | FÃ¤ngt ungeschlossene `IF/LOOP/FOR`-BlÃ¶cke |
| **Geschwindigkeits- & Sicherheitsinspektor** ($VEL.CP) | â€” | **Pro** | Verhindert gefÃ¤hrliche kartesische GeschwindigkeitsÃ¼berschreitungen |
| **Tool-/Base-PrÃ¼fung** | â€” | **Pro** | Markiert Bewegungen vor der Frame-Initialisierung |
| **SmartPAD-ZIP-Backup-Diff & Punkt-Delta** | â€” | **Pro** | Berechnet exakte Koordinatendeltas (Î”X, Î”Y, Î”Z) |
| **3-Punkt-Euler-Frame-Rechner** | â€” | **Pro** | Berechnet `BASE_DATA`/`TOOL_DATA` im Editor |
| **EthernetKRL-(EKI)-XML-Suite** | â€” | **Pro** | Live-XML-Vorlagen-Generator & -Validator |
| **Live-Support-Gateway & Remote-TeleprÃ¤senz** | â€” | **Pro** | Direkter 2-Wege-Helpdesk-Chat, Diff & Apply |
| **Dead-Code- & Scope-Checker** | â€” | **Pro** | Findet ungenutzte Variablen & tote Unterprogramme |
| **Bewegungsdiagramme & Spline-Generator** | â€” | **Pro** | Visualisiert Spline-Kurven fÃ¼r KSS 8.3+ |
| **100 % Offline-Werkszugriff** | Ja | **Pro** | Null Internetbedarf auf dem Hallenboden |

---

## Upgrade auf Pro: Preise & Sofortlizenzierung

Wir bieten flexible Lizenzierung auf Industrieniveau Ã¼ber unseren verifizierten Zahlungsdienstleister **Dodo Payments**. Alle Transaktionen sind verschlÃ¼sselt und unterstÃ¼tzen Kreditkarten, Apple Pay, Google Pay und PayPal in Ã¼ber 135 LÃ¤ndern mit automatischen Mehrwertsteuer-/Steuerrechnungen.

### Tarife:

| Tarif | Preis | Rabatt / Abrechnung | Lizenzbedingungen | Checkout |
|:---|:---:|:---|:---|:---:|
| **Community** | **$0** | 100 % fÃ¼r immer kostenlos | Private & kommerzielle Nutzung | [Kostenlos installieren](https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension) |
| **Pro Monatlich** | **$19.99** / Monat | Monatliche Abrechnung | Alle Pro-Werkzeuge â€¢ 1 PC â€¢ KRC2â€“KRC5-Support | [Pro Monthly sichern](https://checkout.dodopayments.com/buy/pdt_0NmAUzwdbzeERSktsOLTp) |
| **Pro JÃ¤hrlich** | **$149.00** / Jahr | **35 % sparen** (~$6.58/Monat) | Alle Pro-Werkzeuge â€¢ 1 PC â€¢ 30-Tage-Offline-Puffer â€¢ KRC2â€“KRC5 | [Pro jÃ¤hrlich sichern](https://checkout.dodopayments.com/buy/pdt_0NmAV012KFHSjUMyDomJ6) |
| **Pro Lifetime** | **$699.00** | **Einmal zahlen, fÃ¼r immer besitzen** | Alle Pro-Werkzeuge â€¢ 1 PC (1 Arbeitsplatz) â€¢ Lifetime-Updates | [Lifetime Pro sichern](https://checkout.dodopayments.com/buy/pdt_0NmAcoqVCfuwQ6Xx7qyqr) |
| 🏢 **Team Edition** | **$499.90** / Jahr | B2B — 5 Arbeitsplätze | Alle Pro-Werkzeuge & Sicherheitsanalysatoren • 5 Arbeitsplatz-Aktivierungen • KRC2–KRC5 | [Team Edition sichern](https://checkout.dodopayments.com/buy/pdt_0NnLCdgD69GiXDLRJ0K5v) |
| 🏛️ **Department / Integrator** | **$999.00** / Jahr | B2B — Bis zu 20 Arbeitsplätze | Für Systemintegratoren und Automatisierungsabteilungen (bis 20 PCs) • Volle AST-Diagnose | [Department sichern](https://checkout.dodopayments.com/buy/pdt_0Nq5QVTrbkJbWAUf8qoyn) |
| 🏭 **Enterprise Site** | **$4,999.00** / Jahr | B2B — Bis zu 100 Arbeitsplätze | Alle Pro-Werkzeuge & Sicherheitsanalysatoren • 100 Werks-Arbeitsplätze • Gebrandete Berichte | [Enterprise sichern](https://checkout.dodopayments.com/buy/pdt_0NnLCdkLwd0dECkpSE1JP) |

<div align="center" style="margin: 25px 0;">
  <a href="https://checkout.dodopayments.com/buy/pdt_0NmAV012KFHSjUMyDomJ6" style="text-decoration:none;">
    <kbd style="font-size: 1.25em; padding: 14px 32px; background-color: #FF6600; color: white; border-radius: 10px; font-weight: bold; border: 1px solid #d15500; cursor: pointer; box-shadow: 0 4px 18px rgba(255,102,0,0.4);">
      Tarif wÃ¤hlen & abonnieren (Dodo Checkout)
    </kbd>
  </a>
  <p style="margin-top: 10px; font-size: 0.9em; color: #888;">Sofortige 1-Klick-Aktivierung in VS Code â€¢ 14-Tage-Grace-Period-Schutz â€¢ 30-Tage-Offline-Puffer</p>
</div>

---

## 14-Tage-Grace-Period & Offline-First-Garantie

Inbetriebnahme-Ingenieure arbeiten in stÃ¶rungsreichen Werken, ReinrÃ¤umen und Automobilzellen mit **null Netzwerkverbindung**.

* **30-Tage-Offline-Puffer**: Einmal aktivieren und bis zu 30 Tage komplett offline im Werk arbeiten â€“ ohne Netzwerk-Handshakes.
* **14-Tage-Grace-Period**: SchlÃ¤gt eine internationale Zahlungsmethode oder KartenverlÃ¤ngerung vor Ort vorÃ¼bergehend fehl, sperren Pro-Funktionen **Sie mitten in der Inbetriebnahme niemals aus**. Die Erweiterung bietet ein 14-tÃ¤giges Grace-Fenster mit intelligenten automatischen Hintergrund-Wiederholungen.

---

## Enterprise-Sicherheitszertifizierung

KUKA KRL Professional ist von **ReversingLabs Spectra Assure** mit einem **100 % Security Health Score** zertifiziert:
* **0 Malware** (saubere BinÃ¤rprÃ¼fung)
* **0 CVE-Schwachstellen** in allen AbhÃ¤ngigkeiten
* **0 Secret-/Token-Leaks**
* **0 MITRE-ATT&CK-Indikatoren**

Offizielles Sicherheitsaudit: [https://secure.software/vscode/packages/liskinlabs/kuka-krl-extension](https://secure.software/vscode/packages/liskinlabs/kuka-krl-extension)

---

## TastenkÃ¼rzel

| KÃ¼rzel | Aktion | Bereich |
|:---|:---|:---|
| `Shift + Alt + F` | Dokument formatieren (KRL-3-Leerzeichen-EinrÃ¼ckung & Matrixausrichtung) | Aktiver Editor |
| `Ctrl + Alt + F` | Interaktives Flussdiagramm Ã¶ffnen | `.src`-Datei |
| `Ctrl + Alt + D` | Industrie-Sicherheits- & DiagnoseprÃ¼fung ausfÃ¼hren | Workspace |
| `Ctrl + Alt + B` | SmartPAD-Backup-Diff & Punkt-Delta-Inspektor Ã¶ffnen | Aktives Projekt |
| `Ctrl + Alt + K` | KUKA Control Center & 3-Punkt-Frame-Mathematik starten | Aktiver Editor |
| `Ctrl + Space` | Smarte KSS-AutovervollstÃ¤ndigung auslÃ¶sen | Cursorposition |

---

## Konfigurationseinstellungen

Konfigurieren Sie das Verhalten der Erweiterung in Ihrer `settings.json`:

| Einstellung | Standard | Beschreibung |
|:---|:---:|:---|
| `krl.indentWidth` | `3` | EinrÃ¼ckungsgrÃ¶ÃŸe (3 Leerzeichen sind der offizielle KUKA-Standard). |
| `krl.alignAssignments` | `true` | `=`-Symbole in `.dat`-Dateien fÃ¼r saubere Matrizen automatisch ausrichten. |
| `krl.errorLens.enabled` | `true` | Diagnosefehler inline am Zeilenende anzeigen. |
| `krl.validateNonAscii` | `true` | Nach Kyrillisch-/Nicht-ASCII-Zeichen suchen, die Ã¤ltere KSS-Compiler brechen. |
| `krl.inlayHints.enabled` | `true` | Beschreibende Namen fÃ¼r E/A-Signale inline anzeigen. |

---

## Dokumentation & Wiki

* **Englische Dokumentation**: [https://liskinlabs.github.io/kuka-krl-extension/](https://liskinlabs.github.io/kuka-krl-extension/)
* **Ğ ÑƒÑÑĞºĞ°Ñ Ğ´Ğ¾ĞºÑƒĞ¼ĞµĞ½Ñ‚Ğ°Ñ†Ğ¸Ñ Ğ¸ Ğ’Ğ¸ĞºĞ¸**: [https://liskinlabs.github.io/kuka-krl-extension/ru/](https://liskinlabs.github.io/kuka-krl-extension/ru/)
* **TÃ¼rkÃ§e DokÃ¼mantasyon ve Wiki**: [https://liskinlabs.github.io/kuka-krl-extension/tr/](https://liskinlabs.github.io/kuka-krl-extension/tr/)

---

## Lizenz & Credits

* **Publisher & Entwickler**: [Liskin Labs](https://github.com/LiskinLabs) / [Silvestr Liskin](https://www.linkedin.com/in/silvestr-liskin-ab712920b/)
* **Sicherheitsauditor**: [ReversingLabs Spectra Assure](https://secure.software/vscode/packages/liskinlabs/kuka-krl-extension)
* **Offizieller Zahlungsdienstleister**: [Dodo Payments](https://dodopayments.com/)
* **Lizenz**: Kommerzielle EULA ([LICENSE](LICENSE))

---

## Rechtlicher Hinweis, Marken & SicherheitskonformitÃ¤t

### Industrielle Sicherheit & NormenkonformitÃ¤t (ISO 10218-1/-2 & ISO 13849-1)
**KUKA KRL Professional** ist ein unabhÃ¤ngiges Engineering-, statisches Analyse- und Backup-Vergleichswerkzeug von **Liskin Labs**. Es ist **KEINE sicherheitszertifizierte Software (Non-SIL / Non-PL)** und ersetzt **keine** vorgeschriebenen physischen InbetriebnahmeprÃ¼fungen, Override-Reduzierungen (`$OV_PRO <= 30%` im Handbetrieb T1 auf dem physischen KUKA SmartPAD) oder formelle Risikobeurteilungen nach **ISO 10218-1/-2** und **ISO 13849-1**. Vor der automatischen Produktion sind manuelle TestlÃ¤ufe im T1-Modus durchzufÃ¼hren.

### Marken & Haftungsausschluss
* **KUKAÂ®, KRLÂ®, KRCÂ®, WorkVisualÂ®, iiQWorksÂ® und SmartPADÂ®** sind eingetragene Marken der **KUKA AG** / **KUKA Deutschland GmbH**.
* **Visual Studio CodeÂ® und VS CodeÂ®** sind eingetragene Marken der **Microsoft Corporation**.
* Diese Software-Erweiterung ist eine unabhÃ¤ngige Entwicklung von **Liskin Labs** und steht in **keiner** Verbindung zu KUKA AG oder Microsoft Corporation, wird von diesen weder gesponsert noch unterstÃ¼tzt oder zertifiziert. Alle genannten Produktnamen und Marken sind Eigentum der jeweiligen Inhaber und dienen ausschlieÃŸlich der KompatibilitÃ¤tsbeschreibung (nominative fair use).
