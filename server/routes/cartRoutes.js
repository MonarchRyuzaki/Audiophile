import express from "express";
import { getCart, onAddToCart, onClearingCart, onUpdateItemQuantity } from "../controllers/cartController.js";
import { validateToken } from "../utils/auth.js";
const router = express.Router();

router.get("/", validateToken, getCart);
router.post("/add", validateToken, onAddToCart);
router.put("/update-item-quantity", validateToken, onUpdateItemQuantity);
router.delete("/", validateToken, onClearingCart);

export default router;
