import UserAnswer from "@/models/UserAnswer";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const { interviewId, userEmail } = await req.json();

    if (!interviewId) {
      return NextResponse.json(
        { error: "Interview ID is required" },
        { status: 400 }
      );
    }

    if (!userEmail) {
      console.log("User Email is required");
      return NextResponse.json(
        { error: "User Email is required" },
        { status: 400 }
      );
    }

    const userAnswer = await UserAnswer?.find({
      mockInterviewId: interviewId,
      userEmail,
    })
      .sort({ createdAt: -1 })
      .limit(5);

    return NextResponse.json(userAnswer, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
