import { useState, useRef, useEffect } from 'react'
import { Plus, Edit2, Trash2, X, Search, ChevronRight, ChevronDown, Folder, FileText, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'

// --- COMPONENT ĐỆ QUY: HIỂN THỊ CÂY DANH MỤC ---
const CategoryNode = ({ node, selectedId, onSelect, depth = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="select-none">
      <div
        className={`flex items-center gap-2 py-2 px-3 cursor-pointer rounded-lg transition-colors duration-200 
        ${selectedId === node.id ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-semibold' : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
        style={{ paddingLeft: `${depth * 16 + 12}px` }} 
        onClick={() => onSelect(node.id)}
      >
        <span 
          onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
          className={`p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 ${hasChildren ? 'visible' : 'invisible'}`}
        >
          {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </span>
        
        <Folder size={16} className={selectedId === node.id ? 'fill-current' : ''} />
        <span className="truncate text-sm">{node.name}</span>
      </div>

      <AnimatePresence>
        {hasChildren && isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            {node.children.map(child => (
              <CategoryNode key={child.id} node={child} selectedId={selectedId} onSelect={onSelect} depth={depth + 1} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FAQ({ showModify = true }) {
  const [faqs, setFaqs] = useState([])
  const [categories, setCategories] = useState([]) 
  const [selectedCategoryId, setSelectedCategoryId] = useState(null) 

  const [openIndexes, setOpenIndexes] = useState([])
  const [modalType, setModalType] = useState(null) 
  const [currentFAQIndex, setCurrentFAQIndex] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  
  const [form, setForm] = useState({ categoryId: '', question: '', answer: '' })
  const [error, setError] = useState('') 
  
  const questionRef = useRef(null)
  const answerRef = useRef(null)   
  const { t } = useTranslation()

  // --- GIẢ LẬP API CATEGORY ---
  // ID ở đây phải khớp với ID trong KEYWORD_RULES bên dưới
  const fetchCategories = async () => {
    return [
      {
        id: 1, name: 'Kỹ thuật', children: [
          { id: 11, name: 'Đăng nhập & Tài khoản', children: [] }, // ID 11
          { id: 12, name: 'Lỗi hệ thống', children: [] }           // ID 12
        ]
      },
      {
        id: 2, name: 'Thanh toán & Giá', children: [
            { id: 21, name: 'Phương thức thanh toán', children: [] } // ID 21
        ]
      },
      { id: 3, name: 'Câu hỏi chung (Liên hệ)', children: [] }      // ID 3
    ];
  };

  // --- LOGIC TỰ ĐỘNG PHÂN LOẠI (RULE-BASED) ---
  const KEYWORD_RULES = [
    { categoryId: 11, keywords: ['đăng nhập', 'mật khẩu', 'tài khoản', 'nick', 'login', 'password', 'quên', 'reset'] },
    { categoryId: 12, keywords: ['lỗi', 'bug', 'không vào được', 'sập', 'bảo trì', '404', 'lag'] },
    { categoryId: 21, keywords: ['thanh toán', 'tiền', 'visa', 'momo', 'chuyển khoản', 'bank', 'ví', 'nạp'] },
    { categoryId: 3,  keywords: ['liên hệ', 'địa chỉ', 'hotline', 'gọi', 'email', 'sđt', 'số điện thoại'] }
  ];

  const handleAutoClassify = () => {
    if (!form.question) return;
    const questionText = form.question.toLowerCase();
    
    // Tìm rule phù hợp
    const match = KEYWORD_RULES.find(rule => 
      rule.keywords.some(keyword => questionText.includes(keyword))
    );

    if (match) {
      setForm(prev => ({ ...prev, categoryId: match.categoryId }));
      // Hiệu ứng visual nhỏ (optional: reset error nếu có)
      setError('');
    }
  };

  const fetchFAQs = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/faq',{
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      return data.map(faq => ({
        id: faq.ID,
        categoryId: faq.CategoryID || faq.Category, 
        question: faq.Question,
        answer: faq.Answer,
      }));

    } catch (error) {
      console.error('Error fetching FAQs:', error);
      return [];
    }
  };

  const flattenCategories = (nodes, prefix = '') => {
    let flat = [];
    nodes.forEach(node => {
      flat.push({ id: node.id, name: prefix + node.name });
      if (node.children) {
        flat = flat.concat(flattenCategories(node.children, prefix + '-- '));
      }
    });
    return flat;
  };
  const flatCategoryList = flattenCategories(categories);

  const handleToggle = (index) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }
  
  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategoryId 
        ? Number(faq.categoryId) === Number(selectedCategoryId) 
        : true;
        
    return matchesSearch && matchesCategory;
  });

  const openAddModal = () => {
    setForm({ categoryId: selectedCategoryId || '', question: '', answer: '' })
    setModalType('add')
  }

  const openEditModal = (index) => {
    setCurrentFAQIndex(index)
    setForm({ 
        id: faqs[index].id,
        categoryId: faqs[index].categoryId, 
        question: faqs[index].question, 
        answer: faqs[index].answer 
    })
    setModalType('edit')
  }

  const openDeleteModal = (index) => {
    setCurrentFAQIndex(index)
    setModalType('delete')
  }

  const closeModal = () => {
    setModalType(null)
    setForm({ categoryId: '', question: '', answer: '' })
    setCurrentFAQIndex(null)
    setError('')
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleAdd = async () => {
    const categoryEmpty = !form.categoryId;
    const questionEmpty = !form.question.trim();
    const answerEmpty = !form.answer.trim();

    if (categoryEmpty) {
      setError('Vui lòng chọn danh mục (hoặc dùng nút ✨ để gợi ý)!');
      return;
    } else if (questionEmpty) {
      questionRef.current?.focus();
      setError('Vui lòng nhập câu hỏi!');
      return;
    } else if (answerEmpty) {
      answerRef.current?.focus();
      setError('Vui lòng nhập câu trả lời!');
      return;
    }
    
    const duplicateQuestion = faqs.some(
      (faq) => faq.question.trim().toLowerCase() === form.question.trim().toLowerCase()
    );
    if (duplicateQuestion) {
      questionRef.current?.focus();
      setError('Câu hỏi đã tồn tại!');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/faq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category_id: form.categoryId,
          question: form.question,
          answer: form.answer,
        }),
      });

      if (response.ok) {
        const newFAQ = await response.json();
        setFaqs([...faqs, {
          id : newFAQ.newID,
          categoryId: form.categoryId,
          question: form.question,
          answer: form.answer,
        }]);

        closeModal();
      } else {
        const err = await response.json();
        setError(err.error || 'Không thể thêm FAQ!');
      }
    } catch (error) {
      console.error('Error adding FAQ:', error);
      setError('Lỗi khi kết nối đến máy chủ!');
    }
  };

  const handleEdit = async () => {
    if (!form.question.trim()) {
      questionRef.current?.focus(); setError('Vui lòng nhập câu hỏi!'); return;
    } else if (!form.answer.trim()) {
      answerRef.current?.focus(); setError('Vui lòng nhập câu trả lời!'); return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/faq/${form.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category_id: form.categoryId,
          question: form.question,
          answer: form.answer,
        }),
      });

      if (response.ok) {
        const updatedFaqs = [...faqs];
        updatedFaqs[currentFAQIndex] = { ...form };
        setFaqs(updatedFaqs);
        closeModal();
      } else {
        const err = await response.json();
        setError(err.error || 'Không thể cập nhật FAQ!');
      }
    } catch (error) {
      console.error('Error updating FAQ:', error);
      setError('Lỗi khi kết nối đến máy chủ!');
    }
  }

  const handleDelete = async () => {
    if (currentFAQIndex !== null) {
      const faqToDelete = faqs[currentFAQIndex];
      const idToDelete = faqToDelete?.id;

      if (idToDelete) {
        try {
          await fetch(`http://localhost:8080/api/faq/${idToDelete}`, {
            method: 'DELETE',
          });
          setFaqs((prevFaqs) => prevFaqs.filter((_, index) => index !== currentFAQIndex));
          closeModal();
        } catch (error) {
          console.error('Error deleting FAQ:', error);
        }
      }
    }
  };

  const highlightText = (text, query) => {
    if (!query) return text
    const regex = new RegExp(`(${query})`, 'gi')
    const parts = text.split(regex)
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-yellow-200 dark:bg-yellow-600 text-gray-900 dark:text-white rounded px-1 shadow-[0_0_8px_rgba(250,204,21,0.6)] animate-pulse">
          {part}
        </mark>
      ) : ( part )
    )
  }

  useEffect(() => {
    const fetchData = async () => {
      const cats = await fetchCategories();
      setCategories(cats);
      const fetchedFAQs = await fetchFAQs();
      setFaqs(fetchedFAQs);
    };
    fetchData();
  }, []);

  return (
    <div className="relative max-w-7xl mx-auto p-6">

      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <motion.div
          className="relative w-full md:w-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder={t('searchFAQ') || '🔍 Tìm câu hỏi, từ khóa...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full bg-white/90 dark:bg-gray-800/90 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 shadow-sm"
          />
        </motion.div>

        {showModify && (
          <motion.button
            className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full shadow-lg hover:scale-105 transform transition duration-300"
            onClick={openAddModal}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)" }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="h-5 w-5" />
            {t('addFAQ')}
          </motion.button>
        )}
      </div>

      {/* --- GIAO DIỆN 2 CỘT --- */}
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* CỘT TRÁI: Cây danh mục */}
        <div className="w-full lg:w-1/4">
            <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 min-h-[300px]">
                <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-4 flex items-center gap-2 border-b pb-2 border-gray-100 dark:border-gray-700">
                    <Folder className="text-indigo-500" size={20}/> Danh mục
                </h3>
                
                <div 
                    onClick={() => setSelectedCategoryId(null)}
                    className={`cursor-pointer py-2 px-3 mb-2 rounded-lg font-medium flex items-center gap-2 transition-colors
                    ${selectedCategoryId === null ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200' : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300'}`}
                >
                    <FileText size={16}/> Tất cả câu hỏi
                </div>
                
                <div className="space-y-1">
                    {categories.map(node => (
                        <CategoryNode 
                            key={node.id} 
                            node={node} 
                            selectedId={selectedCategoryId} 
                            onSelect={setSelectedCategoryId} 
                        />
                    ))}
                </div>
            </div>
        </div>

        {/* CỘT PHẢI: Danh sách FAQ */}
        <div className="w-full lg:w-3/4">
            {filteredFaqs.length === 0 ? (
                <motion.p
                className="text-center text-gray-500 dark:text-gray-400 mt-20 text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                >
                😕 {t('noResultsFound') || 'Không tìm thấy câu hỏi nào trong mục này...'}
                </motion.p>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                {filteredFaqs.map((faq, index) => {
                    const isOpen = openIndexes.includes(index)
                    return (
                    <motion.div
                        key={index}
                        className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-lg transition transform border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Question */}
                        <div
                        className="flex justify-between items-center px-6 py-5 cursor-pointer select-none"
                        onClick={() => handleToggle(index)}
                        >
                        <h4 className="font-semibold text-lg dark:text-white text-gray-900 pr-4">{highlightText(faq.question, searchQuery)}</h4>
                        <span className="text-indigo-500 font-bold text-2xl flex-shrink-0">{isOpen ? '−' : '+'}</span>
                        </div>

                        {/* Answer */}
                        <motion.div
                        className={`transition-all duration-500 px-6 overflow-hidden bg-gray-50/50 dark:bg-gray-800/30 ${isOpen ? 'max-h-96 py-4 border-t border-gray-100 dark:border-gray-700' : 'max-h-0 py-0'}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isOpen ? 1 : 0 }}
                        >
                        <p className="text-gray-700 dark:text-gray-300">{highlightText(faq.answer, searchQuery)}</p>
                        
                        {/* Actions */}
                        {showModify && (
                            <div className="flex justify-end gap-3 mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                                <motion.button
                                onClick={() => openEditModal(index)}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition text-sm font-medium"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                >
                                <Edit2 className="h-3.5 w-3.5" /> {t('modify')}
                                </motion.button>
                                <motion.button
                                onClick={() => openDeleteModal(index)}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition text-sm font-medium"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                >
                                <Trash2 className="h-3.5 w-3.5" /> {t('delete')}
                                </motion.button>
                            </div>
                        )}
                        </motion.div>
                    </motion.div>
                    )
                })}
                </div>
            )}
        </div>
      </div>

      {/* Modal Overlay */}
      {showModify && modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <motion.div
            className="bg-white dark:bg-gray-900 rounded-3xl shadow-3xl max-w-lg w-full p-8 relative transform transition-all scale-95 animate-fade-in"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>

            <h3 className="text-2xl text-gray-900 dark:text-white font-bold mb-6">
                {modalType === 'add' ? t('addFAQ') : modalType === 'edit' ? t('modifyFAQ') : t('deleteFAQ')}
            </h3>

            {(modalType === 'add' || modalType === 'edit') && (
              <>
                {/* 1. INPUT CÂU HỎI + NÚT AUTO CLASSIFY */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('question')}</label>
                    <div className="flex gap-2">
                      <input
                          ref={questionRef}
                          type="text"
                          name="question"
                          placeholder={t('question')}
                          value={form.question || ""}
                          onChange={handleChange}
                          onBlur={handleAutoClassify} // Tự động gợi ý khi rời chuột
                          className={`w-full px-5 py-3 rounded-xl border 
                            ${error && !form.question.trim() ? 'border-red-500 animate-shake' : 'border-gray-300 dark:border-gray-700'}
                            dark:bg-gray-800 bg-gray-50 text-gray-900 dark:text-white placeholder-gray-400 
                            focus:outline-none focus:ring-2 focus:ring-indigo-500 transition`}                
                        />
                        <button
                          onClick={handleAutoClassify}
                          title="Tự động chọn danh mục dựa trên từ khóa"
                          className="px-3 py-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded-xl hover:bg-indigo-200 dark:hover:bg-indigo-800 transition flex items-center justify-center"
                        >
                          <Sparkles size={20} />
                        </button>
                    </div>
                </div>

                {/* 2. DROPDOWN DANH MỤC */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ml-1">
                        {t('category') || "Danh mục"}
                    </label>
                    <div className="relative">
                        <select
                        name="categoryId"
                        value={form.categoryId}
                        onChange={handleChange}
                        className={`w-full px-5 py-3 rounded-xl border appearance-none
                            ${error && !form.categoryId ? 'border-red-500 animate-shake' : 'border-gray-300 dark:border-gray-700'}
                            dark:bg-gray-800 bg-gray-50 text-gray-900 dark:text-white 
                            focus:outline-none focus:ring-2 focus:ring-indigo-500 transition`}                
                        >
                            <option value="">-- Chọn danh mục --</option>
                            {flatCategoryList.map(cat => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                            <ChevronDown size={16}/>
                        </div>
                    </div>
                </div>

                {/* 3. INPUT TRẢ LỜI */}
                <textarea
                  ref={answerRef}
                  name="answer"
                  placeholder={t('answer')}
                  value={form.answer || ""}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full mb-6 px-5 py-3 rounded-xl border 
                    ${error && !form.answer.trim() ? 'border-red-500 animate-shake' : 'border-gray-300 dark:border-gray-700'}
                    dark:bg-gray-800 bg-gray-50 text-gray-900 dark:text-white placeholder-gray-400 
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 transition`}                
                />

                {error && (
                  <p className="text-red-500 dark:text-red-400 mb-4 text-sm font-medium animate-pulse">
                    {error}
                  </p>
                )}

                <div className="flex justify-end gap-4">
                  <button
                    onClick={closeModal}
                    className="px-6 py-2 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                  >
                    {t('cancel')}
                  </button>

                  <button
                    onClick={modalType === 'add' ? handleAdd : handleEdit}
                    className="px-6 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-lg"
                  >
                    {t('confirm')}
                  </button>
                </div>
              </>
            )}

            {modalType === 'delete' && (
              <>
                <p className="mb-6 text-gray-700 dark:text-gray-300">
                  {t('deleteFAQConfirm')}
                </p>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={closeModal}
                    className="px-6 py-2 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                  >
                    {t('cancel')}
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-6 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition shadow-lg"
                  >
                    {t('delete')}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </div>
  )
}