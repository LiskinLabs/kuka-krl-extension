# Nokta Tablosu Motoru ve .DAT Dosya Senkronizasyonu

Uzamsal nokta koordinatlarının yönetimi, veri yapısı otomatik senkronizasyonu ve kinematik dönüşümler.

---

## Genel Bakış

KRL mimarisinde `.src` program dosyalarındaki hareket komutları, eşlik eden `.dat` dosyalarında bildirilen uzamsal koordinat yapılarına (`E6POS`, `POS`, `FRAME`, `E6AXIS`) ve teknolojik parametrelere (`FDAT`, `PDAT`, `LDAT`) başvurur.

Saha devreye alma süreçlerinde `.src` ve `.dat` arasındaki manuel senkronizasyon genellikle KSS derleyici hatalarına (`Değişken bildirilmedi`) yol açar.

**Nokta Tablosu ve Otomatik Senkronizasyon** (`krl.syncPointsToDat`, `krl.batchShiftPoints`, `krl.mirrorTrajectory`), tam veri bütünlüğü, kullanılmayan noktaların tespiti ve 6D geometrik hesaplamalar sağlar.

---

## Temel Özellikler

### 1. .DAT İçinde Noktaları Otomatik Eşitleme (`krl.syncPointsToDat`)
* **AST Hareket Tarayıcısı**: Aktif `.src` dosyasındaki tüm hareket komutlarını (`PTP`, `LIN`, `CIRC`, `SPTP`, `SLIN`, `SCIRC`) ve Inline Form başlıklarını (`PDAT_ACT`, `FDAT_ACT`, `LDAT_ACT`) tarar.
* **Otomatik .DAT Oluşturma**: Veri dosyası mevcut değilse otomatik olarak geçerli `DEFDAT <MODULE> PUBLIC` yapısı oluşturur.
* **Güvenli Bildirim Ekleme**: Öğretilmiş koordinatları değiştirmeden eksik bildirimleri (`DECL E6POS`, `DECL FDAT`, `DECL PDAT`, `DECL LDAT`) `ENDDAT` öncesinde `;FOLD Auto-Synchronized Points` içine ekler.

### 2. Nokta Tablosu Bölünmüş Görünümü (Split View)
* `.src` hareket komutlarını ve eşleşen `.dat` koordinatlarını aynı anda yan yana görüntüleme ve düzenleme.

### 3. Kullanılmayan Yetim Nokta Tespiti
* `.dat` dosyasında tanımlı ancak program kodunda hiçbir zaman çağrılmayan koordinatları bularak bellek temizliği yapma.

### 4. SVD Kabsch Metodu ile Taban ve Takım Kalibrasyonu
* Fiziksel olarak ölçülen referans noktalarından Tekil Değer Ayrışımı (SVD) ile `TOOL_DATA` ve `BASE_DATA` matrislerini yüksek hassasiyetle hesaplama.

### 5. 6D Yörünge Aynalama ve Toplu Öteleme
* **Yörünge Aynalama (`krl.mirrorTrajectory`)**: X, Y, Z düzlemlerine göre yörüngeleri durum ve dönüş ($A_1..A_6$) bitleriyle birlikte aynalama.
* **Toplu Nokta Kaydırma (`krl.batchShiftPoints`)**: Fikstür veya takım değişikliklerinde noktaları yeniden öğretmeden 6D uzamsal öteleme.
