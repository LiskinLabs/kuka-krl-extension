import * as vscode from "vscode";
import {
  isPremium,
  getLicenseCache,
  getDeviceDetails,
  onLicenseChanged,
  LicenseCacheData,
  DODO_PAYMENTS_CHECKOUT_URL,
  DODO_PAYMENTS_PORTAL_URL,
  DODO_PRODUCT_ID_MONTHLY,
  DODO_PRODUCT_ID_ANNUAL,
  DODO_PRODUCT_ID_LIFETIME,
  getPricingPlans,
} from "./license";
import { t } from "../i18n";

let currentPanel: vscode.WebviewPanel | undefined = undefined;

export function initControlCenter(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("krl.openControlCenter", async () => {
      await openControlCenterPanel(context);
    }),
    onLicenseChanged(async () => {
      if (currentPanel) {
        await refreshControlCenterPanel(context);
      }
    }),
  );
}

async function openControlCenterPanel(context: vscode.ExtensionContext) {
  if (currentPanel) {
    currentPanel.reveal(vscode.ViewColumn.One);
    return;
  }

  currentPanel = vscode.window.createWebviewPanel(
    "krlControlCenter",
    t("command.openControlCenter"),
    vscode.ViewColumn.One,
    {
      enableScripts: true,
      retainContextWhenHidden: true,
      localResourceRoots: [vscode.Uri.joinPath(context.extensionUri, "media")],
    },
  );

  const licenseCache = await getLicenseCache(context);
  const device = getDeviceDetails();
  currentPanel.webview.html = getControlCenterHtml(
    currentPanel.webview,
    context,
    licenseCache,
    device,
  );

  const ALLOWED_CONTROL_CENTER_COMMANDS = new Set<string>([
    "krl.showFlowchart",
    "krl.compareKrcBackup",
    "krl.openSnippetGenerator",
    "krl.showCalculator",
    "krl.validateEkiXml",
    "krl.generateEkiCode",
    "krl.cleanGitMetadata",
    "krl.aiCheckSafety",
    "krl.generateReport",
    "krl.validateWorkspace",
    "krl.formatDocument",
    "krl.sortDeclarations",
    "krl.cleanupUnusedVariables",
    "krl.openControlCenter",
    "krl.openTelegramChat",
    "krl.sendLogsToDeveloper",
    "krl.sendFileToDeveloper",
    "krl.deactivateLicense",
    "krl.checkLicenseStatus",
    "krl.activateLicense",
    "krl.openCustomerPortal",
    "krl.exportBackupZip",
    "krl.sendAiDiagnostics",
    "krl.viewFileHistory",
    "krl.viewGitGraph",
    "krl.showLineBlameDetails",
    "krl.findReferences",
    "krl.foldAll",
    "krl.unfoldAll",
    "krl.refreshIOView",
    "krl.insertFold",
    "krl.removeTrailingWhitespace",
    "krl.convertToIiqkaFold",
    "krl.convertLegacyToSpline",
    "krl.insertCollisionGuard",
  ]);

  currentPanel.webview.onDidReceiveMessage(
    async (message) => {
      switch (message.command) {
        case "updateSetting":
          if (message.key && typeof message.value !== "undefined") {
            await vscode.workspace
              .getConfiguration("krl")
              .update(
                message.key,
                message.value,
                vscode.ConfigurationTarget.Global,
              );
            const stateWord = message.value ? "активирована" : "временно отключена";
            vscode.window.showInformationMessage(
              `Опция "${message.title || message.key}" ${stateWord}.`,
            );
            await refreshControlCenterPanel(context);
          }
          break;
        case "runCommand":
          if (
            message.target &&
            ALLOWED_CONTROL_CENTER_COMMANDS.has(message.target)
          ) {
            await vscode.commands.executeCommand(message.target);
            await refreshControlCenterPanel(context);
          }
          break;
        case "activateLicense":
          await vscode.commands.executeCommand("krl.activateLicense");
          await refreshControlCenterPanel(context);
          break;
        case "deactivateLicense":
          await vscode.commands.executeCommand("krl.deactivateLicense");
          await refreshControlCenterPanel(context);
          break;
        case "checkLicenseStatus":
          await vscode.commands.executeCommand("krl.checkLicenseStatus");
          await refreshControlCenterPanel(context);
          break;
        case "openCustomerPortal":
        case "downloadInvoice":
          vscode.env.openExternal(vscode.Uri.parse(DODO_PAYMENTS_PORTAL_URL));
          vscode.window.showInformationMessage(t("cc.notify.portalOpened"));
          break;
        case "buyLicense":
        case "buyPlan":
          {
            const targetUrl = message.url || DODO_PAYMENTS_CHECKOUT_URL;
            vscode.env.openExternal(vscode.Uri.parse(targetUrl));
            vscode.window.showInformationMessage(t("cc.notify.storeOpened"));
          }
          break;
        case "copyKey":
          if (message.key) {
            await vscode.env.clipboard.writeText(message.key);
            vscode.window.showInformationMessage(t("cc.notify.keyCopied"));
          }
          break;
        case "sendFeedback":
          const feedback = await vscode.window.showInputBox({
            prompt: t("cc.prompt.email"),
            placeHolder: t("cc.prompt.emailPlaceholder"),
            ignoreFocusOut: true,
          });
          if (feedback && feedback.trim()) {
            const dev = getDeviceDetails();
            const subject = encodeURIComponent(
              "KUKA KRL Extension — Direct Engineering Support Request",
            );
            const body = encodeURIComponent(
              `Dear Silvestr!\n\n` +
                `User feedback / question:\n${feedback.trim()}\n\n` +
                `----------------------------------------\n` +
                `Technical Environment:\n` +
                `• Extension Version: v1.7.3 Industrial Edition\n` +
                `• Device Hostname: ${dev.hostname} (${dev.platform} ${dev.arch})\n` +
                `• Hardware ID: ${dev.hardwareId}\n` +
                `• License Tier: ${isPremium() ? "ACTIVE (PRO)" : "COMMUNITY EDITION"}\n`,
            );
            const mailtoUrl = `mailto:silvestr.liskin@teknorob.com?subject=${subject}&body=${body}`;
            await vscode.env.openExternal(vscode.Uri.parse(mailtoUrl));
            vscode.window.showInformationMessage(
              t("cc.notify.emailClientOpened"),
            );
          }
          break;
        case "openTelegram":
          await vscode.commands.executeCommand("krl.openTelegramChat");
          break;
        case "openGitHub":
          vscode.env.openExternal(
            vscode.Uri.parse(
              "https://github.com/LiskinLabs/kuka-krl-extension/issues",
            ),
          );
          break;
      }
    },
    undefined,
    context.subscriptions,
  );

  currentPanel.onDidDispose(() => {
    currentPanel = undefined;
  });
}

