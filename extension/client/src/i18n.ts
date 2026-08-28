/**
 * Internationalization (i18n) module for KRL Language Support extension.
 * Provides localized strings for the client-side (VS Code extension host).
 */

import * as vscode from "vscode";

// Supported locales
type Locale = "en" | "ru" | "tr";

// Message keys
interface Messages {
  // Information messages
  "info.checkingAllFiles": string;
  "info.documentFormatted": string;
  "info.trailingWhitespaceRemoved": string;
  "info.noTrailingWhitespace": string;
  "info.declarationsSorted": string;
  "info.noDeclarationsToSort": string;
  "info.noSystemVariablesFound": string;

  // Warning messages
  "warning.noActiveKrlFile": string;
  "warning.invalidGlobalUsage": string;

  // Error messages
  "error.serverNotRunning": string;

  // Prompts
  "prompt.foldRegionName": string;
  "prompt.foldRegionPlaceholder": string;

  // Pickers
  "picker.systemVariables": string;
  "picker.selectSystemVariable": string;

  // Command Titles for Tree View and Menus
  "command.openControlCenter": string;
  "command.openControlCenter.tooltip": string;
  "command.calculator": string;
  "command.calculator.tooltip": string;
  "command.cleanup": string;
  "command.cleanup.tooltip": string;
  "command.formatDocument": string;
  "command.formatDocument.tooltip": string;
  "command.sortDeclarations": string;
  "command.sortDeclarations.tooltip": string;
  "command.foldAll": string;
  "command.foldAll.tooltip": string;
  "command.unfoldAll": string;
  "command.unfoldAll.tooltip": string;
  "command.refreshIOView": string;
  "command.refreshIOView.tooltip": string;
  "command.showFlowchart": string;
  "command.showFlowchart.tooltip": string;
  "command.compareKrcBackup": string;
  "command.compareKrcBackup.tooltip": string;
  "command.openSnippetGenerator": string;
  "command.openSnippetGenerator.tooltip": string;
  "command.aiCheckSafety": string;
  "command.aiCheckSafety.tooltip": string;
  "command.validateEkiXml": string;
  "command.validateEkiXml.tooltip": string;
  "command.generateEkiCode": string;
  "command.generateEkiCode.tooltip": string;
  "command.cleanGitMetadata": string;
  "command.cleanGitMetadata.tooltip": string;
  "command.generateReport": string;
  "command.generateReport.tooltip": string;
  "command.findReferences": string;
  "command.findReferences.tooltip": string;
  "command.sendLogsToDeveloper": string;
  "command.sendLogsToDeveloper.tooltip": string;
  "command.sendFileToDeveloper": string;
  "command.sendFileToDeveloper.tooltip": string;
  "command.openCustomerPortal": string;
  "command.openCustomerPortal.tooltip": string;
  "command.openTelegramChat": string;
  "command.openTelegramChat.tooltip": string;

  // Control Center Dashboard UI
  "cc.engTools": string;
  "cc.safetyDiag": string;
  "cc.accountHub": string;
  "cc.tab.profile": string;
  "cc.tab.devices": string;
  "cc.tab.billing": string;
  "cc.tab.support": string;
  "cc.btn.openFlowchart": string;
  "cc.btn.inspectBackup": string;
  "cc.btn.generateSnippets": string;
  "cc.btn.openCalculator": string;
  "cc.btn.ekiValidator": string;
  "cc.btn.generateHandler": string;
  "cc.btn.cleanGitMetadata": string;
  "cc.btn.runSafetyCheck": string;
  "cc.btn.generateReport": string;

  // Flowchart Viewer
  "flow.err.unreachable": string;
  "flow.err.infiniteLoop": string;
  "flow.err.emptyBranch": string;
  "flow.err.invalidGoto": string;
  "flow.err.uninitMotion": string;
  "flow.msg.emptyBranch": string;
  "flow.msg.infiniteLoop": string;
  "flow.msg.unreachableMotion": string;
  "flow.msg.unreachableCode": string;
  "flow.msg.uninitMotion": string;
  "flow.msg.invalidGoto": string;
  "flow.ui.zoomOut": string;
  "flow.ui.zoomReset": string;
  "flow.ui.zoomIn": string;
  "flow.ui.downloadSvg": string;
  "flow.ui.downloadTitle": string;
  "flow.ui.toggleDetailed": string;
  "flow.ui.detailedOn": string;
  "flow.ui.detailedOff": string;
  "flow.ui.mainProgram": string;
  "flow.ui.logicErrors": string;
  "flow.ui.noErrors": string;
  "flow.ui.line": string;

  // Safety Check
  "safety.notify.safe": string;
  "safety.error.violations": string;
  "safety.alert.critical": string;
  "safety.alert.warning": string;

  // EthernetKRL (EKI) Validator & Code Generator
  "eki.notify.valid": string;
  "eki.error.title": string;
  "eki.prompt.channelName": string;
  "eki.picker.selectXml": string;
  "eki.warning.notXml": string;
  "eki.btn.generate": string;
  "eki.btn.select": string;

  // Snippet Generator
  "snippet.title": string;
  "snippet.tab.message": string;
  "snippet.tab.grid": string;
  "snippet.tab.motion": string;
  "snippet.msg.title": string;
  "snippet.msg.desc": string;
  "snippet.msg.type": string;
  "snippet.msg.type.notify": string;
  "snippet.msg.type.quit": string;
  "snippet.msg.type.state": string;
  "snippet.msg.type.wait": string;
  "snippet.msg.key": string;
  "snippet.msg.key.placeholder": string;
  "snippet.msg.text": string;
  "snippet.msg.text.placeholder": string;
  "snippet.msg.param1": string;
  "snippet.msg.param1.placeholder": string;
  "snippet.insert": string;
  "snippet.grid.title": string;
  "snippet.grid.desc": string;
  "snippet.grid.base": string;
  "snippet.grid.rows": string;
  "snippet.grid.cols": string;
  "snippet.grid.spaceX": string;
  "snippet.grid.spaceY": string;
  "snippet.mot.title": string;
  "snippet.mot.desc": string;
  "snippet.mot.type": string;
  "snippet.mot.point": string;
  "snippet.mot.vel": string;
  "snippet.mot.approx": string;
  "snippet.mot.approx.none": string;
  "snippet.alert.inserted": string;
  "snippet.alert.noEditor": string;
  "snippet.desc.ptp": string;
  "snippet.desc.lin": string;
  "snippet.desc.circ": string;
  "snippet.desc.sptp": string;
  "snippet.desc.slin": string;
  "snippet.desc.scirc": string;
  "snippet.desc.splineBlock": string;

  // Telegram Chat Integration
  "cc.prompt.telegram": string;
  "cc.prompt.telegram.placeholder": string;
  "cc.notify.telegramSent": string;
  "cc.notify.telegramFallback": string;

  // Billing & License Portal
  "cc.billing.title": string;
  "cc.billing.desc": string;
  "cc.billing.btn.portal": string;
  "cc.billing.btn.invoice": string;
  "cc.billing.plansTitle": string;
  "cc.billing.btn.buyPlan": string;
  "cc.billing.legalNotice": string;
  "cc.billing.legalItem1": string;
  "cc.billing.legalItem2": string;
  "cc.billing.legalItem3": string;

  // Support & Developer Chat
  "cc.support.desc": string;
  "cc.support.btn.chat": string;
  "cc.support.btn.sendLogs": string;
  "cc.support.btn.sendFile": string;
  "cc.support.btn.github": string;
  "cc.support.btn.email": string;

  // Account & Device Buttons
  "cc.profile.deactivate": string;
  "cc.profile.checkStatus": string;
  "cc.profile.activateKey": string;
  "cc.profile.buyPro": string;
  "cc.devices.deactivatePc": string;
  "cc.devices.syncStatus": string;

  // Control Center Notifications
  "cc.notify.portalOpened": string;
  "cc.notify.storeOpened": string;
  "cc.notify.keyCopied": string;
  "cc.notify.emailClientOpened": string;
  "cc.prompt.email": string;
  "cc.prompt.emailPlaceholder": string;

  // License Dialogs & Prompts
  "license.warning.premiumOnly": string;
  "license.btn.buy": string;
  "license.btn.enterKey": string;
  "license.prompt.key": string;
  "license.placeholder.key": string;
  "license.progress.activating": string;
  "license.notify.leadActivated": string;
  "license.notify.activated": string;
  "license.notify.uriActivated": string;
  "license.error.activate": string;
  "license.error.network": string;
  "license.info.noKey": string;
  "license.confirm.deactivate": string;
  "license.btn.yes": string;
  "license.btn.no": string;
  "license.progress.deactivating": string;
  "license.notify.deactivated": string;
  "license.info.freeEdition": string;
  "license.info.activePro": string;
  "license.warning.expired": string;
  "license.warning.offlineExpiring": string;
  "license.warning.offlineExpired": string;
  "license.error.revoked": string;

  // Telegram Chat Webview & Service
  "chat.title": string;
  "chat.session": string;
  "chat.session.tooltip": string;
  "chat.btn.new": string;
  "chat.btn.new.tooltip": string;
  "chat.btn.file": string;
  "chat.btn.file.tooltip": string;
  "chat.btn.logs": string;
  "chat.btn.logs.tooltip": string;
  "chat.btn.delete": string;
  "chat.btn.delete.tooltip": string;
  "chat.input.placeholder": string;
  "chat.btn.send": string;
  "chat.btn.reply": string;
  "chat.confirm.deleteSession": string;
  "chat.confirm.deleteAllSessions": string;
  "chat.notify.newSession": string;
  "chat.notify.sessionDeleted": string;
  "chat.notify.allSessionsDeleted": string;
  "chat.notify.logsSent": string;
  "chat.notify.filePickLabel": string;
  "chat.notify.fileSent": string;
  "chat.notify.fileNotFound": string;
  "chat.notify.devNotConnected": string;
  "chat.notify.devMessage": string;
  "chat.empty.title": string;
  "chat.empty.desc": string;
  "chat.session.label": string;
  "chat.msg.count": string;
  "chat.sender.user": string;
  "chat.sender.dev": string;
  "chat.status.delivered": string;
  "chat.topic.label": string;
  "chat.topic.placeholder": string;
  "chat.topic.chip.bug": string;
  "chat.topic.chip.eki": string;
  "chat.topic.chip.motion": string;
  "chat.topic.chip.safety": string;
  "chat.topic.chip.license": string;
  "chat.prompt.sessionTitle": string;
  "chat.prompt.sessionTitlePlaceholder": string;
  "chat.prompt.renameTopic": string;
  "chat.notify.newSessionWithTopic": string;
  "chat.notify.topicUpdated": string;
  "chat.btn.renameTopic": string;
  "chat.btn.renameTopic.tooltip": string;
  "chat.consent.remoteAction": string;
  "chat.consent.actionLogs": string;
  "chat.consent.actionProject": string;
  "chat.consent.actionSysinfo": string;

  // KRC Backup Diff
  "backup.picker.title": string;
  "backup.error.notFound": string;
  "backup.notify.identical": string;
  "backup.warning.differences": string;

  // Flowchart Extra
  "flow.title": string;
  "flow.notify.saved": string;
  "flow.error.noDef": string;
  "flow.error.analyze": string;

  // EKI Validator Extra
  "eki.error.readFailed": string;

  // Telegram Chat Warnings & Errors
  "chat.warning.noWorkspace": string;
  "chat.warning.noKrlFiles": string;
  "chat.warning.noEditorOpen": string;
  "chat.error.exportFailed": string;
  "chat.error.aiDiagFailed": string;
  "chat.error.logCaptureFailed": string;

  // I/O Signals Tree & Aliasing
  "io.view.empty": string;
  "io.line": string;
  "io.uses": string;
  "io.signals": string;
  "io.rename.prompt": string;
  "io.rename.placeholder": string;
  "io.rename.invalid": string;
  "io.rename.noConfig": string;
  "io.rename.pickConfig": string;
  "io.rename.updated": string;
  "io.rename.failed": string;

  // Report Generator
  "report.title": string;
  "report.date": string;
  "report.totalFiles": string;
  "report.totalIssues": string;
  "report.summary": string;
  "report.errors": string;
  "report.warnings": string;
  "report.info": string;
  "report.hints": string;
  "report.details": string;
  "report.noIssues": string;
  "report.line": string;

