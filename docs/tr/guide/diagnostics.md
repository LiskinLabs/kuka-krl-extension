# Endüstriyel Güvenlik ve Teşhisler

<span class="badge pro">Pro Özellik</span>

Gerçek robot kontrol ünitesinde kod çalıştırmadan önce sözdizimi çökmelerini, başlatılmamış koordinat sistemlerini ve fiziksel çarpışma risklerini tespit edin.

## Blok Kapanış Dengesi (Block Balance)

Eksik veya yetim kalmış blok sonlarını (`IF/ENDIF`, `FOR/ENDFOR`, `LOOP/ENDLOOP`) işaretler.

## Tip Doğrulama ve Çarpışma Koruması

Geçerli yordamda aktif `$TOOL` veya `$BASE` değerleri başlatılmadan önce hareket komutları (`PTP`, `LIN`, `CIRC`) tanımlanırsa uyarır.

## Sessiz Hata Engelleyici (ASCII Dışı / Kiril Karakterler)

Yürütülebilir satırların içindeki Kiril veya görünmeyen ASCII dışı karakterler KRC denetleyicilerinde sessiz derleme çökmelerine neden olur. Pro güvenlik denetimi bunları anında işaretler.

![Endüstriyel Teşhisler](/media/kuka_control_center.gif)
