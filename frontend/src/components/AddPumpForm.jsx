import React, { useState } from "react";

const AddPumpForm = () => {
  const [formData, setFormData] = useState({
    pump_name: "",
    location: "",
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
        setFormData({ pump_name: "", location: "" });
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
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-xl p-6 border border-gray-200">
      <h2 className="text-2xl font-semibold mb-5 text-gray-800 text-center">
        Add Petrol Pump
      </h2>

      {message && (
        <p
          className={`mb-4 text-center ${
            message.includes("successfully") ? "text-green-600" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pump Name
          </label>
          <input
            type="text"
            name="pump_name"
            value={formData.pump_name}
            onChange={handleChange}
            placeholder="Enter pump name"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter location (optional)"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-200 outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 font-semibold rounded-md transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {loading ? "Adding..." : "Add Pump"}
        </button>
      </form>
    </div>
  );
};

export default AddPumpForm;
