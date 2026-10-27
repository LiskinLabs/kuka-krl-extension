# KUKA.RSI Gerçek Zamanlı ve CAM G-Code / SVG İçe Aktarıcı

Katı gerçek zamanlı sensör kontrolü (4 ms IPO döngüsü) ve CNC G-Code / 2D vektörlerden otomatik KRL yörünge üretimi.

---

## Genel Bakış

Lazer kesim, frezeleme, ark kaynağı ve mastik uygulama gibi yüksek hassasiyetli işlemler, harici sensörlerin gerçek zamanlı entegrasyonunu ve CAD sistemlerinden karmaşık eğrilerin aktarılmasını gerektirir.

**KUKA.RSI Real-Time Suite** (`krl.validateRsiXml`, `krl.generateRsiCode`) 4 ms / 12 ms döngülerini otomatikleştirirken, **CAM Tooling Suite** (`krl.importGcodeToKrl`, `krl.generateVisionCalibration`, `krl.exportPlcTags`) CNC ve vektör çizimlerini doğrudan KRL koduna dönüştürür.

---

## KUKA.RSI (RobotSensorInterface) Paketi

* **Katı Gerçek Zamanlı Kontrol**: `#IPO_FAST` (4 ms / 250 Hz) ve `#IPO` (12 ms / 83 Hz) çevrim desteği.
* **XML Şema Doğrulayıcısı (`krl.validateRsiXml`)**: `SensorInterface/*.xml` yapılarını, soket parametrelerini ve veri tiplerini denetleme.
* **Gerçek Zamanlı Sürücü Üreticisi (`krl.generateRsiCode`)**:
  - **Kartezyen Düzeltme (`#POSCORR`)**: Dikiş izleme ve kuvvet-tork sensörleri için.
  - **Eksenel Düzeltme (`#AXISCORR`)**: ROS 2 (`kuka_rsi_driver`) eksen kontrolü için.

---

## CAM CNC G-Code ve SVG Vektör İçe Aktarıcısı (`krl.importGcodeToKrl`)

* **ISO G-Code Dönüştürme**: `G0` $\rightarrow$ `PTP`, `G1` $\rightarrow$ `LIN`, `G2`/`G3` dairesel hareketlerini `CIRC` komutuna çevirme ve `I, J` parametrelerinden ara yay noktasını (`XAUX`) hesaplama. İlerleme hızını `$VEL.CP` (m/s) değerine ve M kodlarını (`M3`, `M5`) çıkışlara bağlama.
* **SVG Vektör İçe Aktarma**: `<path>`, `<polyline>`, `<polygon>`, `<circle>` elemanlarını Bezier yaklaşımıyla işleme, güvenli yaklaşma `Z_Safe` ve işleme `Z_Work` düzlemlerini oluşturma.

---

## Görsel El-Göz (Hand-Eye) Kalibrasyon Sihirbazı (`krl.generateVisionCalibration`)

* **9 Pozlu Kalibrasyon Piramidi**: `Eye-in-Hand` ve `Eye-to-Hand` kameralar için dokunma kalibrasyon ızgarası üretir.
* **Euler Açıları Hesaplama**: Kamera optik eksen yönelimini doğrudan KUKA Euler ($A, B, C$) açılarına dönüştürür.
