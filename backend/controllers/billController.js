import path from "path";
import { getPool } from "../db.js";

// ✅ Add Bill
export const addBill = async (req, res) => {
  try {
    const pool = getPool();

    // match frontend field names
    const { petrol_pump_id, amount, qr_code } = req.body;
    const billPhoto = req.file ? req.file.filename : null;

    if (!petrol_pump_id || !amount || !billPhoto) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const query = `
      INSERT INTO bills (petrol_id, bill_photo, qr_code, total_amount)
      VALUES (?, ?, ?, ?)
    `;

    const [result] = await pool.query(query, [
      petrol_pump_id,
      billPhoto,
      qr_code || null,
      amount,
    ]);

    res.status(201).json({
      message: "Bill added successfully",
      bill_id: result.insertId,
    });
  } catch (error) {
    console.error("Error adding bill:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Get All Bills (for Admin Dashboard)
export const getAllBills = async (req, res) => {
  try {
    const pool = getPool();
    const [rows] = await pool.query(`
      SELECT 
  b.bill_id AS id,
  b.petrol_id,
  p.name AS pump_name,
  b.bill_photo,
  b.qr_code,
  b.total_amount AS amount,
  b.created_at
FROM bills b
JOIN petrol p ON b.petrol_id = p.petrol_id
ORDER BY b.created_at DESC

    `);

    res.json(rows);
  } catch (err) {
    console.error("Error fetching bills:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
