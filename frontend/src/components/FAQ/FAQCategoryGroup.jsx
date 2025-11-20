import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

export default function CategoryGroup({
  category,
  items,
  isOpen,
  toggleCategory,
  renderItem,
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        rounded-2xl shadow-md 
        border border-gray-200/50 dark:border-gray-700/40 
        bg-white/70 dark:bg-gray-900/60 backdrop-blur-sm 
        transition-all
      "
    >
      {/* Category Header */}
      <motion.div
        layout
        onClick={toggleCategory}
        className="
          px-6 py-4 flex justify-between items-center 
          cursor-pointer select-none
          rounded-t-2xl
          hover:bg-gray-50 dark:hover:bg-gray-800
        "
      >
        <div className="flex items-center gap-3">
          <motion.div animate={{ rotate: isOpen ? 90 : 0 }}>
            <ChevronRight className="w-5 h-5 text-indigo-500" />
          </motion.div>
          <span className="text-xl font-semibold dark:text-white text-gray-900">
            {category}
          </span>
        </div>

        <span className="px-3 py-1 text-xs rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-sm">
          {items.length} mục
        </span>
      </motion.div>

      {/* FAQ Items */}
      <motion.div
        layout
        initial={{ height: 0 }}
        animate={{ height: isOpen ? 'auto' : 0 }}
        transition={{ duration: 0.35 }}
        className="overflow-hidden"
      >
        <div className="pl-10 pr-6 py-4 space-y-4 border-l border-gray-300/40 dark:border-gray-700/40">
          {items.map(renderItem)}
        </div>
      </motion.div>
    </motion.div>
  )
}
