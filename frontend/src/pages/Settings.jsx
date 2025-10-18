import { useState } from "react";
import { FaMoon, FaSun, FaLanguage, FaBell, FaLock, FaRegUser } from "react-icons/fa"; // Các icon thêm vào
import { Link } from "react-router-dom";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("en");
  const [notifications, setNotifications] = useState(true);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const handleLanguageChange = (e) => setLanguage(e.target.value);
  const toggleNotifications = () => setNotifications(!notifications);

  return (
    <div
      className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-100"} transition duration-500`}
    >
      <div className="container mx-auto p-12 space-y-8">
        <h1 className={`text-4xl font-extrabold text-center ${darkMode ? "text-white" : "text-black"} mb-10`}>Cài Đặt Hệ Thống</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Chế độ sáng/tối */}
          <div
            onClick={toggleDarkMode}
            className={`p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all cursor-pointer text-center ${darkMode ? "bg-gray-800" : "bg-white"}`}
          >
            <div className="flex items-center space-x-4 justify-center">
              <FaMoon className={`text-xl ${darkMode ? "text-yellow-400" : "text-gray-600"}`} />
              <span className={`font-semibold text-lg ${darkMode ? "text-white" : "text-black"}`}>{darkMode ? "Chế độ tối" : "Chế độ sáng"}</span>
              <FaSun className={`text-xl ${darkMode ? "text-gray-600" : "text-yellow-400"}`} />
            </div>
          </div>

          {/* Ngôn ngữ */}
          <div className={`p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all cursor-pointer text-center ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <div className="flex items-center space-x-4 justify-center">
              <FaLanguage className="text-xl text-blue-600" />
              <span className={`font-semibold text-lg ${darkMode ? "text-white" : "text-black"}`}>Ngôn ngữ</span>
              <select
                value={language}
                onChange={handleLanguageChange}
                className="bg-gray-200 text-black px-4 py-2 rounded-md"
              >
                <option value="en">Tiếng Anh</option>
                <option value="vn">Tiếng Việt</option>
              </select>
            </div>
          </div>

          {/* Thông báo */}
          <div className={`p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all cursor-pointer text-center ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <div className="flex items-center space-x-4 justify-center">
              <FaBell className="text-xl text-green-500" />
              <span className={`font-semibold text-lg ${darkMode ? "text-white" : "text-black"}`}>{notifications ? "Bật thông báo" : "Tắt thông báo"}</span>
              <input
                type="checkbox"
                checked={notifications}
                onChange={toggleNotifications}
                className="toggle-checkbox"
              />
            </div>
          </div>

          {/* Quản lý tài khoản */}
          <div className={`p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all cursor-pointer text-center ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <Link to="/profile" className="flex items-center space-x-4 justify-center">
              <FaRegUser className="text-xl text-purple-600" />
              <span className={`font-semibold text-lg ${darkMode ? "text-white" : "text-black"}`}>Quản lý tài khoản</span>
            </Link>
          </div>

          {/* Cài đặt bảo mật */}
          <div className={`p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all cursor-pointer text-center ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <Link to="/security-settings" className="flex items-center space-x-4 justify-center">
              <FaLock className="text-xl text-red-600" />
              <span className={`font-semibold text-lg ${darkMode ? "text-white" : "text-black"}`}>Cài đặt bảo mật</span>
            </Link>
          </div>

          {/* Thay đổi mật khẩu */}
          <div className={`p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all cursor-pointer text-center ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <Link to="/change-password" className="flex items-center space-x-4 justify-center">
              <FaLock className="text-xl text-teal-500" />
              <span className={`font-semibold text-lg ${darkMode ? "text-white" : "text-black"}`}>Thay đổi mật khẩu</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
