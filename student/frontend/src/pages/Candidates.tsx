import React, { useEffect, useState } from "react";
import axios from "axios";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import Navbar from "../components/navbar";

// Define types
interface Candidate {
  name: string;
  photo: string;
  manifesto: string;
  votes: number;
}

interface Election {
  _id: string;
  name: string;
  candidates: Candidate[];
}

const Candidates: React.FC = () => {
  const { electionId } = useParams<{ electionId: string }>();
  const [election, setElection] = useState<Election | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [voted, setVoted] = useState(false);

  useEffect(() => {
    const fetchElection = async () => {
      try {
        const response = await axios.get<Election>(`/api/elections/${electionId}`);
        setElection(response.data);
      } catch (err) {
        console.error("Failed to fetch elections:", err);
        setError("Failed to fetch election details.");
      }
    };
    fetchElection();
  }, [electionId]);

  const handleVote = async (candidateName: string) => {
    try {
      await axios.post(`https://localhost:5000/vote/${electionId}`, { candidateName }, { withCredentials: true });
      setVoted(true);
    } catch (err) {
      console.error("Failed to fetch elections:", err);
      setError("Voting failed.");
    }
  };

  return (
    <div>
      <Navbar/>
    <div className="max-w-3xl mx-auto mt-10">
      {error && <p className="text-red-500 text-center">{error}</p>}

      {election ? (
        <>
          <h1 className="text-2xl font-bold text-center">{election.name}</h1>

          {/* {voted ? (
            <p className="text-center text-green-600 mt-4">✅ You have voted successfully!</p>
          ) : (
            election.candidates.map((candidate) => (
              <Card key={candidate.name} className="p-4 mt-4">
                <h2 className="text-xl font-semibold">{candidate.name}</h2>
                <img src={candidate.photo} alt={candidate.name} className="w-24 h-24 rounded-full mx-auto mt-4" />
                <p className="text-gray-600">{candidate.manifesto}</p>
                <Button className="mt-2" onClick={() => handleVote(candidate.name)}>
                  Vote
                </Button>
              </Card>
            ))
          )} */}
        </>
      ) : (
        <p className="text-center">Loading election details...</p>
      )}
    </div>
    </div>
  );
};

export default Candidates;
