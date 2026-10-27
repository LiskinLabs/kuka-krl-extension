# WorkVisual (.wvs) ve KUKA.Sim (.vcmx) Mühendislik Paketleri

WorkVisual proje topolojisi, saha veriyolu sinyal eşleştirmeleri ve CAD çalıştırmadan 3D simülasyon doğrulama.

---

## Genel Bakış

Modern robot devreye alma süreçleri **KUKA WorkVisual** (`.wvs`, `.wvps`) proje dosyalarına ve **KUKA.Sim / Visual Components** (`.vcmx`, `layout.rsc`) simülasyon modellerine dayanır.

Bu paketler, arşivleri sabit diske açmadan doğrudan bellek içinde analiz eder, PLC için sinyal etiketlerini dışa aktarır, simülasyon kilitlenmelerini onarır ve simülasyon yörüngelerini temiz KRL koduna dönüştürür.

---

## WorkVisual Topoloji İnceleyicisi (`krl.inspectWvsTopology`)

* **Arşiv Açmadan Bellek İçi Analiz**: İkili `.wvs` ve `.wvps` projelerini doğrudan RAM içinde okur.
* **KOP Opsiyon Paketleri**: `Solution.MetaData` üzerinden kurulu teknoloji paketlerini (`KUKA.EthernetKRL`, `KUKA.SafeOperation`, `KUKA.GripperSpotTech`, `KUKA.Profinet`), KSS sürümünü ve robot modelini tespit eder.
* **Saha Veriyolu Topolojisi**: EtherCAT kuplör ve dilim modüllerini (`EcatDiag_*.xml`), Virtual I/O ve Profinet yapılandırmalarını ayrıştırır.
* **PLC CAD Sinyal İhracı**: `$IN` ve `$OUT` sinyal bağlantılarını **Siemens TIA Portal XML/SDF**, **Beckhoff TwinCAT 3 GVL** ve **EPLAN CSV** formatlarına aktarır.

---

## KUKA.Sim ve Visual Components (.vcmx)

### 1. Hücre İnceleyicisi (`krl.inspectVcmxLayout`)
* **İki Katmanlı `layout.rsc` Ayrıştırıcısı**: Bileşen ağacını, robot denetleyicilerini (`rSimKinController`), sinyalleri ve süreç programlarını `.vcmx` arşivinden doğrudan çıkarır.

### 2. Simülasyon Kilitlenme ve Yarış Doğrulayıcısı (`krl.validateVcmxSimulation`)
Simülasyonda 4 kritik hata sınıfını tespit eder ve güvenli şekilde otomatik onarır:

| Hata Kodu | Sınıflandırma | Neden ve Belirti |
|---|---|---|
| `VCMX001` | Sinyal Ön Kenar Kilitlenmesi | `ITransportOutStatement` sonrasındaki bekleme komutunun tek bir parçadan sonra hücreyi kilitlemesi |
| `VCMX002` | Zaman Aşımı Hatası | Belirsiz el sıkışmaya yol açan sıfır dışı zaman aşımları |
| `VCMX003` | Ürün Değişkeni Sızıntısı | Parça çıkışından sonra değişkenin sıfırlanmaması |
| `VCMX004` | Kayıp Sinyal Referansı | Eksik veya geçersiz ayrık sinyal referansı |

### 3. VCMX'ten KRL'ye Son İşlemci (`krl.exportVcmxToKrl`)
* Simülasyon süreçlerini (`LinMotion`, `PtpMotion`, `SetSignal`, `WaitSignal`, `Delay`) doğrudan senkronize KRL `.src` ve `.dat` modüllerine çevirir.
