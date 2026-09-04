# 🟢 Community Edition — Free Core Features

Detailed walkthrough of the 15 core free features in KUKA KRL Professional.

---

### 1. KRL Syntax Highlighting
Full syntax parsing of `.src`, `.dat`, `.sub` files. Colorizes keywords, data types (`INT`, `REAL`, `BOOL`, `E6POS`), system variables, and WorkVisual FOLD structures.

#### Before Installation:
![Syntax Highlighting Before](/media/syntax_before.png)

#### After Installation:
![Syntax Highlighting After](/media/syntax_after.png)

---

### 2. Exclusive KUKA Themes (6 Tailored Color Themes)
6 professional themes tailored for factory floors and SmartPAD displays:
1. **Industrial Dark** (Signature KUKA `#FF6600`)
2. **WorkVisual Dark**
3. **WorkVisual Light**
4. **Midnight OLED**
5. **Blueprint**
6. **Industrial Light**

*Shortcut:* `Ctrl + K` `Ctrl + T`

![Theme 1](/media/kuka_theme_1.png)
![Theme 2](/media/kuka_theme_2.png)
![Theme 3](/media/kuka_theme_3.png)
![Theme 4](/media/kuka_theme_4.png)

---

### 3. Smart Autocomplete (KSS 8.7 & System Variables)
Intelligent dropdown for 350+ system variables (`$POS_ACT`, `$VEL.CP`, `$BASE`, `$TOOL`, `$IN`, `$OUT`).

![Smart Autocomplete Demo](/media/smart_autocomplete.gif)

---

### 4. Trilingual NLS Localization (EN / RU / TR)
Native UI localization for English, Russian, and Turkish.

---

### 5. Hardware Signal Inlay Hints ($IN / $OUT / $ANIN / $ANOUT)
Displays signal names inline right next to hardware channels (e.g., `$IN[1]` `: diPartReady`).

![Inlay Hints Demo](/media/inlay_hints.gif)

---

### 6. Hover Documentation & Read/Write Status
Hovering over system variables shows KSS manual info, data types, and read/write states.

![Hover Info Demo](/media/hover_info.gif)

---

### 7. Cross-File Navigation (.src ↔ .dat Go-to-Definition)
Jump from point references in `.src` directly to declarations in `.dat` via `F12` or `Ctrl+Click`.

![Go-to-Definition Demo](/media/goto_definition.gif)

---

### 8. Find All References (`Shift+Alt+F12`)
List all symbol references across the workspace.

![Find All References Demo](/media/find_all_references.gif)

---

### 9. Global KRL Formatter (Code Alignment & Indentation)
Formats assignments and `IF/FOR/WHILE` nesting via `Shift + Alt + F`.

![Code Formatter Demo](/media/code_formatter.gif)

---

### 10. Quick Fold Toolbar Buttons
Top bar icons 🙈 (`krl.foldAll`) and 📖 (`krl.unfoldAll`) for instant FOLD collapse/expand.

![Quick Fold Toolbar Demo](/media/quick_fold_toolbar.gif)

---

### 11. KUKA COMMANDS Panel
Structured sidebar panel containing all extension tools.

![KUKA COMMANDS Demo](/media/kuka_commands.gif)

---

### 12. KRL I/O Signals Panel
Side panel for hardware signals with live search and comment filtering.

![KRL I/O Signals Demo](/media/krl_io_signals.gif)

---

### 13. Unused Variable Cleaner
Clean unused `DECL` variables from `.dat` files safely.

---

### 14. WorkVisual Git Metadata Cleaner
Strips `&ACCESS`, `&REL`, `&PARAM` headers for clean Git diffs.

![Git Metadata Cleaner Demo](/media/git_metadata_cleaner.gif)

---

### 15. Sort Declarations
Sort `.dat` file declarations alphabetically.

![Sort Declarations Demo](/media/sort_declarations.gif)
