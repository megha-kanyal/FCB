import { useState } from "react";

export default function FuelForm({ onAdd }) {
  const [formData, setFormData] = useState({
    date: "",
    distance: "",
    fuel: "",
    cost: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/fuel/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        alert(" Fuel log added!");
        setFormData({ date: "", distance: "", fuel: "", cost: "" });
        onAdd(); // Refresh list
      } else {
        alert(data.message || "Error adding log");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to server");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md mx-auto"
    >
      <h2 className="text-xl font-semibold mb-4 text-center">Add Fuel Log</h2>

      <div className="grid gap-4">
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          name="distance"
          placeholder="Distance (km)"
          value={formData.distance}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          name="fuel"
          placeholder="Fuel (litres)"
          value={formData.fuel}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          name="cost"
          placeholder="Cost (₹)"
          value={formData.cost}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
      </div>

      <button
        type="submit"
        className="mt-4 w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
      >
        Save Entry
      </button>
    </form>
  );
}