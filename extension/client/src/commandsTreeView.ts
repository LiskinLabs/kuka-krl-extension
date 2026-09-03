import * as vscode from "vscode";
import { t } from "./i18n";

export class CommandsTreeProvider
  implements vscode.TreeDataProvider<CommandItem>
{
  private _onDidChangeTreeData: vscode.EventEmitter<
    CommandItem | undefined | null | void
  > = new vscode.EventEmitter<CommandItem | undefined | null | void>();
  readonly onDidChangeTreeData: vscode.Event<
    CommandItem | undefined | null | void
  > = this._onDidChangeTreeData.event;

  refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: CommandItem): vscode.TreeItem {
    return element;
  }

  getChildren(): Thenable<CommandItem[]> {
    return Promise.resolve(this.getCommands());
  }

  private getCommands(): CommandItem[] {
    return [
      new CommandItem(
        t("command.openControlCenter"),
        "krl.openControlCenter",
        "dashboard",
        t("command.openControlCenter.tooltip"),
      ),
      new CommandItem(
        t("command.validateWorkspace"),
        "krl.validateWorkspace",
        "check-all",
        t("command.validateWorkspace.tooltip"),
      ),
      new CommandItem(
        t("command.generateReport"),
        "krl.generateReport",
        "report",
        t("command.generateReport.tooltip"),
      ),
      new CommandItem(
        t("command.showFlowchart"),
        "krl.showFlowchart",
        "git-merge",
        t("command.showFlowchart.tooltip"),
      ),
      new CommandItem(
        t("command.compareKrcBackup"),
        "krl.compareKrcBackup",
        "diff",
        t("command.compareKrcBackup.tooltip"),
      ),
      new CommandItem(
        t("command.viewGitGraph"),
        "krl.viewGitGraph",
        "source-control",
        t("command.viewGitGraph.tooltip"),
      ),
      new CommandItem(
        t("command.exportBackupZip"),
        "krl.exportBackupZip",
        "archive",
        t("command.exportBackupZip.tooltip"),
      ),
      new CommandItem(
        t("command.calculator"),
        "krl.showCalculator",
        "symbol-numeric",
        t("command.calculator.tooltip"),
      ),
      new CommandItem(
        t("command.openSnippetGenerator"),
        "krl.openSnippetGenerator",
        "beaker",
        t("command.openSnippetGenerator.tooltip"),
      ),
      new CommandItem(
        t("command.validateEkiXml"),
        "krl.validateEkiXml",
        "file-code",
        t("command.validateEkiXml.tooltip"),
      ),
      new CommandItem(
        t("command.generateEkiCode"),
        "krl.generateEkiCode",
        "symbol-interface",
        t("command.generateEkiCode.tooltip"),
      ),
      new CommandItem(
        t("command.formatDocument"),
        "krl.formatDocument",
        "code",
        t("command.formatDocument.tooltip"),
      ),
      new CommandItem(
        t("command.cleanGitMetadata"),
        "krl.cleanGitMetadata",
        "clear-all",
        t("command.cleanGitMetadata.tooltip"),
      ),
      new CommandItem(
        t("command.sortDeclarations"),
        "krl.sortDeclarations",
        "list-ordered",
        t("command.sortDeclarations.tooltip"),
      ),
      new CommandItem(
        t("command.cleanup"),
        "krl.cleanupUnusedVariables",
        "trash",
        t("command.cleanup.tooltip"),
      ),
      new CommandItem(
        t("command.aiCheckSafety"),
        "krl.aiCheckSafety",
        "shield",
        t("command.aiCheckSafety.tooltip"),
      ),
      new CommandItem(
        t("command.findReferences"),
        "krl.findReferences",
        "references",
        t("command.findReferences.tooltip"),
      ),
      new CommandItem(
        t("command.insertFold"),
        "krl.insertFold",
        "symbol-namespace",
        t("command.insertFold.tooltip"),
      ),
      new CommandItem(
        t("command.unwrapFold"),
        "krl.unwrapFold",
        "unfold",
        t("command.unwrapFold.tooltip"),
      ),
      new CommandItem(
        t("command.foldAll"),
        "krl.foldAll",
        "fold",
        t("command.foldAll.tooltip"),
      ),
      new CommandItem(
        t("command.unfoldAll"),
        "krl.unfoldAll",
        "unfold",
        t("command.unfoldAll.tooltip"),
      ),
      new CommandItem(
        t("command.convertToIiqkaFold"),
        "krl.convertToIiqkaFold",
        "fold",
        t("command.convertToIiqkaFold.tooltip"),
      ),
      new CommandItem(
        t("command.convertLegacyToSpline"),
        "krl.convertLegacyToSpline",
        "pulse",
        t("command.convertLegacyToSpline.tooltip"),
      ),
      new CommandItem(
        t("command.insertSplineBlock"),
        "krl.insertSplineBlock",
        "symbol-misc",
        t("command.insertSplineBlock.tooltip"),
      ),
      new CommandItem(
        t("command.insertCollisionGuard"),
        "krl.insertCollisionGuard",
        "shield",
        t("command.insertCollisionGuard.tooltip"),
      ),
      new CommandItem(
        t("command.removeTrailingWhitespace"),
        "krl.removeTrailingWhitespace",
        "whitespace",
        t("command.removeTrailingWhitespace.tooltip"),
      ),
      new CommandItem(
        t("command.renameSignal"),
        "krl.renameSignal",
        "edit",
        t("command.renameSignal.tooltip"),
      ),
      new CommandItem(
        t("command.viewFileHistory"),
        "krl.viewFileHistory",
        "history",
        t("command.viewFileHistory.tooltip"),
      ),
      new CommandItem(
        t("command.showLineBlameDetails"),
        "krl.showLineBlameDetails",
        "account",
        t("command.showLineBlameDetails.tooltip"),
      ),
      new CommandItem(
        t("command.refreshIOView"),
        "krl.refreshIOView",
        "refresh",
        t("command.refreshIOView.tooltip"),
      ),
      new CommandItem(
        t("command.openTelegramChat"),
        "krl.openTelegramChat",
        "comment-discussion",
        t("command.openTelegramChat.tooltip"),
      ),
      new CommandItem(
        t("command.sendQualityReport"),
        "krl.sendQualityReport",
        "pulse",
        t("command.sendQualityReport.tooltip"),
      ),
      new CommandItem(
        t("command.sendLogsToDeveloper"),
        "krl.sendLogsToDeveloper",
        "output",
        t("command.sendLogsToDeveloper.tooltip"),
      ),
      new CommandItem(
        t("command.sendFileToDeveloper"),
        "krl.sendFileToDeveloper",
        "file-submodule",
        t("command.sendFileToDeveloper.tooltip"),
      ),
      new CommandItem(
        t("command.openCustomerPortal"),
        "krl.openCustomerPortal",
        "credit-card",
        t("command.openCustomerPortal.tooltip"),
      ),
    ];
  }
}

export class CommandItem extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    public readonly commandId: string,
    public readonly icon: string,
    public readonly tooltip: string,
  ) {
    super(label, vscode.TreeItemCollapsibleState.None);
    this.tooltip = tooltip;
    this.iconPath = new vscode.ThemeIcon(icon);
    this.command = {
      command: commandId,
      title: label,
      tooltip: tooltip,
    };
  }
}
