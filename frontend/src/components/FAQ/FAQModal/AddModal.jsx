import { X } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ModalAdd({
  form,
  handleChange,
  handleAdd,
  closeModal,
  error,
  questionRef,
  answerRef,
  t,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <motion.div
        className="bg-white dark:bg-gray-900 rounded-3xl shadow-3xl max-w-lg w-full p-8 relative"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
      >
        {/* Close */}
        <button
          onClick={closeModal}
          className="absolute top-5 right-5 text-gray-500 hover:text-white"
        >
          <X className="h-6 w-6" />
        </button>

        <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          {t('addFAQ')}
        </h3>

        {/* CATEGORY */}
        <input
          type="text"
          name="category"
          placeholder={t('category')}
          value={form.category || ''}
          onChange={handleChange}
          className={`w-full mb-4 px-5 py-3 rounded-xl border text-gray-700 dark:text-gray-300 ${
            error && !form.category.trim()
              ? 'border-red-500 animate-shake'
              : 'border-gray-300 dark:border-gray-700'
          } dark:bg-gray-800 bg-gray-50`}
        />

        {/* QUESTION */}
        <input
          ref={questionRef}
          type="text"
          name="question"
          placeholder={t('question')}
          value={form.question}
          onChange={handleChange}
          className={`w-full mb-4 px-5 py-3 rounded-xl border text-gray-700 dark:text-gray-300 ${
            error && !form.question.trim()
              ? 'border-red-500 animate-shake'
              : 'border-gray-300 dark:border-gray-700'
          } dark:bg-gray-800 bg-gray-50`}
        />

        {/* ANSWER */}
        <textarea
          ref={answerRef}
          name="answer"
          placeholder={t('answer')}
          value={form.answer}
          onChange={handleChange}
          className={`w-full mb-6 px-5 py-3 rounded-xl border text-gray-700 dark:text-gray-300 ${
            error && !form.answer.trim()
              ? 'border-red-500 animate-shake'
              : 'border-gray-300 dark:border-gray-700'
          } dark:bg-gray-800 bg-gray-50`}
        />

        {error && (
          <p className="text-red-500 mb-4 text-sm font-medium">{error}</p>
        )}

        <div className="flex justify-end gap-4">
          <button onClick={closeModal} className="px-6 py-2 rounded-xl border text-gray-700 dark:text-gray-300">
            {t('cancel')}
          </button>
          <button
            onClick={handleAdd}
            className="px-6 py-2 rounded-xl bg-indigo-600 text-white"
          >
            {t('confirm')}
          </button>
        </div>
      </motion.div>
    </div>
  )
}
