# Phase 4: Main Dashboard & Visualization - Context

**Gathered:** 2026-04-15
**Status:** Ready for planning

<domain>
## Phase Boundary

Develop the central dashboard visualization featuring both a task management table and a Gantt chart. Implement role-based sorting and a strict audit-driven editing flow requiring mandatory justifications.
</domain>

<decisions>
## Implementation Decisions

### Visualization
- **D-01:** Dual view:
    1.  **Tabular View**: List of all tasks with their respective phase dates.
    2.  **Gantt View**: Chromatic representation of phase durations.
- **D-02:** **Chromatic Highlighting**: Dates that have been modified (not original) should be displayed in a distinct color in the Gantt chart.

### Editing & Auditing
- **D-03:** **Mandatory Justification**: Every date change requires an explanation of **at least 100 characters**.
- **D-04:** **Edit Flow**: Handled via a Modal popup.
- **D-05:** **History Component**: Users can view the change history for any date, including the timestamp, the user who changed it, and their mandatory 100-char explanation.

### UX & Logic
- **D-06:** **Sorting**: Tasks are sorted by the logged-in user's role's deadlines (nearest to furthest).
- **D-07:** **Permissions**: Users can view all tasks but can only edit fields assigned to their specific role.
- **D-08:** **Default View**: Show the most recent date and explanation by default in summaries.

### the agent's Discretion
- Library choices for Gantt Chart (e.g., SVG based vs CSS Grid based).
- Modal UI design for the justification enforcement.
</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Scope
- `.planning/PROJECT.md` — Project context.
- `.planning/REQUIREMENTS.md` — DASH-01, DASH-02, DASH-03.

### Data Layer
- `src/models/Task.ts` — Existing phase date fields.
- `src/models/AuditLog.ts` — Needs expansion for the `reason` field.
</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/app/dashboard/page.tsx` — Current implementation will be replaced or heavily augmented.
- `src/app/api/tasks/[id]/timeline/route.ts` — Needs revision to enforce the 100-char justification.

### Integration Points
- Update `src/models/AuditLog.ts` to include `reason` (string, required).
- Frontend date picker and modal logic for validation.
</code_context>

<specifics>
## Specific Ideas

- Use a progress bar or character counter in the Edit Modal to help users meet the 100-character requirement.
- The Gantt chart can use tooltips to show the latest change reason when hovering over a modified date segment.
</specifics>

<deferred>
## Deferred Ideas

- Automated dependency blocking (previously rejected).
</deferred>

---

*Phase: 04-main-dashboard-visualization*
*Context gathered: 2026-04-15*
