import { model, models, Schema } from "mongoose";

const userAnswerSchema = new Schema(
  {
    mockInterviewId: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    correctAnswer: {
      type: String,
      required: true,
    },
    userAnswer: {
      type: String,
      required: true,
    },
    feedback: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const UserAnswer = models.UserAnswer || model("UserAnswer", userAnswerSchema);

export default UserAnswer;
