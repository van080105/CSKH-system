import { getPool } from '../../config/database.js';
import fs from 'fs';
import sql from 'mssql';
const MakeFBform = async (req, res) => {
  const { customerId, formId } = req.query;      // 🟢 Lấy từ query: /feedback?customerId=1&formId=5
  const { content, rate } = req.body;            // 🟢 Lấy từ body JSON

  if (!rate) {
    return res.status(400).json({ message: 'Rate has to be filled' });
  }

  const pool = await getPool();
  if (!pool) {
    return res.status(503).json({ message: 'Database Connection Error' });
  }

  try {
    await pool.request()
      .input('CustomerID', sql.Int, customerId)   // ⚠️ Phải trùng tên với trong query
      .input('FormID', sql.Int, formId)
      .input('Content', sql.NVarChar, content || '') // 🔹 nếu không có content thì để rỗng
      .input('Rating', sql.Int, rate)
      .query(`
        INSERT INTO FeedBackForm (FormID, CustomerID, Rating, Content, SentDate)
        VALUES (@FormID, @CustomerID, @Rating, @Content, GETDATE())
      `);

    return res.status(201).json({ message: 'Insert into FeedBackForm Successfully' });
  } catch (err) {
    console.error('Insertion failed:', err.message); // ⚠️ Phải là console.error, không phải console.err
    return res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};
const MakeChatbotFB = async (req, res) => {
  const { customerID } = req.query;   // ✅ Lấy đúng tham số từ query: /feedback/chatbot?customerID=5
  const { rating } = req.body;

  if (!rating) {
    return res.status(400).json({ message: 'Missing Rating' }); // 🔹 400 = Bad Request
  }

  const pool = await getPool();
  if (!pool) {
    return res.status(503).json({ message: 'Database Connection Error' });
  }

  try {
    await pool.request()
      .input('CustomerID', sql.Int, customerID)  // ⚠️ Tên tham số phải trùng với trong query
      .input('Rating', sql.Int, rating)
      .query(`
        INSERT INTO FeedBackChatbot (CustomerID, Vers, Rating)
        VALUES (@CustomerID, 1.0, @Rating)
      `);

    return res.status(201).json({ message: 'Insert FeedBackChatbot Successfully' });
  } catch (err) {
    console.error('Insertion Failed:', err.message); // ✅ console.error
    return res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};

module.exports = {MakeFBform, MakeChatbotFB}