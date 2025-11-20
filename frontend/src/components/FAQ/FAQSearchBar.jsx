import { motion } from 'framer-motion'
import { Search } from 'lucide-react'

export default function SearchBar({
  searchQuery,
  setSearchQuery,
  categories,
  selectedCategory,
  setSelectedCategory,
  t,
  showModify,
  openAddModal,
}) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
      {/* Search */}
      <motion.div
        className="relative w-full md:w-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
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

      {/* Category filter */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="w-full md:w-1/4 px-4 py-3 rounded-full bg-white/90 dark:bg-gray-800/90 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 shadow-sm"
      >
        <option value="">Tất cả danh mục</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      {/* Add button */}
      {showModify && (
        <motion.button
          className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full shadow-lg hover:scale-105 transform transition duration-300"
          onClick={openAddModal}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="h-5 w-5">+</span>
          {t('addFAQ')}
        </motion.button>
      )}
    </div>
  )
}
