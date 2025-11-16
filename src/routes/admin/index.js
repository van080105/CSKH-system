
import express from 'express';
const router = express.Router();
import { verifyToken } from '../../middlewares/authMiddleware';
import { authorizeRole } from '../../middlewares/roleMiddleware';
const controller = require('../../controllers/admin/admin_controllers')
const controller_fb = require('../../controllers/admin/admin_controller_fb')
router.get('/forms', verifyToken, authorizeRole('Admin'), controller.get_all_forms)
router.get('/fb_form', verifyToken, authorizeRole('Admin'), controller_fb.GetFB)
module.exports = router