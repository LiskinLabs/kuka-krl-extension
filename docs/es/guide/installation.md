# Guía de Instalación y Configuración

Guía de inicio rápido para instalar, configurar y activar sin conexión KUKA KRL Professional.

---

## 1. Instalación desde VS Code Marketplace
1. Abra VS Code.
2. Vaya a la vista de Extensiones (`Ctrl + Shift + X`).
3. Busque `KUKA KRL Professional` (Liskin Labs).
4. Haga clic en **Install**.

---

## 2. Instalación desde archivo VSIX (Instalación Offline Air-Gapped)
1. Descargue el paquete más reciente `kuka-krl-extension-1.9.8.vsix` del repositorio oficial.
2. En el panel de Extensiones de VS Code (`Ctrl + Shift + X`), haga clic en el menú `...` en la esquina superior derecha.
3. Seleccione **Install from VSIX...** y elija el archivo `.vsix`.
4. No requiere reiniciar el editor: todos los servicios de lenguaje se activan inmediatamente.

---

## 3. Selección de un tema KUKA
1. Presione `Ctrl + K`, luego `Ctrl + T`.
2. Seleccione uno de los 6 temas de ingeniería:
   * **Industrial Dark** (alto contraste para plantas industriales)
   * **WorkVisual Dark** (paleta KUKA WorkVisual)
   * **WorkVisual Light** (diseño diurno de WorkVisual)
   * **Midnight OLED** (negro puro para ahorro de energía OLED)
   * **Blueprint** (estilo esquemático CAD)
   * **Industrial Light** (tema claro clásico)

---

## 4. Activación de Licencia Pro en Línea
1. Abra el **KUKA Control Center** haciendo clic en el icono de KUKA en la barra de actividades o ejecutando `KRL: Open Control Center` (`Ctrl + Shift + P`).
2. En la tarjeta principal, haga clic en **Enter License Key**.
3. Ingrese su clave de licencia y confirme la activación.

---

## 5. Activación sin conexión en plantas industriales (Air-Gap .lic)

Para plantas automotrices y redes industriales aisladas sin conexión a Internet, se admite el intercambio asimétrico seguro de archivos `.lic` (criptografía Ed25519):

### Paso 1: Exportar solicitud de Hardware ID (.lic)
1. En la computadora aislada del taller, abra **KUKA Control Center** -> pestaña **Configuración y Cuenta** (`Settings & Account`).
2. En la sección **Air-Gapped Offline Activation**, haga clic en **[Exportar solicitud Hardware ID (.lic)]** o ejecute `krl.exportHardwareIdFile`.
3. Guarde el archivo `liskin-hardware-id.lic` en una unidad USB segura.

### Paso 2: Generar licencia en el portal web
1. Conecte la unidad USB a una computadora con acceso a Internet.
2. Acceda al portal seguro de activación de Liskin Labs:  
   👉 **[Portal de Licencias Air-Gap](https://kuka-krl-support-gateway.redminotpro5.workers.dev/airgap)**
3. Arrastre su archivo `liskin-hardware-id.lic` a la zona de carga: la identificación del hardware se completará automáticamente.
4. Ingrese su clave de licencia y haga clic en **Generar licencia offline**.
5. Descargue el archivo firmado `liskin-krl-license.lic` en la memoria USB.

### Paso 3: Importar archivo de licencia en VS Code
1. Regrese a su estación de trabajo en la fábrica.
2. En KUKA Control Center, haga clic en **[Cargar archivo de licencia offline (.lic)]** o ejecute `krl.importOfflineLicenseFile`.
3. Seleccione el archivo `liskin-krl-license.lic`.
4. La firma Ed25519 se valida al instante sin conexión, desbloqueando permanentemente todas las funciones PRO.

---

## 6. Planes de Licencia y Precios

| Plan | Precio | Activaciones | Diferenciador Clave |
| :--- | :--- | :--- | :--- |
| **Engineer Pro (Mensual)** | $19 / mes | 1 estación | Soporte KRC2/KRC4/KRC5, proyectos de puesta en marcha |
| **Engineer Pro (Anual)** | $149 / año | 1 estación | Ahorro del 35%, certificado offline Air-Gap por 1 año, 50 herramientas |
| **Engineer Pro (Lifetime)** | $699 único | 1 estación | Licencia perpetua, actualizaciones de por vida, certificado Air-Gap permanente |
| **Team Edition** | $499 / año | Hasta 5 estaciones | Facturación B2B centralizada, 5 equipos de planta u oficina, KRC2–KRC5 |
| **Department / Integrator** | $999 / año | Hasta 20 estaciones | Hasta 20 estaciones de trabajo, proyectos de integración ilimitados |
| **Enterprise Plant Site** | $4,999 / año | Hasta 100 estaciones | 100 puestos de planta, SLA estricto de 4h, licencia Air-Gap, protocolos OEM |
