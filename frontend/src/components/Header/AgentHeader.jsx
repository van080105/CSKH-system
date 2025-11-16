import { Menu, Search } from "lucide-react";
import { LanguageSwitcher } from "../LanguageSwitcher";
import NotificationDropdown from "../NotificationDropdown";
import { useTranslation } from "react-i18next";
import UserMenu from "../UserMenu";

export function AgentHeader({ onToggleSidebar }) {
  const { t } = useTranslation();

  return (
    <header className="h-16 px-6 flex items-center gap-4
      bg-gradient-to-r from-orange-400 via-pink-400 to-yellow-300
      dark:from-purple-600 dark:via-pink-500 dark:to-orange-400
      shadow-md rounded-b-xl border-b-2 border-white/50 dark:border-gray-300/30">

      {/* Toggle Sidebar */}
      <button
        onClick={onToggleSidebar}
        className="p-2 rounded-lg transform transition-all duration-300
          hover:scale-110 hover:shadow-md hover:shadow-pink-400/50
          text-white dark:text-black"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Logo/Title */}
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-extrabold text-white dark:text-black
          bg-clip-text text-transparent 
          bg-gradient-to-r from-yellow-200 via-pink-300 to-orange-400 
          drop-shadow-md">
          AGENT HERO
        </h1>
        <span className="px-2 py-0.5 text-xs font-bold rounded-full
          bg-gradient-to-r from-pink-400 via-orange-400 to-yellow-300
          text-white shadow-md animate-pulse">
          AGENT
        </span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4 ml-auto">
        <NotificationDropdown className="hover:scale-110 hover:shadow-md hover:shadow-pink-400/50 transition-all duration-300"/>
        <LanguageSwitcher className="hover:scale-110 hover:shadow-md hover:shadow-orange-400/50 transition-all duration-300"/>
        <UserMenu className="relative">
          <div className="absolute -top-1 -right-1 px-2 py-0.5 text-xs font-bold 
            bg-gradient-to-r from-pink-400 via-orange-400 to-yellow-300 
            text-white rounded-full shadow-md animate-pulse">
            AGENT
          </div>
        </UserMenu>
      </div>
    </header>
  );
}
