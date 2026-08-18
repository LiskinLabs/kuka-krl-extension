import * as vscode from "vscode";
import { t } from "../i18n";

export class SnippetGeneratorPanel {
  public static currentPanel: SnippetGeneratorPanel | undefined;
  private readonly panel: vscode.WebviewPanel;
  private readonly extensionUri: vscode.Uri;
  private disposables: vscode.Disposable[] = [];

  private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    this.panel = panel;
    this.extensionUri = extensionUri;

    this.update();

    this.panel.onDidDispose(() => this.dispose(), null, this.disposables);

    this.panel.webview.onDidReceiveMessage(
      async (message) => {
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
            break;
        }
      },
      null,
      this.disposables,
    );
  }

  public static createOrShow(extensionUri: vscode.Uri) {
    if (SnippetGeneratorPanel.currentPanel) {
      SnippetGeneratorPanel.currentPanel.panel.reveal(vscode.ViewColumn.Beside);
      return;
    }

    const panel = vscode.window.createWebviewPanel(
      "krlSnippetGenerator",
      t("snippet.title"),
      vscode.ViewColumn.Beside,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
      },
    );

    SnippetGeneratorPanel.currentPanel = new SnippetGeneratorPanel(
      panel,
      extensionUri,
    );
  }

  private update() {
    this.panel.webview.html = this.getHtmlForWebview();
  }

  public dispose() {
    SnippetGeneratorPanel.currentPanel = undefined;
    this.panel.dispose();
    while (this.disposables.length) {
      const x = this.disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

  private getHtmlForWebview(): string {
    const ptpDesc = JSON.stringify(t("snippet.desc.ptp", "{vel}"));
    const linDesc = JSON.stringify(t("snippet.desc.lin", "{vel}"));
    const circDesc = JSON.stringify(
      t("snippet.desc.circ", "{aux}", "{point}", "{vel}"),
    );
    const sptpDesc = JSON.stringify(t("snippet.desc.sptp"));
    const slinDesc = JSON.stringify(t("snippet.desc.slin"));
    const scircDesc = JSON.stringify(
      t("snippet.desc.scirc", "{aux}", "{point}"),
    );
    const splineBlockDesc = JSON.stringify(t("snippet.desc.splineBlock"));

    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src ${this.panel.webview.cspSource} https: data:; script-src ${this.panel.webview.cspSource} 'unsafe-inline'; style-src ${this.panel.webview.cspSource} 'unsafe-inline'; font-src ${this.panel.webview.cspSource};">
    <title>${t("snippet.title")}</title>
    <style>
        body {
            padding: 15px;
            font-family: var(--vscode-font-family);
            font-size: var(--vscode-font-size);
            color: var(--vscode-foreground);
            background-color: var(--vscode-editor-background);
        }
        .form-group {
            margin-bottom: 12px;
        }
        label {
            display: block;
            margin-bottom: 4px;
            font-weight: 600;
            font-size: 12px;
        }
        input, select, textarea {
            width: 100%;
            padding: 6px 8px;
            border-radius: 4px;
            border: 1px solid var(--vscode-input-border, #334155);
            background: var(--vscode-input-background, #0f172a);
            color: var(--vscode-input-foreground, #ffffff);
            font-family: inherit;
            box-sizing: border-box;
        }
        .action-container {
            margin-top: 16px;
        }
        .btn-primary {
            background: var(--vscode-button-background, #ff6600);
            color: var(--vscode-button-foreground, #ffffff);
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            font-weight: 600;
            cursor: pointer;
        }
        .btn-primary:hover {
            background: var(--vscode-button-hoverBackground, #e65c00);
        }
        .tab-buttons {
            display: flex;
            gap: 8px;
            margin-bottom: 16px;
            border-bottom: 1px solid var(--vscode-widget-border, #334155);
            padding-bottom: 8px;
        }
        .tab-btn {
            background: transparent;
            border: none;
            color: var(--vscode-foreground);
            padding: 6px 12px;
            cursor: pointer;
            border-radius: 4px;
            font-weight: 500;
            opacity: 0.7;
        }
        .tab-btn.active {
            background: var(--vscode-button-secondaryBackground, rgba(255,102,0,0.2));
            color: #ff6600;
            opacity: 1;
            font-weight: 700;
        }
        .tab-content {
            display: none;
        }
        .tab-content.active {
            display: block;
        }
        .diagram-box {
            background: var(--vscode-sideBar-background, #1e293b);
            border: 1px solid var(--vscode-widget-border, #334155);
            border-radius: 8px;
            padding: 12px;
            margin-top: 12px;
        }
        .diagram-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
        }
        .badge {
            background: #ff6600;
            color: #fff;
            font-size: 10px;
            padding: 2px 6px;
            border-radius: 4px;
            font-weight: 700;
        }
        .diagram-desc {
            font-size: 12px;
            color: var(--vscode-descriptionForeground);
            line-height: 1.4;
            margin-top: 8px;
        }
    </style>
</head>
<body>
    <div class="tab-buttons">
        <button class="tab-btn active" onclick="showTab('msg')">${t("snippet.tab.message")}</button>
        <button class="tab-btn" onclick="showTab('grid')">${t("snippet.tab.grid")}</button>
        <button class="tab-btn" onclick="showTab('motion')">${t("snippet.tab.motion")}</button>
    </div>

    <!-- Message Builder -->
    <div id="tab-msg" class="tab-content active">
        <h3>${t("snippet.msg.title")}</h3>
        <p style="font-size:12px; color:var(--vscode-descriptionForeground);">${t("snippet.msg.desc")}</p>
        <div class="form-group">
            <label>${t("snippet.msg.type")}</label>
            <select id="msgType">
                <option value="Notify">${t("snippet.msg.type.notify")}</option>
                <option value="Quit">${t("snippet.msg.type.quit")}</option>
                <option value="State">${t("snippet.msg.type.state")}</option>
                <option value="Wait">${t("snippet.msg.type.wait")}</option>
            </select>
        </div>
        <div class="form-group">
            <label>${t("snippet.msg.key")}</label>
            <input type="text" id="msgKey" placeholder="${t("snippet.msg.key.placeholder")}" value="Msg1">
        </div>
        <div class="form-group">
            <label>${t("snippet.msg.text")}</label>
            <input type="text" id="msgText" placeholder="${t("snippet.msg.text.placeholder")}" value="Process started">
        </div>
        <div class="form-group">
            <label>${t("snippet.msg.param1")}</label>
            <input type="text" id="msgP1" placeholder="${t("snippet.msg.param1.placeholder")}">
        </div>
        <div class="action-container">
            <button class="btn-primary" onclick="generateMessage()">${t("snippet.insert")}</button>
        </div>
    </div>

    <!-- Grid Pattern -->
    <div id="tab-grid" class="tab-content">
        <h3>${t("snippet.grid.title")}</h3>
        <p style="font-size:12px; color:var(--vscode-descriptionForeground);">${t("snippet.grid.desc")}</p>
        <div class="form-group">
            <label>${t("snippet.grid.base")}</label>
            <input type="text" id="gridBase" value="xBasePoint">
        </div>
        <div class="form-group">
            <label>${t("snippet.grid.rows")}</label>
            <input type="text" id="gridRows" value="3">
        </div>
        <div class="form-group">
            <label>${t("snippet.grid.cols")}</label>
            <input type="text" id="gridCols" value="2">
        </div>
        <div class="form-group">
            <label>${t("snippet.grid.spaceX")}</label>
            <input type="text" id="gridSpaceX" value="100">
        </div>
        <div class="form-group">
            <label>${t("snippet.grid.spaceY")}</label>
            <input type="text" id="gridSpaceY" value="100">
        </div>
        <div class="action-container">
            <button class="btn-primary" onclick="generateGrid()">${t("snippet.insert")}</button>
        </div>
    </div>

    <!-- Motion Builder -->
    <div id="tab-motion" class="tab-content">
        <h3>${t("snippet.mot.title")}</h3>
        <p style="font-size:12px; color:var(--vscode-descriptionForeground);">${t("snippet.mot.desc")}</p>
        <div class="form-group">
            <label>${t("snippet.mot.type")}</label>
            <select id="motionType" onchange="updateMotionPreview()">
                <option value="PTP">PTP (Point-To-Point)</option>
                <option value="LIN">LIN (Linear Interpolation)</option>
                <option value="CIRC">CIRC (Circular Interpolation)</option>
                <option value="SPTP">SPTP (Spline PTP - KSS 8.3+)</option>
                <option value="SLIN">SLIN (Spline Linear)</option>
                <option value="SCIRC">SCIRC (Spline Circular)</option>
                <option value="SPLINE_BLOCK">SPLINE Path Block</option>
            </select>
        </div>
        <div class="form-group">
            <label>${t("snippet.mot.point")}</label>
            <input type="text" id="motionPoint" value="P1" oninput="updateMotionPreview()">
        </div>
        <div class="form-group" id="groupAuxPoint" style="display:none;">
            <label>Auxiliary Point (CIRC / SCIRC)</label>
            <input type="text" id="motionAuxPoint" value="P_AUX" oninput="updateMotionPreview()">
        </div>
        <div class="form-group">
            <label>${t("snippet.mot.vel")}</label>
            <input type="text" id="motionVel" value="100" oninput="updateMotionPreview()">
        </div>
        <div class="form-group">
            <label>${t("snippet.mot.approx")}</label>
            <select id="motionApprox" onchange="updateMotionPreview()">
                <option value="">${t("snippet.mot.approx.none")}</option>
                <option value="C_PTP">C_PTP (Point approximation)</option>
                <option value="C_DIS">C_DIS (Distance approx)</option>
                <option value="C_VEL">C_VEL (Velocity approx)</option>
            </select>
        </div>

        <div class="diagram-box">
            <div class="diagram-header">
                <span style="font-weight:600; font-size:12px;">Trajectory Diagram</span>
                <span id="diagramBadge" class="badge">PTP</span>
            </div>
            <div id="diagramSvgContainer" style="text-align:center;"></div>
            <div id="diagramDescription" class="diagram-desc"></div>
        </div>

        <div class="action-container">
            <button class="btn-primary" onclick="generateMotion()">${t("snippet.insert")}</button>
        </div>
    </div>

    <script>
        const vscode = acquireVsCodeApi();
        const descPtpTpl = ${ptpDesc};
        const descLinTpl = ${linDesc};
        const descCircTpl = ${circDesc};
        const descSptpTpl = ${sptpDesc};
        const descSlinTpl = ${slinDesc};
        const descScircTpl = ${scircDesc};
        const descSplineBlockTpl = ${splineBlockDesc};

        function showTab(tabId) {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

            if (tabId === 'msg') {
                document.querySelectorAll('.tab-btn')[0].classList.add('active');
                document.getElementById('tab-msg').classList.add('active');
            } else if (tabId === 'grid') {
                document.querySelectorAll('.tab-btn')[1].classList.add('active');
                document.getElementById('tab-grid').classList.add('active');
            } else if (tabId === 'motion') {
                document.querySelectorAll('.tab-btn')[2].classList.add('active');
                document.getElementById('tab-motion').classList.add('active');
                updateMotionPreview();
            }
        }

        function updateMotionPreview() {
            const type = document.getElementById('motionType').value;
            const point = document.getElementById('motionPoint').value || "P1";
            const auxPoint = document.getElementById('motionAuxPoint').value || "P_AUX";
            const vel = document.getElementById('motionVel').value || "100";
            const approx = document.getElementById('motionApprox').value;

            const groupAux = document.getElementById('groupAuxPoint');
            if (type === 'CIRC' || type === 'SCIRC') {
                groupAux.style.display = 'block';
            } else {
                groupAux.style.display = 'none';
            }

            const svgContainer = document.getElementById('diagramSvgContainer');
            const desc = document.getElementById('diagramDescription');
            const badge = document.getElementById('diagramBadge');

            badge.innerText = type;

            let svg = '';
            let explanation = '';

            if (type === 'PTP') {
                explanation = descPtpTpl.replace('{vel}', vel);
                svg = '<svg width="280" height="170" viewBox="0 0 280 170" xmlns="http://www.w3.org/2000/svg"><pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(128,128,128,0.15)" stroke-width="1"/></pattern><rect width="280" height="170" fill="url(#grid)" /><path d="M 40 130 Q 140 20 240 70" fill="none" stroke="#FF6600" stroke-width="3" stroke-dasharray="6,4"/><path d="M 40 130 Q 90 80 140 20" fill="none" stroke="#0078D4" stroke-width="1.5" stroke-opacity="0.6"/><circle cx="40" cy="130" r="6" fill="#0078D4" /><text x="30" y="150" fill="var(--vscode-foreground)" font-size="11" font-weight="bold">Start (P0)</text><circle cx="240" cy="70" r="7" fill="#FF6600" /><text x="220" y="92" fill="#FF6600" font-size="12" font-weight="bold">X' + point + '</text><line x1="240" y1="70" x2="260" y2="50" stroke="#00E5FF" stroke-width="2" stroke-dasharray="2,2"/><polygon points="260,50 252,52 258,58" fill="#00E5FF" /><text x="210" y="45" fill="#00E5FF" font-size="10">TCP ' + vel + '%</text><text x="110" y="150" fill="var(--vscode-descriptionForeground)" font-size="10">Joint Interpolation (A1-A6)</text></svg>';
            } else if (type === 'LIN') {
                explanation = descLinTpl.replace('{vel}', vel);
                svg = '<svg width="280" height="170" viewBox="0 0 280 170" xmlns="http://www.w3.org/2000/svg"><rect width="280" height="170" fill="url(#grid)" /><line x1="40" y1="130" x2="240" y2="50" stroke="#FF6600" stroke-width="3.5" />' + (approx ? '<circle cx="240" cy="50" r="18" fill="rgba(255,102,0,0.15)" stroke="#FF6600" stroke-dasharray="2,2" />' : '') + '<circle cx="40" cy="130" r="6" fill="#0078D4" /><text x="30" y="150" fill="var(--vscode-foreground)" font-size="11" font-weight="bold">Start (P0)</text><circle cx="240" cy="50" r="7" fill="#FF6600" /><text x="230" y="35" fill="#FF6600" font-size="12" font-weight="bold">X' + point + '</text><polygon points="145,88 135,97 137,84" fill="#FF6600" /><text x="145" y="110" fill="#FF6600" font-size="11" font-weight="bold">' + vel + ' m/s (' + (approx || 'EXACT') + ')</text></svg>';
            } else if (type === 'CIRC') {
                explanation = descCircTpl.replace('{aux}', auxPoint).replace('{point}', point).replace('{vel}', vel);
                svg = '<svg width="280" height="170" viewBox="0 0 280 170" xmlns="http://www.w3.org/2000/svg"><rect width="280" height="170" fill="url(#grid)" /><path d="M 40 130 Q 140 20 240 120" fill="none" stroke="#FF6600" stroke-width="3" /><circle cx="40" cy="130" r="6" fill="#0078D4" /><text x="25" y="150" fill="var(--vscode-foreground)" font-size="11" font-weight="bold">Start</text><circle cx="140" cy="48" r="6" fill="#00E5FF" /><text x="125" y="32" fill="#00E5FF" font-size="11" font-weight="bold">X' + auxPoint + '</text><circle cx="240" cy="120" r="7" fill="#FF6600" /><text x="225" y="142" fill="#FF6600" font-size="12" font-weight="bold">X' + point + '</text></svg>';
            } else if (type === 'SPTP') {
                explanation = descSptpTpl;
                svg = '<svg width="280" height="170" viewBox="0 0 280 170" xmlns="http://www.w3.org/2000/svg"><rect width="280" height="170" fill="url(#grid)" /><path d="M 40 130 C 100 30, 180 150, 240 60" fill="none" stroke="#00E5FF" stroke-width="3.5" /><path d="M 40 130 C 100 30, 180 150, 240 60" fill="none" stroke="#FF6600" stroke-width="1.5" stroke-dasharray="3,3" /><circle cx="40" cy="130" r="6" fill="#0078D4" /><text x="25" y="150" fill="var(--vscode-foreground)" font-size="11" font-weight="bold">Start</text><circle cx="240" cy="60" r="7" fill="#00E5FF" /><text x="225" y="45" fill="#00E5FF" font-size="12" font-weight="bold">X' + point + '</text><text x="80" y="155" fill="#00E5FF" font-size="10" font-weight="bold">⚡ Spline Jerk-Control ($SGEAR_JERK)</text></svg>';
            } else if (type === 'SLIN') {
                explanation = descSlinTpl;
                svg = '<svg width="280" height="170" viewBox="0 0 280 170" xmlns="http://www.w3.org/2000/svg"><rect width="280" height="170" fill="url(#grid)" /><line x1="40" y1="120" x2="210" y2="60" stroke="#00E5FF" stroke-width="3.5" /><path d="M 210 60 Q 230 54 250 40" fill="none" stroke="#00E5FF" stroke-width="3.5" stroke-dasharray="2,2" /><circle cx="40" cy="120" r="6" fill="#0078D4" /><circle cx="210" cy="60" r="7" fill="#00E5FF" /><text x="195" y="80" fill="#00E5FF" font-size="12" font-weight="bold">X' + point + '</text><text x="60" y="145" fill="#00E5FF" font-size="10">Continuous Path & Orientation Control</text></svg>';
            } else if (type === 'SCIRC') {
                explanation = descScircTpl.replace('{aux}', auxPoint).replace('{point}', point);
                svg = '<svg width="280" height="170" viewBox="0 0 280 170" xmlns="http://www.w3.org/2000/svg"><rect width="280" height="170" fill="url(#grid)" /><path d="M 40 120 C 90 20, 190 20, 240 120" fill="none" stroke="#00E5FF" stroke-width="3.5" /><circle cx="40" cy="120" r="6" fill="#0078D4" /><circle cx="140" cy="35" r="6" fill="#FF6600" /><text x="125" y="20" fill="#FF6600" font-size="11" font-weight="bold">X' + auxPoint + '</text><circle cx="240" cy="120" r="7" fill="#00E5FF" /><text x="225" y="140" fill="#00E5FF" font-size="12" font-weight="bold">X' + point + '</text></svg>';
            } else if (type === 'SPLINE_BLOCK') {
                explanation = descSplineBlockTpl;
                svg = '<svg width="280" height="170" viewBox="0 0 280 170" xmlns="http://www.w3.org/2000/svg"><rect width="280" height="170" fill="url(#grid)" /><path d="M 30 130 L 100 60 Q 150 140 220 50 L 260 70" fill="none" stroke="#FF6600" stroke-width="3.5" /><circle cx="30" cy="130" r="5" fill="#0078D4" /><circle cx="100" cy="60" r="5" fill="#00E5FF" /><circle cx="220" cy="50" r="5" fill="#00E5FF" /><circle cx="260" cy="70" r="5" fill="#FF6600" /><text x="90" y="45" fill="#00E5FF" font-size="10">P1</text><text x="210" y="35" fill="#00E5FF" font-size="10">P2</text><text x="245" y="90" fill="#FF6600" font-size="10">P3</text></svg>';
            }

            svgContainer.innerHTML = svg;
            desc.innerHTML = explanation;
        }

        function generateMessage() {
            const type = document.getElementById('msgType').value;
            const key = document.getElementById('msgKey').value || "Msg1";
            const text = document.getElementById('msgText').value || "Message";
            const p1 = document.getElementById('msgP1').value;

            let krl = ';FOLD Message: ' + text + '\\n';
            krl += 'decl KrlMsg_T msg\\n';
            krl += 'decl KrlMsgPar_T par[3]\\n';
            krl += 'decl KrlMsgOpt_T opt\\n';
            krl += 'decl INT handle\\n\\n';

            krl += 'msg = {Modul[] "User", Nr 1, Msg_txt[] "' + text + '"}\\n';
            
            if (p1) {
                krl += 'par[1] = {Par_type #Value, Par_int ' + p1 + '}\\n';
            }

            if (type === 'Notify') {
                krl += 'handle = Set_KrlMsg(#Notify, msg, par[], opt)\\n';
            } else if (type === 'Quit') {
                 krl += 'handle = Set_KrlMsg(#Quit, msg, par[], opt)\\n';
                 krl += 'WHILE ( Exists_KrlMsg(handle) )\\n  WAIT SEC 0.1\\nENDWHILE\\n';
            } else if (type === 'State') {
                krl += 'handle = Set_KrlMsg(#State, msg, par[], opt)\\n';
            } else if (type === 'Wait') {
                krl += 'handle = Set_KrlMsg(#Waiting, msg, par[], opt)\\n';
            }
            krl += ';ENDFOLD\\n';
            
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

            let krl = ';FOLD Grid Pattern\\n';
            krl += '; Please declare these at the top of your file:\\n';
            krl += '; DECL INT i_grid, j_grid\\n';
            krl += '; DECL FRAME fPos\\n\\n';

            krl += 'FOR i_grid = 1 TO ' + rows + '\\n';
            krl += '  FOR j_grid = 1 TO ' + cols + '\\n';
            krl += '    fPos = ' + base + '\\n';
            krl += '    fPos.X = fPos.X + (i_grid-1) * ' + spaceX + '\\n';
            krl += '    fPos.Y = fPos.Y + (j_grid-1) * ' + spaceY + '\\n';
            krl += '    \\n';
            krl += '    ; Move to position\\n';
            krl += '    LIN fPos\\n';
            krl += '    \\n';
            krl += '  ENDFOR\\n';
            krl += 'ENDFOR\\n';
            krl += ';ENDFOLD\\n';

            vscode.postMessage({
                command: 'insertCode',
                text: krl
            });
        }

        function generateMotion() {
            const type = document.getElementById('motionType').value;
            const point = document.getElementById('motionPoint').value || "P1";
            const auxPoint = document.getElementById('motionAuxPoint').value || "P_AUX";
            const vel = document.getElementById('motionVel').value || "100";
            const approx = document.getElementById('motionApprox').value;

            let krl = ';FOLD Motion ' + type + ' ' + point + '\\n';
            
            if (type === 'PTP') {
                krl += '$VEL_AXIS[1] = ' + vel + '\\n';
                krl += 'PTP X' + point + (approx ? (' ' + approx) : '') + '\\n';
            } else if (type === 'LIN') {
                krl += '$VEL.CP = ' + vel + '\\n';
                krl += 'LIN X' + point + (approx ? (' ' + approx) : '') + '\\n';
            } else if (type === 'CIRC') {
                krl += '$VEL.CP = ' + vel + '\\n';
                krl += 'CIRC X' + auxPoint + ', X' + point + (approx ? (' ' + approx) : '') + '\\n';
            } else if (type === 'SPTP') {
                krl += 'SPTP X' + point + '\\n';
            } else if (type === 'SLIN') {
                krl += 'SLIN X' + point + '\\n';
            } else if (type === 'SCIRC') {
                krl += 'SCIRC X' + auxPoint + ', X' + point + '\\n';
            } else if (type === 'SPLINE_BLOCK') {
                krl += 'SPLINE\\n';
                krl += '  SLIN X' + point + '\\n';
                krl += '  SPL X' + auxPoint + '\\n';
                krl += 'ENDSPLINE\\n';
            }
            
            krl += ';ENDFOLD\\n';

            vscode.postMessage({
                command: 'insertCode',
                text: krl
            });
        }

        updateMotionPreview();
    </script>
</body>
</html>`;
  }
}

export function showSnippetGenerator(context: vscode.ExtensionContext) {
  SnippetGeneratorPanel.createOrShow(context.extensionUri);
}
