import express from "express";
import multer from "multer";
import path from "path";
import { addBill, getAllBills } from "../controllers/billController.js";

const router = express.Router();

// ✅ Set up Multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Routes
router.post("/add", upload.single("billPhoto"), addBill);
router.get("/all", getAllBills);

export default router;
