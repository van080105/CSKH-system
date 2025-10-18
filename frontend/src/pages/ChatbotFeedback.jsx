"use client"

import { useState } from "react"
import { ChevronLeft } from "lucide-react"

export function ChatbotFeedback() {
  const [satisfaction, setSatisfaction] = useState(3)
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({ satisfaction, rating, feedback })
  }

  return (
    <div className="min-h-screen bg-white p-8">
      {/* Breadcrumb */}
      <div className="mb-8 flex items-center gap-2 text-blue-600">
        <ChevronLeft size={20} />
        <span>Đánh giá chatbot của chúng tôi</span>
      </div>

      <div className="grid grid-cols-2 gap-12">
        {/* Left: Customer Info */}
        <div>
          <h2 className="mb-8 text-2xl font-bold text-gray-900">Phản hồi của quý khách</h2>
          <p className="mb-8 text-gray-600">
            Chúng tôi trân trọng ý kiến của quý khách! Rất mong quý khách dành chút thời gian để chia sẻ cảm nhận.
          </p>

          <div className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Họ và tên <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Nguyễn Văn A"
                className="w-full border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Địa chỉ email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="nguyenvana@gmail.com"
                className="w-full border border-blue-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* ID */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">ID</label>
              <select className="w-full border border-gray-300 bg-gray-100 px-4 py-3 focus:border-blue-500 focus:outline-none">
                <option>523233</option>
              </select>
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Vai trò</label>
              <select className="w-full border border-gray-300 bg-gray-100 px-4 py-3 focus:border-blue-500 focus:outline-none">
                <option>Khách hàng</option>
              </select>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Số điện thoại</label>
              <input
                type="tel"
                placeholder="0912345678"
                className="w-full border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Địa chỉ</label>
              <input
                type="text"
                placeholder="Khu 1, phường 2, TP.HCM"
                className="w-full border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Right: Feedback Form */}
        <div>
          <h2 className="mb-8 text-2xl font-bold text-gray-900">Trải nghiệm của quý khách</h2>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Satisfaction Slider */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-4">
                Quý khách cảm thấy hài lòng với phản hồi trên của chatbot đến mức nào ?{" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max="5"
                  value={satisfaction}
                  onChange={(e) => setSatisfaction(Number(e.target.value))}
                  className="flex-1 h-2 bg-blue-500 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              <div className="mt-2 flex justify-between text-sm text-gray-600">
                <span>0</span>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
              </div>
            </div>

            {/* Star Rating */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-4">
                Quý khách có sẵn lòng giới thiệu dịch vụ của chúng tôi đến người khác không?{" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`text-3xl ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 font-semibold rounded hover:bg-blue-700"
            >
              Gửi phản hồi
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
