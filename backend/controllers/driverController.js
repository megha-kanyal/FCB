// controllers/driverController.js
import bcrypt from "bcrypt";
import { getPool } from "../db.js";
import { generateToken } from "../middleware/auth.js";

const saltRounds = 10;

export async function registerDriver(req, res) {
  try {
    const { name, license_no, phone_no, password } = req.body;
    if (!name || !license_no || !password) return res.status(400).json({ error: "Missing fields" });
    const hashed = await bcrypt.hash(password, saltRounds);
    const pool = getPool();
    await pool.query("INSERT INTO driver (name, license_no, phone_no, password) VALUES (?, ?, ?, ?)", [name, license_no, phone_no || null, hashed]);
    return res.json({ message: "Driver registered" });
  } catch (err) {
    if (err?.code === "ER_DUP_ENTRY") return res.status(400).json({ error: "License number already used" });
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}

export async function loginDriver(req, res) {
  try {
    const { license_no, password } = req.body;
    if (!license_no || !password) return res.status(400).json({ error: "Missing fields" });
    const pool = getPool();
    const [rows] = await pool.query("SELECT * FROM driver WHERE license_no = ?", [license_no]);
    if (!rows.length) return res.status(401).json({ error: "Invalid credentials" });
    const driver = rows[0];
    const ok = await bcrypt.compare(password, driver.password);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });
    const token = generateToken({ id: driver.driver_id, role: "driver", name: driver.name });
    return res.json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}