  // Cleanup Unused Variables
  "cleanup.notify.allUsed": string;
  "cleanup.picker.foldDetail": string;
  "cleanup.picker.varDetail": string;
  "cleanup.picker.selectPlaceholder": string;
  "cleanup.action.deleteLabel": string;
  "cleanup.action.deleteDesc": string;
  "cleanup.action.commentLabel": string;
  "cleanup.action.commentDesc": string;
  "cleanup.action.placeholder": string;
  "cleanup.notify.success": string;
  "cleanup.word.deleted": string;
  "cleanup.word.commented": string;

  // Modern KRL & iiQKA Fold Tools
  "command.convertToIiqkaFold": string;
  "command.convertToIiqkaFold.tooltip": string;
  "command.convertLegacyToSpline": string;
  "command.convertLegacyToSpline.tooltip": string;
  "command.unwrapFold": string;
  "command.unwrapFold.tooltip": string;
  "command.insertCollisionGuard": string;
  "command.insertCollisionGuard.tooltip": string;
  "command.insertSplineBlock": string;
  "command.insertSplineBlock.tooltip": string;
  "fold.notify.noSelection": string;
  "fold.notify.iiqkaSuccess": string;
  "fold.notify.noLegacyMotions": string;
  "fold.notify.splineSuccess": string;
  "fold.notify.noFoldsFound": string;
  "fold.notify.unwrapped": string;
  "fold.notify.collisionGuard": string;
  "fold.prompt.splineVel": string;
  "fold.notify.splineBlockCreated": string;
}

