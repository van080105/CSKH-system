import { classifyIntent } from "../intent/intentClassifier.js";
import { generateAgentSuggestions } from "../services/agentSuggestionservice.js";

export async function agentQuickReply(req, res) {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "message is required" });
    }

    const { intent, confidence } = await classifyIntent(message);

    const suggestions = await generateAgentSuggestions(message, intent);

    return res.json({
      intent,
      confidence,
      suggestions
    });
  } catch (err) {
    console.error("agentQuickReply error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
