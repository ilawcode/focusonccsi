# Architecture Overview

## Layout & Routing
- **Pattern**: Next.js App Router with Route Grouping (`(auth)`).
- **Layouts**: Root layout provides Bootstrap styles and Context Providers.
- **Client/Server Boundary**: API routes handle data fetching and encryption. Page components use these APIs (mostly Client components for interactivity).

## Data Flow
1. **Request**: UI triggers an action (e.g., sync tasks).
2. **Controller (API)**: Next.js API route validates session, retrieves encrypted Jira token, and calls Jira API.
3. **Storage**: Results are processed and stored/updated in MongoDB via Mongoose models.
4. **Response**: JSON response returned to the frontend.

## Security
- **Authentication**: Handled by NextAuth.
- **Credential Storage**: Passwords hashed with `bcryptjs`.
- **Sensitive Data**: Jira API tokens are encrypted at rest using AES in `src/lib/encryption.ts`.
- **API Protection**: `getServerSession` used in API routes to prevent unauthorized access.

## State Management
- React Context (Providers) for global state.
- Component-level state for UI transitions and forms.