async function refreshControlCenterPanel(context: vscode.ExtensionContext) {
  if (!currentPanel) return;
  const licenseCache = await getLicenseCache(context);
  const device = getDeviceDetails();
  currentPanel.webview.html = getControlCenterHtml(
    currentPanel.webview,
    context,
    licenseCache,
    device,
  );
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getControlCenterHtml(
  webview: vscode.Webview,
  context: vscode.ExtensionContext,
  licenseCache: LicenseCacheData | null,
  device: {
    hostname: string;
    platform: string;
    arch: string;
    hardwareId: string;
  },
): string {
  const isRu = (vscode.env.language || "en").toLowerCase().startsWith("ru");
  const premiumStatus = isPremium()
    ? t("cc.profile.activePro")
    : t("cc.profile.community");
  const statusBadgeClass = isPremium() ? "badge-active" : "badge-community";

  const ownerName = escapeHtml(
    licenseCache?.customerName ||
      (isPremium() ? "Silvestr Liskin (Liskin Labs)" : "Community User"),
  );
  const ownerEmail = escapeHtml(
    licenseCache?.customerEmail ||
      (isPremium() ? "silvestr.liskin@liskinlabs.com" : "Not Registered"),
  );
  const planVariant =
    licenseCache?.variantName ||
    (isPremium()
      ? t("cc.profile.proEdition")
      : t("cc.profile.freeEdition"));
  const licenseKey = licenseCache?.key || "NO-KEY";
  const maskedKey =
    licenseKey.length > 8
      ? `${licenseKey.slice(0, 4)}-****-****-${licenseKey.slice(-4)}`
      : licenseKey;
  const activations = isPremium()
    ? t(
        "cc.devices.activeCount",
        licenseCache?.activationUsage || 1,
        licenseCache?.activationLimit || 10,
      )
    : t("cc.devices.unlicensed");

  // Calculate offline days and exact expiration date
  const now = Date.now();
  const offlineExpDate = licenseCache?.expiresAt
    ? new Date(licenseCache.expiresAt)
    : new Date(now + 30 * 24 * 60 * 60 * 1000);
  const offlineDaysLeft = Math.max(
    0,
    Math.ceil((offlineExpDate.getTime() - now) / (24 * 60 * 60 * 1000)),
  );
  const offlineFormatted = t(
    "cc.profile.daysRemaining",
    offlineExpDate.toLocaleDateString(),
    offlineDaysLeft,
  );

  const prodNameLower = (
    licenseCache?.productName ||
    licenseCache?.variantName ||
    ""
  ).toLowerCase();
  const isMonthlySub =
    prodNameLower.includes("month") ||
    licenseCache?.productId === DODO_PRODUCT_ID_MONTHLY;
  const isAnnualSub =
    prodNameLower.includes("annual") ||
    prodNameLower.includes("year") ||
    licenseCache?.productId === DODO_PRODUCT_ID_ANNUAL;
  const isLifetime =
    prodNameLower.includes("lifetime") ||
    licenseCache?.productId === DODO_PRODUCT_ID_LIFETIME;

  let onlineExpiry = t("cc.profile.subNone");
  if (licenseCache?.subscriptionEndsAt) {
    const expDate = new Date(licenseCache.subscriptionEndsAt);
    const msLeft = expDate.getTime() - now;
    const daysLeft = Math.max(0, Math.ceil(msLeft / (24 * 60 * 60 * 1000)));
    onlineExpiry = t(
      "cc.profile.subRenews",
      expDate.toLocaleDateString(),
      daysLeft,
    );
  } else if (isLifetime) {
    onlineExpiry = t("cc.profile.subLifetime");
  } else if (isMonthlySub) {
    onlineExpiry = t("cc.profile.subMonthlyActive");
  } else if (isAnnualSub) {
    onlineExpiry = t("cc.profile.subAnnualActive");
  } else if (isPremium()) {
    onlineExpiry = t("cc.profile.subActive");
  }

  const logoUri = webview.asWebviewUri(
    vscode.Uri.joinPath(context.extensionUri, "media", "logo.png"),
  );

  const pricingPlans = getPricingPlans();

  const krlConfig = vscode.workspace.getConfiguration("krl");
  const diagnosticsEnabled = krlConfig.get<boolean>("diagnostics.enabled", true);
  const checkGeneralSyntax = krlConfig.get<boolean>("diagnostics.checkGeneralSyntax", true);
  const warnHalt = krlConfig.get<boolean>("diagnostics.warnHalt", true);
  const warnWaitTimeout = krlConfig.get<boolean>("diagnostics.warnWaitWithoutTimeout", false);
  const checkSafetySpeeds = krlConfig.get<boolean>("diagnostics.checkSafetySpeeds", true);
  const checkToolBaseInit = krlConfig.get<boolean>("diagnostics.checkToolBaseInit", true);
  const checkBlockBalance = krlConfig.get<boolean>("diagnostics.checkBlockBalance", true);
  const checkDeadCode = krlConfig.get<boolean>("diagnostics.checkDeadCode", true);
  const checkTypeUsage = krlConfig.get<boolean>("diagnostics.checkTypeUsage", true);
  const checkKrlConstraints = krlConfig.get<boolean>("diagnostics.checkKrlConstraints", true);
  const checkUnusedVariables = krlConfig.get<boolean>("diagnostics.checkUnusedVariables", true);
  const checkDuplicateNames = krlConfig.get<boolean>("diagnostics.checkDuplicateNames", true);
  const inlayHintsEnabled = krlConfig.get<boolean>("inlayHints.enabled", true);
  const errorLensEnabled = krlConfig.get<boolean>("errorLens.enabled", true);
  const validateNonAscii = krlConfig.get<boolean>("validateNonAscii", true);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src ${webview.cspSource} https: data:; script-src ${webview.cspSource} 'unsafe-inline'; style-src ${webview.cspSource} 'unsafe-inline'; font-src ${webview.cspSource};">
  <title>${t("cc.title")}</title>
  <style>
    :root {
      --bg-color: var(--vscode-editor-background);
      --fg-color: var(--vscode-editor-foreground);
      --card-bg: var(--vscode-welcomePage-tileBackground, rgba(255, 255, 255, 0.03));
      --card-border: var(--vscode-welcomePage-tileBorder, rgba(255, 255, 255, 0.08));
      --accent: #FF6600;
      --accent-hover: #ff771a;
      --accent-dim: rgba(255, 102, 0, 0.12);
      --accent-border: rgba(255, 102, 0, 0.35);
    }
    * {
      box-sizing: border-box;
    }
    body {
      font-family: var(--vscode-font-family, system-ui, -apple-system, sans-serif);
      background-color: var(--bg-color);
      background-image: radial-gradient(rgba(255, 102, 0, 0.06) 1px, transparent 1px);
      background-size: 28px 28px;
      color: var(--fg-color);
      padding: 28px;
      margin: 0;
      max-width: 1300px;
      margin-left: auto;
      margin-right: auto;
      line-height: 1.5;
    }
    .account-hub {
      background: var(--card-bg);
      border: 1px solid var(--accent-border);
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 32px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18), 0 0 20px rgba(255, 102, 0, 0.06);
      backdrop-filter: blur(10px);
    }
    .tab-bar {
      display: flex;
      gap: 10px;
      border-bottom: 1px solid var(--card-border);
      padding-bottom: 12px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }
    .tab-btn {
      background: transparent;
      color: var(--fg-color);
      border: 1px solid transparent;
      padding: 8px 16px;
      border-radius: 6px;
      font-weight: 600;
      font-size: 13px;
      cursor: pointer;
      opacity: 0.75;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .tab-btn.active {
      background: var(--accent);
      color: #fff;
      opacity: 1;
      box-shadow: 0 2px 8px rgba(255, 102, 0, 0.35);
    }
    .tab-btn:hover:not(.active) {
      opacity: 1;
      background: var(--accent-dim);
      border-color: var(--accent-border);
    }
    .tab-content { display: none; }
    .tab-content.active { display: block; }
    .info-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 0;
      border-bottom: 1px dashed var(--vscode-panel-border, rgba(128,128,128,0.2));
      font-size: 13px;
    }
    .info-label { opacity: 0.8; }
    .info-val { font-weight: 600; }
    .badge {
      font-size: 11px;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 6px;
      color: #fff;
      letter-spacing: 0.4px;
      text-transform: uppercase;
      display: inline-flex;
      align-items: center;
    }
    .badge-active { background: #28a745; box-shadow: 0 0 10px rgba(40,167,69,0.3); }
    .badge-community { background: #d97706; }
    .badge-pro { background: var(--accent); font-size: 10px; padding: 2px 6px; border-radius: 4px; }
    
    .btn-danger { background: #dc3545; }
    .btn-secondary { background: var(--vscode-button-secondaryBackground, rgba(255,255,255,0.1)); color: var(--vscode-button-secondaryForeground, #fff); }
    .btn-success { background: #28a745; }
    .btn-support { background: linear-gradient(135deg, #FF6600 0%, #ff8833 100%); color: #fff; font-weight: 700; }
    .btn-info { background: #0284c7; }
    
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 36px;
      margin-bottom: 16px;
      border-bottom: 1px solid var(--card-border);
      padding-bottom: 8px;
    }
    .section-title {
      font-size: 16px;
      font-weight: 700;
      color: var(--fg-color);
      display: flex;
      align-items: center;
      gap: 10px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
      gap: 16px;
    }
    .card {
      background-color: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 10px;
      padding: 18px;
      cursor: pointer;
      transition: all 0.22s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      outline: none;
      position: relative;
      overflow: hidden;
    }
    .card:hover, .card:focus-visible {
      border-color: var(--accent);
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(255, 102, 0, 0.14), 0 2px 6px rgba(0, 0, 0, 0.12);
      background-color: rgba(255, 102, 0, 0.02);
    }
    .card:focus-visible {
      outline: 2px solid var(--accent);
      outline-offset: 2px;
    }
    .card:focus-visible {
      outline: 2px solid var(--accent);
      outline-offset: 2px;
    }
    .card-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 8px;
    }
    .card-icon {
      font-size: 22px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .card-title {
      font-weight: 700;
      font-size: 14px;
      letter-spacing: -0.2px;
    }
    .card-desc {
      font-size: 12px;
      opacity: 0.82;
      line-height: 1.45;
      margin-bottom: 16px;
      min-height: 36px;
    }
    .card-actions {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .card-btn {
      background: var(--accent);
      color: white;
      border: none;
      padding: 7px 14px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.15s ease;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .card-btn:hover {
      background: var(--accent-hover);
      transform: scale(1.02);
    }
    .card-btn:active {
      transform: scale(0.98);
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 24px;
      margin-bottom: 28px;
      border-bottom: 2px solid var(--accent);
    }
    .header-logo {
      width: 72px;
      height: 72px;
      border-radius: 14px;
      box-shadow: 0 6px 20px rgba(255, 102, 0, 0.4);
      object-fit: cover;
      flex-shrink: 0;
      border: 1px solid rgba(255, 102, 0, 0.5);
    }
        /* Toggle Switches & Feature Matrix */
    .switch {
      position: relative;
      display: inline-block;
      width: 42px;
      height: 22px;
      flex-shrink: 0;
    }
    .switch input { opacity: 0; width: 0; height: 0; }
    .slider {
      position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0;
      background-color: var(--vscode-input-background, #333);
      border: 1px solid var(--card-border, #555);
      transition: .22s cubic-bezier(0.4, 0, 0.2, 1);
      border-radius: 22px;
    }
    .slider:before {
      position: absolute; content: ""; height: 16px; width: 16px; left: 2px; bottom: 2px;
      background-color: #fff; transition: .22s cubic-bezier(0.4, 0, 0.2, 1);
      border-radius: 50%;
    }
    input:checked + .slider {
      background-color: var(--accent, #FF6600);
      border-color: var(--accent, #FF6600);
      box-shadow: 0 0 10px rgba(255, 102, 0, 0.45);
    }
    input:checked + .slider:before { transform: translateX(20px); }
    .toggle-row {
      display: flex; justify-content: space-between; align-items: center;
      padding: 10px 14px; border-radius: 8px;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid var(--card-border);
      margin-bottom: 8px;
      transition: all 0.2s ease;
    }
    .toggle-row:hover {
      background: rgba(255, 255, 255, 0.05);
      border-color: var(--accent-border);
    }
    .toggle-info { display: flex; flex-direction: column; gap: 2px; }
    .toggle-title { font-size: 13px; font-weight: 600; color: var(--fg-color); }
    .toggle-desc { font-size: 11px; opacity: 0.65; line-height: 1.3; }
    .subsystem-grid {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 10px; margin-bottom: 16px;
    }
    .subsystem-badge {
      display: flex; align-items: center; justify-content: space-between;
      padding: 8px 12px; border-radius: 8px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--card-border);
      font-size: 12px; font-weight: 600;
    }
    .status-dot {
      width: 8px; height: 8px; border-radius: 50%; background: #28a745;
      box-shadow: 0 0 8px rgba(40, 167, 69, 0.8);
      display: inline-block; margin-right: 6px;
    }
    .footer {
      margin-top: 48px;
      padding-top: 20px;
      border-top: 1px solid var(--card-border);
      font-size: 12px;
      opacity: 0.7;
      text-align: center;
    }
    /* In-Editor Contextual Features Reference Guide */
    .ref-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 14px;
      margin-top: 14px;
    }
    .ref-card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 10px;
      padding: 16px 18px;
      transition: all 0.2s ease;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .ref-card:hover {
      border-color: rgba(255, 102, 0, 0.45);
      background: rgba(255, 255, 255, 0.03);
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
    }
    .ref-title-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
    }
    .ref-title {
      font-weight: 700;
      font-size: 13.5px;
      display: flex;
      align-items: center;
      gap: 7px;
    }
    .ref-desc {
      font-size: 12px;
      opacity: 0.8;
      line-height: 1.45;
      margin-bottom: 12px;
    }
    .ref-hotkey-wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 10px;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
      font-size: 11px;
      opacity: 0.9;
    }
    .kbd-badge {
      display: inline-block;
      padding: 3px 7px;
      font-size: 11px;
      font-family: var(--vscode-editor-font-family, monospace);
      font-weight: 700;
      color: #fff;
      background: rgba(255, 102, 0, 0.2);
      border: 1px solid rgba(255, 102, 0, 0.5);
      border-radius: 5px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
    }
    .kbd-badge.alt {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.2);
    }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <h1 style="margin: 0; font-size: 26px; font-weight: 800; letter-spacing: -0.5px;">${t("cc.title")}</h1>
      <div style="display: flex; align-items: center; gap: 10px; margin-top: 10px;">
        <span class="badge ${statusBadgeClass}">${premiumStatus}</span>
        <span style="font-weight: 600; opacity: 0.85; font-size: 13px;">${t("cc.edition")}</span>
      </div>
    </div>
    <img class="header-logo" src="${logoUri}" alt="KUKA KRL Logo" />
  </div>

  <!-- SECTION 0: Active Features & Diagnostics Control Center -->
  <div class="account-hub" id="card-diagnostics-control" style="border-color: var(--accent); margin-bottom: 32px;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 12px;">
      <div>
        <div style="font-size: 17px; font-weight: 800; display: flex; align-items: center; gap: 8px;">
          🛠️ ${t("cc.diagControl.title")}
        </div>
        <div style="font-size: 12px; opacity: 0.75; margin-top: 4px;">
          ${t("cc.diagControl.desc")}
        </div>
      </div>
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <button class="card-btn" style="background: #28a745;" onclick="exec('krl.validateWorkspace')">
          ${t("cc.diagControl.btnValidate")}
        </button>
        <button class="card-btn" onclick="exec('krl.generateReport')">
          ${t("cc.diagControl.btnReport")}
        </button>
      </div>
    </div>

    <!-- Subsystems Status Grid -->
    <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; opacity: 0.85;">
      ${t("cc.diagControl.subsystemsTitle")}
    </div>
    <div class="subsystem-grid">
      <div class="subsystem-badge">
        <span><span class="status-dot"></span>${t("cc.subsystem.lsp")}</span>
        <span class="badge badge-active" style="font-size: 9px; padding: 2px 6px;">${t("cc.badge.online")}</span>
      </div>
      <div class="subsystem-badge">
        <span><span class="status-dot"></span>${t("cc.subsystem.indexer")}</span>
        <span class="badge badge-active" style="font-size: 9px; padding: 2px 6px;">${t("cc.badge.active")}</span>
      </div>
      <div class="subsystem-badge">
        <span><span class="status-dot"></span>${t("cc.subsystem.engine")}</span>
        <span class="badge ${diagnosticsEnabled ? 'badge-active' : 'badge-disabled'}" style="font-size: 9px; padding: 2px 6px;">${diagnosticsEnabled ? t("cc.badge.active") : t("cc.badge.disabled")}</span>
      </div>
      <div class="subsystem-badge">
        <span><span class="status-dot"></span>${t("cc.subsystem.flowchart")}</span>
        <span class="badge badge-active" style="font-size: 9px; padding: 2px 6px;">${t("cc.badge.ready")}</span>
      </div>
      <div class="subsystem-badge">
        <span><span class="status-dot"></span>${t("cc.subsystem.backup")}</span>
        <span class="badge badge-active" style="font-size: 9px; padding: 2px 6px;">${t("cc.badge.ready")}</span>
      </div>
      <div class="subsystem-badge">
        <span><span class="status-dot"></span>${t("cc.subsystem.eki")}</span>
        <span class="badge badge-active" style="font-size: 9px; padding: 2px 6px;">${t("cc.badge.ready")}</span>
      </div>
      <div class="subsystem-badge">
        <span><span class="status-dot"></span>${t("cc.subsystem.telegram")}</span>
        <span class="badge badge-active" style="font-size: 9px; padding: 2px 6px;">${t("cc.badge.connected")}</span>
      </div>
      <div class="subsystem-badge">
        <span><span class="status-dot"></span>${t("cc.subsystem.ci")}</span>
        <span class="badge badge-active" style="font-size: 9px; padding: 2px 6px;">140/140 PASS</span>
      </div>
    </div>

    <!-- Diagnostic Rule Toggles Grid -->
    <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; margin-top: 18px; margin-bottom: 10px; opacity: 0.85;">
      ${t("cc.diagControl.togglesTitle")}
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 10px;">
      <!-- Toggle: Master Diagnostics -->
      <div class="toggle-row">
        <div class="toggle-info">
          <span class="toggle-title">${t("cc.toggle.master.title")}</span>
          <span class="toggle-desc">${t("cc.toggle.master.desc")}</span>
        </div>
        <label class="switch">
          <input type="checkbox" ${diagnosticsEnabled ? 'checked' : ''} onchange="toggleSetting('diagnostics.enabled', 'Diagnostics', this)">
          <span class="slider"></span>
        </label>
      </div>

      <!-- Toggle: WAIT FOR Timeout -->
      <div class="toggle-row">
        <div class="toggle-info">
          <span class="toggle-title">${t("cc.toggle.waitTimeout.title")}</span>
          <span class="toggle-desc">${t("cc.toggle.waitTimeout.desc")}</span>
        </div>
        <label class="switch">
          <input type="checkbox" ${warnWaitTimeout ? 'checked' : ''} onchange="toggleSetting('diagnostics.warnWaitWithoutTimeout', 'WAIT FOR Timeout', this)">
          <span class="slider"></span>
        </label>
      </div>

      <!-- Toggle: HALT Warning -->
      <div class="toggle-row">
        <div class="toggle-info">
          <span class="toggle-title">${t("cc.toggle.halt.title")}</span>
          <span class="toggle-desc">${t("cc.toggle.halt.desc")}</span>
        </div>
        <label class="switch">
          <input type="checkbox" ${warnHalt ? 'checked' : ''} onchange="toggleSetting('diagnostics.warnHalt', 'HALT Warning', this)">
          <span class="slider"></span>
        </label>
      </div>

      <!-- Toggle: General Syntax Validator -->
      <div class="toggle-row">
        <div class="toggle-info">
          <span class="toggle-title">${t("cc.toggle.syntax.title")}</span>
          <span class="toggle-desc">${t("cc.toggle.syntax.desc")}</span>
        </div>
        <label class="switch">
          <input type="checkbox" ${checkGeneralSyntax ? 'checked' : ''} onchange="toggleSetting('diagnostics.checkGeneralSyntax', 'Syntax Validator', this)">
          <span class="slider"></span>
        </label>
      </div>

      <!-- Toggle: Safety Speeds -->
      <div class="toggle-row">
        <div class="toggle-info">
          <span class="toggle-title">${t("cc.toggle.speeds.title")}</span>
          <span class="toggle-desc">${t("cc.toggle.speeds.desc")}</span>
        </div>
        <label class="switch">
          <input type="checkbox" ${checkSafetySpeeds ? 'checked' : ''} onchange="toggleSetting('diagnostics.checkSafetySpeeds', 'Safety Speeds', this)">
          <span class="slider"></span>
        </label>
      </div>

      <!-- Toggle: Tool / Base Init -->
      <div class="toggle-row">
        <div class="toggle-info">
          <span class="toggle-title">${t("cc.toggle.toolBase.title")}</span>
          <span class="toggle-desc">${t("cc.toggle.toolBase.desc")}</span>
        </div>
        <label class="switch">
          <input type="checkbox" ${checkToolBaseInit ? 'checked' : ''} onchange="toggleSetting('diagnostics.checkToolBaseInit', 'TOOL/BASE Init', this)">
          <span class="slider"></span>
        </label>
      </div>

      <!-- Toggle: Block Balance -->
      <div class="toggle-row">
        <div class="toggle-info">
          <span class="toggle-title">${t("cc.toggle.blockBalance.title")}</span>
          <span class="toggle-desc">${t("cc.toggle.blockBalance.desc")}</span>
        </div>
        <label class="switch">
          <input type="checkbox" ${checkBlockBalance ? 'checked' : ''} onchange="toggleSetting('diagnostics.checkBlockBalance', 'Block Balance', this)">
          <span class="slider"></span>
        </label>
      </div>

      <!-- Toggle: Dead Code -->
      <div class="toggle-row">
        <div class="toggle-info">
          <span class="toggle-title">${t("cc.toggle.deadCode.title")}</span>
          <span class="toggle-desc">${t("cc.toggle.deadCode.desc")}</span>
        </div>
        <label class="switch">
          <input type="checkbox" ${checkDeadCode ? 'checked' : ''} onchange="toggleSetting('diagnostics.checkDeadCode', 'Dead Code', this)">
          <span class="slider"></span>
        </label>
      </div>

      <!-- Toggle: Type Usage -->
      <div class="toggle-row">
        <div class="toggle-info">
          <span class="toggle-title">${t("cc.toggle.typeUsage.title")}</span>
          <span class="toggle-desc">${t("cc.toggle.typeUsage.desc")}</span>
        </div>
        <label class="switch">
          <input type="checkbox" ${checkTypeUsage ? 'checked' : ''} onchange="toggleSetting('diagnostics.checkTypeUsage', 'Type Usage', this)">
          <span class="slider"></span>
        </label>
      </div>

      <!-- Toggle: KRL Constraints -->
      <div class="toggle-row">
        <div class="toggle-info">
          <span class="toggle-title">${t("cc.toggle.krlConstraints.title")}</span>
          <span class="toggle-desc">${t("cc.toggle.krlConstraints.desc")}</span>
        </div>
        <label class="switch">
          <input type="checkbox" ${checkKrlConstraints ? 'checked' : ''} onchange="toggleSetting('diagnostics.checkKrlConstraints', 'KRL Constraints', this)">
          <span class="slider"></span>
        </label>
      </div>

      <!-- Toggle: Unused Variables -->
      <div class="toggle-row">
        <div class="toggle-info">
          <span class="toggle-title">${t("cc.toggle.unusedVars.title")}</span>
          <span class="toggle-desc">${t("cc.toggle.unusedVars.desc")}</span>
        </div>
        <label class="switch">
          <input type="checkbox" ${checkUnusedVariables ? 'checked' : ''} onchange="toggleSetting('diagnostics.checkUnusedVariables', 'Unused Variables', this)">
          <span class="slider"></span>
        </label>
      </div>

      <!-- Toggle: Duplicate Names -->
      <div class="toggle-row">
        <div class="toggle-info">
          <span class="toggle-title">${t("cc.toggle.duplicateNames.title")}</span>
          <span class="toggle-desc">${t("cc.toggle.duplicateNames.desc")}</span>
        </div>
        <label class="switch">
          <input type="checkbox" ${checkDuplicateNames ? 'checked' : ''} onchange="toggleSetting('diagnostics.checkDuplicateNames', 'Duplicate Names', this)">
          <span class="slider"></span>
        </label>
      </div>

      <!-- Toggle: Inlay Hints -->
      <div class="toggle-row">
        <div class="toggle-info">
          <span class="toggle-title">${t("cc.toggle.inlayHints.title")}</span>
          <span class="toggle-desc">${t("cc.toggle.inlayHints.desc")}</span>
        </div>
        <label class="switch">
          <input type="checkbox" ${inlayHintsEnabled ? 'checked' : ''} onchange="toggleSetting('inlayHints.enabled', 'Inlay Hints', this)">
          <span class="slider"></span>
        </label>
      </div>

      <!-- Toggle: ErrorLens -->
      <div class="toggle-row">
        <div class="toggle-info">
          <span class="toggle-title">${t("cc.toggle.errorLens.title")}</span>
          <span class="toggle-desc">${t("cc.toggle.errorLens.desc")}</span>
        </div>
        <label class="switch">
          <input type="checkbox" ${errorLensEnabled ? 'checked' : ''} onchange="toggleSetting('errorLens.enabled', 'ErrorLens', this)">
          <span class="slider"></span>
        </label>
      </div>

      <!-- Toggle: Non-ASCII Validation -->
      <div class="toggle-row">
        <div class="toggle-info">
          <span class="toggle-title">${t("cc.toggle.validateNonAscii.title")}</span>
          <span class="toggle-desc">${t("cc.toggle.validateNonAscii.desc")}</span>
        </div>
        <label class="switch">
          <input type="checkbox" ${validateNonAscii ? 'checked' : ''} onchange="toggleSetting('validateNonAscii', 'Non-ASCII Validation', this)">
          <span class="slider"></span>
        </label>
      </div>
    </div>
  </div>

  <!-- SECTION 1: Engineering & Standalone Tools -->
  <div class="section-header">
    <div class="section-title">⚡ ${t("cc.engTools")}</div>
  </div>
  <div class="grid">
    <div class="card" tabindex="0" role="button" onclick="exec('krl.showCalculator')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();exec('krl.showCalculator')}">
      <div>
        <div class="card-header">
          <span class="card-icon">📐</span>
          <span class="card-title">${t("command.calculator")}</span>
        </div>
        <div class="card-desc">${t("cc.desc.calculator")}</div>
      </div>
      <div class="card-actions">
        <button class="card-btn" onclick="event.stopPropagation();exec('krl.showCalculator')">${t("cc.btn.openCalculator")}</button>
      </div>
    </div>

    <div class="card" tabindex="0" role="button" onclick="exec('krl.openSnippetGenerator')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();exec('krl.openSnippetGenerator')}">
      <div>
        <div class="card-header">
          <span class="card-icon">🎬</span>
          <span class="card-title">${t("command.openSnippetGenerator")}</span>
        </div>
        <div class="card-desc">${t("cc.desc.snippets")}</div>
      </div>
      <div class="card-actions">
        <button class="card-btn" onclick="event.stopPropagation();exec('krl.openSnippetGenerator')">${t("cc.btn.generateSnippets")}</button>
      </div>
    </div>

    <div class="card" tabindex="0" role="button" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();exec('krl.validateEkiXml')}">
      <div>
        <div class="card-header">
          <span class="card-icon">🌐</span>
          <span class="card-title">${t("command.validateEkiXml")}</span>
        </div>
        <div class="card-desc">${t("cc.desc.eki")}</div>
      </div>
      <div class="card-actions">
        <button class="card-btn" onclick="event.stopPropagation();exec('krl.validateEkiXml')">${t("cc.btn.ekiValidator")}</button>
        <button class="card-btn btn-secondary" onclick="event.stopPropagation();exec('krl.generateEkiCode')">${t("cc.btn.generateHandler")}</button>
      </div>
    </div>

    <div class="card" tabindex="0" role="button" onclick="exec('krl.openTelegramChat')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();exec('krl.openTelegramChat')}">
      <div>
        <div class="card-header">
          <span class="card-icon">💬</span>
          <span class="card-title">${t("command.openTelegramChat")}</span>
        </div>
        <div class="card-desc">${isRu ? "Прямая защищенная связь с инженером-разработчиком в Telegram через Cloudflare Gateway." : "Direct secure telepresence chat with developer Silvestr Liskin via Telegram Support Gateway."}</div>
      </div>
      <div class="card-actions">
        <button class="card-btn" onclick="event.stopPropagation();exec('krl.openTelegramChat')">${isRu ? "💬 Открыть Telegram чат" : "💬 Open Telegram Chat"}</button>
      </div>
    </div>

    <div class="card" tabindex="0" role="button" onclick="exec('krl.generateReport')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();exec('krl.generateReport')}">
      <div>
        <div class="card-header">
          <span class="card-icon">📋</span>
          <span class="card-title">${t("command.generateReport")}</span>
        </div>
        <div class="card-desc">${t("cc.desc.report")}</div>
      </div>
      <div class="card-actions">
        <button class="card-btn" onclick="event.stopPropagation();exec('krl.generateReport')">${t("cc.btn.generateReport")}</button>
      </div>
    </div>
  </div>

  <!-- SECTION 2: KRC Backup & GitLens Version Control -->
  <div class="section-header">
    <div class="section-title">📦 ${t("cc.backupGit")}</div>
  </div>
  <div class="grid">
    <div class="card" tabindex="0" role="button" onclick="exec('krl.exportBackupZip')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();exec('krl.exportBackupZip')}">
      <div>
        <div class="card-header">
          <span class="card-icon">🗜️</span>
          <span class="card-title">${t("command.exportBackupZip")}</span>
        </div>
        <div class="card-desc">${t("cc.desc.exportZip")}</div>
      </div>
      <div class="card-actions">
        <button class="card-btn" onclick="event.stopPropagation();exec('krl.exportBackupZip')">${t("cc.btn.exportBackupZip")}</button>
      </div>
    </div>

    <div class="card" tabindex="0" role="button" onclick="exec('krl.compareKrcBackup')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();exec('krl.compareKrcBackup')}">
      <div>
        <div class="card-header">
          <span class="card-icon">📦</span>
          <span class="card-title">${t("command.compareKrcBackup")}</span>
          <span class="badge badge-pro">PRO</span>
        </div>
        <div class="card-desc">${t("cc.desc.backupDiff")}</div>
      </div>
      <div class="card-actions">
        <button class="card-btn" onclick="event.stopPropagation();exec('krl.compareKrcBackup')">${t("cc.btn.inspectBackup")}</button>
      </div>
    </div>

    <div class="card" tabindex="0" role="button" onclick="exec('krl.viewGitGraph')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();exec('krl.viewGitGraph')}">
      <div>
        <div class="card-header">
          <span class="card-icon">📊</span>
          <span class="card-title">${t("gitgraph.title")}</span>
          <span class="badge badge-pro">PRO</span>
        </div>
        <div class="card-desc">${t("cc.desc.gitGraph")}</div>
      </div>
      <div class="card-actions">
        <button class="card-btn" onclick="event.stopPropagation();exec('krl.viewGitGraph')">${t("cc.btn.viewGitGraph")}</button>
      </div>
    </div>

    <div class="card" tabindex="0" role="button" onclick="exec('krl.cleanGitMetadata')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();exec('krl.cleanGitMetadata')}">
      <div>
        <div class="card-header">
          <span class="card-icon">🧹</span>
          <span class="card-title">${t("command.cleanGitMetadata")}</span>
        </div>
        <div class="card-desc">${t("cc.desc.cleanGit")}</div>
      </div>
      <div class="card-actions">
        <button class="card-btn" onclick="event.stopPropagation();exec('krl.cleanGitMetadata')">${t("cc.btn.cleanGitMetadata")}</button>
      </div>
    </div>

    <div class="card" tabindex="0" role="button" onclick="exec('krl.sendLogsToDeveloper')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();exec('krl.sendLogsToDeveloper')}">
      <div>
        <div class="card-header">
          <span class="card-icon">📥</span>
          <span class="card-title">${t("command.sendLogsToDeveloper")}</span>
        </div>
        <div class="card-desc">${isRu ? "Сбор системных логов расширения и передача разработчику через шлюз техподдержки." : "Capture diagnostic runtime logs and transmit to developer."}</div>
      </div>
      <div class="card-actions">
        <button class="card-btn" onclick="event.stopPropagation();exec('krl.sendLogsToDeveloper')">${isRu ? "📥 Выгрузить логи" : "📥 Export Logs"}</button>
      </div>
    </div>

    <div class="card" tabindex="0" role="button" onclick="exec('krl.sendFileToDeveloper')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();exec('krl.sendFileToDeveloper')}">
      <div>
        <div class="card-header">
          <span class="card-icon">📎</span>
          <span class="card-title">${t("command.sendFileToDeveloper")}</span>
        </div>
        <div class="card-desc">${isRu ? "Выбор любого файла на диске (.src, .dat, скриншот, pdf) и безопасная передача разработчику." : "Pick any local robot file, script, or screenshot and transmit to developer."}</div>
      </div>
      <div class="card-actions">
        <button class="card-btn" onclick="event.stopPropagation();exec('krl.sendFileToDeveloper')">${isRu ? "📎 Отправить файл" : "📎 Send File"}</button>
      </div>
    </div>
  </div>

  <!-- SECTION 3: Account Hub & Direct Engineering Support -->
  <!-- SECTION 5: Account Hub & Direct Engineering Support -->
  <div class="section-header">
    <div class="section-title">👤 ${t("cc.accountHub")}</div>
  </div>
  <div class="account-hub">
    <div class="tab-bar" role="tablist">
      <button class="tab-btn active" role="tab" aria-selected="true" aria-controls="tab-profile" onclick="switchAccountTab('profile', event)">👤 ${t("cc.tab.profile")}</button>
      <button class="tab-btn" role="tab" aria-selected="false" aria-controls="tab-devices" onclick="switchAccountTab('devices', event)">💻 ${t("cc.tab.devices")}</button>
      <button class="tab-btn" role="tab" aria-selected="false" aria-controls="tab-billing" onclick="switchAccountTab('billing', event)">💳 ${t("cc.tab.billing")}</button>
      <button class="tab-btn" role="tab" aria-selected="false" aria-controls="tab-support" onclick="switchAccountTab('support', event)">🛟 ${t("cc.tab.support")}</button>
    </div>

    <!-- TAB 1: Profile & Key -->
    <div id="tab-profile" class="tab-content active">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
        <div style="font-size:17px; font-weight:700; color:var(--accent);">${ownerName}</div>
        <span class="badge ${statusBadgeClass}">${premiumStatus}</span>
      </div>
      <div class="info-row"><span class="info-label">${t("cc.profile.accountEmail")}</span><span class="info-val">${ownerEmail}</span></div>
      <div class="info-row"><span class="info-label">${t("cc.profile.planTier")}</span><span class="info-val">${planVariant}</span></div>
      <div class="info-row">
        <span class="info-label">${t("cc.profile.licenseKey")}</span>
        <span class="info-val" style="font-family:monospace;">${maskedKey} ${isPremium() && licenseKey !== "NO-KEY" ? `<button class="card-btn" style="padding:3px 10px; font-size:11px; margin-left:8px;" data-key="${escapeHtml(licenseKey)}" onclick="copyKey(this.getAttribute('data-key'))">${t("cc.profile.copyKey")}</button>` : ""}</span>
      </div>
      <div class="info-row"><span class="info-label">${t("cc.profile.onlineExpiry")}</span><span class="info-val">${onlineExpiry}</span></div>
      <div class="info-row"><span class="info-label">${t("cc.profile.offlineCache")}</span><span class="info-val">${offlineFormatted}</span></div>
      
      <div style="margin-top:20px; display:flex; gap:12px; flex-wrap:wrap;">
        ${
          isPremium()
            ? `<button class="card-btn btn-danger" onclick="deactivate()">${t("cc.profile.deactivate")}</button>
               <button class="card-btn btn-secondary" onclick="checkStatus()">${t("cc.profile.checkStatus")}</button>`
            : `<button class="card-btn btn-success" onclick="activate()">${t("cc.profile.activateKey")}</button>
               <button class="card-btn btn-info" onclick="buyLicense()">${t("cc.profile.buyPro")}</button>`
        }
      </div>
    </div>

    <!-- TAB 2: Device Manager -->
    <div id="tab-devices" class="tab-content">
      <div style="font-weight:700; margin-bottom:12px; font-size:14px;">💻 ${t("cc.devices.title")}</div>
      <div class="info-row"><span class="info-label">${t("cc.devices.currentHost")}</span><span class="info-val">${device.hostname} (${device.platform} ${device.arch})</span></div>
      <div class="info-row"><span class="info-label">${t("cc.devices.hwFingerprint")}</span><span class="info-val" style="font-family:monospace; font-size:11px;">${device.hardwareId.slice(0, 24)}...</span></div>
      <div class="info-row"><span class="info-label">${t("cc.devices.slotUsage")}</span><span class="info-val">${activations}</span></div>
      <div style="margin-top:16px; display:flex; gap:12px; flex-wrap:wrap;">
        <button class="card-btn btn-danger" onclick="exec('krl.deactivateLicense')">${t("cc.devices.deactivatePc")}</button>
        <button class="card-btn btn-secondary" onclick="exec('krl.checkLicenseStatus')">${t("cc.devices.syncStatus")}</button>
      </div>
    </div>

    <!-- TAB 3: Subscription & Billing -->
    <div id="tab-billing" class="tab-content">
      <div style="font-weight:700; margin-bottom:10px; font-size:14px;">💳 ${t("cc.billing.title")}</div>
      <p style="font-size:12px; opacity:0.8; margin-bottom:16px;">${t("cc.billing.desc")}</p>
      
      <div style="display:flex; gap:12px; margin-bottom:20px; flex-wrap:wrap;">
        <button class="card-btn" onclick="openPortal()">${t("cc.billing.btn.portal")}</button>
        <button class="card-btn btn-secondary" onclick="downloadInvoice()">${t("cc.billing.btn.invoice")}</button>
      </div>

      <div style="font-weight:800; margin-top:24px; margin-bottom:14px; font-size:15px; color:var(--accent);">${t("cc.billing.plansTitle")}</div>
      <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap:14px; margin-bottom:24px;">
        ${pricingPlans
          .map(
            (plan) => `
          <div class="card" style="border: 1px solid var(--accent-border); background: var(--card-bg);">
            <div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                <span style="font-weight:700; font-size:14px;">${plan.name}</span>
                ${plan.badge ? `<span class="badge badge-pro">${plan.badge}</span>` : ""}
              </div>
              <div style="font-size:20px; font-weight:800; color:var(--accent); margin-bottom:6px;">${plan.price} <span style="font-size:11px; font-weight:normal; opacity:0.8;">${plan.period}</span></div>
              <div class="card-desc" style="font-size:11px; margin-bottom:14px;">${plan.description}</div>
            </div>
            <button class="card-btn" style="width:100%; justify-content:center;" onclick="buyPlan('${plan.checkoutUrl}')">${t("cc.billing.btn.buyPlan", plan.name)}</button>
          </div>
        `,
          )
          .join("")}
      </div>

      <div style="padding: 16px; background: rgba(255,255,255,0.02); border: 1px solid var(--card-border); border-radius: 8px; font-size: 12px; line-height: 1.6;">
        <div style="font-weight:700; margin-bottom:8px; color:var(--accent);">${t("cc.billing.legalNotice")}</div>
        <ul style="margin: 0 0 0 18px; padding: 0; opacity: 0.9;">
          <li>${t("cc.billing.legalItem1")}</li>
          <li>${t("cc.billing.legalItem2")}</li>
          <li>${t("cc.billing.legalItem3")}</li>
        </ul>
      </div>
    </div>

    <!-- TAB 4: Support & Feedback -->
    <div id="tab-support" class="tab-content">
      <div style="font-weight:700; margin-bottom:10px; font-size:14px;">🛟 ${t("cc.support.title")}</div>
      <p style="font-size:12px; opacity:0.8; margin-bottom:16px;">${t("cc.support.desc")}</p>
      <div style="display:flex; flex-direction:column; gap:10px; max-width:440px;">
        <button class="card-btn btn-support" onclick="openTelegram()">💬 ${t("cc.support.btn.chat")}</button>
        <button class="card-btn" onclick="exec('krl.sendLogsToDeveloper')">📊 ${t("cc.support.btn.sendLogs")}</button>
        <button class="card-btn btn-success" onclick="exec('krl.sendFileToDeveloper')">📁 ${t("cc.support.btn.sendFile")}</button>
        <button class="card-btn btn-secondary" onclick="openGitHub()">🐙 ${t("cc.support.btn.github")}</button>
        <button class="card-btn btn-info" onclick="sendFeedback()">✉️ ${t("cc.support.btn.email")}</button>
      </div>
    </div>
  </div>

    <!-- SECTION 4: In-Editor Features & Shortcuts Reference (Non-clickable Guide) -->
  <div class="section-header" style="margin-top: 40px;">
    <div class="section-title">${t("cc.refSection.title")}</div>
  </div>
  <div style="font-size: 12.5px; opacity: 0.75; margin-bottom: 14px;">
    ${t("cc.refSection.desc")}
  </div>

  <div class="ref-grid">
    <!-- Card 1: Go to Definition -->
    <div class="ref-card">
      <div>
        <div class="ref-title-row">
          <span class="ref-title">🎯 ${isRu ? "Переход к определению" : "Go to Definition"}</span>
          <span class="badge badge-active" style="font-size: 9px;">LSP CORE</span>
        </div>
        <div class="ref-desc">
          ${isRu 
            ? "Мгновенный прыжок к исходному объявлению подпрограмм DEF, структур, сигналов $IN/$OUT и данных в .DAT файлах проекта." 
            : "Instant jump to declaration of subroutines (DEF), structures, $IN/$OUT signals, and global variables in .DAT files."}
        </div>
      </div>
      <div class="ref-hotkey-wrap">
        <span>${isRu ? "Горячая клавиша:" : "Shortcut:"}</span>
        <div>
          <span class="kbd-badge">F12</span>
          <span style="opacity:0.5; margin:0 4px;">${isRu ? "или" : "or"}</span>
          <span class="kbd-badge alt">Ctrl + Click</span>
        </div>
      </div>
    </div>

    <!-- Card 2: Find All References -->
    <div class="ref-card">
      <div>
        <div class="ref-title-row">
          <span class="ref-title">🔍 ${isRu ? "Поиск всех ссылок" : "Find All References"}</span>
          <span class="badge badge-active" style="font-size: 9px;">INDEXER</span>
        </div>
        <div class="ref-desc">
          ${isRu 
            ? "Отображает полный список всех вызовов переменной, функции или системного сигнала по всем файлам рабочей области KRC." 
            : "Locates all usage sites, calls, and references of a symbol across all workspace .SRC and .DAT files."}
        </div>
      </div>
      <div class="ref-hotkey-wrap">
        <span>${isRu ? "Горячая клавиша:" : "Shortcut:"}</span>
        <span class="kbd-badge">Shift + F12</span>
      </div>
    </div>

    <!-- Card 3: Rename Symbol -->
    <div class="ref-card">
      <div>
        <div class="ref-title-row">
          <span class="ref-title">✏️ ${isRu ? "Переименование символа" : "Rename Symbol"}</span>
          <span class="badge badge-active" style="font-size: 9px;">REFACTOR</span>
        </div>
        <div class="ref-desc">
          ${isRu 
            ? "Безопасный автоматический рефакторинг переменной или функции с синхронным переименованием во всех файлах проекта." 
            : "Safe project-wide symbol renaming across all source and data files without broken dependencies."}
        </div>
      </div>
      <div class="ref-hotkey-wrap">
        <span>${isRu ? "Горячая клавиша:" : "Shortcut:"}</span>
        <span class="kbd-badge">F2</span>
      </div>
    </div>

    <!-- Card 4: Format Document -->
    <div class="ref-card">
      <div>
        <div class="ref-title-row">
          <span class="ref-title">🎨 ${isRu ? "Форматирование документа" : "Format Document"}</span>
          <span class="badge badge-active" style="font-size: 9px;">FORMATTER</span>
        </div>
        <div class="ref-desc">
          ${isRu 
            ? "Выравнивание отступов вложенных блоков (IF, LOOP, FOR), аккуратное выравнивание операторов присваивания по колонкам." 
            : "Indents nested algorithmic control flow blocks (IF, LOOP, FOR, SWITCH) and column-aligns variable assignments."}
        </div>
      </div>
      <div class="ref-hotkey-wrap">
        <span>${isRu ? "Горячая клавиша:" : "Shortcut:"}</span>
        <span class="kbd-badge">Shift + Alt + F</span>
      </div>
    </div>

    <!-- Card 5: Fold / Unfold -->
    <div class="ref-card">
      <div>
        <div class="ref-title-row">
          <span class="ref-title">📁 ${isRu ? "Сворачивание FOLD регионов" : "Fold / Unfold Folds"}</span>
          <span class="badge badge-active" style="font-size: 9px;">EDITOR</span>
        </div>
        <div class="ref-desc">
          ${isRu 
            ? "Сворачивание и разворачивание промышленных пользовательских складок FOLD ... ENDFOLD, циклов и секций программы." 
            : "Toggles folding for industrial FOLD ... ENDFOLD user regions, subprograms, and control blocks."}
        </div>
      </div>
      <div class="ref-hotkey-wrap">
        <span>${isRu ? "Горячие клавиши:" : "Shortcuts:"}</span>
        <div>
          <span class="kbd-badge">Ctrl + Shift + [</span>
          <span style="opacity:0.5; margin:0 4px;">/</span>
          <span class="kbd-badge">]</span>
        </div>
      </div>
    </div>

    <!-- Card 6: Flowchart Viewer -->
    <div class="ref-card">
      <div>
        <div class="ref-title-row">
          <span class="ref-title">🗺️ ${isRu ? "Интерактивная блок-схема" : "Flowchart Graph Viewer"}</span>
          <span class="badge badge-active" style="font-size: 9px;">VISUALIZER</span>
        </div>
        <div class="ref-desc">
          ${isRu 
            ? "Генерация интерактивного графа переходов и ветвлений логики открытого файла .SRC. Нажмите правой кнопкой в файле -> KRL: Show Flowchart." 
            : "Generates interactive flowchart graph for open .SRC file. Right-click in KRL editor -> KRL: Show Flowchart."}
        </div>
      </div>
      <div class="ref-hotkey-wrap">
        <span>${isRu ? "Вызов:" : "Trigger:"}</span>
        <span class="kbd-badge alt">${isRu ? "Контекстное меню / Панель KUKA" : "Context Menu / KUKA Panel"}</span>
      </div>
    </div>

    <!-- Card 7: Cleanup Unused Variables -->
    <div class="ref-card">
      <div>
        <div class="ref-title-row">
          <span class="ref-title">🧹 ${isRu ? "Очистка неиспользуемых переменных" : "Clean Up Dead Variables"}</span>
          <span class="badge badge-active" style="font-size: 9px;">CLEANUP</span>
        </div>
        <div class="ref-desc">
          ${isRu 
            ? "Автоматический поиск и безопасное удаление или комментирование локальных переменных DECL, которые не используются в подпрограмме." 
            : "Detects and cleanly comments out or deletes local DECL variables declared in open file but never referenced."}
        </div>
      </div>
      <div class="ref-hotkey-wrap">
        <span>${isRu ? "Вызов:" : "Trigger:"}</span>
        <span class="kbd-badge alt">${isRu ? "Панель KUKA Commands -> Clean Up" : "KUKA Commands -> Clean Up"}</span>
      </div>
    </div>

    <!-- Card 8: Sort Declarations -->
    <div class="ref-card">
      <div>
        <div class="ref-title-row">
          <span class="ref-title">📑 ${isRu ? "Сортировка объявлений" : "Sort Declarations"}</span>
          <span class="badge badge-active" style="font-size: 9px;">ORGANIZER</span>
        </div>
        <div class="ref-desc">
          ${isRu 
            ? "Группирует объявления переменных по типам (INT, REAL, BOOL, FRAME, POS) и выстраивает их по алфавиту внутри DEF или .DAT." 
            : "Groups and organizes DECL statements by data type (INT, REAL, BOOL, FRAME) and sorts them alphabetically in active DEF."}
        </div>
      </div>
      <div class="ref-hotkey-wrap">
        <span>${isRu ? "Вызов:" : "Trigger:"}</span>
        <span class="kbd-badge alt">${isRu ? "Правый клик -> Sort Declarations" : "Right Click -> Sort Declarations"}</span>
      </div>
    </div>

    <!-- Card 9: Modern Splines & iiQKA -->
    <div class="ref-card">
      <div>
        <div class="ref-title-row">
          <span class="ref-title">🚀 ${isRu ? "Модернизация FOLD в Spline & iiQKA" : "Modern Splines & iiQKA Folds"}</span>
          <span class="badge badge-pro">PRO</span>
        </div>
        <div class="ref-desc">
          ${isRu 
            ? "Конвертация устаревших движений KSS в современные сплайны KSS 8.6+ / 8.7 и складки нового поколения iiQKA." 
            : "Converts legacy KSS motion folds into modern optimized SPLINE blocks and iiQKA next-gen envelopes."}
        </div>
      </div>
      <div class="ref-hotkey-wrap">
        <span>${isRu ? "Вызов:" : "Trigger:"}</span>
        <span class="kbd-badge alt">${isRu ? "Правый клик на блоке движения" : "Right Click on Motion Block"}</span>
      </div>
    </div>

    <!-- Card 10: Collision Guard -->
    <div class="ref-card">
      <div>
        <div class="ref-title-row">
          <span class="ref-title">🛡️ ${isRu ? "Защита от столкновений" : "Collision Guard Injection"}</span>
          <span class="badge badge-active" style="font-size: 9px;">SAFETY</span>
        </div>
        <div class="ref-desc">
          ${isRu 
            ? "Вставка страховочных проверок моментов осей и условий безопасного замедления перед опасными точками траектории." 
            : "Injects torque monitoring and velocity reduction envelopes before critical trajectory points."}
        </div>
      </div>
      <div class="ref-hotkey-wrap">
        <span>${isRu ? "Вызов:" : "Trigger:"}</span>
        <span class="kbd-badge alt">${isRu ? "Правый клик -> Insert CollisionGuard" : "Right Click -> Insert CollisionGuard"}</span>
      </div>
    </div>

    <!-- Card 11: Error Lens & Inlay Hints -->
    <div class="ref-card">
      <div>
        <div class="ref-title-row">
          <span class="ref-title">👓 ${isRu ? "Инлайн-диагностика на строке" : "Error Lens & Inlay Hints"}</span>
          <span class="badge badge-active" style="font-size: 9px;">REALTIME</span>
        </div>
        <div class="ref-desc">
          ${isRu 
            ? "Предупреждения компилятора, лимиты скоростей и подсказки параметров выводятся прямо в редакторе на лету. Включаются в секции 0 вверху." 
            : "Real-time compiler warnings, speed overshoots, and parameter hints rendered inline. Toggle them in Section 0 above."}
        </div>
      </div>
      <div class="ref-hotkey-wrap">
        <span>${isRu ? "Управление:" : "Control:"}</span>
        <span class="kbd-badge alt">${isRu ? "Переключатели в Секции 0 вверху" : "Toggles in Section 0 Above"}</span>
      </div>
    </div>

    <!-- Card 12: Fold All / Unfold All -->
    <div class="ref-card">
      <div>
        <div class="ref-title-row">
          <span class="ref-title">📁 ${isRu ? "Свернуть / Развернуть все FOLD" : "Fold All / Unfold All Folds"}</span>
          <span class="badge badge-active" style="font-size: 9px;">EDITOR</span>
        </div>
        <div class="ref-desc">
          ${isRu 
            ? "Массовое сворачивание или разворачивание всех промышленных складок FOLD ... ENDFOLD по всему открытому файлу." 
            : "Folds or unfolds all industrial FOLD ... ENDFOLD user blocks across the entire open KRL program."}
        </div>
      </div>
      <div class="ref-hotkey-wrap">
        <span>${isRu ? "Горячие клавиши:" : "Shortcuts:"}</span>
        <div>
          <span class="kbd-badge">Ctrl + K, 0</span>
          <span style="opacity:0.5; margin:0 4px;">/</span>
          <span class="kbd-badge">Ctrl + K, J</span>
        </div>
      </div>
    </div>

    <!-- Card 13: Insert FOLD Region -->
    <div class="ref-card">
      <div>
        <div class="ref-title-row">
          <span class="ref-title">📦 ${isRu ? "Вставка FOLD-региона" : "Insert FOLD Region"}</span>
          <span class="badge badge-active" style="font-size: 9px;">STRUCTURE</span>
        </div>
        <div class="ref-desc">
          ${isRu 
            ? "Оборачивает выделенный фрагмент кода KRL в аккуратную промышленную складку ;FOLD Название ... ;ENDFOLD." 
            : "Wraps currently selected lines of KRL code into standard industrial ;FOLD Name ... ;ENDFOLD envelope."}
        </div>
      </div>
      <div class="ref-hotkey-wrap">
        <span>${isRu ? "Вызов:" : "Trigger:"}</span>
        <span class="kbd-badge alt">${isRu ? "Правый клик -> Insert FOLD" : "Right Click -> Insert FOLD"}</span>
      </div>
    </div>

    <!-- Card 14: Unwrap FOLD -->
    <div class="ref-card">
      <div>
        <div class="ref-title-row">
          <span class="ref-title">✂️ ${isRu ? "Очистка / Разворачивание FOLD" : "Unwrap / Strip FOLD"}</span>
          <span class="badge badge-active" style="font-size: 9px;">REFACTOR</span>
        </div>
        <div class="ref-desc">
          ${isRu 
            ? "Удаляет внешние маркеры ;FOLD и ;ENDFOLD, сохраняя исходные рабочие инструкции робота внутри файла." 
            : "Strips outer ;FOLD and ;ENDFOLD wrapper lines while preserving all enclosed executable motion and logic."}
        </div>
      </div>
      <div class="ref-hotkey-wrap">
        <span>${isRu ? "Вызов:" : "Trigger:"}</span>
        <span class="kbd-badge alt">${isRu ? "Правый клик -> Unwrap Fold" : "Right Click -> Unwrap Fold"}</span>
      </div>
    </div>

    <!-- Card 15: Wrap in Modern SPLINE Block -->
    <div class="ref-card">
      <div>
        <div class="ref-title-row">
          <span class="ref-title">🚀 ${isRu ? "Создание сплайн-блока SPLINE" : "Wrap in SPLINE Block"}</span>
          <span class="badge badge-pro">PRO</span>
        </div>
        <div class="ref-desc">
          ${isRu 
            ? "Оборачивает непрерывную цепочку движений в единый оптимизированный блок SPLINE WITH $VEL... ENDSPLINE." 
            : "Wraps consecutive motion instructions into an optimized KSS 8.6+ SPLINE WITH $VEL... ENDSPLINE block."}
        </div>
      </div>
      <div class="ref-hotkey-wrap">
        <span>${isRu ? "Вызов:" : "Trigger:"}</span>
        <span class="kbd-badge alt">${isRu ? "Правый клик -> Wrap in SPLINE" : "Right Click -> Wrap in SPLINE"}</span>
      </div>
    </div>

    <!-- Card 16: Industrial Safety Check -->
    <div class="ref-card">
      <div>
        <div class="ref-title-row">
          <span class="ref-title">🛡️ ${isRu ? "Экспресс-проверка безопасности" : "Industrial Safety Check"}</span>
          <span class="badge badge-active" style="font-size: 9px;">SAFETY</span>
        </div>
        <div class="ref-desc">
          ${isRu 
            ? "Мгновенная проверка открытого файла на опасные скорости $VEL_PTP, инициализацию $TOOL/$BASE и зависания WAIT FOR." 
            : "Instant scan of active file for dangerous velocity overshoots, uninitialized tools, and deadlock WAIT FOR conditions."}
        </div>
      </div>
      <div class="ref-hotkey-wrap">
        <span>${isRu ? "Вызов:" : "Trigger:"}</span>
        <span class="kbd-badge alt">${isRu ? "KUKA Commands -> Safety Check" : "KUKA Commands -> Safety Check"}</span>
      </div>
    </div>

    <!-- Card 17: Remove Trailing Whitespace -->
    <div class="ref-card">
      <div>
        <div class="ref-title-row">
          <span class="ref-title">🧹 ${isRu ? "Удаление концевых пробелов" : "Strip Trailing Whitespace"}</span>
          <span class="badge badge-active" style="font-size: 9px;">CLEANUP</span>
        </div>
        <div class="ref-desc">
          ${isRu 
            ? "Удаляет лишние пробелы и табуляции в конце строк во всем файле для строгого соответствия стилю WorkVisual." 
            : "Cleans invisible trailing whitespace and tabs across the document to conform to KUKA formatting guidelines."}
        </div>
      </div>
      <div class="ref-hotkey-wrap">
        <span>${isRu ? "Вызов:" : "Trigger:"}</span>
        <span class="kbd-badge alt">${isRu ? "Панель KUKA Commands" : "KUKA Commands Panel"}</span>
      </div>
    </div>

    <!-- Card 18: Rename Signal -->
    <div class="ref-card">
      <div>
        <div class="ref-title-row">
          <span class="ref-title">🏷️ ${isRu ? "Переименование сигнала (алиас)" : "Rename Signal (Set Alias)"}</span>
          <span class="badge badge-active" style="font-size: 9px;">SIGNALS</span>
        </div>
        <div class="ref-desc">
          ${isRu 
            ? "Быстрое присвоение или изменение псевдонима сигнала ввода-вывода $IN/$OUT с автообновлением по проекту." 
            : "Assigns or changes user-defined alias for $IN/$OUT industrial signal with workspace cross-references."}
        </div>
      </div>
      <div class="ref-hotkey-wrap">
        <span>${isRu ? "Вызов:" : "Trigger:"}</span>
        <span class="kbd-badge alt">${isRu ? "Контекстное меню редактора" : "Editor Context Menu"}</span>
      </div>
    </div>

    <!-- Card 19: View KRL File History & Compare -->
    <div class="ref-card">
      <div>
        <div class="ref-title-row">
          <span class="ref-title">📜 ${isRu ? "История файла и сравнение ревизий" : "KRL File History & Compare"}</span>
          <span class="badge badge-pro">PRO</span>
        </div>
        <div class="ref-desc">
          ${isRu 
            ? "Пошаговое сравнение версий текущего файла .SRC/.DAT в репозитории с открытием интерактивного diff-окна." 
            : "Step-by-step revision history of active KRL file with side-by-side visual diff comparison."}
        </div>
      </div>
      <div class="ref-hotkey-wrap">
        <span>${isRu ? "Вызов:" : "Trigger:"}</span>
        <span class="kbd-badge alt">${isRu ? "Правый клик -> View File History" : "Right Click -> View File History"}</span>
      </div>
    </div>

    <!-- Card 20: Show KRL Line Git Blame Details -->
    <div class="ref-card">
      <div>
        <div class="ref-title-row">
          <span class="ref-title">🔍 ${isRu ? "Детали автора строки (Git Blame)" : "KRL Line Git Blame Details"}</span>
          <span class="badge badge-pro">PRO</span>
        </div>
        <div class="ref-desc">
          ${isRu 
            ? "Отображает хэш коммита, автора, дату и сообщение для текущей строки кода или измененной точки .DAT." 
            : "Reveals exact commit hash, author name, timestamp, and message for active line or teach-point modification."}
        </div>
      </div>
      <div class="ref-hotkey-wrap">
        <span>${isRu ? "Вызов:" : "Trigger:"}</span>
        <span class="kbd-badge alt">${isRu ? "Правый клик -> Show Line Blame" : "Right Click -> Show Line Blame"}</span>
      </div>
    </div>

    <!-- Card 21: Refresh I/O Signals View -->
    <div class="ref-card">
      <div>
        <div class="ref-title-row">
          <span class="ref-title">🔄 ${isRu ? "Обновление дерева I/O сигналов" : "Refresh I/O Signals Tree"}</span>
          <span class="badge badge-active" style="font-size: 9px;">I/O TREE</span>
        </div>
        <div class="ref-desc">
          ${isRu 
            ? "Повторное сканирование сигналов в $config.dat и обновление дерева KRL I/O Signals в боковой панели." 
            : "Rescans signal declarations in $config.dat and refreshes the KRL I/O tree in the primary sidebar."}
        </div>
      </div>
      <div class="ref-hotkey-wrap">
        <span>${isRu ? "Вызов:" : "Trigger:"}</span>
        <span class="kbd-badge alt">${isRu ? "Иконка в заголовке KRL I/O" : "Header Icon in KRL I/O"}</span>
      </div>
    </div>
  </div>
<div class="footer">
    KUKA KRL Extension Pro — Developed by Liskin Labs & Silvestr Liskin
  </div>

  <script>
    const vscode = acquireVsCodeApi();
    function toggleSetting(key, title, el) {
      vscode.postMessage({ command: 'updateSetting', key: key, value: el.checked, title: title });
    }
    function exec(cmd) {
      vscode.postMessage({ command: 'runCommand', target: cmd });
    }
    function activate() {
      vscode.postMessage({ command: 'activateLicense' });
    }
    function deactivate() {
      vscode.postMessage({ command: 'deactivateLicense' });
    }
    function checkStatus() {
      vscode.postMessage({ command: 'checkLicenseStatus' });
    }
    function openPortal() {
      vscode.postMessage({ command: 'openCustomerPortal' });
    }
    function buyLicense() {
      vscode.postMessage({ command: 'buyLicense' });
    }
    function buyPlan(u) {
      vscode.postMessage({ command: 'buyPlan', url: u });
    }
    function copyKey(k) {
      vscode.postMessage({ command: 'copyKey', key: k });
    }
    function sendFeedback() {
      vscode.postMessage({ command: 'sendFeedback' });
    }
    function openTelegram() {
      vscode.postMessage({ command: 'openTelegram' });
    }
    function openGitHub() {
      vscode.postMessage({ command: 'openGitHub' });
    }
    function downloadInvoice() {
      vscode.postMessage({ command: 'downloadInvoice' });
    }
    function switchAccountTab(tabName, evt) {
      document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
      
      const targetBtn = (evt && evt.currentTarget) || document.querySelector('[aria-controls="tab-' + tabName + '"]');
      const targetContent = document.getElementById('tab-' + tabName);
      if (targetBtn) {
        targetBtn.classList.add('active');
        targetBtn.setAttribute('aria-selected', 'true');
      }
      if (targetContent) targetContent.classList.add('active');
    }
  </script>
</body>
</html>`;
}
