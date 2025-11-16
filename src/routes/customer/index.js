/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import express from 'express';
const router = express.Router();
import { verifyToken } from '../../middlewares/authMiddleware';
import { authorizeRole } from '../../middlewares/roleMiddleware';
import controller_form from '../../controllers/customer/customer_controller';
import controller_order from '../../controllers/customer/customer_controller_order';
import controller_fb_form from '../../controllers/customer/customer_controller_fb';
router.get('/form', verifyToken, authorizeRole('Customer'), controller_form.get_form);
router.post('/form', verifyToken, authorizeRole('Customer'), controller_form.post_form);
router.get('/order',verifyToken,authorizeRole('Customer'),controller_order.get_order);
router.post('/order',verifyToken,authorizeRole('Customer'),controller_order.post_order);
router.post('/feedbackform/:formId',verifyToken,authorizeRole('Customer'),controller_fb_form.MakeFBform);
router.post('/chatbotfb',verifyToken,authorizeRole('Customer'),controller_fb_form.MakeChatbotFB)
export default router;