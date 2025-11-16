import { useState, useRef, useEffect } from 'react';
import { Bell } from 'lucide-react';

const NotificationDropdown = () => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState([]);
  const dropdownRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  const fetchNotifications = async () => {
    if (!userId) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:8080/api/notifications/my`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (!Array.isArray(data)) {
        setNotifications([]);
        return;
      }

      setNotifications(
        data.map(n => ({
          id: n.NoID,
          content: n.Content,
          time: formatTime(n.SentDate),
          unread: true,
          image: "/avatar1.jpg"
        }))
      );

    } catch (err) {
      console.error("Lỗi tải thông báo:", err);
    }
  };


  const formatTime = (dateString) => {
    if (!dateString) return "";
    const now = new Date();
    const date = new Date(dateString);
    const diff = Math.floor((now - date) / 1000);

    if (diff < 60) return "Vừa xong";
    if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;
    return `${Math.floor(diff / 86400)} ngày trước`;
  };

  useEffect(() => {
    if (open) fetchNotifications();
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => n.unread).length;

  const filtered =
    activeTab === "unread"
      ? notifications.filter(n => n.unread)
      : notifications;

  return (
    <div className="relative ml-auto" ref={dropdownRef}>
      {/*  Bell Icon */}
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition"
      >
        <Bell className="h-6 w-6 text-gray-700 dark:text-gray-300" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center 
          bg-red-500 text-white text-xs font-bold rounded-full shadow-md">
            {unreadCount}
          </span>
        )}
      </button>

      {/*  Dropdown */}
      {open && (
        <div className="absolute right-0 mt-3 w-96 max-h-[600px] overflow-y-auto 
          bg-white dark:bg-gray-800 shadow-2xl rounded-2xl border border-gray-200 
          dark:border-gray-700 animate-fadeDown z-5000">

          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-t-2xl shadow text-white flex justify-between">
            <h3 className="text-lg font-bold">Thông báo</h3>
            <button className="text-sm opacity-80 hover:opacity-100">Xem tất cả</button>
          </div>

          {/* Tabs */}
          <div className="flex px-4 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
            <button
              onClick={() => setActiveTab("all")}
              className={`py-2 mr-4 text-sm font-semibold border-b-2
                ${activeTab === "all" ? "border-black dark:border-white text-black dark:text-white"
                : "border-transparent text-gray-500 dark:text-gray-400"}`}>
              Tất cả
            </button>

            <button
              onClick={() => setActiveTab("unread")}
              className={`py-2 text-sm font-semibold border-b-2 flex items-center gap-1
                ${activeTab === "unread" ? "border-black dark:border-white text-black dark:text-white"
                : "border-transparent text-gray-500 dark:text-gray-400"}`}>
              Chưa đọc
              {unreadCount > 0 && (
                <span className="text-xs bg-red-500 text-white rounded-full px-2 py-0.5">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>

          {/* Items */}
          <ul className="divide-y dark:divide-gray-700">
            {filtered.length > 0 ? filtered.map((item) => (
              <li key={item.id}
                className="flex gap-4 p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition rounded-xl mx-2 mt-2">

                {/* Avatar */}
                <div className="relative">
                  <img src={item.image} className="w-12 h-12 rounded-full" />
                  {item.unread && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-800" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 text-sm">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {item.content}
                  </p>
                  <p className="text-gray-400 text-xs mt-1">{item.time}</p>

                  <div className="mt-2 flex gap-2">
                    <button className="px-3 py-1 text-xs bg-blue-100 dark:bg-gray-600 text-blue-600 dark:text-blue-300 rounded-lg hover:opacity-80">
                      Xem
                    </button>
                    <button className="px-3 py-1 text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:opacity-80">
                      Đã đọc
                    </button>
                  </div>
                </div>
              </li>
            )) : (
              <li className="p-6 text-center text-gray-500 dark:text-gray-400">
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
