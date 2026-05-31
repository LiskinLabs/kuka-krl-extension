/**
 * Control Flow Analyzer for KRL programs.
 * Builds a Control Flow Graph (CFG) from KRL .src files
 * and detects logic errors.
 */

// =============================================
// Types
// =============================================

export interface CFNode {
  id: string;
  label: string;
  type:
    | "start"
    | "end"
    | "process"
    | "decision"
    | "loop"
    | "motion"
    | "call"
    | "terminator"
    | "interrupt";
  line: number;
  error?: CFError;
  target?: string;
}

export interface CFEdge {
  from: string;
  to: string;
  label?: string;
}

export interface CFError {
  type:
    | "unreachable"
    | "infiniteLoop"
    | "emptyBranch"
    | "invalidGoto"
    | "uninitMotion";
  message: string;
  line: number;
}

export interface CFGraph {
  nodes: CFNode[];
  edges: CFEdge[];
  errors: CFError[];
}

// =============================================
// Regex patterns
// =============================================

const RE_DEF = /^\s*(?:GLOBAL\s+)?(?:DEF|DEFFCT)\s+(?:\w+\s+)?(\w+)\s*\(/i;
const RE_END = /^\s*(?:END|ENDFCT)\b/i;
const RE_IF = /^\s*IF\b(.+)\bTHEN\b/i;
const RE_ELSE = /^\s*ELSE\b/i;
const RE_ENDIF = /^\s*ENDIF\b/i;
const RE_FOR = /^\s*FOR\b(.+)/i;
const RE_ENDFOR = /^\s*ENDFOR\b/i;
const RE_WHILE = /^\s*WHILE\b(.+)/i;
const RE_ENDWHILE = /^\s*ENDWHILE\b/i;
const RE_LOOP = /^\s*LOOP\b/i;
const RE_ENDLOOP = /^\s*ENDLOOP\b/i;
const RE_REPEAT = /^\s*REPEAT\b/i;
const RE_UNTIL = /^\s*UNTIL\b(.+)/i;
const RE_SWITCH = /^\s*SWITCH\b(.+)/i;
const RE_CASE = /^\s*CASE\b(.+)/i;
const RE_DEFAULT = /^\s*DEFAULT\b/i;
const RE_ENDSWITCH = /^\s*ENDSWITCH\b/i;
const RE_GOTO = /^\s*GOTO\s+(\w+)/i;
const RE_LABEL = /^\s*(\w+)\s*:\s*$/;
const RE_RETURN = /^\s*(RETURN|EXIT|HALT)\b/i;
const RE_MOTION = /^\s*(PTP|LIN|CIRC|SPTP|SLIN|SCIRC)\s+/i;
const RE_INIT =
  /\$TOOL\s*=|BAS\s*\(\s*(?:#INITMOV|#FRAMES|#PTP_PARAMS|#CP_PARAMS)/i;
const RE_INTERRUPT = /^\s*INTERRUPT\s+DECL\b/i;
const RE_FUNC_CALL = /^\s*(\w+)\s*\(/i;
const RE_COMMENT = /^\s*;/;
const RE_EMPTY = /^\s*$/;
const RE_FOLD = /^\s*;FOLD\b|^\s*;ENDFOLD\b/i;

// Keywords that are NOT function calls
const NON_CALL_KEYWORDS = new Set([
  "IF",
  "FOR",
  "WHILE",
  "SWITCH",
  "CASE",
  "LOOP",
  "REPEAT",
  "DEF",
  "DEFFCT",
  "DEFDAT",
  "DECL",
  "GLOBAL",
  "SIGNAL",
  "STRUC",
  "ENUM",
  "RETURN",
  "EXIT",
  "HALT",
  "GOTO",
  "WAIT",
  "TRIGGER",
  "INTERRUPT",
  "PTP",
  "LIN",
  "CIRC",
  "SPTP",
  "SLIN",
  "SCIRC",
  "END",
  "ENDIF",
  "ENDFOR",
  "ENDWHILE",
  "ENDLOOP",
  "ENDFCT",
  "ENDSWITCH",
  "ENDDAT",
  "ELSE",
  "DEFAULT",
  "UNTIL",
  "CONTINUE",
]);

/**
 * Strip comment from a KRL line, respecting strings.
 */
function stripComment(line: string): string {
  let inStr = false;
  for (let i = 0; i < line.length; i++) {
    if (line[i] === '"') inStr = !inStr;
    else if (line[i] === ";" && !inStr) return line.substring(0, i);
  }
  return line;
}

/**
 * Analyze a KRL source file and produce a Control Flow Graph.
 */
export function analyzeControlFlow(
  text: string,
  detailed: boolean = false,
): CFGraph {
  const lines = text.split(/\r?\n/);
  const nodes: CFNode[] = [];
  const edges: CFEdge[] = [];
  const errors: CFError[] = [];
  const labels = new Map<string, string>(); // label name -> node id
  const gotoTargets: { nodeId: string; label: string; line: number }[] = [];

  let nodeCounter = 0;
  let toolInitialized = false;
  let lastNodeId = "";
  let terminated = false; // after RETURN/EXIT/HALT

  // Stack for block context
  interface BlockCtx {
    type: "if" | "for" | "while" | "loop" | "repeat" | "switch";
    condNodeId: string;
    bodyStartNodeId: string;
    elseNodeId?: string;
    hasExit?: boolean; // for LOOP
    hasBody?: boolean;
    caseNodes?: string[];
    afterNodeId?: string; // for connecting after block ends
    line: number;
  }
  const blockStack: BlockCtx[] = [];

  function makeId(): string {
    return `n${nodeCounter++}`;
  }

  function addNode(n: CFNode): void {
    nodes.push(n);
    const topCtx = blockStack[blockStack.length - 1];
    if (topCtx && topCtx.type === "if") {
      topCtx.hasBody = true;
      if (!topCtx.bodyStartNodeId) topCtx.bodyStartNodeId = n.id;
    }
  }

  function addEdge(from: string, to: string, label?: string): void {
    if (from && to) {
      edges.push({ from, to, label });
    }
  }

  function connectLast(toId: string, label?: string): void {
    if (lastNodeId && !terminated) {
      addEdge(lastNodeId, toId, label);
    }
  }

  // Find all labels first (single pass)
  for (let i = 0; i < lines.length; i++) {
    const code = stripComment(lines[i]).trim();
    const labelMatch = code.match(RE_LABEL);
    if (labelMatch) {
      const placeholderId = `label_${labelMatch[1].toUpperCase()}`;
      labels.set(labelMatch[1].toUpperCase(), placeholderId);
    }
  }

  // Main parse loop
  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const code = stripComment(raw).trim();

    if (RE_COMMENT.test(raw) || RE_EMPTY.test(code) || RE_FOLD.test(raw))
      continue;

    let m: RegExpMatchArray | null;

    // --- DEF ---
    if ((m = code.match(RE_DEF))) {
      const id = makeId();
      addNode({ id, label: `DEF ${m[1]}()`, type: "start", line: i });
      lastNodeId = id;
      terminated = false;
      toolInitialized = false;
      continue;
    }

    // --- END ---
    if (RE_END.test(code)) {
      const id = makeId();
      addNode({ id, label: "END", type: "end", line: i });
      connectLast(id);
      lastNodeId = id;
      terminated = false;
      continue;
    }

    // --- IF ---
    if ((m = code.match(RE_IF))) {
      const condId = makeId();
      const cond = m[1]
        .trim()
        .replace(/\bTHEN\b/i, "")
        .trim();
      addNode({
        id: condId,
        label: cond.length > 40 ? cond.substring(0, 37) + "..." : cond,
        type: "decision",
        line: i,
      });
      connectLast(condId);
      blockStack.push({
        type: "if",
        condNodeId: condId,
        bodyStartNodeId: "",
        hasBody: false,
        line: i,
      });
      lastNodeId = condId;
      terminated = false;
      // TRUE branch starts from condId
      continue;
    }

    // --- ELSE ---
    if (RE_ELSE.test(code)) {
      const ctx = blockStack[blockStack.length - 1];
      if (ctx && ctx.type === "if") {
        // Save where TRUE branch ended
        ctx.elseNodeId = lastNodeId;
        ctx.hasBody = ctx.hasBody || !!ctx.bodyStartNodeId;
        // FALSE branch starts from condId
        lastNodeId = ctx.condNodeId;
        terminated = false;
      }
      continue;
    }

    // --- ENDIF ---
    if (RE_ENDIF.test(code)) {
      const ctx = blockStack.pop();
      if (ctx && ctx.type === "if") {
        const joinId = makeId();
        addNode({ id: joinId, label: "ENDIF", type: "process", line: i });

        // Connect current branch (FALSE or TRUE-after-ELSE) to join
        connectLast(joinId);

        if (ctx.elseNodeId) {
          // ELSE was present: connect TRUE-branch end to join
          addEdge(ctx.elseNodeId, joinId, "TRUE");
          // FALSE edge is already connected via current lastNodeId
          // Label the edges from condition
          const trueEdge = edges.find(
            (e) => e.from === ctx.condNodeId && e.to !== joinId && !e.label,
          );
          if (trueEdge) trueEdge.label = "TRUE";
          const falseEdge = edges.find(
            (e) => e.from === ctx.condNodeId && e !== trueEdge && !e.label,
          );
          if (falseEdge) falseEdge.label = "FALSE";
        } else {
          // No ELSE: condition FALSE goes directly to join
          addEdge(ctx.condNodeId, joinId, "FALSE");
          // Label TRUE edge
          const trueEdge = edges.find(
            (e) => e.from === ctx.condNodeId && e.to !== joinId,
          );
          if (trueEdge && !trueEdge.label) trueEdge.label = "TRUE";

          // Check empty branch
          if (!ctx.hasBody && !ctx.bodyStartNodeId) {
            const err: CFError = {
              type: "emptyBranch",
              message: `Empty IF branch at line ${ctx.line + 1}`,
              line: ctx.line,
            };
            errors.push(err);
          }
        }
        lastNodeId = joinId;
        terminated = false;
      }
      continue;
    }

    // --- FOR ---
    if ((m = code.match(RE_FOR))) {
      const id = makeId();
      const label =
        m[1].trim().length > 40
          ? "FOR " + m[1].trim().substring(0, 30) + "..."
          : "FOR " + m[1].trim();
      addNode({ id, label, type: "loop", line: i });
      connectLast(id);
      blockStack.push({
        type: "for",
        condNodeId: id,
        bodyStartNodeId: "",
        line: i,
      });
      lastNodeId = id;
      terminated = false;
      continue;
    }

    // --- ENDFOR ---
    if (RE_ENDFOR.test(code)) {
      const ctx = blockStack.pop();
      if (ctx && ctx.type === "for") {
        // Loop back
        connectLast(ctx.condNodeId);
        const exitId = makeId();
        addNode({ id: exitId, label: "ENDFOR", type: "process", line: i });
        addEdge(ctx.condNodeId, exitId, "done");
        lastNodeId = exitId;
        terminated = false;
      }
      continue;
    }

    // --- WHILE ---
    if ((m = code.match(RE_WHILE))) {
      const id = makeId();
      const cond = m[1].trim();
      addNode({
        id,
        label:
          cond.length > 40
            ? "WHILE " + cond.substring(0, 30) + "..."
            : "WHILE " + cond,
        type: "decision",
        line: i,
      });
      connectLast(id);
      blockStack.push({
        type: "while",
        condNodeId: id,
        bodyStartNodeId: "",
        line: i,
      });
      lastNodeId = id;
      terminated = false;
      continue;
    }

    // --- ENDWHILE ---
    if (RE_ENDWHILE.test(code)) {
      const ctx = blockStack.pop();
      if (ctx && ctx.type === "while") {
        connectLast(ctx.condNodeId); // loop back
        const exitId = makeId();
        addNode({ id: exitId, label: "ENDWHILE", type: "process", line: i });
        addEdge(ctx.condNodeId, exitId, "FALSE");
        // Label TRUE edge
        const trueEdge = edges.find(
          (e) => e.from === ctx.condNodeId && e.to !== exitId && !e.label,
        );
        if (trueEdge) trueEdge.label = "TRUE";
        lastNodeId = exitId;
        terminated = false;
      }
      continue;
    }

    // --- LOOP ---
    if (RE_LOOP.test(code)) {
      const id = makeId();
      addNode({ id, label: "LOOP", type: "loop", line: i });
      connectLast(id);
      blockStack.push({
        type: "loop",
        condNodeId: id,
        bodyStartNodeId: "",
        hasExit: false,
        line: i,
      });
      lastNodeId = id;
      terminated = false;
      continue;
    }

    // --- ENDLOOP ---
    if (RE_ENDLOOP.test(code)) {
      const ctx = blockStack.pop();
      if (ctx && ctx.type === "loop") {
        connectLast(ctx.condNodeId); // loop back
        const exitId = makeId();
        addNode({ id: exitId, label: "ENDLOOP", type: "process", line: i });
        lastNodeId = exitId;
        terminated = false;

        if (!ctx.hasExit) {
          const err: CFError = {
            type: "infiniteLoop",
            message: `LOOP without EXIT/HALT at line ${ctx.line + 1}`,
            line: ctx.line,
          };
          errors.push(err);
          const loopNode = nodes.find((n) => n.id === ctx.condNodeId);
          if (loopNode) loopNode.error = err;
        }
      }
      continue;
    }

    // --- SWITCH ---
    if ((m = code.match(RE_SWITCH))) {
      const id = makeId();
      addNode({
        id,
        label: "SWITCH " + m[1].trim(),
        type: "decision",
        line: i,
      });
      connectLast(id);
      blockStack.push({
        type: "switch",
        condNodeId: id,
        bodyStartNodeId: "",
        caseNodes: [],
        line: i,
      });
      lastNodeId = id;
      terminated = false;
      continue;
    }

    // --- CASE ---
    if ((m = code.match(RE_CASE))) {
      const ctx = blockStack[blockStack.length - 1];
      if (ctx && ctx.type === "switch") {
        const id = makeId();
        addNode({ id, label: "CASE " + m[1].trim(), type: "process", line: i });
        addEdge(ctx.condNodeId, id, m[1].trim());
        ctx.caseNodes?.push(id);
        lastNodeId = id;
        terminated = false;
      }
      continue;
    }

    // --- DEFAULT ---
    if (RE_DEFAULT.test(code)) {
      const ctx = blockStack[blockStack.length - 1];
      if (ctx && ctx.type === "switch") {
        const id = makeId();
        addNode({ id, label: "DEFAULT", type: "process", line: i });
        addEdge(ctx.condNodeId, id, "DEFAULT");
        ctx.caseNodes?.push(id);
        lastNodeId = id;
        terminated = false;
      }
      continue;
    }

    // --- ENDSWITCH ---
    if (RE_ENDSWITCH.test(code)) {
      const ctx = blockStack.pop();
      if (ctx && ctx.type === "switch") {
        const joinId = makeId();
        addNode({ id: joinId, label: "ENDSWITCH", type: "process", line: i });
        connectLast(joinId);
        lastNodeId = joinId;
        terminated = false;
      }
      continue;
    }

    // --- REPEAT ---
    if (RE_REPEAT.test(code)) {
      const id = makeId();
      addNode({ id, label: "REPEAT", type: "loop", line: i });
      connectLast(id);
      blockStack.push({
        type: "repeat",
        condNodeId: id,
        bodyStartNodeId: "",
        line: i,
      });
      lastNodeId = id;
      terminated = false;
      continue;
    }

    // --- UNTIL ---
    if ((m = code.match(RE_UNTIL))) {
      const ctx = blockStack.pop();
      if (ctx && ctx.type === "repeat") {
        const id = makeId();
        addNode({
          id,
          label: "UNTIL " + m[1].trim(),
          type: "decision",
          line: i,
        });
        connectLast(id);
        addEdge(id, ctx.condNodeId, "FALSE"); // loop back
        lastNodeId = id;
        terminated = false;
      }
      continue;
    }

    // --- LABEL ---
    if ((m = code.match(RE_LABEL))) {
      const labelName = m[1].toUpperCase();
      const id = labels.get(labelName) || makeId();
      // Update placeholder to real id if needed
      if (!nodes.find((n) => n.id === id)) {
        addNode({ id, label: m[1] + ":", type: "process", line: i });
      }
      labels.set(labelName, id);
      connectLast(id);
      lastNodeId = id;
      terminated = false;
      continue;
    }

    // --- GOTO ---
    if ((m = code.match(RE_GOTO))) {
      const id = makeId();
      addNode({ id, label: "GOTO " + m[1], type: "process", line: i });
      connectLast(id);
      gotoTargets.push({ nodeId: id, label: m[1].toUpperCase(), line: i });
      terminated = true;
      lastNodeId = id;
      continue;
    }

    // --- RETURN / EXIT / HALT ---
    if ((m = code.match(RE_RETURN))) {
      const kw = m[1].toUpperCase();
      const id = makeId();
      addNode({ id, label: kw, type: "terminator", line: i });
      connectLast(id);

      if (kw === "EXIT" || kw === "HALT") {
        // Mark LOOP as having an exit
        for (let s = blockStack.length - 1; s >= 0; s--) {
          if (blockStack[s].type === "loop") {
            blockStack[s].hasExit = true;
            break;
          }
        }
      }

      lastNodeId = id;
      terminated = true;
      continue;
    }

    // --- INTERRUPT ---
    if (RE_INTERRUPT.test(code)) {
      const id = makeId();
      const label = code.length > 50 ? code.substring(0, 47) + "..." : code;
      addNode({ id, label, type: "interrupt", line: i });
      // Side node — don't connect to main flow, just mark
      continue;
    }

    // --- INIT ($TOOL = ... / BAS(#INITMOV)) ---
    if (RE_INIT.test(code)) {
      toolInitialized = true;
      const id = makeId();
      addNode({
        id,
        label: code.length > 50 ? code.substring(0, 47) + "..." : code,
        type: "process",
        line: i,
      });
      connectLast(id);
      lastNodeId = id;

      // Check unreachable
      if (terminated) {
        const err: CFError = {
          type: "unreachable",
          message: `Unreachable code at line ${i + 1}`,
          line: i,
        };
        errors.push(err);
        nodes[nodes.length - 1].error = err;
      }
      terminated = false;
      continue;
    }

    // --- MOTION ---
    if ((m = code.match(RE_MOTION))) {
      const id = makeId();
      let label = code.length > 50 ? code.substring(0, 47) + "..." : code;
      if (detailed) label = "🚗 " + label;
      addNode({ id, label, type: "motion", line: i });

      if (terminated) {
        const err: CFError = {
          type: "unreachable",
          message: `Unreachable motion at line ${i + 1}`,
          line: i,
        };
        errors.push(err);
        nodes[nodes.length - 1].error = err;
      } else {
        connectLast(id);
      }

      if (!toolInitialized) {
        const err: CFError = {
          type: "uninitMotion",
          message: `Motion without TOOL/BASE init at line ${i + 1}`,
          line: i,
        };
        errors.push(err);
        nodes[nodes.length - 1].error = err;
      }

      lastNodeId = id;
      terminated = false;
      continue;
    }

    // --- FUNCTION CALL ---
    if ((m = code.match(RE_FUNC_CALL))) {
      const funcName = m[1].toUpperCase();
      if (!NON_CALL_KEYWORDS.has(funcName)) {
        const id = makeId();
        let label = code.length > 50 ? code.substring(0, 47) + "..." : code;
        if (detailed) {
          if (funcName === "PULSE") {
            label = "💡 " + label;
          } else {
            label = "📦 " + label;
          }
        }
        addNode({
          id,
          label,
          type: "call",
          line: i,
          target: funcName,
        });

        if (terminated) {
          const err: CFError = {
            type: "unreachable",
            message: `Unreachable code at line ${i + 1}`,
            line: i,
          };
          errors.push(err);
          nodes[nodes.length - 1].error = err;
        } else {
          connectLast(id);
        }

        lastNodeId = id;
        terminated = false;
        continue;
      }
    }

    // --- GENERAL STATEMENT ---
    // Skip declarations, assignments that are not interesting for CFG
    if (/^\s*(?:DECL|SIGNAL|STRUC|ENUM)\b/i.test(code)) continue;
    if (/^\s*(?:DEFDAT|ENDDAT)\b/i.test(code)) continue;

    // For simple assignments and WAIT etc. — group them unless they are interesting
    if (
      detailed ||
      /^\s*WAIT\s+SEC\b/i.test(code) ||
      /^\s*WAIT\s+FOR\b/i.test(code)
    ) {
      const id = makeId();
      let label = code.length > 50 ? code.substring(0, 47) + "..." : code;
      if (detailed) {
        if (/^\s*WAIT\b/i.test(code)) label = "⏳ " + label;
        else if (
          /^\s*\$OUT\b/i.test(code) ||
          /=\s*(?:TRUE|FALSE)\b/i.test(code)
        )
          label = "💡 " + label;
        else label = "🔹 " + label;
      }
      addNode({
        id,
        label,
        type: "process",
        line: i,
      });
      if (terminated) {
        const err: CFError = {
          type: "unreachable",
          message: `Unreachable code at line ${i + 1}`,
          line: i,
        };
        errors.push(err);
        nodes[nodes.length - 1].error = err;
      } else {
        connectLast(id);
      }
      lastNodeId = id;
      terminated = false;
    }
    // Skip other simple statements to avoid cluttering the graph
  }

  // Resolve GOTO edges
  for (const gt of gotoTargets) {
    const targetId = labels.get(gt.label);
    if (targetId) {
      addEdge(gt.nodeId, targetId);
    } else {
      const err: CFError = {
        type: "invalidGoto",
        message: `GOTO target '${gt.label}' not found (line ${gt.line + 1})`,
        line: gt.line,
      };
      errors.push(err);
      const gotoNode = nodes.find((n) => n.id === gt.nodeId);
      if (gotoNode) gotoNode.error = err;
    }
  }

  return { nodes, edges, errors };
}

/**
 * Generate Mermaid flowchart syntax from a CFGraph.
 */
export function generateMermaid(graph: CFGraph): string {
  const lines: string[] = ["graph TD"];

  // Define node styles
  lines.push(
    "  classDef errorNode fill:#ff4444,stroke:#cc0000,color:#fff,stroke-width:2px",
  );
  lines.push("  classDef motionNode fill:#2196F3,stroke:#1565C0,color:#fff");
  lines.push("  classDef callNode fill:#9C27B0,stroke:#6A1B9A,color:#fff");
  lines.push("  classDef startNode fill:#4CAF50,stroke:#2E7D32,color:#fff");
  lines.push("  classDef endNode fill:#607D8B,stroke:#37474F,color:#fff");
  lines.push("  classDef loopNode fill:#FF9800,stroke:#E65100,color:#fff");
  lines.push(
    "  classDef interruptNode fill:#795548,stroke:#4E342E,color:#fff,stroke-dasharray: 5 5",
  );

  for (const node of graph.nodes) {
    const safeLabel = node.label.replace(/"/g, "'").replace(/[[\]{}()]/g, " ");
    let shape: string;

    switch (node.type) {
      case "start":
        shape = `${node.id}([${JSON.stringify(safeLabel)}])`;
        break;
      case "end":
        shape = `${node.id}([${JSON.stringify(safeLabel)}])`;
        break;
      case "decision":
        shape = `${node.id}{${JSON.stringify(safeLabel)}}`;
        break;
      case "loop":
        shape = `${node.id}[/${JSON.stringify(safeLabel)}/]`;
        break;
      case "motion":
        shape = `${node.id}(${JSON.stringify(safeLabel)})`;
        break;
      case "terminator":
        shape = `${node.id}[[${JSON.stringify(safeLabel)}]]`;
        break;
      default:
        shape = `${node.id}[${JSON.stringify(safeLabel)}]`;
    }

    lines.push(`  ${shape}`);

    // Apply styles
    if (node.error) {
      lines.push(`  class ${node.id} errorNode`);
    } else {
      const styleMap: Record<string, string> = {
        motion: "motionNode",
        call: "callNode",
        start: "startNode",
        end: "endNode",
        loop: "loopNode",
        interrupt: "interruptNode",
      };
      if (styleMap[node.type]) {
        lines.push(`  class ${node.id} ${styleMap[node.type]}`);
      }
    }
  }

  // Edges
  for (const edge of graph.edges) {
    if (edge.label) {
      lines.push(`  ${edge.from} -->|${edge.label}| ${edge.to}`);
    } else {
      lines.push(`  ${edge.from} --> ${edge.to}`);
    }
  }

  // Click handlers
  for (const node of graph.nodes) {
    lines.push(`  click ${node.id} callback "${node.line}"`);
  }

  return lines.join("\n");
}
