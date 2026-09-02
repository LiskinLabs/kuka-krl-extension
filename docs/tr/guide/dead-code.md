# Çalışma Alanı Genelinde Kullanılmayan Kod Analizi (Dead-Code Analysis)

<span class="badge pro">Pro Özelliği</span>

Kod tabanınızın otomotiv üreticilerinin (VASS, BMW, Stellantis) yüksek standartlarını karşıladığından emin olun. Endüstriyel standartlar, sıfır kullanılmayan değişken içeren temiz ve optimize edilmiş kod tabanları gerektirir.

![Kullanılmayan Kod Analizi Gösterimi](/media/kuka_commands.gif)

## Nasıl Çalışır

KUKA KRL Professional, kapsamlı bir bağımlılık grafiği oluşturmak için tüm çalışma alanınızı (tüm `.src`, `.dat` ve `.sub` dosyalarını) dizine ekler:

* **Kullanılmayan Yerel Değişkenler**: Alt programlar içinde bildirilen ancak hiçbir yerde kullanılmayan yerel değişkenleri tarar.
* **Kullanılmayan Global Alt Programlar**: Bildirilen ancak çalışma alanında hiçbir zaman çağrılmayan `GLOBAL DEF` alt programlarını tanımlar.
* **Sahipsiz Sinyaller**: `.dat` dosyalarında tanımlanan ancak hiçbir zaman tetiklenmeyen veya okunmayan G/Ç sinyallerini vurgular.

## Kod Kalitesi Raporları

Kodun optimize edilmiş, temiz ve güvenli olduğunu müşterinize veya baş mühendisinize göstermek için yapılandırılmış bir kod tabanı sağlık raporu oluşturun. Komut Paletinden (`Ctrl+Shift+P`) `KRL: Generate Analysis Report` komutunu çalıştırın.
