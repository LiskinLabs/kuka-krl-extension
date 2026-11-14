> *Aviso de marcas: KUKA®, WorkVisual®, iiQWorks®, KUKA.Sim®, SmartPAD® y KRL son marcas registradas de KUKA Aktiengesellschaft / KUKA Roboter GmbH. KRL Engineering Toolkit es una herramienta independiente de Liskin Labs, sin afiliación ni patrocinio de KUKA. Las comprobaciones offline complementan, nunca sustituyen, la validación de seguridad en el controlador físico.*

<h1 align="center">KRL Engineering Toolkit para VS Code</h1>

<p align="center">
  <b>IDE industrial para KRL, analizador estático de seguridad, comparador de respaldos y puente en vivo para robots KUKA.</b><br />
  Diseñado para <b>KRC2, KRC4 y KRC5</b> (<code>KSS 5.x – 8.7</code> y <code>KSS 9.x / iiQWorks / iiQKA.OS</code>) · <b>100% Offline-First · Cero subidas de código</b>
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
  <a href="https://liskinlabs.github.io/kuka-krl-extension/"><img src="https://img.shields.io/badge/Comandos-126-FF6600?style=flat-square" alt="126 Commands" /></a>
  <a href="https://liskinlabs.github.io/kuka-krl-extension/guide/pro-features"><img src="https://img.shields.io/badge/Herramientas%20Pro-63-0EA5E9?style=flat-square" alt="63 Pro Tools" /></a>
</p>

<p align="center">
  <a href="https://liskinlabs.github.io/kuka-krl-extension/es/guide/installation"><b>Instalación y Guía Rápida</b></a> ·
  <a href="https://liskinlabs.github.io/kuka-krl-extension/es/"><b>Documentación y 64 Guías</b></a> ·
  <a href="https://checkout.dodopayments.com/buy/pdt_0NmAV012KFHSjUMyDomJ6?redirect_url=https%3A%2F%2Fkuka-krl-support-gateway.redminotpro5.workers.dev%2Fcheckout%2Fsuccess%3Flang%3Des&singlePage=true&showDiscounts=true&discountCode=LAUNCH30"><b>Comprar Pro Anual (-30%: LAUNCH30)</b></a> ·
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/blob/main/SUPPORT.md"><b>Soporte y Licencias Air-Gap</b></a>
</p>

> **Prueba gratis las 63 herramientas Pro durante 14 días (sin tarjeta):** pulsa `Ctrl+Shift+P` en VS Code y ejecuta **`KRL: Start 14-Day Free Trial`** (`krl.startTrial`) o **`KRL: Ver Planes y Precios Pro`** (`krl.openPricingPlans`).

<p align="center">
  <img src="https://raw.githubusercontent.com/LiskinLabs/kuka-krl-extension/main/docs/public/media/kuka_control_center.gif" width="760" alt="Centro de Control KUKA y Telemetría en Vivo" />
</p>

---

## Detecta fallos antes de que el código toque el robot

Cada hora de parada de línea supera los **10,000 USD** por culpa de paradas del Advance Run (`$OUT` en movimiento continuo), `RESUME` sin `BRAKE` (`KSS 1422`) o frames `$TOOL`/`$BASE` sin inicializar.

**KRL Engineering Toolkit** integra **126 comandos**, **957 variables de sistema KSS**, **183 perfiles cinemáticos de robots KUKA**, auditoría **VASS 26 / VKRC** y **telemetría en vivo del controlador** en VS Code, Cursor y Windsurf.

| Capacidades incluidas | Community (Gratis) | Pro / Team / Enterprise |
|---|---|---|
| Léxico KRL completo, 6 temas industriales, autocompletado (`957` vars, `116` funciones) | Líneas ilimitadas | Líneas ilimitadas |
| Navegación `F12` (`.src` ↔ `.dat`), referencias, formateador, FOLD/ENDFOLD y ordenación | Incluido | Incluido |
| Diagnóstico sintáctico, balanceo de bloques, comprobaciones básicas y snippets KRL | Incluido | Incluido |
| Auditoría previa al despliegue: Advance Run Guard, `S/T`, alcance de 183 robots | Evaluación 30 días | Uso comercial completo |
| Linter automotriz VASS 26 / `VW_USER` (`101..501`) e integridad triple `FOLD` vs `.dat` | — | Uso comercial completo |
| Telemetría KSS 8.x WCF (puerto `49002`) e iiQKA.OS, mensajes SmartPAD y Compile Gate | — | Uso comercial completo |
| Montaje `.zip`/`.wvs` sin descomprimir, delta de puntos (`ΔX/Y/Z`), transformaciones 6D y logs `.evt` | — | Uso comercial completo |

