// src/services/faqService.js
import { getPool } from '../config/db.js';

export const getAllFAQService = async () => {
  try {
    const pool = await getPool();
    const result = await pool.request().query('SELECT * FROM FAQ');
    return result.recordset; // Trả về danh sách FAQ
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createFAQService = async (category, question, answer) => {
  try {
  const pool = await getPool();
    //Kiểm tra Category có tồn tại trong ClassifyTable không
  const checkCategory = await pool.request().query(`
    SELECT * FROM ClassifyTable WHERE NameTable = N'${category}'
  `);
  if (checkCategory.recordset.length === 0) {
    throw new Error('Không có bảng phân loại thuộc về');
  }

  //Lấy TableID tương ứng của Category
  const tableID = checkCategory.recordset[0].TableID;

  const idResult = await pool.request().query('SELECT ISNULL(MAX(ID), 0) + 1 AS NewID FROM FAQ');
  const newID = idResult.recordset[0].NewID;

  // Chèn vào bảng FAQ
  await pool.request().query(`
    INSERT INTO FAQ (ID, Category, Question, Answer)
    VALUES (${newID}, N'${category}', N'${question}', N'${answer}')
  `);

  // Liên kết với bảng phân loại (BelongTo)
    await pool.request().query(`
      INSERT INTO BelongTo (FAQ_ID, ClassifyTableID)
      VALUES (${newID}, ${tableID})
    `);
    return { message: 'Tạo FAQ và phân loại thành công' };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateFAQService = async (id, category, question, answer) => {
  try {
    const pool = await getPool();
    // Kiểm tra Category có tồn tại không
    const checkCategory = await pool.request().query(`
      SELECT * FROM ClassifyTable WHERE NameTable = N'${category}'
    `);
    if (checkCategory.recordset.length === 0) {
      throw new Error('Không có bảng phân loại thuộc về');
    }

    const tableID = checkCategory.recordset[0].TableID;

    await pool.request().query(`
    UPDATE FAQ
    SET Category = N'${category}', Question = N'${question}', Answer = N'${answer}'
    WHERE ID = ${id}
  `);

  // Xóa liên kết cũ và thêm mới
  await pool.request().query(`
    DELETE FROM BelongTo WHERE FAQ_ID = ${id};
    INSERT INTO BelongTo (FAQ_ID, ClassifyTableID)
    VALUES (${id}, ${tableID})
  `);
    return { message: 'Cập nhật FAQ thành công' };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteFAQService = async (id) => {
  try {
    const pool = await getPool();
    await pool.request().query(`DELETE FROM BelongTo WHERE FAQ_ID = ${id}`);
    await pool.request().query(`DELETE FROM FAQ WHERE ID = ${id}`);
    return { message: 'Xóa FAQ thành công' };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getFAQByIdService = async (id) => {
  try {
    const pool = await getPool();
    const result = await pool.request().query(`
      SELECT ClassifyTable.NameTable, ClassifyTable.Category
      FROM BelongTo
      JOIN ClassifyTable ON BelongTo.ClassifyTableID = ClassifyTable.TableID
      WHERE BelongTo.FAQ_ID = ${id}
    `);
    return result.recordset;
  } catch (error) {
    throw new Error(error.message);
  }
};
