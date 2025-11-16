import { Menu, Search } from "lucide-react";
import { NavLink } from "react-router-dom";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { useTranslation } from "react-i18next";

export function GuestHeader({ onToggleSidebar }) {
  const { t } = useTranslation();

  return (
    <header className="h-16 border-b border-gray-200 bg-white px-6 flex items-center gap-4 dark:bg-gray-900 dark:border-gray-700">
      <button 
        onClick={onToggleSidebar}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
      >
        <Menu className="h-5 w-5 text-gray-700 dark:text-gray-300" />
      </button>

      <div className="flex items-center gap-4 ml-auto">
        <LanguageSwitcher />
        <div className="flex items-center gap-3">
          <NavLink
            to="/contact"
            className="text-sm font-medium text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
          >
            {t("contact")}
          </NavLink>

          <NavLink
            to="/signin"
            className="text-sm font-medium text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
          >
            {t("signIn")}
          </NavLink>

          <NavLink
            to="/signup"
            className="text-sm font-medium bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 transition-all"
          >
            {t("signUp")}
          </NavLink>
        </div>
      </div>
    </header>
  );
}

