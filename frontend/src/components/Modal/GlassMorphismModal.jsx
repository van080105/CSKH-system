// src/components/GlassmorphismModal.js
import { motion } from "framer-motion";

const GlassmorphismModal = ({ onClose, children }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Background */}
      <motion.div
        className="absolute inset-0 bg-black/50 backdrop-blur-md"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modal Content */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 18, stiffness: 220 }}
        className="
          relative w-full max-w-3xl p-10 rounded-3xl
          bg-white/20 dark:bg-gray-900/20
          backdrop-blur-xl border border-white/30 dark:border-gray-700/40 
          shadow-[0_8px_40px_rgba(0,0,0,0.25)]
          text-white
        "
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default GlassmorphismModal;
