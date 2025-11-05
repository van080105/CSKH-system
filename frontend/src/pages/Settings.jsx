import { useTheme } from "../hooks/useTheme"
import { useLocation, useNavigate } from "react-router-dom"
import {
  Moon,
  Sun,
  Monitor,
  Globe,
  Bell,
  Lock,
  User,
  X,
  ChevronRight,
} from "lucide-react"
import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { ChangePassword } from "./Authorization/ChangePassword"

const Settings = ({ showElement = true }) => {
  const { theme, changeTheme } = useTheme()
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()

  const [notifications, setNotifications] = useState(true)
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false)
  const [isModalAnimating, setIsModalAnimating] = useState(false)

  // Get user role for role-specific navigation
  const getUserRole = () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"))
      return user?.role || "guest"
    } catch {
      return "guest"
    }
  }

  const userRole = getUserRole()
  const getRolePath = (basePath) => {
    if (userRole === "guest") return basePath
    return `/${userRole}${basePath}`
  }

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)

  // Check if we're on change-password route and show modal
  useEffect(() => {
    if (location.pathname.endsWith("/change-password")) {
      setShowChangePasswordModal(true)
      // Trigger animation after a tiny delay
      setTimeout(() => setIsModalAnimating(true), 10)
    } else {
      setIsModalAnimating(false)
    }
  }, [location.pathname])

  const handleCloseModal = () => {
    // Start exit animation
    setIsModalAnimating(false)
    // Wait for animation to complete before closing
    setTimeout(() => {
      setShowChangePasswordModal(false)
      // Navigate back to settings without change-password
      const basePath = location.pathname.replace("/change-password", "")
      navigate(basePath)
    }, 300) // Match animation duration
  }

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang)
  }

  const toggleNotifications = () => setNotifications(!notifications)

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1
            className={`text-3xl font-bold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {t("settings")}
          </h1>
          <p
            className={`mt-2 text-sm ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {t("manageAccountSettings")}
          </p>
        </div>

        {/* Settings Grid - Modern Card Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Theme Settings */}
          <div
            className={`rounded-xl border transition-all hover:shadow-lg ${
              isDark
                ? "bg-gray-800 border-gray-700 hover:border-gray-600"
                : "bg-white border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      isDark ? "bg-gray-700" : "bg-indigo-100"
                    }`}
                  >
                    <Moon
                      className={`h-5 w-5 ${
                        isDark ? "text-indigo-400" : "text-indigo-600"
                      }`}
                    />
                  </div>
                  <div>
                    <h3
                      className={`font-semibold ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {t("theme")}
                    </h3>
                    <p
                      className={`text-xs mt-0.5 ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {t("customizeAppearance")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                {[
                  { value: "light", icon: Sun, label: t("light") },
                  { value: "dark", icon: Moon, label: t("dark") },
                  { value: "system", icon: Monitor, label: t("system") },
                ].map((option) => {
                  const Icon = option.icon
                  const isSelected = theme === option.value
                  return (
                    <button
                      key={option.value}
                      onClick={() => changeTheme(option.value)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                        isSelected
                          ? isDark
                            ? "bg-indigo-900/50 text-indigo-300 border border-indigo-700"
                            : "bg-indigo-50 text-indigo-700 border border-indigo-200"
                          : isDark
                          ? "hover:bg-gray-700 text-gray-300"
                          : "hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-4 w-4" />
                        <span className="text-sm font-medium">
                          {option.label}
                        </span>
                      </div>
                      {isSelected && (
                        <div className="h-2 w-2 rounded-full bg-indigo-500" />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Language Settings */}
          <div
            className={`rounded-xl border transition-all hover:shadow-lg ${
              isDark
                ? "bg-gray-800 border-gray-700 hover:border-gray-600"
                : "bg-white border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      isDark ? "bg-gray-700" : "bg-blue-100"
                    }`}
                  >
                    <Globe
                      className={`h-5 w-5 ${
                        isDark ? "text-blue-400" : "text-blue-600"
                      }`}
                    />
                  </div>
                  <div>
                    <h3
                      className={`font-semibold ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {t("language")}
                    </h3>
                    <p
                      className={`text-xs mt-0.5 ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      {t("chooseYourLanguage")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                {[
                  { value: "en", label: "English", flag: "🇬🇧" },
                  { value: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
                ].map((lang) => {
                  const isSelected = i18n.language === lang.value
                  return (
                    <button
                      key={lang.value}
                      onClick={() => handleLanguageChange(lang.value)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                        isSelected
                          ? isDark
                            ? "bg-blue-900/50 text-blue-300 border border-blue-700"
                            : "bg-blue-50 text-blue-700 border border-blue-200"
                          : isDark
                          ? "hover:bg-gray-700 text-gray-300"
                          : "hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{lang.flag}</span>
                        <span className="text-sm font-medium">{lang.label}</span>
                      </div>
                      {isSelected && (
                        <div className="h-2 w-2 rounded-full bg-blue-500" />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Notifications Settings */}
          {showElement && (
            <div
              className={`rounded-xl border transition-all hover:shadow-lg ${
                isDark
                  ? "bg-gray-800 border-gray-700 hover:border-gray-600"
                  : "bg-white border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        isDark ? "bg-gray-700" : "bg-green-100"
                      }`}
                    >
                      <Bell
                        className={`h-5 w-5 ${
                          isDark ? "text-green-400" : "text-green-600"
                        }`}
                      />
                    </div>
                    <div>
                      <h3
                        className={`font-semibold ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {t("notifications")}
                      </h3>
                      <p
                        className={`text-xs mt-0.5 ${
                          isDark ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {t("manageNotifications")}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <div
                    className={`flex items-center justify-between p-4 rounded-lg ${
                      isDark ? "bg-gray-700/50" : "bg-gray-50"
                    }`}
                  >
                    <span
                      className={`text-sm font-medium ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {notifications
                        ? t("turnOnNotification")
                        : t("turnOffNotification")}
                    </span>
                    <button
                      onClick={toggleNotifications}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notifications
                          ? "bg-indigo-600"
                          : isDark
                          ? "bg-gray-600"
                          : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notifications ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Profile Management */}
          {showElement && (
            <div
              className={`rounded-xl border transition-all hover:shadow-lg cursor-pointer ${
                isDark
                  ? "bg-gray-800 border-gray-700 hover:border-gray-600"
                  : "bg-white border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => navigate(getRolePath("/profile"))}
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        isDark ? "bg-gray-700" : "bg-purple-100"
                      }`}
                    >
                      <User
                        className={`h-5 w-5 ${
                          isDark ? "text-purple-400" : "text-purple-600"
                        }`}
                      />
                    </div>
                    <div>
                      <h3
                        className={`font-semibold ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {t("manageAccount")}
                      </h3>
                      <p
                        className={`text-xs mt-0.5 ${
                          isDark ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {t("updateProfileInformation")}
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    className={`h-5 w-5 ${
                      isDark ? "text-gray-400" : "text-gray-400"
                    }`}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Change Password */}
          {showElement && (
            <div
              className={`rounded-xl border transition-all duration-300 ease-out hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${
                isDark
                  ? "bg-gray-800 border-gray-700 hover:border-gray-600 hover:bg-gray-700"
                  : "bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => {
                setShowChangePasswordModal(true)
                navigate(location.pathname + "/change-password")
                // Trigger animation after modal is rendered
                setTimeout(() => setIsModalAnimating(true), 10)
              }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        isDark ? "bg-gray-700" : "bg-teal-100"
                      }`}
                    >
                      <Lock
                        className={`h-5 w-5 ${
                          isDark ? "text-teal-400" : "text-teal-600"
                        }`}
                      />
                    </div>
                    <div>
                      <h3
                        className={`font-semibold ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {t("changePassword")}
                      </h3>
                      <p
                        className={`text-xs mt-0.5 ${
                          isDark ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {t("updateYourPassword")}
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    className={`h-5 w-5 ${
                      isDark ? "text-gray-400" : "text-gray-400"
                    }`}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Change Password Modal Overlay - In Place */}
      {showChangePasswordModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Background overlay */}
          <div
            className={`fixed inset-0 transition-opacity duration-300 ease-out ${
              isModalAnimating
                ? "opacity-100"
                : "opacity-0"
            } ${
              isDark
                ? "bg-gray-900 bg-opacity-75"
                : "bg-gray-50 bg-opacity-40"
            }`}
            onClick={handleCloseModal}
          />

          {/* Modal panel - centered in place */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <div
              className={`relative w-full max-w-lg rounded-2xl shadow-2xl transform transition-all duration-300 ease-out ${
                isModalAnimating
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95"
              } ${
                isDark ? "bg-gray-800" : "bg-white"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div
                className={`px-6 py-4 border-b flex items-center justify-between ${
                  isDark
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                }`}
              >
                <h3
                  className={`text-xl font-semibold ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  {t("changePassword")}
                </h3>
                <button
                  onClick={handleCloseModal}
                  className={`transition-colors ${
                    isDark
                      ? "text-gray-400 hover:text-gray-300"
                      : "text-gray-400 hover:text-gray-500"
                  }`}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Content */}
              <div className={`px-6 py-6 ${isDark ? "bg-gray-800" : "bg-white"}`}>
                <ChangePassword
                  onClose={handleCloseModal}
                  onSuccess={() => {
                    // Success handling is done in ChangePassword component
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Settings
