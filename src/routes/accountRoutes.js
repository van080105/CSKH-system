import express from 'express';
import { putAllAccounts, getManage, updateAccount, deleteAccount, getAccount } from '../controllers/accountController.js';
import { verifyToken } from "../middlewares/authMiddleware.js";
import { authorizeRole } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.put('/', verifyToken, authorizeRole('Admin'), putAllAccounts);

router.put('/my', verifyToken, authorizeRole('Customer', 'Agent'), updateAccount);

router.delete('/', verifyToken, authorizeRole('Admin'), deleteAccount);

router.get('/my', verifyToken, authorizeRole('Agent', 'Customer', 'Admin'), getAccount);

router.get('/manage', verifyToken, authorizeRole('Agent', 'Admin'), getManage);

export default router;
