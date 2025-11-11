
import { getPool } from "../config/db.js";

// =====================================================
//  HÀM PHỤ TRỢ
// =====================================================
async function findRegionID(pool, address) {
  const region = (await pool.request().query(`
    SELECT c1.NameTable AS City, p.TableID AS RegionID
    FROM ClassifyTable c1
    JOIN ClassifyTable p ON c1.ParentTableID = p.TableID
    WHERE p.ParentTableID = (
      SELECT TableID FROM ClassifyTable WHERE NameTable = N'Phân loại theo miền'
    )
  `)).recordset;

  for (const r of region) {
    if (address?.includes(r.City)) return r.RegionID;
  }
  return null;
}

async function getCandidateAgents(pool, tableIDs, regionID) {
  const rs = (await pool.request()
    .query(`
      SELECT DISTINCT a.AgentID, acc.AddressAcc
      FROM Assign asg
      JOIN Agent a ON a.AgentID = asg.AgentID
      JOIN Account acc ON acc.ID = a.AgentID
      WHERE asg.TableID IN (${tableIDs.join(",")}) AND (a.Stt IS NOT NULL AND LTRIM(RTRIM(LOWER(a.Stt))) <> N'không hoạt động')
    `)).recordset;

  if (!regionID) return rs;

  const regionRows = (await pool.request().query(`
    SELECT c1.NameTable AS City, p.TableID AS RegionID
    FROM ClassifyTable c1
    JOIN ClassifyTable p ON c1.ParentTableID = p.TableID
    WHERE p.ParentTableID = (
      SELECT TableID FROM ClassifyTable WHERE NameTable = N'Phân loại theo miền'
    )
  `)).recordset;

  return rs.filter(a => a.Stt !== "Không hoạt động" && regionRows.some(r => a.AddressAcc?.includes(r.City) && r.RegionID === regionID));
}

async function pickLeastBusyAgent(pool, agents) {
  const formCounts = await Promise.all(
    agents.map(async (a) => {
      const count = (await pool.request()
        .input("id", a.AgentID)
        .query(`SELECT COUNT(*) AS cnt FROM ReceiveForm WHERE AgentID=@id`)
      ).recordset[0].cnt;
      return { AgentID: a.AgentID, cnt: count };
    })
  );
  formCounts.sort((a, b) => a.cnt - b.cnt);
  return formCounts[0]?.AgentID || null;
}

async function pickByMembership(pool, agents, membership) {
  const acRows = (await pool.request().query(`
    SELECT ag.AgentID, ct.NameTable AS CustomerType
    FROM Assign asg
    JOIN Agent ag ON ag.AgentID = asg.AgentID
    JOIN ClassifyTable ct ON ct.TableID = asg.TableID
    WHERE ct.ParentTableID = (
      SELECT TableID FROM ClassifyTable WHERE NameTable = N'Phân loại khách hàng'
    )
  `)).recordset;

  const match = acRows.filter(ac =>
    agents.some(a => a.AgentID === ac.AgentID) &&
    ac.CustomerType.toLowerCase().includes(membership?.toLowerCase())
  );

  if (match.length > 0) return match[0].AgentID;
  return null;
}

// =====================================================
// LOGIC PHÂN CÔNG THEO NGUỒN FORM
// =====================================================
async function assignCustomerForm(pool, formId, ignoreMembership = false) {
  const cus = (await pool.request()
    .input("formId", formId)
    .query(`
      SELECT c.CustomerID, acc.AddressAcc, c.Membership
      FROM CustomerCreate cc
      JOIN Customer c ON cc.CustomerID = c.CustomerID
      JOIN Account acc ON acc.ID = c.CustomerID
      WHERE cc.FormID = @formId
    `)).recordset[0];
  if (!cus) return null;

  const regionID = await findRegionID(pool, cus.AddressAcc);

  const formTableIDs = (await pool.request()
    .input("formId", formId)
    .query(`SELECT TableID FROM Classify WHERE FormID = @formId`)
  ).recordset.map(r => r.TableID);
  if (formTableIDs.length === 0) return null;

  const candidates = await getCandidateAgents(pool, formTableIDs, regionID);
  if (candidates.length === 0) return null;

  // nếu không bỏ qua membership thì kiểm tra loại KH
  let chosen = null;
  if (!ignoreMembership) {
    chosen = await pickByMembership(pool, candidates, cus.Membership);
  }

  if (!chosen) {
    chosen = await pickLeastBusyAgent(pool, candidates);
  }

  return chosen;
}

