<h1 align="center">KUKA Engineering Toolkit</h1>

<p align="center">
  <b>KUKA robotlarÄ± iÃ§in endÃ¼striyel mÃ¼hendislik, arÄ±za teÅŸhisi ve devreye alma Ã¶ncesi analiz platformu.</b><br />
  <i>VS Code eklentisi olarak kullanÄ±labilir.</i><br />
  <b>KRC2, KRC4 ve KRC5 KontrolÃ¶rleri (KSS 5.x â€“ 8.7+)</b> iÃ§in geliÅŸtirilmiÅŸtir.
</p>

<details>
<summary>Language / Ğ¯Ğ·Ñ‹Ğº / Dil / Sprache / Lingua / Idioma</summary>

| Language | File |
|---|---|
| English | [README.md](README.md) |
| Ğ ÑƒÑÑĞºĞ¸Ğ¹ | [README.ru.md](README.ru.md) |
| TÃ¼rkÃ§e | [README.tr.md](README.tr.md) |
| Deutsch | [README.de.md](README.de.md) |
| Italiano | [README.it.md](README.it.md) |
| EspaÃ±ol | [README.es.md](README.es.md) |

</details>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension"><img src="https://badgen.net/vs-marketplace/v/LiskinLabs.kuka-krl-extension?style=flat&label=VS%20Code%20Marketplace&color=FF6600" alt="VS Code Marketplace" /></a>
  <a href="https://open-vsx.org/extension/LiskinLabs/kuka-krl-extension"><img src="https://img.shields.io/open-vsx/v/LiskinLabs/kuka-krl-extension?style=flat-square&logo=eclipseche&logoColor=white&color=007ACC&label=Open%20VSX" alt="Open VSX" /></a>
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/releases"><img src="https://img.shields.io/badge/Release-v1.9.5-FF6600?style=flat-square&logo=visualstudiocode&logoColor=white" alt="Release v1.9.5" /></a>
  <a href="https://secure.software/vscode/packages/liskinlabs/kuka-krl-extension"><img src="https://img.shields.io/badge/Spectra%20Assure-PASSED%20(100%25)-10b981?style=flat-square&logo=shield&logoColor=white" alt="ReversingLabs Security Score" /></a>
  <a href="https://liskinlabs.github.io/kuka-krl-extension/"><img src="https://img.shields.io/badge/Fleet%20Verified-4.2M%2B%20LoC-10b981?style=flat-square" alt="Fleet Verified" /></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Language-KRL-orange?style=flat-square" />
  <img src="https://img.shields.io/badge/Controllers-KRC2%20%7C%20KRC4%20%7C%20KRC5-007ACC?style=flat-square" />
  <img src="https://img.shields.io/badge/Compatibility-KSS%208.x%20%7C%20KSS%209.x%20(iiQWorks)-FF6600?style=flat-square" />
  <img src="https://img.shields.io/badge/Built--in%20Specs-957%20Vars%20%7C%20116%20Functions-10b981?style=flat-square" />
  <img src="https://img.shields.io/badge/Offline--First-100%25%20Factory%20Ready-green?style=flat-square" />
  <img src="https://img.shields.io/badge/Security-0%20Malware%20%7C%200%20CVEs-emerald?style=flat-square" />
  <img src="https://img.shields.io/badge/Localization-EN%20%7C%20DE%20%7C%20IT%20%7C%20ES%20%7C%20RU%20%7C%20TR-blue?style=flat-square" />
</p>

<p align="center">
  <a href="https://liskinlabs.github.io/kuka-krl-extension/"><b>Ä°nteraktif Wiki ve DokÃ¼mantasyon</b></a> â€¢
  <a href="https://checkout.dodopayments.com/buy/pdt_0NmAUzwdbzeERSktsOLTp"><b>Pro Monthly ($19.99/ay)</b></a> â€¢ 
  <a href="https://checkout.dodopayments.com/buy/pdt_0NmAV012KFHSjUMyDomJ6"><b>YÄ±llÄ±k Pro ($149.00/yÄ±l â€” %35 Tasarruf)</b></a> â€¢ 
  <a href="https://secure.software/vscode/packages/liskinlabs/kuka-krl-extension"><b>GÃ¼venlik Denetim Raporu</b></a>
</p>

---

## Robot KontrolÃ¶rÃ¼ne YÃ¼klemeden Ã–nce (Before the robot)

> **DeÄŸiÅŸiklikleri fiziksel kontrolÃ¶re daÄŸÄ±tmadan Ã¶nce KUKA programlarÄ±nÄ±, yedeklerini, gÃ¼nlÃ¼klerini, G/Ã‡ sinyallerini, koordinatlarÄ±nÄ± ve hareket yollarÄ±nÄ± analiz edin.**

* **DuruÅŸlarÄ± Ã–nleyin**: Ãœretim baÅŸlamadan Ã¶nce programlama hatalarÄ±nÄ±, konfigÃ¼rasyon risklerini ve hareket tehlikelerini yakalayÄ±n.
* **DeÄŸiÅŸiklikleri AnlayÄ±n**: SmartPAD yedeklerini karÅŸÄ±laÅŸtÄ±rÄ±n ve `.src` ile `.dat` dosyalarÄ±nda tam olarak neyin deÄŸiÅŸtiÄŸini nokta deltalarÄ±yla tespit edin.
* **MÃ¼hendisliÄŸi StandartlaÅŸtÄ±rÄ±n**: KRL projelerini ÅŸirketinizin mÃ¼hendislik kurallarÄ±na ve otomotiv standartlarÄ±na (VASS 26) gÃ¶re otomatik denetleyin.

---

## Saatlik 10.000 DolarlÄ±k Ãœretim DuruÅŸu Sorunu

Her devreye alma mÃ¼hendisi bu acÄ±yÄ± bilir:
1. **YavaÅŸ DÃ¶ngÃ¼**: DosyalarÄ± doÄŸrudan SmartPAD Ã¶ÄŸretim panelinde dÃ¼zenlemek veya yavaÅŸ WorkVisual daÄŸÄ±tÄ±mlarÄ±yla boÄŸuÅŸmak.
2. **Gizli Ã‡arpÄ±ÅŸma Riski**: Tek bir eksik `$TOOL` veya `$BASE` atamasÄ±, doÄŸrulanmamÄ±ÅŸ bir nokta koordinat kaymasÄ± veya ilk otomatik test koÅŸusunda mekanik Ã§arpÄ±ÅŸmaya neden olan yanlÄ±ÅŸlÄ±kla bir Kartezyen `$VEL.CP` aÅŸÄ±mÄ±.
3. **DoÄŸrulanmamÄ±ÅŸ DeÄŸiÅŸiklikler**: Ekip arkadaÅŸlarÄ± gece vardiyasÄ±nda robot panelinde noktalarÄ± dÃ¼zeltir, sÃ¼rÃ¼m kontrolÃ¼ sÄ±fÄ±rdÄ±r.

**KUKA KRL Professional**, editÃ¶rÃ¼nÃ¼zÃ¼ yÃ¼ksek performanslÄ± bir **endÃ¼striyel robotik komuta merkezine** dÃ¶nÃ¼ÅŸtÃ¼rÃ¼r. SÃ¶zdizimi hatalarÄ±nÄ±, kinematik hatalarÄ±, eksik blok dengelerini ve koordinat uyumsuzluklarÄ±nÄ± kod **fiziksel robot kontrolÃ¶rÃ¼ne dokunmadan Ã–NCE** yakalar.

