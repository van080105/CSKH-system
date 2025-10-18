// src/components/UserMenu.jsx
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate(); // <-- thêm dòng này

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
        className="flex items-center gap-3 px-2 py-1.5 hover:bg-gray-100 rounded-lg"
      >
        <img
          src="/diverse-woman-avatar.png"
          alt="Moni Roy"
          className="h-8 w-8 rounded-full object-cover"
        />
        <div className="text-left hidden md:block">
          <div className="text-sm font-medium">Moni Roy</div>
          <div className="text-xs text-gray-500">Admin</div>
        </div>
        <ChevronDown className="h-4 w-4" />
      </button>

      {/* Dropdown menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg py-2 z-50 divide-y divide-neutral-200">
          <MenuItem
            icon="src/assets/profile.svg"
            label="Quản lý thông tin"
            onClick={() => handleMenuClick("/profile")} // <-- chuyển đến trang
          />
          <MenuItem
            icon="src/assets/key.svg"
            label="Đổi mật khẩu"
            onClick={() => handleMenuClick("/forgot-password")}
          />
          <MenuItem
            icon="src/assets/audit.svg"
            label="Nhật ký hoạt động"
            onClick={() => alert("Chức năng đang phát triển")}
          />
          <MenuItem
            icon="src/assets/logout.svg"
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
    onClick={onClick} // <- thêm sự kiện click
    className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-all duration-150
      ${
        danger
          ? "text-red-500 hover:bg-red-50 hover:text-red-600"
          : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
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
