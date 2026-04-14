# Phase 3: Timeline & Audit Data Layer - Context

**Gathered:** 2026-04-14
**Status:** Ready for planning

<domain>
## Phase Boundary

Implement the schema for role-based phase tracking and a comprehensive audit logging system to track all date modifications with high precision (DateTime). 
</domain>

<decisions>
## Implementation Decisions

### Roles & Phase Mapping
- **D-01:** Expanded Role List:
  - **BE Analist** -> BE Analysis (Start/Done)
  - **BE Dev** -> BE Dev (Start/Done)
  - **Web Analist** -> Web Analysis (Start/Done)
  - **Web Dev** -> Web Dev (Start/Done)
  - **Mobile Analist** -> Mobile Analysis (Start/Done)
  - **Mobile Dev** -> Mobile Dev (Start/Done)
  - **Test** -> Test (Start/Done)

### Data Persistence
- **D-02:** **Audit Logs** will be stored in a **separate collection** (AuditLog), linking to the Task and User.
- **D-03:** Store all phase tracking entries with **full Date + Time** precision.

### Logic & Constraints
- **D-04:** **No blocking dependencies**: Users can enter dates in any order (concurrently or separately). 
- **D-05:** High-level timeline updates: All dates should be viewable simultaneously during editing/addition in the future UI (Phase 4).
- **D-06:** Role Enforcement: Ensure only the correctly assigned role can modify its respective start/done dates.

### the agent's Discretion
- Exact schema for `AuditLog` (e.g., storing deltas vs full snapshots).
- Implementation of the "Role update" check in the API.
</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Scope
- `.planning/PROJECT.md` — Project context and core values.
- `.planning/REQUIREMENTS.md` — TASK-01, TASK-02, TASK-03.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/models/Task.ts` — Needs expansion to accommodate new sub-phases (Web Analysis/Dev, Mobile Analysis/Dev).
- `src/models/User.ts` — Needs adjustment for the expanded role list enum.

### Integration Points
- New API route `/api/tasks/[id]/timeline` to update dates and create Audit entries.
- Enhancement of dashboard UI (in Phase 4) to support these roles.
</code_context>

<specifics>
## Specific Ideas

- Create `src/models/AuditLog.ts` to track: `taskId`, `userId`, `action` (update), `changes` (array of field, old, new).
- Ensure the User Role Enum in `src/models/User.ts` is updated to allow: `BE Analist`, `BE Dev`, `Web Analist`, `Web Dev`, `Mobile Analist`, `Mobile Dev`, `Test`.
</specifics>

<deferred>
## Deferred Ideas

- Blocking phase dependencies (explicitly rejected by user).
</deferred>

---

*Phase: 03-timeline-audit-data-layer*
*Context gathered: 2026-04-14*
