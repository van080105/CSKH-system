import {
  Home,
  LayoutDashboard,
  Ticket,
  HelpCircle,
  FileText,
  Settings,
  LogOut,
  ShoppingBag,
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"

export function CustomerSidebar() {
  const linkClass =
    "w-full flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white transition-colors"
  const activeClass =
    "bg-indigo-600 text-white font-medium hover:bg-indigo-700"
  const inactiveClass = "text-gray-600 dark:text-gray-300"
  const { t } = useTranslation()
  const location = useLocation()
  const isHomeActive = location.pathname === "/customer/"
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
    <aside className="w-[220px] h-full border-r border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-700 flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-bold">
          <span className="text-gray-900 dark:text-gray-100">Mock</span>
          <span className="text-indigo-600">Stack</span>
        </h1>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        <NavLink
          to="/customer/"
          className={`${linkClass} ${isHomeActive ? activeClass : inactiveClass}`}
        >
          <Home className="h-4 w-4" />
          {t("homepage")}
        </NavLink>

        <NavLink
          to="/customer/products"
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
          to="/customer/orders"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          <LayoutDashboard className="h-4 w-4" />
          Order
        </NavLink>

        <NavLink
          to="/customer/tickets"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          <Ticket className="h-4 w-4" />
          Tickets
        </NavLink>

        <NavLink
          to="/customer/faq"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          <HelpCircle className="h-4 w-4" />
          {t("FAQ")}
        </NavLink>

        <NavLink
          to="/customer/profile"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          <FileText className="h-4 w-4" />
          {t("personalInformation")}
        </NavLink>

      </nav>

      <div className="p-3 space-y-1 border-t border-gray-200 dark:border-gray-700">
        <NavLink
          to="/customer/settings"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : inactiveClass}`
          }
        >
          <Settings className="h-4 w-4" />
          {t("settings")}
        </NavLink>

        <NavLink
          onClick={handleLogout}
          to="/"
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
