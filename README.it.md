> *Nota sui marchi: KUKA®, WorkVisual®, iiQWorks®, KUKA.Sim®, SmartPAD® e KRL sono marchi registrati di KUKA Aktiengesellschaft / KUKA Roboter GmbH. KRL Engineering Toolkit è un prodotto indipendente di Liskin Labs e non è affiliato o sponsorizzato da KUKA. I controlli offline integrano, ma non sostituiscono mai, la validazione fisica di sicurezza sul controller.*

<h1 align="center">KRL Engineering Toolkit per Robotica KUKA®</h1>

<p align="center">
  <b>Distribuisci codice KRL privo di errori in cella robotica più velocemente.</b><br />
  Analisi di sicurezza pre-caricamento, riparazione automatica di 7 guasti critici, diff backup senza estrazione, linter VASS 26 e telemetria live KSS 8.x / iiQKA.OS in VS Code, Cursor e Windsurf.<br />
  Progettato per <b>KRC2, KRC4 e KRC5</b> (<code>KSS 5.x–8.7</code> · <code>iiQKA.OS 9.x</code> · <code>VKRC / VASS 26</code>) · <b>100% RAM locale · Zero upload cloud</b>
</p>

<p align="center">
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.md">English</a> ·
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.ru.md">Русский</a> ·
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.de.md">Deutsch</a> ·
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.tr.md">Türkçe</a> ·
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.es.md">Español</a> ·
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.it.md"><b>Italiano</b></a>
</p>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension"><img src="https://img.shields.io/visual-studio-marketplace/v/LiskinLabs.kuka-krl-extension?style=flat-square&label=VS%20Code%20Marketplace&color=FF6600" alt="VS Code Marketplace" /></a>
  <a href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension"><img src="https://img.shields.io/visual-studio-marketplace/i/LiskinLabs.kuka-krl-extension?style=flat-square&label=Installs&color=2563EB" alt="Installazioni" /></a>
  <a href="https://open-vsx.org/extension/LiskinLabs/kuka-krl-extension"><img src="https://img.shields.io/open-vsx/v/LiskinLabs/kuka-krl-extension?style=flat-square&logo=eclipseche&logoColor=white&color=007ACC&label=Open%20VSX" alt="Open VSX" /></a>
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/releases"><img src="https://img.shields.io/badge/Release-v1.9.25-FF6600?style=flat-square&logo=visualstudiocode&logoColor=white" alt="Release v1.9.25" /></a>
  <a href="https://secure.software/vscode/packages/liskinlabs/kuka-krl-extension"><img src="https://img.shields.io/badge/Spectra%20Assure-PASSED%20(0%20CVE)-10b981?style=flat-square&logo=shield&logoColor=white" alt="ReversingLabs Security Score" /></a>
  <a href="https://liskinlabs.github.io/kuka-krl-extension/"><img src="https://img.shields.io/badge/Fleet%20Audited-4.13M%2B%20LoC-10b981?style=flat-square" alt="4.13M+ righe verificate" /></a>
  <a href="https://liskinlabs.github.io/kuka-krl-extension/guide/pro-features"><img src="https://img.shields.io/badge/Commands-126%20(63%20Free%20%7C%2063%20Pro)-0EA5E9?style=flat-square" alt="126 comandi" /></a>
</p>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension"><b>Installa da Marketplace</b></a> ·
  <a href="https://open-vsx.org/extension/LiskinLabs/kuka-krl-extension"><b>Installa da Open VSX</b></a> ·
  <a href="https://checkout.dodopayments.com/buy/pdt_0NmAV012KFHSjUMyDomJ6?redirect_url=https%3A%2F%2Fkuka-krl-support-gateway.redminotpro5.workers.dev%2Fcheckout%2Fsuccess%3Flang%3Dit&singlePage=true&showDiscounts=true&discountCode=LAUNCH30"><b>Pro Annual (-30% LAUNCH30)</b></a> ·
  <a href="https://liskinlabs.github.io/kuka-krl-extension/"><b>Documentazione</b></a> ·
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/blob/main/SUPPORT.md"><b>Supporto e Air-Gap</b></a>
</p>

