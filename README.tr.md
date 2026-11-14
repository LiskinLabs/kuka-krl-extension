> *Ticari marka bildirimi: KUKA®, WorkVisual®, iiQWorks®, KUKA.Sim®, SmartPAD® ve KRL, KUKA Aktiengesellschaft / KUKA Roboter GmbH şirketinin tescilli markalarıdır. KRL Engineering Toolkit bağımsız bir Liskin Labs ürünüdür; KUKA ile resmi bir bağı yoktur. Çevrimdışı analizler, fiziksel kontrolör üzerindeki güvenlik doğrulamasının yerini almaz.*

<h1 align="center">VS Code için KRL Engineering Toolkit</h1>

<p align="center">
  <b>KUKA robotları için endüstriyel KRL IDE, statik güvenlik analizörü, yedek karşılaştırma ve canlı kontrolör köprüsü.</b><br />
  <b>KRC2, KRC4 ve KRC5</b> (<code>KSS 5.x – 8.7</code> ve <code>KSS 9.x / iiQWorks / iiQKA.OS</code>) · <b>%100 Çevrimdışı Hazır · Buluta Kod Yüklenmez</b>
</p>

<p align="center">
  [English](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.md) · [Русский](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.ru.md) · [Deutsch](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.de.md) · [Türkçe](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.tr.md) · [Español](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.es.md) · [Italiano](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.it.md)
</p>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension"><img src="https://img.shields.io/visual-studio-marketplace/v/LiskinLabs.kuka-krl-extension?style=flat-square&label=VS%20Code%20Marketplace&color=FF6600" alt="VS Code Marketplace" /></a>
  <a href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension"><img src="https://img.shields.io/visual-studio-marketplace/i/LiskinLabs.kuka-krl-extension?style=flat-square&label=Installs&color=2563EB" alt="Installs" /></a>
  <a href="https://open-vsx.org/extension/LiskinLabs/kuka-krl-extension"><img src="https://img.shields.io/open-vsx/v/LiskinLabs/kuka-krl-extension?style=flat-square&logo=eclipseche&logoColor=white&color=007ACC&label=Open%20VSX" alt="Open VSX" /></a>
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/releases"><img src="https://img.shields.io/badge/Release-v1.9.18-FF6600?style=flat-square&logo=visualstudiocode&logoColor=white" alt="Release v1.9.18" /></a>
  <a href="https://secure.software/vscode/packages/liskinlabs/kuka-krl-extension"><img src="https://img.shields.io/badge/Spectra%20Assure-PASSED%20(100%25)-10b981?style=flat-square&logo=shield&logoColor=white" alt="ReversingLabs Security Score" /></a>
  <a href="https://liskinlabs.github.io/kuka-krl-extension/"><img src="https://img.shields.io/badge/Komutlar-126-FF6600?style=flat-square" alt="126 Commands" /></a>
  <a href="https://liskinlabs.github.io/kuka-krl-extension/guide/pro-features"><img src="https://img.shields.io/badge/Pro%20Ara%C3%A7lar-63-0EA5E9?style=flat-square" alt="63 Pro Tools" /></a>
</p>

<p align="center">
  <a href="https://liskinlabs.github.io/kuka-krl-extension/tr/guide/installation"><b>Kurulum ve Hızlı Başlangıç</b></a> ·
  <a href="https://liskinlabs.github.io/kuka-krl-extension/tr/"><b>Dokümantasyon ve 64 Rehber</b></a> ·
  <a href="https://checkout.dodopayments.com/buy/pdt_0NmAV012KFHSjUMyDomJ6?redirect_url=https%3A%2F%2Fkuka-krl-support-gateway.redminotpro5.workers.dev%2Fcheckout%2Fsuccess%3Flang%3Dtr&singlePage=true&showDiscounts=true&discountCode=LAUNCH30"><b>Pro Annual Satın Al (%30 İndirim: LAUNCH30)</b></a> ·
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/blob/main/SUPPORT.md"><b>Destek ve Air-Gap Lisans</b></a>
</p>

