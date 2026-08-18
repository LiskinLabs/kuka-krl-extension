# KRC Yedekleme Farkı ve Nokta Delta Denetçisi

<span class="badge pro">Pro Özellik</span>

SmartPAD teach pendant üzerinde yapılan doğrulanmamış nokta düzeltmelerinin neden olduğu robot çarpışmalarını önleyin.

![KRC Backup Diff Demo](/media/krc_backup_diff.gif)

## Temel Yetenekler

* **Doğrudan ZIP Denetimi**: SmartPAD KRC4/KRC5 `.zip` arşivlerini açmadan doğrudan içindeki `.src` ve `.dat` dosyalarını inceler.
* **Nokta Delta Matematiği**: Çalışma alanındaki DAT dosyası ile yedek arasındaki her $E6POS/POS/E6AXIS$ noktası için tam delta farklarını ($\Delta X, \Delta Y, \Delta Z, \Delta A, \Delta B, \Delta C$) hesaplar.
* **Yan Yana Görsel Karşılaştırma**: VS Code yerel Diff editöründe satır bazlı karşılaştırma ve Output panelinde ayrıntılı delta raporu sunar.
