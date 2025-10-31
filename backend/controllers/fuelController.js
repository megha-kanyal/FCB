// controllers/fuelController.js
import { getPool } from "../db.js";

export async function addRefill(req, res) {
  try {
    const { bus_id, pump_id, refill_date, litres, price_per_litre } = req.body;
    if (!bus_id || !pump_id || !refill_date || litres == null || price_per_litre == null) {
      return res.status(400).json({ error: "Missing fields" });
    }
    const pool = getPool();
    const [result] = await pool.query(
      `INSERT INTO fuel_refill (driver_id, bus_id, pump_id, refill_date, litres, price_per_litre) VALUES (?, ?, ?, ?, ?, ?)`,
      [req.user.id, bus_id, pump_id, refill_date, litres, price_per_litre]
    );
    return res.json({ refill_id: result.insertId });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}

export async function listRefills(req, res) {
  try {
    // admin can query all; driver can query own (handled in route)
    const { month_year } = req.query; // optional
    const pool = getPool();
    let q = `SELECT fr.*, p.pump_name, d.name AS driver_name, b.plate_no FROM fuel_refill fr
             JOIN petrol_pump p ON fr.pump_id = p.pump_id
             JOIN driver d ON fr.driver_id = d.driver_id
             JOIN bus b ON fr.bus_id = b.bus_id`;
    const params = [];
    if (month_year) {
      q += " WHERE DATE_FORMAT(fr.refill_date, '%Y-%m') = ?";
      params.push(month_year);
    }
    q += " ORDER BY fr.refill_date DESC";
    const [rows] = await pool.query(q, params);
    return res.json(rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}
