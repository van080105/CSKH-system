import { Menu, PlusCircle } from "lucide-react";
import { LanguageSwitcher } from "../LanguageSwitcher";
import NotificationDropdown from "../NotificationDropdown";
import { useTranslation } from "react-i18next";
import UserMenu from "../UserMenu";
import CreateNotification from "../../pages/CreateNotification";
import { useState } from "react";
export function AdminHeader({ onToggleSidebar }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <header className="h-16 px-6 flex items-center gap-4 
      bg-gradient-to-r from-indigo-500 via-pink-500 to-orange-500 
      dark:from-purple-700 dark:via-cyan-500 dark:to-pink-500
      shadow-[0_0_20px_rgba(0,0,0,0.4)] 
      backdrop-blur-md rounded-b-xl
      border-b-2 border-white/50 dark:border-gray-300/30">
      
      {/* Toggle Sidebar */}
      <button
        onClick={onToggleSidebar}
        className="p-2 rounded-lg transform transition-all duration-300
          hover:scale-110 hover:shadow-lg hover:shadow-indigo-400/50
          text-white dark:text-black"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Logo/Title */}
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-extrabold text-white dark:text-black
          bg-clip-text text-transparent 
          bg-gradient-to-r from-yellow-300 via-red-400 to-pink-500 
          drop-shadow-lg">
          ADMIN POWER
        </h1>
        <span className="px-2 py-0.5 text-xs font-bold rounded-full 
          bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 
          text-white shadow-lg animate-pulse">
          SUPER ADMIN
        </span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4 ml-auto">

        {/* Create Notification Button */}
        <button
          className="p-2 px-4 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-teal-400 
            text-white font-semibold text-sm shadow-md transition-all duration-300 
            transform hover:scale-105 hover:shadow-lg hover:shadow-teal-400/50 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          {t('Thêm thông báo')}
        </button>

        {/* Notification Dropdown */}
        <NotificationDropdown className="hover:scale-110 hover:shadow-lg hover:shadow-pink-400/50 transition-all duration-300"/>

        {/* Language Switcher */}
        <LanguageSwitcher className="hover:scale-110 hover:shadow-lg hover:shadow-indigo-400/50 transition-all duration-300"/>

        {/* User Menu */}
        <UserMenu className="relative">
          <div className="absolute -top-1 -right-1 px-2 py-0.5 text-xs font-bold 
            bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 
            text-white rounded-full shadow-lg animate-pulse">
            ADMIN
          </div>
        </UserMenu>
      </div>

      {/* Modal Create Notification */}
      <CreateNotification
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </header>
  );
}
