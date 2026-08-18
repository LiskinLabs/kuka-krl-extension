# Donanım Sinyali İpucu İpuçları (Inlay Hints)

<span class="badge community">Ücretsiz Özellik</span>

Sinyal eşleme tablolarını açmadan mantık kodunun tam içinde sensör ve valf atamalarını görün.

![Inlay Hints Demo](/media/inlay_hints.gif)

## Nasıl Çalışır

KUKA KRL Professional, `.src` dosyasındaki `$IN[x]` veya `$OUT[x]` kanallarını algılar, ilişkili `.dat` veya `$config.dat` dosyasındaki açıklamayı okur ve satır içine sanal şeffaf bir etiket (`: diPartReady`) yerleştirir.

## Ayarlar

VS Code `settings.json` dosyasında yapılandırılabilir:

```json
{
  "krl.inlayHints.enabled": true
}
```