---

## Módulos de Ingeniería Principales

### 1. Puente en Vivo al Controlador y Mensajes SmartPAD (`KSS 8.x` e `iiQKA.OS 9.x`)
- **Cliente WCF nativo para KSS 8.x**: Opera directamente por el puerto `49002` en Node.js sin WorkVisual, KUKA.Sim, Python ni DLLs de terceros.
- **iiQKA.OS (`KRC5`) y Compile Gate**: Lee `$TOOL`/`$BASE`, par/temperatura/corriente por eje, PGNO, paquetes KOP e historial SmartPAD (`krl.live.openMessages`).
- **Inlay Hints de E/S**: Muestra nombres de señales directamente junto a `$IN[x]`, `$OUT[y]` y `$FLAG[z]`.

<p align="center">
  <img src="https://raw.githubusercontent.com/LiskinLabs/kuka-krl-extension/main/docs/public/media/krl_io_signals.gif" width="760" alt="Inspector de señales E/S e Inlay Hints en tiempo real" />
</p>

### 2. Seguridad Pre-Despliegue, Cinemática y VASS 26 / VKRC
- **Barreras Cinemáticas y de Trayectoria**: Detecta singularidades de muñeca/hombro, arcos `CIRC` colineales, exceso de `$APO.CDIS`, errores `Status/Turn` y límites de alcance en **183 robots KUKA**.
- **Integridad de Movimiento en 3 Vías**: Detecta desfases entre cabeceras `;FOLD` y estructuras `.dat` (`PDAT`/`LDAT`/`FDAT`).
- **Suite Automotriz VASS 26 / VKRC**: Valida `Folge`, `UP`, `MakroSps`, `VW_USER` (`101..501`) y enclavamientos de seguridad.

<p align="center">
  <img src="https://raw.githubusercontent.com/LiskinLabs/kuka-krl-extension/main/docs/public/media/type-validation-demo.gif" width="760" alt="Validación estática de seguridad y tipos en KRL" />
</p>

### 3. Diff de Backups SmartPAD, Transformaciones 6D y Logs `.evt`
- **Explorador `.zip` / `.wvs` sin extracción**: Inspecciona respaldos en memoria, decodifica logs binarios `.evt` (EVTX) en 6 idiomas y genera protocolos ISO 10218-1.
- **Inspector de Delta de Puntos**: Resalta cambios exactos de coordenadas (`ΔX, ΔY, ΔZ, A, B, C`).
- **Desplazamiento y Espejo 6D por Lotes**: Previsualización en Monaco Diff con protección de rollback AST.

<p align="center">
  <img src="https://raw.githubusercontent.com/LiskinLabs/kuka-krl-extension/main/docs/public/media/krc_backup_diff.gif" width="760" alt="Comparador de backups SmartPAD e inspector de delta" />
</p>

### 4. Servidor de Lenguaje KRL (Base Community Gratuita)
Navegación `F12` entre `.src` y `.dat`, autocompletado, formateo, plegado `FOLD`/`ENDFOLD`, ordenación y diagnóstico de sintaxis **gratis para siempre sin límite de líneas**.

<p align="center">
  <img src="https://raw.githubusercontent.com/LiskinLabs/kuka-krl-extension/main/docs/public/media/smart_autocomplete.gif" width="760" alt="Autocompletado inteligente de KRL" />
</p>

---

## Ediciones, EULA y Precios Transparentes

**Licencia Community:** Gratuita para aprendizaje personal, investigación académica sin fines de lucro y **evaluación comercial de 30 días** fuera de producción (ver [LICENSE.txt](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/LICENSE.txt)). El uso comercial o productivo continuo requiere licencia Pro, Team, Department o Enterprise.

> **Oferta de lanzamiento (`LAUNCH30`):** Usa **`LAUNCH30`** para obtener un **30% de descuento** (preaplicado en los enlaces directos de pago). Procesado por **Dodo Payments** (Merchant of Record) con gestión fiscal global, **0% IVA intracomunitario EU VIES** y facturas PDF automáticas.