> **Kredi kartı gerekmeden 14 gün tüm 63 Pro aracı ücretsiz deneyin:** VS Code'da `Ctrl+Shift+P` ile **`KRL: Start 14-Day Free Trial`** (`krl.startTrial`) veya **`KRL: View Pro Plans & Pricing`** (`krl.openPricingPlans`) komutunu çalıştırın.

<p align="center">
  <img src="https://raw.githubusercontent.com/LiskinLabs/kuka-krl-extension/main/docs/public/media/kuka_control_center.gif" width="760" alt="KUKA Control Center ve Canlı Kontrolör Telemetrisi" />
</p>

---

## Kod Robota Ulaşmadan Önce Hataları Yakalayın

Üretim hattındaki tek bir saatlik duruş **10.000+ USD** maliyet çıkarır: sürekli harekette `$OUT` tetiklenmesine bağlı Advance Run duruşları, `RESUME` öncesinde unutulan `BRAKE` komutu (`KSS 1422`) veya eksik `$TOOL`/`$BASE` tanımları sahada pahalı arızalara yol açar.

**KRL Engineering Toolkit**; **126 komut**, **957 KSS sistem değişkeni**, **183 KUKA robot kinematik profili**, **VASS 26 / VKRC denetimi** ve **canlı kontrolör telemetrisini** doğrudan VS Code, Cursor ve Windsurf editörünüze getirir.

| Özellikler | Community (Ücretsiz) | Pro / Team / Enterprise |
|---|---|---|
| KRL sözdizimi, 6 saha teması, akıllı otomatik tamamlama (`957` KSS değişkeni, `116` fonksiyon) | Sınırsız satır | Sınırsız satır |
| `.src` ↔ `.dat` `F12` tanıma gitme, referans arama, biçimlendirme, FOLD/ENDFOLD, sıralama | Dahil | Dahil |
| Sözdizimi teşhisi, blok dengesi, temel frame denetimleri ve KRL kod parçacıkları | Dahil | Dahil |
| Devreye alma güvenlik denetimi: Advance Run Koruması, `S/T`, 183 robot erişim sınırı | 30 gün değerlendirme | Tam üretim lisansı |
| VASS 26 / `VW_USER` (`101..501`) otomotiv denetçisi ve 3-yönlü `FOLD` vs `.dat` doğrulaması | — | Tam üretim lisansı |
| KSS 8.x WCF (`49002` portu) ve iiQKA.OS canlı telemetri, SmartPAD mesajları, Compile Gate | — | Tam üretim lisansı |
| Açmadan `.zip`/`.wvs` bağlama, nokta delta farkı (`ΔX/Y/Z`), 6D kaydırma/aynalama, `.evt` çözücü | — | Tam üretim lisansı |

---

## Temel Mühendislik Modülleri

### 1. Canlı Kontrolör Köprüsü ve SmartPAD Mesajları (`KSS 8.x` ve `iiQKA.OS 9.x`)
- **Yerel KSS 8.x WCF İstemcisi**: `49002` portu üzerinden doğrudan Node.js içinde çalışır; WorkVisual, KUKA.Sim, Python veya üçüncü taraf DLL gerektirmez.
- **iiQKA.OS (`KRC5`) ve Compile Gate**: `$TOOL`/`$BASE`, eksen torku/sıcaklığı/akımı, PGNO, KOP paketleri ve aranabilir SmartPAD mesaj geçmişini (`krl.live.openMessages`) gösterir.
- **Donanım I/O Satır İçi İpuçları**: `$IN[x]`, `$OUT[y]` ve `$FLAG[z]` yanında okunabilir sinyal adlarını görüntüler.

<p align="center">
  <img src="https://raw.githubusercontent.com/LiskinLabs/kuka-krl-extension/main/docs/public/media/krl_io_signals.gif" width="760" alt="Canlı I/O Sinyal Denetçisi ve İpuçları" />
</p>

