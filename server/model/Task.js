import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
  dueDate: Date,
  completed: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

export default mongoose.model("Task", taskSchema);