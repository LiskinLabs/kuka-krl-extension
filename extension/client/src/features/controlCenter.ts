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
  const premiumStatus = isPremium()
    ? t("cc.profile.activePro")
    : t("cc.profile.community");
  const statusBadgeClass = isPremium() ? "badge-active" : "badge-community";

  const ownerName = escapeHtml(
    licenseCache?.customerName ||
      (isPremium() ? "Silvestr Liskin (Teknorob Lead)" : "Community User"),
  );
  const ownerEmail = escapeHtml(
    licenseCache?.customerEmail ||
      (isPremium() ? "silvestr.liskin@teknorob.com" : "Not Registered"),
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
    .footer {
      margin-top: 48px;
      padding-top: 20px;
      border-top: 1px solid var(--card-border);
      font-size: 12px;
      opacity: 0.7;
      text-align: center;
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

  <!-- SECTION 1: Engineering & Motion Tools -->
  <div class="section-header">
    <div class="section-title">⚡ ${t("cc.engTools")}</div>
  </div>
  <div class="grid">
    <div class="card" tabindex="0" role="button" onclick="exec('krl.showFlowchart')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();exec('krl.showFlowchart')}">
      <div>
        <div class="card-header">
          <span class="card-icon">🗺️</span>
          <span class="card-title">${t("command.showFlowchart")}</span>
        </div>
        <div class="card-desc">${t("cc.desc.flowchart")}</div>
      </div>
      <div class="card-actions">
        <button class="card-btn" onclick="event.stopPropagation();exec('krl.showFlowchart')">${t("cc.btn.openFlowchart")}</button>
      </div>
    </div>

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
  </div>

  <!-- SECTION 2: KRC Backup & GitLens Version Control -->
  <div class="section-header">
    <div class="section-title">📦 ${t("cc.backupGit")}</div>
  </div>
  <div class="grid">
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

    <div class="card" tabindex="0" role="button" onclick="exec('krl.exportBackupZip')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();exec('krl.exportBackupZip')}">
      <div>
        <div class="card-header">
          <span class="card-icon">🗜️</span>
          <span class="card-title">${t("cc.btn.exportBackupZip")}</span>
        </div>
        <div class="card-desc">${t("cc.desc.exportZip")}</div>
      </div>
      <div class="card-actions">
        <button class="card-btn" onclick="event.stopPropagation();exec('krl.exportBackupZip')">${t("cc.btn.exportBackupZip")}</button>
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
  </div>

  <!-- SECTION 3: Refactoring & Modern KRL Suite -->
  <div class="section-header">
    <div class="section-title">🛠️ ${t("cc.refactorTools")}</div>
  </div>
  <div class="grid">
    <div class="card" tabindex="0" role="button" onclick="exec('krl.cleanupUnusedVariables')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();exec('krl.cleanupUnusedVariables')}">
      <div>
        <div class="card-header">
          <span class="card-icon">🗑️</span>
          <span class="card-title">${t("command.cleanup")}</span>
        </div>
        <div class="card-desc">${t("cc.desc.deadCode")}</div>
      </div>
      <div class="card-actions">
        <button class="card-btn" onclick="event.stopPropagation();exec('krl.cleanupUnusedVariables')">${t("cc.btn.cleanupVars")}</button>
      </div>
    </div>

    <div class="card" tabindex="0" role="button" onclick="exec('krl.sortDeclarations')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();exec('krl.sortDeclarations')}">
      <div>
        <div class="card-header">
          <span class="card-icon">📑</span>
          <span class="card-title">${t("command.sortDeclarations")}</span>
        </div>
        <div class="card-desc">${t("cc.desc.sortDecl")}</div>
      </div>
      <div class="card-actions">
        <button class="card-btn" onclick="event.stopPropagation();exec('krl.sortDeclarations')">${t("cc.btn.sortDeclarations")}</button>
        <button class="card-btn btn-secondary" onclick="event.stopPropagation();exec('krl.formatDocument')">${t("cc.btn.formatDoc")}</button>
      </div>
    </div>

    <div class="card" tabindex="0" role="button" onclick="exec('krl.convertLegacyToSpline')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();exec('krl.convertLegacyToSpline')}">
      <div>
        <div class="card-header">
          <span class="card-icon">🚀</span>
          <span class="card-title">${t("command.convertLegacyToSpline")}</span>
          <span class="badge badge-pro">PRO</span>
        </div>
        <div class="card-desc">${t("cc.desc.modernFold")}</div>
      </div>
      <div class="card-actions">
        <button class="card-btn" onclick="event.stopPropagation();exec('krl.convertLegacyToSpline')">${t("cc.btn.modernizeFold")}</button>
        <button class="card-btn btn-secondary" onclick="event.stopPropagation();exec('krl.convertToIiqkaFold')">iiQKA Fold</button>
      </div>
    </div>

    <div class="card" tabindex="0" role="button" onclick="exec('krl.insertCollisionGuard')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();exec('krl.insertCollisionGuard')}">
      <div>
        <div class="card-header">
          <span class="card-icon">🛡️</span>
          <span class="card-title">${t("command.insertCollisionGuard")}</span>
        </div>
        <div class="card-desc">${t("cc.desc.collisionGuard")}</div>
      </div>
      <div class="card-actions">
        <button class="card-btn" onclick="event.stopPropagation();exec('krl.insertCollisionGuard')">${t("cc.btn.collisionGuard")}</button>
      </div>
    </div>
  </div>

  <!-- SECTION 4: Safety Diagnostics & Quality Audit -->
  <div class="section-header">
    <div class="section-title">🛡️ ${t("cc.safetyDiag")}</div>
  </div>
  <div class="grid">
    <div class="card" tabindex="0" role="button" onclick="exec('krl.aiCheckSafety')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();exec('krl.aiCheckSafety')}">
      <div>
        <div class="card-header">
          <span class="card-icon">🛡️</span>
          <span class="card-title">${t("command.aiCheckSafety")}</span>
        </div>
        <div class="card-desc">${t("cc.desc.safety")}</div>
      </div>
      <div class="card-actions">
        <button class="card-btn" onclick="event.stopPropagation();exec('krl.aiCheckSafety')">${t("cc.btn.runSafetyCheck")}</button>
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

  <div class="footer">
    KUKA KRL Extension Pro — Developed by Liskin Labs & Silvestr Liskin | Teknorob Robot ve Otomasyon
  </div>

  <script>
    const vscode = acquireVsCodeApi();
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
