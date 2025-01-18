import express from "express";
import { onCheckout } from "../controllers/orderController.js";

const router = express.Router();

router.post("/submit", onCheckout);

export default router;