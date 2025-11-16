import { getPool } from '../../config/database.js';
import fs from 'fs';
import sql from 'mssql';
const GetFB = async (req,res) => {
  const pool = await getPool();
  if ( !pool )
  {
    return res.status(503).json({message : 'Database Connection Error'})
  }
  try {
    const result = await pool.request().query('select * from FeedBackForm')
    if(result.recordset.length === 0)
    {
      return res.status(404).json({message:'FeedBackForm Not Found'})
    }
    return res.status(200).json(result.recordset)
  }
  catch(err)
  {
    console.error('Failed:',err.message)
    res.status(500).json({message: 'Internal Server Error'})
  }
}
module.exports = {GetFB}