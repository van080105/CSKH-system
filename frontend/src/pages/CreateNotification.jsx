import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { createPortal } from "react-dom"
import FloatingInput from "../components/FloatingInput" 
import MultiSelectIDGrid from "../components/MultiSelectIDGrid"
import ToastOverlay from "../components/ToastOverlay"

export default function CreateNotification({ open, onClose }) {
  const [formData, setFormData] = useState({
    content: "",
    sentDate: new Date().toISOString(),
    accountIds: [],
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userIdOptions, setUserIdOptions] = useState([]);
  const [toast, setToast] = useState({ message: "", type: "success" });
  const handleClose = () => {
    onClose();
  };

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const fetchUsersIds = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/accounts/manage', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      const data = await response.json();
      return data.Total;
    } catch (error) {
      console.error('Error fetching users:', error);
      return 0;
    }
  };

  useEffect(() => {
    if (open) {
      fetchUsersIds().then(total => {
        if (total > 0) {
          const ids = Array.from({ length: total }, (_, i) => i + 1);
          setUserIdOptions(ids);
        }
      });
    }
  }, [open]);

  const handleSubmit = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (!response.ok) {
          setToast({ message: result.error || "Tạo thông báo thất bại!", type: "error" });
          setTimeout(() => setToast({ message: "", type: "success" }), 3000);
        } else {
          setToast({ message: "Tạo thông báo thành công!", type: "success" });
          setTimeout(() => setToast({ message: "", type: "success" }), 3000);
          setTimeout(() => {
            setToast({ message: "", type: "success" });
            handleClose();
          }, 3000);

        }
      } catch (error) {
        setToast({ message: "Lỗi kết nối server.", type: "error" });
        setTimeout(() => setToast({ message: "", type: "success" }), 3000);
      } finally {
        setLoading(false);
      }
    };

  if (!open) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-[9999] flex items-center justify-center">
        
        {/* Background blur */}
        <motion.div
          className="absolute inset-0 bg-black/50 backdrop-blur-md" 
          onClick={handleClose} 
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}    
          animate={{ opacity: 1, y: 0 }}      
          exit={{ opacity: 0, y: -50 }}     
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative w-full max-w-lg max-h-[90vh] p-6 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-xl overflow-y-auto"
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white text-3xl z-10"
          >
            &times;
          </button>

          <h2 className="text-2xl font-semibold text-white mb-6">Tạo Thông Báo Mới</h2>

          {/* Form */}
          <div className="grid grid-cols-1 gap-6">
            <FloatingInput
              label="Nội dung thông báo"
              value={formData.content}
              onChange={(v) => handleChange("content", v)}
            />

            <FloatingInput
              readOnly
              label="Ngày gửi"
              type="datetime-local"
              value={formData.sentDate}
              onChange={(v) => handleChange("sentDate", v)}
            />

            <MultiSelectIDGrid
              label="Chọn ID tài khoản"
              options={userIdOptions}
              value={formData.accountIds}
              onChange={(v) => handleChange("accountIds", v)}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              className="px-8 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-700 shadow-lg hover:shadow-xl transition-all"
              disabled={loading}
            >
              {loading ? "Đang lưu..." : "Tạo thông báo"}
            </motion.button>
          </div>
        </motion.div>

        <ToastOverlay message={toast.message} type={toast.type} />

      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