> **YatÄ±rÄ±m Getirisi Garantisi:** Kodu Ã¼retim hattÄ±nda Ã§alÄ±ÅŸtÄ±rmadan Ã¶nce tek bir sÃ¶zdizimi hatasÄ± veya mekanik Ã§arpÄ±ÅŸma yakalamak, ilk 5 dakikada Ã¶mÃ¼r boyu Pro lisansÄ±nÄ± karÅŸÄ±lar.

---

## Temel Profesyonel Ã–zellikler

### 1. EtkileÅŸimli AkÄ±ÅŸ ÅemasÄ± ve Kontrol AkÄ±ÅŸ GrafiÄŸi
*Ä°Ã§ iÃ§e geÃ§miÅŸ mantÄ±ÄŸÄ± elle izlemeyi bÄ±rakÄ±n.* Devasa, karmaÅŸÄ±k `.src` programlarÄ±nÄ± temiz, etkileÅŸimli, tÄ±klanabilir kontrol akÄ±ÅŸ diyagramlarÄ±na dÃ¶nÃ¼ÅŸtÃ¼rÃ¼n.
* **Ã‡ift YÃ¶nlÃ¼ Koda Atlama**: Herhangi bir akÄ±ÅŸ ÅŸemasÄ± bloÄŸuna tÄ±klayarak tam kod satÄ±rÄ±na anÄ±nda atlayÄ±n.
* **Alt Program DetayÄ±**: Alt program Ã§aÄŸrÄ±larÄ±na tÄ±klayÄ±n (Ã¶rn. `PickPart()`, `WeldSeam()`) ve akÄ±ÅŸ ÅŸemalarÄ±nÄ± yÃ¼kleyin.
* **Sinyaller ve ZamanlayÄ±cÄ±lar**: I/O sinyalleri, bayraklar ve zamanlayÄ±cÄ±lar iÃ§in renk kodlu durum rozetleri.
* **YerleÅŸik GÃ¼venlik Paneli**: GÃ¶rÃ¼ntÃ¼lenen program iÃ§in tam EndÃ¼striyel GÃ¼venlik analizi Ã§alÄ±ÅŸÄ±r â€” hareket, aktÃ¼atÃ¶r ve kilitlenme riskleri tek tÄ±kla satÄ±ra gitme ile.
* **SVG VektÃ¶r DÄ±ÅŸa Aktarma**: MÃ¼ÅŸteri teslimleri ve otomasyon dokÃ¼mantasyonu iÃ§in yÃ¼ksek Ã§Ã¶zÃ¼nÃ¼rlÃ¼klÃ¼ vektÃ¶r diyagramlar.

<p align="center">
  <img src="docs/public/media/control_flow_graph.gif" width="720" alt="Interactive Flowchart Demo" />
</p>

---

### 2. EndÃ¼striyel GÃ¼venlik ve Derin MantÄ±k AnalizÃ¶rÃ¼
*KontrolÃ¶re dokunmadan Ã¶nce sÃ¶zdizimi Ã§Ã¶kmelerini, kilitlenmeleri ve mekanik Ã§arpÄ±ÅŸma risklerini ortadan kaldÄ±rÄ±n.*
* **SÄ±kÄ± Blok Dengesi**: KRC derlemesinden Ã¶nce kayÄ±p `IF / ENDIF`, `FOR / ENDFOR` ve `LOOP / ENDLOOP` bloklarÄ±nÄ± iÅŸaretler.
* **Tool/Base KorumasÄ±**: Hareket komutlarÄ± (`PTP`, `LIN`, `CIRC`) aktif `$TOOL` veya `$BASE` baÅŸlatmasÄ± olmadan Ã§alÄ±ÅŸÄ±rsa uyarÄ±r.
* **HÄ±z Denetleyicisi**: Kartezyen hÄ±z `$VEL.CP` gÃ¼venli devreye alma sÄ±nÄ±rlarÄ±nÄ± aÅŸtÄ±ÄŸÄ±nda uyarÄ±r (> 2.0 m/s).
* **Kilitlenme Engelleyici**: `WAIT FOR` koÅŸullarÄ±nda eksik zaman aÅŸÄ±mlarÄ±nÄ± ve `EXIT` iÃ§ermeyen sonsuz dÃ¶ngÃ¼leri iÅŸaretler.
* **Kiril ve ASCII-DÄ±ÅŸÄ± Engelleyici**: Eski KSS derleyicilerini sessizce Ã§Ã¶kerten yanlÄ±ÅŸlÄ±kla yazÄ±lan ASCII-dÄ±ÅŸÄ± klavye karakterlerini tespit eder.

<p align="center">
  <img src="docs/public/media/type-validation-demo.gif" width="720" alt="Safety and Diagnostics Demo" />
</p>

---

### 3. SmartPAD ZIP Yedek KarÅŸÄ±laÅŸtÄ±rma ve Nokta Delta MatematiÄŸi
*CanlÄ± proje kodunu SmartPAD `.zip` arÅŸiv yedekleriyle inceleyin ve karÅŸÄ±laÅŸtÄ±rÄ±n.*
* **Delta MatematiÄŸi**: `E6POS`, `POS` ve `E6AXIS` noktalarÄ± iÃ§in tam 6 eksenli uzamsal kaymalarÄ± hesaplar (**Î”X, Î”Y, Î”Z, Î”A, Î”B, Î”C**).
* **SÄ±fÄ±r Temas Denetimi**: Ã‡arpÄ±ÅŸmaya neden olmadan Ã¶nce Ã¼retim sahasÄ±nda yapÄ±lan doÄŸrulanmamÄ±ÅŸ nokta dÃ¼zeltmelerini anÄ±nda tespit eder.
* **Yan Yana GÃ¶rsel KarÅŸÄ±laÅŸtÄ±rma**: VS Code iÃ§ine yerleÅŸtirilmiÅŸ renk kodlu grafik diff gÃ¶rÃ¼ntÃ¼leyici.

<p align="center">
  <img src="docs/public/media/krc_backup_diff.gif" width="720" alt="SmartPAD Backup Diff Demo" />
</p>

---

### 4. GitLens Seviyesinde KRL SÃ¼rÃ¼m KontrolÃ¼
*Her koordinat dÃ¼zenlemesini ve program deÄŸiÅŸikliÄŸini hassasiyetle izleyin.*
* **SatÄ±r Blame NotlarÄ±**: Herhangi bir KRL satÄ±rÄ± iÃ§in yazar, zaman damgasÄ± ve commit detaylarÄ± durum Ã§ubuÄŸunda.
* **Commit Denetleyicisi**: Tam commit diff'lerini, commit meta verilerini ve geÃ§miÅŸ revizyonlarÄ± incelemek iÃ§in durum Ã§ubuÄŸu blame'ine tÄ±klayÄ±n.
* **GÃ¶rsel Dosya GeÃ§miÅŸi (`krl.viewFileHistory`)**: Mevcut Ã§alÄ±ÅŸma alanÄ± kodunu herhangi bir tarihsel Git commit'iyle yan yana karÅŸÄ±laÅŸtÄ±rÄ±n.

---

