"use client"

import { Menu } from "lucide-react"
import { useState } from "react"

const notifications = [
  {
    id: 1,
    title: "SALE IS LIVE",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit dolor sit amet, consectetur adipiscing elit.",
    time: "1m ago.",
    unread: 2,
  },
  {
    id: 2,
    title: "SALE IS LIVE",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit dolor sit amet, consectetur adipiscing elit.",
    time: "1m ago.",
    unread: 2,
  },
  {
    id: 3,
    title: "SALE IS LIVE",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit dolor sit amet, consectetur adipiscing elit.",
    time: "1m ago.",
    unread: 0,
  },
  {
    id: 4,
    title: "SALE IS LIVE",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit dolor sit amet, consectetur adipiscing elit.",
    time: "10 Hrs ago.",
    unread: 0,
  },
  {
    id: 5,
    title: "SALE IS LIVE",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit dolor sit amet, consectetur adipiscing elit.",
    time: "15 Hrs ago.",
    unread: 0,
  },
  {
    id: 6,
    title: "SALE IS LIVE",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit dolor sit amet, consectetur adipiscing elit.",
    time: "15 Hrs ago.",
    unread: 0,
  },
]

export function Notifications() {
  const [activeTab, setActiveTab] = useState("all")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-2xl mx-auto">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <button className="p-2 hover:bg-white/50 rounded-lg">
              <Menu className="h-6 w-6 text-gray-700" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">THÔNG BÁO</h1>
          </div>

          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "all" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:bg-white/50"
              }`}
            >
              Chung
            </button>
            <button
              onClick={() => setActiveTab("unread")}
              className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                activeTab === "unread" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:bg-white/50"
              }`}
            >
              Chưa đọc
              <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-semibold rounded">12</span>
            </button>
          </div>

          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex gap-4">
                  <div className="relative flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500"></div>
                    {notification.unread > 0 && (
                      <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-red-500 text-white text-xs font-semibold rounded-full">
                        {notification.unread}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 mb-1">{notification.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{notification.description}</p>
                  </div>
                  <div className="text-sm text-gray-500 flex-shrink-0">{notification.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
