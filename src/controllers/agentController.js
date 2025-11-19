import { classifyAgentsService, replyAssignedFormService } from "../services/agentService.js";
import { ragAnswer } from "../rag/ragCore.js";

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
export async function agentSuggest(req, res) {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "message is required" });
    }

    // Prompt riêng dành cho agent
    const agentPrompt = `
Bạn là trợ lý nội bộ dành cho nhân viên CSKH của cửa hàng bán iPhone.
Hãy tạo câu trả lời NGẮN, CHUYÊN NGHIỆP, DỄ DÙNG.

Khách hỏi: ${message}

Nếu thông tin không chắc chắn theo tài liệu RAG, hãy gợi ý agent xin phép hỗ trợ thêm.
    `;

    const suggestion = await ragAnswer(agentPrompt);

    return res.json({ suggestion });
  } catch (err) {
    console.error("agentSuggest error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}