### 5. 3 NoktalÄ± Euler Ã‡erÃ§eve MatematiÄŸi ve KUKA Control Center
*EditÃ¶rÃ¼nÃ¼zÃ¼n iÃ§ine yerleÅŸtirilmiÅŸ doÄŸrudan koordinat sistemi dÃ¶nÃ¼ÅŸÃ¼m hesap makinesi.*
* **3 Nokta YÃ¶ntemi**: Ã–lÃ§Ã¼len kalibrasyon noktalarÄ±ndan `BASE_DATA` ve `TOOL_DATA` orijinlerini ve Euler dÃ¶nÃ¼ÅŸ aÃ§Ä±larÄ±nÄ± (A, B, C) hesaplayÄ±n.
* **DoÄŸrudan `.dat` Ekleme**: Hesaplanan koordinat Ã§erÃ§evelerini tek tÄ±kla veri dosyalarÄ±na ekleyin.
* **SÄ±fÄ±r Trigonometri HatasÄ±**: Elektronik tablo hesaplamalarÄ±nÄ± ve sahadaki manuel yÃ¶nlendirme matematiÄŸini ortadan kaldÄ±rÄ±n.

<p align="center">
  <img src="docs/public/media/kuka_control_center.gif" width="720" alt="KUKA Control Center Demo" />
</p>

---

### 6. Sinyal Inlay Ä°puÃ§larÄ± ve PLC Yorum EÅŸleme
*Elektrik ÅŸemalarÄ±nÄ± karÄ±ÅŸtÄ±rmadan I/O mantÄ±ÄŸÄ±nÄ± bir bakÄ±ÅŸta anlayÄ±n.*
* Sinyal tanÄ±mlarÄ±nÄ± doÄŸrudan `$config.dat` ve `kuka_signals.json` dosyasÄ±ndan okur.
* `$IN[x]`, `$OUT[y]`, `$ANIN[z]` ve `$FLAG[k]` yanÄ±nda insan tarafÄ±ndan okunabilir etiketler gÃ¶sterir.

<p align="center">
  <img src="docs/public/media/inlay_hints.gif" width="720" alt="Signal Inlay Hints Demo" />
</p>

---

### 7. Otomatik Kod BiÃ§imlendirici ve Matris Hizalama
*DaÄŸÄ±nÄ±k el yazÄ±mÄ± kodu tek tuÅŸla (`Shift+Alt+F`) temiz, standart endÃ¼striyel koda dÃ¶nÃ¼ÅŸtÃ¼rÃ¼n.*
* Standartlara uygun 3 boÅŸluklu KUKA girintisi.
* Okunabilir koordinat matrisleri iÃ§in `.dat` dosyalarÄ±nda `=` atama operatÃ¶rlerini hizalar.
* KRL anahtar kelimeleri iÃ§in bÃ¼yÃ¼k/kÃ¼Ã§Ã¼k harf standardizasyonu (`DEF`, `GLOBAL`, `INTERRUPT`, `CONTINUE`).

<p align="center">
  <img src="docs/public/media/code_formatter.gif" width="720" alt="Code Formatter Demo" />
</p>

---

### 8. KRL Spesifikasyon VeritabanÄ± ve 957+ Sistem DeÄŸiÅŸkeni
*KRL dil standartlarÄ±na ve resmi KSS ve iiQWorks dokÃ¼mantasyonuna uygun baÄŸÄ±msÄ±z spesifikasyonlar.*
* **957 Sistem DeÄŸiÅŸkeni**: KSS 8.3â€“8.7/9.0 sistem deÄŸiÅŸkenlerinin (`$ACC`, `$TOOL`, `$BASE`, `$POS_ACT`, `$VEL_AXIS` vb.) fiziksel birimler, dizi sÄ±nÄ±rlarÄ± (217 dizi) ve Salt-Okunur durumlarÄ±yla kapsamlÄ± kapsamÄ±.
* **116 YerleÅŸik Sistem Fonksiyonu ve Wonderlib**: Kinematik (`FORWARD`, `INVERSE`, `INV_POS`, `TOOL_ADJ`), string iÅŸlemleri, tip dÃ¶nÃ¼ÅŸtÃ¼rme, mesaj diyaloglarÄ±, tork limitleri ve Wonderlib rutinleri iÃ§in gerÃ§ek zamanlÄ± `signatureHelp` parametre ipuÃ§larÄ±yla tam destek.
* **111 YapÄ± ve 112 ENUM (443 Literal)**: AkÄ±llÄ± nokta tamamlama (`$TOOL.`, `$ACC.`, `POINT.`) ve `#` enum literal otomatik tamamlama (`#AUT`, `#T1`, `#P_FREE`, `#QUIT`).
* **23 Standart KRL Inline Form Snippet'i (34 Åablon)**: Tam Inline Form baÅŸlÄ±klarÄ±yla (`;FOLD ... ;%{PE}`) standart KRL ÅŸablonlarÄ± (`ptpi`, `slini`, `sptpi`, `scirc`, `PTPCo`, `ptprel`, `trigdist`, `sigin`, `wsec`, `Forr`).
* **451 Anahtar Kelimelik Dil Matrisi**: KRL standart sÃ¶zdizimi kurallarÄ±nÄ±n eksiksiz kapsamÄ± â€” sÄ±fÄ±r yanlÄ±ÅŸ pozitif sÃ¶zdizimi uyarÄ±sÄ±.
* **Tek TÄ±rnaklÄ± Hex ve Ä°kili SÃ¶zdizimi**: `'B000001'` (ikili), `'HFF'` (onaltÄ±lÄ±k) ve karakter literalleri iÃ§in tam ayrÄ±ÅŸtÄ±rÄ±cÄ± ve tanÄ±lama uyumluluÄŸu.
* **SÄ±fÄ±r YanlÄ±ÅŸ Pozitif Filo Denetimi (4.1M+ SatÄ±r)**: 107 gerÃ§ek Ã¼retim robot yedeÄŸinde 0 yanlÄ±ÅŸ tanÄ±lamayla doÄŸrulandÄ±.

<p align="center">
  <img src="docs/public/media/smart_autocomplete.gif" width="720" alt="Smart Autocomplete Demo" />
</p>

---

### 9. TanÄ±ma Git ve TÃ¼m ReferanslarÄ± Bul
*TÃ¼m proje klasÃ¶rÃ¼nÃ¼zde anlÄ±k AST dÃ¼zeyinde dizinleme.* Herhangi bir fonksiyon veya deÄŸiÅŸken Ã§aÄŸrÄ±sÄ±ndan, ayrÄ± `.src` ve `.dat` dosyalarÄ±ndaki bildirimine doÄŸrudan atlayÄ±n.

<p align="center">
  <img src="docs/public/media/goto_definition.gif" width="720" alt="Go to Definition Demo" />
</p>

---

### 10. Zengin Hover DokÃ¼mantasyonu ve Okuma/Yazma Durumu
*AnÄ±nda parametre aÃ§Ä±klamalarÄ± ve gÃ¼venlik uyarÄ±larÄ± alÄ±n.* Herhangi bir KSS sistem deÄŸiÅŸkeninin Ã¼zerine gelin; fiziksel birimlerini, okuma/yazma izinlerini ve KSS kÄ±lavuz aÃ§Ä±klamalarÄ±nÄ± gÃ¶rÃ¼n.

<p align="center">
  <img src="docs/public/media/hover_info.gif" width="720" alt="Hover Info Demo" />
</p>

---

### 11. Git Meta Verisi Temizleyici ve Servis BaÅŸlÄ±ÄŸÄ± SÄ±yÄ±rÄ±cÄ±
*SÃ¼rÃ¼m kontrolÃ¼nÃ¼ temiz tutun.* Otomatik commit'lerde gÃ¼rÃ¼ltÃ¼lÃ¼ git diff'lerini Ã¶nlemek iÃ§in servis baÅŸlÄ±klarÄ±nÄ± (`&ACCESS`, `&REL`, `&PARAM`, `&COMMENT`) tek tÄ±kla sÄ±yÄ±rÄ±n.

