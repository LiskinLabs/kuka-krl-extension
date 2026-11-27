<h1 align="center">KRL Engineering Toolkit para Robótica KUKA®</h1>

<p align="center">
  Servidor de lenguaje KRL, análisis estático de seguridad, diff de backups sin descomprimir, inspector WorkVisual (<code>.wvs</code>) y telemetría en vivo en VS Code, Cursor y Windsurf.<br />
  Compatible con <b>KR C2, KR C4 y KR C5 (micro / -2)</b> · <code>KSS 5.4–8.7</code> · <code>VSS (VKRC) 8.3–8.7</code> · <code>iiQKA.OS2 9.0–9.3</code> · <b>100% Local en RAM · Cero subidas a la nube</b>
</p>

<p align="center">
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.md">English</a> ·
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.ru.md">Русский</a> ·
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.de.md">Deutsch</a> ·
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.tr.md">Türkçe</a> ·
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.es.md"><b>Español</b></a> ·
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/blob/main/README.it.md">Italiano</a>
</p>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension"><img src="https://vsmarketplacebadges.dev/version-short/LiskinLabs.kuka-krl-extension.svg?style=flat-square&label=VS%20Code%20Marketplace&color=FF6600" alt="VS Code Marketplace" /></a>
  <a href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension"><img src="https://vsmarketplacebadges.dev/installs-short/LiskinLabs.kuka-krl-extension.svg?style=flat-square&label=Marketplace%20Installs&color=2563EB" alt="Instalaciones" /></a>
  <a href="https://open-vsx.org/extension/LiskinLabs/kuka-krl-extension"><img src="https://img.shields.io/open-vsx/v/LiskinLabs/kuka-krl-extension?style=flat-square&logo=eclipseche&logoColor=white&color=007ACC&label=Open%20VSX" alt="Open VSX" /></a>
  <a href="https://open-vsx.org/extension/LiskinLabs/kuka-krl-extension"><img src="https://img.shields.io/open-vsx/dt/LiskinLabs/kuka-krl-extension?style=flat-square&logo=eclipseche&logoColor=white&color=007ACC&label=Open%20VSX%20Downloads" alt="Descargas Open VSX" /></a>
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/releases"><img src="https://img.shields.io/badge/Release-v1.9.27-FF6600?style=flat-square&logo=visualstudiocode&logoColor=white" alt="Release v1.9.27" /></a>
  <a href="https://secure.software/vscode/packages/liskinlabs/kuka-krl-extension"><img src="https://img.shields.io/badge/Spectra%20Assure-PASSED%20(0%20CVE)-10b981?style=flat-square&logo=shield&logoColor=white" alt="Spectra Assure" /></a>
  <a href="https://liskinlabs.com/"><img src="https://img.shields.io/badge/Fleet%20Audited-4.13M%2B%20LoC-10b981?style=flat-square" alt="4.13M+ líneas" /></a>
  <a href="https://liskinlabs.com/guide/pro-features"><img src="https://img.shields.io/badge/Commands-136%20(69%20Free%20%7C%2067%20Pro)-0EA5E9?style=flat-square" alt="136 comandos" /></a>
</p>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension"><b>Instalar desde Marketplace</b></a> ·
  <a href="https://open-vsx.org/extension/LiskinLabs/kuka-krl-extension"><b>Instalar desde Open VSX</b></a> ·
  <a href="https://liskinlabs.com/es/"><b>Documentación</b></a> · ·
  <a href="https://sim.liskinlabs.com/"><b>Simulador 3D</b></a> ·
  <a href="mailto:info@liskinlabs.com"><b>info@liskinlabs.com</b></a>
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/blob/main/SUPPORT.md"><b>Soporte y Air-Gap</b></a>
</p>

> **Prueba Pro de 14 días sin tarjeta:** pulsa `Ctrl+Shift+P` en VS Code y ejecuta **`KRL: Start 14-Day Free Trial`** (`krl.startTrial`) o compara planes con **`KRL: View Pricing Plans & Upgrade Options`** (`krl.openPricingPlans`).

<p align="center">
  <img src="https://raw.githubusercontent.com/LiskinLabs/kuka-krl-extension/main/docs/public/media/kuka_control_center.gif" width="780" alt="Centro de Control y Telemetría en Vivo KRL Engineering Toolkit" />
</p>

---

## Fallos habituales detectados antes de subir el código al controlador

