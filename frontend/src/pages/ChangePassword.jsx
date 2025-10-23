"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Eye, EyeOff } from "lucide-react" // Import các icon

export function ChangePassword() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  })

  const [errors, setErrors] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Toggle password visibility
  const handleTogglePassword = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  // Form validation
  const validateForm = () => {
    let formErrors = {}
    let valid = true

    // Old Password Validation
    if (!formData.oldPassword) {
      formErrors.oldPassword = t("passwordRequired")
      valid = false
    } else if (formData.oldPassword.length < 8) {
      formErrors.oldPassword = t("passwordMinLength")
      valid = false
    }

    // New Password Validation
    if (!formData.newPassword) {
      formErrors.newPassword = t("passwordRequired")
      valid = false
    } else if (formData.newPassword.length < 8) {
      formErrors.newPassword = t("passwordMinLength")
      valid = false
    }

    // New password should not be same as the old password
    if (formData.newPassword === formData.oldPassword) {
      formErrors.newPassword = t("newPasswordSameAsOld")
      valid = false
    }

    // Confirm Password Validation
    if (!formData.confirmPassword) {
      formErrors.confirmPassword = t("passwordRequired")
      valid = false
    } else if (formData.confirmPassword !== formData.newPassword) {
      formErrors.confirmPassword = t("passwordsDontMatch")
      valid = false
    }

    setErrors(formErrors)
    return valid
  }


  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate form before submitting
    if (validateForm()) {
      console.log("Changed password successfully")
      alert("Changed password successfully")
      // Here you can send the form data to the server to update the password
      // navigate("/success") // Navigate to a success page after submission
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">{t("changePassword")}</h1>
        <p className="text-center text-gray-600 mb-8">{t("changePasswordSafety")}</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Old Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t("oldPassword")}</label>
            <div className="relative">
              <input
                type={showPassword.oldPassword ? "text" : "password"}
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
              />
              <button
                type="button"
                onClick={() => handleTogglePassword("oldPassword")}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-sm text-blue-500"
              >
                {showPassword.oldPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.oldPassword && <p className="text-red-500 text-xs mt-1">{errors.oldPassword}</p>}
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t("newPassword")}</label>
            <div className="relative">
              <input
                type={showPassword.newPassword ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
              />
              <button
                type="button"
                onClick={() => handleTogglePassword("newPassword")}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-sm text-blue-500"
              >
                {showPassword.newPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.newPassword && <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>}
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t("confirmNewPassword")}</label>
            <div className="relative">
              <input
                type={showPassword.confirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
              />
              <button
                type="button"
                onClick={() => handleTogglePassword("confirmPassword")}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-sm text-blue-500"
              >
                {showPassword.confirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>

          {/* Change Password Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            {t("confirmChangePassword")}
          </button>
        </form>
      </div>
    </div>
  )
}
