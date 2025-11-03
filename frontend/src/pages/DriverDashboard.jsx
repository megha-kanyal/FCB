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
    <div className="p-6">
      <div className="p-10">
       <h1 className="text-3xl font-bold mb-6">Driver Dashboard</h1>
      <AddTripForm />
      <FuelForm/>
     </div>
    </div>
  );
}
