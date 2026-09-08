<h1 align="center">KUKA KRL Professional</h1>

<p align="center">
  <b>Die definitive Industrie-IDE und Sicherheitssuite für die KUKA Robotersprache.</b><br />
  Entwickelt für KRC2-, KRC4- und KRC5-Steuerungen (KSS 8.2 – 8.7). Gebaut für Tempo, Sicherheit und Null Ausfallzeit.
</p>

<details>
<summary>🌐 Language / Язык / Dil / Sprache / Lingua / Idioma</summary>

| Language | File |
|---|---|
| 🇬🇧 English | [README.md](README.md) |
| 🇷🇺 Русский | [README.ru.md](README.ru.md) |
| 🇹🇷 Türkçe | [README.tr.md](README.tr.md) |
| 🇩🇪 Deutsch | [README.de.md](README.de.md) |
| 🇮🇹 Italiano | [README.it.md](README.it.md) |
| 🇪🇸 Español | [README.es.md](README.es.md) |

</details>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension"><img src="https://badgen.net/vs-marketplace/v/LiskinLabs.kuka-krl-extension?style=flat&label=VS%20Code%20Marketplace&color=FF6600" alt="VS Code Marketplace" /></a>
  <a href="https://open-vsx.org/extension/LiskinLabs/kuka-krl-extension"><img src="https://img.shields.io/open-vsx/v/LiskinLabs/kuka-krl-extension?style=flat-square&logo=eclipseche&logoColor=white&color=007ACC&label=Open%20VSX" alt="Open VSX" /></a>
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/releases"><img src="https://img.shields.io/badge/Release-v1.8.3-FF6600?style=flat-square&logo=visualstudiocode&logoColor=white" alt="Release v1.8.3" /></a>
  <a href="https://secure.software/vscode/packages/liskinlabs/kuka-krl-extension"><img src="https://img.shields.io/badge/Spectra%20Assure-PASSED%20(100%25)-10b981?style=flat-square&logo=shield&logoColor=white" alt="ReversingLabs Security Score" /></a>
  <a href="https://liskinlabs.github.io/kuka-krl-extension/"><img src="https://img.shields.io/badge/Fleet%20Verified-4.1M%2B%20LoC-10b981?style=flat-square" alt="Fleet Verified" /></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Language-KRL-orange?style=flat-square" />
  <img src="https://img.shields.io/badge/Controllers-KRC2%20%7C%20KRC4%20%7C%20KRC5-007ACC?style=flat-square" />
  <img src="https://img.shields.io/badge/Kernel-KUKA.Sim%204.10%20Inside-FF6600?style=flat-square" />
  <img src="https://img.shields.io/badge/Built--in%20Specs-957%20Vars%20%7C%20116%20Functions-10b981?style=flat-square" />
  <img src="https://img.shields.io/badge/Offline--First-100%25%20Factory%20Ready-green?style=flat-square" />
  <img src="https://img.shields.io/badge/Security-0%20Malware%20%7C%200%20CVEs-emerald?style=flat-square" />
  <img src="https://img.shields.io/badge/Localization-EN%20%7C%20DE%20%7C%20IT%20%7C%20ES%20%7C%20RU%20%7C%20TR-blue?style=flat-square" />
</p>

<p align="center">
  <a href="https://liskinlabs.github.io/kuka-krl-extension/"><b>🌐 Interaktives Wiki (50 Industrie-Werkzeuge)</b></a> •
  <a href="https://checkout.dodopayments.com/buy/pdc_0NmAaL3aw5WKbMZgAVCDZ"><b>⚡ 14 Tage kostenlos testen ($9.99/Monat)</b></a> • 
  <a href="https://checkout.dodopayments.com/buy/pdc_0NmAaL3aw5WKbMZgAVCDZ"><b>👑 Pro jährlich ($79.00/Jahr – 35% sparen)</b></a> • 
  <a href="https://secure.software/vscode/packages/liskinlabs/kuka-krl-extension"><b>🛡️ Sicherheitsaudit-Bericht</b></a>
</p>

---

