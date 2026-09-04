# 👑 Pro ve Endüstriyel Sürüm Özellikleri

Gelişmiş statik kod analizi, mantık görselleştirme ve endüstriyel güvenlik uyumluluk araçları.

---

### 16. KUKA Control Center Kontrol Paneli (v1.8.0 Pro Hub)
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
