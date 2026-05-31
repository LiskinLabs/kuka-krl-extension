import * as vscode from "vscode";
import { LanguageClient } from "vscode-languageclient/node";
import * as path from "path";
import { t } from "../i18n";

/**
 * Shows the Control Flow Graph (Flowchart) WebView panel.
 * Automatically searches for cell.src as the main file,
 * or lets the user pick any .src file.
 */
export async function showFlowchartViewer(
  context: vscode.ExtensionContext,
  client: LanguageClient,
) {
  // 1. Find the file to analyze
  let currentUri = await selectMainFile();
  if (!currentUri) return;
  let isDetailed = false;

  // 2. Request CFG from the LSP server
  let result: { graph: any; mermaid: string };
  try {
    result = await client.sendRequest("custom/getControlFlowGraph", {
      uri: currentUri.toString(),
      detailed: isDetailed,
    });
  } catch (e) {
    vscode.window.showErrorMessage(`Failed to analyze: ${e}`);
    return;
  }

  // 3. Create WebView panel
  const panel = vscode.window.createWebviewPanel(
    "krlFlowchart",
    "KRL Flowchart: " + path.basename(currentUri.fsPath),
    vscode.ViewColumn.Beside,
    {
      enableScripts: true,
      localResourceRoots: [
        vscode.Uri.file(path.join(context.extensionPath, "media")),
      ],
    },
  );

  const mermaidUri = panel.webview.asWebviewUri(
    vscode.Uri.file(
      path.join(context.extensionPath, "media", "mermaid.min.js"),
    ),
  );

  panel.webview.html = getWebviewContent(
    mermaidUri.toString(),
    result.mermaid,
    result.graph.errors || [],
    result.graph.nodes || [],
    path.basename(currentUri.fsPath),
    isDetailed,
  );

  // 4. Handle messages from WebView
  panel.webview.onDidReceiveMessage(
    async (message) => {
      switch (message.command) {
        case "navigateToLine": {
          const line = parseInt(message.line, 10);
          const doc = await vscode.workspace.openTextDocument(currentUri!);
          const editor = await vscode.window.showTextDocument(
            doc,
            vscode.ViewColumn.One,
          );
          const pos = new vscode.Position(line, 0);
          editor.selection = new vscode.Selection(pos, pos);
          editor.revealRange(
            new vscode.Range(pos, pos),
            vscode.TextEditorRevealType.InCenter,
          );
          break;
        }
        case "navigateToFunction": {
          const funcName = message.name;
          const line = parseInt(message.line, 10);
          let character = 0;
          try {
            const doc = await vscode.workspace.openTextDocument(currentUri!);
            const lineText = doc.lineAt(line).text;
            const matchIdx = lineText
              .toUpperCase()
              .indexOf(funcName.toUpperCase());
            if (matchIdx >= 0) {
              character = matchIdx;
            }
          } catch {
            /* ignore */
          }

          const pos = new vscode.Position(line, character);
          const locations = await vscode.commands.executeCommand<
            vscode.Location[]
          >("vscode.executeDefinitionProvider", currentUri!, pos);
          if (locations && locations.length > 0) {
            const targetUri = locations[0].uri;
            try {
              const newResult = await client.sendRequest(
                "custom/getControlFlowGraph",
                { uri: targetUri.toString(), detailed: isDetailed },
              );
              const r = newResult as { graph: any; mermaid: string };
              currentUri = targetUri;
              panel.title =
                "KRL Flowchart: " + path.basename(currentUri.fsPath);
              panel.webview.html = getWebviewContent(
                mermaidUri.toString(),
                r.mermaid,
                r.graph.errors || [],
                r.graph.nodes || [],
                path.basename(currentUri.fsPath),
                isDetailed,
              );
            } catch (e) {
              vscode.window.showErrorMessage(`Failed to analyze: ${e}`);
            }
          } else {
            vscode.window.showWarningMessage(
              `Could not find definition for ${funcName}`,
            );
          }
          break;
        }
        case "changeFile": {
          const newUri = await selectMainFile();
          if (!newUri) return;
          try {
            const newResult = await client.sendRequest(
              "custom/getControlFlowGraph",
              { uri: newUri.toString(), detailed: isDetailed },
            );
            const r = newResult as { graph: any; mermaid: string };
            currentUri = newUri;
            panel.title = "KRL Flowchart: " + path.basename(currentUri.fsPath);
            panel.webview.html = getWebviewContent(
              mermaidUri.toString(),
              r.mermaid,
              r.graph.errors || [],
              r.graph.nodes || [],
              path.basename(currentUri.fsPath),
              isDetailed,
            );
          } catch (e) {
            vscode.window.showErrorMessage(`Failed to analyze: ${e}`);
          }
          break;
        }
        case "downloadSvg": {
          const uri = await vscode.window.showSaveDialog({
            defaultUri: vscode.Uri.file(
              path.join(path.dirname(currentUri!.fsPath), message.filename),
            ),
            filters: {
              "SVG Image": ["svg"],
            },
          });
          if (uri) {
            await vscode.workspace.fs.writeFile(
              uri,
              Buffer.from(message.content, "utf8"),
            );
            vscode.window.showInformationMessage(
              "Flowchart saved successfully!",
            );
          }
          break;
        }
        case "toggleDetailed": {
          isDetailed = !isDetailed;
          try {
            const newResult = await client.sendRequest(
              "custom/getControlFlowGraph",
              { uri: currentUri!.toString(), detailed: isDetailed },
            );
            const r = newResult as { graph: any; mermaid: string };
            panel.webview.html = getWebviewContent(
              mermaidUri.toString(),
              r.mermaid,
              r.graph.errors || [],
              r.graph.nodes || [],
              path.basename(currentUri!.fsPath),
              isDetailed,
            );
          } catch (e) {
            vscode.window.showErrorMessage(`Failed to analyze: ${e}`);
          }
          break;
        }
      }
    },
    undefined,
    context.subscriptions,
  );
}

