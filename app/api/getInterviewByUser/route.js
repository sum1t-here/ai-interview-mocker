import MockInterview from "@/models/MockInterview";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Parse the request body
    const { userEmail } = await req.json();

    await connectDB();

    // Validate userEmail
    if (!userEmail) {
      return NextResponse.json(
        { error: "User email is required" },
        { status: 400 }
      );
    }

    // Fetch mock interviews created by the user
    const interviews = await MockInterview.find({ createdBy: userEmail });

    // If no interviews are found, return a 404 response
    if (interviews.length === 0) {
      return NextResponse.json(
        { message: "No mock interviews found for this user" },
        { status: 404 }
      );
    }

    // Return the fetched interviews
    return NextResponse.json(interviews, { status: 200 });
  } catch (error) {
    console.error("Error fetching mock interviews:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
