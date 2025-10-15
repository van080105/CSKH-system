import { useState, useRef, useEffect } from 'react';
import { Bell } from 'lucide-react';

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
  const [activeTab, setActiveTab] = useState("all"); // 👈 NEW
  const dropdownRef = useRef(null);

  const unreadCount = notifications.filter((n) => n.unread).length;

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 👇 Filtered notifications based on activeTab
  const filteredNotifications =
    activeTab === "unread"
      ? notifications.filter((n) => n.unread)
      : notifications;

  return (
    <div className="relative ml-auto" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 hover:bg-gray-100 rounded-lg"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-red-500 text-white text-xs font-semibold rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-96 max-h-[600px] overflow-y-auto bg-white shadow-xl rounded-xl z-50">
          
          <div className="p-4 border-b flex justify-between items-center" style={{ background: 'linear-gradient(to right, #22C5F8, #B3A0E5)' }}>
            <h3 className="font-bold text-lg text-white">THÔNG BÁO</h3>
            <button className="text-sm text-white hover:text-blue-500">Xem tất cả</button>
          </div>

          {/* Tabs */}
          <div className="flex px-4 border-b">
            <button
              className={`py-2 mr-4 font-semibold border-b-2 ${
                activeTab === "all" ? "border-black" : "border-transparent text-gray-500"
              }`}
              onClick={() => setActiveTab("all")}
            >
              Chung
            </button>
            <button
              className={`py-2 font-semibold border-b-2 ${
                activeTab === "unread" ? "border-black" : "border-transparent text-gray-500"
              }`}
              onClick={() => setActiveTab("unread")}
            >
              Chưa đọc
              <span className="ml-1 text-xs bg-red-500 text-white rounded px-1">
                {unreadCount}
              </span>
            </button>
          </div>

          {/* Notification items */}
          <ul className="divide-y">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((item) => (
                <li key={item.id} className="flex p-4 gap-4 items-start">
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
                    <p className="font-bold">{item.title}</p>
                    <p className="text-gray-600">{item.content}</p>
                    <p className="text-gray-400 text-xs mt-1">{item.time}</p>
                  </div>
                </li>
              ))
            ) : (
              <li className="p-4 text-center text-gray-500 text-sm">Không có thông báo.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
