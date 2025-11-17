import { useState } from "react";

const AddBill = () => {
  const [amount, setAmount] = useState("");
  const [billPhoto, setBillPhoto] = useState(null);
  const [qrCode, setQrCode] = useState("");
  const petrolId = localStorage.getItem("petrolId");
  const petrolPumpId = petrolId;


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || !billPhoto) {
      alert("Please enter all required fields.");
      return;
    }

    if (!petrolPumpId) {
      alert("Error: Petrol Pump not logged in.");
      return;
    }

    const formData = new FormData();
    formData.append("petrol_pump_id", petrolPumpId);
    formData.append("amount", amount);
    formData.append("qr_code", qrCode);
    formData.append("billPhoto", billPhoto);

    try {
      const res = await fetch("http://localhost:5000/api/bill/add", {
        method: "POST",
        body: formData,
      });

      if (res.status === 201) {
        alert("Bill uploaded successfully!");
        setAmount("");
        setBillPhoto(null);
        setQrCode("");
      }
    } catch (err) {
      console.error("Error uploading bill:", err);
      alert("Failed to upload bill. Check console for details.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 rounded-2xl">
      <div className="bg-white rounded-2xl p-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent mb-8">
          Add Bill
        </h2>

        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Total Amount (₹)
            </label>
            <input
              type="number"
              placeholder="Enter total amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none transition-colors text-gray-800"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Upload Bill Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setBillPhoto(e.target.files[0])}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none transition-colors text-gray-800"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              QR Code
            </label>
            <input
              type="text"
              placeholder="Enter QR code if available"
              value={qrCode}
              onChange={(e) => setQrCode(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-yellow-400 focus:outline-none transition-colors text-gray-800"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-bold px-6 py-4 rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            Upload Bill
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBill;
