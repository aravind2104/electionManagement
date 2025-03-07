// src/pages/Dashboard.js
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


const Dashboard = () => {
  return (
    <Card className="max-w-2xl mx-auto mt-10 p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome, [Student Name]</h1>
      <p className="mb-4">Election Status: Ongoing</p>
      <div className="space-y-2">
        <Button className="w-full">View Candidates</Button>
        <Button className="w-full">Cast Vote</Button>
        <Button className="w-full">Check Vote Status</Button>
      </div>
    </Card>
  );
};

export default Dashboard;