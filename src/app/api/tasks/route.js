import { NextResponse } from "next/server";
import Task from "../../../../models/Task";
import { apiHandler } from "@/utils/apiHandler";

export const GET = apiHandler(async () => {
  const tasks = await Task.find({});
  return NextResponse.json(tasks, { status: 200 });
});

export const POST = apiHandler(async (request) => {
  const { user, task, status } = await request.json();
  const newTask = new Task({ user, task, status });
  await newTask.save();
  return NextResponse.json(newTask, { status: 201 });
});

export const PATCH = apiHandler(async (request) => {
  const { searchParams } = new URL(request.url);
  const taskId = searchParams.get("taskId");

  if (!taskId) {
    return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
  }

  const { user, task, status } = await request.json();
  const updatedTask = await Task.findByIdAndUpdate(
    taskId,
    { user, task, status },
    { new: true }
  );

  if (!updatedTask) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }

  return NextResponse.json(updatedTask, { status: 200 });
});

export const DELETE = apiHandler(async (request) => {
  const { searchParams } = new URL(request.url);
  const taskId = searchParams.get("taskId");

  if (!taskId) {
    return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
  }

  const deletedTask = await Task.findByIdAndDelete(taskId);

  if (!deletedTask) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }

  return NextResponse.json(
    { message: "Task deleted successfully" },
    { status: 200 }
  );
});
