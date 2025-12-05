"use client"

import { useState, useRef, useEffect } from "react"
import { X, Send, Smile, ImageIcon, MessageCircle, Paperclip } from "lucide-react"
import EmojiPicker from "emoji-picker-react"
import { useTranslation } from "react-i18next"
import { ChatbotFeedback } from "../../pages/Feedbacks/ChatbotFeedback"
import formatTime from "../../utils/formatTime"
import useChatSocket from "../../hooks/useChatSocket"
import ChatWithAgent2 from "./ChatWithAgent2"

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
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [sessionId, setSessionId] = useState(null);
  const [showAgentChat, setShowAgentChat] = useState(false);

  const handleImageClick = () => fileInputRef.current?.click()
  const handleAttachClick = () => attachInputRef.current?.click()

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Tạo URL tạm thời để hiển thị ảnh
    const imageUrl = URL.createObjectURL(file);

    const imageMessage = {
      sender: "user",
      type: "image",
      file: file,
      url: imageUrl,
      time: new Date(),
    };

    setMessages(prev => [...prev, imageMessage]);

    // Reset input
    e.target.value = null;
  };

  const handleAttachChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const fileMessages = files.map(file => ({
      sender: "user",
      type: "file",
      file: file,
      name: file.name,
      time: new Date(),
    }));

    setMessages(prev => [...prev, ...fileMessages]);

    // Reset input
    e.target.value = null;
  };

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
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
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

  const { sendMessage, socket } = useChatSocket({
      sessionId,
      role: "user",
      onMessage: (data) => {
        // data: { from: "user"|"agent", msg, agentId? }
        setMessages((prev) => [
          ...prev,
          {
            sender: data.from === "agent" ? "agent" : "user",
            text: data.msg,
            time: new Date(),
          },
        ]);
      },
      onSessionClose: () => {
        setMessages((prev) => [
          ...prev,
          {
            sender: "system",
            text: "Nhân viên đã đóng phiên hỗ trợ.",
            time: new Date(),
          },
        ]);
      },
    });

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      sender: "user",
      text: message,
      time: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    if(sessionId) {
      sendMessage(message)
      setMessage("");
      return;
    }

    // bật trạng thái "AI đang gõ"
    setIsTyping(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:8080/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.text }),
      });

      const data = await res.json();

      const aiMessage = {
        sender: "ai",
        text: data.answer,
        time: new Date(),
      };

      // thêm tin nhắn AI vào danh sách
      setMessages(prev => [...prev, aiMessage]);

      if (data.needHuman) {
        if (data.agent) {
          setMessages(prev => [
            ...prev,
            {
              sender: "ai",
              type: "agent",
              agent: data.agent,
              time: new Date(),
            }
          ]);
        } else {
          setMessages(prev => [
            ...prev,
            {
              sender: "ai",
              type: "no-agent",
              time: new Date(),
            }
          ]);
        }
      }

    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = {
        sender: "ai",
        text: "Xin chào bạn, chúc bạn một ngày mới vui vẻ và bình an. Tôi có thể giúp được gì cho bạn?",
        time: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  if (showAgentChat) {
    return (
      <ChatWithAgent2

      />
    );
  }

  return (
    <>
      {/* Overlay Feedback */}
      {showFeedback && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[9999] animate-fadeIn">
          <div
            ref={overlayRef}
            className="relative w-[95%] max-w-5xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-auto animate-slideUp"
            style={{ scrollbarWidth: "thin", scrollbarColor: "#ccc transparent" }}
          >
            {/* Nút đóng feedback */}
            <button
              className="absolute top-3 right-3 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 z-50"
              onClick={() => setShowFeedback(false)}
            >
              <X className="h-5 w-5 text-gray-700 dark:text-gray-300" />
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
                className="absolute top-4 right-4 p-2 text-white dark:text-gray-300 hover:bg-white/20 dark:hover:bg-gray-800 rounded-lg transition-colors z-50"
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
            {messages.map((msg, index) => {
              // Tin nhắn: Agent tìm được
              if (msg.type === "agent") {
                return (
                  <div className="flex gap-3" key={index}>
                    <img
                      src="/ai-assistant-concept.png"
                      className="h-8 w-8 rounded-full object-cover flex-shrink-0"
                      alt="AI"
                    />
                    <div className="flex flex-col max-w-[80%]">
                      <div className="bg-blue-50 border border-blue-200 text-blue-900
                                      dark:bg-blue-900/20 dark:border-blue-700 dark:text-blue-300
                                      rounded-2xl px-4 py-3 shadow-sm text-sm">
                        <p className="font-semibold">🎉 Tôi đã tìm được nhân viên phù hợp!</p>

                        <div className="mt-2 bg-white rounded-lg p-3 shadow-inner
                                        text-gray-700 dark:bg-gray-800 dark:text-gray-200">
                          <p className="font-semibold">👩 {msg.agent.name}</p>
                          <p>ID: {msg.agent.id}</p>
                          <p>Cấp độ: {msg.agent.levelName}</p>
                          <p>Đang hỗ trợ: {msg.agent.load} khách</p>
                        </div>

                        <button 
                        onClick={() => {
                          const id = crypto.randomUUID();
                          setSessionId(id);
                          socket.emit("invite_agent", {
                            agentId: msg.agent.id,
                            sessionId: id
                          });
                          setShowAgentChat(true);
                        }}
                        className="mt-3 w-full py-2 rounded-lg
                                  bg-blue-600 text-white hover:bg-blue-700
                                  dark:bg-blue-700 dark:hover:bg-blue-600">
                          Kết nối nhân viên
                        </button>
                      </div>

                      <span className="text-xs text-gray-500 mt-1 dark:text-gray-400">
                        {formatTime(msg.time)}
                      </span>
                    </div>
                  </div>
                );
              }

              // Tin nhắn: Không có agent
              if (msg.type === "no-agent") {
                return (
                  <div className="flex gap-3" key={index}>
                    <img
                      src="/ai-assistant-concept.png"
                      className="h-8 w-8 rounded-full object-cover flex-shrink-0"
                      alt="AI"
                    />
                    <div className="flex flex-col max-w-[80%]">
                      <div className="bg-orange-50 border border-orange-200 text-orange-900
                                      dark:bg-orange-900/20 dark:border-orange-700 dark:text-orange-300
                                      rounded-2xl px-4 py-3 shadow-sm text-sm">
                        <p className="font-semibold">⚠ Không tìm thấy nhân viên phù hợp</p>
                        <p className="mt-1">
                          Vui lòng thử mô tả rõ hơn yêu cầu hoặc thử lại sau nhé!
                        </p>
                      </div>

                      <span className="text-xs text-gray-500 mt-1 dark:text-gray-400">
                        {formatTime(msg.time)}
                      </span>
                    </div>
                  </div>
                );
              }

              // Tin nhắn AI
              if (msg.sender === "ai") {
                return (
                  <div className="flex gap-3" key={index}>
                    <img src="/ai-assistant-concept.png" className="h-8 w-8 rounded-full" />

                    <div className="flex flex-col max-w-[80%]">
                      <div className="bg-white dark:bg-gray-800 rounded-2xl rounded-tl-sm px-4 py-2 shadow-sm 
                                  text-gray-800 dark:text-gray-100 text-sm text-left break-words">
                        {msg.text}
                      </div>

                      <span className="text-xs text-gray-500 mt-1">{formatTime(msg.time)}</span>
                    </div>
                  </div>
                );
              }

              if (msg.type === "image") {
                return (
                  <div className="flex justify-end" key={index}>
                    <div className="flex flex-col max-w-[80%]">
                      <img
                        src={msg.url}
                        alt="User upload"
                        className="rounded-xl max-w-full max-h-64 shadow-sm"
                      />
                      <span className="text-xs text-gray-500 mt-1 dark:text-gray-400">{formatTime(msg.time)}</span>
                    </div>
                  </div>
                );
              }

              if (msg.type === "file") {
                return (
                  <div className="flex justify-end" key={index}>
                    <div className="flex flex-col max-w-[80%]">
                      <a
                        href={URL.createObjectURL(msg.file)}
                        download={msg.name}
                        className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-sm text-gray-800 dark:text-gray-100"
                      >
                        📎 {msg.name}
                      </a>
                      <span className="text-xs text-gray-500 mt-1 dark:text-gray-400">{formatTime(msg.time)}</span>
                    </div>
                  </div>
                );
              }  

              // Tin nhắn user
              return (
                <div className="flex justify-end" key={index}>
                  <div className="flex flex-col items-end max-w-[80%]">
                    <div className="bg-blue-600 text-white rounded-2xl rounded-br-sm px-4 py-2 shadow-sm text-sm">
                      {msg.text}
                    </div>

                    <span className="text-xs text-gray-500 mt-1">{formatTime(msg.time)}</span>
                  </div>
                </div>
              );
            })}


              {/* AI đang gõ */}
              {isTyping && (
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
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
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
                  onKeyDown={handleKeyDown}
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
                    className="fixed bottom-24 right-105 z-50"
                  >
                    <EmojiPicker
                      onEmojiClick={(emoji) => handleEmojiClick(emoji)}
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
                  onClick={handleSendMessage}
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
