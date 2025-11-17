
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function PetrolPumpBills() {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/bill/all")
      .then((res) => setBills(res.data))
      .catch((err) => console.error("Error fetching bills:", err));
  }, []);

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold text-yellow-400 mb-6">Petrol Pump Bills</h2>

      {bills.length === 0 ? (
        <p className="text-gray-400 italic">No bills uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {bills.map((bill) => (
            <div
              key={bill.id}  
              className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 rounded-lg shadow-lg p-5 hover:border-yellow-500/50 transition-all"
            >
              <p className="font-semibold text-lg">
                Pump:{" "}
                <span className="text-orange-400">
                  {bill.pump_name} 
                </span>
              </p>

              <p className="mt-2">
                Amount:{" "}
                <span className="font-semibold">
                  ₹{bill.amount}   
                </span>
              </p>

              <div className="mt-4">
                <img
                  src={`http://localhost:5000/uploads/${bill.bill_photo}`}
                  alt="Bill"
                  className="w-full h-48 object-cover rounded-md border border-amber-700"
                />
              </div>

              <p className="text-sm mt-3">
                  UPI id:{" "}
                <span className="font-mono">{bill.qr_code || "N/A"}</span>
              </p>

              <p className="text-xs mt-2">
                Uploaded on: {new Date(bill.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