> **Prova tutti i 63 strumenti Pro gratis per 14 giorni — nessuna carta richiesta:** premi `Ctrl+Shift+P` in VS Code ed esegui **`KRL: Start 14-Day Free Trial`** (`krl.startTrial`), oppure confronta i piani con **`KRL: View Pro Plans & Pricing`** (`krl.openPricingPlans`).

<p align="center">
  <img src="https://raw.githubusercontent.com/LiskinLabs/kuka-krl-extension/main/docs/public/media/kuka_control_center.gif" width="780" alt="Control Center KRL Engineering Toolkit e Telemetria Live" />
</p>

---

## Perché i tecnici di messa in servizio abbandonano gli editor generici

Un singolo fermo linea evitabile in avviamento costa **USD 10,000+ all'ora**. **Una sola ora risparmiata in cella ripaga un intero anno di Engineer Pro.**

| Guasto in Cella Robotica | Cosa sfugge agli editor generici | Come lo blocca KRL Engineering Toolkit |
|---|---|---|
| **Errore Interrupt (`KSS 1422`)** | `RESUME` senza arresto `BRAKE` precedente | Analisi statica preventiva & `Ctrl+.` inserisce **`BRAKE` prima di `RESUME`** con diff |
| **Arresto Puntatore di Avanzamento** | Uscite `$OUT` o attese durante moto continuo | **Advance Run Guard** evidenzia la riga esatta e suggerisce `TRIGGER WHEN DISTANCE=...` |
| **Deriva Notturna dei Punti** | Ritocchi `E6POS` su SmartPAD senza controllo | **Backup Diff senza estrazione** calcola delta 6D (`ΔX, ΔY, ΔZ, A, B, C`) in `< 80 ms` |
| **Desincronia `;FOLD` / `.dat`** | Modifiche KRL manuali diverse da `;Params` o `FDAT` | **Integrità a 3 vie** allinea `;FOLD`, codice, `PDAT`/`LDAT` e `.dat` |
| **Errori UTF-8 BOM Nascosti** | `\xEF\xBB\xBF` o virgolette errate bloccano il KSS | **Auto-Repair 1-Click** rimuove caratteri non-ASCII e riallinea `;FOLD`/`ENDFOLD` |
| **Attese di Suite Pesanti** | Avviare software pesante solo per segnali o `.wvs` | **Bridge Node.js puro** legge `.wvs` e KSS 8.x (`49002`) / iiQKA (`443`) senza DLL esterne |

---

## Benchmark Verificati e Sicurezza Industriale

- **4.13M+ Righe Verificate**: testato su `108` backup reali di stabilimento (`4,136,829` righe) in `25.4 s`.
- **Database KSS Completo**: `957` variabili di sistema, `116` funzioni, `111` struct, `112` enum, `183` profili cinematici KUKA e **`126` comandi (`63` Free + `63` Pro)**.
- **Validato su Controller Reali**: `KSS 8.6.2 (OfficeLite)`, `KSS 8.7 (KR C5)`, `iiQKA 9.2.3 (VRC)` e `iiQKA 9.3.4 (KR C5)`.
- **Sicurezza OT**: **ReversingLabs Spectra Assure PASSED (0 CVE)** · `100%` elaborazione RAM locale · zero upload cloud · attivazione offline **Air-Gap Ed25519 `.lic`**.

---

## Moduli Ingegneristici Principali

### 1. Telemetria Live, Messaggi SmartPAD e Compile Gate `[PRO]`
Connessione Ethernet diretta senza WorkVisual, KUKA.Sim, Python o DLL di terze parti: WCF nativo KSS 8.x (`49002`), KVP (`7000`) e gRPC iiQKA.OS (`443`), storico SmartPAD (`krl.live.openMessages`) e backup live `.zip`/`.ibz`.

<p align="center">
  <img src="https://raw.githubusercontent.com/LiskinLabs/kuka-krl-extension/main/docs/public/media/krl_io_signals.gif" width="760" alt="Ispettore segnali I/O in tempo reale" />
