# KUKA KRL Professional - Features Wiki

Welcome to the official feature documentation for **KUKA KRL Professional**.

## 🟢 Community Edition (Free)

These features are available completely free for everyone to use and help accelerate standard robotics development.

### 1. Syntax Highlighting
Full parsing and coloring of the `.src` and `.dat` files according to strict KUKA KRC specifications. Highlights control blocks, system variables, strings, and operators perfectly.

### 2. KUKA Exclusive Themes
We bundle three custom dark themes tailored for factories:
- **Industrial Dark**
- **Midnight OLED** 
- **Blueprint**

### 3. Smart Autocomplete
Type `$` to instantly get a dropdown of all KUKA system variables, complete with correct data types and descriptions. Speeds up programming significantly.

### 4. Trilingual Localization (EN/RU/TR)
The entire extension, including hover information and error messages, is fully translated into English, Russian, and Turkish. 

### 5. Inlay Hints
Virtual text appears directly in your code editor next to hardware signals (e.g. `$IN[1]`), showing their real-world mapped names (`Sensor 1`), without actually modifying the file.

### 6. Hover Info
Hover your mouse over any system variable (like `$VEL.CP`) to get instant access to KUKA documentation, variable types, and read/write states.

### 7. Cross-file Go-to-Definition
Hold `Ctrl` and click on any variable in your `.src` logic to instantly jump to its exact declaration inside the corresponding `.dat` file.

### 8. Global Formatter
Press `Shift + Alt + F` to instantly format messy code. Automatically aligns `=` signs in matrices and standardizes tab indentation for clean commits.

### 9. Visual Snippet Generator
A built-in GUI panel (Fluent UI) allows you to visually construct PTP/LIN motions or complex logic without typing. Just fill the parameters and click "Insert".

---

## 👑 Industrial Edition (Pro)

The Industrial Edition acts as a strict static analyzer and safety inspector for your entire project workspace.

### 10. Interactive Flowchart Viewer
Turn massive, complex `.src` programs into clean Mermaid SVG control-flow diagrams. Visualizes timers, motions, and signals using intuitive emojis, and allows one-click drill-down into subprograms.

### 11. Block Balance Diagnostics
Deletes the pain of missing `ENDIF` or `ENDFOR`. The analyzer constantly maps your block structures and will instantly red-underline the exact missing closing tag.

### 12. Safety Velocity Warnings
Writing `$VEL.CP = 5.0` will immediately trigger a warning. The analyzer alerts you if hardcoded speeds exceed standard commissioning safety thresholds.

### 13. Tool/Base Initialization Check
Attempting to run a movement command (like `PTP P1`) without first initializing the active `$TOOL` and `$BASE` will be caught instantly. Prevents physical crashes.

### 14. Silent Error / Non-ASCII Blocker
The KRC compiler silently fails if non-ASCII characters (like Cyrillic) exist in executable code lines. Our blocker catches these invisible errors in real-time.

### 15. Workspace Dead-Code Analysis
Scans all files in your folder. Any `GLOBAL DEF` functions or variables that are never used will be highlighted in gray with a prompt to clean up unused code.

### 16. WorkVisual Header Stripper
Removes IDE-generated metadata garbage (like `&ACCESS`) with a single click. Keeps your Git commits clean and strictly focused on logic changes.

### 17. KUKA Frame Calculator
A built-in 3D geometry tool. Input 3 point coordinates (Origin, X-axis, XY-plane) and it will instantly calculate the correct `BASE_DATA` frame angles (A, B, C).

### 18. Code Quality Report Generator
Generate a comprehensive HTML or JSON report of your entire workspace. Instantly view the number of unhandled errors, warnings, and dead-code percentages.