| Plan | Precio Base | Con `LAUNCH30` (-30%) | Activaciones / Plazo | Ideal Para | Acción |
|---|---|---|---|---|---|
| **Community** | 0 USD | 0 USD | Personal / Académico / Eval 30 d. | Aprendizaje y uso no comercial | [Instalar Gratis](https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension) |
| **Pro Monthly** | 19 USD / mes | **13.30 USD / mes** | 1 equipo · Cancela cuando quieras | Puestas en marcha puntuales | [Comprar Mensual](https://checkout.dodopayments.com/buy/pdt_0NmAUzwdbzeERSktsOLTp?redirect_url=https%3A%2F%2Fkuka-krl-support-gateway.redminotpro5.workers.dev%2Fcheckout%2Fsuccess%3Flang%3Des&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Pro Annual** *(Recomendado)* | 149 USD / año | **104.30 USD / año** | 1 equipo · 1 año de mejoras | Ingenieros de robótica | [Comprar Anual (-30%)](https://checkout.dodopayments.com/buy/pdt_0NmAV012KFHSjUMyDomJ6?redirect_url=https%3A%2F%2Fkuka-krl-support-gateway.redminotpro5.workers.dev%2Fcheckout%2Fsuccess%3Flang%3Des&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Pro Lifetime** | 699 USD único | **489.30 USD único** | 1 equipo · Perpetuo | Consultores independientes | [Comprar Lifetime](https://checkout.dodopayments.com/buy/pdt_0NmAcoqVCfuwQ6Xx7qyqr?redirect_url=https%3A%2F%2Fkuka-krl-support-gateway.redminotpro5.workers.dev%2Fcheckout%2Fsuccess%3Flang%3Des&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Team Edition** | 499 USD / año | **349.30 USD / año** | **5 equipos** · Factura única | Equipos de célula robótica | [Comprar Team (5)](https://checkout.dodopayments.com/buy/pdt_0NnLCdgD69GiXDLRJ0K5v?redirect_url=https%3A%2F%2Fkuka-krl-support-gateway.redminotpro5.workers.dev%2Fcheckout%2Fsuccess%3Flang%3Des&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Department / Integrator** | 1,499 USD / año | **1,049.30 USD / año** | **20 equipos** · Soporte Air-Gap | Integradores de sistemas | [Comprar Integrator (20)](https://checkout.dodopayments.com/buy/pdt_0Nq5QVTrbkJbWAUf8qoyn?redirect_url=https%3A%2F%2Fkuka-krl-support-gateway.redminotpro5.workers.dev%2Fcheckout%2Fsuccess%3Flang%3Des&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Enterprise Plant** | 4,999 USD / año | Presupuesto corporativo | **100 equipos** · Soporte prioritario | Plantas y OEM | [Solicitar Factura B2B](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/SUPPORT.md#2-14-day-free-trial-upgrades--billing-dodo-payments-mor) |

¿Ya tienes clave? **[Activar Online](https://kuka-krl-support-gateway.redminotpro5.workers.dev/activate?lang=es)** · **[Portal Air-Gap `.lic`](https://kuka-krl-support-gateway.redminotpro5.workers.dev/airgap)** · **[Portal de Cliente y Facturas](https://customer.dodopayments.com/login/bus_0NlrxPhrg9eHzPZKAgsF1)**

---

## Operación en Planta y Redes Air-Gap

- **100% Procesamiento Local**: Tus archivos `.src`, `.dat`, `.sub` y copias nunca salen de tu ordenador ([PRIVACY.md](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/PRIVACY.md)).
- **Caché Offline 30 días + 14 días de gracia**: Trabaja en células aisladas sin cortes de licencia.
- **Modo Air-Gap Total**: Emite ficheros `.lic` firmados con Ed25519 en el [Portal Air-Gap](https://kuka-krl-support-gateway.redminotpro5.workers.dev/airgap) e impórtalos con `krl.importOfflineLicenseFile`.

---

## Novedades en v1.9.17

- **Cliente WCF nativo KSS 8.x**: Telemetría en puerto `49002` desde Node.js sin WorkVisual, KUKA.Sim ni DLLs externas.
- **Telemetría completa iiQKA.OS y Mensajes SmartPAD**: Frames Tool/Base, enclavamientos, par/temperatura/corriente por eje, PGNO, KOP y `krl.live.openMessages`.
- **Compile Gate iiQKA.OS y Migración (`KSS 8.3 – 9.3`)**: Validado en vivo en KSS 8.6.2, KSS 8.7, iiQKA 9.2.3 e iiQKA 9.3.4 ([CHANGELOG.md](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/CHANGELOG.md)).
