// app/api/tasks/route.js

import { NextResponse } from "next/server";
import connectionToDB from "../../../../config/connection";
import Task from "../../../../models/Task";


export async function GET(request) {
  try {
    console.log("Connecting to DB...");
    await connectionToDB();
    console.log("DB Connected!");

    const tasks = await Task.find({});
    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error("Error in GET request:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "",
      },
      { status: 500 }
    );
  }
}


export async function POST(request) {
  try {
    console.log("Connecting to DB...");
    await connectionToDB();
    console.log("DB Connected!");

    const { user, task, status } = await request.json();


    const newTask = new Task({ user, task, status });
    await newTask.save();

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "",
      },
      { status: 500 }
    );
  }
}


export async function PATCH(request) {
  try {
    console.log("Connecting to DB...");
    await connectionToDB();
    console.log("DB Connected!");

    // Extracting task ID from the URL
    const { searchParams } = new URL(request.url);
    const taskId = searchParams.get("taskId");

    if (!taskId) {
      return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
    }

    // Parsing the body data
    const { user, task, status } = await request.json();

    // Update the task
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { user, task, status },
      { new: true }
    );

    if (!updatedTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    console.error("Error in PATCH request:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "",
      },
      { status: 500 }
    );
  }
}



export async function DELETE(request) {
  try {
    console.log("Connecting to DB...");
    await connectionToDB();
    console.log("DB Connected!");

    // Extracting task ID from the URL
    const { searchParams } = new URL(request.url);
    const taskId = searchParams.get("taskId");

    if (!taskId) {
      return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
    }

    // Delete the task
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Task deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error in DELETE request:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "",
      },
      { status: 500 }
    );
  }
}

