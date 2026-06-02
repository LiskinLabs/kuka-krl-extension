import * as vscode from "vscode";
import * as crypto from "crypto";

const LEMON_SQUEEZY_API = "https://api.lemonsqueezy.com/v1/licenses";

/**
 * Период офлайн-валидации (30 дней в миллисекундах).
 */
const OFFLINE_TTL_MS = 30 * 24 * 60 * 60 * 1000;

/**
 * Grace period после истечения офлайн-срока (3 дня в миллисекундах).
 */
const GRACE_PERIOD_MS = 3 * 24 * 60 * 60 * 1000;

/**
 * Структура кэша лицензии. Хранится в globalState с HMAC-подписью.
 */
interface LicenseCacheData {
  key: string;
  instanceId: string;
  lastValidated: number;
  expiresAt: number;
  machineFingerprint: string;
  valid: boolean;
}

/**
 * Структура обёртки кэша с подписью.
 */
interface SignedLicenseCache {
  data: LicenseCacheData;
  signature: string;
}

let isPremiumCached = false;

/**
 * Генерирует HMAC-SHA256 подпись для данных кэша.
 * Используем machineId как секретный ключ — кэш нельзя перенести на другую машину.
 */
function computeCacheSignature(data: LicenseCacheData): string {
  const payload = JSON.stringify(data);
  return crypto
    .createHmac("sha256", vscode.env.machineId)
    .update(payload)
    .digest("hex");
}

/**
 * Верифицирует подпись кэша лицензии.
 */
function verifyCacheSignature(signed: SignedLicenseCache): boolean {
  const expected = computeCacheSignature(signed.data);
  // Используем timingSafeEqual для защиты от timing-атак
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
 * Сохраняет подписанный кэш лицензии.
 */
async function saveLicenseCache(
  context: vscode.ExtensionContext,
  data: LicenseCacheData,
): Promise<void> {
  const signed: SignedLicenseCache = {
    data,
    signature: computeCacheSignature(data),
  };
  await context.globalState.update("krl_license_cache", signed);
}

/**
 * Загружает и верифицирует кэш лицензии.
 * Возвращает null если кэш отсутствует, повреждён, или подпись не совпадает.
 */
function loadLicenseCache(
  context: vscode.ExtensionContext,
): LicenseCacheData | null {
  const signed =
    context.globalState.get<SignedLicenseCache>("krl_license_cache");
  if (!signed || !signed.data || !signed.signature) {
    return null;
  }

  // Проверяем подпись
  if (!verifyCacheSignature(signed)) {
    return null;
  }

  // Проверяем fingerprint машины
  if (signed.data.machineFingerprint !== vscode.env.machineId) {
    return null;
  }

  return signed.data;
}

/**
 * Удаляет кэш лицензии.
 */
async function clearLicenseCache(
  context: vscode.ExtensionContext,
): Promise<void> {
  await context.globalState.update("krl_license_cache", undefined);
}

/**
 * Инициализирует модуль лицензирования и проверяет существующую лицензию при запуске.
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

  // Загружаем и проверяем кэш
  const cache = loadLicenseCache(context);

  if (!cache || !cache.key || !cache.instanceId) {
    // Нет валидного кэша — бесплатная версия
    isPremiumCached = false;
    return;
  }

  const now = Date.now();

  // Шаг 1: Проверяем офлайн-кэш по TTL
  if (now < cache.expiresAt) {
    // В пределах 30 дней — Premium работает без сети
    isPremiumCached = true;
  } else if (now < cache.expiresAt + GRACE_PERIOD_MS) {
    // Grace period (3 дня) — Premium работает, но предупреждаем
    isPremiumCached = true;
    const daysLeft = Math.ceil(
      (cache.expiresAt + GRACE_PERIOD_MS - now) / (24 * 60 * 60 * 1000),
    );
    vscode.window.showWarningMessage(
      `⚠️ Офлайн-период лицензии истекает через ${daysLeft} дн. Подключитесь к интернету для ре-валидации.`,
    );
  } else {
    // Полное истечение — Premium заблокирован
    isPremiumCached = false;
    vscode.window.showWarningMessage(
      "🔒 Офлайн-период лицензии истёк. Подключитесь к интернету для ре-валидации Premium-доступа.",
    );
  }

  // Шаг 2: Фоновая онлайн ре-валидация (не блокирует запуск)
  backgroundRevalidate(context, cache).catch(() => {
    // Сетевая ошибка — используем кэш как есть
  });
}

/**
 * Фоновая онлайн ре-валидация лицензии.
 * Обновляет TTL при успехе, отзывает лицензию при провале.
 */
async function backgroundRevalidate(
  context: vscode.ExtensionContext,
  cache: LicenseCacheData,
): Promise<void> {
  try {
    const isValid = await validateLicenseOnline(cache.key, cache.instanceId);

    if (isValid) {
      // Успех — обновляем TTL
      const now = Date.now();
      const updatedCache: LicenseCacheData = {
        ...cache,
        lastValidated: now,
        expiresAt: now + OFFLINE_TTL_MS,
        valid: true,
      };
      await saveLicenseCache(context, updatedCache);
      isPremiumCached = true;
    } else {
      // Лицензия отозвана на сервере
      await clearLicenseCache(context);
      isPremiumCached = false;
      vscode.window.showErrorMessage(
        "🔒 Ваша лицензия была отозвана или деактивирована. Premium-функции заблокированы.",
      );
    }
  } catch {
    // Сетевая ошибка — молча продолжаем с кэшем
  }
}

/**
 * Проверка: активна ли премиум-версия (синхронно).
 */
export function isPremium(): boolean {
  return isPremiumCached;
}

/**
 * Декоратор/защитник для вызова премиум-команд.
 */
export function ensurePremium(
  callback: (...args: any[]) => any,
): (...args: any[]) => any {
  return function (...args: any[]) {
    if (isPremium()) {
      return callback(...args);
    } else {
      vscode.window
        .showWarningMessage(
          "Эта функция доступна только в Premium-версии. Пожалуйста, активируйте лицензию.",
          "Купить лицензию",
          "Ввести ключ",
        )
        .then((selection) => {
          if (selection === "Купить лицензию") {
            vscode.env.openExternal(
              vscode.Uri.parse(
                "https://liskin.lemonsqueezy.com/checkout/buy/886efdd8-90cc-4afd-856d-5d7b076ae9b7",
              ),
            );
          } else if (selection === "Ввести ключ") {
            vscode.commands.executeCommand("krl.activateLicense");
          }
        });
    }
  };
}

/**
 * Команда активации лицензии.
 */
async function activateLicenseCommand(context: vscode.ExtensionContext) {
  const key = await vscode.window.showInputBox({
    prompt: "Введите ваш лицензионный ключ KRL Extension (Lemon Squeezy)",
    placeHolder: "XXXX-XXXX-XXXX-XXXX",
    ignoreFocusOut: true,
  });

  if (!key || !key.trim()) return;

  await vscode.window.withProgress(
    {
      location: vscode.ProgressLocation.Notification,
      title: "Активация лицензии...",
      cancellable: false,
    },
    async () => {
      try {
        const response = await fetch(`${LEMON_SQUEEZY_API}/activate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            license_key: key.trim(),
            instance_name: vscode.env.machineId,
          }),
        });

        const data: any = await response.json();

        if (response.ok && data.activated) {
          const instanceId = data.instance?.id;
          const now = Date.now();

          // Сохраняем подписанный кэш
          const cacheData: LicenseCacheData = {
            key: key.trim(),
            instanceId: String(instanceId),
            lastValidated: now,
            expiresAt: now + OFFLINE_TTL_MS,
            machineFingerprint: vscode.env.machineId,
            valid: true,
          };
          await saveLicenseCache(context, cacheData);
          isPremiumCached = true;

          vscode.window.showInformationMessage(
            "🎉 Лицензия успешно активирована! Доступ ко всем премиум-функциям разблокирован. Офлайн-период: 30 дней.",
          );
        } else {
          const errorMsg =
            data.error || "Неверный ключ или превышен лимит устройств.";
          vscode.window.showErrorMessage(`Ошибка активации: ${errorMsg}`);
        }
      } catch (err: any) {
        vscode.window.showErrorMessage(
          `Сетевая ошибка при активации: ${err.message || err}`,
        );
      }
    },
  );
}

/**
 * Команда деактивации лицензии.
 */
async function deactivateLicenseCommand(context: vscode.ExtensionContext) {
  const cache = loadLicenseCache(context);

  if (!cache || !cache.key || !cache.instanceId) {
    vscode.window.showInformationMessage("Активная лицензия не найдена.");
    return;
  }

  const confirm = await vscode.window.showWarningMessage(
    "Вы уверены, что хотите деактивировать лицензию на этом устройстве?",
    "Да",
    "Нет",
  );

  if (confirm !== "Да") return;

  await vscode.window.withProgress(
    {
      location: vscode.ProgressLocation.Notification,
      title: "Деактивация лицензии...",
      cancellable: false,
    },
    async () => {
      try {
        await fetch(`${LEMON_SQUEEZY_API}/deactivate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            license_key: cache.key,
            instance_id: cache.instanceId,
          }),
        });
      } catch {
        // Даже если запрос не прошел, сбрасываем локальное состояние
      }

      await clearLicenseCache(context);
      isPremiumCached = false;

      vscode.window.showInformationMessage(
        "Лицензия успешно деактивирована для этого устройства.",
      );
    },
  );
}

