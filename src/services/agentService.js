import { getPool } from "../config/db.js";
import sql from "mssql";

export const getAllChildrenRecursive = async (parentId, includeParent = false) => {
  const pool = await getPool();
  const req = pool.request();
  req.input("parentId", sql.Int, parentId);

  const q = `
    WITH cte AS (
      SELECT TableID, NameTable, ParentTableID, 0 AS depth
      FROM ClassifyTable
      WHERE TableID = @parentId
      UNION ALL
      SELECT c.TableID, c.NameTable, c.ParentTableID, cte.depth + 1
      FROM ClassifyTable c
      INNER JOIN cte ON c.ParentTableID = cte.TableID
    )
    SELECT TableID, NameTable, ParentTableID, depth
    FROM cte
    ${includeParent ? "" : "WHERE depth > 0"}
    ORDER BY depth, TableID;
  `;
  const rs = await req.query(q);
  return rs.recordset;
};

export const getAllChildrenRecursiveByParentName = async (parentName, includeParent = false) => {
  const pool = await getPool();
  const req = pool.request();
  req.input("parentName", sql.NVarChar(200), parentName);

  const q = `
    DECLARE @parentId INT =
      (SELECT TOP 1 TableID FROM ClassifyTable WHERE NameTable = @parentName AND ParentTableID IS NULL);

    IF @parentId IS NULL
      SELECT CAST(NULL AS INT) AS TableID, CAST(NULL AS NVARCHAR(200)) AS NameTable, CAST(NULL AS INT) AS ParentTableID, CAST(NULL AS INT) AS depth
    ELSE
    WITH cte AS (
      SELECT TableID, NameTable, ParentTableID, 0 AS depth
      FROM ClassifyTable WHERE TableID = @parentId
      UNION ALL
      SELECT c.TableID, c.NameTable, c.ParentTableID, cte.depth + 1
      FROM ClassifyTable c
      INNER JOIN cte ON c.ParentTableID = cte.TableID
    )
    SELECT TableID, NameTable, ParentTableID, depth
    FROM cte
    ${includeParent ? "" : "WHERE depth > 0"}
    ORDER BY depth, TableID;
  `;
  const rs = await req.query(q);
  return rs.recordset.filter(r => r.TableID !== null);
};

const randOne = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const classifyAgentsService = async () => {
  const pool = await getPool();
  const regions  = await getAllChildrenRecursiveByParentName("Phân loại theo miền", false);   
  const products = await getAllChildrenRecursiveByParentName("Sản phẩm", true);               
  const services = await getAllChildrenRecursiveByParentName("Dịch vụ hậu mãi", true);
  const policies = await getAllChildrenRecursiveByParentName("Chính sách & hỗ trợ", true);
  const customers = await getAllChildrenRecursiveByParentName("Phân loại khách hàng", false);

  const regionParents = regions
    .filter(r => regions.some(c => c.ParentTableID === r.TableID)); 

 
  const cityToRegion = regions
    .filter(c => !regions.some(x => x.ParentTableID === c.TableID))
    .map(c => {
      const parent = regionParents.find(p => p.TableID === c.ParentTableID);
      return { CityName: c.NameTable, RegionID: parent?.TableID, RegionName: parent?.NameTable };
    })
    .filter(x => x.RegionID);


  const agents = (await pool.request().query(`
    SELECT a.AgentID, acc.AddressAcc, a.ResponsibleField
    FROM Agent a
    JOIN Account acc ON a.AgentID = acc.ID
  `)).recordset;

  for (const ag of agents) {
    const tableIDs = [];

  
    const hit = cityToRegion.find(m => ag.AddressAcc?.includes(m.CityName));
    if (hit?.RegionID) tableIDs.push(hit.RegionID);

    // Phân lĩnh vực
    const f = (ag.ResponsibleField || "").toLowerCase();
    if (f.includes("sản phẩm")) tableIDs.push(...products.map(t => t.TableID));
    else if (f.includes("dịch vụ")) tableIDs.push(...services.map(t => t.TableID));
    else if (f.includes("chính sách") || f.includes("hỗ trợ")) tableIDs.push(...policies.map(t => t.TableID));

    // Khách hàng ngẫu nhiên
    if (customers.length) tableIDs.push(randOne(customers).TableID);

    // Ghi Assign
    const uniq = [...new Set(tableIDs)];
    for (const tid of uniq) {
      await pool.request()
        .input("AgentID", ag.AgentID)
        .input("TableID", tid)
        .query(`
          IF NOT EXISTS (SELECT 1 FROM Assign WHERE AgentID=@AgentID AND TableID=@TableID)
          INSERT INTO Assign(AgentID, TableID) VALUES(@AgentID, @TableID);
        `);
    }
  }

  return { message: "Phân loại nhân viên thành công", totalAgents: agents.length };
};


export const replyAssignedFormService = async (agentId, formId, resContent) => {
  const pool = await getPool();

  if (!formId || !resContent) {
    throw new Error("Thiếu formId hoặc nội dung trả lời (resContent).");
  }

  // 1️⃣ Kiểm tra form có được gán cho agent và chưa trả lời
  const assigned = (await pool.request()
    .input("formId", formId)
    .input("agentId", agentId)
    .query(`
      SELECT * 
      FROM ReceiveForm 
      WHERE FormID = @formId 
        AND AgentID = @agentId
        AND (resContent IS NULL OR LTRIM(RTRIM(resContent)) = '')
    `)).recordset[0];

  if (!assigned) {
    throw new Error("Form này đã được trả lời hoặc không được gán cho bạn.");
  }

  // 2️⃣ Cập nhật nội dung trả lời
  const result = await pool.request()
    .input("formId", formId)
    .input("resContent", resContent)
    .query(`
      UPDATE ReceiveForm 
      SET resContent = @resContent 
      WHERE FormID = @formId
    `);

  if (result.rowsAffected[0] === 0) {
    throw new Error("Không thể cập nhật nội dung form.");
  }

  // 3️⃣ Cập nhật trạng thái Form sau khi trả lời
  await pool.request()
    .input("formId", formId)
    .query(`
      UPDATE Form 
      SET Stt = N'Đã trả lời'
      WHERE FormID = @formId
    `);

  return {
    message: "Form đã được trả lời thành công.",
    formId,
    agentId,
    resContent,
  };
};