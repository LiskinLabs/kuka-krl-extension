import * as vscode from "vscode";
import * as crypto from "crypto";
import * as os from "os";
import { t } from "../i18n";

export const DODO_PAYMENTS_LIVE_API = "https://live.dodopayments.com";
export const DODO_PAYMENTS_TEST_API = "https://test.dodopayments.com";
export const DODO_PAYMENTS_API = DODO_PAYMENTS_LIVE_API;

export const DODO_BUSINESS_ID = "bus_0NlrxPhrg9eHzPZKAgsF1";
export const DODO_PRODUCT_ID_MONTHLY = "pdt_0NmAUzwdbzeERSktsOLTp";
export const DODO_PRODUCT_ID_ANNUAL = "pdt_0NmAV012KFHSjUMyDomJ6";
export const DODO_PRODUCT_ID_LIFETIME = "pdt_0NmAcoqVCfuwQ6Xx7qyqr";
export const DODO_PRODUCT_COLLECTION_ID = "pdc_0NmAaL3aw5WKbMZgAVCDZ";
export const DODO_PRODUCT_ID = DODO_PRODUCT_ID_ANNUAL;

export const DODO_PAYMENTS_PORTAL_URL =
  "https://customer.dodopayments.com/login/bus_0NlrxPhrg9eHzPZKAgsF1";
export const DODO_PAYMENTS_CHECKOUT_URL =
  "https://checkout.dodopayments.com/buy/pdc_0NmAaL3aw5WKbMZgAVCDZ";
export const DODO_LAUNCH_PROMO_CODE = "LAUNCH30";

const SECRET_STORAGE_KEY = "krl_license_signed_cache_v2";
const OLD_GLOBAL_STATE_KEY = "krl_license_cache";



/**
 * Варианты покупки и тарифные планы расширения KUKA KRL Professional (Dodo Payments).
 */
export interface PricingPlanOption {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  checkoutUrl: string;
  badge?: string;
}

export const DODO_GATEWAY_SUCCESS_RETURN_URL =
  "https://kuka-krl-support-gateway.redminotpro5.workers.dev/checkout/success";

export const PRICING_PLANS: PricingPlanOption[] = [
  {
    id: "pro_monthly",
    name: "Pro Monthly",
    price: "$9.99",
    period: "/ месяц (14 дней бесплатный триал)",
    description:
      "Профессиональная лицензия для инженера-наладчика KUKA. Доступ ко всем премиум-инструментам, AST-диагностике и EKI (2 ПК).",
    checkoutUrl: `https://checkout.dodopayments.com/buy/${DODO_PRODUCT_ID_MONTHLY}?return_url=${encodeURIComponent(DODO_GATEWAY_SUCCESS_RETURN_URL)}`,
    badge: "STARTER",
  },
  {
    id: "pro_annual",
    name: "Pro Annual (B2B Standard)",
    price: "$79.00",
    period: "/ год (выгода 35%)",
    description:
      "Годовой промышленный абонемент. Включает приоритетные обновления, поддержку KRC4/KRC5, Backup Diff, EKI валидатор и GitLens KRL (3 ПК).",
    checkoutUrl: `https://checkout.dodopayments.com/buy/${DODO_PRODUCT_ID_ANNUAL}?return_url=${encodeURIComponent(DODO_GATEWAY_SUCCESS_RETURN_URL)}`,
    badge: "RECOMMENDED",
  },
  {
    id: "pro_lifetime",
    name: "Pro Lifetime (Enterprise & Integrator)",
    price: "$349.00",
    period: "/ разово (вечная лицензия)",
    description:
      "Бессрочная коммерческая лицензия без подписок. 5 рабочих мест, пожизненный доступ, 30-дневный оффлайн-буфер и приоритетный прямой чат поддержки.",
    checkoutUrl: `https://checkout.dodopayments.com/buy/${DODO_PRODUCT_ID_LIFETIME}?return_url=${encodeURIComponent(DODO_GATEWAY_SUCCESS_RETURN_URL)}`,
    badge: "LIFETIME DEAL",
  },
];

/**
 * Период офлайн-валидации (30 дней в миллисекундах).
 */
const OFFLINE_TTL_MS = 30 * 24 * 60 * 60 * 1000;

/**
 * Grace period после неудавшейся оплаты или истечения срока (14 дней в миллисекундах).
 * Инженер продолжает непрерывно работать на объекте, пока система совершает умные повторные попытки списания.
 */
const GRACE_PERIOD_MS = 14 * 24 * 60 * 60 * 1000;

/**
 * Структура кэша лицензии с информацией Dodo Payments.
 */
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

