<h1 align="center">KUKA Engineering Toolkit</h1>

<p align="center">
  <b>IngenierÃ­a industrial, diagnÃ³stico y anÃ¡lisis previo al despliegue para robots KUKA.</b><br />
  <i>Disponible como extensiÃ³n de VS Code.</i><br />
  Desarrollado para controladores <b>KRC2, KRC4 y KRC5 (KSS 5.x â€“ 8.7+)</b>.
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
  <a href="https://liskinlabs.github.io/kuka-krl-extension/"><b>Wiki interactiva y documentaciÃ³n</b></a> â€¢
  <a href="https://checkout.dodopayments.com/buy/pdt_0NmAUzwdbzeERSktsOLTp"><b>Pro Monthly ($19.99/mes)</b></a> â€¢ 
  <a href="https://checkout.dodopayments.com/buy/pdt_0NmAV012KFHSjUMyDomJ6"><b>Pro anual ($149.00/aÃ±o â€“ ahorra un 35%)</b></a> â€¢ 
  <a href="https://secure.software/vscode/packages/liskinlabs/kuka-krl-extension"><b>Informe de auditorÃ­a de seguridad</b></a>
</p>

---

## Antes de cargar en el robot (Before the robot)

> **Analice programas KUKA, copias de seguridad, registros, E/S, coordenadas y trayectorias antes de transferir cambios al controlador fÃ­sico.**

* **Evite paradas de producciÃ³n**: Detecte errores de programaciÃ³n, configuraciÃ³n y riesgos de colisiÃ³n antes del arranque de producciÃ³n.
* **Comprenda cada cambio**: Compare respaldos de SmartPAD e identifique exactamente quÃ© cambiÃ³ en los archivos `.src` y `.dat`.
* **Estandarice la ingenierÃ­a**: Audite proyectos KRL contra los estÃ¡ndares corporativos y normas de automociÃ³n (VASS 26).

---

## El problema de la parada de producciÃ³n de $10,000/hora

Todo ingeniero de puesta en marcha conoce este dolor:
1. **El ciclo lento**: editar archivos directamente en la consola SmartPAD o luchar contra los lentos despliegues de WorkVisual.
2. **El riesgo de colisiÃ³n oculto**: una Ãºnica asignaciÃ³n `$TOOL` o `$BASE` faltante, un desplazamiento de coordenadas sin verificar o un exceso accidental de `$VEL.CP` que provoca un choque mecÃ¡nico en la primera ejecuciÃ³n automÃ¡tica.
3. **Los cambios sin verificar**: los compaÃ±eros retocan puntos en la consola durante el turno de noche sin ningÃºn control de versiones.

**KUKA KRL Professional** transforma tu editor en un **centro de mando de robÃ³tica industrial** de alto rendimiento. Detecta errores de sintaxis, fallos cinemÃ¡ticos, bloques sin cerrar y desajustes de coordenadas **ANTES** de que el cÃ³digo toque el controlador fÃ­sico del robot.

> **La garantÃ­a de retorno de inversiÃ³n:** detectar un solo fallo de sintaxis o una colisiÃ³n mecÃ¡nica antes de ejecutar el cÃ³digo en planta paga una licencia Pro de por vida en los primeros 5 minutos.

---

## CaracterÃ­sticas profesionales clave

### 1. Diagrama de flujo interactivo y grafo de flujo de control
*Deja de rastrear lÃ³gica anidada a mano.* Convierte programas `.src` enormes y complejos en diagramas de flujo limpios, interactivos y clicables.
* **Salto al cÃ³digo bidireccional**: haz clic en cualquier bloque para saltar instantÃ¡neamente a la lÃ­nea exacta de cÃ³digo.
* **ExploraciÃ³n de subrutinas**: haz clic en las llamadas (p. ej. `PickPart()`, `WeldSeam()`) para cargar e inspeccionar sus diagramas.
* **SeÃ±ales y temporizadores**: insignias de estado codificadas por colores para seÃ±ales de E/S, flags y temporizadores.
* **Panel de seguridad integrado**: el anÃ¡lisis completo de Seguridad Industrial se ejecuta para el programa mostrado â€” riesgos de movimiento, actuadores y bloqueos con navegaciÃ³n a la lÃ­nea en un clic.
* **ExportaciÃ³n SVG vectorial**: diagramas vectoriales de alta resoluciÃ³n para entregas a clientes y documentaciÃ³n de automatizaciÃ³n.

