# Phase 6 Context: Jira Profile & Query Management

## Security Requirements
- **Encryption Algorithm**: AES-256-GCM.
- **Key Storage**: Encryption key should be stored in `.env.local` as `ENCRYPTION_KEY`.
- **Masking**: Token should never be sent to the client in clear text. The API should only return whether a token exists and its last 4 digits if needed for display.

## UI Requirements
- **Theming**: Must support all 4 themes (Dark, Light, Sunset, Turkcell).
- **Location**: Access via Dashboard header (Profile icon/button).
- **Import Tab**: Queries should be selectable via a dropdown next to the JQL input.

## Acceptance Criteria
- User can save a PAT and never type it again during that session or future sessions.
- User can save "My Project To Do" query and select it with one click.
- Database contains zero clear-text Jira tokens.
