"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Eye, EyeOff, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function SignIn() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [submitStatus, setSubmitStatus] = useState(null) // null | "success" | "error"

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || []
    if (users.length === 0) {
      const defaultUsers = [
        { email: "admin@example.com", password: "admin123", role: "admin" },
        { email: "agent@example.com", password: "agent123", role: "agent" },
        { email: "customer@example.com", password: "customer123", role: "customer" },
      ]
      localStorage.setItem("users", JSON.stringify(defaultUsers))
    }
  }, [])

  const handleAutoFill = (role, autoLogin = false) => {
    const presets = {
      admin: { email: "admin@example.com", password: "admin123" },
      agent: { email: "agent@example.com", password: "agent123" },
      customer: { email: "customer@example.com", password: "customer123" },
    }
    const selected = presets[role]
    setFormData(selected)
    if (autoLogin) {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem("users")) || []
        const foundUser = users.find(
          (u) => u.email === selected.email && u.password === selected.password
        )
        if (foundUser) {
          localStorage.setItem("user", JSON.stringify(foundUser))
          if (foundUser.role === "admin") navigate("/admin/")
          else if (foundUser.role === "agent") navigate("/agent/inbox/")
          else navigate("/customer/")
        }
      }, 300)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setSubmitStatus(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const users = JSON.parse(localStorage.getItem("users")) || []
    const foundUser = users.find(
      (u) => u.email === formData.email && u.password === formData.password
    )
    if (foundUser) {
      setSubmitStatus("success")
      localStorage.setItem("user", JSON.stringify(foundUser))
      setTimeout(() => {
        if (foundUser.role === "admin") navigate("/admin/")
        else if (foundUser.role === "agent") navigate("/agent/inbox")
        else navigate("/customer/")
      }, 800)
    } else {
      setSubmitStatus("error")
    }
  }

  const handleResetData = () => {
    localStorage.removeItem("users")
    localStorage.removeItem("user")
    alert("🧹 Đã xoá dữ liệu test khỏi localStorage!")
    window.location.reload()
  }

  // Variants for gradient animation
  const gradientVariants = {
    animate: {
      background: [
        "linear-gradient(to right, #59599B 0%, #24243E 59%, #0F0C29 100%)",
        "linear-gradient(to right, #59599B 10%, #24243E 60%, #0F0C29 100%)",
        "linear-gradient(to right, #59599B 0%, #24243E 59%, #0F0C29 100%)",
      ],
      transition: { duration: 15, repeat: Infinity, ease: "easeInOut" },
    },
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left gradient side with animation */}
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
              onClick={() => navigate("/signup")}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Chưa là thành viên? ĐĂNG KÝ
            </button>
          </div>

          {/* Title */}
          <motion.h1
            className="mb-8 text-center text-4xl font-extrabold text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            CHÀO MỪNG <br /> ĐĂNG NHẬP NGAY
          </motion.h1>

          {/* Debug tools with ripple effect */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {["admin", "agent", "customer"].map((role) => (
              <motion.button
                key={role}
                type="button"
                onClick={() => handleAutoFill(role, true)}
                className={`px-3 py-1 text-xs rounded-md bg-gradient-to-r ${
                  role === "admin"
                    ? "from-gray-900 to-gray-700"
                    : role === "agent"
                    ? "from-indigo-600 to-indigo-400"
                    : "from-emerald-600 to-emerald-400"
                } text-white relative overflow-hidden`}
                whileTap={{ scale: 0.95 }}
              >
                {`Auto ${role.charAt(0).toUpperCase() + role.slice(1)}`}
                <span className="absolute inset-0 bg-white opacity-10 rounded-md scale-0 group-hover:scale-100 transition-transform"></span>
              </motion.button>
            ))}
            <button
              onClick={handleResetData}
              className="px-3 py-1 text-xs rounded-md bg-red-100 hover:bg-red-200 text-red-700 border border-red-300 transition-transform hover:scale-105"
            >
              Reset Data
            </button>
          </div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={handleChange}
                className={`w-full border px-4 py-3 placeholder-gray-400 focus:outline-none rounded-lg transition-all ${
                  submitStatus === "error" ? "border-red-500 animate-shake" : "border-gray-300 focus:ring-2 focus:ring-blue-500"
                }`}
              />
              <span className="absolute right-3 top-3 text-gray-400">✉️</span>
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className={`w-full border px-4 py-3 placeholder-gray-400 focus:outline-none rounded-lg transition-all ${
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
                    <Check size={20} /> Đăng nhập thành công!
                  </motion.span>
                ) : (
                  <span>Chuyển tới tài khoản của tôi →</span>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.form>

          <motion.div className="mt-4 text-center">
            <button
              onClick={() => navigate("/forgot-password")}
              className="text-sm text-red-600 hover:text-red-700"
            >
              Quên mật khẩu? Nhấn ở đây
            </button>
          </motion.div>

          <motion.div className="mt-8 text-center text-sm text-gray-500 hover:text-gray-700 cursor-pointer">
            Cần trợ giúp?
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
