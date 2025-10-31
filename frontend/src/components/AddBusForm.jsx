// import { useState } from "react";

// export default function AddBusForm({ onAdd }) {
//   const [form, setForm] = useState({
//     plate_no: "",
//     model_no: "",
//     capacity: "",
//   });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const token = localStorage.getItem("adminToken");
//     if (!token) {
//       alert("Admin token missing. Please log in again.");
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await fetch("http://localhost:5000/api/bus/add", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           plate_no: form.plate_no.trim(),
//           model_no: form.model_no.trim(),
//           capacity: parseInt(form.capacity, 10),
//         }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Failed to add bus");

//       alert("✅ Bus added successfully!");
//       setForm({ plate_no: "", model_no: "", capacity: "" });
//       if (onAdd) onAdd();
//     } catch (err) {
//       console.error(err);
//       alert(`❌ ${err.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="bg-white p-6 shadow rounded-lg w-full max-w-md space-y-4"
//     >
//       <h2 className="text-2xl font-semibold text-gray-800 mb-3">
//         Add New Bus
//       </h2>

//       <div>
//         <label className="block text-sm font-medium text-gray-600 mb-1">
//           Plate Number
//         </label>
//         <input
//           type="text"
//           name="plate_no"
//           placeholder="e.g. UK07AB1234"
//           className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           value={form.plate_no}
//           onChange={handleChange}
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-600 mb-1">
//           Model Number
//         </label>
//         <input
//           type="text"
//           name="model_no"
//           placeholder="e.g. Volvo XZ"
//           className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           value={form.model_no}
//           onChange={handleChange}
//           required
//         />
//       </div>

//       <div>
//         <label className="block text-sm font-medium text-gray-600 mb-1">
//           Capacity
//         </label>
//         <input
//           type="number"
//           name="capacity"
//           placeholder="e.g. 45"
//           className="border p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           value={form.capacity}
//           onChange={handleChange}
//           required
//         />
//       </div>

//       <button
//         type="submit"
//         disabled={loading}
//         className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 disabled:opacity-50"
//       >
//         {loading ? "Adding..." : "Add Bus"}
//       </button>
//     </form>
//   );
// }


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

      alert("✅ Bus added successfully!");
      setForm({ plate_no: "", model_no: "", capacity: "" });
      if (onAdd) onAdd();
    } catch (err) {
      console.error(err);
      alert(`❌ ${err.message}`);
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
