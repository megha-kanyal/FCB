import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { initDatabase } from "./db.js";

// Routes
import adminRoutes from "./routes/admin.js";
import petrolRoutes from "./routes/petrol.js";
import busRoutes from "./routes/bus.js";
import driverRoutes from "./routes/driver.js";
import tripRoutes from "./routes/trip.js";
import fuelRoutes from "./routes/fuel.js";
import paymentRoutes from "./routes/payment.js";
import pumpRoutes from "./routes/pump.js";
import billRoutes from "./routes/bill.js";


dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Initialize database BEFORE routes
(async () => {
  try {
    await initDatabase();
    console.log("Database ready");

    app.use("/api/admin", adminRoutes);
    app.use("/api/petrol", petrolRoutes);
    app.use("/api/bus", busRoutes);
    app.use("/api/driver", driverRoutes);
    app.use("/api/trip", tripRoutes);
    app.use("/api/fuel", fuelRoutes);
    app.use("/api/payment", paymentRoutes);
    app.use("/api/pumps", pumpRoutes);
    app.use("/api/bill", billRoutes);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Failed to initialize DB:", err);
    process.exit(1);
  }
})();
