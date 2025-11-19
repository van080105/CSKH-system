
import { ragAnswer } from "../rag/ragCore.js";
import { classifyTopicFromMessage } from "../services/topicClassifier.js";
import { chooseBestAgent } from "../services/agentSelector.js";


export async function chatController(req, res) {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "message is required" });

    const answer = await ragAnswer(message);

    const wantHuman =
        message.toLowerCase().includes("nhân viên") ||
        message.toLowerCase().includes("hỗ trợ trực tiếp");

    let agent = null;

    if (wantHuman) {
        const topicId = await classifyTopicFromMessage(message);

        if (topicId) {
            agent = await chooseBestAgent(topicId);
        }
    }

    res.json({
      answer,
      needHuman: wantHuman,
      agent
    });

  } catch (err) {
    console.error("Chatbot error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
