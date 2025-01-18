import express from "express";
import { getCart, onAddToCart, onUpdateItemQuantity } from "../controllers/cartController.js";
import { validateToken } from "../utils/auth.js";
const router = express.Router();

router.get("/", validateToken, getCart);
router.post("/add", validateToken, onAddToCart);
router.post("/update-item-quantity", validateToken, onUpdateItemQuantity);

export default router;
