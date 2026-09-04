# KRC Backup Diff ve Nokta Delta İnceleyicisi

<span class="badge pro">Pro Özellik (v1.8.0)</span>

Mevcut çalışma alanı mantığını ve nokta koordinatlarını fiziksel robot SmartPAD yedek ZIP arşivleri (KRC4 / KRC5) ile karşılaştırın.

![KRC Backup Diff Demo](/media/krc_backup_diff.gif)

## Yetenekler

* **ZIP Yedekleme Ayrıştırması**: SmartPAD `.zip` arşivini manuel olarak açmadan doğrudan seçin ve inceleyin.
* **Bileşen Nokta Delta Hesaplaması**: `E6POS`, `POS`, `E6AXIS` ve `AXIS` koordinatları için kesin ofset farklarını ($\Delta X, \Delta Y, \Delta Z, \Delta A, \Delta B, \Delta C$) hesaplar.
* **Yan Yana Diff Görüntüleyici**: Eklemeleri, silmeleri ve koordinat kaymalarını gerçek zamanlı olarak görselleştirir.
