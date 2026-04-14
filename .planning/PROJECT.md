# Project Tracking Dashboard

## What This Is

A Next.js web application for project and task tracking integrated with Jira. Users can log in, sync Jira tasks using their Jira token via specific search criteria, assign tasks to themselves, and track task timelines. The dashboard provides a timeline view categorized by phases (BE Analysis, BE Dev, Test, FE, Mobile) tailored to specific user roles (BE Analyst, BE Dev, Web, Mobile).

## Core Value

Provide role-based, chronological visualization and tracking of Jira project tasks to ensure deadlines are monitored and roles can seamlessly log and view their specific phase dates.

## Requirements

### Validated

<!-- Shipped and confirmed valuable. -->

(None yet — ship to validate)

### Active

<!-- Current scope. Building toward these. -->

- [ ] User authentication (Login/Register with Name, Surname, Email, Password)
- [ ] Connect Jira utilizing Personal Access Tokens
- [ ] Fetch Jira tasks based on specific search criteria
- [ ] Allow users to self-assign fetched Jira tasks
- [ ] Role-based access control (Roles: BE Analyst, BE Dev, Web, Mobile)
- [ ] Role-specific task date entry (Start/Done dates for phase)
- [ ] Detailed audit trail (Who entered/changed dates and when)
- [ ] Timeline visualization dashboard sorting tasks by approaching deadline
- [ ] Distinct view for overdue tasks ("Tarihi Geçenler" tab)
- [ ] Summary views per user for their own entered dates

### Out of Scope

<!-- Explicit boundaries. Includes reasoning to prevent re-adding. -->

- [Non-Jira task management] — The system relies exclusively on Jira as the source of truth for tasks.

## Context

The application aims to simplify task tracking across multiple disciplines (Backend, Testing, Frontend, Mobile) by layering a timeline and deadline-oriented dashboard over standard Jira tasks. It relies heavily on role-based views.

## Constraints

- **Tech Stack**: Next.js — User requested to build the app with Next.js.
- **Data Source**: Jira API — All initial task data and definitions must originate from an integrated Jira instance.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js App Router | Modern default for Next.js apps, provides good performance and API routes. | — Pending |

---
*Last updated: 2026-04-14 after initialization*

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state
