import { useEffect, useState } from "react";

export default function RegisteredBuses() {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBuses = async () => {
    setLoading(true);
    setError("");

    const token = localStorage.getItem("adminToken");
    if (!token) {
      setError("Admin token missing. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/bus/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch buses");

      setBuses(data);
    } catch (err) {
      console.error("Error fetching buses:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBuses();
  }, []);

  if (loading)
    return <p className="text-center text-gray-600 mt-6">Loading buses...</p>;

  if (error)
    return (
      <p className="text-center text-red-600 mt-6 font-semibold">
        {error}
      </p>
    );

  if (buses.length === 0)
    return (
      <p className="text-center text-gray-500 mt-6">
        No buses registered yet.
      </p>
    );

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold mb-4">Registered Buses</h2>

      <div className="overflow-x-auto shadow rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Bus ID</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Plate No</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Model No</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Capacity</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Added By</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Created At</th>
            </tr>
          </thead>

          <tbody>
            {buses.map((bus) => (
              <tr key={bus.bus_id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{bus.bus_id}</td>
                <td className="px-4 py-2 font-medium">{bus.plate_no}</td>
                <td className="px-4 py-2">{bus.model_no}</td>
                <td className="px-4 py-2">{bus.capacity}</td>
                <td className="px-4 py-2">{bus.added_by_name || "Unknown"}</td>
                <td className="px-4 py-2 text-gray-500">
                  {new Date(bus.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
