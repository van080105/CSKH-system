import express from "express";
import { createChatbot } from "../controllers/chatbotController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { authorizeRole } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Tạo chatbot mới 
router.post("/", verifyToken, authorizeRole("Admin"), createChatbot);

export default router;