<p align="center">
  <img src="docs/public/media/control_flow_graph.gif" width="720" alt="Interactive Flowchart Demo" />
</p>

---

### 2. Seguridad industrial y analizador de lÃ³gica profunda
*Elimina fallos de sintaxis, bloqueos y riesgos de colisiÃ³n mecÃ¡nica antes de tocar el controlador.*
* **Balance estricto de bloques**: marca bloques huÃ©rfanos `IF / ENDIF`, `FOR / ENDFOR` y `LOOP / ENDLOOP` antes de la compilaciÃ³n KRC.
* **ProtecciÃ³n Tool/Base**: advierte si los comandos de movimiento (`PTP`, `LIN`, `CIRC`) se ejecutan sin inicializaciÃ³n activa de `$TOOL` o `$BASE`.
* **Inspector de velocidad**: alerta cuando la velocidad cartesiana `$VEL.CP` supera los lÃ­mites seguros de puesta en marcha (> 2.0 m/s).
* **Bloqueador de deadlocks**: marca timeouts faltantes en condiciones `WAIT FOR` y bucles infinitos sin `EXIT`.
* **Bloqueador de cirÃ­lico y no-ASCII**: detecta caracteres no-ASCII accidentales que rompen silenciosamente los compiladores KSS antiguos.

<p align="center">
  <img src="docs/public/media/type-validation-demo.gif" width="720" alt="Safety and Diagnostics Demo" />
</p>

---

### 3. Diff de copias ZIP de SmartPAD y matemÃ¡tica de deltas de puntos
*Inspecciona y compara el cÃ³digo del proyecto en vivo con las copias de seguridad `.zip` del SmartPAD.*
* **MatemÃ¡tica de deltas**: calcula desplazamientos espaciales exactos de 6 ejes (**Î”X, Î”Y, Î”Z, Î”A, Î”B, Î”C**) para puntos `E6POS`, `POS` y `E6AXIS`.
* **AuditorÃ­a sin contacto**: detecta al instante retoques de puntos sin verificar hechos en planta antes de que causen colisiones.
* **Diff visual lado a lado**: visor de diferencias grÃ¡fico con cÃ³digo de colores integrado en VS Code.

<p align="center">
  <img src="docs/public/media/krc_backup_diff.gif" width="720" alt="SmartPAD Backup Diff Demo" />
</p>

---

### 4. Control de versiones KRL potenciado con GitLens
*Rastrea cada ediciÃ³n de coordenadas y modificaciÃ³n del programa con precisiÃ³n.*
* **Anotaciones blame por lÃ­nea**: autor, marca de tiempo y detalles del commit en la barra de estado para cualquier lÃ­nea KRL.
* **Inspector de commits**: haz clic en el blame de la barra de estado para inspeccionar diffs completos, metadatos y revisiones histÃ³ricas.
* **Historial de archivos visual (`krl.viewFileHistory`)**: compara el cÃ³digo actual del workspace con cualquier commit Git histÃ³rico en un diff lado a lado.

---

### 5. MatemÃ¡tica de frames de Euler por 3 puntos y KUKA Control Center
*Calculadora de transformaciÃ³n de sistemas de coordenadas integrada directamente en el editor.*
* **MÃ©todo de 3 puntos**: calcula los orÃ­genes de `BASE_DATA` y `TOOL_DATA` y los Ã¡ngulos de Euler (A, B, C) a partir de puntos de calibraciÃ³n medidos.
* **InserciÃ³n directa en `.dat`**: inserta los frames de coordenadas calculados en los archivos de datos con un clic.
* **Cero errores de trigonometrÃ­a**: elimina hojas de cÃ¡lculo y matemÃ¡ticas manuales de orientaciÃ³n en planta.

<p align="center">
  <img src="docs/public/media/kuka_control_center.gif" width="720" alt="KUKA Control Center Demo" />
</p>

---

