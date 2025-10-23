import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Đóng menu khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Xử lý khi chọn menu
  const handleMenuClick = (path) => {
    setOpen(false); // đóng menu
    if (path) navigate(path);
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Nút avatar */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 px-2 py-1.5 rounded-lg
          hover:bg-gray-100 dark:hover:bg-gray-700 transition"
      >
        <img
          src="/diverse-woman-avatar.png"
          alt="Moni Roy"
          className="h-8 w-8 rounded-full object-cover"
        />
        <div className="text-left hidden md:block">
          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Moni Roy</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Admin</div>
        </div>
        <ChevronDown className="h-4 w-4 text-gray-700 dark:text-gray-300" />
      </button>

      {/* Dropdown menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 shadow-lg rounded-lg py-2 z-50 divide-y divide-neutral-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700">
          <MenuItem
            icon="/assets/profile.svg"
            label="Quản lý thông tin"
            onClick={() => handleMenuClick("/profile")}
          />
          <MenuItem
            icon="/assets/key.svg"
            label="Đổi mật khẩu"
            onClick={() => handleMenuClick("/forgot-password")}
          />
          <MenuItem
            icon="/assets/audit.svg"
            label="Nhật ký hoạt động"
            onClick={() => alert("Chức năng đang phát triển")}
          />
          <MenuItem
            icon="/assets/logout.svg"
            label="Đăng xuất"
            danger
            onClick={() => {
              // Xử lý logout ở đây
              console.log("Logging out...");
              navigate("/signin");
            }}
          />
        </div>
      )}
    </div>
  );
};

const MenuItem = ({ icon, label, danger, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-all duration-150
      ${
        danger
          ? "text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900"
          : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 dark:text-gray-300 dark:hover:bg-indigo-900 dark:hover:text-indigo-300"
      }
    `}
  >
    {icon && icon.includes(".svg") ? (
      <img src={icon} alt={label} className="w-5 h-5" />
    ) : (
      <span
        className={`text-base transition-colors duration-150 ${
          danger ? "text-red-400" : "text-indigo-400"
        }`}
      >
        {icon}
      </span>
    )}

    <span className="flex-1 text-left">{label}</span>
  </button>
);

export default UserMenu;
