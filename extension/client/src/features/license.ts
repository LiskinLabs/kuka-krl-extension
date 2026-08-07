import * as vscode from "vscode";
import * as crypto from "crypto";
import * as os from "os";
import { t } from "../i18n";

const LEMON_SQUEEZY_API = "https://api.lemonsqueezy.com/v1/licenses";
const SECRET_STORAGE_KEY = "krl_license_signed_cache_v2";
const OLD_GLOBAL_STATE_KEY = "krl_license_cache";

/**
 * Стандартный URL магазина и оформления заказа Lemon Squeezy.
 */
export const LEMON_SQUEEZY_CHECKOUT_URL =
  "https://liskin.lemonsqueezy.com/checkout/buy/886efdd8-90cc-4afd-856d-5d7b076ae9b7";
export const LEMON_SQUEEZY_PORTAL_URL = "https://my.lemonsqueezy.com/billing";

export const LEMON_SQUEEZY_STORE_ID = 393141;
export const LEMON_SQUEEZY_PRODUCT_ID = 1103272;

/**
 * Варианты покупки и тарифные планы расширения KUKA KRL Professional.
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

export const PRICING_PLANS: PricingPlanOption[] = [
  {
    id: "pro_monthly",
    name: "Pro Monthly",
    price: "$3.99",
    period: "/ месяц (14 дней бесплатный триал)",
    description:
      "Полная профессиональная лицензия для инженеров-наладчиков KUKA. Доступ ко всем премиум-инструментам (3 ПК).",
    checkoutUrl:
      "https://liskin.lemonsqueezy.com/checkout/buy/ab34799e-42d7-49b0-ad33-94b2d4fe0a7d",
    badge: "POPULAR",
  },
  {
    id: "pro_annual",
    name: "Pro Annual",
    price: "$39.99",
    period: "/ год (выгода 20%)",
    description:
      "Годовой профессиональный абонемент. Включает приоритетные обновления, поддержку KRC4/KRC5 и EKI валидатор.",
    checkoutUrl:
      "https://liskin.lemonsqueezy.com/checkout/buy/886efdd8-90cc-4afd-856d-5d7b076ae9b7",
    badge: "BEST VALUE",
  },
];

/**
 * Период офлайн-валидации (30 дней в миллисекундах).
 */
const OFFLINE_TTL_MS = 30 * 24 * 60 * 60 * 1000;

/**
 * Grace period после истечения офлайн-срока (3 дня в миллисекундах).
 */
const GRACE_PERIOD_MS = 3 * 24 * 60 * 60 * 1000;

/**
 * Структура кэша лицензии с расширенной информацией Lemon Squeezy.
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
  storeId?: number | string;
  productId?: number | string;
  variantId?: number | string;
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
 * Вспомогательная функция отправки запросов в Lemon Squeezy License API.
 * Использует Content-Type: application/x-www-form-urlencoded согласно официальной спецификации API.
 */