// English (default)
const en: Messages = {
  "info.checkingAllFiles": "KRL: Checking all files...",
  "info.documentFormatted": "KRL: Document formatted.",
  "info.trailingWhitespaceRemoved":
    "KRL: Trailing whitespace removed from {0} lines.",
  "info.noTrailingWhitespace": "KRL: No trailing whitespace found.",
  "info.declarationsSorted": "KRL: {0} declarations sorted by type.",
  "info.noDeclarationsToSort": "KRL: No declarations to sort.",

  "warning.noActiveKrlFile": "No active KRL file.",
  "warning.invalidGlobalUsage": "Invalid 'GLOBAL' modifier usage.",

  "error.serverNotRunning": "KRL Server is not running.",

  "prompt.foldRegionName": "Enter name for FOLD region",
  "prompt.foldRegionPlaceholder": "e.g.: Initialization, Movement, Gripper",

  "info.noSystemVariablesFound": "No system variables found in workspace.",
  "picker.systemVariables": "System Variables",
  "picker.selectSystemVariable": "Select a system variable to find...",

  "command.openControlCenter": "Open Control Center",
  "command.openControlCenter.tooltip":
    "Open KUKA KRL Professional Control Center Dashboard",
  "command.calculator": "3-Point Frame Calculator",
  "command.calculator.tooltip": "Open Base/Tool Coordinate Calculator",
  "command.cleanup": "Clean Up Unused Variables",
  "command.cleanup.tooltip": "Remove unused variables and dead subroutines",
  "command.formatDocument": "Format Document",
  "command.formatDocument.tooltip": "Format current KRL file",
  "command.sortDeclarations": "Sort Declarations",
  "command.sortDeclarations.tooltip": "Sort variables by type",
  "command.foldAll": "Fold All",
  "command.foldAll.tooltip": "Collapse all regions",
  "command.unfoldAll": "Unfold All",
  "command.unfoldAll.tooltip": "Expand all regions",
  "command.refreshIOView": "Refresh I/O View",
  "command.refreshIOView.tooltip": "Refresh I/O Signal List",
  "command.showFlowchart": "Interactive Logic Flowchart",
  "command.showFlowchart.tooltip":
    "Visualize KRL control-flow graph and logic branches",
  "command.compareKrcBackup": "KRC Backup Diff & Point Delta",
  "command.compareKrcBackup.tooltip":
    "Compare codebase & point coordinates against KRC ZIP backup",
  "command.openSnippetGenerator": "Snippet & Motion Generator",
  "command.openSnippetGenerator.tooltip":
    "Open Interactive Trajectory Diagrams & Snippet Builder",
  "command.aiCheckSafety": "Safety & Velocity Check",
  "command.aiCheckSafety.tooltip":
    "Run strict industrial safety checks ($VEL.CP, uninit tools/bases)",
  "command.validateEkiXml": "EthernetKRL (EKI) Validator",
  "command.validateEkiXml.tooltip": "Validate EKI XML schema files",
  "command.generateEkiCode": "Generate EKI Handler Routine",
  "command.generateEkiCode.tooltip":
    "Generate KRL communication subprogram for EthernetKRL",
  "command.cleanGitMetadata": "Clean WorkVisual Git Metadata",
  "command.cleanGitMetadata.tooltip":
    "Strip &ACCESS, &REL, &PARAM from WorkVisual files",
  "command.generateReport": "Generate Acceptance Report",
  "command.generateReport.tooltip":
    "Generate structured quality acceptance report",
  "command.findReferences": "Find All References (Go to References)",
  "command.findReferences.tooltip":
    "Search all references to selected variable, signal or subprogram across workspace",
  "command.sendLogsToDeveloper": "Send Diagnostic Logs to Developer",
  "command.sendLogsToDeveloper.tooltip":
    "Pack extension log and system info and send to lead developer",
  "command.sendFileToDeveloper": "Send File / KRL Code to Developer",
  "command.sendFileToDeveloper.tooltip":
    "Select any file on PC and send to developer",
  "command.openCustomerPortal": "Open Customer Portal & Invoices",
  "command.openCustomerPortal.tooltip":
    "Open Dodo Payments Customer Billing & Invoices Portal",
  "command.openTelegramChat": "Direct Engineering Support",
  "command.openTelegramChat.tooltip":
    "Live direct engineering support and consultation in VS Code",

  "cc.engTools": "Engineering Pro Tools",
  "cc.safetyDiag": "Safety Diagnostics & Quality",
  "cc.accountHub": "Engineer Pro Account Hub",
  "cc.tab.profile": "Profile & Key",
  "cc.tab.devices": "Device Manager",
  "cc.tab.billing": "Subscription & Billing",
  "cc.tab.support": "Support & Feedback",
  "cc.btn.openFlowchart": "Open Flowchart",
  "cc.btn.inspectBackup": "Inspect Backup",
  "cc.btn.generateSnippets": "Generate Snippets",
  "cc.btn.openCalculator": "Open Calculator",
  "cc.btn.ekiValidator": "EKI Validator",
  "cc.btn.generateHandler": "Generate Handler",
  "cc.btn.cleanGitMetadata": "Clean Git Metadata",
  "cc.btn.runSafetyCheck": "Run Safety Check",
  "cc.btn.generateReport": "Generate Report",

  "flow.err.unreachable": "Unreachable Code",
  "flow.err.infiniteLoop": "Infinite Loop",
  "flow.err.emptyBranch": "Empty Branch",
  "flow.err.invalidGoto": "Invalid GOTO",
  "flow.err.uninitMotion": "Uninitialized Motion",
  "flow.msg.emptyBranch": "IF condition on line {0} has an empty branch.",
  "flow.msg.infiniteLoop": "LOOP on line {0} has no EXIT/HALT commands.",
  "flow.msg.unreachableMotion":
    "Motion command on line {0} is unreachable after flow interruption.",
  "flow.msg.unreachableCode":
    "Code on line {0} is unreachable due to flow interruption (RETURN/EXIT/HALT).",
  "flow.msg.uninitMotion":
    "Motion on line {0} lacks prior TOOL/BASE initialization (needs BAS(#INITMOV) or $TOOL/$BASE).",
  "flow.msg.invalidGoto":
    "Target label '{0}' for GOTO on line {1} is undefined in this file.",
  "flow.ui.zoomOut": "Zoom Out",
  "flow.ui.zoomReset": "Fit Screen",
  "flow.ui.zoomIn": "Zoom In",
  "flow.ui.downloadSvg": "Download",
  "flow.ui.downloadTitle": "Download in SVG format",
  "flow.ui.toggleDetailed": "Toggle Detailed View",
  "flow.ui.detailedOn": "🔍 Detailed: ON",
  "flow.ui.detailedOff": "🔍 Detailed: OFF",
  "flow.ui.mainProgram": "🏠 Main Program",
  "flow.ui.logicErrors": "Logic Errors",
  "flow.ui.noErrors": "✅ No logic errors detected",
  "flow.ui.line": "Line {0}",

  "safety.notify.safe":
    "🛡️ Industrial Safety Check: CODE IS SAFE FOR KRC EXECUTION! (Max Limit: {0} m/s)",
  "safety.error.violations": "🚨 Safety Violations Found:",
  "safety.alert.critical":
    "🚨 KRC Safety & Logic Alert: Found {0} critical error(s) and {1} risk(s) in active file!",
  "safety.alert.warning":
    "⚠️ KRC Safety & Logic Warning: Found {0} logic risk(s) in active file. Check VS Code Problems panel.",

  "eki.notify.valid": "✅ EKI XML Config ({0}): Valid EthernetKRL Schema!",
  "eki.error.title": "❌ EKI XML Configuration Errors:",
  "eki.prompt.channelName": "Enter EthernetKRL (EKI) Channel Name",
  "eki.picker.selectXml": "Select EthernetKRL Configuration XML file",
  "eki.warning.notXml":
    "Active file is not an EthernetKRL XML config. Select an EKI XML file or generate KRL Handler.",
  "eki.btn.generate": "➕ Generate EKI KRL Handler",
  "eki.btn.select": "📂 Select XML File...",

  "snippet.title": "KRL Snippet Generator",
  "snippet.tab.message": "Message Builder",
  "snippet.tab.grid": "Grid Pattern",
  "snippet.tab.motion": "Motion (PTP/LIN)",
  "snippet.msg.title": "KUKA User Message",
  "snippet.msg.desc": "Generates code for KUKA User Messages (KrlMsg).",
  "snippet.msg.type": "Type",
  "snippet.msg.type.notify": "Notify (Log)",
  "snippet.msg.type.quit": "Quit (Acknowledge)",
  "snippet.msg.type.state": "State (Status)",
  "snippet.msg.type.wait": "Wait (Blocking)",
  "snippet.msg.key": "Key (Unique ID)",
  "snippet.msg.key.placeholder": "e.g. MyMsg1",
  "snippet.msg.text": "Message Text (use %1, %2 for params)",
  "snippet.msg.text.placeholder": "e.g. Value is %1",
  "snippet.msg.param1": "Parameter 1 (Optional)",
  "snippet.msg.param1.placeholder": "e.g. nCount",
  "snippet.insert": "Insert Snippet",
  "snippet.grid.title": "Palletizing Grid",
  "snippet.grid.desc": "Generates nested loops for a grid pattern.",
  "snippet.grid.base": "Base Point Name",
  "snippet.grid.rows": "Rows (X)",
  "snippet.grid.cols": "Cols (Y)",
  "snippet.grid.spaceX": "Spacing X (mm)",
  "snippet.grid.spaceY": "Spacing Y (mm)",
  "snippet.mot.title": "Motion Command",
  "snippet.mot.desc": "Generates standard PTP or LIN movement blocks.",
  "snippet.mot.type": "Motion Type",
  "snippet.mot.point": "Point Name",
  "snippet.mot.vel": "Velocity (m/s or %)",
  "snippet.mot.approx": "Approximation",
  "snippet.mot.approx.none": "None",
  "snippet.alert.inserted": "Snippet inserted!",
  "snippet.alert.noEditor": "No active KRL editor found!",
  "snippet.desc.ptp":
    "<b>PTP (Point-to-Point):</b> Movement along fastest axis trajectory. Axes A1-A6 synchronize to finish simultaneously at {0}% speed.",
  "snippet.desc.lin":
    "<b>LIN (Linear):</b> Robot flange (TCP) moves strictly along a straight line in space at fixed velocity ({0} m/s). Ideal for welding & piping.",
  "snippet.desc.circ":
    "<b>CIRC (Circular):</b> TCP moves along circular arc via auxiliary point <b>X{0}</b> to target point <b>X{1}</b> at {2} m/s.",
  "snippet.desc.sptp":
    "<b>SPTP (Spline PTP - KSS 8.3+):</b> Spline PTP motion with jerk limitation ($SGEAR_JERK). Provides maximum smooth axis acceleration without vibration.",
  "snippet.desc.slin":
    "<b>SLIN (Spline Linear - KSS 8.3+):</b> Spline linear motion with high-precision orientation profiling and <b>C_Spl</b> smoothing.",
  "snippet.desc.scirc":
    "<b>SCIRC (Spline Circular - KSS 8.3+):</b> Spline circular arc via <b>X{0}</b> to <b>X{1}</b> maintaining continuous orientation.",
  "snippet.desc.splineBlock":
    "<b>SPLINE Path Block:</b> Continuous trajectory block (SLIN/SPL/SCIRC). Robot calculates single velocity profile without stopping at nodes.",

  "cc.prompt.telegram": "Message to Lead Engineer",
  "cc.prompt.telegram.placeholder": "Type your message or technical question...",
  "cc.notify.telegramSent": "Message sent to Lead Engineer!",
  "cc.notify.telegramFallback":
    "Failed to send message. Please check connection and try again.",

  "cc.billing.title": "Dodo Payments Billing & Invoices",
  "cc.billing.desc":
    "Manage receipts, purchases and official VAT invoices via protected Dodo Payments customer portal.",
  "cc.billing.btn.portal": "🔗 Open Dodo Payments Customer Portal",
  "cc.billing.btn.invoice": "📥 Download Invoices & Receipts (PDF)",
  "cc.billing.plansTitle":
    "🛒 Available Pricing Tiers & Purchase Options (Dodo Payments)",
  "cc.billing.btn.buyPlan": "Buy {0}",
  "cc.billing.legalNotice": "📌 Corporate & Accounting Information:",
  "cc.billing.legalItem1":
    "Dodo Payments acts as the official Merchant of Record for Liskin Labs software.",
  "cc.billing.legalItem2":
    "Payment receipts and VAT invoices are automatically delivered to your registered email upon purchase.",
  "cc.billing.legalItem3":
    "Use the Customer Portal to update billing details or export full transaction history.",

  "cc.support.desc":
    "Have questions, feature requests or technical issues on-site? Connect directly with Lead Engineer Silvestr Liskin.",
  "cc.support.btn.chat": "💬 Direct Engineering Chat",
  "cc.support.btn.sendLogs": "📊 Send Extension Logs",
  "cc.support.btn.sendFile": "📎 Send KRL File / Code",
  "cc.support.btn.github": "🐛 Report Issue on GitHub",
  "cc.support.btn.email": "✉️ Email Direct Support",

  "cc.profile.deactivate": "🔴 Sign Out / Deactivate License Key",
  "cc.profile.checkStatus": "🔄 Verify Online Status",
  "cc.profile.activateKey": "🔑 Enter License Key",
  "cc.profile.buyPro": "🛒 Buy Pro License",
  "cc.devices.deactivatePc": "🔓 Deactivate Current PC",
  "cc.devices.syncStatus": "🔄 Sync Device Status",

  "cc.notify.portalOpened":
    "🔗 Opened official Dodo Payments Customer Portal (manage subscriptions & invoices).",
  "cc.notify.storeOpened":
    "🛒 Opened official KUKA KRL Professional License Store (Dodo Payments).",
  "cc.notify.keyCopied": "📋 License key copied to clipboard!",
  "cc.notify.emailClientOpened":
    "✉️ Email client opened for silvestr.liskin@teknorob.com!",
  "cc.prompt.email": "Send direct message to Lead Engineer Silvestr Liskin",
  "cc.prompt.emailPlaceholder":
    "Describe your question, feature request, or KRL issue...",

  "license.warning.premiumOnly":
    "This feature is available only in Premium Edition. Please activate your license key.",
  "license.btn.buy": "Buy License",
  "license.btn.enterKey": "Enter Key",
  "license.prompt.key": "Enter your KRL Extension License Key (Dodo Payments)",
  "license.placeholder.key":
    "e.g. xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx (Dodo License Key)",
  "license.progress.activating": "Activating license in Dodo Payments...",
  "license.notify.leadActivated":
    "🚀 Teknorob Lead Pro Industrial License successfully activated!",
  "license.notify.activated":
    "🎉 Dodo Payments license activated! All Pro features unlocked. 30-day offline buffer.",
  "license.notify.uriActivated":
    "💎 KUKA KRL Pro license activated via 1-click link! All features unlocked.",
  "license.error.activate": "Dodo Payments Activation Error: {0}",
  "license.error.network": "Network activation error: {0}",
  "license.info.noKey": "No active license key found.",
  "license.confirm.deactivate":
    "Are you sure you want to deactivate the license on this device?",
  "license.btn.yes": "Yes",
  "license.btn.no": "No",
  "license.progress.deactivating": "Deactivating device in Dodo Payments...",
  "license.notify.deactivated":
    "Device successfully deactivated in Dodo Payments.",
  "license.info.freeEdition": "Using free Community Edition.",
  "license.info.activePro":
    "Dodo Payments License Active (PRO). Subscription: {0}. Offline buffer: {1} days.",
  "license.warning.expired":
    "License inactive or offline buffer expired. Connect to internet for re-validation.",
  "license.warning.offlineExpiring":
    "⚠️ Offline license period expires in {0} days. Please connect to the Internet to re-validate.",
  "license.warning.offlineExpired":
    "🔒 Offline license period expired (30 days). Please connect to the Internet to re-validate.",
  "license.error.revoked":
    "🔒 Your KRL Extension license was deactivated or revoked on the server.",

  "chat.title": "💬 Direct Engineering Support",
  "chat.session": "Session",
  "chat.session.tooltip": "Switch to any past chat session",
  "chat.btn.new": "➕ New Chat",
  "chat.btn.new.tooltip": "Start a clean conversation with new session ID",
  "chat.btn.file": "📎 File / Screenshot",
  "chat.btn.file.tooltip": "Send any file or screenshot from PC to developer",
  "chat.btn.logs": "📊 Logs",
  "chat.btn.logs.tooltip": "Capture and send extension logs",
  "chat.btn.delete": "🗑️ Delete Session",
  "chat.btn.delete.tooltip": "Delete current session history",
  "chat.input.placeholder":
    "Ask the developer a question or report an issue...",
  "chat.btn.send": "Send ➔",
  "chat.btn.reply": "💬 Reply",
  "chat.confirm.deleteSession":
    "Are you sure you want to delete chat session #{0}?",
  "chat.confirm.deleteAllSessions":
    "Are you sure you want to delete ALL chat sessions history?",
  "chat.notify.newSession": "✨ Created new chat session #{0}",
  "chat.notify.sessionDeleted": "Chat session #{0} deleted.",
  "chat.notify.allSessionsDeleted": "All chat sessions deleted successfully.",
  "chat.notify.logsSent": "📊 Logs & diagnostic report sent to developer",
  "chat.notify.filePickLabel": "Send file / screenshot to developer",
  "chat.notify.fileSent":
    '{0} "{1}" successfully sent to developer!',
  "chat.notify.fileNotFound": "File not found: {0}",
  "chat.notify.devNotConnected":
    "⚠️ Chat server initializing. Please try sending again in 5 seconds.",
  "chat.notify.devMessage": '📬 Message from Lead Developer: "{0}"',
  "chat.empty.title": "Direct Connection with Silvestr Liskin",
  "chat.empty.desc":
    "Ask any KRL question, send diagnostic logs, or attach project files. Replies will arrive right here!",
  "chat.session.label": "Session #{0} ({1} msgs | {2})",
  "chat.msg.count": "{0} msgs",
  "chat.sender.user": "You (Engineer)",
  "chat.sender.dev": "👨‍💻 Silvestr Liskin (Lead Developer)",
  "chat.status.delivered": "✓ Delivered to Engineer",
  "chat.topic.label": "Subject / Topic:",
  "chat.topic.placeholder": "Enter topic (e.g., EKI Setup, $VEL.CP error)...",
  "chat.topic.chip.bug": "🚨 Bug / Error",
  "chat.topic.chip.eki": "⚙️ EthernetKRL (EKI)",
  "chat.topic.chip.motion": "⚡ Motion & Trajectory",
  "chat.topic.chip.safety": "🛡️ Safety & Logic",
  "chat.topic.chip.license": "💼 License & PRO",
  "chat.prompt.sessionTitle":
    "Enter topic / subject for this session (e.g. EKI Setup, $VEL.CP error):",
  "chat.prompt.sessionTitlePlaceholder": "Topic / Subject (optional)",
  "chat.prompt.renameTopic": "Rename or update the topic for session #{0}:",
  "chat.notify.newSessionWithTopic":
    "✨ Created new chat session #{0} [Topic: {1}]",
  "chat.notify.topicUpdated": "Session #{0} topic updated to: {1}",
  "chat.btn.renameTopic": "✏️ Topic",
  "chat.btn.renameTopic.tooltip":
    "Edit or set subject topic for current session",
  "chat.consent.remoteAction":
    "🔒 Developer Request: Silvestr Liskin requests '{0}'. Allow sending this data from your workspace?",
  "chat.consent.actionLogs": "Diagnostic Logs Export",
  "chat.consent.actionProject": "KRL Project Workspace Export",
  "chat.consent.actionSysinfo": "PC System Info & Diagnostics",

  "backup.picker.title": "Select KRC Backup (.zip)",
  "backup.error.notFound":
    '❌ File "{0}" was not found inside selected KRC Backup archive.',
  "backup.notify.identical":
    "✅ KRC Backup Compare: {0} points are 100% identical to backup!",
  "backup.warning.differences":
    "⚠️ Point differences detected in {0}! Check Output channel 'KRC Backup Point Diff' for details.",

  "flow.title": "KRL Flowchart: {0}",
  "flow.notify.saved": "Flowchart saved successfully!",
  "flow.error.noDef": "Could not find definition for {0}",
  "flow.error.analyze": "Failed to analyze KRL flow: {0}",

  "eki.error.readFailed": "Error reading EKI XML: {0}",

  "chat.warning.noWorkspace": "No open workspace folder in VS Code",
  "chat.warning.noKrlFiles": "No KRL files (.src, .dat) found",
  "chat.warning.noEditorOpen": "Open a KRL file for AI diagnostics",
  "chat.error.exportFailed": "Project export error: {0}",
  "chat.error.aiDiagFailed": "AI diagnostics error: {0}",
  "chat.error.logCaptureFailed": "Log capture error: {0}",

  "io.view.empty": "No KRL signals found in workspace",
  "io.line": "Line {0}",
  "io.uses": "{0} uses",
  "io.signals": "{0} signals",
  "io.rename.prompt": "Enter alias for {0}",
  "io.rename.placeholder": "e.g. Vacuum_OK, Gripper_Closed",
  "io.rename.invalid":
    "Invalid KRL identifier (must start with letter/_ and contain only letters/numbers/_)",
  "io.rename.noConfig":
    "Could not find '$config.dat' in workspace. Cannot save alias.",
  "io.rename.pickConfig": "Select $config.dat to save alias",
  "io.rename.updated": "Signal updated: {0}[{1}] -> {2}",
  "io.rename.failed": "Failed to update $config.dat: {0}",

  "report.title": "# KRL Project Analysis Report\n\n",
  "report.date": "**Date:** {0}\n",
  "report.totalFiles": "**Total KRL Files:** {0}\n",
  "report.totalIssues": "**Total Issues:** {0}\n\n",
  "report.summary": "## Summary\n",
  "report.errors": "- 🔴 **Errors:** {0}\n",
  "report.warnings": "- 🟡 **Warnings:** {0}\n",
  "report.info": "- 🔵 **Information:** {0}\n",
  "report.hints": "- ⚪ **Hints:** {0}\n\n",
  "report.details": "## Detailed Issues\n",
  "report.noIssues": "_No issues found in the workspace._\n",
  "report.line": "- {0} **Line {1}:** {2}\n",

  "cleanup.notify.allUsed":
    "✅ All variables are in use! No unused declarations found.",
  "cleanup.picker.foldDetail": ";FOLD block will be cleaned completely",
  "cleanup.picker.varDetail": "Unused variable",
  "cleanup.picker.selectPlaceholder":
    "Found {0} unused declarations. Select lines to clean up:",
  "cleanup.action.deleteLabel": "$(trash) Delete",
  "cleanup.action.deleteDesc":
    "Permanently delete unused variables and FOLD blocks",
  "cleanup.action.commentLabel": "$(comment) Comment Out",
  "cleanup.action.commentDesc": "Safe mode: comment out (; DECL ...)",
  "cleanup.action.placeholder": "Select cleanup action:",
  "cleanup.notify.success": "Successfully {0} lines: {1}.",
  "cleanup.word.deleted": "deleted",
  "cleanup.word.commented": "commented out",

  // Modern KRL & iiQKA Fold Tools
  "command.convertToIiqkaFold": "Convert Selection to iiQKA Motion Fold",
  "command.convertToIiqkaFold.tooltip":
    "Transform motion statement into standard iiQKA / KSS inline fold",
  "command.convertLegacyToSpline": "Convert Legacy Motions to Modern Splines",
  "command.convertLegacyToSpline.tooltip":
    "Upgrade PTP/LIN/CIRC to modern SPTP/SLIN/SCIRC with approximation parameters",
  "command.unwrapFold": "Unwrap / Strip FOLD Envelopes",
  "command.unwrapFold.tooltip":
    "Remove ;FOLD and ;ENDFOLD boundaries while preserving inner code",
  "command.insertCollisionGuard": "Insert CollisionGuard / Torque Envelope",
  "command.insertCollisionGuard.tooltip":
    "Wrap motion block in $COLL_MON collision protection triggers",
  "command.insertSplineBlock": "Wrap in Modern SPLINE Block",
  "command.insertSplineBlock.tooltip":
    "Create optimized SPLINE ... ENDSPLINE continuous path block",
  "fold.notify.noSelection": "Please select a KRL motion or logic block first.",
  "fold.notify.iiqkaSuccess": "Successfully converted to iiQKA Fold format.",
  "fold.notify.noLegacyMotions": "No legacy motion commands found to convert.",
  "fold.notify.splineSuccess":
    "Successfully upgraded {0} motion(s) to modern Splines.",
  "fold.notify.noFoldsFound": "No FOLD envelopes found in selected range.",
  "fold.notify.unwrapped": "Successfully unwrapped {0} FOLD envelope(s).",
  "fold.notify.collisionGuard": "Inserted CollisionGuard protection envelope.",
  "fold.prompt.splineVel":
    "Enter Cartesian Spline Velocity ($VEL.CP in m/s)",
  "fold.notify.splineBlockCreated": "Created modern SPLINE motion block.",
};