### 6. Sugerencias inline de seÃ±ales y mapeo de comentarios PLC
*Comprende la lÃ³gica de E/S de un vistazo sin hojear los esquemas elÃ©ctricos.*
* Lee las definiciones de seÃ±ales directamente de `$config.dat` y `kuka_signals.json`.
* Muestra etiquetas legibles junto a `$IN[x]`, `$OUT[y]`, `$ANIN[z]` y `$FLAG[k]`.

<p align="center">
  <img src="docs/public/media/inlay_hints.gif" width="720" alt="Signal Inlay Hints Demo" />
</p>

---

### 7. Formateador de cÃ³digo automÃ¡tico y alineaciÃ³n de matrices
*Convierte cÃ³digo manuscrito desordenado en cÃ³digo industrial limpio y estandarizado con una tecla (`Shift+Alt+F`).*
* IndentaciÃ³n estÃ¡ndar KUKA de 3 espacios.
* Alinea los operadores `=` en archivos `.dat` para matrices de coordenadas legibles.
* NormalizaciÃ³n de mayÃºsculas/minÃºsculas de palabras clave KRL (`DEF`, `GLOBAL`, `INTERRUPT`, `CONTINUE`).

<p align="center">
  <img src="docs/public/media/code_formatter.gif" width="720" alt="Code Formatter Demo" />
</p>

---

### 8. Base de especificaciones KRL y mÃ¡s de 957 variables de sistema
*Especificaciones desarrolladas de forma independiente conformes con los estÃ¡ndares del lenguaje KRL y la documentaciÃ³n oficial de KSS e iiQWorks.*
* **957 variables de sistema**: cobertura exhaustiva de las variables de KSS 8.3â€“8.7/9.0 (`$ACC`, `$TOOL`, `$BASE`, `$POS_ACT`, `$VEL_AXIS`, etc.) con unidades fÃ­sicas, lÃ­mites de arrays (217 arrays) y estados de solo lectura.
* **116 funciones de sistema integradas y Wonderlib**: soporte completo en runtime para cinemÃ¡tica (`FORWARD`, `INVERSE`, `INV_POS`, `TOOL_ADJ`), manipulaciÃ³n de cadenas, conversiÃ³n de tipos, diÃ¡logos de mensajes, lÃ­mites de par y rutinas Wonderlib con `signatureHelp` en tiempo real.
* **111 estructuras y 112 ENUM (443 literales)**: autocompletado inteligente con punto (`$TOOL.`, `$ACC.`, `POINT.`) y autocompletado de literales enum `#` (`#AUT`, `#T1`, `#P_FREE`, `#QUIT`).
* **23 snippets estÃ¡ndar de formularios inline KRL (34 plantillas)**: plantillas estÃ¡ndar KRL (`ptpi`, `slini`, `sptpi`, `scirc`, `PTPCo`, `ptprel`, `trigdist`, `sigin`, `wsec`, `Forr`) con cabeceras completas (`;FOLD ... ;%{PE}`).
* **Matriz de 451 palabras clave de KRL**: cobertura completa de las reglas sintÃ¡cticas estÃ¡ndar de KRL â€” cero falsos positivos de sintaxis.
* **Sintaxis hex/binaria con comillas simples**: pleno cumplimiento del parser y diagnÃ³stico para `'B000001'` (binario), `'HFF'` (hexadecimal) y literales de carÃ¡cter.
* **AuditorÃ­a de flota con cero falsos positivos (4.1M+ lÃ­neas)**: verificada contra 107 copias de seguridad reales de robots en producciÃ³n con 0 diagnÃ³sticos falsos.

<p align="center">
  <img src="docs/public/media/smart_autocomplete.gif" width="720" alt="Smart Autocomplete Demo" />
</p>

---

### 9. Ir a la definiciÃ³n y encontrar todas las referencias
*IndexaciÃ³n instantÃ¡nea a nivel AST en toda la carpeta del proyecto.* Salta desde cualquier llamada de funciÃ³n o variable directamente a su declaraciÃ³n entre archivos `.src` y `.dat` separados.

<p align="center">
  <img src="docs/public/media/goto_definition.gif" width="720" alt="Go to Definition Demo" />
</p>

---

