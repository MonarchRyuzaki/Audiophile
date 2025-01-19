import express from "express";
import {
  getProductByCategory,
  getProductBySlug,
} from "../controllers/productsController.js";

const router = express.Router();

router.get("/:slug", getProductBySlug);
router.get("/category/:category", getProductByCategory);

export default router;