| Fallo en célula | Lo que omiten editores genéricos | Respuesta de KRL Engineering Toolkit |
|---|---|---|
| **Falta `BRAKE` antes de `RESUME`** | Llamar a `RESUME` sin `BRAKE` provoca una parada de lectura anticipada (el robot completa el segmento activo en vez de frenar al instante) y dispara `KSS 1584` si falla la pila / `$ADVANCE=0` | El analizador detecta la ausencia de `BRAKE` (o `INTERRUPT WITH BRAKE`) y `Ctrl+.` lo inserta con vista previa Diff |
| **Parada de Advance Run (`$OUT` / `WAIT`)** | Escribir `$OUT` en movimientos `C_DIS` / spline genera un Vorlaufstopp | Señala las líneas conflictivas y sugiere `TRIGGER WHEN DISTANCE=0 DELAY=0 DO $OUT[...] = TRUE` |
| **Deriva de puntos en SmartPAD** | Retoques de `E6POS` entre turnos sin control de diferencias | Monta `.zip` / `.ibz` / `KRCDiag` en memoria (`< 80 ms`) y calcula deltas 6D (`ΔX, ΔY, ΔZ, A, B, C`) en Diff |
| **Desincronización `;FOLD` / `.dat` / KSS** | `;Params` obsoletos, `PDAT.VEL` en KSS 9.x o movimiento en `DRYRUN ... ENDDRYRUN` | Valida `14` perfiles KSS (`5.4–9.3`), `SVEL_CP2`/`PDAT`/`LDAT`, `;FOLD` y prohíbe movimientos dentro de `DRYRUN` |
| **UTF-8 BOM y codificación** | El BOM `\xEF\xBB\xBF` falla en `iiQKA.OS2`; una codificación incorrecta rompe comentarios | Conserva UTF-8 sin BOM (`iiQKA.OS2`), `CP1251`, `Windows-1252` y `UTF-16LE` sin pérdida de datos |
| **Revisión `.wvs` e I/O sin WorkVisual** | Abrir suites pesadas en Windows solo para ver buses o señales | Abre `.wvs` / `.vcmx` en Windows, macOS y Linux o conecta por puertos oficiales (`49002`, `443`, `4840`, `7000`) |

---

## Base verificada y seguridad

- **Auditado en 108 backups reales**: `4,136,829` líneas de código KRL analizadas en `25.4 s`.
- **Referencia KSS integrada**: `957` variables de sistema (`127` guardas de solo lectura y gating por versión), `116+` funciones KRL / EKI 6.x / RSI 6.x, `111` estructuras, `112` enums, `183` perfiles de robot y `136` comandos (`69` Free + `67` Pro).
- **Validado en controlador**: `KSS 8.6.2 (OfficeLite)`, `KSS 8.7 (KR C5)`, `iiQKA.OS2 9.2.3 (VRC)` y `iiQKA.OS2 9.3.4 (KR C5)`.
- **Seguridad y Air-Gap**: ReversingLabs Spectra Assure PASSED (`0 CVE`), procesamiento `100%` local en RAM, cero subidas de código y activación offline Ed25519 `.lic`.

---

## Módulos principales

1. **Puente Live e I/O de bus `[PRO]`**: Transporte Node.js nativo para `WCF` (`49002`), `iiQKA.OS2` gRPC (`443`), sonda `OPC UA` (`4840`) y `KUKAVARPROXY` (`7000`) sin WorkVisual ni DLLs externas; autodescubrimiento, Cross-Subnet Scout, credenciales en `SecretStorage` (`krl.live.changeCredentials`), I/O de 4096 pines con filtro `CFG` (`KrcIoSignals.xml`), `UserTexts.kxr`, tendencias SVG Watch, pestaña Health (7 comprobaciones) y Compile Gate.
2. **Auditoría estática, reparación segura y VASS 26 / VKRC `[PRO]`**: `krl.fixAllSafeIssuesInFile` con rollback AST, migración `KSS 5.4–9.3` (`14` perfiles), `DRYRUN ... ENDDRYRUN` (`krl-dryrun-motion`), singularidad de muñeca (`|A5| <= 5°`), `SPS.SUB`, linter **Volkswagen VASS 26 / `VW_USER 101..501`** y limpieza de variables no usadas (`krl.cleanupUnusedVariables`).
3. **Diff sin descomprimir, `.wvs` y `.vcmx` `[PRO]`**: Montaje en RAM de `.zip`/`.ibz`/`KRCDiag`, deltas 6D, decodificador EVTX `.evt`/`krc.log`, exportación `.wvs` a **TIA Portal**, **TwinCAT 3** y **EPLAN** (`krl.inspectFieldbusTopology`), validación `.vcmx` (`VCMX001–VCMX004`) e informes **ISO 10218-1/-2**.
4. **Diagramas SVG, `iiQKA.RSI 6.x` / `EKI 6.x`, CAM y MCP `[PRO]`**: Grafo interactivo (`krl.showFlowchart`), generación y validación clásica e `iiQKA 6.x` (`RSI_LOAD`, `RSI_PROCESS_ON()`, `EKI_Load`), importador CNC G-Code / SVG y puente local MCP (`127.0.0.1`).
5. **Servidor de lenguaje KRL `[FREE CORE]`**: Navegación `F12` (`.src` <-> `.dat`), referencias, renombrado aislado al módulo, `957` variables, formateo que respeta `;%{PE}` y 6 temas (`69` comandos gratuitos).