> [!IMPORTANT]
> ### ⚠️ Hinweis zur Inbetriebnahme
> Vor der Übergabe an den Kunden und der industriellen Inbetriebnahme wird dringend empfohlen, geänderte Dateien auf eine virtuelle KUKA.OfficeLite-Steuerung oder einen physischen KRC-Schrank zu laden und sicherzustellen, dass der eingebettete KSS-Compiler einen grünen Modulstatus (das «R»-Symbol auf dem SmartPAD) und keine Syntax- oder Kinematikfehler meldet.

---

## ⚡ Das Problem: $10.000 pro Stunde Produktionsstillstand

Jeder Inbetriebnahme-Ingenieur kennt den Schmerz:
1. **Der langsame Zyklus**: Dateien direkt am SmartPAD-K-Bedienpanel bearbeiten oder sich mit trägen WorkVisual-Deployments herumärgern.
2. **Das versteckte Kollisionsrisiko**: Eine einzige fehlende `$TOOL`- oder `$BASE`-Zuweisung, eine ungeprüfte Koordinatenverschiebung oder eine versehentliche kartesische `$VEL.CP`-Überschreitung, die beim ersten Automatiktest einen mechanischen Crash verursacht.
3. **Die ungeprüften Änderungen**: Kollegen passen Punkte in der Nachtschicht am Panel an – ganz ohne Versionskontrolle.

**KUKA KRL Professional** verwandelt Ihren Editor in ein leistungsstarkes **Industrie-Robotik-Kommandozentrum**. Es fängt Syntaxfehler, kinematische Fehler, fehlende Blockbalancen und Koordinatenabweichungen ab, **BEVOR** der Code jemals die physische Robotersteuerung erreicht.

> **💡 Die ROI-Garantie:** Ein einziger Syntax-Crash oder eine mechanische Kollision, die vor dem Einsatz auf dem Hallenboden abgefangen wird, bezahlt in den ersten 5 Minuten eine lebenslange Pro-Lizenz.

---

## 🚀 Professionelle Schlüsselfunktionen

### 1. 🗺️ Interaktives Flussdiagramm & Kontrollflussgraph
*Schluss mit dem manuellen Entwirren verschachtelter Logik.* Verwandle riesige, komplexe `.src`-Programme in saubere, interaktive, anklickbare Kontrollflussdiagramme.
* **Bidirektionales Code-Springen**: Klick auf einen Block – sofortiger Sprung zur exakten Codezeile.
* **Unterprogramm-Drill-Down**: Klick auf Aufrufe (z. B. `PickPart()`, `WeldSeam()`) lädt deren Flussdiagramme.
* **Signale & Timer**: Farbcodierte Status-Badges für E/A-Signale, Flags und Timer.
* **Integriertes Sicherheits-Panel**: Die vollständige Industrie-Sicherheitsanalyse läuft für das angezeigte Programm – Bewegungs-, Aktor- und Deadlock-Risiken mit Ein-Klick-Zeilennavigation.
* **SVG-Vektorexport**: Hochauflösende Vektordiagramme für Kundenübergaben und Automatisierungsdokumentation.

<p align="center">
  <img src="docs/public/media/control_flow_graph.gif" width="720" alt="Interactive Flowchart Demo" />
</p>

---

### 2. 🛡️ Industrie-Sicherheit & Tiefenlogik-Analysator
*Beseitigen Sie Syntax-Crashes, Deadlocks und Kollisionsrisiken, bevor der Code die Steuerung erreicht.*
* **Strikte Blockbalance**: Markiert verwaiste `IF / ENDIF`-, `FOR / ENDFOR`- und `LOOP / ENDLOOP`-Blöcke vor der KRC-Kompilierung.
* **Tool/Base-Prüfung**: Warnt, wenn Bewegungsbefehle (`PTP`, `LIN`, `CIRC`) ohne aktive `$TOOL`- oder `$BASE`-Initialisierung ausgeführt werden.
* **Geschwindigkeitsinspektor**: Warnt, wenn die kartesische Geschwindigkeit `$VEL.CP` sichere Inbetriebnahme-Grenzen überschreitet (> 2,0 m/s).
* **Deadlock-Blocker**: Markiert fehlende Timeouts bei `WAIT FOR`-Bedingungen und Endlosschleifen ohne `EXIT`.
* **Kyrillisch- & Nicht-ASCII-Blocker**: Erkennt versehentliche Nicht-ASCII-Zeichen, die ältere KSS-Compiler stillschweigend abstürzen lassen.

