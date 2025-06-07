import express from "express";
import {
  createOrder,
  verifyPayment,
} from "../controllers/razorpayController.js";
import { validateToken } from "../utils/auth.js";

const router = express.Router();

// Razorpay payment routes
router.post("/create-order", validateToken, createOrder);
router.post("/verify", validateToken, verifyPayment);

export default router;