// Russian
const ru: Messages = {
  "info.checkingAllFiles": "KRL: Проверка всех файлов...",
  "info.documentFormatted": "KRL: Документ отформатирован.",
  "info.trailingWhitespaceRemoved": "KRL: Удалены пробелы в конце {0} строк.",
  "info.noTrailingWhitespace": "KRL: Пробелы в конце строк не найдены.",
  "info.declarationsSorted": "KRL: {0} объявлений отсортировано по типу.",
  "info.noDeclarationsToSort": "KRL: Нет объявлений для сортировки.",

  "warning.noActiveKrlFile": "Нет активного KRL файла.",
  "warning.invalidGlobalUsage": "Неверное использование модификатора 'GLOBAL'.",

  "error.serverNotRunning": "KRL сервер не запущен.",

  "prompt.foldRegionName": "Введите имя для FOLD-региона",
  "prompt.foldRegionPlaceholder": "например: Инициализация, Движение, Захват",

  "info.noSystemVariablesFound":
    "Системные переменные не найдены в рабочем пространстве.",
  "picker.systemVariables": "Системные переменные",
  "picker.selectSystemVariable": "Выберите системную переменную для поиска...",

  "command.openControlCenter": "Открыть Панель управления",
  "command.openControlCenter.tooltip":
    "Открыть главную панель управления KUKA Control Center",
  "command.calculator": "3D Калькулятор фреймов",
  "command.calculator.tooltip":
    "Калькулятор 3D фреймов баз и инструментов KUKA",
  "command.cleanup": "Очистка неиспользуемых переменных",
  "command.cleanup.tooltip": "Удалить неиспользуемые переменные и мертвый код",
  "command.formatDocument": "Форматировать документ",
  "command.formatDocument.tooltip": "Отформатировать текущий файл KRL",
  "command.sortDeclarations": "Сортировать объявления",
  "command.sortDeclarations.tooltip": "Сортировать объявления по типам данных",
  "command.foldAll": "Свернуть всё",
  "command.foldAll.tooltip": "Свернуть все блоки ;FOLD",
  "command.unfoldAll": "Развернуть всё",
  "command.unfoldAll.tooltip": "Развернуть все блоки ;FOLD",
  "command.refreshIOView": "Обновить сигналы I/O",
  "command.refreshIOView.tooltip": "Обновить дерево сигналов I/O",
  "command.showFlowchart": "Интерактивная блок-схема",
  "command.showFlowchart.tooltip": "Интерактивная блок-схема и граф логики KRL",
  "command.compareKrcBackup": "Сравнение KRC Бэкапа и дельт точек",
  "command.compareKrcBackup.tooltip":
    "Сравнить код и дельты точек E6POS с ZIP-бэкапом KRC",
  "command.openSnippetGenerator": "Генератор сниппетов и движений",
  "command.openSnippetGenerator.tooltip":
    "Интерактивные схемы траекторий и мастер сниппетов",
  "command.aiCheckSafety": "Проверка безопасности и скоростей",
  "command.aiCheckSafety.tooltip":
    "Проверить скорости $VEL.CP, инициализацию $TOOL/$BASE и кириллицу",
  "command.validateEkiXml": "Валидатор EthernetKRL (EKI) XML",
  "command.validateEkiXml.tooltip": "Проверить XML-схемы обмена EthernetKRL",
  "command.generateEkiCode": "Генератор KRL-обработчика EKI",
  "command.generateEkiCode.tooltip":
    "Сгенерировать подпрограмму KRL для сетевого обмена EthernetKRL",
  "command.cleanGitMetadata": "Очистка Git-метаданных WorkVisual",
  "command.cleanGitMetadata.tooltip":
    "Очистить заголовки &ACCESS, &REL, &PARAM для чистых Git-коммитов",
  "command.generateReport": "Сформировать отчёт качества кода",
  "command.generateReport.tooltip":
    "Сформировать итоговый отчёт качества кода для сдачи заказчику",
  "command.findReferences": "Найти все ссылки (Go to References)",
  "command.findReferences.tooltip":
    "Поиск всех упоминаний выбранной переменной, сигнала или подпрограммы по всему проекту",
  "command.sendLogsToDeveloper": "Отправить логи диагностики разработчику",
  "command.sendLogsToDeveloper.tooltip":
    "Сформировать лог расширения и отправить ведущему инженеру-разработчику",
  "command.sendFileToDeveloper": "Отправить файл / KRL код разработчику",
  "command.sendFileToDeveloper.tooltip":
    "Выбрать любой файл на ПК и отправить инженеру-разработчику",
  "command.openCustomerPortal": "Личный кабинет и инвойсы",
  "command.openCustomerPortal.tooltip":
    "Открыть портал биллинга и инвойсов Dodo Payments",
  "command.openTelegramChat": "Прямой чат с инженером-разработчиком",
  "command.openTelegramChat.tooltip":
    "Прямой чат и консультации с ведущим разработчиком в VS Code",

  "cc.engTools": "Инженерные Pro-Инструменты",
  "cc.safetyDiag": "Диагностика Безопасности и Качества",
  "cc.accountHub": "Личный кабинет инженера Pro",
  "cc.tab.profile": "Профиль и Ключ",
  "cc.tab.devices": "Менеджер устройств",
  "cc.tab.billing": "Подписка и Счета",
  "cc.tab.support": "Поддержка и Обратная связь",
  "cc.btn.openFlowchart": "Открыть блок-схему",
  "cc.btn.inspectBackup": "Сравнить Бэкап",
  "cc.btn.generateSnippets": "Сниппеты и Траектории",
  "cc.btn.openCalculator": "Открыть Калькулятор",
  "cc.btn.ekiValidator": "Валидатор EKI",
  "cc.btn.generateHandler": "Создать обработчик EKI",
  "cc.btn.cleanGitMetadata": "Очистить Git-метаданные",
  "cc.btn.runSafetyCheck": "Проверить безопасность",
  "cc.btn.generateReport": "Сформировать отчёт",

  "flow.err.unreachable": "Недостижимый код",
  "flow.err.infiniteLoop": "Бесконечный цикл",
  "flow.err.emptyBranch": "Пустая ветка",
  "flow.err.invalidGoto": "Неверный GOTO",
  "flow.err.uninitMotion": "Без инициализации",
  "flow.msg.emptyBranch":
    "Условие IF на строке {0} имеет пустую ветку (не содержит исполняемого кода).",
  "flow.msg.infiniteLoop":
    "Цикл LOOP на строке {0} не имеет команд выхода (EXIT/HALT) и является бесконечным.",
  "flow.msg.unreachableMotion":
    "Команда движения на строке {0} недостижима после прерывания потока выполнения.",
  "flow.msg.unreachableCode":
    "Код на строке {0} недостижим из-за прерывания потока (RETURN/EXIT/HALT) выше.",
  "flow.msg.uninitMotion":
    "Движение на строке {0} вызвано без предварительной инициализации TOOL/BASE.",
  "flow.msg.invalidGoto":
    "Целевая метка '{0}' для перехода GOTO на строке {1} не определена в файле.",
  "flow.ui.zoomOut": "Уменьшить",
  "flow.ui.zoomReset": "Вписать в экран",
  "flow.ui.zoomIn": "Увеличить",
  "flow.ui.downloadSvg": "Скачать",
  "flow.ui.downloadTitle": "Скачать в формате SVG",
  "flow.ui.toggleDetailed": "Переключить детальный вид",
  "flow.ui.detailedOn": "🔍 Детальный: ВКЛ",
  "flow.ui.detailedOff": "🔍 Детальный: ВЫКЛ",
  "flow.ui.mainProgram": "🏠 Главная программа",
  "flow.ui.logicErrors": "Ошибки логики",
  "flow.ui.noErrors": "✅ Ошибок логики не обнаружено",
  "flow.ui.line": "Строка {0}",

  "safety.notify.safe":
    "🛡️ Проверка безопасности: КОД БЕЗОПАСЕН ДЛЯ ИСПОЛНЕНИЯ НА KRC! (Лимит скорости: {0} м/с)",
  "safety.error.violations": "🚨 Обнаружены нарушения безопасности:",
  "safety.alert.critical":
    "🚨 Ошибка безопасности и логики KRC: Найдено {0} критических ошибок и {1} рисков в активном файле!",
  "safety.alert.warning":
    "⚠️ Предупреждение безопасности и логики KRC: Найдено {0} логических рисков в активном файле. Проверьте вкладку Проблемы.",

  "eki.notify.valid":
    "✅ Конфигурация EKI XML ({0}): Валидная схема EthernetKRL!",
  "eki.error.title": "❌ Ошибки конфигурации EKI XML:",
  "eki.prompt.channelName": "Введите имя канала EthernetKRL (EKI)",
  "eki.picker.selectXml": "Выберите XML файл конфигурации EthernetKRL",
  "eki.warning.notXml":
    "Активный файл не является XML-конфигурацией EthernetKRL. Выберите XML-файл EKI или сгенерируйте KRL-обработчик.",
  "eki.btn.generate": "➕ Создать KRL-обработчик EKI",
  "eki.btn.select": "📂 Выбрать XML-файл...",

  "snippet.title": "Генератор KRL Сниппетов",
  "snippet.tab.message": "Сообщения KUKA",
  "snippet.tab.grid": "Паттерн Сетки",
  "snippet.tab.motion": "Движение (PTP/LIN)",
  "snippet.msg.title": "Пользовательские сообщения",
  "snippet.msg.desc": "Генерация кода для сообщений (KrlMsg).",
  "snippet.msg.type": "Тип сообщения",
  "snippet.msg.type.notify": "Уведомление (Notify)",
  "snippet.msg.type.quit": "С подтверждением (Quit)",
  "snippet.msg.type.state": "Статусное (State)",
  "snippet.msg.type.wait": "Ожидание (Wait)",
  "snippet.msg.key": "Ключ (Уникальный ID)",
  "snippet.msg.key.placeholder": "напр. MyMsg1",
  "snippet.msg.text": "Текст (используйте %1, %2 для параметров)",
  "snippet.msg.text.placeholder": "напр. Значение равно %1",
  "snippet.msg.param1": "Параметр 1 (Опционально)",
  "snippet.msg.param1.placeholder": "напр. nCount",
  "snippet.insert": "Вставить Сниппет",
  "snippet.grid.title": "Сетка Паллетирования",
  "snippet.grid.desc": "Генерация вложенных циклов для сетки.",
  "snippet.grid.base": "Имя базовой точки",
  "snippet.grid.rows": "Строки (X)",
  "snippet.grid.cols": "Столбцы (Y)",
  "snippet.grid.spaceX": "Шаг по X (мм)",
  "snippet.grid.spaceY": "Шаг по Y (мм)",
  "snippet.mot.title": "Команда движения",
  "snippet.mot.desc": "Генерация стандартных движений PTP или LIN.",
  "snippet.mot.type": "Тип движения",
  "snippet.mot.point": "Имя точки",
  "snippet.mot.vel": "Скорость (м/с или %)",
  "snippet.mot.approx": "Сглаживание",
  "snippet.mot.approx.none": "Нет (Точно)",
  "snippet.alert.inserted": "Сниппет вставлен!",
  "snippet.alert.noEditor": "Активный KRL файл не найден!",
  "snippet.desc.ptp":
    "<b>PTP (Point-to-Point):</b> Движение по наиболее быстрой траектории осей. Оси A1-A6 синхронизируются и заканчивают движение одновременно со скоростью {0}%.",
  "snippet.desc.lin":
    "<b>LIN (Linear):</b> Фланец робота (TCP) двигается строго по прямой линии в пространстве с фиксированной скоростью ({0} m/s). Идеально для сварки и пайпинга.",
  "snippet.desc.circ":
    "<b>CIRC (Circular):</b> Движение TCP по дуге окружности через вспомогательную точку <b>X{0}</b> к целевой точке <b>X{1}</b> со скоростью {2} m/s.",
  "snippet.desc.sptp":
    "<b>SPTP (Spline PTP - KSS 8.3+):</b> Сплайновое PTP-движение с ограничением рывка ($SGEAR_JERK). Обеспечивает максимально плавное ускорение осей без вибраций.",
  "snippet.desc.slin":
    "<b>SLIN (Spline Linear - KSS 8.3+):</b> Сплайновое линейное движение с высокоточным профилированием ориентации и сглаживания <b>C_Spl</b>.",
  "snippet.desc.scirc":
    "<b>SCIRC (Spline Circular - KSS 8.3+):</b> Сплайновая дуга окружности через <b>X{0}</b> к <b>X{1}</b> с сохранением непрерывной ориентации.",
  "snippet.desc.splineBlock":
    "<b>SPLINE Path Block:</b> Слитный непрерывный блок траекторий (SLIN/SPL/SCIRC). Робот рассчитывает единый профиль скорости без остановок в узлах.",

  "cc.prompt.telegram": "Сообщение ведущему инженеру",
  "cc.prompt.telegram.placeholder": "Введите ваше сообщение или вопрос...",
  "cc.notify.telegramSent":
    "Сообщение успешно отправлено ведущему инженеру!",
  "cc.notify.telegramFallback":
    "Не удалось отправить сообщение. Попробуйте еще раз.",

  "cc.billing.title": "Биллинг и Инвойсы Dodo Payments",
  "cc.billing.desc":
    "Управление чеками, покупками и бухгалтерскими инвойсами (с НДС) через защищённый портал покупателя Dodo Payments.",
  "cc.billing.btn.portal": "🔗 Открыть кабинет покупателя Dodo Payments",
  "cc.billing.btn.invoice": "📥 Скачать инвойсы и акты (PDF)",
  "cc.billing.plansTitle":
    "🛒 Доступные варианты покупки и тарифные планы (Dodo Payments)",
  "cc.billing.btn.buyPlan": "Купить {0}",
  "cc.billing.legalNotice": "📌 Информация для юридических лиц и бухгалтерии:",
  "cc.billing.legalItem1":
    "Dodo Payments является официальным регистрирующим продавцом (Merchant of Record) для решений Liskin Labs.",
  "cc.billing.legalItem2":
    "Кассовые чеки и инвойсы с указанием НДС (VAT ID) автоматически высылаются на ваш контактный email при покупке.",
  "cc.billing.legalItem3":
    "Для изменения платежных реквизитов организации или выгрузки истории транзакций используйте Кабинет покупателя.",

  "cc.support.desc":
    "Возникли вопросы, предложение идеи или ошибки при пусконаладке KRL? Свяжитесь напрямую с ведущим инженером Сильвестром Лискиным.",
  "cc.support.btn.chat": "💬 Прямой чат с инженером",
  "cc.support.btn.sendLogs": "📊 Отправить логи разработчику",
  "cc.support.btn.sendFile": "📎 Отправить файл / KRL код",
  "cc.support.btn.github": "🐛 Сообщить о баге на GitHub",
  "cc.support.btn.email": "✉️ Отправить письмо (Email)",

  "cc.profile.deactivate": "🔴 Выйти из учетной записи / Деактивировать ключ",
  "cc.profile.checkStatus": "🔄 Проверить онлайн-статус",
  "cc.profile.activateKey": "🔑 Ввести активационный ключ (License Key)",
  "cc.profile.buyPro": "🛒 Купить Pro лицензию",
  "cc.devices.deactivatePc": "🔓 Деактивировать текущий ПК",
  "cc.devices.syncStatus": "🔄 Синхронизировать статус ПК",

  "cc.notify.portalOpened":
    "🔗 Открыт официальный портал покупателя Dodo Payments (управление подписками и инвойсами).",
  "cc.notify.storeOpened":
    "🛒 Открыт официальный магазин лицензий KUKA KRL Professional (Dodo Payments).",
  "cc.notify.keyCopied": "📋 Лицензионный ключ скопирован в буфер обмена!",
  "cc.notify.emailClientOpened":
    "✉️ Почтовый клиент открыт с вашим сообщением для silvestr.liskin@teknorob.com!",
  "cc.prompt.email":
    "Отправить прямое сообщение ведущему инженеру Silvestr Liskin",
  "cc.prompt.emailPlaceholder":
    "Опишите ваш вопрос, запрос на функцию или техническую проблему KRL...",

  "license.warning.premiumOnly":
    "Эта функция доступна только в Premium-версии. Пожалуйста, активируйте лицензию.",
  "license.btn.buy": "Купить лицензию",
  "license.btn.enterKey": "Ввести ключ",
  "license.prompt.key":
    "Введите ваш лицензионный ключ KRL Extension (Dodo Payments)",
  "license.placeholder.key":
    "Например: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx (Лицензионный ключ Dodo)",
  "license.progress.activating": "Активация лицензии в Dodo Payments...",
  "license.notify.leadActivated":
    "🚀 Промышленная лицензия Teknorob Lead Pro успешно активирована!",
  "license.notify.activated":
    "🎉 Лицензия Dodo Payments успешно активирована! Все премиум-функции разблокированы. Офлайн-период: 30 дней.",
  "license.notify.uriActivated":
    "💎 Pro-лицензия KUKA KRL активирована в 1 клик по ссылке! Все функции разблокированы.",
  "license.error.activate": "Ошибка активации Dodo Payments: {0}",
  "license.error.network": "Сетевая ошибка при активации: {0}",
  "license.info.noKey": "Активная лицензия не найдена.",
  "license.confirm.deactivate":
    "Вы уверены, что хотите деактивировать лицензию на этом устройстве?",
  "license.btn.yes": "Да",
  "license.btn.no": "Нет",
  "license.progress.deactivating": "Деактивация устройства в Dodo Payments...",
  "license.notify.deactivated":
    "Устройство успешно деактивировано в Dodo Payments.",
  "license.info.freeEdition":
    "Используется бесплатная базовая версия (Community Edition).",
  "license.info.activePro":
    "Лицензия Dodo Payments активна (PRO). Подписка: {0}. Оффлайн-буфер: {1} дн.",
  "license.warning.expired":
    "Лицензия неактивна или истёк офлайн-период. Подключитесь к интернету для ре-валидации.",
  "license.warning.offlineExpiring":
    "⚠️ Офлайн-период лицензии истекает через {0} дн. Подключитесь к интернету для ре-валидации.",
  "license.warning.offlineExpired":
    "🔒 Офлайн-период лицензии истёк (30 дней). Подключитесь к интернету для ре-валидации.",
  "license.error.revoked":
    "🔒 Ваша лицензия KRL Extension была деактивирована или отозвана на сервере.",

  "chat.title": "💬 Прямой чат с инженером-разработчиком",
  "chat.session": "Сессия",
  "chat.session.tooltip": "Переключиться на любую предыдущую сессию переписки",
  "chat.btn.new": "➕ Новый чат",
  "chat.btn.new.tooltip": "Создать чистый диалог с новым номером сессии",
  "chat.btn.file": "📎 Файл / Скриншот",
  "chat.btn.file.tooltip":
    "Отправить любой файл или скриншот с ПК разработчику",
  "chat.btn.logs": "📊 Логи",
  "chat.btn.logs.tooltip": "Снять и отправить логи расширения",
  "chat.btn.delete": "🗑️ Удалить сессию",
  "chat.btn.delete.tooltip": "Удалить выбранную сессию из памяти",
  "chat.input.placeholder":
    "Задайте вопрос разработчику или опишите проблему...",
  "chat.btn.send": "Отправить ➔",
  "chat.btn.reply": "💬 Ответить",
  "chat.confirm.deleteSession":
    "Вы уверены, что хотите удалить историю сессии #{0}?",
  "chat.confirm.deleteAllSessions":
    "Вы уверены, что хотите удалить ВСЮ историю всех сессий чата?",
  "chat.notify.newSession": "✨ Создана новая сессия чата #{0}",
  "chat.notify.sessionDeleted": "Сессия чата #{0} удалена.",
  "chat.notify.allSessionsDeleted": "Вся история сессий чата успешно удалена.",
  "chat.notify.logsSent": "📊 Логи и отчёт диагностики отправлены разработчику",
  "chat.notify.filePickLabel": "Отправить файл / скриншот разработчику",
  "chat.notify.fileSent":
    '{0} "{1}" успешно отправлен разработчику!',
  "chat.notify.fileNotFound": "Файл не найден: {0}",
  "chat.notify.devNotConnected":
    "⚠️ Чат-сервер инициализируется. Повторите отправку через 5 секунд.",
  "chat.notify.devMessage": '📬 Сообщение от разработчика: "{0}"',
  "chat.empty.title": "Прямая связь с Сильвестром Лискиным",
  "chat.empty.desc":
    "Задайте вопрос по KRL коду, отправьте логи или прикрепите файлы проекта. Ответ прилетит прямо сюда!",
  "chat.session.label": "Сессия #{0} ({1} сообщ. | {2})",
  "chat.msg.count": "{0} сообщ.",
  "chat.sender.user": "Вы (Инженер)",
  "chat.sender.dev": "👨‍💻 Сильвестр Лискин (Разработчик)",
  "chat.status.delivered": "✓ Доставлено инженеру",
  "chat.topic.label": "Тема обращения:",
  "chat.topic.placeholder":
    "Введите тему (напр. Настройка EKI, ошибка $VEL.CP)...",
  "chat.topic.chip.bug": "🚨 Баг / Ошибка",
  "chat.topic.chip.eki": "⚙️ EthernetKRL (EKI)",
  "chat.topic.chip.motion": "⚡ Траектория и Движение",
  "chat.topic.chip.safety": "🛡️ Безопасность и Логика",
  "chat.topic.chip.license": "💼 Лицензия и PRO",
  "chat.prompt.sessionTitle":
    "Введите тему обращения для новой сессии (например: Настройка EKI, Ошибка $VEL.CP, Юстировка):",
  "chat.prompt.sessionTitlePlaceholder": "Тема обращения (необязательно)",
  "chat.prompt.renameTopic": "Изменить тему для сессии #{0}:",
  "chat.notify.newSessionWithTopic": "✨ Создана новая сессия #{0} [Тема: {1}]",
  "chat.notify.topicUpdated": "Тема сессии #{0} обновлена: {1}",
  "chat.btn.renameTopic": "✏️ Тема",
  "chat.btn.renameTopic.tooltip": "Изменить или указать тему текущей сессии",
  "chat.consent.remoteAction":
    "🔒 Запрос разработчика: Сильвестр Лискин запрашивает '{0}'. Разрешить отправку данных из вашей среды?",
  "chat.consent.actionLogs": "Экспорт диагностических логов",
  "chat.consent.actionProject": "Экспорт файлов проекта KRL",
  "chat.consent.actionSysinfo": "Системная информация ПК и окружения",

  "backup.picker.title": "Выберите KRC Бэкап (.zip)",
  "backup.error.notFound":
    '❌ Файл "{0}" не найден в выбранном архиве KRC Бэкапа.',
  "backup.notify.identical":
    "✅ Сравнение KRC Бэкапа: координаты {0} на 100% совпадают с бэкапом!",
  "backup.warning.differences":
    "⚠️ Обнаружены расхождения координат в {0}! Подробности в канале вывода 'KRC Backup Point Diff'.",

  "flow.title": "Блок-схема KRL: {0}",
  "flow.notify.saved": "Блок-схема успешно сохранена!",
  "flow.error.noDef": "Не удалось найти определение для {0}",
  "flow.error.analyze": "Ошибка анализа структуры KRL: {0}",

  "eki.error.readFailed": "Ошибка чтения файла EKI XML: {0}",

  "chat.warning.noWorkspace": "Нет открытой рабочей папки в VS Code",
  "chat.warning.noKrlFiles": "Файлы KRL (.src, .dat) не найдены",
  "chat.warning.noEditorOpen": "Откройте KRL файл для AI диагностики",
  "chat.error.exportFailed": "Ошибка выгрузки проекта: {0}",
  "chat.error.aiDiagFailed": "Ошибка AI диагностики: {0}",
  "chat.error.logCaptureFailed": "Ошибка захвата логов: {0}",

  "io.view.empty": "Сигналы KRL не найдены в рабочей области",
  "io.line": "Строка {0}",
  "io.uses": "{0} исп.",
  "io.signals": "{0} сигналов",
  "io.rename.prompt": "Введите имя (алиас) для {0}",
  "io.rename.placeholder": "например: Vacuum_OK, Gripper_Closed",
  "io.rename.invalid":
    "Недопустимый идентификатор KRL (должен начинаться с буквы/_ и содержать только буквы/цифры/_)",
  "io.rename.noConfig":
    "Файл '$config.dat' не найден в рабочей области. Невозможно сохранить алиас.",
  "io.rename.pickConfig": "Выберите $config.dat для сохранения алиаса",
  "io.rename.updated": "Сигнал обновлен: {0}[{1}] -> {2}",
  "io.rename.failed": "Не удалось обновить $config.dat: {0}",

  "report.title": "# Отчёт анализа проекта KRL\n\n",
  "report.date": "**Дата:** {0}\n",
  "report.totalFiles": "**Всего файлов KRL:** {0}\n",
  "report.totalIssues": "**Всего замечаний:** {0}\n\n",
  "report.summary": "## Сводка\n",
  "report.errors": "- 🔴 **Ошибки:** {0}\n",
  "report.warnings": "- 🟡 **Предупреждения:** {0}\n",
  "report.info": "- 🔵 **Информация:** {0}\n",
  "report.hints": "- ⚪ **Подсказки:** {0}\n\n",
  "report.details": "## Детальный список замечаний\n",
  "report.noIssues": "_Замечаний в рабочей области не обнаружено._\n",
  "report.line": "- {0} **Строка {1}:** {2}\n",

  "cleanup.notify.allUsed":
    "✅ Все переменные используются! Неиспользуемых объявлений не найдено.",
  "cleanup.picker.foldDetail": "Блок ;FOLD будет очищен полностью",
  "cleanup.picker.varDetail": "Неиспользуемая переменная",
  "cleanup.picker.selectPlaceholder":
    "Найдено неиспользуемых строк: {0}. Выберите строки для очистки:",
  "cleanup.action.deleteLabel": "$(trash) Удалить",
  "cleanup.action.deleteDesc":
    "Полностью удалить неиспользуемые переменные и FOLD блоки",
  "cleanup.action.commentLabel": "$(comment) Закомментировать",
  "cleanup.action.commentDesc":
    "Безопасный режим: закомментировать (; DECL ...)",
  "cleanup.action.placeholder": "Выберите действие по очистке:",
  "cleanup.notify.success": "Успешно {0} строк: {1}.",
  "cleanup.word.deleted": "удалено",
  "cleanup.word.commented": "закомментировано",

  // Modern KRL & iiQKA Fold Tools
  "command.convertToIiqkaFold": "Конвертировать в iiQKA Motion Fold",
  "command.convertToIiqkaFold.tooltip":
    "Преобразовать команду движения в стандартный FOLD формата iiQKA / KSS",
  "command.convertLegacyToSpline": "Конвертировать в сплайны (KSS 8.6+ / 8.7)",
  "command.convertLegacyToSpline.tooltip":
    "Обновить PTP/LIN/CIRC в современные SPTP/SLIN/SCIRC со сглаживанием",
  "command.unwrapFold": "Развернуть / Очистить FOLD-оболочки",
  "command.unwrapFold.tooltip":
    "Удалить границы ;FOLD и ;ENDFOLD с сохранением исходного кода",
  "command.insertCollisionGuard": "Вставить защиту от коллизий (CollisionGuard)",
  "command.insertCollisionGuard.tooltip":
    "Обернуть движение в триггеры контроля момента $COLL_MON",
  "command.insertSplineBlock": "Обернуть в сплайн-блок (SPLINE Block)",
  "command.insertSplineBlock.tooltip":
    "Создать непрерывный блок сплайн-траектории SPLINE ... ENDSPLINE",
  "fold.notify.noSelection":
    "Пожалуйста, сначала выделите блок движения или логики KRL.",
  "fold.notify.iiqkaSuccess": "Успешно конвертировано в формат iiQKA Fold.",
  "fold.notify.noLegacyMotions": "Устаревшие команды движения не найдены.",
  "fold.notify.splineSuccess":
    "Успешно обновлено {0} команд в формат Spline.",
  "fold.notify.noFoldsFound":
    "FOLD-оболочки в выделенном фрагменте не найдены.",
  "fold.notify.unwrapped": "Успешно развёрнуто {0} FOLD-оболочек.",
  "fold.notify.collisionGuard": "Вставлена защитная оболочка CollisionGuard.",
  "fold.prompt.splineVel":
    "Введите скорость сплайна в декартовых координатах ($VEL.CP в м/с)",
  "fold.notify.splineBlockCreated": "Создан современный блок SPLINE движения.",
};

