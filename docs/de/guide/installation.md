# Installations- und Einrichtungsleitfaden

Schnellstartanleitung zur Installation, Konfiguration und Offline-Aktivierung von KUKA KRL Professional.

---

## 1. Installation über den VS Code Marketplace
1. Öffnen Sie VS Code.
2. Gehen Sie zur Ansicht "Erweiterungen" (`Ctrl + Shift + X`).
3. Suchen Sie nach `KUKA KRL Professional` (Liskin Labs).
4. Klicken Sie auf **Installieren**.

---

## 2. Installation aus VSIX-Datei (Air-Gapped Offline-Installation)
1. Laden Sie das neueste Paket `kuka-krl-extension-1.9.8.vsix` aus dem offiziellen Release-Repository herunter.
2. Klicken Sie im Erweiterungsbereich von VS Code (`Ctrl + Shift + X`) auf das Drei-Punkte-Menü `...` oben rechts.
3. Wählen Sie **Aus VSIX installieren...** und wählen Sie die `.vsix`-Datei aus.
4. Kein Editor-Neustart erforderlich — alle Sprachserver und Parser starten sofort.

---

## 3. KUKA-Farbthema auswählen
1. Drücken Sie `Ctrl + K`, dann `Ctrl + T`.
2. Wählen Sie eines der 6 technischen Themes:
   * **Industrial Dark** (kontraststarkes dunkles Theme für Industriehallen)
   * **WorkVisual Dark** (KUKA WorkVisual-Farbpalette)
   * **WorkVisual Light** (Tageslicht-WorkVisual-Design)
   * **Midnight OLED** (tiefes Schwarz für OLED-Stromersparnis)
   * **Blueprint** (technischer CAD-Schaltplanstil)
   * **Industrial Light** (klassisches helles Industriedesign)

---

## 4. Online Pro-Lizenz aktivieren
1. Öffnen Sie das **KUKA Control Center**, indem Sie auf das KUKA-Symbol in der Aktivitätsleiste klicken oder `KRL: Open Control Center` (`Ctrl + Shift + P`) ausführen.
2. Klicken Sie auf **Enter License Key**.
3. Fügen Sie Ihren Lizenzschlüssel von Dodo Payments ein und bestätigen Sie die Eingabe.

---

## 5. Offline-Aktivierung in isolierten Fabriknetzwerken (Air-Gap .lic)

Für sicherheitskritische Produktionsanlagen ohne Internetverbindung wird der asymmetrische kryptografische Lizenzaustausch (Ed25519) mittels `.lic`-Dateien unterstützt:

### Schritt 1: Hardware-ID-Anforderungsdatei (.lic) exportieren
1. Öffnen Sie auf dem Offline-Programmierlaptop **KUKA Control Center** -> Reiter **Einstellungen & Konto** (`Settings & Account`).
2. Klicken Sie im Bereich **Air-Gapped Offline Activation** auf **[Hardware-ID-Anforderung exportieren (.lic)]** oder führen Sie `krl.exportHardwareIdFile` aus.
3. Speichern Sie die Datei `liskin-hardware-id.lic` auf einem USB-Stick.

### Schritt 2: Signierte Lizenz im Webportal generieren
1. Schließen Sie den USB-Stick an einen PC mit Internetzugang an.
2. Rufen Sie das Liskin Labs-Aktivierungsportal auf:  
   👉 **[Air-Gap Offline-Lizenzportal](https://kuka-krl-support-gateway.redminotpro5.workers.dev/airgap)**
3. Ziehen Sie Ihre Datei `liskin-hardware-id.lic` in das Upload-Feld — der Hardware-Fingerabdruck wird automatisch eingetragen.
4. Geben Sie Ihren Lizenzschlüssel ein und klicken Sie auf **Offline-Lizenz generieren**.
5. Laden Sie die signierte Datei `liskin-krl-license.lic` auf den USB-Stick herunter.

### Schritt 3: Lizenzdatei in VS Code importieren
1. Kehren Sie zum Offline-Laptop im Werk zurück.
2. Klicken Sie im KUKA Control Center auf **[Offline-Lizenzdatei laden (.lic)]** oder führen Sie `krl.importOfflineLicenseFile` aus.
3. Wählen Sie die Datei `liskin-krl-license.lic` aus.
4. Die Ed25519-Signatur wird sofort offline geprüft und schaltet dauerhaft alle 50+ PRO-Funktionen frei.

---

## 6. Lizenzierungsmodelle & Preise

| Tarif | Preis | Arbeitsplatz-Aktivierungen | Hauptmerkmale |
| :--- | :--- | :--- | :--- |
| **Engineer Pro (Monatlich)** | $19 / Monat | 1 Arbeitsplatz | KRC2/KRC4/KRC5-Unterstützung, Inbetriebnahme-Sprints |
| **Engineer Pro (Jährlich)** | $149 / Jahr | 1 Arbeitsplatz | 35% Ersparnis, 1 Jahr Air-Gapped Offline-Zertifikat, 50 Werkzeuge |
| **Engineer Pro (Lifetime)** | $699 einmalig | 1 Arbeitsplatz | Dauerhafte Einzellizenz, lebenslange Updates, permanentes Air-Gap-Zertifikat |
| **Team Edition** | $499 / Jahr | Bis zu 5 Arbeitsplätze | B2B-Rechnung, 5 Arbeitsplätze Werk/Büro, KRC2–KRC5 |
| **Department / Integrator** | $999 / Jahr | Bis zu 20 Arbeitsplätze | Bis zu 20 Arbeitsplätze, unbegrenzte Integrationsprojekte |
| **Enterprise Plant Site** | $4.999 / Jahr | Bis zu 100 Arbeitsplätze | 100 Werksarbeitsplätze, 4h-SLA, Offline Air-Gap-Lizenz, OEM-Prüfprotokolle |
