import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Edit2, Trash2 } from 'lucide-react'

export default function FAQItem({
  faq,
  isOpen,
  toggle,
  highlightText,
  searchQuery,
  showModify,
  openEdit,
  openDelete,
  globalIndex,
}) {
  return (
    <motion.div
      layout
      className="
        rounded-xl p-4 
        bg-gray-50 dark:bg-gray-800 
        border border-gray-200 dark:border-gray-700 
        hover:border-indigo-400 dark:hover:border-indigo-400
        hover:shadow-sm transition-all
      "
    >
      {/* QUESTION */}
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggle}
      >
        <div className="flex items-center gap-2">
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
            <ChevronDown className="w-4 h-4 text-indigo-400" />
          </motion.div>

          <span className="font-medium text-gray-900 dark:text-white">
            {highlightText(faq.question, searchQuery)}
          </span>
        </div>
      </div>

      {/* ANSWER */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="answer"
            layout
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="mt-3 text-gray-700 dark:text-gray-300 pl-6"
          >
            {highlightText(faq.answer, searchQuery)}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ACTIONS */}
      {showModify && (
        <div className="flex justify-end gap-3 mt-3">
          <button
            onClick={() => openEdit(globalIndex)}
            className="px-4 py-1.5 rounded-lg text-sm bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            <Edit2 className="w-4 h-4 inline" /> Sửa
          </button>

          <button
            onClick={() => openDelete(globalIndex)}
            className="px-4 py-1.5 rounded-lg text-sm bg-red-600 text-white hover:bg-red-700 transition"
          >
            <Trash2 className="w-4 h-4 inline" /> Xoá
          </button>
        </div>
      )}
    </motion.div>
  )
}