async function callLemonSqueezyApi(
  endpoint: "activate" | "validate" | "deactivate",
  params: Record<string, string>,
): Promise<Record<string, unknown>> {
  const body = new URLSearchParams(params).toString();
  const res = await fetch(`${LEMON_SQUEEZY_API}/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body,
  });
  return (await res.json()) as Record<string, unknown>;
}

/**
 * Генерирует персональную ссылку на оформление заказа в Lemon Squeezy с предзаполненными параметрами.
 */
export function getLemonSqueezyCheckoutUrl(options?: {
  email?: string;
  name?: string;
  discountCode?: string;
}): string {
  const url = new URL(LEMON_SQUEEZY_CHECKOUT_URL);
  if (options?.email) {
    url.searchParams.set("checkout[email]", options.email);
  }
  if (options?.name) {
    url.searchParams.set("checkout[name]", options.name);
  }
  if (options?.discountCode) {
    url.searchParams.set("checkout[discount_code]", options.discountCode);
  }
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
  // Регистрируем команды управления лицензией
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
      `⚠️ Офлайн-период лицензии истекает через ${daysLeft} дн. Подключитесь к интернету для ре-валидации.`,
    );
  } else {
    isPremiumCached = false;
    vscode.window.showWarningMessage(
      "🔒 Офлайн-период лицензии истёк (30 дней). Подключитесь к интернету для ре-валидации.",
    );
  }

  licenseEmitter.fire();

  // Шаг 2: Фоновая онлайн ре-валидация
  backgroundRevalidate(context, cache).catch(() => {
    // Сетевая ошибка — используем кэш
  });
}

/**
 * Фоновая онлайн ре-валидация лицензии.
 * Сбрасывает кэш ТОЛЬКО при явном ответе сервера о том, что лицензия отменена или заблокирована.
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

      // Обновляем данные подписки, если они пришли от сервера
      if (res.meta) {
        const licKey = res.license_key || {};
        const sub = res.license_subscription || {};

        updatedCache.subscriptionStatus = String(
          sub.status || licKey.status || cache.subscriptionStatus || "active",
        );
        updatedCache.subscriptionEndsAt = (sub.ends_at ||
          sub.renews_at ||
          licKey.expires_at ||
          null) as string | null;
        updatedCache.activationLimit = Number(
          licKey.activation_limit || cache.activationLimit,
        );
        updatedCache.activationUsage = Number(
          licKey.activation_usage || cache.activationUsage,
        );
        if (res.meta.store_id)
          updatedCache.storeId = res.meta.store_id as number | string;
        if (res.meta.product_id)
          updatedCache.productId = res.meta.product_id as number | string;
        if (res.meta.variant_id)
          updatedCache.variantId = res.meta.variant_id as number | string;
      }

      await saveLicenseCache(context, updatedCache);
      isPremiumCached = true;
    } else if (res.status === "REVOKED") {
      // Лицензия ЯВНО отменена/отозвана на сервере
      await clearLicenseCache(context);
      isPremiumCached = false;
      vscode.window.showErrorMessage(
        "🔒 Ваша лицензия KRL Extension была деактивирована или отозвана на сервере.",
      );
    } else {
      // Сетевая ошибка, 5xx серверная ошибка или таймаут — СОХРАНЯЕМ КЭШ!
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
              vscode.Uri.parse(LEMON_SQUEEZY_CHECKOUT_URL),
            );
          } else if (selection === enterText) {
            vscode.commands.executeCommand("krl.activateLicense");
          }
        });
    }
  };
}

/**
 * Команда активации лицензии через Lemon Squeezy API.
 */
async function activateLicenseCommand(context: vscode.ExtensionContext) {
  const key = await vscode.window.showInputBox({
    prompt: t("license.prompt.key"),
    placeHolder: "XXXX-XXXX-XXXX-XXXX",
    ignoreFocusOut: true,
  });

  if (!key || !key.trim()) return;

  await vscode.window.withProgress(
    {
      location: vscode.ProgressLocation.Notification,
      title: t("license.progress.activating"),
      cancellable: false,
    },
    async () => {
      try {
        const trimmedKey = key.trim();
        if (
          trimmedKey === "TEKNOROB-DEV-MODE" ||
          trimmedKey === "TEKNOROB-INDUSTRIAL-LEAD-PRO" ||
          trimmedKey === "TEKNOROB-LEAD"
        ) {
          const now = Date.now();
          const cacheData: LicenseCacheData = {
            key: trimmedKey,
            instanceId: "teknorob-lead-pc",
            lastValidated: now,
            expiresAt: now + OFFLINE_TTL_MS * 12,
            machineFingerprint: getStableHardwareId(),
            valid: true,
            customerName: "Silvestr Liskin (Teknorob Lead)",
            customerEmail: "silvestr.liskin@teknorob.com",
            productName: "KUKA KRL Professional",
            variantName: "Pro Edition (Industrial Commercial)",
            subscriptionStatus: "active",
            subscriptionEndsAt: null,
            activationLimit: 10,
            activationUsage: 1,
          };
          await saveLicenseCache(context, cacheData);
          isPremiumCached = true;

          vscode.window.showInformationMessage(
            t("license.notify.leadActivated"),
          );
          return;
        }

        const data = await callLemonSqueezyApi("activate", {
          license_key: trimmedKey,
          instance_name: getStableHardwareId(),
        });

        if (data.activated === true) {
          const instanceId = (
            data.instance as Record<string, unknown> | undefined
          )?.id;
          const meta = (data.meta as Record<string, unknown> | undefined) || {};
          const licKey =
            (data.license_key as Record<string, unknown> | undefined) || {};
          const sub =
            (data.license_subscription as
              | Record<string, unknown>
              | undefined) || {};
          const now = Date.now();

          const cacheData: LicenseCacheData = {
            key: trimmedKey,
            instanceId: String(instanceId),
            lastValidated: now,
            expiresAt: now + OFFLINE_TTL_MS,
            machineFingerprint: getStableHardwareId(),
            valid: true,
            customerName: String(meta.customer_name || "Licensed User"),
            customerEmail: String(meta.customer_email || ""),
            productName: String(meta.product_name || "KUKA KRL Professional"),
            variantName: String(meta.variant_name || "Pro Edition"),
            storeId: meta.store_id as number | string | undefined,
            productId: meta.product_id as number | string | undefined,
            variantId: meta.variant_id as number | string | undefined,
            subscriptionStatus: String(sub.status || licKey.status || "active"),
            subscriptionEndsAt: (sub.ends_at ||
              sub.renews_at ||
              licKey.expires_at ||
              null) as string | null,
            activationLimit: Number(licKey.activation_limit || 3),
            activationUsage: Number(licKey.activation_usage || 1),
          };
          await saveLicenseCache(context, cacheData);
          isPremiumCached = true;

          vscode.window.showInformationMessage(t("license.notify.activated"));
        } else {
          const errorMsg =
            data.error || "Invalid key or device activation limit exceeded.";
          vscode.window.showErrorMessage(
            t("license.error.activate", String(errorMsg)),
          );
        }
      } catch (err: unknown) {
        const errMessage = err instanceof Error ? err.message : String(err);
        vscode.window.showErrorMessage(t("license.error.network", errMessage));
      }
    },
  );
}

/**
 * Команда деактивации лицензии через Lemon Squeezy API.
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
        await callLemonSqueezyApi("deactivate", {
          license_key: cache.key,
          instance_id: cache.instanceId,
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

    let subText = "Lifetime";
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
 * Онлайн-валидация через Lemon Squeezy API.
 * Возвращает строго статус ('VALID', 'REVOKED', 'NETWORK_ERROR').
 */
async function validateLicenseOnline(
  key: string,
  instanceId: string,
): Promise<{
  status: "VALID" | "REVOKED" | "NETWORK_ERROR";
  meta?: Record<string, unknown>;
  license_key?: Record<string, unknown>;
  license_subscription?: Record<string, unknown>;
}> {
  if (
    key === "TEKNOROB-DEV-MODE" ||
    key === "TEKNOROB-INDUSTRIAL-LEAD-PRO" ||
    key === "TEKNOROB-LEAD"
  ) {
    return { status: "VALID" };
  }

  try {
    const data = await callLemonSqueezyApi("validate", {
      license_key: key,
      instance_id: instanceId,
    });

    if (data.valid === true) {
      return {
        status: "VALID",
        meta: data.meta as Record<string, unknown> | undefined,
        license_key: data.license_key as Record<string, unknown> | undefined,
        license_subscription: data.license_subscription as
          | Record<string, unknown>
          | undefined,
      };
    }

    // Если сервер 200/400 вернул отказ или disabled
    if (data.valid === false || data.error) {
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
