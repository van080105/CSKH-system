"use client"

import { useState, useRef, useEffect, useMemo } from "react"
import { ChevronLeft, ChevronRight, Filter, Search, X } from "lucide-react"
import { OrderDetail } from "./OrderDetail"
import { useTranslation } from "react-i18next"
import { useTheme } from "../hooks/useTheme"

const statusColors = {
  "Đã giao": "bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300",
  "Đang giao": "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
  "Đang xử lý": "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
  "Chờ xử lý": "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
  "Đã hủy": "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
}

const ITEMS_PER_PAGE = 5

export function OrderLists() {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const [orderData, setOrderData] = useState([])
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [showOrderDetail, setShowOrderDetail] = useState(false)
  const [isDetailAnimating, setIsDetailAnimating] = useState(false)
  const [search, setSearch] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token")
        const user = JSON.parse(localStorage.getItem("user"))
        if (!user?.id) return
        const res = await fetch(`http://localhost:8080/customer/order`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        })
        const data = await res.json()
        setOrderData(data)
      } catch (err) {
        console.error("Error fetching orders:", err)
      }
    }
    fetchOrders()
  }, [])

  const normalize = (str) =>
    str?.toLowerCase()?.normalize("NFD")?.replace(/[\u0300-\u036f]/g, "")

  const filteredOrders = useMemo(() => {
    return orderData.filter((order) => {
      const matchSearch =
        normalize(order.DeliveryAddress)?.includes(normalize(search)) ||
        order.OrderID.toString().includes(search)
      const matchStatus = selectedStatus ? order.Stt === selectedStatus : true

      return matchSearch && matchStatus
    })
  }, [orderData, search, selectedStatus])

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex)

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

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-xl border border-gray-200 dark:border-gray-700">
      <div className="mb-8 flex items-center gap-4">
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
          <Filter className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </button>

        {/* Status Filter */}
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
        >
          <option value="">Tất cả trạng thái</option>
          <option value="Đã giao">Đã giao</option>
          <option value="Đang giao">Đang giao</option>
          <option value="Đang xử lý">Đang xử lý</option>
          <option value="Chờ xử lý">Chờ xử lý</option>
          <option value="Đã hủy">Đã hủy</option>
        </select>

        {/* Search */}
        <div className="relative flex-1 max-w-md ml-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setCurrentPage(1)
            }}
            className="w-full pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg 
              bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
          />
        </div>
      </div>

      {/* Order List */}
      <div className="overflow-x-auto">
        <table className="w-full table-fixed border border-gray-300 dark:border-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold border-b border-gray-300 dark:border-gray-700">Mã Đơn</th>
              <th className="px-4 py-3 text-left text-xs font-semibold border-b border-gray-300 dark:border-gray-700">Tên sản phẩm</th>
              <th className="px-4 py-3 text-left text-xs font-semibold border-b border-gray-300 dark:border-gray-700">Địa chỉ giao</th>
              <th className="px-4 py-3 text-left text-xs font-semibold border-b border-gray-300 dark:border-gray-700">Ngày đặt</th>
              <th className="px-4 py-3 text-left text-xs font-semibold border-b border-gray-300 dark:border-gray-700">Trạng thái</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-gray-800 dark:text-gray-200">
            {paginatedOrders.map((order) => (
              <tr
                key={order.OrderID}
                className="hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                onClick={() => handleOrderClick(order)}
              >
                <td className="px-4 py-3 border-b border-gray-300 dark:border-gray-700">{order.OrderID}</td>
                <td className="px-4 py-3 border-b border-gray-300 dark:border-gray-700">{order.ProductName}</td>
                <td className="px-4 py-3 border-b border-gray-300 dark:border-gray-700 max-w-xs truncate">{order.DeliveryAddress}</td>
                <td className="px-4 py-3 border-b border-gray-300 dark:border-gray-700">{new Date(order.OrderDate).toLocaleString()}</td>
                <td className="px-4 py-3 border-b border-gray-300 dark:border-gray-700">
                  <span
                    className={`inline-block mt-2 px-2 py-1 text-xs rounded ${statusColors[order.Stt]}`}
                  >
                    {order.Stt}
                  </span>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200">
        <p className="text-sm">
          {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, filteredOrders.length)} / {filteredOrders.length}
        </p>

        <div className="flex items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4 text-gray-700 dark:text-gray-300" />
          </button>

          <span>{currentPage}/{totalPages || 1}</span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
          >
            <ChevronRight className="w-4 h-4 text-gray-700 dark:text-gray-300" />
          </button>
        </div>
      </div>

    {/* Modal Order Detail */}
      <OrderDetail 
        selectedOrder={selectedOrder} 
        showOrderDetail={showOrderDetail} 
        isDetailAnimating={isDetailAnimating} 
        handleCloseOrderDetail={handleCloseOrderDetail} 
      />

    </div>
  )
}
