import MockInterview from "@/models/MockInterview";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
  try {
    const {
      jobTitle,
      jobDescription,
      jobExperience,
      userEmail,
      mockJsonResponse,
    } = await req.json();

    await connectDB();

    const newInterview = new MockInterview({
      mockInterviewId: uuidv4(),
      jsonMockResponse: mockJsonResponse,
      jobPosition: jobTitle,
      jobDescription,
      jobExperience,
      createdBy: userEmail,
    });

    const savedInterview = await newInterview.save();
    return NextResponse.json(
      { success: true, data: savedInterview },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving interview:", error);
    return NextResponse.json(
      { success: false, error: "Database error" },
      { status: 500 }
    );
  }
}
