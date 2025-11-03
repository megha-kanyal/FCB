import express from "express";
import * as driverCtrl from "../controllers/driverController.js";

const router = express.Router();

router.post("/signup", driverCtrl.registerDriver);
router.post("/login", driverCtrl.loginDriver);

export default router;
