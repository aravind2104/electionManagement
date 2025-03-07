// src/pages/Vote.js
import React, {useState} from "react";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";

const Vote = ({ candidate }) => {
  const [success, setSuccess] = useState(false);

  const handleVote = async () => {
    try {
      await axios.post("/api/vote", { candidateId: candidate.id });
      setSuccess(true);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Voting failed:", error.response.data);
      } else {
        console.error("Voting failed:", error);
      }
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-10 p-6">
      <h2 className="text-xl font-bold text-center">{candidate.name}</h2>
      <img src={candidate.photo} alt={candidate.name} className="w-24 h-24 rounded-full mx-auto mt-4" />
      <p className="text-center mt-2">{candidate.manifesto}</p>
      {success ? (
        <Alert className="mt-4">Vote cast successfully!</Alert>
      ) : (
        <Button className="w-full mt-4" onClick={handleVote}>
          Confirm Vote
        </Button>
      )}
    </Card>
  );
};

export default Vote;