/**
 * Структура обёртки кэша с подписью.
 */
interface SignedLicenseCache {
  data: LicenseCacheData;
  signature: string;
}

let isPremiumCached = false;

const licenseEmitter = new vscode.EventEmitter<void>();
export const onLicenseChanged = licenseEmitter.event;

/**
 * Определяет базовый URL для API Dodo Payments (Live vs Test).
 */
function getDodoApiBaseUrl(key?: string): string {
  if (
    key &&
    (key.startsWith("KRL-PRO-TEST") ||
      key.startsWith("TEST-") ||
      key.includes("-TEST-"))
  ) {
    return DODO_PAYMENTS_TEST_API;
  }
  return DODO_PAYMENTS_LIVE_API;
}

/**
 * Вспомогательная функция отправки запросов в Dodo Payments Public License API.
 * Использует Content-Type: application/json согласно спецификации Dodo Payments.
 */
export async function callDodoPaymentsApi(
  endpoint: "activate" | "validate" | "deactivate",
  payload: Record<string, unknown>,
): Promise<Record<string, unknown>> {
  const licenseKey = String(payload.license_key || "");
  const baseUrl = getDodoApiBaseUrl(licenseKey);

  try {
    const res = await fetch(`${baseUrl}/licenses/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      // Фолбэк на Test окружение для локального тестирования
      if (baseUrl === DODO_PAYMENTS_LIVE_API) {
        try {
          const testRes = await fetch(
            `${DODO_PAYMENTS_TEST_API}/licenses/${endpoint}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify(payload),
            },
          );
          if (testRes.ok) {
            const testText = await testRes.text();
            if (!testText) return { success: true };
            return JSON.parse(testText) as Record<string, unknown>;
          }
        } catch {
          // Игнорируем ошибку фолбэка
        }
      }

      const errJson = (await res.json().catch(() => ({}))) as Record<
        string,
        unknown
      >;
      return { _httpError: true, status: res.status, ...errJson };
    }

    const text = await res.text();
    if (!text) return { success: true };
    return JSON.parse(text) as Record<string, unknown>;
  } catch (err: unknown) {
    throw err;
  }
}

/**
 * Генерирует персональную ссылку на оформление заказа в Dodo Payments с предзаполненными параметрами.
 */
export function getDodoCheckoutUrl(options?: {
  email?: string;
  name?: string;
  productId?: string;
}): string {
  const targetProduct = options?.productId || DODO_PRODUCT_ID;
  const url = new URL(`https://checkout.dodopayments.com/buy/${targetProduct}`);
  if (options?.email) {
    url.searchParams.set("email", options.email);
  }
  if (options?.name) {
    url.searchParams.set("name", options.name);
  }
  url.searchParams.set("return_url", DODO_GATEWAY_SUCCESS_RETURN_URL);
  return url.toString();
}

/**
 * Генерирует стабильный Hardware ID устройства (устойчив к обновлениям VS Code и смене профилей).
 */
function getStableHardwareId(): string {
  try {
    const network = os.networkInterfaces();
    let mac = "";
    for (const name of Object.keys(network)) {
      for (const net of network[name] || []) {
        if (!net.internal && net.mac && net.mac !== "00:00:00:00:00:00") {
          mac = net.mac;
          break;
        }
      }
      if (mac) break;
    }
    const raw = `${os.hostname()}-${os.platform()}-${os.arch()}-${mac}-${os.userInfo().username}`;
    return crypto.createHash("sha256").update(raw).digest("hex");
  } catch {
    return vscode.env.machineId;
  }
}

/**
 * Генерирует HMAC-SHA256 подпись для данных кэша на основе стабильного Hardware ID.
 */
function computeCacheSignature(data: LicenseCacheData): string {
  const payload = JSON.stringify(data);
  const secretKey = getStableHardwareId();
  return crypto.createHmac("sha256", secretKey).update(payload).digest("hex");
}

/**
 * Верифицирует подпись кэша лицензии.
 */
function verifyCacheSignature(signed: SignedLicenseCache): boolean {
  const expected = computeCacheSignature(signed.data);
  try {
    return crypto.timingSafeEqual(
      Buffer.from(signed.signature, "hex"),
      Buffer.from(expected, "hex"),
    );
  } catch {
    return false;
  }
}

/**
 * Сохраняет подписанный кэш лицензии в защищённое хранилище SecretStorage (зашифровано на уровне ОС).
 */
async function saveLicenseCache(
  context: vscode.ExtensionContext,
  data: LicenseCacheData,
): Promise<void> {
  const signed: SignedLicenseCache = {
    data,
    signature: computeCacheSignature(data),
  };
  await context.secrets.store(SECRET_STORAGE_KEY, JSON.stringify(signed));
  licenseEmitter.fire();
}

