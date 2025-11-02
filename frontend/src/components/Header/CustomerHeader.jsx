import { Menu, Search } from "lucide-react";
import { LanguageSwitcher } from "../LanguageSwitcher";
import NotificationDropdown from "../NotificationDropdown";
import { useTranslation } from "react-i18next";
import UserMenu from "../UserMenu";

export function CustomerHeader({ onToggleSidebar }) {
  const { t } = useTranslation();

  return (
    <header className="h-16 border-b border-gray-200 bg-white px-6 flex items-center gap-4 dark:bg-gray-900 dark:border-gray-700">
      <button 
        onClick={onToggleSidebar}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
      >
        <Menu className="h-5 w-5 text-gray-700 dark:text-gray-300" />
      </button>

      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
        <input
          type="text"
          placeholder={t("search")}
          className="w-full pl-9 pr-4 py-2 bg-gray-100 dark:bg-gray-800 dark:text-white border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex items-center gap-4 ml-auto">
        <NotificationDropdown />
        <LanguageSwitcher />
        <UserMenu />
      </div>
    </header>
  );
}

