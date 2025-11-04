import { useState, useRef, useEffect } from 'react';
import { Bell, MessageCircle } from 'lucide-react';
import { NavLink

 } from 'react-router-dom';
const notifications = [
  {
    id: 1,
    title: "SALE IS LIVE 1",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    time: "1m ago",
    unread: true,
    image: "/avatar1.jpg",
  },
  {
    id: 2,
    title: "SALE IS LIVE 2",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    time: "1m ago",
    unread: true,
    image: "/avatar1.jpg",
  },
  {
    id: 3,
    title: "SALE IS LIVE 3",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    time: "10 Hrs ago",
    unread: false,
    image: "/avatar1.jpg",
  },
  {
    id: 4,
    title: "SALE IS LIVE 4",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    time: "15 Hrs ago",
    unread: false,
    image: "/avatar1.jpg",
  },
];

const NotificationDropdown = () => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const dropdownRef = useRef(null);

  const unreadCount = notifications.filter((n) => n.unread).length;

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
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
        className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
      >
        <Bell className="h-5 w-5 text-gray-700 dark:text-gray-300" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-red-500 text-white text-xs font-semibold rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-96 max-h-[600px] overflow-y-auto bg-white dark:bg-gray-800 shadow-xl rounded-xl z-50 border border-gray-200 dark:border-gray-700">
          {/* Header */}
          <div
            className="p-4 border-b dark:border-gray-700 flex justify-between items-center"
            style={{ background: 'linear-gradient(to right, #22C5F8, #B3A0E5)' }}
          >
            <h3 className="font-bold text-lg text-white">THÔNG BÁO</h3>
            <button className="text-sm text-white hover:text-blue-200 transition">Xem tất cả</button>
          </div>

          {/* Tabs */}
          <div className="flex px-4 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <button
              className={`py-2 mr-4 font-semibold border-b-2 transition ${
                activeTab === "all"
                  ? "border-black dark:border-white text-black dark:text-white"
                  : "border-transparent text-gray-500 dark:text-gray-400"
              }`}
              onClick={() => setActiveTab("all")}
            >
              Chung
            </button>
            <button
              className={`py-2 font-semibold border-b-2 transition ${
                activeTab === "unread"
                  ? "border-black dark:border-white text-black dark:text-white"
                  : "border-transparent text-gray-500 dark:text-gray-400"
              }`}
              onClick={() => setActiveTab("unread")}
            >
              Chưa đọc
              <span className="ml-1 text-xs bg-red-500 text-white rounded px-1">
                {unreadCount}
              </span>
            </button>
          </div>

          {/* Notification Items */}
          <ul className="divide-y dark:divide-gray-700">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((item) => (
                <li key={item.id} className="flex p-4 gap-4 items-start bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt="thumb"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {item.unread && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                        2
                      </span>
                    )}
                  </div>
                  <div className="flex-1 text-sm">
                    <p className="font-bold text-gray-900 dark:text-white">{item.title}</p>
                    <p className="text-gray-600 dark:text-gray-400">{item.content}</p>
                    <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">{item.time}</p>
                  </div>
                </li>
              ))
            ) : (
              <li className="p-4 text-center text-gray-500 dark:text-gray-400 text-sm">
                Không có thông báo.
              </li>
            )}
          </ul>

          {/* Footer */}
          <div className="p-4 border-t dark:border-gray-700 text-center">
            <NavLink
              to="/contact"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center gap-2 mt-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:opacity-90 transition font-medium shadow-md"
            >
              <MessageCircle className="w-5 h-5" />
              Liên hệ với nhân viên
            </NavLink>
          </div>

        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
