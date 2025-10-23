"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"

export function SignUp() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "guest",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newUserAdmin = {
      ...formData,
      role: "admin", 
    }

    const newUserCustomer = {
      ...formData,
      role: "customer",
    }

    const newUserAgent = {
      ...formData,
      role: "agent", 
    }

    // Lưu thông tin người dùng vào localStorage
    localStorage.removeItem("user")
    localStorage.setItem("user", JSON.stringify(newUserCustomer))
    console.log("New account created:", newUserCustomer)

    // Điều hướng đến trang chính hoặc dashboard
    navigate("/signin")
  }

  return (
    <div className="flex h-screen">
      {/* Left gradient sidebar */}
      <div 
        className="hidden w-1/2 lg:block" 
        style={{ 
          background: 'linear-gradient(to right, #59599B 0%, #24243E 59%, #0F0C29 100%)' 
        }} 
      />

      {/* Right content */}
      <div className="flex w-full flex-col justify-center px-8 lg:w-1/2">
        <div className="mx-auto w-full max-w-md">
          {/* Header */}
          <div className="mb-12 flex items-center justify-between">
            <button onClick={() => navigate("/")} className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <span>←</span>
              <span>Quay lại Trang chủ</span>
            </button>
            <button onClick={() => navigate("/signin")} className="text-sm text-blue-600 hover:text-blue-700">
              Đã có tài khoản? ĐĂNG NHẬP
            </button>
          </div>

          {/* Title */}
          <h1 className="mb-8 text-center text-4xl font-bold text-gray-900">
            ĐĂNG KÝ
            <br />
            THÀNH VIÊN NGAY
          </h1>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name input */}
            <div className="relative">
              <input
                type="text"
                name="name"
                placeholder="Nguyễn Văn A"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-3 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
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
                className="w-full border border-gray-300 px-4 py-3 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              />
              <span className="absolute right-3 top-3 text-gray-400">✉️</span>
            </div>

            {/* Password input */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-3 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              <span className="absolute right-12 top-3 text-xs text-gray-400">Hiện mật khẩu</span>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="mt-6 w-full bg-gray-900 py-3 text-white font-semibold hover:bg-gray-800 flex items-center justify-center gap-2"
            >
              ĐĂNG KÝ NGAY BÂY GIỜ
              <span>→</span>
            </button>
          </form>

          {/* Help link */}
          <div className="mt-8 text-center">
            <button className="text-sm text-gray-500 hover:text-gray-700">Cần trợ giúp?</button>
          </div>
        </div>
      </div>
    </div>
  )
}
