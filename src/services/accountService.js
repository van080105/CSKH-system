import { getPool } from "../config/db.js";  // Kết nối với DB

// Lấy tất cả tài khoản (Admin chỉ có quyền này)
export const updateAccountByAdminService = async (data) => {
  const { id, fullname, email, password, address, privilege, stt, responsibleField, membership } = data;
  const pool = await getPool();

  // Kiểm tra tồn tại tài khoản
  const acc = (await pool.request().input("id", id)
    .query("SELECT * FROM Account WHERE ID=@id")).recordset[0];
  if (!acc) throw new Error("Không tìm thấy tài khoản.");

  //Xác định role của tài khoản
  const isAdmin = (await pool.request().input("id", id)
    .query("SELECT 1 FROM Admin WHERE AdminID=@id")).recordset.length > 0;
  const isAgent = (await pool.request().input("id", id)
    .query("SELECT 1 FROM Agent WHERE AgentID=@id")).recordset.length > 0;
  const isCustomer = (await pool.request().input("id", id)
    .query("SELECT 1 FROM Customer WHERE CustomerID=@id")).recordset.length > 0;

  const transaction = pool.transaction();
  await transaction.begin();

  try {
    //Cập nhật bảng Account (chung)
    const reqAcc = transaction.request();
    reqAcc.input("id", id)
      .input("fullname", fullname || acc.Fullname)
      .input("email", email || acc.Email)
      .input("password", password || acc.PasswordAcc)
      .input("address", address || acc.AddressAcc);

    await reqAcc.query(`
      UPDATE Account
      SET 
        Fullname = @fullname,
        Email = @email,
        PasswordAcc = @password,
        AddressAcc = @address
      WHERE ID = @id
    `);

    //ADMIN: cập nhật bảng Admin, kiểm tra privilege hợp lệ
   
const oldPriv = (await transaction.request()
  .input("id", id)
  .query("SELECT Privilege FROM Admin WHERE AdminID=@id"))
  .recordset[0]?.Privilege;

let newPrivilege = oldPriv;

//Chỉ khi có privilege mới (không null/undefined/rỗng) thì cập nhật
if (privilege && privilege.trim() !== "") {
  const valid = (await transaction.request()
    .input("priv", privilege)
    .query("SELECT 1 FROM Admin WHERE Privilege=@priv"))
    .recordset.length > 0;

  if (!valid)
    throw new Error("Privilege không hợp lệ — phải trùng với quyền đã có trong DB.");

  newPrivilege = privilege;
}

await transaction.request()
  .input("id", id)
  .input("priv", newPrivilege)
  .query("UPDATE Admin SET Privilege=@priv WHERE AdminID=@id");


    //AGENT: cập nhật bảng Agent, không đổi receiverID, kiểm tra ResponsibleField hợp lệ
    if (isAgent) {
      const agentOld = (await transaction.request().input("id", id)
        .query("SELECT ReceiverID, ResponsibleField, Stt FROM Agent WHERE AgentID=@id"))
        .recordset[0];

      let newResponsible = responsibleField || agentOld.ResponsibleField;

      if (responsibleField) {
        const valid = (await transaction.request()
          .input("field", responsibleField)
          .query("SELECT 1 FROM Agent WHERE ResponsibleField=@field")).recordset.length > 0;
        if (!valid)
          throw new Error("ResponsibleField không hợp lệ — phải trùng với field đã có trong DB.");
      }

      await transaction.request()
        .input("id", id)
        .input("responsibleField", newResponsible)
        .input("stt", stt || agentOld.Stt) 
        .query(`
          UPDATE Agent
          SET ResponsibleField=@responsibleField, Stt=@stt
          WHERE AgentID=@id
        `);
    }

    //CUSTOMER: cập nhật Membership (nếu có)
    if (isCustomer) {
      const oldMembership = (await transaction.request().input("id", id)
        .query("SELECT Membership FROM Customer WHERE CustomerID=@id")).recordset[0]?.Membership;

      await transaction.request()
        .input("id", id)
        .input("membership", membership || oldMembership)
        .query(`
          UPDATE Customer
          SET Membership=@membership
          WHERE CustomerID=@id
        `);
    }

    await transaction.commit();
    return { message: "Cập nhật tài khoản thành công.", id };
  } catch (err) {
    await transaction.rollback();
    throw new Error("Cập nhật thất bại: " + err.message);
  }
};

