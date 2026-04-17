# Coding Conventions

## Language & Style
- **TypeScript**: Strict mode preferred.
- **Naming**: 
  - Components: PascalCase (e.g., `TimelineChart.tsx`).
  - API Routes: Next.js standard (`route.ts`).
  - Models: PascalCase (e.g., `User.ts`).
  - Utilities: camelCase (e.g., `db.ts`).

## Patterns
- **API Responses**: Standardized JSON structure `{ message, data?, details? }`.
- **Imports**: Using `@` alias for `src/` directory.
- **Async/Await**: Standard for all I/O operations (DB, API).

## UI/UX
- **Bootstrap**: Grid system and basic components.
- **Responsiveness**: Mobile-first approach using Bootstrap utilities.
- **Feedback**: Loading states and error messages in forms.

## Metadata
- **SEO**: Metadata exported in layouts/pages for titles and descriptions.
