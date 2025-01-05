import UserAnswer from "@/models/UserAnswer";
import connectDB from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const {
      mockInterviewId,
      question,
      userAnswer,
      feedback,
      rating,
      correctAnswer,
      userEmail,
    } = await req.json();

    const formattedMockInterviewId = Array.isArray(mockInterviewId)
      ? mockInterviewId[0]
      : mockInterviewId;

    await connectDB();
    const newUserAnswer = new UserAnswer({
      mockInterviewId: formattedMockInterviewId,
      question,
      userAnswer,
      feedback,
      correctAnswer,
      rating: parseInt(rating),
      userEmail,
    });
    await newUserAnswer.save();
    return NextResponse.json(
      { message: "User answer added successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