<p align="center">
  <img src="docs/public/media/type-validation-demo.gif" width="720" alt="Safety and Diagnostics Demo" />
</p>

---

### 3. 📦 SmartPAD-ZIP-Backup-Diff & Punkt-Delta-Mathematik
*Vergleichen Sie Live-Projektcode mit `.zip`-Archiv-Backups vom SmartPAD.*
* **Delta-Mathematik**: Berechnet exakte 6-Achs-Verschiebungen (**ΔX, ΔY, ΔZ, ΔA, ΔB, ΔC**) für `E6POS`-, `POS`- und `E6AXIS`-Punkte.
* **Null-Kontakt-Audit**: Erkennt ungeprüfte Punktkorrekturen vom Hallenboden, bevor sie Kollisionen verursachen.
* **Side-by-Side-Diff**: Farbcodierter grafischer Diff-Viewer direkt in VS Code.

<p align="center">
  <img src="docs/public/media/krc_backup_diff.gif" width="720" alt="SmartPAD Backup Diff Demo" />
</p>

---

### 4. 🔀 GitLens-starke KRL-Versionskontrolle
*Verfolgen Sie jede Koordinatenänderung und Programmmodifikation präzise.*
* **Zeilen-Blaming**: Autor, Zeitstempel und Commit-Details in der Statusleiste für jede KRL-Zeile.
* **Commit-Inspektor**: Klick auf das Blame in der Statusleiste zeigt vollständige Commit-Diffs, Metadaten und Verlauf.
* **Visuelle Dateihistorie (`krl.viewFileHistory`)**: Vergleich des aktuellen Codes mit jedem historischen Git-Commit im Side-by-Side-Diff.

---

### 5. 📐 3-Punkt-Euler-Frame-Mathematik & KUKA Control Center
*Direkter Koordinatensystem-Umrechnungsrechner direkt im Editor.*
* **3-Punkt-Methode**: Berechnet `BASE_DATA`- und `TOOL_DATA`-Ursprünge und Euler-Winkel (A, B, C) aus gemessenen Kalibrierpunkten.
* **Direktes `.dat`-Einfügen**: Berechnete Koordinatenrahmen mit einem Klick in Datendateien einfügen.
* **Null Trigonometriefehler**: Schluss mit Tabellenkalkulationen und manueller Orientierungsmathematik im Werk.

<p align="center">
  <img src="docs/public/media/kuka_control_center.gif" width="720" alt="KUKA Control Center Demo" />
</p>

---

### 6. 🔍 Signal-Inlay-Hinweise & PLC-Kommentar-Mapping
*Verstehen Sie die E/A-Logik auf einen Blick, ohne elektrische Schaltpläne zu wälzen.*
* Liest Signaldefinitionen direkt aus `$config.dat` und `kuka_signals.json`.
* Zeigt lesbare Bezeichnungen neben `$IN[x]`, `$OUT[y]`, `$ANIN[z]` und `$FLAG[k]`.

<p align="center">
  <img src="docs/public/media/inlay_hints.gif" width="720" alt="Signal Inlay Hints Demo" />
</p>

---

### 7. ⚡ Automatischer Code-Formatter & Matrix-Ausrichtung
*Verwandeln Sie handschriftliches Chaos mit einem Tastendruck (`Shift+Alt+F`) in sauberen, standardisierten Industrie-Code.*
* Normgerechte 3-Leerzeichen-Einrückung nach KUKA-Standard.
* Richtet `=`-Zuweisungen in `.dat`-Dateien für lesbare Koordinatenmatrizen aus.
* Groß-/Kleinschreibungs-Normalisierung für KRL-Schlüsselwörter (`DEF`, `GLOBAL`, `INTERRUPT`, `CONTINUE`).

<p align="center">
  <img src="docs/public/media/code_formatter.gif" width="720" alt="Code Formatter Demo" />
</p>

---