### 10. DocumentaciÃ³n hover completa y estado de lectura/escritura
*Explicaciones de parÃ¡metros y advertencias de seguridad instantÃ¡neas.* Pasa el cursor sobre cualquier variable de sistema KSS para ver sus unidades fÃ­sicas, permisos de lectura/escritura y descripciones de los manuales KSS.

<p align="center">
  <img src="docs/public/media/hover_info.gif" width="720" alt="Hover Info Demo" />
</p>

---

### 11. Limpieza de metadatos Git y eliminador de cabeceras de servicio
*MantÃ©n limpio el control de versiones.* Elimina directivas de servicio (`&ACCESS`, `&REL`, `&PARAM`, `&COMMENT`) con un clic para evitar diffs Git ruidosos en commits automatizados.

<p align="center">
  <img src="docs/public/media/git_metadata_cleaner.gif" width="720" alt="Git Metadata Cleaner Demo" />
</p>

---

### 12. KRL moderno y suite FOLD iiQKA
*Actualiza tu cÃ³digo a los estÃ¡ndares KUKA modernos con 1 clic.*
* **Convertir selecciÃ³n a FOLD iiQKA (`krl.wrapIiQkaFold`)**: envuelve tu lÃ³gica personalizada en bloques plegables estÃ¡ndar iiQKA.
* **Convertir a bloque Spline (`krl.wrapSplineBlock`)**: envuelve movimientos lineales y circulares en bloques `SPLINE` / `ENDSPLINE` de alto rendimiento para KSS 8.3â€“8.7.
* **Inyector de protecciÃ³n contra colisiones (`krl.insertCollisionGuard`)**: inyecta automÃ¡ticamente frames de monitoreo de par `$TORQMON` alrededor de zonas de movimiento crÃ­ticas.
* **Limpiar y desenvolver FOLDs (`krl.cleanUnwrapFolds`)**: desenvuelve con seguridad formularios inline obsoletos preservando las instrucciones de movimiento internas.

---

### 13. Gateway de soporte en vivo y telepresencia remota
*Chat de soporte bidireccional directo con los desarrolladores dentro de VS Code.*
* **Panel de chat interactivo**: sincronizaciÃ³n instantÃ¡nea de hilos del foro con el soporte tÃ©cnico.
* **Smart Diff & Apply**: revisiÃ³n con un clic y aplicaciÃ³n automÃ¡tica de las correcciones de cÃ³digo sugeridas por el soporte tÃ©cnico.
* **Telepresencia remota y diagnÃ³stico**: comandos de telemetrÃ­a seguros opcionales (`/ai_diag`, `/logs`, `/sysinfo`, `/ping`) para asistencia rÃ¡pida en puesta en marcha.

---

### 14. Barra rÃ¡pida de FOLD y ordenaciÃ³n de declaraciones
*Gestiona programas enormes con facilidad.* Plegado con un clic de bloques FOLD, subprogramas y ordenaciÃ³n automÃ¡tica de declaraciones de variables.

<p align="center">
  <img src="docs/public/media/quick_fold_toolbar.gif" width="720" alt="Quick Fold Toolbar Demo" />
</p>

---

### 15. AnÃ¡lisis de cÃ³digo muerto y funciones globales sin uso
*Previene el crecimiento descontrolado del cÃ³digo y las rutinas de prueba sobrantes.* Identifica subrutinas no llamadas, variables sin usar y ramas de cÃ³digo inalcanzables en todo el workspace.

<p align="center">
  <img src="docs/public/media/dead-code-demo.gif" width="720" alt="Dead Code Analysis Demo" />
</p>

---

