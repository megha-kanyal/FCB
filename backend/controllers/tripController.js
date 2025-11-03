import { getPool } from "../db.js";

export async function addTrip(req, res) {
  try {
    const { driver_id, bus_id, trip_date, odometer_in, odometer_out, petrol_in_litre, petrol_out_litre } = req.body;
    const pool = getPool();
    await pool.query(
      "INSERT INTO trip_log (driver_id, bus_id, trip_date, odometer_in, odometer_out, petrol_in_litre, petrol_out_litre) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [driver_id, bus_id, trip_date, odometer_in, odometer_out, petrol_in_litre, petrol_out_litre]
    );
    res.json({ message: "Trip added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add trip" });
  }
}
