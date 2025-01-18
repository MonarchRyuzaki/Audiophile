import express from "express";
import { getCart, onAddToCart } from "../controllers/cartController.js";
import { validateToken } from "../utils/auth.js";
const router = express.Router();

router.get("/", validateToken, getCart);
router.post("/add", validateToken, onAddToCart);

export default router;
