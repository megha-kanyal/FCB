// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import AddBusForm from "../components/AddBusForm";
// import AddPumpForm from "../components/AddPumpForm.jsx";
// import PaymentForm from "../components/PaymentForm.jsx";

// export default function AdminDashboard() {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();
//   useEffect(() => {
//     const token = localStorage.getItem("adminToken");
//     if (!token) {
//       navigate("/admin/login");
//       return;
//     }
//     axios
//       .get("http://localhost:5000/api/admin/verify", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => setUser(res.data.user))
//       .catch(() => {
//         localStorage.removeItem("adminToken");
//         navigate("/admin/login");
//       });
//   }, [navigate]);

//   const handleBusAdded = () => {
//     console.log("Bus added — refresh list if implemented");
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold">Admin Dashboard</h1>
//       {user ? (
//         <>
//           <p className="mt-2 text-gray-700">Welcome, {user.name}</p>
//           <div className="mt-6">
//             <AddBusForm onAdd={handleBusAdded} />
//             <AddPumpForm />
//             <PaymentForm />
//           </div>
//         </>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// }




import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddBusForm from "../components/AddBusForm";
import AddPumpForm from "../components/AddPumpForm.jsx";

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [bills, setBills] = useState([]); // 🔹 Store petrol bills
  const navigate = useNavigate();

  // ✅ Verify admin authentication
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
      return;
    }

    axios
      .get("http://localhost:5000/api/admin/verify", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data.user))
      .catch(() => {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
      });
  }, [navigate]);

  // ✅ Fetch petrol pump bills
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/bill/all")
      .then((res) => setBills(res.data))
      .catch((err) => console.error("Error fetching bills:", err));
  }, []);

  const handleBusAdded = () => {
    console.log("Bus added — refresh list if implemented");
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      {user ? (
        <>
          <p className="text-gray-700 mb-6">Welcome, {user.name}</p>

          <div className="space-y-8">
            <AddBusForm onAdd={handleBusAdded} />
            <AddPumpForm />

            {/* ✅ Petrol Pump Bills Section */}
            <div className="mt-10">
              <h2 className="text-2xl font-semibold mb-4">Petrol Pump Bills</h2>

              {bills.length === 0 ? (
                <p className="text-gray-500 italic">
                  No bills uploaded yet.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {bills.map((bill) => (
                    <div
                      key={bill.bill_id}
                      className="border rounded-xl shadow-md p-4 bg-white hover:shadow-lg transition"
                    >
                      <p className="font-semibold text-lg">
                        Pump:{" "}
                        <span className="text-blue-600">
                          {bill.pump_name || "Unknown"}
                        </span>
                      </p>

                      <p className="text-gray-800 mt-1">
                        Amount:{" "}
                        <span className="font-semibold">
                          ₹{bill.total_amount}
                        </span>
                      </p>

                      <div className="mt-3">
                        <img
                          src={`http://localhost:5000/uploads/${bill.bill_photo}`}
                          alt="Bill"
                          className="w-full h-48 object-cover rounded-md border"
                        />
                      </div>

                      <p className="text-sm text-gray-600 mt-2">
                        QR Code:{" "}
                        <span className="font-mono">
                          {bill.qr_code || "N/A"}
                        </span>
                      </p>

                      <p className="text-xs text-gray-400 mt-1">
                        Uploaded on:{" "}
                        {new Date(bill.created_at).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
