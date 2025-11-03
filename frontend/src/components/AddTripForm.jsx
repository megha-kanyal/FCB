import { useState } from "react";

export default function AddTripForm({ onAdd }) {
  const [form, setForm] = useState({
    driver_id: "",
    bus_id: "",
    odometer_in: "",
    odometer_out: "",
    petrol_in_litre: "",
    petrol_out_litre: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Get token from localStorage
    const token = localStorage.getItem("driverToken");
    if (!token) {
      alert("Driver token missing. Please log in again.");
      return;
    }

    try {
      const data = {
        ...form,
        trip_date: new Date().toISOString().split("T")[0],
      };

      const res = await fetch("http://localhost:5000/api/trip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ include the token here
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.error || "Failed to add trip");

      alert("Trip added successfully!");
      setForm({
        driver_id: "",
        bus_id: "",
        odometer_in: "",
        odometer_out: "",
        petrol_in_litre: "",
        petrol_out_litre: "",
      });
      if (onAdd) onAdd();
    } catch (err) {
      console.error(err);
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 shadow rounded-lg w-full max-w-md space-y-3"
    >
      <h2 className="text-xl font-semibold mb-2">Add Trip</h2>

      {[
        "driver_id",
        "bus_id",
        "odometer_in",
        "odometer_out",
        "petrol_in_litre",
        "petrol_out_litre",
      ].map((field) => (
        <input
          key={field}
          type="number"
          name={field}
          placeholder={field.replace("_", " ")}
          className="border p-2 w-full rounded"
          value={form[field]}
          onChange={handleChange}
          required
        />
      ))}

      <button className="bg-green-600 text-white px-4 py-2 rounded w-full">
        Submit Trip
      </button>
    </form>
  );
}
