# KRC Backup Diff & Point Delta Inspector

<span class="badge pro">Pro Feature (v1.8.1)</span>

Compare current workspace logic and point coordinates against physical robot SmartPAD backup ZIP archives (KRC4 / KRC5).

![KRC Backup Diff Demo](/media/krc_backup_diff.gif)

## Capabilities

* **ZIP Backup Parsing**: Select any SmartPAD `.zip` archive without extracting it manually.
* **Component Point Delta Calculation**: Computes exact offset deltas ($\Delta X, \Delta Y, \Delta Z, \Delta A, \Delta B, \Delta C$) for `E6POS`, `POS`, `E6AXIS`, and `AXIS` coordinates.
* **Side-by-Side Diff Viewer**: Visualizes additions, deletions, and coordinate shifts in real-time.
