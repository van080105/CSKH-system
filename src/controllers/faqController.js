
import {
  getAllFAQService,
  createFAQService,
  updateFAQService,
  deleteFAQService,
  getFAQByIdService
} from '../services/faqService.js';

// Lấy tất cả FAQ
export const getAllFAQ = async (req, res) => {
  try {
    const faqList = await getAllFAQService();
    res.json(faqList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Tạo FAQ mới
export const createFAQ = async (req, res) => {
  try {
    const { category, question, answer } = req.body;
    const result = await createFAQService(category, question, answer);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Cập nhật FAQ
export const updateFAQ = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, question, answer } = req.body;
    const result = await updateFAQService(id, category, question, answer);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Xóa FAQ
export const deleteFAQ = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteFAQService(id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy các bảng phân loại mà FAQ này thuộc về
export const getFAQById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getFAQByIdService(id);
    if (result.length === 0) {
      return res.status(404).json({ error: 'Không có phân loại cho FAQ này' });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
