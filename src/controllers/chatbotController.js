import { createChatbotService } from "../services/chatbotService.js";

export const createChatbot = async (req, res) => {
  try {
    const { version } = req.body;
    if (!version) return res.status(400).json({ error: "Thiếu version" });

    const result = await createChatbotService(version);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

