import * as vscode from "vscode";

const LEMON_SQUEEZY_API = "https://api.lemonsqueezy.com/v1/licenses";

let isPremiumCached = false;

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

  // Проверяем сохраненную лицензию
  const key = context.globalState.get<string>("krl_license_key");
  const instanceId = context.globalState.get<string>("krl_license_instance_id");

  if (key && instanceId) {
    // Делаем фоновую валидацию
    try {
      const isValid = await validateLicenseOffline(key, instanceId);
      isPremiumCached = isValid;
    } catch {
      // При сетевой ошибке оставляем статус из кэша, чтобы пользователь не терял доступ без интернета
      isPremiumCached = context.globalState.get<boolean>(
        "krl_license_active_cached",
        false,
      );
    }
  } else {
    isPremiumCached = false;
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

          await context.globalState.update("krl_license_key", key.trim());
          await context.globalState.update(
            "krl_license_instance_id",
            String(instanceId),
          );
          await context.globalState.update("krl_license_active_cached", true);
          isPremiumCached = true;

          vscode.window.showInformationMessage(
            "🎉 Лицензия успешно активирована! Доступ ко всем премиум-функциям разблокирован.",
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
  const key = context.globalState.get<string>("krl_license_key");
  const instanceId = context.globalState.get<string>("krl_license_instance_id");

  if (!key || !instanceId) {
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
        const response = await fetch(`${LEMON_SQUEEZY_API}/deactivate`, {
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

        // Даже если запрос не прошел (например, ключ удален из панели управления),
        // мы все равно сбрасываем локальное состояние.
        await context.globalState.update("krl_license_key", undefined);
        await context.globalState.update("krl_license_instance_id", undefined);
        await context.globalState.update("krl_license_active_cached", false);
        isPremiumCached = false;

        vscode.window.showInformationMessage(
          "Лицензия успешно деактивирована для этого устройства.",
        );
      } catch (err: any) {
        vscode.window.showErrorMessage(
          `Сетевая ошибка при деактивации: ${err.message || err}`,
        );
      }
    },
  );
}

/**
 * Команда проверки текущего статуса лицензии.
 */
function checkLicenseStatusCommand(context: vscode.ExtensionContext) {
  const key = context.globalState.get<string>("krl_license_key");
  if (key) {
    if (isPremium()) {
      vscode.window.showInformationMessage(
        "Ваша лицензия KRL Extension активна (Premium-версия).",
      );
    } else {
      vscode.window.showWarningMessage(
        "Лицензия неактивна или истек срок действия подписки.",
      );
    }
  } else {
    vscode.window.showInformationMessage(
      "Используется бесплатная базовая версия (Community Edition).",
    );
  }
}

/**
 * Внутренний метод для проверки статуса лицензии на серверах Lemon Squeezy.
 */
async function validateLicenseOffline(
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
    throw new Error("Сетевая ошибка");
  }
}
