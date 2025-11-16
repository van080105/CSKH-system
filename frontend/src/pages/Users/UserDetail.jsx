import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloatingInput from "../../components/FloatingInput";
import FloatingSelect from "../../components/FloatingSelect";
import DeleteConfirm from "./DeleteConfirm";

export default function UserDetail({ open, user, onClose }) {
  const [formData, setFormData] = useState({});
  const [shouldRender, setShouldRender] = useState(false);
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (open) {
      setFormData(user || {});
      setShouldRender(true);
    }
  }, [open, user]);

  if (!open && !shouldRender) return null;

  const handleClose = () => {
    setShouldRender(false);
    setTimeout(onClose, 250);
  };

	const handleSave = async (data) => {
		setLoading(true);
		setErrorMessage("");
		try {
			const token = localStorage.getItem("token"); 
			const res = await fetch("http://localhost:8080/api/accounts", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`,
				},
				body: JSON.stringify({
          id : data.ID,
          fullname : data.Fullname, 
          email : data.Email, 
          password : null, 
          address : data.AddressAcc, 
          privilege : data.Privilege || "", 
          stt : data.AgentStatus || "", 
          responsibleField : data.ResponsibleField || "", 
          membership : data.Membership || "",
        }),
			});

			const result = await res.json();

			if (!res.ok) {
				setErrorMessage(result.error || result.message || "Cập nhật thất bại");
				setTimeout(() => setErrorMessage(""), 4000);
			} else {
				setSuccessMessage("Cập nhật thành công!");
				setTimeout(() => setSuccessMessage(""), 3000);
			}
		} catch (err) {
			console.error(err);
			setErrorMessage("Lỗi kết nối server.");
			setTimeout(() => setErrorMessage(""), 3000);
		} finally {
			setLoading(false);
		}
	};

  const handleChange = (key, val) => {
    setFormData({ ...formData, [key]: val });
  };

  return (
    <AnimatePresence>
      {shouldRender && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Background Blur */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-md"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 18, stiffness: 220 }}
            className="
							relative w-full max-w-3xl p-10 rounded-3xl
							bg-white/10 dark:bg-gray-900/10
							backdrop-blur-2xl 
							border border-white/20 dark:border-gray-700/20
							shadow-[0_8px_60px_rgba(0,0,0,0.25)]
							text-white
            "
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white/70 hover:text-white text-3xl"
            >
              &times;
            </button>

            <h2 className="text-3xl font-semibold mb-8">Thông tin chi tiết của người dùng</h2>

            {/* Form grid */}
            <div className="grid grid-cols-2 gap-6">

              <FloatingInput
                label="Họ và tên"
                value={formData.Fullname || ""}
                onChange={(v) => handleChange("Fullname", v)}
              />

              <FloatingInput
                label="Email"
                value={formData.Email || ""}
                onChange={(v) => handleChange("Email", v)}
              />

              <FloatingSelect
                label="Vai trò"
                value={formData.Role || ""}
                onChange={(v) => handleChange("Role", v)}
                options={["Admin", "Agent", "Customer"]}
              />

              {formData.Role === "Agent" && (
                <FloatingSelect
                  label="Trạng thái hoạt động"
                  value={formData.AgentStatus || ""}
                  onChange={(v) => handleChange("AgentStatus", v)}
                  options={["Đang hoạt động","Không hoạt động"]}
                />
              )}

              {formData.Role === "Customer" && (
                <FloatingSelect
                  label="Hạng thành viên"
                  value={formData.Membership || ""}
                  onChange={(v) => handleChange("Membership", v)}
                  options={["Vàng", "Bạc", "Đồng"]}
                />
              )}

              {formData.Role === "Admin" && (
                <FloatingSelect
                  label="Quyền hạn"
                  value={formData.Privilege || ""}
                  onChange={(v) => handleChange("Privilege", v)}
                  options={["Quản lý chatbot", "Quản lý khách hàng", "Quản lý nhân viên","Quản lý form","Hỗ trợ kỹ thuật"]}
                />
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-10">							
							<motion.button
								whileTap={{ scale: 0.95 }}
								whileHover={{ scale: 1.05 }}
								onClick={() => setShowDeleteConfirm(true)}
								className="
									relative px-6 py-3 rounded-xl font-semibold text-white
									bg-red-600
									shadow-lg shadow-red-500/50
									transition-all
									before:absolute before:inset-0 before:rounded-xl before:bg-red-500/20
									before:opacity-0 before:transition-opacity
									hover:before:opacity-100
									after:absolute after:inset-0 after:rounded-xl after:ring-2 after:ring-red-400/50 after:opacity-0 after:transition-all
									hover:after:opacity-100
								"
							>
								Xóa tài khoản
							</motion.button>

							<motion.button
								whileTap={{ scale: 0.95 }}
								onClick={() => handleSave(formData)}
								className="
									px-8 py-3 rounded-xl font-semibold text-white
									bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700
									shadow-lg shadow-blue-500/30 hover:shadow-xl transition-all
								"
								disabled={loading}
							>
								{loading ? "Đang lưu..." : "Lưu thay đổi"}
							</motion.button>

            </div>
          </motion.div>
        </motion.div>
      )}

			<DeleteConfirm
				key={user?.ID}
				open={showDeleteConfirm}
				user={user}
				onClose={() => setShowDeleteConfirm(false)}
			/>

    </AnimatePresence>
  );
}
