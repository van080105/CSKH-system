
import jwt from "jsonwebtoken";
import { getPool } from "../config/db.js";

const getNextReceiverID = async (pool) => {
  const result = await pool.request().query(`
    SELECT MAX(CAST(SUBSTRING(ReceiverID, 2, 10) AS INT)) AS maxN
    FROM Receiver
  `);

  if (result.recordset.length === 0) return "R0"; // Nếu chưa có receiver nào

  const maxN = result.recordset[0].maxN || 0;
  const num = maxN + 1;
  return `R${num}`; 
};

export const registerService = async (fullname, email, password, address, role, privilege, responsibleField) => {
  const pool = await getPool();

  //Kiểm tra trùng email
  const check = await pool.request()
    .input("email", email)
    .query("SELECT 1 FROM Account WHERE Email = @email");
  if (check.recordset.length > 0)
    throw new Error("Email đã tồn tại trong hệ thống.");

  //Kiểm tra role
  if (!["Admin", "Agent", "Customer"].includes(role))
    throw new Error("Vai trò không hợp lệ. Chỉ chấp nhận Admin, Agent hoặc Customer.");

  const maxId = await pool.request().query("SELECT ISNULL(MAX(ID),0)+1 AS NewID FROM Account");
  const newId = maxId.recordset[0].NewID;

  //  Kiểm tra hợp lệ theo từng role
  if (role === "Admin") {
    if (!privilege)
      throw new Error("Thiếu trường 'privilege' cho tài khoản Admin.");

    // Kiểm tra privilege hợp lệ
    const privilegeCheck = await pool.request()
      .input("privilege", privilege)
      .query("SELECT 1 FROM Admin WHERE Privilege = @privilege");
    if (privilegeCheck.recordset.length === 0)
      throw new Error("Privilege không hợp lệ. ");

    // Khi hợp lệ → tạo account và admin
    await pool.request()
      .input("id", newId)
      .input("password", password)
      .input("email", email)
      .input("fullname", fullname)
      .input("address", address)
      .query(`
        INSERT INTO Account (ID, PasswordAcc, Email, Fullname, AddressAcc)
        VALUES (@id, @password, @email, @fullname, @address)
      `);

    await pool.request()
      .input("id", newId)
      .input("privilege", privilege)
      .query("INSERT INTO Admin (AdminID, Privilege) VALUES (@id, @privilege)");

    return { message: "Đăng ký Admin thành công", newId, privilege };
  }

  else if (role === "Agent") {
    if (!responsibleField)
      throw new Error(" Thiếu trường 'responsibleField' cho tài khoản Agent.");

    // Kiểm tra responsibleField hợp lệ
    const fieldCheck = await pool.request()
      .input("field", responsibleField)
      .query("SELECT 1 FROM Agent WHERE ResponsibleField = @field");
    if (fieldCheck.recordset.length === 0)
      throw new Error(" ResponsibleField không hợp lệ.");

    // Khi hợp lệ → tạo account và agent
    const newReceiverID = await getNextReceiverID(pool);
    
    await pool.request()
      .input("id", newId)
      .input("password", password)
      .input("email", email)
      .input("fullname", fullname)
      .input("address", address)
      .query(`
        INSERT INTO Account (ID, PasswordAcc, Email, Fullname, AddressAcc)
        VALUES (@id, @password, @email, @fullname, @address)
      `);
    await pool.request()
      .input("receiver", newReceiverID)
      .query("INSERT INTO Receiver (ReceiverID) VALUES (@receiver)");
    await pool.request()
      .input("id", newId)
      .input("receiver", newReceiverID)
      .input("status", "Đang hoạt động")
      .input("field", responsibleField)
      .query(`
        INSERT INTO Agent (AgentID, ReceiverID, Stt, ResponsibleField)
        VALUES (@id, @receiver, @status, @field)
      `);

    return { message: "Đăng ký Agent thành công", newId, responsibleField, receiverID: newReceiverID };
  }

  else if (role === "Customer") {
    await pool.request()
      .input("id", newId)
      .input("password", password)
      .input("email", email)
      .input("fullname", fullname)
      .input("address", address)
      .query(`
        INSERT INTO Account (ID, PasswordAcc, Email, Fullname, AddressAcc)
        VALUES (@id, @password, @email, @fullname, @address)
      `);

    await pool.request()
      .input("id", newId)
      .input("membership", "Đồng")
      .query("INSERT INTO Customer (CustomerID, Membership) VALUES (@id, @membership)");

    return { message: "Đăng ký Customer thành công", newId, membership: "Đồng" };
  }
};


export const loginService = async (email, password) => {
  const pool = await getPool();
  const result = await pool.request().query(`SELECT * FROM Account WHERE Email = N'${email}'`);
  const user = result.recordset[0];
  if (!user) throw new Error("Email không tồn tại!");

  // Kiểm tra mật khẩu
  if (user.PasswordAcc !== password) throw new Error("Sai mật khẩu!");

  // Kiểm tra role
  let role = "Customer";
  const adminCheck = await pool.request().query(`SELECT * FROM Admin WHERE AdminID = ${user.ID}`);
  if (adminCheck.recordset.length > 0) {
    role = "Admin"; 
  } else {
    const agentCheck = await pool.request().query(`SELECT * FROM Agent WHERE AgentID = ${user.ID}`);
    if (agentCheck.recordset.length > 0) {
      role = "Agent"; 
    }
  }

  
  const token = jwt.sign(
    { id: user.ID, email: user.Email, role: role },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );

  return {
    message: "Đăng nhập thành công",
    token: token,
    user: {
      id: user.ID,
      email: user.Email,
      fullname: user.Fullname,
      role: role 
    }
  };
};




export const forgotPasswordService = async (email, id) => {
  const pool = await getPool();
  
  //Kiểm tra tài khoản có tồn tại không
  const result = await pool.request().query(`SELECT * FROM Account WHERE Email = N'${email}' AND ID = ${id}`);
  const user = result.recordset[0];
  if (!user) throw new Error("Không tìm thấy tài khoản với email và ID này!");

  //Trả lại mật khẩu
  return { message: "Mật khẩu của bạn là: " + user.PasswordAcc };
};

export const changePasswordService = async (email, id, oldPassword, newPassword) => {
  const pool = await getPool();

  //Kiểm tra tài khoản có tồn tại không
  const result = await pool.request().query(`SELECT * FROM Account WHERE Email = N'${email}' AND ID = ${id}`);
  const user = result.recordset[0];
  if (!user) throw new Error("Không tìm thấy tài khoản với email và ID này!");

  //Kiểm tra mật khẩu cũ có đúng không
  if (user.PasswordAcc !== oldPassword) throw new Error("Mật khẩu cũ không đúng!");

  //Cập nhật mật khẩu mới
  await pool.request().query(`
    UPDATE Account 
    SET PasswordAcc = N'${newPassword}'
    WHERE ID = ${id}
  `);

  return { message: "Mật khẩu đã được thay đổi thành công" };
};



export const logoutService = async (token) => {
  if (!token) {
    throw new Error("Không tìm thấy token để đăng xuất.");
  }
  global.tokenBlacklist = global.tokenBlacklist || new Set();
  global.tokenBlacklist.add(token);

  return { message: "Đăng xuất thành công." };
};


