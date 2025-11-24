import { getPool } from '../../config/db.js';
import fs from 'fs';
import sql from 'mssql';
const CreateTable = async(req, res) => {
  const {NameTable, ParentId} = req.body
  if (!NameTable)
  {
    res.status(400).json({message:'Some fields are missing'})
  }
  const pool = await getPool()
  if (!pool)
  {
    return res.status(503).json({message : 'Database connection error'})
  }
  try {
    const getID = await pool.request().query('select max(TableID) as Tid from ClassifyTable')
    const newId = getID.recordset[0].Tid+1
    await pool.request()
      .input('TableId',sql.Int,newId)
      .input('NameTable',sql.NVarChar,NameTable)
      .input('ParentId',sql.Int,ParentId)
      .query('insert into ClassifyTable(TableID,NameTable,ParentTableID) values(@TableId,@NameTable,@ParentId)')
    res.status(201).json('Table inserted successfully')
  }
  catch (err)
  { console.error('Error in CreateTable:', err.message)
    res.status(503).json({message : 'Internal Server Error'})
  }
}
const UpdateTable = async (req, res) => {
  const TableId = req.params.table;
  const { NameTable, ParentId } = req.body;

  try {
    const pool = await getPool();
    if (!pool) {
      return res.status(503).json({ message: 'Database Connection Error' });
    }

    const request = pool.request()
      .input('TableId', sql.Int, TableId)
      .input('NameTable', sql.NVarChar, NameTable || null)
      .input('ParentId', sql.Int, ParentId || null);
    const query = `
      UPDATE ClassifyTable
      SET 
        NameTable = COALESCE(@NameTable, NameTable),
        ParentTableID = COALESCE(@ParentId, ParentTableID)
      WHERE TableID = @TableId;
    `;

    await request.query(query);
    return res.status(200).json({ message: 'Update table successfully' });

  } catch (err) {
    console.error('Update table failed:', err.message);
    return res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};
const DeleteTable = async (req, res) => {
  const TableId = req.params.table; // lấy id từ URL, ví dụ /agent/table/5

  try {
    const pool = await getPool();
    if (!pool) {
      return res.status(503).json({ message: 'Database Connection Error' });
    }

    // kiểm tra xem bản ghi có tồn tại không
    const check = await pool.request()
      .input('TableId', sql.Int, TableId)
      .query('SELECT COUNT(*) AS count FROM ClassifyTable WHERE TableID = @TableId');

    if (check.recordset[0].count === 0) {
      return res.status(404).json({ message: `TableID ${TableId} not found` });
    }

    // xóa bản ghi
    await pool.request()
      .input('TableId', sql.Int, TableId)
      .query('DELETE FROM ClassifyTable WHERE TableID = @TableId');

    return res.status(200).json({ message: `Deleted TableID ${TableId} successfully` });
  } catch (err) {
    console.error('Delete table failed:', err.message);
    return res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};

export default {CreateTable,UpdateTable,DeleteTable}