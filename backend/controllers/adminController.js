import bcrypt from "bcrypt";
import { getPool } from "../db.js";
import { generateToken } from "../middleware/auth.js";

const saltRounds = 10;

export async function registerAdmin(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ error: "Missing fields" });

    const hashed = await bcrypt.hash(password, saltRounds);
    const pool = getPool();

    await pool.query(
      "INSERT INTO admin (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashed]
    );

    return res.json({ message: "Admin registered successfully" });
  } catch (err) {
  console.error("REGISTER ERROR:", err);
  return res.status(500).json({ error: err.message || "Server error" });
}

}

export async function loginAdmin(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Missing fields" });

    const pool = getPool();
    const [rows] = await pool.query("SELECT * FROM admin WHERE email = ?", [email]);

    if (!rows.length)
      return res.status(401).json({ error: "Invalid credentials" });

    const admin = rows[0];
    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    const token = generateToken({
      id: admin.admin_id,
      role: "admin",
      name: admin.name,
      email: admin.email,
    });

    return res.json({ message: "Login successful", token });
  } catch (err) {
  console.error("LOGIN ERROR:", err);
  return res.status(500).json({ error: err.message || "Server error" });
}
}