async function assignGuestForm(pool, formId) {
  const formTableIDs = (await pool.request()
    .input("formId", formId)
    .query(`SELECT TableID FROM Classify WHERE FormID = @formId`)
  ).recordset.map(r => r.TableID);
  if (formTableIDs.length === 0) return null;

  const agents = (await pool.request()
    .query(`
      SELECT DISTINCT a.AgentID
      FROM Assign asg
      JOIN Agent a ON a.AgentID = asg.AgentID
      WHERE asg.TableID IN (${formTableIDs.join(",")})  AND a.Stt <> N'Không hoạt động'
    `)).recordset;

  if (agents.length === 0) return null;
  return await pickLeastBusyAgent(pool, agents);
}

// =====================================================
// DỊCH VỤ CHÍNH
// =====================================================

export const assignAllFormsService = async () => {
  const pool = await getPool();

  const forms = (await pool.request().query(`
    SELECT f.FormID
    FROM Form f
    WHERE NOT EXISTS (SELECT 1 FROM ReceiveForm r WHERE r.FormID = f.FormID)
  `)).recordset;

  let assigned = 0;
  for (const f of forms) {
    const id = f.FormID;

    const fromCustomer = (await pool.request()
      .input("id", id)
      .query(`SELECT 1 AS ok FROM CustomerCreate WHERE FormID=@id`)
    ).recordset.length > 0;

    const fromGuest = (await pool.request()
      .input("id", id)
      .query(`SELECT 1 AS ok FROM GuestCreate WHERE FormID=@id`)
    ).recordset.length > 0;

    let chosen = null;
    if (fromCustomer) chosen = await assignCustomerForm(pool, id);
    else if (fromGuest) chosen = await assignGuestForm(pool, id);

    if (!chosen) continue;

    await pool.request()
      .input("AgentID", chosen)
      .input("FormID", id)
      .query(`INSERT INTO ReceiveForm(AgentID, FormID) VALUES(@AgentID, @FormID)`);

    assigned++;
  }

  return { message: " Đã phân công tự động", totalAssigned: assigned };
};

