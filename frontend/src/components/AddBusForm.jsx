
import { useState } from "react";

export default function AddBusForm({ onAdd }) {
  const [form, setForm] = useState({
    plate_no: "",
    model_no: "",
    capacity: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("adminToken");
    if (!token) {
      alert("Admin token missing. Please log in again.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/bus/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add bus");

      alert("Bus added successfully!");
      setForm({ plate_no: "", model_no: "", capacity: "" });
      if (onAdd) onAdd();
    } catch (err) {
      console.error(err);
      alert(`${err.message}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 rounded-2xl">
      <div className="bg-white rounded-2xl p-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent mb-8">
          Add New Bus
        </h2>

        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Plate Number
            </label>
            <input
              type="text"
              name="plate_no"
              placeholder="e.g., ABC-1234"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none transition-colors text-gray-800"
              value={form.plate_no}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Model Number
            </label>
            <input
              type="text"
              name="model_no"
              placeholder="e.g., Volvo B9R"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none transition-colors text-gray-800"
              value={form.model_no}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Seating Capacity
            </label>
            <input
              type="number"
              name="capacity"
              placeholder="e.g., 50"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none transition-colors text-gray-800"
              value={form.capacity}
              onChange={handleChange}
              required
            />
          </div>

          <button 
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-bold px-6 py-4 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            Add Bus
          </button>
        </div>
      </div>
    </div>
  );
}