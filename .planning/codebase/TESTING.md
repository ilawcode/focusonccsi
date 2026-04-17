# Testing Strategy

## Current State
- **Automated Tests**: None identified in the repository.
- **Linting**: ESLint configured with Next.js defaults.

## Planned approach
- **Unit Testing**: Suggested for `src/lib/encryption.ts` and core business logic.
- **API Testing**: Integration tests for Jira search and task import routes.
- **UI Testing**: Component testing for the dashboard timeline view.

## Tools
- **Linter**: ESLint (`npm run lint`).
- **Formatter**: Prettier (suggested).
- **Framework**: Vitest or Jest (recommended for future implementation).
