import { Menu, Search } from "lucide-react";
import { LanguageSwitcher } from "../LanguageSwitcher";
import NotificationDropdown from "../NotificationDropdown";
import { useTranslation } from "react-i18next";
import UserMenu from "../UserMenu";

export function AdminHeader({ onToggleSidebar }) {
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

      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white dark:text-black" />
        <input
          type="text"
          placeholder={t("search")}
          className="w-full pl-9 pr-4 py-2 rounded-full 
            bg-white/20 dark:bg-black/30 text-white dark:text-black 
            border-2 border-transparent focus:border-white/70 dark:focus:border-cyan-400 
            focus:ring-2 focus:ring-pink-400 dark:focus:ring-cyan-400 
            placeholder-white/70 dark:placeholder-black/70 
            shadow-lg transition-all duration-300 backdrop-blur-sm"
        />
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4 ml-auto">
        <NotificationDropdown className="hover:scale-110 hover:shadow-lg hover:shadow-pink-400/50 transition-all duration-300"/>
        <LanguageSwitcher className="hover:scale-110 hover:shadow-lg hover:shadow-indigo-400/50 transition-all duration-300"/>
        <UserMenu className="relative">
          <div className="absolute -top-1 -right-1 px-2 py-0.5 text-xs font-bold 
            bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 
            text-white rounded-full shadow-lg animate-pulse">
            ADMIN
          </div>
        </UserMenu>
      </div>
    </header>
  );
}
