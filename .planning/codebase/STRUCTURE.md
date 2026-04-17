# Project Structure

## Directories

### `/src/app`
- Core application routing and API endpoints. 
- `/api`: Jira integration, task management, and user settings.
- `/(auth)`: Login and Registration pages.
- `/dashboard`: Primary user interface for timeline tracking.

### `/src/components`
- Shared UI components (layout, forms, charts).

### `/src/models`
- Mongoose schemas for MongoDB.
- `User.ts`, `Task.ts`, `SavedQuery.ts`, `AuditLog.ts`.

### `/src/lib`
- Shared utilities and core logic.
- `db.ts`: Database connection management.
- `encryption.ts`: Security utilities for sensitive data.

### `/src/config`
- Static configurations.
- `jira-fields.json`: Field mapping for Jira API requests.

### `/public`
- Static assets (icons, images).

### `/.planning`
- Project management artifacts and GSD state.
