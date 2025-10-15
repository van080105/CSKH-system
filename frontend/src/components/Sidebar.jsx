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
import { NavLink } from "react-router-dom"

export function Sidebar() {
  const linkClass =
    "w-full flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors"
  const activeClass =
    "bg-indigo-600 text-white font-medium hover:bg-indigo-700"

  return (
    <aside className="w-[220px] border-r border-gray-200 bg-white flex flex-col">
      <div className="p-6">
        <h1 className="text-xl font-bold">
          <span className="text-gray-900">Mock</span>
          <span className="text-indigo-600">Stack</span>
        </h1>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : "text-gray-600"}`
          }
        >
          <Home className="h-4 w-4" />
          Trang chủ
        </NavLink>

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : "text-gray-600"}`
          }
        >
          <LayoutDashboard className="h-4 w-4" />
          Dashboard
        </NavLink>

        <NavLink
          to="/users"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : "text-gray-600"}`
          }
        >
          <Users className="h-4 w-4" />
          Người dùng
        </NavLink>

        <NavLink
          to="/tickets"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : "text-gray-600"}`
          }
        >
          <Ticket className="h-4 w-4" />
          Tickets
        </NavLink>

        <NavLink
          to="/notifications"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : "text-gray-600"}`
          }
        >
          <HelpCircle className="h-4 w-4" />
          FAQ
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : "text-gray-600"}`
          }
        >
          <FileText className="h-4 w-4" />
          Thông tin cá nhân
        </NavLink>

        <NavLink
          to="/chatbot"
          className={({ isActive }) =>
            `${linkClass} ${isActive ? activeClass : "text-gray-600"}`
          }
        >
          <MessageSquare className="h-4 w-4" />
          Chatbot
        </NavLink>
      </nav>

      <div className="p-3 space-y-1 border-t border-gray-200">
        <button className={linkClass}>
          <Settings className="h-4 w-4" />
          Cài đặt
        </button>

        <button className={linkClass}>
          <LogOut className="h-4 w-4" />
          Đăng xuất
        </button>
      </div>
    </aside>
  )
}
