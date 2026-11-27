<h1 align="center">KRL Engineering Toolkit per Robotica KUKA®</h1>

<p align="center">
  Server linguistico KRL, analisi statica di sicurezza, diff backup senza estrazione, ispettore WorkVisual (<code>.wvs</code>) e telemetria live in VS Code, Cursor e Windsurf.<br />
  Supporta <b>KR C2, KR C4 e KR C5 (micro / -2)</b> · <code>KSS 5.4–8.7</code> · <code>VSS (VKRC) 8.3–8.7</code> · <code>iiQKA.OS2 9.0–9.3</code> · <b>100% RAM Locale · Zero Upload Cloud</b>
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
  <a href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension"><img src="https://vsmarketplacebadges.dev/version-short/LiskinLabs.kuka-krl-extension.svg?style=flat-square&label=VS%20Code%20Marketplace&color=FF6600" alt="VS Code Marketplace" /></a>
  <a href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension"><img src="https://vsmarketplacebadges.dev/installs-short/LiskinLabs.kuka-krl-extension.svg?style=flat-square&label=Marketplace%20Installs&color=2563EB" alt="Installazioni" /></a>
  <a href="https://open-vsx.org/extension/LiskinLabs/kuka-krl-extension"><img src="https://img.shields.io/open-vsx/v/LiskinLabs/kuka-krl-extension?style=flat-square&logo=eclipseche&logoColor=white&color=007ACC&label=Open%20VSX" alt="Open VSX" /></a>
  <a href="https://open-vsx.org/extension/LiskinLabs/kuka-krl-extension"><img src="https://img.shields.io/open-vsx/dt/LiskinLabs/kuka-krl-extension?style=flat-square&logo=eclipseche&logoColor=white&color=007ACC&label=Open%20VSX%20Downloads" alt="Download Open VSX" /></a>
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/releases"><img src="https://img.shields.io/badge/Release-v1.9.27-FF6600?style=flat-square&logo=visualstudiocode&logoColor=white" alt="Release v1.9.27" /></a>
  <a href="https://secure.software/vscode/packages/liskinlabs/kuka-krl-extension"><img src="https://img.shields.io/badge/Spectra%20Assure-PASSED%20(0%20CVE)-10b981?style=flat-square&logo=shield&logoColor=white" alt="Spectra Assure" /></a>
  <a href="https://liskinlabs.com/"><img src="https://img.shields.io/badge/Fleet%20Audited-4.13M%2B%20LoC-10b981?style=flat-square" alt="4.13M+ righe" /></a>
  <a href="https://liskinlabs.com/guide/pro-features"><img src="https://img.shields.io/badge/Commands-136%20(69%20Free%20%7C%2067%20Pro)-0EA5E9?style=flat-square" alt="136 comandi" /></a>
</p>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension"><b>Installa da Marketplace</b></a> ·
  <a href="https://open-vsx.org/extension/LiskinLabs/kuka-krl-extension"><b>Installa da Open VSX</b></a> ·
  <a href="https://liskinlabs.com/it/"><b>Documentazione</b></a> · ·
  <a href="https://sim.liskinlabs.com/"><b>Simulatore 3D</b></a> ·
  <a href="mailto:info@liskinlabs.com"><b>info@liskinlabs.com</b></a>
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/blob/main/SUPPORT.md"><b>Supporto e Air-Gap</b></a>
</p>

> **Prova Pro di 14 giorni senza carta di credito:** premi `Ctrl+Shift+P` in VS Code ed esegui **`KRL: Start 14-Day Free Trial`** (`krl.startTrial`) oppure confronta i piani con **`KRL: View Pricing Plans & Upgrade Options`** (`krl.openPricingPlans`).

<p align="center">
  <img src="https://raw.githubusercontent.com/LiskinLabs/kuka-krl-extension/main/docs/public/media/kuka_control_center.gif" width="780" alt="Control Center KRL Engineering Toolkit e Telemetria Live" />
</p>

---

## Errori comuni rilevati prima del caricamento sul controllore

