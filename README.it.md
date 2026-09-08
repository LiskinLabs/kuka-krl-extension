<h1 align="center">KUKA KRL Professional</h1>

<p align="center">
  <b>L'IDE industriale definitivo e la suite di sicurezza per il linguaggio robotico KUKA.</b><br />
  Progettato per controllori KRC2, KRC4 e KRC5 (KSS 8.2 – 8.7). Creato per velocità, sicurezza e zero fermi produzione.
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
  <a href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension"><img src="https://img.shields.io/visual-studio-marketplace/v/LiskinLabs.kuka-krl-extension?style=flat-square&logo=visualstudiocode&logoColor=white&color=FF6600&label=VS%20Code" alt="VS Code Marketplace" /></a>
  <a href="https://open-vsx.org/extension/LiskinLabs/kuka-krl-extension"><img src="https://img.shields.io/open-vsx/v/LiskinLabs/kuka-krl-extension?style=flat-square&logo=eclipseche&logoColor=white&color=007ACC&label=Open%20VSX" alt="Open VSX" /></a>
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/releases"><img src="https://img.shields.io/badge/Release-v1.8.3-FF6600?style=flat-square&logo=visualstudiocode&logoColor=white" alt="Release v1.8.3" /></a>
  <a href="https://github.com/LiskinLabs/kuka-krl-extension-core/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/LiskinLabs/kuka-krl-extension-core/ci.yml?branch=main&style=flat-square&logo=github&logoColor=white&label=CI" alt="CI Verification" /></a>
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
  <a href="https://liskinlabs.github.io/kuka-krl-extension/"><b>🌐 Wiki interattiva (50 strumenti industriali)</b></a> •
  <a href="https://checkout.dodopayments.com/buy/pdc_0NmAaL3aw5WKbMZgAVCDZ"><b>⚡ Prova gratuita 14 giorni ($9.99/mese)</b></a> • 
  <a href="https://checkout.dodopayments.com/buy/pdc_0NmAaL3aw5WKbMZgAVCDZ"><b>👑 Pro annuale ($79.00/anno – risparmia il 35%)</b></a> • 
  <a href="https://secure.software/vscode/packages/liskinlabs/kuka-krl-extension"><b>🛡️ Report audit di sicurezza</b></a>
</p>

---

> [!IMPORTANT]
> ### ⚠️ Рекомендация перед передачей в эксплуатацию / Industrial Commissioning Notice
> **RU:** Перед передачей ячейки заказчику и вводом в промышленную эксплуатацию настоятельно рекомендуется загрузить исправленные файлы на виртуальный контроллер KUKA.OfficeLite или реальный шкаф KRC и убедиться, что встроенный компилятор KSS выдает зеленый статус компиляции модуля (символ «R» на SmartPAD) и отсутствуют синтаксические ошибки.
> 
> **EN:** Prior to client handover and industrial commissioning, it is strongly advised to deploy modified files to a virtual KUKA.OfficeLite controller or physical KRC cabinet, ensuring the embedded KSS compiler reports a green module status (the «R» indicator on the SmartPAD) and zero syntax or kinematic errors.

---

## ⚡ Il problema: fermo produzione da $10.000/ora

Ogni ingegnere di messa in servizio conosce questo dolore:
1. **Il ciclo lento**: modificare i file direttamente sul pendolino SmartPAD o lottare con i lenti deploy di WorkVisual.
2. **Il rischio di collisione nascosto**: una singola assegnazione `$TOOL` o `$BASE` mancante, uno spostamento di coordinate non verificato o un superamento accidentale di `$VEL.CP` che causa un crash meccanico alla prima esecuzione automatica.
3. **Le modifiche non verificate**: i colleghi ritoccano i punti sul pendolino durante il turno notturno con zero controllo di versione.

**KUKA KRL Professional** trasforma il tuo editor in un **centro di comando di robotica industriale** ad alte prestazioni. Individua errori di sintassi, guasti cinematici, blocchi non bilanciati e disallineamenti di coordinate **PRIMA** che il codice tocchi il controllore fisico.

> **💡 La garanzia ROI:** individuare un singolo crash di sintassi o una collisione meccanica prima di eseguire il codice in reparto ripaga una licenza Pro a vita nei primi 5 minuti.

