import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import ToastOverlay from "../../components/Overlay/ToastOverlay";

export default function DeleteConfirm({ open, onClose, user }) {
  if (!open || !user) return null;

  const [confirmCode, setConfirmCode] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [shake, setShake] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  useEffect(() => {
    if (open && user) {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let code = "";
      for (let i = 0; i < 12; i++) {
        code += chars[Math.floor(Math.random() * chars.length)];
      }
      setConfirmCode(code);
      setInputValue("");
      setErrorMessage("");
    }
  }, [open, user]);

  const handleDelete = async () => {
    if (inputValue !== confirmCode) {
      setErrorMessage("Chuỗi xác nhận không đúng!");
      setShake(true); 
      setTimeout(() => setShake(false), 500);
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8080/api/accounts", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ id: user.ID })
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(`Xóa thất bại: ${data.error || data.message}`);
        setToastType("error");
        setToastMessage(`Xóa thất bại: ${data.error || data.message}`);
        setTimeout(() => setErrorMessage(""), 3000);
        return;
      }

      setToastType("success");
      setToastMessage("Xóa tài khoản thành công!");
      setTimeout(() => onClose(), 3000);

    } catch (error) {
      console.error(error);
      setErrorMessage("Lỗi kết nối server.");
      setToastType("error");
      setToastMessage(`Xóa thất bại: ${data.error || data.message}`);
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
				key={user?.ID || "delete-confirm"}
        className="fixed inset-0 z-[200] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >

        {/* Background blur */}
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-2xl"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Popup */}
        <motion.div
          initial={{ scale: 0.85, y: 30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 260 }}
          className="
            relative w-full max-w-lg p-10 rounded-3xl 
            bg-white/10 dark:bg-white/5 
            backdrop-blur-3xl
            border border-red-400/40 dark:border-red-500/20
            shadow-[0_8px_40px_rgba(255,0,0,0.25)]
            text-white
          "
        >

          {/* Icon Danger */}
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-600/80 flex items-center justify-center text-4xl shadow-red-500/50 shadow-lg">
            ⚠️
          </div>

          <h2 className="text-3xl font-semibold text-center mb-3">
            Xóa tài khoản?
          </h2>

          <p className="text-center text-red-200 mb-6 leading-relaxed">
            Bạn sắp xóa vĩnh viễn tài khoản của:  
            <br />
            <span className="font-bold text-red-300">{user.Fullname}</span>
            <br />
            Hành động này <u>không thể hoàn tác</u>.  
            Mọi dữ liệu liên quan sẽ bị xóa hoàn toàn.
          </p>

          {errorMessage && (
            <motion.div
							key="error-message"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-2 text-center text-red-500 font-semibold"
            >
              {errorMessage}
            </motion.div>
          )}

          <p className="text-center text-red-300 mb-2">
            Nhập chuỗi sau để xác nhận xóa:
          </p>

					<div
						className="text-center font-mono text-lg mb-4 select-none"
						onCopy={(e) => {
							e.preventDefault();            
							setErrorMessage("Không thể copy mã xác nhận!");
							setTimeout(() => setErrorMessage(""), 3000);
						}}
						onSelect={(e) => {
							e.preventDefault();      
						}}
					>
						<span className="bg-gradient-to-r from-red-400 via-red-600 to-red-800 bg-clip-text text-transparent font-bold">
							{confirmCode}
						</span>
					</div>

          <motion.input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toUpperCase())}
            placeholder="Nhập chuỗi xác nhận"
            className="w-full px-4 py-3 rounded-xl dark:text-white font-mono outline-none mb-4"
            animate={shake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={{ duration: 0.5 }}
          />

          {/* Buttons */}
          <div className="flex justify-center gap-6 mt-4">
            <button
              onClick={onClose}
              className="
                px-6 py-3 rounded-xl text-white bg-white/20 
                hover:bg-white/30 transition shadow-md
              "
            >
              Hủy
            </button>

						<button
							onClick={handleDelete}
							disabled={inputValue !== confirmCode}
							className={`
								px-6 py-3 rounded-xl font-semibold
								transition shadow-red-500/40 shadow-lg
								${inputValue === confirmCode
									? "bg-red-600 hover:bg-red-700 text-white"
									: "bg-red-600/50 cursor-not-allowed text-red-200 hover:bg-red-600/50"}
							`}
						>
							Xóa ngay
						</button>
						
          </div>

        </motion.div>
      </motion.div>

      <ToastOverlay
        message={toastMessage}
        type={toastType}
        onClose={() => setToastMessage("")}
      />

    </AnimatePresence>
  );
}
