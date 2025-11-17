
import { useEffect, useState } from "react";
import axios from "axios";

export default function TripFormData() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    axios
      .get("http://localhost:5000/api/trip/all", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setTrips(res.data))
      .catch((err) => console.error("Error fetching trips:", err));
  }, []);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent mb-8">
        All Trips
      </h2>

      <div className="p-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 rounded-2xl">
        <div className="bg-white rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-yellow-50 to-orange-50">
                <tr>
                  <th className="px-4 py-4 text-left text-sm font-bold text-gray-700">Trip ID</th>
                  <th className="px-4 py-4 text-left text-sm font-bold text-gray-700">Driver</th>
                  <th className="px-4 py-4 text-left text-sm font-bold text-gray-700">Bus</th>
                  <th className="px-4 py-4 text-left text-sm font-bold text-gray-700">Odometer Out</th>
                  <th className="px-4 py-4 text-left text-sm font-bold text-gray-700">Odometer In</th>
                  <th className="px-4 py-4 text-left text-sm font-bold text-gray-700">Fuel Out</th>
                  <th className="px-4 py-4 text-left text-sm font-bold text-gray-700">Fuel In</th>
                  <th className="px-4 py-4 text-left text-sm font-bold text-gray-700">Mileage (km/l)</th>
                  <th className="px-4 py-4 text-left text-sm font-bold text-gray-700">Status</th>
                </tr>
              </thead>

              <tbody>
                {trips.map((t) => (
                  <tr key={t.trip_id} className="border-b border-gray-100 hover:bg-yellow-50 transition-colors">
                    <td className="px-4 py-3 text-gray-800">{t.trip_id}</td>
                    <td className="px-4 py-3 text-gray-800">{t.driver_id}</td>
                    <td className="px-4 py-3 text-gray-800">{t.bus_id}</td>
                    <td className="px-4 py-3 text-gray-800">{t.odometer_out}</td>
                    <td className="px-4 py-3 text-gray-800">{t.odometer_in}</td>
                    <td className="px-4 py-3 text-gray-800">{t.petrol_out_litre}</td>
                    <td className="px-4 py-3 text-gray-800">{t.petrol_in_litre}</td>
                    <td className="px-4 py-3 font-semibold text-orange-600">
                      {t.mileage ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-gray-800">{t.trip_status}</td>
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