
import { getPool } from '../../config/database.js';
import fs from 'fs';
import sql from 'mssql';
const post_form = async (req,res) =>{
  try {
    const {rating,content} = req.body;
    if (!rating || !content)
    {
      return res.status(400).json({message : 'Missing rating or content'})
    }
    const pool = await getPool();
    let no_of_rows = await pool.request().query('SELECT COUNT(*) AS count FROM FeedbackForm');
    const formID = no_of_rows.recordset[0].count + 1;
    const result = await pool.request()
      .input('FormID',sql.Int,formID)
      .input('Rating',sql.Int,rating)
      .input('Content',sql.NVarChar,content)
    const query = fs.readFileSync('../../queries/guest_insert_form.sql', 'utf-8');
    await result.query(query)
    return res.status(201).json({message:'Feedback form submitted successfully'})
  }
  catch (err)
  {
    console.error('Error in post_form controller:', err.message)
    res.status(500).json({ message:'Internal Server Error' })
  }
}
module.exports = { post_form };