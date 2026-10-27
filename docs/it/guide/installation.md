# Guida all'Installazione e Configurazione

Guida rapida per l'installazione, la configurazione e l'attivazione offline di KUKA KRL Professional.

---

## 1. Installazione tramite VS Code Marketplace
1. Apri VS Code.
2. Vai alla vista Estensioni (`Ctrl + Shift + X`).
3. Cerca `KUKA KRL Professional` (Liskin Labs).
4. Fai clic su **Installa**.

---

## 2. Installazione da file VSIX (Installazione Offline Air-Gapped)
1. Scarica il pacchetto `kuka-krl-extension-1.9.8.vsix` dal repository ufficiale dei rilasci.
2. Nel pannello Estensioni di VS Code (`Ctrl + Shift + X`), fai clic sul menu `...` in alto a destra.
3. Seleziona **Installa da VSIX...** e scegli il file `.vsix`.
4. Nessun riavvio dell'editor richiesto — tutti i parser e i language server si avviano immediatamente.

---

## 3. Selezione del tema KUKA
1. Premi `Ctrl + K`, quindi `Ctrl + T`.
2. Seleziona uno dei 6 temi ingegneristici:
   * **Industrial Dark** (alto contrasto per impianti industriali)
   * **WorkVisual Dark** (tavolozza colori KUKA WorkVisual)
   * **WorkVisual Light** (tavolozza diurna WorkVisual)
   * **Midnight OLED** (nero puro per risparmio energetico su schermi OLED)
   * **Blueprint** (stile schema tecnico CAD)
   * **Industrial Light** (classico tema chiaro)

---

## 4. Attivazione online della licenza Pro
1. Apri **KUKA Control Center** facendo clic sull'icona KUKA nella barra delle attività o eseguendo `KRL: Open Control Center` (`Ctrl + Shift + P`).
2. Fai clic su **Enter License Key**.
3. Incolla la chiave di licenza di Dodo Payments e conferma l'attivazione.

---

## 5. Attivazione offline in reti industriali isolate (Air-Gap .lic)

Per gli stabilimenti automobilistici e le reti industriali isolate prive di connessione Internet, è supportato lo scambio sicuro di file `.lic` con crittografia asimmetrica Ed25519:

### Passo 1: Esportazione richiesta Hardware ID (.lic)
1. Sul portatile da cantiere isolato, apri **KUKA Control Center** -> scheda **Impostazioni e Account** (`Settings & Account`).
2. Nella sezione **Air-Gapped Offline Activation**, fai clic su **[Esporta richiesta Hardware ID (.lic)]** o esegui `krl.exportHardwareIdFile`.
3. Salva il file `liskin-hardware-id.lic` su una chiavetta USB affidabile.

### Passo 2: Generazione licenza sul portale web
1. Collega la chiavetta USB a un computer connesso a Internet.
2. Accedi al portale di attivazione Liskin Labs:  
   👉 **[Portale Licenze Air-Gap](https://kuka-krl-support-gateway.redminotpro5.workers.dev/airgap)**
3. Trascina il file `liskin-hardware-id.lic` nell'area di caricamento — l'ID hardware verrà compilato automaticamente.
4. Inserisci la tua chiave di licenza e fai clic su **Genera licenza offline**.
5. Scarica il file firmato `liskin-krl-license.lic` sulla chiavetta USB.

### Passo 3: Importazione file di licenza in VS Code
1. Torna alla postazione di lavoro isolata in fabbrica.
2. In KUKA Control Center, fai clic su **[Carica file licenza offline (.lic)]** o esegui `krl.importOfflineLicenseFile`.
3. Seleziona il file `liskin-krl-license.lic`.
4. La firma crittografica Ed25519 viene convalidata istantaneamente offline, sbloccando tutte le oltre 50 funzioni PRO.

---

## 6. Piani di Licenza e Prezzi

| Piano | Prezzo | Postazioni Attivate | Differenziatore Chiave |
| :--- | :--- | :--- | :--- |
| **Engineer Pro (Mensile)** | $19 / mese | 1 Postazione | Supporto KRC2/KRC4/KRC5, collaudi e brevi progetti |
| **Engineer Pro (Annuale)** | $149 / anno | 1 Postazione | Risparmio del 35%, certificato offline Air-Gap per 1 anno, 50 strumenti |
| **Engineer Pro (Lifetime)** | $699 una tantum | 1 Postazione | Licenza perpetua, aggiornamenti a vita, certificato Air-Gap permanente |
| **Team Edition** | $499 / anno | Fino a 5 Postazioni | Fatturazione B2B centralizzata, 5 postazioni stabilimento/ufficio, KRC2–KRC5 |
| **Department / Integrator** | $999 / anno | Fino a 20 Postazioni | Fino a 20 postazioni di lavoro, progetti di integrazione illimitati |
| **Enterprise Plant Site** | $4,999 / anno | Fino a 100 Postazioni | 100 postazioni di fabbrica, SLA rigoroso di 4 ore, licenza Air-Gap, protocolli OEM |
