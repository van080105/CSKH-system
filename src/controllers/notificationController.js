
import { getUserNotificationsService, createNotificationService } from '../services/notificationService.js';

// Lấy tất cả thông báo mà người dùng đã nhận
export const getUserNotifications = async (req, res) => {
  try {
    const userId = req.user.id;  
    const notifications = await getUserNotificationsService(userId);  
    if (notifications.length === 0) {
      return res.status(404).json({ message: 'Không có thông báo nào' });
    }
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Tạo thông báo mới và gửi tới các Account
export const createNotification = async (req, res) => {
  try {
    const { content, sentDate, accountIds } = req.body;
    const result = await createNotificationService(content, sentDate, accountIds);  
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
