"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Eye, EyeOff, Check, AlertCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import ToastOverlay from "../../components/Overlay/ToastOverlay"

export function SignUp() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "Customer",
    privilege: "",
    responsibleField: "",
  })
  const [submitStatus, setSubmitStatus] = useState(null) // null | "success" | "error"
  const [errorMessage, setErrorMessage] = useState("")
  const [provinces, setProvinces] = useState([]);
  const [toast, setToast] = useState({ message: "", type: "success" });

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setSubmitStatus(null)
    setErrorMessage("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname: formData.name,
          email: formData.email,
          password: formData.password,
          address: formData.address || "",
          role: formData.role,
          privilege: formData.privilege || "",
          responsibleField: formData.responsibleField || "",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Đăng ký thất bại")
      }
      setSubmitStatus("success")
      
      setToast({ message: "Đăng ký thành công!", type: "success" });

      setTimeout(() => {
        navigate("/signin")
      }, 1800)

    } catch (err) {
      console.error(err)
      setSubmitStatus("error")
      setErrorMessage(err.message)
      setToast({ message: err.message, type: "error" });
    }
  }

  const gradientVariants = {
    animate: {
      background: [
        "linear-gradient(to right, #59599B 0%, #24243E 59%, #0F0C29 100%)",
        "linear-gradient(to right, #59599B 10%, #24243E 60%, #0F0C29 100%)",
        "linear-gradient(to right, #59599B 0%, #24243E 59%, #0F0C29 100%)",
      ],
      transition: { duration: 20, repeat: Infinity, ease: "easeInOut" },
    },
  }

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const res = await fetch("https://provinces.open-api.vn/api/v2/");
        const data = await res.json();
        setProvinces(data);
      } catch (error) {
        console.error("Lỗi tải danh sách tỉnh/thành:", error);
      }
    };

    fetchProvinces();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden font-sans">
      {/* Left gradient animated side */}
      <motion.div
        className="hidden lg:flex w-1/2 relative"
        variants={gradientVariants}
        animate="animate"
      >
      </motion.div>

      {/* Right content */}
      <motion.div
        className="flex w-full flex-col justify-center px-8 lg:w-1/2 dark:bg-gray-900"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <div className="mx-auto w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-10 relative overflow-hidden">
          
          {/* Success Overlay */}
          <AnimatePresence>
            {submitStatus === "success" && (
              <motion.div
                key="overlay-success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-0 bg-white/95 dark:bg-gray-900/95 flex flex-col items-center justify-center z-50 rounded-2xl"
              >
                <Check size={50} className="text-green-500 mb-4 animate-bounce" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Đăng ký thành công!
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-center">
                  Bạn sẽ được chuyển hướng đến trang đăng nhập trong giây lát.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-all"
            >
              ← Trang chủ
            </button>
            <button
              onClick={() => navigate("/signin")}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Đã có tài khoản? Đăng nhập
            </button>
          </div>

          <motion.h1
            className="mb-8 text-center text-3xl font-extrabold text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            ĐĂNG KÝ THÀNH VIÊN NGAY
          </motion.h1>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Name */}
            <div className="relative">
              <input
                type="text"
                name="name"
                placeholder="Họ và tên"
                value={formData.name}
                onChange={handleChange}
                className={`w-full border px-4 py-3 placeholder-gray-400 focus:outline-none rounded-lg transition-all ${
                  submitStatus === "error" ? "border-red-500 animate-shake" : "border-gray-300 focus:ring-2 focus:ring-blue-500"
                }`}
              />
              <span className="absolute right-3 top-3 text-gray-400">👤</span>
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full border px-4 py-3 placeholder-gray-400 focus:outline-none rounded-lg transition-all ${
                  submitStatus === "error" ? "border-red-500 animate-shake" : "border-gray-300 focus:ring-2 focus:ring-blue-500"
                }`}
              />
              <span className="absolute right-3 top-3 text-gray-400">✉️</span>
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Mật khẩu"
                value={formData.password}
                onChange={handleChange}
                className={`w-full border px-4 py-3 placeholder-gray-400 focus:outline-none rounded-lg transition-all text-gray-400 ${
                  submitStatus === "error" ? "border-red-500 animate-shake" : "border-gray-300 focus:ring-2 focus:ring-blue-500"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-transform hover:scale-110"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Address */}
            <div className="relative">
              <select
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 text-gray-400 bg-gray-100 dark:bg-gray-900"
              >
                <option value="">Chọn tỉnh/thành</option>
                {provinces.map((province) => (
                  <option key={province.code} value={province.name}>
                    {province.name}
                  </option>
                ))}
              </select>
              <span className="absolute right-3 top-3 text-gray-400">🏠</span>
            </div>


            {/* Role selection */}
            <div className="relative">
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 text-gray-400 bg-gray-100 dark:bg-gray-900"
              >
                <option value="Customer">Customer</option>
                <option value="Agent">Agent</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            {/* Conditional fields */}
            {formData.role === "Admin" && (
              <div className="relative">
                <input
                  type="text"
                  name="privilege"
                  placeholder="Privilege (Admin)"
                  value={formData.privilege}
                  onChange={handleChange}
                  className="w-full border px-4 py-3 placeholder-gray-400 focus:outline-none rounded-lg transition-all border-gray-300 focus:ring-2 focus:ring-blue-500 text-gray-400 bg-gray-100 dark:bg-gray-900"
                />
              </div>
            )}

            {formData.role === "Agent" && (
              <div className="relative">
                <select
                  name="responsibleField"
                  value={formData.responsibleField}
                  onChange={handleChange}
                  className="w-full border px-4 py-3 placeholder-gray-400 focus:outline-none rounded-lg transition-all border-gray-300 focus:ring-2 focus:ring-blue-500 text-gray-400 bg-gray-100 dark:bg-gray-900"
                >
                  <option value="" disabled>Chọn lĩnh vực phụ trách</option>
                  <option value="Tư vấn sản phẩm iPhone">Tư vấn sản phẩm iPhone</option>
                  <option value="Dịch vụ bảo hành & sửa chữa">Dịch vụ bảo hành & sửa chữa</option>
                  <option value="Chính sách & hỗ trợ khách hàng">Chính sách & hỗ trợ khách hàng</option>
                </select>
              </div>
            )}

            {/* Error message */}
            {submitStatus === "error" && (
              <div className="flex items-center gap-2 text-red-500 text-sm">
                <AlertCircle size={18} /> {errorMessage}
              </div>
            )}

            {/* Submit */}
            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-500 py-3 text-white font-semibold rounded-lg shadow-lg flex justify-center items-center gap-2"
              whileHover={{ scale: 1.03, boxShadow: "0px 10px 25px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence>
                {submitStatus === "success" ? (
                  <motion.span
                    key="success"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <Check size={20} /> Thành công!
                  </motion.span>
                ) : (
                  <span>Đăng ký ngay →</span>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.form>

          <motion.div className="mt-6 text-center text-sm text-gray-500 hover:text-gray-700 cursor-pointer">
            Cần trợ giúp?
          </motion.div>
        </div>
      </motion.div>

      <ToastOverlay
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "success" })}
      />

    </div>
  )
}
