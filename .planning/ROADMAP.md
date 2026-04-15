# Roadmap

## Phase 1: Foundation & Authentication [COMPLETED]
**Goal**: Initialize Next.js project with a visually stunning, dynamic UI system and implement secure role-based user authentication.
**Requirements**: AUTH-01, AUTH-02, AUTH-03
**UI hint**: yes

### Success Criteria
1. User can register an account with their name, email, password, and select a predefined role.
2. User can login securely, with their session remembering their role (e.g. BE Analyst).
3. The UI features a premium, modern aesthetic using CSS (e.g., glassmorphism, dynamic gradients, smooth transitions).

---

## Phase 2: Jira Auth & Task Fetching [COMPLETED]
**Goal**: Connect to Jira via PAT to fetch and import tasks into the local project tracking system.
**Requirements**: INT-01, INT-02, INT-03
**UI hint**: yes

### Success Criteria
1. User can securely input and save a Personal Access Token for Jira.
2. User can query Jira with criteria and see a list of relevant issues.
3. User can click an issue to "import" and self-assign it, marking it available in the timeline.

---

## Phase 3: Timeline & Audit Data Layer [COMPLETED]
**Goal**: Build the core data schemas and backend logic required to manage phase dates and track user edits accurately.
**Requirements**: TASK-01, TASK-02, TASK-03
**UI hint**: no

### Success Criteria
1. The database accurately tracks start/done dates for BE Analyst, BE Dev, Test, Web, and Mobile per task.
2. The logic enforces that a logged-in user can only edit dates matching their assigned role (e.g. Web role edits FE dates).
3. Every date change inserts an audit log entry detailing who made the change and when.

---

## Phase 4: Main Dashboard & Visualization [COMPLETED]
**Goal**: Construct the central Timeline dashboard where tasks are ordered by urgency specific to the user's role.
**Requirements**: DASH-01, DASH-02, DASH-03
**UI hint**: yes

### Success Criteria
1. The Dashboard default view shows an interactive timeline of all tracked tasks.
2. The tasks are automatically sorted from the nearest approaching deadline to the furthest, specific to the logged-in user's role constraints.
3. The timeline clearly distinguishes which phases have been completed and which are pending.

---

## Phase 5: Overdue View & Summaries [COMPLETED]
**Goal**: Add role-centric "Overdue" tabs and personal summary performance views to complete the tracking loop.
**Requirements**: DASH-04, DASH-05
**UI hint**: yes

### Success Criteria
1. Users can switch to a "Tarihi Geçenler" (Overdue) tab that only displays tasks missing the user's role specific deadlines.
2. Each user has a "My Summary" view showing the historical velocity or brief overview of the dates they personally contributed to.
3. Final aesthetic checks are conducted to ensure robust micro-animations and non-generic color palettes apply consistently.

---

## Phase 6: Jira Profile & Query Management [TODO]
**Goal**: Implement a secure user profile section to manage Jira credentials (encrypted) and save frequent JQL queries.
**Requirements**: USER-04, INT-04, INT-05
**UI hint**: yes

### Success Criteria
1. User can navigate to a "Profile" page and save their Jira PAT (encrypted in DB).
2. Users can save, name, and delete multiple JQL queries.
3. During Jira Import, users can select a saved token or query from a dropdown.
4. Accessing saved tokens requires re-authentication or is masked in UI.
