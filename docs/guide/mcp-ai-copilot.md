# Model Context Protocol (MCP) & AI Copilot Integration

Connect external AI assistants directly to live industrial robot telemetry and workspace diagnostics.

---

## Overview

The **Model Context Protocol (MCP)** is an open standard that enables AI systems to securely interface with development tools and industrial hardware.

The KUKA KRL extension features an **embedded local MCP Bridge Server** running on `127.0.0.1`. It connects modern AI programming environments (**Cursor, Google Antigravity, Claude Code CLI, Windsurf**) directly to your KUKA workspace, offline AST diagnostics, and live robot controller telemetry.

```
+-------------------------------------------------------------+
|                      AI Assistant Client                    |
|          (Cursor / Google Antigravity / Claude Code)        |
+-------------------------------------------------------------+
                              |
                    Model Context Protocol
                   (JSON-RPC / HTTP Bridge)
                              |
                              v
+-------------------------------------------------------------+
|             Embedded KUKA KRL MCP Server (127.0.0.1)        |
|  +---------------------------+ +--------------------------+ |
|  | Workspace Diagnostics     | | Live Hardware Telemetry  | |
|  | - AST Syntax Validation   | | - $AXIS_ACT, $POS_ACT    | |
|  | - Safe Auto-Repair Engine | | - Active Tool / Base     | |
|  | - Block Balance Guard     | | - SmartPAD Alarm Stream  | |
|  +---------------------------+ +--------------------------+ |
+-------------------------------------------------------------+
                              |
                     Industrial Network
                              v
+-------------------------------------------------------------+
|                 Physical KUKA Controller                    |
|           (KR C4 / KR C5 via KUKAVARPROXY & WCF)            |
+-------------------------------------------------------------+
```

---

## Available MCP Tools

External AI assistants gain access to specialized industrial tools:

| Tool Name | Scope | Capability |
|---|---|---|
| `krl_live_telemetry` | Hardware | Reads real-time axes, Cartesian TCP, active tool/base, operating mode, and alarms from running robot |
| `krl_workspace_diagnostics` | Project | Audits all `.src`, `.dat`, and `.sub` files for unclosed FOLDs, syntax bugs, and kinematic violations |
| `krl_safe_auto_repair` | Code | Deterministically repairs structural fold mismatches, missing BRAKE commands, and illegal STEP 0 loops |
| `krl_system_variable_spec` | Knowledge | Retrieves specifications, physical units, and array limits for 957+ KSS system variables |
| `krl_alarm_lookup` | Diagnostics | Decodes numeric KSS error codes (e.g. `KSS00203`, `KSS01442`) across 6 languages |

---

## Connecting External AI Clients

### 1. Automatic Cursor Setup
When running inside Cursor, the extension automatically registers the local MCP server via `vscode.cursor.mcp.registerServer` on launch with zero manual setup.

### 2. Manual JSON Configuration Export
Use command `KUKA KRL: Copy MCP Configuration` (`Ctrl+Shift+P`) to copy client-ready JSON configurations:

```json
{
  "mcpServers": {
    "kuka-krl": {
      "command": "node",
      "args": ["c:/Projects/01_Robotics/kuka-krl-mcp/bin/server.js"],
      "env": {
        "KUKA_BRIDGE_PORT": "49152"
      }
    }
  }
}
```

### 3. Open-Source Ecosystem
* **Standalone Server**: [LiskinLabs/kuka-krl-mcp](https://github.com/LiskinLabs/kuka-krl-mcp) (MIT License)
* **AI Prompt Rules & Skills**: [LiskinLabs/kuka-krl-skills](https://github.com/LiskinLabs/kuka-krl-skills)
