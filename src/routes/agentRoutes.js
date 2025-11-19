import express from 'express';
import { classifyAgents, replyAssignedForm,  agentSuggest } from '../controllers/agentController.js';
import { verifyToken } from "../middlewares/authMiddleware.js";
import { authorizeRole } from "../middlewares/roleMiddleware.js";

const router = express.Router();


router.post("/classify", verifyToken, authorizeRole("Admin"), classifyAgents);
router.put('/reply', verifyToken, authorizeRole('Agent'), replyAssignedForm);
router.post("/agent/suggest", agentSuggest);

export default router;
