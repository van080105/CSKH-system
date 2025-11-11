import { getPool } from "../config/db.js";

// Lấy ReceiverID 
const getNextReceiverID = async (pool) => {
  const result = await pool.request().query(`
    SELECT MAX(CAST(SUBSTRING(ReceiverID, 2, 10) AS INT)) AS maxN
    FROM Receiver
  `);

  if (result.recordset.length === 0) return "R0"; 

  const maxN = result.recordset[0].maxN || 0;
  const num = maxN + 1;
  return `R${num}`; 
};

// Tạo chatbot mới 
export const createChatbotService = async (version) => {
  const pool = await getPool();

  // Sinh ReceiverID mới
  const newReceiverID = await getNextReceiverID(pool);

  // Thêm vào bảng Receiver
  await pool.request().query(`
    INSERT INTO Receiver (ReceiverID)
    VALUES ('${newReceiverID}')
  `);

  // Thêm vào bảng Chatbot
  await pool.request().query(`
    INSERT INTO Chatbot (Vers, ReceiverID)
    VALUES (N'${version}', '${newReceiverID}')
  `);

  return { message: "Tạo chatbot thành công", ReceiverID: newReceiverID, Version: version };
};
