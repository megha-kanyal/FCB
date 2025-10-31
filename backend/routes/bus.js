import express from "express";
import * as busCtrl from "../controllers/busController.js";
import { authMiddleware, requireRole } from "../middleware/auth.js";

const router = express.Router();

// Only admins can add buses
router.post("/add", authMiddleware, requireRole("admin"), busCtrl.addBus);

// Authenticated users can view bus list
router.get("/", authMiddleware, busCtrl.listBuses);

export default router;
