// backend/routes/trip.js
import express from "express";
import { addTrip } from "../controllers/tripController.js";
const router = express.Router();
router.post("/", addTrip);
export default router;