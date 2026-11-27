<h1 align="center">KRL Engineering Toolkit für KUKA® Roboter</h1>

<p align="center">
  KRL Language Server, statische Sicherheitsanalyse, entpackungsfreier Backup-Diff, WorkVisual (<code>.wvs</code>)-Inspektor und Live-Controller-Telemetrie in VS Code, Cursor &amp; Windsurf.<br />
  Unterstützt <b>KR C2, KR C4 &amp; KR C5 (micro / -2)</b> · <code>KSS 5.4–8.7</code> · <code>VSS (VKRC) 8.3–8.7</code> · <code>iiQKA.OS2 9.0–9.3</code> · <b>100% lokale Verarbeitung · Kein Cloud-Upload</b>
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
  <a href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension"><img src="https://vsmarketplacebadges.dev/version-short/LiskinLabs.kuka-krl-extension.svg?style=flat-square&label=VS%20Code%20Marketplace&color=FF6600" alt="VS Code Marketplace" /></a>
  <a href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension"><img src="https://vsmarketplacebadges.dev/installs-short/LiskinLabs.kuka-krl-extension.svg?style=flat-square&label=Marketplace%20Installs&color=2563EB" alt="Installationen" /></a>
  <a href="https://open-vsx.org/extension/LiskinLabs/kuka-krl-extension"><img src="https://img.shields.io/open-vsx/v/LiskinLabs/kuka-krl-extension?style=flat-square&logo=eclipseche&logoColor=white&color=007ACC&label=Open%20VSX" alt="Open VSX" /></a>
  <a href="https://open-vsx.org/extension/LiskinLabs/kuka-krl-extension"><img src="https://img.shields.io/open-vsx/dt/LiskinLabs/kuka-krl-extension?style=flat-square&logo=eclipseche&logoColor=white&color=007ACC&label=Open%20VSX%20Downloads" alt="Open VSX Downloads" /></a>
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/releases"><img src="https://img.shields.io/badge/Release-v1.9.27-FF6600?style=flat-square&logo=visualstudiocode&logoColor=white" alt="Release v1.9.27" /></a>
  <a href="https://secure.software/vscode/packages/liskinlabs/kuka-krl-extension"><img src="https://img.shields.io/badge/Spectra%20Assure-PASSED%20(0%20CVE)-10b981?style=flat-square&logo=shield&logoColor=white" alt="Spectra Assure" /></a>
  <a href="https://liskinlabs.com/"><img src="https://img.shields.io/badge/Fleet%20Audited-4.13M%2B%20LoC-10b981?style=flat-square" alt="4.13M+ Zeilen geprüft" /></a>
  <a href="https://liskinlabs.com/guide/pro-features"><img src="https://img.shields.io/badge/Commands-136%20(69%20Free%20%7C%2067%20Pro)-0EA5E9?style=flat-square" alt="136 Befehle" /></a>
</p>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension"><b>Im Marketplace installieren</b></a> ·
  <a href="https://open-vsx.org/extension/LiskinLabs/kuka-krl-extension"><b>Auf Open VSX installieren</b></a> ·
  <a href="https://liskinlabs.com/de/"><b>Dokumentation</b></a> · ·
  <a href="https://sim.liskinlabs.com/"><b>3D-Simulator</b></a> ·
  <a href="mailto:info@liskinlabs.com"><b>info@liskinlabs.com</b></a>
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/blob/main/SUPPORT.md"><b>Support &amp; Air-Gap-Lizenz</b></a>
</p>

> **14 Tage Pro ohne Kreditkarte testen:** `Ctrl+Shift+P` in VS Code drücken und **`KRL: Start 14-Day Free Trial`** (`krl.startTrial`) starten oder Tarife über **`KRL: View Pricing Plans & Upgrade Options`** (`krl.openPricingPlans`) vergleichen.

<p align="center">
  <img src="https://raw.githubusercontent.com/LiskinLabs/kuka-krl-extension/main/docs/public/media/kuka_control_center.gif" width="780" alt="KRL Engineering Toolkit Control Center und Live-Telemetrie" />
</p>

---

## Häufige Steuerungsfehler vor der Inbetriebnahme erkennen

