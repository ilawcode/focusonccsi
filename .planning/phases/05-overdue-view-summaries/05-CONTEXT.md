# Phase 5: Overdue View & Summaries - Context

**Gathered:** 2026-04-15
**Status:** Ready for planning

<domain>
## Phase Boundary

Implement Role-centric Analytics and Overdue tracking widgets directly atop the main Timeline table on the dashboard. Focus heavily on alerting users to missed or impending deadlines specific only to their scope of work.
</domain>

<decisions>
## Implementation Decisions

### Logic Definition
- **D-01:** **Overdue Logic**: A task is deemed "overdue" for a user if `Current Date > Task[role_Done_Date]` and the task phase is not marked complete (e.g. Done date is in the past, implying it's overdue if it's the target). 
*(Note: If a task has a `Done` date, it's just a target deadline. It's considered overdue if today passes that date.)*
- **D-02:** **Role Isolation**: The summary metrics should ONLY compute and display data relevant to the logged-in user's role.

### UI / Presentation
- **D-03:** **Positioning**: Analytics cards will be placed at the top of the "Timeline View" tab, right above the `TaskTable`.
- **D-04:** **Metrics to Show**:
  - Total tasks mapped to my role.
  - Tasks Overdue for my role deadline.
  - Tasks Due This Week for my role deadline.

### the agent's Discretion
- Highlighting overdue tasks visually within the `TaskTable` (e.g., coloring the date cell red if it is in the past).
- Precise metric calculation logic inside a `useMemo` or API layer.
</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Scope
- `.planning/REQUIREMENTS.md`

### Existing UI Context
- `src/app/dashboard/page.tsx` — Target for placing the Analytics widgets.
- `src/components/TaskTable.tsx` — Needs updates to visually flag overdue dates.
</canonical_refs>

<code_context>
## Existing Code Insights

- Tasks are already fetched with all dates intact and sorted by the active role's deadline (`/api/tasks`).
- React state already holds all required data in `dashboard/page.tsx`. Can process summaries on the client side without needing a new endpoint.
</code_context>

---

*Phase: 05-overdue-view-summaries*
*Context gathered: 2026-04-15*
