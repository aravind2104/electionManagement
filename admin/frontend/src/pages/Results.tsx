import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { Table, TableHead, TableRow, TableHeader, TableCell, TableBody } from "@/components/ui/table";
import { Alert } from "@/components/ui/alert";

interface Candidate {
  name: string;
  position: string;
  votes: number;
}

const Results: React.FC = () => {
  const [results, setResults] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchResults = async () => {
    try {
      const response = await axios.get("/api/elections/results"); // Adjust the endpoint accordingly
      setResults(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching results:", err);
      setError("Failed to load results. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults(); // Fetch initially
    const interval = setInterval(fetchResults, 5000); // Poll every 5 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Card className="w-full max-w-2xl p-4">
        <h2 className="text-2xl font-bold text-center mb-4">Live Election Results</h2>

        {loading ? <p className="text-center">Loading results...</p> : null}
        {error ? <Alert className="mt-2 text-red-500">{error}</Alert> : null}

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Candidate</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Votes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((candidate, index) => (
              <TableRow key={index}>
                <TableCell>{candidate.name}</TableCell>
                <TableCell>{candidate.position}</TableCell>
                <TableCell>{candidate.votes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default Results;
