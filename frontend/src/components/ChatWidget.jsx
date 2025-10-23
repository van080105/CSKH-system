"use client"

import { useState, useRef, useEffect } from "react"
import { X, Send, Smile, ImageIcon, MessageCircle, Paperclip } from "lucide-react"
import EmojiPicker from "emoji-picker-react"
import { useTranslation } from "react-i18next"
import { ChatbotFeedback } from "../pages/ChatbotFeedback"

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const fileInputRef = useRef(null)
  const attachInputRef = useRef(null)
  const inputRef = useRef(null)
  const emojiPickerRef = useRef(null)
  const overlayRef = useRef(null)
  const { t } = useTranslation()

  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [message, setMessage] = useState("")
  const [showFeedback, setShowFeedback] = useState(false)

  const cursorPositionRef = useRef(0)

  const handleImageClick = () => fileInputRef.current?.click()
  const handleAttachClick = () => attachInputRef.current?.click()

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) console.log("File selected:", file)
  }

  const handleAttachChange = (e) => {
    const files = Array.from(e.target.files)
    console.log("Files attached:", files)
  }

  const handleEmojiClick = (emojiData) => {
    const emoji = emojiData.emoji
    const cursorPos = cursorPositionRef.current
    const textBefore = message.slice(0, cursorPos)
    const textAfter = message.slice(cursorPos)
    setMessage(textBefore + emoji + textAfter)

    setTimeout(() => {
      inputRef.current.focus()
      inputRef.current.setSelectionRange(cursorPos + emoji.length, cursorPos + emoji.length)
    }, 0)
  }

  const handleInputChange = (e) => {
    setMessage(e.target.value)
    cursorPositionRef.current = e.target.selectionStart
  }

  const handleInputClick = (e) => {
    cursorPositionRef.current = e.target.selectionStart
  }

  // Đóng emoji picker khi click ngoài
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
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Đóng overlay feedback khi click ngoài
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (showFeedback && overlayRef.current && !overlayRef.current.contains(event.target)) {
        setShowFeedback(false)
      }
    }
    document.addEventListener("mousedown", handleOutsideClick)
    return () => document.removeEventListener("mousedown", handleOutsideClick)
  }, [showFeedback])

  return (
    <>
      {/* Overlay Feedback */}
      {showFeedback && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999] animate-fadeIn">
          <div
            ref={overlayRef}
            className="relative w-[95%] max-w-5xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-auto animate-slideUp"
            style={{ scrollbarWidth: "thin", scrollbarColor: "#ccc transparent" }}
          >
            {/* Nút đóng feedback */}
            <button
              className="absolute top-3 right-3 p-2 rounded-full bg-gray-100 hover:bg-gray-200 z-50"
              onClick={() => setShowFeedback(false)}
            >
              <X className="h-5 w-5 text-gray-700" />
            </button>

            <ChatbotFeedback />
          </div>
        </div>
      )}

      {isOpen && (
        <div
          className="
            fixed bottom-24 right-0 z-50 
            w-full max-w-full 
            flex justify-end pr-6 sm:pr-8
            pointer-events-none
          "
        >
          <div
            className="
              pointer-events-auto 
              bg-white dark:bg-gray-900 
              border-0 rounded-xl shadow-2xl overflow-hidden
              w-[380px] max-w-[95vw] 
              flex flex-col
            "
            style={{
              maxHeight: "calc(100vh - 120px)",
            }}
          >
            {/* Header */}
            <div
              className="relative h-[180px] w-full rounded-lg"
              style={{
                background:
                  "conic-gradient(from 218deg at 85% 30%, #4629F2 0%, #13C6FF 35%, #B94DFB 60%, #FF53EE 82%, #F3B960 100%)",
              }}
            >
              <button
                className="absolute top-4 right-4 p-2 text-white hover:bg-white/20 rounded-lg transition-colors z-50"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>

              <div className="absolute inset-0 flex flex-col items-start justify-center text-white p-6">
                <div className="w-12 aspect-square rounded-full bg-white dark:bg-gray-600 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-indigo-600">C</span>
                </div>

                <h3 className="text-xl font-bold mb-2">{t("chatWithAI")}</h3>
                <p className="text-sm text-left text-white/90 leading-relaxed">{t("chatbotAd")}</p>
              </div>
            </div>

            {/* Chat messages */}
            <div className="p-4 space-y-4 overflow-y-auto bg-gray-50/50 dark:bg-gray-800/50 flex-1">
              {/* Tin nhắn AI */}
              <div className="flex gap-3">
                {/* Avatar */}
                <img
                  src="/ai-assistant-concept.png"
                  alt="AI"
                  className="h-8 w-8 rounded-full object-cover flex-shrink-0 self-end"
                />

                {/* Tin nhắn và timeline */}
                <div className="flex flex-col max-w-[80%]">
                  {/* Khung tin nhắn */}
                  <div
                    className="bg-white dark:bg-gray-800 rounded-2xl rounded-tl-sm px-4 py-2 shadow-sm 
                    text-gray-800 dark:text-gray-100 text-sm text-left break-words"
                    style={{ lineHeight: "1.35rem" }}
                  >
                    Xin chào Nguyễn Văn A 👋. Hôm nay tôi có thể giúp gì cho bạn?
                  </div>
                  {/* Timeline */}
                  <span className="text-xs text-gray-500 mt-1 dark:text-gray-400 text-left block">
                    08:16 AM
                  </span>
                </div>
              </div>

              {/* Tin nhắn người dùng */}
              <div className="flex justify-end">
                <div className="flex flex-col items-end max-w-[80%]">
                  <div className="bg-blue-600 text-white rounded-2xl rounded-br-sm px-4 py-2 shadow-sm text-sm leading-relaxed break-words">
                    Thông tin chi tiết về trang này
                  </div>
                  <span className="text-xs text-gray-500 mt-1 dark:text-gray-400 text-right">08:17 AM</span>
                </div>
              </div>

              {/* Tin nhắn AI đang gõ */}
              <div className="flex items-end gap-3">
                <img
                  src="/ai-assistant-concept.png"
                  alt="AI"
                  className="h-8 w-8 rounded-full flex-shrink-0 object-cover"
                />
                <div className="flex flex-col items-start max-w-[80%]">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl rounded-tl-sm px-4 py-2 shadow-sm">
                    <div className="flex gap-1 items-center">
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-150" />
                      <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-300" />
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 mt-1 dark:text-gray-400">Đang soạn...</span>
                </div>
              </div>
            </div>


            {/* Input area */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <div className="flex items-center gap-2 relative w-full overflow-hidden">
                {/* Emoji */}
                <button
                  type="button"
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg flex-shrink-0"
                  onClick={() => setShowEmojiPicker((prev) => !prev)}
                >
                  <Smile className="h-5 w-5 text-gray-500 dark:text-gray-300" />
                </button>

                {/* Input */}
                <input
                  ref={inputRef}
                  type="text"
                  value={message}
                  onChange={handleInputChange}
                  onClick={handleInputClick}
                  placeholder={t("answer")}
                  className="flex-1 min-w-0 px-3 py-2 bg-gray-100 dark:bg-gray-800 text-black dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Image upload */}
                <button
                  type="button"
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg flex-shrink-0"
                  onClick={handleImageClick}
                >
                  <ImageIcon className="h-5 w-5 text-gray-500 dark:text-gray-300" />
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />

                {/* File attach */}
                <button
                  type="button"
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg flex-shrink-0"
                  onClick={handleAttachClick}
                >
                  <Paperclip className="h-5 w-5 text-gray-500 dark:text-gray-300" />
                </button>
                <input
                  type="file"
                  multiple
                  ref={attachInputRef}
                  onChange={handleAttachChange}
                  className="hidden"
                />

                {/* Emoji Picker */}
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

                {/* Send button */}
                <button
                  type="button"
                  className="p-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg flex-shrink-0"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>

              {/* Nút gửi phản hồi */}
              <button
                onClick={() => setShowFeedback(true)}
                className="w-full mt-4 py-2 bg-indigo-100 dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 font-medium rounded-lg hover:bg-indigo-200 dark:hover:bg-gray-700 transition-colors"
              >
                Gửi phản hồi 💬
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Nút mở chat */}
      <button
        className="fixed right-6 bottom-6 h-14 w-14 rounded-full shadow-2xl bg-indigo-600 text-white hover:bg-indigo-700 z-50 flex items-center justify-center transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    </>
  )
}
