"use client"

import { useState } from "react"
import { ArrowLeft, Star, Trash2, Paperclip, Smile, Send } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"

export function InboxDetail() {
  const navigate = useNavigate()
  const location = useLocation()
  const email = location.state?.email || {}
  const [message, setMessage] = useState("")

  const messages = [
    {
      id: 1,
      sender: email.sender,
      time: "6:30 pm",
      content:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.",
      isOwn: false,
    },
    {
      id: 2,
      sender: "You",
      time: "6:34 pm",
      content:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.",
      isOwn: true,
    },
    {
      id: 3,
      sender: email.sender,
      time: "6:38 pm",
      content:
        "The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default.Contrary to popular belief, Lorem Ipsum is not simply random text is the model text for your company.",
      isOwn: false,
    },
  ]

  return (
    <div className="flex h-full bg-gray-50">
      {/* Left Sidebar - Same as Inbox */}
      <div className="w-80 bg-white border-r border-gray-200 p-6 overflow-y-auto">
        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg mb-8 flex items-center justify-center gap-2 transition">
          + Compose
        </button>

        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">My Email</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between px-4 py-3 rounded-lg bg-blue-50 text-blue-600 cursor-pointer">
              <span className="font-medium">Inbox</span>
              <span>1253</span>
            </div>
            <div className="flex items-center justify-between px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer">
              <span className="font-medium">Starred</span>
              <span>245</span>
            </div>
            <div className="flex items-center justify-between px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer">
              <span className="font-medium">Sent</span>
              <span>24,532</span>
            </div>
            <div className="flex items-center justify-between px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer">
              <span className="font-medium">Draft</span>
              <span>09</span>
            </div>
            <div className="flex items-center justify-between px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer">
              <span className="font-medium">Spam</span>
              <span>14</span>
            </div>
            <div className="flex items-center justify-between px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer">
              <span className="font-medium">Important</span>
              <span>18</span>
            </div>
            <div className="flex items-center justify-between px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 cursor-pointer">
              <span className="font-medium">Bin</span>
              <span>9</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Label</h3>
          <div className="space-y-2">
            {[
              { name: "Primary", color: "bg-blue-100 border-blue-300" },
              { name: "Social", color: "bg-cyan-100 border-cyan-300" },
              { name: "Work", color: "bg-orange-100 border-orange-300" },
              { name: "Friends", color: "bg-purple-100 border-purple-300" },
            ].map((label) => (
              <div
                key={label.name}
                className="flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-50"
              >
                <div className={`w-4 h-4 rounded border-2 ${label.color}`}></div>
                <span className="text-gray-700">{label.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Email Header */}
        <div className="bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/inbox")} className="p-2 hover:bg-gray-100 rounded-lg transition">
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{email.sender}</h2>
              {email.label && (
                <span className={`text-xs font-semibold px-2 py-1 rounded inline-block mt-1 ${email.labelColor}`}>
                  {email.label}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
              <Star size={20} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
              <Trash2 size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-4 ${msg.isOwn ? "justify-end" : "justify-start"}`}>
              {!msg.isOwn && <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0"></div>}
              <div
                className={`max-w-md ${msg.isOwn ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-900"} rounded-lg p-4`}
              >
                <p className="text-sm">{msg.content}</p>
                <p className={`text-xs mt-2 ${msg.isOwn ? "text-blue-100" : "text-gray-600"}`}>{msg.time}</p>
              </div>
              {msg.isOwn && <div className="w-10 h-10 rounded-full bg-gray-300 flex-shrink-0"></div>}
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
              <Smile size={20} className="text-gray-600" />
            </button>
            <input
              type="text"
              placeholder="Write message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="p-2 hover:bg-gray-100 rounded-lg transition">
              <Paperclip size={20} className="text-gray-600" />
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition flex items-center gap-2">
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