---

## 🚀 Funzionalità professionali chiave

### 1. 🗺️ Flowchart interattivo e grafo del flusso di controllo
*Basta tracciare a mano la logica annidata.* Trasforma programmi `.src` enormi e complessi in diagrammi di flusso puliti, interattivi e cliccabili.
* **Salto al codice bidirezionale**: clicca su qualsiasi blocco per saltare istantaneamente alla riga esatta.
* **Drill-down delle subroutine**: clicca sulle chiamate (es. `PickPart()`, `WeldSeam()`) per caricare e ispezionare i loro flowchart.
* **Segnali e timer**: badge di stato colorati per segnali I/O, flag e timer.
* **Pannello di sicurezza integrato**: l'analisi completa di Sicurezza Industriale viene eseguita per il programma visualizzato — rischi di movimento, attuatori e deadlock con navigazione alla riga in un clic.
* **Esportazione SVG vettoriale**: diagrammi vettoriali ad alta risoluzione per consegne cliente e documentazione di automazione.

<p align="center">
  <img src="docs/public/media/control_flow_graph.gif" width="720" alt="Interactive Flowchart Demo" />
</p>

---

### 2. 🛡️ Sicurezza industriale e analizzatore di logica profonda
*Elimina crash di sintassi, deadlock e rischi di collisione meccanica prima di toccare il controllore.*
* **Bilanciamento rigido dei blocchi**: segnala blocchi orfani `IF / ENDIF`, `FOR / ENDFOR` e `LOOP / ENDLOOP` prima della compilazione KRC.
* **Controllo Tool/Base**: avvisa se i comandi di movimento (`PTP`, `LIN`, `CIRC`) vengono eseguiti senza inizializzazione attiva di `$TOOL` o `$BASE`.
* **Ispettore di velocità**: avvisa quando la velocità cartesiana `$VEL.CP` supera i limiti di sicurezza di messa in servizio (> 2.0 m/s).
* **Blocca-deadlock**: segnala timeout mancanti nelle condizioni `WAIT FOR` e cicli infiniti senza `EXIT`.
* **Blocca-cirillico e non-ASCII**: rileva caratteri non-ASCII accidentali che fanno crashare silenziosamente i vecchi compilatori KSS.

<p align="center">
  <img src="docs/public/media/type-validation-demo.gif" width="720" alt="Safety and Diagnostics Demo" />
</p>

---

### 3. 📦 Diff backup ZIP SmartPAD e matematica dei delta punti
*Ispeziona e confronta il codice del progetto live con i backup archivio `.zip` dello SmartPAD.*
* **Matematica dei delta**: calcola gli spostamenti spaziali esatti a 6 assi (**ΔX, ΔY, ΔZ, ΔA, ΔB, ΔC**) per punti `E6POS`, `POS` ed `E6AXIS`.
* **Audit zero-touch**: rileva istantaneamente i ritocchi non verificati fatti in reparto prima che causino collisioni.
* **Diff visivo affiancato**: visualizzatore diff grafico colorato integrato in VS Code.

<p align="center">
  <img src="docs/public/media/krc_backup_diff.gif" width="720" alt="SmartPAD Backup Diff Demo" />
</p>

---

### 4. 🔀 Controllo di versione KRL potenziato GitLens
*Traccia ogni modifica di coordinate e ogni modifica del programma con precisione.*
* **Annotazioni blame per riga**: autore, timestamp e dettagli del commit nella barra di stato per qualsiasi riga KRL.
* **Ispettore commit**: clicca sul blame nella barra di stato per ispezionare diff completi, metadati e revisioni storiche.
* **Cronologia file visiva (`krl.viewFileHistory`)**: confronta il codice corrente con qualsiasi commit Git storico in un diff affiancato.

---

### 5. 📐 Matematica frame di Eulero a 3 punti e KUKA Control Center
*Calcolatrice di trasformazione dei sistemi di coordinate direttamente nell'editor.*
* **Metodo a 3 punti**: calcola origini `BASE_DATA` e `TOOL_DATA` e angoli di Eulero (A, B, C) da punti di calibrazione misurati.
* **Inserimento diretto in `.dat`**: inserisci i frame calcolati nei file dati con un clic.
* **Zero errori di trigonometria**: elimina fogli di calcolo e matematica manuale dell'orientamento in officina.

