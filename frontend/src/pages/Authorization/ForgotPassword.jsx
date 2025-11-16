"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function ForgotPassword() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ id: "", email: "" })
  const [submitStatus, setSubmitStatus] = useState(null) // null | "success" | "error"
  const [oldPassword, setOldPassword] = useState("") // mật khẩu cũ từ API
  const [showOverlay, setShowOverlay] = useState(false) // hiển thị overlay

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setSubmitStatus(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("http://localhost:8080/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, id: formData.id }),
      })
      const data = await response.json()

      if (response.ok) {
        setOldPassword(data.message)
        setShowOverlay(true)
        setSubmitStatus("success")
      } else {
        throw new Error(data.error || "Đã có lỗi xảy ra")
      }
    } catch (error) {
      setSubmitStatus("error")
      console.error(error)
    }
  }

  const gradientVariants = {
    animate: {
      background: ["linear-gradient(to right, #59599B 0%, #24243E 59%, #0F0C29 100%)"],
      transition: { duration: 15, repeat: Infinity, ease: "easeInOut" },
    },
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left gradient side */}
      <motion.div
        className="hidden lg:flex w-1/2 relative"
        variants={gradientVariants}
        animate="animate"
      ></motion.div>

      {/* Right content */}
      <motion.div
        className="flex w-full flex-col justify-center px-8 lg:w-1/2 dark:bg-gray-900"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <div className="mx-auto w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="mb-12 flex items-center justify-between">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-all"
            >
              <span>←</span> Quay lại Trang chủ
            </button>
            <button
              onClick={() => navigate("/signin")}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Đã có tài khoản? ĐĂNG NHẬP
            </button>
          </div>

          {/* Title */}
          <motion.h1
            className="mb-8 text-center text-4xl font-extrabold text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            LẤY LẠI MẬT KHẨU
          </motion.h1>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="mb-6 text-center text-gray-600">
              Vui lòng nhập ID và email để xác nhận tài khoản
            </p>

            {/* ID */}
            <div className="relative">
              <input
                type="text"
                name="id"
                placeholder="1234"
                value={formData.id}
                onChange={handleChange}
                className={`w-full border px-4 py-3 placeholder-gray-400 focus:outline-none rounded-lg transition-all text-gray-400 ${
                  submitStatus === "error"
                    ? "border-red-500 animate-shake"
                    : "border-gray-300 focus:ring-2 focus:ring-blue-500"
                }`}
              />
              <span className="absolute right-3 top-3 text-gray-400">🆔</span>
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={handleChange}
                className={`w-full border px-4 py-3 placeholder-gray-400 focus:outline-none rounded-lg transition-all text-gray-400 ${
                  submitStatus === "error"
                    ? "border-red-500 animate-shake"
                    : "border-gray-300 focus:ring-2 focus:ring-blue-500"
                }`}
              />
              <span className="absolute right-3 top-3 text-gray-400">✉️</span>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              className="w-full bg-gray-900 dark:bg-gray-800 py-3 text-white dark:text-gray-200 font-semibold rounded-lg shadow-lg flex justify-center items-center gap-2"
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
                    <Check size={20} /> Xác nhận thành công!
                  </motion.span>
                ) : (
                  <span>TIẾP TỤC →</span>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.form>

          <motion.div className="mt-8 text-center text-sm text-gray-500 hover:text-gray-700 cursor-pointer">
            Cần trợ giúp?
          </motion.div>
        </div>
      </motion.div>

      {/* Overlay hiển thị mật khẩu */}
      {showOverlay && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-lg">
          <motion.div
            className="bg-white/10 p-8 rounded-2xl shadow-xl text-center text-white relative max-w-lg mx-auto shadow-lg"
            style={{
              boxShadow: "8px 8px 15px rgba(0, 0, 0, 0.2), -8px -8px 15px rgba(255, 255, 255, 0.3)",
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
          >
            <p className="mb-4 text-2xl font-bold text-gray-400">Mật khẩu hiện tại của bạn là:</p>
            <p className="text-xl text-gray-400 font-extrabold">{oldPassword.split(": ")[1]}</p>
            
            <motion.button
              onClick={() => navigate("/signin")}
              className="mt-6 px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:scale-105 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Quay về Đăng nhập
            </motion.button>
          </motion.div>
        </div>
      )}
    </div>
  )
}
