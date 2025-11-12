import { useState } from "react";
import axios from "axios";

const AddBill = () => {
  const [amount, setAmount] = useState("");
  const [billPhoto, setBillPhoto] = useState(null);
  const [qrCode, setQrCode] = useState("");
  const [petrolPumpId, setPetrolPumpId] = useState(1); // replace with actual logged-in pump ID

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || !billPhoto) {
      alert("Please enter all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("petrol_pump_id", petrolPumpId);
    formData.append("amount", amount);
    formData.append("qr_code", qrCode);
    formData.append("billPhoto", billPhoto);

    try {
      const res = await axios.post("http://localhost:5000/api/bill/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 201) {
        alert("✅ Bill uploaded successfully!");
        setAmount("");
        setBillPhoto(null);
        setQrCode("");
      }
    } catch (err) {
      console.error("Error uploading bill:", err);
      alert("❌ Failed to upload bill. Check console for details.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 border rounded-lg max-w-sm mx-auto mt-10 bg-white shadow-md"
    >
      <h2 className="text-xl font-bold mb-4 text-center">Add Bill</h2>

      <label className="block mb-2 text-sm font-semibold">Total Amount (₹)</label>
      <input
        type="number"
        placeholder="Enter total amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 w-full mb-4 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        required
      />

      <label className="block mb-2 text-sm font-semibold">Upload Bill Photo</label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setBillPhoto(e.target.files[0])}
        className="border p-2 w-full mb-4 rounded-md"
        required
      />

      <label className="block mb-2 text-sm font-semibold">QR Code</label>
      <input
        type="text"
        placeholder="Enter QR code if available"
        value={qrCode}
        onChange={(e) => setQrCode(e.target.value)}
        className="border p-2 w-full mb-4 rounded-md"
      />

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full transition"
      >
        Upload Bill
      </button>
    </form>
  );
};

export default AddBill;
