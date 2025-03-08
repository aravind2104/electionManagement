import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post("/api/admin/login", { email, password });
      if (response.status === 200) {
        const admin = response.data.admin;
        localStorage.setItem("admin", JSON.stringify(admin));
        navigate("/admin/dashboard");
      }
    } catch (err: unknown) {
      console.error("Login failed:", err);
      
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || "Invalid email or password.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold">Admin Login</h2>
      {error && <Alert className="mt-2 text-red-500">{error}</Alert>}
      <form className="mt-4 w-80" onSubmit={handleLogin}>
        <Input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mb-2"
        />
        <Input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mb-4"
        />
        <Button type="submit" className="w-full">Login</Button>
      </form>
    </div>
  );
};

export default Login;