<p align="center">
  <img src="docs/public/media/kuka_control_center.gif" width="720" alt="KUKA Control Center Demo" />
</p>

---

### 6. 🔍 Hint inline dei segnali e mappatura commenti PLC
*Comprendi la logica I/O a colpo d'occhio senza sfogliare gli schemi elettrici.*
* Legge le definizioni dei segnali direttamente da `$config.dat` e `kuka_signals.json`.
* Mostra etichette leggibili accanto a `$IN[x]`, `$OUT[y]`, `$ANIN[z]` e `$FLAG[k]`.

<p align="center">
  <img src="docs/public/media/inlay_hints.gif" width="720" alt="Signal Inlay Hints Demo" />
</p>

---

### 7. ⚡ Formattatore automatico del codice e allineamento matrici
*Trasforma il codice scritto a mano in codice industriale pulito e standardizzato con un solo tasto (`Shift+Alt+F`).*
* Indentazione standard KUKA a 3 spazi.
* Allinea gli operatori `=` nei file `.dat` per matrici di coordinate leggibili.
* Normalizzazione maiuscole/minuscole per le parole chiave KRL (`DEF`, `GLOBAL`, `INTERRUPT`, `CONTINUE`).

<p align="center">
  <img src="docs/public/media/code_formatter.gif" width="720" alt="Code Formatter Demo" />
</p>

---

### 8. 🏭 Integrazione ufficiale kernel KUKA.Sim 4.10 e 957+ variabili di sistema
*Specifiche industriali autentiche estratte direttamente da KUKA.Sim 4.10, WorkVisual e dal runtime dei controllori KRC.*
* **957 variabili di sistema**: copertura esaustiva delle variabili KSS 8.3–8.7/9.0 (`$ACC`, `$TOOL`, `$BASE`, `$POS_ACT`, `$VEL_AXIS`, ecc.) con unità fisiche, limiti degli array (217 array) e stati di sola lettura.
* **116 funzioni di sistema integrate e Wonderlib**: pieno supporto runtime per cinematica (`FORWARD`, `INVERSE`, `INV_POS`, `TOOL_ADJ`), manipolazione stringhe, conversione tipi, dialoghi messaggi, limiti di coppia e routine Wonderlib con `signatureHelp` in tempo reale.
* **111 strutture e 112 ENUM (443 letterali)**: completamento intelligente con punto (`$TOOL.`, `$ACC.`, `POINT.`) e autocompletamento letterali enum `#` (`#AUT`, `#T1`, `#P_FREE`, `#QUIT`).
* **23 snippet ufficiali di forme inline KUKA (34 template)**: template autentici Kuka Roboter GmbH (`ptpi`, `slini`, `sptpi`, `scirc`, `PTPCo`, `ptprel`, `trigdist`, `sigin`, `wsec`, `Forr`) con intestazioni complete (`;FOLD ... ;%{PE}`).
* **Matrice compilatore a 451 parole chiave**: integrazione diretta delle regole `keyword.h` C++ di KUKA — zero falsi positivi di sintassi.
* **Sintassi hex/binaria tra apici singoli**: piena conformità parser e diagnostica per `'B000001'` (binario), `'HFF'` (esadecimale) e letterali carattere.
* **Audit flotta zero falsi positivi (4.1M+ righe)**: verificato su 107 backup reali di robot in produzione con 0 diagnosi false.

<p align="center">
  <img src="docs/public/media/smart_autocomplete.gif" width="720" alt="Smart Autocomplete Demo" />
</p>

---

### 9. 🔎 Vai alla definizione e trova tutti i riferimenti
*Indicizzazione istantanea a livello AST su tutta la cartella del progetto.* Salta da qualsiasi chiamata di funzione o variabile direttamente alla sua dichiarazione tra file `.src` e `.dat` separati.

<p align="center">
  <img src="docs/public/media/goto_definition.gif" width="720" alt="Go to Definition Demo" />
</p>

---

