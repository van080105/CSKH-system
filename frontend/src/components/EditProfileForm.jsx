import { useState, useEffect } from "react";

const EditProfileForm = ({ onClose }) => {
  // Tạo state cho từng trường
  const [fullName, setFullName] = useState("Nguyễn Văn A");
  const [email, setEmail] = useState("nguyenvana@gmail.com");
  const [phone, setPhone] = useState("0909123456");
  const [address, setAddress] = useState("Khu 1, phường 2, TP.HCM");
  const [role, setRole] = useState("admin");

  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => setIsVisible(true), []);

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-all duration-300 ease-in-out"
        onClick={onClose}
      ></div>

      {/* Form chỉnh sửa */}
      <div
        className={`bg-white p-8 rounded-lg w-full max-w-4xl shadow-lg relative z-10 transition-all duration-500 transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
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
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {/* Địa chỉ email */}
          <div>
            <label className="block text-sm font-medium mb-1">Địa chỉ email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {/* ID - không chỉnh sửa */}
          <div>
            <label className="block text-sm font-medium mb-1">ID</label>
            <input
              type="text"
              value="523233"
              readOnly
              className="w-full border px-3 py-2 rounded bg-gray-100"
            />
          </div>

          {/* Quyền hạn */}
          <div>
            <label className="block text-sm font-medium mb-1">Quyền hạn</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border px-3 py-2 rounded"
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
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {/* Địa chỉ */}
          <div>
            <label className="block text-sm font-medium mb-1">Địa chỉ</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border px-3 py-2 rounded"
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
              onClose(); // hoặc gọi API ở đây
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
