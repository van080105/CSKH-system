import { assignAllFormsService, reassignFormService } from "../services/assignFormService.js";

export const assignAllForms = async (req, res) => {
  try {
    const result = await assignAllFormsService();
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const reassignForm = async (req, res) => {
  try {
    const { formId, agentId, force = false } = req.body;
    const result = await reassignFormService(formId, agentId, force);
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
