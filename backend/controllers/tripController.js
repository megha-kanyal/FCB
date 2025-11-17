// import { getPool } from "../db.js";

// export async function addTrip(req, res) {
//   try {
//     const {
//       driver_id,
//       bus_id,
//       trip_date,
//       odometer_in,
//       odometer_out,
//       petrol_in_litre,
//       petrol_out_litre,
//       trip_status,
//     } = req.body;

//     const pool = getPool();
//     const status = trip_status?.toLowerCase();

//     // 🔎 Find last OUT trip for this bus
//     const [activeTrips] = await pool.query(
//       `SELECT * FROM trip_log 
//        WHERE bus_id = ? AND trip_status = 'out'
//        ORDER BY trip_id DESC LIMIT 1`,
//       [bus_id]
//     );

//     // -----------------------------------------------
//     // 🚍 OUT TRIP  => INSERT NEW ROW
//     // -----------------------------------------------
//     if (status === "out") {
//       if (activeTrips.length > 0) {
//         return res.status(400).json({
//           error: "This bus already has an active OUT trip.",
//         });
//       }

//       await pool.query(
//         `INSERT INTO trip_log 
//         (driver_id, bus_id, trip_date, odometer_out, petrol_out_litre, 
//          odometer_in, petrol_in_litre, mileage, trip_status)
//         VALUES (?, ?, ?, ?, ?, NULL, NULL, NULL, 'out')`,
//         [driver_id, bus_id, trip_date, odometer_out, petrol_out_litre]
//       );

//       return res.json({ message: "Trip started successfully." });
//     }

//     // -----------------------------------------------
//     // 🔙 RETURN TRIP  => UPDATE EXISTING ROW
//     // -----------------------------------------------
//     if (status === "return") {
//       if (activeTrips.length === 0) {
//         return res.status(400).json({
//           error: "No active OUT trip found for this bus.",
//         });
//       }

//       const lastTrip = activeTrips[0];

//       //  Validation
//       if (odometer_in < lastTrip.odometer_out) {
//         return res.status(400).json({
//           error: "Odometer IN cannot be less than Odometer OUT.",
//         });
//       }

//       if (petrol_in_litre > lastTrip.petrol_out_litre) {
//         return res.status(400).json({
//           error: "Petrol IN cannot be greater than Petrol OUT.",
//         });
//       }

//       // -------------------------------------------
//       //  Mileage Calculation
//       // -------------------------------------------
//       const distance = Number(odometer_in) - Number(lastTrip.odometer_out);
//       const fuelUsed =
//         Number(lastTrip.petrol_out_litre) - Number(petrol_in_litre);

//       let mileage = null;

//       if (fuelUsed > 0 && distance > 0) {
//         mileage = parseFloat((distance / fuelUsed).toFixed(2));
//       }

//       // -------------------------------------------
//       // 🔄 Update existing trip
//       // -------------------------------------------
//       await pool.query(
//         `UPDATE trip_log
//          SET odometer_in = ?, 
//              petrol_in_litre = ?, 
//              mileage = ?, 
//              trip_status = 'return',
//              trip_date = ?
//          WHERE trip_id = ?`,
//         [odometer_in, petrol_in_litre, mileage, trip_date, lastTrip.trip_id]
//       );

//       return res.json({
//         message: "Trip completed successfully.",
//         mileage,
//       });
//     }

//     return res.status(400).json({ error: "Invalid trip status." });
//   } catch (err) {
//     console.error("Error adding trip:", err);
//     res.status(500).json({ error: "Internal server error." });
//   }
// }

// export async function getAllTrips(req, res) {
//   try {
//     const pool = getPool();
//     const [rows] = await pool.query(
//       "SELECT * FROM trip_log ORDER BY trip_id DESC"
//     );
//     res.json(rows);
//   } catch (err) {
//     console.error("Error fetching trips:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }
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

    if (!driver_id || !bus_id || !trip_date || !trip_status) {
      return res.status(400).json({
        error: "Missing required fields.",
      });
    }

    const pool = getPool();
    const status = trip_status.toLowerCase();

    if (!["out", "return"].includes(status)) {
      return res.status(400).json({ error: "Invalid trip status." });
    }

    // Fetch last OUT trip
    const [activeTrips] = await pool.query(
      `
        SELECT * FROM trip_log
        WHERE bus_id = ? AND trip_status = 'out'
        ORDER BY trip_id DESC
        LIMIT 1
      `,
      [bus_id]
    );

    // ------------------------------------------------
    // OUT trip → insert
    // ------------------------------------------------
    if (status === "out") {
      if (activeTrips.length > 0) {
        return res.status(400).json({
          error: "This bus already has an active OUT trip.",
        });
      }

      await pool.query(
        `
          INSERT INTO trip_log 
          (driver_id, bus_id, trip_date, odometer_out, petrol_out_litre, trip_status)
          VALUES (?, ?, ?, ?, ?, 'out')
        `,
        [driver_id, bus_id, trip_date, odometer_out, petrol_out_litre]
      );

      return res.json({ message: "Trip started successfully." });
    }

    // ------------------------------------------------
    // RETURN trip → update
    // ------------------------------------------------
    if (status === "return") {
      if (activeTrips.length === 0) {
        return res.status(400).json({
          error: "No active OUT trip found for this bus.",
        });
      }

      const lastTrip = activeTrips[0];

      // Basic validations
      if (odometer_in < lastTrip.odometer_out) {
        return res.status(400).json({
          error: "Odometer IN cannot be less than Odometer OUT.",
        });
      }

      if (petrol_in_litre > lastTrip.petrol_out_litre) {
        return res.status(400).json({
          error: "Petrol IN cannot be greater than Petrol OUT.",
        });
      }

      // Mileage calculation
      const distance = odometer_in - lastTrip.odometer_out;
      const fuelUsed = lastTrip.petrol_out_litre - petrol_in_litre;

      const mileage =
        fuelUsed > 0 && distance > 0
          ? parseFloat((distance / fuelUsed).toFixed(2))
          : null;

      // Update the OUT trip into RETURN
      await pool.query(
        `
          UPDATE trip_log
          SET odometer_in = ?,
              petrol_in_litre = ?,
              mileage = ?,
              trip_status = 'return'
          WHERE trip_id = ?
        `,
        [odometer_in, petrol_in_litre, mileage, lastTrip.trip_id]
      );

      return res.json({
        message: "Trip completed successfully.",
        mileage,
      });
    }
  } catch (err) {
    console.error("Error adding trip:", err);
    res.status(500).json({ error: "Internal server error." });
  }
}

export async function getAllTrips(req, res) {
  try {
    const pool = getPool();
    const [rows] = await pool.query(
      "SELECT * FROM trip_log ORDER BY trip_id DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error("Error fetching trips:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