> **Límite técnico:** Complementa y no sustituye a **KUKA WorkVisual** ni **iiQWorks.Sim** para configuración hardware de bus de campo, SafeOperation o despliegue en controlador. No es software certificado de seguridad (`Non-SIL / Non-PL`).

---

## Licencias y tarifas

**Edición Community:** Gratuita para aprendizaje personal, docencia e investigación no comercial ([LICENSE.txt](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/LICENSE.txt)). El uso comercial requiere licencia tras la **prueba gratuita de 14 días** (`krl.startTrial`).

| Plan | Precio estándar | Alcance | Uso recomendado | Contratación |
|---|---|---|---|---|
| **Community** | USD 0 | Personal / Académico · 14 días prueba Pro | Formación y pruebas | [Instalar gratis](https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension) |
| **Pro Monthly** | USD 19 / mes | 1 equipo · Cancelable en cualquier momento | Puestas en marcha puntuales | [Suscribirse](https://checkout.dodopayments.com/buy/pdt_0NmAUzwdbzeERSktsOLTp?redirect_url=https%3A%2F%2Fapi.liskinlabs.com%2Fcheckout%2Fsuccess%3Flang%3Des&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Pro Annual** | USD 149 / año | 1 equipo · 1 año de actualizaciones | Programadores KUKA | [Plan Anual](https://checkout.dodopayments.com/buy/pdt_0NmAV012KFHSjUMyDomJ6?redirect_url=https%3A%2F%2Fapi.liskinlabs.com%2Fcheckout%2Fsuccess%3Flang%3Des&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Pro Lifetime** | USD 699 único | 1 equipo · Perpetuo | Consultores independientes | [Lifetime](https://checkout.dodopayments.com/buy/pdt_0NmAcoqVCfuwQ6Xx7qyqr?redirect_url=https%3A%2F%2Fapi.liskinlabs.com%2Fcheckout%2Fsuccess%3Flang%3Des&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Team** | USD 499 / año | 5 equipos · Factura única | Equipos de célula | [Comprar Team](https://checkout.dodopayments.com/buy/pdt_0NnLCdgD69GiXDLRJ0K5v?redirect_url=https%3A%2F%2Fapi.liskinlabs.com%2Fcheckout%2Fsuccess%3Flang%3Des&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Department** | USD 1,499 / año | 20 equipos · Soporte Air-Gap | Integradores de sistemas | [Comprar Department](https://checkout.dodopayments.com/buy/pdt_0Nq5QVTrbkJbWAUf8qoyn?redirect_url=https%3A%2F%2Fapi.liskinlabs.com%2Fcheckout%2Fsuccess%3Flang%3Des&singlePage=true&showDiscounts=true&discountCode=LAUNCH30) |
| **Enterprise** | USD 4,999 / año | 100 equipos · PO y SLA | Plantas y OEM | [Compra corporativa](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/SUPPORT.md#2-14-day-free-trial-upgrades--billing-dodo-payments-mor) |

<sub>El código `LAUNCH30` (30% de descuento) viene aplicado en los enlaces superiores. Pagos y facturas VAT/VIES procesados por Dodo Payments (Merchant of Record). Ya tienes licencia: <a href="https://api.liskinlabs.com/activate">Activar online</a> · <a href="https://api.liskinlabs.com/airgap">Generar .lic Air-Gap</a> · <a href="https://customer.dodopayments.com/login/bus_0NlrxPhrg9eHzPZKAgsF1">Portal cliente</a>.</sub>

---

## Inicio rápido, privacidad y avisos legales

```bash
code --install-extension LiskinLabs.kuka-krl-extension
```

Todos los datos permanecen en local ([PRIVACY.md](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/PRIVACY.md)). Historial: [CHANGELOG.md](https://github.com/LiskinLabs/kuka-krl-extension/blob/main/CHANGELOG.md). Las verificaciones offline no sustituyen la validación en modo `T1` (`$OV_PRO <= 30%`) sobre SmartPAD bajo **ISO 10218-1/-2** e **ISO 13849-1**. KUKA®, WorkVisual®, iiQWorks®, KUKA.Sim®, SmartPAD® y KRL son marcas registradas de KUKA Aktiengesellschaft / KUKA Roboter GmbH.
