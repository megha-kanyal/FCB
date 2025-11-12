import express from "express";
import { registerPetrol, loginPetrol } from "../controllers/petrolController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Petrol Registration
router.post("/register", registerPetrol);

// Login
router.post("/login", loginPetrol);

// Verify JWT token
router.get("/verify", authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

export default router;