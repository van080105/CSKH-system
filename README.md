# 📘 HƯỚNG DẪN CHẠY BACKEND DỰ ÁN CSKH-SYSTEM

---

## 🧩 GIỚI THIỆU DỰ ÁN

**CSKH-System** là hệ thống **backend** được phát triển bằng **Node.js (Express)** và **Microsoft SQL Server (MSSQL)**.  
Dự án phục vụ cho việc **quản lý, tư vấn và chăm sóc khách hàng** trong doanh nghiệp, bao gồm các chức năng:

- Quản lý tài khoản và đăng nhập (Authentication & Authorization)  
- Quản lý nhân viên và đại lý (Agent Management)  
- Quản lý biểu mẫu phân công (Assign Form)  
- Gửi thông báo và email (Notification, Send Mail)  
- Chatbot hỗ trợ khách hàng (Chatbot API)  

---

## ⚙️ YÊU CẦU HỆ THỐNG

| Thành phần | Phiên bản yêu cầu |
|-------------|------------------|
| **Node.js** | >= 18.x |
| **NPM** | >= 9.x |
| **Microsoft SQL Server** | Cài đặt cục bộ hoặc máy chủ từ xa |
| **Git** | Dùng để clone mã nguồn |

---

## 🚀 CÀI ĐẶT VÀ CHẠY DỰ ÁN

### 1️⃣ Clone dự án từ GitHub
```bash
git clone https://github.com/van080105/CSKH-system.git
cd CSKH-system
```

### 2️⃣ Chuyển sang nhánh backend
```bash
git checkout back-end
```

### 3️⃣ Cài đặt các thư viện cần thiết
```bash
npm install
```

> Dự án sử dụng các thư viện chính:
> - `express`, `mssql`, `dotenv`, `bcrypt`, `nodemailer`
> - Bộ **Babel** (`@babel/core`, `@babel/node`, …) để hỗ trợ ES6/ESModule.

---

## ⚙️ CẤU HÌNH MÔI TRƯỜNG (.env)

Tạo file `.env` trong thư mục gốc của dự án với nội dung mẫu:

```env
PORT=8080
DB_HOST=.....
DB_NAME....
JWT_SECRET=changeme123

WINDOWS_DOMAIN=....
WINDOWS_USER=...
WINDOWS_PASS=...
```

> ⚠️ **Lưu ý:**  
> - Thay đổi các thông số `DB_HOST`, `DB_NAME`, `WINDOWS_USER`, `WINDOWS_PASS` theo cấu hình máy của bạn và dùng SQL Server.
> - Cổng mặc định `PORT=8080` có thể thay đổi nếu bị xung đột.
> - Cấu hình môi trường này dùng cho DBMS (windown authentication) và `WINDOWS_PASS` có thể bỏ qua nếu máy bạn không cài mật khẩu login máy.

---

## ▶️ CÁCH CHẠY DỰ ÁN

### Chạy ở chế độ phát triển (tự reload khi chỉnh sửa)
```bash
npm run dev
```
- Sử dụng `nodemon` và `babel-node` để tự động tải lại khi có thay đổi.

### Chạy ở chế độ sản xuất
```bash
npm run build
npm run production
```
- Mã nguồn được biên dịch bằng Babel và lưu tại thư mục `/build`.

---

## 🧪 KIỂM TRA KẾT NỐI DATABASE

Dự án có sẵn file `test-db.js` để kiểm tra kết nối với SQL Server.

Chạy lệnh:
```bash
node test-db.js
```

Kết quả mong đợi:
```bash
[ { name: 'master' }, { name: 'tempdb' }, { name: 'model' }, ... ]
```
✅ Nếu hiển thị như trên, kết nối tới SQL Server **thành công**.

---

## 🧱 CẤU TRÚC THƯ MỤC DỰ ÁN

```
CSKH-system/
│
├── src/
│   ├── config/              # Cấu hình database, dotenv
│   ├── controllers/         # Xử lý logic nghiệp vụ (account, agent, chatbot...)
│   ├── middlewares/         # Xác thực, phân quyền, xử lý lỗi
│   ├── routes/              # Định nghĩa các route Express
│   ├── services/            # Logic nghiệp vụ chính
│   └── utils/               # Hàm tiện ích (vd: sendEmail.js)
│
├── .env                     # File môi trường
├── package.json             # Cấu hình npm scripts & dependencies
├── test-db.js               # File kiểm tra kết nối cơ sở dữ liệu
└── README.md
```

---

## 💻 CÁC LỆNH HỮU ÍCH

| Lệnh | Mô tả |
|------|--------|
| `npm run dev` | Chạy server ở chế độ phát triển |
| `npm run build` | Biên dịch mã nguồn vào thư mục `/build` |
| `npm run production` | Chạy server ở chế độ sản xuất |
| `npm run lint` | Kiểm tra cú pháp code bằng ESLint |

---

## 🧰 KHẮC PHỤC LỖI THƯỜNG GẶP

| Lỗi | Nguyên nhân & Cách xử lý |
|------|---------------------------|
| ❌ Không kết nối được Database | Kiểm tra lại thông tin trong `.env` và đảm bảo SQL Server đang chạy |
| ⚠️ Port đã bị chiếm | Đổi giá trị `PORT` trong file `.env` |
| ⚙️ Lỗi thiếu module | Chạy lại `npm install` |
| 🔠 Lỗi Babel hoặc ES6 | Đảm bảo Node.js ≥ 18 và file `.babelrc` tồn tại trong dự án |

---

## 🧾 THÔNG TIN BỔ SUNG

- Dự án chạy theo mô hình **RESTful API**.  
- Các endpoint chính nằm trong thư mục `src/routes/`.  
- Cấu hình database được định nghĩa trong `src/config/db.js`.

---

## 📜 GIẤY PHÉP

Dự án sử dụng giấy phép **ISC License**  
(chi tiết trong file `package.json`).

---

## 🧪 GỢI Ý KIỂM THỬ BẰNG POSTMAN

Sau khi server chạy, bạn có thể thử các API:

| Endpoint | Phương thức | Mô tả |
|-----------|-------------|--------|
| `POST /api/auth/login` | `POST` | Đăng nhập hệ thống |
| `GET /api/account` | `GET` | Lấy danh sách tài khoản |
| `POST /api/classify` | `POST` | Gán form cho nhân viên |
| `GET /api/faq` | `GET` | Lấy danh sách câu hỏi FAQ |

---

✅ **Hoàn tất!** Dán nội dung này vào file `README.md` tại thư mục gốc của dự án.
