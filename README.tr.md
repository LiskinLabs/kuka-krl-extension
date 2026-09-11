<h1 align="center">KUKA KRL Professional</h1>

<p align="center">
  <b>KUKA Robot Dili için Nihai Endüstriyel IDE ve Güvenlik Paketi.</b><br />
  KRC2, KRC4 ve KRC5 Kontrolörleri için tasarlandı (KSS 8.2 – 8.7). Hız, Güvenlik ve Sıfır Arıza Süresi için üretildi.
</p>

<details>
<summary>🌐 Language / Язык / Dil / Sprache / Lingua / Idioma</summary>

| Language | File |
|---|---|
| 🇬🇧 English | [README.md](README.md) |
| 🇷🇺 Русский | [README.ru.md](README.ru.md) |
| 🇹🇷 Türkçe | [README.tr.md](README.tr.md) |
| 🇩🇪 Deutsch | [README.de.md](README.de.md) |
| 🇮🇹 Italiano | [README.it.md](README.it.md) |
| 🇪🇸 Español | [README.es.md](README.es.md) |

</details>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension"><img src="https://badgen.net/vs-marketplace/v/LiskinLabs.kuka-krl-extension?style=flat&label=VS%20Code%20Marketplace&color=FF6600" alt="VS Code Marketplace" /></a>
  <a href="https://open-vsx.org/extension/LiskinLabs/kuka-krl-extension"><img src="https://img.shields.io/open-vsx/v/LiskinLabs/kuka-krl-extension?style=flat-square&logo=eclipseche&logoColor=white&color=007ACC&label=Open%20VSX" alt="Open VSX" /></a>
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/releases"><img src="https://img.shields.io/badge/Release-v1.8.4-FF6600?style=flat-square&logo=visualstudiocode&logoColor=white" alt="Release v1.8.4" /></a>
  <a href="https://secure.software/vscode/packages/liskinlabs/kuka-krl-extension"><img src="https://img.shields.io/badge/Spectra%20Assure-PASSED%20(100%25)-10b981?style=flat-square&logo=shield&logoColor=white" alt="ReversingLabs Security Score" /></a>
  <a href="https://liskinlabs.github.io/kuka-krl-extension/"><img src="https://img.shields.io/badge/Fleet%20Verified-4.1M%2B%20LoC-10b981?style=flat-square" alt="Fleet Verified" /></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Language-KRL-orange?style=flat-square" />
  <img src="https://img.shields.io/badge/Controllers-KRC2%20%7C%20KRC4%20%7C%20KRC5-007ACC?style=flat-square" />
  <img src="https://img.shields.io/badge/Kernel-KUKA.Sim%204.10%20Inside-FF6600?style=flat-square" />
  <img src="https://img.shields.io/badge/Built--in%20Specs-957%20Vars%20%7C%20116%20Functions-10b981?style=flat-square" />
  <img src="https://img.shields.io/badge/Offline--First-100%25%20Factory%20Ready-green?style=flat-square" />
  <img src="https://img.shields.io/badge/Security-0%20Malware%20%7C%200%20CVEs-emerald?style=flat-square" />
  <img src="https://img.shields.io/badge/Localization-EN%20%7C%20DE%20%7C%20IT%20%7C%20ES%20%7C%20RU%20%7C%20TR-blue?style=flat-square" />
</p>

<p align="center">
  <a href="https://liskinlabs.github.io/kuka-krl-extension/"><b>🌐 İnteraktif Wiki (50 Endüstriyel Araç)</b></a> •
  <a href="https://checkout.dodopayments.com/buy/pdt_0NmAUzwdbzeERSktsOLTp"><b>⚡ Pro Monthly ($9.99/ay)</b></a> • 
  <a href="https://checkout.dodopayments.com/buy/pdt_0NmAV012KFHSjUMyDomJ6"><b>👑 Yıllık Pro ($79.00/yıl — %35 Tasarruf)</b></a> • 
  <a href="https://secure.software/vscode/packages/liskinlabs/kuka-krl-extension"><b>🛡️ Güvenlik Denetim Raporu</b></a>
</p>

---