export const updateMyAccountService = async (userId, role, body) => {
  const { fullname, address, email, id } = body;
  const pool = await getPool();

  if (!["Customer", "Agent"].includes(role))
    throw new Error("Chỉ Customer hoặc Agent mới có thể cập nhật tài khoản của mình.");

  if (id || email)
    throw new Error("Không được phép cập nhật ID hoặc Email.");

  const acc = (await pool.request()
    .input("id", userId)
    .query("SELECT * FROM Account WHERE ID=@id")
  ).recordset[0];

  if (!acc)
    throw new Error("Không tìm thấy tài khoản.");

  await pool.request()
    .input("id", userId)
    .input("fullname", fullname || acc.Fullname)
    .input("address", address || acc.AddressAcc)
    .query(`
      UPDATE Account
      SET 
        Fullname = @fullname,
        AddressAcc = @address
      WHERE ID = @id
    `);

  return { message: "Cập nhật tài khoản thành công.", id: userId };
};

export const deleteAccountService = async (id) => {
  const pool = await getPool();
  if (!id) throw new Error(" Thiếu ID tài khoản cần xóa.");


  const check = await pool.request()
    .input("id", id)
    .query("SELECT * FROM Account WHERE ID=@id");
  if (check.recordset.length === 0)
    throw new Error(" Không tìm thấy tài khoản.");

  const isCustomer = (await pool.request().input("id", id)
    .query("SELECT 1 FROM Customer WHERE CustomerID=@id")).recordset.length > 0;
  const isAgent = (await pool.request().input("id", id)
    .query("SELECT 1 FROM Agent WHERE AgentID=@id")).recordset.length > 0;
  const isAdmin = (await pool.request().input("id", id)
    .query("SELECT 1 FROM Admin WHERE AdminID=@id")).recordset.length > 0;

  const transaction = pool.transaction();
  await transaction.begin();

  try {
    if (isCustomer) {
      const req = transaction.request();
      req.input("id", id);
      await req.query(`
        DELETE FROM FeedbackForm WHERE CustomerID=@id;
        DELETE FROM CustomerSend WHERE CustomerID=@id;
        DELETE FROM CustomerCreate WHERE CustomerID=@id;
        DELETE FROM FeedbackChatbot WHERE CustomerID=@id;
        DELETE FROM Orders WHERE CustomerID=@id;
        DELETE FROM Customer WHERE CustomerID=@id;
      `);
    }

    if (isAgent) {
      const receiverRow = await transaction.request()
        .input("id", id)
        .query("SELECT ReceiverID FROM Agent WHERE AgentID=@id");
      const receiverID = receiverRow.recordset[0]?.ReceiverID;

      const reqA = transaction.request();
      reqA.input("id", id);
      await reqA.query(`
        DELETE FROM ReceiveForm WHERE AgentID=@id;
        DELETE FROM Assign WHERE AgentID=@id;
        DELETE FROM Agent WHERE AgentID=@id;
      `);

      if (receiverID) {
        const reqR = transaction.request();
        reqR.input("receiver", receiverID);
        await reqR.query(`
          DELETE FROM Chatbot WHERE ReceiverID=@receiver;
          DELETE FROM Message1 WHERE ReceiverID=@receiver;
          DELETE FROM Receiver WHERE ReceiverID=@receiver;
        `);
      }
    }

    if (isAdmin) {
      const req = transaction.request();
      req.input("id", id);
      await req.query(`DELETE FROM Admin WHERE AdminID=@id`);
    }

    const reqAcc = transaction.request();
    reqAcc.input("id", id);
    await reqAcc.query("DELETE FROM Account WHERE ID=@id");

    await transaction.commit();
    return { message: "Đã xóa tài khoản thành công.", id };
  } catch (err) {
    await transaction.rollback();
    throw new Error("Xóa tài khoản thất bại: " + err.message);
  }
};

