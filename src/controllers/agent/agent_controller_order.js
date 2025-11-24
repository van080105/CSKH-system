import { getPool } from '../../config/db.js';
import fs from 'fs';
import sql from 'mssql';
const update_order = async (req, res) =>
{
  const orderId = req.params.orderId
  const { Status } = req.body
  if(!Status)
  {
    return res.status(400).json({message : 'Status is required'})
  }
  const pool = await getPool()
  if (!pool)
  {
    return res.status(503).json({message : 'Database connection error'})
  }
  try{
    await pool.request()
      .input('OrderID',sql.Int,orderId)
      .input('Status',sql.NVarChar,Status)
      .query('update [Orders] set Stt = @Status where OrderID = @OrderID')
    res.status(200).json({message:'Order updated successfully'})
  }
  catch (err) {
    console.error('Error updating order:', err.message);
    res.status(500).json({message: 'Internal Server Error'});
  }
}
export default {update_order}