> [!IMPORTANT]
> ### ⚠️ Endüstriyel Devreye Alma Uyarısı
> Hücreyi müşteriye teslim etmeden ve endüstriyel devreye almadan önce, değiştirilen dosyaların sanal bir KUKA.OfficeLite kontrolörüne veya fiziksel KRC kabinine yüklenmesi ve gömülü KSS derleyicisinin yeşil modül durumu (SmartPAD'deki «R» göstergesi) ile sıfır sözdizimi veya kinematik hata bildirdiğinden emin olunması şiddetle önerilir.

---

## ⚡ Saatlik 10.000 Dolarlık Üretim Duruşu Sorunu

Her devreye alma mühendisi bu acıyı bilir:
1. **Yavaş Döngü**: Dosyaları doğrudan SmartPAD öğretim panelinde düzenlemek veya yavaş WorkVisual dağıtımlarıyla boğuşmak.
2. **Gizli Çarpışma Riski**: Tek bir eksik `$TOOL` veya `$BASE` ataması, doğrulanmamış bir nokta koordinat kayması veya ilk otomatik test koşusunda mekanik çarpışmaya neden olan yanlışlıkla bir Kartezyen `$VEL.CP` aşımı.
3. **Doğrulanmamış Değişiklikler**: Ekip arkadaşları gece vardiyasında robot panelinde noktaları düzeltir, sürüm kontrolü sıfırdır.

**KUKA KRL Professional**, editörünüzü yüksek performanslı bir **endüstriyel robotik komuta merkezine** dönüştürür. Sözdizimi hatalarını, kinematik hataları, eksik blok dengelerini ve koordinat uyumsuzluklarını kod **fiziksel robot kontrolörüne dokunmadan ÖNCE** yakalar.

> **💡 Yatırım Getirisi Garantisi:** Kodu üretim hattında çalıştırmadan önce tek bir sözdizimi hatası veya mekanik çarpışma yakalamak, ilk 5 dakikada ömür boyu Pro lisansını karşılar.

---

## 🚀 Temel Profesyonel Özellikler

### 1. 🗺️ Etkileşimli Akış Şeması ve Kontrol Akış Grafiği
*İç içe geçmiş mantığı elle izlemeyi bırakın.* Devasa, karmaşık `.src` programlarını temiz, etkileşimli, tıklanabilir kontrol akış diyagramlarına dönüştürün.
* **Çift Yönlü Koda Atlama**: Herhangi bir akış şeması bloğuna tıklayarak tam kod satırına anında atlayın.
* **Alt Program Detayı**: Alt program çağrılarına tıklayın (örn. `PickPart()`, `WeldSeam()`) ve akış şemalarını yükleyin.
* **Sinyaller ve Zamanlayıcılar**: I/O sinyalleri, bayraklar ve zamanlayıcılar için renk kodlu durum rozetleri.
* **Yerleşik Güvenlik Paneli**: Görüntülenen program için tam Endüstriyel Güvenlik analizi çalışır — hareket, aktüatör ve kilitlenme riskleri tek tıkla satıra gitme ile.
* **SVG Vektör Dışa Aktarma**: Müşteri teslimleri ve otomasyon dokümantasyonu için yüksek çözünürlüklü vektör diyagramlar.

<p align="center">
  <img src="docs/public/media/control_flow_graph.gif" width="720" alt="Interactive Flowchart Demo" />
</p>

---

### 2. 🛡️ Endüstriyel Güvenlik ve Derin Mantık Analizörü
*Kontrolöre dokunmadan önce sözdizimi çökmelerini, kilitlenmeleri ve mekanik çarpışma risklerini ortadan kaldırın.*
* **Sıkı Blok Dengesi**: KRC derlemesinden önce kayıp `IF / ENDIF`, `FOR / ENDFOR` ve `LOOP / ENDLOOP` bloklarını işaretler.
* **Tool/Base Koruması**: Hareket komutları (`PTP`, `LIN`, `CIRC`) aktif `$TOOL` veya `$BASE` başlatması olmadan çalışırsa uyarır.
* **Hız Denetleyicisi**: Kartezyen hız `$VEL.CP` güvenli devreye alma sınırlarını aştığında uyarır (> 2.0 m/s).
* **Kilitlenme Engelleyici**: `WAIT FOR` koşullarında eksik zaman aşımlarını ve `EXIT` içermeyen sonsuz döngüleri işaretler.
* **Kiril ve ASCII-Dışı Engelleyici**: Eski KSS derleyicilerini sessizce çökerten yanlışlıkla yazılan ASCII-dışı klavye karakterlerini tespit eder.

<p align="center">
  <img src="docs/public/media/type-validation-demo.gif" width="720" alt="Safety and Diagnostics Demo" />
</p>

---

### 3. 📦 SmartPAD ZIP Yedek Karşılaştırma ve Nokta Delta Matematiği
*Canlı proje kodunu SmartPAD `.zip` arşiv yedekleriyle inceleyin ve karşılaştırın.*
* **Delta Matematiği**: `E6POS`, `POS` ve `E6AXIS` noktaları için tam 6 eksenli uzamsal kaymaları hesaplar (**ΔX, ΔY, ΔZ, ΔA, ΔB, ΔC**).
* **Sıfır Temas Denetimi**: Çarpışmaya neden olmadan önce üretim sahasında yapılan doğrulanmamış nokta düzeltmelerini anında tespit eder.
* **Yan Yana Görsel Karşılaştırma**: VS Code içine yerleştirilmiş renk kodlu grafik diff görüntüleyici.

<p align="center">
  <img src="docs/public/media/krc_backup_diff.gif" width="720" alt="SmartPAD Backup Diff Demo" />
</p>

---

### 4. 🔀 GitLens Seviyesinde KRL Sürüm Kontrolü
*Her koordinat düzenlemesini ve program değişikliğini hassasiyetle izleyin.*
* **Satır Blame Notları**: Herhangi bir KRL satırı için yazar, zaman damgası ve commit detayları durum çubuğunda.
* **Commit Denetleyicisi**: Tam commit diff'lerini, commit meta verilerini ve geçmiş revizyonları incelemek için durum çubuğu blame'ine tıklayın.
* **Görsel Dosya Geçmişi (`krl.viewFileHistory`)**: Mevcut çalışma alanı kodunu herhangi bir tarihsel Git commit'iyle yan yana karşılaştırın.

---

### 5. 📐 3 Noktalı Euler Çerçeve Matematiği ve KUKA Control Center
*Editörünüzün içine yerleştirilmiş doğrudan koordinat sistemi dönüşüm hesap makinesi.*
* **3 Nokta Yöntemi**: Ölçülen kalibrasyon noktalarından `BASE_DATA` ve `TOOL_DATA` orijinlerini ve Euler dönüş açılarını (A, B, C) hesaplayın.
* **Doğrudan `.dat` Ekleme**: Hesaplanan koordinat çerçevelerini tek tıkla veri dosyalarına ekleyin.
* **Sıfır Trigonometri Hatası**: Elektronik tablo hesaplamalarını ve sahadaki manuel yönlendirme matematiğini ortadan kaldırın.

<p align="center">
  <img src="docs/public/media/kuka_control_center.gif" width="720" alt="KUKA Control Center Demo" />
</p>

---

### 6. 🔍 Sinyal Inlay İpuçları ve PLC Yorum Eşleme
*Elektrik şemalarını karıştırmadan I/O mantığını bir bakışta anlayın.*
* Sinyal tanımlarını doğrudan `$config.dat` ve `kuka_signals.json` dosyasından okur.
* `$IN[x]`, `$OUT[y]`, `$ANIN[z]` ve `$FLAG[k]` yanında insan tarafından okunabilir etiketler gösterir.

<p align="center">
  <img src="docs/public/media/inlay_hints.gif" width="720" alt="Signal Inlay Hints Demo" />
</p>

---

### 7. ⚡ Otomatik Kod Biçimlendirici ve Matris Hizalama
*Dağınık el yazımı kodu tek tuşla (`Shift+Alt+F`) temiz, standart endüstriyel koda dönüştürün.*
* Standartlara uygun 3 boşluklu KUKA girintisi.
* Okunabilir koordinat matrisleri için `.dat` dosyalarında `=` atama operatörlerini hizalar.
* KRL anahtar kelimeleri için büyük/küçük harf standardizasyonu (`DEF`, `GLOBAL`, `INTERRUPT`, `CONTINUE`).

<p align="center">
  <img src="docs/public/media/code_formatter.gif" width="720" alt="Code Formatter Demo" />
</p>

---

### 8. 🏭 Resmi KUKA.Sim 4.10 Çekirdek Entegrasyonu ve 957+ Sistem Değişkeni
*Doğrudan KUKA.Sim 4.10, WorkVisual ve KRC kontrolör çalışma zamanından çıkarılan otantik endüstriyel spesifikasyonlar.*
* **957 Sistem Değişkeni**: KSS 8.3–8.7/9.0 sistem değişkenlerinin (`$ACC`, `$TOOL`, `$BASE`, `$POS_ACT`, `$VEL_AXIS` vb.) fiziksel birimler, dizi sınırları (217 dizi) ve Salt-Okunur durumlarıyla kapsamlı kapsamı.
* **116 Yerleşik Sistem Fonksiyonu ve Wonderlib**: Kinematik (`FORWARD`, `INVERSE`, `INV_POS`, `TOOL_ADJ`), string işlemleri, tip dönüştürme, mesaj diyalogları, tork limitleri ve Wonderlib rutinleri için gerçek zamanlı `signatureHelp` parametre ipuçlarıyla tam destek.
* **111 Yapı ve 112 ENUM (443 Literal)**: Akıllı nokta tamamlama (`$TOOL.`, `$ACC.`, `POINT.`) ve `#` enum literal otomatik tamamlama (`#AUT`, `#T1`, `#P_FREE`, `#QUIT`).
* **23 Resmi KUKA Inline Form Snippet'i (34 Şablon)**: Tam Inline Form başlıklarıyla (`;FOLD ... ;%{PE}`) otantik Kuka Roboter GmbH şablonları (`ptpi`, `slini`, `sptpi`, `scirc`, `PTPCo`, `ptprel`, `trigdist`, `sigin`, `wsec`, `Forr`).
* **451 Anahtar Kelimelik Derleyici Matrisi**: KUKA C++ `keyword.h` matris kurallarının doğrudan entegrasyonu — sıfır yanlış pozitif sözdizimi uyarısı.
* **Tek Tırnaklı Hex ve İkili Sözdizimi**: `'B000001'` (ikili), `'HFF'` (onaltılık) ve karakter literalleri için tam ayrıştırıcı ve tanılama uyumluluğu.
* **Sıfır Yanlış Pozitif Filo Denetimi (4.1M+ Satır)**: 107 gerçek üretim robot yedeğinde 0 yanlış tanılamayla doğrulandı.

<p align="center">
  <img src="docs/public/media/smart_autocomplete.gif" width="720" alt="Smart Autocomplete Demo" />
</p>

---

### 9. 🔎 Tanıma Git ve Tüm Referansları Bul
*Tüm proje klasörünüzde anlık AST düzeyinde dizinleme.* Herhangi bir fonksiyon veya değişken çağrısından, ayrı `.src` ve `.dat` dosyalarındaki bildirimine doğrudan atlayın.

<p align="center">
  <img src="docs/public/media/goto_definition.gif" width="720" alt="Go to Definition Demo" />
</p>

---

### 10. ℹ️ Zengin Hover Dokümantasyonu ve Okuma/Yazma Durumu
*Anında parametre açıklamaları ve güvenlik uyarıları alın.* Herhangi bir KSS sistem değişkeninin üzerine gelin; fiziksel birimlerini, okuma/yazma izinlerini ve KSS kılavuz açıklamalarını görün.

<p align="center">
  <img src="docs/public/media/hover_info.gif" width="720" alt="Hover Info Demo" />
</p>

---

### 11. 🧹 Git Meta Verisi Temizleyici ve WorkVisual Başlık Sıyırıcı
*Sürüm kontrolünü temiz tutun.* Otomatik commit'lerde gürültülü git diff'lerini önlemek için WorkVisual başlıklarını (`&ACCESS`, `&REL`, `&PARAM`, `&COMMENT`) tek tıkla sıyırın.

<p align="center">
  <img src="docs/public/media/git_metadata_cleaner.gif" width="720" alt="Git Metadata Cleaner Demo" />
</p>

---

### 12. ⚙️ Modern KRL ve iiQKA FOLD Paketi
*Kodunuzu tek tıkla modern KUKA standartlarına yükseltin.*
* **Seçimi iiQKA FOLD'a Dönüştür (`krl.wrapIiQkaFold`)**: Özel mantığınızı standart iiQKA daraltılabilir bloklarına sarın.
* **Spline Bloğuna Dönüştür (`krl.wrapSplineBlock`)**: Doğrusal ve dairesel hareketleri KSS 8.3–8.7 için yüksek performanslı `SPLINE` / `ENDSPLINE` bloklarına sarın.
* **Çarpışma Koruması Enjektörü (`krl.insertCollisionGuard`)**: Kritik hareket bölgelerinin çevresine otomatik olarak `$TORQMON` tork izleme çerçeveleri enjekte edin.
* **FOLD Temizle ve Aç (`krl.cleanUnwrapFolds`)**: İç hareket talimatlarını koruyarak eski Inline Formları güvenle açın.

---

### 13. 💬 Canlı Destek Ağ Geçidi ve Uzaktan Telepresence
*VS Code'un içinde geliştiricilerle doğrudan iki yönlü destek sohbeti.*
* **Etkileşimli Sohbet Paneli**: Geliştirme mühendislik desteğiyle anında forum tabanlı konu senkronizasyonu.
* **Akıllı Diff & Apply**: Teknik destek tarafından önerilen kod düzeltmelerini tek tıkla inceleyin ve otomatik uygulayın.
* **Uzaktan Telepresence ve Tanılama**: Hızlı saha devreye alma yardımı için isteğe bağlı güvenli telemetri komutları (`/ai_diag`, `/logs`, `/sysinfo`, `/ping`).

---

### 14. 🗂️ Hızlı FOLD Araç Çubuğu ve Bildirim Sıralama
*Devasa programları kolayca yönetin.* FOLD bloklarını, alt programları tek tıkla daraltma ve değişken bildirimlerini otomatik sıralama.

<p align="center">
  <img src="docs/public/media/quick_fold_toolbar.gif" width="720" alt="Quick Fold Toolbar Demo" />
</p>

---

### 15. 💀 Ölü Kod ve Kullanılmayan Global Fonksiyon Analizi
*Kod şişkinliğini ve artık test rutinlerini önleyin.* Tüm çalışma alanınızda çağrılmayan alt rutinleri, kullanılmayan değişkenleri ve erişilemeyen kod dallarını tespit edin.

<p align="center">
  <img src="docs/public/media/dead-code-demo.gif" width="720" alt="Dead Code Analysis Demo" />
</p>

---

### 16. 🎨 Otantik KUKA.Sim ve WorkVisual Sözdizimi Paleti ve KSS 8.7 Sistem Kütüphanesi
*Doğrudan KUKA.Sim 4.10'dan çıkarılan zengin renk paleti ve standart sistem bağlamı.*
* **Çeşitli Yüksek Kontrastlı Palet**: KUKA.Sim (`KRLDark.xshd`) ve WorkVisual'dan (`KRL.xshd`) %100 otantik renk şemaları. Hareket komutları (kalın), bit düzeyinde/mantıksal operatörler, matematiksel semboller, sistem direktifleri (`&ACCESS`, `&REL`) ve onaltılık/ikili sayılar (`'H...'`, `'B...'`) için farklılaştırılmış kapsamlar.
* **KSS 8.7 Standart Sistem Kütüphanesi**: `BAS()`, `MsgNotify()`, `MsgQuit()`, `MsgDialog()`, `USE_CM_PRO_VALUES()`, `TOOL_NAME[]` ve `BASE_NAME[]` için yerleşik tanımlar, parametre yardımı ve `F12` — doğrudan resmi KSS 8.7 referans modüllerine.
* **1 Tık KSS 8.7 Proje İskeleti (`krl.scaffoldKrcFiles`)**: `$config.dat`, `bas.src`, `MsgLib.src`, `collmonlib.src` ve `sps.sub` ile doldurulmuş standart `KRC/R1/System/`, `KRC/R1/Program/` ve `KRC/R1/TP/` klasör ağacını otomatik oluşturur.
* **Fabrika Varsayılanları ve Advance Run Sınırlayıcı**: `$ADVANCE = 3`, `$VEL.CP = 2.0 m/s`, `$ACC.CP = 2.3 m/s²`, `$JERK.CP = 500.0 m/s³` için resmi fabrika değerlerinin (`operate.defaultvalues`) anlık Hover görüntüsü ve `$ADVANCE` geçerli aralığı `0..5` aştığında otomatik lint uyarıları.

---

## 📊 Özellik Karşılaştırma Matrisi (50 Endüstriyel Araç)

| Özellik | Community (Ücretsiz) | Pro Industrial | Mühendislere Faydası |
|:---|:---:|:---:|:---|
| **KRL Sözdizimi Vurgulama** (`.src`, `.dat`, `.sub`, `.kfd`) | ✅ | ✅ | KUKA.Sim çeşitli renk paletiyle tam AST renklendirme |
| **KUKA.Sim 4.10 ve WorkVisual Temaları** | ✅ | ✅ | Otantik AvalonEdit renk şemaları (Koyu ve Açık) |
| **Akıllı Otomatik Tamamlama ve Çekirdek Spesifikasyonları** (957+ değişken, 116 fonksiyon, 111 yapı) | ✅ | ✅ | Resmi KUKA.Sim 4.10 çekirdek tamamlama ve imza yardımı |
| **KSS 8.7 Standart Sistem Kütüphanesi ve F12 Tanımı** | ✅ | ✅ | `bas.src`, `MsgLib.src`, `$config.dat` dosyasına anında F12 atlama |
| **1 Tık KRC Proje İskeleti** | ✅ | ✅ | Standart `KRC/R1/System` klasör yapısını başlatır |
| **Fabrika Varsayılanları Hover'ı ve $ADVANCE Sınırlayıcı** | ✅ | ✅ | Fabrika varsayılanlarını gösterir ve `$ADVANCE > 5` durumunda uyarır |
| **23 Resmi Inline Form Snippet'i** (34 hareket ve mantık şablonu) | ✅ | ✅ | KUKA Roboter GmbH'den tam `;FOLD ... ;%{PE}` şablonları |
| **Sinyal Inlay İpuçları ve Hover Dokümanları** | ✅ | ✅ | Satır içi PLC sinyal etiketleri ve parametre imzaları |
| **Kod Biçimlendirici ve Matris Hizalama** | ✅ | ✅ | Anında 1 tık temizlik (`Shift+Alt+F`) |
| **GitLens Satır Blame'i ve Revizyon Geçmişi** | ✅ | ✅ | Her nokta için anında yazar ve commit takibi |
| **Altı Dilli Mimari** (EN, DE, IT, ES, RU, TR) | ✅ | ✅ | Tam yerel UI, 515 UI anahtarı ve 1.073 sistem değişkeni doküman çevirisi |
| **Git Meta Verisi Temizleyici** | ✅ | ✅ | Kusursuz Git diff'leri için WorkVisual başlıklarını sıyırır |
| **Control Center ve 21 Kartlı Referans Rehberi** | ✅ | ✅ | Gerçek zamanlı tanılama anahtarları ve editör içi kısayol rehberi |
| **36 Komutluk Tam Düz Kenar Çubuğu** | ✅ | ✅ | Her uzantı komutuna 1 tıkla erişim |
| **Yerel Proje ZIP Dışa Aktarma ve Uzaktan Telepresence** | ✅ | ✅ | 1 tıkla tam yedekleme — işletim sistemi gezginine veya Telegram'a |
| **Copilot AI Dil Modeli Araçları Entegrasyonu** | ✅ | ✅ | `krl_safety_check` doğrudan VS Code AI tarafından çağrılabilir |
| **SmartPAD Yedek Kalite Kabul Raporu** | ❌ | **✅ Pro** | Robot pasaportu ve tıklanabilir köprülerle otomatik proje denetimi |
| **Modern KRL ve iiQKA FOLD Paketi** | ❌ | **✅ Pro** | iiQKA FOLD'lar, Spline Blokları ve Çarpışma Koruması |
| **Etkileşimli Akış Şeması Görüntüleyici** (Mermaid SVG) | ❌ | **✅ Pro** | Görsel kontrol akış mantığı ve 2 yönlü koda atlama |
| **Sıkı Blok Dengesi Tanılaması** | ❌ | **✅ Pro** | Kapatılmamış `IF/LOOP/FOR` bloklarını yakalar |
| **Hız ve Güvenlik Denetleyicisi** ($VEL.CP) | ❌ | **✅ Pro** | Tehlikeli Kartezyen aşırı hızları önler |
| **Tool / Base Koruması** | ❌ | **✅ Pro** | Çerçeve başlatmasından önce hareketi işaretler |
| **SmartPAD ZIP Yedek Diff ve Nokta Delta** | ❌ | **✅ Pro** | Tam koordinat deltalarını hesaplar (ΔX, ΔY, ΔZ) |
| **3 Noktalı Euler Çerçeve Hesaplayıcı** | ❌ | **✅ Pro** | Editörde `BASE_DATA`/`TOOL_DATA` hesaplar |
| **EthernetKRL (EKI) XML Paketi** | ❌ | **✅ Pro** | Canlı XML şablon üretici ve doğrulayıcı |
| **Canlı Destek Ağ Geçidi ve Uzaktan Telepresence** | ❌ | **✅ Pro** | Doğrudan 2 yönlü yardım masası sohbeti, Diff & Apply |
| **Ölü Kod ve Kapsam Denetleyicisi** | ❌ | **✅ Pro** | Kullanılmayan değişkenleri ve ölü alt rutinleri bulur |
| **Hareket Diyagramları ve Spline Üretici** | ❌ | **✅ Pro** | KSS 8.3+ için spline eğrilerini görselleştirir |
| **%100 Çevrimdışı Fabrika Erişimi** | ✅ | **✅ Pro** | Üretim sahasında sıfır internet gerekir |

---

## 👑 Pro'ya Yükseltin: Fiyatlandırma ve Anında Lisanslama

Doğrulanmış satıcımız **Dodo Payments** üzerinden esnek, endüstriyel sınıf lisanslama sunuyoruz. Tüm işlemler şifrelidir; 135+ ülkede Kredi Kartı, Apple Pay, Google Pay ve PayPal'ı otomatik KDV/vergi faturalarıyla destekler.

### 💳 Planlar:

| Plan | Fiyat | İndirim / Faturalama | Lisans Koşulları | Ödeme |
|:---|:---:|:---|:---|:---:|
| 🟢 **Community** | **$0** | %100 Sonsuza Kadar Ücretsiz | Kişisel ve Ticari Kullanım | [Ücretsiz Kur](https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension) |
| ⏱️ **Pro Aylık** | **$9.99** / ay | Aylık faturalandırılır | 50 Endüstriyel Pro Aracın Tümü • 5 Aktivasyon | [Pro Monthly Al](https://checkout.dodopayments.com/buy/pdt_0NmAUzwdbzeERSktsOLTp) |
| 👑 **Pro Yıllık** | **$79.00** / yıl | **%35 Tasarruf** (~$6.58/ay) | 50 Pro Aracın Tümü • 5 Aktivasyon • 30 Gün Çevrimdışı Tampon | [Yıllık Pro Al](https://checkout.dodopayments.com/buy/pdt_0NmAV012KFHSjUMyDomJ6) |
| 🏆 **Pro Ömür Boyu** | **$699.00** | **Bir Kez Öde, Sonsuza Kadar Sahip Ol** | 50 Pro Aracın Tümü • 5 Aktivasyon • Ömür Boyu Güncelleme | [Ömür Boyu Pro Al](https://checkout.dodopayments.com/buy/pdt_0NmAcoqVCfuwQ6Xx7qyqr) |
| 🏢 **Team Edition** | **$299.00** / yıl | B2B — Fatura ve Teklif | 50 Pro Aracın Tümü • 25 Aktivasyon (5 mühendis) | [Team Edition Satın Al](https://checkout.dodopayments.com/buy/pdt_0NnLCdgD69GiXDLRJ0K5v) |
| 🏭 **Enterprise Site** | **$1,499.00** / yıl | Sınırsız Lisans | 50 Pro Aracın Tümü • Sınırsız Aktivasyon • Markalı Raporlar | [Enterprise Satın Al](https://checkout.dodopayments.com/buy/pdt_0NnLCdkLwd0dECkpSE1JP) |

<div align="center" style="margin: 25px 0;">
  <a href="https://checkout.dodopayments.com/buy/pdt_0NmAV012KFHSjUMyDomJ6" style="text-decoration:none;">
    <kbd style="font-size: 1.25em; padding: 14px 32px; background-color: #FF6600; color: white; border-radius: 10px; font-weight: bold; border: 1px solid #d15500; cursor: pointer; box-shadow: 0 4px 18px rgba(255,102,0,0.4);">
      ⚡ Plan Seçin ve Abone Olun (Dodo Checkout)
    </kbd>
  </a>
  <p style="margin-top: 10px; font-size: 0.9em; color: #888;">VS Code'da anında 1 tık aktivasyon • 14 Günlük Grace Dönemi Koruması • 30 Günlük Çevrimdışı Tampon</p>
</div>

---

## 🔒 14 Günlük Grace Dönemi ve Çevrimdışı Öncelik Garantisi

Devreye alma mühendisleri parazitli tesislerde, temiz odalarda ve otomotiv hücrelerinde **sıfır ağ bağlantısıyla** çalışır.

* 📶 **30 Günlük Çevrimdışı Tampon**: Bir kez etkinleştirin ve ağ el sıkışması olmadan sahada 30 güne kadar tamamen çevrimdışı çalışın.
* 🛡️ **14 Günlük Grace Dönemi**: Sahadayken uluslararası bir ödeme yöntemi veya kart yenilemesi geçici olarak başarısız olursa, Pro özellikleri **devreye almanın ortasında sizi asla kilitlemez**. Uzantı, akıllı otomatik arka plan yeniden denemeleriyle 14 günlük bir grace penceresi sağlar.

---

## 🛡️ Kurumsal Güvenlik Sertifikasyonu

KUKA KRL Professional, **ReversingLabs Spectra Assure** tarafından **%100 Güvenlik Sağlık Skoru** ile sertifikalandırılmıştır:
* 🟢 **0 Zararlı Yazılım** (Temiz ikili inceleme)
* 🟢 Tüm bağımlılıklarda **0 CVE Güvenlik Açığı**
* 🟢 **0 Gizli Bilgi / Token Sızıntısı**
* 🟢 **0 MITRE ATT&CK Göstergesi**

Resmi Güvenlik Denetimi: [https://secure.software/vscode/packages/liskinlabs/kuka-krl-extension](https://secure.software/vscode/packages/liskinlabs/kuka-krl-extension)

---

## ⌨️ Klavye Kısayolları

| Kısayol | Eylem | Kapsam |
|:---|:---|:---|
| `Shift + Alt + F` | Belgeyi Biçimlendir (KRL 3 boşluklu girinti ve matris hizalama) | Aktif Editör |
| `Ctrl + Alt + F` | Etkileşimli Akış Şemasını Aç | `.src` Dosyası |
| `Ctrl + Alt + D` | Endüstriyel Güvenlik ve Tanılama Denetimini Çalıştır | Çalışma Alanı |
| `Ctrl + Alt + B` | SmartPAD Yedek Diff ve Nokta Delta Denetleyicisini Aç | Aktif Proje |
| `Ctrl + Alt + K` | KUKA Control Center ve 3 Noktalı Çerçeve Matematiğini Başlat | Aktif Editör |
| `Ctrl + Space` | Akıllı KSS Sistem Otomatik Tamamlamayı Tetikle | İmleç Konumu |

---

## ⚙️ Yapılandırma Ayarları

Uzantı davranışlarını `settings.json` dosyanızda yapılandırın:

| Ayar | Varsayılan | Açıklama |
|:---|:---:|:---|
| `krl.indentWidth` | `3` | Girinti boyutu (3 boşluk resmi KUKA standardıdır). |
| `krl.alignAssignments` | `true` | Temiz matrisler için `.dat` dosyalarında `=` sembollerini otomatik hizala. |
| `krl.errorLens.enabled` | `true` | Satır sonlarında tanılama hatalarını satır içi göster. |
| `krl.validateNonAscii` | `true` | Eski KSS derleyicilerini bozan Kiril/ASCII-dışı karakterleri tara. |
| `krl.inlayHints.enabled` | `true` | I/O sinyalleri için açıklayıcı adları satır içi göster. |

---

## 🌐 Dokümantasyon ve Wiki

* 📖 **İngilizce Dokümantasyon**: [https://liskinlabs.github.io/kuka-krl-extension/](https://liskinlabs.github.io/kuka-krl-extension/)
* 🇷🇺 **Русская документация и Вики**: [https://liskinlabs.github.io/kuka-krl-extension/ru/](https://liskinlabs.github.io/kuka-krl-extension/ru/)
* 🇹🇷 **Türkçe Dokümantasyon ve Wiki**: [https://liskinlabs.github.io/kuka-krl-extension/tr/](https://liskinlabs.github.io/kuka-krl-extension/tr/)

---

## 📄 Lisans ve Künye

* **Yayıncı ve Geliştirici**: [Liskin Labs](https://github.com/LiskinLabs) / [Silvestr Liskin](https://www.linkedin.com/in/silvestr-liskin-ab712920b/)
* **Güvenlik Denetçisi**: [ReversingLabs Spectra Assure](https://secure.software/vscode/packages/liskinlabs/kuka-krl-extension)
* **Resmi Satıcı**: [Dodo Payments](https://dodopayments.com/)
