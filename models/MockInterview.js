import { Schema, model, models } from "mongoose";
const MockInterviewSchema = new Schema(
  {
    mockInterviewId: {
      type: String,
      required: true,
      unique: true,
      default: () => mongoose.Types.ObjectId().toString(),
    },
    jsonMockResponse: {
      type: String,
      required: true,
    },
    jobPosition: {
      type: String,
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    jobExperience: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default models.MockInterview ||
  model("MockInterview", MockInterviewSchema);
