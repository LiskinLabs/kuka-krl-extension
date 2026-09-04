# Donanım Sinyali İpuçları (Inlay Hints)

<span class="badge pro">Topluluk ve Pro Özellik</span>

Belirli bir G/Ç sinyal kanalının ne anlama geldiğini hatırlamak için `.src` ve `.dat` dosyaları arasında sürekli sekme değiştirmeye son.

![Inlay Hints Demo](/media/inlay_hints.gif)

## Nasıl Çalışır

KUKA KRL Professional, bilgileri doğrudan editör içinde satır içi olarak sunmak için Dil Sunucusu Protokolünü (LSP) kullanır.

Bir donanım sinyali (ör. `$IN[12]`) kullandığınızda, eklenti `.dat` dosyalarınızdaki sinyal bildirim adını veya yorumunu kodun yanında otomatik olarak görüntüler.

* **Yapılandırma**: Bu özelliği VS Code ayarlarında `krl.inlayHints.enabled` seçeneğiyle açıp kapatabilirsiniz.
