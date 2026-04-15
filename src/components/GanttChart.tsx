"use client";

interface GanttChartProps {
  tasks: any[];
}

// Helper to calculate days between two dates
const getDaysBetween = (start: string, end: string) => {
  const d1 = new Date(start);
  const d2 = new Date(end);
  return Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 3600 * 24));
};

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

  // Default fallback if no valid dates
  if (minDate > maxDate) {
    return <div className="text-center p-5 text-muted">No timeline data available across imported tasks. Please add Start/Done dates.</div>;
  }

  // Add a 7-day buffer to start and end
  minDate -= 7 * 24 * 60 * 60 * 1000;
  maxDate += 7 * 24 * 60 * 60 * 1000;
  const totalDuration = maxDate - minDate;

  // Calculate percentage left offset
  const getLeftPercentage = (dateString: string) => {
    if (!dateString) return 0;
    const dateProgress = new Date(dateString).getTime() - minDate;
    return (dateProgress / totalDuration) * 100;
  };

  // Calculate percentage width (duration)
  const getWidthPercentage = (startString: string, endString: string) => {
    if (!startString || !endString) return 0;
    const startProgress = new Date(startString).getTime();
    const endProgress = new Date(endString).getTime();
    
    // Ensure minimum visual width of 1%
    const diff = Math.max(endProgress - startProgress, totalDuration * 0.01);
    return (diff / totalDuration) * 100;
  };

  const phases = [
    { label: "BE Anal", start: "beAnalystStart", end: "beAnalystDone", color: "#3b82f6" },   // Blue
    { label: "BE Dev", start: "beDevStart", end: "beDevDone", color: "#8b5cf6" },         // Purple
    { label: "Web Ana", start: "webAnalystStart", end: "webAnalystDone", color: "#10b981" },// Green
    { label: "Web Dev", start: "webDevStart", end: "webDevDone", color: "#059669" },      // Dark Green
    { label: "Mob Ana", start: "mobileAnalystStart", end: "mobileAnalystDone", color: "#f59e0b" }, // Yellow
    { label: "Mob Dev", start: "mobileDevStart", end: "mobileDevDone", color: "#d97706" }, // Orange
    { label: "Test", start: "testStart", end: "testDone", color: "#ef4444" }              // Red
  ];

  return (
    <div className="table-responsive bg-dark p-3 rounded border border-secondary" style={{ overflowX: "auto" }}>
      <div style={{ minWidth: "800px" }}>
        
        {/* Header timeline indicator */}
        <div className="d-flex mb-3 position-relative text-muted small border-bottom border-secondary pb-2" style={{ height: "30px" }}>
          <div className="position-absolute" style={{ left: 0 }}>{new Date(minDate).toLocaleDateString()}</div>
          <div className="position-absolute text-center" style={{ left: "50%", transform: "translateX(-50%)" }}>Timeline Overview</div>
          <div className="position-absolute" style={{ right: 0 }}>{new Date(maxDate).toLocaleDateString()}</div>
        </div>

        {/* Task Rows */}
        {tasks.map(task => (
          <div key={task._id} className="row g-0 mb-3 align-items-center">
            
            {/* Task Info Column */}
            <div className="col-2 text-truncate pe-3">
              <span className="fw-bold small">{task.key}</span>
              <br/>
              <span className="text-muted" style={{ fontSize: "0.7rem" }} title={task.summary}>{task.summary}</span>
            </div>
            
            {/* Gantt Area Column */}
            <div className="col-10 position-relative" style={{ height: "40px", backgroundColor: "rgba(255,255,255,0.02)", borderRadius: "4px" }}>
              
              {/* Background grid lines */}
              <div className="position-absolute h-100 border-start border-secondary opacity-25" style={{ left: "25%" }}></div>
              <div className="position-absolute h-100 border-start border-secondary opacity-25" style={{ left: "50%" }}></div>
              <div className="position-absolute h-100 border-start border-secondary opacity-25" style={{ left: "75%" }}></div>

              {/* Phase Bars */}
              {phases.map((phase, index) => {
                const startDate = task[phase.start];
                const endDate = task[phase.end];
                
                if (startDate && endDate) {
                  const left = getLeftPercentage(startDate);
                  const width = getWidthPercentage(startDate, endDate);
                  
                  // Top offset ensures overlapping bars are still legible (waterfall effect)
                  const topOffset = `${10 + (index * 2)}px`;

                  return (
                    <div
                      key={phase.label}
                      className="position-absolute rounded shadow-sm d-flex align-items-center justify-content-center"
                      title={`${phase.label} \nStart: ${new Date(startDate).toLocaleString()} \nDone: ${new Date(endDate).toLocaleString()}`}
                      style={{
                        left: `${left}%`,
                        width: `${width}%`,
                        top: topOffset,
                        height: "12px",
                        backgroundColor: phase.color,
                        opacity: 0.85,
                        cursor: "pointer",
                        minWidth: "20px",
                        transition: "all 0.2s ease"
                      }}
                    >
                      {width > 5 && <span className="text-white fw-bold" style={{ fontSize: "0.5rem" }}>{phase.label}</span>}
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
