"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"

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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleStep1Submit = (e) => {
    e.preventDefault()
    console.log("Step 1:", { name: formData.name, email: formData.email })
    setStep(2)
  }

  const handleStep2Submit = (e) => {
    e.preventDefault()
    console.log("Step 2:", { newPassword: formData.newPassword })
    navigate("/signin")
  }

  return (
    <div className="flex h-screen">
      {/* Left gradient sidebar */}
      <div className="hidden w-1/2 bg-gradient-to-b from-blue-900 via-purple-900 to-purple-800 lg:block" />

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
            LẤY LẠI
            <br />
            MẬT KHẨU
          </h1>

          {/* Step 1: Email verification */}
          {step === 1 && (
            <form onSubmit={handleStep1Submit} className="space-y-4">
              <p className="mb-6 text-center text-gray-600">Vui lòng nhận LINK XÁC NHẬN ở Gmail</p>

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

              {/* Submit button */}
              <button
                type="submit"
                className="mt-6 w-full bg-gray-900 py-3 text-white font-semibold hover:bg-gray-800 flex items-center justify-center gap-2"
              >
                Lấy lại mật khẩu ngay
                <span>→</span>
              </button>
            </form>
          )}

          {/* Step 2: Reset password */}
          {step === 2 && (
            <form onSubmit={handleStep2Submit} className="space-y-4">
              {/* New password input */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  placeholder="Nhập mật khẩu mới"
                  value={formData.newPassword}
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
                <span className="absolute right-12 top-3 text-xs text-gray-400">Hiển</span>
              </div>

              {/* Confirm password input */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Xác nhận mật khẩu mới"
                  value={formData.confirmPassword}
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
                <span className="absolute right-12 top-3 text-xs text-gray-400">Hiển</span>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="mt-6 w-full bg-gray-900 py-3 text-white font-semibold hover:bg-gray-800 flex items-center justify-center gap-2"
              >
                Đăng nhập lại
                <span>→</span>
              </button>
            </form>
          )}

          {/* Help link */}
          <div className="mt-8 text-center">
            <button className="text-sm text-gray-500 hover:text-gray-700">Cần trợ giúp?</button>
          </div>
        </div>
      </div>
    </div>
  )
}
