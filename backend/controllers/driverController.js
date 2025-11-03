import bcrypt from "bcrypt";
import { getPool } from "../db.js";
import { generateToken } from "../utils/generateToken.js";

const saltRounds = 10;

// DRIVER SIGNUP
export async function registerDriver(req, res) {
  try {
    const { name, email, password, license_no, phone_no } = req.body;

    if (!name || !email || !password || !license_no)
      return res.status(400).json({ error: "All required fields must be filled" });

    const hashed = await bcrypt.hash(password, saltRounds);
    const pool = getPool();

    await pool.query(
      "INSERT INTO driver (name, email, password, license_no, phone_no) VALUES (?, ?, ?, ?, ?)",
      [name, email, hashed, license_no, phone_no || null]
    );

    return res.json({ message: "Signup successful" });
  } catch (err) {
    if (err?.code === "ER_DUP_ENTRY")
      return res.status(400).json({ error: "Email or license number already exists" });
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}

// DRIVER LOGIN
export async function loginDriver(req, res) {
  try {
    const { driverId, password } = req.body;

    if (!driverId || !password)
      return res.status(400).json({ error: "Missing driver ID or password" });

    const pool = getPool();

    // driverId can be email or license_no (support both)
    const [rows] = await pool.query(
      "SELECT * FROM driver WHERE email = ? OR license_no = ?",
      [driverId, driverId]
    );

    if (!rows.length) return res.status(401).json({ error: "Invalid credentials" });

    const driver = rows[0];
    const match = await bcrypt.compare(password, driver.password);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    const token = generateToken({
      id: driver.driver_id,
      name: driver.name,
      role: driver.role || "driver",
    });

    return res.json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}
