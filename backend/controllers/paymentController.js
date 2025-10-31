// controllers/paymentController.js
import { getPool } from "../db.js";

export async function listPayments(req, res) {
  try {
    const pool = getPool();
    const [rows] = await pool.query("SELECT pay.*, p.pump_name, a.name AS paid_by_name FROM payment pay JOIN petrol_pump p ON pay.pump_id = p.pump_id LEFT JOIN admin a ON pay.paid_by = a.admin_id ORDER BY pay.created_at DESC");
    return res.json(rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}
