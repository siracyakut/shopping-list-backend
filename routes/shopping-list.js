const express = require("express");
const shoppingListController = require("../controllers/shopping-list");
const authMiddleware = require("../middlewares/auth");
const { body } = require("express-validator");

const router = express.Router();

router.get(
  "/get/:listId",
  authMiddleware,
  shoppingListController.getShoppingListById,
);
router.post(
  "/create",
  authMiddleware,
  [
    body("name")
      .not()
      .isEmpty()
      .withMessage("List name is required")
      .isString()
      .withMessage("List name must be a string"),
  ],
  shoppingListController.createShoppingList,
);
router.put(
  "/update",
  authMiddleware,
  [
    body("listId")
      .not()
      .isEmpty()
      .withMessage("List id is required")
      .isMongoId()
      .withMessage("List id must be a string"),
    body("name")
      .optional()
      .isString()
      .withMessage("List name must be a string"),
    body("products")
      .optional()
      .isArray()
      .withMessage("Products must be an array"),
  ],
  shoppingListController.updateShoppingList,
);
router.delete(
  "/delete",
  authMiddleware,
  [
    body("listId")
      .not()
      .isEmpty()
      .withMessage("List id is required")
      .isMongoId()
      .withMessage("List id must be a string"),
  ],
  shoppingListController.deleteShoppingList,
);
router.post(
  "/add-item",
  authMiddleware,
  [
    body("listId")
      .not()
      .isEmpty()
      .withMessage("List id is required")
      .isMongoId()
      .withMessage("List id must be a string"),
    body("itemId")
      .not()
      .isEmpty()
      .withMessage("Item id is required")
      .isString()
      .withMessage("Item id must be a string"),
  ],
  shoppingListController.addItemToShoppingList,
);
router.delete(
  "/remove-item",
  authMiddleware,
  [
    body("listId")
      .not()
      .isEmpty()
      .withMessage("List id is required")
      .isMongoId()
      .withMessage("List id must be a string"),
    body("itemId")
      .not()
      .isEmpty()
      .withMessage("Item id is required")
      .isString()
      .withMessage("Item id must be a string"),
  ],
  shoppingListController.removeItemFromShoppingList,
);

module.exports = router;
