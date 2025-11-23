import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Send, Bot, User, Headphones, Smile } from "lucide-react"
import { useState, useEffect } from "react"
import useChatSocket from "../hooks/useChatSocket"

const mockChat = [
  { from: "customer", name: "Nguyễn Văn A", text: "Mình muốn hỏi về iPhone 16 Pro Max có màu Natural Titanium còn không?", time: "10:40 AM" },
  { from: "bot", name: "AI Assistant", text: "Xin chào! Dạ hiện tại sản phẩm đó vẫn còn hàng ạ. Bạn có muốn mình hỗ trợ đặt hàng không?", time: "10:41 AM" },
  { from: "customer", name: "Nguyễn Văn A", text: "Mình muốn hỏi thêm về chính sách đổi trả thì sao nhỉ?", time: "10:42 AM" },
  { from: "bot", name: "AI Assistant", text: "Chính sách đổi trả: trong 15 ngày, nếu sản phẩm lỗi do nhà sản xuất, bạn sẽ được 1 đổi 1 miễn phí ạ.", time: "10:43 AM" },
  { from: "customer", name: "Nguyễn Văn A", text: "À, cái này mình muốn nói chuyện trực tiếp với nhân viên nhé.", time: "10:44 AM" },
  { from: "agent", name: "Minh (CSKH)", text: "Chào anh A 👋, em là Minh – nhân viên tư vấn của iCenter. Em sẽ hỗ trợ anh ngay ạ.", time: "10:45 AM" },
  { from: "agent", name: "Minh (CSKH)", text: "Anh quan tâm đến phiên bản iPhone 16 Pro Max Natural Titanium đúng không ạ?", time: "10:46 AM" },
  { from: "customer", name: "Nguyễn Văn A", text: "Đúng rồi em, anh đang cân nhắc giữa bản 256GB và 512GB.", time: "10:47 AM" },
  { from: "agent", name: "Minh (CSKH)", text: "Dạ, với nhu cầu chụp ảnh và quay video nhiều, em khuyên anh nên chọn bản 512GB để lưu trữ thoải mái hơn ạ.", time: "10:48 AM" },
  { from: "customer", name: "Nguyễn Văn A", text: "Ừm, nghe hợp lý đấy. Hiện giá đang là bao nhiêu vậy em?", time: "10:49 AM" },
  { from: "agent", name: "Minh (CSKH)", text: "Hiện bản 512GB Natural Titanium đang có giá ưu đãi 36.990.000đ, tặng kèm Apple Care và sạc nhanh chính hãng anh nhé ⚡", time: "10:50 AM" },
  { from: "customer", name: "Nguyễn Văn A", text: "Ok em, anh đặt luôn. Em gửi anh link thanh toán nhé.", time: "10:51 AM" },
  { from: "agent", name: "Minh (CSKH)", text: "Dạ tuyệt vời luôn ạ! ❤️ Đây là link thanh toán an toàn của Apple Store Việt Nam: https://apple.vn/payment/iphone16promax", time: "10:52 AM" },
  { from: "agent", name: "Minh (CSKH)", text: "Anh bấm vào link để hoàn tất thanh toán nhé. Sau đó bên em sẽ xác nhận đơn hàng ngay ạ.", time: "10:53 AM" },
]

export function InboxDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [messages, setMessages] = useState(mockChat)
  const [reply, setReply] = useState("")

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const agentName = user?.fullname || "Agent";

  const { sendMessage } = useChatSocket({
    sessionId: id,
    role: "agent",
    agentId: user?.id || null,
    onMessage: (data) => {
      // map server payload -> format hiển thị
      const from = data.from === "agent" ? "agent" : data.from === "user" ? "customer" : data.from;
      setMessages((prev) => [
        ...prev,
        { from, name: from === "agent" ? (data.agentName || agentName) : "Khách", text: data.msg, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }
      ]);
    },
    onSessionClose: () => {
      setMessages((prev) => [
        ...prev,
        { from: "system", name: "", text: "Phiên đã được đóng.", time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }
      ]);
    }
  });
  const handleSend = () => {
    if (!reply.trim()) return;
    // gửi qua socket
    sendMessage(reply);

    // hiển thị lập tức ở UI
    setMessages([
      ...messages,
      { from: "agent", name: agentName, text: reply, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }
    ]);
    setReply("")
  }

  useEffect(() => {
    const el = document.getElementById("chatScroll")
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" })
  }, [messages])

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 flex flex-col z-50">
      {/* Header */}
      <div className="backdrop-blur-md bg-white/70 dark:bg-gray-900/60 border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/agent/inbox")}
            className="text-blue-600 dark:text-blue-400 hover:opacity-80 transition"
          >
            <ArrowLeft size={22} />
          </button>
          <div>
            <h2 className="font-semibold text-lg">Nguyễn Văn A</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Đang hỗ trợ • iPhone 16 Pro Max</p>
          </div>
        </div>
        <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/40 px-3 py-1 rounded-full">
          Trực tiếp với nhân viên
        </span>
      </div>

      {/* Chat Area */}
      <div id="chatScroll" className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
        {messages.map((msg, i) => {
          const isAgent = msg.from === "agent"
          const isBot = msg.from === "bot"
          const isCustomer = msg.from === "customer"
          return (
            <div key={i} className={`flex ${isAgent ? "justify-end" : "justify-start"} items-end gap-2`}>
              {!isAgent && (
                <div
                  className={`w-9 h-9 flex items-center justify-center rounded-full ${
                    isBot
                      ? "bg-indigo-100 text-indigo-600 dark:bg-indigo-800 dark:text-indigo-300"
                      : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                  }`}
                >
                  {isBot ? <Bot size={18} /> : <User size={18} />}
                </div>
              )}

              <div
                className={`max-w-[75%] px-5 py-3 rounded-2xl shadow-sm ${
                  isBot
                    ? "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-200"
                    : isCustomer
                    ? "bg-blue-50 dark:bg-blue-900/40 text-gray-900 dark:text-blue-100"
                    : "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg"
                }`}
              >
                <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>
                <span className="block text-xs opacity-70 mt-1 text-right">{msg.time}</span>
              </div>

              {isAgent && (
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-500 text-white">
                  <Headphones size={18} />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Reply Area */}
      <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 py-4 flex items-center gap-3 backdrop-blur-md">
        <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-300">
          <Headphones size={18} />
        </div>
        <input
          type="text"
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          placeholder="Nhập phản hồi cho khách hàng..."
          className="flex-1 px-5 py-2.5 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-4 py-2 rounded-full flex items-center gap-2 font-medium transition-transform active:scale-95"
          onClick={handleSend}
        >
          <Send size={18} /> Gửi
        </button>
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-500">
          <Smile size={18} />
        </button>
      </div>
    </div>
  )
}
