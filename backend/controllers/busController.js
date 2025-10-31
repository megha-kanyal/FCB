// controllers/busController.js
import { getPool } from "../db.js";

export async function addBus(req, res) {
  try {
    const { plate_no, model_no, capacity } = req.body;
    if (!plate_no) return res.status(400).json({ error: "plate_no required" });
    const pool = getPool();
    const [result] = await pool.query("INSERT INTO bus (plate_no, model_no, capacity, added_by) VALUES (?, ?, ?, ?)",
      [plate_no, model_no || null, capacity || null, req.user.id]);
    return res.json({ bus_id: result.insertId });
  } catch (err) {
    if (err?.code === "ER_DUP_ENTRY") return res.status(400).json({ error: "plate_no already exists" });
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}

export async function listBuses(req, res) {
  try {
    const pool = getPool();
    const [rows] = await pool.query("SELECT b.*, a.name AS added_by_name FROM bus b LEFT JOIN admin a ON b.added_by = a.admin_id ORDER BY b.bus_id DESC");
    return res.json(rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}
