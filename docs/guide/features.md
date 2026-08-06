# KUKA KRL Professional — Features Wiki & Complete Encyclopedia (v1.8.5 Pro Hub)

Welcome to the official feature wiki for **KUKA KRL Professional Extension** for VS Code.

Our extension is an industrial-grade development environment and static code analyzer built by robotics automation engineers specifically for programming KUKA industrial robots (KSS 8.3 / 8.5 / 8.6 / 8.7).

Below is an exhaustive breakdown of all **26 key features** (15 Community free core features and 11 Pro industrial tools), their real-world commissioning benefits, keyboard shortcuts, and media demonstrations.

---

## 🟢 Part 1. Community & Core Features (Free Features)

Available completely free to accelerate daily KRL programming and field engineering.

---

### 1. KRL Syntax Highlighting

* **Purpose & Usage:** Standard text editors treat `.src`, `.dat`, and `.sub` files as plain text. This extension performs full context-aware parsing of KRL syntax, accurately highlighting data types (`INT`, `REAL`, `BOOL`, `E6POS`), system variables (`$POS_ACT`, `$VEL.CP`), operators, and KUKA WorkVisual `FOLD` blocks.
* **Field Benefit:** Typos and unclosed strings are caught visually before code reaches the robot controller.
* **Before & After Installation:**

#### Before Installation (Plain Text):
![Syntax Highlighting Before](/media/syntax_before.png)

#### After Installation (High-Contrast KRL Syntax):
![Syntax Highlighting After](/media/syntax_after.png)

---

### 2. Exclusive KUKA Themes (6 Tailored Color Themes)

* **Purpose & Usage:** A curated suite of 6 high-contrast themes designed for industrial laptops under factory floor lighting and SmartPAD screens:
  1. **Industrial Dark** (Signature KUKA style with industrial orange `#FF6600`)
  2. **WorkVisual Dark** (Matches WorkVisual IDE dark mode)
  3. **WorkVisual Light** (Bright mode for outdoor / outdoor integration)
  4. **Midnight OLED** (Pure black background for laptop battery saving)
  5. **Blueprint** (Engineering CAD style)
  6. **Industrial Light** (High contrast light theme)
* **Shortcut:** Press `Ctrl + K`, then `Ctrl + T` to switch between KUKA themes.
* **Screenshots:**

![KUKA Industrial Theme 1](/media/kuka_theme_1.png)

![KUKA Industrial Theme 2](/media/kuka_theme_2.png)

![KUKA Industrial Theme 3](/media/kuka_theme_3.png)

![KUKA Industrial Theme 4](/media/kuka_theme_4.png)

---

### 3. Smart Autocomplete (KSS 8.7 & System Variables)

* **Purpose & Usage:** Typing `$` or variable characters instantly triggers an intelligent dropdown covering 350+ KSS 8.7 system variables (`$POS_ACT`, `$VEL_ACT`, `$BASE`, `$TOOL`, `$IN`, `$OUT`, `$MODE_OP`), data types, and user subroutines.
* **Demonstration:**

![Smart Autocomplete Demo](/media/smart_autocomplete.gif)

---

### 4. Trilingual NLS Localization (EN / RU / TR)

* **Purpose & Usage:** Full native internationalization of hover info, diagnostics, context menus, TreeViews, and the Control Center into **English**, **Russian**, and **Turkish (Türkçe)**.
* **Field Benefit:** Seamless multi-national engineering teamwork across European and Turkish automotive plants.

---

### 5. Hardware Signal Inlay Hints ($IN / $OUT / $ANIN / $ANOUT)

* **Purpose & Usage:** Hardware I/O signals in KRL use channel numbers like `$IN[1]` or `$OUT[4]`. Real-time **Inlay Hints** inject virtual text inline (e.g., `$IN[1]` `: diPartReady`), pulling comments directly from `.dat` files without altering source code.
* **Demonstration:**

![Inlay Hints Demo](/media/inlay_hints.gif)

---

### 6. Hover Documentation & Read/Write Status

* **Purpose & Usage:** Hovering over any system variable (like `$VEL.CP`, `$POS_ACT`) displays an official KSS manual popup with data types, value limits, and access permissions (**Read-Only / Read-Write**).
* **Demonstration:**

![Hover Info Demo](/media/hover_info.gif)

---

### 7. Cross-File Navigation (.src ↔ .dat Go-to-Definition)

* **Purpose & Usage:** In KRL, logic resides in `.src` while point declarations (`E6POS`, `$TOOL`, `$BASE`) sit inside `.dat`. Pressing `F12` or `Ctrl + Click` jumps directly from point references in `.src` to their exact declaration inside `.dat`.
* **Demonstration:**

![Go-to-Definition Demo](/media/goto_definition.gif)

---

### 8. Find All References (`Shift+Alt+F12`)

* **Purpose & Usage:** Pressing `Shift + Alt + F12` on any variable or subroutine opens a side panel listing every single usage across all files in your workspace.
* **Demonstration:**

![Find All References Demo](/media/find_all_references.gif)

---

### 9. Global KRL Formatter (Code Alignment & Indentation)

* **Purpose & Usage:** Pressing `Shift + Alt + F` automatically formats messy code: aligns `=` signs in matrix assignments, standardizes `IF/FOR/WHILE` nesting, and cleans up `;FOLD / ;ENDFOLD` blocks.
* **Demonstration:**

![Code Formatter Demo](/media/code_formatter.gif)

---

### 10. Quick Fold Toolbar Buttons

* **Purpose & Usage:** Top editor toolbar icons 🙈 (`krl.foldAll`) and 📖 (`krl.unfoldAll`) allow 1-click collapse or expansion of all Inline Form `FOLD` structures.
* **Demonstration:**

