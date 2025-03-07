// src/pages/AdminDashboard.js
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  return (
    <Card className="max-w-2xl mx-auto mt-10 p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p className="mb-4">Election Status: Ongoing</p>
      <div className="space-y-2">
        <Button className="w-full">Manage Candidates</Button>
        <Button className="w-full">Start/End Election</Button>
        <Button className="w-full">View Results</Button>
      </div>
    </Card>
  );
};

export default AdminDashboard;