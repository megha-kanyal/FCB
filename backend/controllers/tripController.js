import { getPool } from "../db.js";

export async function addTrip(req, res) {
  try {
    const {
      driver_id,
      bus_id,
      trip_date,
      odometer_in,
      odometer_out,
      petrol_in_litre,
      petrol_out_litre,
      trip_status,
    } = req.body;

    const pool = getPool();

    // Normalize status to lowercase
    const status = trip_status?.toLowerCase();

    // 1️ Find the last active OUT trip (case-insensitive)
    const [activeTrips] = await pool.query(
      `SELECT * FROM trip_log 
       WHERE bus_id = ? AND LOWER(trip_status) = 'out' 
       ORDER BY trip_id DESC LIMIT 1`,
      [bus_id]
    );

    //  Start a new trip
    if (status === "out") {
      if (activeTrips.length > 0) {
        return res
          .status(400)
          .json({ error: "This bus already has an active OUT trip. Please return it first." });
      }

      await pool.query(
        `INSERT INTO trip_log 
        (driver_id, bus_id, trip_date, odometer_in, odometer_out, petrol_in_litre, petrol_out_litre, trip_status)
        VALUES (?, ?, ?, NULL, ?, NULL, ?, 'out')`,
        [driver_id, bus_id, trip_date, odometer_out, petrol_out_litre]
      );

      return res.json({ message: "Trip started successfully." });
    }

    // 3️⃣ End trip (RETURN) — update last OUT trip
    if (status === "return") {
      if (activeTrips.length === 0) {
        return res.status(400).json({ error: "No active OUT trip found for this bus." });
      }

      const lastTrip = activeTrips[0];

      const [updateResult] = await pool.query(
        `UPDATE trip_log 
         SET odometer_in = ?, petrol_in_litre = ?, trip_status = 'return', trip_date = ?
         WHERE trip_id = ?`,
        [odometer_in, petrol_in_litre, trip_date, lastTrip.trip_id]
      );

      if (updateResult.affectedRows === 0) {
        return res.status(500).json({ error: "Failed to merge RETURN trip with existing OUT trip." });
      }

      return res.json({ message: "Trip completed and merged successfully." });
    }

    res.status(400).json({ error: "Invalid trip status." });
  } catch (err) {
    console.error("Error adding trip:", err);
    res.status(500).json({ error: "Internal server error." });
  }
}
export async function getAllTrips(req, res) {
  try {
    const pool = getPool();
    const [rows] = await pool.query("SELECT * FROM trip_log");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching trips:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
