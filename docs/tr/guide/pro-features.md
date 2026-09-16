# 👑 Pro ve Endüstriyel Sürüm Özellikleri

Gelişmiş statik kod analizi, mantık görselleştirme ve endüstriyel güvenlik uyumluluk araçları.

---

### 16. KUKA Control Center Kontrol Paneli (v1.8.4 Pro Hub)
Tüm Pro araçlarına ve çalışma alanı analizlerine tek tıkla erişim sağlayan Fluent UI kontrol paneli (`krl.openControlCenter`).

![KUKA Control Center Demo](/media/kuka_control_center.gif)

---

### 17. VS Code Telegram Destek Sohbeti
**`@kukakrlbot`** ile entegre, doğrudan IDE içinden geliştirici destek sohbet penceresi (`krl.openTelegramChat`).

---

### 18. KRC Backup Diff ve Nokta Delta İnceleyicisi
SmartPAD `.zip` yedek arşivlerini karşılaştırır ve 6 eksenli uzamsal koordinat farklarını hesaplar ($\Delta X, \Delta Y, \Delta Z, \Delta A, \Delta B, \Delta C$).

![KRC Backup Diff Demo](/media/krc_backup_diff.gif)

---

### 19. Etkileşimli Hareket Yörüngesi ve Snippet Oluşturucu
KUKA hareket komutları (`PTP`, `LIN`, `CIRC`, `SPTP`, `SLIN`, `SCIRC`, `SPLINE Block`) için dinamik SVG şemalı görsel oluşturucu.

---

### 20. Etkileşimli Akış Şeması Görüntüleyici (Control Flow Graph)
`.src` kod mantığını etkileşimli Mermaid SVG akış şemalarına dönüştürür (`krl.showFlowchart`).

![Control Flow Graph Demo](/media/control_flow_graph.gif)
![Cell Flowchart SVG](/media/cell_flowchart.svg)

---

### 21. EthernetKRL (EKI) Paketi ve Kod Oluşturucu
EthernetKRL XML şemalarını doğrular ve otomatik KRL ağ işleyicileri üretir.

---

### 22. Endüstriyel Güvenlik ve Teşhisler
Başlatılmamış `$TOOL`/`$BASE`, kilitlenmeler ve görünmeyen ASCII dışı karakterleri denetleyen otomatik güvenlik müfettişi (`KRL: Run Safety Check`).

---

### 23. 3 Noktalı Çerçeve Hesaplayıcı (Frame Calculator)
3 kaydedilmiş noktadan `BASE_DATA[x]` Euler açılarını (A, B, C) hesaplayan 3B geometri aracı (`krl.showCalculator`).

---

### 24. Kabul Raporu Oluşturucu (Quality Report)
Müşteri kabul teslimatları için kapsamlı HTML/JSON kod kalitesi raporları oluşturur.

---

### 25. KUKA Event Log (.evt) Çözücü
KRC Windows EVTX günlükleri (`KrcLogS.evt`, `KrcLogB.evt` vb.) için 6 dilde (EN, DE, RU, ES, IT, TR) 2.050+ KSS CrossMeld mesajı içeren, tek tıkla koda atlayan %100 saf TypeScript çözücü (`krl.openEventLog`).

---

### 26. Görsel I/O Sinyal Matrisi ve PLC Çakışma Dedektörü
`$IN`, `$OUT`, `$ANIN` ve `$ANOUT` bildirimlerini tarayan, donanım bit çakışmalarını tespit eden çalışma alanı sinyal denetleyicisi (`krl.showIoMatrix`).

---

### 27. Yörünge Yol Uzunluğu ve Kaynak İstatistikleri
PTP, LIN, CIRC, Spline hareketlerini sınıflandıran, `ARCON`/`ARCOFF` dikişlerini ayıran ve ark süresini hesaplayan 3B Öklid hareket analizcisi (`krl.estimateMotionStats`).

---

### 28. Toplu Nokta Öteleme Dönüştürücü (BASE vs WORLD)
3B izometrik SVG şeması, çift koordinat çerçevesi (BASE vs ters Euler matrisi ile WORLD) ve geri alma (Undo) destekli atomik `.dat` güncellemesi sunan toplu nokta dönüştürücü (`krl.transformPointOffsets`).

---

### 29. %100 Uyarlanabilir Temalar ve 6 Dilli Arayüz
Sıfır sabit renk — `--vscode-*` CSS değişkenleri ile Açık, Koyu ve Yüksek Kontrastlı temalara tam uyum, dahili 6 dil seçici (EN, DE, RU, ES, IT, TR) ile.
