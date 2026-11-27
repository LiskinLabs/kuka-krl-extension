<h1 align="center">KRL Engineering Toolkit için KUKA® Robotları</h1>

<p align="center">
  VS Code, Cursor ve Windsurf içinde KRL dil sunucusu, statik güvenlik denetimi, arşiv açmadan yedek diff, WorkVisual (<code>.wvs</code>) inceleme ve canlı kontrolör telemetrisi.<br />
  <b>KR C2, KR C4 ve KR C5 (micro / -2)</b> · <code>KSS 5.4–8.7</code> · <code>VSS (VKRC) 8.3–8.7</code> · <code>iiQKA.OS2 9.0–9.3</code> · <b>%100 Yerel RAM · Buluta Kod Yüklemesi Yok</b>
</p>

<p align="center">
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.md">English</a> ·
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.ru.md">Русский</a> ·
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.de.md">Deutsch</a> ·
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.tr.md"><b>Türkçe</b></a> ·
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.es.md">Español</a> ·
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.it.md">Italiano</a>
</p>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension"><img src="https://vsmarketplacebadges.dev/version-short/LiskinLabs.kuka-krl-extension.svg?style=flat-square&label=VS%20Code%20Marketplace&color=FF6600" alt="VS Code Marketplace" /></a>
  <a href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension"><img src="https://vsmarketplacebadges.dev/installs-short/LiskinLabs.kuka-krl-extension.svg?style=flat-square&label=Marketplace%20Installs&color=2563EB" alt="Kurulumlar" /></a>
  <a href="https://open-vsx.org/extension/LiskinLabs/kuka-krl-extension"><img src="https://img.shields.io/open-vsx/v/LiskinLabs/kuka-krl-extension?style=flat-square&logo=eclipseche&logoColor=white&color=007ACC&label=Open%20VSX" alt="Open VSX" /></a>
  <a href="https://open-vsx.org/extension/LiskinLabs/kuka-krl-extension"><img src="https://img.shields.io/open-vsx/dt/LiskinLabs/kuka-krl-extension?style=flat-square&logo=eclipseche&logoColor=white&color=007ACC&label=Open%20VSX%20Downloads" alt="Open VSX İndirmeleri" /></a>
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/releases"><img src="https://img.shields.io/badge/Release-v1.9.27-FF6600?style=flat-square&logo=visualstudiocode&logoColor=white" alt="Release v1.9.27" /></a>
  <a href="https://secure.software/vscode/packages/liskinlabs/kuka-krl-extension"><img src="https://img.shields.io/badge/Spectra%20Assure-PASSED%20(0%20CVE)-10b981?style=flat-square&logo=shield&logoColor=white" alt="Spectra Assure" /></a>
  <a href="https://liskinlabs.com/"><img src="https://img.shields.io/badge/Fleet%20Audited-4.13M%2B%20LoC-10b981?style=flat-square" alt="4.13M+ Satır" /></a>
  <a href="https://liskinlabs.com/guide/pro-features"><img src="https://img.shields.io/badge/Commands-136%20(69%20Free%20%7C%2067%20Pro)-0EA5E9?style=flat-square" alt="136 Komut" /></a>
</p>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension"><b>Marketplace'ten Kur</b></a> ·
  <a href="https://open-vsx.org/extension/LiskinLabs/kuka-krl-extension"><b>Open VSX'ten Kur</b></a> ·
  <a href="https://liskinlabs.com/tr/"><b>Dokümantasyon</b></a> · ·
  <a href="https://sim.liskinlabs.com/"><b>3D Simülatör</b></a> ·
  <a href="mailto:info@liskinlabs.com"><b>info@liskinlabs.com</b></a>
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/blob/main/SUPPORT.md"><b>Destek ve Air-Gap</b></a>
</p>

> **Kart gerektirmeyen 14 günlük Pro deneme:** VS Code'da `Ctrl+Shift+P` tuşlarına basın ve **`KRL: Start 14-Day Free Trial`** (`krl.startTrial`) komutunu çalıştırın veya **`KRL: View Pricing Plans & Upgrade Options`** (`krl.openPricingPlans`) ile planları görüntüleyin.

<p align="center">
  <img src="https://raw.githubusercontent.com/LiskinLabs/kuka-krl-extension/main/docs/public/media/kuka_control_center.gif" width="780" alt="KRL Engineering Toolkit Kontrol Merkezi ve Canlı Telemetri" />
</p>

---

## Devreye Alma Öncesi Yakalanan Tipik Hatalar

