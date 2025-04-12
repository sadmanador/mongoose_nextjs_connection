import { NextResponse } from "next/server";
import Task from "../../../../models/Task";
import connectionToDB from "../../../../config/connection";


export async function GET(request) {
  try {
    console.log("Connecting to DB...");
    await connectionToDB();
    console.log("DB connected successfully");

    const tasks = await Task.find({});
    console.log("Tasks fetched successfully", tasks);

    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.log("Error fetching tasks:", error.message);
    return new Response("Error fetching tasks", { status: 500 });
  }
}


export async function POST(request) {
  try {
    console.log("Connecting to DB...");
    await connectionToDB();
    console.log("DB connected successfully");

    const { user, task, status } = await request.json();
    const newTask = new Task({ user, task, status });
    await newTask.save();

    console.log("Task created successfully", newTask);
    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.log("Error creating task:", error.message);
    return new Response("Error creating task", { status: 500 });
  }
}

// PATCH: Update an existing task
export async function PATCH(request) {
  try {
    console.log("Connecting to DB...");
    await connectionToDB();
    console.log("DB connected successfully");

    const { searchParams } = new URL(request.url);
    const taskId = searchParams.get("taskId");

    if (!taskId) {
      return NextResponse.json(
        { error: "Task ID is required" },
        { status: 400 }
      );
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

    console.log("Task updated successfully", updatedTask);
    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    console.log("Error updating task:", error.message);
    return new Response("Error updating task", { status: 500 });
  }
}

// DELETE: Delete a task
export async function DELETE(request) {
  try {
    console.log("Connecting to DB...");
    await connectionToDB();
    console.log("DB connected successfully");

    const { searchParams } = new URL(request.url);
    const taskId = searchParams.get("taskId");

    if (!taskId) {
      return NextResponse.json(
        { error: "Task ID is required" },
        { status: 400 }
      );
    }

    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    console.log("Task deleted successfully", deletedTask);
    return NextResponse.json(
      { message: "Task deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error deleting task:", error.message);
    return new Response("Error deleting task", { status: 500 });
  }
}
