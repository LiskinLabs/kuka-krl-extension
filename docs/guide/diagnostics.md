# Industrial-Grade Diagnostics

<span class="badge pro">Pro Feature</span>

Catch syntax crashes and physical collision risks before you run the code on the real robot controller. 

## Strict Block Balance

Flags missing or orphaned block endings (`IF/ENDIF`, `FOR/ENDFOR`, `LOOP/ENDLOOP`). Handles complex KRL syntax without false positives.

![Block Balance Demo](/media/block-balance.gif)

## Type Validation & Collision Guard

Warns you if movements (`PTP`, `LIN`, `CIRC`) are declared before active `$TOOL` or `$BASE` values have been initialized in the current routine.

![Type Validation Demo](/media/type-validation-demo.gif)

## High Velocity Warning
Alerts you when speed settings exceed safe commissioning levels (e.g., `$VEL.CP` exceeding 3.0 m/s) to prevent manual test-run accidents.

## Silent Error Blocker (Non-ASCII)
Cyrillic comments or invisible non-ASCII characters inside executable lines cause quiet compiler failures on older KRC software. Pro checks detect and pinpoint them immediately.
