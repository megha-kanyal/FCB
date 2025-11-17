
import React, { useState } from "react";

const AddPumpForm = () => {
  const [formData, setFormData] = useState({
    pump_name: "",
    location: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.pump_name.trim()) {
      setMessage("Pump name is required!");
      return;
    }
    if (!formData.email.trim()) {
      setMessage("Email is required!");
      return;
    }
    if (!formData.password.trim()) {
      setMessage("Password is required!");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const token = localStorage.getItem("adminToken");

      const res = await fetch("http://localhost:5000/api/pumps/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Petrol pump added successfully!");
        setFormData({
          pump_name: "",
          location: "",
          email: "",
          password: "",
        });
      } else {
        setMessage(data.message || "Failed to add pump.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 rounded-2xl">
      <div className="bg-white rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-yellow-400 mb-6 text-center">
          Add Petrol Pump
        </h2>

        {message && (
          <p
            className={`mb-4 text-center font-medium ${
              message.includes("successfully")
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* PUMP NAME */}
          <div>
            <label className="block text-sm font-medium mb-2">Pump Name</label>
            <input
              type="text"
              name="pump_name"
              value={formData.pump_name}
              onChange={handleChange}
              placeholder="Enter pump name"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none"
            />
          </div>

          {/* LOCATION */}
          <div>
            <label className="block text-sm font-medium mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter location (optional)"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter login email"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter login password"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none"
            />
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 font-bold rounded-lg transition-transform ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black hover:scale-105 shadow-lg"
            }`}
          >
            {loading ? "Adding..." : "Add Pump"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPumpForm;
