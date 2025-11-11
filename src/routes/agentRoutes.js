import express from 'express';
import { classifyAgents} from '../controllers/agentController.js';
import { verifyToken } from "../middlewares/authMiddleware.js";
import { authorizeRole } from "../middlewares/roleMiddleware.js";

const router = express.Router();


router.post("/", verifyToken, authorizeRole("Admin"), classifyAgents);


export default router;
