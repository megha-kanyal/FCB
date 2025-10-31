import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">College Transport System</h1>
      <div className="space-x-4">
        <button
          onClick={() => navigate("/admin/login")}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow"
        >
          Admin Login
        </button>
        <button
          onClick={() => navigate("/driver/login")}
          className="bg-green-500 text-white px-6 py-3 rounded-lg shadow"
        >
          Driver Login
        </button>
      </div>
    </div>
  );
}