### 8. 🏭 Offizieller KUKA.Sim-4.10-Kernel & 957+ Systemvariablen
*Authentische Industriespezifikationen, direkt aus KUKA.Sim 4.10, WorkVisual und der KRC-Steuerungslaufzeit extrahiert.*
* **957 Systemvariablen**: Vollständige Abdeckung der KSS-8.3–8.7/9.0-Systemvariablen (`$ACC`, `$TOOL`, `$BASE`, `$POS_ACT`, `$VEL_AXIS` u. a.) mit physikalischen Einheiten, Array-Grenzen (217 Arrays) und Read-Only-Status.
* **116 eingebaute Systemfunktionen & Wonderlib**: Volle Laufzeitunterstützung für Kinematik (`FORWARD`, `INVERSE`, `INV_POS`, `TOOL_ADJ`), String-Operationen, Typkonvertierung, Meldungsdialoge, Drehmomentgrenzen und Wonderlib-Routinen mit Echtzeit-`signatureHelp`.
* **111 Strukturen & 112 ENUMs (443 Literale)**: Intelligente Punkt-Vervollständigung (`$TOOL.`, `$ACC.`, `POINT.`) und `#`-Enum-Autovervollständigung (`#AUT`, `#T1`, `#P_FREE`, `#QUIT`).
* **23 offizielle KUKA-Inline-Form-Snippets (34 Vorlagen)**: Authentische Kuka-Roboter-GmbH-Vorlagen (`ptpi`, `slini`, `sptpi`, `scirc`, `PTPCo`, `ptprel`, `trigdist`, `sigin`, `wsec`, `Forr`) mit vollständigen Inline-Form-Headern (`;FOLD ... ;%{PE}`).
* **451-Schlüsselwort-Compiler-Matrix**: Direkte Integration der KUKA-C++-`keyword.h`-Regeln – null False-Positive-Syntaxwarnungen.
* **Einfache Anführungszeichen für Hex & Binär**: Volle Parser- und Diagnoseunterstützung für `'B000001'` (binär), `'HFF'` (hexadezimal) und Zeichenliterale.
* **Zero-False-Positive-Flottenaudit (4,1 Mio.+ Zeilen)**: Verifiziert an 107 realen Produktions-Roboterbackups mit 0 falschen Diagnosen.

<p align="center">
  <img src="docs/public/media/smart_autocomplete.gif" width="720" alt="Smart Autocomplete Demo" />
</p>

---

### 9. 🔎 Gehe zu Definition & Alle Referenzen finden
*Sofortige AST-Indizierung über den gesamten Projektordner.* Springen Sie von jedem Funktions- oder Variablenaufruf direkt zur Deklaration in getrennten `.src`- und `.dat`-Dateien.

<p align="center">
  <img src="docs/public/media/goto_definition.gif" width="720" alt="Go to Definition Demo" />
</p>

---

### 10. ℹ️ Umfangreiche Hover-Dokumentation & Schreib-/Lesestatus
*Sofortige Parametererklärungen und Sicherheitswarnungen.* Bewegen Sie den Mauszeiger über eine KSS-Systemvariable, um physikalische Einheiten, Schreib-/Leseberechtigungen und Beschreibungen aus dem KSS-Handbuch zu sehen.

<p align="center">
  <img src="docs/public/media/hover_info.gif" width="720" alt="Hover Info Demo" />
</p>

---

### 11. 🧹 Git-Metadaten-Reinigung & WorkVisual-Header-Stripper
*Halten Sie die Versionskontrolle sauber.* Entfernen Sie WorkVisual-Header (`&ACCESS`, `&REL`, `&PARAM`, `&COMMENT`) mit einem Klick – keine rauschenden Git-Diffs mehr bei automatisierten Commits.

<p align="center">
  <img src="docs/public/media/git_metadata_cleaner.gif" width="720" alt="Git Metadata Cleaner Demo" />
</p>

---

