"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoaderIcon } from "lucide-react";
import { chatSession } from "../../../utils/GeminiAiModal";
import { useUser } from "@clerk/nextjs";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const InterviewPrompt = `Job Title: ${jobTitle}\nJob Description: ${jobDescription}\nJob Experience: ${jobExperience}`;

      const result = await chatSession.sendMessage(InterviewPrompt);
      const mockJsonResponse = result.response
        .text()
        .replace("```json", "")
        .replace("```", "");

      if (mockJsonResponse) {
        const response = await fetch("/api/addInterview", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jobTitle,
            jobDescription,
            jobExperience,
            userEmail: user?.primaryEmailAddress?.emailAddress,
            mockJsonResponse,
          }),
        });

        const data = await response.json();
        console.log("Inserted data:", data);
        setOpenDialog(false); // Close the dialog after successful submission
      }
    } catch (error) {
      console.error("Error during submission:", error);
    } finally {
      setLoading(false);
      setJobTitle(""); // Reset job title
      setJobDescription(""); // Reset job description
      setJobExperience(""); // Reset job experience
    }
  };

  return (
    <div>
      <div
        className="bg-gray-100 p-4 rounded-md shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg">+ Add New</h2>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Tell us more about the Job you are interviewing for
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2 p-4">
                  <p>Add more details about the job</p>
                  <div className="flex flex-col gap-2">
                    <label>Job Title</label>
                    <Input
                      placeholder="e.g. React Developer"
                      required
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label>Job Description / Tech Stack</label>
                    <Textarea
                      placeholder="e.g. React, Node.js, etc."
                      required
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label>Year of Experience</label>
                    <Input
                      placeholder="e.g. 1"
                      type="number"
                      required
                      value={jobExperience}
                      onChange={(e) => setJobExperience(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="destructive"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <LoaderIcon className="animate-spin" />
                    ) : (
                      <p>Start Interview</p>
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
