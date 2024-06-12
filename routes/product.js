const express = require("express");
const productController = require("../controllers/product");
const authMiddleware = require("../middlewares/auth");
const { body } = require("express-validator");

const router = express.Router();

router.get("/", authMiddleware, productController.getProducts);
router.get("/:id", authMiddleware, productController.getProductById);
router.post(
  "/add",
  authMiddleware,
  [
    body("name")
      .not()
      .isEmpty()
      .withMessage("Name is required")
      .isString()
      .withMessage("Name must be a string"),
    body("price")
      .not()
      .isEmpty()
      .withMessage("Price is required")
      .isNumeric()
      .withMessage("Price must be a number"),
    body("image")
      .not()
      .isEmpty()
      .withMessage("Image is required")
      .isString()
      .withMessage("Image must be a string"),
    body("description")
      .not()
      .isEmpty()
      .withMessage("Description is required")
      .isString()
      .withMessage("Description must be a string"),
  ],
  productController.addProduct,
);
router.put(
  "/update",
  authMiddleware,
  [
    body("id")
      .not()
      .isEmpty()
      .withMessage("ID is required")
      .isMongoId()
      .withMessage("ID must be a string"),
    body("name").optional().isString().withMessage("Name must be a string"),
    body("price").optional().isNumeric().withMessage("Price must be a number"),
    body("image").optional().isString().withMessage("Image must be a string"),
    body("description")
      .optional()
      .isString()
      .withMessage("Description must be a string"),
  ],
  productController.updateProduct,
);
router.delete(
  "/delete",
  authMiddleware,
  [
    body("id")
      .not()
      .isEmpty()
      .withMessage("ID is required")
      .isMongoId()
      .withMessage("ID must be a string"),
  ],
  productController.deleteProduct,
);

module.exports = router;