### 16. Paleta de sintaxis de alto contraste y biblioteca del sistema KSS
*Paleta de colores rica y contexto de sistema estÃ¡ndar para desarrollo KRL profesional.*
* **Paleta diversa de alto contraste**: esquemas de color de estilo industrial (KRL Dark y Light). Ãmbitos diferenciados para comandos de movimiento (negrita), operadores bit a bit/lÃ³gicos, sÃ­mbolos matemÃ¡ticos, directivas de sistema (`&ACCESS`, `&REL`) y nÃºmeros hexadecimales/binarios (`'H...'`, `'B...'`).
* **Biblioteca estÃ¡ndar del sistema KSS 8.7**: definiciones integradas, ayuda de parÃ¡metros y `F12` (Ir a la definiciÃ³n) para `BAS()`, `MsgNotify()`, `MsgQuit()`, `MsgDialog()`, `USE_CM_PRO_VALUES()`, `TOOL_NAME[]` y `BASE_NAME[]` â€” directamente a los mÃ³dulos de referencia oficiales de KSS 8.7.
* **Andamiaje de proyecto KRC en 1 clic (`krl.scaffoldKrcFiles`)**: crea automÃ¡ticamente el Ã¡rbol estÃ¡ndar `KRC/R1/System/`, `KRC/R1/Program/` y `KRC/R1/TP/` poblado con `$config.dat`, `bas.src`, `MsgLib.src`, `collmonlib.src` y `sps.sub`.
* **Valores de fÃ¡brica y limitador Advance Run**: visualizaciÃ³n hover instantÃ¡nea de los valores oficiales de fÃ¡brica (`operate.defaultvalues`) para `$ADVANCE = 3`, `$VEL.CP = 2.0 m/s`, `$ACC.CP = 2.3 m/sÂ²`, `$JERK.CP = 500.0 m/sÂ³` y advertencias lint automÃ¡ticas cuando `$ADVANCE` supera el rango vÃ¡lido `0..5`.

---

## Matriz de comparaciÃ³n de caracterÃ­sticas

