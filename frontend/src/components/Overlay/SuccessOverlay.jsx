// src/components/SuccessOverlay.js
import { motion, AnimatePresence } from "framer-motion";

const SuccessOverlay = ({ showSuccess, onClose }) => {
  return (
    <AnimatePresence>
      {showSuccess && (
        <motion.div
          key="success-overlay"
          className="fixed inset-0 z-[100] flex items-center justify-center 
                    bg-black/40 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <motion.div
            key="success-box"
            initial={{ scale: 0.8, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="
              p-12 bg-white/25 backdrop-blur-2xl rounded-3xl 
              border border-white/30 shadow-xl text-white text-center
              flex flex-col items-center justify-center
            "
          >
            <div className="w-20 h-20 mb-6 flex items-center justify-center 
                            bg-green-500 rounded-full text-4xl mx-auto shadow-lg">
              ✓
            </div>

            <h2 className="text-3xl font-semibold">Cập nhật thành công!</h2>
            <p className="mt-2 opacity-90">Thông tin của bạn đã được lưu lại.</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessOverlay;
