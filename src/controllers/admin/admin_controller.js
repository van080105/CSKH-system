import { getPool } from '../../config/database.js';
import fs from 'fs';
import sql from 'mssql';
const get_all_forms = async (req, res) => {
  try {
    const pool = await getPool(); // cần await

    if (!pool) {
      return res.status(503).json({ message: 'Database service unavailable.' });
    }

    const result = await pool.request().query(`select a.ID as Agent_ID,a.Email as Agent_email, a.Fullname as Agent_name, a.AddressAcc as Agent_addr,
f.FormID,Title,Content,Stt,Typ,SentDate,
b.ID as Cus_ID,b.Email as Cus_email, b.Fullname as Cus_name,b.AddressAcc as Cus_addr
from Account a join ReceiveForm r on a.ID = r.AgentID 
join Form f on f.FormID = r.FormID join CustomerCreate cc on cc.FormID = r.FormID
join Account b on cc.CustomerID = b.ID`);

    return res.status(200).json(result.recordset);
  } catch (error) {
    console.error('Error retrieving forms:', error.message);
    return res.status(500).json({ message: 'Error retrieving forms', error: error.message });
  }
};

export default { get_all_forms };