| CaracterÃ­stica | Community (gratis) | Pro Industrial | Beneficio para ingenieros |
|:---|:---:|:---:|:---|
| **Resaltado de sintaxis KRL** (`.src`, `.dat`, `.sub`, `.kfd`) | SÃ­ | SÃ­ | ColoraciÃ³n AST completa con paleta KRL |
| **Temas KRL (Dark y Light)** | SÃ­ | SÃ­ | Esquemas de color industriales de alto contraste |
| **Autocompletado inteligente y especificaciones del sistema** (957+ variables, 116 funciones, 111 estructuras) | SÃ­ | SÃ­ | Autocompletado completo de variables del sistema KSS y ayuda de firmas |
| **Biblioteca estÃ¡ndar del sistema KSS 8.7 y definiciÃ³n F12** | SÃ­ | SÃ­ | Salto F12 instantÃ¡neo a `bas.src`, `MsgLib.src`, `$config.dat` |
| **Andamiaje de proyecto KRC en 1 clic** | SÃ­ | SÃ­ | Inicializa la estructura estÃ¡ndar `KRC/R1/System` |
| **Hover de valores de fÃ¡brica y limitador $ADVANCE** | SÃ­ | SÃ­ | Muestra valores de fÃ¡brica y advierte si `$ADVANCE > 5` |
| **23 snippets estÃ¡ndar de formularios inline** (34 plantillas de movimiento y lÃ³gica) | SÃ­ | SÃ­ | Plantillas completas `;FOLD ... ;%{PE}` |
| **Sugerencias inline de seÃ±ales y documentaciÃ³n hover** | SÃ­ | SÃ­ | Etiquetas de seÃ±ales PLC inline y firmas de parÃ¡metros |
| **Formateador de cÃ³digo y alineaciÃ³n de matrices** | SÃ­ | SÃ­ | Limpieza instantÃ¡nea con 1 clic (`Shift+Alt+F`) |
| **Blame por lÃ­nea GitLens e historial de revisiones** | SÃ­ | SÃ­ | Seguimiento instantÃ¡neo de autor y commit para cada punto |
| **Arquitectura en seis idiomas** (EN, DE, IT, ES, RU, TR) | SÃ­ | SÃ­ | UI nativa completa, 515 claves de UI y 1.073 traducciones de documentaciÃ³n de variables del sistema |
| **Limpieza de metadatos Git** | SÃ­ | SÃ­ | Elimina cabeceras de servicio (`&ACCESS`, `&REL`) para diffs Git limpios |
| **Control Center y guÃ­a de referencia de 21 tarjetas** | SÃ­ | SÃ­ | Conmutadores de diagnÃ³stico en tiempo real y guÃ­a de atajos en el editor |
| **Ãrbol lateral completo de 36 comandos** | SÃ­ | SÃ­ | Cada comando de la extensiÃ³n accesible con 1 clic |
| **ExportaciÃ³n ZIP nativa del proyecto y telepresencia remota** | SÃ­ | SÃ­ | Copia completa con 1 clic al explorador o a Telegram |
| **IntegraciÃ³n Copilot AI Language Model Tools (`krl_safety_check`)** | â€” | **Pro** | VerificaciÃ³n de seguridad invocable directamente por la IA de VS Code |
| **FacturaciÃ³n B2B y presupuestos (`krl.requestCorporateInvoice`)** | SÃ­ | SÃ­ | Solicitud de presupuestos y facturas B2B con NIF-IVA / Reverse Charge directamente en el editor |
| **ComprobaciÃ³n bÃ¡sica de sintaxis y diagnÃ³stico** | SÃ­ (Bonus) | SÃ­ | ValidaciÃ³n de sintaxis KRL y detecciÃ³n bÃ¡sica de errores |
| **Compatibilidad con KSS 9.x / iiQWorks 9.+ y KSS 8.3â€“8.7** | SÃ­ | SÃ­ | Compatibilidad completa con KSS 9.x, iiQWorks y controladores KRC2â€“KRC5 |
| **Informe de aceptaciÃ³n de calidad de copias SmartPAD** | â€” | **Pro** | AuditorÃ­a automÃ¡tica del proyecto con pasaporte del robot e hipervÃ­nculos clicables |
| **KRL moderno y suite FOLD iiQKA** | â€” | **Pro** | FOLDs iiQKA, bloques Spline y protecciÃ³n contra colisiones |
| **Visor de diagrama de flujo interactivo** (Mermaid SVG) | â€” | **Pro** | LÃ³gica visual del flujo de control y salto al cÃ³digo bidireccional |
| **DiagnÃ³stico estricto de balance de bloques** | â€” | **Pro** | Captura bloques `IF/LOOP/FOR` sin cerrar |
| **Inspector de velocidad y seguridad** ($VEL.CP) | â€” | **Pro** | Previene peligrosos excesos de velocidad cartesiana |
| **ProtecciÃ³n Tool / Base** | â€” | **Pro** | Marca el movimiento antes de la inicializaciÃ³n de frames |
| **Diff de copias ZIP SmartPAD y delta de puntos** | â€” | **Pro** | Calcula deltas exactos de coordenadas (Î”X, Î”Y, Î”Z) |
| **Calculadora de frames de Euler por 3 puntos** | â€” | **Pro** | Calcula `BASE_DATA`/`TOOL_DATA` en el editor |
| **Suite XML EthernetKRL (EKI)** | â€” | **Pro** | Generador y validador de plantillas XML en vivo |
| **Gateway de soporte en vivo y telepresencia remota** | â€” | **Pro** | Chat directo de soporte bidireccional, Diff & Apply |
| **Comprobador de cÃ³digo muerto y alcance** | â€” | **Pro** | Encuentra variables sin usar y subrutinas muertas |
| **Diagramas de movimiento y generador de splines** | â€” | **Pro** | Visualiza curvas spline para KSS 8.3+ |
| **Acceso de fÃ¡brica 100% sin conexiÃ³n** | SÃ­ | **Pro** | Cero internet requerido en planta |

---

## Actualiza a Pro: precios y licencia instantÃ¡nea

Ofrecemos licencias flexibles de grado industrial a travÃ©s de nuestro comerciante verificado **Dodo Payments**. Todas las transacciones estÃ¡n cifradas y admiten tarjetas de crÃ©dito, Apple Pay, Google Pay y PayPal en mÃ¡s de 135 paÃ­ses con facturas de IVA/impuestos automÃ¡ticas.

### Planes:

