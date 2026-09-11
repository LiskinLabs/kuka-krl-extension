<h1 align="center">KUKA KRL Professional</h1>

<p align="center">
  <b>El IDE industrial definitivo y la suite de seguridad para el lenguaje de robots KUKA.</b><br />
  Diseñado para controladores KRC2, KRC4 y KRC5 (KSS 8.2 – 8.7). Construido para velocidad, seguridad y cero tiempos de parada.
</p>

<details>
<summary>🌐 Language / Язык / Dil / Sprache / Lingua / Idioma</summary>

| Language | File |
|---|---|
| 🇬🇧 English | [README.md](README.md) |
| 🇷🇺 Русский | [README.ru.md](README.ru.md) |
| 🇹🇷 Türkçe | [README.tr.md](README.tr.md) |
| 🇩🇪 Deutsch | [README.de.md](README.de.md) |
| 🇮🇹 Italiano | [README.it.md](README.it.md) |
| 🇪🇸 Español | [README.es.md](README.es.md) |

</details>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension"><img src="https://badgen.net/vs-marketplace/v/LiskinLabs.kuka-krl-extension?style=flat&label=VS%20Code%20Marketplace&color=FF6600" alt="VS Code Marketplace" /></a>
  <a href="https://open-vsx.org/extension/LiskinLabs/kuka-krl-extension"><img src="https://img.shields.io/open-vsx/v/LiskinLabs/kuka-krl-extension?style=flat-square&logo=eclipseche&logoColor=white&color=007ACC&label=Open%20VSX" alt="Open VSX" /></a>
  <a href="https://github.com/LiskinLabs/kuka-krl-extension/releases"><img src="https://img.shields.io/badge/Release-v1.8.4-FF6600?style=flat-square&logo=visualstudiocode&logoColor=white" alt="Release v1.8.4" /></a>
  <a href="https://secure.software/vscode/packages/liskinlabs/kuka-krl-extension"><img src="https://img.shields.io/badge/Spectra%20Assure-PASSED%20(100%25)-10b981?style=flat-square&logo=shield&logoColor=white" alt="ReversingLabs Security Score" /></a>
  <a href="https://liskinlabs.github.io/kuka-krl-extension/"><img src="https://img.shields.io/badge/Fleet%20Verified-4.1M%2B%20LoC-10b981?style=flat-square" alt="Fleet Verified" /></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Language-KRL-orange?style=flat-square" />
  <img src="https://img.shields.io/badge/Controllers-KRC2%20%7C%20KRC4%20%7C%20KRC5-007ACC?style=flat-square" />
  <img src="https://img.shields.io/badge/Kernel-KUKA.Sim%204.10%20Inside-FF6600?style=flat-square" />
  <img src="https://img.shields.io/badge/Built--in%20Specs-957%20Vars%20%7C%20116%20Functions-10b981?style=flat-square" />
  <img src="https://img.shields.io/badge/Offline--First-100%25%20Factory%20Ready-green?style=flat-square" />
  <img src="https://img.shields.io/badge/Security-0%20Malware%20%7C%200%20CVEs-emerald?style=flat-square" />
  <img src="https://img.shields.io/badge/Localization-EN%20%7C%20DE%20%7C%20IT%20%7C%20ES%20%7C%20RU%20%7C%20TR-blue?style=flat-square" />
</p>

<p align="center">
  <a href="https://liskinlabs.github.io/kuka-krl-extension/"><b>🌐 Wiki interactiva (50 herramientas industriales)</b></a> •
  <a href="https://checkout.dodopayments.com/buy/pdt_0NmAUzwdbzeERSktsOLTp"><b>⚡ Prueba gratuita de 14 días ($9.99/mes)</b></a> • 
  <a href="https://checkout.dodopayments.com/buy/pdt_0NmAV012KFHSjUMyDomJ6"><b>👑 Pro anual ($79.00/año – ahorra un 35%)</b></a> • 
  <a href="https://secure.software/vscode/packages/liskinlabs/kuka-krl-extension"><b>🛡️ Informe de auditoría de seguridad</b></a>
