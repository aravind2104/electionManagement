// src/pages/ElectionStatus.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";

const ElectionStatus = () => {
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    const fetchVoteStatus = async () => {
      const response = await axios.get("/api/vote-status");
      setHasVoted(response.data.hasVoted);
    };
    fetchVoteStatus();
  }, []);

  return (
    <Card className="max-w-md mx-auto mt-10 p-6">
      {hasVoted ? (
        <Alert>You have successfully cast your vote.</Alert>
      ) : (
        <Alert variant="destructive">You have not voted yet. Cast your vote now!</Alert>
      )}
    </Card>
  );
};

export default ElectionStatus;