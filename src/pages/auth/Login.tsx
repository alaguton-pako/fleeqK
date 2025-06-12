// src/pages/Login.tsx
import React from "react";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/dashboard");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Button text="Go to dashboard" variant="primary" onClick={handleLogin} />
    </div>
  );
};

export default Login;
