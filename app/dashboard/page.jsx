import { UserButton } from "@clerk/nextjs";
import React from "react";
import AddNewInterview from "./_components/AddNewInterview";

function Dashboard() {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <h1 className="text-gray-500">
        Create and start your AI Mockup Interview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AddNewInterview />
      </div>
    </div>
  );
}

export default Dashboard;