export const reassignFormService = async (formId, agentId, force = false) => {
  const pool = await getPool();
  const warnings = [];
  let suggestion = null;

  // Lấy agent hiện đang gán form này
  const currentAssign = (await pool.request()
    .input("fid", formId)
    .query(`SELECT AgentID FROM ReceiveForm WHERE FormID=@fid`)
  ).recordset[0];
  const currentAgentId = currentAssign?.AgentID || null;

  // Chặn nếu admin nhập lại cùng agent hiện tại
  if (currentAgentId && Number(agentId) === Number(currentAgentId)) {
    throw new Error(" Không thể gán lại cho cùng một nhân viên đang phụ trách form này.");
  }
    // Chặn nếu nhân viên được chọn đang ở trạng thái "Không hoạt động"
  const statusCheck = (await pool.request()
    .input("aid", agentId)
    .query(`SELECT Stt FROM Agent WHERE AgentID=@aid`)
  ).recordset[0];

  if (statusCheck && statusCheck.Stt === "Không hoạt động") {
    throw new Error(" Nhân viên này hiện không hoạt động, không thể nhận form.");
  }

  //  Kiểm tra form thuộc bảng nào
  const formTables = (await pool.request()
    .input("fid", formId)
    .query(`SELECT TableID FROM Classify WHERE FormID=@fid`)
  ).recordset.map(r => r.TableID);

  if (formTables.length === 0)
    throw new Error(" Form chưa có phân loại trong bảng Classify");

  //  Kiểm tra nhân viên được chọn có phụ trách TableID đó không
  const agentTables = (await pool.request()
    .input("aid", agentId)
    .query(`SELECT TableID FROM Assign WHERE AgentID=@aid`)
  ).recordset.map(r => r.TableID);

  const hasMatchingTable = agentTables.some(t => formTables.includes(t));
  if (!hasMatchingTable) {
    // Nếu không có TableID khớp → gợi ý danh sách nhân viên phù hợp
    const suitableAgents = (await pool.request()
      .query(`
        SELECT DISTINCT a.AgentID, acc.Fullname, acc.AddressAcc
        FROM Assign asg
        JOIN Agent a ON a.AgentID = asg.AgentID
        JOIN Account acc ON acc.ID = a.AgentID
        WHERE asg.TableID IN (${formTables.join(",")})
      `)).recordset;

    if (suitableAgents.length === 0)
      throw new Error("Không tìm thấy nhân viên nào phụ trách bảng trùng với form này.");

    return {
      performed: false,
      message: "Nhân viên bạn chọn không phụ trách bảng phù hợp. Đây là các nhân viên phù hợp:",
      suggestions: suitableAgents.map(a => ({
        AgentID: a.AgentID,
        Fullname: a.Fullname,
        Address: a.AddressAcc
      }))
    };
  }

  //  Xác định form đến từ Customer hay Guest
  const fromCustomer = (await pool.request()
    .input("fid", formId)
    .query(`SELECT 1 FROM CustomerCreate WHERE FormID=@fid`)
  ).recordset.length > 0;

  const fromGuest = (await pool.request()
    .input("fid", formId)
    .query(`SELECT 1 FROM GuestCreate WHERE FormID=@fid`)
  ).recordset.length > 0;

  // Tính miền của Customer (nếu có)
  let customerRegionID = null;
  if (fromCustomer) {
    const cus = (await pool.request()
      .input("fid", formId)
      .query(`
        SELECT acc.AddressAcc
        FROM CustomerCreate cc
        JOIN Customer c ON c.CustomerID = cc.CustomerID
        JOIN Account acc ON acc.ID = c.CustomerID
        WHERE cc.FormID=@fid
      `)).recordset[0];
    if (cus) {
      customerRegionID = await findRegionID(pool, cus.AddressAcc);
    }
  }

  //Tính miền của agent mà admin chọn
  let agentRegionID = null;
  {
    const acc = (await pool.request()
      .input("aid", agentId)
      .query(`SELECT AddressAcc FROM Account WHERE ID=@aid`)
    ).recordset[0];
    if (acc) {
      agentRegionID = await findRegionID(pool, acc.AddressAcc);
    }
  }

  if (fromCustomer && customerRegionID && agentRegionID && customerRegionID !== agentRegionID) {
    warnings.push("Form và nhân viên không cùng miền.");
  }

  // Tính số form để cảnh báo nếu có người ít hơn
  const getCount = async (aid) => {
    return (await pool.request()
      .input("aid", aid)
      .query(`SELECT COUNT(*) AS cnt FROM ReceiveForm WHERE AgentID=@aid`)
    ).recordset[0].cnt;
  };

  const chosenCount = await getCount(agentId);

  const candidates = (await pool.request()
    .query(`
      SELECT DISTINCT a.AgentID, acc.Fullname
      FROM Assign asg
      JOIN Agent a ON a.AgentID = asg.AgentID
      JOIN Account acc ON acc.ID = a.AgentID
      WHERE asg.TableID IN (${formTables.join(",")})
    `)).recordset;

  const formCounts = await Promise.all(
    candidates.map(async (a) => ({
      AgentID: a.AgentID,
      Fullname: a.Fullname,
      cnt: await getCount(a.AgentID)
    }))
  );

  formCounts.sort((a, b) => a.cnt - b.cnt);
  const best = formCounts[0];

  if (best && best.AgentID !== agentId && best.cnt < chosenCount) {
    suggestion = best;
    warnings.push(
      ` Có nhân viên khác (AgentID=${best.AgentID}, ${best.Fullname}) phù hợp và có ít form hơn (${best.cnt} < ${chosenCount}).`
    );
  }

  // Nếu có cảnh báo và chưa force → trả cảnh báo, chưa gán
  if (warnings.length > 0 && !force) {
    return {
      performed: false,
      warnings,
      suggestion,
      selectedAgent: agentId,
      currentAgent: currentAgentId,
      message: " Có cảnh báo. Dùng force=true để ép gán form."
    };
  }

  //  Xóa gán cũ và gán mới
  await pool.request().input("FormID", formId)
    .query(`DELETE FROM ReceiveForm WHERE FormID=@FormID`);

  await pool.request()
    .input("AgentID", agentId)
    .input("FormID", formId)
    .query(`INSERT INTO ReceiveForm(AgentID, FormID) VALUES(@AgentID, @FormID)`);

  return {
    performed: true,
    warnings,
    suggestion,
    selectedAgent: agentId,
    previousAgent: currentAgentId,
    message: "Form đã được gán thành công.",
  };
};
