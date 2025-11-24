import express from "express";


import { register, login, logout, forgotPassword, changePassword} from "../controllers/authController.js";

import { verifyToken } from "../middlewares/authMiddleware.js";
const router = express.Router();

// POST /api/auth/register
router.post("/register", register);
// POST /api/auth/login-logout
router.post("/login", login);
router.post("/logout", verifyToken, logout);
// POST /api/auth/forgot-password, change-password
router.post("/forgot-password", forgotPassword);
router.post("/change-password", changePassword); 
export default router;
