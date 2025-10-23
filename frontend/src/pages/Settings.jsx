import { useTheme } from "../hooks/useTheme"
import { useLocation, Link, Outlet } from "react-router-dom"
import {
  FaMoon,
  FaLanguage,
  FaBell,
  FaLock,
  FaRegUser,
} from "react-icons/fa"
import { useState } from "react"
import { useTranslation } from "react-i18next"

const Settings = ({ showElement = true }) => {
  const { theme, changeTheme } = useTheme()
  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)

  const { t , i18n} = useTranslation()
  const language = i18n.language

  const [notifications, setNotifications] = useState(true)
  const handleLanguageChange = (e) => {
    const newLang = e.target.value
    i18n.changeLanguage(newLang)
  }

  const toggleNotifications = () => setNotifications(!notifications)

  const location = useLocation()
  const isOnChangePassword = location.pathname.endsWith("/change-password")

  return (
    <div
      className={`min-h-screen ${
        isDark ? "bg-gray-900" : "bg-gray-100"
      } transition duration-500`}
    >
      <div className="container mx-auto p-12 space-y-8">
        <h1
          className={`text-4xl font-extrabold text-center ${
            isDark ? "text-white" : "text-black"
          } mb-10`}
        >
          {t("settings")}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Theme mode selector */}
          <div
            className={`p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all text-center ${
              isDark ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex items-center space-x-4 justify-center">
              <FaMoon className="text-xl text-gray-400" />
              <span
                className={`font-semibold text-lg ${
                  isDark ? "text-white" : "text-black"
                }`}
              >
                {t("theme")}
              </span>
              <select
                value={theme}
                onChange={(e) => changeTheme(e.target.value)}
                className="bg-gray-200 text-black px-4 py-2 rounded-md"
              >
                <option value="light">🌞 {t("light")}</option>
                <option value="dark">🌙 {t("dark")}</option>
                <option value="system">💻 {t("system")}</option>
              </select>
            </div>
          </div>

          {/* Ngôn ngữ */}
          <div
            className={`p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all text-center ${
              isDark ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="flex items-center space-x-4 justify-center">
              <FaLanguage className="text-xl text-blue-600" />
              <span
                className={`font-semibold text-lg ${
                  isDark ? "text-white" : "text-black"
                }`}
              >
                {t("language")}
              </span>
              <select
                value={language}
                onChange={handleLanguageChange}
                className="bg-gray-200 text-black px-4 py-2 rounded-md"
              >
                <option value="en">English</option>
                <option value="vi">Tiếng Việt</option>
              </select>
            </div>
          </div>

          {/* Thông báo */}
          {showElement && (
            <div
              className={`p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all text-center ${
                isDark ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div className="flex items-center space-x-4 justify-center">
                <FaBell className="text-xl text-green-500" />
                <span
                  className={`font-semibold text-lg ${
                    isDark ? "text-white" : "text-black"
                  }`}
                >
                  {notifications ? t("turnOnNotification") : t("turnOffNotification")}
                </span>
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={toggleNotifications}
                />
              </div>
            </div>
          )}

          {/* Quản lý tài khoản */}
          {showElement && (
            <div
              className={`p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all text-center ${
                isDark ? "bg-gray-800" : "bg-white"
              }`}
            >
              <Link
                to="/profile"
                className="flex items-center space-x-4 justify-center"
              >
                <FaRegUser className="text-xl text-purple-600" />
                <span
                  className={`font-semibold text-lg ${
                    isDark ? "text-white" : "text-black"
                  }`}
                >
                  {t("manageAccount")}
                </span>
              </Link>
            </div>
          )}

          {/* Thay đổi mật khẩu */}
          {showElement && (
            <div
              className={`p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all text-center ${
                isDark ? "bg-gray-800" : "bg-white"
              }`}
            >
              <Link
                to="change-password"
                className={`flex items-center space-x-4 justify-center ${
                  isOnChangePassword ? "pointer-events-none opacity-50" : ""
                }`}
              >
                <FaLock className="text-xl text-teal-500" />
                <span
                  className={`font-semibold text-lg ${
                    isDark ? "text-white" : "text-black"
                  }`}
                >
                  {t("changePassword")}
                </span>
              </Link>
            </div>
          )}
        </div>

        <Outlet />
      </div>
    </div>
  )
}

export default Settings