/**
 * Find cell.src or let user pick a .src file.
 */
async function selectMainFile(): Promise<vscode.Uri | undefined> {
  // Search for cell.src
  const cellFiles = await vscode.workspace.findFiles("**/cell.src", null, 5);
  if (cellFiles.length === 1) {
    return cellFiles[0];
  }

  // Multiple cell.src or none found — show picker
  const allSrcFiles = await vscode.workspace.findFiles("**/*.src", null, 200);
  if (allSrcFiles.length === 0) {
    vscode.window.showWarningMessage(t("warning.noActiveKrlFile"));
    return undefined;
  }

  // Sort: cell.src first
  const items: vscode.QuickPickItem[] = allSrcFiles
    .sort((a, b) => {
      const aIsCell =
        path.basename(a.fsPath).toLowerCase() === "cell.src" ? 0 : 1;
      const bIsCell =
        path.basename(b.fsPath).toLowerCase() === "cell.src" ? 0 : 1;
      return aIsCell - bIsCell || a.fsPath.localeCompare(b.fsPath);
    })
    .map((f) => ({
      label: path.basename(f.fsPath),
      description: vscode.workspace.asRelativePath(f),
      detail: f.fsPath,
    }));

  const picked = await vscode.window.showQuickPick(items, {
    placeHolder: "Select main .src file to visualize",
  });

  if (!picked || !picked.detail) return undefined;
  return vscode.Uri.file(picked.detail);
}

