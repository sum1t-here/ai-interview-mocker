import MockInterview from "@/models/MockInterview";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const { mockInterviewId } = await req.json();
    if (!mockInterviewId) {
      return NextResponse.json(
        { success: false, error: "Mock Interview ID is required" },
        { status: 400 }
      );
    }
    const interview = await MockInterview.findOne({ mockInterviewId });
    if (!interview) {
      return NextResponse.json(
        { success: false, error: "Interview not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: true, data: interview },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching interview:", error.message);
    return NextResponse.json(
      { success: false, error: "Database error" },
      { status: 500 }
    );
  }
}
