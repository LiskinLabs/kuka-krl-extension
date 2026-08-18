# 🟢 Ücretsiz Topluluk (Community) Özellikleri

KUKA KRL Professional, kişisel ve ticari kullanım için tamamen ücretsiz olan kapsamlı bir temel geliştirme paketi içerir.

---

### 1. KRL Sözdizimi Vurgulama (Syntax Highlighting)
`.src`, `.dat` ve `.sub` dosyalarının bağlama duyarlı ayrıştırılması. Veri türlerini (`INT`, `REAL`, `BOOL`, `CHAR`, `FRAME`, `POS`, `E6POS`, `E6AXIS`), sistem değişkenlerini (`$POS_ACT`, `$VEL.CP`, `$BASE`, `$TOOL`) ve WorkVisual `;FOLD` bloklarını kontrastlı ve anlaşılır renklerle vurgular.

![Sözdizimi Vurgulama](/media/syntax_after.png)

---

### 2. 6 Özel Endüstriyel Renk Teması
Fabrika ve saha dizüstü bilgisayarları ile SmartPAD ekranları için kontrastı optimize edilmiş 6 tema:
* **Industrial Dark** (KUKA Turuncusu `#FF6600`)
* **WorkVisual Dark**
* **WorkVisual Light**
* **Midnight OLED** (Saf siyah, pil tasarrufu)
* **Blueprint**
* **Industrial Light**

Kısayol: `Ctrl + K Ctrl + T`

![KUKA Temaları](/media/kuka_theme_1.png)

---

### 3. Akıllı Otomatik Tamamlama (350+ KSS 8.7 Değişkeni)
`$` karakteri yazıldığında 350'den fazla KUKA Sistem Yazılımı (KSS) değişkeni, donanım sinyalleri ve kullanıcı alt programları için anında açılır menü sunar.

![Akıllı Otomatik Tamamlama](/media/smart_autocomplete.gif)

---

### 4. Donanım Sinyali İpucu İpuçları (Inlay Hints)
Fiziksel `$IN[1]` ve `$OUT[1]` sinyal kanallarının yanında `.dat` dosyalarından canlı olarak çekilen yorum adlarını (`diPartReady`, `doGripOpen`) kaynak kodu değiştirmeden sanal satır içi metin olarak gösterir.

![Inlay Hints](/media/inlay_hints.gif)

---

### 5. Hover Bilgilendirme ve Okuma/Yazma İzinleri
Değişkenlerin üzerine gelindiğinde resmi KSS sınırları, açıklamaları ve Salt Okunur (Read-Only) / Okuma-Yazma (Read-Write) izin durumunu gösteren bilgi kartı açılır.

![Hover Info](/media/hover_info.gif)

---

### 6. Dosyalar Arası Gezinme (.src ↔ .dat F12)
`.src` mantığındaki nokta referanslarından (`P1`, `HomePos`) doğrudan `.dat` dosyasındaki `E6POS` koordinat tanımlarına anında geçiş (`F12` veya `Ctrl+Click`).

![Go-to-Definition](/media/goto_definition.gif)

---

### 7. Küresel KRL Kod Biçimlendirici (Formatter)
Atama eşitlemelerini (`=`) standartlaştırır, `IF/FOR/WHILE/LOOP` döngülerini ve `;FOLD / ;ENDFOLD` bloklarını otomatik olarak girintiler (`Shift + Alt + F`).

![Kod Biçimlendirici](/media/code_formatter.gif)

---

### 8. WorkVisual Git Meta Veri Temizleyici
WorkVisual başlık gürültüsünü (`&ACCESS RVP`, `&REL 1`, `&PARAM`) dosya başlıklarından kaldırarak Git komitlerini yalnızca mantık değişikliklerine odaklar.

![Git Metadata Cleaner](/media/git_metadata_cleaner.gif)
