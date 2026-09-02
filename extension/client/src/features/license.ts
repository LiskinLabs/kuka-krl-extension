import * as vscode from "vscode";
import * as os from "os";
import { t } from "../i18n";

/**
 * KUKA KRL Professional — License Module (Public API Stub)
 *
 * This is the public-facing API surface for the license module.
 * Full implementation is available only in the private repository
 * and is bundled into the obfuscated VSIX distribution.
 *
 * © Liskin Labs — All rights reserved.
 */

// ─── Public Constants ───────────────────────────────────────────────────────

export const DODO_PAYMENTS_CHECKOUT_URL =
  "https://checkout.dodopayments.com/buy/pdc_0NmAaL3aw5WKbMZgAVCDZ";
export const DODO_PAYMENTS_PORTAL_URL =
  "https://customer.dodopayments.com/login/bus_0NlrxPhrg9eHzPZKAgsF1";

// ─── Public Interfaces ──────────────────────────────────────────────────────

export interface PricingPlanOption {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  checkoutUrl: string;
  badge?: string;
}

export interface LicenseCacheData {
  key: string;
  instanceId: string;
  lastValidated: number;
  expiresAt: number;
  machineFingerprint: string;
  valid: boolean;
  customerName?: string;
  customerEmail?: string;
  productName?: string;
  variantName?: string;
  businessId?: string;
  productId?: string;
  licenseKeyId?: string;
  subscriptionStatus?: string;
  subscriptionEndsAt?: string | null;
  activationLimit?: number;
  activationUsage?: number;
}

// ─── Public API ─────────────────────────────────────────────────────────────

/**
 * Returns dynamic, localized pricing tiers.
 */
export function getPricingPlans(): PricingPlanOption[] {
  return [
    {
      id: "pro_monthly",
      name: t("plan.monthly.name"),
      price: "$9.99",
      period: t("plan.monthly.period"),
      description: t("plan.monthly.desc"),
      checkoutUrl: DODO_PAYMENTS_CHECKOUT_URL,
      badge: "STARTER",
    },
    {
      id: "pro_annual",
      name: t("plan.annual.name"),
      price: "$79.00",
      period: t("plan.annual.period"),
      description: t("plan.annual.desc"),
      checkoutUrl: DODO_PAYMENTS_CHECKOUT_URL,
      badge: "RECOMMENDED",
    },
    {
      id: "pro_lifetime",
      name: t("plan.lifetime.name"),
      price: "$349.00",
      period: t("plan.lifetime.period"),
      description: t("plan.lifetime.desc"),
      checkoutUrl: DODO_PAYMENTS_CHECKOUT_URL,
      badge: "LIFETIME DEAL",
    },
  ];
}

export const PRICING_PLANS: PricingPlanOption[] = getPricingPlans();

const licenseEmitter = new vscode.EventEmitter<void>();
export const onLicenseChanged = licenseEmitter.event;

/**
 * Checks if premium license is active.
 * Full validation logic is in the private repository.
 */
export function isPremium(): boolean {
  // Implementation is in the private repository.
  // The obfuscated production bundle contains the full license validation.
  return false;
}

/**
 * Premium feature gate decorator.
 */
export function ensurePremium<T extends (...args: unknown[]) => unknown>(
  callback: T,
): (...args: Parameters<T>) => ReturnType<T> | undefined {
  return function (...args: Parameters<T>) {
    if (isPremium()) {
      return callback(...args) as ReturnType<T>;
    } else {
      const buyText = t("license.btn.buy");
      const enterText = t("license.btn.enterKey");
      vscode.window
        .showWarningMessage(
          t("license.warning.premiumOnly"),
          buyText,
          enterText,
        )
        .then((selection) => {
          if (selection === buyText) {
            vscode.env.openExternal(
              vscode.Uri.parse(DODO_PAYMENTS_CHECKOUT_URL),
            );
          } else if (selection === enterText) {
            vscode.commands.executeCommand("krl.activateLicense");
          }
        });
    }
  };
}

/**
 * Initializes the license module. Full implementation is private.
 */
export async function initLicense(
  context: vscode.ExtensionContext,
): Promise<void> {
  context.subscriptions.push(
    vscode.commands.registerCommand("krl.activateLicense", () =>
      vscode.window
        .showInputBox({
          prompt: t("license.prompt.key"),
          placeHolder: t("license.placeholder.key"),
          ignoreFocusOut: true,
        })
        .then((key) => {
          if (key) {
            vscode.window.showInformationMessage(
              "License activation is handled by the full extension bundle.",
            );
          }
        }),
    ),
    vscode.commands.registerCommand("krl.deactivateLicense", () =>
      vscode.window.showInformationMessage(t("license.info.noKey")),
    ),
    vscode.commands.registerCommand("krl.checkLicenseStatus", () =>
      vscode.window.showInformationMessage(t("license.info.freeEdition")),
    ),
    vscode.commands.registerCommand("krl.openCustomerPortal", () =>
      vscode.env.openExternal(vscode.Uri.parse(DODO_PAYMENTS_PORTAL_URL)),
    ),
  );
}

/**
 * Returns current license cache data for Control Center display.
 */
export async function getLicenseCache(
  _context: vscode.ExtensionContext,
): Promise<LicenseCacheData | null> {
  return null;
}

/**
 * Returns device details (hostname, OS, Hardware ID).
 */
export function getDeviceDetails() {
  return {
    hostname: os.hostname(),
    platform: os.platform(),
    arch: os.arch(),
    hardwareId: "community-edition",
  };
}
