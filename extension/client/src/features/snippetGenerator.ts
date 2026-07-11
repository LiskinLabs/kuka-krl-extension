import * as vscode from "vscode";
import { t } from "../i18n";

export function showSnippetGenerator(context: vscode.ExtensionContext) {
  const panel = vscode.window.createWebviewPanel(
    "krlSnippetGenerator",
    t("snippet.title"),
    vscode.ViewColumn.Beside,
    {
      enableScripts: true,
      localResourceRoots: [vscode.Uri.joinPath(context.extensionUri, "node_modules")],
    },
  );

  const toolkitUri = panel.webview.asWebviewUri(
    vscode.Uri.joinPath(
      context.extensionUri,
      "node_modules",
      "@vscode",
      "webview-ui-toolkit",
      "dist",
      "toolkit.js",
    ),
  );

  panel.webview.html = getWebviewContent(toolkitUri.toString());

  panel.webview.onDidReceiveMessage(
    (message) => {
      switch (message.command) {
        case "insertCode":
          const editor = vscode.window.activeTextEditor;
          if (editor) {
            editor.edit((editBuilder) => {
              editBuilder.insert(editor.selection.active, message.text);
            });
            vscode.window.showInformationMessage(t("snippet.alert.inserted"));
          } else {
            vscode.window.showErrorMessage(t("snippet.alert.noEditor"));
          }
          return;
      }
    },
    undefined,
    context.subscriptions,
  );
}