### 12. ⚙️ Modernes KRL & iiQKA-FOLD-Suite
*Heben Sie Ihren Code mit einem Klick auf moderne KUKA-Standards.*
* **Auswahl in iiQKA-FOLD konvertieren (`krl.wrapIiQkaFold`)**: Eigene Logik in standardisierte iiQKA-Faltblöcke verpacken.
* **In Spline-Block konvertieren (`krl.wrapSplineBlock`)**: Linear- und Kreisbewegungen in leistungsfähige `SPLINE`- / `ENDSPLINE`-Blöcke für KSS 8.3–8.7 verpacken.
* **Kollisionsschutz-Injektor (`krl.insertCollisionGuard`)**: Injiziert automatisch `$TORQMON`-Drehmomentüberwachungsrahmen um kritische Bewegungszonen.
* **FOLDs bereinigen & entfalten (`krl.cleanUnwrapFolds`)**: Veraltete Inline-Forms sicher entfalten, interne Bewegungsbefehle bleiben erhalten.

---

### 13. 💬 Live-Support-Gateway & Remote-Telepräsenz
*Direkter Zwei-Wege-Support-Chat mit den Entwicklern – direkt in VS Code.*
* **Interaktives Chat-Panel**: Sofortige forenbasierte Thread-Synchronisierung mit dem Entwicklungs-Support.
* **Smart Diff & Apply**: Ein-Klick-Prüfung und automatische Übernahme von Code-Fixes, die der technische Support vorschlägt.
* **Remote-Telepräsenz & Diagnose**: Optionale, abgesicherte Telemetriebefehle (`/ai_diag`, `/logs`, `/sysinfo`, `/ping`) für schnelle Inbetriebnahme-Unterstützung.

---

### 14. 🗂️ Schnell-Fold-Leiste & Deklarationssortierung
*Verwalten Sie riesige Programme mühelos.* Ein-Klick-Faltung von FOLD-Blöcken und Unterprogrammen sowie automatische Sortierung von Variablendeklarationen.

<p align="center">
  <img src="docs/public/media/quick_fold_toolbar.gif" width="720" alt="Quick Fold Toolbar Demo" />
</p>

---

### 15. 💀 Dead-Code- & Unused-Global-Function-Analyse
*Verhindern Sie Code-Aufblähung und übrig gebliebene Testroutinen.* Finden Sie unaufgerufene Unterprogramme, ungenutzte Variablen und unerreichbare Codezweige im gesamten Workspace.

<p align="center">
  <img src="docs/public/media/dead-code-demo.gif" width="720" alt="Dead Code Analysis Demo" />
</p>

---

### 16. 🎨 Authentische KUKA.Sim- & WorkVisual-Syntaxpalette & KSS-8.7-Systembibliothek
*Umfangreiche Farbpalette und Systemkontext, direkt aus KUKA.Sim 4.10 extrahiert.*
* **Vielfältige Hochkontrast-Palette**: 100 % authentische Farbschemata aus KUKA.Sim (`KRLDark.xshd`) und WorkVisual (`KRL.xshd`). Differenzierte Scopes für Bewegungsbefehle (fett), bitweise/logische Operatoren, mathematische Symbole, Systemdirektiven (`&ACCESS`, `&REL`) und Hex-/Binärzahlen (`'H...'`, `'B...'`).
* **KSS-8.7-Standard-Systembibliothek**: Eingebaute Definitionen, Parameterhilfe und `F12` (Gehe zu Definition) für `BAS()`, `MsgNotify()`, `MsgQuit()`, `MsgDialog()`, `USE_CM_PRO_VALUES()`, `TOOL_NAME[]` und `BASE_NAME[]` – direkt zu den offiziellen KSS-8.7-Referenzmodulen.
* **1-Klick-KSS-8.7-Projektgerüst (`krl.scaffoldKrcFiles`)**: Erzeugt automatisch den Standard-Ordnerbaum `KRC/R1/System/`, `KRC/R1/Program/` und `KRC/R1/TP/` mit `$config.dat`, `bas.src`, `MsgLib.src`, `collmonlib.src` und `sps.sub`.
* **Werksvorgaben & Advance-Run-Limiter**: Sofortige Hover-Anzeige der offiziellen Werkswerte (`operate.defaultvalues`) für `$ADVANCE = 3`, `$VEL.CP = 2,0 m/s`, `$ACC.CP = 2,3 m/s²`, `$JERK.CP = 500,0 m/s³` und automatische Linter-Warnungen, wenn `$ADVANCE` den gültigen Bereich `0..5` überschreitet.

---

## 📊 Feature-Vergleichsmatrix (50 Industrie-Werkzeuge)