| Kontrolör Sorunu | Genel Editörlerin Kaçırdığı | KRL Engineering Toolkit Çözümü |
|---|---|---|
| **`RESUME` öncesi eksik `BRAKE`** | Kesme içinde `BRAKE` olmadan `RESUME` ön okuma duruşunu tetikler (robot anında frenlemek yerine aktif segmenti tamamlar) ve yığın / `$ADVANCE=0` uyumsuzluğunda `KSS 1584` oluşturur | Statik analiz eksik `BRAKE` (veya `INTERRUPT WITH BRAKE`) durumunu yakalar ve `Ctrl+.` ile Diff önizlemeli `BRAKE` ekler |
| **Advance Run Duruşları (`$OUT` / `WAIT`)** | `C_DIS` / spline geçişlerinde doğrudan `$OUT` yazımı Vorlaufstopp yaratır | Ön okumayı kesen satırları işaretler ve `TRIGGER WHEN DISTANCE=0 DELAY=0 DO $OUT[...] = TRUE` önerir |
| **SmartPAD Vardiya Nokta Sapması** | `E6POS` noktaları izlenmeden güncellenir | `.zip` / `.ibz` / `KRCDiag` arşivlerini RAM'de (`< 80 ms`) bağlar ve 6D farkları (`ΔX, ΔY, ΔZ, A, B, C`) gösterir |
| **`;FOLD`, `.dat` ve Sürüm Uyumsuzluğu** | XML `;Params` kayması, KSS 9.x'te `PDAT.VEL` veya `DRYRUN ... ENDDRYRUN` içi hareket | `14` KSS profilini (`5.4–9.3`), `SVEL_CP2`/`PDAT`/`LDAT` kurallarını, `;FOLD` senkronunu ve `DRYRUN` yasağını denetler |
| **UTF-8 BOM ve Kodlama Hataları** | Gizli BOM `\xEF\xBB\xBF` `iiQKA.OS2` tarafından reddedilir; yanlış kodlama metinleri bozar | BOM olmadan UTF-8 (`iiQKA.OS2`), `CP1251`, `Windows-1252` ve `UTF-16LE` kodlamalarını kayıpsız işler |
| **`.wvs` ve I/O İncelemesi** | Sadece I/O veya veri yolu topolojisi için ağır yazılımlar açmak | Windows, macOS, Linux'ta `.wvs`/`.vcmx` açar veya resmi portlardan (`49002`, `443`, `4840`, `7000`) bağlanır |

---

## Doğrulanmış Temel ve Güvenlik

- **108 gerçek fabrika KUKA yedeğiyle test edildi**: `4,136,829` satır KRL kodu `25.4 sn` içinde tarandı.
- **KSS bilgi tabanı**: `957` sistem değişkeni (`127` kılavuza uygun salt-okunur kural + sürüm kapısı), `116+` KRL / EKI 6.x / RSI 6.x fonksiyonu, `111` yapı, `112` enum, `183` robot profili ve `136` komut (`69` Free + `67` Pro).
- **Kontrolör testleri**: `KSS 8.6.2 (OfficeLite)`, `KSS 8.7 (KR C5)`, `iiQKA.OS2 9.2.3 (VRC)` ve `iiQKA.OS2 9.3.4 (KR C5)`.
- **Güvenlik ve Air-Gap**: ReversingLabs Spectra Assure PASSED (`0 CVE`), `%100` yerel RAM işleme, buluta kod aktarımı yok, çevrimdışı Ed25519 `.lic`.

---

## Temel Mühendislik Modülleri

1. **Canlı Kontrolör Köprüsü ve I/O `[PRO]`**: WorkVisual veya üçüncü taraf DLL olmadan `WCF` (`49002`), `iiQKA.OS2` gRPC (`443`), `OPC UA` probe (`4840`) ve `KUKAVARPROXY` (`7000`); sıfır yapılandırmalı keşif, Cross-Subnet Scout, `SecretStorage` kimlik bilgileri (`krl.live.changeCredentials`), `CFG` filtreli 4096-pin I/O (`KrcIoSignals.xml`), `UserTexts.kxr`, Watch SVG, 7-noktalı Health sekmesi ve Compile Gate.
2. **Statik Güvenlik, Güvenli Onarım ve VASS 26 / VKRC `[PRO]`**: AST geri alma korumalı `krl.fixAllSafeIssuesInFile`, `KSS 5.4–9.3` (`14` profil) geçişi, `DRYRUN ... ENDDRYRUN` (`krl-dryrun-motion`), IK tekillik kontrolü (`|A5| <= 5°`), `SPS.SUB`, **Volkswagen VASS 26 / `VW_USER 101..501`** ve kullanılmayan değişken temizliği (`krl.cleanupUnusedVariables`).
3. **Arşiv Diff, `.wvs` ve `.vcmx` `[PRO]`**: `.zip`/`.ibz`/`KRCDiag` bellek içi açma, 6D nokta deltaları, `.evt` (EVTX) / `krc.log` çözücü, **TIA Portal**, **TwinCAT 3** ve **EPLAN**'a `.wvs` dışa aktarımı (`krl.inspectFieldbusTopology`), `.vcmx` doğrulama (`VCMX001–VCMX004`) ve **ISO 10218-1/-2** kabul raporları.
4. **Akış Şemaları, `iiQKA.RSI 6.x` / `EKI 6.x`, CAM ve MCP `[PRO]`**: Tıklanabilir SVG akış şeması (`krl.showFlowchart`), klasik ve `iiQKA 6.x` (`RSI_LOAD`, `RSI_PROCESS_ON()`, `EKI_Load`) kod üretimi, CNC G-Code / SVG içe aktarma ve yerel MCP (`127.0.0.1`).
5. **KRL Dil Sunucusu `[FREE CORE]`**: `F12` gezinme (`.src` <-> `.dat`), referans bulma, modül-izole yeniden adlandırma, `957` sistem değişkeni, `;%{PE}` koruyan biçimlendirme ve 6 tema (`69` ücretsiz komut).

