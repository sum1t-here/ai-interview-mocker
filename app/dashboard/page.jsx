"use client";

import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import AddNewInterview from "./_components/AddNewInterview";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Dashboard() {
  const { user } = useUser();
  const [interview, setInterview] = useState([]);

  const userEmail = user?.primaryEmailAddress?.emailAddress;

  const interviews = async () => {
    const response = await fetch("/api/getInterviewByUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userEmail }),
    });
    const data = await response.json();
    setInterview(data);
  };

  useEffect(() => {
    if (userEmail) {
      interviews();
    }
  }, [userEmail]);

  console.log(interview);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <h1 className="text-gray-500">
        Create and start your AI Mockup Interview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AddNewInterview />
      </div>
      <div>
        <h1 className="text-2xl font-bold mt-5">Your Interviews</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
          {interview.length > 0 ? (
            interview.map((interview) => (
              <Card key={interview._id}>
                <CardHeader>
                  <CardTitle>{interview.jobPosition}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{interview.jobExperience} year of Experience</p>
                  <p>{interview.jobDescription}</p>
                </CardContent>
                <CardFooter>
                  <Link
                    href={`/dashboard/interview/${interview.mockInterviewId}/feedback`}
                  >
                    <Button>View Feedback</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))
          ) : (
            <p>No interviews found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
