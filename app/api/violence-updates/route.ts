// app/api/violence-updates/route.ts
import dbConnect from "@/lib/dbConnect";
import {ViolenceUpdate} from "@/models/ViolenceUpdate";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const updates = await ViolenceUpdate.find({ createdAt: { $gte: oneDayAgo } });
    return NextResponse.json(updates);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error fetching updates" }, { status: 500 });
  }
}
