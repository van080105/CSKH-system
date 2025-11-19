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
    const result = await pool.request().query(`select a.ID as Cus_Id, a.email as Cus_email,a.Fullname as Cus_Name, a.AddressAcc as Cus_addr,
FormID,Rating,Content,SentDate
from Account a join FeedbackForm fb on a.ID = fb.CustomerID`)
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
const GET_CB_FB = async (req,res) =>
{
   const pool = await getPool();
   if(!pool)
   {
    return res.status(503).json({message:'Database Connection Error'})
   }
   try{
    const result =await pool.request().query(`select a.ID as Cus_Id, a.Email as Cus_email, a.Fullname as Cus_Name, a.AddressAcc as Cus_addr,
      Vers, Rating from Account a join FeedbackChatbot on a.ID = CustomerID`)
    if(result.recordset.length ===0)
    {
      return res.status(404).json({message:'Chatbot Feedback Not Found'})
    }
    return res.status(200).json(result.recordset)
   }
   catch(err)
   {
    console.error('Failed:',err.message)
    res.status(500).json({message: 'Internal Server Error'})
   }
}
export default {GetFB,GET_CB_FB}