> **Sınır:** Saha veri yolu donanım kurulumu, SafeOperation ve final kontrolör dağıtımı için KUKA WorkVisual / iiQWorks.Sim yazılımının yerini almaz. Sertifikalı emniyet yazılımı değildir (`Non-SIL / Non-PL`).

---

## Lisanslama ve Fiyatlar

**Community Sürümü:** Kişisel öğrenme, eğitim ve ticari olmayan araştırmalar için ücretsizdir ([LICENSE.txt](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/LICENSE.txt)). Ticari kullanım için **14 günlük ücretsiz Pro deneme** (`krl.startTrial`) sonrası ticari lisans gerekir.

| Plan | Standart Fiyat | Kapsam | Hedef | Satın Alma |
|---|---|---|---|---|
| **Community** | USD 0 | Kişisel / Akademik · 14 gün Pro deneme | Eğitim ve test | [Ücretsiz Kur](https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension) |
| **Pro Monthly** | USD 19 / ay | 1 bilgisayar · İstediğiniz an iptal | Kısa saha görevleri | [Aylık Al](https://checkout.dodopayments.com/buy/pdt_0NmAUzwdbzeERSktsOLTp?redirect_url=https%3A%2F%2Fapi.liskinlabs.com%2Fcheckout%2Fsuccess%3Flang%3Dtr&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Pro Annual** | USD 149 / yıl | 1 bilgisayar · 1 yıl güncelleme | Tam zamanlı KUKA mühendisleri | [Yıllık Al](https://checkout.dodopayments.com/buy/pdt_0NmAV012KFHSjUMyDomJ6?redirect_url=https%3A%2F%2Fapi.liskinlabs.com%2Fcheckout%2Fsuccess%3Flang%3Dtr&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Pro Lifetime** | USD 699 tek seferlik | 1 bilgisayar · Kalıcı | Bağımsız danışmanlar | [Ömür Boyu](https://checkout.dodopayments.com/buy/pdt_0NmAcoqVCfuwQ6Xx7qyqr?redirect_url=https%3A%2F%2Fapi.liskinlabs.com%2Fcheckout%2Fsuccess%3Flang%3Dtr&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Team** | USD 499 / yıl | 5 bilgisayar · Tek fatura | Otomasyon ekipleri | [Team Al](https://checkout.dodopayments.com/buy/pdt_0NnLCdgD69GiXDLRJ0K5v?redirect_url=https%3A%2F%2Fapi.liskinlabs.com%2Fcheckout%2Fsuccess%3Flang%3Dtr&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Department** | USD 1,499 / yıl | 20 bilgisayar · Air-Gap desteği | Sistem entegratörleri | [Department Al](https://checkout.dodopayments.com/buy/pdt_0Nq5QVTrbkJbWAUf8qoyn?redirect_url=https%3A%2F%2Fapi.liskinlabs.com%2Fcheckout%2Fsuccess%3Flang%3Dtr&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Enterprise** | USD 4,999 / yıl | 100 bilgisayar · PO ve SLA | Fabrikalar ve OEM | [Kurumsal Fatura](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/SUPPORT.md#2-14-day-free-trial-upgrades--billing-dodo-payments-mor) |

<sub>`LAUNCH30` (%30 indirim) yukarıdaki ödeme bağlantılarında otomatik uygulanır. Ödemeler Dodo Payments (Merchant of Record) tarafından işlenir. Lisanslı kullanıcılar: <a href="https://api.liskinlabs.com/activate">Çevrimiçi Etkinleştir</a> · <a href="https://api.liskinlabs.com/airgap">Air-Gap .lic</a> · <a href="https://customer.dodopayments.com/login/bus_0NlrxPhrg9eHzPZKAgsF1">Müşteri Portalı</a> · <a href="mailto:info@liskinlabs.com">info@liskinlabs.com</a>.</sub>

---

## Hızlı Başlangıç, Gizlilik ve Yasal Uyarılar

```bash
code --install-extension LiskinLabs.kuka-krl-extension
```

Veriler yerel kalır ([PRIVACY.md](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/PRIVACY.md)). Sürüm geçmişi: [CHANGELOG.md](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/CHANGELOG.md). Çevrimdışı kontroller **ISO 10218-1/-2** ve **ISO 13849-1** kapsamında SmartPAD üzerinde `T1` (`$OV_PRO <= 30%`) doğrulamasının yerini almaz. KUKA®, WorkVisual®, iiQWorks®, KUKA.Sim®, SmartPAD® ve KRL, KUKA Aktiengesellschaft / KUKA Roboter GmbH firmasının tescilli ticari markalarıdır.
