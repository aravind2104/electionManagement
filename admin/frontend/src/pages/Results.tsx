// src/pages/RealTimeResults.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const RealTimeResults = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const response = await axios.get("/api/results");
      setResults(response.data);
    };
    fetchResults();
  }, []);

  return (
    <Card className="max-w-2xl mx-auto mt-10 p-6">
      <h1 className="text-2xl font-bold mb-4">Real-Time Results</h1>
      <BarChart width={500} height={300} data={results}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="votes" fill="#8884d8" />
      </BarChart>
    </Card>
  );
};

export default RealTimeResults;