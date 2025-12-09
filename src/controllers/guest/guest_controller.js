
import { getPool } from '../../config/db.js';
import fs from 'fs';
import sql from 'mssql';
const post_FB_form = async (req,res) =>{
  try {
    //const {formId} = req.params
    
    const {rating} = req.body;
    if (!rating)
    {
      return res.status(400).json({message : 'Missing rating or content'})
    }
    const pool = await getPool();
    const fakeid = -Math.floor(Math.random() * 100) - 1;
    const result = await pool.request()
      .input('fakeid',sql.Int,fakeid)
      .input('Rating',sql.Int,rating)

      
    const query = `insert into FeedbackChatbot(CustomerID,Vers,Rating)
    values(@fakeid,1.0,@rating)`;
    await result.query(query)
    return res.status(201).json({message:'Chatbot form submitted successfully'})
  }
  catch (err)
  {
    console.error('Error in post_form controller:', err.message)
    res.status(500).json({ message:'Internal Server Error' })
  }
}
const post_form = async (req, res) => {
  const { name, email, title, content, type } = req.body;

  if (!title || !content || !type) {
    return res.status(400).json({ message: "Some fields are missing" });
  }

  try {
    const pool = await getPool();
    if (!pool) {
      return res.status(500).json({ message: "Database connection error" });
    }

    const transaction = new sql.Transaction(pool);
    await transaction.begin();

    const request = new sql.Request(transaction);

    const countRes = await request.query(
      "SELECT Max(FormID) AS count FROM Form"
    );
    const formID = countRes.recordset[0].count + 1;
    const guestRes = await request.query(
      "SELECT MAX(ID0) AS maxID FROM Guest"
    );
    const guest_id = (guestRes.recordset[0].maxID || 0) + 1;

    // Insert Form
 await pool.request()
  .input("FormID", sql.Int, formID)
  .input("title", sql.NVarChar, title)
  .input("content", sql.NVarChar, content)
  .input("type", sql.NVarChar, type)
  .query(`
    INSERT INTO Form(FormID, Title, Content, Stt, Typ, SentDate)
    VALUES (@FormID, @title, @content, N'Chưa trả lời', @type, GETDATE())
  `);

// Insert Guest
await pool.request()
  .input("guest_id", sql.Int, guest_id)
  .input("name", sql.NVarChar, name)
  .input("email", sql.NVarChar, email)
  .query(`
    INSERT INTO Guest(ID0, Fullname, email)
    VALUES (@guest_id, @name, @email)
  `);

// Insert GuestCreate (Sửa input để tránh SQL Injection)
await pool.request()
  .input("guest_id", sql.Int, guest_id)
  .input("formID", sql.Int, formID)
  .query(`
    INSERT INTO GuestCreate(ID0, FormID)
    VALUES (@guest_id, @formID)
  `);

// Insert Classify (Lấy TableID theo NameTable)
await pool.request()
  .input("type", sql.NVarChar, type)
  .input("formId", sql.Int, formID)
  .query(`
    INSERT INTO Classify(FormID, TableID)
    SELECT @formId, TableID
    FROM ClassifyTable
    WHERE NameTable = @type;
  `);

    await transaction.commit();

    return res.status(200).json({ message: "Insert Successfully" });

  } catch (err) {
    console.error("Insertion Failed:", err.message);
    return res.status(503).json({ message: "Internal Server Error" });
  }
};

export default {post_form, post_FB_form}
