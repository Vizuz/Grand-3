import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLogin from "../components/admin/AdminLogin";
import AdminDashboard from "../components/admin/AdminDashboard";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token"),
  );
  const navigate = useNavigate();

  const handleLogin = (token) => {
    if (token) {
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    navigate("/");
  };

  if (!isAuthenticated) {
    return (
      <div className="w-full max-w-full overflow-x-auto">
        <AdminLogin onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div className="w-full max-w-full overflow-x-auto">
      <AdminDashboard onLogout={handleLogout} />
    </div>
  );
}