</p>

---

> [!IMPORTANT]
> ### ⚠️ Aviso de puesta en servicio
> Antes de la entrega al cliente y la puesta en servicio industrial, se recomienda encarecidamente cargar los archivos modificados en un controlador virtual KUKA.OfficeLite o en un armario KRC físico, asegurándose de que el compilador KSS integrado informe un estado de módulo verde (el indicador «R» en el SmartPAD) y ningún error de sintaxis o cinemática.

---

## ⚡ El problema de la parada de producción de $10,000/hora

Todo ingeniero de puesta en marcha conoce este dolor:
1. **El ciclo lento**: editar archivos directamente en la consola SmartPAD o luchar contra los lentos despliegues de WorkVisual.
2. **El riesgo de colisión oculto**: una única asignación `$TOOL` o `$BASE` faltante, un desplazamiento de coordenadas sin verificar o un exceso accidental de `$VEL.CP` que provoca un choque mecánico en la primera ejecución automática.
3. **Los cambios sin verificar**: los compañeros retocan puntos en la consola durante el turno de noche sin ningún control de versiones.

**KUKA KRL Professional** transforma tu editor en un **centro de mando de robótica industrial** de alto rendimiento. Detecta errores de sintaxis, fallos cinemáticos, bloques sin cerrar y desajustes de coordenadas **ANTES** de que el código toque el controlador físico del robot.

> **💡 La garantía de retorno de inversión:** detectar un solo fallo de sintaxis o una colisión mecánica antes de ejecutar el código en planta paga una licencia Pro de por vida en los primeros 5 minutos.

---

## 🚀 Características profesionales clave

### 1. 🗺️ Diagrama de flujo interactivo y grafo de flujo de control
*Deja de rastrear lógica anidada a mano.* Convierte programas `.src` enormes y complejos en diagramas de flujo limpios, interactivos y clicables.
* **Salto al código bidireccional**: haz clic en cualquier bloque para saltar instantáneamente a la línea exacta de código.
* **Exploración de subrutinas**: haz clic en las llamadas (p. ej. `PickPart()`, `WeldSeam()`) para cargar e inspeccionar sus diagramas.
* **Señales y temporizadores**: insignias de estado codificadas por colores para señales de E/S, flags y temporizadores.
* **Panel de seguridad integrado**: el análisis completo de Seguridad Industrial se ejecuta para el programa mostrado — riesgos de movimiento, actuadores y bloqueos con navegación a la línea en un clic.
* **Exportación SVG vectorial**: diagramas vectoriales de alta resolución para entregas a clientes y documentación de automatización.

<p align="center">
  <img src="docs/public/media/control_flow_graph.gif" width="720" alt="Interactive Flowchart Demo" />
</p>

---

### 2. 🛡️ Seguridad industrial y analizador de lógica profunda
*Elimina fallos de sintaxis, bloqueos y riesgos de colisión mecánica antes de tocar el controlador.*
* **Balance estricto de bloques**: marca bloques huérfanos `IF / ENDIF`, `FOR / ENDFOR` y `LOOP / ENDLOOP` antes de la compilación KRC.
* **Protección Tool/Base**: advierte si los comandos de movimiento (`PTP`, `LIN`, `CIRC`) se ejecutan sin inicialización activa de `$TOOL` o `$BASE`.
* **Inspector de velocidad**: alerta cuando la velocidad cartesiana `$VEL.CP` supera los límites seguros de puesta en marcha (> 2.0 m/s).
* **Bloqueador de deadlocks**: marca timeouts faltantes en condiciones `WAIT FOR` y bucles infinitos sin `EXIT`.
* **Bloqueador de cirílico y no-ASCII**: detecta caracteres no-ASCII accidentales que rompen silenciosamente los compiladores KSS antiguos.

