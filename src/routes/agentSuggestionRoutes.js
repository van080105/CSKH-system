import express from "express";
import { agentQuickReply } from "../controllers/agentSuggestioncontroller.js";

const router = express.Router();

router.post("/agent/quick-reply", agentQuickReply);

export default router;
