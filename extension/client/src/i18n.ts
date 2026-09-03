/**
 * Internationalization (i18n) module for KRL Language Support extension.
 * Provides localized strings for the client-side (VS Code extension host).
 */

import * as vscode from "vscode";

// Supported locales
type Locale = "en" | "ru" | "tr" | "es";

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
  "command.insertFold": string;
  "command.insertFold.tooltip": string;
  "command.removeTrailingWhitespace": string;
  "command.removeTrailingWhitespace.tooltip": string;
  "command.renameSignal": string;
  "command.renameSignal.tooltip": string;
  "command.viewFileHistory": string;
  "command.viewFileHistory.tooltip": string;
  "command.showLineBlameDetails": string;
  "command.showLineBlameDetails.tooltip": string;
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
  "command.validateWorkspace": string;
  "command.validateWorkspace.tooltip": string;
  "command.exportBackupZip": string;
  "command.exportBackupZip.tooltip": string;
  "command.viewGitGraph": string;
  "command.viewGitGraph.tooltip": string;
  "command.sendQualityReport": string;
  "command.sendQualityReport.tooltip": string;
  "category.diagnosticsQuality": string;
  "category.projectBackups": string;
  "category.engineeringTools": string;
  "category.telepresenceSupport": string;
  "category.activeEditorTools": string;
  "cc.refSection.title": string;
  "cc.refSection.desc": string;
  "cc.engTools": string;
  "cc.backupGit": string;
  "cc.refactorTools": string;
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
  "cc.btn.viewGitGraph": string;
  "cc.btn.exportBackupZip": string;
  "cc.btn.cleanupVars": string;
  "cc.btn.sortDeclarations": string;
  "cc.btn.modernizeFold": string;
  "cc.btn.collisionGuard": string;
  "cc.btn.formatDoc": string;
  "cc.btn.openTelegramChat": string;
  "cc.desc.flowchart": string;
  "cc.desc.calculator": string;
  "cc.desc.snippets": string;
  "cc.desc.eki": string;
  "cc.desc.backupDiff": string;
  "cc.desc.gitGraph": string;
  "cc.desc.exportZip": string;
  "cc.desc.cleanGit": string;
  "cc.desc.deadCode": string;
  "cc.desc.sortDecl": string;
  "cc.desc.modernFold": string;
  "cc.desc.collisionGuard": string;
  "cc.desc.safety": string;
  "cc.desc.report": string;

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

  // Pricing Plans (Dynamic Multi-language)
  "plan.monthly.name": string;
  "plan.monthly.period": string;
  "plan.monthly.desc": string;
  "plan.annual.name": string;
  "plan.annual.period": string;
  "plan.annual.desc": string;
  "plan.lifetime.name": string;
  "plan.lifetime.period": string;
  "plan.lifetime.desc": string;

  // Control Center Labels
  "cc.title": string;
  "cc.edition": string;
  "cc.profile.accountEmail": string;
  "cc.profile.planTier": string;
  "cc.profile.licenseKey": string;
  "cc.profile.copyKey": string;
  "cc.profile.onlineExpiry": string;
  "cc.profile.offlineCache": string;
  "cc.profile.daysRemaining": string;
  "cc.profile.activePro": string;
  "cc.profile.community": string;
  "cc.profile.proEdition": string;
  "cc.profile.freeEdition": string;
  "cc.profile.subRenews": string;
  "cc.profile.subActive": string;
  "cc.profile.subLifetime": string;
  "cc.profile.subMonthlyActive": string;
  "cc.profile.subAnnualActive": string;
  "cc.profile.subNone": string;
  "cc.devices.title": string;
  "cc.devices.currentHost": string;
  "cc.devices.hwFingerprint": string;
  "cc.devices.slotUsage": string;
  "cc.devices.activeCount": string;
  "cc.devices.unlicensed": string;
  "cc.support.title": string;

  // Active Features & Diagnostics Control
  "cc.diagControl.title": string;
  "cc.diagControl.desc": string;
  "cc.diagControl.btnValidate": string;
  "cc.diagControl.btnReport": string;
  "cc.diagControl.subsystemsTitle": string;
  "cc.subsystem.lsp": string;
  "cc.subsystem.indexer": string;
  "cc.subsystem.engine": string;
  "cc.subsystem.flowchart": string;
  "cc.subsystem.backup": string;
  "cc.subsystem.eki": string;
  "cc.subsystem.telegram": string;
  "cc.subsystem.ci": string;
  "cc.badge.online": string;
  "cc.badge.active": string;
  "cc.badge.disabled": string;
  "cc.badge.ready": string;
  "cc.badge.connected": string;
  "cc.diagControl.togglesTitle": string;
  "cc.toggle.master.title": string;
  "cc.toggle.master.desc": string;
  "cc.toggle.waitTimeout.title": string;
  "cc.toggle.waitTimeout.desc": string;
  "cc.toggle.halt.title": string;
  "cc.toggle.halt.desc": string;
  "cc.toggle.syntax.title": string;
  "cc.toggle.syntax.desc": string;
  "cc.toggle.speeds.title": string;
  "cc.toggle.speeds.desc": string;
  "cc.toggle.toolBase.title": string;
  "cc.toggle.toolBase.desc": string;
  "cc.toggle.blockBalance.title": string;
  "cc.toggle.blockBalance.desc": string;
  "cc.toggle.deadCode.title": string;
  "cc.toggle.deadCode.desc": string;
  "cc.toggle.typeUsage.title": string;
  "cc.toggle.typeUsage.desc": string;
  "cc.toggle.krlConstraints.title": string;
  "cc.toggle.krlConstraints.desc": string;
  "cc.toggle.unusedVars.title": string;
  "cc.toggle.unusedVars.desc": string;
  "cc.toggle.duplicateNames.title": string;
  "cc.toggle.duplicateNames.desc": string;
  "cc.toggle.inlayHints.title": string;
  "cc.toggle.inlayHints.desc": string;
  "cc.toggle.errorLens.title": string;
  "cc.toggle.errorLens.desc": string;
  "cc.toggle.validateNonAscii.title": string;
  "cc.toggle.validateNonAscii.desc": string;

  // Telegram & Remote Telepresence
  "chat.apply.noEditor": string;
  "chat.apply.success": string;
  "chat.sendSelection.noSelection": string;
  "chat.sendSelection.prompt": string;
  "chat.sendSelection.success": string;
  "chat.remote.logRequest": string;
  "chat.remote.exportRequest": string;
  "chat.remote.sysInfoRequest": string;
  "chat.remote.aiDiagRequest": string;
  "chat.remote.reportRequest": string;
  "chat.remote.requestFrom": string;
  "chat.remote.actionPrompt": string;
  "chat.remote.logsExported": string;
  "chat.remote.noWorkspace": string;
  "chat.remote.fileNotFound": string;
  "chat.remote.fileSent": string;
  "chat.remote.fileReadError": string;
  "chat.remote.readFileAction": string;
  "chat.remote.noActiveFile": string;
  "chat.remote.sysInfoTitle": string;
  "chat.remote.diagTitle": string;
  "chat.remote.diagSummary": string;
  "chat.remote.diagNoIssues": string;

  // GitGraph Revision Graph & Timeline
  "gitgraph.title": string;
  "gitgraph.filter.all": string;
  "gitgraph.filter.dat": string;
  "gitgraph.filter.src": string;
  "gitgraph.empty": string;
  "gitgraph.badge.points": string;
  "gitgraph.badge.logic": string;
  "gitgraph.search.placeholder": string;
  "gitgraph.noGit.title": string;
  "gitgraph.noGit.desc": string;
  "gitgraph.noGit.btnInit": string;
  "gitgraph.noGit.btnBackup": string;
  "gitgraph.notify.initSuccess": string;
  "gitgraph.notify.initError": string;
  "gitgraph.btn.copyHash": string;
  "gitgraph.btn.snapshot": string;
  "gitgraph.prompt.snapshot": string;
  "gitgraph.notify.snapshotSuccess": string;
  "gitgraph.btn.fetch": string;
  "gitgraph.btn.pull": string;
  "gitgraph.btn.push": string;
  "gitgraph.details.title": string;
  "gitgraph.details.files": string;
  "gitgraph.details.diffParent": string;
  "gitgraph.details.diffWorkspace": string;
  "gitgraph.details.checkout": string;
  "gitgraph.details.branchHere": string;
  "gitgraph.branch": string;
  "gitgraph.remote": string;
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

  "command.insertFold": "Insert FOLD Region",
  "command.insertFold.tooltip": "Wrap selection in standard KRL FOLD ... ENDFOLD region",
  "command.removeTrailingWhitespace": "Remove Trailing Whitespace",
  "command.removeTrailingWhitespace.tooltip": "Strip all trailing whitespace and tabs across file",
  "command.renameSignal": "Rename Signal (Set Alias)",
  "command.renameSignal.tooltip": "Assign or change user alias for $IN/$OUT signal",
  "command.viewFileHistory": "View KRL File History & Compare Revisions",
  "command.viewFileHistory.tooltip": "Inspect Git timeline of current KRL program",
  "command.showLineBlameDetails": "Show KRL Line Git Blame Details",
  "command.showLineBlameDetails.tooltip": "View commit author, date and message for active line",
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
  "command.aiCheckSafety": "Industrial Safety Check",
  "command.aiCheckSafety.tooltip":
    "Run strict industrial safety checks (uninit tools/bases, deadlocks, non-ASCII)",
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

  "command.validateWorkspace": "Check All Files",
  "command.validateWorkspace.tooltip": "Perform full syntax, type safety and motion validation across workspace",
  "command.exportBackupZip": "Export Project ZIP Archive",
  "command.exportBackupZip.tooltip": "Archive entire open project into ZIP package",
  "command.viewGitGraph": "KRL Revision Graph & Point Timeline",
  "command.viewGitGraph.tooltip": "Visual timeline of KRL commits and .DAT touch-ups",
  "command.sendQualityReport": "Send Quality Passport to Telegram",
  "command.sendQualityReport.tooltip": "Generate and transmit workspace quality report to Telegram",
  "category.diagnosticsQuality": "Diagnostics & Quality",
  "category.projectBackups": "Project & Backup Tools",
  "category.engineeringTools": "Engineering Tools",
  "category.telepresenceSupport": "Telepresence & Support",
  "category.activeEditorTools": "Active KRL Editor Tools",
  "cc.refSection.title": "📖 In-Editor Features & Shortcuts Reference",
  "cc.refSection.desc": "Quick reference for contextual features that operate directly within an active .SRC / .DAT editor window",
  "cc.engTools": "Engineering & Motion Tools",
  "cc.backupGit": "KRC Backup & GitLens Version Control",
  "cc.refactorTools": "Refactoring & Modern KRL Suite",
  "cc.safetyDiag": "Safety Diagnostics & Quality Audit",
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
  "cc.btn.viewGitGraph": "Open Git Graph",
  "cc.btn.exportBackupZip": "Export ZIP Backup",
  "cc.btn.cleanupVars": "Clean Dead Code",
  "cc.btn.sortDeclarations": "Sort Declarations",
  "cc.btn.modernizeFold": "Upgrade to Spline",
  "cc.btn.collisionGuard": "Add CollisionGuard",
  "cc.btn.formatDoc": "Format KRL",
  "cc.btn.openTelegramChat": "Open Live Chat",
  "cc.desc.flowchart":
    "Interactive 2D control flow graph (CFG) visualizing program branches, decision nodes, and loops.",
  "cc.desc.calculator":
    "Mathematical 3D frame transformations, Euler angle conversions (A, B, C), and geometric calculations.",
  "cc.desc.snippets":
    "Motion trajectory blueprint generator with automated templates for PTP, LIN, CIRC, and Splines.",
  "cc.desc.eki":
    "EthernetKRL XML schema validator and automated KRL communication subprogram generator.",
  "cc.desc.backupDiff":
    "Inspect coordinate deltas and compare workspace E6POS/POS points against KRC ZIP archive backups.",
  "cc.desc.gitGraph":
    "Visual commit revision timeline with dedicated filters for .DAT point adjustments and .SRC logic.",
  "cc.desc.exportZip":
    "Generate and package a clean, deployment-ready KRL project archive for robot controller transfer.",
  "cc.desc.cleanGit":
    "Strip WorkVisual &ACCESS, &REL, and &PARAM headers for clean, noise-free Git commits.",
  "cc.desc.deadCode":
    "AST-powered static analyzer removing unused variables, dead subroutines, and obsolete declarations.",
  "cc.desc.sortDecl":
    "Group and alphabetize KRL variable declarations by data types according to industrial standards.",
  "cc.desc.modernFold":
    "Upgrade legacy motion commands to modern KSS Spline and iiQKA Fold structures in one click.",
  "cc.desc.collisionGuard":
    "Wrap motion sequences into CollisionGuard safety fold boundaries for robotic cell safety.",
  "cc.desc.safety":
    "Comprehensive validation of $TOOL, $BASE, $VEL.CP velocity caps, and non-ASCII character hazards.",
  "cc.desc.report":
    "Export a formal code quality and safety audit report for handover to the client or quality control.",

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
    "🛡️ Industrial Safety Check: CODE IS SAFE FOR KRC EXECUTION!",
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
  "cc.prompt.telegram.placeholder":
    "Type your message or technical question...",
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
  "chat.notify.fileSent": '{0} "{1}" successfully sent to developer!',
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
  "fold.prompt.splineVel": "Enter Cartesian Spline Velocity ($VEL.CP in m/s)",
  "fold.notify.splineBlockCreated": "Created modern SPLINE motion block.",

  // Pricing Plans (Dynamic Multi-language)
  "plan.monthly.name": "Pro Monthly",
  "plan.monthly.period": "/ month (14-day free trial)",
  "plan.monthly.desc":
    "Professional license for KUKA commissioning engineer. Full access to all premium tools, AST diagnostics, and EKI (2 PCs).",
  "plan.annual.name": "Pro Annual (B2B Standard)",
  "plan.annual.period": "/ year (Save 35%)",
  "plan.annual.desc":
    "Annual industrial subscription. Includes priority updates, KRC4/KRC5 support, Backup Diff, EKI validator, and GitLens KRL (3 PCs).",
  "plan.lifetime.name": "Pro Lifetime (Enterprise & Integrator)",
  "plan.lifetime.period": "/ one-time (Lifetime deal)",
  "plan.lifetime.desc":
    "Perpetual commercial license with no subscriptions. 5 workstations, lifetime access, 30-day offline buffer, and priority direct chat support.",

  // Control Center Labels
  "cc.title": "KUKA KRL Professional Control Center",
  "cc.edition": "v1.7.3 Industrial Edition",
  "cc.profile.accountEmail": "Account Email:",
  "cc.profile.planTier": "Plan Tier:",
  "cc.profile.licenseKey": "License Key:",
  "cc.profile.copyKey": "Copy Key",
  "cc.profile.onlineExpiry": "Online Expiry / Renewal:",
  "cc.profile.offlineCache": "Offline Validation Cache:",
  "cc.profile.daysRemaining": "Valid until {0} ({1} Days Remaining)",
  "cc.profile.activePro": "ACTIVE (PRO)",
  "cc.profile.community": "COMMUNITY EDITION",
  "cc.profile.proEdition": "Pro Edition (Industrial Commercial)",
  "cc.profile.freeEdition": "Community Free Edition",
  "cc.profile.subRenews": "Active Subscription (Expires: {0} — {1} Days Left)",
  "cc.profile.subActive": "Dodo Payments Pro License (Active / Verified)",
  "cc.profile.subLifetime":
    "Lifetime Pro Plan — Permanent Unlimited Access (No Expiry)",
  "cc.profile.subMonthlyActive":
    "Active Pro Monthly (Auto-renews monthly — Manage via Portal)",
  "cc.profile.subAnnualActive":
    "Active Pro Annual (Auto-renews annually — Manage via Portal)",
  "cc.profile.subNone": "No Active Subscription",
  "cc.devices.title": "Active Device Binding",
  "cc.devices.currentHost": "Current Hostname:",
  "cc.devices.hwFingerprint": "Hardware Fingerprint:",
  "cc.devices.slotUsage": "Slot Usage:",
  "cc.devices.activeCount": "{0} / {1} Devices",
  "cc.devices.unlicensed": "1 Device (Unlicensed)",
  "cc.support.title": "Direct Engineering Support",

  // Active Features & Diagnostics Control
  "cc.diagControl.title": "Active Features & Diagnostics Control",
  "cc.diagControl.desc":
    "Monitor all active extension subsystems and flexibly configure KRL rules on the fly",
  "cc.diagControl.btnValidate": "🧪 Check Entire Project",
  "cc.diagControl.btnReport": "📊 Generate Report",
  "cc.diagControl.subsystemsTitle": "⚡ Active Subsystems Status:",
  "cc.subsystem.lsp": "LSP Language Server",
  "cc.subsystem.indexer": "Project Indexer (Workspace)",
  "cc.subsystem.engine": "Diagnostics Engine",
  "cc.subsystem.flowchart": "Flowchart Analyzer",
  "cc.subsystem.backup": "KRC Backup Inspector (.zip)",
  "cc.subsystem.eki": "EthernetKRL (EKI) Generator",
  "cc.subsystem.telegram": "Telegram Engineering Bridge",
  "cc.subsystem.ci": "Test Suite (CI Quality)",
  "cc.badge.online": "Online",
  "cc.badge.active": "Active",
  "cc.badge.disabled": "Disabled",
  "cc.badge.ready": "Ready",
  "cc.badge.connected": "Connected",
  "cc.diagControl.togglesTitle":
    "⚙️ Fine-tuning & Temporary Diagnostics Disabling:",
  "cc.toggle.master.title": "⚡ Master KRL Diagnostics Switch",
  "cc.toggle.master.desc":
    "Enable or disable all compiler checks and diagnostics in editor",
  "cc.toggle.waitTimeout.title": "⏱️ WAIT FOR Timeout Warning",
  "cc.toggle.waitTimeout.desc":
    "Warn if WAIT FOR lacks explicit timeout or $TIMER (disabled by default)",
  "cc.toggle.halt.title": "🛑 HALT Operator Warning",
  "cc.toggle.halt.desc":
    "Warn about robot program execution halt by HALT command",
  "cc.toggle.syntax.title": "🔍 KRL Syntax Validator",
  "cc.toggle.syntax.desc": "Check compliance with KUKA KSS 8.3–8.7 syntax",
  "cc.toggle.speeds.title": "🚀 Safety Velocity Limit ($VEL_PTP)",
  "cc.toggle.speeds.desc":
    "Protect against dangerous axis overspeed ($VEL_PTP > 100%)",
  "cc.toggle.toolBase.title": "🎯 $TOOL and $BASE Initialization Check",
  "cc.toggle.toolBase.desc":
    "Warn about motion commands without prior BAS(#INITMOV) call",
  "cc.toggle.blockBalance.title": "⚖️ Block Balance (IF, FOR, WHILE, LOOP)",
  "cc.toggle.blockBalance.desc":
    "Check matching and proper closing of KRL structural blocks",
  "cc.toggle.deadCode.title": "🧟 Dead / Unreachable Code Detection",
  "cc.toggle.deadCode.desc":
    "Identify unreachable instruction lines after RETURN and HALT",
  "cc.toggle.typeUsage.title": "🔢 Data Types Validation (SWITCH/CASE)",
  "cc.toggle.typeUsage.desc":
    "Strict prohibition of floating-point REAL numbers in SWITCH and CASE branches",
  "cc.toggle.krlConstraints.title":
    "🔤 KRL Name Constraints (Up to 24 characters)",
  "cc.toggle.krlConstraints.desc":
    "Enforce KUKA identifier limit of 24 characters",
  "cc.toggle.unusedVars.title": "🗑️ Unused Variables Detection",
  "cc.toggle.unusedVars.desc":
    "Highlight local variables that are never read or written",
  "cc.toggle.duplicateNames.title": "👥 Duplicate Name Detection",
  "cc.toggle.duplicateNames.desc":
    "Warn about repeated declarations of same variable in same scope",
  "cc.toggle.inlayHints.title": "💡 Smart Inlay Hints",
  "cc.toggle.inlayHints.desc":
    "Display inline parameter hints for BAS, $OUT, $IN and frames",
  "cc.toggle.errorLens.title": "👓 Error Lens Diagnostics",
  "cc.toggle.errorLens.desc":
    "Display diagnostic messages directly at the end of the code line",
  "cc.toggle.validateNonAscii.title": "🌐 Non-ASCII & Cyrillic Check",
  "cc.toggle.validateNonAscii.desc":
    "Detect Russian and non-ASCII letters in code causing KRC syntax crashes",

  // Telegram & Remote Telepresence
  "chat.apply.noEditor": "Open a file in editor to apply code.",
  "chat.apply.success": "Code applied (Please review before saving).",
  "chat.sendSelection.noSelection": "Select code to send to chat.",
  "chat.sendSelection.prompt": "Add comment to code (optional)",
  "chat.sendSelection.success": "Code sent to Telegram chat.",
  "chat.remote.logRequest": "Extension logs export request",
  "chat.remote.exportRequest": "KRL project export request",
  "chat.remote.sysInfoRequest": "PC System Info request",
  "chat.remote.aiDiagRequest": "KRL AI safety diagnostics request",
  "chat.remote.reportRequest":
    "KRL Project Quality & Acceptance Report request",
  "chat.remote.requestFrom": "Request from Silvestr Liskin:",
  "chat.remote.actionPrompt":
    "Telegram Support requests remote action: {0}",
  "chat.remote.logsExported":
    "Logs exported via confirmed remote request /logs",
  "chat.remote.noWorkspace": "No open workspace.",
  "chat.remote.fileNotFound": "File {0} not found in workspace.",
  "chat.remote.fileSent": "File {0} sent.",
  "chat.remote.fileReadError": "Error reading file",
  "chat.remote.readFileAction": "Read file: {0}",
  "chat.remote.noActiveFile": "No active file",
  "chat.remote.sysInfoTitle": "Engineer PC System Information",
  "chat.remote.diagTitle": "AI KRL AUTO-DIAGNOSTICS",
  "chat.remote.diagSummary": "Diagnostic Results:",
  "chat.remote.diagNoIssues":
    "No safety issues found. KRL structure is clean.",

  // GitGraph Revision Graph & Timeline
  "gitgraph.title": "KUKA KRL Revision Graph & Point Timeline",
  "gitgraph.filter.all": "All Commits ({0})",
  "gitgraph.filter.dat": "Point Touch-ups (.DAT)",
  "gitgraph.filter.src": "Logic Changes (.SRC)",
  "gitgraph.empty": "No matching KRL commits found in workspace.",
  "gitgraph.badge.points": "Points Touch-up",
  "gitgraph.badge.logic": "Logic Mod",
  "gitgraph.search.placeholder":
    "Search commits by message, author, or .DAT point name...",
  "gitgraph.noGit.title": "Local Git Repository Not Detected",
  "gitgraph.noGit.desc":
    "This KRL workspace is not tracked by Git yet. Initialize a local repository in 1 click to track .DAT point touch-ups and robot program revisions.",
  "gitgraph.noGit.btnInit": "🚀 Initialize Local Git for KRL (1-Click)",
  "gitgraph.noGit.btnBackup": "📦 Compare with KRC ZIP Backup",
  "gitgraph.notify.initSuccess":
    "Local Git repository successfully initialized with initial KRL snapshot.",
  "gitgraph.notify.initError": "Failed to initialize Git repository: {0}",
  "gitgraph.btn.copyHash": "Copy Hash",
  "gitgraph.btn.snapshot": "📸 Snapshot Points (.DAT)",
  "gitgraph.prompt.snapshot":
    "Enter comment for point snapshot (e.g., Robot cell touch-up after teaching):",
  "gitgraph.notify.snapshotSuccess":
    "Point snapshot successfully committed to local Git history.",
  "gitgraph.btn.fetch": "Fetch Remote",
  "gitgraph.btn.pull": "Pull",
  "gitgraph.btn.push": "Push",
  "gitgraph.details.title": "Commit Details",
  "gitgraph.details.files": "Changed Files",
  "gitgraph.details.diffParent": "Diff with Parent",
  "gitgraph.details.diffWorkspace": "Diff with Workspace",
  "gitgraph.details.checkout": "Checkout Commit",
  "gitgraph.details.branchHere": "Create Branch",
  "gitgraph.branch": "Branch",
  "gitgraph.remote": "Remote",
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

  "command.insertFold": "Вставить FOLD-регион",
  "command.insertFold.tooltip": "Обернуть выделенный код в промышленный блок FOLD ... ENDFOLD",
  "command.removeTrailingWhitespace": "Удалить пробелы в конце строк",
  "command.removeTrailingWhitespace.tooltip": "Очистить лишние концевые пробелы и табуляции во всем файле",
  "command.renameSignal": "Переименовать сигнал (алиас)",
  "command.renameSignal.tooltip": "Присвоить или изменить псевдоним сигнала ввода-вывода $IN/$OUT",
  "command.viewFileHistory": "История изменений файла и сравнение ревизий (Git)",
  "command.viewFileHistory.tooltip": "Пошаговый анализ истории коммитов открытого файла KRL",
  "command.showLineBlameDetails": "Детали автора строки KRL (Git Blame)",
  "command.showLineBlameDetails.tooltip": "Кто, когда и в каком коммите изменил текущую строку или точку",
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
  "command.aiCheckSafety": "Проверка безопасности KRC",
  "command.aiCheckSafety.tooltip":
    "Проверить инициализацию $TOOL/$BASE, блокировки и кириллицу",
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

  "command.validateWorkspace": "Проверить все файлы проекта",
  "command.validateWorkspace.tooltip": "Полный аудит синтаксиса, типов и скоростей во всем проекте",
  "command.exportBackupZip": "Скачать весь проект (ZIP-архив)",
  "command.exportBackupZip.tooltip": "Упаковать весь открытый проект KRL в ZIP-архив",
  "command.viewGitGraph": "Граф ревизий KRL и таймлайн точек",
  "command.viewGitGraph.tooltip": "Интерактивная шкала изменений логики и правок точек .DAT",
  "command.sendQualityReport": "Отправить паспорт качества в Telegram",
  "command.sendQualityReport.tooltip": "Сгенерировать и отправить отчет надежности проекта в Telegram",
  "category.diagnosticsQuality": "Диагностика и Качество",
  "category.projectBackups": "Проект и Бэкапы",
  "category.engineeringTools": "Инженерные Инструменты",
  "category.telepresenceSupport": "Связь и Поддержка",
  "category.activeEditorTools": "Функции активного файла KRL",
  "cc.refSection.title": "📖 Справочник контекстных функций редактора KRL",
  "cc.refSection.desc": "Горячие клавиши и возможности, работающие непосредственно в открытом окне файла .SRC / .DAT",
  "cc.engTools": "Инженерные инструменты и движения",
  "cc.backupGit": "Управление бэкапами и GitLens KRL",
  "cc.refactorTools": "Рефакторинг и современный KRL",
  "cc.safetyDiag": "Диагностика безопасности и аудит качества",
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
  "cc.btn.viewGitGraph": "Открыть Git Graph",
  "cc.btn.exportBackupZip": "Экспорт ZIP-бэкапа",
  "cc.btn.cleanupVars": "Очистить мертвый код",
  "cc.btn.sortDeclarations": "Сортировать DECL",
  "cc.btn.modernizeFold": "Модернизировать Fold",
  "cc.btn.collisionGuard": "Защитный CollisionGuard",
  "cc.btn.formatDoc": "Форматировать KRL",
  "cc.btn.openTelegramChat": "Открыть чат поддержки",
  "cc.desc.flowchart":
    "Интерактивная 2D блок-схема (CFG) с визуализацией логических развилок, условий IF/SWITCH и циклов.",
  "cc.desc.calculator":
    "Математические 3D преобразования фреймов, расчет углов Эйлера (A, B, C) и смещений инструмента/базы.",
  "cc.desc.snippets":
    "Генератор траекторий и шаблонов движений KUKA с визуальными схемами (PTP, LIN, CIRC, Spline).",
  "cc.desc.eki":
    "Валидатор XML-структур EthernetKRL и автоматическая генерация KRL-обработчика сокетов.",
  "cc.desc.backupDiff":
    "Инспекция дельт координат и сравнение точек E6POS/POS между проектом и ZIP-бэкапом KRC.",
  "cc.desc.gitGraph":
    "Интерактивный таймлайн ревизий с раздельной фильтрацией правок точек .DAT и логики .SRC.",
  "cc.desc.exportZip":
    "Экспорт чистого архива KRL проекта без мусорных файлов для быстрой загрузки на робот.",
  "cc.desc.cleanGit":
    "Удаление заголовков WorkVisual (&ACCESS, &REL, &PARAM) для чистоты истории Git-коммитов.",
  "cc.desc.deadCode":
    "AST-анализатор для безопасного удаления неиспользуемых переменных DECL и мертвого кода.",
  "cc.desc.sortDecl":
    "Автоматическая группировка и сортировка объявлений переменных по типам данных и алфавиту.",
  "cc.desc.modernFold":
    "Конвертация устаревших команд движения в современный стандарт KSS Spline и iiQKA Fold.",
  "cc.desc.collisionGuard":
    "Оборачивание траектории движения в защитный FOLD-конверт CollisionGuard для безопасности ячейки.",
  "cc.desc.safety":
    "Комплексная проверка инициализации $TOOL/$BASE, лимитов скорости $VEL.CP и скрытой кириллицы.",
  "cc.desc.report":
    "Генерация официального отчёта качества кода и безопасности для сдачи проекта заказчику.",

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
    "🛡️ Проверка безопасности: КОД БЕЗОПАСЕН ДЛЯ ИСПОЛНЕНИЯ НА KRC!",
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
  "cc.notify.telegramSent": "Сообщение успешно отправлено ведущему инженеру!",
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
  "chat.notify.fileSent": '{0} "{1}" успешно отправлен разработчику!',
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
  "command.insertCollisionGuard":
    "Вставить защиту от коллизий (CollisionGuard)",
  "command.insertCollisionGuard.tooltip":
    "Обернуть движение в триггеры контроля момента $COLL_MON",
  "command.insertSplineBlock": "Обернуть в сплайн-блок (SPLINE Block)",
  "command.insertSplineBlock.tooltip":
    "Создать непрерывный блок сплайн-траектории SPLINE ... ENDSPLINE",
  "fold.notify.noSelection":
    "Пожалуйста, сначала выделите блок движения или логики KRL.",
  "fold.notify.iiqkaSuccess": "Успешно конвертировано в формат iiQKA Fold.",
  "fold.notify.noLegacyMotions": "Устаревшие команды движения не найдены.",
  "fold.notify.splineSuccess": "Успешно обновлено {0} команд в формат Spline.",
  "fold.notify.noFoldsFound":
    "FOLD-оболочки в выделенном фрагменте не найдены.",
  "fold.notify.unwrapped": "Успешно развёрнуто {0} FOLD-оболочек.",
  "fold.notify.collisionGuard": "Вставлена защитная оболочка CollisionGuard.",
  "fold.prompt.splineVel":
    "Введите скорость сплайна в декартовых координатах ($VEL.CP в м/с)",
  "fold.notify.splineBlockCreated": "Создан современный блок SPLINE движения.",

  // Pricing Plans (Dynamic Multi-language)
  "plan.monthly.name": "Pro Monthly",
  "plan.monthly.period": "/ месяц (14 дней бесплатный триал)",
  "plan.monthly.desc":
    "Профессиональная лицензия для инженера-наладчика KUKA. Доступ ко всем премиум-инструментам, AST-диагностике и EKI (2 ПК).",
  "plan.annual.name": "Pro Annual (B2B Standard)",
  "plan.annual.period": "/ год (выгода 35%)",
  "plan.annual.desc":
    "Годовой промышленный абонемент. Включает приоритетные обновления, поддержку KRC4/KRC5, Backup Diff, EKI валидатор и GitLens KRL (3 ПК).",
  "plan.lifetime.name": "Pro Lifetime (Enterprise & Integrator)",
  "plan.lifetime.period": "/ разово (вечная лицензия)",
  "plan.lifetime.desc":
    "Бессрочная коммерческая лицензия без подписок. 5 рабочих мест, пожизненный доступ, 30-дневный оффлайн-буфер и приоритетный прямой чат поддержки.",

  // Control Center Labels
  "cc.title": "KUKA KRL Панель Управления Профессионал",
  "cc.edition": "v1.7.3 Промышленная Версия",
  "cc.profile.accountEmail": "Email аккаунта:",
  "cc.profile.planTier": "Тарифный план:",
  "cc.profile.licenseKey": "Лицензионный ключ:",
  "cc.profile.copyKey": "Копировать ключ",
  "cc.profile.onlineExpiry": "Срок действия / Продление:",
  "cc.profile.offlineCache": "Офлайн-буфер валидации:",
  "cc.profile.daysRemaining": "Действует до {0} (Осталось {1} дн.)",
  "cc.profile.activePro": "АКТИВНА (PRO)",
  "cc.profile.community": "COMMUNITY EDITION",
  "cc.profile.proEdition": "Pro Edition (Промышленная коммерческая)",
  "cc.profile.freeEdition": "Community Бесплатная Версия",
  "cc.profile.subRenews":
    "Активная подписка (Действует до: {0} — осталось {1} дн.)",
  "cc.profile.subActive": "Лицензия Dodo Payments Pro (Активна / Проверена)",
  "cc.profile.subLifetime":
    "Бессрочная лицензия Pro — Пожизненный доступ без ограничений",
  "cc.profile.subMonthlyActive":
    "Активная ежемесячная подписка Pro (Автопродление — Управление в Portal)",
  "cc.profile.subAnnualActive":
    "Активная годовая подписка Pro (Автопродление — Управление в Portal)",
  "cc.profile.subNone": "Нет активной подписки",
  "cc.devices.title": "Привязка активных устройств",
  "cc.devices.currentHost": "Имя текущего хоста:",
  "cc.devices.hwFingerprint": "Аппаратный отпечаток:",
  "cc.devices.slotUsage": "Использовано слотов:",
  "cc.devices.activeCount": "{0} из {1} устройств",
  "cc.devices.unlicensed": "1 устройство (Без лицензии)",
  "cc.support.title": "Прямая инженерная поддержка",

  // Active Features & Diagnostics Control
  "cc.diagControl.title": "Управление системами и диагностикой",
  "cc.diagControl.desc":
    "Мониторинг всех активных подсистем расширения и гибкое управление проверками KRL на лету",
  "cc.diagControl.btnValidate": "🧪 Проверить весь проект",
  "cc.diagControl.btnReport": "📊 Сформировать отчет",
  "cc.diagControl.subsystemsTitle": "⚡ Состояние активных подсистем:",
  "cc.subsystem.lsp": "LSP Языковой сервер",
  "cc.subsystem.indexer": "Индексатор проекта (Workspace)",
  "cc.subsystem.engine": "Диагностический движок",
  "cc.subsystem.flowchart": "Анализатор графа (Flowchart)",
  "cc.subsystem.backup": "Инспектор бэкапов KRC (.zip)",
  "cc.subsystem.eki": "EthernetKRL (EKI) Генератор",
  "cc.subsystem.telegram": "Telegram Инженерная связь",
  "cc.subsystem.ci": "Набор тестов (CI Quality)",
  "cc.badge.online": "Онлайн",
  "cc.badge.active": "Активен",
  "cc.badge.disabled": "Отключен",
  "cc.badge.ready": "Готов",
  "cc.badge.connected": "Подключен",
  "cc.diagControl.togglesTitle":
    "⚙️ Тонкая настройка и временное отключение диагностических проверок:",
  "cc.toggle.master.title": "⚡ Главный рубильник диагностики KRL",
  "cc.toggle.master.desc":
    "Включение/отключение всех проверок и сообщений компилятора в редакторе",
  "cc.toggle.waitTimeout.title": "⏱️ Предупреждение о таймауте WAIT FOR",
  "cc.toggle.waitTimeout.desc":
    "Предупреждать, если в WAIT FOR нет явного таймаута или $TIMER (выкл. по умолчанию)",
  "cc.toggle.halt.title": "🛑 Предупреждение об операторе HALT",
  "cc.toggle.halt.desc":
    "Предупреждать об остановке выполнения программы робота командой HALT",
  "cc.toggle.syntax.title": "🔍 Синтаксический валидатор KRL",
  "cc.toggle.syntax.desc":
    "Проверка соответствия инструкций эталонному синтаксису KSS 8.3–8.7",
  "cc.toggle.speeds.title": "🚀 Контроль предельных скоростей ($VEL_PTP)",
  "cc.toggle.speeds.desc":
    "Защита от опасного превышения скоростей движения осей ($VEL_PTP > 100%)",
  "cc.toggle.toolBase.title": "🎯 Проверка инициализации $TOOL и $BASE",
  "cc.toggle.toolBase.desc":
    "Предупреждать о движении без предварительного вызова BAS(#INITMOV)",
  "cc.toggle.blockBalance.title": "⚖️ Баланс блоков (IF, FOR, WHILE, LOOP)",
  "cc.toggle.blockBalance.desc":
    "Контроль парности и корректного закрытия конструкций языка KRL",
  "cc.toggle.deadCode.title": "🧟 Поиск мертвого / недостижимого кода",
  "cc.toggle.deadCode.desc":
    "Выявлять невыполнимые строки инструкций после операторов RETURN и HALT",
  "cc.toggle.typeUsage.title": "🔢 Проверка типов данных (SWITCH/CASE)",
  "cc.toggle.typeUsage.desc":
    "Строгий запрет чисел с плавающей точкой REAL в SWITCH и ветках CASE",
  "cc.toggle.krlConstraints.title": "🔤 Ограничения имен KRL (до 24 символов)",
  "cc.toggle.krlConstraints.desc":
    "Контроль лимита длины идентификаторов контроллеров KUKA (не более 24 символов)",
  "cc.toggle.unusedVars.title": "🗑️ Поиск неиспользуемых переменных",
  "cc.toggle.unusedVars.desc":
    "Подсветка локальных переменных, которые объявлены, но нигде не задействованы",
  "cc.toggle.duplicateNames.title": "👥 Контроль дублирования имен",
  "cc.toggle.duplicateNames.desc":
    "Предупреждать о повторном объявлении одной переменной в той же области видимости",
  "cc.toggle.inlayHints.title": "💡 Умные подсказки (Inlay Hints)",
  "cc.toggle.inlayHints.desc":
    "Отображение имен сигналов из $config.dat прямо в строках $OUT/$IN и параметров BAS",
  "cc.toggle.errorLens.title": "👓 Встроенные сообщения Error Lens",
  "cc.toggle.errorLens.desc":
    "Отображение ошибок компилятора прямо в конце строки кода для мгновенного контроля",
  "cc.toggle.validateNonAscii.title": "🌐 Контроль не-ASCII и кириллицы",
  "cc.toggle.validateNonAscii.desc":
    "Поиск случайных русских букв в коде, вызывающих аварийный сбой компилятора KRC",

  // Telegram & Remote Telepresence
  "chat.apply.noEditor": "Откройте файл в редакторе, чтобы вставить код.",
  "chat.apply.success": "Код внедрен (Внимание: проверьте правильность перед сохранением).",
  "chat.sendSelection.noSelection": "Выделите код для отправки в чат.",
  "chat.sendSelection.prompt": "Добавьте комментарий к коду (опционально)",
  "chat.sendSelection.success": "Код отправлен в Telegram чат.",
  "chat.remote.logRequest": "Запрос выгрузки логов расширения",
  "chat.remote.exportRequest": "Запрос экспорта проекта KRL",
  "chat.remote.sysInfoRequest": "Запрос системной информации ПК",
  "chat.remote.aiDiagRequest": "Запрос AI-диагностики безопасности KRL",
  "chat.remote.reportRequest": "Запрос инженерного отчета качества KRL проекта",
  "chat.remote.requestFrom": "Запрос от Сильвестр Лискин:",
  "chat.remote.actionPrompt": "Telegram Support запрашивает удаленное действие: {0}",
  "chat.remote.logsExported": "Логи выгружены по подтвержденному удаленному запросу /logs",
  "chat.remote.noWorkspace": "Нет открытого Workspace.",
  "chat.remote.fileNotFound": "Файл {0} не найден в рабочем пространстве.",
  "chat.remote.fileSent": "Файл {0} отправлен.",
  "chat.remote.fileReadError": "Ошибка при чтении файла",
  "chat.remote.readFileAction": "Чтение файла: {0}",
  "chat.remote.noActiveFile": "Нет открытого файла",
  "chat.remote.sysInfoTitle": "Системная информация ПК Инженера",
  "chat.remote.diagTitle": "AI АВТОДИАГНОСТИКА KRL",
  "chat.remote.diagSummary": "Результаты проверки:",
  "chat.remote.diagNoIssues": "Замечаний безопасности не обнаружено. Структура KRL в норме.",

  // GitGraph Revision Graph & Timeline
  "gitgraph.title": "Граф Ревизий и Временная Шкала Точек KRL",
  "gitgraph.filter.all": "Все коммиты ({0})",
  "gitgraph.filter.dat": "Правка точек (.DAT)",
  "gitgraph.filter.src": "Изменения логики (.SRC)",
  "gitgraph.empty": "В рабочем пространстве не найдено коммитов KRL.",
  "gitgraph.badge.points": "Правка точек",
  "gitgraph.badge.logic": "Правка логики",
  "gitgraph.search.placeholder":
    "Поиск по сообщению, автору или имени точки .DAT...",
  "gitgraph.noGit.title": "Локальный Git-репозиторий не обнаружен",
  "gitgraph.noGit.desc":
    "Этот KRL проект еще не отслеживается Git. Инициализируйте локальный репозиторий в 1 клик для контроля правок точек .DAT и ревизий программ робота.",
  "gitgraph.noGit.btnInit": "🚀 Инициализировать локальный Git (в 1 клик)",
  "gitgraph.noGit.btnBackup": "📦 Сравнить с ZIP-бэкапом KRC",
  "gitgraph.notify.initSuccess":
    "Локальный Git-репозиторий успешно создан с начальным снимком KRL проекта.",
  "gitgraph.notify.initError": "Ошибка при инициализации Git: {0}",
  "gitgraph.btn.copyHash": "Скопировать хэш",
  "gitgraph.btn.snapshot": "📸 Снимок точек (.DAT)",
  "gitgraph.prompt.snapshot":
    "Введите комментарий к снимку точек (например: Подправка точек после переобучения):",
  "gitgraph.notify.snapshotSuccess":
    "Снимок точек успешно зафиксирован в локальной истории Git.",
  "gitgraph.btn.fetch": "Получить (Fetch)",
  "gitgraph.btn.pull": "Затянуть (Pull)",
  "gitgraph.btn.push": "Отправить (Push)",
  "gitgraph.details.title": "Детали коммита",
  "gitgraph.details.files": "Изменённые файлы",
  "gitgraph.details.diffParent": "Сравнить с предыдущим",
  "gitgraph.details.diffWorkspace": "Сравнить с проектом",
  "gitgraph.details.checkout": "Переключиться на коммит",
  "gitgraph.details.branchHere": "Создать ветку отсюда",
  "gitgraph.branch": "Ветка",
  "gitgraph.remote": "Удалённый сервер",
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

  "command.insertFold": "FOLD Bölgesi Ekle",
  "command.insertFold.tooltip": "Seçimi standart KRL FOLD ... ENDFOLD içine al",
  "command.removeTrailingWhitespace": "Satır Sonu Boşluklarını Temizle",
  "command.removeTrailingWhitespace.tooltip": "Tüm dosyadaki gereksiz satır sonu boşluklarını temizle",
  "command.renameSignal": "Sinyali Yeniden Adlandır (Takma Ad)",
  "command.renameSignal.tooltip": "$IN/$OUT sinyali için takma ad tanımla",
  "command.viewFileHistory": "KRL Dosya Geçmişi ve Karşılaştırma",
  "command.viewFileHistory.tooltip": "Açık KRL dosyasının Git geçmişini incele",
  "command.showLineBlameDetails": "KRL Satır Git Blame Ayrıntıları",
  "command.showLineBlameDetails.tooltip": "Aktif satırı kimin, ne zaman ve hangi committe değiştirdiğini göster",
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
  "command.aiCheckSafety": "Endüstriyel Güvenlik Kontrolü",
  "command.aiCheckSafety.tooltip":
    "Katı endüstriyel güvenlik kontrollerini çalıştır (başlatılmamış tool/base, kilitlenmeler)",
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

  "command.validateWorkspace": "Tüm Dosyaları Kontrol Et",
  "command.validateWorkspace.tooltip": "Çalışma alanındaki tüm dosyalarda tam sözdizimi ve güvenlik kontrolü yap",
  "command.exportBackupZip": "Tüm Projeyi ZIP Olarak İndir",
  "command.exportBackupZip.tooltip": "Açık olan tüm KRL projesini ZIP arşivine paketle",
  "command.viewGitGraph": "KRL Revizyon Grafiği ve Nokta Zaman Çizelgesi",
  "command.viewGitGraph.tooltip": "KRL commitleri ve .DAT nokta düzenlemeleri görsel zaman çizelgesi",
  "command.sendQualityReport": "Kalite Raporunu Telegrama Gönder",
  "command.sendQualityReport.tooltip": "Çalışma alanı kalite raporunu oluştur ve Telegrama ilet",
  "category.diagnosticsQuality": "Teşhis ve Kalite",
  "category.projectBackups": "Proje ve Yedekler",
  "category.engineeringTools": "Mühendislik Araçları",
  "category.telepresenceSupport": "İletişim ve Destek",
  "category.activeEditorTools": "Aktif KRL Editör Araçları",
  "cc.refSection.title": "📖 Editör İçi Fonksiyonlar ve Kısayollar",
  "cc.refSection.desc": "Açık .SRC / .DAT editör penceresinde doğrudan çalışan kısayollar ve fonksiyon rehberi",
  "cc.engTools": "Mühendislik ve Hareket Araçları",
  "cc.backupGit": "KRC Yedekleme ve GitLens Sürüm Kontrolü",
  "cc.refactorTools": "Yeniden Düzenleme ve Modern KRL",
  "cc.safetyDiag": "Güvenlik Teşhisi ve Kalite Denetimi",
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
  "cc.btn.runSafetyCheck": "Güvenlik Kontrolü",
  "cc.btn.generateReport": "Rapor Oluştur",
  "cc.btn.viewGitGraph": "Git Grafiğini Aç",
  "cc.btn.exportBackupZip": "ZIP Yedeğini Dışa Aktar",
  "cc.btn.cleanupVars": "Ölü Kodu Temizle",
  "cc.btn.sortDeclarations": "DECL Sırala",
  "cc.btn.modernizeFold": "Spline'a Yükselt",
  "cc.btn.collisionGuard": "CollisionGuard Ekle",
  "cc.btn.formatDoc": "KRL Biçimlendir",
  "cc.btn.openTelegramChat": "Canlı Desteği Aç",
  "cc.desc.flowchart":
    "Mantık dallanmalarını, IF/SWITCH kararlarını ve döngüleri görselleştiren etkileşimli 2D akış şeması (CFG).",
  "cc.desc.calculator":
    "Matematiksel 3D çerçeve dönüşümleri, Euler açı hesaplamaları (A, B, C) ve takım/taban ofsetleri.",
  "cc.desc.snippets":
    "Görsel şemalarla KUKA hareket şablonları ve yörünge üreteci (PTP, LIN, CIRC, Spline).",
  "cc.desc.eki":
    "EthernetKRL XML şema doğrulayıcısı ve otomatik KRL soket işleyici alt program üreticisi.",
  "cc.desc.backupDiff":
    "Proje ile KRC ZIP yedeği arasındaki koordinat deltalarını ve E6POS/POS noktalarını karşılaştırma.",
  "cc.desc.gitGraph":
    ".DAT nokta düzeltmeleri ve .SRC mantığı için özel filtrelerle etkileşimli revizyon zaman çizelgesi.",
  "cc.desc.exportZip":
    "Robot denetleyicisine hızlı aktarım için temiz ve dağıtıma hazır KRL proje arşivi oluşturma.",
  "cc.desc.cleanGit":
    "Temiz Git geçmişi için WorkVisual &ACCESS, &REL ve &PARAM başlıklarını otomatik temizleme.",
  "cc.desc.deadCode":
    "Kullanılmayan DECL değişkenlerini ve ölü kodları güvenle temizleyen AST tabanlı statik analizci.",
  "cc.desc.sortDecl":
    "KRL değişken bildirimlerini endüstriyel standartlara göre veri türlerine ve alfabeye göre sıralama.",
  "cc.desc.modernFold":
    "Eski hareket komutlarını modern KSS Spline ve iiQKA Fold yapılarına tek tıkla yükseltme.",
  "cc.desc.collisionGuard":
    "Robot hücresi güvenliği için hareket bloklarını CollisionGuard güvenlik fold zarfına sarma.",
  "cc.desc.safety":
    "$TOOL/$BASE başlatması, $VEL.CP hız limitleri ve ASCII olmayan karakter tehlikeleri doğrulaması.",
  "cc.desc.report":
    "Müşteriye veya kalite kontrolüne teslim için resmi kod kalitesi ve güvenlik denetim raporu üretimi.",

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
    "🛡️ Endüstriyel Güvenlik Kontrolü: KOD KRC İÇİN GÜVENLİ!",
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
  "cc.prompt.telegram.placeholder": "Mesajınızı veya teknik sorunuzu yazın...",
  "cc.notify.telegramSent": "Mesaj baş mühendise gönderildi!",
  "cc.notify.telegramFallback": "Mesaj gönderilemedi. Lütfen tekrar deneyin.",

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
  "chat.notify.fileSent": '{0} "{1}" geliştiriciye başarıyla gönderildi!',
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
  "fold.notify.noLegacyMotions":
    "Dönüştürülecek eski hareket komutu bulunamadı.",
  "fold.notify.splineSuccess":
    "Başarıyla {0} hareket komutu Spline'a yükseltildi.",
  "fold.notify.noFoldsFound": "Seçili aralıkta FOLD kabuğu bulunamadı.",
  "fold.notify.unwrapped": "Başarıyla {0} FOLD kabuğu kaldırıldı.",
  "fold.notify.collisionGuard": "CollisionGuard koruma zarfı eklendi.",
  "fold.prompt.splineVel": "Kartezyen Spline Hızını Girin ($VEL.CP m/s)",
  "fold.notify.splineBlockCreated": "Modern SPLINE hareket bloğu oluşturuldu.",

  // Pricing Plans (Dynamic Multi-language)
  "plan.monthly.name": "Pro Monthly",
  "plan.monthly.period": "/ ay (14 günlük ücretsiz deneme)",
  "plan.monthly.desc":
    "KUKA devreye alma mühendisi için profesyonel lisans. Tüm premium araçlara, AST teşhislerine ve EKI'ye tam erişim (2 PC).",
  "plan.annual.name": "Pro Annual (B2B Standard)",
  "plan.annual.period": "/ yıl (%35 tasarruf)",
  "plan.annual.desc":
    "Yıllık endüstriyel abonelik. Öncelikli güncellemeler, KRC4/KRC5 desteği, Backup Diff, EKI doğrulayıcı ve GitLens KRL içerir (3 PC).",
  "plan.lifetime.name": "Pro Lifetime (Enterprise & Integrator)",
  "plan.lifetime.period": "/ tek seferlik (Ömür boyu lisans)",
  "plan.lifetime.desc":
    "Aboneliksiz kalıcı ticari lisans. 5 çalışma istasyonu, ömür boyu erişim, 30 günlük çevrimdışı arabellek ve öncelikli doğrudan sohbet desteği.",

  // Control Center Labels
  "cc.title": "KUKA KRL Profesyonel Kontrol Merkezi",
  "cc.edition": "v1.7.3 Endüstriyel Sürüm",
  "cc.profile.accountEmail": "Hesap E-postası:",
  "cc.profile.planTier": "Plan Seviyesi:",
  "cc.profile.licenseKey": "Lisans Anahtarı:",
  "cc.profile.copyKey": "Anahtarı Kopyala",
  "cc.profile.onlineExpiry": "Çevrimiçi Bitiş / Yenileme:",
  "cc.profile.offlineCache": "Çevrimdışı Doğrulama Arabelleği:",
  "cc.profile.daysRemaining": "{0} tarihine kadar ({1} Gün Kaldı)",
  "cc.profile.activePro": "AKTİF (PRO)",
  "cc.profile.community": "COMMUNITY SÜRÜMÜ",
  "cc.profile.proEdition": "Pro Sürüm (Endüstriyel Ticari)",
  "cc.profile.freeEdition": "Community Ücretsiz Sürüm",
  "cc.profile.subRenews":
    "Aktif Abonelik (Bitiş / Yenileme: {0} — {1} Gün Kaldı)",
  "cc.profile.subActive": "Dodo Payments Pro Lisansı (Aktif / Doğrulanmış)",
  "cc.profile.subLifetime":
    "Ömür Boyu Pro Lisansı — Kalıcı ve Sınırsız Erişim",
  "cc.profile.subMonthlyActive":
    "Aktif Aylık Pro Aboneliği (Aylık otomatik yenileme — Portal üzerinden yönet)",
  "cc.profile.subAnnualActive":
    "Aktif Yıllık Pro Aboneliği (Yıllık otomatik yenileme — Portal üzerinden yönet)",
  "cc.profile.subNone": "Aktif Abonelik Yok",
  "cc.devices.title": "Aktif Cihaz Bağlantısı",
  "cc.devices.currentHost": "Geçerli Ana Bilgisayar:",
  "cc.devices.hwFingerprint": "Donanım Parmak İzi:",
  "cc.devices.slotUsage": "Yuva Kullanımı:",
  "cc.devices.activeCount": "{0} / {1} Cihaz",
  "cc.devices.unlicensed": "1 Cihaz (Lisanssız)",
  "cc.support.title": "Doğrudan Mühendislik Desteği",

  // Active Features & Diagnostics Control
  "cc.diagControl.title": "Sistemler ve Tanılama Yönetimi",
  "cc.diagControl.desc":
    "Tüm aktif eklenti alt sistemlerini izleyin ve KRL denetimlerini anında esnekçe yapılandırın",
  "cc.diagControl.btnValidate": "🧪 Tüm Projeyi Kontrol Et",
  "cc.diagControl.btnReport": "📊 Rapor Oluştur",
  "cc.diagControl.subsystemsTitle": "⚡ Aktif Alt Sistem Durumu:",
  "cc.subsystem.lsp": "LSP Dil Sunucusu",
  "cc.subsystem.indexer": "Proje Dizinleyici (Workspace)",
  "cc.subsystem.engine": "Tanılama Motoru",
  "cc.subsystem.flowchart": "Akış Şeması Analizörü",
  "cc.subsystem.backup": "KRC Yedek İnceleyici (.zip)",
  "cc.subsystem.eki": "EthernetKRL (EKI) Üretici",
  "cc.subsystem.telegram": "Telegram Mühendislik Köprüsü",
  "cc.subsystem.ci": "Test Paketi (CI Quality)",
  "cc.badge.online": "Çevrimiçi",
  "cc.badge.active": "Aktif",
  "cc.badge.disabled": "Devre Dışı",
  "cc.badge.ready": "Hazır",
  "cc.badge.connected": "Bağlı",
  "cc.diagControl.togglesTitle":
    "⚙️ İnce Ayar ve Tanılama Denetimlerini Geçici Devre Dışı Bırakma:",
  "cc.toggle.master.title": "⚡ KRL Tanılama Ana Şalteri",
  "cc.toggle.master.desc":
    "Düzenleyicideki tüm derleyici kontrollerini ve tanılama iletilerini aç/kapat",
  "cc.toggle.waitTimeout.title": "⏱️ WAIT FOR Zaman Aşımı Uyarısı",
  "cc.toggle.waitTimeout.desc":
    "WAIT FOR içinde açık zaman aşımı veya $TIMER yoksa uyar (varsayılan: kapalı)",
  "cc.toggle.halt.title": "🛑 HALT Komutu Uyarısı",
  "cc.toggle.halt.desc":
    "Robot programının HALT komutuyla durdurulması hakkında uyar",
  "cc.toggle.syntax.title": "🔍 KRL Sözdizimi Denetleyicisi",
  "cc.toggle.syntax.desc": "KUKA KSS 8.3–8.7 sözdizimine uygunluğu denetle",
  "cc.toggle.speeds.title": "🚀 Eksen Hız Sınırı Kontrolü ($VEL_PTP)",
  "cc.toggle.speeds.desc":
    "Tehlikeli aşırı eksen hızına karşı koru ($VEL_PTP > %100)",
  "cc.toggle.toolBase.title": "🎯 $TOOL ve $BASE Başlatma Kontrolü",
  "cc.toggle.toolBase.desc":
    "Önceden BAS(#INITMOV) çağrılmadan yapılan hareket komutlarını uyar",
  "cc.toggle.blockBalance.title": "⚖️ Blok Dengesi (IF, FOR, WHILE, LOOP)",
  "cc.toggle.blockBalance.desc":
    "KRL yapısal bloklarının eşleşmesini ve düzgün kapatılmasını kontrol et",
  "cc.toggle.deadCode.title": "🧟 Ölü / Erişilemeyen Kod Tespiti",
  "cc.toggle.deadCode.desc":
    "RETURN ve HALT sonrasındaki yürütülemeyen kod satırlarını tespit et",
  "cc.toggle.typeUsage.title": "🔢 Veri Türü Doğrulaması (SWITCH/CASE)",
  "cc.toggle.typeUsage.desc":
    "SWITCH ve CASE dallarında ondalıklı REAL sayıların kesin yasağı",
  "cc.toggle.krlConstraints.title":
    "🔤 KRL İsim Kısıtlamaları (24 karaktere kadar)",
  "cc.toggle.krlConstraints.desc":
    "KUKA tanımlayıcı uzunluk sınırını uygula (en fazla 24 karakter)",
  "cc.toggle.unusedVars.title": "🗑️ Kullanılmayan Değişkenleri Tespit Et",
  "cc.toggle.unusedVars.desc":
    "Tanımlanmış ancak hiçbir yerde kullanılmayan yerel değişkenleri vurgula",
  "cc.toggle.duplicateNames.title": "👥 Yinelenen İsim Kontrolü",
  "cc.toggle.duplicateNames.desc":
    "Aynı kapsamda aynı değişkenin tekrar tanımlanması durumunda uyar",
  "cc.toggle.inlayHints.title": "💡 Akıllı Satır İçi İpuçları (Inlay Hints)",
  "cc.toggle.inlayHints.desc":
    "$config.dat sinyal adlarını ve BAS parametrelerini doğrudan kodda göster",
  "cc.toggle.errorLens.title": "👓 Error Lens Tanılama Görünümü",
  "cc.toggle.errorLens.desc":
    "Anında kontrol için hata mesajlarını doğrudan satır sonlarında göster",
  "cc.toggle.validateNonAscii.title": "🌐 ASCII Olmayan ve Kiril Kontrolü",
  "cc.toggle.validateNonAscii.desc":
    "KRC derleyicisinin çökmesine neden olan Rusça/ASCII dışı harfleri tespit et",

  // Telegram & Remote Telepresence
  "chat.apply.noEditor": "Kodu eklemek için düzenleyicide bir dosya açın.",
  "chat.apply.success": "Kod uygulandı (Lütfen kaydetmeden önce kontrol edin).",
  "chat.sendSelection.noSelection": "Sohbete göndermek için kod seçin.",
  "chat.sendSelection.prompt": "Koda açıklama ekleyin (isteğe bağlı)",
  "chat.sendSelection.success": "Kod Telegram sohbetine gönderildi.",
  "chat.remote.logRequest": "Uzantı günlükleri dışa aktarma talebi",
  "chat.remote.exportRequest": "KRL projesi dışa aktarma talebi",
  "chat.remote.sysInfoRequest": "PC Sistem Bilgisi talebi",
  "chat.remote.aiDiagRequest": "KRL AI güvenlik teşhis talebi",
  "chat.remote.reportRequest": "KRL Proje Kalite ve Uygunluk Raporu talebi",
  "chat.remote.requestFrom": "Silvestr Liskin'den Talep:",
  "chat.remote.actionPrompt": "Telegram Desteği uzaktan işlem talep ediyor: {0}",
  "chat.remote.logsExported": "Onaylanan uzaktan /logs talebiyle günlükler dışa aktarıldı",
  "chat.remote.noWorkspace": "Açık çalışma alanı yok.",
  "chat.remote.fileNotFound": "{0} dosyası çalışma alanında bulunamadı.",
  "chat.remote.fileSent": "{0} dosyası gönderildi.",
  "chat.remote.fileReadError": "Dosya okunurken hata oluştu",
  "chat.remote.readFileAction": "Dosya okuma: {0}",
  "chat.remote.noActiveFile": "Aktif dosya yok",
  "chat.remote.sysInfoTitle": "Mühendis PC Sistem Bilgileri",
  "chat.remote.diagTitle": "AI KRL OTOMATİK TEŞHİS",
  "chat.remote.diagSummary": "Teşhis Sonuçları:",
  "chat.remote.diagNoIssues": "Güvenlik sorunu bulunamadı. KRL yapısı temiz.",

  // GitGraph Revision Graph & Timeline
  "gitgraph.title": "KRL Revizyon Grafiği ve Nokta Zaman Çizelgesi",
  "gitgraph.filter.all": "Tüm Commitler ({0})",
  "gitgraph.filter.dat": "Nokta Düzeltmeleri (.DAT)",
  "gitgraph.filter.src": "Mantık Değişiklikleri (.SRC)",
  "gitgraph.empty": "Çalışma alanında eşleşen KRL commiti bulunamadı.",
  "gitgraph.badge.points": "Nokta Düzeltme",
  "gitgraph.badge.logic": "Mantık Değişikliği",
  "gitgraph.search.placeholder":
    "Commit mesajı, yazar veya .DAT nokta adına göre ara...",
  "gitgraph.noGit.title": "Yerel Git Deposu Algılanmadı",
  "gitgraph.noGit.desc":
    "Bu KRL projesi henüz Git ile izlenmiyor. .DAT nokta düzeltmelerini ve robot programı revizyonlarını takip etmek için tek tıkla yerel bir depo başlatın.",
  "gitgraph.noGit.btnInit": "🚀 KRL için Yerel Git Başlat (Tek Tıkla)",
  "gitgraph.noGit.btnBackup": "📦 KRC ZIP Yedeği ile Karşılaştır",
  "gitgraph.notify.initSuccess":
    "Yerel Git deposu ilk KRL anlık görüntüsü ile başarıyla başlatıldı.",
  "gitgraph.notify.initError": "Git deposu başlatılamadı: {0}",
  "gitgraph.btn.copyHash": "Hash Kopyala",
  "gitgraph.btn.snapshot": "📸 Nokta Anlık Görüntüsü (.DAT)",
  "gitgraph.prompt.snapshot":
    "Nokta anlık görüntüsü için açıklama girin (örn: Yeniden öğretme sonrası nokta düzeltmesi):",
  "gitgraph.notify.snapshotSuccess":
    "Nokta anlık görüntüsü yerel Git geçmişine başarıyla işlendi.",
  "gitgraph.btn.fetch": "Uzak Değişiklikleri Al (Fetch)",
  "gitgraph.btn.pull": "Değişiklikleri Çek (Pull)",
  "gitgraph.btn.push": "Gönder (Push)",
  "gitgraph.details.title": "Commit Detayları",
  "gitgraph.details.files": "Değiştirilen Dosyalar",
  "gitgraph.details.diffParent": "Önceki ile Karşılaştır",
  "gitgraph.details.diffWorkspace": "Çalışma Alanı ile Karşılaştır",
  "gitgraph.details.checkout": "Commit'e Geç",
  "gitgraph.details.branchHere": "Buradan Dal Oluştur",
  "gitgraph.branch": "Dal",
  "gitgraph.remote": "Uzak Sunucu",
};