<p align="center">
  <img src="docs/public/media/git_metadata_cleaner.gif" width="720" alt="Git Metadata Cleaner Demo" />
</p>

---

### 12. Modern KRL ve iiQKA FOLD Paketi
*Kodunuzu tek tÄ±kla modern KUKA standartlarÄ±na yÃ¼kseltin.*
* **SeÃ§imi iiQKA FOLD'a DÃ¶nÃ¼ÅŸtÃ¼r (`krl.wrapIiQkaFold`)**: Ã–zel mantÄ±ÄŸÄ±nÄ±zÄ± standart iiQKA daraltÄ±labilir bloklarÄ±na sarÄ±n.
* **Spline BloÄŸuna DÃ¶nÃ¼ÅŸtÃ¼r (`krl.wrapSplineBlock`)**: DoÄŸrusal ve dairesel hareketleri KSS 8.3â€“8.7 iÃ§in yÃ¼ksek performanslÄ± `SPLINE` / `ENDSPLINE` bloklarÄ±na sarÄ±n.
* **Ã‡arpÄ±ÅŸma KorumasÄ± EnjektÃ¶rÃ¼ (`krl.insertCollisionGuard`)**: Kritik hareket bÃ¶lgelerinin Ã§evresine otomatik olarak `$TORQMON` tork izleme Ã§erÃ§eveleri enjekte edin.
* **FOLD Temizle ve AÃ§ (`krl.cleanUnwrapFolds`)**: Ä°Ã§ hareket talimatlarÄ±nÄ± koruyarak eski Inline FormlarÄ± gÃ¼venle aÃ§Ä±n.

---

### 13. CanlÄ± Destek AÄŸ GeÃ§idi ve Uzaktan Telepresence
*VS Code'un iÃ§inde geliÅŸtiricilerle doÄŸrudan iki yÃ¶nlÃ¼ destek sohbeti.*
* **EtkileÅŸimli Sohbet Paneli**: GeliÅŸtirme mÃ¼hendislik desteÄŸiyle anÄ±nda forum tabanlÄ± konu senkronizasyonu.
* **AkÄ±llÄ± Diff & Apply**: Teknik destek tarafÄ±ndan Ã¶nerilen kod dÃ¼zeltmelerini tek tÄ±kla inceleyin ve otomatik uygulayÄ±n.
* **Uzaktan Telepresence ve TanÄ±lama**: HÄ±zlÄ± saha devreye alma yardÄ±mÄ± iÃ§in isteÄŸe baÄŸlÄ± gÃ¼venli telemetri komutlarÄ± (`/ai_diag`, `/logs`, `/sysinfo`, `/ping`).

---

### 14. HÄ±zlÄ± FOLD AraÃ§ Ã‡ubuÄŸu ve Bildirim SÄ±ralama
*Devasa programlarÄ± kolayca yÃ¶netin.* FOLD bloklarÄ±nÄ±, alt programlarÄ± tek tÄ±kla daraltma ve deÄŸiÅŸken bildirimlerini otomatik sÄ±ralama.

<p align="center">
  <img src="docs/public/media/quick_fold_toolbar.gif" width="720" alt="Quick Fold Toolbar Demo" />
</p>

---

### 15. Ã–lÃ¼ Kod ve KullanÄ±lmayan Global Fonksiyon Analizi
*Kod ÅŸiÅŸkinliÄŸini ve artÄ±k test rutinlerini Ã¶nleyin.* TÃ¼m Ã§alÄ±ÅŸma alanÄ±nÄ±zda Ã§aÄŸrÄ±lmayan alt rutinleri, kullanÄ±lmayan deÄŸiÅŸkenleri ve eriÅŸilemeyen kod dallarÄ±nÄ± tespit edin.

<p align="center">
  <img src="docs/public/media/dead-code-demo.gif" width="720" alt="Dead Code Analysis Demo" />
</p>

---

### 16. YÃ¼ksek KontrastlÄ± SÃ¶zdizimi Paleti ve KSS Sistem KÃ¼tÃ¼phanesi
*Profesyonel KRL geliÅŸtirmesi iÃ§in zengin renk paleti ve sistem baÄŸlamÄ±.*
* **Ã‡eÅŸitli YÃ¼ksek KontrastlÄ± Palet**: EndÃ¼striyel stilde KRL Dark ve Light renk temalarÄ±. Hareket komutlarÄ± (kalÄ±n), bit dÃ¼zeyinde/mantÄ±ksal operatÃ¶rler, matematiksel semboller, sistem direktifleri (`&ACCESS`, `&REL`) ve onaltÄ±lÄ±k/ikili sayÄ±lar (`'H...'`, `'B...'`) iÃ§in farklÄ±laÅŸtÄ±rÄ±lmÄ±ÅŸ kapsamlar.
* **KSS 8.7 Standart Sistem KÃ¼tÃ¼phanesi**: `BAS()`, `MsgNotify()`, `MsgQuit()`, `MsgDialog()`, `USE_CM_PRO_VALUES()`, `TOOL_NAME[]` ve `BASE_NAME[]` iÃ§in yerleÅŸik tanÄ±mlar, parametre yardÄ±mÄ± ve `F12` â€” doÄŸrudan resmi KSS 8.7 referans modÃ¼llerine.
* **1 TÄ±k KSS 8.7 Proje Ä°skeleti (`krl.scaffoldKrcFiles`)**: `$config.dat`, `bas.src`, `MsgLib.src`, `collmonlib.src` ve `sps.sub` ile doldurulmuÅŸ standart `KRC/R1/System/`, `KRC/R1/Program/` ve `KRC/R1/TP/` klasÃ¶r aÄŸacÄ±nÄ± otomatik oluÅŸturur.
* **Fabrika VarsayÄ±lanlarÄ± ve Advance Run SÄ±nÄ±rlayÄ±cÄ±**: `$ADVANCE = 3`, `$VEL.CP = 2.0 m/s`, `$ACC.CP = 2.3 m/sÂ²`, `$JERK.CP = 500.0 m/sÂ³` iÃ§in resmi fabrika deÄŸerlerinin (`operate.defaultvalues`) anlÄ±k Hover gÃ¶rÃ¼ntÃ¼sÃ¼ ve `$ADVANCE` geÃ§erli aralÄ±ÄŸÄ± `0..5` aÅŸtÄ±ÄŸÄ±nda otomatik lint uyarÄ±larÄ±.

---

### 17. KUKA Event Log (.evt) Ã‡Ã¶zÃ¼cÃ¼ (Pure-TS KRC Decoder)
*Harici araÃ§lara ve Windows baÄŸÄ±mlÄ±lÄ±klarÄ±na gerek olmadan ikili KRC olay gÃ¼nlÃ¼klerini Ã§Ã¶zer.*
* **Yerel Pure-TS Ã‡Ã¶zÃ¼cÃ¼**: KRC Windows EVTX gÃ¼nlÃ¼klerini (`KrcLogS.evt`, `KrcLogB.evt`, `KrcLogP.evt`, vb.) sÄ±fÄ±r harici baÄŸÄ±mlÄ±lÄ±kla doÄŸrudan okur.
* **KayÄ±tlÄ± VarsayÄ±lan DÃ¼zenleyici**: VS Code dosya gezgininde herhangi bir `.evt` dosyasÄ±na Ã§ift tÄ±klamak etkileÅŸimli gÃ¶rÃ¼ntÃ¼leyiciyi anÄ±nda aÃ§ar.
* **2.050+ KSS CrossMeld Mesaj KataloÄŸu**: TÃ¼m 6 dilde (EN, DE, RU, ES, IT, TR) resmi durum, uyarÄ± ve hata mesajlarÄ±, dinamik `{0}` / `{1}` parametre deÄŸiÅŸimi ile.
* **AkÄ±llÄ± Filtreleme ve Koda Atlama**: Ã–nem derecesi (`ERROR`, `WARNING`, `INFO`, `DIALOG`), kaynak modÃ¼l veya zamana gÃ¶re filtreleme, KRL `.src` kaynak satÄ±rÄ±na 1 tÄ±kla atlama ve CSV/JSON Ã§Ä±ktÄ±sÄ±.

