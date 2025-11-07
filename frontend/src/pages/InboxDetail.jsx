import { useParams, useOutletContext, useNavigate } from "react-router-dom"
import { ArrowLeft, Send } from "lucide-react"
import { useState } from "react"

export function InboxDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { emails } = useOutletContext()
  const email = emails.find((e) => e.id === parseInt(id))
  const [reply, setReply] = useState("")

  if (!email) return <div className="p-6">Email not found.</div>

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-50 dark:bg-gray-900 z-50 overflow-y-auto">
      <div className="max-w-4xl mx-auto py-6 px-8">
        <button onClick={() => navigate("/agent/inbox")} className="flex items-center gap-2 text-blue-500 hover:underline mb-4">
          <ArrowLeft size={20} /> Back
        </button>

        <h1 className="text-2xl font-semibold mb-2">{email.subject}</h1>
        <div className="text-gray-600 dark:text-gray-400 mb-6">
          <p>From: {email.sender}</p>
          <p>Time: {email.time}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg mb-6">
          <p>
            Đây là nội dung chi tiết của email <strong>{email.subject}</strong>.
          </p>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            (Bạn có thể thay nội dung thật ở đây nếu có dữ liệu.)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Nhập phản hồi..."
            className="flex-1 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700"
          />
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <Send size={18} /> Gửi
          </button>
        </div>
      </div>
    </div>
  )
}
