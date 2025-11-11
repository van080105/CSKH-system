import {
  updateAccountByAdminService,
  updateMyAccountService,
  deleteAccountService,
  getAccountService,
  getManageService,
  getAccountByIdService
} from '../services/accountService.js'; 

export const putAllAccounts = async (req, res) => {
  const { id, fullname, email, password, address, privilege, stt, responsibleField, membership } = req.body;
  const { role } = req.user; 

  try {
    if (role !== "Admin")
      return res.status(403).json({ error: "Chỉ Admin mới có quyền cập nhật tài khoản." });

    if (!id)
      return res.status(400).json({ error: "Thiếu ID tài khoản cần cập nhật." });

    const result = await updateAccountByAdminService({
      id,
      fullname,
      email,
      password,
      address,
      privilege,
      stt,
      responsibleField,
      membership
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const updateAccount = async (req, res) => {
  try {
    const userId = req.user.id; 
    const role = req.user.role;
    const result = await updateMyAccountService(userId, role, req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const { id } = req.body;
    const result = await deleteAccountService(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAccount = async (req, res) => {
  try {
    const userId = req.user.id;   
    const role = req.user.role;   
    const result = await getAccountService(userId, role);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getManage = async (req, res) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;
    const result = await getManageService(userId, role);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


