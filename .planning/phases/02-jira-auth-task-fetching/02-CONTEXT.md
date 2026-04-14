# Phase 2: Jira Auth & Task Fetching - Context

**Gathered:** 2026-04-14
**Status:** Ready for planning

<domain>
## Phase Boundary

Securely accept Jira Personal Access Tokens (PAT), search Jira issues using JQL, and import task metadata into our local system for tracking.
</domain>

<decisions>
## Implementation Decisions

### Jira Authentication
- **D-01:** Jira PAT will NOT be stored in the database.
- **D-02:** Ask for the token in each session. Maintain the token in user session/state for the duration of the visit.

### Searching & Criteria
- **D-03:** Provide JQL (Jira Query Language) support for flexible issue searching.

### Data Fetching & Mapping
- **D-04:** The Jira fields to be fetched (e.g., summary, description, custom fields) will be controlled by a dedicated JSON configuration file (e.g., `config/jira-fields.json`).
- **D-05:** If a field needs to be added or removed, only the JSON config needs modification.

### Scope & Instance
- **D-06:** The application will interact with a single, predefined Jira instance URL (to be configured in `.env.local`).

### the agent's Discretion
- Logic for task "importing" (deduplication check vs Jira ID).
- UI/UX for the token input modal/panel.
- Jira Field mapping logic (how JSON keys map to Jira API responses).
</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Scope
- `.planning/PROJECT.md` — Overall project goals.
- `.planning/REQUIREMENTS.md` — INT-01, INT-02, INT-03.

### External APIs
- Jira REST API (v3 preferred) — For issue searching and field retrieval.
</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/lib/db.ts` — For importing tasks into MongoDB.
- `src/app/dashboard/page.tsx` — Main dashboard where Jira search UI will live.

### Integration Points
- `JIRA_INSTANCE_URL` should be added to `.env.local`.
- A new API route `/api/jira/search` for proxying Jira requests.
- A new API route `/api/tasks/import` for saving Jira issues to local DB.
</code_context>

<specifics>
## Specific Ideas

- Create `src/config/jira-fields.json` to store the list of Jira fields to fetch.
- Use a "Token Entry" modal that appears on the dashboard if no Jira token is present in the current session.
</specifics>

<deferred>
## Deferred Ideas

- Storing Jira PAT permanently (explicitly rejected by user).
</deferred>

---

*Phase: 02-jira-auth-task-fetching*
*Context gathered: 2026-04-14*
