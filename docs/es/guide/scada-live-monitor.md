# Monitor Live Monitor Industrial y Conexión en Tiempo Real

Telemetría en tiempo real y puente de conexión para controladores KUKA KRC2, KRC4 y KRC5.

---

## Descripción general

El **Monitor Monitor en Vivo** (`krl.live.connect`, `krl.live.openDashboard`) establece una conexión Ethernet bidireccional y de alta frecuencia entre VS Code y controladores KUKA reales.

Integra telemetría de planta, retroalimentación de par de los 6 ejes, seguimiento de TCP cartesiano, una matriz de E/S de 4096 pines y subtítulos multilingües de alarmas KSS.

---

## Novedades de 1.9.17

- **Telemetría completa de iiQKA.OS**: frames Tool/Base, enclavamientos de seguridad, par/temperatura/corriente/velocidad por eje, límites software, detalles de PGNO, paquetes KOP instalados y `$V_ROBCOR`.
- **Ventana de mensajes SmartPAD**: el panel muestra los últimos tres mensajes; el historial completo (hasta 200, más recientes primero) se abre en una ventana dedicada con filtros, búsqueda y actualización en vivo (`krl.live.openMessages`).
- **Compile gate del KSS destino**: la tarjeta de iiQKA.OS ejecuta `SynchronizeMirror -> AnalyzeAllKrlFiles -> GetModuleInfos` y muestra el veredicto real por módulo. KSS 9.3 requiere patrones explícitos `*.src` / `*.dat` (el patrón `*` devuelve `13 INTERNAL: BSCmdNA`).
- **Transportes validados**: WCF 49002 en KSS 8.6.2 (OfficeLite) y KSS 8.7 (KR C5); iiQKA gRPC en KSS 9.2.3 (VRC) y KSS 9.3.4 (KRC5).
