// routes/pump.js
import express from "express";
import { addPump, getAllPumps } from "../controllers/pumpController.js";
import { authMiddleware, requireRole } from "../middleware/auth.js";

const router = express.Router();

// Add a petrol pump (admin only)
router.post("/add", authMiddleware, requireRole("admin"), addPump);

// Get all petrol pumps (admin only)
router.get("/", authMiddleware, requireRole("admin"), getAllPumps);

export default router;
