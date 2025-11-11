import express from 'express';
import { getUserNotifications, createNotification } from '../controllers/notificationController.js';
import { verifyToken } from "../middlewares/authMiddleware.js";
import { authorizeRole } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Lấy danh sách thông báo của người dùng
router.get('/my', verifyToken, getUserNotifications);

// Tạo notification mới
router.post('/', verifyToken, authorizeRole('Admin'), createNotification);

export default router;
