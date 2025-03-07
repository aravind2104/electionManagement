// src/pages/ElectionControl.js
import React, { useState } from "react";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";

const ElectionControl = () => {
  const [electionStatus, setElectionStatus] = useState("Closed");
  const [error, setError] = useState("");

  const handleStartElection = async () => {
    try {
      await axios.post("/api/election/start");
      setElectionStatus("Active");
    } catch (error) {
      setError("Failed to start election.");
    }
  };

  const handleEndElection = async () => {
    try {
      await axios.post("/api/election/end");
      setElectionStatus("Closed");
    } catch (error) {
      setError("Failed to end election.");
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-10 p-6">
      <h1 className="text-2xl font-bold mb-4">Election Control</h1>
      {error && <Alert variant="destructive">{error}</Alert>}
      <p className="mb-4">Election Status: {electionStatus}</p>
      <div className="space-y-2">
        <Button className="w-full" onClick={handleStartElection}>
          Start Election
        </Button>
        <Button className="w-full" onClick={handleEndElection}>
          End Election
        </Button>
      </div>
    </Card>
  );
};

export default ElectionControl;