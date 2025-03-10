import React, { useEffect, useState } from "react";
import axios from "axios";
//import { Card } from "@/components/ui/card";
//import { Button } from "@/components/ui/button";
//import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";

// Define election type
interface Election {
  _id: string;
  name: string;
  description: string;
}

const Dashboard: React.FC = () => {
  const [elections, setElections] = useState<Election[]>([]);
  const [error, setError] = useState<string | null>(null);
  //const navigate = useNavigate();

  useEffect(() => {
    const fetchElections = async () => {
      try {
        const response = await axios.get<Election[]>("https://localhost:5000/election/home", { withCredentials: true });
        elections.pop();
        setElections(response.data);
      } catch (err) {
        console.error("Failed to fetch elections:", err);
        setError("Failed to fetch elections.");
      }
    };
    fetchElections();
  }, []);

  return (
    <div>
      <Navbar/>
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center">Upcoming Elections</h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

    </div>
    </div>
  );
};

export default Dashboard;
