import { useState } from "react";

export default function AddTripForm({ onAdd }) {
  const [tripType, setTripType] = useState("out"); // "out" or "return"
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

    const token = localStorage.getItem("driverToken");
    if (!token) {
      alert("Driver token missing. Please log in again.");
      return;
    }

    try {
      //Only include relevant fields based on trip type
      const data =
        tripType === "out"
          ? {
              driver_id: form.driver_id,
              bus_id: form.bus_id,
              odometer_in: form.odometer_in,
              petrol_in_litre: form.petrol_in_litre,
              trip_status: "out",
            }
          : {
              driver_id: form.driver_id,
              bus_id: form.bus_id,
              odometer_out: form.odometer_out,
              petrol_out_litre: form.petrol_out_litre,
              trip_status: "return",
            };

      data.trip_date = new Date().toISOString().split("T")[0];

      const res = await fetch("http://localhost:5000/api/trip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Failed to add trip");

      alert(
        tripType === "out"
          ? "Trip started successfully!"
          : "Trip ended successfully!"
      );

      // Reset form
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
      <h2 className="text-xl font-semibold mb-2">
        {tripType === "out" ? "Start Trip" : "End Trip"}
      </h2>

      {/* Trip Type Switch */}
      <div className="flex items-center gap-3 mb-2">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="tripType"
            value="out"
            checked={tripType === "out"}
            onChange={() => setTripType("out")}
          />
          Out Trip
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="tripType"
            value="return"
            checked={tripType === "return"}
            onChange={() => setTripType("return")}
          />
          Return Trip
        </label>
      </div>

      {/* Common fields */}
      <input
        type="text"
        name="driver_id"
        placeholder="Driver ID"
        className="border p-2 w-full rounded"
        value={form.driver_id}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="bus_id"
        placeholder="Bus ID"
        className="border p-2 w-full rounded"
        value={form.bus_id}
        onChange={handleChange}
        required
      />

      {/* Conditional fields */}
      {tripType === "out" ? (
        <>
          <input
            type="number"
            name="odometer_in"
            placeholder="Odometer In"
            className="border p-2 w-full rounded"
            value={form.odometer_in}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="petrol_in_litre"
            placeholder="Petrol In (litres)"
            className="border p-2 w-full rounded"
            value={form.petrol_in_litre}
            onChange={handleChange}
            required
          />
        </>
      ) : (
        <>
          <input
            type="number"
            name="odometer_out"
            placeholder="Odometer Out"
            className="border p-2 w-full rounded"
            value={form.odometer_out}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="petrol_out_litre"
            placeholder="Petrol Out (litres)"
            className="border p-2 w-full rounded"
            value={form.petrol_out_litre}
            onChange={handleChange}
            required
          />
        </>
      )}

      <button className="bg-green-600 text-white px-4 py-2 rounded w-full">
        {tripType === "out" ? "Start Trip" : "End Trip"}
      </button>
    </form>
  );
}
