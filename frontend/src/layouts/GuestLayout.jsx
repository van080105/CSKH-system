import { Outlet } from "react-router-dom";
import { GuestSidebar } from "../components/Sidebar/GuestSidebar";
import { Header } from "../components/Header";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function GuestLayout() {
  const { t } = useTranslation()
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      <GuestSidebar />
      <div className="flex flex-1 flex-col h-full">
        <Header
          showNotification={false}
          actions={
            <div className="flex items-center gap-3">
              <NavLink
                to="/signin"
                className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
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
          }
        />

        <main className="flex-1 overflow-y-auto">
          <Outlet /> {/* Dùng Outlet để hiển thị các route con */}
        </main>
        
      </div>
    </div>
  );
}
