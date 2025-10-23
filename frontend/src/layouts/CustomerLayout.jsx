import { Outlet } from "react-router-dom"
import { CustomerSidebar } from "../components/Sidebar/CustomerSidebar"
import { Header } from "../components/Header"

export default function CustomerLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      <CustomerSidebar />
      <div className="flex flex-1 flex-col h-full">
        <Header />
        <main className="flex-1 overflow-y-auto">
          {/* Render các route con như /profile, /orders ở đây */}
          <Outlet />
        </main>
      </div>
    </div>
  )
}
