import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddBill from "../components/AddBill";

export default function PetrolDashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("petrolToken");
    if (!token) {
      navigate("/petrol/login");
      return;
    }
    axios
      .get("http://localhost:5000/api/petrol/verify", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data.user))
      .catch(() => {
        localStorage.removeItem("petrolToken");
        navigate("/petrol/login");
      });
  }, [navigate]);

  const handleBusAdded = () => {
    console.log("Bus added — refresh list if implemented");
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Petrol Dashboard</h1>
      {user ? (
        <>
          <p className="mt-2 text-gray-700">Welcome, {user.name}</p>
          <div className="mt-6">
            <AddBill />
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}