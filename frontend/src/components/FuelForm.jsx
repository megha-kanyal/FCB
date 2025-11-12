import React, { useState } from "react";
import axios from "axios";

function FuelForm() {
  const [formData, setFormData] = useState({
    bus_id: "",
    driver_id: "",
    pump_id: "",
    refill_date: "",
    litres: "",
    price_per_litre: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/fuel", formData);
      alert("Fuel refill added successfully!");
      console.log(res.data);

      setFormData({
        bus_id: "",
        driver_id: "",
        pump_id: "",
        refill_date: "",
        litres: "",
        price_per_litre: "",
      });
    } catch (error) {
      console.error("Error submitting fuel log:", error);
      alert("Error adding fuel log! Check console for details.");
    }
  };

  const totalCost =
    parseFloat(formData.litres || 0) *
    parseFloat(formData.price_per_litre || 0);

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-4 border shadow-md rounded-lg bg-white"
    >
      <h2 className="text-xl font-semibold mb-4 text-center">Add Fuel Refill</h2>

      <input
        type="text"
        name="bus_id"
        value={formData.bus_id}
        onChange={handleChange}
        placeholder="Bus ID"
        className="w-full mb-2 p-2 border rounded"
        required
      />

      <input
        type="text"
        name="driver_id"
        value={formData.driver_id}
        onChange={handleChange}
        placeholder="Driver ID"
        className="w-full mb-2 p-2 border rounded"
        required
      />

      <input
        type="text"
        name="pump_id"
        value={formData.pump_id}
        onChange={handleChange}
        placeholder="Pump ID"
        className="w-full mb-2 p-2 border rounded"
        required
      />

      <input
        type="date"
        name="refill_date"
        value={formData.refill_date}
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
        required
      />

      <input
        type="number"
        name="litres"
        value={formData.litres}
        onChange={handleChange}
        placeholder="Litres Filled"
        className="w-full mb-2 p-2 border rounded"
        required
      />

      <input
        type="number"
        name="price_per_litre"
        value={formData.price_per_litre}
        onChange={handleChange}
        placeholder="Price per Litre (₹)"
        className="w-full mb-2 p-2 border rounded"
        required
      />

      <div className="mt-2 text-right text-gray-700">
        Total Cost: <span className="font-semibold">₹{totalCost.toFixed(2)}</span>
      </div>

      <button
        type="submit"
        className="w-full p-2 bg-blue-600 text-white rounded mt-4 hover:bg-blue-700 transition"
      >
        Add Fuel Log
      </button>
    </form>
  );
}

export default FuelForm;