![Quick Fold Toolbar Demo](/media/quick_fold_toolbar.gif)

---

### 11. KUKA COMMANDS TreeView Panel

* **Purpose & Usage:** A dedicated Activity Bar sidebar panel categorizing all extension tools into 4 intuitive categories (Engineering Tools, Network & Safety, KRL Editing, Reports).
* **Demonstration:**

![KUKA COMMANDS Demo](/media/kuka_commands.gif)

---

### 12. KRL I/O Signals Panel

* **Purpose & Usage:** Side panel listing all project `$IN`, `$OUT`, and `SIGNAL` declarations with search and comment inspection.
* **Demonstration:**

![KRL I/O Signals Demo](/media/krl_io_signals.gif)

---

### 13. Unused Variable Cleaner

* **Purpose & Usage:** Command `KRL: Clean Up Unused Variables` scans `.dat` files for unreferenced `DECL` statements and cleans them up safely.

---

### 14. WorkVisual Git Metadata Cleaner

* **Purpose & Usage:** Strips IDE metadata noise (`&ACCESS RVP`, `&REL 1`, `&PARAM`) from headers to keep Git diffs focused purely on code logic changes.
* **Demonstration:**

![Git Metadata Cleaner Demo](/media/git_metadata_cleaner.gif)

---

### 15. Sort Declarations

* **Purpose & Usage:** Automatically sorts data type declarations (`INT`, `REAL`, `BOOL`, `E6POS`) in `.dat` files alphabetically and by category.
* **Demonstration:**

![Sort Declarations Demo](/media/sort_declarations.gif)

---

## 👑 Part 2. Pro & Industrial Edition Features

Designed for system integrators, robotics leads, and safety compliance audits.

---

### 16. KUKA Control Center Dashboard (v1.8.5 Pro Hub)

* **Purpose & Usage:** Centralized Fluent UI dashboard (`krl.openControlCenter`) providing 1-click access to all Pro tools, workspace health metrics, license manager, and Telegram support.
* **Demonstration:**

![KUKA Control Center Demo](/media/kuka_control_center.gif)

---

### 17. VS Code Telegram Support Chat Panel

* **Purpose & Usage:** Embedded support chat window (`krl.openTelegramChat`) linked with **`@kukakrlbot`** for sending feedback, logs, and screenshots straight to lead developers.

---

### 18. Autonomous Helpdesk App (`KukaAdminHelpdesk.exe`)

* **Purpose & Usage:** Standalone Windows admin console for automation team leads to monitor engineer workspace statuses (🟢 ONLINE / 🟡 IDLE / 🔴 OFFLINE).

---

### 19. KRC Backup Diff & Point Delta Inspector

* **Purpose & Usage:** Loads SmartPAD KRC4/KRC5 `.zip` backup archives, compares them against local files, and calculates physical coordinate deltas ($\Delta X, \Delta Y, \Delta Z, \Delta A, \Delta B, \Delta C$) for points.
* **Field Benefit:** Prevents robot collisions caused by manual point touch-ups on the SmartPAD.
* **Demonstration:**

![KRC Backup Diff Demo](/media/krc_backup_diff.gif)

---

### 20. Interactive Motion Trajectory & Snippet Generator

* **Purpose & Usage:** 2-column GUI builder for KUKA motions (`PTP`, `LIN`, `CIRC`, `SPTP`, `SLIN`, `SCIRC`, `SPLINE`). Generates real-time vector SVG scheme diagrams with TCP jerk profiles (`$SGEAR_JERK`) and blending parameters (`C_PTP`, `C_DIS`, `C_Spl`).

---

### 21. Interactive Flowchart Viewer (Control Flow Graph)

* **Purpose & Usage:** Converts `.src` program logic into clean Mermaid SVG control flow graphs (`krl.showFlowchart`). Click subprograms to drill down. SVG export enabled.
* **Demonstration:**

![Control Flow Graph Demo](/media/control_flow_graph.gif)

#### Vector Flowchart Example:
![Cell Flowchart SVG](/media/cell_flowchart.svg)

---

### 22. EthernetKRL (EKI) XML Suite & Handler Generator

* **Purpose & Usage:** Validates EthernetKRL XML communication schemas and automatically generates KRL networking modules (`EKI_Init`, `EKI_Open`, `EKI_Get*`, `EKI_Send*`).

---

### 23. Industrial Safety & Velocity Diagnostics

* **Purpose & Usage:** Automated safety inspector (`KRL: Run Safety Check`) alerting on:
  1. Excessive Cartesian velocity (`$VEL.CP > 3.0 m/s`).
  2. Uninitialized `$TOOL` or `$BASE` values before motion commands.
  3. Invisible non-ASCII or Cyrillic characters inside executable lines.

---

### 24. AI-Supportive Domain Context Tools (`@kuka /get-io-matrix`, `@kuka /check-safety`)

* **Purpose & Usage:** Grounding tools for AI assistants (Google Antigravity IDE / Copilot) providing exact KSS 8.7 AST, I/O matrices, and safety audit reports.

---

### 25. 3-Point Frame Calculator (BASE & TOOL Math)

* **Purpose & Usage:** 3D geometric frame transformation tool (`krl.showCalculator`). Computes `BASE_DATA[x]` Euler angles (A, B, C) from 3 recorded points (Origin, X-Axis, XY-Plane).

---

### 26. Quality Acceptance Report Generator

* **Purpose & Usage:** Generates comprehensive HTML/JSON project quality reports for client acceptance sign-off.

---

## 🛠️ Purchase & Support

* **Get Pro License:** [LiskinLabs Store (Lemon Squeezy)](https://liskin.lemonsqueezy.com)
* **Telegram Support Bot:** [@kukakrlbot](https://t.me/kukakrlbot)