### 10. ℹ️ Documentazione hover completa e stato lettura/scrittura
*Spiegazioni dei parametri e avvisi di sicurezza istantanei.* Passa il mouse su qualsiasi variabile di sistema KSS per vedere unità fisiche, permessi di lettura/scrittura e descrizioni dai manuali KSS.

<p align="center">
  <img src="docs/public/media/hover_info.gif" width="720" alt="Hover Info Demo" />
</p>

---

### 11. 🧹 Pulizia metadati Git e stripper intestazioni WorkVisual
*Mantieni pulito il controllo di versione.* Rimuovi le intestazioni WorkVisual (`&ACCESS`, `&REL`, `&PARAM`, `&COMMENT`) con un clic per evitare diff Git rumorosi nei commit automatici.

<p align="center">
  <img src="docs/public/media/git_metadata_cleaner.gif" width="720" alt="Git Metadata Cleaner Demo" />
</p>

---

### 12. ⚙️ KRL moderno e suite FOLD iiQKA
*Aggiorna il codice agli standard KUKA moderni con un clic.*
* **Converti selezione in FOLD iiQKA (`krl.wrapIiQkaFold`)**: avvolgi la logica personalizzata in blocchi pieghevoli standard iiQKA.
* **Converti in blocco Spline (`krl.wrapSplineBlock`)**: avvolgi i movimenti lineari e circolari in blocchi `SPLINE` / `ENDSPLINE` ad alte prestazioni per KSS 8.3–8.7.
* **Iniettore di protezione collisioni (`krl.insertCollisionGuard`)**: inietta automaticamente frame di monitoraggio coppia `$TORQMON` attorno alle zone di movimento critiche.
* **Pulisci e apri FOLD (`krl.cleanUnwrapFolds`)**: apri in sicurezza le Inline Form obsolete preservando le istruzioni di movimento interne.

---

### 13. 💬 Gateway di supporto live e telepresenza remota
*Chat di supporto bidirezionale diretta con gli sviluppatori dentro VS Code.*
* **Pannello chat interattivo**: sincronizzazione istantanea dei thread del forum con il supporto tecnico.
* **Smart Diff & Apply**: revisione con un clic e applicazione automatica delle correzioni suggerite dal supporto tecnico.
* **Telepresenza remota e diagnostica**: comandi telemetria sicuri opzionali (`/ai_diag`, `/logs`, `/sysinfo`, `/ping`) per assistenza rapida in messa in servizio.

---

### 14. 🗂️ Barra FOLD rapida e ordinamento dichiarazioni
*Gestisci programmi enormi con facilità.* Piegatura con un clic dei blocchi FOLD, delle subroutine e ordinamento automatico delle dichiarazioni di variabili.

<p align="center">
  <img src="docs/public/media/quick_fold_toolbar.gif" width="720" alt="Quick Fold Toolbar Demo" />
</p>

---

### 15. 💀 Analisi codice morto e funzioni globali inutilizzate
*Previeni il rigonfiamento del codice e le routine di test residue.* Identifica subroutine mai chiamate, variabili inutilizzate e rami di codice irraggiungibili in tutto il workspace.

<p align="center">
  <img src="docs/public/media/dead-code-demo.gif" width="720" alt="Dead Code Analysis Demo" />
</p>

---