| Plan | Precio | Descuento / FacturaciÃ³n | TÃ©rminos de licencia | Pago |
|:---|:---:|:---|:---|:---:|
| **Community** | **$0** | 100% gratis para siempre | Uso personal y comercial | [Instalar gratis](https://marketplace.visualstudio.com/items?itemName=LiskinLabs.kuka-krl-extension) |
| **Pro Mensual** | **$19.99** / mes | FacturaciÃ³n mensual | Todas las herramientas Pro â€¢ 1 PC â€¢ Soporte KRC2â€“KRC5 | [Obtener Pro Monthly](https://checkout.dodopayments.com/buy/pdt_0NmAUzwdbzeERSktsOLTp) |
| **Pro Anual** | **$149.00** / aÃ±o | **Ahorra un 35%** (~$6.58/mes) | Todas las herramientas Pro â€¢ 1 PC â€¢ Buffer offline de 30 dÃ­as â€¢ KRC2â€“KRC5 | [Obtener Pro anual](https://checkout.dodopayments.com/buy/pdt_0NmAV012KFHSjUMyDomJ6) |
| **Pro Vitalicio** | **$699.00** | **Paga una vez, tuyo para siempre** | Todas las herramientas Pro â€¢ 1 PC (1 estaciÃ³n de trabajo) â€¢ Actualizaciones de por vida | [Obtener Pro vitalicio](https://checkout.dodopayments.com/buy/pdt_0NmAcoqVCfuwQ6Xx7qyqr) |

<div align="center" style="margin: 25px 0;">
  <a href="https://checkout.dodopayments.com/buy/pdt_0NmAV012KFHSjUMyDomJ6" style="text-decoration:none;">
    <kbd style="font-size: 1.25em; padding: 14px 32px; background-color: #FF6600; color: white; border-radius: 10px; font-weight: bold; border: 1px solid #d15500; cursor: pointer; box-shadow: 0 4px 18px rgba(255,102,0,0.4);">
      Elige plan y suscrÃ­bete (Dodo Checkout)
    </kbd>
  </a>
  <p style="margin-top: 10px; font-size: 0.9em; color: #888;">ActivaciÃ³n instantÃ¡nea en VS Code con 1 clic â€¢ ProtecciÃ³n de perÃ­odo de gracia de 14 dÃ­as â€¢ Buffer offline de 30 dÃ­as</p>
</div>

---

## PerÃ­odo de gracia de 14 dÃ­as y garantÃ­a offline-first

Los ingenieros de puesta en marcha trabajan en plantas con muchas interferencias, salas limpias y celdas automotrices con **conectividad de red nula**.

* **Buffer offline de 30 dÃ­as**: actÃ­valo una vez y trabaja completamente sin conexiÃ³n en planta hasta 30 dÃ­as sin handshakes de red.
* **PerÃ­odo de gracia de 14 dÃ­as**: si un mÃ©todo de pago internacional o la renovaciÃ³n de la tarjeta falla temporalmente mientras estÃ¡s en obra, las funciones Pro **nunca te bloquearÃ¡n a mitad de la puesta en marcha**. La extensiÃ³n ofrece una ventana de gracia de 14 dÃ­as con inteligentes reintentos automÃ¡ticos en segundo plano.

---

## CertificaciÃ³n de seguridad empresarial

KUKA KRL Professional estÃ¡ certificado por **ReversingLabs Spectra Assure** con una **puntuaciÃ³n de salud de seguridad del 100%**:
* **0 malware** (inspecciÃ³n binaria limpia)
* **0 vulnerabilidades CVE** en todas las dependencias
* **0 fugas de secretos/tokens**
* **0 indicadores MITRE ATT&CK**

AuditorÃ­a de seguridad oficial: [https://secure.software/vscode/packages/liskinlabs/kuka-krl-extension](https://secure.software/vscode/packages/liskinlabs/kuka-krl-extension)

---

## Atajos de teclado

| Atajo | AcciÃ³n | Ãmbito |
|:---|:---|:---|
| `Shift + Alt + F` | Formatear documento (indentaciÃ³n KRL de 3 espacios y alineaciÃ³n de matrices) | Editor activo |
| `Ctrl + Alt + F` | Abrir el diagrama de flujo interactivo / grafo de flujo de control | Archivo `.src` |
| `Ctrl + Alt + D` | Ejecutar inspecciÃ³n de seguridad industrial y diagnÃ³stico | Workspace |
| `Ctrl + Alt + B` | Abrir diff de copias SmartPAD e inspector de deltas de puntos | Proyecto activo |
| `Ctrl + Alt + K` | Iniciar KUKA Control Center y matemÃ¡tica de frames por 3 puntos | Editor activo |
| `Ctrl + Space` | Activar autocompletado inteligente KSS | PosiciÃ³n del cursor |

---

## Ajustes de configuraciÃ³n

Configura el comportamiento de la extensiÃ³n en tu `settings.json`:

| Ajuste | Predeterminado | DescripciÃ³n |
|:---|:---:|:---|
| `krl.indentWidth` | `3` | TamaÃ±o de indentaciÃ³n (3 espacios es el estÃ¡ndar oficial de KUKA). |
| `krl.alignAssignments` | `true` | Alinea automÃ¡ticamente los sÃ­mbolos `=` en archivos `.dat` para matrices limpias. |
| `krl.errorLens.enabled` | `true` | Muestra errores de diagnÃ³stico inline al final de las lÃ­neas. |
| `krl.validateNonAscii` | `true` | Busca caracteres cirÃ­licos/no-ASCII que rompen los compiladores KSS antiguos. |
| `krl.inlayHints.enabled` | `true` | Muestra nombres descriptivos para las seÃ±ales de E/S inline. |

---

## DocumentaciÃ³n y wiki

* **DocumentaciÃ³n en inglÃ©s**: [https://liskinlabs.github.io/kuka-krl-extension/](https://liskinlabs.github.io/kuka-krl-extension/)
* **Ğ ÑƒÑÑĞºĞ°Ñ Ğ´Ğ¾ĞºÑƒĞ¼ĞµĞ½Ñ‚Ğ°Ñ†Ğ¸Ñ Ğ¸ Ğ’Ğ¸ĞºĞ¸**: [https://liskinlabs.github.io/kuka-krl-extension/ru/](https://liskinlabs.github.io/kuka-krl-extension/ru/)
* **TÃ¼rkÃ§e DokÃ¼mantasyon ve Wiki**: [https://liskinlabs.github.io/kuka-krl-extension/tr/](https://liskinlabs.github.io/kuka-krl-extension/tr/)

---

## Licencia y crÃ©ditos

* **Editor y desarrollador**: [Liskin Labs](https://github.com/LiskinLabs) / [Silvestr Liskin](https://www.linkedin.com/in/silvestr-liskin-ab712920b/)
* **Auditor de seguridad**: [ReversingLabs Spectra Assure](https://secure.software/vscode/packages/liskinlabs/kuka-krl-extension)
* **Comerciante oficial**: [Dodo Payments](https://dodopayments.com/)
* **Licencia**: EULA Comercial ([LICENSE](LICENSE))

---

## Aviso legal, marcas registradas y seguridad industrial

### Cumplimiento de seguridad industrial (ISO 10218-1/-2 y ISO 13849-1)
**KUKA KRL Professional** es una suite independiente de desarrollo, anÃ¡lisis estÃ¡tico y comparaciÃ³n de copias de seguridad desarrollada por **Liskin Labs**. **NO es software certificado para seguridad (Non-SIL / Non-PL)** y **no reemplaza** los procedimientos obligatorios de puesta en servicio fÃ­sico, la verificaciÃ³n de velocidad reducida (`$OV_PRO <= 30%` en modo T1 en el SmartPAD fÃ­sico) ni las evaluaciones de riesgo formales segÃºn **ISO 10218-1/-2** e **ISO 13849-1**. Realice siempre pruebas manuales en modo T1 antes del ciclo automÃ¡tico.

### Marcas comerciales y descargo de responsabilidad
* **KUKAÂ®, KRLÂ®, KRCÂ®, WorkVisualÂ®, iiQWorksÂ® y SmartPADÂ®** son marcas registradas de **KUKA AG** / **KUKA Deutschland GmbH**.
* **Visual Studio CodeÂ® y VS CodeÂ®** son marcas registradas de **Microsoft Corporation**.
* Esta extensiÃ³n de software es un desarrollo independiente de **Liskin Labs** y **no** estÃ¡ afiliada, patrocinada, respaldada ni certificada por KUKA AG ni Microsoft Corporation. Todos los nombres de productos y marcas comerciales pertenecen a sus respectivos propietarios y se utilizan Ãºnicamente con fines de compatibilidad e identificaciÃ³n (nominative fair use).