---

### 18. GÃ¶rsel I/O Sinyal Matrisi ve PLC DonanÄ±m Ã‡arpÄ±ÅŸma DedektÃ¶rÃ¼
*TÃ¼m Ã§alÄ±ÅŸma alanÄ± sinyallerini denetler ve PLC adres Ã§akÄ±ÅŸmalarÄ±nÄ± Ã¶nler.*
* **Derin Ã‡alÄ±ÅŸma AlanÄ± TaramasÄ±**: TÃ¼m `.src` ve `.dat` dosyalarÄ±nda `$IN`, `$OUT`, `$ANIN` ve `$ANOUT` bildirimlerini tarar.
* **Otomatik Ã‡arpÄ±ÅŸma AlgÄ±lama**: Tek bitlik bayraklardan Ã§ok bitlik kelimelere kadar bit aralÄ±klarÄ±nÄ± hesaplar ve donanÄ±m Ã§akÄ±ÅŸmalarÄ±nÄ± devreye almadan Ã¶nce tespit eder.
* **EtkileÅŸimli Matris ve CSV DÄ±ÅŸa Aktarma**: GerÃ§ek zamanlÄ± arama, tÃ¼r filtreleri, bildirim satÄ±rÄ±na doÄŸrudan atlama ve CSV Ã§Ä±ktÄ±sÄ±.

---

### 19. YÃ¶rÃ¼nge Yol UzunluÄŸu ve Kaynak Ã‡evrimi ZekasÄ±
*Hassas 3B uzamsal hareket analizi ve kaynak prosesi zekasÄ±.*
* **3B Ã–klid Uzamsal UzunluÄŸu**: TÃ¼m Kartezyen hareket komutlarÄ±nda milimetre ve metre cinsinden kesin yÃ¶rÃ¼nge uzunluÄŸunu hesaplar.
* **Hareket Segmentasyonu**: `PTP`, `LIN`, `CIRC` ve `SPLINE` hareketlerini otomatik sÄ±nÄ±flandÄ±rÄ±r.
* **Kaynak Proses ZekasÄ±**: `ARCON`/`ARCOFF` bloklarÄ±nÄ± otomatik tanÄ±r, kaynak dikiÅŸlerini ayÄ±rÄ±r, toplam dikiÅŸ uzunluÄŸunu ve ark sÃ¼resini hesaplar.

---

### 20. Toplu Nokta Ã–teleme DÃ¶nÃ¼ÅŸtÃ¼rÃ¼cÃ¼ (BASE vs WORLD)
*Nokta koordinatlarÄ±nÄ± cerrahi hassasiyetle toplu dÃ¶nÃ¼ÅŸtÃ¼rÃ¼n.*
* **Ã‡ift Koordinat Ã‡erÃ§evesi**: Ä°ÅŸ parÃ§asÄ± (**BASE**) veya robot Kartezyen (**WORLD**) Ã§erÃ§evesine gÃ¶re ters Euler rotasyon matrisi ile Ã¶teleme ($R^T_{base} \cdot \vec{\Delta}_{world}$).
* **3B Ä°zometrik SVG ÅemasÄ±**: Dinamik Ã¶teleme vektÃ¶rÃ¼ gÃ¶rselleÅŸtirmesi ile etkileÅŸimli eksen diyagramÄ±.
* **SeÃ§ici DÃ¶nÃ¼ÅŸtÃ¼rme**: NoktalarÄ± filtreleyin, Ã¶zel noktalar ekleyin, delta farklarÄ±nÄ± inceleyin ve `.dat` dosyalarÄ±na atomik olarak kaydedin.

---

### 21. %100 Uyarlanabilir Temalar ve Tam AltÄ± Dilli YerelleÅŸtirme
*SÄ±fÄ±r sabit renkle kusursuz estetik entegrasyon.*
* **Uyarlanabilir Tema DeÄŸiÅŸkenleri**: YalnÄ±zca `--vscode-*` CSS token'larÄ±yla oluÅŸturulmuÅŸtur â€” her Koyu, AÃ§Ä±k (`body.vscode-light`) veya YÃ¼ksek KontrastlÄ± (`body.vscode-high-contrast`) VS Code temasÄ±na mÃ¼kemmel uyum saÄŸlar.
* **6 Dilli ArayÃ¼z DeÄŸiÅŸtirici**: TÃ¼m endÃ¼striyel araÃ§larda Ä°ngilizce, Almanca, RusÃ§a, Ä°spanyolca, Ä°talyanca ve TÃ¼rkÃ§e arasÄ±nda anÄ±nda geÃ§iÅŸ.

---

## Ã–zellik KarÅŸÄ±laÅŸtÄ±rma Matrisi

