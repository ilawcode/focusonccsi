"use client";

import { useState } from "react";

interface EditDateModalProps {
  taskId: string;
  taskKey: string;
  fieldLabel: string;
  fieldKey: string;
  currentValue: string | null;
  onClose: () => void;
  onSaveSuccess: () => void;
}

export default function EditDateModal({
  taskId,
  taskKey,
  fieldLabel,
  fieldKey,
  currentValue,
  onClose,
  onSaveSuccess,
}: EditDateModalProps) {
  // Format current value for datetime-local input if it exists
  const initialDate = currentValue
    ? new Date(currentValue).toISOString().slice(0, 16)
    : "";

  const [dateStr, setDateStr] = useState(initialDate);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isFirstEntry = !currentValue;
  const isReasonValid = isFirstEntry || reason.length >= 100;
  
  // Also check if date has changed, if not, no point in saving really, but API handles identical values too.
  const hasChanged = dateStr !== initialDate;

  const handleSave = async () => {
    if (!hasChanged) {
      onClose();
      return;
    }
    
    if (!isReasonValid) {
      setError("Please provide at least 100 characters in your justification.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/tasks/${taskId}/timeline`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          [fieldKey]: dateStr ? new Date(dateStr).toISOString() : null,
          reason: isFirstEntry ? undefined : reason,
        }),
      });

      if (res.ok) {
        onSaveSuccess();
        onClose();
      } else {
        const data = await res.json();
        setError(data.message || "Failed to save date.");
      }
    } catch (err) {
      setError("Network error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.6)" }} tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content glass-panel" style={{ background: "rgba(15, 23, 42, 0.95)" }}>
          <div className="modal-header border-secondary">
            <h5 className="modal-title gradient-text">
              Update {fieldLabel} ({taskKey})
            </h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {error && <div className="alert alert-danger p-2 small">{error}</div>}
            
            <div className="mb-4">
              <label className="form-label small text-muted">Select Date & Time</label>
              <input
                type="datetime-local"
                className="form-control bg-dark text-light border-secondary"
                value={dateStr}
                onChange={(e) => setDateStr(e.target.value)}
              />
            </div>

            {!isFirstEntry && (
              <div className="mb-3">
                <label className="form-label small text-warning d-flex justify-content-between">
                  <span>Mandatory Justification</span>
                  <span className={reason.length < 100 ? "text-danger" : "text-success"}>
                    {reason.length} / 100 chars
                  </span>
                </label>
                <textarea
                  className="form-control bg-dark text-light border-secondary"
                  rows={4}
                  placeholder="Explain why this deadline is being extended or modified..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                ></textarea>
                <small className="form-text text-muted mt-1 d-block">
                  A minimum of 100 characters is required to modify an existing timeline phase.
                </small>
              </div>
            )}
          </div>
          <div className="modal-footer border-secondary">
            <button type="button" className="btn btn-outline-secondary btn-sm" onClick={onClose}>
              Cancel
            </button>
            <button 
              type="button" 
              className="btn btn-premium btn-sm" 
              onClick={handleSave}
              disabled={loading || !isReasonValid || !hasChanged}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
