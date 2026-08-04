# Changelog

All notable changes to the **KUKA KRL Extension** will be documented in this file.

## [1.8.5] - 2026-08-02

### Added
- **Interactive SVG Motion Diagrams**: Dynamic 2-column Motion Scheme visualization in `Snippet Generator` for `PTP`, `LIN`, `CIRC`, `SPTP`, `SLIN`, `SCIRC`, and `SPLINE Block`.
- **KSS 8.3+ Spline Motion Snippets**: Full support for Spline PTP (`SPTP`), Spline Linear (`SLIN`), Spline Circular (`SCIRC`), and `SPLINE Path Block` with automatic `$SGEAR_JERK` and `C_Spl` blending configurations.
- **KRC Backup Diff & Point Delta Inspector**: Direct comparison of `.src`/`.dat` files and $E6POS/POS/E6AXIS$ point coordinates against KRC `.zip` backup archives.
- **Initialization FOLD Snippet (`INI`)**: Standardized KUKA KRC4/KRC5 initialization FOLD block snippet.

### Fixed
- **Codicon UI Manifest Fix**: Fixed broken icon rendering for `krl.showCalculator` (`$(symbol-numeric)`) and `krl.validateEkiXml` (`$(file-code)`).
- **Icon Auto-Validation**: Integrated strict VS Code Codicon validation into `validate-json.js`.

## [1.7.2] - 2026-04-02

### Added
- **Full KSS 8.7 Documentation**: Over 350 system variables now have detailed trilingual descriptions (EN, RU, TR).
- **Semantic Inlay Hints**: Real-time descriptive labels for `$IN`, `$OUT`, `$ANIN`, `$ANOUT`, `TOOL_DATA`, and `BASE_DATA` indices.
- **Enhanced Hover Info**: Hovering over system variables now shows `Type`, `Writability` (Read-Only status), and `Syntax`.
- **Turkish Localization**: Comprehensive support for the Turkish language across all documentation and UI elements.

### Fixed
- **Navigation Bug**: Fixed a core issue where the `$` character was stripped during word detection, breaking Go to Definition and References for system variables.
- **LSP Performance**: Implemented a memory-based symbol cache. Navigation (F12) and Hover are now near-instant, even in large projects.
- **Security**: Fixed a critical ReDoS (Regular Expression Denial of Service) vulnerability in the variable declaration parser.
- **Formatting**: Global cleanup of line endings (CRLF/LF) and formatting for 6000+ lines of code.

### Removed
- GitHub Sponsorship integration.

## [1.7.1] - 2026-01-28
- Initial internal release with basic KRL support.
