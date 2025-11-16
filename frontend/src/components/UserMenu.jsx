import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import profileIcon from "../assets/profile.svg?url";
import keyIcon from "../assets/key.svg?url";
import auditIcon from "../assets/audit.svg?url";
import logoutIcon from "../assets/logout.svg?url";

const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Get user role from localStorage
  const getUserRole = () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      return user?.role || "guest";
    } catch {
      return "guest";
    }
  };

  const userRole = getUserRole();
  const getUserInfo = () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      return {
        fullname: user?.fullname || "User Fullname",
        role: user?.role || "guest"
      };
    } 
    catch {
      return { fullname: "User Fullname", role: "guest" };
    }
  };

  const userInfo = getUserInfo();
  const roleLabels = {
    Admin: "Admin",
    Agent: "Agent",
    Customer: "Customer",
    guest: "Guest"
  };

  // Get role-specific paths
  const getRolePath = (basePath) => {
    if (userRole === "guest") return basePath;
    return `/${userRole.toLowerCase()}${basePath}`;
  };
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
          alt={userInfo.fullname}
          className="h-8 w-8 rounded-full object-cover"
          onError={(e) => {
            e.target.src = "/placeholder-user.jpg";
          }}
        />
        <div className="text-left hidden md:block">
          <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{userInfo.fullname}</div>
          <div className="text-xs text-gray-500 dark:text-gray-200">{roleLabels[userInfo.role] || "User"}</div>
        </div>
        <ChevronDown className="h-4 w-4 text-gray-700 dark:text-gray-300" />
      </button>

      {/* Dropdown menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 shadow-lg rounded-lg py-2 z-50 divide-y divide-neutral-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700">
          <MenuItem
            icon={profileIcon}
            label="Quản lý thông tin"
            onClick={() => handleMenuClick(getRolePath("/profile"))}
          />
          <MenuItem
            icon={keyIcon}
            label="Đổi mật khẩu"
            onClick={() => handleMenuClick(getRolePath("/settings/change-password"))}
          />
          <MenuItem
            icon={auditIcon}
            label="Nhật ký hoạt động"
            onClick={() => alert("Chức năng đang phát triển")}
          />
          <MenuItem
            icon={logoutIcon}
            label="Đăng xuất"
            danger
            onClick={() => {
              // Xử lý logout ở đây
              console.log("Logging out...");
              localStorage.removeItem("user");
              navigate("/");
            }}
          />
        </div>
      )}
    </div>
  );
};

const MenuItem = ({ icon, label, danger, onClick }) => {
  const isImagePath = icon && typeof icon === "string" && (icon.includes("/") || icon.includes("."));
  
  return (
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
      {isImagePath ? (
        <img 
          src={icon} 
          alt={label} 
          className="w-5 h-5"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      ) : icon ? (
        <span
          className={`text-base transition-colors duration-150 ${
            danger ? "text-red-400" : "text-indigo-400"
          }`}
        >
          {icon}
        </span>
      ) : null}

      <span className="flex-1 text-left">{label}</span>
    </button>
  );
};

export default UserMenu;
