const express = require("express");
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth");
const authController = require("../controllers/auth");

const router = express.Router();

router.get("/check", authMiddleware, authController.checkAuth);
router.post(
  "/register",
  [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isStrongPassword()
      .withMessage("Password must be strong"),
    body("name")
      .notEmpty()
      .withMessage("Name is required")
      .isString()
      .withMessage("Name must be string"),
    body("surname")
      .notEmpty()
      .withMessage("Surname is required")
      .isString()
      .withMessage("Surname must be string"),
  ],
  authController.registerUser,
);
router.post(
  "/login",
  [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isStrongPassword()
      .withMessage("Password must be strong"),
  ],
  authController.loginUser,
);
router.put(
  "/edit",
  authMiddleware,
  [
    body("password")
      .optional()
      .isStrongPassword()
      .withMessage("Password must be strong"),
    body("name").optional().isString().withMessage("Name must be string"),
    body("surname").optional().isString().withMessage("Surname must be string"),
  ],
  authController.editUser,
);

module.exports = router;
