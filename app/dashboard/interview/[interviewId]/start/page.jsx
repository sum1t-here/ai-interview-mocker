"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import QuestionSection from "./_component/QuestionSection";
import RecordAnswerSection from "./_component/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function StartInterview() {
  const { interviewId } = useParams();
  const [interviewDetails, setInterviewDetails] = useState(null);
  const [activeQuestion, setActiveQuestion] = useState(1);
  const [questions, setQuestions] = useState([]);
  const getInterviewDetails = async () => {
    const response = await fetch("/api/getInterview", {
      method: "POST",
      body: JSON.stringify({ mockInterviewId: interviewId }),
    });
    const data = await response.json();
    if (data.success) {
      // Parse the JSON string and extract the questions array
      const parsedResponse = JSON.parse(data.data.jsonMockResponse);
      const questionsArray = parsedResponse.questions;

      setInterviewDetails(data.data);
      setQuestions(questionsArray);
    }
  };

  useEffect(() => {
    getInterviewDetails();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-2 border-primary rounded-sm p-5 mt-4">
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-2 border-primary rounded-sm">
          {questions && questions.length > 0 ? (
            questions.map((question, index) => {
              return (
                <div>
                  <div>
                    <QuestionSection
                      key={index}
                      question={question}
                      activeQuestion={activeQuestion}
                      setActiveQuestion={setActiveQuestion}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <div>No questions found</div>
          )}
        </div>
        <div className="flex justify-center items-center w-full mt-5 gap-2">
          {activeQuestion > 0 && (
            <Button
              className="w-full"
              onClick={() => setActiveQuestion(activeQuestion - 1)}
            >
              Previous
            </Button>
          )}
          {activeQuestion < questions.length && (
            <Button
              className="w-full"
              onClick={() => setActiveQuestion(activeQuestion + 1)}
            >
              Next
            </Button>
          )}
          {activeQuestion === questions.length && (
            <div className="w-full">
              <Link href={`/dashboard/interview/${interviewId}/feedback`}>
                <Button className="w-full">Submit</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
      <div>
        <RecordAnswerSection
          question={questions}
          activeQuestion={activeQuestion}
          interviewId={interviewDetails?.mockInterviewId}
        />
      </div>
    </div>
  );
}

export default StartInterview;
