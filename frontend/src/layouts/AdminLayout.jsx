import { useState } from "react"
import { Outlet } from "react-router-dom"
import { AdminSidebar } from "../components/Sidebar/AdminSidebar"
import { AdminHeader } from "../components/Header/AdminHeader"

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className={`transition-all duration-300 ease-in-out overflow-hidden
        bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700
        ${sidebarOpen ? "w-54" : "w-0"}
      `}>
        <AdminSidebar />
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col h-full transition-all duration-300 ease-in-out">
        <AdminHeader onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
