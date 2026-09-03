import * as vscode from "vscode";
import * as crypto from "crypto";
import * as https from "https";
import * as http from "http";

/**
 * Anonymous, Zero-PII Industrial Telemetry Service for KUKA KRL Professional
 * Fully compliant with VS Code Marketplace Policy & GDPR
 */
export function registerTelemetry(context: vscode.ExtensionContext): void {
  // Delay 6 seconds after extension activation to avoid impacting startup time
  setTimeout(async () => {
    try {
      // 1. Check if user or VS Code has telemetry disabled
      const isGlobalTelemetryEnabled = vscode.env.isTelemetryEnabled ?? true;
      const isKrlTelemetryEnabled = vscode.workspace
        .getConfiguration("krl")
        .get<boolean>("telemetry.enabled", true);

      if (!isGlobalTelemetryEnabled || !isKrlTelemetryEnabled) {
        return;
      }

      // 2. Prevent multiple pings per day (1 daily heartbeat per device)
      const today = new Date().toISOString().split("T")[0];
      const lastPing = context.globalState.get<string>("krl.lastTelemetryDate");
      if (lastPing === today) {
        return;
      }

      // 3. Generate non-reversible anonymous device identifier
      const rawMachineId = vscode.env.machineId || "krl-dev-station";
      const anonymousId = crypto
        .createHash("sha256")
        .update(rawMachineId)
        .digest("hex")
        .substring(0, 16);

      const gatewayUrl = vscode.workspace
        .getConfiguration("krl")
        .get<string>(
          "supportGatewayUrl",
          "https://kuka-krl-support-gateway.redminotpro5.workers.dev",
        )
        .replace(/\/+$/, "");
      const pingUrl = `${gatewayUrl}/api/telemetry/ping`;

      const payload = JSON.stringify({
        anonymousId,
        os: process.platform,
        appVersion: "1.7.3",
        vscodeVersion: vscode.version,
        locale: vscode.env.language || "en",
      });

      const parsedUrl = new URL(pingUrl);
      const isHttps = parsedUrl.protocol === "https:";
      const client = isHttps ? https : http;

      const req = client.request(
        {
          protocol: parsedUrl.protocol,
          hostname: parsedUrl.hostname,
          port: parsedUrl.port || (isHttps ? 443 : 80),
          path: parsedUrl.pathname,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(payload),
          },
          timeout: 8000,
        },
        (res) => {
          if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
            context.globalState.update("krl.lastTelemetryDate", today);
          }
        },
      );

      req.on("error", () => {
        // Silently ignore offline network errors on factory floors
      });

      req.write(payload);
      req.end();
    } catch {
      // Zero crash impact
    }
  }, 6000);
}
