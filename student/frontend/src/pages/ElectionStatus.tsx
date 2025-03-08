import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ElectionStatus: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold text-green-600">Vote Cast Successfully!</h2>
      <p className="mt-2 text-gray-600">Thank you for participating in the election.</p>
      <Button className="mt-4" onClick={() => navigate("/home")}>
        Return to Home
      </Button>
    </div>
  );
};

export default ElectionStatus;
