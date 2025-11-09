import { useState, useRef } from 'react'
import { Plus, Edit2, Trash2, X, Search } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const initialFAQs = [
  {
    question: 'iPhone ở đây là hàng chính hãng hay xách tay?',
    answer:
      'Tùy theo nhu cầu, cửa hàng có cung cấp cả hàng chính hãng (VN/A) và hàng xách tay quốc tế (LL/A, ZP/A...), đều là máy mới 100% và có đầy đủ bảo hành rõ ràng.',
  },
  {
    question: 'Có chương trình khuyến mãi, giảm giá hoặc ưu đãi nào không?',
    answer:
      'Cửa hàng thường xuyên có các chương trình giảm giá, ưu đãi theo mùa, tặng phụ kiện, hoặc miễn phí cài đặt – giao hàng, v.v. Bạn có thể theo dõi tại mục Khuyến mãi.',
  },
  {
    question: 'Nếu máy có vấn đề thì bảo hành tại cửa hàng hay trung tâm Apple?',
    answer:
      'Hàng chính hãng sẽ được bảo hành tại trung tâm ủy quyền Apple (AASP) trên toàn quốc. Hàng xách tay sẽ được bảo hành tại cửa hàng.',
  },
]

export default function FAQ({ showModify = true }) {
  const [faqs, setFaqs] = useState(initialFAQs)
  const [openIndexes, setOpenIndexes] = useState([])
  const [modalType, setModalType] = useState(null) // 'add' | 'edit' | 'delete'
  const [currentFAQIndex, setCurrentFAQIndex] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [form, setForm] = useState({ question: '', answer: '' })
  const [error, setError] = useState('') //  cảnh báo trùng lặp
  const questionRef = useRef(null)
  const answerRef = useRef(null)   

  const { t } = useTranslation()

  const handleToggle = (index) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }
  
  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  )
  const openAddModal = () => {
    setForm({ question: '', answer: '' })
    setModalType('add')
  }

  const openEditModal = (index) => {
    setCurrentFAQIndex(index)
    setForm({ ...faqs[index] })
    setModalType('edit')
  }

  const openDeleteModal = (index) => {
    setCurrentFAQIndex(index)
    setModalType('delete')
  }

  const closeModal = () => {
    setModalType(null)
    setForm({ question: '', answer: '' })
    setCurrentFAQIndex(null)
    setError('')
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleAdd = () => {
    const questionEmpty = !form.question.trim()
    const answerEmpty = !form.answer.trim()

    if (questionEmpty) {
      questionRef.current?.focus()
      setError('Vui lồng nhập câu hỏi!')
      return
    } 
    
    else if (answerEmpty) {
      answerRef.current?.focus()
      setError('Vui lồng nhập câu trả lời!')
      return
    }
    
    if (form.question.trim() && form.answer.trim()) {
      // Kiểm tra trùng lặp
      const duplicateQuestion = faqs.some(
        (faq) =>
          faq.question.trim().toLowerCase() === form.question.trim().toLowerCase()
      )

      const duplicateAnswer = faqs.some(
        (faq) =>
          faq.answer.trim().toLowerCase() === form.answer.trim().toLowerCase()
      )

      if (duplicateQuestion) {
        questionRef.current?.focus()
        setError('Câu hỏi đã tồn tại!') 
        return
      }

      else if (duplicateAnswer) {
        answerRef.current?.focus()
        setError('Câu trả lời đã tồn tại!')
        return
      }

      setFaqs([...faqs, form])
      closeModal()
    }
  }

  const handleEdit = () => {
    const questionEmpty = !form.question.trim()
    const answerEmpty = !form.answer.trim()

    if (questionEmpty) {
      questionRef.current?.focus()
      setError('Vui lồng nhập câu hỏi!')
      return
    } 
    
    else if (answerEmpty) {
      answerRef.current?.focus()
      setError('Vui lồng nhập câu trả lời!')
      return
    }

    if (form.question.trim() && form.answer.trim()) {
      const duplicateQuestion = faqs.some(
        (faq, i) =>
          i !== currentFAQIndex &&
          faq.question.trim().toLowerCase() === form.question.trim().toLowerCase()
      )

      const duplicateAnswer = faqs.some(
        (faq, i) =>
          i !== currentFAQIndex &&
          faq.answer.trim().toLowerCase() === form.answer.trim().toLowerCase()
      )

      if (duplicateQuestion) {
        questionRef.current?.focus()
        setError('Câu hỏi đã tồn tại!') 
        return
      }

      else if (duplicateAnswer) {
        answerRef.current?.focus()
        setError('Câu trả lời đã tồn tại!')
        return
      }

      const updatedFaqs = [...faqs]
      updatedFaqs[currentFAQIndex] = form
      setFaqs(updatedFaqs)
      closeModal()
    }
  }

  const handleDelete = () => {
    const updatedFaqs = faqs.filter((_, i) => i !== currentFAQIndex)
    setFaqs(updatedFaqs)
    closeModal()
  }

    // highlight search
  const highlightText = (text, query) => {
    if (!query) return text
    const regex = new RegExp(`(${query})`, 'gi')
    const parts = text.split(regex)
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark
          key={i}
          className="bg-yellow-200 dark:bg-yellow-600 text-gray-900 dark:text-white rounded px-1 shadow-[0_0_8px_rgba(250,204,21,0.6)] animate-pulse"
        >
          {part}
        </mark>
      ) : (
        part
      )
    )
  }

  return (
    <div className="relative max-w-6xl mx-auto p-6">

      {/* 🆕 Thanh Search hiện đại */}
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

        {/* Nút thêm FAQ */}
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

      {/* 🆕 Hiển thị nếu không có kết quả tìm kiếm */}
      {filteredFaqs.length === 0 ? (
        <motion.p
          className="text-center text-gray-500 dark:text-gray-400 mt-20 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          😕 {t('noResultsFound') || 'Không tìm thấy kết quả phù hợp...'}
        </motion.p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndexes.includes(index)
            return (
              <motion.div
                key={index}
                className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl hover:shadow-3xl transition transform hover:scale-[1.03] overflow-hidden border border-gray-200/50 dark:border-gray-700/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                {/* Question */}
                <div
                  className="flex justify-between items-center px-6 py-5 cursor-pointer select-none"
                  onClick={() => handleToggle(index)}
                >
                  <h4 className="font-semibold text-lg dark:text-white text-gray-900">{highlightText(faq.question, searchQuery)}</h4>
                  <span className="text-indigo-500 font-bold text-2xl">{isOpen ? '−' : '+'}</span>
                </div>

                {/* Answer */}
                <motion.div
                  className={`transition-all duration-500 px-6 overflow-hidden ${isOpen ? 'max-h-96 py-4' : 'max-h-0 py-0'}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-gray-700 dark:text-gray-300">{highlightText(faq.answer, searchQuery)}</p>
                </motion.div>

                {/* Actions */}
                {showModify && (
                  <div className="flex justify-end gap-3 px-6 py-3">
                    <motion.button
                      onClick={() => openEditModal(index)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Edit2 className="h-4 w-4" /> {t('modify')}
                    </motion.button>
                    <motion.button
                      onClick={() => openDeleteModal(index)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Trash2 className="h-4 w-4" /> {t('delete')}
                    </motion.button>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      )}

      {/* Modal Overlay */}
      {showModify && modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            className="bg-white dark:bg-gray-900 rounded-3xl shadow-3xl max-w-lg w-full p-8 relative transform transition-all scale-95 animate-fade-in"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Modal Content */}
            {modalType === 'add' && (
              <>
                <h3 className="text-2xl text-gray-900 dark:text-white font-bold mb-6">{t('addFAQ')}</h3>
                <input
                  ref={questionRef}
                  type="text"
                  name="question"
                  placeholder={t('question')}
                  value={form.question}
                  onChange={handleChange}
                  className={`w-full mb-4 px-5 py-3 rounded-xl border 
                    ${error && !form.question.trim() ? 'border-red-500 animate-shake' : 'border-gray-300 dark:border-gray-700'}
                    dark:bg-gray-800 bg-gray-50 text-gray-900 dark:text-white placeholder-gray-400 
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 transition`}                
                  />
                <textarea
                  ref={answerRef}
                  name="answer"
                  placeholder={t('answer')}
                  value={form.answer}
                  onChange={handleChange}
                  className={`w-full mb-6 px-5 py-3 rounded-xl border 
                    ${error && !form.answer.trim() ? 'border-red-500 animate-shake' : 'border-gray-300 dark:border-gray-700'}
                    dark:bg-gray-800 bg-gray-50 text-gray-900 dark:text-white placeholder-gray-400 
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 transition`}                
                />

                {/* Hiển thị cảnh báo nếu có lỗi */}
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
                    onClick={handleAdd}
                    className="px-6 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition"
                  >
                    {t('confirm')}
                  </button>
                </div>
              </>
            )}

            {modalType === 'edit' && (
              <>
                <h3 className="text-2xl text-gray-900 dark:text-white font-bold mb-6">{t('modifyFAQ')}</h3>
                <input
                  ref={questionRef}
                  type="text"
                  name="question"
                  placeholder={t('question')}
                  value={form.question}
                  onChange={handleChange}
                  className={`w-full mb-4 px-5 py-3 rounded-xl border 
                    ${error && !form.question.trim() ? 'border-red-500 animate-shake' : 'border-gray-300 dark:border-gray-700'}
                    dark:bg-gray-800 bg-gray-50 text-gray-900 dark:text-white placeholder-gray-400 
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 transition`}                
                    />
                <textarea
                  ref={answerRef}
                  name="answer"
                  placeholder={t('answer')}
                  value={form.answer}
                  onChange={handleChange}
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
                    onClick={handleEdit}
                    className="px-6 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
                  >
                    {t('confirm')}
                  </button>
                </div>
              </>
            )}

            {modalType === 'delete' && (
              <>
                <h3 className="text-2xl font-bold mb-6 text-red-600">{t('deleteFAQ')}</h3>
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
                    className="px-6 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition"
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