</p>

### 2. Audit Preventivo, Auto-Repair 7 Rischi e VASS 26 / VKRC `[PRO]`
Riparazione deterministica (`krl.fixAllSafeIssuesInFile`) con Monaco Diff e rollback AST, pulizia codice morto (`krl.cleanupUnusedVariables`), cinematica 183 robot, migrazione `KSS 8.3–9.3` (`krl.convertToIiqkaFold`) e controllo VW VASS 26 / `VW_USER` (`101..501`).

<p align="center">
  <img src="https://raw.githubusercontent.com/LiskinLabs/kuka-krl-extension/main/docs/public/media/type-validation-demo.gif" width="760" alt="Validazione statica di sicurezza KRL" />
</p>

### 3. Backup Diff Senza Estrazione, `.wvs`, `.vcmx` e Log `.evt` `[PRO]`
Montaggio diretto `.zip`/`.ibz`/`KRCDiag`/`.wvs` (`< 80 ms`), decodifica `.evt` in 6 lingue, delta 6D, esportazione fieldbus `.wvs` verso **Siemens TIA Portal / TwinCAT 3 / EPLAN** (`krl.inspectFieldbusTopology`), controllo `.vcmx` (`krl.inspectWorkcellLayout`, `krl.validateWorkcellSimulation`) e **report ISO 10218-1/-2**.

<p align="center">
  <img src="https://raw.githubusercontent.com/LiskinLabs/kuka-krl-extension/main/docs/public/media/krc_backup_diff.gif" width="760" alt="Confronto backup SmartPAD" />
</p>

### 4. Diagrammi di Flusso, KUKA.RSI 4ms, CAM G-Code e Bridge MCP `[PRO]`
Grafici SVG interattivi (`krl.showFlowchart`), RSI `#IPO_FAST` 4ms (`krl.validateRsiXml`, `krl.generateRsiCode`), importatore CNC G-Code/SVG (`krl.importGcodeToKrl`), calibrazione visione 9 pose (`krl.generateVisionCalibration`) e **MCP locale (`127.0.0.1`)**.

<p align="center">
  <img src="https://raw.githubusercontent.com/LiskinLabs/kuka-krl-extension/main/docs/public/media/control_flow_graph.gif" width="760" alt="Generatore di diagrammi di flusso KRL" />
</p>

### 5. Language Server KRL ad Alta Velocità — Gratis per Sempre `[FREE CORE]`
Navigazione `F12` `.src` ↔ `.dat`, completamento per **`957` variabili KSS**, **`116` funzioni**, **`111` struct**, **`112` enum**, formattazione, `;FOLD` e **6 temi industriali** senza limiti di righe (`63` comandi gratuiti).

<p align="center">
  <img src="https://raw.githubusercontent.com/LiskinLabs/kuka-krl-extension/main/docs/public/media/smart_autocomplete.gif" width="760" alt="Completamento automatico intelligente KRL" />
</p>

---

## Edizioni e Prezzi Trasparenti

**Community Edition:** Gratuita per studio, ambito accademico e uso non commerciale ([LICENSE.txt](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/LICENSE.txt)). Tutti i moduli Pro possono essere valutati con la **prova gratuita di 14 giorni** (`krl.startTrial`); l'uso commerciale continuo richiede una licenza Pro, Team, Department o Enterprise.

> **Promo Lancio (`LAUNCH30`):** **30% di sconto** pre-applicato nei link diretti tramite **Dodo Payments** con fatture fiscali automatiche e **0% IVA EU VIES Reverse Charge**.

