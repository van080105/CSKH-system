import { llm } from "../rag/ragCore.js";

export async function generateAgentSuggestions(message, intent) {
  const prompt = `
Bạn là trợ lý cho nhân viên CSKH cửa hàng iPhone.
Khách vừa gửi: "${message}"
Ý định khách hàng (intent): ${intent}

Hãy tạo 3 câu trả lời ngắn gọn, chuyên nghiệp, lịch sự, theo format:
1) ...
2) ...
3) ...
  `;

  const response = await llm(prompt);
  return response;
}
