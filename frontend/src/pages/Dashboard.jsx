import { useEffect, useState } from "react";
import FuelForm from "../components/FuelForm";

export default function Dashboard() {
  const [logs, setLogs] = useState([]);

  const fetchLogs = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/fuel/all");
      const data = await res.json();
      setLogs(data);
    } catch (err) {
      console.error("Error fetching logs:", err);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="p-6">
      <FuelForm onAdd={fetchLogs} />

      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-3 text-center">
          Fuel Logs Summary
        </h2>

        <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Distance (km)</th>
              <th className="p-2 border">Fuel (L)</th>
              <th className="p-2 border">Cost (₹)</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="text-center">
                <td className="border p-2">{log.date.slice(0, 10)}</td>
                <td className="border p-2">{log.distance}</td>
                <td className="border p-2">{log.fuel}</td>
                <td className="border p-2">{log.cost}</td>
              </tr>
            ))}
            {logs.length === 0 && (
              <tr>
                <td colSpan="4" className="p-4 text-gray-500 text-center">
                  No records yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}