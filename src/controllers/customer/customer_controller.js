import { getPool } from '../../config/database.js';
import fs from 'fs';
import sql from 'mssql';
const get_form = async (req,res) =>
{
  const customerID = req.user.id;
  if (!customerID)
  {
    return res.status(400).json({message:'CustomerID is required'});
  }
  try {
    const pool = await getPool();
    if (!pool)
    {
      res.status(503).json({message:'Server connection error'})
    }
    const result = await pool.request()
      .input('customerID', sql.Int, customerID)
      .query('SELECT * FROM Form join CustomerCreate ON Form.FormID = CustomerCreate.FormID WHERE CustomerCreate.CustomerID = @customerID');
    if (result.recordset.length === 0)
    {
      return res.status(404).json({message:'Customer not found'});
    }
    res.json(result.recordset[0]);
  }
  catch (err)
  {
    console.error('Error in get_form controller:', err.message)
    res.status(500).json({ message:'Internal Server Error' })
  }
}
const post_form = async (req,res) =>
{
  // Implementation for posting a form
  try{
    const id = req.params.customer
    const { title, content, type } = req.body
    if (!title || !content|| !type || !id)
    {
      return res.status(400).json({message:'Some fields are missing'})
    }
    const pool = await getPool()
    if (!pool)
    {
      return res.status(503).json({message:'Service Unavailable'})
    }
    const no_of_rows = await pool.request().query('SELECT COUNT(*) AS count FROM Form');    
    const formID = no_of_rows.recordset[0].count + 1;
    const result = await pool.request()
      .input('title',sql.NVarChar,title)
      .input('content',sql.NVarChar,content)
      .input('formID',sql.Int,formID)
      .input('id',sql.Int,id)
      .input('type',sql.NVarChar(100),type)
    const query = fs.readFileSync('./src/queries/insert_form.sql','utf-8');
    await result.query(query)
    //console.log('TableID returned:', result.recordset[0].TableID);
    return res.status(201).json({message:'Form submitted successfully'})
}
  catch(err)
{
    console.error('Error in post_form controller:', err.message)
    res.status(500).json({ message:'Internal Server Error' })
}
}
module.exports ={ get_form, post_form }