"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import TaskTable from "@/components/TaskTable";
import GanttChart from "@/components/GanttChart";

export default function Dashboard() {
  const { data: session, status, update } = useSession();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Jira State
  const [jiraToken, setJiraToken] = useState("");
  const [jql, setJql] = useState("project = \"YOURPROJ\" AND status = \"To Do\"");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [importingId, setImportingId] = useState<string | null>(null);
  const [message, setMessage] = useState({ text: "", type: "" });
  
  // Dashboard Visuals State
  const [tasks, setTasks] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"timeline" | "gantt" | "import">("timeline");
  const [isLoadingTasks, setIsLoadingTasks] = useState(true);

  const fetchTasks = useCallback(async () => {
    setIsLoadingTasks(true);
    try {
      const res = await fetch("/api/tasks");
      if (res.ok) {
        const data = await res.json();
        setTasks(data.tasks || []);
      }
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    } finally {
      setIsLoadingTasks(false);
    }
  }, []);

  useEffect(() => {
    if (status === "authenticated" && (session?.user as any)?.role) {
      fetchTasks();
    }
  }, [status, session, fetchTasks]);

  const handleRoleSelection = async (role: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/user/role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });

      if (res.ok) {
        await update({ role });
        router.refresh();
      }
    } catch (err) {
      console.error("Failed to update role", err);
    } finally {
      setLoading(false);
    }
  };

  const handleJiraSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jiraToken) {
      setMessage({ text: "Please enter your Jira PAT first", type: "danger" });
      return;
    }

    setIsSearching(true);
    setMessage({ text: "", type: "" });
    try {
      const res = await fetch("/api/jira/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jql, token: jiraToken }),
      });

      const data = await res.json();
      if (res.ok) {
        setSearchResults(data.issues || []);
        if (data.issues?.length === 0) {
          setMessage({ text: "No issues found for this JQL", type: "info" });
        }
      } else {
        setMessage({ text: data.message || "Jira search failed", type: "danger" });
      }
    } catch (err) {
      setMessage({ text: "Network error occurred", type: "danger" });
    } finally {
      setIsSearching(false);
    }
  };

  const handleImport = async (issue: any) => {
    setImportingId(issue.id);
    try {
      const res = await fetch("/api/tasks/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ issue }),
      });

      if (res.ok) {
        setMessage({ text: `Task ${issue.key} imported successfully!`, type: "success" });
        fetchTasks(); // Refresh tasks list
      } else {
        const data = await res.json();
        setMessage({ text: data.message || "Import failed", type: "danger" });
      }
    } catch (err) {
      setMessage({ text: "Import failed due to network error", type: "danger" });
    } finally {
      setImportingId(null);
    }
  };

  if (status === "loading") {
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  const userRole = (session?.user as any)?.role;

  return (
    <div className="container py-5">
      <header className="d-flex justify-content-between align-items-center mb-5 glass-panel p-3">
        <div>
          <h4 className="mb-0 gradient-text">FocusOnCCSI</h4>
          <small className="text-muted">Welcome, {session?.user?.name}</small>
        </div>
        <button onClick={() => signOut()} className="btn btn-outline-danger btn-sm">
          Logout
        </button>
      </header>

      {!userRole ? (
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <div className="glass-panel p-5 shadow-lg">
              <h2 className="mb-4">Select Your Role</h2>
              <p className="text-muted mb-4">
                To access your personalized dashboard, please select your primary project role.
              </p>
              <div className="row g-3 justify-content-center">
                {["BE Analist", "BE Dev", "Web Analist", "Web Dev", "Mobile Analist", "Mobile Dev", "Test"].map((role) => (
                  <div key={role} className="col-sm-6 col-md-3">
                    <button
                      className="btn btn-premium w-100 py-3 h-100 d-flex align-items-center justify-content-center hover-glow text-wrap"
                      onClick={() => handleRoleSelection(role)}
                      disabled={loading}
                    >
                      {role}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="row g-4">
          <div className="col-12">
            <div className="glass-panel p-4 mb-4">
              <h3 className="mb-1">Role: <span className="gradient-text">{userRole}</span> Dashboard</h3>
              <p className="text-muted small mb-3">Manage your Jira tasks and track phase timelines.</p>
              
              <ul className="nav nav-pills mb-3 border-bottom border-secondary pb-3">
                <li className="nav-item">
                  <button 
                    className={`nav-link rounded-pill px-4 ${activeTab === 'timeline' ? 'active bg-primary' : 'text-light border border-secondary bg-transparent'}`}
                    onClick={() => setActiveTab('timeline')}
                  >
                    Timeline View
                  </button>
                </li>
                <li className="nav-item ms-2">
                  <button 
                    className={`nav-link rounded-pill px-4 ${activeTab === 'gantt' ? 'active bg-primary' : 'text-light border border-secondary bg-transparent'}`}
                    onClick={() => setActiveTab('gantt')}
                  >
                    Gantt Chart
                  </button>
                </li>
                <li className="nav-item ms-2">
                  <button 
                    className={`nav-link rounded-pill px-4 ${activeTab === 'import' ? 'active bg-primary' : 'text-light border border-secondary bg-transparent'}`}
                    onClick={() => setActiveTab('import')}
                  >
                    Jira Import
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {activeTab === 'timeline' && (
             <div className="col-12 fade-in">
               <div className="glass-panel p-4 mb-4">
                 <h5 className="mb-4">Task Timeline</h5>
                 {isLoadingTasks ? (
                   <div className="text-center p-5"><div className="spinner-border text-primary" /></div>
                 ) : (
                   <TaskTable tasks={tasks} userRole={userRole} onRefresh={fetchTasks} />
                 )}
               </div>
             </div>
          )}

          {activeTab === 'gantt' && (
             <div className="col-12 fade-in">
               <div className="glass-panel p-4 mb-4">
                 <h5 className="mb-4">Gantt Visualization</h5>
                 {isLoadingTasks ? (
                   <div className="text-center p-5"><div className="spinner-border text-primary" /></div>
                 ) : (
                   <GanttChart tasks={tasks} />
                 )}
               </div>
             </div>
          )}

          {activeTab === 'import' && (
            <div className="col-lg-12 fade-in">
              <div className="glass-panel p-4 mb-4">
                <h5 className="mb-4">Jira Task Import</h5>
                
                {message.text && (
                  <div className={`alert alert-${message.type} py-2 small mb-4`} role="alert">
                    {message.text}
                  </div>
                )}

                <form onSubmit={handleJiraSearch} className="row g-3 mb-4">
                  <div className="col-md-4">
                    <label className="form-label small text-muted">Jira Personal Access Token</label>
                    <input
                      type="password"
                      className="form-control form-control-sm bg-dark text-light border-secondary"
                      placeholder="Enter PAT..."
                      value={jiraToken}
                      onChange={(e) => setJiraToken(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small text-muted">JQL Query</label>
                    <input
                      type="text"
                      className="form-control form-control-sm bg-dark text-light border-secondary"
                      placeholder="project = 'PRJ'..."
                      value={jql}
                      onChange={(e) => setJql(e.target.value)}
                    />
                  </div>
                  <div className="col-md-2 d-flex align-items-end">
                    <button type="submit" className="btn btn-premium btn-sm w-100" disabled={isSearching}>
                      {isSearching ? "Searching..." : "Search Jira"}
                    </button>
                  </div>
                </form>

                {searchResults.length > 0 && (
                  <div className="table-responsive">
                    <table className="table table-dark table-hover align-middle small">
                      <thead>
                        <tr>
                          <th>Key</th>
                          <th>Summary</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {searchResults.map((issue) => (
                          <tr key={issue.id}>
                            <td><span className="badge bg-secondary">{issue.key}</span></td>
                            <td>{issue.fields.summary}</td>
                            <td><span className="small text-muted">{issue.fields.status?.name}</span></td>
                            <td>
                              <button
                                className="btn btn-outline-primary btn-sm py-0 px-2"
                                onClick={() => handleImport(issue)}
                                disabled={importingId === issue.id}
                              >
                                {importingId === issue.id ? "..." : "Import"}
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
          )}
        </div>
      )}
    </div>
  );
}