| Problema in cella | Cosa sfugge agli editor generici | Come interviene KRL Engineering Toolkit |
|---|---|---|
| **Manca `BRAKE` prima di `RESUME`** | `RESUME` in un interrupt senza `BRAKE` provoca un arresto di prelettura (il robot completa il segmento attivo anziché frenare subito) e genera `KSS 1584` su stack / `$ADVANCE=0` | L'analisi statica segnala l'assenza di `BRAKE` (o `INTERRUPT WITH BRAKE`) e `Ctrl+.` lo inserisce con anteprima Diff |
| **Arresti Advance Run (`$OUT` / `WAIT`)** | Scritture dirette `$OUT` nei tratti `C_DIS` / spline causano un Vorlaufstopp | Evidenzia le righe che fermano la prelettura e suggerisce `TRIGGER WHEN DISTANCE=0 DELAY=0 DO $OUT[...] = TRUE` |
| **Deriva dei punti sullo SmartPAD** | Ritocchi `E6POS` tra turni senza tracciamento delle modifiche | Monta archivi `.zip` / `.ibz` / `KRCDiag` in memoria (`< 80 ms`) e calcola i delta 6D (`ΔX, ΔY, ΔZ, A, B, C`) in Diff |
| **Disallineamento `;FOLD` / `.dat` / KSS** | `;Params` non allineati, `PDAT.VEL` in KSS 9.x o moti dentro `DRYRUN ... ENDDRYRUN` | Verifica `14` profili KSS (`5.4–9.3`), `SVEL_CP2`/`PDAT`/`LDAT`, `;FOLD` e vieta i moti dentro `DRYRUN` |
| **UTF-8 BOM e codifiche file** | Il BOM `\xEF\xBB\xBF` viene rifiutato da `iiQKA.OS2`; una codifica errata rovina i commenti | Gestisce UTF-8 senza BOM (`iiQKA.OS2`), `CP1251`, `Windows-1252` e `UTF-16LE` senza perdite |
| **Analisi `.wvs` e I/O senza WorkVisual** | Avviare suite pesanti su Windows solo per vedere bus di campo o segnali | Apre `.wvs` / `.vcmx` su Windows, macOS, Linux o si collega via porte ufficiali (`49002`, `443`, `4840`, `7000`) |

---

## Base verificata e sicurezza

- **Verificato su 108 backup industriali reali**: `4,136,829` righe KRL analizzate in `25.4 s`.
- **Base KSS integrata**: `957` variabili di sistema (`127` controlli read-only e gating versione), `116+` funzioni KRL / EKI 6.x / RSI 6.x, `111` strutture, `112` enum, `183` profili robot e `136` comandi (`69` Free + `67` Pro).
- **Validato su controllore**: `KSS 8.6.2 (OfficeLite)`, `KSS 8.7 (KR C5)`, `iiQKA.OS2 9.2.3 (VRC)` e `iiQKA.OS2 9.3.4 (KR C5)`.
- **Sicurezza e Air-Gap**: ReversingLabs Spectra Assure PASSED (`0 CVE`), elaborazione `100%` locale in RAM, zero upload cloud, attivazione offline Ed25519 `.lic`.

---

## Moduli principali

1. **Ponte Live e I/O fieldbus `[PRO]`**: Trasporto Node.js nativo per `WCF` (`49002`), `iiQKA.OS2` gRPC (`443`), sonda `OPC UA` (`4840`) e `KUKAVARPROXY` (`7000`) senza WorkVisual né DLL esterne; rilevamento automatico, Cross-Subnet Scout, credenziali in `SecretStorage` (`krl.live.changeCredentials`), I/O 4096-pin con filtro `CFG` (`KrcIoSignals.xml`), `UserTexts.kxr`, trend Watch SVG, scheda Health (7 controlli) e Compile Gate.
2. **Audit statico, riparazione sicura e VASS 26 / VKRC `[PRO]`**: `krl.fixAllSafeIssuesInFile` con rollback AST, migrazione `KSS 5.4–9.3` (`14` profili), `DRYRUN ... ENDDRYRUN` (`krl-dryrun-motion`), singolarità polso (`|A5| <= 5°`), `SPS.SUB`, linter **Volkswagen VASS 26 / `VW_USER 101..501`** e pulizia variabili inutilizzate (`krl.cleanupUnusedVariables`).
3. **Diff archivi senza estrazione, `.wvs` e `.vcmx` `[PRO]`**: Montaggio in RAM di `.zip`/`.ibz`/`KRCDiag`, delta 6D, decoder EVTX `.evt`/`krc.log`, esportazione `.wvs` verso **TIA Portal**, **TwinCAT 3** ed **EPLAN** (`krl.inspectFieldbusTopology`), validazione `.vcmx` (`VCMX001–VCMX004`) e report **ISO 10218-1/-2**.
4. **Diagrammi SVG, `iiQKA.RSI 6.x` / `EKI 6.x`, CAM e MCP `[PRO]`**: Diagramma cliccabile (`krl.showFlowchart`), validazione e generazione KRL classica e `iiQKA 6.x` (`RSI_LOAD`, `RSI_PROCESS_ON()`, `EKI_Load`), importazione G-Code / SVG e server MCP locale (`127.0.0.1`).
5. **Server linguistico KRL `[FREE CORE]`**: Navigazione `F12` (`.src` <-> `.dat`), riferimenti, rinomina isolata al modulo, `957` variabili, formattazione compatibile `;%{PE}` e 6 temi (`69` comandi gratuiti).

