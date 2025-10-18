"use client"

import { useParams } from "react-router-dom"

export function OrderDetail() {
  const { id } = useParams()

  const orderSteps = [
    { label: "Xác nhận đặt", date: "T5, 2/10", status: "completed" },
    { label: "Bắt đầu giao", date: "T6, 3/10", status: "completed" },
    { label: "Đã đến nơi", date: "T7, 4/10", status: "completed" },
    { label: "Đã giao hàng", date: "Ước tính, CN 5/10", status: "pending" },
  ]

  const products = [
    {
      name: "Iphone 17 Pro",
      color: "Nâu",
      specs: "64GB | 1 TB",
      price: "37.990.000đ",
      quantity: 10,
      image: "📱",
    },
    {
      name: "Iphone 16 Pro",
      color: "Trắng",
      specs: "64GB | 1 TB",
      price: "30.390.000đ",
      quantity: 10,
      image: "📱",
    },
    {
      name: "Iphone 15 Pro max",
      color: "Đen",
      specs: "64GB | 1 TB",
      price: "26.990.000đ",
      quantity: 10,
      image: "📱",
    },
  ]

  return (
    <div className="min-h-screen bg-white p-8">
      {/* Order Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Order ID: 3354654654526</h1>
        <div className="flex gap-8 text-gray-600">
          <div>
            <p className="text-sm">Ngày đặt</p>
            <p className="font-semibold text-gray-900">2 tháng 10, 2025</p>
          </div>
          <div className="text-green-600">
            <p className="text-sm">Ước tính ngày giao</p>
            <p className="font-semibold">5 tháng 10, 2025</p>
          </div>
        </div>
      </div>

      {/* Order Timeline */}
      <div className="mb-8 py-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          {orderSteps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                  step.status === "completed" ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600"
                }`}
              >
                {step.status === "completed" ? "✓" : "○"}
              </div>
              <p className="text-sm font-semibold text-gray-900">{step.label}</p>
              <p className="text-xs text-gray-600">{step.date}</p>
              {idx < orderSteps.length - 1 && <div className="w-0.5 h-12 bg-gray-300 mt-2" />}
            </div>
          ))}
        </div>
      </div>

      {/* Products */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Sản phẩm</h2>
        <div className="space-y-4">
          {products.map((product, idx) => (
            <div key={idx} className="flex gap-4 pb-4 border-b border-gray-200">
              <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center text-3xl">
                {product.image}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-600">
                  {product.color} | {product.specs}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">{product.price}</p>
                <p className="text-sm text-gray-600">Số lượng: {product.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        {/* Payment */}
        <div>
          <h3 className="font-bold text-gray-900 mb-4">Thanh toán</h3>
          <p className="text-gray-600">Visa **56</p>
          <div className="mt-2 flex gap-2">
            <span className="text-sm">💳</span>
            <span className="text-sm text-gray-600">Visa</span>
          </div>
        </div>

        {/* Shipping */}
        <div>
          <h3 className="font-bold text-gray-900 mb-4">Giao hàng</h3>
          <p className="text-gray-600">Địa chỉ giao hàng</p>
          <p className="text-gray-900">
            Khu 1, phường 2,
            <br />
            Tp.HCM
          </p>
        </div>
      </div>

      {/* Order Total */}
      <div className="bg-gray-50 p-6 rounded">
        <h3 className="font-bold text-gray-900 mb-4">Tóm tắt đơn hàng</h3>
        <div className="space-y-3 text-gray-600">
          <div className="flex justify-between">
            <span>Tổng tiền</span>
            <span className="font-semibold text-gray-900">953.700.000đ</span>
          </div>
          <div className="flex justify-between">
            <span>Giảm giá</span>
            <span className="font-semibold text-gray-900">(30%) - 286.110.000đ</span>
          </div>
          <div className="flex justify-between">
            <span>Tiền ship</span>
            <span className="font-semibold text-gray-900">$0.00</span>
          </div>
          <div className="flex justify-between">
            <span>Thuế</span>
            <span className="font-semibold text-gray-900">+47.685.000đ</span>
          </div>
          <div className="border-t border-gray-300 pt-3 flex justify-between">
            <span className="font-bold">Tổng thanh toán</span>
            <span className="font-bold text-gray-900">715.275.000đ</span>
          </div>
        </div>
      </div>
    </div>
  )
}
