import express from "express";
import { chooseBestAgent } from "../services/agentSelector.js";
import { createSession, attachAgent } from "../services/sessionManager.js";
import { classifyTopicFromMessage } from "../services/topicClassifier.js";

const router = express.Router();

router.post("/request-agent", async (req, res) => {
  try {
    const { sessionId, question } = req.body;

    if (!sessionId || !question)
      return res.status(400).json({ error: "sessionId & question required" });

    createSession(sessionId);

    // Phân loại topic
    const topicIds = await classifyTopicFromMessage(question);
    if (!topicIds || topicIds.length === 0) {
      return res.status(400).json({ 
        error: "Không xác định được chủ đề câu hỏi" 
      });
    }
    // Chọn agent tốt nhất
    const agent = await chooseBestAgent(topicIds);

    if (!agent) {
      return res.status(404).json({
        error: "Không có nhân viên phù hợp để hỗ trợ"
      });
    }

    // Gắn agent vào session
    attachAgent(sessionId, agent.id);

    return res.json({
      message: "Agent assigned successfully",
      agent
    });

  } catch (err) {
    console.error("request-agent error:", err);
    return res.status(500).json({ error: "Internal error" });
  }
});

export default router;