### 16. 🎨 Palette sintattica autentica KUKA.Sim e WorkVisual e libreria di sistema KSS 8.7
*Palette colori ricca e contesto di sistema standard estratti direttamente da KUKA.Sim 4.10.*
* **Palette ad alto contrasto diversificata**: schemi colore 100% autentici da KUKA.Sim (`KRLDark.xshd`) e WorkVisual (`KRL.xshd`). Scope differenziati per comandi di movimento (grassetto), operatori bitwise/logici, simboli matematici, direttive di sistema (`&ACCESS`, `&REL`) e numeri esadecimali/binari (`'H...'`, `'B...'`).
* **Libreria di sistema standard KSS 8.7**: definizioni integrate, aiuto parametri e `F12` (Vai alla definizione) per `BAS()`, `MsgNotify()`, `MsgQuit()`, `MsgDialog()`, `USE_CM_PRO_VALUES()`, `TOOL_NAME[]` e `BASE_NAME[]` — direttamente ai moduli di riferimento ufficiali KSS 8.7.
* **Scaffolding progetto KRC in 1 clic (`krl.scaffoldKrcFiles`)**: crea automaticamente l'albero standard `KRC/R1/System/`, `KRC/R1/Program/` e `KRC/R1/TP/` popolato con `$config.dat`, `bas.src`, `MsgLib.src`, `collmonlib.src` e `sps.sub`.
* **Valori di fabbrica e limitatore Advance Run**: visualizzazione hover istantanea dei valori di fabbrica ufficiali (`operate.defaultvalues`) per `$ADVANCE = 3`, `$VEL.CP = 2.0 m/s`, `$ACC.CP = 2.3 m/s²`, `$JERK.CP = 500.0 m/s³` e avvisi lint automatici quando `$ADVANCE` supera l'intervallo valido `0..5`.

---

## 📊 Matrice di confronto funzionalità (50 strumenti industriali)

| Funzionalità | Community (gratis) | Pro Industrial | Beneficio per gli ingegneri |
|:---|:---:|:---:|:---|
| **Evidenziazione sintassi KRL** (`.src`, `.dat`, `.sub`, `.kfd`) | ✅ | ✅ | Colorazione AST completa con la palette diversificata KUKA.Sim |
| **Temi KUKA.Sim 4.10 e WorkVisual** | ✅ | ✅ | Schemi colore AvalonEdit autentici (scuri e chiari) |
| **Autocompletamento intelligente e specifiche kernel** (957+ variabili, 116 funzioni, 111 strutture) | ✅ | ✅ | Kernel ufficiale KUKA.Sim 4.10 con aiuto firme |
| **Libreria di sistema standard KSS 8.7 e definizione F12** | ✅ | ✅ | Salto F12 istantaneo a `bas.src`, `MsgLib.src`, `$config.dat` |
| **Scaffolding progetto KRC in 1 clic** | ✅ | ✅ | Inizializza la struttura standard `KRC/R1/System` |
| **Hover valori di fabbrica e limitatore $ADVANCE** | ✅ | ✅ | Mostra i valori di fabbrica e avvisa se `$ADVANCE > 5` |
| **23 snippet ufficiali di forme inline** (34 template di movimento e logica) | ✅ | ✅ | Template completi `;FOLD ... ;%{PE}` da KUKA Roboter GmbH |
| **Hint inline segnali e documentazione hover** | ✅ | ✅ | Etichette segnali PLC inline e firme dei parametri |
| **Formattatore codice e allineamento matrici** | ✅ | ✅ | Pulizia istantanea con 1 clic (`Shift+Alt+F`) |
| **Blame per riga GitLens e cronologia revisioni** | ✅ | ✅ | Tracciamento istantaneo autore e commit per ogni punto |
| **Architettura a sei lingue** (EN, DE, IT, ES, RU, TR) | ✅ | ✅ | UI nativa completa, 515 chiavi UI e 1.073 traduzioni della documentazione delle variabili di sistema |
| **Pulizia metadati Git** | ✅ | ✅ | Rimuove le intestazioni WorkVisual per diff Git puliti |
| **Control Center e guida di riferimento a 21 schede** | ✅ | ✅ | Interruttori diagnostici in tempo reale e guida scorciatoie nell'editor |
| **Albero laterale completo di 36 comandi** | ✅ | ✅ | Ogni comando dell'estensione accessibile con 1 clic |
| **Esportazione ZIP nativa del progetto e telepresenza remota** | ✅ | ✅ | Backup completo con 1 clic in Esplora risorse o su Telegram |
| **Integrazione Copilot AI Language Model Tools** | ✅ | ✅ | `krl_safety_check` richiamabile direttamente dall'AI di VS Code |
| **Report di accettazione qualità backup SmartPAD** | ❌ | **✅ Pro** | Audit automatico del progetto con passaporto robot e collegamenti cliccabili |
| **KRL moderno e suite FOLD iiQKA** | ❌ | **✅ Pro** | FOLD iiQKA, blocchi Spline e protezione collisioni |
| **Visualizzatore flowchart interattivo** (Mermaid SVG) | ❌ | **✅ Pro** | Logica del flusso di controllo visiva e salto al codice bidirezionale |
| **Diagnostica rigida bilanciamento blocchi** | ❌ | **✅ Pro** | Cattura i blocchi `IF/LOOP/FOR` non chiusi |
| **Ispettore velocità e sicurezza** ($VEL.CP) | ❌ | **✅ Pro** | Previene pericolosi superamenti di velocità cartesiana |
| **Controllo Tool / Base** | ❌ | **✅ Pro** | Segnala il movimento prima dell'inizializzazione dei frame |
| **Diff backup ZIP SmartPAD e delta punti** | ❌ | **✅ Pro** | Calcola i delta esatti delle coordinate (ΔX, ΔY, ΔZ) |
| **Calcolatrice frame di Eulero a 3 punti** | ❌ | **✅ Pro** | Calcola `BASE_DATA`/`TOOL_DATA` nell'editor |
| **Suite XML EthernetKRL (EKI)** | ❌ | **✅ Pro** | Generatore e validatore di template XML live |
| **Gateway di supporto live e telepresenza remota** | ❌ | **✅ Pro** | Chat helpdesk bidirezionale diretta, Diff & Apply |
| **Controllo codice morto e scope** | ❌ | **✅ Pro** | Trova variabili inutilizzate e subroutine morte |
| **Diagrammi di movimento e generatore spline** | ❌ | **✅ Pro** | Visualizza le curve spline per KSS 8.3+ |
| **Accesso fabbrica 100% offline** | ✅ | **✅ Pro** | Zero internet richiesto in reparto |

