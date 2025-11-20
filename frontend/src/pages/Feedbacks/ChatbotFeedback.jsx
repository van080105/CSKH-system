"use client"

import { MoodSlider } from "../../components/MoodSlider"
import { StarRating } from "../../components/StarRating"
import { useState, useEffect } from "react"

export function ChatbotFeedback() {
  const [satisfaction, setSatisfaction] = useState(3)
  const [rating, setRating] = useState(0)

  const handleSubmit = async () => {
    try{
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/customer/chatbotfb", {
        method: "POST",
        headers: { "Content-Type": "application/json" , "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ rating }),
      })
    } catch(error){
      console.error("Error submitting feedback:", error)
    }
  }

  const [provinces, setProvinces] = useState([]);

  const fetchProvinces = async () => {
    try {
      const res = await fetch("https://provinces.open-api.vn/api/v2/");
      const data = await res.json();
      setProvinces(data);
    } catch (error) {
      console.error("Lỗi tải danh sách tỉnh/thành:", error);
    }
  };

  useEffect(() => {
    fetchProvinces();
  }, []);
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-8">
      {/* Breadcrumb */}
      <div className="mb-8 flex items-center gap-2 text-blue-600 dark:text-blue-400">
        <span>Đánh giá chatbot của chúng tôi</span>
      </div>

      <div className="grid grid-cols-2 gap-12">
        {/* Left: Customer Info */}
        <div>
          <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-gray-100">Phản hồi của quý khách</h2>
          <p className="mb-8 text-gray-600 dark:text-gray-300">
            Chúng tôi trân trọng ý kiến của quý khách! Rất mong quý khách dành chút thời gian để chia sẻ cảm nhận.
          </p>

          <div className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Họ và tên <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Nguyễn Văn A"
                className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-3 focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Địa chỉ email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="nguyenvana@gmail.com"
                className="w-full border border-blue-300 dark:border-blue-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-3 focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* ID */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">ID</label>
              <select className="w-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-3 focus:border-blue-500 focus:outline-none">
                <option>523233</option>
              </select>
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Vai trò</label>
              <select className="w-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-3 focus:border-blue-500 focus:outline-none">
                <option>Khách hàng</option>
              </select>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Số điện thoại</label>
              <input
                type="tel"
                placeholder="0912345678"
                className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-3 focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-semibold mb-2">Tỉnh / Thành phố</label>
              <select
                className="w-full border border-gray-300 dark:border-gray-700 px-4 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none"
              >
                <option value="">-- Chọn tỉnh/thành --</option>
                {provinces.map((p) => (
                  <option key={p.code} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

          </div>
        </div>

        {/* Right: Feedback Form */}
        <div>
          <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-gray-100">Trải nghiệm của quý khách</h2>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Satisfaction Slider */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Quý khách cảm thấy hài lòng với phản hồi trên của chatbot đến mức nào ?{" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-4">
                <MoodSlider value={satisfaction} onChange={setSatisfaction} />
              </div>
            </div>

            {/* Star Rating */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Quý khách có sẵn lòng giới thiệu dịch vụ của chúng tôi đến người khác không?{" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <StarRating value={rating} onChange={setRating} />
              </div>
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
