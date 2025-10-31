// routes/trip.js
import express from "express";
import * as tripCtrl from "../controllers/tripController.js";
import { authMiddleware, requireRole } from "../middleware/auth.js";

const router = express.Router();

router.post("/", authMiddleware, requireRole("driver"), tripCtrl.addTrip);
router.get("/me", authMiddleware, requireRole("driver"), tripCtrl.listTripsByDriver);

export default router;
