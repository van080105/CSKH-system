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
  const [loading, setLoading] = useState(false) // state to handle loading

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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setSubmitStatus(null)
  }

  const handleSubmit = async (e) => {
    if (e) e.preventDefault()

    const { email, password } = formData

    // Validate form data before submitting
    if (!email || !password) {
      setSubmitStatus("error")
      return
    }

    setLoading(true)
    setSubmitStatus(null)

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok && data.user) {
        setSubmitStatus("success")
        localStorage.setItem("user", JSON.stringify(data.user))
        localStorage.setItem("token", data.token)
        // console.log(data.token)
        setTimeout(() => {
          if (data.user.role.toLowerCase() === "admin") navigate("/admin/dashboard")
          else if (data.user.role.toLowerCase() === "agent") navigate("/agent/inbox")
          else navigate("/customer/")
        }, 2100)
      } else {
        setSubmitStatus("error")
        alert(data.message || "Đăng nhập thất bại!")
      }
    } catch (error) {
      setSubmitStatus("error")
      alert("Có lỗi khi kết nối đến máy chủ!")
    } finally {
      setLoading(false)
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
                className={`w-full border px-4 py-3 placeholder-gray-400 focus:outline-none rounded-lg transition-all text-gray-600 dark:text-white ${
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
                className={`w-full border px-4 py-3 placeholder-gray-400 focus:outline-none rounded-lg transition-all text-gray-600 dark:text-white ${
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
                  <span>{loading ? "Đang đăng nhập..." : "Chuyển tới tài khoản của tôi →"}</span>
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
