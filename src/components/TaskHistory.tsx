"use client";

import { useEffect, useState } from "react";

interface AuditLog {
  _id: string;
  field: string;
  oldValue: string | null;
  newValue: string | null;
  reason: string | null;
  createdAt: string;
  userId: {
    _id: string;
    name: string;
    surname: string;
  };
}

interface TaskHistoryProps {
  taskId: string;
}

export default function TaskHistory({ taskId }: TaskHistoryProps) {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(`/api/tasks/${taskId}/history`);
        if (res.ok) {
          const data = await res.json();
          setLogs(data);
        } else {
          setError("Failed to load history.");
        }
      } catch (err) {
        setError("Network error loading history.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [taskId]);

  if (loading) return <div className="text-center small py-3 text-muted">Loading audit history...</div>;
  if (error) return <div className="text-danger small py-3">{error}</div>;
  if (logs.length === 0) return <div className="text-center small py-3 text-muted">No edits recorded for this task yet.</div>;

  return (
    <div className="bg-dark rounded p-3 mt-2 border border-secondary" style={{ maxHeight: "300px", overflowY: "auto" }}>
      <h6 className="gradient-text mb-3 small fw-bold">Audit History</h6>
      <div className="timeline-container">
        {logs.map((log) => (
          <div key={log._id} className="mb-3 pb-3 border-bottom border-secondary border-opacity-50">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <span className="small fw-bold text-light">
                {log.userId.name} {log.userId.surname}
              </span>
              <span className="small text-muted" style={{ fontSize: "0.75rem" }}>
                {new Date(log.createdAt).toLocaleString()}
              </span>
            </div>
            
            <div className="small mb-2">
              <span className="text-secondary">Updated module: </span>
              <span className="badge bg-secondary text-dark">{log.field}</span>
            </div>
            
            <div className="d-flex align-items-center mb-2 small" style={{ fontSize: "0.8rem" }}>
              <div className="text-danger text-decoration-line-through me-2">
                {log.oldValue ? new Date(log.oldValue).toLocaleString() : "Not Set"}
              </div>
              <span className="text-muted me-2">➔</span>
              <div className="text-success">
                {log.newValue ? new Date(log.newValue).toLocaleString() : "Cleared"}
              </div>
            </div>
            
            {log.reason && (
              <div className="p-2 mt-2 rounded small" style={{ backgroundColor: "rgba(255,255,255,0.05)", borderLeft: "3px solid var(--accent-color)" }}>
                <strong className="d-block mb-1 text-muted" style={{ fontSize: "0.75rem" }}>Justification Provided:</strong>
                <span className="text-light">{log.reason}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