export const getAccountService = async (userId, role) => {
  const pool = await getPool();

  //  Lấy thông tin cơ bản trong bảng Account
  const acc = (await pool.request()
    .input("id", userId)
    .query("SELECT ID, Email, Fullname, AddressAcc FROM Account WHERE ID=@id")
  ).recordset[0];

  if (!acc) throw new Error("Không tìm thấy tài khoản.");

  let extraInfo = {};

  // Thông tin chi tiết theo role
  if (role === "Admin") {
    const admin = (await pool.request()
      .input("id", userId)
      .query("SELECT Privilege FROM Admin WHERE AdminID=@id")
    ).recordset[0];

    extraInfo = admin ? { Role: "Admin", Privilege: admin.Privilege } : { Role: "Admin" };
  }

  else if (role === "Agent") {
    const agent = (await pool.request()
      .input("id", userId)
      .query("SELECT ReceiverID, Stt, ResponsibleField FROM Agent WHERE AgentID=@id")
    ).recordset[0];

    extraInfo = agent
      ? { Role: "Agent", ReceiverID: agent.ReceiverID, Status: agent.Stt, ResponsibleField: agent.ResponsibleField }
      : { Role: "Agent" };
  }

  else if (role === "Customer") {
    const customer = (await pool.request()
      .input("id", userId)
      .query("SELECT Membership FROM Customer WHERE CustomerID=@id")
    ).recordset[0];

    extraInfo = customer
      ? { Role: "Customer", Membership: customer.Membership }
      : { Role: "Customer" };
  }

  return {
    ...acc,
    ...extraInfo,
  };
};

export const getManageService = async (userId, role) => {
  const pool = await getPool();

  // ADMIN: xem tất cả tài khoản (trừ chính mình)
  if (role === "Admin") {
    const accounts = (await pool.request()
      .input("id", userId)
      .query(`
        SELECT 
          acc.ID,
          acc.Email,
          acc.Fullname,
          acc.AddressAcc,
          CASE
            WHEN ag.AgentID IS NOT NULL THEN N'Agent'
            WHEN cu.CustomerID IS NOT NULL THEN N'Customer'
            WHEN ad.AdminID IS NOT NULL THEN N'Admin'
            ELSE N'Unknown'
          END AS Role,
          ag.ReceiverID,
          ag.Stt AS AgentStatus,
          ag.ResponsibleField,
          cu.Membership,
          ad.Privilege
        FROM Account acc
        LEFT JOIN Agent ag ON acc.ID = ag.AgentID
        LEFT JOIN Customer cu ON acc.ID = cu.CustomerID
        LEFT JOIN Admin ad ON acc.ID = ad.AdminID
        WHERE acc.ID <> @id
        ORDER BY acc.ID
      `)
    ).recordset;

    return {
      Role: "Admin",
      Total: accounts.length,
      Accounts: accounts
    };
  }

  //AGENT: xem tất cả khách hàng có form được gán cho mình (trừ bản thân)
  if (role === "Agent") {
    const customers = (await pool.request()
      .input("id", userId)
      .query(`
        SELECT DISTINCT 
          cu.CustomerID,
          acc.Fullname AS CustomerName,
          acc.Email AS CustomerEmail,
          acc.AddressAcc,
          cu.Membership
        FROM ReceiveForm rf
        JOIN CustomerCreate cc ON rf.FormID = cc.FormID
        JOIN Customer cu ON cc.CustomerID = cu.CustomerID
        JOIN Account acc ON cu.CustomerID = acc.ID
        WHERE rf.AgentID = @id AND cu.CustomerID <> @id
        ORDER BY cu.CustomerID
      `)
    ).recordset;

    return {
      Role: "Agent",
      Total: customers.length,
      Customers: customers
    };
  }

  throw new Error(" Vai trò không được phép truy cập.");
};
export const getAccountByIdService = async (id) => {
  const pool = await getPool();

  if (!id) throw new Error("Thiếu ID tài khoản.");

  const result = await pool.request()
    .input("id", id)
    .query(`
      SELECT 
        ID, 
        Email, 
        Fullname, 
        AddressAcc,
        PasswordAcc
      FROM Account 
      WHERE ID = @id
    `);

  if (result.recordset.length === 0)
    throw new Error("Không tìm thấy tài khoản với ID này.");

  return result.recordset[0];
};