# Model Context Protocol (MCP) ve Yapay Zeka Entegrasyonu

Harici yapay zeka geliştirme ortamlarını endüstriyel robot telemetrisine ve statik proje teşhisine bağlama.

---

## Genel Bakış

**Model Context Protocol (MCP)**, yapay zeka modelleri ile geliştirme ortamları ve endüstriyel cihazlar arasındaki açık standart iletişim protokolüdür.

KUKA KRL Eklentisi, `127.0.0.1` üzerinde çalışan **yerleşik bir MCP Köprü Sunucusu** içerir. Modern yapay zeka geliştirme ortamlarını (**Cursor, Google Antigravity, Claude Code CLI, Windsurf**) doğrudan KRL proje koduna, AST analiz sistemine ve gerçek robot kontrolör telemetrisine bağlar.

---

## MCP Araçları

Harici yapay zeka modelleri aşağıdaki endüstriyel araçlara doğrudan erişir:

| Araç Adı | Kapsam | Görev |
|---|---|---|
| `krl_live_telemetry` | Donanım | Gerçek robottan eksen açılarını, TCP koordinatlarını, aktif çerçeveleri ve alarmları okuma |
| `krl_workspace_diagnostics` | Proje | Çalışma alanındaki `.src`, `.dat`, `.sub` dosyalarını sözdizimi, kapatılmamış FOLD ve Vorlaufstopp açısından denetleme |
| `krl_safe_auto_repair` | Kod | FOLD uyumsuzluklarını giderme, BRAKE ekleme ve döngü kilitlenmelerini deterministik onarma |
| `krl_system_variable_spec` | Bilgi Tabanı | 957+ KSS sistem değişkeninin veri tipi, fiziksel birimi ve sınırları hakkında bilgi alma |
| `krl_alarm_lookup` | Teşhis | Kontrolör hata kodlarını (örn. `KSS00203`, `KSS01442`) 6 dilde çözme |

---

## Yapay Zeka İstemcilerini Bağlama

### 1. Cursor İle Otomatik Entegrasyon
Cursor ortamında çalıştırıldığında eklenti, sunucuyu `vscode.cursor.mcp.registerServer` üzerinden otomatik olarak kaydeder.

### 2. Tek Tıkla JSON Yapılandırma Dışa Aktarımı
`KUKA KRL: Copy MCP Configuration` (`Ctrl+Shift+P`) komutunu kullanarak Claude Desktop, Cursor ve Windsurf için hazır yapılandırma bloklarını panoya kopyalayabilirsiniz.
