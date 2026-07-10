# Real-time Inlay Hints

<span class="badge pro">Pro Feature</span>

No more constantly switching tabs between your `.src` and `.dat` files to remember what a specific I/O signal or generic variable means.

![Inlay Hints Demo](/media/inlay-hints.gif)

## How It Works

KUKA KRL Professional uses the Language Server Protocol (LSP) to provide context directly inline in your editor.

When you use an I/O signal (e.g., `$IN[12]`) or a generic system variable, the extension automatically injects a non-intrusive "hint" next to the code showing the signal's declared name or comment from your `.dat` files.

* **Configuration**: You can toggle this feature on or off in the VS Code settings under `krl.inlayHints.enabled`.
