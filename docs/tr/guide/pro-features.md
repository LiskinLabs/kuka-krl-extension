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

---

### 32. İleri Düzey KRL Kinematik ve 6B Dönüşüm Paketi
Yörünge ve koordinat sistemi manipülasyonu:
- **6B Yörünge Aynalama (`krl.mirrorTrajectory`)**: X, Y veya Z düzlemlerinde yansıtma ve otomatik Turn ($A_1..A_6$) biti yönetimi.
- **Toplu Nokta Kaydırma (`krl.batchShiftPoints`)**: Tool ve Base koordinat sistemlerinde geometrik operatör (`:`) hesaplaması.
- **Yörünge Tersine Çevirme (`krl.reverseTrajectory`)**: Hareket hedeflerini yay ve dairesel hareketleri koruyarak tersine sıralama.
- **Sıralı Nokta Yeniden Numaralandırma (`krl.renumberPoints`)**: `.src` ve `.dat` dosyalarında sembolleri senkronize olarak yeniden adlandırma.

---

### 33. KUKA.Sim 4.10 & iiQWorks.Sim 1.3 Kinematik Güvenlik Denetleyicileri
Derin simülasyon kuralları: Status (S) ve Turn (T) sınır kontrolleri, RESUME ifadesi denetimi, FOR STEP 0 sonsuz döngü engelleme, SUBMIT arka plan kısıtlamaları ve otomotiv teknoloji paketlerinin korunması.

---

### 34. Endüstriyel Saha Güvenilirliği (Enterprise Fleet Verification)
17 robotik hücresinde 9.804 gerçek endüstriyel KRL modülünde (4,2 milyondan fazla satır kod) 0 satır kaybı ve blok bütünlüğü garantisiyle doğrulanmıştır.

---

### 35. KRL Güvenli Otomatik Düzeltme Motoru (Safe Auto-Repair & QuickFix)
Kinematiği bozmadan sözdizimi ve yapısal hataları tek tıkla (`Ctrl+.` QuickFix ve `krl.fixAllSafeIssuesInFile`) onarma:
- **İlerletici Okuma (Advance Run) Bariyeri**: Güvenlik çıkışları öncesinde otomatik `WAIT SEC 0` ekleme.
- **RESUME Öncesi Zorunlu BRAKE**: Kesme alt programlarında durma komutunu ekleme.
- **Dinamik Yük ($LOAD) Doğrulama**: Yük atamalarından sonra `BAS(#PAYLOAD, nTool)` çağrısını otomatik ekleme.
- **BOM ve ASCII Dışı Karakter Temizliği**: UTF-8 BOM ve KSS derleyicisini bozan karakterleri temizleme.
- **FOLD / ENDFOLD Senkronizasyonu**: Kapanış etiketlerini uyumlu hale getirme.
- **Geri Alma Koruması (Rollback Guard)**: Hata durumunda işlemi anında geri alma ve Monaco Diff Editörü ile onaylama.

---

### 36. Şeffaf KRC Yedekleme Canlı Proje Bağlantısı (Live Mount & 2-Way ZIP Sync)
SmartPAD `.zip` yedeklerini harici klasöre çıkarmadan doğrudan VS Code çalışma alanı olarak açma (`krl.mountBackupZipAsProject`):
- **Arşiv İçi Canlı Düzenleme**: Arşiv içindeki dosyaları tam LSP desteğiyle düzenleme.
- **Şeffaf ZIP Yamalama**: `Ctrl+S` ile orijinal `.zip` dosyasını 80 ms altında doğrudan disk üzerinde güncelleme.

---

### 37. Dinamik Yörünge ve Tekillik (Singularity) Tahmin Aracı
Robot programını sahaya yüklemeden önce kinematiği simüle etme:
- **Bilek Tekilliği (Wrist Singularity)**: $A_5 \approx 0^\circ \pm 5^\circ$ yakınındaki doğrusal hareketleri tespit etme.
- **Erişim Sınırları**: Maksimum uzanma sınırının %96'sını aşan hedefleri uyarma.
- **Çevrim Süresi Kaybı Analizi**: Vorlaufstopp duraklamalarından kaynaklanan tahmini gecikmeleri hesaplama.