### 2. Devreye Alma Öncesi Güvenlik, Kinematik ve VASS 26 / VKRC
- **Kinematik ve Yörünge Koruması**: Bilek/omuz tekillikleri, doğrudaş `CIRC` noktaları, `$APO.CDIS > %50`, `Status/Turn` hataları ve **183 robot modeli** için erişim aşımını tespit eder.
- **Motion 3-Yönlü Veri Bütünlüğü**: SmartPAD `;FOLD` parametreleri (`VB`, Tool, Base) ile `.dat` verileri arasındaki gizli uyuşmazlıkları yakalar.
- **VASS 26 / VKRC Paketi**: `Folge`, `UP`, `MakroSps`, `VW_USER` (`101..501`) ve güvenlik kapısı kilitlemelerini denetler.

<p align="center">
  <img src="https://raw.githubusercontent.com/LiskinLabs/kuka-krl-extension/main/docs/public/media/type-validation-demo.gif" width="760" alt="KRL Statik Güvenlik ve Tip Doğrulama Demosu" />
</p>

### 3. SmartPAD Yedek Karşılaştırma, 6D Dönüşüm ve İkili `.evt` Günlükleri
- **Sıfır Çıkarma `.zip` / `.wvs` Gezgini**: Yedekleri diske açmadan inceler, `.evt` (EVTX) günlüklerini 6 dilde çözer ve ISO 10218-1 kabul raporları üretir.
- **Nokta Delta Denetçisi**: Vardiya veya yedekler arasındaki 3D/6D kaymaları (`ΔX, ΔY, ΔZ, A, B, C`) listeler.
- **6D Toplu Kaydırma ve Aynalama**: Diff önizleme ve AST sağlama geri alma korumasıyla güvenli koordinat dönüşümü.

<p align="center">
  <img src="https://raw.githubusercontent.com/LiskinLabs/kuka-krl-extension/main/docs/public/media/krc_backup_diff.gif" width="760" alt="SmartPAD Yedek Karşılaştırma ve Nokta Delta Denetçisi" />
</p>

### 4. Yüksek Hızlı KRL Dil Sunucusu (Ücretsiz Community Temeli)
`F12` çapraz dosya gezinmesi (`.src` ↔ `.dat`), otomatik tamamlama, biçimlendirme, `FOLD`/`ENDFOLD` katlama ve gerçek zamanlı sözdizimi denetimi **satır limiti olmadan sonsuza dek ücretsizdir**.

<p align="center">
  <img src="https://raw.githubusercontent.com/LiskinLabs/kuka-krl-extension/main/docs/public/media/smart_autocomplete.gif" width="760" alt="Akıllı KRL Otomatik Tamamlama" />
</p>

---

## Sürümler, Lisans ve Şeffaf Fiyatlandırma

**Community Lisansı:** Kişisel öğrenme, akademik/ticari olmayan araştırma ve **30 günlük üretim dışı ticari değerlendirme** için ücretsizdir ([LICENSE.txt](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/LICENSE.txt)). Sürekli ticari ve üretim sahası kullanımı için ücretli lisans gerekir.

> **Lansman İndirimi (`LAUNCH30`):** İlk ödeme işleminizde **`LAUNCH30`** koduyla **%30 indirim** kazanın (aşağıdaki ödeme bağlantılarında otomatik uygulanır). Ödemeler **Dodo Payments** (Merchant of Record) güvencesiyle ve otomatik vergi/PDF faturasıyla işlenir.

