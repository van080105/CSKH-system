import bcrypt from "bcrypt";
import { registerService, loginService, forgotPasswordService, changePasswordService } from "../services/authService.js";

export const register = async (req, res) => {
  try {
    const { fullname, email, password, address, role, privilege, responsibleField } = req.body;
    const result = await registerService(fullname, email, password, address, role, privilege, responsibleField);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await loginService(email, password);
    res.json(result);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
export const forgotPassword = async (req, res) => {
  try {
    const { email, id } = req.body;
    const result = await forgotPasswordService(email, id);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const changePassword = async (req, res) => {
  try {
    const { email, id, oldPassword, newPassword } = req.body;
    const result = await changePasswordService(email, id, oldPassword, newPassword);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


