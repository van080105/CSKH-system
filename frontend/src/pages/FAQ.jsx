import { useState } from 'react'
import { Plus, Edit2, Trash2, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'

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

export default function FAQUltimateModal() {
  const [faqs, setFaqs] = useState(initialFAQs)
  const [openIndexes, setOpenIndexes] = useState([])
  const [modalType, setModalType] = useState(null) // 'add' | 'edit' | 'delete'
  const [currentFAQIndex, setCurrentFAQIndex] = useState(null)
  const [form, setForm] = useState({ question: '', answer: '' })
  const { t } = useTranslation()

  const handleToggle = (index) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }

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
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleAdd = () => {
    if (form.question.trim() && form.answer.trim()) {
      setFaqs([...faqs, form])
      closeModal()
    }
  }

  const handleEdit = () => {
    if (form.question.trim() && form.answer.trim()) {
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

  return (
    <div className="relative max-w-6xl mx-auto p-6">
      {/* Thêm FAQ button */}
      <div className="flex justify-end mb-8">
        <button
          className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full shadow-lg hover:scale-105 transform transition duration-300"
          onClick={openAddModal}
        >
          <Plus className="h-5 w-5" />
          {t('addFAQ')}
        </button>
      </div>

      {/* FAQ List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {faqs.map((faq, index) => {
          const isOpen = openIndexes.includes(index)
          return (
            <div
              key={index}
              className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl hover:shadow-3xl transition transform hover:scale-[1.03] overflow-hidden border border-gray-200/50 dark:border-gray-700/50"
            >
              {/* Question */}
              <div
                className="flex justify-between items-center px-6 py-5 cursor-pointer select-none"
                onClick={() => handleToggle(index)}
              >
                <h4 className="font-semibold text-lg dark:text-white text-gray-900">{faq.question}</h4>
                <span className="text-indigo-500 font-bold text-2xl">{isOpen ? '−' : '+'}</span>
              </div>

              {/* Answer */}
              <div className={`transition-all duration-500 px-6 overflow-hidden ${isOpen ? 'max-h-96 py-4' : 'max-h-0 py-0'}`}>
                <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 px-6 py-3">
                <button
                  onClick={() => openEditModal(index)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  <Edit2 className="h-4 w-4" /> {t('modify')}
                </button>
                <button
                  onClick={() => openDeleteModal(index)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition"
                >
                  <Trash2 className="h-4 w-4" /> {t('delete')}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Modal Overlay */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-3xl max-w-lg w-full p-8 relative transform transition-all scale-95 animate-fade-in">
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
                  type="text"
                  name="question"
                  placeholder={t('question')}
                  value={form.question}
                  onChange={handleChange}
                  className="w-full mb-4 px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
                <textarea
                  name="answer"
                  placeholder={t('answer')}
                  value={form.answer}
                  onChange={handleChange}
                  className="w-full mb-6 px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
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
                  type="text"
                  name="question"
                  placeholder={t('question')}
                  value={form.question}
                  onChange={handleChange}
                  className="w-full mb-4 px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
                <textarea
                  name="answer"
                  placeholder={t('answer')}
                  value={form.answer}
                  onChange={handleChange}
                  className="w-full mb-6 px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
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
          </div>
        </div>
      )}
    </div>
  )
}
