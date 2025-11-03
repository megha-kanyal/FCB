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

      alert(" Bus added successfully!");
      setForm({ plate_no: "", model_no: "", capacity: "" });
      if (onAdd) onAdd();
    } catch (err) {
      console.error(err);
      alert(`${err.message}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 shadow rounded-lg w-full max-w-md space-y-3"
    >
      <h2 className="text-xl font-semibold mb-2">Add New Bus</h2>

      <input
        type="text"
        name="plate_no"
        placeholder="Plate No"
        className="border p-2 w-full rounded"
        value={form.plate_no}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="model_no"
        placeholder="Model No"
        className="border p-2 w-full rounded"
        value={form.model_no}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="capacity"
        placeholder="Capacity"
        className="border p-2 w-full rounded"
        value={form.capacity}
        onChange={handleChange}
        required
      />

      <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
        Add Bus
      </button>
    </form>
  );
}