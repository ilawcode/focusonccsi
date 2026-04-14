# Phase 3: Timeline & Audit Data Layer - Discussion Log

**Date:** 2026-04-14
**Phase:** 3-Timeline & Audit Data Layer

---

## Technical Stack & Logic

| Option | Description | Selected |
|--------|-------------|----------|
| Audit Storage | Separate table or task history? | Separate collection (AuditLog) |
| Precision | Day or Precise Time? | Full DateTime |
| Role Hierarchy | Web/Mobile role split | Splitting into Analysis and Dev roles for both |
| Order Logic | Dependency blocking? | No, all can be entered independently |

**User's choice:** ayrı tutalım, mobil ve web de de analiz ve dev rolleri olması gerekiyor, tam saat bilgisi alalım yok tüm veriler aynı anda da girilebilir ayrı ayrıda bir birini beklemeyecek timeline eklerken tüm tarihleri görecek şekilde ekleyeceğiz
**Notes:** User values independence of data entry and granular role assignment.

---

## Deferred Ideas

- Sequential phase blocking.