> **Confine tecnico:** Affianca ma non sostituisce **KUKA WorkVisual** né **iiQWorks.Sim** per configurazione hardware fieldbus, SafeOperation o deploy su controllore. Non è software certificato di sicurezza (`Non-SIL / Non-PL`).

---

## Licenze e prezzi

**Edizione Community:** Gratuita per apprendimento personale, didattica e ricerca non commerciale ([LICENSE.txt](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/LICENSE.txt)). L'uso commerciale richiede una licenza dopo la **prova gratuita di 14 giorni** (`krl.startTrial`).

| Piano | Prezzo standard | Copertura | Ideale per | Acquisto |
|---|---|---|---|---|
| **Community** | USD 0 | Personale / Accademico · 14 giorni prova Pro | Studio e test | [Installa gratis](https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension) |
| **Pro Monthly** | USD 19 / mese | 1 PC · Disdetta libera | Trasferte brevi | [Mensile](https://checkout.dodopayments.com/buy/pdt_0NmAUzwdbzeERSktsOLTp?redirect_url=https%3A%2F%2Fapi.liskinlabs.com%2Fcheckout%2Fsuccess%3Flang%3Dit&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Pro Annual** | USD 149 / anno | 1 PC · 1 anno aggiornamenti | Programmatori KUKA | [Annuale](https://checkout.dodopayments.com/buy/pdt_0NmAV012KFHSjUMyDomJ6?redirect_url=https%3A%2F%2Fapi.liskinlabs.com%2Fcheckout%2Fsuccess%3Flang%3Dit&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Pro Lifetime** | USD 699 una tantum | 1 PC · Perpetua | Consulenti indipendenti | [Lifetime](https://checkout.dodopayments.com/buy/pdt_0NmAcoqVCfuwQ6Xx7qyqr?redirect_url=https%3A%2F%2Fapi.liskinlabs.com%2Fcheckout%2Fsuccess%3Flang%3Dit&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Team** | USD 499 / anno | 5 PC · Fattura unica | Team di cella | [Acquista Team](https://checkout.dodopayments.com/buy/pdt_0NnLCdgD69GiXDLRJ0K5v?redirect_url=https%3A%2F%2Fapi.liskinlabs.com%2Fcheckout%2Fsuccess%3Flang%3Dit&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Department** | USD 1,499 / anno | 20 PC · Supporto Air-Gap | System integrator | [Acquista Department](https://checkout.dodopayments.com/buy/pdt_0Nq5QVTrbkJbWAUf8qoyn?redirect_url=https%3A%2F%2Fapi.liskinlabs.com%2Fcheckout%2Fsuccess%3Flang%3Dit&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Enterprise** | USD 4,999 / anno | 100 PC · PO e SLA | Stabilimenti e OEM | [Ordine B2B](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/SUPPORT.md#2-14-day-free-trial-upgrades--billing-dodo-payments-mor) |

<sub>Il codice `LAUNCH30` (30% di sconto) è già applicato nei link sopra. Pagamenti e fatture IVA/VIES gestiti da Dodo Payments (Merchant of Record). Hai già una licenza: <a href="https://api.liskinlabs.com/activate">Attiva online</a> · <a href="https://api.liskinlabs.com/airgap">Genera .lic Air-Gap</a> · <a href="https://customer.dodopayments.com/login/bus_0NlrxPhrg9eHzPZKAgsF1">Portale clienti</a>.</sub>

---

## Avvio rapido, privacy e note legali

```bash
code --install-extension LiskinLabs.kuka-krl-extension
```

Tutti i dati restano in locale ([PRIVACY.md](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/PRIVACY.md)). Cronologia: [CHANGELOG.md](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/CHANGELOG.md). I controlli offline non sostituiscono le verifiche in modalità `T1` (`$OV_PRO <= 30%`) su SmartPAD ai sensi di **ISO 10218-1/-2** e **ISO 13849-1**. KUKA®, WorkVisual®, iiQWorks®, KUKA.Sim®, SmartPAD® e KRL sono marchi registrati di KUKA Aktiengesellschaft / KUKA Roboter GmbH.
