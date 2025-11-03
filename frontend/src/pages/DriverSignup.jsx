import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function DriverSignup() {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    license_no: "",
    phone_no: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/driver/signup", formData);
      alert("Signup successful! Please login.");
      navigate("/driver/login");
    } catch (err) {
      alert(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSignup}
        className="bg-white p-6 rounded-xl shadow-md w-96"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Driver Signup</h1>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="border p-2 w-full mb-3 rounded"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-2 w-full mb-3 rounded"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="license_no"
          placeholder="License Number"
          className="border p-2 w-full mb-3 rounded"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone_no"
          placeholder="Phone Number"
          className="border p-2 w-full mb-3 rounded"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Sign Up
        </button>

        <p className="text-sm text-center mt-3">
          Already registered?{" "}
          <span
            onClick={() => navigate("/driver/login")}
            className="text-green-700 cursor-pointer hover:underline"
          >
            Login here
          </span>
        </p>
      </form>
    </div>
  );
}
