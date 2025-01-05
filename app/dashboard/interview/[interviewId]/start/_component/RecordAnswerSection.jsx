"use client";

import { Button } from "@/components/ui/button";
import { LucideWebcam } from "lucide-react";
import React, { useState, useEffect } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAiModal";

function RecordAnswerSection({ question, activeQuestion }) {
  const [webcamEnabled, setWebcamEnabled] = useState(false);
  const [answer, setAnswer] = useState("");

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  // Reset answer when starting a new recording
  useEffect(() => {
    if (!isRecording) {
      setAnswer("");
    }
  }, [isRecording]);

  // Accumulate transcript results into the answer state
  useEffect(() => {
    if (results.length > 0) {
      const fullTranscript = results
        .map((result) => result.transcript)
        .join(" ");
      setAnswer(fullTranscript);
    }
  }, [results]);

  // Check microphone permissions
  const enableMicrophone = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      return true;
    } catch (error) {
      toast.error("Microphone access is required for voice recording.");
      return false;
    }
  };

  // Save user answer and get feedback
  const saveUserAnswer = async () => {
    if (isRecording) {
      stopSpeechToText();

      // Validate answer length
      if (answer.length < 10) {
        toast.error("Please speak more than 10 words.");
        return;
      }

      // Get the active question text
      const activeQuestionData = Array.isArray(question)
        ? question[activeQuestion]
        : question;
      if (!activeQuestionData) {
        toast.error("No active question found.");
        return;
      }

      const questionText = activeQuestionData.question;
      console.log("Question:", questionText);

      // Generate feedback prompt
      const feedbackPrompt = `You are an interviewer. You are given a user's answer to a question. You are to provide rating and feedback on the user's answer in 3 to 5 lines in json format.
      User's answer: ${answer}
      Question: ${questionText}`;
      // console.log("Feedback Prompt:", feedbackPrompt);

      // Get feedback from API
      try {
        const result = await chatSession.sendMessage(feedbackPrompt);
        const mockJson = result.response
          .text()
          .replace("```json", "")
          .replace("```", "");
        // console.log("Feedback Response:", mockJson);

        // Parse the JSON response
        const feedback = JSON.parse(mockJson);
        // console.log("Parsed Feedback:", feedback);
        toast.success("Feedback received successfully!");
      } catch (error) {
        console.error("Failed to parse feedback:", error);
        toast.error("Failed to process feedback. Please try again.");
      }
    } else {
      const microphoneEnabled = await enableMicrophone();
      if (microphoneEnabled) {
        startSpeechToText();
      }
    }
  };

  // Handle Web Speech API errors
  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;

  return (
    <div>
      {webcamEnabled ? (
        <div className="flex flex-col items-center justify-center gap-3 w-full">
          <Webcam
            onUserMedia={() => setWebcamEnabled(true)}
            onUserMediaError={() => setWebcamEnabled(false)}
            mirrored={true}
            style={{ height: "300px", width: "100%" }}
            videoConstraints={{ facingMode: "environment" }}
          />
          <div className="flex flex-row gap-2 w-full">
            <Button className="w-1/2" onClick={saveUserAnswer}>
              {isRecording ? "Stop Voice Recording" : "Start Voice Recording"}
            </Button>
            <Button
              className="w-1/2"
              onClick={() => {
                setWebcamEnabled(false);
              }}
            >
              Disable Webcam
            </Button>
          </div>
          {isRecording && (
            <div className="w-full p-2 bg-secondary rounded-sm">
              <p className="text-sm text-primary">Live Transcription:</p>
              <p className="text-sm">{interimResult}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3">
          <LucideWebcam
            className="h-60 w-full p-10 bg-secondary rounded-sm border-2 border-primary"
            onClick={() => setWebcamEnabled(true)}
          />
          <Button className="w-full" onClick={() => setWebcamEnabled(true)}>
            Enable Webcam and Microphone
          </Button>
        </div>
      )}
    </div>
  );
}

export default RecordAnswerSection;