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
import Navbar from "../components/Navbar.jsx";

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
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


  const handleBusAdded = () => {
    console.log("Bus added — refresh list if implemented");
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      {user ? (
        <>
          <p className="text-gray-700 mb-6">Welcome, {user.name}</p>
          <Navbar />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
