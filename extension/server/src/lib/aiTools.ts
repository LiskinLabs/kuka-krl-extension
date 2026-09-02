export interface KrlSafetyIssue {
  severity: "error" | "warning" | "info";
  line: number; // 1-based
  code: string;
  message: string;
}

/**
 * Performs Deep Industrial Safety & Logic Diagnostics Check for KUKA KRC Robots.
 * Analyzes uninitialized movements, infinite loops, sensor deadlocks,
 * unchecked actuators, unreachable code, and non-ASCII blockers.
 *
 * @param text KRL code content
 */
export function performAiSafetyCheck(
  text: string,
): {
  safe: boolean;
  issues: string[]; // Human readable legacy array
  detailedIssues: KrlSafetyIssue[];
} {
  const detailedIssues: KrlSafetyIssue[] = [];
  const lines = text.split("\n");

  let hasInitMov = false;
  let currentToolSet = false;
  let currentBaseSet = false;

  const labelsMap = new Map<string, number>();

  // First pass: collect label definitions (e.g., "MY_LABEL:")
  lines.forEach((line, idx) => {
    const codePart = line.split(";")[0].trim();
    const labelMatch = codePart.match(/^([A-Za-z0-9_]+):$/);
    if (labelMatch) {
      labelsMap.set(labelMatch[1].toUpperCase(), idx + 1);
    }
  });

  let inLoop = false;
  let loopStartLine = 0;
  let loopHasExit = false;

  let inIf = false;
  let ifStartLine = 0;
  let ifCodeLinesCount = 0;

  let unreachable = false;
  let unreachableReasonLine = 0;

  lines.forEach((rawLine, idx) => {
    const lineNum = idx + 1;
    const codePart = rawLine.split(";")[0].trim();
    const upperCode = codePart.toUpperCase();

    if (!codePart) return;

    // 1. Unreachable Code Check
    if (unreachable) {
      if (
        upperCode.startsWith("END") ||
        upperCode.startsWith("CASE") ||
        upperCode.includes(":")
      ) {
        unreachable = false;
      } else {
        detailedIssues.push({
          severity: "warning",
          line: lineNum,
          code: "UNREACHABLE_CODE",
          message: `Code on line ${lineNum} is unreachable after flow interruption on line ${unreachableReasonLine} (HALT / RETURN / EXIT).`,
        });
      }
    }

    if (
      upperCode === "RETURN" ||
      upperCode === "HALT" ||
      upperCode === "EXIT"
    ) {
      unreachable = true;
      unreachableReasonLine = lineNum;
    }

    // 2. Movement Initialization Checks (BAS(#INITMOV) or $TOOL / $BASE)
    if (
      upperCode.includes("BAS(#INITMOV)") ||
      upperCode.includes("BAS( #INITMOV )")
    ) {
      hasInitMov = true;
      currentToolSet = true;
      currentBaseSet = true;
    }
    if (upperCode.includes("$TOOL") || upperCode.includes("BAS(#TOOL")) {
      currentToolSet = true;
    }
    if (upperCode.includes("$BASE") || upperCode.includes("BAS(#BASE")) {
      currentBaseSet = true;
    }

    const isMotionCmd =
      upperCode.startsWith("PTP ") ||
      upperCode.startsWith("LIN ") ||
      upperCode.startsWith("CIRC ") ||
      upperCode.startsWith("SPTP ") ||
      upperCode.startsWith("SLIN ") ||
      upperCode.startsWith("SCIRC ");

    if (isMotionCmd) {
      if (!hasInitMov && (!currentToolSet || !currentBaseSet)) {
        detailedIssues.push({
          severity: "error",
          line: lineNum,
          code: "UNINIT_MOTION",
          message: `Motion command on line ${lineNum} invoked without prior TOOL/BASE initialization (needs BAS(#INITMOV) or $TOOL / $BASE assignment). Robot will move on uncalibrated frame!`,
        });
      }
    }

    // 4. Actuator Output Control Without Sensor Feedback/Wait Check
    const isOutAssignment =
      upperCode.match(/\$OUT\[\d+\]\s*=\s*TRUE/) ||
      upperCode.match(/SIGNAL\s+.*\$OUT/) ||
      upperCode.match(/DO[A-Z0-9_]+\s*=\s*TRUE/);

    if (isOutAssignment) {
      // Look ahead to find the next non-empty, non-comment line
      let nextIdx = idx + 1;
      while (nextIdx < lines.length) {
        const nextCode = lines[nextIdx].split(";")[0].trim().toUpperCase();
        if (nextCode.length > 0) {
          const isNextMotion =
            nextCode.startsWith("PTP ") ||
            nextCode.startsWith("LIN ") ||
            nextCode.startsWith("CIRC ") ||
            nextCode.startsWith("SPTP ") ||
            nextCode.startsWith("SLIN ") ||
            nextCode.startsWith("SCIRC ");

          if (isNextMotion) {
            detailedIssues.push({
              severity: "warning",
              line: lineNum,
              code: "UNCHECKED_ACTUATOR",
              message: `Actuator output set to TRUE on line ${lineNum} with motion on line ${nextIdx + 1} without WAIT FOR sensor feedback or WAIT SEC pause. Risk of part drop or clamp collision!`,
            });
          }
          break; // Stop after first executable statement
        }
        nextIdx++;
      }
    }

    // 5. Infinite Loop Analysis (LOOP / WHILE TRUE without EXIT/HALT)
    if (
      upperCode.startsWith("LOOP") ||
      upperCode.startsWith("WHILE TRUE") ||
      upperCode.startsWith("WHILE 1==1")
    ) {
      inLoop = true;
      loopStartLine = lineNum;
      loopHasExit = false;
    }

    if (inLoop) {
      if (
        upperCode.includes("EXIT") ||
        upperCode.includes("HALT") ||
        upperCode.includes("RETURN")
      ) {
        loopHasExit = true;
      }
      if (upperCode.startsWith("ENDLOOP") || upperCode.startsWith("ENDWHILE")) {
        if (!loopHasExit) {
          detailedIssues.push({
            severity: "error",
            line: loopStartLine,
            code: "INFINITE_LOOP",
            message: `Infinite loop detected starting at line ${loopStartLine}. Loop lacks EXIT, HALT, or RETURN commands. Robot will hang indefinitely!`,
          });
        }
        inLoop = false;
      }
    }

    // 6. Sensor Deadlock / Unbounded WAIT FOR Check
    if (upperCode.startsWith("WAIT FOR ")) {
      const waitCondition = upperCode.replace("WAIT FOR ", "");
      if (!waitCondition.includes("$TIMER") && !waitCondition.includes("OR")) {
        detailedIssues.push({
          severity: "info",
          line: lineNum,
          code: "UNBOUNDED_WAIT",
          message: `Blocking 'WAIT FOR' condition on line ${lineNum} has no timer timeout safeguard. If sensor fails, robot cell will freeze indefinitely.`,
        });
      }
    }

    // 7. Backward GOTO Loop Check
    const gotoMatch = upperCode.match(/^GOTO\s+([A-Za-z0-9_]+)/);
    if (gotoMatch) {
      const targetLabel = gotoMatch[1].toUpperCase();
      const labelLine = labelsMap.get(targetLabel);
      if (labelLine && labelLine < lineNum) {
        detailedIssues.push({
          severity: "warning",
          line: lineNum,
          code: "BACKWARD_GOTO",
          message: `Backward GOTO transition on line ${lineNum} jumps up to line ${labelLine} (Label: ${targetLabel}). Potential infinite loop risk if not guarded by IF condition!`,
        });
      } else if (!labelLine) {
        detailedIssues.push({
          severity: "error",
          line: lineNum,
          code: "UNDEFINED_GOTO_LABEL",
          message: `Target label '${targetLabel}' for GOTO on line ${lineNum} is not defined in this subprogram!`,
        });
      }
    }

    // 8. Empty IF Branch Check
    if (upperCode.startsWith("IF ") && upperCode.includes("THEN")) {
      inIf = true;
      ifStartLine = lineNum;
      ifCodeLinesCount = 0;
    } else if (inIf) {
      if (upperCode.startsWith("ENDIF") || upperCode.startsWith("ELSE")) {
        if (ifCodeLinesCount === 0) {
          detailedIssues.push({
            severity: "warning",
            line: ifStartLine,
            code: "EMPTY_IF_BRANCH",
            message: `Conditional branch IF on line ${ifStartLine} is empty and contains no executable statements.`,
          });
        }
        if (upperCode.startsWith("ENDIF")) {
          inIf = false;
        } else {
          ifCodeLinesCount = 0; // reset for ELSE branch
        }
      } else {
        ifCodeLinesCount++;
      }
    }

    // 9. Non-ASCII Character Check (Russian/Cyrillic in executable code)
    const nonAsciiRegex = /[^\x00-\x7F]/g;
    if (nonAsciiRegex.test(codePart)) {
      detailedIssues.push({
        severity: "error",
        line: lineNum,
        code: "NON_ASCII_CHARACTER",
        message: `Non-ASCII / Cyrillic character detected in executable code at line ${lineNum}. KRC controller will reject file compilation!`,
      });
    }
  });

  // 10. Mismatched FOLD / ENDFOLD Check
  const foldCount = (text.match(/;FOLD/gi) || []).length;
  const endFoldCount = (text.match(/;ENDFOLD/gi) || []).length;
  if (foldCount !== endFoldCount) {
    detailedIssues.push({
      severity: "error",
      line: 1,
      code: "FOLD_MISMATCH",
      message: `Mismatched FOLD blocks (;FOLD count = ${foldCount}, ;ENDFOLD count = ${endFoldCount}). KUKA smartPAD fold hierarchy is broken!`,
    });
  }

  const legacyIssues = detailedIssues.map(
    (i) => `[Line ${i.line}] ${i.severity.toUpperCase()}: ${i.message}`,
  );

  return {
    safe: detailedIssues.filter((i) => i.severity === "error").length === 0,
    issues: legacyIssues,
    detailedIssues,
  };
}
