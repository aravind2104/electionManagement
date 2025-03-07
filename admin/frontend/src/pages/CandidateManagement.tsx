// src/pages/CandidateManagement.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table } from "@/components/ui/table";
import { Alert } from "@/components/ui/alert";

const CandidateManagement = () => {
  const [candidates, setCandidates] = useState([]);
  const [formData, setFormData] = useState({ name: "", photo: "", manifesto: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCandidates = async () => {
      const response = await axios.get("/api/candidates");
      setCandidates(response.data);
    };
    fetchCandidates();
  }, []);

  const handleAddCandidate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/candidates", formData);
      setCandidates([...candidates, response.data]);
      setFormData({ name: "", photo: "", manifesto: "" });
    } catch (error) {
      setError("Failed to add candidate.");
    }
  };

  const handleDeleteCandidate = async (id) => {
    try {
      await axios.delete(`/api/candidates/${id}`);
      setCandidates(candidates.filter((candidate) => candidate.id !== id));
    } catch (error) {
      setError("Failed to delete candidate.");
    }
  };

  return (
    <Card className="max-w-2xl mx-auto mt-10 p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Candidates</h1>
      {error && <Alert variant="destructive">{error}</Alert>}
      <form onSubmit={handleAddCandidate} className="space-y-4 mb-6">
        <Input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <Input
          type="text"
          placeholder="Photo URL"
          value={formData.photo}
          onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
        />
        <Input
          type="text"
          placeholder="Manifesto"
          value={formData.manifesto}
          onChange={(e) => setFormData({ ...formData, manifesto: e.target.value })}
        />
        <Button type="submit" className="w-full">
          Add Candidate
        </Button>
      </form>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Photo</th>
            <th>Manifesto</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr key={candidate.id}>
              <td>{candidate.name}</td>
              <td>
                <img src={candidate.photo} alt={candidate.name} className="w-12 h-12 rounded-full" />
              </td>
              <td>{candidate.manifesto}</td>
              <td>
                <Button variant="destructive" onClick={() => handleDeleteCandidate(candidate.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
};

export default CandidateManagement;