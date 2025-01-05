"use client";

import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function Feedback() {
  const { interviewId } = useParams();
  const { user } = useUser();
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userEmail = user?.primaryEmailAddress?.emailAddress;

  const handleFeedback = async () => {
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ interviewId, userEmail }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch feedback");
      }

      const data = await response.json();
      setFeedbackData(data);
    } catch (error) {
      console.error("Error fetching feedback:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (interviewId && userEmail) {
      handleFeedback();
    }
  }, [interviewId, userEmail]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Here is Your Overall Feedback
      </h1>

      {feedbackData.length > 0 ? (
        <div className="flex flex-col gap-6">
          {feedbackData.map((record, index) => (
            <div
              key={record._id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200"
            >
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Record {index + 1}
              </h2>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 font-medium uppercase tracking-wider">
                    Question
                  </p>
                  <p className="text-gray-800 mt-1">{record.question}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 font-medium uppercase tracking-wider">
                    Correct Answer
                  </p>
                  <p className="text-gray-800 mt-1">{record.correctAnswer}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 font-medium uppercase tracking-wider">
                    Feedback
                  </p>
                  <p className="text-gray-800 mt-1">{record.feedback}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 font-medium uppercase tracking-wider">
                    Rating: {record.rating}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-64">
          <p className="text-lg text-gray-600">No feedback records found.</p>
        </div>
      )}
    </div>
  );
}

export default Feedback;
