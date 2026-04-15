import mongoose, { Schema, model, models } from "mongoose";

const SavedQuerySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Query name is required"],
    },
    jql: {
      type: String,
      required: [true, "JQL is required"],
    },
  },
  { timestamps: true }
);

const SavedQuery = models.SavedQuery || model("SavedQuery", SavedQuerySchema);

export default SavedQuery;
