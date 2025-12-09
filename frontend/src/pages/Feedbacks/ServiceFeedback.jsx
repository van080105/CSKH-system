"use client"

import { useState, useEffect } from "react"
import { MoodSlider } from "../../components/MoodSlider"
import { StarRating } from "../../components/StarRating"

export default function ServiceFeedback({ showCustomerInfo = true, formId}) {
  const [satisfaction, setSatisfaction] = useState(3)
  const [rating, setRating] = useState(3)
  const [feedback, setFeedback] = useState("")
  const userInfo = JSON.parse(localStorage.getItem("user"))
  const userRole = userInfo?.role || "guest"
  const handleSubmit = async () => {
    if(userRole === "Customer"){
      try{
        const token = localStorage.getItem("token");
        const customerID = JSON.parse(localStorage.getItem("user")).id
        const res = await fetch(`http://localhost:8080/customer/feedbackform/${formId}?customerID=${customerID}&formId=${formId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" , "Authorization": `Bearer ${token}` },
          body: JSON.stringify({ 
            content : feedback, 
            rate : rating

          }),
        })

        if(!res.ok){
          console.error("Error submitting feedback:", res.statusText)
        }
      } catch(error){
        console.error("Error submitting feedback:", error)
      }
    }

    else{
      try{
        const res = await fetch(`http://localhost:8080/guest/make_FB_form`, {
          method: "POST",
          headers: { "Content-Type": "application/json"},
          body: JSON.stringify({ 
            rating: rating,
            content: feedback
          }),
        })
        if(!res.ok) throw new Error(res.statusText)
      } catch(error){
        console.error("Error submitting feedback:", error)
      }
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
    <div className="w-full max-w-3xl mx-auto p-6 text-gray-900 dark:text-gray-100 max-h-[75vh] overflow-y-auto">

      <h2 className="mb-6 text-2xl font-bold text-center">
        Phản hồi của quý khách
      </h2>

      <div className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Họ và tên <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={userRole === "Customer" ? userInfo.fullname : ""}
            className="w-full border border-gray-300 dark:border-gray-700 px-4 py-2 rounded bg-white dark:bg-gray-800"
            readOnly={userRole === "Customer"}
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={userRole === "Customer" ? userInfo.email : ""}
            className="w-full border border-gray-300 dark:border-gray-700 px-4 py-2 rounded bg-white dark:bg-gray-800"
            readOnly={userRole === "Customer"}
          />
        </div>

        {/* Ticket ID được truyền tự động */}
        {showCustomerInfo && (
          <div>
            <label className="block text-sm font-semibold mb-1">Form ID</label>
            <input
              type="text"
              value={formId}
              readOnly
              className="w-full border border-gray-300 dark:border-gray-700 px-4 py-2 bg-gray-100 dark:bg-gray-800"
            />
          </div>
        )}

        {/* Slider */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Mức độ hài lòng
          </label>
          <MoodSlider value={satisfaction} onChange={setSatisfaction} />
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-semibold mb-1">
            Khả năng giới thiệu dịch vụ của quý khách cho người khác
          </label>
          <StarRating value={rating} onChange={setRating} />
        </div>

        {/* Feedback */}
        <div>
          <label className="block text-sm font-semibold mb-1">Mô tả trải nghiệm</label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-700 px-4 py-2 h-28 rounded resize-none bg-white dark:bg-gray-800"
          />
        </div>

        {/* Submit */}
        <button
          onClick={() => handleSubmit()}
          className="w-full bg-blue-600 text-white py-3 font-semibold rounded hover:bg-blue-700"
        >
          Gửi phản hồi
        </button>
      </div>
    </div>

  )
}

