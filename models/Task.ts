import { Schema, model, models } from "mongoose";


const taskSchema = new Schema(
  {
    user: {
      type: String,
      required: true,
    },
    task: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["CURRENT", "COMPLETED"],
      default: "CURRENT",
    },
  },
  { timestamps: true }
);


const Task = models.Task || model("Task", taskSchema);

export default Task;
