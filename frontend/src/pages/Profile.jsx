export function Profile() {
  return (
    <div className="min-h-full">
      <div className="h-32 bg-gradient-to-r from-indigo-600 to-indigo-700"></div>

      <div className="max-w-4xl mx-auto px-6 -mt-16">
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-6">
              <img
                src="/diverse-woman-avatar.png"
                alt="Moni Roy"
                className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Moni Roy</h1>
                <p className="text-gray-600">Admin</p>
              </div>
            </div>
            <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
              Chỉnh sửa
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">ID</label>
              <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-600">523233</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Họ và tên</label>
              <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-600">Nguyễn Văn A</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
              <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-600">0909123456</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Địa chỉ</label>
              <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-600">Khu 1, phường 2, TPHCM</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Địa chỉ email</label>
              <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-600">nguyenvana@gmail.com</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quyền hạn</label>
              <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-600">Admin</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
