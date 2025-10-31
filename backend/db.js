import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

if (!DB_USER || !DB_PASSWORD || !DB_HOST) {
  console.error("DB_* environment variables not set. Check your .env file.");
  process.exit(1);
}

let pool;

export async function initDatabase() {
  // Ensure database exists
  const tmpConn = await mysql.createConnection({
    host: DB_HOST,
    port: DB_PORT || 3306,
    user: DB_USER,
    password: DB_PASSWORD,
    multipleStatements: true
  });

  await tmpConn.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
  await tmpConn.end();

  // Create pool for queries
  pool = mysql.createPool({
    host: DB_HOST,
    port: DB_PORT || 3306,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    namedPlaceholders: true,
    multipleStatements: true,
  });

  // Create schema
  const schema = fs.readFileSync(path.join(process.cwd(), "sql", "initial_schema.sql"), "utf8");
  await pool.query(schema);
  console.log("✅ Database initialized and schema ensured.");
  return pool;
}

export function getPool() {
  if (!pool) throw new Error("Database not initialized. Call initDatabase() first.");
  return pool;
}
