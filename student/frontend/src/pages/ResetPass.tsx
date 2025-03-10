import React, { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      await axios.post(`http://localhost:5000/password/reset-password/${token}`, { password });
      setMessage("Password reset successful. You can now log in.");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err: unknown) {
      console.error("Password reset failed:", err);
      setError("Invalid or expired token.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-96">
        <h2 className="text-2xl font-bold text-center">Set New Password</h2>
        
        {message && <Alert className="text-green-500">{message}</Alert>}
        {error && <Alert className="text-red-500">{error}</Alert>}

        <form className="space-y-4" onSubmit={handleResetPassword}>
          <Input type="password" placeholder="New password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Input type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          <Button type="submit" className="w-full">{loading ? "Resetting..." : "Reset Password"}</Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
