import React, { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/password/forgot-password", { email });
      setMessage("A password reset link has been sent to your email.");
    } catch (err: unknown) {
      console.error("Password reset failed:", err);
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || "Invalid email. Please try again.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-96">
        <h2 className="text-2xl font-bold text-center">Reset Password</h2>

        {message && (
          <Alert className="mt-3 text-green-500 bg-green-100 p-2 text-center rounded-md">
            {message}
          </Alert>
        )}

        {error && (
          <Alert className="mt-3 text-red-500 bg-red-100 p-2 text-center rounded-md">
            {error}
          </Alert>
        )}

        <form className="mt-4 space-y-4" onSubmit={handleResetRequest}>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
        </form>

        <div className="text-center mt-3">
          <Button onClick={() => navigate("/login")} variant="outline">
            Back to Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
