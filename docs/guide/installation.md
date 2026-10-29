# Installation & Setup Guide

Quick start guide for installing, configuring, and offline-activating KUKA KRL Professional.

---

## 1. Install via VS Code Marketplace
1. Open VS Code.
2. Go to the Extensions view (`Ctrl + Shift + X`).
3. Search for `KUKA KRL Professional` (Liskin Labs).
4. Click **Install**.

---

## 2. Install from VSIX (Air-Gapped Offline Installation)
1. Download the latest `kuka-krl-extension-1.9.8.vsix` package from the official release repository.
2. In VS Code, open the Extensions panel (`Ctrl + Shift + X`) and click the `...` menu in the top-right corner.
3. Select **Install from VSIX...** and select the `.vsix` file.
4. No editor restart required — all grammar parsers and diagnostic language servers activate immediately.

---

## 3. Selecting a KUKA Theme
1. Press `Ctrl + K`, then `Ctrl + T`.
2. Select one of the 6 signature engineering themes:
   * **Industrial Dark** (high-contrast theme optimized for factory lighting)
   * **WorkVisual Dark** (matches KUKA WorkVisual interface palette)
   * **WorkVisual Light** (clean daytime WorkVisual light palette)
   * **Midnight OLED** (deep black palette for maximum OLED power saving)
   * **Blueprint** (technical CAD schematic styling)
   * **Industrial Light** (classic high-readability daylight theme)

---

## 4. Online Pro License Activation
1. Open the **KUKA Control Center** by clicking the KUKA icon in the Activity Bar or executing `KRL: Open Control Center` (`Ctrl + Shift + P`).
2. In the license header card, click **Enter License Key**.
3. Paste your license key from Dodo Payments and confirm. The extension validates with the licensing gateway and enables PRO mode instantly.

---

## 5. Air-Gapped Factory Offline Activation (.lic File Exchange)

For security-restricted automotive production plants and air-gapped OT networks without internet connectivity, the extension supports deterministic Ed25519 asymmetric cryptographic license exchange using `.lic` files:

### Step 1: Export Hardware ID Request File (.lic)
1. On your air-gapped engineering laptop, open **KUKA Control Center** -> **Settings & Account** tab.
2. Under the **Air-Gapped Offline Activation** section, click **[Export Hardware ID Request (.lic)]** or execute `krl.exportHardwareIdFile` via the Command Palette (`Ctrl + Shift + P`).
3. Save the generated `liskin-hardware-id.lic` file onto a secure USB drive or approved portable media.

### Step 2: Generate Signed License on the Web Gateway
1. Connect the USB drive to an internet-connected workstation.
2. Navigate to the secure Liskin Labs activation gateway:  
   👉 **[Air-Gap Offline Licensing Portal](https://kuka-krl-support-gateway.redminotpro5.workers.dev/airgap)**
3. Drag and drop your `liskin-hardware-id.lic` file into the upload zone — the hardware fingerprint is verified and filled in automatically.
4. Enter your License Key and click **Generate Offline License**.
5. Download the cryptographically signed `liskin-krl-license.lic` file to your USB drive.

### Step 3: Import License File into VS Code
1. Return to your air-gapped factory workstation.
2. In KUKA Control Center, click **[Load Offline License File (.lic)]** or execute `krl.importOfflineLicenseFile`.
3. Select your `liskin-krl-license.lic` file.
4. The extension validates the Ed25519 signature instantly offline (zero network polling) and permanently unlocks all 50+ PRO engineering features.

---

## 6. Licensing Plans & Architecture

| Tier | Price | Workstation Activations | Key Differentiator |
| :--- | :--- | :--- | :--- |
| **Engineer Pro (Monthly)** | $19 / mo | 1 Workstation | KRC2/KRC4/KRC5 support, short commissioning sprints, 30-day offline cache |
| **Engineer Pro (Annual)** | $149 / yr | 1 Workstation | Save 35%, 1-Year Air-Gapped offline certificate, 50 industrial tools |
| **Engineer Pro (Lifetime)** | $699 once | 1 Workstation | Perpetual license, zero subscriptions, permanent Air-Gapped certificate |
| **Team Edition** | $499 / yr | Up to 5 Workstations | Centralized B2B invoicing, 5 plant/office devices, KRC2–KRC5 |
| **Department / Integrator** | $1,499 / yr | Up to 20 Workstations | Up to 20 workstations, unlimited integration projects, dedicated engineering support |
| **Enterprise Plant Site** | $4,999 / yr | Up to 100 Workstations | 100 plant workstations, Priority Support Gateway, offline Air-Gap license, comprehensive robotics toolset |

### Why Pro Lifetime ($699) vs Enterprise Site ($4,999/yr)?
- **Pro Lifetime ($699 once)** provides a perpetual standalone license for **1 workstation** with zero recurring subscription fees and lifetime updates. Includes personalized cryptographic Air-Gapped certificate generation for isolated OT factory networks.
- **Enterprise Site ($4,999/yr)** provides **up to 100 workstation activations** for the entire manufacturing plant or robotics system integrator. It covers all plant computers, engineering laptops, and diagnostic stations. It includes priority direct developer assistance via Telegram Support Gateway, centralized automated KUKA Fleet Backup Hub, custom linting rules, comprehensive robotics linting, and dedicated support gateway.
