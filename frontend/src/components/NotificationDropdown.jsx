import { useState, useRef, useEffect } from 'react';
import { Bell } from 'lucide-react';

const notifications = [
  { id: 1, title: "SALE IS LIVE 1", content: "Lorem ipsum dolor sit amet.", time: "1m ago", unread: true, image: "/avatar1.jpg" },
  { id: 2, title: "SALE IS LIVE 2", content: "Lorem ipsum dolor sit amet.", time: "1m ago", unread: true, image: "/avatar1.jpg" },
  { id: 3, title: "SALE IS LIVE 3", content: "Lorem ipsum dolor sit amet.", time: "10 Hrs ago", unread: false, image: "/avatar1.jpg" },
  { id: 4, title: "SALE IS LIVE 4", content: "Lorem ipsum dolor sit amet.", time: "15 Hrs ago", unread: false, image: "/avatar1.jpg" },
];

const NotificationDropdown = () => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const dropdownRef = useRef(null);

  const unreadCount = notifications.filter((n) => n.unread).length;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredNotifications =
    activeTab === "unread"
      ? notifications.filter((n) => n.unread)
      : notifications;

  return (
    <div className="relative ml-auto" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-transform transform hover:scale-105"
      >
        <Bell className="h-6 w-6 text-gray-700 dark:text-gray-300" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-gradient-to-tr from-red-500 to-pink-500 text-white text-xs font-semibold rounded-full shadow-md">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-96 max-h-[600px] overflow-y-auto bg-white dark:bg-gray-800 shadow-2xl rounded-xl border border-gray-200 dark:border-gray-700 z-50 transform transition-all duration-300 scale-95 opacity-0 animate-slideDown">
          {/* Header */}
          <div 
            className="p-4 border-b dark:border-gray-700 flex justify-between items-center rounded-t-xl shadow-md" 
            style={{ background: 'linear-gradient(90deg, #22C5F8, #B3A0E5)' }}
          >

            <h3 className="font-bold text-lg text-white tracking-wide">THÔNG BÁO</h3>
            <button className="text-sm text-white hover:text-blue-200 transition">Xem tất cả</button>
          </div>

          {/* Tabs */}
          <div className="flex px-4 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <button
              className={`py-2 mr-4 font-semibold border-b-2 transition ${activeTab === "all" ? "border-black dark:border-white text-black dark:text-white" : "border-transparent text-gray-500 dark:text-gray-400"}`}
              onClick={() => setActiveTab("all")}
            >
              Chung
            </button>
            <button
              className={`py-2 font-semibold border-b-2 transition flex items-center gap-1 ${activeTab === "unread" ? "border-black dark:border-white text-black dark:text-white" : "border-transparent text-gray-500 dark:text-gray-400"}`}
              onClick={() => setActiveTab("unread")}
            >
              Chưa đọc
              {unreadCount > 0 && (
                <span className="text-xs bg-gradient-to-tr from-red-500 to-pink-500 text-white rounded-full px-2 py-0.5 shadow-sm">{unreadCount}</span>
              )}
            </button>
          </div>

          {/* Notifications */}
          <ul className="divide-y dark:divide-gray-700">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((item) => (
                <li key={item.id} className="flex p-4 gap-4 items-start bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-transform transform hover:scale-[1.02] rounded-lg shadow-sm mb-2 mx-2">
                  <div className="relative">
                    <img src={item.image} alt="thumb" className="w-12 h-12 rounded-full object-cover" />
                    {item.unread && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-800" />
                    )}
                  </div>
                  <div className="flex-1 text-sm">
                    <p className="font-bold text-gray-900 dark:text-white">{item.title}</p>
                    <p className="text-gray-600 dark:text-gray-400">{item.content}</p>
                    <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">{item.time}</p>
                    
                    <div className="mt-2 flex gap-2">
                      <button className="px-2 py-1 text-xs text-blue-600 dark:text-blue-400 hover:underline rounded bg-blue-50 dark:bg-gray-700 transition">Xem</button>
                      <button className="px-2 py-1 text-xs text-gray-500 dark:text-gray-300 hover:underline rounded bg-gray-100 dark:bg-gray-700 transition">Đánh dấu đã đọc</button>
                    </div>
                    
                  </div>
                </li>
              ))
            ) : (
              <li className="p-6 text-center text-gray-500 dark:text-gray-400 text-sm">
                Không có thông báo.
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
