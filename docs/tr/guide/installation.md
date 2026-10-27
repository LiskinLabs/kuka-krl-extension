# Kurulum ve Ayarlar Kılavuzu

KUKA KRL Professional eklentisini kurmak, yapılandırmak ve çevrimdışı etkinleştirmek için hızlı başlangıç kılavuzu.

---

## 1. VS Code Marketplace Üzerinden Kurulum
1. VS Code'u açın.
2. Eklentiler görünümüne gidin (`Ctrl + Shift + X`).
3. `KUKA KRL Professional` (Liskin Labs) aramasını yapın.
4. **Install** düğmesine tıklayın.

---

## 2. VSIX Dosyası İle Kurulum (Air-Gapped Çevrimdışı Kurulum)
1. Resmi yayın deposundan en güncel `kuka-krl-extension-1.9.8.vsix` paketini indirin.
2. VS Code'da Eklentiler panelinin (`Ctrl + Shift + X`) sağ üst köşesindeki `...` menüsünü tıklayın.
3. **Install from VSIX...** seçeneğini seçip indirilen `.vsix` dosyasını belirleyin.
4. Yeniden başlatma gerektirmez — tüm ayrıştırıcılar ve dil sunucuları derhal devreye girer.

---

## 3. KUKA Teması Seçimi
1. `Ctrl + K`, ardından `Ctrl + T` tuşlarına basın.
2. 6 özel mühendislik temasından birini seçin:
   * **Industrial Dark** (fabrika aydınlatması için yüksek kontrastlı karanlık tema)
   * **WorkVisual Dark** (KUKA WorkVisual ortam renkleri)
   * **WorkVisual Light** (gündüz kullanımına uygun açık renk paleti)
   * **Midnight OLED** (maksimum OLED enerji tasarrufu sağlayan derin siyah)
   * **Blueprint** (mühendislik CAD şematik stili)
   * **Industrial Light** (klasik açık tema)

---

## 4. Çevrimiçi Pro Lisansı Etkinleştirme
1. Activity Bar'daki KUKA simgesine tıklayarak veya `KRL: Open Control Center` (`Ctrl + Shift + P`) komutunu çalıştırarak **KUKA Control Center**'ı açın.
2. Başlıktaki **Enter License Key** düğmesine tıklayın.
3. Dodo Payments lisans anahtarınızı yapıştırın ve onaylayın. Eklenti ağ üzerinden doğrulamayı tamamlayıp PRO modunu etkinleştirir.

---

## 5. İzole Fabrika Ağlarında Çevrimdışı Etkinleştirme (Air-Gap .lic Dosya Değişimi)

İnternet bağlantısı bulunmayan otomotiv fabrikaları ve kapalı OT ağları için Ed25519 asimetrik şifrelemeli `.lic` dosya protokolü desteklenir:

### Adım 1: Donanım Kimliği İstek Dosyasını (.lic) Dışa Aktarma
1. Çevrimdışı mühendislik bilgisayarınızda **KUKA Control Center** -> **Ayarlar ve Hesap** sekmesine gidin.
2. **Air-Gapped Offline Activation** bölümünde **[Donanım Kimliği İsteğini Dosyaya Aktar (.lic)]** düğmesine tıklayın veya komut paletinden `krl.exportHardwareIdFile` komutunu çalıştırın.
3. Oluşturulan `liskin-hardware-id.lic` dosyasını güvenli bir USB belleğe kaydedin.

### Adım 2: Çevrimiçi Web Portalında Lisans Üretme
1. USB belleği internete bağlı bir bilgisayara takın.
2. Liskin Labs güvenli etkinleştirme kapısına gidin:  
   👉 **[Air-Gap Çevrimdışı Lisans Portalı](https://kuka-krl-support-gateway.redminotpro5.workers.dev/airgap)**
3. `liskin-hardware-id.lic` dosyanızı yükleme alanına sürükleyin — donanım parmak izi otomatik olarak doldurulacaktır.
4. Lisans Anahtarınızı girin ve **Çevrimdışı Lisans Oluştur** düğmesine basın.
5. İmzalanan `liskin-krl-license.lic` dosyasını USB belleğe indirin.

### Adım 3: Lisans Dosyasını VS Code'a İçe Aktarma
1. Fabrikadaki çevrimdışı iş istasyonunuza geri dönün.
2. KUKA Control Center'da **[Çevrimdışı Lisans Dosyası Yükle (.lic)]** düğmesine tıklayın veya `krl.importOfflineLicenseFile` komutunu çalıştırın.
3. `liskin-krl-license.lic` dosyasını seçin.
4. Eklenti Ed25519 asimetrik imzasını ağ gereksinimi olmadan derhal doğrular ve 50'den fazla endüstriyel Pro modülünü kalıcı olarak açar.

---

## 6. Lisans Planları ve Mimarisi

| Plan | Fiyat | Cihaz Aktivasyonu | Temel Farklılaştırıcı |
| :--- | :--- | :--- | :--- |
| **Engineer Pro (Aylık)** | $19 / ay | 1 İş İstasyonu | KRC2/KRC4/KRC5 desteği, kısa vadeli devreye alma projeleri |
| **Engineer Pro (Yıllık)** | $149 / yıl | 1 İş İstasyonu | %35 tasarruf, 1 Yıllık Air-Gapped çevrimdışı sertifika, 50 endüstriyel araç |
| **Engineer Pro (Ömür Boyu)** | $699 tek seferlik | 1 İş İstasyonu | Kalıcı lisans, ömür boyu güncellemeler, kalıcı Air-Gapped sertifika |
| **Team Edition** | $499 / yıl | 5 İş İstasyonuna Kadar | Merkezi B2B fatura, 5 fabrika/ofis cihazı, KRC2–KRC5 |
| **Department / Integrator** | $999 / yıl | 20 İş İstasyonuna Kadar | 20 iş istasyonuna kadar, sınırsız entegrasyon projesi |
| **Kurumsal Fabrika (Site)** | $4,999 / yıl | 100 İş İstasyonuna Kadar | 100 tesis iş istasyonu, 4 saatlik katı SLA, çevrimdışı Air-Gap lisansı |

### Pro Lifetime ($699) vs Enterprise Site ($4,999/yıl)
- **Pro Lifetime ($699 tek seferlik)**: 1 iş istasyonu için ömür boyu geçerli, aboneliksiz kalıcı lisanstır. İzole fabrika ağlarında internet olmadan çalışmak üzere kişisel kriptografik Air-Gapped `.lic` dosyası üretimini destekler.
- **Enterprise Site ($4,999/yıl)**: Tüm üretim tesisi veya sistem entegratörü için 100 cihaza kadar kurumsal fabrika lisansıdır. KUKA Filo Yedekleme Merkezi ve OEM markalı müşteri kabul raporlarını içerir.