/**
 * Команда проверки текущего статуса лицензии.
 */
function checkLicenseStatusCommand(context: vscode.ExtensionContext) {
  const cache = loadLicenseCache(context);

  if (!cache || !cache.key) {
    vscode.window.showInformationMessage(
      "Используется бесплатная базовая версия (Community Edition).",
    );
    return;
  }

  if (isPremium()) {
    const now = Date.now();
    const daysRemaining = Math.max(
      0,
      Math.ceil((cache.expiresAt - now) / (24 * 60 * 60 * 1000)),
    );
    const lastCheck = new Date(cache.lastValidated).toLocaleDateString();

    vscode.window.showInformationMessage(
      `✅ Лицензия активна (Premium). Последняя проверка: ${lastCheck}. Офлайн-доступ: ${daysRemaining} дн.`,
    );
  } else {
    vscode.window.showWarningMessage(
      "Лицензия неактивна или истёк офлайн-период. Подключитесь к интернету для ре-валидации.",
    );
  }
}

/**
 * Онлайн-валидация лицензии через API Lemon Squeezy.
 * Бросает исключение при сетевой ошибке.
 */
async function validateLicenseOnline(
  key: string,
  instanceId: string,
): Promise<boolean> {
  try {
    const response = await fetch(`${LEMON_SQUEEZY_API}/validate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        license_key: key,
        instance_id: instanceId,
      }),
    });

    const data: any = await response.json();
    return response.ok && data.valid === true;
  } catch {
    throw new Error("Сетевая ошибка при валидации лицензии");
  }
}
