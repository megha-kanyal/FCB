import { useState } from "react";

export default function AddTripForm() {
  const [form, setForm] = useState({
    driver_id: "",
    bus_id: "",
    odometer_in: "",
    odometer_out: "",
    petrol_in_litre: "",
    petrol_out_litre: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...form, trip_date: new Date().toISOString().split("T")[0] };
    const res = await fetch("http://localhost:5000/api/trip/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    alert(result.message);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 shadow rounded-lg w-full max-w-md space-y-3"
    >
      <h2 className="text-xl font-semibold mb-2">Add Trip</h2>
      {["driver_id", "bus_id", "odometer_in", "odometer_out", "petrol_in_litre", "petrol_out_litre"].map((field) => (
        <input
          key={field}
          type="number"
          name={field}
          placeholder={field.replace("_", " ")}
          className="border p-2 w-full rounded"
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
