const express = require("express");
const bbyController = require("../controllers/bby");
const { body } = require("express-validator");

const router = express.Router();

router.post(
  "/product/search",
  [
    body("query")
      .not()
      .isEmpty()
      .withMessage("Query is required")
      .isString()
      .withMessage("Query must be a string"),
    body("page")
      .not()
      .isEmpty()
      .withMessage("Page is required")
      .isNumeric()
      .withMessage("Page must be a number"),
  ],
  bbyController.searchProduct,
);
router.get("/product/:id", bbyController.getProductById);
router.get("/categories");

module.exports = router;
