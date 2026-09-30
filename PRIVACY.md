# Privacy Policy & GDPR Compliance Statement
**KUKA KRL Extension for Visual Studio Code**  
*Last updated: 2026-09-30*  
*Liskin Labs / Silvestr Liskin Engineering*

---

## 1. Executive Summary & Core Commitment

Liskin Labs designs and engineers industrial-grade development tooling for roboticists, automation engineers, and manufacturing plants worldwide. We are strictly committed to data privacy, industrial confidentiality, and full compliance with the European Union General Data Protection Regulation (**GDPR - Regulation (EU) 2016/679**), the **ePrivacy Directive**, and international cybersecurity standards.

### 🛡️ The Industrial Air-Gap Guarantee
- **Zero Proprietary Code Exfiltration:** All KRL syntax parsing, AST analysis, kinematics calculations, coordinate transformations (`BASE_DATA`, `TOOL_DATA`), block diagrams, and variable inspections execute **100% locally in your computer's RAM**.
- **No Remote Code Processing:** Your robot programs (`.src`), data lists (`.dat`), safety configurations, and proprietary automation formulas never leave your local environment and are never transmitted to any cloud service.
- **Air-Gap Capable:** The extension operates seamlessly in high-security, air-gapped industrial environments without internet connectivity.

---

## 2. Telemetry & Data Minimization (GDPR Art. 5(1)(c))

To maintain software reliability across diverse KUKA System Software (KSS) versions and prevent catastrophic teach-in crashes, the extension transmits a minimal, privacy-first technical heartbeat.

### What Data We Collect
| Category | Data Points | GDPR Status & Legal Classification |
|---|---|---|
| **B2B Organization & ISP** | Autonomous System Organization (`as_organization`, e.g., corporate enterprise ISP / enterprise network), Country, City | **Non-PII (B2B Data):** Under **Recital 14 GDPR**, processing of data concerning legal entities and corporate undertakings falls outside the scope of personal data. |
| **Network IP Address** | Anonymized subnet address (masked to `/24` for IPv4, e.g. `195.14.25.0`, and `/48` for IPv6) | **Anonymized:** In accordance with the Court of Justice of the European Union (**CJEU Case C-582/14, *Breyer***), full IP addresses are truncated at the Cloudflare Edge before database storage. |
| **Industrial Environment** | KSS version detected (e.g., KSS 8.6, KSS 8.7, VKRC4), number of KRL files, active robot model signatures | **Technical Context:** Equipment specifications necessary for compiler compatibility. |
| **Hardware & Host Pseudonym** | Cryptographically salted SHA-256 device identifier, generic CPU/OS architecture (`win32 x64`) | **Pseudonymized Data:** Irreversible hash used strictly for license seat validation and deduplication. |
| **Software Metadata** | Extension version, VS Code engine version, license tier (`COMMUNITY` / `PRO`) | **Operational Data:** Required for update delivery and entitlement verification. |

### What We NEVER Collect
- ❌ **No Robot Code or File Contents:** Never read, uploaded, or transmitted.
- ❌ **No Personal Identifiers:** Personal Windows usernames are strictly replaced with `anonymous`.
- ❌ **No Personal File Trees or Installed Applications:** No auditing of unrelated personal software or directories.
- ❌ **No Keystrokes or Source Diff:** No tracking of edits or project source contents.

---

## 3. Legal Basis for Processing (GDPR Art. 6)

We process minimal operational and diagnostic telemetry under the following lawful bases:
1. **Art. 6(1)(f) Legitimate Interests:** Ensuring the operational stability, crash prevention, kernel compatibility, and cybersecurity of industrial robotics engineering tooling.
2. **Art. 6(1)(b) Performance of a Contract:** Fulfilling software license verification, seat count enforcement, and entitlement delivery for commercial Pro and Enterprise licenses.

---

## 4. How to Opt Out of Telemetry

You have full control over your telemetry preferences. You can disable telemetry at any time:

### Method 1: Extension-Specific Toggle
Open VS Code Settings (`Ctrl + ,`), search for `KUKA Telemetry`, and uncheck:
```json
{
  "kuka.telemetry.enabled": false
}
```

### Method 2: Global VS Code Telemetry Setting
The extension honors the global Visual Studio Code telemetry preference:
```json
{
  "telemetry.telemetryLevel": "off"
}
```
When either setting is set to disabled, all outbound diagnostic heartbeats are instantly terminated.

---

## 5. Security & Data Retention (GDPR Art. 32)

- **Transport Encryption:** All telemetry is encrypted in transit using **TLS 1.3** and client-authenticated RSA/AES envelopes.
- **Edge Storage:** Telemetry records are stored in secure European edge data centers (Frankfurt, Germany) managed via Cloudflare D1.
- **Retention Period:** Heartbeat telemetry is retained for operational diagnostics for a maximum of 90 days, after which inactive entries are automatically expunged.

---

## 6. Contact & Data Protection Inquiries

For questions regarding this Privacy Policy, data subject rights (GDPR Articles 15–22), or enterprise compliance audits, please contact:

- **Engineering Lead:** Silvestr Liskin
- **Organization:** Liskin Labs (Teknorob Robot ve Otomasyon)
- **Email:** `support@liskinlabs.com` / `silvestr.liskin@teknorob.com`
- **Issue Tracker:** [GitHub Issues](https://github.com/LiskinLabs/kuka-krl-extension/issues)