<p align="center">
  <img src="docs/public/media/type-validation-demo.gif" width="720" alt="Safety and Diagnostics Demo" />
</p>

---

### 3. 📦 Diff de copias ZIP de SmartPAD y matemática de deltas de puntos
*Inspecciona y compara el código del proyecto en vivo con las copias de seguridad `.zip` del SmartPAD.*
* **Matemática de deltas**: calcula desplazamientos espaciales exactos de 6 ejes (**ΔX, ΔY, ΔZ, ΔA, ΔB, ΔC**) para puntos `E6POS`, `POS` y `E6AXIS`.
* **Auditoría sin contacto**: detecta al instante retoques de puntos sin verificar hechos en planta antes de que causen colisiones.
* **Diff visual lado a lado**: visor de diferencias gráfico con código de colores integrado en VS Code.

<p align="center">
  <img src="docs/public/media/krc_backup_diff.gif" width="720" alt="SmartPAD Backup Diff Demo" />
</p>

---

### 4. 🔀 Control de versiones KRL potenciado con GitLens
*Rastrea cada edición de coordenadas y modificación del programa con precisión.*
* **Anotaciones blame por línea**: autor, marca de tiempo y detalles del commit en la barra de estado para cualquier línea KRL.
* **Inspector de commits**: haz clic en el blame de la barra de estado para inspeccionar diffs completos, metadatos y revisiones históricas.
* **Historial de archivos visual (`krl.viewFileHistory`)**: compara el código actual del workspace con cualquier commit Git histórico en un diff lado a lado.

---

### 5. 📐 Matemática de frames de Euler por 3 puntos y KUKA Control Center
*Calculadora de transformación de sistemas de coordenadas integrada directamente en el editor.*
* **Método de 3 puntos**: calcula los orígenes de `BASE_DATA` y `TOOL_DATA` y los ángulos de Euler (A, B, C) a partir de puntos de calibración medidos.
* **Inserción directa en `.dat`**: inserta los frames de coordenadas calculados en los archivos de datos con un clic.
* **Cero errores de trigonometría**: elimina hojas de cálculo y matemáticas manuales de orientación en planta.

<p align="center">
  <img src="docs/public/media/kuka_control_center.gif" width="720" alt="KUKA Control Center Demo" />
</p>

---

### 6. 🔍 Sugerencias inline de señales y mapeo de comentarios PLC
*Comprende la lógica de E/S de un vistazo sin hojear los esquemas eléctricos.*
* Lee las definiciones de señales directamente de `$config.dat` y `kuka_signals.json`.
* Muestra etiquetas legibles junto a `$IN[x]`, `$OUT[y]`, `$ANIN[z]` y `$FLAG[k]`.

<p align="center">
  <img src="docs/public/media/inlay_hints.gif" width="720" alt="Signal Inlay Hints Demo" />
</p>

---

### 7. ⚡ Formateador de código automático y alineación de matrices
*Convierte código manuscrito desordenado en código industrial limpio y estandarizado con una tecla (`Shift+Alt+F`).*
* Indentación estándar KUKA de 3 espacios.
* Alinea los operadores `=` en archivos `.dat` para matrices de coordenadas legibles.
* Normalización de mayúsculas/minúsculas de palabras clave KRL (`DEF`, `GLOBAL`, `INTERRUPT`, `CONTINUE`).

<p align="center">
  <img src="docs/public/media/code_formatter.gif" width="720" alt="Code Formatter Demo" />
</p>

---

