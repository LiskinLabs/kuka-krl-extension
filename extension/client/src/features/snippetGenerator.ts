import * as vscode from "vscode";
import { t } from "../i18n";

export function showSnippetGenerator(context: vscode.ExtensionContext) {
  const panel = vscode.window.createWebviewPanel(
    "krlSnippetGenerator",
    t("snippet.title"),
    vscode.ViewColumn.Beside,
    {
      enableScripts: true,
      localResourceRoots: [vscode.Uri.joinPath(context.extensionUri, "media")],
    },
  );

  const toolkitUri = panel.webview.asWebviewUri(
    vscode.Uri.joinPath(context.extensionUri, "media", "toolkit.js"),
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
        body { padding: 20px; font-family: var(--vscode-font-family, system-ui, sans-serif); color: var(--vscode-editor-foreground); background-color: var(--vscode-editor-background); }
        h2 { border-bottom: 2px solid #FF6600; padding-bottom: 10px; margin-bottom: 20px; }
        .form-group { margin-bottom: 15px; display: flex; flex-direction: column; gap: 6px; max-width: 450px; }
        .form-group label { font-weight: 600; font-size: 13px; color: var(--vscode-editor-foreground); }
        vscode-text-field, vscode-dropdown, vscode-button, input, select { width: 100%; min-height: 28px; }
        vscode-panel-tab { text-transform: uppercase; font-weight: bold; }
        .action-container { margin-top: 24px; padding-top: 15px; border-top: 1px solid var(--vscode-panel-border); }
        input, select { background: var(--vscode-input-background, #1e1e1e); color: var(--vscode-input-foreground, #fff); border: 1px solid var(--vscode-input-border, #444); padding: 6px; border-radius: 3px; }
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

                <div class="motion-layout" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; align-items: start;">
                    <!-- Left Column: Controls -->
                    <div>
                        <div class="form-group">
                            <label>${t("snippet.mot.type")}</label>
                            <vscode-dropdown id="motionType" onchange="toggleMotionFields()">
                                <vscode-option value="PTP">PTP (Standard Joint)</vscode-option>
                                <vscode-option value="LIN">LIN (Standard Linear)</vscode-option>
                                <vscode-option value="CIRC">CIRC (Standard Circular)</vscode-option>
                                <vscode-option value="SPTP">SPTP (Spline PTP)</vscode-option>
                                <vscode-option value="SLIN">SLIN (Spline Linear)</vscode-option>
                                <vscode-option value="SCIRC">SCIRC (Spline Circular)</vscode-option>
                                <vscode-option value="SPLINE_BLOCK">SPLINE Block (Continuous Path)</vscode-option>
                            </vscode-dropdown>
                        </div>
                        <div class="form-group" id="auxPointGroup" style="display:none;">
                            <label>Auxiliary Point (CIRC/SCIRC)</label>
                            <vscode-text-field id="motionAuxPoint" value="pAux" oninput="updateMotionDiagram()"></vscode-text-field>
                        </div>
                        <div class="form-group" id="targetPointGroup">
                            <label>${t("snippet.mot.point")}</label>
                            <vscode-text-field id="motionPoint" value="p1" oninput="updateMotionDiagram()"></vscode-text-field>
                        </div>
                        <div class="form-group" id="velGroup">
                            <label>${t("snippet.mot.vel")}</label>
                            <vscode-text-field id="motionVel" value="100" oninput="updateMotionDiagram()"></vscode-text-field>
                        </div>
                        <div class="form-group" id="approxGroup">
                            <label>${t("snippet.mot.approx")}</label>
                            <vscode-dropdown id="motionApprox" onchange="updateMotionDiagram()">
                                <vscode-option value="">${t("snippet.mot.approx.none")}</vscode-option>
                                <vscode-option value="C_PTP">C_PTP (Joint Blend)</vscode-option>
                                <vscode-option value="C_DIS">C_DIS (Distance Blend)</vscode-option>
                                <vscode-option value="C_VEL">C_VEL (Velocity Blend)</vscode-option>
                                <vscode-option value="C_ORI">C_ORI (Orientation Blend)</vscode-option>
                                <vscode-option value="C_Spl">C_Spl (Spline Blend)</vscode-option>
                            </vscode-dropdown>
                        </div>
                        <div class="action-container" style="margin-top: 15px;">
                            <vscode-button onclick="generateMotion()">${t("snippet.insert")}</vscode-button>
                        </div>
                    </div>

                    <!-- Right Column: Interactive Diagram Card -->
                    <div style="background: var(--vscode-editor-background); border: 1px solid var(--vscode-panel-border); border-radius: 8px; padding: 16px; display: flex; flex-direction: column; gap: 12px;">
                        <h4 style="margin: 0; padding-bottom: 6px; border-bottom: 1px solid var(--vscode-panel-border); color: var(--vscode-foreground); display: flex; justify-content: space-between; align-items: center;">
                            <span>🗺️ KUKA Motion Scheme</span>
                            <span id="diagramBadge" style="font-size: 0.85em; padding: 2px 8px; border-radius: 4px; background: #FF6600; color: white; font-weight: bold;">PTP</span>
                        </h4>

                        <div id="diagramSvgContainer" style="width: 100%; height: 190px; background: var(--vscode-sideBar-background); border-radius: 6px; border: 1px dashed var(--vscode-panel-border); display: flex; justify-content: center; align-items: center; overflow: hidden; position: relative;">
                            <!-- SVG will be dynamically injected here -->
                        </div>

                        <div id="diagramDescription" style="font-size: 0.88em; color: var(--vscode-descriptionForeground); line-height: 1.4;">
                            <!-- Dynamic Explanation text -->
                        </div>
                    </div>
                </div>
            </div>
        </vscode-panel-view>
    </vscode-panels>

    <script>
        const vscode = acquireVsCodeApi();

        window.addEventListener('DOMContentLoaded', () => {
            toggleMotionFields();
        });

        function toggleMotionFields() {
            const type = document.getElementById('motionType').value;
            const auxGroup = document.getElementById('auxPointGroup');
            const approx = document.getElementById('motionApprox');
            const vel = document.getElementById('motionVel');

            if (type === 'CIRC' || type === 'SCIRC') {
                auxGroup.style.display = 'flex';
            } else {
                auxGroup.style.display = 'none';
            }

            if (type === 'SPTP' || type === 'SLIN' || type === 'SCIRC') {
                approx.value = 'C_Spl';
            } else if (type === 'PTP') {
                approx.value = 'C_PTP';
                vel.value = '100';
            } else if (type === 'LIN' || type === 'CIRC') {
                approx.value = 'C_DIS';
                vel.value = '2.0';
            }

            updateMotionDiagram();
        }

        function updateMotionDiagram() {
            const type = document.getElementById('motionType').value;
            const point = document.getElementById('motionPoint').value || "p1";
            const auxPoint = document.getElementById('motionAuxPoint').value || "pAux";
            const vel = document.getElementById('motionVel').value || "100";
            const approx = document.getElementById('motionApprox').value;

            const svgContainer = document.getElementById('diagramSvgContainer');
            const desc = document.getElementById('diagramDescription');
            const badge = document.getElementById('diagramBadge');

            badge.innerText = type;

            let svg = '';
            let explanation = '';

            if (type === 'PTP') {
                explanation = "<b>PTP (Point-To-Point):</b> Синхронное движение осей по наикратчайшему времени. Каждая ось идет с постоянным $VEL_AXIS (" + vel + "%). Траектория TCP в пространстве нелинейна (дугообразная).";
                svg = \`<svg width="280" height="170" viewBox="0 0 280 170" xmlns="http://www.w3.org/2000/svg">
                    <!-- Grid background -->
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(128,128,128,0.15)" stroke-width="1"/></pattern>
                    <rect width="280" height="170" fill="url(#grid)" />

                    <!-- Trajectory curve (PTP arc) -->
                    <path d="M 40 130 Q 140 20 240 70" fill="none" stroke="#FF6600" stroke-width="3" stroke-dasharray="6,4"/>
                    
                    <!-- Axis joint vectors -->
                    <path d="M 40 130 Q 90 80 140 20" fill="none" stroke="#0078D4" stroke-width="1.5" stroke-opacity="0.6"/>

                    <!-- Points -->
                    <circle cx="40" cy="130" r="6" fill="#0078D4" />
                    <text x="30" y="150" fill="var(--vscode-foreground)" font-size="11" font-weight="bold">Start (P0)</text>

                    <circle cx="240" cy="70" r="7" fill="#FF6600" />
                    <text x="220" y="92" fill="#FF6600" font-size="12" font-weight="bold">X\${point}</text>

                    <!-- TCP Tool Vector -->
                    <line x1="240" y1="70" x2="260" y2="50" stroke="#00E5FF" stroke-width="2" stroke-dasharray="2,2"/>
                    <polygon points="260,50 252,52 258,58" fill="#00E5FF" />
                    <text x="210" y="45" fill="#00E5FF" font-size="10">TCP \${vel}%</text>

                    <text x="110" y="150" fill="var(--vscode-descriptionForeground)" font-size="10">Joint Interpolation (A1-A6)</text>
                </svg>\`;
            } else if (type === 'LIN') {
                explanation = "<b>LIN (Linear):</b> Фланец робота (TCP) двигается строго по прямой линии в пространстве с фиксированной скоростью (" + vel + " m/s). Идеально для сварки и пайпинга.";
                svg = \`<svg width="280" height="170" viewBox="0 0 280 170" xmlns="http://www.w3.org/2000/svg">
                    <rect width="280" height="170" fill="url(#grid)" />

                    <!-- Straight Line Trajectory -->
                    <line x1="40" y1="130" x2="240" y2="50" stroke="#FF6600" stroke-width="3.5" />

                    <!-- Blending zone if approx -->
                    \${approx ? '<circle cx="240" cy="50" r="18" fill="rgba(255,102,0,0.15)" stroke="#FF6600" stroke-dasharray="2,2" />' : ''}

                    <!-- Points -->
                    <circle cx="40" cy="130" r="6" fill="#0078D4" />
                    <text x="30" y="150" fill="var(--vscode-foreground)" font-size="11" font-weight="bold">Start (P0)</text>

                    <circle cx="240" cy="50" r="7" fill="#FF6600" />
                    <text x="230" y="35" fill="#FF6600" font-size="12" font-weight="bold">X\${point}</text>

                    <!-- Direction Arrow -->
                    <polygon points="145,88 135,97 137,84" fill="#FF6600" />
                    <text x="145" y="110" fill="#FF6600" font-size="11" font-weight="bold">\${vel} m/s (\${approx || 'EXACT'})</text>
                </svg>\`;
            } else if (type === 'CIRC') {
                explanation = "<b>CIRC (Circular):</b> Движение TCP по дуге окружности через вспомогательную точку <b>X" + auxPoint + "</b> к целевой точке <b>X" + point + "</b> со скоростью " + vel + " m/s.";
                svg = \`<svg width="280" height="170" viewBox="0 0 280 170" xmlns="http://www.w3.org/2000/svg">
                    <rect width="280" height="170" fill="url(#grid)" />

                    <!-- Arc Path -->
                    <path d="M 40 130 Q 140 20 240 120" fill="none" stroke="#FF6600" stroke-width="3" />

                    <!-- Points -->
                    <circle cx="40" cy="130" r="6" fill="#0078D4" />
                    <text x="25" y="150" fill="var(--vscode-foreground)" font-size="11" font-weight="bold">Start</text>

                    <circle cx="140" cy="48" r="6" fill="#00E5FF" />
                    <text x="125" y="32" fill="#00E5FF" font-size="11" font-weight="bold">X\${auxPoint}</text>

                    <circle cx="240" cy="120" r="7" fill="#FF6600" />
                    <text x="225" y="142" fill="#FF6600" font-size="12" font-weight="bold">X\${point}</text>
                </svg>\`;
            } else if (type === 'SPTP') {
                explanation = "<b>SPTP (Spline PTP - KSS 8.3+):</b> Сплайновое PTP-движение с ограничением рывка ($SGEAR_JERK). Обеспечивает максимально плавное ускорение осей без вибраций.";
                svg = \`<svg width="280" height="170" viewBox="0 0 280 170" xmlns="http://www.w3.org/2000/svg">
                    <rect width="280" height="170" fill="url(#grid)" />

                    <!-- Smooth Spline Curve -->
                    <path d="M 40 130 C 100 30, 180 150, 240 60" fill="none" stroke="#00E5FF" stroke-width="3.5" />
                    
                    <!-- Jerk Control indicators -->
                    <path d="M 40 130 C 100 30, 180 150, 240 60" fill="none" stroke="#FF6600" stroke-width="1.5" stroke-dasharray="3,3" />

                    <!-- Points -->
                    <circle cx="40" cy="130" r="6" fill="#0078D4" />
                    <text x="25" y="150" fill="var(--vscode-foreground)" font-size="11" font-weight="bold">Start</text>

                    <circle cx="240" cy="60" r="7" fill="#00E5FF" />
                    <text x="225" y="45" fill="#00E5FF" font-size="12" font-weight="bold">X\${point}</text>

                    <text x="80" y="155" fill="#00E5FF" font-size="10" font-weight="bold">⚡ Spline Jerk-Control ($SGEAR_JERK)</text>
                </svg>\`;
            } else if (type === 'SLIN') {
                explanation = "<b>SLIN (Spline Linear - KSS 8.3+):</b> Сплайновое линейное движение с высокоточным профилированием ориентации и сглаживания <b>C_Spl</b>.";
                svg = \`<svg width="280" height="170" viewBox="0 0 280 170" xmlns="http://www.w3.org/2000/svg">
                    <rect width="280" height="170" fill="url(#grid)" />

                    <!-- Spline Linear Path with C_Spl Blend -->
                    <line x1="40" y1="120" x2="210" y2="60" stroke="#00E5FF" stroke-width="3.5" />
                    <path d="M 210 60 Q 230 54 250 40" fill="none" stroke="#00E5FF" stroke-width="3.5" stroke-dasharray="2,2" />

                    <circle cx="40" cy="120" r="6" fill="#0078D4" />
                    <circle cx="210" cy="60" r="7" fill="#00E5FF" />
                    <text x="195" y="80" fill="#00E5FF" font-size="12" font-weight="bold">X\${point}</text>

                    <text x="60" y="145" fill="#00E5FF" font-size="10">Continuous Path & Orientation Control</text>
                </svg>\`;
            } else if (type === 'SCIRC') {
                explanation = "<b>SCIRC (Spline Circular - KSS 8.3+):</b> Сплайновая дуга окружности через <b>X" + auxPoint + "</b> к <b>X" + point + "</b> с сохранением непрерывной ориентации.";
                svg = \`<svg width="280" height="170" viewBox="0 0 280 170" xmlns="http://www.w3.org/2000/svg">
                    <rect width="280" height="170" fill="url(#grid)" />

                    <path d="M 40 120 C 90 20, 190 20, 240 120" fill="none" stroke="#00E5FF" stroke-width="3.5" />

                    <circle cx="40" cy="120" r="6" fill="#0078D4" />
                    <circle cx="140" cy="35" r="6" fill="#FF6600" />
                    <text x="125" y="20" fill="#FF6600" font-size="11" font-weight="bold">X\${auxPoint}</text>

                    <circle cx="240" cy="120" r="7" fill="#00E5FF" />
                    <text x="225" y="140" fill="#00E5FF" font-size="12" font-weight="bold">X\${point}</text>
                </svg>\`;
            } else if (type === 'SPLINE_BLOCK') {
                explanation = "<b>SPLINE Path Block:</b> Слитный непрерывный блок траекторий (SLIN/SPL/SCIRC). Робот рассчитывает единый профиль скорости без остановок в узлах.";
                svg = \`<svg width="280" height="170" viewBox="0 0 280 170" xmlns="http://www.w3.org/2000/svg">
                    <rect width="280" height="170" fill="url(#grid)" />

                    <path d="M 30 130 L 100 60 Q 150 140 220 50 L 260 70" fill="none" stroke="#FF6600" stroke-width="3.5" />

                    <circle cx="30" cy="130" r="5" fill="#0078D4" />
                    <circle cx="100" cy="60" r="5" fill="#00E5FF" />
                    <circle cx="220" cy="50" r="5" fill="#00E5FF" />
                    <circle cx="260" cy="70" r="5" fill="#FF6600" />

                    <text x="90" y="45" fill="#00E5FF" font-size="10">P1</text>
                    <text x="210" y="35" fill="#00E5FF" font-size="10">P2</text>
                    <text x="245" y="90" fill="#FF6600" font-size="10">P3</text>
                </svg>\`;
            }

            svgContainer.innerHTML = svg;
            desc.innerHTML = explanation;
        }

        function generateMessage() {
            const type = document.getElementById('msgType').value;
            const key = document.getElementById('msgKey').value || "Msg1";
            const text = document.getElementById('msgText').value || "Message";
            const p1 = document.getElementById('msgP1').value;

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
            const auxPoint = document.getElementById('motionAuxPoint').value || "pAux";
            const vel = document.getElementById('motionVel').value || "100";
            const approx = document.getElementById('motionApprox').value;
            const approxStr = approx ? \` \${approx}\` : '';
            
            let krl = '';
            
            if (type === 'SPTP') {
                krl += \`;FOLD SPTP \${point} CONT Vel=\${vel} % PDAT1 Tool[1] Base[0] ;%{PE}\\n\`;
                krl += \`;Params IlfProvider=kukaroboter.basistech.inlineforms.movement.spline; Kuka.PointName=\${point}; Kuka.BlendingEnabled=\${approx ? 'True':'False'}; Kuka.MoveDataPtpName=PDAT1; Kuka.VelocityPtp=\${vel}; IlfCommand=SPTP\\n\`;
                krl += \`SPTP X\${point} WITH $VEL_AXIS[1] = SVEL_JOINT(\${vel}.0), $TOOL = STOOL2(F\${point}), $BASE = SBASE(F\${point}.BASE_NO), $IPO_MODE = SIPO_MODE(F\${point}.IPO_FRAME), $LOAD = SLOAD(F\${point}.TOOL_NO), $ACC_AXIS[1] = SACC_JOINT(PDAT1), $APO = SAPO_PTP(PDAT1), $GEAR_JERK[1] = SGEAR_JERK(PDAT1), $COLLMON_TOL_PRO[1] = USE_CM_PRO_VALUES(0)\${approxStr}\\n\`;
                krl += \`;ENDFOLD\\n\`;
            } else if (type === 'SLIN') {
                krl += \`;FOLD SLIN \${point} CONT Vel=\${vel} m/s CPDAT1 Tool[1] Base[0] ;%{PE}\\n\`;
                krl += \`;Params IlfProvider=kukaroboter.basistech.inlineforms.movement.spline; Kuka.PointName=\${point}; Kuka.BlendingEnabled=\${approx ? 'True':'False'}; Kuka.MoveDataName=CPDAT1; Kuka.VelocityPath=\${vel}; IlfCommand=SLIN\\n\`;
                krl += \`SLIN X\${point} WITH $VEL = SVEL_CP(\${vel}.0, , CPDAT1), $TOOL = STOOL2(F\${point}), $BASE = SBASE(F\${point}.BASE_NO), $IPO_MODE = SIPO_MODE(F\${point}.IPO_FRAME), $LOAD = SLOAD(F\${point}.TOOL_NO), $ACC = SACC_CP(CPDAT1), $ORI_TYPE = SORI_TYP(CPDAT1), $APO = SAPO(CPDAT1), $JERK = SJERK(CPDAT1), $COLLMON_TOL_PRO[1] = USE_CM_PRO_VALUES(0)\${approxStr}\\n\`;
                krl += \`;ENDFOLD\\n\`;
            } else if (type === 'SCIRC') {
                krl += \`;FOLD SCIRC \${auxPoint} \${point} CONT Vel=\${vel} m/s CPDAT1 Tool[1] Base[0] ;%{PE}\\n\`;
                krl += \`;Params IlfProvider=kukaroboter.basistech.inlineforms.movement.spline; Kuka.PointName=\${point}; Kuka.BlendingEnabled=\${approx ? 'True':'False'}; Kuka.MoveDataName=CPDAT1; Kuka.VelocityPath=\${vel}; IlfCommand=SCIRC\\n\`;
                krl += \`SCIRC X\${auxPoint}, X\${point} WITH $VEL = SVEL_CP(\${vel}.0, , CPDAT1), $TOOL = STOOL2(F\${point}), $BASE = SBASE(F\${point}.BASE_NO), $IPO_MODE = SIPO_MODE(F\${point}.IPO_FRAME), $LOAD = SLOAD(F\${point}.TOOL_NO), $ACC = SACC_CP(CPDAT1), $ORI_TYPE = SORI_TYP(CPDAT1), $APO = SAPO(CPDAT1), $JERK = SJERK(CPDAT1), $COLLMON_TOL_PRO[1] = USE_CM_PRO_VALUES(0)\${approxStr}\\n\`;
                krl += \`;ENDFOLD\\n\`;
            } else if (type === 'CIRC') {
                krl += \`;FOLD CIRC \${auxPoint} \${point} Vel=\${vel} m/s CPDAT1 Tool[1] Base[0] ;%{PE}\\n\`;
                krl += \`$BWDSTART=FALSE\\n\`;
                krl += \`LDAT_ACT=LDEF_DAT\\n\`;
                krl += \`FDAT_ACT=FDEF_DAT\\n\`;
                krl += \`BAS(#CP_PARAMS, \${vel})\\n\`;
                krl += \`CIRC X\${auxPoint}, X\${point}\${approxStr}\\n\`;
                krl += \`;ENDFOLD\\n\`;
            } else if (type === 'SPLINE_BLOCK') {
                krl += \`;FOLD SPLINE Path Block\\n\`;
                krl += \`SPLINE WITH $VEL = SVEL_CP(\${vel}.0, , CPDAT1)\\n\`;
                krl += \`  SLIN X\${point}_1\\n\`;
                krl += \`  SPL X\${point}_2\\n\`;
                krl += \`  SLIN X\${point}_3\\n\`;
                krl += \`ENDSPLINE\\n\`;
                krl += \`;ENDFOLD\\n\`;
            } else if (type === 'PTP') {
                krl += \`;FOLD PTP \${point} Vel=\${vel} % PDAT1 Tool[1] Base[0] ;%{PE}\\n\`;
                krl += \`$BWDSTART=FALSE\\n\`;
                krl += \`PDAT_ACT=PDEF_DAT\\n\`;
                krl += \`FDAT_ACT=FDEF_DAT\\n\`;
                krl += \`BAS(#PTP_PARAMS, \${vel})\\n\`;
                krl += \`PTP X\${point}\${approxStr}\\n\`;
                krl += \`;ENDFOLD\\n\`;
            } else {
                krl += \`;FOLD LIN \${point} Vel=\${vel} m/s CPDAT1 Tool[1] Base[0] ;%{PE}\\n\`;
                krl += \`$BWDSTART=FALSE\\n\`;
                krl += \`LDAT_ACT=LDEF_DAT\\n\`;
                krl += \`FDAT_ACT=FDEF_DAT\\n\`;
                krl += \`BAS(#CP_PARAMS, \${vel})\\n\`;
                krl += \`LIN X\${point}\${approxStr}\\n\`;
                krl += \`;ENDFOLD\\n\`;
            }

            vscode.postMessage({
                command: 'insertCode',
                text: krl
            });
        }
    </script>
</body>
</html>`;
}
