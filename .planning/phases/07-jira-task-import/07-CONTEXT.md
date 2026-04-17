# Phase 07: Jira Task Import - Context

**Gathered:** 2026-04-17
**Status:** Ready for planning

<domain>
## Phase Boundary

Stabilize and enhance the Jira task import workflow. This phase covers implementing a bulk import capability ("Import All"), establishing a configurable date mapping system via JSON, and refining the dashboard to focus on waterfall flow tracking rather than Jira status synchronization.
</domain>

<decisions>
## Implementation Decisions

### Data Integration & Mapping
- **D-01:** **Configurable Date Mapping**: Create `src/config/jira-date-mapping.json` to define which Jira custom fields map to the 14 local timeline dates (Start/Done for 7 roles). 
- **D-02:** **Source of Truth**: The local application is the master for the "Waterfall Flow" (dates). Jira is used only for initial metadata (Key, Summary, Description, Type).
- **D-03:** **Status Exclusion**: The Jira "status" column is not required in the local task views. Focus purely on the timeline dates managed within this application.

### Import Workflow
- **D-04:** **Bulk Import**: Implement an "Import All" button in the search interface to batch-import all results from a JQL query.
- **D-05:** **Self-Assignment**: All imported tasks (individually or bulk) are automatically assigned to the user performing the import.
- **D-06:** **Update Policy**: If an existing task is re-imported, metadata (summary, description, type) should be updated from Jira, but local timeline dates and audit history must be preserved.

### UI & UX
- **D-07:** **Dashboard Clean-up**: Remove or hide the Jira "Status" column from the main `TaskTable` and `GanttChart` to prioritize the phase completion state over Jira's internal status.
- **D-08:** **Bulk Feedback**: Provide a clear UI indicator (loading spinner/message) during the "Import All" process to show progress.

### the agent's Discretion
- Location of the "Import All" button (top of search results vs form level).
- Exact structure of the `jira-date-mapping.json` (e.g., nested vs flat).
</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Scope
- `.planning/PROJECT.md` — Core project vision.
- `.planning/REQUIREMENTS.md` — INT-03, INT-05.

### System Configuration
- `src/config/jira-fields.json` — Existing field whitelist for Jira API.
</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/app/api/jira/search/route.ts` — Use this proxy for all search queries.
- `src/app/api/tasks/import/route.ts` — Existing individual import logic to be extended for bulk support.
- `src/app/dashboard/page.tsx` — Dashboard UI updates.

### Integration Points
- Update `src/app/api/tasks/import/route.ts` to accept an array of issues for bulk processing.
- Create `src/config/jira-date-mapping.json`.
</code_context>

<specifics>
## Specific Ideas

- The `jira-date-mapping.json` should allow mapping a single Jira field (like `duedate`) to multiple local dates if the user desires a simple "everything targets one date" fallback.
- The `Import All` process should handle `Promise.all` or sequential calls to ensure stability on the server side.
</specifics>

<deferred>
## Deferred Ideas

- Permanent Jira Status syncing (explicitly rejected by user).
</deferred>

---

*Phase: 07-jira-task-import*
*Context gathered: 2026-04-17 via discussion*
