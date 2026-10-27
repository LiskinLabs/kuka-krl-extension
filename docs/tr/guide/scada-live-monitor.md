# Endüstriyel SCADA ve Gerçek Zamanlı Kontrolör İzleyici

KUKA KRC2, KRC4 ve KRC5 sistemleri için gerçek zamanlı telemetri ve çevrimiçi kontrolör köprüsü.

---

## Genel Bakış

**Endüstriyel SCADA Canlı İzleyici** (`krl.connectKukaRobot`, `krl.openLiveBridge`), VS Code ile KSS 5.x–8.7+ ve iiQKA 9.x çalıştıran fiziksel KUKA robot kontrolörleri arasında doğrudan, yüksek frekanslı bir Ethernet bağlantısı kurar.

Fabrika sahası telemetrisini, 6 eksenli motor tork geri bildirimini, Kartezyen TCP takibini, 4096 pinli G/Ç (I/O) matrisini ve çok dilli SmartPAD alarmlarını doğrudan mühendislik ortamınıza taşır.

---

## Mimari ve İletişim Protokolleri

SCADA izleyici dayanıklı bir çift sürücülü iletişim mimarisi kullanır:

1. **WCF OnlineServices**: KRC4/KRC5 smartHMI platformlarında çalışan yerel şifreli Windows hizmeti. Sistem durumuna, kontrolör opsiyon paketlerine ve dosya sistemi arşivlerine kimlik doğrulamalı erişim sağlar.
2. **KUKAVARPROXY (Port 7000)**: Gerçek zamanlı kinematik ve G/Ç kanalları için yüksek frekanslı döngüsel sorgulama sunan ultra düşük gecikmeli değişken köprüsü.
3. **CrossComm (WinGate Port 49000)**: KRC2 ve eski KRC4 kontrolörleri için çapraz iletişim sürücüsü.

---

## Temel Yetenekler

### 1. Gerçek Zamanlı 6 Eksenli Telemetri Göstergeleri
* **Canlı Eksen Takibi**: A1–A6 eksenleri için `$AXIS_ACT` ve `$AXIS_MOT` gerçek zamanlı okuması.
* **Tork Yükü ve Hız Çubukları**: Mevcut motor torklarını `$TORQMON` sınırlarına göre dinamik göstererek eksen aşırı yüklenmelerini önceden tespit etme.
* **Yumuşak Limit Uyarıları**: Eksenler fiziksel limitlere (`$SOFTP_END`, `$SOFTN_END`) yaklaştığında renk kodlu yakınlık uyarıları.

### 2. Kartezyen TCP Konumu ve Koordinat Çerçeveleri
* **Mevcut TCP Okuması**: X, Y, Z milimetre koordinatları ve Euler yönelim açıları A, B, C ile gerçek zamanlı konum takibi (`$POS_ACT`).
* **Aktif Koordinat Durumu**: Yüklü `$TOOL` (Takım Numarası ve boyutları) ve `$BASE` (İş parçası referansı) bilgilerini canlı görüntüleme.

### 3. Dinamik Dijital ve Analog G/Ç Matrisi
* **4096 Pinli Ayrık Izgara**: `$IN[1..4096]` ve `$OUT[1..4096]` kanalları için görsel durum matrisi.
* **Dahili Bayraklar ve Zamanlayıcılar**: `$FLAG[1..1024]` ve `$TIMER[1..64]` durumlarının canlı denetimi.

### 4. SmartPAD Alarmları ve Çok Dilli Altyazılar
* Kontrolör hata kodlarını (örn. `KSS00203`, `KSS01442`) anında Türkçe, İngilizce, Almanca ve Rusça açıklamalarla görüntüleme.
