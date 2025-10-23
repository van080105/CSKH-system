"use client"

import { useState } from "react"
import { Search, Plus, Star, Trash2, AlertCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { InboxDetail } from "./InboxDetail"

const emailFolders = [
  { name: "Inbox", count: 1253, icon: "inbox", active: true },
  { name: "Starred", count: 245, icon: "star" },
  { name: "Sent", count: 24532, icon: "send" },
  { name: "Draft", count: 9, icon: "draft" },
  { name: "Spam", count: 14, icon: "alert" },
  { name: "Important", count: 18, icon: "important" },
  { name: "Bin", count: 9, icon: "trash" },
]

const labels = [
  { name: "Primary", color: "bg-blue-100 dark:bg-blue-800 border-blue-300 dark:border-blue-600" },
  { name: "Social", color: "bg-cyan-100 dark:bg-cyan-800 border-cyan-300 dark:border-cyan-600" },
  { name: "Work", color: "bg-orange-100 dark:bg-orange-800 border-orange-300 dark:border-orange-600" },
  { name: "Friends", color: "bg-purple-100 dark:bg-purple-800 border-purple-300 dark:border-purple-600" },
]

const emails = [
  {
    id: 1,
    sender: "Jullu Jalal",
    label: "Primary",
    labelColor: "bg-teal-100 text-teal-800",
    subject: "Our Bachelor of Commerce program is ACBSP-accredited.",
    time: "8:38 AM",
    starred: false,
  },
  {
    id: 2,
    sender: "Minerva Barnett",
    label: "Work",
    labelColor: "bg-orange-100 text-orange-800",
    subject: "Get Best Advertiser In Your Side Pocket",
    time: "8:13 AM",
    starred: false,
  },
  {
    id: 3,
    sender: "Peter Lewis",
    label: "Friends",
    labelColor: "bg-purple-100 text-purple-800",
    subject: "Vacation Home Rental Success",
    time: "7:52 PM",
    starred: false,
  },
  {
    id: 4,
    sender: "Anthony Briggs",
    label: null,
    labelColor: null,
    subject: "Free Classifieds Using Them To Promote Your Stuff Online",
    time: "7:52 PM",
    starred: true,
  },
  {
    id: 5,
    sender: "Clifford Morgan",
    label: "Social",
    labelColor: "bg-blue-100 text-blue-800",
    subject: "Enhance Your Brand Potential With Giant Advertising Blimps",
    time: "4:13 PM",
    starred: false,
  },
  {
    id: 6,
    sender: "Cecilia Webster",
    label: "Friends",
    labelColor: "bg-purple-100 text-purple-800",
    subject: "Always Look On The Bright Side Of Life",
    time: "3:52 PM",
    starred: false,
  },
  {
    id: 7,
    sender: "Harvey Manning",
    label: null,
    labelColor: null,
    subject: "Curling Irons Are As Individual As The Women Who Use Them",
    time: "2:30 PM",
    starred: true,
  },
  {
    id: 8,
    sender: "Willie Blake",
    label: "Primary",
    labelColor: "bg-teal-100 text-teal-800",
    subject: "Our Bachelor of Commerce program is ACBSP-accredited.",
    time: "8:38 AM",
    starred: false,
  },
  {
    id: 9,
    sender: "Minerva Barnett",
    label: "Work",
    labelColor: "bg-orange-100 text-orange-800",
    subject: "Get Best Advertiser In Your Side Pocket",
    time: "8:13 AM",
    starred: false,
  },
  {
    id: 10,
    sender: "Fanny Weaver",
    label: null,
    labelColor: null,
    subject: "Free Classifieds Using Them To Promote Your Stuff Online",
    time: "7:52 PM",
    starred: false,
  },
  {
    id: 11,
    sender: "Olga Hogan",
    label: "Social",
    labelColor: "bg-blue-100 text-blue-800",
    subject: "Enhance Your Brand Potential With Giant Advertising Blimps",
    time: "4:13 PM",
    starred: false,
  },
  {
    id: 12,
    sender: "Lora Houston",
    label: "Friends",
    labelColor: "bg-purple-100 text-purple-800",
    subject: "Vacation Home Rental Success",
    time: "7:52 PM",
    starred: false,
  },
]

export function Inbox() {
  const navigate = useNavigate()
  const [selectedEmails, setSelectedEmails] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  const toggleEmailSelection = (id) => {
    setSelectedEmails((prev) => (prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]))
  }

  const handleEmailClick = (email) => {
    navigate(`/inbox/${email.id}`, { state: { email } })
  }

  return (
    <div className="flex h-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Left Sidebar */}
      <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-6 overflow-y-auto">
        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg mb-8 flex items-center justify-center gap-2 transition">
          <Plus size={20} />
          Compose
        </button>

        {/* My Email Section */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">My Email</h3>
          <div className="space-y-2">
            {emailFolders.map((folder) => (
              <div
                key={folder.name}
                className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition ${
                  folder.active
                    ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <span className="font-medium">{folder.name}</span>
                <span className={folder.active ? "text-blue-600 dark:text-blue-300" : "text-gray-500 dark:text-gray-400"}>
                  {folder.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Labels Section */}
        <div>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Label</h3>
          <div className="space-y-2">
            {labels.map((label) => (
              <div
                key={label.name}
                className="flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <div className={`w-4 h-4 rounded border-2 ${label.color}`}></div>
                <span className="text-gray-700 dark:text-gray-300">{label.name}</span>
              </div>
            ))}
          </div>
          <button className="mt-4 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium flex items-center gap-2">
            <Plus size={16} />
            Create New Label
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search mail"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
              <AlertCircle size={20} className="text-gray-600 dark:text-gray-300" />
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
              <AlertCircle size={20} className="text-gray-600 dark:text-gray-300" />
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
              <Trash2 size={20} className="text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>

        {/* Email List */}
        <div className="flex-1 overflow-y-auto">
          {emails.map((email) => (
            <div
              key={email.id}
              onClick={() => handleEmailClick(email)}
              className="border-b border-gray-200 dark:border-gray-700 px-6 py-4 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition flex items-center gap-4"
            >
              <input
                type="checkbox"
                checked={selectedEmails.includes(email.id)}
                onChange={() => toggleEmailSelection(email.id)}
                onClick={(e) => e.stopPropagation()}
                className="w-5 h-5 text-blue-500 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation()
                }}
                className="text-gray-400 dark:text-gray-500 hover:text-yellow-500 dark:hover:text-yellow-400 transition"
              >
                <Star size={20} fill={email.starred ? "currentColor" : "none"} />
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-semibold text-gray-900 dark:text-white">{email.sender}</span>
                  {email.label && (
                    <span className={`text-xs font-semibold px-2 py-1 rounded ${email.labelColor}`}>{email.label}</span>
                  )}
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm truncate">{email.subject}</p>
              </div>
              <span className="text-gray-500 dark:text-gray-400 text-sm whitespace-nowrap">{email.time}</span>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">Showing 1-12 of 1,253</span>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">{"<"}</button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">{">"}</button>
          </div>
        </div>
      </div>
    </div>
  )
}
