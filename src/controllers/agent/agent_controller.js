const sql = require('mssql')
const { getPool } = require('../../config/db.js')
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
      .query(`select * from ReceiveForm r join Form f on r.FormID = f.FormID where r.AgentID = @AgentID and f.Stt != N'Đang xử lý'`)
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
const escalate_form = async (req, res) => {
  try {
    console.log(req.body)
    const { FormID } = req.body;
    console.log(FormID)
    // Validate FormID
    if (!FormID || isNaN(parseInt(FormID))) {
      return res.status(400).json({ message: "FormID is missing or invalid" });
    }

    const pool = await getPool();
    if (!pool) {
      return res.status(503).json({ message: 'Database Connection Error' });
    }

    // Kiểm tra form có tồn tại
    const check = await pool.request()
      .input('FormID', sql.Int, FormID)
      .query(`
        SELECT FormID FROM Form WHERE FormID = @FormID
      `);

    if (check.recordset.length === 0) {
      return res.status(404).json({ message: "Form not found" });
    }

    // Update trạng thái
    await pool.request()
      .input('FormID', sql.Int, FormID)
      .query(`
        UPDATE Form
        SET Stt = N'Đang xử lý'
        WHERE FormID = @FormID
      `);
    // await pool.request()
    //   .input('FormID', sql.Int, FormID)
    //   .query(`
    //     DELETE FROM ReceiveForm
    //     WHERE FormID = @FormID
    //   `);

    return res.status(200).json({ message: 'Đã thay đổi trạng thái thành công' });

  } catch (err) {
    console.error('Error in escalate_form controller:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};


export default {get_form,escalate_form}
