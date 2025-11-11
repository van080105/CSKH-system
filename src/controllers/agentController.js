import { classifyAgentsService, replyAssignedFormService } from "../services/agentService.js";

export const classifyAgents = async (req, res) => {
  try {
    const result = await classifyAgentsService();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const replyAssignedForm = async (req, res) => {
  try {
    const agentId = req.user.id;
    const { formId, resContent } = req.body;

    const result = await replyAssignedFormService(agentId, formId, resContent);

    return res.status(200).json(result);

  } catch (err) {
    console.error("Lỗi service:", err.message);
    return res.status(400).json({ error: err.message });
  }
};