| Ã–zellik | Community (Ãœcretsiz) | Pro Industrial | MÃ¼hendislere FaydasÄ± |
|:---|:---:|:---:|:---|
| **KRL SÃ¶zdizimi Vurgulama** (`.src`, `.dat`, `.sub`, `.kfd`) | Evet | Evet | KRL renk paletiyle tam AST renklendirme |
| **KRL TemalarÄ± (Koyu ve AÃ§Ä±k)** | Evet | Evet | EndÃ¼striyel yÃ¼ksek kontrastlÄ± renk temalarÄ± |
| **AkÄ±llÄ± Otomatik Tamamlama ve Sistem SpesifikasyonlarÄ±** (957+ deÄŸiÅŸken, 116 fonksiyon, 111 yapÄ±) | Evet | Evet | Tam KSS sistem deÄŸiÅŸkenleri ve imza yardÄ±mÄ± |
| **KSS 8.7 Standart Sistem KÃ¼tÃ¼phanesi ve F12 TanÄ±mÄ±** | Evet | Evet | `bas.src`, `MsgLib.src`, `$config.dat` dosyasÄ±na anÄ±nda F12 atlama |
| **1 TÄ±k KRC Proje Ä°skeleti** | Evet | Evet | Standart `KRC/R1/System` klasÃ¶r yapÄ±sÄ±nÄ± baÅŸlatÄ±r |
| **Fabrika VarsayÄ±lanlarÄ± Hover'Ä± ve $ADVANCE SÄ±nÄ±rlayÄ±cÄ±** | Evet | Evet | Fabrika varsayÄ±lanlarÄ±nÄ± gÃ¶sterir ve `$ADVANCE > 5` durumunda uyarÄ±r |
| **23 Standart Inline Form Snippet'i** (34 hareket ve mantÄ±k ÅŸablonu) | Evet | Evet | Tam `;FOLD ... ;%{PE}` ÅŸablonlarÄ± |
| **Sinyal Inlay Ä°puÃ§larÄ± ve Hover DokÃ¼manlarÄ±** | Evet | Evet | SatÄ±r iÃ§i PLC sinyal etiketleri ve parametre imzalarÄ± |
| **Kod BiÃ§imlendirici ve Matris Hizalama** | Evet | Evet | AnÄ±nda 1 tÄ±k temizlik (`Shift+Alt+F`) |
| **GitLens SatÄ±r Blame'i ve Revizyon GeÃ§miÅŸi** | Evet | Evet | Her nokta iÃ§in anÄ±nda yazar ve commit takibi |
| **AltÄ± Dilli Mimari** (EN, DE, IT, ES, RU, TR) | Evet | Evet | Tam yerel UI, 515 UI anahtarÄ± ve 1.073 sistem deÄŸiÅŸkeni dokÃ¼man Ã§evirisi |
| **Git Meta Verisi Temizleyici** | Evet | Evet | Kusursuz Git diff'leri iÃ§in servis baÅŸlÄ±klarÄ±nÄ± (`&ACCESS`, `&REL`) sÄ±yÄ±rÄ±r |
| **Control Center ve 21 KartlÄ± Referans Rehberi** | Evet | Evet | GerÃ§ek zamanlÄ± tanÄ±lama anahtarlarÄ± ve editÃ¶r iÃ§i kÄ±sayol rehberi |
| **36 Komutluk Tam DÃ¼z Kenar Ã‡ubuÄŸu** | Evet | Evet | Her uzantÄ± komutuna 1 tÄ±kla eriÅŸim |
| **Yerel Proje ZIP DÄ±ÅŸa Aktarma ve Uzaktan Telepresence** | Evet | Evet | 1 tÄ±kla tam yedekleme â€” iÅŸletim sistemi gezginine veya Telegram'a |
| **Copilot AI Dil Modeli AraÃ§larÄ± Entegrasyonu (`krl_safety_check`)** | â€” | **Pro** | GÃ¼venlik kontrolleri doÄŸrudan VS Code AI tarafÄ±ndan Ã§aÄŸrÄ±labilir |
| **B2B Faturalama ve Teklifler (`krl.requestCorporateInvoice`)** | Evet | Evet | Vergi No / KDV Muafiyeti ile B2B teklif talebi doÄŸrudan editÃ¶rden |
| **Temel SÃ¶zdizimi HatasÄ± ve TanÄ±lama Denetimi** | Evet (Bonus) | Evet | KRL sÃ¶zdizimi doÄŸrulamasÄ± ve temel hata algÄ±lama |
| **KSS 9.x / iiQWorks 9.+ ve KSS 8.3â€“8.7 UyumluluÄŸu** | Evet | Evet | KSS 9.x, iiQWorks ve KRC2â€“KRC5 kontrolÃ¶rleri iÃ§in tam destek |
| **SmartPAD Yedek Kalite Kabul Raporu** | â€” | **Pro** | Robot pasaportu ve tÄ±klanabilir kÃ¶prÃ¼lerle otomatik proje denetimi |
| **Modern KRL ve iiQKA FOLD Paketi** | â€” | **Pro** | iiQKA FOLD'lar, Spline BloklarÄ± ve Ã‡arpÄ±ÅŸma KorumasÄ± |
| **EtkileÅŸimli AkÄ±ÅŸ ÅemasÄ± GÃ¶rÃ¼ntÃ¼leyici** (Mermaid SVG) | â€” | **Pro** | GÃ¶rsel kontrol akÄ±ÅŸ mantÄ±ÄŸÄ± ve 2 yÃ¶nlÃ¼ koda atlama |
| **SÄ±kÄ± Blok Dengesi TanÄ±lamasÄ±** | â€” | **Pro** | KapatÄ±lmamÄ±ÅŸ `IF/LOOP/FOR` bloklarÄ±nÄ± yakalar |
| **HÄ±z ve GÃ¼venlik Denetleyicisi** ($VEL.CP) | â€” | **Pro** | Tehlikeli Kartezyen aÅŸÄ±rÄ± hÄ±zlarÄ± Ã¶nler |
| **Tool / Base KorumasÄ±** | â€” | **Pro** | Ã‡erÃ§eve baÅŸlatmasÄ±ndan Ã¶nce hareketi iÅŸaretler |
| **SmartPAD ZIP Yedek Diff ve Nokta Delta** | â€” | **Pro** | Tam koordinat deltalarÄ±nÄ± hesaplar (Î”X, Î”Y, Î”Z) |
| **3 NoktalÄ± Euler Ã‡erÃ§eve HesaplayÄ±cÄ±** | â€” | **Pro** | EditÃ¶rde `BASE_DATA`/`TOOL_DATA` hesaplar |
| **EthernetKRL (EKI) XML Paketi** | â€” | **Pro** | CanlÄ± XML ÅŸablon Ã¼retici ve doÄŸrulayÄ±cÄ± |
| **CanlÄ± Destek AÄŸ GeÃ§idi ve Uzaktan Telepresence** | â€” | **Pro** | DoÄŸrudan 2 yÃ¶nlÃ¼ yardÄ±m masasÄ± sohbeti, Diff & Apply |
| **Ã–lÃ¼ Kod ve Kapsam Denetleyicisi** | â€” | **Pro** | KullanÄ±lmayan deÄŸiÅŸkenleri ve Ã¶lÃ¼ alt rutinleri bulur |
| **Hareket DiyagramlarÄ± ve Spline Ãœretici** | â€” | **Pro** | KSS 8.3+ iÃ§in spline eÄŸrilerini gÃ¶rselleÅŸtirir |
| **%100 Ã‡evrimdÄ±ÅŸÄ± Fabrika EriÅŸimi** | Evet | **Pro** | Ãœretim sahasÄ±nda sÄ±fÄ±r internet gerekir |

---

## Pro'ya YÃ¼kseltin: FiyatlandÄ±rma ve AnÄ±nda Lisanslama

DoÄŸrulanmÄ±ÅŸ satÄ±cÄ±mÄ±z **Dodo Payments** Ã¼zerinden esnek, endÃ¼striyel sÄ±nÄ±f lisanslama sunuyoruz. TÃ¼m iÅŸlemler ÅŸifrelidir; 135+ Ã¼lkede Kredi KartÄ±, Apple Pay, Google Pay ve PayPal'Ä± otomatik KDV/vergi faturalarÄ±yla destekler.

### Planlar:

