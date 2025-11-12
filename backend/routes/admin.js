import express from "express";
import { registerAdmin, loginAdmin } from "../controllers/adminController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Admin Registration
router.post("/register", registerAdmin);

// Login
router.post("/login", loginAdmin);


// Verify JWT token
router.get("/verify", authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

export default router;