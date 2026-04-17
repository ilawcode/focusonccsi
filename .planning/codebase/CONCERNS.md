# Current Concerns & Risks

## Technical Debt
- **Next.js 16/React 19 Compatibility**: Being on the latest (bleeding edge) versions may lead to instability or library compatibility issues.
- **Bootstrap Integration**: Mixing Bootstrap CSS with Next.js 16 might require careful handling of Client vs Server components to avoid hydration mismatches.

## Security
- **Jira Token Management**: Storing API tokens in a local database (even if encrypted) requires high security for the encryption keys (managed via environment variables).
- **Session Management**: Ensure NextAuth sessions are properly cleared and encrypted tokens are never leaked to the client.

## Performance
- **Jira API Latency**: Heavy reliance on external Jira calls; caching strategies for task data should be considered to improve dashboard responsiveness.
- **Database Scale**: As task history grows, indexing on Mongoose models will become critical.

## Maintenance
- **Missing Tests**: Lack of automated tests increases the risk of regression during feature development.
- **Type Safety**: Ensure API response shapes from Jira are strictly typed to avoid runtime errors.