| Feature | Community (kostenlos) | Pro Industrial | Nutzen für Ingenieure |
|:---|:---:|:---:|:---|
| **KRL-Syntaxhervorhebung** (`.src`, `.dat`, `.sub`, `.kfd`) | ✅ | ✅ | Vollständige AST-Färbung mit der vielfältigen KUKA.Sim-Palette |
| **KUKA.Sim-4.10- & WorkVisual-Themes** | ✅ | ✅ | Authentische AvalonEdit-Farbschemata (Dunkel & Hell) |
| **Smarte Autovervollständigung & Kernel-Spezifikationen** (957+ Variablen, 116 Funktionen, 111 Strukturen) | ✅ | ✅ | Offizieller KUKA.Sim-4.10-Kernel mit Signaturhilfe |
| **KSS-8.7-Standard-Systembibliothek & F12-Definition** | ✅ | ✅ | Sofortiger F12-Sprung zu `bas.src`, `MsgLib.src`, `$config.dat` |
| **1-Klick-KRC-Projektgerüst** | ✅ | ✅ | Initialisiert die Standard-`KRC/R1/System`-Ordnerstruktur |
| **Werksvorgaben-Hover & $ADVANCE-Limiter** | ✅ | ✅ | Zeigt Werksvorgaben und warnt bei `$ADVANCE > 5` |
| **23 offizielle Inline-Form-Snippets** (34 Bewegungs- & Logikvorlagen) | ✅ | ✅ | Vollständige `;FOLD ... ;%{PE}`-Vorlagen von KUKA Roboter GmbH |
| **Signal-Inlay-Hinweise & Hover-Dokumentation** | ✅ | ✅ | Inline-PLC-Signalbeschriftungen & Parametersignaturen |
| **Code-Formatter & Matrix-Ausrichtung** | ✅ | ✅ | Sofortige 1-Klick-Bereinigung (`Shift+Alt+F`) |
| **GitLens-Zeilenblame & Verlauf** | ✅ | ✅ | Sofortige Autor- & Commit-Verfolgung für jeden Punkt |
| **Hexa-Locale-Architektur** (EN, DE, IT, ES, RU, TR) | ✅ | ✅ | Vollständige native UI, 515 UI-Schlüssel & 1.073 Übersetzungen von Systemvariablendokumentation |
| **Git-Metadaten-Reinigung** | ✅ | ✅ | Entfernt WorkVisual-Header für saubere Git-Diffs |
| **Control Center & 21-Karten-Referenzleitfaden** | ✅ | ✅ | Echtzeit-Diagnoseschalter & In-Editor-Shortcut-Guide |
| **Voller flacher 36-Befehle-Seitenleistenbaum** | ✅ | ✅ | Jeder Erweiterungsbefehl mit einem Klick erreichbar |
| **Nativer Projekt-ZIP-Export & Remote-Telepräsenz** | ✅ | ✅ | 1-Klick-Vollbackup in den Explorer oder zu Telegram |
| **Copilot-AI-Language-Model-Tools-Integration** | ✅ | ✅ | `krl_safety_check` direkt von der VS-Code-AI aufrufbar |
| **SmartPAD-Backup-Qualitäts-Abnahmebericht** | ❌ | **✅ Pro** | Automatisiertes Projekt-Audit mit Roboterpass und klickbaren Hyperlinks |
| **Modernes KRL & iiQKA-FOLD-Suite** | ❌ | **✅ Pro** | iiQKA-FOLDs, Spline-Blöcke & Kollisionsschutz |
| **Interaktiver Flussdiagramm-Viewer** (Mermaid SVG) | ❌ | **✅ Pro** | Visuelle Kontrollflusslogik & 2-Wege-Code-Sprung |
| **Strikte Blockbalance-Diagnose** | ❌ | **✅ Pro** | Fängt ungeschlossene `IF/LOOP/FOR`-Blöcke |
| **Geschwindigkeits- & Sicherheitsinspektor** ($VEL.CP) | ❌ | **✅ Pro** | Verhindert gefährliche kartesische Geschwindigkeitsüberschreitungen |
| **Tool-/Base-Prüfung** | ❌ | **✅ Pro** | Markiert Bewegungen vor der Frame-Initialisierung |
| **SmartPAD-ZIP-Backup-Diff & Punkt-Delta** | ❌ | **✅ Pro** | Berechnet exakte Koordinatendeltas (ΔX, ΔY, ΔZ) |
| **3-Punkt-Euler-Frame-Rechner** | ❌ | **✅ Pro** | Berechnet `BASE_DATA`/`TOOL_DATA` im Editor |
| **EthernetKRL-(EKI)-XML-Suite** | ❌ | **✅ Pro** | Live-XML-Vorlagen-Generator & -Validator |
| **Live-Support-Gateway & Remote-Telepräsenz** | ❌ | **✅ Pro** | Direkter 2-Wege-Helpdesk-Chat, Diff & Apply |
| **Dead-Code- & Scope-Checker** | ❌ | **✅ Pro** | Findet ungenutzte Variablen & tote Unterprogramme |
| **Bewegungsdiagramme & Spline-Generator** | ❌ | **✅ Pro** | Visualisiert Spline-Kurven für KSS 8.3+ |
| **100 % Offline-Werkszugriff** | ✅ | **✅ Pro** | Null Internetbedarf auf dem Hallenboden |

