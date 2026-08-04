export interface KrlIoSignalInfo {
  type: "$IN" | "$OUT" | "SIGNAL";
  index?: number;
  name: string;
  comment?: string;
}

/**
 * Extracts all I/O Signals ($IN, $OUT, SIGNAL) from active document or text for AI Context.
 */
export function extractIoMatrixForAi(text: string): KrlIoSignalInfo[] {
  const signals: KrlIoSignalInfo[] = [];

  // Match SIGNAL declarations: SIGNAL doGripperOpen $OUT[16]
  const signalRegex =
    /SIGNAL\s+([A-Za-z0-9_]+)\s+\$(IN|OUT)\[(\d+)\](?:\s*TO\s*\$(IN|OUT)\[(\d+)\])?/gi;
  let match;

  while ((match = signalRegex.exec(text)) !== null) {
    signals.push({
      name: match[1],
      type: (`$` + match[2].toUpperCase()) as "$IN" | "$OUT",
      index: parseInt(match[3], 10),
    });
  }

  // Match raw $IN[x] or $OUT[x] assignments
  const rawIoRegex = /\$(IN|OUT)\[(\d+)\]\s*=\s*(TRUE|FALSE|[A-Za-z0-9_]+)/gi;
  while ((match = rawIoRegex.exec(text)) !== null) {
    signals.push({
      name: `Physical ${match[1].toUpperCase()}[${match[2]}]`,
      type: (`$` + match[1].toUpperCase()) as "$IN" | "$OUT",
      index: parseInt(match[2], 10),
    });
  }

  return signals;
}

/**
 * Performs Industrial Safety Diagnostics Check for AI Assistant.
 * @param text KRL code content
 * @param maxAllowedSpeed Optional max allowed velocity threshold in m/s (default 2.0 m/s)
 */
export function performAiSafetyCheck(
  text: string,
  maxAllowedSpeed: number = 2.0,
): { safe: boolean; issues: string[] } {
  const issues: string[] = [];

  // 1. High Velocity Check ($VEL.CP > maxAllowedSpeed)
  const velMatch = text.match(/\$VEL\.CP\s*=\s*(\d+(\.\d+)?)/i);
  if (velMatch) {
    const speed = parseFloat(velMatch[1]);
    if (speed > maxAllowedSpeed) {
      issues.push(
        `⚠️ DANGER: Cartesian velocity ($VEL.CP = ${speed} m/s) exceeds maximum configured safe limit for this robot cell (${maxAllowedSpeed} m/s)`,
      );
    }
  }

  // 2. Unclosed FOLD check
  const foldCount = (text.match(/;FOLD/gi) || []).length;
  const endFoldCount = (text.match(/;ENDFOLD/gi) || []).length;
  if (foldCount !== endFoldCount) {
    issues.push(
      `❌ STRUCTURE ERROR: Mismatched FOLD blocks (;FOLD=${foldCount}, ;ENDFOLD=${endFoldCount})`,
    );
  }

  // 3. Non-ASCII / Cyrillic in identifiers check
  const nonAsciiRegex = /[^\x00-\x7F]/g;
  const lines = text.split("\n");
  lines.forEach((line, idx) => {
    // Ignore pure comments
    const codePart = line.split(";")[0];
    if (nonAsciiRegex.test(codePart)) {
      issues.push(
        `⛔ NON-ASCII BLOCKER: Non-ASCII characters detected in code at line ${idx + 1}`,
      );
    }
  });

  return {
    safe: issues.length === 0,
    issues,
  };
}
