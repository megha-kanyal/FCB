import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function DriverLogin() {
  const [driverId, setDriverId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5173/api/driver/login", {
        driverId,
        password,
      });
      localStorage.setItem("driverToken", res.data.token);
      navigate("/driver-dashboard");
    } catch (err) {
      alert(err.response?.data?.error || "Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-xl shadow-md w-80"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Driver Login</h1>
        <input
          type="text"
          placeholder="Driver ID"
          className="border p-2 w-full mb-3 rounded"
          value={driverId}
          onChange={(e) => setDriverId(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Login
        </button>

        <p className="text-sm text-center mt-3">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/driver/signup")}
            className="text-green-700 cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
}
