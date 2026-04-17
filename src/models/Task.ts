import mongoose, { Schema, model, models } from "mongoose";

const TaskSchema = new Schema(
  {
    jiraId: {
      type: String,
      unique: true,
      required: true,
    },
    key: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
    },
    description: {
      type: String,
    },
    type: {
      type: String,
    },
    // Timeline Phase Dates
    beAnalystStart: { type: Date, default: null },
    beAnalystDone: { type: Date, default: null },
    beDevStart: { type: Date, default: null },
    beDevDone: { type: Date, default: null },
    webAnalystStart: { type: Date, default: null },
    webAnalystDone: { type: Date, default: null },
    webDevStart: { type: Date, default: null },
    webDevDone: { type: Date, default: null },
    mobileAnalystStart: { type: Date, default: null },
    mobileAnalystDone: { type: Date, default: null },
    mobileDevStart: { type: Date, default: null },
    mobileDevDone: { type: Date, default: null },
    testStart: { type: Date, default: null },
    testDone: { type: Date, default: null },
    
    originalData: {
      type: Object,
    },
  },
  { timestamps: true }
);

const Task = models.Task || model("Task", TaskSchema);

export default Task;