| Plan | Fiyat | Ä°ndirim / Faturalama | Lisans KoÅŸullarÄ± | Ã–deme |
|:---|:---:|:---|:---|:---:|
| **Community** | **$0** | %100 Sonsuza Kadar Ãœcretsiz | KiÅŸisel ve Ticari KullanÄ±m | [Ãœcretsiz Kur](https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension) |
| **Pro AylÄ±k** | **$19.99** / ay | AylÄ±k faturalandÄ±rÄ±lÄ±r | TÃ¼m Pro AraÃ§lar â€¢ 1 PC â€¢ KRC2â€“KRC5 DesteÄŸi | [Pro Monthly Al](https://checkout.dodopayments.com/buy/pdt_0NmAUzwdbzeERSktsOLTp) |
| **Pro YÄ±llÄ±k** | **$149.00** / yÄ±l | **%35 Tasarruf** (~$6.58/ay) | TÃ¼m Pro AraÃ§lar â€¢ 1 PC â€¢ 30 GÃ¼n Ã‡evrimdÄ±ÅŸÄ± Tampon â€¢ KRC2â€“KRC5 | [YÄ±llÄ±k Pro Al](https://checkout.dodopayments.com/buy/pdt_0NmAV012KFHSjUMyDomJ6) |
| **Pro Ã–mÃ¼r Boyu** | **$699.00** | **Bir Kez Ã–de, Sonsuza Kadar Sahip Ol** | TÃ¼m Pro AraÃ§lar â€¢ 1 PC (1 Ä°ÅŸ Ä°stasyonu) â€¢ Ã–mÃ¼r Boyu GÃ¼ncelleme | [Ã–mÃ¼r Boyu Pro Al](https://checkout.dodopayments.com/buy/pdt_0NmAcoqVCfuwQ6Xx7qyqr) |
| 🏢 **Team Edition** | **$499.90** / yıl | B2B — 5 İş İstasyonu | Tüm Pro Araçlar ve Güvenlik Analizörleri • 5 İş İstasyonu Aktivasyonu • KRC2–KRC5 | [Team Edition Satın Al](https://checkout.dodopayments.com/buy/pdt_0NnLCdgD69GiXDLRJ0K5v) |
| 🏛️ **Department / Integrator** | **$999.00** / yıl | B2B — 20 İstasyona Kadar | Entegratörler ve otomasyon departmanları için 20 istasyona kadar • Tam AST Teşhisi | [Department Satın Al](https://checkout.dodopayments.com/buy/pdt_0Nq5QVTrbkJbWAUf8qoyn) |
| 🏭 **Enterprise Site** | **$4,999.00** / yıl | B2B — 100 İş İstasyonu | Tüm Pro Araçlar ve Güvenlik Analizörleri • 100 Tesis İş İstasyonu • Markalı Raporlar & SLA | [Enterprise Satın Al](https://checkout.dodopayments.com/buy/pdt_0NnLCdkLwd0dECkpSE1JP) |

<div align="center" style="margin: 25px 0;">
  <a href="https://checkout.dodopayments.com/buy/pdt_0NmAV012KFHSjUMyDomJ6" style="text-decoration:none;">
    <kbd style="font-size: 1.25em; padding: 14px 32px; background-color: #FF6600; color: white; border-radius: 10px; font-weight: bold; border: 1px solid #d15500; cursor: pointer; box-shadow: 0 4px 18px rgba(255,102,0,0.4);">
      Plan SeÃ§in ve Abone Olun (Dodo Checkout)
    </kbd>
  </a>
  <p style="margin-top: 10px; font-size: 0.9em; color: #888;">VS Code'da anÄ±nda 1 tÄ±k aktivasyon â€¢ 14 GÃ¼nlÃ¼k Grace DÃ¶nemi KorumasÄ± â€¢ 30 GÃ¼nlÃ¼k Ã‡evrimdÄ±ÅŸÄ± Tampon</p>
</div>

### Ä°ÅŸ AkÄ±ÅŸÄ±nÄ±za Hangi Lisans PlanÄ± Uygun? (Lisans Ekonomisi):

* **Bireysel Lisanslar (Engineer Pro AylÄ±k / YÄ±llÄ±k):**
  * **1 iÅŸ istasyonu (1 cihaz aktivasyonu)** hakkÄ±. LisansÄ± istediÄŸiniz zaman menÃ¼den devre dÄ±ÅŸÄ± bÄ±rakÄ±p yeni bir bilgisayara aktarabilirsiniz.
  * **KRC2 / KRC4 / KRC5 (KSS 5.xâ€“8.7+)** nesillerinin tamamÄ±na tam destek.
* **Pro Lifetime ($699 tek seferlik):**
  * **1 iÅŸ istasyonu** iÃ§in yinelenen abonelik olmadan kalÄ±cÄ± Ã¶mÃ¼r boyu lisans ve Ã¶mÃ¼r boyu gÃ¼ncellemeler.
  * Ä°nternetsiz kapalÄ± fabrika aÄŸlarÄ± (Air-Gapped) iÃ§in kalÄ±cÄ± kiÅŸisel kriptografik Ã§evrimdÄ±ÅŸÄ± lisans sertifikasÄ±.
* **TakÄ±m Paketi (Team Edition â€” $499.90/yÄ±l):**
  * Sistem entegratÃ¶rleri, robotik servis firmalarÄ± ve otomasyon departmanlarÄ± iÃ§in **25 cihaz aktivasyonu**.
  * Vergi Kimlik NumarasÄ± (Tax ID / VIES KDV) ile resmi kurumsal B2B fatura ve tÃ¼m projelerde birleÅŸik KRL kod kalitesi standartlarÄ±.
* **Kurumsal Fabrika (Enterprise Site â€” $4,999.00/yÄ±l):**
  * **TÃœM FABRÄ°KA VEYA ENTEGRATÃ–R ÅÄ°RKET Ä°Ã‡Ä°N 200 CÄ°HAZ AKTÄ°VASYONU**.
  * Tesis genelindeki tÃ¼m mÃ¼hendislik dizÃ¼stÃ¼ bilgisayarlarÄ±nÄ±, test istasyonlarÄ±nÄ± ve bakÄ±m panellerini kapsar.
  * **DoÄŸrudan MÃ¼hendislik DesteÄŸi:** KatÄ± SLA garantisiyle Ã¶ncelikli doÄŸrudan mÃ¼hendis desteÄŸi.
  * **KUKA Fleet Backup Hub:** YÃ¼zlerce hÃ¼cre kontrolcÃ¼sÃ¼nÃ¼n kurumsal GitLab/Google Drive'a otomatik yedeklenmesi, Ã§oklu yedek diff analizi ve sÃ¼rÃ¼m kontrolÃ¼.
  * **Ã–zel MarkalÄ± MÃ¼ÅŸteri Kabul RaporlarÄ±:** OEM logolarÄ±yla (Volkswagen, Audi, BMW, Ford, Renault, Stellantis) markalanmÄ±ÅŸ resmi robot pasaportlarÄ± ve gÃ¼venlik denetimleri.
  * **Eksiksiz Kurumsal SatÄ±nalma:** Kurumsal yazÄ±lÄ±m sÃ¶zleÅŸmesi, resmi KDV faturasÄ± (AB VIES Reverse Charge) ve tedarikÃ§i uyumluluÄŸu.


---

## 14 GÃ¼nlÃ¼k Grace DÃ¶nemi ve Ã‡evrimdÄ±ÅŸÄ± Ã–ncelik Garantisi

Devreye alma mÃ¼hendisleri parazitli tesislerde, temiz odalarda ve otomotiv hÃ¼crelerinde **sÄ±fÄ±r aÄŸ baÄŸlantÄ±sÄ±yla** Ã§alÄ±ÅŸÄ±r.

* **30 GÃ¼nlÃ¼k Ã‡evrimdÄ±ÅŸÄ± Tampon**: Bir kez etkinleÅŸtirin ve aÄŸ el sÄ±kÄ±ÅŸmasÄ± olmadan sahada 30 gÃ¼ne kadar tamamen Ã§evrimdÄ±ÅŸÄ± Ã§alÄ±ÅŸÄ±n.
* **14 GÃ¼nlÃ¼k Grace DÃ¶nemi**: Sahadayken uluslararasÄ± bir Ã¶deme yÃ¶ntemi veya kart yenilemesi geÃ§ici olarak baÅŸarÄ±sÄ±z olursa, Pro Ã¶zellikleri **devreye almanÄ±n ortasÄ±nda sizi asla kilitlemez**. UzantÄ±, akÄ±llÄ± otomatik arka plan yeniden denemeleriyle 14 gÃ¼nlÃ¼k bir grace penceresi saÄŸlar.

---

## Kurumsal GÃ¼venlik Sertifikasyonu

KUKA KRL Professional, **ReversingLabs Spectra Assure** tarafÄ±ndan **%100 GÃ¼venlik SaÄŸlÄ±k Skoru** ile sertifikalandÄ±rÄ±lmÄ±ÅŸtÄ±r:
* **0 ZararlÄ± YazÄ±lÄ±m** (Temiz ikili inceleme)
* TÃ¼m baÄŸÄ±mlÄ±lÄ±klarda **0 CVE GÃ¼venlik AÃ§Ä±ÄŸÄ±**
* **0 Gizli Bilgi / Token SÄ±zÄ±ntÄ±sÄ±**
* **0 MITRE ATT&CK GÃ¶stergesi**

Resmi GÃ¼venlik Denetimi: [https://secure.software/vscode/packages/liskinlabs/kuka-krl-extension](https://secure.software/vscode/packages/liskinlabs/kuka-krl-extension)

---

## Klavye KÄ±sayollarÄ±

| KÄ±sayol | Eylem | Kapsam |
|:---|:---|:---|
| `Shift + Alt + F` | Belgeyi BiÃ§imlendir (KRL 3 boÅŸluklu girinti ve matris hizalama) | Aktif EditÃ¶r |
| `Ctrl + Alt + F` | EtkileÅŸimli AkÄ±ÅŸ ÅemasÄ±nÄ± AÃ§ | `.src` DosyasÄ± |
| `Ctrl + Alt + D` | EndÃ¼striyel GÃ¼venlik ve TanÄ±lama Denetimini Ã‡alÄ±ÅŸtÄ±r | Ã‡alÄ±ÅŸma AlanÄ± |
| `Ctrl + Alt + B` | SmartPAD Yedek Diff ve Nokta Delta Denetleyicisini AÃ§ | Aktif Proje |
| `Ctrl + Alt + K` | KUKA Control Center ve 3 NoktalÄ± Ã‡erÃ§eve MatematiÄŸini BaÅŸlat | Aktif EditÃ¶r |
| `Ctrl + Space` | AkÄ±llÄ± KSS Sistem Otomatik TamamlamayÄ± Tetikle | Ä°mleÃ§ Konumu |

---

## YapÄ±landÄ±rma AyarlarÄ±

UzantÄ± davranÄ±ÅŸlarÄ±nÄ± `settings.json` dosyanÄ±zda yapÄ±landÄ±rÄ±n:

| Ayar | VarsayÄ±lan | AÃ§Ä±klama |
|:---|:---:|:---|
| `krl.indentWidth` | `3` | Girinti boyutu (3 boÅŸluk resmi KUKA standardÄ±dÄ±r). |
| `krl.alignAssignments` | `true` | Temiz matrisler iÃ§in `.dat` dosyalarÄ±nda `=` sembollerini otomatik hizala. |
| `krl.errorLens.enabled` | `true` | SatÄ±r sonlarÄ±nda tanÄ±lama hatalarÄ±nÄ± satÄ±r iÃ§i gÃ¶ster. |
| `krl.validateNonAscii` | `true` | Eski KSS derleyicilerini bozan Kiril/ASCII-dÄ±ÅŸÄ± karakterleri tara. |
| `krl.inlayHints.enabled` | `true` | I/O sinyalleri iÃ§in aÃ§Ä±klayÄ±cÄ± adlarÄ± satÄ±r iÃ§i gÃ¶ster. |

---

## DokÃ¼mantasyon ve Wiki

* **Ä°ngilizce DokÃ¼mantasyon**: [https://liskinlabs.github.io/kuka-krl-extension/](https://liskinlabs.github.io/kuka-krl-extension/)
* **Ğ ÑƒÑÑĞºĞ°Ñ Ğ´Ğ¾ĞºÑƒĞ¼ĞµĞ½Ñ‚Ğ°Ñ†Ğ¸Ñ Ğ¸ Ğ’Ğ¸ĞºĞ¸**: [https://liskinlabs.github.io/kuka-krl-extension/ru/](https://liskinlabs.github.io/kuka-krl-extension/ru/)
* **TÃ¼rkÃ§e DokÃ¼mantasyon ve Wiki**: [https://liskinlabs.github.io/kuka-krl-extension/tr/](https://liskinlabs.github.io/kuka-krl-extension/tr/)

---

## Lisans ve KÃ¼nye

* **YayÄ±ncÄ± ve GeliÅŸtirici**: [Liskin Labs](https://github.com/LiskinLabs) / [Silvestr Liskin](https://www.linkedin.com/in/silvestr-liskin-ab712920b/)
* **GÃ¼venlik DenetÃ§isi**: [ReversingLabs Spectra Assure](https://secure.software/vscode/packages/liskinlabs/kuka-krl-extension)
* **Resmi SatÄ±cÄ±**: [Dodo Payments](https://dodopayments.com/)
* **Lisans**: Ticari EULA ([LICENSE](LICENSE))

---

## Yasal UyarÄ±lar, Ticari Markalar ve GÃ¼venlik UyumluluÄŸu

### Zorunlu EndÃ¼striyel GÃ¼venlik Bildirimi (ISO 10218-1/-2 ve ISO 13849-1)
**KUKA KRL Professional**, **Liskin Labs** tarafÄ±ndan geliÅŸtirilen baÄŸÄ±msÄ±z bir mÃ¼hendislik geliÅŸtirme, statik analiz ve yedek diff paketidir. **GÃ¼venlik sertifikalÄ± bir yazÄ±lÄ±m DEÄÄ°LDÄ°R (Non-SIL / Non-PL)** ve sahada fiziksel devreye alma prosedÃ¼rlerinin, dÃ¼ÅŸÃ¼k hÄ±z doÄŸrulamasÄ±nÄ±n (fiziksel KUKA SmartPAD Ã¼zerinde T1 modunda `$OV_PRO <= 30%`) veya **ISO 10218-1/-2** ve **ISO 13849-1** standartlarÄ±nÄ±n gerektirdiÄŸi resmi risk deÄŸerlendirmelerinin yerini **almaz**. Otomatik Ã¼retime geÃ§meden Ã¶nce her zaman T1 modunda manuel yol testleri gerÃ§ekleÅŸtirin.

### Ticari Markalar ve BaÄŸÄ±msÄ±zlÄ±k BeyanÄ±
* **KUKAÂ®, KRLÂ®, KRCÂ®, WorkVisualÂ®, iiQWorksÂ® ve SmartPADÂ®**, **KUKA AG** / **KUKA Deutschland GmbH** ÅŸirketinin tescilli ticari markalarÄ±dÄ±r.
* **Visual Studio CodeÂ® ve VS CodeÂ®**, **Microsoft Corporation** ÅŸirketinin tescilli ticari markalarÄ±dÄ±r.
* Bu yazÄ±lÄ±m uzantÄ±sÄ± **Liskin Labs** tarafÄ±ndan geliÅŸtirilen baÄŸÄ±msÄ±z bir araÃ§tÄ±r; KUKA AG veya Microsoft Corporation ile hiÃ§bir baÄŸlantÄ±sÄ±, sponsorluÄŸu, onayÄ± veya sertifikasÄ± **yoktur**. Bahsi geÃ§en tÃ¼m Ã¼rÃ¼n adlarÄ± ve markalar ilgili sahiplerinin mÃ¼lkiyetindedir ve yalnÄ±zca uyumluluk tespiti amacÄ±yla belirtilmiÅŸtir (nominative fair use).
