
import express from 'express';
const router = express.Router();
import { verifyToken } from '../../middlewares/authMiddleware';
import { authorizeRole } from '../../middlewares/roleMiddleware';
import controller from '../../controllers/admin/admin_controller'
import controller_fb from '../../controllers/admin/admin_controller_fb'
import controller_table from '../../controllers/admin/admin_table';
router.get('/forms', verifyToken, authorizeRole('Admin'), controller.get_all_forms)
router.get('/fb_form', verifyToken, authorizeRole('Admin'), controller_fb.GetFB)
router.get('/fb_chatbot', verifyToken, authorizeRole('Admin'), controller_fb.GET_CB_FB)
router.post('/table/create', verifyToken, authorizeRole('Admin'), controller_table.CreateTable)
router.put('/table/update/:table', verifyToken, authorizeRole('Admin'), controller_table.UpdateTable)
router.delete('/table/delete/:table', verifyToken, authorizeRole('Admin'), controller_table.DeleteTable)
export default router