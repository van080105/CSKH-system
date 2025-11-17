import {
  Home,
  HelpCircle,
  Settings,
  LogIn,
  ShoppingBag,
  Code,
  MessageCircleMore
} from "lucide-react"
import { NavLink } from "react-router-dom"
import { useTranslation } from "react-i18next"

export function GuestSidebar() {
  const linkClass =
    "w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white"
  const activeClass =
    "bg-indigo-600 text-white font-medium hover:bg-indigo-700"

  const { t } = useTranslation()

  return (
    <aside className="w-[220px] h-full border-r border-gray-200 bg-white flex flex-col dark:bg-gray-900 dark:border-gray-700">
      <div className="p-6">
        <h1 className="text-xl font-bold">
          <span className="text-gray-900 dark:text-white">Mock</span>
          <span className="text-indigo-600">Stack</span>
        </h1>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${linkClass} ${
              isActive ? activeClass : "text-gray-600 dark:text-gray-300"
            }`
          }
        >
          <Home className="h-4 w-4" />
          {t("homepage")}
        </NavLink>

        <NavLink
          to="/faq"
          className={({ isActive }) =>
            `${linkClass} ${
              isActive ? activeClass : "text-gray-600 dark:text-gray-300"
            }`
          }
        >
          <HelpCircle className="h-4 w-4" />
          {t("FAQ")}
        </NavLink>

        <NavLink
          to="/products"
          className={({ isActive }) =>
            `${linkClass} ${
              isActive ? activeClass : "text-gray-600 dark:text-gray-300"
            }`
          }
        >
          <ShoppingBag className="h-4 w-4" />
          {t("productIntro")}
        </NavLink>

        <NavLink
          to="/dev-team"
          className={({ isActive }) =>
            `${linkClass} ${
              isActive ? activeClass : "text-gray-600 dark:text-gray-300"
            }`
          }
        >
          <Code className="h-4 w-4" />
          {t("devTeam")}
        </NavLink>

        <NavLink
          to="/service-feedback"
          className={({ isActive }) =>
            `${linkClass} ${
              isActive ? activeClass : "text-gray-600 dark:text-gray-300"
            }`
          }
        >
          <MessageCircleMore className="h-4 w-4" />
          {t("serviceFeedback")}
        </NavLink>
      </nav>

      <div className="p-3 space-y-1 border-t border-gray-200 dark:border-gray-700">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `${linkClass} ${
              isActive ? activeClass : "text-gray-600 dark:text-gray-300"
            }`
          }
        >
          <Settings className="h-4 w-4" />
          {t("settings")}
        </NavLink>

        <NavLink
          to="/signin"
          className={({ isActive }) =>
            `${linkClass} ${
              isActive ? activeClass : "text-gray-600 dark:text-gray-300"
            }`
          }
        >
          <LogIn className="h-4 w-4" />
          {t("logIn")}
        </NavLink>
      </div>
    </aside>
  )
}
