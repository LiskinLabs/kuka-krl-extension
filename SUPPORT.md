# Support, Billing & Offline Licensing Guide

**KRL Engineering Toolkit for VS Code** (`LiskinLabs.kuka-krl-extension`)  
*Maintained by Liskin Labs / Silvestr Liskin Engineering*

---

## 1. Engineering Support Channels

| Channel | When to Use | How to Open |
|---|---|---|
| **Direct Engineering Chat** | Fast help with KRL parsing, KRC4/KRC5 live connection, commissioning issues, or urgent license troubleshooting | In VS Code (`Ctrl+Shift+P`): `KRL: Direct Engineering Support` (`krl.openTelegramChat`) or [Open Support in VS Code](vscode://LiskinLabs.kuka-krl-extension/support) |
| **GitHub Issues** | Public bug reports, feature requests, sample `.src`/`.dat` parser edge cases, and release tracking | [LiskinLabs/kuka-krl-extension/issues](https://github.com/LiskinLabs/kuka-krl-extension/issues) |
| **Interactive Documentation** | Full guide for KSS 8.x/9.x, VASS 26 linter, live telemetry bridge, and EULA FAQ | [Liskin Labs Engineering Wiki](https://liskinlabs.github.io/kuka-krl-extension/) |

When reporting a parser or diagnostics bug, please include:
1. Extension version (`v1.9.17` or later) and VS Code / Cursor / Windsurf version.
2. Controller generation and KSS release (e.g., `KSS 8.6.2`, `KSS 8.7`, `VKRC4 VASS 26`, `iiQKA.OS 9.2/9.3`).
3. Minimal sanitized `.src` / `.dat` snippet (or anonymized archive excerpt — never attach confidential factory CAD/IP unless cleared).

---

## 2. 14-Day Free Trial, Upgrades & Billing (Dodo Payments MoR)

All paid plans are processed through **Dodo Payments** (Merchant of Record) with global tax/VAT handling, EU VIES Reverse Charge (`0%` VAT for valid EU VAT IDs), and automatic PDF tax invoices.

| Action | In VS Code (`Ctrl+Shift+P`) | Web / Direct Link |
|---|---|---|
| **Start 14-Day Free Pro Trial** (no card required) | `krl.startTrial` (`KRL Control Center` -> Trial) | [Open Control Center](vscode://LiskinLabs.kuka-krl-extension/control-center) |
| **View Pricing & Compare Plans** | `krl.openPricingPlans` | [Pricing & Checkout](https://liskinlabs.github.io/kuka-krl-extension/#pricing) |
| **Manage Subscription / Cancel / Receipts** | `krl.openCustomerPortal` | [Dodo Customer Portal](https://customer.dodopayments.com/login/bus_0NlrxPhrg9eHzPZKAgsF1) |
| **Download Latest PDF Invoice** | `krl.downloadLatestInvoice` / `krl.manageInvoices` | [Dodo Customer Portal](https://customer.dodopayments.com/login/bus_0NlrxPhrg9eHzPZKAgsF1) |
| **Generate Corporate Quote / Purchase Order** | `krl.requestCorporateInvoice` | Request via `krl.openTelegramChat` for Enterprise Plant (`USD 4,999` multi-site orders / bank transfer) |

### Launch Offer (`LAUNCH30`)
Use promo code **`LAUNCH30`** at Dodo Checkout for **30% off** your initial Pro subscription or first team/lifetime purchase. Direct checkout links from the README and website pre-apply `LAUNCH30` automatically.

---

## 3. License Activation & Air-Gapped Factory Cells

### Online Workstations
1. Copy your license key from the [Checkout Confirmation Page](https://kuka-krl-support-gateway.redminotpro5.workers.dev/activate) or Dodo Payments confirmation email.
2. Open VS Code -> `Ctrl+Shift+P` -> **`KRL: Activate License Key`** (`krl.activateLicense`) or click `Activate inside VS Code` on the confirmation page.
3. Need to move an activation to a new engineering laptop? Run **`KRL: Deactivate License on This Machine`** (`krl.deactivateLicense`) or manage activations in the [Customer Portal](https://customer.dodopayments.com/login/bus_0NlrxPhrg9eHzPZKAgsF1).

> **Shop-Floor Resilience:** Verified commercial licenses include a **30-day offline cache TTL** plus a **14-day billing grace period** so your diagnostics and editing tools never lock mid-commissioning when the cell loses internet access.

### Offline / Air-Gapped Commissioning Networks
For segmented plant LANs with zero outbound internet:
1. Run `Ctrl+Shift+P` -> **`KRL: Activate Offline Air-Gap License`** (`krl.activateOfflineLicense`) to generate your machine hardware request string.
2. On an internet-connected device or mobile phone, open the [Air-Gap Activation Portal](https://kuka-krl-support-gateway.redminotpro5.workers.dev/airgap) to exchange your license key + machine request for a cryptographically signed **Ed25519 `.lic` entitlement token**.
3. Transfer the `.lic` file via USB / shared jump host and run **`KRL: Import Offline License File`** (`krl.importOfflineLicenseFile`).

---

## 4. Refunds & Commercial Licensing FAQ

- **Community Edition vs Commercial Pro:** Community Edition (`0 USD`) is permanently free for personal learning, academic/non-commercial research, and a **30-day commercial evaluation** (non-production, no customer deliverables). Ongoing production or commercial commissioning requires Pro, Team, Department, or Enterprise Plant per [LICENSE.txt](LICENSE.txt).
- **Refund Policy:** If a paid license fails to work cleanly for your KUKA environment and our engineering support cannot resolve it, contact us within 14 days of purchase via **`krl.openTelegramChat`** or reply to your Dodo Payments receipt email for assistance.
