import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Manage Candidates */}
        <Card className="p-6 text-center shadow-lg">
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">Manage Candidates</h2>
            <Button onClick={() => navigate("/canlst")} className="bg-blue-600">
              Go to Candidates
            </Button>
          </CardContent>
        </Card>

        {/* Start/End Election */}
        <Card className="p-6 text-center shadow-lg">
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">Election Control</h2>
            <Button onClick={() => navigate("/control")} className="bg-green-600">
              Control Election
            </Button>
          </CardContent>
        </Card>

        {/* View Results */}
        <Card className="p-6 text-center shadow-lg">
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">View Results</h2>
            <Button onClick={() => navigate("/res")} className="bg-purple-600">
              View Results
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
