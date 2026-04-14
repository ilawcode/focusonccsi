# Phase 2: Jira Auth & Task Fetching - Discussion Log

**Date:** 2026-04-14
**Phase:** 2-Jira Auth & Task Fetching

---

## Technical Stack & Logic

| Option | Description | Selected |
|--------|-------------|----------|
| Token Persistence | Should Jira PAT be stored in DB? | No, ask every session |
| Search Method | How should users find tasks? | JQL Support |
| Field Mapping | How to define which Jira fields are used? | External JSON config file |
| Instance Multiplicity | Multi-tenant Jira or single instance? | Single instance |

**User's choice:** her oturumda tokenı yeniden soralım, JQL desteği olsun, hangi alanların çeklineceği bir json üzerinde tutalım değişim gerekirse json dosyasını değiştiririz ona göre alanlar değiştir eklenir ya da çıkarılır. tek bir jira instance çalışacağız
**Notes:** User values security (session-only tokens) and maintainability (JSON-driven fields).

---

## Deferred Ideas

- Permanent token storage.
