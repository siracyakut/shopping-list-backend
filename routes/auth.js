import express from "express";
import { checkAuth, loginUser, registerUser } from "../controllers/auth.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();

router.get("/check", authMiddleware, checkAuth);
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
