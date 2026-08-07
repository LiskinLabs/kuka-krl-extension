import * as vscode from "vscode";
import {
  isPremium,
  getLicenseCache,
  getDeviceDetails,
  onLicenseChanged,
  LicenseCacheData,
  LEMON_SQUEEZY_CHECKOUT_URL,
  LEMON_SQUEEZY_PORTAL_URL,
  PRICING_PLANS,
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
    "KUKA KRL Control Center",
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

  currentPanel.webview.onDidReceiveMessage(
    async (message) => {
      switch (message.command) {
        case "runCommand":
          if (message.target) {
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
          vscode.env.openExternal(vscode.Uri.parse(LEMON_SQUEEZY_PORTAL_URL));
          vscode.window.showInformationMessage(t("cc.notify.portalOpened"));
          break;
        case "buyLicense":
        case "buyPlan":
          {
            const targetUrl = message.url || LEMON_SQUEEZY_CHECKOUT_URL;
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
              "https://github.com/LiskinLabs/kuka-krl-extension-core/issues",
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
  const premiumStatus = isPremium() ? "ACTIVE (PRO)" : "COMMUNITY EDITION";
  const statusBadgeColor = isPremium() ? "#28a745" : "#ffc107";

  const ownerName =
    licenseCache?.customerName ||
    (isPremium() ? "Silvestr Liskin (Teknorob Lead)" : "Community User");
  const ownerEmail =
    licenseCache?.customerEmail ||
    (isPremium() ? "silvestr.liskin@teknorob.com" : "Not Registered");
  const planVariant =
    licenseCache?.variantName ||
    (isPremium()
      ? "Pro Edition (Industrial Commercial)"
      : "Community Free Edition");
  const licenseKey = licenseCache?.key || "NO-KEY";
  const maskedKey =
    licenseKey.length > 8
      ? `${licenseKey.slice(0, 4)}-****-****-${licenseKey.slice(-4)}`
      : licenseKey;
  const activations = isPremium()
    ? `${licenseCache?.activationUsage || 1} / ${licenseCache?.activationLimit || 10} Devices`
    : "1 Device (Unlicensed)";

  // Calculate offline days remaining
  const now = Date.now();
  const offlineDaysLeft = licenseCache?.expiresAt
    ? Math.max(
        0,
        Math.ceil((licenseCache.expiresAt - now) / (24 * 60 * 60 * 1000)),
      )
    : 30;

  const isMasterKey =
    licenseKey === "TEKNOROB-DEV-MODE" ||
    licenseKey === "TEKNOROB-INDUSTRIAL-LEAD-PRO" ||
    licenseKey === "TEKNOROB-LEAD";

  let onlineExpiry = "No Active Subscription";
  if (isMasterKey) {
    onlineExpiry = "Master Engineering Pro License (Permanent / Lead Access)";
  } else if (licenseCache?.subscriptionEndsAt) {
    const expDate = new Date(licenseCache.subscriptionEndsAt);
    const msLeft = expDate.getTime() - now;
    const daysLeft = Math.max(0, Math.ceil(msLeft / (24 * 60 * 60 * 1000)));
    onlineExpiry = `Active Subscription (Renews: ${expDate.toLocaleDateString()} — ${daysLeft} Days Left)`;
  } else if (isPremium()) {
    onlineExpiry = "Lemon Squeezy Pro License (Active / Verified)";
  }

  const logoUri = webview.asWebviewUri(
    vscode.Uri.joinPath(context.extensionUri, "media", "logo.png"),
  );

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>KUKA KRL Control Center</title>
  <style>
    :root {
      --bg-color: var(--vscode-editor-background);
      --fg-color: var(--vscode-editor-foreground);
      --card-bg: var(--vscode-welcomePage-tileBackground, rgba(255, 255, 255, 0.04));
      --card-border: var(--vscode-welcomePage-tileBorder, rgba(255, 255, 255, 0.1));
      --accent: #FF6600;
      --accent-hover: #e05500;
    }
    body {
      font-family: var(--vscode-font-family, system-ui, -apple-system, sans-serif);
      background-color: var(--bg-color);
      color: var(--fg-color);
      padding: 24px;
      margin: 0;
    }
    .account-hub {
      background: var(--card-bg);
      border: 1px solid var(--accent);
      border-radius: 8px;
      padding: 20px;
      margin-bottom: 28px;
      box-shadow: 0 4px 16px rgba(255, 102, 0, 0.08);
    }
    .tab-bar {
      display: flex;
      gap: 8px;
      border-bottom: 1px solid var(--card-border);
      padding-bottom: 10px;
      margin-bottom: 16px;
    }
    .tab-btn {
      background: transparent;
      color: var(--fg-color);
      border: none;
      padding: 8px 14px;
      border-radius: 4px;
      font-weight: 600;
      font-size: 12px;
      cursor: pointer;
      opacity: 0.7;
      transition: all 0.2s;
    }
    .tab-btn.active {
      background: var(--accent);
      color: #fff;
      opacity: 1;
    }
    .tab-btn:hover:not(.active) {
      opacity: 1;
      background: rgba(255, 102, 0, 0.15);
    }
    .tab-content { display: none; }
    .tab-content.active { display: block; }
    .info-row { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px dashed rgba(255,255,255,0.05); font-size: 13px; }
    .info-label { opacity: 0.8; }
    .info-val { font-weight: 600; }
    .badge {
      font-size: 11px;
      font-weight: 700;
      padding: 4px 8px;
      border-radius: 4px;
      background: ${statusBadgeColor};
      color: #fff;
      text-transform: uppercase;
    }
    .section-title {
      font-size: 16px;
      font-weight: 700;
      margin-top: 24px;
      margin-bottom: 14px;
      color: var(--fg-color);
      display: flex;
      align-items: center;
      gap: 8px;
      text-transform: uppercase;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 16px;
    }
    .card {
      background-color: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 8px;
      padding: 16px;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .card:hover {
      border-color: var(--accent);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(255, 102, 0, 0.15);
    }
    .card-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 8px;
    }
    .card-icon {
      font-size: 20px;
    }
    .card-title {
      font-weight: 600;
      font-size: 14px;
    }
    .card-desc {
      font-size: 12px;
      opacity: 0.8;
      line-height: 1.4;
      margin-bottom: 16px;
    }
    .card-btn {
      background: var(--accent);
      color: white;
      border: none;
      padding: 8px 14px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      align-self: flex-start;
      transition: background 0.15s;
    }
    .card-btn:hover {
      background: var(--accent-hover);
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 20px;
      margin-bottom: 24px;
      border-bottom: 2px solid var(--accent);
    }
    .header-logo {
      width: 68px;
      height: 68px;
      border-radius: 12px;
      box-shadow: 0 4px 16px rgba(255, 102, 0, 0.4);
      object-fit: cover;
      flex-shrink: 0;
      border: 1px solid rgba(255, 102, 0, 0.5);
    }
    .footer {
      margin-top: 40px;
      padding-top: 16px;
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
      <h1 style="margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">KUKA KRL Professional Control Center</h1>
      <div style="display: flex; align-items: center; gap: 10px; margin-top: 8px;">
        <span class="badge">${premiumStatus}</span>
        <span style="font-weight: 600; opacity: 0.85; font-size: 13px;">v1.7.3 Industrial Edition</span>
      </div>
    </div>
    <img class="header-logo" src="${logoUri}" alt="KUKA KRL Logo" />
  </div>

  <div class="section-title">⚡ ${t("cc.engTools")}</div>
  <div class="grid">
    <div class="card" onclick="exec('krl.showFlowchart')">
      <div>
        <div class="card-header">
          <span class="card-icon">🗺️</span>
          <span class="card-title">${t("command.showFlowchart")}</span>
        </div>
        <div class="card-desc">${t("command.showFlowchart.tooltip")}</div>
      </div>
      <button class="card-btn">${t("cc.btn.openFlowchart")}</button>
    </div>

    <div class="card" onclick="exec('krl.compareKrcBackup')">
      <div>
        <div class="card-header">
          <span class="card-icon">📦</span>
          <span class="card-title">${t("command.compareKrcBackup")}</span>
        </div>
        <div class="card-desc">${t("command.compareKrcBackup.tooltip")}</div>
      </div>
      <button class="card-btn">${t("cc.btn.inspectBackup")}</button>
    </div>

    <div class="card" onclick="exec('krl.openSnippetGenerator')">
      <div>
        <div class="card-header">
          <span class="card-icon">🎬</span>
          <span class="card-title">${t("command.openSnippetGenerator")}</span>
        </div>
        <div class="card-desc">${t("command.openSnippetGenerator.tooltip")}</div>
      </div>
      <button class="card-btn">${t("cc.btn.generateSnippets")}</button>
    </div>

    <div class="card" onclick="exec('krl.showCalculator')">
      <div>
        <div class="card-header">
          <span class="card-icon">📐</span>
          <span class="card-title">${t("command.calculator")}</span>
        </div>
        <div class="card-desc">${t("command.calculator.tooltip")}</div>
      </div>
      <button class="card-btn">${t("cc.btn.openCalculator")}</button>
    </div>

    <div class="card">
      <div>
        <div class="card-header">
          <span class="card-icon">🌐</span>
          <span class="card-title">${t("command.validateEkiXml")}</span>
        </div>
        <div class="card-desc">${t("command.validateEkiXml.tooltip")}</div>
      </div>
      <div style="display:flex; gap:6px;">
        <button class="card-btn" onclick="exec('krl.validateEkiXml')">${t("cc.btn.ekiValidator")}</button>
        <button class="card-btn" style="background:#444;" onclick="exec('krl.generateEkiCode')">${t("cc.btn.generateHandler")}</button>
      </div>
    </div>

    <div class="card" onclick="exec('krl.cleanGitMetadata')">
      <div>
        <div class="card-header">
          <span class="card-icon">🧹</span>
          <span class="card-title">${t("command.cleanGitMetadata")}</span>
        </div>
        <div class="card-desc">${t("command.cleanGitMetadata.tooltip")}</div>
      </div>
      <button class="card-btn">${t("cc.btn.cleanGitMetadata")}</button>
    </div>
  </div>

  <div class="section-title">🛡️ ${t("cc.safetyDiag")}</div>
  <div class="grid">
    <div class="card" onclick="exec('krl.aiCheckSafety')">
      <div>
        <div class="card-header">
          <span class="card-icon">🛡️</span>
          <span class="card-title">${t("command.aiCheckSafety")}</span>
        </div>
        <div class="card-desc">${t("command.aiCheckSafety.tooltip")}</div>
      </div>
      <button class="card-btn">${t("cc.btn.runSafetyCheck")}</button>
    </div>

    <div class="card" onclick="exec('krl.generateReport')">
      <div>
        <div class="card-header">
          <span class="card-icon">📋</span>
          <span class="card-title">${t("command.generateReport")}</span>
        </div>
        <div class="card-desc">${t("command.generateReport.tooltip")}</div>
      </div>
      <button class="card-btn">${t("cc.btn.generateReport")}</button>
    </div>
  </div>

  <div class="section-title">👤 ${t("cc.accountHub")}</div>
  <div class="account-hub">
    <div class="tab-bar">
      <button class="tab-btn active" onclick="switchAccountTab('profile')">👤 ${t("cc.tab.profile")}</button>
      <button class="tab-btn" onclick="switchAccountTab('devices')">💻 ${t("cc.tab.devices")}</button>
      <button class="tab-btn" onclick="switchAccountTab('billing')">💳 ${t("cc.tab.billing")}</button>
      <button class="tab-btn" onclick="switchAccountTab('support')">🛟 ${t("cc.tab.support")}</button>
    </div>

    <!-- TAB 1: Profile & Key -->
    <div id="tab-profile" class="tab-content active">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
        <div style="font-size:16px; font-weight:bold; color:var(--accent);">${ownerName}</div>
        <span class="badge" style="background:${statusBadgeColor}">${premiumStatus}</span>
      </div>
      <div class="info-row"><span class="info-label">Account Email:</span><span class="info-val">${ownerEmail}</span></div>
      <div class="info-row"><span class="info-label">Plan Tier:</span><span class="info-val">${planVariant}</span></div>
      <div class="info-row">
        <span class="info-label">License Key:</span>
        <span class="info-val" style="font-family:monospace;">${maskedKey} ${isPremium() && licenseKey !== "NO-KEY" ? `<button class="card-btn" style="padding:2px 8px; font-size:11px; margin-left:8px;" onclick="copyKey('${licenseKey}')">Copy Key</button>` : ""}</span>
      </div>
      <div class="info-row"><span class="info-label">Online Expiry / Renewal:</span><span class="info-val">${onlineExpiry}</span></div>
      <div class="info-row"><span class="info-label">Offline Validation Cache:</span><span class="info-val">${offlineDaysLeft} Days Remaining (Auto-synced online)</span></div>
      
      <div style="margin-top:16px; display:flex; gap:10px;">
        ${
          isPremium()
            ? `<button class="card-btn" style="background:#dc3545;" onclick="deactivate()">${t("cc.profile.deactivate")}</button>
               <button class="card-btn" style="background:#444;" onclick="checkStatus()">${t("cc.profile.checkStatus")}</button>`
            : `<button class="card-btn" style="background:#28a745;" onclick="activate()">${t("cc.profile.activateKey")}</button>
               <button class="card-btn" style="background:#007acc;" onclick="buyLicense()">${t("cc.profile.buyPro")}</button>`
        }
      </div>
    </div>

    <!-- TAB 2: Device Manager -->
    <div id="tab-devices" class="tab-content">
      <div style="font-weight:600; margin-bottom:10px; font-size:14px;">💻 Active Device Binding</div>
      <div class="info-row"><span class="info-label">Current Hostname:</span><span class="info-val">${device.hostname} (${device.platform} ${device.arch})</span></div>
      <div class="info-row"><span class="info-label">Hardware Fingerprint:</span><span class="info-val" style="font-family:monospace; font-size:11px;">${device.hardwareId.slice(0, 24)}...</span></div>
      <div class="info-row"><span class="info-label">Slot Usage:</span><span class="info-val">${activations}</span></div>
      <div style="margin-top:14px; display:flex; gap:10px;">
        <button class="card-btn" style="background:#dc3545;" onclick="exec('krl.deactivateLicense')">${t("cc.devices.deactivatePc")}</button>
        <button class="card-btn" style="background:#444;" onclick="exec('krl.checkLicenseStatus')">${t("cc.devices.syncStatus")}</button>
      </div>
    </div>

    <!-- TAB 3: Subscription & Billing -->
    <div id="tab-billing" class="tab-content">
      <div style="font-weight:600; margin-bottom:10px; font-size:14px;">💳 ${t("cc.billing.title")}</div>
      <p style="font-size:12px; opacity:0.8; margin-bottom:14px;">${t("cc.billing.desc")}</p>
      
      <div style="display:flex; gap:10px; margin-bottom:16px;">
        <button class="card-btn" style="background:#FF6600;" onclick="openPortal()">${t("cc.billing.btn.portal")}</button>
        <button class="card-btn" style="background:#444;" onclick="downloadInvoice()">${t("cc.billing.btn.invoice")}</button>
      </div>

      <div style="font-weight:700; margin-top:20px; margin-bottom:12px; font-size:14px; color:var(--accent);">${t("cc.billing.plansTitle")}</div>
      <div class="grid" style="grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap:12px; margin-bottom:20px;">
        ${PRICING_PLANS.map(
          (plan) => `
          <div class="card" style="border: 1px solid rgba(255,102,0,0.3); background: rgba(255,102,0,0.02);">
            <div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                <span style="font-weight:700; font-size:14px;">${plan.name}</span>
                ${plan.badge ? `<span class="badge" style="font-size:9px; background:var(--accent);">${plan.badge}</span>` : ""}
              </div>
              <div style="font-size:18px; font-weight:800; color:var(--accent); margin-bottom:4px;">${plan.price} <span style="font-size:11px; font-weight:normal; opacity:0.8;">${plan.period}</span></div>
              <div class="card-desc" style="font-size:11px; margin-bottom:12px;">${plan.description}</div>
            </div>
            <button class="card-btn" style="width:100%; text-align:center;" onclick="buyPlan('${plan.checkoutUrl}')">${t("cc.billing.btn.buyPlan", plan.name)}</button>
          </div>
        `,
        ).join("")}
      </div>

      <div style="padding: 14px; background: rgba(255,255,255,0.03); border: 1px solid var(--card-border); border-radius: 6px; font-size: 12px; line-height: 1.6;">
        <div style="font-weight:700; margin-bottom:6px; color:var(--accent);">${t("cc.billing.legalNotice")}</div>
        <ul style="margin: 0 0 0 18px; padding: 0; opacity: 0.9;">
          <li>${t("cc.billing.legalItem1")}</li>
          <li>${t("cc.billing.legalItem2")}</li>
          <li>${t("cc.billing.legalItem3")}</li>
        </ul>
      </div>
    </div>

    <!-- TAB 4: Support & Feedback -->
    <div id="tab-support" class="tab-content">
      <div style="font-weight:600; margin-bottom:10px; font-size:14px;">🛟 Direct Engineering Support</div>
      <p style="font-size:12px; opacity:0.8; margin-bottom:14px;">${t("cc.support.desc")}</p>
      <div style="display:flex; flex-direction:column; gap:10px; max-width:420px;">
        <button class="card-btn" style="background:#2AABEE;" onclick="openTelegram()">${t("cc.support.btn.chat")}</button>
        <button class="card-btn" style="background:#FF6600;" onclick="exec('krl.sendLogsToDeveloper')">${t("cc.support.btn.sendLogs")}</button>
        <button class="card-btn" style="background:#28a745;" onclick="exec('krl.sendFileToDeveloper')">${t("cc.support.btn.sendFile")}</button>
        <button class="card-btn" style="background:#333;" onclick="openGitHub()">${t("cc.support.btn.github")}</button>
        <button class="card-btn" style="background:#007acc;" onclick="sendFeedback()">${t("cc.support.btn.email")}</button>
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
    function switchAccountTab(tabName) {
      document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
      
      const targetBtn = event.currentTarget;
      const targetContent = document.getElementById('tab-' + tabName);
      if (targetBtn) targetBtn.classList.add('active');
      if (targetContent) targetContent.classList.add('active');
    }
  </script>
</body>
</html>`;
}
