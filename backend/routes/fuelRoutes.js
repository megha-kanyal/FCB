import express from "express";
import { addFuelLog, getFuelLogs } from "../controllers/fuelController.js";

const router = express.Router();

router.post("/add", addFuelLog);
router.get("/all", getFuelLogs);

export default router;