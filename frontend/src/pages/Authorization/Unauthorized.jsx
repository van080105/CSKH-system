export default function Unauthorized() {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-4">403 - Không có quyền truy cập</h1>
        <p className="text-gray-700">Bạn không có quyền truy cập vào trang này.</p>
      </div>
    </div>
  );
}
