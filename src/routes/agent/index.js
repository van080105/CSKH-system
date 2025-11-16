
import express from 'express';
const router = express.Router();
import { verifyToken } from '../../middlewares/authMiddleware';
import { authorizeRole } from '../../middlewares/roleMiddleware';
import controller_form from '../../controllers/agent/agent_controller';
import controller_table from '../../controllers/agent/agent_table';
import controller_order from '../../controllers/agent/agent_controller_order';
router.get('/form', verifyToken, authorizeRole('Agent'), controller_form.get_form)
router.post('/table/create', verifyToken, authorizeRole('Agent'), controller_table.CreateTable)
router.put('/table/update/:table', verifyToken, authorizeRole('Agent'), controller_table.UpdateTable)
router.delete('/table/delete/:table', verifyToken, authorizeRole('Agent'), controller_table.DeleteTable)
router.put('/order/update/:orderId', verifyToken, authorizeRole('Agent'), controller_order.update_order)
export default router;