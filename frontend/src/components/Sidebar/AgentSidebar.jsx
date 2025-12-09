import {
  MessageSquare,
  Ticket,
  HelpCircle,
  FileText,
  Settings,
  LogOut,
  ShoppingBag,
  User2Icon,
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"

export function AgentSidebar() {
  const linkClass =
    "w-full flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white transition-colors"
  const activeClass =
    "bg-indigo-600 text-white font-medium hover:bg-indigo-700"
  const { t } = useTranslation()
  const location = useLocation()
  const isHomeActive = location.pathname === "/agent/inbox"
  const handleLogout = async () => {
    try{
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8080/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      if(!res.ok){
        throw new Error("Logout failed:")
      }
      navigate("/", {
        replace: true,
      });
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <aside className="w-[220px] h-full border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-bold">
          <span className="text-gray-900 dark:text-white">Mock</span>
          <span className="text-indigo-600">Stack</span>
        </h1>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        <NavLink
          to="/agent/inbox"
          className={`${linkClass} ${isHomeActive ? activeClass : "text-gray-600 dark:text-gray-300"}`}
        >
          <MessageSquare className="h-4 w-4" />
          {t("inbox")}
        </NavLink>

        <NavLink
          to="/agent/customers"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : "text-gray-600 dark:text-gray-300"}`
          }
        >
          <User2Icon className="h-4 w-4" />
          Khách hàng
        </NavLink>

        <NavLink
          to="/agent/tickets"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : "text-gray-600 dark:text-gray-300"}`
          }
        >
          <Ticket className="h-4 w-4" />
          Forms
        </NavLink>

        <NavLink
          to="/agent/faq"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : "text-gray-600 dark:text-gray-300"}`
          }
        >
          <HelpCircle className="h-4 w-4" />
          {t("FAQ")}
        </NavLink>

        <NavLink
          to="/agent/profile"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : "text-gray-600 dark:text-gray-300"}`
          }
        >
          <FileText className="h-4 w-4" />
          {t("personalInformation")}
        </NavLink>

        <NavLink
          to="/agent/products"
          className={({ isActive }) =>
            `${linkClass} ${
              isActive ? activeClass : "text-gray-600 dark:text-gray-300"
            }`
          }
        >
          <ShoppingBag className="h-4 w-4" />
          {t("productIntro")}
        </NavLink>

      </nav>

      <div className="p-3 space-y-1 border-t border-gray-200 dark:border-gray-700">
        <NavLink
          to="/agent/settings"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : "text-gray-600 dark:text-gray-300"}`
          }
        >
          <Settings className="h-4 w-4" />
          {t("settings")}
        </NavLink>

        <NavLink
          onClick={handleLogout}
          to="/"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : "text-gray-600 dark:text-gray-300"}`
          }
        >
          <LogOut className="h-4 w-4" />
          {t("logOut")}
        </NavLink>
      </div>
    </aside>
  )
}
