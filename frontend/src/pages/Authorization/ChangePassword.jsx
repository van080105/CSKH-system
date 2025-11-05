"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Eye, EyeOff, CheckCircle } from "lucide-react"
import { useTheme } from "../../hooks/useTheme"

export function ChangePassword({ onClose, onSuccess }) {
  const { t } = useTranslation()
  const { theme } = useTheme()

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

  const [showSuccess, setShowSuccess] = useState(false)

  // Detect dark mode
  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
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
      
      // Reset form
      setFormData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
      setErrors({})
      
      // Show success notification
      setShowSuccess(true)
      
      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess()
      }
    }
  }

  // If showing success, display success notification
  if (showSuccess) {
    return (
      <div className="w-full animate-fadeIn">
        <div className="flex flex-col items-center justify-center py-8 px-4">
          <div
            className={`mb-4 p-4 rounded-full animate-bounceIn ${
              isDark ? "bg-green-900/30" : "bg-green-100"
            }`}
          >
            <CheckCircle
              className={`h-16 w-16 ${
                isDark ? "text-green-400" : "text-green-600"
              }`}
            />
          </div>
          <h3
            className={`text-2xl font-bold mb-2 animate-slideUp ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {t("success")}
          </h3>
          <p
            className={`text-center text-sm mb-6 animate-fadeIn ${
              isDark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            {t("passwordChangedSuccessfully")}
          </p>
          <button
            onClick={() => {
              setShowSuccess(false)
              if (onClose) {
                onClose()
              }
            }}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
          >
            {t("close")}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <p
          className={`text-center text-sm ${
            isDark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          {t("changePasswordSafety")}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Old Password */}
        <div>
          <label
            className={`block text-sm font-medium mb-2 ${
              isDark ? "text-gray-200" : "text-gray-700"
            }`}
          >
            {t("oldPassword")}
          </label>
          <div className="relative">
            <input
              type={showPassword.oldPassword ? "text" : "password"}
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                isDark
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:bg-gray-700"
                  : "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500 focus:bg-white"
              }`}
            />
            <button
              type="button"
              onClick={() => handleTogglePassword("oldPassword")}
              className={`absolute top-1/2 right-3 transform -translate-y-1/2 text-sm transition-colors ${
                isDark
                  ? "text-indigo-400 hover:text-indigo-300"
                  : "text-indigo-500 hover:text-indigo-600"
              }`}
            >
              {showPassword.oldPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.oldPassword && (
            <p className="text-red-500 text-xs mt-1">{errors.oldPassword}</p>
          )}
        </div>

        {/* New Password */}
        <div>
          <label
            className={`block text-sm font-medium mb-2 ${
              isDark ? "text-gray-200" : "text-gray-700"
            }`}
          >
            {t("newPassword")}
          </label>
          <div className="relative">
            <input
              type={showPassword.newPassword ? "text" : "password"}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                isDark
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:bg-gray-700"
                  : "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500 focus:bg-white"
              }`}
            />
            <button
              type="button"
              onClick={() => handleTogglePassword("newPassword")}
              className={`absolute top-1/2 right-3 transform -translate-y-1/2 text-sm transition-colors ${
                isDark
                  ? "text-indigo-400 hover:text-indigo-300"
                  : "text-indigo-500 hover:text-indigo-600"
              }`}
            >
              {showPassword.newPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.newPassword && (
            <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>
          )}
        </div>

        {/* Confirm New Password */}
        <div>
          <label
            className={`block text-sm font-medium mb-2 ${
              isDark ? "text-gray-200" : "text-gray-700"
            }`}
          >
            {t("confirmNewPassword")}
          </label>
          <div className="relative">
            <input
              type={showPassword.confirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                isDark
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:bg-gray-700"
                  : "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500 focus:bg-white"
              }`}
            />
            <button
              type="button"
              onClick={() => handleTogglePassword("confirmPassword")}
              className={`absolute top-1/2 right-3 transform -translate-y-1/2 text-sm transition-colors ${
                isDark
                  ? "text-indigo-400 hover:text-indigo-300"
                  : "text-indigo-500 hover:text-indigo-600"
              }`}
            >
              {showPassword.confirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className={`flex-1 px-4 py-3 border font-medium rounded-lg transition duration-200 ${
              isDark
                ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                : "border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            {t("cancel")}
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition duration-200"
          >
            {t("confirmChangePassword")}
          </button>
        </div>
      </form>
    </div>
  )
}
