import { motion, AnimatePresence } from "framer-motion";

export default function ToastOverlay({ message, type = "success", onClose }) {
  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";
  const icon = type === "success" ? "✅" : "❌";

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          key={message}
          initial={{ opacity: 0, y: -50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.8 }}
          transition={{ duration: 0.4 }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-[99999] pointer-events-none"
        >
          <div
            className={`${bgColor} text-white font-semibold px-6 py-3 rounded-2xl shadow-xl backdrop-blur-md flex items-center gap-3 pointer-events-auto`}
          >
            <span className="text-lg">{icon}</span>
            <span>{message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
