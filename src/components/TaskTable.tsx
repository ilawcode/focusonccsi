"use client";

import { useState } from "react";
import EditDateModal from "./EditDateModal";
import TaskHistory from "./TaskHistory";

interface TaskTableProps {
  tasks: any[];
  userRole: string;
  onRefresh: () => void;
}

const ROLE_FIELDS_MAP: Record<string, string[]> = {
  "BE Analist": ["beAnalystStart", "beAnalystDone"],
  "BE Dev": ["beDevStart", "beDevDone"],
  "Web Analist": ["webAnalystStart", "webAnalystDone"],
  "Web Dev": ["webDevStart", "webDevDone"],
  "Mobile Analist": ["mobileAnalystStart", "mobileAnalystDone"],
  "Mobile Dev": ["mobileDevStart", "mobileDevDone"],
  "Test": ["testStart", "testDone"],
};

export default function TaskTable({ tasks, userRole, onRefresh }: TaskTableProps) {
  const [editingTask, setEditingTask] = useState<{ id: string; key: string; field: string; label: string; current: string | null } | null>(null);
  const [expandedHistory, setExpandedHistory] = useState<string | null>(null);

  const allowedFields = ROLE_FIELDS_MAP[userRole] || [];

  const handleEditClick = (task: any, fieldKey: string, fieldLabel: string) => {
    setEditingTask({
      id: task._id,
      key: task.key,
      field: fieldKey,
      label: fieldLabel,
      current: task[fieldKey],
    });
  };

  const toggleHistory = (taskId: string) => {
    setExpandedHistory(prev => (prev === taskId ? null : taskId));
  };

  if (!tasks || tasks.length === 0) {
    return <div className="text-center p-4 text-muted">No tasks available in tracking.</div>;
  }

  return (
    <div className="table-responsive glass-panel p-2">
      <table className="table align-middle small mb-0">
        <thead>
          <tr>
            <th style={{ width: "30px" }}></th>
            <th>Task</th>
            <th className="text-center">BE Ana (S/D)</th>
            <th className="text-center">BE Dev (S/D)</th>
            <th className="text-center">Web Ana (S/D)</th>
            <th className="text-center">Web Dev (S/D)</th>
            <th className="text-center">Mob Ana (S/D)</th>
            <th className="text-center">Mob Dev (S/D)</th>
            <th className="text-center">Test (S/D)</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <React.Fragment key={task._id}>
              <tr>
                <td>
                  <button 
                    className="btn btn-sm btn-outline-secondary p-0 px-1 border-0"
                    onClick={() => toggleHistory(task._id)}
                    title="Toggle Audit History"
                  >
                    {expandedHistory === task._id ? "▼" : "▶"}
                  </button>
                </td>
                <td>
                  <span className="fw-bold">{task.key}</span>
                  <div className="text-muted text-truncate" style={{ maxWidth: "150px" }} title={task.summary}>
                    {task.summary}
                  </div>
                </td>
                
                {/* Render Phase Cells */}
                <PhaseCell task={task} startField="beAnalystStart" doneField="beAnalystDone" label="BE Analysis" allowed={allowedFields} onEdit={handleEditClick} />
                <PhaseCell task={task} startField="beDevStart" doneField="beDevDone" label="BE Dev" allowed={allowedFields} onEdit={handleEditClick} />
                <PhaseCell task={task} startField="webAnalystStart" doneField="webAnalystDone" label="Web Analysis" allowed={allowedFields} onEdit={handleEditClick} />
                <PhaseCell task={task} startField="webDevStart" doneField="webDevDone" label="Web Dev" allowed={allowedFields} onEdit={handleEditClick} />
                <PhaseCell task={task} startField="mobileAnalystStart" doneField="mobileAnalystDone" label="Mobile Analysis" allowed={allowedFields} onEdit={handleEditClick} />
                <PhaseCell task={task} startField="mobileDevStart" doneField="mobileDevDone" label="Mobile Dev" allowed={allowedFields} onEdit={handleEditClick} />
                <PhaseCell task={task} startField="testStart" doneField="testDone" label="Test" allowed={allowedFields} onEdit={handleEditClick} />
              </tr>
              
              {expandedHistory === task._id && (
                <tr>
                  <td colSpan={9} className="p-0 border-0">
                    <div className="px-5 py-3 border-top" style={{ backgroundColor: "rgba(128,128,128,0.02)" }}>
                      <TaskHistory taskId={task._id} />
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {editingTask && (
        <EditDateModal
          taskId={editingTask.id}
          taskKey={editingTask.key}
          fieldKey={editingTask.field}
          fieldLabel={editingTask.label}
          currentValue={editingTask.current}
          onClose={() => setEditingTask(null)}
          onSaveSuccess={() => {
            setEditingTask(null);
            onRefresh();
          }}
        />
      )}
    </div>
  );
}

import React from "react";

// Helper Component for rendering the dual S/D cells
function PhaseCell({ task, startField, doneField, label, allowed, onEdit }: any) {
  const canEditStart = allowed.includes(startField);
  const canEditDone = allowed.includes(doneField);

  const renderDate = (val: string, canEdit: boolean, field: string, fLabel: string) => {
    let isOverdue = false;
    
    if (val && fLabel === "Done") {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Ignore time 
      const targetTime = new Date(val).getTime();
      if (targetTime < today.getTime()) {
        isOverdue = true;
      }
    }

    const formatted = val ? new Date(val).toLocaleDateString([], { month: "short", day: "numeric" }) : "--";
    let textColor = "text-secondary";
    if (val) textColor = isOverdue ? "text-danger fw-bold" : "text-light";

    return (
      <div className={`d-flex align-items-center justify-content-between p-1 rounded ${textColor}`} style={{ minWidth: "60px", backgroundColor: canEdit ? "rgba(59, 130, 246, 0.1)" : "transparent" }}>
        <span>{formatted}</span>
        {canEdit && (
          <button 
            className="btn btn-sm btn-link p-0 text-accent ms-1" 
            onClick={() => onEdit(task, field, `${label} ${fLabel}`)}
            title="Edit Date"
          >
            ✎
          </button>
        )}
      </div>
    );
  };

  return (
    <td className="text-center" style={{ borderLeft: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="d-flex flex-column align-items-center gap-1">
        {renderDate(task[startField], canEditStart, startField, "Start")}
        {renderDate(task[doneField], canEditDone, doneField, "Done")}
      </div>
    </td>
  );
}
