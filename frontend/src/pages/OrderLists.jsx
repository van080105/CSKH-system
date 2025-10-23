"use client"

import { useState, useRef, useEffect } from "react"
import { OrderDetail } from "./OrderDetail"
import { CalendarPage } from "../components/CalendarPopup"

const orderData = [
  { id: "00001", name: "Chris", address: "123 Main St", date: "15 Feb 2019", type: "Electric", status: "Completed" },
  { id: "00002", name: "Rosie", address: "456 Oak Ave", date: "20 Feb 2019", type: "Book", status: "Processing" },
  { id: "00003", name: "Dan", address: "789 Pine Rd", date: "25 Feb 2019", type: "Medicine", status: "Rejected" },
  { id: "00004", name: "Gilbe", address: "321 Elm St", date: "28 Feb 2019", type: "Mobile", status: "Completed" },
  { id: "00005", name: "Alan Cain", address: "042 Mylene Throughway", date: "29 Jul 2019", type: "Watch", status: "Processing" },
  { id: "00006", name: "Alfred Murray", address: "543 Weimann Mountain", date: "15 Aug 2019", type: "Medicine", status: "Completed" },
  { id: "00007", name: "Maggie Sullivan", address: "New Scottieberg", date: "21 Dec 2019", type: "Watch", status: "Processing" },
  { id: "00008", name: "Rosie Todd", address: "New Jon", date: "30 Apr 2019", type: "Medicine", status: "On Hold" },
  { id: "00009", name: "Dollie Hines", address: "124 Lyla Forge Suite 975", date: "09 Jan 2019", type: "Book", status: "In Transit" },
]

const statusColors = {
  Completed: "bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300",
  Processing: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
  Rejected: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
  "On Hold": "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
  "In Transit": "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
}

export function OrderLists() {
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [selectedTypes, setSelectedTypes] = useState(["Health & Medicine"])
  const [showCalendar, setShowCalendar] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const calendarRef = useRef(null)

  // Đóng calendar khi click bên ngoài
  useEffect(() => {
    function handleClickOutside(event) {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])
  const orderTypes = [
    "Health & Medicine",
    "Book & Stationary",
    "Services & Industry",
    "Fashion & Beauty",
    "Home & Living",
    "Electronics",
    "Mobile & Phone",
    "Accessories",
  ]

  const toggleType = (type) => {
    setSelectedTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  const isSameDay = (date1, date2) =>
    date1?.getDate() === date2?.getDate() &&
    date1?.getMonth() === date2?.getMonth() &&
    date1?.getFullYear() === date2?.getFullYear()

  const filteredOrders = orderData.filter((order) => {
    if (!selectedDate) return true
    const orderDate = new Date(order.date)
    return isSameDay(orderDate, selectedDate)
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Order Lists</h1>
      </div>

      {/* Filters */}
      <div className="mb-8 flex gap-4 items-center relative">
        <button
          onClick={() => setShowFilterModal(true)}
          className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-200 transition-colors"
        >
          <span>⚙️</span>
          <span>Filter By</span>
        </button>

        {/* Calendar Trigger */}
        <div className="relative">
          <button
            onClick={() => setShowCalendar((v) => !v)}
            className="border border-gray-300 dark:border-gray-700 px-4 py-2 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
          >
            {selectedDate ? selectedDate.toLocaleDateString() : "Select Date"}
          </button>

          {showCalendar && (
            <div ref={calendarRef} className="absolute z-50 mt-2">
              <CalendarPage
                selectedDate={selectedDate}
                onChange={(date) => setSelectedDate(date)}
              />
              {/* Nút đóng popup rõ ràng */}
              <button
                onClick={() => setShowCalendar(false)}
                className="mt-2 w-full bg-red-500 text-white rounded py-1 hover:bg-red-600"
              >
                Close
              </button>
            </div>
          )}
        </div>

        <select className="border border-gray-300 dark:border-gray-700 px-4 py-2 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200">
          <option>Order Type</option>
        </select>
        <select className="border border-gray-300 dark:border-gray-700 px-4 py-2 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200">
          <option>Order Status</option>
        </select>
        <button
          className="ml-auto text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-500 font-semibold flex items-center gap-2"
          onClick={() => {
            setSelectedDate(null)
            setSelectedTypes([])
          }}
        >
          <span>↻</span>
          Reset Filter
        </button>
      </div>

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">Select Order Type</h2>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {orderTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => toggleType(type)}
                  className={`px-4 py-2 rounded font-semibold transition ${
                    selectedTypes.includes(type)
                      ? "bg-blue-600 text-white"
                      : "border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">*You can choose multiple Order type</p>
            <button
              onClick={() => setShowFilterModal(false)}
              className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700"
            >
              Apply Now
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                <input type="checkbox" className="dark:bg-gray-700 dark:border-gray-600" />
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">NAME</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">ADDRESS</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">DATE</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">TYPE</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <td className="px-6 py-4">
                  <input type="checkbox" className="dark:bg-gray-700 dark:border-gray-600" />
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{order.id}</td>
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{order.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{order.address}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{order.date}</td>
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">{order.type}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[order.status]}`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400">Showing {filteredOrders.length} of {orderData.length}</p>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-gray-300 dark:border-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200">
            ←
          </button>
          <button className="px-3 py-1 border border-gray-300 dark:border-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200">
            →
          </button>
        </div>
      </div>
    </div>
  )
}
