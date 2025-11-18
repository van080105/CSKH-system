
import fs from 'fs';
import sql from 'mssql';
import { getPool } from '../../config/database.js';
const getClassTb = async (req,res) => {
  const pool = await getPool();
  if(!pool)
  {
    return res.status(503).json({message:'Database Connection Error'})
  }
  try{
    const result = await pool.request().query('select * from ClassifyTable')
    if(result.recordset.length === 0)
    {
      return res.status(404).json({message:'ClassifyTable Not Found'})
    }
    return res.status(200).json(result.recordset)
  }
  catch(err)
  {
    console.error('Failed:',err.message)
    res.status(500).json({message: 'Internal Server Error'})
  }
}
module.exports = {getClassTb}