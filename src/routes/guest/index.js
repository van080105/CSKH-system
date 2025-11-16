
import express from 'express';
import { verifyToken } from '../../middlewares/authMiddleware';
import { authorizeRole } from '../../middlewares/roleMiddleware';
import controller from '../../controllers/guest/guest_controller';
const router = express.Router();
router.post('/make_form', verifyToken, authorizeRole('Guest'), controller.post_form);
export default router;