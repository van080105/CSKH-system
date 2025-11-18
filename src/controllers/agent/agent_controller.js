const sql = require('mssql')
const { getPool } = require('../../config/database.js')
const fs = require('fs')
const get_form = async (req, res) =>
{
  try {
    const agentID = req.user.id;
    if (!agentID)
    {
      return res.status(400).json({message:'AgentID is missing'})
    }
    const pool = await getPool();
    const result = await pool.request()
      .input('AgentID',sql.Int,agentID)
      .query('select * from ReceiveForm r join Form f on r.FormID = f.FormID where r.AgentID = @AgentID')
    if (result.recordset.length === 0)
    {
      return res.status(404).json({message:'Agent not found'})
    }
    return res.json(result.recordset)
  }
  catch (err)
  {
    console.error('Error in get_form controller:', err.message);
    return res.status(500).json({ message:'Internal Server Error' })}
}


export default {get_form}