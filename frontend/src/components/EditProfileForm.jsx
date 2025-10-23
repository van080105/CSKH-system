import { useState, useEffect } from "react";

const EditProfileForm = ({ onClose }) => {
  // State form
  const [fullName, setFullName] = useState("Nguyễn Văn A");
  const [email, setEmail] = useState("nguyenvana@gmail.com");
  const [phone, setPhone] = useState("0909123456");
  const [address, setAddress] = useState("Khu 1, phường 2, TP.HCM");
  const [role, setRole] = useState("admin");

  // Hiển thị animation
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(true); // để giữ modal trong DOM

  useEffect(() => {
    setIsVisible(true); // khi mount, animation mở sẽ chạy
  }, []);

  // Gọi hàm đóng mượt
  const handleClose = () => {
    setIsVisible(false); // chạy animation đóng
    setTimeout(() => {
      setShouldRender(false); // sau khi animation xong, unrender
      onClose(); // gọi callback của cha (ẩn modal)
    }, 300); // duration khớp với tailwind: duration-300
  };

  if (!shouldRender) return null; // không render nữa sau animation

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-all duration-300 ease-in-out"
        onClick={handleClose}
      ></div>

      {/* Form chỉnh sửa */}
      <div
        className={`bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8 rounded-lg w-full max-w-4xl shadow-lg relative z-10 transition-all duration-300 transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        {/* Nút đóng */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black dark:text-gray-300 dark:hover:text-white text-xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-6">Chỉnh sửa thông tin cá nhân</h2>

        <div className="grid grid-cols-2 gap-6">
          {/* Họ và tên */}
          <div>
            <label className="block text-sm font-medium mb-1">Họ và tên</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 rounded"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Địa chỉ email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 rounded"
            />
          </div>

          {/* ID */}
          <div>
            <label className="block text-sm font-medium mb-1">ID</label>
            <input
              type="text"
              value="523233"
              readOnly
              className="w-full border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 px-3 py-2 rounded"
            />
          </div>

          {/* Quyền hạn */}
          <div>
            <label className="block text-sm font-medium mb-1">Quyền hạn</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 rounded"
            >
              <option value="user">Người dùng</option>
              <option value="admin">Quản lý người dùng</option>
            </select>
          </div>

          {/* Số điện thoại */}
          <div>
            <label className="block text-sm font-medium mb-1">Số điện thoại</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 rounded"
            />
          </div>

          {/* Địa chỉ */}
          <div>
            <label className="block text-sm font-medium mb-1">Địa chỉ</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 rounded"
            />
          </div>
        </div>

        {/* Nút xác nhận */}
        <div className="mt-6">
          <button
            onClick={() => {
              console.log("Thông tin chỉnh sửa:", {
                fullName,
                email,
                phone,
                address,
                role,
              });
              handleClose(); // xử lý đóng mượt
            }}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium"
          >
            Xác nhận chỉnh sửa
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileForm;
