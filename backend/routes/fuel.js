// routes/fuel.js
import express from "express";
import * as fuelCtrl from "../controllers/fuelController.js";
import { authMiddleware, requireRole } from "../middleware/auth.js";

const router = express.Router();

// Driver creates refill
router.post("/", authMiddleware, requireRole("driver"), fuelCtrl.addRefill);

// Admin can view all (protected)
router.get("/", authMiddleware, requireRole("admin"), fuelCtrl.listRefills);

export default router;
