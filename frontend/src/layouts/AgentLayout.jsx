import { Outlet } from "react-router-dom";
import { AgentSidebar } from "../components/Sidebar/AgentSidebar"; // Đổi tên nếu có
import { Header } from "../components/Header";

export default function AgentLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      <AgentSidebar />
      <div className="flex flex-1 flex-col h-full">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <Outlet /> {/* Đây là nơi các route con như /tickets, /faq sẽ render */}
        </main>
      </div>
    </div>
  );
}
