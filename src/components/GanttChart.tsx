"use client";

interface GanttChartProps {
  tasks: any[];
}

export default function GanttChart({ tasks }: GanttChartProps) {
  if (!tasks || tasks.length === 0) {
    return <div className="text-center p-5 text-muted">No tasks available for Gantt view.</div>;
  }

  // Find min/max dates across all tasks to calculate timeline scale
  let minDate = new Date("2099-01-01").getTime();
  let maxDate = new Date("2000-01-01").getTime();

  tasks.forEach((task) => {
    const dates = [
      task.beAnalystStart, task.beAnalystDone,
      task.beDevStart, task.beDevDone,
      task.webAnalystStart, task.webAnalystDone,
      task.webDevStart, task.webDevDone,
      task.mobileAnalystStart, task.mobileAnalystDone,
      task.mobileDevStart, task.mobileDevDone,
      task.testStart, task.testDone
    ].filter(Boolean).map(d => new Date(d).getTime());

    if (dates.length > 0) {
      const taskMin = Math.min(...dates);
      const taskMax = Math.max(...dates);
      if (taskMin < minDate) minDate = taskMin;
      if (taskMax > maxDate) maxDate = taskMax;
    }
  });

  if (minDate > maxDate) {
    return <div className="text-center p-5 text-muted">No timeline data available. Please add dates to tasks.</div>;
  }

  minDate -= 7 * 24 * 60 * 60 * 1000;
  maxDate += 7 * 24 * 60 * 60 * 1000;
  const totalDuration = maxDate - minDate;

  const getLeftPercentage = (dateString: string) => {
    if (!dateString) return 0;
    const dateProgress = new Date(dateString).getTime() - minDate;
    return (dateProgress / totalDuration) * 100;
  };

  const getWidthPercentage = (startString: string, endString: string) => {
    if (!startString || !endString) return 0;
    const startProgress = new Date(startString).getTime();
    const endProgress = new Date(endString).getTime();
    const diff = Math.max(endProgress - startProgress, totalDuration * 0.01);
    return (diff / totalDuration) * 100;
  };

  const phases = [
    { label: "BE Ana", start: "beAnalystStart", end: "beAnalystDone", color: "#3b82f6" },
    { label: "BE Dev", start: "beDevStart", end: "beDevDone", color: "#8b5cf6" },
    { label: "Web Ana", start: "webAnalystStart", end: "webAnalystDone", color: "#10b981" },
    { label: "Web Dev", start: "webDevStart", end: "webDevDone", color: "#059669" },
    { label: "Mob Ana", start: "mobileAnalystStart", end: "mobileAnalystDone", color: "#f59e0b" },
    { label: "Mob Dev", start: "mobileDevStart", end: "mobileDevDone", color: "#d97706" },
    { label: "Test", start: "testStart", end: "testDone", color: "#ef4444" }
  ];

  return (
    <div className="glass-panel p-4" style={{ overflowX: "auto" }}>
      <div style={{ minWidth: "900px" }}>
        {/* Header timeline indicator */}
        <div className="d-flex mb-4 position-relative text-muted small pb-2" style={{ height: "40px", borderBottom: "1px solid var(--panel-border)" }}>
          <div className="position-absolute" style={{ left: 0 }}>{new Date(minDate).toLocaleDateString()}</div>
          <div className="position-absolute text-center" style={{ left: "50%", transform: "translateX(-50%)" }}>Timeline Visualization</div>
          <div className="position-absolute" style={{ right: 0 }}>{new Date(maxDate).toLocaleDateString()}</div>
        </div>

        {tasks.map(task => (
          <div key={task._id} className="d-flex mb-4 align-items-center">
            <div style={{ width: "180px", flexShrink: 0 }} className="pe-3 border-end">
              <div className="fw-bold truncate" title={task.key}>{task.key}</div>
              <div className="text-muted small truncate" title={task.summary} style={{ fontSize: "0.75rem" }}>{task.summary}</div>
            </div>
            
            <div className="flex-grow-1 position-relative ms-3" style={{ height: "45px", backgroundColor: "rgba(128,128,128,0.05)", borderRadius: "8px" }}>
              {/* Vertical grids */}
              <div className="position-absolute h-100 border-start" style={{ left: "25%", borderColor: "var(--panel-border)", opacity: 0.3 }}></div>
              <div className="position-absolute h-100 border-start" style={{ left: "50%", borderColor: "var(--panel-border)", opacity: 0.3 }}></div>
              <div className="position-absolute h-100 border-start" style={{ left: "75%", borderColor: "var(--panel-border)", opacity: 0.3 }}></div>

              {phases.map((phase, index) => {
                const startDate = task[phase.start];
                const endDate = task[phase.end];
                if (startDate && endDate) {
                  const left = getLeftPercentage(startDate);
                  const width = getWidthPercentage(startDate, endDate);
                  const topOffset = `${8 + (index * 3)}px`;

                  return (
                    <div
                      key={phase.label}
                      className="position-absolute rounded shadow-sm d-flex align-items-center justify-content-center"
                      title={`${phase.label}\n${new Date(startDate).toLocaleDateString()} - ${new Date(endDate).toLocaleDateString()}`}
                      style={{
                        left: `${left}%`,
                        width: `${width}%`,
                        top: topOffset,
                        height: "14px",
                        backgroundColor: phase.color,
                        opacity: 0.9,
                        minWidth: "15px",
                        zIndex: 10 + index
                      }}
                    >
                      {width > 8 && <span className="text-white fw-bold" style={{ fontSize: "0.55rem" }}>{phase.label}</span>}
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