| Plan | Liste Fiyatı | `LAUNCH30` (%30 İndirimli) | Aktivasyon Limiti | Uygun Olduğu Ekip | İşlem |
|---|---|---|---|---|---|
| **Community** | 0 USD | 0 USD | Kişisel / Akademik / 30 gün test | Öğrenme ve ticari olmayan kullanım | [Ücretsiz Kur](https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension) |
| **Pro Monthly** | 19 USD / ay | **13.30 USD / ay** | 1 iş istasyonu · İstediğiniz an iptal | Kısa saha görevleri | [Monthly Al](https://checkout.dodopayments.com/buy/pdt_0NmAUzwdbzeERSktsOLTp?redirect_url=https%3A%2F%2Fkuka-krl-support-gateway.redminotpro5.workers.dev%2Fcheckout%2Fsuccess%3Flang%3Dtr&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Pro Annual** *(Önerilen)* | 149 USD / yıl | **104.30 USD / yıl** | 1 iş istasyonu · 1 yıl güncelleme | Profesyonel robotik mühendisleri | [Annual Al (-%30)](https://checkout.dodopayments.com/buy/pdt_0NmAV012KFHSjUMyDomJ6?redirect_url=https%3A%2F%2Fkuka-krl-support-gateway.redminotpro5.workers.dev%2Fcheckout%2Fsuccess%3Flang%3Dtr&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Pro Lifetime** | 699 USD tek sefer | **489.30 USD tek sefer** | 1 iş istasyonu · Süresiz | Bağımsız danışmanlar | [Lifetime Al](https://checkout.dodopayments.com/buy/pdt_0NmAcoqVCfuwQ6Xx7qyqr?redirect_url=https%3A%2F%2Fkuka-krl-support-gateway.redminotpro5.workers.dev%2Fcheckout%2Fsuccess%3Flang%3Dtr&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Team Edition** | 499 USD / yıl | **349.30 USD / yıl** | **5 iş istasyonu** · Tek kurumsal fatura | Devreye alma ekipleri | [Team (5 Koltuk)](https://checkout.dodopayments.com/buy/pdt_0NnLCdgD69GiXDLRJ0K5v?redirect_url=https%3A%2F%2Fkuka-krl-support-gateway.redminotpro5.workers.dev%2Fcheckout%2Fsuccess%3Flang%3Dtr&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Department / Integrator** | 1,499 USD / yıl | **1,049.30 USD / yıl** | **20 iş istasyonu** · Air-Gap | Sistem entegratörleri | [Integrator (20 Koltuk)](https://checkout.dodopayments.com/buy/pdt_0Nq5QVTrbkJbWAUf8qoyn?redirect_url=https%3A%2F%2Fkuka-krl-support-gateway.redminotpro5.workers.dev%2Fcheckout%2Fsuccess%3Flang%3Dtr&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Enterprise Plant** | 4,999 USD / yıl | Kurumsal PO Teklifi | **100 iş istasyonu** · Öncelikli hat | Fabrikalar ve OEM | [Kurumsal Fatura İste](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/SUPPORT.md#2-14-day-free-trial-upgrades--billing-dodo-payments-mor) |

Lisansınız var mı? **[Çevrimiçi Etkinleştir](https://kuka-krl-support-gateway.redminotpro5.workers.dev/activate?lang=tr)** · **[Air-Gap `.lic` Portalı](https://kuka-krl-support-gateway.redminotpro5.workers.dev/airgap)** · **[Müşteri Portalı ve Faturalar](https://customer.dodopayments.com/login/bus_0NlrxPhrg9eHzPZKAgsF1)**

---

## Saha ve Air-Gap Dayanıklılığı

- **%100 Yerel İşleme**: Hiçbir `.src`, `.dat`, `.sub` veya yedek verisi bilgisayarınızdan dışarı gönderilmez ([PRIVACY.md](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/PRIVACY.md)).
- **30 Gün Çevrimdışı Önbellek + 14 Gün Ek Süre**: Doğrulanan lisanslar internetsiz fabrika ağlarında kesintisiz çalışır.
- **Tam Air-Gap Modu**: [Air-Gap Portalı](https://kuka-krl-support-gateway.redminotpro5.workers.dev/airgap) üzerinden Ed25519 imzalı `.lic` dosyası oluşturup `krl.importOfflineLicenseFile` ile içe aktarın.

---

## v1.9.17 Yenilikleri

- **Yerel KSS 8.x WCF İstemcisi**: `49002` portundan WorkVisual/KUKA.Sim olmadan doğrudan Node.js telemetrisi.
- **Tam iiQKA.OS Telemetrisi ve SmartPAD Penceresi**: Tool/Base, güvenlik kilitlemeleri, eksen torku/sıcaklık/akım, PGNO, KOP paketleri ve `krl.live.openMessages`.
- **iiQKA.OS Compile Gate ve Sürüm Duyarlı Geçiş (`KSS 8.3 – 9.3`)**: KSS 8.6.2, KSS 8.7, iiQKA 9.2.3 ve iiQKA 9.3.4 üzerinde canlı doğrulandı ([CHANGELOG.md](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/CHANGELOG.md)).
