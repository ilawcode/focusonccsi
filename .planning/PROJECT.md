# Project Tracking Dashboard

## What This Is

A Next.js web application for project and task tracking integrated with Jira. Users can log in, sync Jira tasks using their Jira token via specific search criteria, assign tasks to themselves, and track task timelines and audit histories with strict justification enforcement.

## Core Value

Provide role-based, chronological visualization and tracking of Jira project tasks to ensure deadlines are monitored and roles can seamlessly log and view their specific phase dates with full accountability.

## Requirements

### Validated

<!-- Shipped and confirmed valuable. -->

- [x] **Foundation**: User authentication and premium dark-mode UI system.
- [x] **Jira**: Dynamic search and task import via proxy API.
- [x] **Timeline**: Granular phase tracking (14 dates) for 7 specialized roles.
- [x] **Auditing**: Compulsory 100-character justification for every date edit.
- [x] **Visualization**: Interactive Gantt and Table dashboards with role-based sorting.
- [x] **Analytics**: Real-time summary cards for overdue and upcoming targets.

### Out of Scope

- [**Non-Jira task management**] — The system relies exclusively on Jira as the source of truth for tasks.
- [**Sequential Phase Blocking**] — Users explicitly requested the freedom to enter any date in any order.

## Context

The application simplifies task tracking across Backend, Frontend (Web), Mobile, and Testing disciplines. It acts as a specialized management layer on top of Jira, ensuring that every project phase has a clear target date and that any changes to those targets are documented and justified.

## Constraints

- **Tech Stack**: Next.js 15+, MongoDB, NextAuth.js.
- **Data Source**: Jira API (PAT-based auth requested per session).

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js App Router | Modern default, provides excellent performance and secure API routes. | Success |
| AuditLog Collection | Storing reasons and diffs separately ensures the primary Task document stays performant. | Success |
| Session-based PAT | Storing Jira tokens only in memory/session increases security. | Success |
| Mandatory Justification | Enforcing 100+ chars for edits ensures high accountability in tracking. | Success |

---
*Last updated: 2026-04-15 after Phase 5*
