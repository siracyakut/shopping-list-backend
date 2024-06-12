import express from "express";
import {
  addProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/product.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/add", addProduct);
router.put("/update", updateProduct);
router.delete("/delete", deleteProduct);

export default router;
