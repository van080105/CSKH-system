import { getPool } from '../../config/db.js';
import fs from 'fs';
import sql from 'mssql';
const get_all_forms = async (req, res) => {
  try {
    const pool = await getPool(); // cần await

    if (!pool) {
      return res.status(503).json({ message: 'Database service unavailable.' });
    }

    const result = await pool.request().query(`SELECT 
    a.ID AS Agent_ID,
    a.Email AS Agent_email,
    a.Fullname AS Agent_name,
    a.AddressAcc AS Agent_addr,

    f.FormID,
    f.Title,
    f.Content,
    f.Stt,
    f.Typ,
    f.SentDate,

    -- Gộp Customer + Guest thành 1 cột
    COALESCE(b.Fullname, g.Fullname) AS Cus_name,
    COALESCE(b.Email, g.Email) AS Cus_email,

   
    b.ID AS Cus_ID,
    b.AddressAcc AS Cus_addr
 

FROM Account a 
JOIN ReceiveForm r ON a.ID = r.AgentID 
JOIN Form f ON f.FormID = r.FormID 
LEFT JOIN CustomerCreate cc ON cc.FormID = f.FormID
LEFT JOIN Account b ON cc.CustomerID = b.ID
LEFT JOIN GuestCreate gc ON gc.FormID = f.FormID
LEFT JOIN Guest g ON g.ID0 = gc.ID0`);

    return res.status(200).json(result.recordset);
  } catch (error) {
    console.error('Error retrieving forms:', error.message);
    return res.status(500).json({ message: 'Error retrieving forms', error: error.message });
  }
};

export default { get_all_forms };
