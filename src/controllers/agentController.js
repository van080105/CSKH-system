import { classifyAgentsService } from "../services/agentService.js";

export const classifyAgents = async (req, res) => {
  try {
    const result = await classifyAgentsService();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
