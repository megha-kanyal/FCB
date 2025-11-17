
import { useEffect, useState } from "react";

export default function RegisteredPetrolPumps() {
  const [pumps, setPumps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPumps = async () => {
    setLoading(true);
    setError("");

    const token = localStorage.getItem("adminToken");
    if (!token) {
      setError("Admin token missing. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/pumps/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Handle raw response text in case backend sends HTML by mistake
      const text = await res.text();
      try {
        const data = JSON.parse(text);
        if (!res.ok) throw new Error(data.message || "Failed to fetch pumps");
        setPumps(data);
      } catch (jsonErr) {
        console.error("Invalid JSON:", text);
        throw new Error("Server returned invalid response (not JSON)");
      }
    } catch (err) {
      console.error("Error fetching pumps:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPumps();
  }, []);

  if (loading)
    return (
      <p className="text-center text-gray-600 mt-6 text-lg">
        Loading petrol pumps...
      </p>
    );

  if (error)
    return (
      <p className="text-center text-red-600 mt-6 font-semibold">{error}</p>
    );

  if (pumps.length === 0)
    return (
      <p className="text-center text-gray-500 mt-6">
        No petrol pumps registered yet.
      </p>
    );

  return (
    <div className="mt-10 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent mb-8">
        Registered Petrol Pumps
      </h2>

      <div className="p-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 rounded-2xl">
        <div className="bg-white rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-yellow-50 to-orange-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                    Pump ID
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                    Pump Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                    Location
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                    Created At
                  </th>
                </tr>
              </thead>

              <tbody>
                {pumps.map((pump) => (
                  <tr key={pump.pump_id} className="border-b border-gray-100 hover:bg-yellow-50 transition-colors">
                    <td className="px-6 py-4 text-gray-800">{pump.pump_id}</td>
                    <td className="px-6 py-4 font-semibold text-gray-900">{pump.pump_name}</td>
                    <td className="px-6 py-4 text-gray-800">{pump.location || "—"}</td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(pump.created_at).toLocaleString()}
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