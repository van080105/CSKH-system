"use client"

import { X } from "lucide-react"

const statusColors = {
  "Đã giao": "bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300",
  "Đang giao": "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
  "Đang xử lý": "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
  "Chờ xử lý": "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
  "Đã hủy": "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
}

export function OrderDetail({
  selectedOrder,
  showOrderDetail,
  isDetailAnimating,
  handleCloseOrderDetail,
}) {
  if (!selectedOrder) return null

  return (
    showOrderDetail && (
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div
          className={`bg-white dark:bg-gray-800 rounded-2xl w-full max-w-lg shadow-xl relative text-gray-800 dark:text-gray-200 transform transition-all duration-500 ${isDetailAnimating ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        >
          {/* Close button */}
          <button
            onClick={handleCloseOrderDetail}
            className="absolute right-4 top-4 p-3 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-all duration-300"
          >
            <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </button>

          {/* Header */}
          <div className="p-6 border-b border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-700 rounded-t-2xl">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Chi tiết Đơn Hàng</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Mã đơn: #{selectedOrder?.OrderID}</p>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">

            {/* Product Info */}
            <div className="flex flex-col gap-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{selectedOrder?.ProductName}</h3>

                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  <p>Đơn giá: <span className="font-semibold text-gray-800 dark:text-gray-200">{selectedOrder?.UnitPrice?.toLocaleString()}₫</span></p>
                  <p>Số lượng: {selectedOrder?.quantity}</p>
                  <p>Tổng thanh toán: <span className="font-semibold text-green-600 dark:text-green-400">{selectedOrder?.OrderPrice?.toLocaleString()}₫</span></p>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <p className="text-sm font-semibold mb-2 text-gray-800 dark:text-gray-200">Trạng thái đơn hàng</p>
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${statusColors[selectedOrder?.Stt]}`}>
                {selectedOrder?.Stt}
              </span>
            </div>

            {/* Delivery Info */}
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <p className="text-sm font-semibold mb-2 text-gray-800 dark:text-gray-200">Thông tin giao hàng</p>

              <div className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <p><strong>Địa chỉ:</strong> {selectedOrder?.DeliveryAddress}</p>
                <p><strong>Ngày đặt:</strong> {new Date(selectedOrder?.OrderDate).toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-4">
            <button 
              onClick={handleCloseOrderDetail}
              className="px-5 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition duration-300">
              Đóng
            </button>
          </div>

        </div>
      </div>
    )
  )
}
