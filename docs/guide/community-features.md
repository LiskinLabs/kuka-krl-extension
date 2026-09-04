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

### 3. Smart Autocomplete & KUKA.Sim 4.10 Kernel Specifications
Exhaustive code completion powered by authentic KUKA.Sim 4.10 and KRC controller kernel specifications:
* **957 System Variables**: Full typing (`FRAME`, `CP`, `INT`, `REAL`, `BOOL`, `E6POS`), array dimensions (217 arrays), writability (`Read/Write` vs `Read-Only`), and original German physical units.
* **116 Built-in System Functions**: Kinematics (`FORWARD`, `INVERSE`, `INV_POS`, `TOOL_ADJ`), strings, type conversions, message dialogs, and torque limits with real-time `signatureHelp` parameter hints.
* **111 Structures & 112 ENUMs (443 Literals)**: Dot-completion (`.`) for structured types and system variables (`$TOOL.`, `$ACC.`), plus `#` enum autocompletion (`#AUT`, `#T1`, `#P_FREE`, `#QUIT`).
* **23 Official Inline Form Snippets (34 Templates)**: Complete replacement of legacy snippets with authentic Kuka Roboter GmbH templates (`ptpi`, `slini`, `sptpi`, `scirc`, `PTPCo`, `ptprel`, `trigdist`, `sigin`, `wsec`, `Forr`) with complete FOLD headers (`;FOLD ... ;%{PE}`).

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

---

### 16. Authentic KUKA.Sim & WorkVisual Syntax Palette
Specialized KRL syntax coloring based on authentic AvalonEdit definitions from `KRLDark.xshd` (KUKA.Sim 4.10) and `KRL.xshd` (WorkVisual):
- **Motion Commands (`PTP`, `LIN`, `CIRC`, `PTP_REL`, `LIN_REL`):** Bold font for immediate operator trajectory scanning.
- **Logical Operators (`AND`, `OR`, `NOT`, `EXOR`, `B_AND`, `B_OR`):** Distinct high-contrast blue `#569cd6`.
- **Operators & Mathematical Symbols (`==`, `<>`, `<=`, `>=`, `+`, `-`, `*`, `/`):** Olive green tone `#6A9955` for formula readability.
- **Hexadecimal & Binary Numbers (`'H0A'`, `&HFF`, `'B0101'`):** Signature neon magenta `#FF00FF`.
- **Header Directives (`&ACCESS`, `&REL`, `&PARAM`):** Soft purple `#646695`.

---

### 17. KSS 8.7 Standard System Library & F12 Definition
Bundled official KSS 8.7 system modules:
- System functions: `BAS()`, `MsgNotify()`, `MsgQuit()`, `MsgDialog()`, `USE_CM_PRO_VALUES()`, etc.
- System arrays and variables: `TOOL_NAME[]`, `BASE_NAME[]`, `COLLMON_ACTIVE`, etc.
- Seamless `F12` (Go to Definition) and `signatureHelp` jumping directly to official reference files `bas.src`, `MsgLib.src`, `collmonlib.src`, and `$config.dat`. Zero false positive "Unknown function" warnings.

---

### 18. 1-Click KRC Project Scaffolding (`krl.scaffoldKrcFiles`)
Instantly sets up standard KSS 8.7 controller folder structures:
- Generates `KRC/R1/System/`, `KRC/R1/Program/`, `KRC/R1/TP/`.
- Deploys reference files `$config.dat`, `bas.src`, `MsgLib.src`, `collmonlib.src`, `sps.sub`, `$machine.dat`, `$robcor.dat`, `$custom.dat`, `$option.dat`.

---

### 19. Factory Defaults Inspector & $ADVANCE Limiter
- **Factory Defaults Hover:** Hovering over core motion variables reveals official factory values (`operate.defaultvalues` from KUKA.Sim): `$ADVANCE = 3`, `$VEL.CP = 2.0 m/s`, `$ACC.CP = 2.3 m/s²`, `$JERK.CP = 500.0 m/s³`.
- **$ADVANCE Safety Guard:** Diagnostic warning if `$ADVANCE` is set outside valid range `0..5`.

