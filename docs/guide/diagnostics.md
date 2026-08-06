# Industrial-Grade Diagnostics & Safety Inspection

<span class="badge pro">Pro Feature</span>

Catch syntax crashes, high-velocity hazards, and physical collision risks before running code on the real robot controller. 

## Strict Block Balance

Flags missing or orphaned block endings (`IF/ENDIF`, `FOR/ENDFOR`, `LOOP/ENDLOOP`). Handles complex KRL syntax without false positives.

## Type Validation & Collision Guard

Warns you if movements (`PTP`, `LIN`, `CIRC`) are declared before active `$TOOL` or `$BASE` values have been initialized in the current routine.

## High Velocity Warning

Alerts you when speed settings exceed safe commissioning levels (e.g., `$VEL.CP` exceeding 3.0 m/s) to prevent test-run accidents.

## Silent Error Blocker (Non-ASCII)

Cyrillic comments or invisible non-ASCII characters inside executable lines cause quiet compiler failures on KRC controllers. Pro safety checks detect and pinpoint them immediately.

![Industrial Diagnostics](/media/kuka_control_center.gif)
