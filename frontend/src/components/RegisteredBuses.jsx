
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
    <div className="mt-10 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent mb-8">
        Registered Buses
      </h2>

      <div className="p-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 rounded-2xl">
        <div className="bg-white rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-yellow-50 to-orange-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Bus ID</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Plate No</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Model No</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Capacity</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Added By</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Created At</th>
                </tr>
              </thead>

              <tbody>
                {buses.map((bus) => (
                  <tr key={bus.bus_id} className="border-b border-gray-100 hover:bg-yellow-50 transition-colors">
                    <td className="px-6 py-4 text-gray-800">{bus.bus_id}</td>
                    <td className="px-6 py-4 font-semibold text-gray-900">{bus.plate_no}</td>
                    <td className="px-6 py-4 text-gray-800">{bus.model_no}</td>
                    <td className="px-6 py-4 text-gray-800">{bus.capacity}</td>
                    <td className="px-6 py-4 text-gray-800">{bus.added_by_name || "Unknown"}</td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(bus.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}