"use client"

import { useState, useRef, useEffect } from "react"
import { X, Send, Smile, ImageIcon, MessageCircle } from "lucide-react"
import EmojiPicker from "emoji-picker-react"
import { useTranslation } from "react-i18next"

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const fileInputRef = useRef(null)
  const inputRef = useRef(null)
  const emojiPickerRef = useRef(null)
  const { t }  = useTranslation()

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      console.log("File selected:", file)
      // 👉 Bạn có thể xử lý gửi ảnh ở đây
      // Ví dụ: upload lên server, hiển thị trong tin nhắn, etc.
    }
  } 
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [message, setMessage] = useState("")

    // 🧠 Ghi nhớ vị trí con trỏ
  const cursorPositionRef = useRef(0)

  // 👉 Khi người dùng chọn emoji
  const handleEmojiClick = (emojiData) => {
    const emoji = emojiData.emoji
    const cursorPos = cursorPositionRef.current
    const textBefore = message.slice(0, cursorPos)
    const textAfter = message.slice(cursorPos)
    const newText = textBefore + emoji + textAfter
    setMessage(newText)

    // Di chuyển lại con trỏ sau emoji
    setTimeout(() => {
      inputRef.current.focus()
      inputRef.current.setSelectionRange(
        cursorPos + emoji.length,
        cursorPos + emoji.length
      )
    }, 0)
  }

  // 📌 Cập nhật vị trí con trỏ khi người dùng gõ
  const handleInputChange = (e) => {
    setMessage(e.target.value)
    cursorPositionRef.current = e.target.selectionStart
  }

  const handleInputClick = (e) => {
    cursorPositionRef.current = e.target.selectionStart
  }

  // ❌ Đóng emoji picker khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target) &&
        !inputRef.current?.contains(event.target)
      ) {
        setShowEmojiPicker(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <>
      {isOpen && (
        <div className="fixed right-6 bottom-24 w-[380px] z-50">
          <div className="bg-white border-0 rounded-xl shadow-2xl overflow-hidden">
            {/* Header with gradient */}
              <div
                className="relative h-[180px]"
                style={{
                  background: 'linear-gradient(to-right, #4629F2 0%, #13C6FF 35%, #B94DFB 60%, #FF53EE 82%, #F3B960 100%)',
                }}
              >
                <button
                className="absolute top-4 right-4 p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
                onClick={() => 
                  setIsOpen(false)
                }
              >
                <X className="h-5 w-5" />
              </button>

              <div className="absolute inset-0 flex flex-col items-start justify-center text-white p-6">
                <div className="w-12 aspect-square rounded-full bg-white flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-indigo-600">C</span>
                </div>

                <h3 className="text-xl font-bold mb-2">{t("chatWithAI")}</h3>
                <p className="text-sm text-left text-white/90 leading-relaxed">
                  Giao diện chat thông minh – trò chuyện mượt mà, kết nối dễ dàng, tăng trải nghiệm khách hàng.
                </p>
              </div>
            </div>

            {/* Chat messages */}
            <div className="p-4 space-y-4 max-h-[400px] overflow-y-auto bg-gray-50/50">
              <div className="flex gap-3">
                <img
                  src="/ai-assistant-concept.png"
                  alt="AI"
                  className="h-8 w-8 rounded-full flex-shrink-0 object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold">Trợ lý AI</span>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <p className="text-sm leading-relaxed">
                      Xin chào Nguyễn Văn A. Hôm nay tôi có thể giúp được gì cho bạn?
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 mt-1 block">08:16 AM</span>
                </div>
              </div>

              <div className="flex justify-end">
                <div className="max-w-[80%]">
                  <button className="rounded-full px-6 py-2.5 bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors">
                    Thông tin chi tiết về trang này
                  </button>
                  <span className="text-xs text-gray-500 mt-1 block text-right">08:17 AM</span>
                </div>
              </div>

              <div className="flex gap-3">
                <img
                  src="ai-assistant-concept.png"
                  alt="AI"
                  className="h-8 w-8 rounded-full flex-shrink-0 object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold">Trợ lý AI</span>
                  </div>
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <div className="flex gap-1">
                      <div
                        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <div
                        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <div
                        className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 mt-1 block">Just Now</span>
                </div>
              </div>
            </div>

            {/* Input area */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg flex-shrink-0">
                  <Smile 
                    className="h-5 w-5 text-gray-500"
                    onClick={() => setShowEmojiPicker((prev) => !prev)}

                  />
                </button>

                <input
                  ref={inputRef}
                  type="text"
                  value={message}
                  onChange={handleInputChange}
                  onClick={handleInputClick}
                  placeholder="Trả lời ..."
                  className="flex-1 px-3 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button className="p-2 hover:bg-gray-100 rounded-lg flex-shrink-0">
                  <ImageIcon className="h-5 w-5 text-gray-500" onClick={handleImageClick}/>
                </button>

                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
              {showEmojiPicker && (
                <div
                  ref={emojiPickerRef}
                  className="absolute bottom-16 left-2 z-50"
                >
                  <EmojiPicker
                    onEmojiClick={handleEmojiClick}
                    autoFocusSearch={false}
                    height={350}
                    width={300}
                  />
                </div>
              )}

                <button className="p-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg flex-shrink-0">
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        className="fixed right-6 bottom-6 h-14 w-14 rounded-full shadow-2xl bg-indigo-600 text-white hover:bg-indigo-700 z-50 flex items-center justify-center transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    </>
  )
}
