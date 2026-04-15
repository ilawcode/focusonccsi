"use client";

import { useMemo } from "react";

interface RoleAnalyticsWidgetProps {
  tasks: any[];
  userRole: string;
}

const ROLE_DONE_FIELD_MAP: Record<string, string> = {
  "BE Analist": "beAnalystDone",
  "BE Dev": "beDevDone",
  "Web Analist": "webAnalystDone",
  "Web Dev": "webDevDone",
  "Mobile Analist": "mobileAnalystDone",
  "Mobile Dev": "mobileDevDone",
  "Test": "testDone",
};

export default function RoleAnalyticsWidget({ tasks, userRole }: RoleAnalyticsWidgetProps) {
  const metrics = useMemo(() => {
    const doneField = ROLE_DONE_FIELD_MAP[userRole];
    if (!doneField) return { total: 0, overdue: 0, thisWeek: 0 };

    const now = new Date();
    // Start of today (ignore time for today comparisons)
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    
    // End of next 7 days
    const nextWeek = new Date(today + 7 * 24 * 60 * 60 * 1000).getTime();

    let total = 0;
    let overdue = 0;
    let thisWeek = 0;

    tasks.forEach(task => {
      const doneVal = task[doneField];
      if (doneVal) {
        total++;
        const targetTime = new Date(doneVal).getTime();
        
        if (targetTime < today) {
          overdue++;
        } else if (targetTime >= today && targetTime <= nextWeek) {
          thisWeek++;
        }
      }
    });

    return { total, overdue, thisWeek };
  }, [tasks, userRole]);

  return (
    <div className="row g-3 mb-4">
      <div className="col-md-4">
        <div className="p-4 rounded shadow-sm border border-secondary" style={{ backgroundColor: "var(--card-blue)" }}>
          <h6 className="text-secondary small fw-bold mb-1 border-bottom border-secondary pb-2 opacity-75">Active Targets</h6>
          <h2 className="mb-0 gradient-text display-6 fw-bold">{metrics.total}</h2>
          <small className="opacity-75">Total deadlines set for your role</small>
        </div>
      </div>
      <div className="col-md-4">
        <div className="p-4 rounded shadow-sm border border-secondary" style={{ backgroundColor: "var(--card-green)" }}>
          <h6 className="text-secondary small fw-bold mb-1 border-bottom border-secondary pb-2 opacity-75">Due This Week</h6>
          <h2 className="mb-0 text-success display-6 fw-bold">{metrics.thisWeek}</h2>
          <small className="opacity-75">Targets maturing in the next 7 days</small>
        </div>
      </div>
      <div className="col-md-4">
        <div className="p-4 rounded shadow-sm border border-secondary" style={{ backgroundColor: "var(--card-red)" }}>
          <h6 className="text-secondary small fw-bold mb-1 border-bottom border-secondary pb-2 opacity-75">Overdue</h6>
          <h2 className="mb-0 text-danger display-6 fw-bold">{metrics.overdue}</h2>
          <small className="opacity-75">Deadlines missed based on current date</small>
        </div>
      </div>
    </div>
  );
}
