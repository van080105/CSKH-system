import { Outlet } from "react-router-dom"; 
import { AdminSidebar } from "../components/Sidebar/AdminSidebar";
import { Header } from "../components/Header";

export default function AdminLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      <AdminSidebar />
      <div className="flex flex-1 flex-col h-full">
        <Header />
        <main className="flex-1 overflow-y-auto">
          {/* Đây là nơi sẽ render các route con (như Dashboard, ManageUsers, v.v.) */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
