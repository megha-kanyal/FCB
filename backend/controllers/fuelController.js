import db from "../db.js";

// Add new fuel log
export const addFuelLog = (req, res) => {
  const { date, distance, fuel, cost } = req.body;
  if (!date || !distance || !fuel || !cost) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = "INSERT INTO fuel_logs (date, distance, fuel, cost) VALUES (?, ?, ?, ?)";
  db.query(sql, [date, distance, fuel, cost], (err, result) => {
    if (err) {
      console.error(" Error inserting data:", err);
      res.status(500).json({ message: "Database error" });
    } else {
      res.status(201).json({ message: "Fuel log added successfully!" });
    }
  });
};

// Get all logs
export const getFuelLogs = (req, res) => {
  const sql = "SELECT * FROM fuel_logs ORDER BY date DESC";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ message: "Database error" });
    } else {
      res.json(results);
    }
  });
};