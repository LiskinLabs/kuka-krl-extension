# 🟢 Topluluk Sürümü — Ücretsiz Temel Özellikler

KUKA KRL Professional eklentisinde bulunan 15 ücretsiz temel özelliğin ayrıntılı açıklaması.

---

### 1. KRL Sözdizimi Vurgulama (Syntax Highlighting)
`.src`, `.dat`, `.sub` dosyalarının tam sözdizimi ayrıştırması. Anahtar sözcükleri, veri tiplerini (`INT`, `REAL`, `BOOL`, `E6POS`), sistem değişkenlerini ve WorkVisual FOLD yapılarını renklendirir.

#### Kurulumdan Önce (Düz Metin):
![Syntax Highlighting Before](/media/syntax_before.png)

#### Kurulumdan Sonra (Renklendirilmiş KRL):
![Syntax Highlighting After](/media/syntax_after.png)

---

### 2. Özel KUKA Renk Temaları (6 Farklı Tema)
Fabrika sahaları ve SmartPAD ekranları için optimize edilmiş 6 profesyonel tema:
1. **Industrial Dark** (KUKA Turuncusu `#FF6600`)
2. **WorkVisual Dark**
3. **WorkVisual Light**
4. **Midnight OLED**
5. **Blueprint**
6. **Industrial Light**

*Kısayol:* `Ctrl + K` `Ctrl + T`

![Theme 1](/media/kuka_theme_1.png)
![Theme 2](/media/kuka_theme_2.png)
![Theme 3](/media/kuka_theme_3.png)
![Theme 4](/media/kuka_theme_4.png)

---

### 3. Akıllı Otomatik Tamamlama (Smart Autocomplete & KSS 8.7)
350'den fazla sistem değişkeni (`$POS_ACT`, `$VEL.CP`, `$BASE`, `$TOOL`, `$IN`, `$OUT`) ve alt programlar için anında öneri listesi.

![Smart Autocomplete Demo](/media/smart_autocomplete.gif)

---

### 4. Üç Dilli Yerelleştirme (EN / RU / TR)
İngilizce, Rusça ve Türkçe dillerinde tam yerel kullanıcı arayüzü ve ipucu desteği.

---

### 5. Donanım Sinyal İpuçları (Inlay Hints: $IN / $OUT / $ANIN / $ANOUT)
Sinyal adlarını doğrudan donanım kanallarının yanında satır içi olarak görüntüler (örneğin: `$IN[1]` `: diPartReady`).

![Inlay Hints Demo](/media/inlay_hints.gif)

---

### 6. İmleç Bilgisi ve Okuma/Yazma Durumu (Hover Documentation)
Sistem değişkenlerinin üzerine gelindiğinde resmi KSS kılavuz bilgilerini, veri tiplerini ve okuma/yazma izinlerini görüntüler.

![Hover Info Demo](/media/hover_info.gif)

---

### 7. Dosyalar Arası Gezinme (.src ↔ .dat Go-to-Definition)
`F12` veya `Ctrl+Click` ile `.src` dosyasındaki nokta referansından doğrudan `.dat` dosyasındaki bildirime geçiş yapın.

![Go-to-Definition Demo](/media/goto_definition.gif)

---

### 8. Tüm Referansları Bul (Find All References)
`Shift + Alt + F12` ile tüm çalışma alanındaki sembol referanslarını listeleyin.

![Find All References Demo](/media/find_all_references.gif)

---

### 9. KRL Kod Biçimlendirici (Code Formatter)
`Shift + Alt + F` ile atamaları, girintileri ve `IF/FOR/WHILE` bloklarını otomatik olarak hizalayın.

![Code Formatter Demo](/media/code_formatter.gif)

---

### 10. Hızlı FOLD Daraltma / Genişletme Düğmeleri
Üst araç çubuğundaki 🙈 (`krl.foldAll`) ve 📖 (`krl.unfoldAll`) simgeleri ile FOLD yapılarını tek tıkla daraltın veya açın.

![Quick Fold Toolbar Demo](/media/quick_fold_toolbar.gif)

---

### 11. KUKA COMMANDS Paneli
Tüm eklenti araçlarını kategorize eden özel kenar çubuğu paneli.

![KUKA COMMANDS Demo](/media/kuka_commands.gif)

---

### 12. KRL I/O Sinyalleri Paneli
Canlı arama ve filtreleme özelliğine sahip donanım sinyalleri paneli.

![KRL I/O Signals Demo](/media/krl_io_signals.gif)

---

### 13. Kullanılmayan Değişken Temizleyici
`.dat` dosyalarındaki kullanılmayan `DECL` bildirimlerini güvenle temizleyin.

---

### 14. WorkVisual Git Üstbilgi Temizleyici
Git diff geçmişini temiz tutmak için `&ACCESS`, `&REL`, `&PARAM` başlıklarını kaldırır.

![Git Metadata Cleaner Demo](/media/git_metadata_cleaner.gif)

---

### 15. Bildirimleri Sıralama (Sort Declarations)
`.dat` dosyasındaki değişken bildirimlerini alfabetik ve türe göre sıralayın.

![Sort Declarations Demo](/media/sort_declarations.gif)
