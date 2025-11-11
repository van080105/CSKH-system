import { getPool } from '../config/db.js';

// Lấy danh sách các thông báo mà người dùng đã nhận
export const getUserNotificationsService = async (userId) => {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .input('userId', userId)
      .query(`
        SELECT Notification.NoID, Notification.Content, Notification.SentDate AS SentDate
        FROM Notification
        JOIN ReceiveNotification ON Notification.NoID = ReceiveNotification.NoID
        WHERE ReceiveNotification.AccountID = @userId
      `);
    const formatted = result.recordset.map(row => {
      let formattedDate = null;
      if (row.SentDate) {
        const d = new Date(row.SentDate);
        const yyyy = d.getFullYear();
        const MM = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        const hh = String(d.getHours()).padStart(2, '0');
        const mm = String(d.getMinutes()).padStart(2, '0');
        const ss = String(d.getSeconds()).padStart(2, '0');
        formattedDate = `${yyyy}-${MM}-${dd} ${hh}:${mm}:${ss}`;
      }
      return { ...row, SentDate: formattedDate };
    });

    return formatted;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Tạo thông báo mới và gửi đến các người dùng (AccountIDs)
export const createNotificationService = async (content, sentDate, accountIds) => {
  try {
    const pool = await getPool();

    // Lấy NoID tối đa hiện tại để tự động tăng thêm 1
    const result = await pool.request().query('SELECT MAX(NoID) AS NoID FROM Notification');
    const newNoID = result.recordset[0].NoID ? result.recordset[0].NoID + 1 : 1; 
    const sentDate = new Date().toISOString(); 
    // Tạo thông báo mới và cung cấp NoID tự động tăng
    await pool.request().query(`
      INSERT INTO Notification (NoID, Content, SentDate)
      VALUES (${newNoID}, N'${content}', '${sentDate}')
    `);

    // Thêm thông báo vào bảng ReceiveNotification cho mỗi AccountID
    for (let accountId of accountIds) {
      await pool.request().query(`
        INSERT INTO ReceiveNotification (NoID, AccountID)
        VALUES (${newNoID}, ${accountId})
      `);
    }

    return { message: 'Tạo thông báo thành công' };
  } catch (error) {
    throw new Error(error.message);
  }
};