| Fehlerbild | Was Standard-Editoren übersehen | Lösung im KRL Engineering Toolkit |
|---|---|---|
| **Fehlendes `BRAKE` vor `RESUME`** | `RESUME` im Interrupt ohne `BRAKE` löst einen Vorlaufstopp aus (der Roboter fährt den Satz zu Ende statt sofort zu bremsen) und führt bei falschem Stack / `$ADVANCE=0` zu `KSS 1584` | Statische Diagnose meldet fehlendes `BRAKE` (oder `INTERRUPT WITH BRAKE`); `Ctrl+.` ergänzt `BRAKE` mit Diff-Vorschau |
| **Ungewollter Vorlaufstopp (`$OUT` / `WAIT`)** | Direkte `$OUT`-Zuweisungen in `C_DIS` / Spline brechen den Vorlauf | Markiert vorlaufbrechende Zeilen und empfiehlt `TRIGGER WHEN DISTANCE=0 DELAY=0 DO $OUT[...] = TRUE` |
| **Punktdrift am SmartPAD** | Nachteachen von `E6POS` zwischen Schichten ohne Diff | Öffnet `.zip` / `.ibz` / `KRCDiag` im RAM (`< 80 ms`) und berechnet 6D-Abweichungen (`ΔX, ΔY, ΔZ, A, B, C`) im Diff |
| **`;FOLD` / `.dat` / Versionsdrift** | Veraltete `;Params`, `PDAT.VEL` unter KSS 9.x oder Bewegung in `DRYRUN ... ENDDRYRUN` | Prüft `14` KSS-Profile (`5.4–9.3`), `SVEL_CP2`/`LDAT`, `;FOLD`-Sync und verbietet Bewegungen in `DRYRUN` |
| **UTF-8 BOM & Zeichenkodierung** | Verstecktes BOM `\xEF\xBB\xBF` wird auf `iiQKA.OS2` abgelehnt; falsche Codepage zerstört Umlaute/Kyrillisch | Unterstützt UTF-8 ohne BOM (`iiQKA.OS2`), `CP1251`, `Windows-1252` und `UTF-16LE` verlustfrei |
| **`.wvs` & I/O ohne WorkVisual** | Schwere Windows-Suite nur für Signal- oder Bustabellen starten | Öffnet `.wvs` / `.vcmx` unter Windows, macOS, Linux und verbindet sich über offizielle KUKA-Ports (`49002`, `443`, `4840`, `7000`) |

---

## Verifizierte Basis & Sicherheit

- **Geprüft an 108 Industrie-Backups**: `4,136,829` Zeilen Produktiv-KRL in `25.4 s` geprüft.
- **KSS-Wissensbasis**: `957` Systemvariablen (`127` manuell verifizierte Schreibschutz-Regeln + Versions-Gating), `116+` KRL- / EKI-6.x- / RSI-6.x-Funktionen, `111` Strukturen, `112` Enums, `183` Roboterprofile und `136` Befehle (`69` Free + `67` Pro).
- **Auf Steuerungen validiert**: `KSS 8.6.2 (OfficeLite)`, `KSS 8.7 (KR C5)`, `iiQKA.OS2 9.2.3 (VRC)` und `iiQKA.OS2 9.3.4 (KR C5)`.
- **Sicherheit & Air-Gap**: ReversingLabs Spectra Assure PASSED (`0 CVE`), `100%` lokale Verarbeitung im RAM, kein Quellcode-Upload, Offline-Ed25519-`.lic`.

---

## Kernmodule

1. **Live Controller Bridge & Fieldbus I/O `[PRO]`**: Direkte Node.js-Verbindung per `WCF` (`49002`), `iiQKA.OS2` gRPC (`443`), `OPC UA` Probe (`4840`) und `KUKAVARPROXY` (`7000`); Zero-Config Discovery, Cross-Subnet Scout, `SecretStorage`-Zugangsdaten (`krl.live.changeCredentials`), 4096-Pin I/O mit `CFG`-Filter (`KrcIoSignals.xml`), `UserTexts.kxr`, Watch SVG, 7-Check Health-Tab & Compile Gate.
2. **Statische Prüfung, Diff-Auto-Repair & VASS 26 / VKRC `[PRO]`**: `krl.fixAllSafeIssuesInFile` mit AST-Rollback-Schutz, `KSS 5.4–9.3` (`14` Profile), `DRYRUN ... ENDDRYRUN` (`krl-dryrun-motion`), IK-Singularitätsprüfung (`|A5| <= 5°`), `SPS.SUB`, Volkswagen **VASS 26 / `VW_USER 101..501`** und Dead-Code-Bereinigung (`krl.cleanupUnusedVariables`).
3. **Backup-Diff, `.wvs` & `.vcmx` `[PRO]`**: Entpackungsfreies Mounten von `.zip`/`.ibz`/`KRCDiag`, 6D-Punktdeltas, EVTX-`.evt`-/Log-Decoder, `.wvs`-Export nach **TIA Portal**, **TwinCAT 3** & **EPLAN** (`krl.inspectFieldbusTopology`), `.vcmx`-Prüfung (`VCMX001–VCMX004`) und **ISO 10218-1/-2** Abnahmeprotokolle.
4. **Flussdiagramme, `iiQKA.RSI 6.x` / `EKI 6.x`, CAM & MCP `[PRO]`**: Interaktiver SVG-Ablaufplan (`krl.showFlowchart`), KRL-Generator & XML-Prüfung für Classic- und `iiQKA 6.x` (`RSI_LOAD`, `RSI_PROCESS_ON()`, `EKI_Load`), CNC G-Code / SVG-Import und lokaler MCP-Server (`127.0.0.1`).
5. **KRL Language Server `[FREE CORE]`**: `F12`-Navigation (`.src` <-> `.dat`), Find References, modul-isoliertes Umbenennen, `957` Variablen, `;%{PE}`-erhaltende Formatierung und 6 Themes (`69` kostenlose Befehle).

