import {
  Home,
  LayoutDashboard,
  Users,
  Ticket,
  HelpCircle,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"

export function AdminSidebar() {
  const linkClass =
    "w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm"
  const activeClass =
    "bg-indigo-600 text-white font-medium hover:bg-indigo-700"
  const inactiveClass =
    "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"

  const { t } = useTranslation()
  const location = useLocation()
  const isHomeActive = location.pathname === "/admin"

  return (
    <aside className="w-[220px] h-full border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <h1 className="text-xl font-bold">
          <span className="text-gray-900 dark:text-white">Mock</span>
          <span className="text-indigo-600">Stack</span>
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1">
        <NavLink
          to="/admin/"
          className={`${linkClass} ${isHomeActive ? activeClass : inactiveClass}`}
        >
          <Home className="h-4 w-4" />
          {t("homepage")}
        </NavLink>

        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          <LayoutDashboard className="h-4 w-4" />
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          <Users className="h-4 w-4" />
          {t("users")}
        </NavLink>

        <NavLink
          to="/admin/tickets"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          <Ticket className="h-4 w-4" />
          Tickets
        </NavLink>

        <NavLink
          to="/admin/faq"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          <HelpCircle className="h-4 w-4" />
          {t("FAQ")}
        </NavLink>

        <NavLink
          to="/admin/profile"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          <FileText className="h-4 w-4" />
          {t("personalInformation")}
        </NavLink>

        <NavLink
          to="/admin/chatbot"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          <MessageSquare className="h-4 w-4" />
          Chatbot
        </NavLink>
      </nav>

      {/* Footer Settings */}
      <div className="p-3 space-y-1 border-t border-gray-200 dark:border-gray-700">
        <NavLink
          to="/admin/settings"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          <Settings className="h-4 w-4" />
          {t("settings")}
        </NavLink>

        <NavLink
          to="/signin"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          <LogOut className="h-4 w-4" />
          {t("logOut")}
        </NavLink>
      </div>
    </aside>
  )
}
