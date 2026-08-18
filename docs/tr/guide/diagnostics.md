# Endüstriyel Kalite Teşhisleri ve Güvenlik Denetimi

<span class="badge pro">Pro Özellik</span>

Kodu gerçek robot kontrolöründe çalıştırmadan önce sözdizimi çökmelerini, aşırı hız tehlikelerini ve fiziksel çarpışma risklerini yakalayın.

## Sıkı Blok Dengesi (Block Balance)

Eksik veya eşleşmeyen blok sonlarını (`IF/ENDIF`, `FOR/ENDFOR`, `LOOP/ENDLOOP`) işaretler. Yanlış alarmlar üretmeden karmaşık KRL sözdizimini doğru ayrıştırır.

![Blok Dengesi](/media/block-balance.gif)

## Tip Doğrulama ve Çarpışma Koruması

Geçerli alt programda aktif `$TOOL` veya `$BASE` değerleri başlatılmadan önce hareket komutları (`PTP`, `LIN`, `CIRC`) bildirilmişse sizi uyarır.

![Tip ve Güvenlik Doğrulama](/media/type-validation-demo.gif)

## Yüksek Hız Uyarısı

Manuel test çalıştırmalarında olası kazaları önlemek için hız ayarları güvenli devreye alma seviyelerini aştığında (örn. `$VEL.CP` 3.0 m/s üzerinde) uyarır.

## Görünmez Karakter Engelleyici (Non-ASCII)

Yürütülebilir satırlardaki görünmez ASCII dışı veya Kiril karakterleri eski KRC kontrolörlerinde sessiz derleyici hatalarına neden olur. Pro kontrolleri bunları anında tespit eder ve satırı gösterir.
