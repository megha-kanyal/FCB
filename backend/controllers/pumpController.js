// controllers/pumpController.js
import { getPool } from "../db.js";

// ADD PETROL PUMP
export async function addPump(req, res) {
  try {
    const { pump_name, location } = req.body;

    if (!pump_name || pump_name.trim() === "") {
      return res.status(400).json({ message: "Pump name is required" });
    }

    const pool = getPool();
    const [result] = await pool.query(
      "INSERT INTO petrol_pump (pump_name, location) VALUES (?, ?)",
      [pump_name, location || null]
    );

    return res.status(201).json({
      message: "Petrol pump added successfully",
      pump_id: result.insertId,
    });
  } catch (err) {
    console.error("Error adding pump:", err);
    return res.status(500).json({ message: "Server error" });
  }
}

// GET ALL PETROL PUMPS
export async function getAllPumps(req, res) {
  try {
    const pool = getPool();
    const [rows] = await pool.query(
      "SELECT pump_id, pump_name, location, created_at FROM petrol_pump ORDER BY created_at DESC"
    );
    return res.json(rows);
  } catch (err) {
    console.error("Error fetching pumps:", err);
    return res.status(500).json({ message: "Server error" });
  }
}