/**
 * Загружает и верифицирует кэш лицензии из SecretStorage.
 * Автоматически мигрирует со старого globalState при необходимости.
 */
async function loadLicenseCache(
  context: vscode.ExtensionContext,
): Promise<LicenseCacheData | null> {
  let rawSecret = await context.secrets.get(SECRET_STORAGE_KEY);

  // МИГРАЦИЯ: Если нет в SecretStorage, проверяем старый globalState
  if (!rawSecret) {
    const oldSigned =
      context.globalState.get<SignedLicenseCache>(OLD_GLOBAL_STATE_KEY);
    if (oldSigned && oldSigned.data && oldSigned.data.key) {
      // Обновляем fingerprint под новый стабильный Hardware ID и мигрируем
      const migratedData: LicenseCacheData = {
        ...oldSigned.data,
        machineFingerprint: getStableHardwareId(),
      };
      await saveLicenseCache(context, migratedData);
      await context.globalState.update(OLD_GLOBAL_STATE_KEY, undefined);
      rawSecret = await context.secrets.get(SECRET_STORAGE_KEY);
    }
  }

  if (!rawSecret) return null;

  try {
    const signed: SignedLicenseCache = JSON.parse(rawSecret);
    if (!signed || !signed.data || !signed.signature) {
      return null;
    }

    // Проверяем подпись
    if (!verifyCacheSignature(signed)) {
      return null;
    }

    // Проверяем аппаратную привязку
    const currentHardwareId = getStableHardwareId();
    if (
      signed.data.machineFingerprint !== currentHardwareId &&
      signed.data.machineFingerprint !== vscode.env.machineId
    ) {
      return null;
    }

    return signed.data;
  } catch {
    return null;
  }
}

/**
 * Удаляет кэш лицензии.
 */
async function clearLicenseCache(
  context: vscode.ExtensionContext,
): Promise<void> {
  await context.secrets.delete(SECRET_STORAGE_KEY);
  await context.globalState.update(OLD_GLOBAL_STATE_KEY, undefined);
  licenseEmitter.fire();
}

/**
 * Инициализирует модуль лицензирования и проверяет лицензию при запуске.
 */
export async function initLicense(context: vscode.ExtensionContext) {
  // Регистрируем команды управления лицензией и URI Handler
  context.subscriptions.push(
    vscode.commands.registerCommand("krl.activateLicense", () =>
      activateLicenseCommand(context),
    ),
    vscode.commands.registerCommand("krl.deactivateLicense", () =>
      deactivateLicenseCommand(context),
    ),
    vscode.commands.registerCommand("krl.checkLicenseStatus", () =>
      checkLicenseStatusCommand(context),
    ),
    vscode.commands.registerCommand("krl.openCustomerPortal", () =>
      openCustomerPortalCommand(),
    ),
    vscode.window.registerUriHandler(new KrlUriHandler(context)),
  );

  const cache = await loadLicenseCache(context);

  if (!cache || !cache.key || !cache.instanceId) {
    isPremiumCached = false;
    licenseEmitter.fire();
    return;
  }

  const now = Date.now();

  // Шаг 1: Офлайн проверка
  if (now < cache.expiresAt) {
    isPremiumCached = cache.valid;
  } else if (now < cache.expiresAt + GRACE_PERIOD_MS) {
    isPremiumCached = cache.valid;
    const daysLeft = Math.ceil(
      (cache.expiresAt + GRACE_PERIOD_MS - now) / (24 * 60 * 60 * 1000),
    );
    vscode.window.showWarningMessage(
      t("license.warning.offlineExpiring", daysLeft),
    );
  } else {
    isPremiumCached = false;
    vscode.window.showWarningMessage(t("license.warning.offlineExpired"));
  }

  licenseEmitter.fire();

  // Шаг 2: Фоновая онлайн ре-валидация
  backgroundRevalidate(context, cache).catch(() => {
    // Сетевая ошибка — используем кэш
  });
}

/**
 * Фоновая онлайн ре-валидация лицензии в Dodo Payments API.
 * Сбрасывает кэш ТОЛЬКО при явном ответе сервера о том, что лицензия отменена или недействительна.
 */
