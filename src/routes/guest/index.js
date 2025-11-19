
import express from 'express';
import controller from '../../controllers/guest/guest_controller';
const router = express.Router();
router.post('/make_FB_form', controller.post_FB_form);
router.post('/make_form',controller.post_form)
export default router;