"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"

export function SignIn() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  // 🧠 Tạo 3 tài khoản mẫu khi lần đầu load trang
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || []
    if (users.length === 0) {
      const defaultUsers = [
        { email: "admin@example.com", password: "admin123", role: "admin" },
        { email: "agent@example.com", password: "agent123", role: "agent" },
        { email: "customer@example.com", password: "customer123", role: "customer" },
      ]
      localStorage.setItem("users", JSON.stringify(defaultUsers))
      console.log("✅ Created default users:", defaultUsers)
    }
  }, [])

  // 🧩 Hàm auto fill & auto login
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
          console.log("✅ Auto login successful:", foundUser)

          if (foundUser.role === "admin") navigate("/admin/")
          else if (foundUser.role === "agent") navigate("/agent/")
          else navigate("/customer/")
        }
      }, 300)
    }
  }

  // 🧩 Cập nhật giá trị input
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // 🧩 Xử lý đăng nhập thủ công
  const handleSubmit = (e) => {
    e.preventDefault()
    const users = JSON.parse(localStorage.getItem("users")) || []

    const foundUser = users.find(
      (u) => u.email === formData.email && u.password === formData.password
    )

    if (foundUser) {
      console.log("✅ Sign in successful:", foundUser)
      localStorage.setItem("user", JSON.stringify(foundUser))

      if (foundUser.role === "admin") navigate("/admin/")
      else if (foundUser.role === "agent") navigate("/agent/")
      else navigate("/customer/")
    } else {
      alert("❌ Thông tin đăng nhập không chính xác")
    }
  }

  // 🧹 Reset dữ liệu test
  const handleResetData = () => {
    localStorage.removeItem("users")
    localStorage.removeItem("user")
    alert("🧹 Đã xoá dữ liệu test khỏi localStorage!")
    window.location.reload()
  }

  return (
    <div className="flex h-screen">
      {/* Left gradient side */}
      <div
        className="hidden w-1/2 lg:block"
        style={{
          background: "linear-gradient(to right, #59599B 0%, #24243E 59%, #0F0C29 100%)",
        }}
      />

      {/* Right content */}
      <div className="flex w-full flex-col justify-center px-8 lg:w-1/2">
        <div className="mx-auto w-full max-w-md">
          {/* Header */}
          <div className="mb-12 flex items-center justify-between">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <span>←</span>
              <span>Quay lại Trang chủ</span>
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Chưa là thành viên? ĐĂNG KÝ
            </button>
          </div>

          {/* Title */}
          <h1 className="mb-8 text-center text-4xl font-bold text-gray-900">
            CHÀO MỪNG
            <br />
            ĐĂNG NHẬP NGAY
          </h1>

          {/* 🔹 Debug Tools */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <button
              type="button"
              onClick={() => handleAutoFill("admin", true)}
              className="px-3 py-1 text-xs rounded-md bg-gray-900 text-white hover:bg-gray-800"
            >
              Auto Admin
            </button>
            <button
              type="button"
              onClick={() => handleAutoFill("agent", true)}
              className="px-3 py-1 text-xs rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Auto Agent
            </button>
            <button
              type="button"
              onClick={() => handleAutoFill("customer", true)}
              className="px-3 py-1 text-xs rounded-md bg-emerald-600 text-white hover:bg-emerald-700"
            >
              Auto Customer
            </button>
            <button
              type="button"
              onClick={handleResetData}
              className="px-3 py-1 text-xs rounded-md bg-red-100 hover:bg-red-200 text-red-700 border border-red-300"
            >
              Reset Data
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-3 placeholder-gray-400 focus:border-blue-500 focus:outline-none rounded-md"
              />
              <span className="absolute right-3 top-3 text-gray-400">✉️</span>
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-3 placeholder-gray-400 focus:border-blue-500 focus:outline-none rounded-md"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="mt-6 w-full bg-gray-900 py-3 text-white font-semibold hover:bg-gray-800 rounded-md flex items-center justify-center gap-2"
            >
              Chuyển tới tài khoản của tôi
              <span>→</span>
            </button>
          </form>

          {/* Forgot password */}
          <div className="mt-4 text-center">
            <button
              onClick={() => navigate("/forgot-password")}
              className="text-sm text-red-600 hover:text-red-700"
            >
              Quên mật khẩu? Nhấn ở đây
            </button>
          </div>

          {/* Help */}
          <div className="mt-8 text-center">
            <button className="text-sm text-gray-500 hover:text-gray-700">
              Cần trợ giúp?
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