function getWebviewContent(
  mermaidSrc: string,
  mermaidCode: string,
  errors: any[],
  nodes: any[],
  fileName: string,
  isDetailed: boolean,
): string {
  const errorTypeMap: Record<string, string> = {
    unreachable: "Недостижимый код",
    infiniteLoop: "Бесконечный цикл",
    emptyBranch: "Пустая ветка",
    invalidGoto: "Неверный GOTO",
    uninitMotion: "Без инициализации",
  };

  const localizeMessage = (e: any) => {
    const lineNum = e.line + 1;
    if (e.type === "emptyBranch") {
      return `Условие IF на строке ${lineNum} имеет пустую ветку (не содержит исполняемого кода).`;
    }
    if (e.type === "infiniteLoop") {
      return `Цикл LOOP на строке ${lineNum} не имеет команд выхода (EXIT/HALT) и является бесконечным.`;
    }
    if (e.type === "unreachable") {
      if (e.message.toLowerCase().includes("motion")) {
        return `Команда движения на строке ${lineNum} недостижима после прерывания потока выполнения.`;
      }
      return `Код на строке ${lineNum} недостижим из-за прерывания потока (RETURN/EXIT/HALT) выше.`;
    }
    if (e.type === "uninitMotion") {
      return `Движение на строке ${lineNum} вызвано без предварительной инициализации TOOL или BASE (нужен BAS(#INITMOV) или $TOOL/$BASE).`;
    }
    if (e.type === "invalidGoto") {
      const match = e.message.match(/target '([^']+)'/);
      const target = match ? match[1] : "неизвестная";
      return `Целевая метка '${target}' для перехода GOTO на строке ${lineNum} не определена в файле.`;
    }
    return e.message;
  };

  const errorListHtml =
    errors.length > 0
      ? errors
          .map((e: any) => {
            const typeText = errorTypeMap[e.type] || e.type;
            const msgText = localizeMessage(e);
            return `<div class="error-item" onclick="goToLine(${e.line})" data-type="${escHtml(e.type)}">
        <div class="error-badge-row">
          <span class="error-type badge-${escHtml(e.type)}">${escHtml(typeText)}</span>
          <span class="error-line">Строка ${e.line + 1}</span>
        </div>
        <div class="error-msg">${escHtml(msgText)}</div>
      </div>`;
          })
          .join("")
      : '<div class="no-errors">✅ Ошибок логики не обнаружено</div>';

  return `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>KRL Flowchart</title>
    <style>
        body {
            font-family: var(--vscode-font-family, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif);
            color: var(--vscode-editor-foreground);
            background-color: var(--vscode-editor-background);
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            height: 100vh;
            overflow: hidden;
            user-select: none;
        }
        .toolbar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            padding: 10px 20px;
            background: var(--vscode-editorWidget-background);
            border-bottom: 1px solid var(--vscode-widget-border, rgba(128,128,128,0.2));
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
            z-index: 10;
            flex-shrink: 0;
        }
        .toolbar h3 { 
            margin: 0; 
            font-size: 14px; 
            font-weight: 600;
            color: var(--vscode-foreground);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .controls-group {
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .btn {
            background: var(--vscode-button-secondaryBackground, #3a3d41);
            color: var(--vscode-button-secondaryForeground, #ffffff);
            border: 1px solid rgba(255,255,255,0.05);
            padding: 5px 10px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
            font-weight: 500;
            display: inline-flex;
            align-items: center;
            gap: 5px;
            transition: all 0.2s ease;
        }
        .btn:hover { 
            background: var(--vscode-button-secondaryHoverBackground, #45494e);
            transform: translateY(-1px);
        }
        .btn:active {
            transform: translateY(0);
        }
        .btn-primary {
            background: var(--vscode-button-background, #0e639c);
            color: var(--vscode-button-foreground, #ffffff);
        }
        .btn-primary:hover {
            background: var(--vscode-button-hoverBackground, #1177bb);
        }
        .btn-icon {
            padding: 5px 8px;
            font-size: 13px;
        }
        .divider {
            width: 1px;
            height: 20px;
            background: rgba(128,128,128,0.3);
            margin: 0 4px;
        }
        .chart-container {
            flex: 1;
            position: relative;
            overflow: hidden;
            background-color: var(--vscode-editor-background);
            cursor: grab;
        }
        .chart-container:active {
            cursor: grabbing;
        }
        .chart-content {
            position: absolute;
            transform-origin: 0 0;
            padding: 20px;
        }
        .chart-content svg {
            max-width: none;
            display: block;
        }
        .errors-panel {
            background: var(--vscode-editorWidget-background);
            border-top: 1px solid var(--vscode-widget-border, rgba(128,128,128,0.2));
            max-height: 240px;
            display: flex;
            flex-direction: column;
            z-index: 10;
            box-shadow: 0 -2px 8px rgba(0,0,0,0.1);
            flex-shrink: 0;
        }
        .errors-header {
            padding: 8px 20px;
            font-weight: 600;
            font-size: 12px;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            background: var(--vscode-titleBar-activeBackground);
            border-bottom: 1px solid var(--vscode-widget-border, rgba(128,128,128,0.1));
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .errors-header .badge {
            background: var(--vscode-statusBarItem-errorBackground, #ff4444);
            color: #ffffff;
            border-radius: 12px;
            padding: 1px 8px;
            font-size: 11px;
            font-weight: bold;
        }
        .errors-header .badge.badge-zero {
            background: var(--vscode-charts-green, #388a34);
        }
        .error-list {
            overflow-y: auto;
            flex: 1;
        }
        .error-item {
            padding: 10px 20px;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            gap: 4px;
            border-bottom: 1px solid rgba(128,128,128,0.1);
            transition: background 0.15s ease;
            user-select: text;
        }
        .error-item:hover { 
            background: var(--vscode-list-hoverBackground, rgba(255,255,255,0.05)); 
        }
        .error-badge-row {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .error-type {
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 10px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.3px;
            color: #fff;
        }
        .badge-unreachable { background-color: #e06c75; }
        .badge-infiniteLoop { background-color: #d19a66; }
        .badge-emptyBranch { background-color: #61afef; }
        .badge-invalidGoto { background-color: #be5046; }
        .badge-uninitMotion { background-color: #c678dd; }
        
        .error-line {
            color: var(--vscode-descriptionForeground);
            font-size: 11px;
        }
        .error-msg {
            color: var(--vscode-editorWarning-foreground, var(--vscode-foreground));
            font-size: 13px;
            line-height: 1.4;
        }
        .error-item[data-type="unreachable"] .error-msg,
        .error-item[data-type="invalidGoto"] .error-msg {
            color: var(--vscode-editorError-foreground, #f48771);
        }
        .no-errors {
            padding: 16px 20px;
            color: var(--vscode-charts-green, #89ca78);
            font-size: 13px;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .node rect, .node circle, .node polygon, .node path {
            cursor: pointer !important;
            transition: filter 0.2s ease;
        }
        .node:hover rect, .node:hover circle, .node:hover polygon, .node:hover path {
            filter: brightness(1.2) contrast(1.1);
        }
        /* Scrollbar enhancements */
        ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }
        ::-webkit-scrollbar-track {
            background: transparent;
        }
        ::-webkit-scrollbar-thumb {
            background: var(--vscode-scrollbarSlider-background, rgba(128, 128, 128, 0.3));
            border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: var(--vscode-scrollbarSlider-hoverBackground, rgba(128, 128, 128, 0.5));
        }
    </style>
</head>
<body>
    <div class="toolbar">
        <h3>📊 ${escHtml(fileName)}</h3>
        
        <div class="controls-group">
            <button class="btn btn-icon" onclick="zoomOut()" title="Уменьшить">➖</button>
            <button class="btn" onclick="zoomReset()" title="Вписать в экран">🔄 Вписать</button>
            <button class="btn btn-icon" onclick="zoomIn()" title="Увеличить">➕</button>
            
            <div class="divider"></div>
            
            <button class="btn btn-primary" onclick="downloadSvg()" title="Скачать в формате SVG">
                📥 Скачать
            </button>
        </div>

        <div class="controls-group">
            <button class="btn" onclick="toggleDetailed()" title="Переключить детальный вид">
                ${isDetailed ? "🔍 Детальный: ВКЛ" : "🔍 Детальный: ВЫКЛ"}
            </button>
            <button class="btn" onclick="changeFile()">🏠 Главная программа</button>
        </div>
    </div>

    <div class="chart-container" id="chart-outer">
        <div class="chart-content" id="chart-inner">
            <div id="chart"></div>
        </div>
    </div>

    <div class="errors-panel">
        <div class="errors-header">
            Ошибки логики <span class="badge ${errors.length === 0 ? "badge-zero" : ""}">${errors.length}</span>
        </div>
        <div class="error-list">
            ${errorListHtml}
        </div>
    </div>

    <script>
        const graphNodes = ${JSON.stringify(nodes)};
    </script>
    <script src="${mermaidSrc}"></script>
    <script>
        const vscode = acquireVsCodeApi();

        // Mermaid configuration
        mermaid.initialize({
            startOnLoad: false,
            theme: document.body.classList.contains('vscode-light') ? 'default' : 'dark',
            flowchart: { curve: 'basis', useMaxWidth: false },
            securityLevel: 'loose'
        });

        // Pan & Zoom Logic
        let scale = 1;
        let posX = 0;
        let posY = 0;
        let isDragging = false;
        let startX, startY;

        const outer = document.getElementById('chart-outer');
        const inner = document.getElementById('chart-inner');

        function updateTransform() {
            inner.style.transform = \`translate(\${posX}px, \${posY}px) scale(\${scale})\`;
        }

        outer.addEventListener('mousedown', (e) => {
            if (e.button !== 0) return; // left button only
            if (e.target.closest('.node')) return; // don't drag on node click
            
            isDragging = true;
            startX = e.clientX - posX;
            startY = e.clientY - posY;
            outer.style.cursor = 'grabbing';
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            posX = e.clientX - startX;
            posY = e.clientY - startY;
            updateTransform();
        });

        window.addEventListener('mouseup', () => {
            isDragging = false;
            outer.style.cursor = 'grab';
        });

        // Mouse wheel zoom
        outer.addEventListener('wheel', (e) => {
            e.preventDefault();
            const rect = outer.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            // Location relative to scaling
            const xs = (mouseX - posX) / scale;
            const ys = (mouseY - posY) / scale;
            
            const delta = -e.deltaY;
            const factor = 1.1;
            
            if (delta > 0) {
                scale *= factor;
            } else {
                scale /= factor;
            }
            
            // Boundaries
            scale = Math.max(0.15, Math.min(scale, 6));

            posX = mouseX - xs * scale;
            posY = mouseY - ys * scale;
            
            updateTransform();
        }, { passive: false });

        function zoomIn() {
            const rect = outer.getBoundingClientRect();
            const cx = rect.width / 2;
            const cy = rect.height / 2;
            const xs = (cx - posX) / scale;
            const ys = (cy - posY) / scale;
            scale = Math.min(scale * 1.3, 6);
            posX = cx - xs * scale;
            posY = cy - ys * scale;
            updateTransform();
        }

        function zoomOut() {
            const rect = outer.getBoundingClientRect();
            const cx = rect.width / 2;
            const cy = rect.height / 2;
            const xs = (cx - posX) / scale;
            const ys = (cy - posY) / scale;
            scale = Math.max(scale / 1.3, 0.15);
            posX = cx - xs * scale;
            posY = cy - ys * scale;
            updateTransform();
        }

        function zoomReset() {
            const outerRect = outer.getBoundingClientRect();
            const svg = inner.querySelector('svg');
            if (!svg) {
                scale = 1;
                posX = 0;
                posY = 0;
                updateTransform();
                return;
            }
            
            // Use getBBox for most reliable dimensions after layout
            let svgWidth = 0;
            let svgHeight = 0;
            try {
                const bBox = svg.getBBox();
                svgWidth = bBox.width;
                svgHeight = bBox.height;
            } catch(e) {}
            
            if (!svgWidth || !svgHeight) {
                svgWidth = svg.viewBox?.baseVal?.width || svg.width?.baseVal?.value || 0;
                svgHeight = svg.viewBox?.baseVal?.height || svg.height?.baseVal?.value || 0;
            }
            
            if (svgWidth && svgHeight) {
                const padding = 40;
                const scaleX = (outerRect.width - padding) / svgWidth;
                const scaleY = (outerRect.height - padding) / svgHeight;
                
                // Find fitting scale, cap at 1.2x max automatic scale
                scale = Math.min(scaleX, scaleY, 1.2);
                
                // Center in viewport
                posX = (outerRect.width - svgWidth * scale) / 2;
                posY = (outerRect.height - svgHeight * scale) / 2;
            } else {
                scale = 1;
                posX = 20;
                posY = 20;
            }
            updateTransform();
        }

        mermaid.initialize({
            startOnLoad: false,
            theme: document.body.classList.contains('vscode-light') ? 'default' : 'dark',
            maxTextSize: 9000000,
            securityLevel: 'loose'
        });

        async function renderChart() {
            const chart = document.getElementById('chart');
            const mermaidCode = ${JSON.stringify(mermaidCode)};
            try {
                const { svg, bindFunctions } = await mermaid.render('flowchart', mermaidCode);
                chart.innerHTML = svg;
                
                // Fix for blurry SVGs: remove CSS scaling and force native vector dimensions
                const svgEl = chart.querySelector('svg');
                if (svgEl) {
                    svgEl.style.maxWidth = 'none';
                    svgEl.style.width = '';
                    svgEl.style.height = '';
                    const viewBox = svgEl.viewBox?.baseVal;
                    if (viewBox && viewBox.width && viewBox.height) {
                        svgEl.setAttribute('width', viewBox.width.toString());
                        svgEl.setAttribute('height', viewBox.height.toString());
                    }
                }

                if (bindFunctions) bindFunctions(chart);

                // Bind click handlers to nodes for code-navigation
                chart.querySelectorAll('.node').forEach(node => {
                    node.addEventListener('click', () => {
                        const rawId = node.id.replace('flowchart-', '').replace(/-\\d+$/, '');
                        const n = graphNodes.find(n => n.id === rawId);
                        if (n) {
                            if (n.type === 'call' && n.target) {
                                vscode.postMessage({ command: 'navigateToFunction', name: n.target, line: String(n.line) });
                            } else {
                                goToLine(n.line);
                            }
                        } else {
                            const match = mermaidCode.match(new RegExp('click ' + rawId + ' callback "(\\\\d+)"'));
                            if (match) {
                                goToLine(parseInt(match[1]));
                            }
                        }
                    });
                });

                // Initial centering — wait for browser to finish layout
                requestAnimationFrame(() => {
                    setTimeout(zoomReset, 200);
                });
            } catch(e) {
                chart.innerHTML = '<div style="color:#f48771; padding:20px;"><h3>Ошибка рендеринга Mermaid</h3><p>' + e.message + '</p><pre style="user-select:text;">' + escHtml(mermaidCode) + '</pre></div>';
            }
        }

        function downloadSvg() {
            const svgEl = document.querySelector('#chart svg');
            if (!svgEl) return;
            
            const svgClone = svgEl.cloneNode(true);
            
            // Apply hardcoded light theme styles for external viewer compatibility
            const style = document.createElement('style');
            style.textContent = \`
                svg { background-color: #ffffff; }
                text { font-family: "Segoe UI", sans-serif; }
                .node rect, .node circle, .node polygon, .node path { stroke-width: 1.5px !important; }
                .edgePath .path { stroke-width: 1.5px !important; fill: none !important; }
            \`;
            svgClone.prepend(style);
            svgClone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
            
            const serializer = new XMLSerializer();
            let source = serializer.serializeToString(svgClone);
            
            if (!source.match(/^<\\?xml/i)) {
                source = '<?xml version="1.0" standalone="no"?>\\n' + source;
            }
            
            vscode.postMessage({
                command: 'downloadSvg',
                content: source,
                filename: "${fileName.replace(/\.[^/.]+$/, "")}_flowchart.svg"
            });
        }

        function escHtml(str) {
            return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        }

        function goToLine(line) {
            vscode.postMessage({ command: 'navigateToLine', line: String(line) });
        }

        function changeFile() {
            vscode.postMessage({ command: 'changeFile' });
        }

        function toggleDetailed() {
            vscode.postMessage({ command: 'toggleDetailed' });
        }

        // Render once ready
        renderChart();
    </script>
</body>
</html>`;
}

function escHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
