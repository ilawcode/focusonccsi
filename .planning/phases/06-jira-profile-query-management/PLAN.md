# Phase 6: Jira Profile & Query Management (PLAN)

## Context
Improve UX by allowing users to save their Jira PAT and frequently used JQL queries. PATs must be stored securely (encrypted).

## Objectives
- [ ] Implement encryption utility for Jira PATs.
- [ ] Create `SavedQuery` schema and API.
- [ ] Create `Profile` UI (Modal or Tab) to manage settings.
- [ ] Integrate saved PAT/queries into the "Jira Import" flow.

## Technical Tasks

### 1. Data Layer & Security
- [ ] Implement `src/lib/encryption.ts` using Node `crypto` (AES-256-GCM).
- [ ] Create `src/models/SavedQuery.ts` (userId, name, jql).
- [ ] Add `jiraToken` (encrypted) to `User` model or create `src/models/UserSettings.ts`.
- [ ] Create `api/user/settings` for PAT management.
- [ ] Create `api/user/queries` for JQL CRUD.

### 2. UI - Profile Management
- [ ] Create `src/components/ProfileModal.tsx`.
- [ ] Add "Edit Profile" or "Jira Settings" button to Dashboard header.
- [ ] Implement PAT entry with masking (shows empty or "********").

### 3. UI - Jira Import Integration
- [ ] Update `src/app/dashboard/page.tsx` (Jira Import tab).
- [ ] Load saved PAT automatically if available.
- [ ] Add a dropdown/selector for saved JQL queries.
- [ ] Add "Save this query" checkbox to the search form.

## Verification Loop
- [ ] **Auth Check**: Ensure users can only see/edit their own tokens and queries.
- [ ] **Encryption Check**: Verify raw PAT is not visible in MongoDB (check using mongosh or log).
- [ ] **Decryption Check**: Verify Jira search still works correctly with decrypted token.
- [ ] **UI Check**: Verify theme consistency (Dark, Light, Sunset, Turkcell) for new Profile UI.