> **Systemgrenze:** Ergänzt **KUKA WorkVisual** und **iiQWorks.Sim**, ersetzt diese jedoch nicht für Feldbus-Hardwarekonfiguration, SafeOperation oder den Controller-Deploy. Keine zertifizierte Sicherheitssoftware (`Non-SIL / Non-PL`).

---

## Lizenzen & Preise

**Community Edition:** Kostenlos für Studium, Ausbildung und nicht-kommerzielle Nutzung ([LICENSE.txt](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/LICENSE.txt)). Kommerzielle Nutzung erfordert nach dem **14-tägigen Pro-Test** (`krl.startTrial`) eine gültige Lizenz.

| Tarif | Standardpreis | Arbeitsplätze & Laufzeit | Zielgruppe | Bestellung |
|---|---|---|---|---|
| **Community** | USD 0 | Privat / Lehre · 14 Tage Pro-Test | Ausbildung & Tests | [Kostenlos installieren](https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension) |
| **Pro Monthly** | USD 19 / Mon. | 1 PC · Monatlich kündbar | Kurze Einsätze | [Monatsabo](https://checkout.dodopayments.com/buy/pdt_0NmAUzwdbzeERSktsOLTp?redirect_url=https%3A%2F%2Fapi.liskinlabs.com%2Fcheckout%2Fsuccess%3Flang%3Dde&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Pro Annual** | USD 149 / Jahr | 1 PC · 1 Jahr Updates | Robotiker & Inbetriebnehmer | [Jahreslizenz](https://checkout.dodopayments.com/buy/pdt_0NmAV012KFHSjUMyDomJ6?redirect_url=https%3A%2F%2Fapi.liskinlabs.com%2Fcheckout%2Fsuccess%3Flang%3Dde&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Pro Lifetime** | USD 699 einmalig | 1 PC · Dauerhaft | Freie Integratoren | [Lifetime](https://checkout.dodopayments.com/buy/pdt_0NmAcoqVCfuwQ6Xx7qyqr?redirect_url=https%3A%2F%2Fapi.liskinlabs.com%2Fcheckout%2Fsuccess%3Flang%3Dde&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Team** | USD 499 / Jahr | 5 PCs · Sammelrechnung | Kleine Teams | [Team kaufen](https://checkout.dodopayments.com/buy/pdt_0NnLCdgD69GiXDLRJ0K5v?redirect_url=https%3A%2F%2Fapi.liskinlabs.com%2Fcheckout%2Fsuccess%3Flang%3Dde&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Department** | USD 1,499 / Jahr | 20 PCs · Air-Gap-Support | Systemintegratoren | [Department kaufen](https://checkout.dodopayments.com/buy/pdt_0Nq5QVTrbkJbWAUf8qoyn?redirect_url=https%3A%2F%2Fapi.liskinlabs.com%2Fcheckout%2Fsuccess%3Flang%3Dde&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Enterprise** | USD 4,999 / Jahr | 100 PCs · PO & SLA | Werke & OEMs | [B2B-Anfrage](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/SUPPORT.md#2-14-day-free-trial-upgrades--billing-dodo-payments-mor) |

<sub>Promo-Code `LAUNCH30` (-30%) ist in den Checkout-Links vorbelegt. Abrechnung inkl. EU-VIES-Reverse-Charge durch Dodo Payments (Merchant of Record). Bereits lizenziert: <a href="https://api.liskinlabs.com/activate">Online aktivieren</a> · <a href="https://api.liskinlabs.com/airgap">Air-Gap .lic</a> · <a href="https://customer.dodopayments.com/login/bus_0NlrxPhrg9eHzPZKAgsF1">Kundenportal</a> · <a href="mailto:info@liskinlabs.com">info@liskinlabs.com</a>.</sub>

---

## Schnellstart, Datenschutz & Rechtliches

```bash
code --install-extension LiskinLabs.kuka-krl-extension
```

Alle Programme bleiben lokal ([PRIVACY.md](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/PRIVACY.md)). Vollständige Versionshinweise: [CHANGELOG.md](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/CHANGELOG.md). Offline-Prüfungen ersetzen niemals den reduzierten Handbetrieb (`$OV_PRO <= 30%` in `T1`) am SmartPAD gemäß **ISO 10218-1/-2** und **ISO 13849-1**. KUKA®, WorkVisual®, iiQWorks®, KUKA.Sim®, SmartPAD® und KRL sind eingetragene Marken der KUKA Aktiengesellschaft / KUKA Roboter GmbH.