### 8. 🏭 Integración oficial del kernel KUKA.Sim 4.10 y 957+ variables de sistema
*Especificaciones industriales auténticas extraídas directamente de KUKA.Sim 4.10, WorkVisual y el runtime del controlador KRC.*
* **957 variables de sistema**: cobertura exhaustiva de las variables de KSS 8.3–8.7/9.0 (`$ACC`, `$TOOL`, `$BASE`, `$POS_ACT`, `$VEL_AXIS`, etc.) con unidades físicas, límites de arrays (217 arrays) y estados de solo lectura.
* **116 funciones de sistema integradas y Wonderlib**: soporte completo en runtime para cinemática (`FORWARD`, `INVERSE`, `INV_POS`, `TOOL_ADJ`), manipulación de cadenas, conversión de tipos, diálogos de mensajes, límites de par y rutinas Wonderlib con `signatureHelp` en tiempo real.
* **111 estructuras y 112 ENUM (443 literales)**: autocompletado inteligente con punto (`$TOOL.`, `$ACC.`, `POINT.`) y autocompletado de literales enum `#` (`#AUT`, `#T1`, `#P_FREE`, `#QUIT`).
* **23 snippets oficiales de formularios inline KUKA (34 plantillas)**: plantillas auténticas de Kuka Roboter GmbH (`ptpi`, `slini`, `sptpi`, `scirc`, `PTPCo`, `ptprel`, `trigdist`, `sigin`, `wsec`, `Forr`) con cabeceras completas (`;FOLD ... ;%{PE}`).
* **Matriz del compilador de 451 palabras clave**: integración directa de las reglas `keyword.h` de C++ de KUKA — cero falsos positivos de sintaxis.
* **Sintaxis hex/binaria con comillas simples**: pleno cumplimiento del parser y diagnóstico para `'B000001'` (binario), `'HFF'` (hexadecimal) y literales de carácter.
* **Auditoría de flota con cero falsos positivos (4.1M+ líneas)**: verificada contra 107 copias de seguridad reales de robots en producción con 0 diagnósticos falsos.

<p align="center">
  <img src="docs/public/media/smart_autocomplete.gif" width="720" alt="Smart Autocomplete Demo" />
</p>

---

### 9. 🔎 Ir a la definición y encontrar todas las referencias
*Indexación instantánea a nivel AST en toda la carpeta del proyecto.* Salta desde cualquier llamada de función o variable directamente a su declaración entre archivos `.src` y `.dat` separados.

<p align="center">
  <img src="docs/public/media/goto_definition.gif" width="720" alt="Go to Definition Demo" />
</p>

---

### 10. ℹ️ Documentación hover completa y estado de lectura/escritura
*Explicaciones de parámetros y advertencias de seguridad instantáneas.* Pasa el cursor sobre cualquier variable de sistema KSS para ver sus unidades físicas, permisos de lectura/escritura y descripciones de los manuales KSS.

<p align="center">
  <img src="docs/public/media/hover_info.gif" width="720" alt="Hover Info Demo" />
</p>

---

### 11. 🧹 Limpieza de metadatos Git y eliminador de cabeceras WorkVisual
*Mantén limpio el control de versiones.* Elimina las cabeceras WorkVisual (`&ACCESS`, `&REL`, `&PARAM`, `&COMMENT`) con un clic para evitar diffs Git ruidosos en commits automatizados.

<p align="center">
  <img src="docs/public/media/git_metadata_cleaner.gif" width="720" alt="Git Metadata Cleaner Demo" />
</p>

---

### 12. ⚙️ KRL moderno y suite FOLD iiQKA
*Actualiza tu código a los estándares KUKA modernos con 1 clic.*
* **Convertir selección a FOLD iiQKA (`krl.wrapIiQkaFold`)**: envuelve tu lógica personalizada en bloques plegables estándar iiQKA.
* **Convertir a bloque Spline (`krl.wrapSplineBlock`)**: envuelve movimientos lineales y circulares en bloques `SPLINE` / `ENDSPLINE` de alto rendimiento para KSS 8.3–8.7.
* **Inyector de protección contra colisiones (`krl.insertCollisionGuard`)**: inyecta automáticamente frames de monitoreo de par `$TORQMON` alrededor de zonas de movimiento críticas.
* **Limpiar y desenvolver FOLDs (`krl.cleanUnwrapFolds`)**: desenvuelve con seguridad formularios inline obsoletos preservando las instrucciones de movimiento internas.

