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

### 33. Kinematik Güvenlik ve Endüstriyel Simülasyon Denetleyicileri (KSS 8.x & KSS 9.x / iiQWorks 9.+)
KSS 8.x ve KSS 9.x / iiQWorks spesifikasyonlarına uygun simülasyon ve kinematik güvenlik kuralları: Status (S) ve Turn (T) sınır kontrolleri, RESUME ifadesi denetimi, FOR STEP 0 sonsuz döngü engelleme, SUBMIT arka plan kısıtlamaları ve otomotiv teknoloji paketlerinin korunması.

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

---

### 38. SCADA Canlı Köprü ve Gerçek Zamanlı Kontrolör Bağlantısı (`krl.live.connect`, `krl.live.openDashboard`) [PRO]
CrossComm WCF, OPC UA veya EthernetKRL üzerinden fiziksel KUKA KRC4/KRC5 ve OfficePC kontrolörlerine doğrudan donanımsal telemetri ve SCADA bağlantısı:
- **Gerçek Zamanlı Koordinat ve Durum İzleme**: Kartezyen TCP pozisyonları ($X, Y, Z, A, B, C$), aktif Tool/Base indeksleri ve eksen açıları ($A_1..A_6$).
- **Çalışma Modları ve Güvenlik Kilitleri**: Çalışma modu (T1, T2, AUT, EXT), sürücü hazır bilgisi (`$PERI_RDY`), acil stop (`$ALARM_STOP`) ve hücre güvenlik kilidi göstergeleri.
- **Yorumlayıcı ve Program İşaretçisi**: Arka plan submit (`$SPS`) ve robot yorumlayıcı durumu (`$PRO_STATE`), aktif program adı (`$PRO_NAME`) ve çalışan satır işaretçisi (`$PRO_IP`).
- **Dinamik Program Override Değeri**: Robot çalışma hızı override değerini (`$OV_PRO`) canlı izleme ve ayarlama.
- **Saha Veriyolu G/Ç Teşhisi**: Dijital giriş ve çıkışların (`$IN` / `$OUT` 1..4096) ve bayrakların (`$FLAG`) canlı sinyal takibi.
- **Ağ İçi Kontrolör Keşfi**: Fabrika ağındaki aktif KRC kontrolörlerini otomatik alt ağ taraması ile tespit etme.

---

### 39. Birleşik KSS Olay Günlüğü Çoklu İnceleyicisi ve Zaman Çizelgesi (`krl.openAllEventLogs`) [PRO]
KUKA kontrolör teşhis ve hata kayıtları için çoklu günlük zaman çizelgesi:
- **Tüm Günlükleri Eşzamanlı Birleştirme**: Kontrolör teşhis dosyalarını (`KrcLog.evt`, `KSSLog.evt`, `SafetyLog.evt`, `SystemLog.evt`, `CrossLog.evt`) tek bir kronolojik akışta toplama.
- **Canlı KSS Hata Kodu Çevirisi**: KUKA hata ve mesaj kodlarını 6 dilde (EN, DE, RU, TR, ES, IT) açıklamalar ve altyazılarla otomatik çevirme.
- **Öncelik Filtreleme ve Arama**: Önem derecesine göre (Fatal, Error, Warning, Info, State) anında filtreleme ve serbest metin araması.
- **KRL Kaynak Koduna Doğrudan Geçiş**: Günlükteki hataya tıklayarak doğrudan ilgili `.src` / `.dat` satırına atlama.

---

### 40. Köşeli Parantez ve Dizi Elemanlarına Uyumlu Sembol Çözümleme
Endüstriyel KRL kod yapıları için geliştirilmiş AST dayanıklılığı:
- **Karmaşık İfadeler ve Dizi Desteği**: Köşeli parantez, yapı elemanları ve indeksli değişkenleri sözdizimi hatası üretmeden ayrıştırma (ör. `$OUT[12]`, `$COUNT_I[1]`, `LOAD_DATA[1].M`, `P1.X`).
- **Telemetri ve İpucu Desteği**: Dizi indeksli sistem değişkenleri ve yapılar için tam dokümantasyon ve referans gezintisi.

---

### 41. Inline Form (ILF) Meta Veri Eşzamanlama ve Otomatik Onarım (`krl.fixAllSafeIssuesInFile`) [PRO]
Hareket parametrelerindeki meta veri uyumsuzluklarını otomatik onaran motor:
- **XML Meta Veri Senkronizasyonu**: `;FOLD PTP/LIN` hareket komutları ile gizli XML yorumları (`%MKUKATPBASIS,%CMOVE,...`) arasındaki tutarsızlıkları düzeltme.
- **Toplu ve Güvenli Onarım**: Endüstriyel yedeklerdeki 150+ inline form uyarısını AST Rollback Guard güvencesiyle tek tıkla giderme.

---

### 42. KSS 8.7.9 Uyumluluğu ve Robot Modeli Genişletmeleri
- **Genişletilmiş Kinematik Kataloğu**: KR 50 R2500 serisi ve GripperSpotTech dahil KSS 8.7.9 için tam kinematik ve yük sınırları tanımları.
- **Dinamik Yük Modeli Doğrulaması**: Yüksek hızlı hareketlerde yörünge sapmalarını ve eksen aşırı yüklenmelerini önlemek için kütle ($M$), ağırlık merkezi ($COG: X, Y, Z$) ve atalet tensörlerini ($J_X, J_Y, J_Z$) titizlikle denetleme.
