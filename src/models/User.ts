import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    surname: {
      type: String,
      required: [true, "Surname is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false, // Don't return password by default
    },
    role: {
      type: String,
      enum: ["BE Analist", "BE Dev", "Web Analist", "Web Dev", "Mobile Analist", "Mobile Dev", "Test", null],
      default: null,
    },
    jiraTokenEncrypted: {
      type: String,
      default: null,
      select: false, // Don't return this by default for security
    },
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);

export default User;