---

### 13. 💬 Gateway de soporte en vivo y telepresencia remota
*Chat de soporte bidireccional directo con los desarrolladores dentro de VS Code.*
* **Panel de chat interactivo**: sincronización instantánea de hilos del foro con el soporte técnico.
* **Smart Diff & Apply**: revisión con un clic y aplicación automática de las correcciones de código sugeridas por el soporte técnico.
* **Telepresencia remota y diagnóstico**: comandos de telemetría seguros opcionales (`/ai_diag`, `/logs`, `/sysinfo`, `/ping`) para asistencia rápida en puesta en marcha.

---

### 14. 🗂️ Barra rápida de FOLD y ordenación de declaraciones
*Gestiona programas enormes con facilidad.* Plegado con un clic de bloques FOLD, subprogramas y ordenación automática de declaraciones de variables.

<p align="center">
  <img src="docs/public/media/quick_fold_toolbar.gif" width="720" alt="Quick Fold Toolbar Demo" />
</p>

---

### 15. 💀 Análisis de código muerto y funciones globales sin uso
*Previene el crecimiento descontrolado del código y las rutinas de prueba sobrantes.* Identifica subrutinas no llamadas, variables sin usar y ramas de código inalcanzables en todo el workspace.

<p align="center">
  <img src="docs/public/media/dead-code-demo.gif" width="720" alt="Dead Code Analysis Demo" />
</p>

---

### 16. 🎨 Paleta de sintaxis auténtica KUKA.Sim y WorkVisual y biblioteca del sistema KSS 8.7
*Paleta de colores rica y contexto de sistema estándar extraídos directamente de KUKA.Sim 4.10.*
* **Paleta diversa de alto contraste**: esquemas de color 100% auténticos de KUKA.Sim (`KRLDark.xshd`) y WorkVisual (`KRL.xshd`). Ámbitos diferenciados para comandos de movimiento (negrita), operadores bit a bit/lógicos, símbolos matemáticos, directivas de sistema (`&ACCESS`, `&REL`) y números hexadecimales/binarios (`'H...'`, `'B...'`).
* **Biblioteca estándar del sistema KSS 8.7**: definiciones integradas, ayuda de parámetros y `F12` (Ir a la definición) para `BAS()`, `MsgNotify()`, `MsgQuit()`, `MsgDialog()`, `USE_CM_PRO_VALUES()`, `TOOL_NAME[]` y `BASE_NAME[]` — directamente a los módulos de referencia oficiales de KSS 8.7.
* **Andamiaje de proyecto KRC en 1 clic (`krl.scaffoldKrcFiles`)**: crea automáticamente el árbol estándar `KRC/R1/System/`, `KRC/R1/Program/` y `KRC/R1/TP/` poblado con `$config.dat`, `bas.src`, `MsgLib.src`, `collmonlib.src` y `sps.sub`.
* **Valores de fábrica y limitador Advance Run**: visualización hover instantánea de los valores oficiales de fábrica (`operate.defaultvalues`) para `$ADVANCE = 3`, `$VEL.CP = 2.0 m/s`, `$ACC.CP = 2.3 m/s²`, `$JERK.CP = 500.0 m/s³` y advertencias lint automáticas cuando `$ADVANCE` supera el rango válido `0..5`.

---

## 📊 Matriz de comparación de características (50 herramientas industriales)

