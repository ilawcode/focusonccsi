import mongoose, { Schema, model, models } from "mongoose";

const AuditLogSchema = new Schema(
  {
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    field: {
      type: String,
      required: true,
    },
    oldValue: {
      type: Date,
      default: null,
    },
    newValue: {
      type: Date,
      default: null,
    },
    reason: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const AuditLog = models.AuditLog || model("AuditLog", AuditLogSchema);

export default AuditLog;
