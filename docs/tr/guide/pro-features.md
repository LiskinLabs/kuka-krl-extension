# 👑 Pro ve Endüstriyel Sürüm Özellikleri

Gelişmiş statik kod analizi, mantık görselleştirme, endüstriyel güvenlik uyumluluğu ve filo bakım araçları.

---

### 16. KUKA Control Center Kontrol Paneli (`krl.openControlCenter`)
Tüm Pro tanılarına, yedek analizlerine, yörünge oluşturucularına ve teknik desteğe tek tıkla erişim sağlayan Fluent UI kontrol paneli.

![KUKA Control Center Demo](/media/kuka_control_center.gif)

---

### 17. VS Code Telegram Destek Sohbet Paneli (`krl.openTelegramChat`)
Saha mühendislerinin doğrudan IDE içinden soru sormasını ve geri bildirim iletmesini sağlayan entegre Telegram destek sohbet penceresi.

---

### 18. KRC Filo Yedekleri ve Nokta Delta İnceleyicisi (`krl.compareKrcBackups`)
Fiziksel SmartPAD `.zip` arşivlerini doğrudan karşılaştırır. Nokta versiyonları arasındaki 6 eksenli uzamsal koordinat farklarını ($\Delta X, \Delta Y, \Delta Z, \Delta A, \Delta B, \Delta C$) hesaplar ve güvenlik toleranslarını aşan tehlikeli kaymaları işaretler.

![KRC Backup Diff Demo](/media/krc_backup_diff.gif)

---

### 19. Etkileşimli Hareket Yörüngesi ve Spline Blok Oluşturucu (`krl.insertMotionTrajectory`, `krl.insertSplineBlock`)
Standart ve modern KSS hareketleri (`PTP`, `LIN`, `CIRC`, `SPTP`, `SLIN`, `SCIRC`, `SPLINE Block`) için dinamik SVG vektör yörünge şemaları ve `$SGEAR_JERK` profil doğrulaması içeren görsel oluşturucu.

---

### 20. Yerel Copilot Tarzı Kalıcı AI Fark İncelemesi (`KrlReviewService`)
Yapay zeka refaktörleri için çok dosyalı fark hazırlama sistemi. Değişiklikleri satır içi ve yan yana görüntüleyicilerde sunar, durum çubuğu üzerinden dosya veya blok bazında kabul/reddetme imkanı sağlar (`krl.review.acceptFile`, `krl.review.rejectFile`, `krl.review.acceptHunk`, `krl.review.rejectHunk`).

---

### 21. KSS Spline Kinematik İzolasyonu ve Modern Spline Dönüştürücü (`krl.convertLegacyToSpline`)
Standart klasik hareketler (`PTP`, `LIN`, `CIRC`) ile modern Spline kinematiği (`SPTP`, `SLIN`, `SCIRC`) arasında kesin mimari ayrım. Geçersiz parametre karışımlarını önler ve eski kodları tek tıkla optimize edilmiş Spline bloklarına dönüştürür.

---

### 22. Etkileşimli Akış Şeması Görüntüleyici ve Kontrol Akış Grafiği (`krl.showFlowchart`)
`.src` alt program mantığını gerçek zamanlı etkileşimli Mermaid SVG akış şemalarına dönüştürür. Çift yönlü gezinme (düğüme tıklandığında kod satırına atlama) ve müşteri belgeleri için 1 tıkla vektörel SVG dışa aktarma desteği sunar.

![Control Flow Graph Demo](/media/control_flow_graph.gif)
![Cell Flowchart SVG](/media/cell_flowchart.svg)

---

### 23. EthernetKRL (EKI) Paketi ve Telgraf Oluşturucu (`krl.generateEkiTelegram`)
EKI XML şemalarını doğrular, soket veri paketlerini test eder ve eksiksiz KRL TCP/IP gönderme/alma yordamlarını otomatik üretir.

---

### 24. Endüstriyel Güvenlik ve ISO 13849 Uyumluluk Denetçisi (`krl.runSafetyCheck`)
Başlatılmamış `$TOOL`/`$BASE`, eksik `BAS(#INITMOV, 0)`, zaman aşımı korumasız `WAIT FOR` kilitlenmeleri, dizi sınır aşımları (`TOOL_DATA[16]`), çift kanallı `$SAFEIN` uyumsuzlukları ve gizli yanıltıcı karakterleri denetleyen otomatik müfettiş.

---

### 25. EVT İkili Olay Günlüğü Kod Çözücüsü (`krl.viewEvtLog`)
KSS `.evt` ikili tanısal olay arşivleri için sıfır bağımlılıklı yüksek hızlı kod çözücü. Zaman damgası, önem derecesi ve modül filtreleme seçenekleriyle etkileşimli tablo görünümü sunar.

---

### 26. Sinyal Matrisi ve I/O Elektronik Tablo Görüntüleyicisi (`krl.showIoMatrix`)
Çalışma alanındaki tüm `$IN`, `$OUT`, `$ANIN`, `$ANOUT` sinyallerini haritalandıran etkileşimli çapraz referans tablosu. Yoruma göre filtreleme, eşlenmemiş veya mükerrer kanalları bulma ve CSV/Excel dışa aktarma imkanı.

---

### 27. Hareket Yörüngesi ve Kaynak İstatistikleri Profili (`krl.calculateMotionStats`)
Toplam döngü mesafesini, hareket segmenti sayılarını, kaynak dikiş uzunluklarını ve hız dağılımını hesaplayan kapsamlı yörünge profili çıkarıcı.

---

### 28. 3 Noktalı Taban/Takım Çerçeve Hesaplayıcı (`krl.showCalculator`)
3 fiziksel temas noktasından (Orijin, X-ekseni, XY-düzlemi) Euler yönelim açılarını (A, B, C) ve `BASE_DATA[x]` / `TOOL_DATA[x]` dönüşüm matrislerini hesaplayan 3B geometri aracı.

---

### 29. AI Alan Bağlamı Araçları (`@kuka /get-io-matrix`, `@kuka /check-safety`)
Google Antigravity IDE ve GitHub Copilot'un KRL mimarisini, sinyallerini ve kinematiğini derinlemesine anlamasını sağlayan yerel bağlam sağlayıcıları.

---

### 30. Endüstriyel Kabul Kalite Raporu Oluşturucu (`krl.generateQualityReport`)
Müşteri proje teslimatı ve fabrika kabul testleri (FAT/SAT) için güvenlik karnesi ve kod karmaşıklığı analizlerini içeren HTML/JSON raporları üretir.

---

### 31. 100% Uyarlanabilir Temalar ve 6 Dilli Yerelleştirme
Dinamik SVG işleme yeteneğine sahip endüstriyel koyu, açık ve yüksek kontrastlı OLED temaları. 6 dil arasında tek tıkla sorunsuz geçiş: İngilizce, Almanca, Rusça, İspanyolca, İtalyanca ve Türkçe.