| Característica | Community (gratis) | Pro Industrial | Beneficio para ingenieros |
|:---|:---:|:---:|:---|
| **Resaltado de sintaxis KRL** (`.src`, `.dat`, `.sub`, `.kfd`) | ✅ | ✅ | Coloración AST completa con la paleta diversa de KUKA.Sim |
| **Temas KUKA.Sim 4.10 y WorkVisual** | ✅ | ✅ | Esquemas de color AvalonEdit auténticos (oscuro y claro) |
| **Autocompletado inteligente y especificaciones del kernel** (957+ variables, 116 funciones, 111 estructuras) | ✅ | ✅ | Kernel oficial KUKA.Sim 4.10 con ayuda de firmas |
| **Biblioteca estándar del sistema KSS 8.7 y definición F12** | ✅ | ✅ | Salto F12 instantáneo a `bas.src`, `MsgLib.src`, `$config.dat` |
| **Andamiaje de proyecto KRC en 1 clic** | ✅ | ✅ | Inicializa la estructura estándar `KRC/R1/System` |
| **Hover de valores de fábrica y limitador $ADVANCE** | ✅ | ✅ | Muestra valores de fábrica y advierte si `$ADVANCE > 5` |
| **23 snippets oficiales de formularios inline** (34 plantillas de movimiento y lógica) | ✅ | ✅ | Plantillas completas `;FOLD ... ;%{PE}` de KUKA Roboter GmbH |
| **Sugerencias inline de señales y documentación hover** | ✅ | ✅ | Etiquetas de señales PLC inline y firmas de parámetros |
| **Formateador de código y alineación de matrices** | ✅ | ✅ | Limpieza instantánea con 1 clic (`Shift+Alt+F`) |
| **Blame por línea GitLens e historial de revisiones** | ✅ | ✅ | Seguimiento instantáneo de autor y commit para cada punto |
| **Arquitectura en seis idiomas** (EN, DE, IT, ES, RU, TR) | ✅ | ✅ | UI nativa completa, 515 claves de UI y 1.073 traducciones de documentación de variables del sistema |
| **Limpieza de metadatos Git** | ✅ | ✅ | Elimina cabeceras WorkVisual para diffs Git limpios |
| **Control Center y guía de referencia de 21 tarjetas** | ✅ | ✅ | Conmutadores de diagnóstico en tiempo real y guía de atajos en el editor |
| **Árbol lateral completo de 36 comandos** | ✅ | ✅ | Cada comando de la extensión accesible con 1 clic |
| **Exportación ZIP nativa del proyecto y telepresencia remota** | ✅ | ✅ | Copia completa con 1 clic al explorador o a Telegram |
| **Integración Copilot AI Language Model Tools** | ✅ | ✅ | `krl_safety_check` invocable directamente por la IA de VS Code |
| **Informe de aceptación de calidad de copias SmartPAD** | ❌ | **✅ Pro** | Auditoría automática del proyecto con pasaporte del robot e hipervínculos clicables |
| **KRL moderno y suite FOLD iiQKA** | ❌ | **✅ Pro** | FOLDs iiQKA, bloques Spline y protección contra colisiones |
| **Visor de diagrama de flujo interactivo** (Mermaid SVG) | ❌ | **✅ Pro** | Lógica visual del flujo de control y salto al código bidireccional |
| **Diagnóstico estricto de balance de bloques** | ❌ | **✅ Pro** | Captura bloques `IF/LOOP/FOR` sin cerrar |
| **Inspector de velocidad y seguridad** ($VEL.CP) | ❌ | **✅ Pro** | Previene peligrosos excesos de velocidad cartesiana |
| **Protección Tool / Base** | ❌ | **✅ Pro** | Marca el movimiento antes de la inicialización de frames |
| **Diff de copias ZIP SmartPAD y delta de puntos** | ❌ | **✅ Pro** | Calcula deltas exactos de coordenadas (ΔX, ΔY, ΔZ) |
| **Calculadora de frames de Euler por 3 puntos** | ❌ | **✅ Pro** | Calcula `BASE_DATA`/`TOOL_DATA` en el editor |
| **Suite XML EthernetKRL (EKI)** | ❌ | **✅ Pro** | Generador y validador de plantillas XML en vivo |
| **Gateway de soporte en vivo y telepresencia remota** | ❌ | **✅ Pro** | Chat directo de soporte bidireccional, Diff & Apply |
| **Comprobador de código muerto y alcance** | ❌ | **✅ Pro** | Encuentra variables sin usar y subrutinas muertas |
| **Diagramas de movimiento y generador de splines** | ❌ | **✅ Pro** | Visualiza curvas spline para KSS 8.3+ |
| **Acceso de fábrica 100% sin conexión** | ✅ | **✅ Pro** | Cero internet requerido en planta |

