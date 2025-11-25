
import express from 'express';
const router = express.Router();
import { verifyToken } from '../../middlewares/authMiddleware';
import { authorizeRole } from '../../middlewares/roleMiddleware';
import controller_form from '../../controllers/agent/agent_controller';

import controller_order from '../../controllers/agent/agent_controller_order';
router.get('/form', verifyToken, authorizeRole('Agent'), controller_form.get_form)
router.put('/order/update/:orderId', verifyToken, authorizeRole('Agent'), controller_order.update_order)
export default router;