# Workspace-Wide Dead-Code Analysis

<span class="badge pro">Pro Feature</span>

Ensure your code meets the high standards of automotive manufacturers (VASS, BMW, Stellantis). Industrial standards require clean, optimized codebases with zero unused variables.

![Dead Code Analysis Demo](/media/dead-code.gif)

## How It Works

KUKA KRL Professional indexes your entire workspace (all `.src`, `.dat`, and `.sub` files) to build a comprehensive dependency graph.

* **Unused Locals**: Scans for unused local variables within routines.
* **Dead Global Subroutines**: Identifies `GLOBAL DEF` subprograms that are declared but never called anywhere in the workspace.
* **Orphaned Signals**: Highlights I/O signals defined in `.dat` files that are never triggered.

## Code Quality Reports

Generate a structured codebase health report to show your client or lead engineer that the code is optimized, clean, and safe. Run `KRL: Generate Analysis Report` from the Command Palette.