---

## 👑 Actualiza a Pro: precios y licencia instantánea

Ofrecemos licencias flexibles de grado industrial a través de nuestro comerciante verificado **Dodo Payments**. Todas las transacciones están cifradas y admiten tarjetas de crédito, Apple Pay, Google Pay y PayPal en más de 135 países con facturas de IVA/impuestos automáticas.

### 💳 Planes:

| Plan | Precio | Prueba / Descuento | Términos de licencia | Pago |
|:---|:---:|:---|:---|:---:|
| 🟢 **Community** | **$0** | 100% gratis para siempre | Uso personal y comercial | [Instalar gratis](https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension) |
| ⏱️ **Pro Mensual** | **$9.99** / mes | **Prueba gratuita de 14 días** ($0.00 hoy) | Las 50 herramientas Pro industriales • 5 activaciones | [Iniciar prueba de 14 días](https://checkout.dodopayments.com/buy/pdt_0NmAUzwdbzeERSktsOLTp) |
| 👑 **Pro Anual** | **$79.00** / año | **Ahorra un 35%** (~$6.58/mes) | Las 50 herramientas Pro • 5 activaciones • Buffer offline de 30 días | [Obtener Pro anual](https://checkout.dodopayments.com/buy/pdt_0NmAV012KFHSjUMyDomJ6) |
| 🏆 **Pro Vitalicio** | **$699.00** | **Paga una vez, tuyo para siempre** | Las 50 herramientas Pro • 5 activaciones • Actualizaciones de por vida | [Obtener Pro vitalicio](https://checkout.dodopayments.com/buy/pdt_0NmAcoqVCfuwQ6Xx7qyqr) |
| 🏢 **Team Edition** | **$299.00** / año | B2B — Factura y presupuesto | Las 50 herramientas Pro • 5 activaciones | [Obtener Team Edition](https://checkout.dodopayments.com/buy/pdt_0NnLCdgD69GiXDLRJ0K5v) |
| 🏭 **Enterprise Site** | **$1,499.00** / año | Estaciones ilimitadas | Las 50 herramientas Pro • Activaciones ilimitadas • Informes con marca | [Obtener Enterprise](https://checkout.dodopayments.com/buy/pdt_0NnLCdkLwd0dECkpSE1JP) |

<div align="center" style="margin: 25px 0;">
  <a href="https://checkout.dodopayments.com/buy/pdt_0NmAV012KFHSjUMyDomJ6" style="text-decoration:none;">
    <kbd style="font-size: 1.25em; padding: 14px 32px; background-color: #FF6600; color: white; border-radius: 10px; font-weight: bold; border: 1px solid #d15500; cursor: pointer; box-shadow: 0 4px 18px rgba(255,102,0,0.4);">
      ⚡ Elige plan e inicia la prueba gratuita de 14 días (Dodo Checkout)
    </kbd>
  </a>
  <p style="margin-top: 10px; font-size: 0.9em; color: #888;">Activación instantánea en VS Code con 1 clic • Protección de período de gracia de 14 días • Buffer offline de 30 días</p>
</div>

---

## 🔒 Período de gracia de 14 días y garantía offline-first

Los ingenieros de puesta en marcha trabajan en plantas con muchas interferencias, salas limpias y celdas automotrices con **conectividad de red nula**.

* 📶 **Buffer offline de 30 días**: actívalo una vez y trabaja completamente sin conexión en planta hasta 30 días sin handshakes de red.
* 🛡️ **Período de gracia de 14 días**: si un método de pago internacional o la renovación de la tarjeta falla temporalmente mientras estás en obra, las funciones Pro **nunca te bloquearán a mitad de la puesta en marcha**. La extensión ofrece una ventana de gracia de 14 días con inteligentes reintentos automáticos en segundo plano.

---

## 🛡️ Certificación de seguridad empresarial

KUKA KRL Professional está certificado por **ReversingLabs Spectra Assure** con una **puntuación de salud de seguridad del 100%**:
* 🟢 **0 malware** (inspección binaria limpia)
* 🟢 **0 vulnerabilidades CVE** en todas las dependencias
* 🟢 **0 fugas de secretos/tokens**
* 🟢 **0 indicadores MITRE ATT&CK**

Auditoría de seguridad oficial: [https://secure.software/vscode/packages/liskinlabs/kuka-krl-extension](https://secure.software/vscode/packages/liskinlabs/kuka-krl-extension)

---

## ⌨️ Atajos de teclado

| Atajo | Acción | Ámbito |
|:---|:---|:---|
| `Shift + Alt + F` | Formatear documento (indentación KRL de 3 espacios y alineación de matrices) | Editor activo |
| `Ctrl + Alt + F` | Abrir el diagrama de flujo interactivo / grafo de flujo de control | Archivo `.src` |
| `Ctrl + Alt + D` | Ejecutar inspección de seguridad industrial y diagnóstico | Workspace |
| `Ctrl + Alt + B` | Abrir diff de copias SmartPAD e inspector de deltas de puntos | Proyecto activo |
| `Ctrl + Alt + K` | Iniciar KUKA Control Center y matemática de frames por 3 puntos | Editor activo |
| `Ctrl + Space` | Activar autocompletado inteligente KSS | Posición del cursor |

---

## ⚙️ Ajustes de configuración

Configura el comportamiento de la extensión en tu `settings.json`:

| Ajuste | Predeterminado | Descripción |
|:---|:---:|:---|
| `krl.indentWidth` | `3` | Tamaño de indentación (3 espacios es el estándar oficial de KUKA). |
| `krl.alignAssignments` | `true` | Alinea automáticamente los símbolos `=` en archivos `.dat` para matrices limpias. |
| `krl.errorLens.enabled` | `true` | Muestra errores de diagnóstico inline al final de las líneas. |
| `krl.validateNonAscii` | `true` | Busca caracteres cirílicos/no-ASCII que rompen los compiladores KSS antiguos. |
| `krl.inlayHints.enabled` | `true` | Muestra nombres descriptivos para las señales de E/S inline. |

---

## 🌐 Documentación y wiki

* 📖 **Documentación en inglés**: [https://liskinlabs.github.io/kuka-krl-extension/](https://liskinlabs.github.io/kuka-krl-extension/)
* 🇷🇺 **Русская документация и Вики**: [https://liskinlabs.github.io/kuka-krl-extension/ru/](https://liskinlabs.github.io/kuka-krl-extension/ru/)
* 🇹🇷 **Türkçe Dokümantasyon ve Wiki**: [https://liskinlabs.github.io/kuka-krl-extension/tr/](https://liskinlabs.github.io/kuka-krl-extension/tr/)

---

## 📄 Licencia y créditos

* **Editor y desarrollador**: [Liskin Labs](https://github.com/LiskinLabs) / [Silvestr Liskin](https://www.linkedin.com/in/silvestr-liskin-ab712920b/)
* **Auditor de seguridad**: [ReversingLabs Spectra Assure](https://secure.software/vscode/packages/liskinlabs/kuka-krl-extension)
* **Comerciante oficial**: [Dodo Payments](https://dodopayments.com/)
