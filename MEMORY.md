# KUKA KRL Extension (Public Docs & Issues) — Project Memory & DevSecOps Architecture

## 📌 Project Overview
- **Repository:** `LiskinLabs/kuka-krl-extension`
- **Tech Stack:** VitePress, Markdown, Tailwind CSS, GitHub Pages.
- **Purpose:** Public documentation portal, user guides, tutorials, and issue tracking repository for the KUKA KRL VS Code extension.

---

## 🛡️ DevSecOps & CI/CD Pipeline Matrix (All-Green Standard)
| Workflow | File | Triggers | Description |
| :--- | :--- | :--- | :--- |
| **Deploy VitePress** | `.github/workflows/deploy-docs.yml` | `push: main` | VitePress build & static deployment to GitHub Pages |
| **Dependency Security** | `.github/workflows/dependency-review.yml` | `push`, `pull_request`, weekly | Supply chain vulnerability audit with npm audit |
| **CodeQL Advanced SAST** | `.github/workflows/codeql.yml` | `push`, `pull_request`, weekly | Static code security analysis for JavaScript/TypeScript, SARIF artifact persistence |

---
*Updated: 2026-08-25 | Liskin Labs Engineering*
