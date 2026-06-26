import express from "express";
import {
  signup,
  verifyEmail,
  logout,
  login,
  forgot_password,
  reset_password,
  checkAuth,
  updateProfile,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

//routes
router.get("/check-auth", verifyToken, checkAuth);
router.post("/signup", signup);
router.post("/verify-email", verifyEmail);
router.post("/logout", logout);
router.post("/login", login);
router.post("/forgot_password", forgot_password);
router.post("/reset_password/:token", reset_password);
router.put("/update-profile", verifyToken, updateProfile);

export default router;