async function backgroundRevalidate(
  context: vscode.ExtensionContext,
  cache: LicenseCacheData,
): Promise<void> {
  try {
    const res = await validateLicenseOnline(cache.key, cache.instanceId);

    if (res.status === "VALID") {
      const now = Date.now();
      const updatedCache: LicenseCacheData = {
        ...cache,
        lastValidated: now,
        expiresAt: now + OFFLINE_TTL_MS,
        valid: true,
      };

      await saveLicenseCache(context, updatedCache);
      isPremiumCached = true;
    } else if (res.status === "REVOKED") {
      // Лицензия ЯВНО отменена/отозвана на сервере
      await clearLicenseCache(context);
      isPremiumCached = false;
      vscode.window.showErrorMessage(t("license.error.revoked"));
    } else {
      // Сетевая ошибка или таймаут — СОХРАНЯЕМ ОФЛАЙН-КЭШ!
    }
  } catch {
    // Игнорируем сетевые сбои
  }
}

/**
 * Проверка: активна ли премиум-версия.
 */
export function isPremium(): boolean {
  return isPremiumCached;
}

/**
 * Защитник для вызова премиум-команд.
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
 * Открывает официальный Customer Portal Dodo Payments.
 */
export async function openCustomerPortalCommand(): Promise<void> {
  await vscode.env.openExternal(vscode.Uri.parse(DODO_PAYMENTS_PORTAL_URL));
  vscode.window.showInformationMessage(t("cc.notify.portalOpened"));
}

/**
 * Программно активирует лицензионный ключ через Dodo Payments API или Master-хэш.
 */
export async function activateLicenseWithKey(
  context: vscode.ExtensionContext,
  rawKey: string,
  isUriCall = false,
): Promise<boolean> {
  const trimmedKey = rawKey.trim();
  if (!trimmedKey) return false;

  return await vscode.window.withProgress(
    {
      location: vscode.ProgressLocation.Notification,
      title: t("license.progress.activating"),
      cancellable: false,
    },
    async () => {
      try {
        const deviceName = `${os.hostname()} (${os.platform()} ${os.arch()})`;
        const data = await callDodoPaymentsApi("activate", {
          license_key: trimmedKey,
          name: deviceName,
        });

        if (data && data.id && !data._httpError) {
          const instanceId = String(data.id);
          const cust =
            (data.customer as Record<string, unknown> | undefined) || {};
          const prod =
            (data.product as Record<string, unknown> | undefined) || {};
          const now = Date.now();

          const cacheData: LicenseCacheData = {
            key: trimmedKey,
            instanceId: instanceId,
            lastValidated: now,
            expiresAt: now + OFFLINE_TTL_MS,
            machineFingerprint: getStableHardwareId(),
            valid: true,
            customerName: String(cust.name || "Licensed User"),
            customerEmail: String(cust.email || ""),
            productName: String(prod.name || "KUKA KRL Professional"),
            variantName: "Pro Edition (Dodo Payments)",
            businessId: String(data.business_id || DODO_BUSINESS_ID),
            productId: String(prod.product_id || DODO_PRODUCT_ID),
            licenseKeyId: String(data.license_key_id || ""),
            subscriptionStatus: "active",
            subscriptionEndsAt: null,
            activationLimit: 5,
            activationUsage: 1,
          };
          await saveLicenseCache(context, cacheData);
          isPremiumCached = true;

          vscode.window.showInformationMessage(
            isUriCall
              ? t("license.notify.uriActivated")
              : t("license.notify.activated"),
          );
          return true;
        } else {
          const errorMsg =
            data.message ||
            data.error ||
            "Invalid key or device activation limit exceeded.";
          vscode.window.showErrorMessage(
            t("license.error.activate", String(errorMsg)),
          );
          return false;
        }
      } catch (err: unknown) {
        const errMessage = err instanceof Error ? err.message : String(err);
        vscode.window.showErrorMessage(t("license.error.network", errMessage));
        return false;
      }
    },
  );
}

/**
 * Команда активации лицензии через интерактивный диалог VS Code.
 */
async function activateLicenseCommand(context: vscode.ExtensionContext) {
  const key = await vscode.window.showInputBox({
    prompt: t("license.prompt.key"),
    placeHolder: t("license.placeholder.key"),
    ignoreFocusOut: true,
  });

  if (!key || !key.trim()) return;
  await activateLicenseWithKey(context, key);
}

/**
 * Обработчик внешних URI-ссылок (vscode://LiskinLabs.kuka-krl-extension/activate?key=... или /portal)
 */
export class KrlUriHandler implements vscode.UriHandler {
  constructor(private context: vscode.ExtensionContext) {}

