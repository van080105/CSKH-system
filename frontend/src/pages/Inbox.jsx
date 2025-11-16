"use client"
import { useState } from "react"
import {
  Search,
  Plus,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  Filter,
  ChevronRight,
  ChevronDown,
} from "lucide-react"
import { useNavigate, Outlet } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

const conversationData = [
  { id: 1, customer: "Nguyễn Văn A", subject: "Vấn đề thanh toán iPhone 16", status: "Đang chờ nhân viên", time: "10:45 AM", type: "Chuyển từ AI" },
  { id: 2, customer: "Trần Thị B", subject: "Hỏi về bảo hành", status: "Đã xử lý", time: "9:30 AM", type: "Trực tiếp" },
  { id: 3, customer: "Lê Minh C", subject: "Chatbot không trả lời được", status: "Đang xử lý", time: "Hôm qua", type: "Chuyển từ AI" },
  { id: 4, customer: "Phạm Thùy D", subject: "Tư vấn nâng cấp iPhone", status: "Đang chờ phản hồi", time: "3 ngày trước", type: "Trực tiếp" },
]

export function Inbox() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterOpen, setFilterOpen] = useState(true)
  const [conversations] = useState(conversationData)

  const filteredConversations = conversations.filter(
    (c) =>
      c.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.subject.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex h-full bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-500">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="w-80 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-r border-gray-200 dark:border-gray-700 p-6 flex flex-col shadow-xl"
      >

        {/* Filters */}
        <div>
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="w-full flex items-center justify-between text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            <span className="flex items-center gap-2">
              <Filter size={16} /> Bộ lọc
            </span>
            {filterOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>

          <AnimatePresence>
            {filterOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="space-y-2 text-sm overflow-hidden"
              >
                {[
                  { icon: <Clock size={16} />, label: "Đang chờ xử lý" },
                  { icon: <CheckCircle size={16} />, label: "Đã hoàn tất" },
                  { icon: <AlertCircle size={16} />, label: "Cần nhân viên" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg px-3 py-2 cursor-pointer text-gray-700 dark:text-gray-300 transition"
                  >
                    {item.icon} <span>{item.label}</span>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer inside sidebar */}
        <div className="mt-auto pt-8 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
          <p>Hệ thống Chat CSKH • v1.0</p>
          <p>© 2025 Mockstack AI Support</p>
        </div>
      </motion.div>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 p-5 flex items-center justify-between shadow-sm"
        >
          <div className="flex-1 relative max-w-xl">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="🔍 Tìm kiếm khách hàng, chủ đề hoặc tình trạng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100/70 dark:bg-gray-700/60 border border-gray-200 dark:border-gray-600 rounded-full focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm"
            />
          </div>
        </motion.div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent">
          <AnimatePresence>
            {filteredConversations.map((conv) => (
              <motion.div
                key={conv.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                onClick={() => navigate(`/agent/inbox/${conv.id}`)}
                className="border-b border-gray-100 dark:border-gray-800 px-6 py-4 hover:bg-blue-50/70 dark:hover:bg-gray-800 cursor-pointer flex items-center gap-4 transition-all"
              >
                <div className="relative">
                  <MessageSquare
                    size={28}
                    className={`${
                      conv.status.includes("chờ")
                        ? "text-yellow-500"
                        : conv.status.includes("xử lý")
                        ? "text-blue-500"
                        : "text-green-500"
                    }`}
                  />
                  {conv.type === "Chuyển từ AI" && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"></span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-blue-600 dark:text-blue-400 truncate max-w-[60%]">
                      {conv.customer}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{conv.time}</span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 truncate">
                    {conv.subject}
                  </p>

                  <div className="text-xs mt-2 flex flex-wrap gap-2">
                    <span
                      className={`px-2 py-0.5 rounded-full ${
                        conv.status.includes("chờ")
                          ? "bg-yellow-100 text-yellow-800"
                          : conv.status.includes("xử lý")
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {conv.status}
                    </span>
                    <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full">
                      {conv.type}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 px-6 py-3 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>
            Hiển thị{" "}
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              {filteredConversations.length}
            </span>{" "}
            cuộc hội thoại
          </span>
          <span className="italic text-xs">Hỗ trợ nhanh – Chính xác – Chuyên nghiệp </span>
        </div>
      </div>

      {/* Outlet (Detail view) */}
      <Outlet />
    </div>
  )
}
