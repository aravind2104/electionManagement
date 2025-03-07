// src/pages/Candidates.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Candidates = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      const response = await axios.get("/api/candidates");
      setCandidates(response.data);
    };
    fetchCandidates();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10 space-y-4">
      {candidates.map((candidate) => (
        <Card key={candidate.id} className="p-4">
          <img src={candidate.photo} alt={candidate.name} className="w-24 h-24 rounded-full mx-auto" />
          <h2 className="text-xl font-bold text-center mt-2">{candidate.name}</h2>
          <p className="text-center">{candidate.manifesto}</p>
          <Button className="w-full mt-4">Vote</Button>
        </Card>
      ))}
    </div>
  );
};

export default Candidates;