| Piano | Prezzo listino | Con `LAUNCH30` (-30%) | Postazioni / Durata | Ideale per | Acquista |
|---|---|---|---|---|---|
| **Community** | USD 0 | USD 0 | Personale / Accademico · +14g prova Pro | Studio ed editing base | [Installa gratis](https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension) |
| **Pro Monthly** | USD 19 / mese | **USD 13.30 / mese** | 1 PC · Disdici quando vuoi | Trasferte brevi | [Mensile](https://checkout.dodopayments.com/buy/pdt_0NmAUzwdbzeERSktsOLTp?redirect_url=https%3A%2F%2Fkuka-krl-support-gateway.redminotpro5.workers.dev%2Fcheckout%2Fsuccess%3Flang%3Dit&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Pro Annual** *(Consigliato)* | USD 149 / anno | **USD 104.30 / anno** | 1 PC · 1 anno aggiornamenti | Programmatori KUKA | [Annuale (-30%)](https://checkout.dodopayments.com/buy/pdt_0NmAV012KFHSjUMyDomJ6?redirect_url=https%3A%2F%2Fkuka-krl-support-gateway.redminotpro5.workers.dev%2Fcheckout%2Fsuccess%3Flang%3Dit&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Pro Lifetime** | USD 699 una tantum | **USD 489.30 una tantum** | 1 PC · Perpetua | Consulenti indipendenti | [Perpetua](https://checkout.dodopayments.com/buy/pdt_0NmAcoqVCfuwQ6Xx7qyqr?redirect_url=https%3A%2F%2Fkuka-krl-support-gateway.redminotpro5.workers.dev%2Fcheckout%2Fsuccess%3Flang%3Dit&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Team Edition** | USD 499 / anno | **USD 349.30 / anno** | **5 PC** · Fattura unica | Team di automazione | [Team (5 posti)](https://checkout.dodopayments.com/buy/pdt_0NnLCdgD69GiXDLRJ0K5v?redirect_url=https%3A%2F%2Fkuka-krl-support-gateway.redminotpro5.workers.dev%2Fcheckout%2Fsuccess%3Flang%3Dit&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Department / Integrator** | USD 1,499 / anno | **USD 1,049.30 / anno** | **20 PC** · Supporto Air-Gap | System integrator | [Department (20 posti)](https://checkout.dodopayments.com/buy/pdt_0Nq5QVTrbkJbWAUf8qoyn?redirect_url=https%3A%2F%2Fkuka-krl-support-gateway.redminotpro5.workers.dev%2Fcheckout%2Fsuccess%3Flang%3Dit&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Enterprise Plant** | USD 4,999 / anno | Preventivo PO | **100 PC** · SLA prioritario | Stabilimenti e OEM | [Richiedi fattura B2B](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/SUPPORT.md#2-14-day-free-trial-upgrades--billing-dodo-payments-mor) |

**[Attiva Online](https://kuka-krl-support-gateway.redminotpro5.workers.dev/activate)** · **[Genera `.lic` Air-Gap](https://kuka-krl-support-gateway.redminotpro5.workers.dev/airgap)** · **[Portale Clienti](https://customer.dodopayments.com/login/bus_0NlrxPhrg9eHzPZKAgsF1)**

---

## Avvio Rapido, Air-Gap e Novità v1.9.24

```bash
code --install-extension LiskinLabs.kuka-krl-extension
```

- **Sicurezza OT**: `100%` elaborazione in RAM locale ([PRIVACY.md](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/PRIVACY.md)), cache offline di 30 giorni per licenze commerciali + 14 giorni di grazia (prova Pro gratuita di **14 giorni**) e licenze **Air-Gap Ed25519 `.lic`** (`krl.exportHardwareIdFile` / `krl.importOfflineLicenseFile`).
- **Novità `v1.9.24`**: Eliminato lo spam `CrossMeld 1419/1516` su SmartPAD alla connessione senza programma/base, supporto nativo per archivi `.ibz`/`.IBZ`, verifica Dodo/Ed25519 rafforzata e persistenza `v4` resistente ad aggiornamenti e cambi di rete (prova Pro di 14 giorni). Vedi [CHANGELOG.md](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/CHANGELOG.md).
- **Conformità ISO 10218-1/-2 & ISO 13849-1**: Software **Non-SIL / Non-PL**; eseguire sempre test manuali T1 (`$OV_PRO <= 30%`) sullo SmartPAD fisico.
