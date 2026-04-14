# Phase 1: Foundation & Authentication - Context

**Gathered:** 2026-04-14
**Status:** Ready for planning

<domain>
## Phase Boundary

Initialize the Next.js project ecosystem, set up the base styling aesthetics, and fully implement User Registration, Login flow, and Role Selection.
</domain>

<decisions>
## Implementation Decisions

### Authentication Stack
- **D-01:** Use **NextAuth.js (Auth.js)** for managing sessions via JWT.
- **D-02:** Email/Password based authentication as the primary method.

### Database
- **D-03:** Use **MongoDB** as the project database (for keeping user data and role settings).

### Role Assignment Flow
- **D-04:** Users register with basic info and log in. Once logged in, they can explicitly select their role directly from the dashboard/profile interface.

### UI & Aesthetics
- **D-05:** Apply a dedicated **Dark Theme**.
- **D-06:** Use **Bootstrap** for the foundational layout structure, applying custom Vanilla CSS on top to achieve the required premium, vibrant, and dynamic aesthetics.

### the agent's Discretion
- Selection of the MongoDB driver/ORM (Mongoose vs raw MongoDB Node Driver) - defaults to Mongoose for Next.js models.
- File structures for styles and Next.js app router structure.
</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Scope
- `.planning/PROJECT.md` — Overall project goals and constraints
- `.planning/REQUIREMENTS.md` — Core feature requirements (AUTH-01, AUTH-02, AUTH-03)
- `.planning/ROADMAP.md` — Details of the Phase 1 goals

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- Greenfield phase, no assets to reuse yet.

### Established Patterns
- Greenfield phase, establish Next.js App Router and Bootstrap integrations here.

### Integration Points
- MongoDB connection string to be placed in `.env.local`
- NextAuth configuration inside `/app/api/auth/[...nextauth]/route.ts`
</code_context>

<specifics>
## Specific Ideas

- Emphasize the "premium look" through custom CSS handling on top of standard Bootstrap components.
- The dashboard page is the target redirection post-login where the user's role choice immediately takes place.
</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope
</deferred>

---

*Phase: 01-foundation-authentication*
*Context gathered: 2026-04-14*
