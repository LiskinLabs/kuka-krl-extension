# KUKA KRL Professional - Özellikler Wiki

**KUKA KRL Professional** için resmi özellik dokümantasyonuna hoş geldiniz.

## 🟢 Community Edition (Ücretsiz)

Bu özellikler standart robotik geliştirmeyi hızlandırmak için tamamen ücretsizdir.

### 1. Sözdizimi Vurgulama (Syntax Highlighting)
KUKA KRC spesifikasyonlarına sıkı sıkıya bağlı kalarak `.src` ve `.dat` dosyalarının tam ayrıştırılması ve renklendirilmesi.

### 2. KUKA Özel Temaları
Mühendisler için özel olarak tasarlanmış üç özel karanlık tema:
- **Industrial Dark**
- **Midnight OLED** 
- **Blueprint**

### 3. Akıllı Otomatik Tamamlama
Tüm KUKA sistem değişkenlerinin veri tipleri ve açıklamalarıyla birlikte açılır listesini anında almak için `$` yazın.

### 4. Üç Dilli Yerelleştirme (EN/RU/TR)
Vurgulu bilgiler ve hata mesajları dahil olmak üzere tüm uzantı İngilizce, Rusça ve Türkçe'ye tamamen çevrilmiştir.

### 5. Gömülü İpuçları (Inlay Hints)
Donanım sinyallerinin yanında (ör. `$IN[1]`), dosyayı değiştirmeden gerçek isimlerini gösteren sanal metin görünür.

### 6. Üzerine Gelme Bilgisi (Hover Info)
KUKA dokümantasyonuna anında erişmek için farenizi herhangi bir sistem değişkeninin (ör. `$VEL.CP`) üzerine getirin.

### 7. Dosyalar Arası Tanıma Gitme (Go-to-Definition)
`Ctrl` tuşunu basılı tutun ve mantığınızdaki herhangi bir değişkene tıklayarak `.dat` dosyasındaki bildirimine anında atlayın.

### 8. Genel Biçimlendirici (Formatter)
Dağınık kodu anında biçimlendirmek için `Shift + Alt + F` tuşlarına basın. Matrislerdeki `=` işaretlerini otomatik hizalar.

### 9. Görsel Snippet Oluşturucu
Dahili GUI paneli (Fluent UI), PTP/LIN hareketlerini veya mantığı metin yazmadan görsel olarak oluşturmanıza olanak tanır.

---

## 👑 Industrial Edition (Pro)

Industrial Edition, tüm proje çalışma alanınız için katı bir statik analizör ve güvenlik müfettişi olarak çalışır.

### 10. Etkileşimli Akış Şeması Görüntüleyici
Karmaşık `.src` programlarını temiz Mermaid SVG kontrol akışı diyagramlarına dönüştürür. Alt programlara tıklayarak detaylara inebilirsiniz.

### 11. Blok Denge Teşhisi
Eksik `ENDIF` veya `ENDFOR` sorununu çözer. Analizör blok yapılarınızı sürekli haritalandırır ve eksik olan kapanış etiketini anında kırmızı ile çizer.

### 12. Güvenli Hız Uyarıları
`$VEL.CP = 5.0` yazmak derhal bir uyarı tetikleyecektir. Kodlanmış hızlar devreye alma güvenlik sınırlarını aşarsa analizör sizi uyarır.

### 13. Tool/Base Başlatma Kontrolü
Aktif `$TOOL` ve `$BASE` başlatılmadan hareket komutu (ör. `PTP P1`) çalıştırma girişimi anında yakalanır. Çarpışmaları önler.

### 14. Sessiz Hata / ASCII Olmayan Engelleyici
Çalıştırılabilir kod satırlarında ASCII olmayan (ör. Kiril veya Türkçe karakterler) varsa KRC derleyicisi sessizce başarısız olur. Engelleyicimiz bunu gerçek zamanlı yakalar.

### 15. Çalışma Alanı Ölü Kod Analizi
Tüm klasördeki dosyaları tarar. Hiç çağrılmayan `GLOBAL DEF` fonksiyonları veya değişkenleri gri renkle vurgulanır.

### 16. WorkVisual Üstveri Temizleyici
WorkVisual tarafından oluşturulan çöp metadataları (ör. `&ACCESS`) tek tıklamayla temizler. Git taahhütlerinizi temiz tutar.

### 17. KUKA Frame Hesaplayıcı
Dahili 3D geometri aracı. 3 nokta koordinatı (Orijin, X-ekseni, XY-düzlemi) girin, `BASE_DATA` çerçeve açılarını (A, B, C) anında hesaplar.

### 18. Kod Kalitesi Rapor Oluşturucu
Tüm projenizin kapsamlı bir HTML/JSON raporunu oluşturun. Ele alınmayan hataları, uyarıları ve ölü kod yüzdesini anında görün.
