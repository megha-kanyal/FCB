// // src/pages/DriverDashboard.jsx
// import { useEffect, useState } from "react";
// import AddTripForm from "../components/AddTripForm";
// import FuelForm from "../components/FuelForm";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// export default function DriverDashboard() {
//   const [driver, setDriver] = useState(null);
//   const navigate = useNavigate();
//   useEffect(() => {
//     const token = localStorage.getItem("driverToken");
//     if (!token) {
//       navigate("/driver-login");
//       return;
//     }
//     axios
//       .get("http://localhost:5173/api/driver/verify", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => setDriver(res.data.driver))
//       .catch(() => {
//         localStorage.removeItem("driverToken");
//         navigate("/driver-login");
//       });
//   }, [navigate]);
//   return (
//     <div className="p-6">
//       <div className="p-10">
//        <h1 className="text-3xl font-bold mb-6">Driver Dashboard</h1>
//       <AddTripForm />
//      </div>
//     </div>
//   );
// }
// src/pages/DriverDashboard.jsx
import { useEffect, useState } from "react";
import AddTripForm from "../components/AddTripForm";
import FuelForm from "../components/FuelForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function DriverDashboard() {
  const [driver, setDriver] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("driverToken");
    if (!token) {
      navigate("/driver-login");
      return;
    }
    axios
      .get("http://localhost:5173/api/driver/verify", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setDriver(res.data.driver))
      .catch(() => {
        localStorage.removeItem("driverToken");
        navigate("/driver-login");
      });
  }, [navigate]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-50 p-6">
      <div className="p-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent mb-6">
          Driver Dashboard
        </h1>
        <AddTripForm />
      </div>
    </div>
  );
}