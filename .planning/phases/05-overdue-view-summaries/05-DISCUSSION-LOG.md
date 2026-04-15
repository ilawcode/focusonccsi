# Phase 5: Overdue View & Summaries - Discussion Log

**Date:** 2026-04-15
**Phase:** 5-Overdue View & Summaries

---

## Technical Stack & Logic

| Option | Description | Selected |
|--------|-------------|----------|
| Overdue Logic | How to determine if delayed? | Latest `Done` date on Task < Today |
| Analytics Scope | General vs Role-specific? | Completely Role-specific |
| UI Placement | Separate tab/modal or inline? | Above the Timeline table |

**User's choice:** audit loga iletilen tarihler taskın güncel tarihi olmalı zaten dolayısı ile taskın üzerindeki tarih geçmesi için kullanılacak, 2 için olabilir ekleyelim ama rol bazlı olmalı, timeline üzerinde olsun
**Notes:** Client-side compute is sufficient since all tasks are already loaded in memory for the active role.

---

## Deferred Ideas
- Tracking overall project delay (not requested, sticking strictly to role-based insight).
