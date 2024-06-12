import express from "express";
import {
  addItemToShoppingList,
  createShoppingList,
  getShoppingListById,
  removeItemFromShoppingList,
  updateShoppingList,
} from "../controllers/shopping-list.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();

router.get("/get/:listId", authMiddleware, getShoppingListById);
router.post("/create", authMiddleware, createShoppingList);
router.put("/update", authMiddleware, updateShoppingList);
router.post("/add-item", authMiddleware, addItemToShoppingList);
router.delete("/remove-item", authMiddleware, removeItemFromShoppingList);

export default router;
