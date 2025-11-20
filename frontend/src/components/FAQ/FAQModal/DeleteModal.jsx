import { X } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ModalDelete({ closeModal, handleDelete, t }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <motion.div
        className="bg-white dark:bg-gray-900 rounded-3xl shadow-3xl max-w-lg w-full p-8 relative"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
      >
        <button
          onClick={closeModal}
          className="absolute top-5 right-5 text-gray-500 hover:text-white"
        >
          <X className="h-6 w-6" />
        </button>

        <h3 className="text-2xl font-bold mb-6 text-red-600">
          {t('deleteFAQ')}
        </h3>

        <p className="mb-6 text-gray-700 dark:text-gray-300">
          {t('deleteFAQConfirm')}
        </p>

        <div className="flex justify-end gap-4 text-gray-700 dark:text-gray-300">
          <button onClick={closeModal} className="px-6 py-2 rounded-xl border">
            {t('cancel')}
          </button>

          <button
            onClick={handleDelete}
            className="px-6 py-2 rounded-xl bg-red-600 text-white"
          >
            {t('delete')}
          </button>
        </div>
      </motion.div>
    </div>
  )
}
