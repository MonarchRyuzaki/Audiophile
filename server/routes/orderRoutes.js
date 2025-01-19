import express from "express";
import { onCheckout } from "../controllers/orderController.js";
import { validateToken } from "../utils/auth.js";

const router = express.Router();

router.post("/submit", validateToken, onCheckout);

export default router;