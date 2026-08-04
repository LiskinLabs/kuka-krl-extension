import * as vscode from "vscode";
import { t } from "./i18n";

export class CommandsTreeProvider implements vscode.TreeDataProvider<CommandItem> {
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

  getChildren(element?: CommandItem): Thenable<CommandItem[]> {
    if (element) {
      return Promise.resolve([]);
    } else {
      return Promise.resolve(this.getCommands());
    }
  }

  private getCommands(): CommandItem[] {
    return [
      new CommandItem(
        t("command.openControlCenter"),
        "krl.openControlCenter",
        "widget",
        t("command.openControlCenter.tooltip"),
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
        t("command.openSnippetGenerator"),
        "krl.openSnippetGenerator",
        "beaker",
        t("command.openSnippetGenerator.tooltip"),
      ),
      new CommandItem(
        t("command.calculator"),
        "krl.showCalculator",
        "symbol-numeric",
        t("command.calculator.tooltip"),
      ),
      new CommandItem(
        t("command.aiCheckSafety"),
        "krl.aiCheckSafety",
        "shield",
        t("command.aiCheckSafety.tooltip"),
      ),
      new CommandItem(
        t("command.aiGetIoMatrix"),
        "krl.aiGetIoMatrix",
        "list-flat",
        t("command.aiGetIoMatrix.tooltip"),
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
        t("command.cleanGitMetadata"),
        "krl.cleanGitMetadata",
        "clear-all",
        t("command.cleanGitMetadata.tooltip"),
      ),
      new CommandItem(
        t("command.generateReport"),
        "krl.generateReport",
        "report",
        t("command.generateReport.tooltip"),
      ),
      new CommandItem(
        t("command.cleanup"),
        "krl.cleanupUnusedVariables",
        "trash",
        t("command.cleanup.tooltip"),
      ),
      new CommandItem(
        t("command.formatDocument"),
        "krl.formatDocument",
        "code",
        t("command.formatDocument.tooltip"),
      ),
      new CommandItem(
        t("command.sortDeclarations"),
        "krl.sortDeclarations",
        "list-ordered",
        t("command.sortDeclarations.tooltip"),
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
        t("command.refreshIOView"),
        "krl.refreshIOView",
        "refresh",
        t("command.refreshIOView.tooltip"),
      ),
    ];
  }
}

class CommandItem extends vscode.TreeItem {
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
