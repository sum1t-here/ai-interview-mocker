"use client";
import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function Interview() {
  const { interviewId } = useParams();

  const [interviewDetails, setInterviewDetails] = useState(null);

  const getInterviewDetails = async () => {
    const response = await fetch("/api/getInterview", {
      method: "POST",
      body: JSON.stringify({ mockInterviewId: interviewId }),
    });
    const data = await response.json();
    // console.log(data.data);
    if (data.success) {
      setInterviewDetails(data.data);
    }
  };

  useEffect(() => {
    getInterviewDetails();
  }, []);

  return (
    <div className="my-10 flex justify-center items-center flex-col">
      <h2 className="font-bols text-2xl m-5 p-5">Let's get started</h2>
      <div className="flex flex-col gap-5 justify-center items-center">
        <div className="p-5 border-2 border-primary rounded-sm">
          {interviewDetails && (
            <div className="flex flex-col gap-3">
              <p>
                <strong>Job Role/Position:{""}</strong>
                {interviewDetails.jobPosition}
              </p>
              <p>
                <strong>Job Description/Tech Stack:{""}</strong>
                {interviewDetails.jobDescription}
              </p>
              <p>
                <strong>Years of Experience:{""}</strong>
                {interviewDetails.jobExperience}
              </p>
            </div>
          )}
          <div className="p-3 mt-5 rounded-sm bg-yellow-100 border-2 border-yellow-500">
            <h3 className="text-yellow-500">
              <span className="flex items-center gap-2 font-bold mb-2">
                <Lightbulb className="h-6 w-6" />
                Information
              </span>
            </h3>
            <div className="flex flex-col gap-2 mx-5">
              <p className="mb-2">
                Enable your webcam and microphone to start the AI Generated Mock
                Interview. It has been designed to simulate a real interview
                experience. It will ask you 5 questions based on the job role
                and tech stack. At the end of the interview, you will be given a
                feedback based on your performance.
              </p>
              <p className="mb-2">
                <strong>Note:</strong>
                We never record your video or audio, you can disable the webcam
                and microphone at any time you want.
              </p>
            </div>
          </div>
          <Link href={`/dashboard/interview/${interviewId}/start`}>
            <Button className="w-full mt-5">Start Interview</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Interview;
