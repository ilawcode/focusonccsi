# Requirements

## v1 Requirements

### Authentication
- [ ] **AUTH-01**: User can register an account with First Name, Last Name, Email, and Password.
- [ ] **AUTH-02**: User can log in using Email and Password.
- [ ] **AUTH-03**: User can be assigned one of the roles (BE Analyst, BE Dev, Web, Mobile).

### Integration
- [ ] **INT-01**: User can provide and update their Personal Jira Token.
- [ ] **INT-02**: System can fetch Jira tasks using specific search criteria via the Jira API.
- [ ] **INT-03**: User can browse fetched Jira tasks, pick them, and self-assign them within the app timeline.

### Task Management
- [ ] **TASK-01**: User can view a timeline representation of tasks (BE analysis, BE Dev, Test, FE/Web, Mobile phases).
- [ ] **TASK-02**: User can only input and modify Start/Done dates for the phase matching their assigned role (e.g. Web role can only edit FE dates).
- [ ] **TASK-03**: System tracks and displays a detailed trail of when dates were entered/modified and by whom (hierarchical audit log).

### Dashboard View
- [ ] **DASH-01**: Application home is a Timeline Dashboard view.
- [ ] **DASH-02**: Dashboard surfaces approaching tasks targeting the logged-in user's role dates.
- [ ] **DASH-03**: Tasks are sorted dynamically from nearest approaching date to furthest.
- [ ] **DASH-04**: Role-specific "Overdue" (Tarihi Geçenler) tab displays tasks that have passed the deadline for the user's role.
- [ ] **DASH-05**: User can see a summarized overview of all dates they have personally contributed.
- [ ] **USER-04**: User can save and manage their Jira PAT in their profile securely (encrypted storage).
- [ ] **INT-04**: User can save, name, and delete frequent JQL queries as presets for reuse.
- [ ] **INT-05**: User can select from saved credentials or queries during the Jira Import process.

## v2 Requirements
- [ ] Social logins (OAuth).
- [ ] Email notifications for approaching deadlines.

## Out of Scope
- Non-Jira Task Creation: Tasks originate strictly from Jira searches and are not manually created ad-hoc without Jira link.

## Traceability
<!-- Filled by roadmap -->
