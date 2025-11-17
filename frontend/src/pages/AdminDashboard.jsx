import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }

    axios
      .get("http://localhost:5000/api/admin/verify", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data.user))
      .catch(() => {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
      });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
      {/* Header */}
      {/* <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
              TUMBTRIBE
            </h1>
            <p className="text-gray-500 text-sm mt-1 font-medium">Admin Dashboard</p>
          </div>
          {user && (
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-gray-800 font-semibold">{user.name}</p>
                <p className="text-gray-500 text-sm">{user.email}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {user.name?.charAt(0) || "A"}
              </div>
            </div>
          )}
        </div>
      </header> */}

      {/* Main Content */}
      {user ? (
        <Navbar />
      ) : (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg font-medium">Loading...</p>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white shadow-inner mt-auto">
        <div className="max-w-7xl mx-auto px-8 py-6 text-center">
          <p className="text-gray-500 text-sm font-medium">
            Admin Dashboard • Bus Booking System • All Rights Reserved © 2025
          </p>
        </div>
      </footer>
    </div>
  );
}