---

## 👑 Passa a Pro: prezzi e licenza istantanea

Offriamo licenze flessibili di livello industriale tramite il nostro merchant verificato **Dodo Payments**. Tutte le transazioni sono crittografate e supportano carte di credito, Apple Pay, Google Pay e PayPal in oltre 135 paesi con fatture IVA/imposte automatiche.

### 💳 Piani:

| Piano | Prezzo | Prova / Sconto | Termini licenza | Checkout |
|:---|:---:|:---|:---|:---:|
| 🟢 **Community** | **$0** | Gratis per sempre al 100% | Uso personale e commerciale | [Installa gratis](https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension) |
| ⏱️ **Pro Mensile** | **$9.99** / mese | **Prova gratuita di 14 giorni** ($0.00 oggi) | Tutti i 50 strumenti Pro industriali • 2 postazioni | [Inizia la prova di 14 giorni](https://checkout.dodopayments.com/buy/pdc_0NmAaL3aw5WKbMZgAVCDZ) |
| 👑 **Pro Annuale** | **$79.00** / anno | **Risparmia il 35%** (~$6.58/mese) | Tutti i 50 strumenti Pro • 3 postazioni • Buffer offline 30 giorni | [Ottieni Pro annuale](https://checkout.dodopayments.com/buy/pdc_0NmAaL3aw5WKbMZgAVCDZ) |
| 🏆 **Pro Lifetime** | **$349.00** | **Paga una volta, tuo per sempre** | Tutti i 50 strumenti Pro • 5 postazioni • Aggiornamenti a vita | [Ottieni Pro lifetime](https://checkout.dodopayments.com/buy/pdc_0NmAaL3aw5WKbMZgAVCDZ) |

<div align="center" style="margin: 25px 0;">
  <a href="https://checkout.dodopayments.com/buy/pdc_0NmAaL3aw5WKbMZgAVCDZ" style="text-decoration:none;">
    <kbd style="font-size: 1.25em; padding: 14px 32px; background-color: #FF6600; color: white; border-radius: 10px; font-weight: bold; border: 1px solid #d15500; cursor: pointer; box-shadow: 0 4px 18px rgba(255,102,0,0.4);">
      ⚡ Scegli il piano e inizia la prova gratuita di 14 giorni (Dodo Checkout)
    </kbd>
  </a>
  <p style="margin-top: 10px; font-size: 0.9em; color: #888;">Attivazione istantanea in VS Code con 1 clic • Protezione periodo di grazia 14 giorni • Buffer offline 30 giorni</p>
</div>

---

## 🔒 Periodo di grazia di 14 giorni e garanzia offline-first

Gli ingegneri di messa in servizio lavorano in stabilimenti pieni di interferenze, camere bianche e celle automotive con **connettività di rete pari a zero**.

* 📶 **Buffer offline di 30 giorni**: attiva una volta e lavora completamente offline in reparto fino a 30 giorni senza handshake di rete.
* 🛡️ **Periodo di grazia di 14 giorni**: se un metodo di pagamento internazionale o il rinnovo della carta fallisce temporaneamente mentre sei in cantiere, le funzionalità Pro **non ti bloccheranno mai a metà messa in servizio**. L'estensione offre una finestra di grazia di 14 giorni con intelligenti tentativi automatici in background.

---

## 🛡️ Certificazione di sicurezza enterprise

KUKA KRL Professional è certificato da **ReversingLabs Spectra Assure** con un **punteggio di sicurezza del 100%**:
* 🟢 **0 malware** (ispezione binaria pulita)
* 🟢 **0 vulnerabilità CVE** in tutte le dipendenze
* 🟢 **0 fughe di segreti/token**
* 🟢 **0 indicatori MITRE ATT&CK**

Audit di sicurezza ufficiale: [https://secure.software/vscode/packages/liskinlabs/kuka-krl-extension](https://secure.software/vscode/packages/liskinlabs/kuka-krl-extension)

---

## ⌨️ Scorciatoie da tastiera

| Scorciatoia | Azione | Ambito |
|:---|:---|:---|
| `Shift + Alt + F` | Formatta documento (indentazione KRL a 3 spazi e allineamento matrici) | Editor attivo |
| `Ctrl + Alt + F` | Apri il flowchart interattivo / grafo del flusso di controllo | File `.src` |
| `Ctrl + Alt + D` | Esegui l'ispezione di sicurezza industriale e diagnostica | Workspace |
| `Ctrl + Alt + B` | Apri il diff backup SmartPAD e l'ispettore delta punti | Progetto attivo |
| `Ctrl + Alt + K` | Avvia KUKA Control Center e la matematica dei frame a 3 punti | Editor attivo |
| `Ctrl + Space` | Attiva l'autocompletamento intelligente KSS | Posizione cursore |

---

## ⚙️ Impostazioni di configurazione

Configura il comportamento dell'estensione nel tuo `settings.json`:

| Impostazione | Predefinito | Descrizione |
|:---|:---:|:---|
| `krl.indentWidth` | `3` | Dimensione indentazione (3 spazi è lo standard ufficiale KUKA). |
| `krl.alignAssignments` | `true` | Allinea automaticamente i simboli `=` nei file `.dat` per matrici pulite. |
| `krl.errorLens.enabled` | `true` | Mostra gli errori di diagnostica inline a fine riga. |
| `krl.validateNonAscii` | `true` | Cerca caratteri cirillici/non-ASCII che rompono i vecchi compilatori KSS. |
| `krl.inlayHints.enabled` | `true` | Mostra nomi descrittivi per i segnali I/O inline. |

---

## 🌐 Documentazione e wiki

* 📖 **Documentazione in inglese**: [https://liskinlabs.github.io/kuka-krl-extension/](https://liskinlabs.github.io/kuka-krl-extension/)
* 🇷🇺 **Русская документация и Вики**: [https://liskinlabs.github.io/kuka-krl-extension/ru/](https://liskinlabs.github.io/kuka-krl-extension/ru/)
* 🇹🇷 **Türkçe Dokümantasyon ve Wiki**: [https://liskinlabs.github.io/kuka-krl-extension/tr/](https://liskinlabs.github.io/kuka-krl-extension/tr/)

---

## 📄 Licenza e crediti

* **Editore e sviluppatore**: [Liskin Labs](https://github.com/LiskinLabs) / [Silvestr Liskin](https://www.linkedin.com/in/silvestr-liskin-ab712920b/)
* **Auditor di sicurezza**: [ReversingLabs Spectra Assure](https://secure.software/vscode/packages/liskinlabs/kuka-krl-extension)
* **Merchant ufficiale**: [Dodo Payments](https://dodopayments.com/)