---

## 👑 Upgrade auf Pro: Preise & Sofortlizenzierung

Wir bieten flexible Lizenzierung auf Industrieniveau über unseren verifizierten Zahlungsdienstleister **Dodo Payments**. Alle Transaktionen sind verschlüsselt und unterstützen Kreditkarten, Apple Pay, Google Pay und PayPal in über 135 Ländern mit automatischen Mehrwertsteuer-/Steuerrechnungen.

### 💳 Tarife:

| Tarif | Preis | Testzeitraum / Rabatt | Lizenzbedingungen | Checkout |
|:---|:---:|:---|:---|:---:|
| 🟢 **Community** | **$0** | 100 % für immer kostenlos | Private & kommerzielle Nutzung | [Kostenlos installieren](https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension) |
| ⏱️ **Pro Monatlich** | **$9.99** / Monat | **14 Tage kostenlos testen** (heute $0.00) | Alle 50 Industrie-Pro-Werkzeuge • 2 Arbeitsplätze | [14-Tage-Test starten](https://checkout.dodopayments.com/buy/pdc_0NmAaL3aw5WKbMZgAVCDZ) |
| 👑 **Pro Jährlich** | **$79.00** / Jahr | **35 % sparen** (~$6.58/Monat) | Alle 50 Pro-Werkzeuge • 3 Arbeitsplätze • 30-Tage-Offline-Puffer | [Pro jährlich sichern](https://checkout.dodopayments.com/buy/pdc_0NmAaL3aw5WKbMZgAVCDZ) |
| 🏆 **Pro Lifetime** | **$349.00** | **Einmal zahlen, für immer besitzen** | Alle 50 Pro-Werkzeuge • 5 Arbeitsplätze • Lifetime-Updates | [Lifetime Pro sichern](https://checkout.dodopayments.com/buy/pdc_0NmAaL3aw5WKbMZgAVCDZ) |

<div align="center" style="margin: 25px 0;">
  <a href="https://checkout.dodopayments.com/buy/pdc_0NmAaL3aw5WKbMZgAVCDZ" style="text-decoration:none;">
    <kbd style="font-size: 1.25em; padding: 14px 32px; background-color: #FF6600; color: white; border-radius: 10px; font-weight: bold; border: 1px solid #d15500; cursor: pointer; box-shadow: 0 4px 18px rgba(255,102,0,0.4);">
      ⚡ Tarif wählen & 14-Tage-Test starten (Dodo Checkout)
    </kbd>
  </a>
  <p style="margin-top: 10px; font-size: 0.9em; color: #888;">Sofortige 1-Klick-Aktivierung in VS Code • 14-Tage-Grace-Period-Schutz • 30-Tage-Offline-Puffer</p>
</div>

---

## 🔒 14-Tage-Grace-Period & Offline-First-Garantie

Inbetriebnahme-Ingenieure arbeiten in störungsreichen Werken, Reinräumen und Automobilzellen mit **null Netzwerkverbindung**.

* 📶 **30-Tage-Offline-Puffer**: Einmal aktivieren und bis zu 30 Tage komplett offline im Werk arbeiten – ohne Netzwerk-Handshakes.
* 🛡️ **14-Tage-Grace-Period**: Schlägt eine internationale Zahlungsmethode oder Kartenverlängerung vor Ort vorübergehend fehl, sperren Pro-Funktionen **Sie mitten in der Inbetriebnahme niemals aus**. Die Erweiterung bietet ein 14-tägiges Grace-Fenster mit intelligenten automatischen Hintergrund-Wiederholungen.

---

## 🛡️ Enterprise-Sicherheitszertifizierung

KUKA KRL Professional ist von **ReversingLabs Spectra Assure** mit einem **100 % Security Health Score** zertifiziert:
* 🟢 **0 Malware** (saubere Binärprüfung)
* 🟢 **0 CVE-Schwachstellen** in allen Abhängigkeiten
* 🟢 **0 Secret-/Token-Leaks**
* 🟢 **0 MITRE-ATT&CK-Indikatoren**

Offizielles Sicherheitsaudit: [https://secure.software/vscode/packages/liskinlabs/kuka-krl-extension](https://secure.software/vscode/packages/liskinlabs/kuka-krl-extension)

---

## ⌨️ Tastenkürzel

| Kürzel | Aktion | Bereich |
|:---|:---|:---|
| `Shift + Alt + F` | Dokument formatieren (KRL-3-Leerzeichen-Einrückung & Matrixausrichtung) | Aktiver Editor |
| `Ctrl + Alt + F` | Interaktives Flussdiagramm öffnen | `.src`-Datei |
| `Ctrl + Alt + D` | Industrie-Sicherheits- & Diagnoseprüfung ausführen | Workspace |
| `Ctrl + Alt + B` | SmartPAD-Backup-Diff & Punkt-Delta-Inspektor öffnen | Aktives Projekt |
| `Ctrl + Alt + K` | KUKA Control Center & 3-Punkt-Frame-Mathematik starten | Aktiver Editor |
| `Ctrl + Space` | Smarte KSS-Autovervollständigung auslösen | Cursorposition |

---

## ⚙️ Konfigurationseinstellungen

Konfigurieren Sie das Verhalten der Erweiterung in Ihrer `settings.json`:

| Einstellung | Standard | Beschreibung |
|:---|:---:|:---|
| `krl.indentWidth` | `3` | Einrückungsgröße (3 Leerzeichen sind der offizielle KUKA-Standard). |
| `krl.alignAssignments` | `true` | `=`-Symbole in `.dat`-Dateien für saubere Matrizen automatisch ausrichten. |
| `krl.errorLens.enabled` | `true` | Diagnosefehler inline am Zeilenende anzeigen. |
| `krl.validateNonAscii` | `true` | Nach Kyrillisch-/Nicht-ASCII-Zeichen suchen, die ältere KSS-Compiler brechen. |
| `krl.inlayHints.enabled` | `true` | Beschreibende Namen für E/A-Signale inline anzeigen. |

---

## 🌐 Dokumentation & Wiki

* 📖 **Englische Dokumentation**: [https://liskinlabs.github.io/kuka-krl-extension/](https://liskinlabs.github.io/kuka-krl-extension/)
* 🇷🇺 **Русская документация и Вики**: [https://liskinlabs.github.io/kuka-krl-extension/ru/](https://liskinlabs.github.io/kuka-krl-extension/ru/)
* 🇹🇷 **Türkçe Dokümantasyon ve Wiki**: [https://liskinlabs.github.io/kuka-krl-extension/tr/](https://liskinlabs.github.io/kuka-krl-extension/tr/)

---

## 📄 Lizenz & Credits

* **Publisher & Entwickler**: [Liskin Labs](https://github.com/LiskinLabs) / [Silvestr Liskin](https://www.linkedin.com/in/silvestr-liskin-ab712920b/)
* **Sicherheitsauditor**: [ReversingLabs Spectra Assure](https://secure.software/vscode/packages/liskinlabs/kuka-krl-extension)
* **Offizieller Zahlungsdienstleister**: [Dodo Payments](https://dodopayments.com/)
