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
      <p className="text-center text-gray-600 mt-6">
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
    <div className="mt-10">
      <h2 className="text-2xl font-semibold mb-4">Registered Petrol Pumps</h2>

      <div className="overflow-x-auto shadow rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Pump ID
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Pump Name
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Location
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                Created At
              </th>
            </tr>
          </thead>

          <tbody>
            {pumps.map((pump) => (
              <tr key={pump.pump_id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{pump.pump_id}</td>
                <td className="px-4 py-2 font-medium">{pump.pump_name}</td>
                <td className="px-4 py-2">{pump.location || "—"}</td>
                <td className="px-4 py-2 text-gray-500">
                  {new Date(pump.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
