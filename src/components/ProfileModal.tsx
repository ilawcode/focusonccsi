"use client";

import { useState, useEffect } from "react";

interface SavedQuery {
  _id: string;
  name: string;
  jql: string;
}

interface ProfileModalProps {
  onClose: () => void;
}

export default function ProfileModal({ onClose }: ProfileModalProps) {
  const [jiraToken, setJiraToken] = useState("");
  const [hasStoredToken, setHasStoredToken] = useState(false);
  const [savedQueries, setSavedQueries] = useState<SavedQuery[]>([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ text: "", type: "" });

  useEffect(() => {
    fetchSettings();
    fetchQueries();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/user/settings");
      if (res.ok) {
        const data = await res.json();
        setHasStoredToken(data.hasToken);
      }
    } catch (err) {}
  };

  const fetchQueries = async () => {
    try {
      const res = await fetch("/api/user/queries");
      if (res.ok) {
        setSavedQueries(await res.json());
      }
    } catch (err) {}
  };

  const handleSaveToken = async () => {
    setLoading(true);
    setMsg({ text: "", type: "" });
    try {
      const res = await fetch("/api/user/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jiraToken }),
      });
      if (res.ok) {
        setMsg({ text: "Jira token saved successfully!", type: "success" });
        setJiraToken("");
        setHasStoredToken(true);
      } else {
        setMsg({ text: "Failed to save token.", type: "danger" });
      }
    } catch (err) {
      setMsg({ text: "Network error.", type: "danger" });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteQuery = async (id: string) => {
    try {
      const res = await fetch(`/api/user/queries/${id}`, { method: "DELETE" });
      if (res.ok) {
        setSavedQueries(prev => prev.filter(q => q._id !== id));
      }
    } catch (err) {}
  };

  return (
    <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content glass-panel shadow-lg">
          <div className="modal-header">
            <h5 className="modal-title gradient-text">Jira & Profile Settings</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body p-4">
            
            {msg.text && (
              <div className={`alert alert-${msg.type} py-2 small mb-4`}>{msg.text}</div>
            )}

            <div className="mb-5 pb-4 border-bottom border-secondary">
              <h6 className="mb-3 text-accent"><i className="bi bi-shield-lock me-2"></i>Jira Personal Access Token</h6>
              <p className="text-muted small">
                {hasStoredToken 
                  ? "✓ A Jira token is currently saved and encrypted. You can overwrite it below." 
                  : "No Jira token saved. Enter one to enable auto-import."}
              </p>
              <div className="d-flex gap-2">
                <input 
                  type="password" 
                  className="form-control" 
                  placeholder="Enter new Jira PAT..."
                  value={jiraToken}
                  onChange={(e) => setJiraToken(e.target.value)}
                />
                <button 
                  className="btn btn-premium px-4" 
                  onClick={handleSaveToken}
                  disabled={loading || !jiraToken}
                >
                  {loading ? "..." : "Save"}
                </button>
              </div>
            </div>

            <div className="mb-5 pb-4 border-bottom border-secondary p-3 rounded" style={{ backgroundColor: "rgba(59, 130, 246, 0.05)", border: "1px dashed rgba(59, 130, 246, 0.3)" }}>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-1 text-primary"><i className="bi bi-plugin me-2"></i>Jira Bridge Extension</h6>
                  <p className="text-muted small mb-0">
                    Bypass WAF restrictions and connect directly to your local Jira instance.
                  </p>
                </div>
                <div className="d-flex gap-2">
                  <a href="/focusonccsi-bridge.zip" download className="btn btn-sm btn-outline-primary">
                    <i className="bi bi-download me-1"></i> Download ZIP
                  </a>
                  <a href="/setup" target="_blank" className="btn btn-sm btn-primary">
                    <i className="bi bi-book me-1"></i> Setup Guide
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h6 className="mb-3 text-accent"><i className="bi bi-bookmark-star me-2"></i>My Saved JQL Queries</h6>
              {savedQueries.length === 0 ? (
                <p className="text-muted small py-3 text-center border rounded border-secondary border-dashed" style={{ borderStyle: 'dashed' }}>
                  No saved queries yet. Save one from the Import tab!
                </p>
              ) : (
                <div className="table-responsive rounded border border-secondary">
                  <table className="table table-hover mb-0 small">
                    <thead className="table-light opacity-75">
                      <tr>
                        <th>Query Name</th>
                        <th>JQL</th>
                        <th className="text-end">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {savedQueries.map(q => (
                        <tr key={q._id}>
                          <td className="fw-bold">{q.name}</td>
                          <td className="text-muted font-monospace" style={{ fontSize: '0.7rem' }}>{q.jql}</td>
                          <td className="text-end">
                            <button 
                              className="btn btn-sm btn-link text-danger p-0"
                              onClick={() => handleDeleteQuery(q._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>
          <div className="modal-footer">
            <button className="btn btn-outline-secondary btn-sm px-4" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}
