// routes/payment.js
import express from "express";
import * as paymentCtrl from "../controllers/paymentController.js";
import { authMiddleware, requireRole } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authMiddleware, requireRole("admin"), paymentCtrl.listPayments);

export default router;
