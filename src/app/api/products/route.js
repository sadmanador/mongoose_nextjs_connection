import { NextResponse } from "next/server";
import Product from "../../../../models/Product";
import { apiHandler } from "@/utils/apiHandler";

export const GET = apiHandler(async () => {
    const tasks = await Product.find({});
    return NextResponse.json(tasks, { status: 200 });
  });