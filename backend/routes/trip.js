import express from "express";
import { addTrip, getAllTrips } from "../controllers/tripController.js";
import { authMiddleware, requireRole } from "../middleware/auth.js";

const router = express.Router();

router.post("/add", authMiddleware, addTrip);
router.get("/all", authMiddleware, requireRole("admin"), getAllTrips);

export default router;