// Turkish
const tr: Messages = {
  "info.checkingAllFiles": "KRL: Tüm dosyalar kontrol ediliyor...",
  "info.documentFormatted": "KRL: Belge biçimlendirildi.",
  "info.trailingWhitespaceRemoved":
    "KRL: {0} satırdan sondaki boşluklar kaldırıldı.",
  "info.noTrailingWhitespace": "KRL: Sondaki boşluk bulunamadı.",
  "info.declarationsSorted": "KRL: {0} bildirim türe göre sıralandı.",
  "info.noDeclarationsToSort": "KRL: Sıralanacak bildirim bulunamadı.",

  "warning.noActiveKrlFile": "Aktif bir KRL dosyası yok.",
  "warning.invalidGlobalUsage": "Geçersiz 'GLOBAL' değiştirici kullanımı.",

  "error.serverNotRunning": "KRL Sunucusu çalışmıyor.",

  "prompt.foldRegionName": "FOLD bölgesi için isim girin",
  "prompt.foldRegionPlaceholder": "örn: Başlatma, Hareket, Gripper",

  "info.noSystemVariablesFound":
    "Çalışma alanında sistem değişkeni bulunamadı.",
  "picker.systemVariables": "Sistem Değişkenleri",
  "picker.selectSystemVariable": "Aramak için bir sistem değişkeni seçin...",

  "command.openControlCenter": "Kontrol Merkezini Aç",
  "command.openControlCenter.tooltip":
    "KUKA KRL Profesyonel Kontrol Merkezini Aç",
  "command.calculator": "3D Frame Hesaplayıcı",
  "command.calculator.tooltip": "KUKA Base/Tool Koordinat Hesaplayıcı",
  "command.cleanup": "Kullanılmayan Değişkenleri Temizle",
  "command.cleanup.tooltip":
    "Kullanılmayan değişkenleri ve ölü kodları temizle",
  "command.formatDocument": "Belgeyi Biçimlendir",
  "command.formatDocument.tooltip": "Mevcut KRL dosyasını biçimlendir",
  "command.sortDeclarations": "Bildirimleri Sırala",
  "command.sortDeclarations.tooltip": "Bildirimleri türlerine göre sırala",
  "command.foldAll": "Tümünü Katla",
  "command.foldAll.tooltip": "Tüm ;FOLD bölgelerini katla",
  "command.unfoldAll": "Tümünü Aç",
  "command.unfoldAll.tooltip": "Tüm ;FOLD bölgelerini aç",
  "command.refreshIOView": "I/O Listesini Yenile",
  "command.refreshIOView.tooltip": "I/O Sinyal Listesini Yenile",
  "command.showFlowchart": "Etkileşimli Akış Şeması",
  "command.showFlowchart.tooltip":
    "KRL akış şemasını ve mantık dallarını görselleştir",
  "command.compareKrcBackup": "KRC Yedek Karşılaştırma & Nokta Farkı",
  "command.compareKrcBackup.tooltip":
    "Kod ve E6POS nokta koordinatlarını KRC ZIP yedeği ile karşılaştır",
  "command.openSnippetGenerator": "Snippet & Hareket Oluşturucu",
  "command.openSnippetGenerator.tooltip":
    "Etkileşimli Yörünge Diyagramları & Snippet Oluşturucu",
  "command.aiCheckSafety": "Güvenlik & Hız Kontrolü",
  "command.aiCheckSafety.tooltip":
    "Katı endüstriyel güvenlik kontrollerini çalıştır ($VEL.CP, başlatılmamış tool/base)",
  "command.validateEkiXml": "EthernetKRL (EKI) Doğrulayıcı",
  "command.validateEkiXml.tooltip": "EKI XML şema dosyalarını doğrula",
  "command.generateEkiCode": "EKI İşleyici Rutini Oluştur",
  "command.generateEkiCode.tooltip":
    "EthernetKRL için KRL iletişim alt programı oluştur",
  "command.cleanGitMetadata": "WorkVisual Git Üst Bilgilerini Temizle",
  "command.cleanGitMetadata.tooltip":
    "Git farklarını temiz tutmak için &ACCESS, &REL, &PARAM başlıklarını kaldır",
  "command.generateReport": "Kalite Kabul Raporu Oluştur",
  "command.generateReport.tooltip":
    "Yapılandırılmış kod kalite kabul raporu oluştur",
  "command.findReferences": "Tüm Referansları Bul",
  "command.findReferences.tooltip":
    "Çalışma alanındaki seçili değişken, sinyal veya alt programa yapılan tüm referansları ara",
  "command.sendLogsToDeveloper": "Teşhis Günlüklerini Geliştiriciye Gönder",
  "command.sendLogsToDeveloper.tooltip":
    "Uzantı günlüğünü ve sistem bilgilerini paketleyip baş mühendise gönder",
  "command.sendFileToDeveloper": "Dosyayı / KRL Kodunu Geliştiriciye Gönder",
  "command.sendFileToDeveloper.tooltip":
    "Bilgisayardaki herhangi bir dosyayı seçip geliştiriciye gönder",
  "command.openCustomerPortal": "Müşteri Portalı ve Faturalar",
  "command.openCustomerPortal.tooltip":
    "Dodo Payments Müşteri Faturalandırma ve Fatura Portalını Aç",
  "command.openTelegramChat": "Doğrudan Mühendislik Desteği",
  "command.openTelegramChat.tooltip":
    "VS Code içinden baş mühendis ile canlı destek ve danışma",

  "cc.engTools": "Mühendislik Pro Araçları",
  "cc.safetyDiag": "Güvenlik Teşhisi & Kalite",
  "cc.accountHub": "Pro Mühendis Hesap Merkezi",
  "cc.tab.profile": "Profil & Anahtar",
  "cc.tab.devices": "Cihaz Yöneticisi",
  "cc.tab.billing": "Abonelik & Faturalandırma",
  "cc.tab.support": "Destek & Geri Bildirim",
  "cc.btn.openFlowchart": "Akış Şemasını Aç",
  "cc.btn.inspectBackup": "Yedeği İncele",
  "cc.btn.generateSnippets": "Snippet Oluştur",
  "cc.btn.openCalculator": "Hesaplayıcıyı Aç",
  "cc.btn.ekiValidator": "EKI Doğrulayıcı",
  "cc.btn.generateHandler": "İşleyici Oluştur",
  "cc.btn.cleanGitMetadata": "Git Üst Bilgilerini Temizle",
  "cc.btn.runSafetyCheck": "Güvenlik Kontrolünü Çalıştır",
  "cc.btn.generateReport": "Rapor Oluştur",

  "flow.err.unreachable": "Ulaşılamayan Kod",
  "flow.err.infiniteLoop": "Sonsuz Döngü",
  "flow.err.emptyBranch": "Boş Dal",
  "flow.err.invalidGoto": "Geçersiz GOTO",
  "flow.err.uninitMotion": "Başlatılmamış Hareket",
  "flow.msg.emptyBranch": "{0}. satırdaki IF koşulunun boş bir dalı var.",
  "flow.msg.infiniteLoop":
    "{0}. satırdaki LOOP döngüsünde EXIT/HALT komutları yok.",
  "flow.msg.unreachableMotion":
    "{0}. satırdaki hareket komutuna akış kesintisi nedeniyle ulaşılamıyor.",
  "flow.msg.unreachableCode":
    "{0}. satırdaki koda akış kesintisi (RETURN/EXIT/HALT) nedeniyle ulaşılamıyor.",
  "flow.msg.uninitMotion":
    "{0}. satırdaki hareket, TOOL/BASE başlatılması olmadan çağrıldı (BAS(#INITMOV) gerekir).",
  "flow.msg.invalidGoto":
    "{1}. satırdaki GOTO hedef etiketi '{0}' dosyada tanımlanmamış.",
  "flow.ui.zoomOut": "Uzaklaştır",
  "flow.ui.zoomReset": "Ekrana Sığdır",
  "flow.ui.zoomIn": "Yakınlaştır",
  "flow.ui.downloadSvg": "İndir",
  "flow.ui.downloadTitle": "SVG formatında indir",
  "flow.ui.toggleDetailed": "Detaylı Görünümü Değiştir",
  "flow.ui.detailedOn": "🔍 Detaylı: AÇIK",
  "flow.ui.detailedOff": "🔍 Detaylı: KAPALI",
  "flow.ui.mainProgram": "🏠 Ana Program",
  "flow.ui.logicErrors": "Mantık Hataları",
  "flow.ui.noErrors": "✅ Mantık hatası tespit edilmedi",
  "flow.ui.line": "Satır {0}",

  "safety.notify.safe":
    "🛡️ Endüstriyel Güvenlik Kontrolü: KOD KRC İÇİN GÜVENLİ! (Maksimum Hız Sınırı: {0} m/s)",
  "safety.error.violations": "🚨 Güvenlik İhlalleri Bulundu:",
  "safety.alert.critical":
    "🚨 KRC Güvenlik ve Mantık Uyarısı: Etkin dosyada {0} kritik hata ve {1} risk bulundu!",
  "safety.alert.warning":
    "⚠️ KRC Güvenlik ve Mantık Uyarısı: Etkin dosyada {0} mantık riski bulundu. VS Code Sorunlar panelini kontrol edin.",

  "eki.notify.valid":
    "✅ EKI XML Yapılandırması ({0}): Geçerli EthernetKRL Şeması!",
  "eki.error.title": "❌ EKI XML Yapılandırma Hataları:",
  "eki.prompt.channelName": "EthernetKRL (EKI) Kanal Adını Girin",
  "eki.picker.selectXml": "EthernetKRL Yapılandırma XML dosyasını seçin",
  "eki.warning.notXml":
    "Etkin dosya bir EKI XML yapılandırması değil. Lütfen bir EKI XML dosyası seçin veya KRL İşleyicisi oluşturun.",
  "eki.btn.generate": "➕ EKI KRL İşleyicisi Oluştur",
  "eki.btn.select": "📂 XML Dosyası Seç...",

  "snippet.title": "KRL Snippet Oluşturucu",
  "snippet.tab.message": "Mesaj Oluşturucu",
  "snippet.tab.grid": "Izgara Deseni",
  "snippet.tab.motion": "Hareket (PTP/LIN)",
  "snippet.msg.title": "KUKA Kullanıcı Mesajı",
  "snippet.msg.desc": "KUKA Kullanıcı Mesajları (KrlMsg) için kod üretir.",
  "snippet.msg.type": "Tip",
  "snippet.msg.type.notify": "Bildirim (Notify)",
  "snippet.msg.type.quit": "Onay (Quit)",
  "snippet.msg.type.state": "Durum (State)",
  "snippet.msg.type.wait": "Bekleme (Wait)",
  "snippet.msg.key": "Anahtar (Benzersiz ID)",
  "snippet.msg.key.placeholder": "örn. MyMsg1",
  "snippet.msg.text": "Mesaj Metni (%1, %2 kullanabilirsiniz)",
  "snippet.msg.text.placeholder": "örn. Değer: %1",
  "snippet.msg.param1": "Parametre 1 (İsteğe Bağlı)",
  "snippet.msg.param1.placeholder": "örn. nCount",
  "snippet.insert": "Snippet Ekle",
  "snippet.grid.title": "Paletleme Izgarası",
  "snippet.grid.desc": "Izgara deseni için iç içe döngüler oluşturur.",
  "snippet.grid.base": "Temel Nokta Adı",
  "snippet.grid.rows": "Satırlar (X)",
  "snippet.grid.cols": "Sütunlar (Y)",
  "snippet.grid.spaceX": "Boşluk X (mm)",
  "snippet.grid.spaceY": "Boşluk Y (mm)",
  "snippet.mot.title": "Hareket Komutu",
  "snippet.mot.desc": "Standart PTP veya LIN hareket blokları oluşturur.",
  "snippet.mot.type": "Hareket Tipi",
  "snippet.mot.point": "Nokta Adı",
  "snippet.mot.vel": "Hız (m/s veya %)",
  "snippet.mot.approx": "Yaklaşım (Approximation)",
  "snippet.mot.approx.none": "Yok",
  "snippet.alert.inserted": "Snippet eklendi!",
  "snippet.alert.noEditor": "Aktif bir KRL düzenleyici bulunamadı!",
  "snippet.desc.ptp":
    "<b>PTP (Noktadan Noktaya):</b> En hızlı eksen yörüngesi boyunca hareket. A1-A6 eksenleri %{0} hızında aynı anda tamamlanacak şekilde senkronize olur.",
  "snippet.desc.lin":
    "<b>LIN (Doğrusal):</b> Robot flanşı (TCP), uzayda sabit hızla ({0} m/s) düz bir çizgi boyunca hareket eder. Kaynak ve borulama için idealdir.",
  "snippet.desc.circ":
    "<b>CIRC (Dairesel):</b> TCP, <b>X{0}</b> yardımcı noktası üzerinden hedef <b>X{1}</b> noktasına {2} m/s hızla dairesel yay boyunca hareket eder.",
  "snippet.desc.sptp":
    "<b>SPTP (Spline PTP - KSS 8.3+):</b> Sarsıntı sınırlamalı ($SGEAR_JERK) spline PTP hareketi. Titreşimsiz maksimum pürüzsüz eksen ivmelenmesi sağlar.",
  "snippet.desc.slin":
    "<b>SLIN (Spline Doğrusal - KSS 8.3+):</b> Yüksek hassasiyetli yönelim profilleme ve <b>C_Spl</b> yumuşatması ile spline doğrusal hareket.",
  "snippet.desc.scirc":
    "<b>SCIRC (Spline Dairesel - KSS 8.3+):</b> Sürekli yönelim korunarak <b>X{0}</b> üzerinden <b>X{1}</b> noktasına spline dairesel yay.",
  "snippet.desc.splineBlock":
    "<b>SPLINE Yol Bloğu:</b> Sürekli yörünge bloğu (SLIN/SPL/SCIRC). Robot, düğüm noktalarında durmadan tek bir hız profili hesaplar.",

  "cc.prompt.telegram": "Baş Mühendise Mesaj Gönder",
  "cc.prompt.telegram.placeholder":
    "Mesajınızı veya teknik sorunuzu yazın...",
  "cc.notify.telegramSent":
    "Mesaj baş mühendise gönderildi!",
  "cc.notify.telegramFallback":
    "Mesaj gönderilemedi. Lütfen tekrar deneyin.",

  "cc.billing.title": "Dodo Payments Fatura & Abonelik Portalı",
  "cc.billing.desc":
    "Makbuzları, satın almaları ve resmi KDV faturalarını korumalı Dodo Payments müşteri portalı üzerinden yönetin.",
  "cc.billing.btn.portal": "🔗 Dodo Payments Müşteri Portalını Aç",
  "cc.billing.btn.invoice": "📥 Faturaları ve Makbuzları İndir (PDF)",
  "cc.billing.plansTitle":
    "🛒 Kullanılabilir Fiyatlandırma ve Satın Alma Seçenekleri (Dodo Payments)",
  "cc.billing.btn.buyPlan": "{0} Satın Al",
  "cc.billing.legalNotice": "📌 Kurumsal ve Muhasebe Bilgileri:",
  "cc.billing.legalItem1":
    "Dodo Payments, Liskin Labs yazılımları için resmi Kayıtlı Satıcı (Merchant of Record) olarak hareket eder.",
  "cc.billing.legalItem2":
    "Ödeme makbuzları ve KDV faturaları satın alma sonrasında kayıtlı e-postanıza otomatik olarak gönderilir.",
  "cc.billing.legalItem3":
    "Fatura bilgilerini güncellemek veya işlem geçmişini indirmek için Müşteri Portalını kullanın.",

  "cc.support.desc":
    "Saha çalışmasında sorularınız, özellik istekleriniz veya teknik sorunlarınız mı var? Baş Mühendis Silvestr Liskin ile doğrudan iletişime geçin.",
  "cc.support.btn.chat": "💬 Mühendis ile Canlı Sohbet",
  "cc.support.btn.sendLogs": "📊 Teşhis Günlüklerini Gönder",
  "cc.support.btn.sendFile": "📎 Dosyayı Mühendise Gönder",
  "cc.support.btn.github": "🐛 GitHub'da Sorun Bildir",
  "cc.support.btn.email": "✉️ Doğrudan E-posta Desteği",

  "cc.profile.deactivate":
    "🔴 Oturumu Kapat / Lisans Anahtarını Devre Dışı Bırak",
  "cc.profile.checkStatus": "🔄 Çevrimiçi Durumu Doğrula",
  "cc.profile.activateKey": "🔑 Lisans Anahtarı Gir",
  "cc.profile.buyPro": "🛒 Pro Lisans Satın Al",
  "cc.devices.deactivatePc": "🔓 Mevcut Bilgisayarı Devre Dışı Bırak",
  "cc.devices.syncStatus": "🔄 Cihaz Durumunu Senkronize Et",

  "cc.notify.portalOpened":
    "🔗 Resmi Dodo Payments Müşteri Portalı açıldı (abonelik ve fatura yönetimi).",
  "cc.notify.storeOpened":
    "🛒 Resmi KUKA KRL Professional Lisans Mağazası açıldı (Dodo Payments).",
  "cc.notify.keyCopied": "📋 Lisans anahtarı panoya kopyalandı!",
  "cc.notify.emailClientOpened":
    "✉️ E-posta istemcisi silvestr.liskin@teknorob.com adresine mesajınızla açıldı!",
  "cc.prompt.email": "Baş Mühendis Silvestr Liskin'e doğrudan mesaj gönderin",
  "cc.prompt.emailPlaceholder":
    "Sorunuzu, özellik isteğinizi veya KRL sorununuzu açıklayın...",

  "license.warning.premiumOnly":
    "Bu özellik yalnızca Premium Sürümde mevcuttur. Lütfen lisans anahtarınızı etkinleştirin.",
  "license.btn.buy": "Lisans Satın Al",
  "license.btn.enterKey": "Anahtar Gir",
  "license.prompt.key":
    "KRL Extension Lisans Anahtarınızı Girin (Dodo Payments)",
  "license.placeholder.key":
    "Örn: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx (Dodo Lisans Anahtarı)",
  "license.progress.activating": "Dodo Payments'de lisans etkinleştiriliyor...",
  "license.notify.leadActivated":
    "🚀 Teknorob Lead Pro Endüstriyel Lisansı başarıyla etkinleştirildi!",
  "license.notify.activated":
    "🎉 Dodo Payments lisansı etkinleştirildi! Tüm Pro özelliklerin kilidi açıldı. 30 günlük çevrimdışı arabelleği.",
  "license.notify.uriActivated":
    "💎 KUKA KRL Pro lisansı tek tıkla bağlantı üzerinden etkinleştirildi! Tüm özelliklerin kilidi açıldı.",
  "license.error.activate": "Dodo Payments Etkinleştirme Hatası: {0}",
  "license.error.network": "Ağ etkinleştirme hatası: {0}",
  "license.info.noKey": "Aktif bir lisans anahtarı bulunamadı.",
  "license.confirm.deactivate":
    "Bu cihazdaki lisansı devre dışı bırakmak istediğinizden emin misiniz?",
  "license.btn.yes": "Evet",
  "license.btn.no": "Hayır",
  "license.progress.deactivating":
    "Cihaz Dodo Payments'de devre dışı bırakılıyor...",
  "license.notify.deactivated":
    "Cihaz Dodo Payments'de başarıyla devre dışı bırakıldı.",
  "license.info.freeEdition": "Ücretsiz Community Edition kullanılıyor.",
  "license.info.activePro":
    "Dodo Payments Lisansı Aktif (PRO). Abonelik: {0}. Çevrimdışı arabelleği: {1} gün.",
  "license.warning.expired":
    "Lisans pasif veya çevrimdışı arabelleği doldu. Yeniden doğrulama için internete bağlanın.",
  "license.warning.offlineExpiring":
    "⚠️ Çevrimdışı lisans süresi {0} gün içinde sona eriyor. Yeniden doğrulamak için lütfen internete bağlanın.",
  "license.warning.offlineExpired":
    "🔒 Çevrimdışı lisans süresi doldu (30 gün). Yeniden doğrulamak için lütfen internete bağlanın.",
  "license.error.revoked":
    "🔒 KRL Uzantısı lisansınız sunucuda devre dışı bırakıldı veya iptal edildi.",

  "chat.title": "💬 Doğrudan Mühendislik Desteği",
  "chat.session": "Oturum",
  "chat.session.tooltip": "Geçmiş sohbet oturumlarına geçiş yapın",
  "chat.btn.new": "➕ Yeni Sohbet",
  "chat.btn.new.tooltip": "Yeni oturum kimliği ile temiz bir konuşma başlatın",
  "chat.btn.file": "📎 Dosya / Ekran Görüntüsü",
  "chat.btn.file.tooltip":
    "Bilgisayardan geliştiriciye dosya veya ekran görüntüsü gönderin",
  "chat.btn.logs": "📊 Günlükler",
  "chat.btn.logs.tooltip": "Uzantı günlüklerini alıp gönderin",
  "chat.btn.delete": "🗑️ Oturumu Sil",
  "chat.btn.delete.tooltip": "Mevcut oturum geçmişini silin",
  "chat.input.placeholder":
    "Geliştiriciye bir soru sorun veya sorun bildirin...",
  "chat.btn.send": "Gönder ➔",
  "chat.btn.reply": "💬 Yanıtla",
  "chat.confirm.deleteSession":
    "#{0} oturum geçmişini silmek istediğinizden emin misiniz?",
  "chat.confirm.deleteAllSessions":
    "Tüm sohbet oturumu geçmişini silmek istediğinizden emin misiniz?",
  "chat.notify.newSession": "✨ Yeni sohbet oturumu #{0} oluşturuldu",
  "chat.notify.sessionDeleted": "Sohbet oturumu #{0} silindi.",
  "chat.notify.allSessionsDeleted":
    "Tüm sohbet oturumu geçmişi başarıyla silindi.",
  "chat.notify.logsSent":
    "📊 Günlükler ve teşhis raporu geliştiriciye gönderildi",
  "chat.notify.filePickLabel": "Geliştiriciye dosya / ekran görüntüsü gönder",
  "chat.notify.fileSent":
    '{0} "{1}" geliştiriciye başarıyla gönderildi!',
  "chat.notify.fileNotFound": "Dosya bulunamadı: {0}",
  "chat.notify.devNotConnected":
    "⚠️ Sohbet sunucusu başlatılıyor. Lütfen 5 saniye sonra tekrar deneyin.",
  "chat.notify.devMessage": '📬 Baş Mühendisten Mesaj: "{0}"',
  "chat.empty.title": "Silvestr Liskin ile Doğrudan Bağlantı",
  "chat.empty.desc":
    "Herhangi bir KRL sorusu sorun, teşhis günlüklerini gönderin veya proje dosyalarını ekleyin. Yanıtlar tam buraya gelecek!",
  "chat.session.label": "Oturum #{0} ({1} mesaj | {2})",
  "chat.msg.count": "{0} mesaj",
  "chat.sender.user": "Siz (Mühendis)",
  "chat.sender.dev": "👨‍💻 Silvestr Liskin (Baş Geliştirici)",
  "chat.status.delivered": "✓ Mühendise İletildi",
  "chat.topic.label": "Konu / Başlık:",
  "chat.topic.placeholder": "Konu girin (örn: EKI Kurulumu, $VEL.CP hatası)...",
  "chat.topic.chip.bug": "🚨 Hata / Problem",
  "chat.topic.chip.eki": "⚙️ EthernetKRL (EKI)",
  "chat.topic.chip.motion": "⚡ Hareket ve Yörünge",
  "chat.topic.chip.safety": "🛡️ Güvenlik ve Mantık",
  "chat.topic.chip.license": "💼 Lisans ve PRO",
  "chat.prompt.sessionTitle":
    "Yeni oturum için konu başlığı girin (örnek: EKI Kurulumu, $VEL.CP hatası):",
  "chat.prompt.sessionTitlePlaceholder": "Konu başlığı (isteğe bağlı)",
  "chat.prompt.renameTopic": "#{0} oturumu için konuyu yeniden adlandırın:",
  "chat.notify.newSessionWithTopic":
    "✨ Yeni sohbet oturumu #{0} oluşturuldu [Konu: {1}]",
  "chat.notify.topicUpdated": "#{0} oturumunun konusu güncellendi: {1}",
  "chat.btn.renameTopic": "✏️ Konu",
  "chat.btn.renameTopic.tooltip": "Geçerli oturumun konusunu düzenleyin",
  "chat.consent.remoteAction":
    "🔒 Geliştirici Talebi: Silvestr Liskin '{0}' talep ediyor. Çalışma alanınızdan bu verilerin gönderilmesine izin verilsin mi?",
  "chat.consent.actionLogs": "Teşhis Günlükleri Dışa Aktarma",
  "chat.consent.actionProject": "KRL Proje Çalışma Alanı Dışa Aktarma",
  "chat.consent.actionSysinfo": "Bilgisayar Sistem Bilgisi ve Teşhis",

  "backup.picker.title": "KRC Yedeğini Seçin (.zip)",
  "backup.error.notFound":
    '❌ Seçilen KRC Yedek arşivinde "{0}" dosyası bulunamadı.',
  "backup.notify.identical":
    "✅ KRC Yedek Karşılaştırma: {0} noktaları yedekle %100 aynı!",
  "backup.warning.differences":
    "{0} dosyasında nokta farkları tespit edildi! Ayrıntılar için 'KRC Backup Point Diff' çıktı kanalını kontrol edin.",

  "flow.title": "KRL Akış Şeması: {0}",
  "flow.notify.saved": "Akış şeması başarıyla kaydedildi!",
  "flow.error.noDef": "{0} için tanım bulunamadı",
  "flow.error.analyze": "KRL akışı analiz edilemedi: {0}",

  "eki.error.readFailed": "EKI XML okuma hatası: {0}",

  "chat.warning.noWorkspace": "VS Code'da açık bir çalışma alanı klasörü yok",
  "chat.warning.noKrlFiles": "KRL dosyaları (.src, .dat) bulunamadı",
  "chat.warning.noEditorOpen": "Yapay zeka teşhisi için bir KRL dosyası açın",
  "chat.error.exportFailed": "Proje dışa aktarma hatası: {0}",
  "chat.error.aiDiagFailed": "Yapay zeka teşhis hatası: {0}",
  "chat.error.logCaptureFailed": "Günlük yakalama hatası: {0}",

  "io.view.empty": "Çalışma alanında KRL sinyali bulunamadı",
  "io.line": "Satır {0}",
  "io.uses": "{0} kullanım",
  "io.signals": "{0} sinyal",
  "io.rename.prompt": "{0} için diğer ad (alias) girin",
  "io.rename.placeholder": "örnek: Vacuum_OK, Gripper_Closed",
  "io.rename.invalid":
    "Geçersiz KRL tanımlayıcısı (harf/_ ile başlamalı ve yalnızca harf/sayı/_ içermelidir)",
  "io.rename.noConfig":
    "Çalışma alanında '$config.dat' bulunamadı. Diğer ad kaydedilemiyor.",
  "io.rename.pickConfig": "Diğer adı kaydetmek için $config.dat seçin",
  "io.rename.updated": "Sinyal güncellendi: {0}[{1}] -> {2}",
  "io.rename.failed": "$config.dat güncellenemedi: {0}",

  "report.title": "# KRL Proje Analiz Raporu\n\n",
  "report.date": "**Tarih:** {0}\n",
  "report.totalFiles": "**Toplam KRL Dosyası:** {0}\n",
  "report.totalIssues": "**Toplam Sorun:** {0}\n\n",
  "report.summary": "## Özet\n",
  "report.errors": "- 🔴 **Hatalar:** {0}\n",
  "report.warnings": "- 🟡 **Uyarılar:** {0}\n",
  "report.info": "- 🔵 **Bilgi:** {0}\n",
  "report.hints": "- ⚪ **İpuçları:** {0}\n\n",
  "report.details": "## Ayrıntılı Sorunlar\n",
  "report.noIssues": "_Çalışma alanında herhangi bir sorun bulunamadı._\n",
  "report.line": "- {0} **Satır {1}:** {2}\n",

  "cleanup.notify.allUsed":
    "✅ Tüm değişkenler kullanımda! Kullanılmayan bildirim bulunamadı.",
  "cleanup.picker.foldDetail": ";FOLD bloğu tamamen temizlenecek",
  "cleanup.picker.varDetail": "Kullanılmayan değişken",
  "cleanup.picker.selectPlaceholder":
    "{0} kullanılmayan bildirim bulundu. Temizlenecek satırları seçin:",
  "cleanup.action.deleteLabel": "$(trash) Sil",
  "cleanup.action.deleteDesc":
    "Kullanılmayan değişkenleri ve FOLD bloklarını kalıcı olarak sil",
  "cleanup.action.commentLabel": "$(comment) Yorum Satırı Yap",
  "cleanup.action.commentDesc":
    "Güvenli mod: yorum satırına dönüştür (; DECL ...)",
  "cleanup.action.placeholder": "Temizleme işlemini seçin:",
  "cleanup.notify.success": "Başarıyla {0} satır {1}.",
  "cleanup.word.deleted": "silindi",
  "cleanup.word.commented": "açıklamaya alındı",

  // Modern KRL & iiQKA Fold Tools
  "command.convertToIiqkaFold": "Seçimi iiQKA Motion Fold'a Dönüştür",
  "command.convertToIiqkaFold.tooltip":
    "Hareket komutunu standart iiQKA / KSS inline fold yapısına dönüştür",
  "command.convertLegacyToSpline": "Eski Hareketleri Modern Spline'a Dönüştür",
  "command.convertLegacyToSpline.tooltip":
    "PTP/LIN/CIRC komutlarını SPTP/SLIN/SCIRC Spline formatına yükselt",
  "command.unwrapFold": "FOLD Kabuklarını Çöz / Kaldır",
  "command.unwrapFold.tooltip":
    "İç koddaki satırları koruyarak ;FOLD ve ;ENDFOLD sınırlarını kaldır",
  "command.insertCollisionGuard": "Çarpışma Koruması Ekle (CollisionGuard)",
  "command.insertCollisionGuard.tooltip":
    "Hareketi $COLL_MON tork izleme koruma tetikleyicileriyle sar",
  "command.insertSplineBlock": "Modern SPLINE Bloğu İçine Al",
  "command.insertSplineBlock.tooltip":
    "Sürekli SPLINE ... ENDSPLINE yörünge bloğu oluştur",
  "fold.notify.noSelection":
    "Lütfen önce bir KRL hareket veya mantık bloğu seçin.",
  "fold.notify.iiqkaSuccess": "Başarıyla iiQKA Fold formatına dönüştürüldü.",
  "fold.notify.noLegacyMotions": "Dönüştürülecek eski hareket komutu bulunamadı.",
  "fold.notify.splineSuccess":
    "Başarıyla {0} hareket komutu Spline'a yükseltildi.",
  "fold.notify.noFoldsFound": "Seçili aralıkta FOLD kabuğu bulunamadı.",
  "fold.notify.unwrapped": "Başarıyla {0} FOLD kabuğu kaldırıldı.",
  "fold.notify.collisionGuard": "CollisionGuard koruma zarfı eklendi.",
  "fold.prompt.splineVel": "Kartezyen Spline Hızını Girin ($VEL.CP m/s)",
  "fold.notify.splineBlockCreated": "Modern SPLINE hareket bloğu oluşturuldu.",
};

const locales: Record<Locale, Messages> = { en, ru, tr };

/**
 * Get current VS Code display language.
 */
function getCurrentLocale(): Locale {
  const vscodeLang = vscode.env.language;
  if (vscodeLang.startsWith("ru")) return "ru";
  if (vscodeLang.startsWith("tr")) return "tr";
  return "en";
}

/**
 * Get localized message by key.
 * Supports placeholders: {0}, {1}, etc.
 */
export function t(key: keyof Messages, ...args: (string | number)[]): string {
  const locale = getCurrentLocale();
  let message = locales[locale][key] || locales.en[key] || key;

  // Replace placeholders
  args.forEach((arg, index) => {
    message = message.replace(`{${index}}`, String(arg));
  });

  return message;
}

/**
 * Get all message keys for a specific locale.
 */
export function getMessages(locale: Locale = "en"): Messages {
  return locales[locale];
}
