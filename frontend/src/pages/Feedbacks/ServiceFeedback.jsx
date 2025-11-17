"use client"

import { useState } from "react"
import { Paperclip, Smile, Link2, AtSign, Hash } from "lucide-react"
import { MoodSlider } from "../../components/MoodSlider"
import { StarRating } from "../../components/StarRating"

export function ServiceFeedback({ showCustomerInfo = true}) {
  const [satisfaction, setSatisfaction] = useState(3)
  const [rating, setRating] = useState(3)
  const [feedback, setFeedback] = useState("")
  const [ticketId, setTicketId] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-8 text-gray-900 dark:text-gray-100">
      {/* Breadcrumb */}
      <div className="mb-8 flex items-center gap-2 text-blue-600 dark:text-blue-400">
        <span>Đánh giá dịch vụ của chúng tôi</span>
      </div>

      <div className="grid grid-cols-2 gap-12">
        {/* Left: Customer Info */}
        <div>
          <h2 className="mb-8 text-2xl font-bold">Phản hồi của quý khách</h2>
          <p className="mb-8 text-gray-600 dark:text-gray-300">
            Chúng tôi trân trọng ý kiến của quý khách! Rất mong quý khách dành chút thời gian để chia sẻ cảm nhận.
          </p>

          <div className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Họ và tên <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Nguyễn Văn A"
                className="w-full border border-gray-300 dark:border-gray-700 px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Địa chỉ email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="nguyenvana@gmail.com"
                className="w-full border border-gray-300 dark:border-gray-700 px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* ID */}
            {showCustomerInfo && (<div>
              <label className="block text-sm font-semibold mb-2">ID</label>
              <select className="w-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 px-4 py-3 focus:border-blue-500 focus:outline-none text-gray-900 dark:text-gray-100">
                <option>523233</option>
              </select>
            </div>)}

            {/* Role */}
            {showCustomerInfo && (<div>
              <label className="block text-sm font-semibold mb-2">Vai trò</label>
              <select className="w-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 px-4 py-3 focus:border-blue-500 focus:outline-none text-gray-900 dark:text-gray-100">
                <option>Khách hàng</option>
              </select>
            </div>)}

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold mb-2">Số điện thoại</label>
              <input
                type="tel"
                placeholder="0912345678"
                className="w-full border border-gray-300 dark:border-gray-700 px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-semibold mb-2">Địa chỉ</label>
              <input
                type="text"
                placeholder="Khu 1, phường 2, TP.HCM"
                className="w-full border border-gray-300 dark:border-gray-700 px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Ticket ID */}
            {showCustomerInfo && (<div>
              <label className="block text-sm font-semibold mb-2">Ticket ID cần đánh giá</label>
              <input
                type="text"
                placeholder="Nhập ID ticket ...."
                value={ticketId}
                onChange={(e) => setTicketId(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-700 px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none"
              />
            </div>)}

          </div>
        </div>

        {/* Right: Feedback Form */}
        <div>
          <h2 className="mb-8 text-2xl font-bold">Trải nghiệm của quý khách</h2>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Satisfaction Slider */}
            <div>
              <label className="block text-sm font-semibold mb-4">
                Quý khách cảm thấy hài lòng với phản hồi trên của chúng tôi đến mức nào ?{" "}
                <span className="text-red-500">*</span>
              </label>

              <div className="flex items-center gap-4">
                <MoodSlider value={satisfaction} onChange={setSatisfaction} />      
              </div>

              <div className="mt-2 flex justify-between text-sm text-gray-600 dark:text-gray-400">
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
              <label className="block text-sm font-semibold mb-4">
                Quý khách có sẵn lòng giới thiệu dịch vụ của chúng tôi đến người khác không?
              </label>
              <div className="flex gap-2">
                <StarRating value={rating} onChange={setRating} />
              </div>
            </div>

            {/* Feedback Text */}
            <div>
              <label className="block text-sm font-semibold mb-2">Mô tả trải nghiệm</label>
              <textarea
                placeholder="Trải nghiệm của quý khách ra sao? Hãy chia sẻ để chúng tôi phục vụ tốt hơn! ...."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-700 px-4 py-3 h-24 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none resize-none"
              />
            </div>

            {/* File Upload */}
            <div>
              <div className="flex gap-2 mb-2">
                <button type="button" className="text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-200">
                  <Paperclip size={20} />
                </button>
                <button type="button" className="text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-200">
                  <Smile size={20} />
                </button>
                <button type="button" className="text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-200">
                  <Link2 size={20} />
                </button>
                <button type="button" className="text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-200">
                  <AtSign size={20} />
                </button>
                <button type="button" className="text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-200">
                  <Hash size={20} />
                </button>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">File định kèm không vượt quá 200MB</p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 font-semibold rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Gửi phản hồi
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
