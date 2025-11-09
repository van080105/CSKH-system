"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Eye, EyeOff, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function ForgotPassword() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [submitStatus, setSubmitStatus] = useState(null) // null | "success" | "error"

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setSubmitStatus(null)
  }

  const handleStep1Submit = (e) => {
    e.preventDefault()
    const users = JSON.parse(localStorage.getItem("users")) || []
    const existingUser = users.find(
      (user) => user.email === formData.email && user.name === formData.name
    )

    if (!existingUser) {
      setSubmitStatus("error")
    } else {
      setSubmitStatus("success")
      setTimeout(() => setStep(2), 800)
    }
  }

  const handleStep2Submit = (e) => {
    e.preventDefault()
    if (formData.newPassword !== formData.confirmPassword) {
      setSubmitStatus("error")
      return
    }

    const users = JSON.parse(localStorage.getItem("users")) || []
    const updatedUsers = users.map((user) =>
      user.email === formData.email
        ? { ...user, password: formData.newPassword }
        : user
    )
    localStorage.setItem("users", JSON.stringify(updatedUsers))
    setSubmitStatus("success")

    setTimeout(() => {
      navigate("/signin")
    }, 1000)
  }

  const gradientVariants = {
    animate: {
      background: [
        "linear-gradient(to right, #59599B 0%, #24243E 59%, #0F0C29 100%)",
      ],
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

          {/* Step 1: Xác nhận thông tin */}
          {step === 1 && (
            <motion.form
              onSubmit={handleStep1Submit}
              className="space-y-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <p className="mb-6 text-center text-gray-600">
                Nhập tên người dùng và email để xác nhận tài khoản
              </p>

              {/* Name input */}
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  placeholder="nguyenvana"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full border px-4 py-3 placeholder-gray-400 focus:outline-none rounded-lg transition-all ${
                    submitStatus === "error"
                      ? "border-red-500 animate-shake"
                      : "border-gray-300 focus:ring-2 focus:ring-blue-500"
                  }`}
                />
                <span className="absolute right-3 top-3 text-gray-400">👤</span>
              </div>

              {/* Email input */}
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full border px-4 py-3 placeholder-gray-400 focus:outline-none rounded-lg transition-all ${
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
          )}

          {/* Step 2: Đặt lại mật khẩu */}
          {step === 2 && (
            <motion.form
              onSubmit={handleStep2Submit}
              className="space-y-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <p className="mb-6 text-center text-gray-600">
                Nhập mật khẩu mới cho tài khoản của bạn
              </p>

              {/* New password */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  placeholder="Mật khẩu mới"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className={`w-full border px-4 py-3 placeholder-gray-400 focus:outline-none rounded-lg transition-all ${
                    submitStatus === "error"
                      ? "border-red-500 animate-shake"
                      : "border-gray-300 focus:ring-2 focus:ring-blue-500"
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

              {/* Confirm password */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Xác nhận mật khẩu mới"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full border px-4 py-3 placeholder-gray-400 focus:outline-none rounded-lg transition-all ${
                    submitStatus === "error"
                      ? "border-red-500 animate-shake"
                      : "border-gray-300 focus:ring-2 focus:ring-blue-500"
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
                      <Check size={20} /> Đổi mật khẩu thành công!
                    </motion.span>
                  ) : (
                    <span>XÁC NHẬN →</span>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.form>
          )}

          {/* Help link */}
          <motion.div className="mt-8 text-center text-sm text-gray-500 hover:text-gray-700 cursor-pointer">
            Cần trợ giúp?
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
