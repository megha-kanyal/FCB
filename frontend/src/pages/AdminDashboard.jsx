import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddBusForm from "../components/AddBusForm";

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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

  const handleBusAdded = () => {
    console.log("Bus added — refresh list if implemented");
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      {user ? (
        <>
          <p className="mt-2 text-gray-700">Welcome, {user.name}</p>
          <div className="mt-6">
            <AddBusForm onAdd={handleBusAdded} />
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
