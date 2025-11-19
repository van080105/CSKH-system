import express from "express";
<<<<<<< HEAD
import { register, login,logout, forgotPassword, changePassword} from "../controllers/authController.js";
=======
import { register, login, logout, forgotPassword, changePassword} from "../controllers/authController.js";
>>>>>>> 72f3f522718a99850218f338bf6aab0d715df8d9
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
