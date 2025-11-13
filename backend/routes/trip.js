import express from "express";
import { addTrip, getAllTrips } from "../controllers/tripController.js";
import { authMiddleware } from "../middleware/auth.js";
import { requireRole } from "../middleware/auth.js";

const router = express.Router();

router.post("/add", addTrip); // For drivers to add trip
router.get("/all", authMiddleware, requireRole("admin"), getAllTrips); // For admin to view all trips

export default router;
