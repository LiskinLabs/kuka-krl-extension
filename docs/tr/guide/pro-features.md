# 👑 Pro ve Endüstriyel Sürüm Özellikleri

KUKA KRL Professional, robot devreye alma mühendisleri için gelişmiş statik kod analizi, mantık görselleştirme ve güvenlik denetim araçları sunar.

---

### 16. KUKA Control Center Kontrol Paneli
Tüm Pro araçlarına, proje sağlık metriklerine ve lisans yöneticisine 1 tıklamayla erişim sağlayan merkezi Fluent UI kontrol paneli (`krl.openControlCenter`).

![KUKA Control Center Demo](/media/kuka_control_center.gif)

---

### 17. VS Code Telegram Destek Sohbet Paneli
Geri bildirim, günlükler ve sorularınızı doğrudan geliştiriciye iletmek için **`@kukakrlbot`** ile bağlantılı gömülü destek penceresi (`krl.openTelegramChat`).

---

### 18. KRC Yedekleme Farkı ve Nokta Delta Denetçisi
SmartPAD KRC4/KRC5 `.zip` yedek arşivlerini yükler, yerel kodla karşılaştırır ve fiziksel koordinat deltalarını ($\Delta X, \Delta Y, \Delta Z, \Delta A, \Delta B, \Delta C$) hesaplar.

![KRC Yedekleme Farkı](/media/krc_backup_diff.gif)

---

### 19. Etkileşimli Akış Şeması Görüntüleyici (Flowchart)
`.src` program mantığını temiz, tıklanabilir Mermaid SVG kontrol akışı diyagramlarına dönüştürür. Müşteriye teslim belgeleri için SVG dışa aktarma desteği sunar.

![Akış Şeması Görüntüleyici](/media/control_flow_graph.gif)
![Vektör Akış Şeması Örneği](/media/cell_flowchart.svg)

---

### 20. EthernetKRL (EKI) XML Paketi ve Kod Oluşturucu
EthernetKRL XML yapılandırma şemalarını doğrular ve PLC / Kamera entegrasyonu için KRL ağ soketi işleyicilerini (`EKI_Init`, `EKI_Open`, `EKI_Get*`) otomatik olarak üretir.

---

### 21. Endüstriyel Güvenlik ve Hız Teşhisleri
Aşırı hız ($VEL.CP > 3.0$ m/s), başlatılmamış `$TOOL`/`$BASE` hareketleri, sonsuz döngüler ve KRC derleyicisini bozan görünmez ASCII dışı karakterler için otomatik güvenlik denetimi (`KRL: Run Safety Check`).

![Tip ve Güvenlik Doğrulama](/media/type-validation-demo.gif)

---

### 22. 3 Noktalı Frame Hesaplayıcı (BASE & TOOL Math)
3 ölçülen referans noktasından (Orijin, X-Ekseni, XY-Düzlemi) `BASE_DATA[x]` Euler açılarını ($A, B, C$) matematiksel olarak hesaplayan 3D geometrik dönüştürme aracı (`krl.showCalculator`).

---

### 23. Hareket Yörüngesi ve KSS 8.3+ Spline Oluşturucu
`PTP`, `LIN`, `CIRC`, `SPTP`, `SLIN`, `SCIRC` ve `SPLINE Path` blokları için gerçek zamanlı SVG şema diyagramları ve TCP jerk profilleri ile temiz KRL kodu üretir.
