import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch"; 
import Navbar from "../components/navbar";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [useOtp, setUseOtp] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/auth/login", { email, password });

      localStorage.setItem("student", JSON.stringify(response.data.student));

      if (Array.isArray(response.data.student.hasVoted) && response.data.student.hasVoted.length > 0) {
        navigate("/dashboard");
      } else {
        navigate("/elections");
      }
    } catch (err: unknown) {
      console.error("Login failed:", err);
      
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || "Invalid email or password.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/auth/send-otp", { email });
      setOtpSent(true);
    } catch (err: unknown) {
      console.error("Failed to send OTP:", err);

      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || "Invalid email. Please try again.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/auth/verify-otp", { email, otp });

      localStorage.setItem("student", JSON.stringify(response.data.student));

      if (Array.isArray(response.data.student.hasVoted) && response.data.student.hasVoted.length > 0) {
        navigate("/dashboard");
      } else {
        navigate("/elections");
      }
    } catch (err: unknown) {
      console.error("OTP verification failed:", err);

      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || "Invalid OTP. Please try again.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
    <Navbar />
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-96">
        <h2 className="text-2xl font-bold text-center">Student Login</h2>

        {error && (
          <Alert className="mt-3 text-red-500 bg-red-100 p-2 text-center rounded-md">
            {error}
          </Alert>
        )}

        <div className="flex items-center justify-center my-4">
          <span className="mr-2">Use OTP?</span>
          <Switch checked={useOtp} onCheckedChange={setUseOtp} />
        </div>

        {useOtp ? (
          otpSent ? (
            <form className="mt-4 space-y-4" onSubmit={handleVerifyOtp}>
              <Input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Verifying OTP..." : "Verify OTP & Login"}
              </Button>
            </form>
          ) : (
            <form className="mt-4 space-y-4" onSubmit={handleSendOtp}>
              <Input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Sending OTP..." : "Send OTP"}
              </Button>
            </form>
          )
        ) : (
          <form className="mt-4 space-y-4" onSubmit={handlePasswordLogin}>
            <Input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="text-left mt-3">
              <Link to="/forgot" className="text-blue-500 hover:underline">
                Forgot Password?
              </Link>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        )}
      </div>
    </div>
    </div>
  );
};

export default Login;
