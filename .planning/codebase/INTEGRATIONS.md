# External Integrations

## Jira API
- **Purpose**: Fetching tasks, timeline data, and history from Jira.
- **Mechanism**: Server-side API routes (`/api/jira/search`, etc.) using `fetch`.
- **Authentication**: Bearer tokens. Tokens are stored encrypted in MongoDB per user.
- **Fields Reference**: Custom field mappings defined in `src/config/jira-fields.json`.

## NextAuth.js
- **Purpose**: User authentication and session management.
- **Providers**: Credentials provider (Email/Password).
- **Session Strategy**: JWT.
- **Data Store**: MongoDB (via custom logic in `[...nextauth]/route.ts`).

## MongoDB / Mongoose
- **Purpose**: Local data persistence for user profiles, Jira queries, task history, and audit logs.
- **Models**:
  - `User`: Profiles, roles, encrypted Jira tokens.
  - `Task`: Imported Jira tasks and local overrides.
  - `SavedQuery`: User-defined JQL queries for syncing.
  - `AuditLog`: System activity tracking.
