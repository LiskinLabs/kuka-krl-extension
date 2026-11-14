# KRC Backup Diff & Point Delta Inspector

<span class="badge pro">Pro Feature</span>

Compare current workspace logic and point coordinates against physical robot SmartPAD backup ZIP archives (KRC4 / KRC5).

![KRC Backup Diff Demo](/media/krc_backup_diff.gif)

## Capabilities

* **ZIP Backup Parsing**: Select any SmartPAD `.zip` archive without extracting it manually.
* **Component Point Delta Calculation**: Computes exact offset deltas (ΔX, ΔY, ΔZ, ΔA, ΔB, ΔC) for `E6POS`, `POS`, `E6AXIS`, and `AXIS` coordinates.
* **Side-by-Side Diff Viewer**: Visualizes additions, deletions, and coordinate shifts in real-time.
