"use client"

import { useState, useRef, useEffect } from "react"
import { OrderDetail } from "./OrderDetail"
import { CalendarPage } from "../components/CalendarPopup"
import { useTranslation } from "react-i18next"
import { ChevronLeft, ChevronRight, Filter } from "lucide-react"
import { useTheme } from "../hooks/useTheme"

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
  { id: "00010", name: "John Doe", address: "789 Street Ave", date: "10 Mar 2019", type: "Electric", status: "Completed" },
  { id: "00011", name: "Jane Smith", address: "456 Avenue Rd", date: "22 Apr 2019", type: "Book", status: "Processing" },
  { id: "00012", name: "Bob Wilson", address: "321 Road St", date: "05 May 2019", type: "Medicine", status: "Completed" },
]

const statusColors = {
  Completed: "bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300",
  Processing: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
  Rejected: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
  "On Hold": "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
  "In Transit": "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
}

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

const statusOptions = [
  "Completed",
  "Processing",
  "Rejected",
  "On Hold",
  "In Transit",
]

// Items per page
const ITEMS_PER_PAGE = 5

export function OrderLists() {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [selectedTypes, setSelectedTypes] = useState([])
  const [selectedOrderType, setSelectedOrderType] = useState("")
  const [selectedOrderStatus, setSelectedOrderStatus] = useState("")
  const [showCalendar, setShowCalendar] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [showOrderDetail, setShowOrderDetail] = useState(false)
  const [isDetailAnimating, setIsDetailAnimating] = useState(false)
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

  const toggleType = (type) => {
    setSelectedTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  const isSameDay = (date1, date2) =>
    date1?.getDate() === date2?.getDate() &&
    date1?.getMonth() === date2?.getMonth() &&
    date1?.getFullYear() === date2?.getFullYear()

  // Filter orders based on all filters
  const filteredOrders = orderData.filter((order) => {
    // Date filter
    if (selectedDate) {
      const orderDate = new Date(order.date)
      if (!isSameDay(orderDate, selectedDate)) return false
    }

    // Order type filter (from dropdown)
    if (selectedOrderType && order.type !== selectedOrderType) {
      return false
    }

    // Order status filter (from dropdown)
    if (selectedOrderStatus && order.status !== selectedOrderStatus) {
      return false
    }

    // Selected types filter (from filter modal)
    if (selectedTypes.length > 0) {
      // Map order types to filter categories
      const typeMap = {
        Electric: "Electronics",
        Book: "Book & Stationary",
        Medicine: "Health & Medicine",
        Mobile: "Mobile & Phone",
        Watch: "Accessories",
      }
      const orderCategory = typeMap[order.type] || order.type
      if (!selectedTypes.includes(orderCategory)) {
        return false
      }
    }

    return true
  })

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex)

  // Reset current page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedDate, selectedOrderType, selectedOrderStatus, selectedTypes])

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
  }

  const handleResetFilter = () => {
    setSelectedDate(null)
    setSelectedTypes([])
    setSelectedOrderType("")
    setSelectedOrderStatus("")
    setCurrentPage(1)
  }

  const handleApplyFilter = () => {
    setShowFilterModal(false)
  }

  const handleOrderClick = (order) => {
    setSelectedOrder(order)
    setShowOrderDetail(true)
    setTimeout(() => setIsDetailAnimating(true), 10)
  }

  const handleCloseOrderDetail = () => {
    setIsDetailAnimating(false)
    setTimeout(() => {
      setShowOrderDetail(false)
      setSelectedOrder(null)
    }, 300)
  }

  // Get unique order types from orderData
  const uniqueOrderTypes = [...new Set(orderData.map(order => order.type))]

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          {t("orderLists")}
        </h1>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-wrap gap-4 items-center relative">
        <button
          onClick={() => setShowFilterModal(true)}
          className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-200 transition-colors bg-white dark:bg-gray-800"
        >
          <Filter className="h-4 w-4" />
          <span>{t("filterBy")}</span>
        </button>

        {/* Calendar Trigger */}
        <div className="relative">
          <button
            onClick={() => setShowCalendar((v) => !v)}
            className="border border-gray-300 dark:border-gray-700 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {selectedDate ? selectedDate.toLocaleDateString() : t("selectDate")}
          </button>

          {showCalendar && (
            <div ref={calendarRef} className="absolute z-50 mt-2">
              <CalendarPage
                selectedDate={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date)
                  setShowCalendar(false)
                }}
              />
              <button
                onClick={() => setShowCalendar(false)}
                className="mt-2 w-full bg-red-500 text-white rounded py-1 hover:bg-red-600 transition-colors"
              >
                {t("close")}
              </button>
            </div>
          )}
        </div>

        <select 
          value={selectedOrderType}
          onChange={(e) => setSelectedOrderType(e.target.value)}
          className="border border-gray-300 dark:border-gray-700 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
        >
          <option value="">{t("orderType")}</option>
          {uniqueOrderTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <select 
          value={selectedOrderStatus}
          onChange={(e) => setSelectedOrderStatus(e.target.value)}
          className="border border-gray-300 dark:border-gray-700 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
        >
          <option value="">{t("orderStatus")}</option>
          {statusOptions.map((status) => {
            const statusKey = status.toLowerCase().replace(/\s+/g, "")
            return (
              <option key={status} value={status}>
                {t(statusKey) || status}
              </option>
            )
          })}
        </select>

        <button
          className="ml-auto text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-500 font-semibold flex items-center gap-2 transition-colors"
          onClick={handleResetFilter}
        >
          <span>↻</span>
          {t("resetFilter")}
        </button>
      </div>

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              {t("selectOrderType")}
            </h2>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {orderTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => toggleType(type)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    selectedTypes.includes(type)
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              *{t("youCanChooseMultiple")}
            </p>
            <button
              onClick={handleApplyFilter}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              {t("applyNow")}
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                <input 
                  type="checkbox" 
                  className="dark:bg-gray-700 dark:border-gray-600" 
                  onClick={(e) => e.stopPropagation()}
                />
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                {t("id")}
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                {t("name")}
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                {t("address")}
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                {t("date")}
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                {t("type")}
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                {t("status")}
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.length > 0 ? (
              paginatedOrders.map((order, idx) => (
                <tr
                  key={idx}
                  onClick={() => handleOrderClick(order)}
                  className="border-b border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
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
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                  {t("noResults") || "No orders found"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {t("showing")} {startIndex + 1}-{Math.min(endIndex, filteredOrders.length)} {t("of")} {filteredOrders.length}
        </p>
        <div className="flex gap-2">
          <button 
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-3 py-1 border rounded-lg transition-colors ${
              currentPage === 1
                ? "border-gray-300 dark:border-gray-700 text-gray-400 dark:text-gray-600 cursor-not-allowed"
                : "border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 text-gray-700 hover:text-gray-900"
            }`}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button 
            onClick={handleNextPage}
            disabled={currentPage >= totalPages}
            className={`px-3 py-1 border rounded-lg transition-colors ${
              currentPage >= totalPages
                ? "border-gray-300 dark:border-gray-700 text-gray-400 dark:text-gray-600 cursor-not-allowed"
                : "border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 text-gray-700 hover:text-gray-900"
            }`}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Order Detail Overlay */}
      {showOrderDetail && selectedOrder && (
        <>
          {/* Backdrop */}
          <div
            onClick={handleCloseOrderDetail}
            className={`fixed inset-0 z-50 transition-opacity duration-300 ${
              isDetailAnimating ? "opacity-100" : "opacity-0"
            } ${
              isDark
                ? "bg-gray-900 bg-opacity-75"
                : "bg-gray-50 bg-opacity-40"
            }`}
          />
          {/* Order Detail Modal */}
          <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
              isDetailAnimating ? "opacity-100" : "opacity-0"
            } transition-opacity duration-300`}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                handleCloseOrderDetail()
              }
            }}
          >
            <div
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden transition-all duration-300 ${
                isDetailAnimating ? "scale-100" : "scale-95"
              }`}
            >
              <div className="overflow-y-auto max-h-[90vh]">
                <OrderDetail order={selectedOrder} onClose={handleCloseOrderDetail} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
