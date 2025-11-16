import { getPool } from '../../config/database.js';
import fs from 'fs';
import sql from 'mssql';
const get_all_forms = async (req, res) => {
  try {
    const pool = await getPool(); // cần await

    if (!pool) {
      return res.status(503).json({ message: 'Database service unavailable.' });
    }

    const result = await pool.request().query('SELECT * FROM Form');

    return res.status(200).json(result.recordset);
  } catch (error) {
    console.error('Error retrieving forms:', error.message);
    return res.status(500).json({ message: 'Error retrieving forms', error: error.message });
  }
};

module.exports = { get_all_forms };
