import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

// Define election type
interface Election {
  _id: string;
  name: string;
  description: string;
}

const Dashboard: React.FC = () => {
  const [elections, setElections] = useState<Election[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchElections = async () => {
      try {
        const response = await axios.get<Election[]>("/api/elections", { withCredentials: true });
        setElections(response.data);
      } catch (err) {
        console.error("Failed to fetch elections:", err);
        setError("Failed to fetch elections.");
      }
    };
    fetchElections();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center">Upcoming Elections</h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {elections.length === 0 ? (
        <p className="text-center mt-4">No elections available.</p>
      ) : (
        elections.map((election) => (
          <Card key={election._id} className="p-4 mt-4">
            <h2 className="text-xl font-semibold">{election.name}</h2>
            <p className="text-gray-600">{election.description}</p>
            <Button className="mt-2" onClick={() => navigate(`/election/${election._id}`)}>
              View Candidates
            </Button>
          </Card>
        ))
      )}
    </div>
  );
};

export default Dashboard;
