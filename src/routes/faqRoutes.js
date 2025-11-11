import express from 'express';
import { getAllFAQ, createFAQ, updateFAQ, deleteFAQ, getFAQById } from '../controllers/faqController.js';

const router = express.Router();

// Lấy tất cả FAQ
router.get('/', getAllFAQ);

// Tạo FAQ mới
router.post('/', createFAQ);

// Cập nhật FAQ
router.put('/:id', updateFAQ);

// Xóa FAQ
router.delete('/:id', deleteFAQ);

// Lấy các bảng phân loại mà FAQ này thuộc về
router.get('/:id/belong', getFAQById);

export default router;
