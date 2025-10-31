import React, { useState } from "react";
import axios from "axios";

function FuelForm() {
  const [formData, setFormData] = useState({
    bus_id: "",
    driver_id: "",
    date: "",
    odometer: "",
    liters_filled: "",
    price_per_liter: "",
    fuel_station: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Auto-calculate total cost
    const total_cost =
      parseFloat(formData.liters_filled || 0) *
      parseFloat(formData.price_per_liter || 0);

    const dataToSend = {
      ...formData,
      total_cost,
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/fuel",
        dataToSend
      );
      alert(" Fuel log added successfully!");
      console.log(res.data);

      // Reset the form
      setFormData({
        bus_id: "",
        driver_id: "",
        date: "",
        odometer: "",
        liters_filled: "",
        price_per_liter: "",
        fuel_station: "",
      });
    } catch (error) {
      console.error(" Error submitting form:", error);
      alert("Error adding fuel log! Check console for details.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-4 border shadow-md rounded-lg bg-white"
    >
      <h2 className="text-xl font-semibold mb-4 text-center">Add Fuel Log</h2>

      <input type="text" name="bus_id" value={formData.bus_id} onChange={handleChange} placeholder="Bus ID" className="w-full mb-2 p-2 border rounded"required/>

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
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
        required
      />

      <input
        type="number"
        name="odometer"
        value={formData.odometer}
        onChange={handleChange}
        placeholder="Odometer Reading"
        className="w-full mb-2 p-2 border rounded"
        required
      />

      <input
        type="number"
        name="liters_filled"
        value={formData.liters_filled}
        onChange={handleChange}
        placeholder="Liters Filled"
        className="w-full mb-2 p-2 border rounded"
        required
      />

      <input
        type="number"
        name="price_per_liter"
        value={formData.price_per_liter}
        onChange={handleChange}
        placeholder="Price per Liter (₹)"
        className="w-full mb-2 p-2 border rounded"
        required
      />

      <input
        type="text"
        name="fuel_station"
        value={formData.fuel_station}
        onChange={handleChange}
        placeholder="Fuel Station"
        className="w-full mb-2 p-2 border rounded"
        required
      />

      {/* Show calculated total cost */}
      <div className="mt-2 text-right text-gray-700">
        Total Cost:{" "}
        <span className="font-semibold">
          ₹
          {formData.liters_filled && formData.price_per_liter
            ? (
                parseFloat(formData.liters_filled) *
                parseFloat(formData.price_per_liter)
              ).toFixed(2)
            : "0.00"}
        </span>
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