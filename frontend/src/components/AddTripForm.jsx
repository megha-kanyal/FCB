
import { useState } from "react";

export default function AddTripForm({ onAdd }) {
  const [tripType, setTripType] = useState("out"); // out or return
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

    // Build correct data per trip type
    const data =
      tripType === "out"
        ? {
            driver_id: form.driver_id,
            bus_id: form.bus_id,
            odometer_out: form.odometer_out,
            petrol_out_litre: form.petrol_out_litre,
            trip_status: "out",
          }
        : {
            driver_id: form.driver_id,
            bus_id: form.bus_id,
            odometer_in: form.odometer_in,
            petrol_in_litre: form.petrol_in_litre,
            trip_status: "return",
          };

    data.trip_date = new Date().toISOString().split("T")[0];

    const res = await fetch("http://localhost:5000/api/trip/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (!res.ok) {
      alert(result.error || "Failed to add trip");
      return;
    }

    alert(result.message);

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
  };

  return (
    <div className="max-w-2xl mx-auto p-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 rounded-2xl">
      <div className="bg-white rounded-2xl p-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent mb-8">
          {tripType === "out" ? "Start Trip" : "End Trip"}
        </h2>

        <div className="space-y-6">
          {/* Switch */}
          <div className="flex items-center gap-6 mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="tripType"
                value="out"
                checked={tripType === "out"}
                onChange={() => setTripType("out")}
                className="w-4 h-4 text-yellow-500 focus:ring-yellow-400"
              />
              <span className="text-gray-700 font-medium">Out Trip</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="tripType"
                value="return"
                checked={tripType === "return"}
                onChange={() => setTripType("return")}
                className="w-4 h-4 text-yellow-500 focus:ring-yellow-400"
              />
              <span className="text-gray-700 font-medium">Return Trip</span>
            </label>
          </div>

          {/* Common fields */}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Driver ID
            </label>
            <input
              type="text"
              name="driver_id"
              placeholder="Enter driver ID"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none transition-colors text-gray-800"
              value={form.driver_id}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Bus ID
            </label>
            <input
              type="text"
              name="bus_id"
              placeholder="Enter bus ID"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none transition-colors text-gray-800"
              value={form.bus_id}
              onChange={handleChange}
              required
            />
          </div>

          {/* Conditional fields */}
          {tripType === "out" ? (
            <>
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Odometer Out
                </label>
                <input
                  type="number"
                  name="odometer_out"
                  placeholder="Enter odometer reading"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none transition-colors text-gray-800"
                  value={form.odometer_out}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Petrol Out (litres)
                </label>
                <input
                  type="number"
                  name="petrol_out_litre"
                  placeholder="Enter petrol amount"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none transition-colors text-gray-800"
                  value={form.petrol_out_litre}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Odometer In
                </label>
                <input
                  type="number"
                  name="odometer_in"
                  placeholder="Enter odometer reading"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none transition-colors text-gray-800"
                  value={form.odometer_in}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Petrol In (litres)
                </label>
                <input
                  type="number"
                  name="petrol_in_litre"
                  placeholder="Enter petrol amount"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none transition-colors text-gray-800"
                  value={form.petrol_in_litre}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-bold px-6 py-4 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            {tripType === "out" ? "Start Trip" : "End Trip"}
          </button>
        </div>
      </div>
    </div>
  );
}