# Model Context Protocol (MCP) KI-Integration

Verbindung moderner KI-Entwicklungsumgebungen mit Industrie-Telemetrie und Projekt-Diagnostik.

---

## Übersicht

Das **Model Context Protocol (MCP)** ist der offene Industriestandard für die Kommunikation zwischen KI-Agenten und Entwicklungsumgebungen.

Die KUKA KRL-Erweiterung stellt einen **lokalen MCP-Brückenserver** auf `127.0.0.1` bereit, der KI-Tools (**Cursor, Google Antigravity, Claude Code, Windsurf**) direkt mit dem KRL-Code, AST-Parsern und KUKA-Steuerungen verbindet.

---

## Verfügbare MCP-Werkzeuge

| Tool-Name | Bereich | Funktion |
|---|---|---|
| `krl_live_telemetry` | Hardware | Liest Achswinkel, TCP-Koordinaten, Betriebsart und Meldungen des realen Roboters |
| `krl_workspace_diagnostics` | Projekt | Prüft `.src`, `.dat`, `.sub` auf Syntaxfehler, ungeschlossene FOLDs und Vorlaufstopps |
| `krl_safe_auto_repair` | Code | Behebt Strukturfehler deterministisch mit Rollback-Sicherheit |
| `krl_system_variable_spec` | Wissen | Dokumentation und Typinformationen zu 957+ KSS-Systemvariablen |
| `krl_alarm_lookup` | Diagnose | Übersetzung und Erklärung von KSS-Meldungscodes in 6 Sprachen |
