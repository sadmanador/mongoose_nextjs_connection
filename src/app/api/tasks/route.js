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
