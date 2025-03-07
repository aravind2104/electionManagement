// src/pages/AdminLogin.js
import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/admin/login", credentials);
      localStorage.setItem("adminToken", response.data.token);
      navigate("/admin/dashboard");
    } catch {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-10 p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
      {error && <Alert variant="destructive">{error}</Alert>}
      <form onSubmit={handleLogin} className="space-y-4">
        <Input
          type="email"
          placeholder="Email"
          value={credentials.email}
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
        />
        <Input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        />
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </Card>
  );
};

export default AdminLogin;