const es: Messages = {
  "info.checkingAllFiles": "Comprobando todos los archivos KRL en el espacio de trabajo...",
  "info.documentFormatted": "Documento KRL formateado correctamente.",
  "info.trailingWhitespaceRemoved": "Espacios en blanco al final de línea eliminados.",
  "info.noTrailingWhitespace": "No se encontraron espacios en blanco al final de línea.",
  "info.declarationsSorted": "Declaraciones KRL ordenadas correctamente.",
  "info.noDeclarationsToSort": "No se encontraron declaraciones para ordenar.",
  "info.noSystemVariablesFound": "No se encontraron variables de sistema de KUKA.",
  "warning.noActiveKrlFile": "No hay ningún archivo KRL activo (.src, .dat, .sub).",
  "warning.invalidGlobalUsage": "La palabra clave GLOBAL solo es válida en declaraciones de subrutinas o variables.",
  "error.serverNotRunning": "El servidor de lenguaje KUKA KRL no está en ejecución.",
  "prompt.foldRegionName": "Introduzca el nombre de la región ;FOLD",
  "prompt.foldRegionPlaceholder": "p. ej. Inicialización de pinzas",
  "picker.systemVariables": "Variables de sistema de KUKA",
  "picker.selectSystemVariable": "Seleccione una variable de sistema para insertar",
  "command.insertFold": "Insertar región FOLD",
  "command.insertFold.tooltip": "Envolver selección en región estándar KRL FOLD ... ENDFOLD",
  "command.removeTrailingWhitespace": "Eliminar espacios al final de línea",
  "command.removeTrailingWhitespace.tooltip": "Limpiar espacios en blanco al final de línea en todo el archivo",
  "command.renameSignal": "Renombrar señal (alias)",
  "command.renameSignal.tooltip": "Asignar o cambiar alias de señal $IN/$OUT",
  "command.viewFileHistory": "Historial del archivo KRL y comparación de revisiones",
  "command.viewFileHistory.tooltip": "Inspeccionar historial Git del programa KRL activo",
  "command.showLineBlameDetails": "Detalles del autor de la línea KRL (Git Blame)",
  "command.showLineBlameDetails.tooltip": "Quién, cuándo y en qué commit modificó la línea activa",
  "command.openControlCenter": "Abrir Centro de Control KUKA",
  "command.openControlCenter.tooltip": "Abrir el panel industrial de ingeniería KUKA",
  "command.calculator": "Calculadora de sistemas de coordenadas",
  "command.calculator.tooltip": "Calcular Euler A/B/C y matrices de Tool/Base",
  "command.cleanup": "Limpiar variables no utilizadas",
  "command.cleanup.tooltip": "Eliminar variables no referenciadas en archivos .dat",
  "command.formatDocument": "Dar formato al documento",
  "command.formatDocument.tooltip": "Formatear código KRL según estándares de KUKA",
  "command.sortDeclarations": "Ordenar declaraciones KRL",
  "command.sortDeclarations.tooltip": "Ordenar variables por tipo y nombre",
  "command.foldAll": "Contraer todos los FOLD",
  "command.foldAll.tooltip": "Plegar todas las regiones ;FOLD",
  "command.unfoldAll": "Expandir todos los FOLD",
  "command.unfoldAll.tooltip": "Desplegar todas las regiones ;FOLD",
  "command.refreshIOView": "Actualizar vista de E/S",
  "command.refreshIOView.tooltip": "Volver a escanear señales $IN y $OUT",
  "command.showFlowchart": "Mostrar gráfico de flujo de control",
  "command.showFlowchart.tooltip": "Generar diagrama de flujo AST interactivo",
  "command.compareKrcBackup": "Comparar copia de seguridad KRC",
  "command.compareKrcBackup.tooltip": "Comparar deltas de puntos con archivo KRC (.zip)",
  "command.openSnippetGenerator": "Generador de snippets KRL",
  "command.openSnippetGenerator.tooltip": "Generar patrones de movimiento y mensajes",
  "command.aiCheckSafety": "Verificación de seguridad y velocidad",
  "command.aiCheckSafety.tooltip": "Comprobar límites $VEL.CP y variables no inicializadas",
  "command.validateEkiXml": "Validar esquema XML de EKI",
  "command.validateEkiXml.tooltip": "Comprobar configuración de EthernetKRL",
  "command.generateEkiCode": "Generar controlador EthernetKRL",
  "command.generateEkiCode.tooltip": "Crear subrutinas KRL desde esquema XML de EKI",
  "command.cleanGitMetadata": "Limpiar metadatos Git de WorkVisual",
  "command.cleanGitMetadata.tooltip": "Limpiar metadatos de sincronización de WorkVisual",
  "command.generateReport": "Generar informe de aceptación",
  "command.generateReport.tooltip": "Crear informe de calidad y estándares de código KRL",
  "command.findReferences": "Buscar todas las referencias",
  "command.findReferences.tooltip": "Localizar todos los usos del símbolo seleccionado",
  "command.sendLogsToDeveloper": "Enviar registros de diagnóstico",
  "command.sendLogsToDeveloper.tooltip": "Enviar logs de depuración al soporte técnico",
  "command.sendFileToDeveloper": "Enviar archivo KRL a soporte",
  "command.sendFileToDeveloper.tooltip": "Compartir código con ingenieros de soporte",
  "command.openCustomerPortal": "Portal de clientes y facturación",
  "command.openCustomerPortal.tooltip": "Gestionar suscripción y licencias en Dodo Payments",
  "command.openTelegramChat": "Chat directo de soporte de ingeniería",
  "command.openTelegramChat.tooltip": "Contactar con soporte técnico de Liskin Labs",
  "command.validateWorkspace": "Verificar todos los archivos del proyecto",
  "command.validateWorkspace.tooltip": "Auditoría completa de sintaxis, tipos y seguridad en el espacio de trabajo",
  "command.exportBackupZip": "Descargar todo el proyecto (archivo ZIP)",
  "command.exportBackupZip.tooltip": "Empaquetar todo el proyecto KRL abierto en un archivo ZIP",
  "command.viewGitGraph": "Gráfico de revisiones de KRL y línea de puntos",
  "command.viewGitGraph.tooltip": "Línea de tiempo interactiva de cambios de lógica y puntos .DAT",
  "command.sendQualityReport": "Enviar pasaporte de calidad a Telegram",
  "command.sendQualityReport.tooltip": "Generar y transmitir informe de calidad del proyecto a Telegram",
  "category.diagnosticsQuality": "Diagnóstico y Calidad",
  "category.projectBackups": "Proyecto y Copias de Seguridad",
  "category.engineeringTools": "Herramientas de Ingeniería",
  "category.telepresenceSupport": "Telepresencia y Soporte",
  "category.activeEditorTools": "Herramientas del Editor Activo",
  "cc.refSection.title": "📖 Referencia de funciones del editor y atajos",
  "cc.refSection.desc": "Guía de atajos y funciones que operan directamente dentro de una ventana de edición .SRC / .DAT",
  "cc.engTools": "Herramientas de ingeniería",
  "cc.backupGit": "Copias de seguridad e inspección Git",
  "cc.refactorTools": "Refactorización y limpieza de código",
  "cc.safetyDiag": "Seguridad y diagnóstico industrial",
  "cc.accountHub": "Centro de cuenta y licencias",
  "cc.tab.profile": "Perfil de licencia",
  "cc.tab.devices": "Dispositivos activados",
  "cc.tab.billing": "Planes y facturación",
  "cc.tab.support": "Soporte de ingeniería",
  "cc.btn.openFlowchart": "Diagrama de flujo",
  "cc.btn.inspectBackup": "Comparar copia KRC",
  "cc.btn.generateSnippets": "Generador de snippets",
  "cc.btn.openCalculator": "Calculadora de marcos",
  "cc.btn.ekiValidator": "Validador EKI XML",
  "cc.btn.generateHandler": "Generador EKI",
  "cc.btn.cleanGitMetadata": "Limpiar metadatos Git",
  "cc.btn.runSafetyCheck": "Comprobar seguridad",
  "cc.btn.generateReport": "Informe de aceptación",
  "cc.btn.viewGitGraph": "Gráfico de revisiones",
  "cc.btn.exportBackupZip": "Exportar ZIP KRC",
  "cc.btn.cleanupVars": "Limpiar variables",
  "cc.btn.sortDeclarations": "Ordenar declaraciones",
  "cc.btn.modernizeFold": "Modernizar FOLDs",
  "cc.btn.collisionGuard": "Insertar CollisionGuard",
  "cc.btn.formatDoc": "Formatear documento",
  "cc.btn.openTelegramChat": "Chat de ingeniería",
  "cc.desc.flowchart": "Gráfico de flujo interactivo desde AST",
  "cc.desc.calculator": "Cálculo de Base y Tool por 3 puntos",
  "cc.desc.snippets": "Generación de movimientos y paletizado",
  "cc.desc.eki": "Validación de esquemas XML EthernetKRL",
  "cc.desc.backupDiff": "Inspección de deltas de coordenadas E6POS",
  "cc.desc.gitGraph": "Línea de tiempo visual de cambios de puntos",
  "cc.desc.exportZip": "Empaquetar código para SmartPAD",
  "cc.desc.cleanGit": "Eliminar marcas temporales de WorkVisual",
  "cc.desc.deadCode": "Eliminar variables no utilizadas en .dat",
  "cc.desc.sortDecl": "Organizar encabezados y declaraciones",
  "cc.desc.modernFold": "Convertir a Splines modernos (KSS 8.6+)",
  "cc.desc.collisionGuard": "Añadir envoltura de par motor",
  "cc.desc.safety": "Límites de velocidad $VEL.CP y variables",
  "cc.desc.report": "Exportar informe de calidad de código",
  "flow.err.unreachable": "Código inalcanzable detectado",
  "flow.err.infiniteLoop": "Bucle infinito potencial sin condición de salida",
  "flow.err.emptyBranch": "Rama condicional vacía (THEN / ELSE)",
  "flow.err.invalidGoto": "Salto GOTO a etiqueta inexistente",
  "flow.err.uninitMotion": "Instrucción de movimiento sin punto inicial definido",
  "flow.msg.emptyBranch": "Rama vacía detectada en la línea {0}",
  "flow.msg.infiniteLoop": "Bucle infinito detectado en la línea {0}",
  "flow.msg.unreachableMotion": "Movimiento inalcanzable en la línea {0}",
  "flow.msg.unreachableCode": "Código inalcanzable en la línea {0}",
  "flow.msg.uninitMotion": "Punto de movimiento no inicializado en la línea {0}",
  "flow.msg.invalidGoto": "Salto GOTO inválido a la etiqueta '{0}'",
  "flow.ui.zoomOut": "Alejar (-)",
  "flow.ui.zoomReset": "Restablecer zoom",
  "flow.ui.zoomIn": "Acercar (+)",
  "flow.ui.downloadSvg": "Descargar SVG",
  "flow.ui.downloadTitle": "Guardar diagrama como archivo SVG vectorial",
  "flow.ui.toggleDetailed": "Alternar vista detallada",
  "flow.ui.detailedOn": "Detalle: Activado",
  "flow.ui.detailedOff": "Detalle: Desactivado",
  "flow.ui.mainProgram": "Programa principal",
  "flow.ui.logicErrors": "Errores lógicos detectados ({0})",
  "flow.ui.noErrors": "No se detectaron errores lógicos en el flujo",
  "flow.ui.line": "Línea",
  "safety.notify.safe": "✓ Verificación de seguridad KUKA: No se detectaron violaciones de límites de velocidad ni errores críticos.",
  "safety.error.violations": "Se detectaron {0} problemas de seguridad o límites excedidos en el archivo KRL.",
  "safety.alert.critical": "CRÍTICO: Límite de velocidad $VEL.CP excedido ({0} m/s > 2.0 m/s estándar).",
  "safety.alert.warning": "ADVERTENCIA: Posible riesgo de colisión o punto no comprobado en la línea {0}.",
  "eki.notify.valid": "✓ Esquema XML EthernetKRL válido y conforme a las especificaciones de KUKA KSS.",
  "eki.error.title": "Error de validación del esquema XML EthernetKRL",
  "eki.prompt.channelName": "Introduzca el nombre del canal EthernetKRL",
  "eki.picker.selectXml": "Seleccione el archivo de configuración XML de EKI",
  "eki.warning.notXml": "El archivo seleccionado no tiene extensión .xml válida.",
  "eki.btn.generate": "Generar subrutina KRL",
  "eki.btn.select": "Seleccionar archivo XML",
  "snippet.title": "Generador de snippets y código KRL",
  "snippet.tab.message": "Mensajes KUKA",
  "snippet.tab.grid": "Patrón de paletizado",
  "snippet.tab.motion": "Movimientos KRL",
  "snippet.msg.title": "Generador de mensajes de diálogo",
  "snippet.msg.desc": "Generar llamadas KRL MsgNotify, MsgQuit, MsgState o MsgWait",
  "snippet.msg.type": "Tipo de mensaje",
  "snippet.msg.type.notify": "MsgNotify (Notificación)",
  "snippet.msg.type.quit": "MsgQuit (Confirmación)",
  "snippet.msg.type.state": "MsgState (Estado de señal)",
  "snippet.msg.type.wait": "MsgWait (Espera condicional)",
  "snippet.msg.key": "Clave del mensaje",
  "snippet.msg.key.placeholder": "p. ej. PiezaLista",
  "snippet.msg.text": "Texto del mensaje",
  "snippet.msg.text.placeholder": "p. ej. Robot listo para ciclo automático",
  "snippet.msg.param1": "Parámetro 1 (opcional)",
  "snippet.msg.param1.placeholder": "p. ej. Número de nido",
  "snippet.insert": "Insertar en el editor",
  "snippet.grid.title": "Cálculo de matriz de paletizado",
  "snippet.grid.desc": "Generar bucles anidados para paletizado 2D/3D con offsets en Base",
  "snippet.grid.base": "Variable de Base ($BASE)",
  "snippet.grid.rows": "Número de filas (Eje X)",
  "snippet.grid.cols": "Número de columnas (Eje Y)",
  "snippet.grid.spaceX": "Paso en X (mm)",
  "snippet.grid.spaceY": "Paso en Y (mm)",
  "snippet.mot.title": "Generador de instrucciones de movimiento",
  "snippet.mot.desc": "Generar comandos de movimiento estándar y Spline con aproximación",
  "snippet.mot.type": "Tipo de movimiento",
  "snippet.mot.point": "Nombre del punto / Frame",
  "snippet.mot.vel": "Velocidad (%)",
  "snippet.mot.approx": "Aproximación (C_PTP / C_DIS)",
  "snippet.mot.approx.none": "Precisión exacta (Sin aproximación)",
  "snippet.alert.inserted": "Snippet KRL insertado correctamente.",
  "snippet.alert.noEditor": "Abra un archivo .src para insertar código KRL.",
  "snippet.desc.ptp": "PTP: Movimiento punto a punto más rápido",
  "snippet.desc.lin": "LIN: Trayectoria lineal cartesiana en espacio de trabajo",
  "snippet.desc.circ": "CIRC: Movimiento circular a través de punto auxiliar",
  "snippet.desc.sptp": "SPTP: Movimiento PTP Spline optimizado en trayectoria",
  "snippet.desc.slin": "SLIN: Movimiento lineal Spline con velocidad de orientación constante",
  "snippet.desc.scirc": "SCIRC: Movimiento circular Spline continuo",
  "snippet.desc.splineBlock": "SPLINE: Bloque de interpolación polinómica suave continua",
  "cc.prompt.telegram": "Escriba su mensaje para el soporte técnico de Liskin Labs",
  "cc.prompt.telegram.placeholder": "Describa el problema o consulta técnica...",
  "cc.notify.telegramSent": "✓ Mensaje enviado correctamente al canal de soporte.",
  "cc.notify.telegramFallback": "No se pudo conectar al servidor de mensajería en la nube.",
  "cc.billing.title": "Licencias y suscripciones KUKA KRL Professional",
  "cc.billing.desc": "Gestione activaciones de estaciones de trabajo, facturas y licencias perpetuas.",
  "cc.billing.btn.portal": "Abrir portal de cliente",
  "cc.billing.btn.invoice": "Descargar facturas",
  "cc.billing.plansTitle": "Planes profesionales disponibles",
  "cc.billing.btn.buyPlan": "Comprar licencia",
  "cc.billing.legalNotice": "Procesamiento de pagos seguro y autorizado por Dodo Payments.",
  "cc.billing.legalItem1": "Activación inmediata mediante clave de licencia",
  "cc.billing.legalItem2": "Búfer sin conexión de 30 días para puestos de trabajo en planta",
  "cc.billing.legalItem3": "Soporte prioritario de ingenieros de robótica",
  "cc.support.desc": "Comuníquese directamente con nuestros ingenieros especialistas en robótica KUKA.",
  "cc.support.btn.chat": "Iniciar chat de soporte",
  "cc.support.btn.sendLogs": "Enviar registros de diagnóstico",
  "cc.support.btn.sendFile": "Enviar archivo de código KRL",
  "cc.support.btn.github": "Reportar problema en GitHub",
  "cc.support.btn.email": "Enviar correo electrónico",
  "cc.profile.deactivate": "Desactivar este equipo",
  "cc.profile.checkStatus": "Comprobar estado",
  "cc.profile.activateKey": "Activar clave Pro",
  "cc.profile.buyPro": "Adquirir licencia Pro",
  "cc.devices.deactivatePc": "Liberar puesto de trabajo",
  "cc.devices.syncStatus": "Sincronizar dispositivos",
  "cc.notify.portalOpened": "Abriendo portal de clientes en el navegador...",
  "cc.notify.storeOpened": "Abriendo tienda oficial de licencias...",
  "cc.notify.keyCopied": "Clave copiada al portapapeles.",
  "cc.notify.emailClientOpened": "Abriendo cliente de correo electrónico...",
  "cc.prompt.email": "Correo electrónico de contacto",
  "cc.prompt.emailPlaceholder": "ingeniero@empresa.com",
  "license.warning.premiumOnly": "Esta función requiere una licencia KUKA KRL Professional activa.",
  "license.btn.buy": "Comprar licencia Pro",
  "license.btn.enterKey": "license.btn.enterKey",
  "license.prompt.key": "license.prompt.key",
  "license.placeholder.key": "license.placeholder.key",
  "license.progress.activating": "license.progress.activating",
  "license.notify.leadActivated": "license.notify.leadActivated",
  "license.notify.activated": "license.notify.activated",
  "license.notify.uriActivated": "license.notify.uriActivated",
  "license.error.activate": "license.error.activate",
  "license.error.network": "Error de comunicación con el servidor de licencias. Verifique la conexión a internet.",
  "license.info.noKey": "license.info.noKey",
  "license.confirm.deactivate": "license.confirm.deactivate",
  "license.btn.yes": "license.btn.yes",
  "license.btn.no": "license.btn.no",
  "license.progress.deactivating": "license.progress.deactivating",
  "license.notify.deactivated": "Licencia desactivada correctamente en esta estación de trabajo.",
  "license.info.freeEdition": "license.info.freeEdition",
  "license.info.activePro": "license.info.activePro",
  "license.warning.expired": "license.warning.expired",
  "license.warning.offlineExpiring": "license.warning.offlineExpiring",
  "license.warning.offlineExpired": "license.warning.offlineExpired",
  "license.error.revoked": "license.error.revoked",
  "chat.title": "chat.title",
  "chat.session": "chat.session",
  "chat.session.tooltip": "chat.session.tooltip",
  "chat.btn.new": "chat.btn.new",
  "chat.btn.new.tooltip": "chat.btn.new.tooltip",
  "chat.btn.file": "chat.btn.file",
  "chat.btn.file.tooltip": "chat.btn.file.tooltip",
  "chat.btn.logs": "chat.btn.logs",
  "chat.btn.logs.tooltip": "chat.btn.logs.tooltip",
  "chat.btn.delete": "chat.btn.delete",
  "chat.btn.delete.tooltip": "chat.btn.delete.tooltip",
  "chat.input.placeholder": "chat.input.placeholder",
  "chat.btn.send": "chat.btn.send",
  "chat.btn.reply": "chat.btn.reply",
  "chat.confirm.deleteSession": "chat.confirm.deleteSession",
  "chat.confirm.deleteAllSessions": "chat.confirm.deleteAllSessions",
  "chat.notify.newSession": "chat.notify.newSession",
  "chat.notify.sessionDeleted": "chat.notify.sessionDeleted",
  "chat.notify.allSessionsDeleted": "chat.notify.allSessionsDeleted",
  "chat.notify.logsSent": "chat.notify.logsSent",
  "chat.notify.filePickLabel": "chat.notify.filePickLabel",
  "chat.notify.fileSent": "chat.notify.fileSent",
  "chat.notify.fileNotFound": "chat.notify.fileNotFound",
  "chat.notify.devNotConnected": "chat.notify.devNotConnected",
  "chat.notify.devMessage": "chat.notify.devMessage",
  "chat.empty.title": "chat.empty.title",
  "chat.empty.desc": "chat.empty.desc",
  "chat.session.label": "chat.session.label",
  "chat.msg.count": "chat.msg.count",
  "chat.sender.user": "chat.sender.user",
  "chat.sender.dev": "chat.sender.dev",
  "chat.status.delivered": "chat.status.delivered",
  "chat.topic.label": "chat.topic.label",
  "chat.topic.placeholder": "chat.topic.placeholder",
  "chat.topic.chip.bug": "chat.topic.chip.bug",
  "chat.topic.chip.eki": "chat.topic.chip.eki",
  "chat.topic.chip.motion": "chat.topic.chip.motion",
  "chat.topic.chip.safety": "chat.topic.chip.safety",
  "chat.topic.chip.license": "chat.topic.chip.license",
  "chat.prompt.sessionTitle": "chat.prompt.sessionTitle",
  "chat.prompt.sessionTitlePlaceholder": "chat.prompt.sessionTitlePlaceholder",
  "chat.prompt.renameTopic": "chat.prompt.renameTopic",
  "chat.notify.newSessionWithTopic": "chat.notify.newSessionWithTopic",
  "chat.notify.topicUpdated": "chat.notify.topicUpdated",
  "chat.btn.renameTopic": "chat.btn.renameTopic",
  "chat.btn.renameTopic.tooltip": "chat.btn.renameTopic.tooltip",
  "chat.consent.remoteAction": "chat.consent.remoteAction",
  "chat.consent.actionLogs": "chat.consent.actionLogs",
  "chat.consent.actionProject": "chat.consent.actionProject",
  "chat.consent.actionSysinfo": "chat.consent.actionSysinfo",
  "backup.picker.title": "backup.picker.title",
  "backup.error.notFound": "backup.error.notFound",
  "backup.notify.identical": "backup.notify.identical",
  "backup.warning.differences": "backup.warning.differences",
  "flow.title": "flow.title",
  "flow.notify.saved": "flow.notify.saved",
  "flow.error.noDef": "flow.error.noDef",
  "flow.error.analyze": "flow.error.analyze",
  "eki.error.readFailed": "eki.error.readFailed",
  "chat.warning.noWorkspace": "chat.warning.noWorkspace",
  "chat.warning.noKrlFiles": "chat.warning.noKrlFiles",
  "chat.warning.noEditorOpen": "chat.warning.noEditorOpen",
  "chat.error.exportFailed": "chat.error.exportFailed",
  "chat.error.aiDiagFailed": "chat.error.aiDiagFailed",
  "chat.error.logCaptureFailed": "chat.error.logCaptureFailed",
  "io.view.empty": "io.view.empty",
  "io.line": "io.line",
  "io.uses": "io.uses",
  "io.signals": "io.signals",
  "io.rename.prompt": "io.rename.prompt",
  "io.rename.placeholder": "io.rename.placeholder",
  "io.rename.invalid": "io.rename.invalid",
  "io.rename.noConfig": "io.rename.noConfig",
  "io.rename.pickConfig": "io.rename.pickConfig",
  "io.rename.updated": "io.rename.updated",
  "io.rename.failed": "io.rename.failed",
  "report.title": "report.title",
  "report.date": "report.date",
  "report.totalFiles": "report.totalFiles",
  "report.totalIssues": "report.totalIssues",
  "report.summary": "report.summary",
  "report.errors": "report.errors",
  "report.warnings": "report.warnings",
  "report.info": "report.info",
  "report.hints": "report.hints",
  "report.details": "report.details",
  "report.noIssues": "report.noIssues",
  "report.line": "report.line",
  "cleanup.notify.allUsed": "cleanup.notify.allUsed",
  "cleanup.picker.foldDetail": "cleanup.picker.foldDetail",
  "cleanup.picker.varDetail": "cleanup.picker.varDetail",
  "cleanup.picker.selectPlaceholder": "cleanup.picker.selectPlaceholder",
  "cleanup.action.deleteLabel": "cleanup.action.deleteLabel",
  "cleanup.action.deleteDesc": "cleanup.action.deleteDesc",
  "cleanup.action.commentLabel": "cleanup.action.commentLabel",
  "cleanup.action.commentDesc": "cleanup.action.commentDesc",
  "cleanup.action.placeholder": "cleanup.action.placeholder",
  "cleanup.notify.success": "cleanup.notify.success",
  "cleanup.word.deleted": "cleanup.word.deleted",
  "cleanup.word.commented": "cleanup.word.commented",
  "command.convertToIiqkaFold": "command.convertToIiqkaFold",
  "command.convertToIiqkaFold.tooltip": "command.convertToIiqkaFold.tooltip",
  "command.convertLegacyToSpline": "command.convertLegacyToSpline",
  "command.convertLegacyToSpline.tooltip": "command.convertLegacyToSpline.tooltip",
  "command.unwrapFold": "command.unwrapFold",
  "command.unwrapFold.tooltip": "command.unwrapFold.tooltip",
  "command.insertCollisionGuard": "command.insertCollisionGuard",
  "command.insertCollisionGuard.tooltip": "command.insertCollisionGuard.tooltip",
  "command.insertSplineBlock": "command.insertSplineBlock",
  "command.insertSplineBlock.tooltip": "command.insertSplineBlock.tooltip",
  "fold.notify.noSelection": "fold.notify.noSelection",
  "fold.notify.iiqkaSuccess": "fold.notify.iiqkaSuccess",
  "fold.notify.noLegacyMotions": "fold.notify.noLegacyMotions",
  "fold.notify.splineSuccess": "fold.notify.splineSuccess",
  "fold.notify.noFoldsFound": "fold.notify.noFoldsFound",
  "fold.notify.unwrapped": "fold.notify.unwrapped",
  "fold.notify.collisionGuard": "fold.notify.collisionGuard",
  "fold.prompt.splineVel": "fold.prompt.splineVel",
  "fold.notify.splineBlockCreated": "fold.notify.splineBlockCreated",
  "plan.monthly.name": "plan.monthly.name",
  "plan.monthly.period": "plan.monthly.period",
  "plan.monthly.desc": "plan.monthly.desc",
  "plan.annual.name": "plan.annual.name",
  "plan.annual.period": "plan.annual.period",
  "plan.annual.desc": "plan.annual.desc",
  "plan.lifetime.name": "plan.lifetime.name",
  "plan.lifetime.period": "plan.lifetime.period",
  "plan.lifetime.desc": "plan.lifetime.desc",
  "cc.title": "cc.title",
  "cc.edition": "cc.edition",
  "cc.profile.accountEmail": "cc.profile.accountEmail",
  "cc.profile.planTier": "cc.profile.planTier",
  "cc.profile.licenseKey": "cc.profile.licenseKey",
  "cc.profile.copyKey": "cc.profile.copyKey",
  "cc.profile.onlineExpiry": "cc.profile.onlineExpiry",
  "cc.profile.offlineCache": "cc.profile.offlineCache",
  "cc.profile.daysRemaining": "cc.profile.daysRemaining",
  "cc.profile.activePro": "cc.profile.activePro",
  "cc.profile.community": "cc.profile.community",
  "cc.profile.proEdition": "cc.profile.proEdition",
  "cc.profile.freeEdition": "cc.profile.freeEdition",
  "cc.profile.subRenews": "cc.profile.subRenews",
  "cc.profile.subActive": "cc.profile.subActive",
  "cc.profile.subLifetime": "cc.profile.subLifetime",
  "cc.profile.subMonthlyActive": "cc.profile.subMonthlyActive",
  "cc.profile.subAnnualActive": "cc.profile.subAnnualActive",
  "cc.profile.subNone": "cc.profile.subNone",
  "cc.devices.title": "cc.devices.title",
  "cc.devices.currentHost": "cc.devices.currentHost",
  "cc.devices.hwFingerprint": "cc.devices.hwFingerprint",
  "cc.devices.slotUsage": "cc.devices.slotUsage",
  "cc.devices.activeCount": "cc.devices.activeCount",
  "cc.devices.unlicensed": "cc.devices.unlicensed",
  "cc.support.title": "Soporte Técnico Directo",

  // Active Features & Diagnostics Control
  "cc.diagControl.title": "Control de Sistemas y Diagnóstico",
  "cc.diagControl.desc":
    "Supervise subsistemas activos y configure dinámicamente las reglas KRL",
  "cc.diagControl.btnValidate": "🧪 Comprobar Todo el Proyecto",
  "cc.diagControl.btnReport": "📊 Generar Informe",
  "cc.diagControl.subsystemsTitle": "⚡ Estado de Subsistemas Activos:",
  "cc.subsystem.lsp": "Servidor de Lenguaje LSP",
  "cc.subsystem.indexer": "Indexador del Proyecto (Workspace)",
  "cc.subsystem.engine": "Motor de Diagnóstico",
  "cc.subsystem.flowchart": "Analizador de Diagrama de Flujo",
  "cc.subsystem.backup": "Inspector de Copias de Seguridad KRC (.zip)",
  "cc.subsystem.eki": "Generador EthernetKRL (EKI)",
  "cc.subsystem.telegram": "Puente de Ingeniería Telegram",
  "cc.subsystem.ci": "Conjunto de Pruebas (CI Quality)",
  "cc.badge.online": "En línea",
  "cc.badge.active": "Activo",
  "cc.badge.disabled": "Desactivado",
  "cc.badge.ready": "Listo",
  "cc.badge.connected": "Conectado",
  "cc.diagControl.togglesTitle":
    "⚙️ Ajuste Fino y Desactivación Temporal de Reglas:",
  "cc.toggle.master.title": "⚡ Interruptor Maestro de Diagnóstico KRL",
  "cc.toggle.master.desc":
    "Activar o desactivar comprobaciones del compilador en el editor",
  "cc.toggle.waitTimeout.title": "⏱️ Aviso de Tiempo de Espera WAIT FOR",
  "cc.toggle.waitTimeout.desc":
    "Avisar si WAIT FOR no tiene temporizador $TIMER (desactivado por defecto)",
  "cc.toggle.halt.title": "🛑 Aviso de Operador HALT",
  "cc.toggle.halt.desc":
    "Avisar sobre la detención del robot mediante instrucción HALT",
  "cc.toggle.syntax.title": "🔍 Validador de Sintaxis KRL",
  "cc.toggle.syntax.desc":
    "Verificar cumplimiento de sintaxis KUKA KSS 8.3–8.7",
  "cc.toggle.speeds.title": "🚀 Límite de Velocidad de Seguridad ($VEL_PTP)",
  "cc.toggle.speeds.desc":
    "Proteger contra exceso peligroso de velocidad ($VEL_PTP > 100%)",
  "cc.toggle.toolBase.title": "🎯 Comprobación de Inicio $TOOL y $BASE",
  "cc.toggle.toolBase.desc":
    "Avisar de movimientos sin llamada previa a BAS(#INITMOV)",
  "cc.toggle.blockBalance.title": "⚖️ Balance de Bloques (IF, FOR, WHILE, LOOP)",
  "cc.toggle.blockBalance.desc":
    "Verificar cierre correcto de bloques estructurales de KRL",
  "cc.toggle.deadCode.title": "🧟 Detección de Código Muerto / Inaccesible",
  "cc.toggle.deadCode.desc":
    "Identificar instrucciones inalcanzables tras RETURN y HALT",
  "cc.toggle.typeUsage.title": "🔢 Validación de Tipos de Datos (SWITCH/CASE)",
  "cc.toggle.typeUsage.desc":
    "Prohibición de números reales (REAL) en SWITCH y ramas CASE",
  "cc.toggle.krlConstraints.title":
    "🔤 Restricciones de Nombres KRL (Hasta 24 caracteres)",
  "cc.toggle.krlConstraints.desc":
    "Aplicar límite de 24 caracteres para identificadores KUKA",
  "cc.toggle.unusedVars.title": "🗑️ Detección de Variables No Utilizadas",
  "cc.toggle.unusedVars.desc":
    "Resaltar variables locales declaradas pero no usadas",
  "cc.toggle.duplicateNames.title": "👥 Detección de Nombres Duplicados",
  "cc.toggle.duplicateNames.desc":
    "Avisar de declaraciones duplicadas de variables en el mismo ámbito",
  "cc.toggle.inlayHints.title": "💡 Sugerencias Inteligentes (Inlay Hints)",
  "cc.toggle.inlayHints.desc":
    "Mostrar nombres de señales de $config.dat en líneas $OUT/$IN y BAS",
  "cc.toggle.errorLens.title": "👓 Diagnóstico Error Lens",
  "cc.toggle.errorLens.desc":
    "Mostrar mensajes de error al final de la línea de código",
  "cc.toggle.validateNonAscii.title": "🌐 Control de Caracteres No ASCII y Cirílico",
  "cc.toggle.validateNonAscii.desc":
    "Detectar caracteres no ASCII que provocan fallos en KRC",
  "chat.apply.noEditor": "chat.apply.noEditor",
  "chat.apply.success": "chat.apply.success",
  "chat.sendSelection.noSelection": "chat.sendSelection.noSelection",
  "chat.sendSelection.prompt": "chat.sendSelection.prompt",
  "chat.sendSelection.success": "chat.sendSelection.success",
  "chat.remote.logRequest": "chat.remote.logRequest",
  "chat.remote.exportRequest": "chat.remote.exportRequest",
  "chat.remote.sysInfoRequest": "chat.remote.sysInfoRequest",
  "chat.remote.aiDiagRequest": "chat.remote.aiDiagRequest",
  "chat.remote.reportRequest": "Solicitud de informe de calidad del proyecto KRL",
  "chat.remote.requestFrom": "chat.remote.requestFrom",
  "chat.remote.actionPrompt": "chat.remote.actionPrompt",
  "chat.remote.logsExported": "chat.remote.logsExported",
  "chat.remote.noWorkspace": "chat.remote.noWorkspace",
  "chat.remote.fileNotFound": "chat.remote.fileNotFound",
  "chat.remote.fileSent": "chat.remote.fileSent",
  "chat.remote.fileReadError": "chat.remote.fileReadError",
  "chat.remote.readFileAction": "chat.remote.readFileAction",
  "chat.remote.noActiveFile": "chat.remote.noActiveFile",
  "chat.remote.sysInfoTitle": "chat.remote.sysInfoTitle",
  "chat.remote.diagTitle": "chat.remote.diagTitle",
  "chat.remote.diagSummary": "chat.remote.diagSummary",
  "chat.remote.diagNoIssues": "chat.remote.diagNoIssues",
  "gitgraph.title": "Línea de tiempo de cambios de puntos y revisiones KRL",
  "gitgraph.filter.all": "gitgraph.filter.all",
  "gitgraph.filter.dat": "gitgraph.filter.dat",
  "gitgraph.filter.src": "gitgraph.filter.src",
  "gitgraph.empty": "gitgraph.empty",
  "gitgraph.badge.points": "gitgraph.badge.points",
  "gitgraph.badge.logic": "gitgraph.badge.logic",
  "gitgraph.search.placeholder": "gitgraph.search.placeholder",
  "gitgraph.noGit.title": "gitgraph.noGit.title",
  "gitgraph.noGit.desc": "gitgraph.noGit.desc",
  "gitgraph.noGit.btnInit": "gitgraph.noGit.btnInit",
  "gitgraph.noGit.btnBackup": "gitgraph.noGit.btnBackup",
  "gitgraph.notify.initSuccess": "gitgraph.notify.initSuccess",
  "gitgraph.notify.initError": "gitgraph.notify.initError",
  "gitgraph.btn.copyHash": "gitgraph.btn.copyHash",
  "gitgraph.btn.snapshot": "gitgraph.btn.snapshot",
  "gitgraph.prompt.snapshot": "gitgraph.prompt.snapshot",
  "gitgraph.notify.snapshotSuccess": "gitgraph.notify.snapshotSuccess",
  "gitgraph.btn.fetch": "gitgraph.btn.fetch",
  "gitgraph.btn.pull": "gitgraph.btn.pull",
  "gitgraph.btn.push": "gitgraph.btn.push",
  "gitgraph.details.title": "gitgraph.details.title",
  "gitgraph.details.files": "Archivos modificados",
  "gitgraph.details.diffParent": "Comparar con versión anterior",
  "gitgraph.details.diffWorkspace": "Comparar con espacio de trabajo",
  "gitgraph.details.checkout": "Cambiar a este commit",
  "gitgraph.details.branchHere": "Crear rama desde aquí",
  "gitgraph.branch": "Rama",
  "gitgraph.remote": "Servidor remoto",
};


const locales: Record<Locale, Messages> = { en, ru, tr, es };

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
