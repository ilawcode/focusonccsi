---
status: testing
phase: 07-jira-task-import
source: [07-01-SUMMARY.md]
started: 2026-04-17T17:08:00Z
updated: 2026-04-17T17:08:00Z
---

## Current Test
number: 1
name: Search & Single Import
expected: |
  1. Navigate to "Jira Import" tab.
  2. Perform a search (e.g. `project = "YOURPROJ"`).
  3. Verify Key, Summary, and Type (Badge) are visible in the search results.
  4. Click "Import" on a single task.
  5. Verify "Task imported successfully" message.
  6. Switch to "Timeline View" and confirm the task exists with correct Key/Summary/Type.
awaiting: user response

## Tests

### 1. Search & Single Import
expected: |
  1. Navigate to "Jira Import" tab.
  2. Perform a search (e.g. `project = "YOURPROJ"`).
  3. Verify Key, Summary, and Type (Badge) are visible in the search results.
  4. Click "Import" on a single task.
  5. Verify "Task imported successfully" message.
  6. Switch to "Timeline View" and confirm the task exists with correct Key/Summary/Type.
result: [pending]

### 2. Bulk Import
expected: |
  1. In "Jira Import" tab, perform a search that returns 2+ issues.
  2. Click "Import All Results".
  3. Verify bulk loading spinner ("Importing All...") appears on the button.
  4. Verify success message shows the correct count (e.g. "X task(s) imported").
  5. Switch to "Timeline View" and confirm all tasks are present.
result: [pending]

### 3. Date Mapping Pre-fill
expected: |
  1. Open `src/config/jira-date-mapping.json` and map a local field (e.g. `beAnalysisStart`) to a Jira field that contains data (e.g. `created`).
  2. Import a NEW task from Jira.
  3. Confirm that the mapped local field is pre-filled with the Jira value.
result: [pending]

### 4. Local Date Preservation
expected: |
  1. For an already imported task, set a "Start" or "Done" date manually in the Timeline View.
  2. Re-import that same task from the "Jira Import" tab.
  3. Verify that the local dates and audit history for that task remain unchanged.
result: [pending]

### 5. Waterfall UI Layout
expected: |
  1. Verify the main Task Table on the Dashboard.
  2. Columns should be: Expand(▶), Key-Type-Summary, and the role-specific date pairs.
  3. Confirm the "Status" column from Jira is NOT present.
result: [pending]

## Summary

total: 5
passed: 0
issues: 0
pending: 5
skipped: 0

## Gaps

[none yet]
