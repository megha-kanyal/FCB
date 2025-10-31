// controllers/tripController.js
import { getPool } from "../db.js";

export async function addTrip(req, res) {
  try {
    const { bus_id, trip_date, odometer_in, odometer_out, petrol_in_litre, petrol_out_litre } = req.body;
    if (!bus_id || !trip_date || odometer_in == null || odometer_out == null || petrol_in_litre == null || petrol_out_litre == null) {
      return res.status(400).json({ error: "Missing fields" });
    }
    const pool = getPool();
    const [result] = await pool.query(
      `INSERT INTO trip_log (driver_id, bus_id, trip_date, odometer_in, odometer_out, petrol_in_litre, petrol_out_litre)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [req.user.id, bus_id, trip_date, odometer_in, odometer_out, petrol_in_litre, petrol_out_litre]
    );
    return res.json({ trip_id: result.insertId });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}

export async function listTripsByDriver(req, res) {
  try {
    const pool = getPool();
    const [rows] = await pool.query("SELECT * FROM trip_log WHERE driver_id = ? ORDER BY trip_date DESC", [req.user.id]);
    return res.json(rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}