function getWebviewContent(toolkitUri: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${t("snippet.title")}</title>
    <script type="module" src="${toolkitUri}"></script>
    <style>
        body { padding: 20px; }
        h2 { border-bottom: 1px solid var(--vscode-panel-border); padding-bottom: 10px; margin-bottom: 20px; }
        .form-group { margin-bottom: 15px; display: flex; flex-direction: column; gap: 4px; max-width: 400px; }
        vscode-panel-tab { text-transform: uppercase; }
        .action-container { margin-top: 20px; padding-top: 15px; border-top: 1px solid var(--vscode-panel-border); }
    </style>
</head>
<body>
    <h2>${t("snippet.title")}</h2>

    <vscode-panels>
        <vscode-panel-tab id="tab-1">${t("snippet.tab.message")}</vscode-panel-tab>
        <vscode-panel-tab id="tab-2">${t("snippet.tab.grid")}</vscode-panel-tab>
        <vscode-panel-tab id="tab-3">${t("snippet.tab.motion")}</vscode-panel-tab>

        <vscode-panel-view id="view-1">
            <div style="width:100%;">
                <h3>${t("snippet.msg.title")}</h3>
                <p>${t("snippet.msg.desc")}</p>
                <div class="form-group">
                    <label>${t("snippet.msg.type")}</label>
                    <vscode-dropdown id="msgType">
                        <vscode-option value="Notify">${t("snippet.msg.type.notify")}</vscode-option>
                        <vscode-option value="Quit">${t("snippet.msg.type.quit")}</vscode-option>
                        <vscode-option value="State">${t("snippet.msg.type.state")}</vscode-option>
                        <vscode-option value="Wait">${t("snippet.msg.type.wait")}</vscode-option>
                    </vscode-dropdown>
                </div>
                <div class="form-group">
                    <label>${t("snippet.msg.key")}</label>
                    <vscode-text-field id="msgKey" placeholder="${t("snippet.msg.key.placeholder")}" value="Msg1"></vscode-text-field>
                </div>
                <div class="form-group">
                    <label>${t("snippet.msg.text")}</label>
                    <vscode-text-field id="msgText" placeholder="${t("snippet.msg.text.placeholder")}" value="Process started"></vscode-text-field>
                </div>
                <div class="form-group">
                    <label>${t("snippet.msg.param1")}</label>
                    <vscode-text-field id="msgP1" placeholder="${t("snippet.msg.param1.placeholder")}"></vscode-text-field>
                </div>
                <div class="action-container">
                    <vscode-button onclick="generateMessage()">${t("snippet.insert")}</vscode-button>
                </div>
            </div>
        </vscode-panel-view>

        <vscode-panel-view id="view-2">
            <div style="width:100%;">
                <h3>${t("snippet.grid.title")}</h3>
                <p>${t("snippet.grid.desc")}</p>
                <div class="form-group">
                    <label>${t("snippet.grid.base")}</label>
                    <vscode-text-field id="gridBase" value="xBasePoint"></vscode-text-field>
                </div>
                <div class="form-group">
                    <label>${t("snippet.grid.rows")}</label>
                    <vscode-text-field id="gridRows" value="3"></vscode-text-field>
                </div>
                <div class="form-group">
                    <label>${t("snippet.grid.cols")}</label>
                    <vscode-text-field id="gridCols" value="2"></vscode-text-field>
                </div>
                <div class="form-group">
                    <label>${t("snippet.grid.spaceX")}</label>
                    <vscode-text-field id="gridSpaceX" value="100"></vscode-text-field>
                </div>
                <div class="form-group">
                    <label>${t("snippet.grid.spaceY")}</label>
                    <vscode-text-field id="gridSpaceY" value="100"></vscode-text-field>
                </div>
                <div class="action-container">
                    <vscode-button onclick="generateGrid()">${t("snippet.insert")}</vscode-button>
                </div>
            </div>
        </vscode-panel-view>

        <vscode-panel-view id="view-3">
            <div style="width:100%;">
                <h3>${t("snippet.mot.title")}</h3>
                <p>${t("snippet.mot.desc")}</p>
                <div class="form-group">
                    <label>${t("snippet.mot.type")}</label>
                    <vscode-dropdown id="motionType">
                        <vscode-option value="PTP">PTP</vscode-option>
                        <vscode-option value="LIN">LIN</vscode-option>
                    </vscode-dropdown>
                </div>
                <div class="form-group">
                    <label>${t("snippet.mot.point")}</label>
                    <vscode-text-field id="motionPoint" value="p1"></vscode-text-field>
                </div>
                <div class="form-group">
                    <label>${t("snippet.mot.vel")}</label>
                    <vscode-text-field id="motionVel" value="100"></vscode-text-field>
                </div>
                <div class="form-group">
                    <label>${t("snippet.mot.approx")}</label>
                    <vscode-dropdown id="motionApprox">
                        <vscode-option value="">${t("snippet.mot.approx.none")}</vscode-option>
                        <vscode-option value="C_PTP">C_PTP</vscode-option>
                        <vscode-option value="C_DIS">C_DIS</vscode-option>
                    </vscode-dropdown>
                </div>
                <div class="action-container">
                    <vscode-button onclick="generateMotion()">${t("snippet.insert")}</vscode-button>
                </div>
            </div>
        </vscode-panel-view>
    </vscode-panels>

    <script>
        const vscode = acquireVsCodeApi();

        function generateMessage() {
            const type = document.getElementById('msgType').value;
            const key = document.getElementById('msgKey').value || "Msg1";
            const text = document.getElementById('msgText').value || "Message";
            const p1 = document.getElementById('msgP1').value;

            // Generate clean code
            let krl = \`;FOLD Message: \${text}\\n\`;
            krl += \`decl KrlMsg_T msg\\n\`;
            krl += \`decl KrlMsgPar_T par[3]\\n\`;
            krl += \`decl KrlMsgOpt_T opt\\n\`;
            krl += \`decl INT handle\\n\\n\`;

            krl += \`msg = {Modul[] "User", Nr 1, Msg_txt[] "\${text}"}\\n\`;
            
            if (p1) {
                krl += \`par[1] = {Par_type #Value, Par_int \${p1}}\\n\`;
            }

            if (type === 'Notify') {
                krl += \`handle = Set_KrlMsg(#Notify, msg, par[], opt)\\n\`;
            } else if (type === 'Quit') {
                 krl += \`handle = Set_KrlMsg(#Quit, msg, par[], opt)\\n\`;
                 krl += \`WHILE ( Exists_KrlMsg(handle) )\\n  WAIT SEC 0.1\\nENDWHILE\\n\`;
            } else if (type === 'State') {
                krl += \`handle = Set_KrlMsg(#State, msg, par[], opt)\\n\`;
            } else if (type === 'Wait') {
                krl += \`handle = Set_KrlMsg(#Waiting, msg, par[], opt)\\n\`;
            }
            krl += \`;ENDFOLD\\n\`;
            
            vscode.postMessage({
                command: 'insertCode',
                text: krl
            });
        }

        function generateGrid() {
            const base = document.getElementById('gridBase').value;
            const rows = document.getElementById('gridRows').value;
            const cols = document.getElementById('gridCols').value;
            const spaceX = document.getElementById('gridSpaceX').value;
            const spaceY = document.getElementById('gridSpaceY').value;

            let krl = \`;FOLD Grid Pattern\\n\`;
            krl += \`; Please declare these at the top of your file:\\n\`;
            krl += \`; DECL INT i_grid, j_grid\\n\`;
            krl += \`; DECL FRAME fPos\\n\\n\`;

            krl += \`FOR i_grid = 1 TO \${rows}\\n\`;
            krl += \`  FOR j_grid = 1 TO \${cols}\\n\`;
            krl += \`    fPos = \${base}\\n\`;
            krl += \`    fPos.X = fPos.X + (i_grid-1) * \${spaceX}\\n\`;
            krl += \`    fPos.Y = fPos.Y + (j_grid-1) * \${spaceY}\\n\`;
            krl += \`    \\n\`;
            krl += \`    ; Move to position\\n\`;
            krl += \`    LIN fPos\\n\`;
            krl += \`    \\n\`;
            krl += \`  ENDFOR\\n\`;
            krl += \`ENDFOR\\n\`;
            krl += \`;ENDFOLD\\n\`;

            vscode.postMessage({
                command: 'insertCode',
                text: krl
            });
        }

        function generateMotion() {
            const type = document.getElementById('motionType').value;
            const point = document.getElementById('motionPoint').value || "p1";
            const vel = document.getElementById('motionVel').value || "100";
            const approx = document.getElementById('motionApprox').value;
            
            let krl = \`;FOLD \${type} \${point} Vel=\${vel} \${type==='PTP'?'%':'m/s'} \${approx}\\n\`;
            
            if (type === 'PTP') {
                krl += \`$BWDSTART=FALSE\\n\`;
                krl += \`PDAT_ACT=PDEF_DAT\\n\`;
                krl += \`FDAT_ACT=FDEF_DAT\\n\`;
                krl += \`BAS(#PTP_PARAMS, \${vel})\\n\`;
                krl += \`\${type} X\${point} \${approx}\\n\`;
            } else {
                krl += \`$BWDSTART=FALSE\\n\`;
                krl += \`LDAT_ACT=LDEF_DAT\\n\`;
                krl += \`FDAT_ACT=FDEF_DAT\\n\`;
                krl += \`BAS(#CP_PARAMS, \${vel})\\n\`;
                krl += \`\${type} X\${point} \${approx}\\n\`;
            }
            
            krl += \`;ENDFOLD\\n\`;

            vscode.postMessage({
                command: 'insertCode',
                text: krl
            });
        }
    </script>
</body>
</html>`;
}
