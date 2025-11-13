import { useEffect, useState } from "react";

export default function TripFormData() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTrips = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");

      if (!token) {
        setError("Admin token missing. Please log in again.");
        setLoading(false);
        return;
      }

      const res = await fetch("http://localhost:5000/api/trip/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch trips");

      setTrips(data);
    } catch (err) {
      console.error("Error fetching trips:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading trip data...</p>;
  if (error) return <p className="text-center text-red-600 mt-10">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Trip Records</h2>

      {trips.length === 0 ? (
        <p className="text-gray-500">No trips recorded yet.</p>
      ) : (
        <div className="overflow-x-auto shadow rounded-lg border border-gray-200">
          <table className="min-w-full bg-white text-sm">
            <thead className="bg-green-600 text-white text-left">
              <tr>
                <th className="p-3">Trip ID</th>
                <th className="p-3">Driver ID</th>
                <th className="p-3">Bus ID</th>
                <th className="p-3">Trip Date</th>
                <th className="p-3">Trip Status</th>
                <th className="p-3">Odometer In</th>
                <th className="p-3">Odometer Out</th>
                <th className="p-3">Petrol In (L)</th>
                <th className="p-3">Petrol Out (L)</th>
              </tr>
            </thead>
            <tbody>
              {trips.map((trip) => (
                <tr
                  key={trip.trip_id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3">{trip.trip_id}</td>
                  <td className="p-3">{trip.driver_id}</td>
                  <td className="p-3">{trip.bus_id}</td>
                  <td className="p-3">{trip.trip_date}</td>
                  <td
                    className={`p-3 font-semibold ${
                      trip.trip_status === "out"
                        ? "text-blue-600"
                        : "text-green-600"
                    }`}
                  >
                    {trip.trip_status?.toUpperCase() || "-"}
                  </td>
                  <td className="p-3">
                    {trip.odometer_in || <span className="text-gray-400">—</span>}
                  </td>
                  <td className="p-3">
                    {trip.odometer_out || <span className="text-gray-400">—</span>}
                  </td>
                  <td className="p-3">
                    {trip.petrol_in_litre || <span className="text-gray-400">—</span>}
                  </td>
                  <td className="p-3">
                    {trip.petrol_out_litre || <span className="text-gray-400">—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
