import express from "express";
import { register, login, forgotPassword, changePassword} from "../controllers/authController.js";
const router = express.Router();

// POST /api/auth/register
router.post("/register", register);

// POST /api/auth/login
router.post("/login", login);

// POST /api/auth/forgot-password, change-password
router.post("/forgot-password", forgotPassword);
router.post("/change-password", changePassword); 
export default router;
