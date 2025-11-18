
import express from 'express';
const router = express.Router();
import { verifyToken } from '../../middlewares/authMiddleware';
import { authorizeRole } from '../../middlewares/roleMiddleware';
import controller from '../../controllers/admin/admin_controller'
import controller_fb from '../../controllers/admin/admin_controller_fb'
import controller_classTb  from '../../controllers/admin/admin_controller_classTb'
router.get('/class_table', verifyToken, authorizeRole('Admin'), controller_classTb.getClassTb)
router.get('/forms', verifyToken, authorizeRole('Admin'), controller.get_all_forms)
router.get('/fb_form', verifyToken, authorizeRole('Admin'), controller_fb.GetFB)
export default router