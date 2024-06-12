import express from "express";
import { getProductById, searchProduct } from "../controllers/bby.js";

const router = express.Router();

router.post("/product/search", searchProduct);
router.get("/product/:id", getProductById);
router.get("/categories");

export default router;