  async handleUri(uri: vscode.Uri): Promise<void> {
    const rawPath = uri.path.replace(/^\//, "").toLowerCase();
    const query = new URLSearchParams(uri.query);

    if (
      rawPath === "activate" ||
      rawPath === "activate-license" ||
      rawPath === "license/activate"
    ) {
      const key =
        query.get("key") ||
        query.get("license_key") ||
        query.get("code") ||
        query.get("license");
      if (key) {
        await activateLicenseWithKey(this.context, key, true);
      } else {
        await activateLicenseCommand(this.context);
      }
    } else if (
      rawPath === "portal" ||
      rawPath === "billing" ||
      rawPath === "customer-portal"
    ) {
      await openCustomerPortalCommand();
    } else if (
      rawPath === "control-center" ||
      rawPath === "dashboard" ||
      rawPath === "cc"
    ) {
      await vscode.commands.executeCommand("krl.openControlCenter");
    } else if (rawPath === "chat" || rawPath === "support") {
      await vscode.commands.executeCommand("krl.openTelegramChat");
    }
  }
}

/**
 * Команда деактивации лицензии через Dodo Payments Public License API.
 */
async function deactivateLicenseCommand(context: vscode.ExtensionContext) {
  const cache = await loadLicenseCache(context);

  if (!cache || !cache.key || !cache.instanceId) {
    vscode.window.showInformationMessage(t("license.info.noKey"));
    return;
  }

  const yesText = t("license.btn.yes");
  const noText = t("license.btn.no");
  const confirm = await vscode.window.showWarningMessage(
    t("license.confirm.deactivate"),
    yesText,
    noText,
  );

  if (confirm !== yesText) return;

  await vscode.window.withProgress(
    {
      location: vscode.ProgressLocation.Notification,
      title: t("license.progress.deactivating"),
      cancellable: false,
    },
    async () => {
      try {
        await callDodoPaymentsApi("deactivate", {
          license_key: cache.key,
          license_key_instance_id: cache.instanceId,
        });
      } catch {
        // Даже при ошибке сети сбрасываем локально
      }

      await clearLicenseCache(context);
      isPremiumCached = false;

      vscode.window.showInformationMessage(t("license.notify.deactivated"));
    },
  );
}

/**
 * Команда проверки статуса лицензии.
 */
async function checkLicenseStatusCommand(context: vscode.ExtensionContext) {
  const cache = await loadLicenseCache(context);

  if (!cache || !cache.key) {
    vscode.window.showInformationMessage(t("license.info.freeEdition"));
    return;
  }

  if (isPremium()) {
    const now = Date.now();
    const offlineDaysRemaining = Math.max(
      0,
      Math.ceil((cache.expiresAt - now) / (24 * 60 * 60 * 1000)),
    );

    let subText = "Lifetime / Active";
    if (cache.subscriptionEndsAt) {
      const subEnd = new Date(cache.subscriptionEndsAt);
      const msLeft = subEnd.getTime() - now;
      const subDays = Math.max(0, Math.ceil(msLeft / (24 * 60 * 60 * 1000)));
      subText = `${subEnd.toLocaleDateString()} (${subDays}d remaining)`;
    }

    const usageInfo = cache.activationLimit
      ? ` | Devices: ${cache.activationUsage || 1}/${cache.activationLimit}`
      : "";

    vscode.window.showInformationMessage(
      t(
        "license.info.activePro",
        `${subText}${usageInfo}`,
        offlineDaysRemaining,
      ),
    );
  } else {
    vscode.window.showWarningMessage(t("license.warning.expired"));
  }
}

/**
 * Онлайн-валидация через Dodo Payments API.
 * Возвращает строго статус ('VALID', 'REVOKED', 'NETWORK_ERROR').
 */
async function validateLicenseOnline(
  key: string,
  instanceId: string,
): Promise<{
  status: "VALID" | "REVOKED" | "NETWORK_ERROR";
  meta?: Record<string, unknown>;
}> {
  try {
    const data = await callDodoPaymentsApi("validate", {
      license_key: key,
      license_key_instance_id: instanceId,
    });

    if (data.valid === true) {
      return {
        status: "VALID",
        meta: data,
      };
    }

    if (data.valid === false || data._httpError) {
      return { status: "REVOKED" };
    }

    return { status: "NETWORK_ERROR" };
  } catch {
    return { status: "NETWORK_ERROR" };
  }
}

/**
 * Возвращает текущие данные кэша лицензии для отображения в Control Center.
 */
export async function getLicenseCache(
  context: vscode.ExtensionContext,
): Promise<LicenseCacheData | null> {
  return loadLicenseCache(context);
}

/**
 * Возвращает сведения об текущем устройстве (имя ПК, ОС, Hardware ID).
 */
export function getDeviceDetails() {
  return {
    hostname: os.hostname(),
    platform: os.platform(),
    arch: os.arch(),
    hardwareId: getStableHardwareId(),
  };
}
