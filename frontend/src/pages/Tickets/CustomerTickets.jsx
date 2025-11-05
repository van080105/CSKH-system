"use client"

import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react"
import { useState, useMemo } from "react"
import { useTranslation } from "react-i18next"

const ticketsData = [
  { id: 42321, title: "Không thể đăng nhập vào tài khoản", status: "Open", content: "Tôi không thể đăng nhập vào tài khoản của mình sau khi reset mật khẩu."},
  { id: 42322, title: "Yêu cầu hoàn tiền đơn hàng #1234", status: "Pending", content: "Tôi yêu cầu hoàn tiền cho đơn hàng vì sản phẩm không đúng như mô tả."},
  { id: 42323, title: "Lỗi khi thanh toán bằng thẻ VISA", status: "In progress",content: "Tôi không thể thanh toán đơn hàng sử dụng thẻ VISA. Lỗi xảy ra khi nhập thông tin thẻ."},
  { id: 42324, title: "Không nhận được email xác nhận", status: "Completed", content: "Tôi đã đăng ký tài khoản nhưng không nhận được email xác nhận."},
  { id: 42325, title: "Đề xuất tính năng mới", status: "Closed", content: "Tôi đề xuất tính năng hỗ trợ thanh toán qua ví điện tử."},
]

const statusStyles = {
  Open: "bg-blue-50 text-blue-700 dark:bg-blue-600/20 dark:text-blue-300",
  Pending: "bg-orange-50 text-orange-700 dark:bg-orange-600/20 dark:text-orange-300",
  Completed: "bg-emerald-50 text-emerald-700 dark:bg-emerald-600/20 dark:text-emerald-300",
  Closed: "bg-red-50 text-red-700 dark:bg-red-600/20 dark:text-red-300",
  "In progress": "bg-blue-50 text-blue-700 dark:bg-blue-600/20 dark:text-blue-300",
}

export function CustomerTickets() {
  const [selectedTickets, setSelectedTickets] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [linesPerPage, setLinesPerPage] = useState(10)
  const [page, setPage] = useState(1)
  const [selectedTicket, setSelectedTicket] = useState(null)
  const { t } = useTranslation()

  // --- Filtering & Searching ---
  const filteredTickets = useMemo(() => {
    const normalize = (str) =>
      str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // loại bỏ dấu
        .trim()

    const search = normalize(searchTerm)

    return ticketsData.filter((ticket) => {
      const idMatch = ticket.id.toString().includes(search)
      const titleMatch = normalize(ticket.title).includes(search)
      const statusMatch = normalize(ticket.status).includes(search)

      const matchesSearch = idMatch || nameMatch || titleMatch || statusMatch
      const matchesStatus = statusFilter ? ticket.status === statusFilter : true

      return matchesSearch && matchesStatus 
    })
  }, [searchTerm, statusFilter])


  // --- Pagination ---
  const totalPages = Math.ceil(filteredTickets.length / linesPerPage)
  const startIdx = (page - 1) * linesPerPage
  const endIdx = Math.min(startIdx + linesPerPage, filteredTickets.length)
  const paginatedTickets = filteredTickets.slice(startIdx, endIdx)

  const toggleSelectAll = () => {
    if (selectedTickets.length === paginatedTickets.length) {
      setSelectedTickets([])
    } else {
      setSelectedTickets(paginatedTickets.map((_, i) => i))
    }
  }

  const toggleSelect = (index) => {
    if (selectedTickets.includes(index)) {
      setSelectedTickets(selectedTickets.filter((i) => i !== index))
    } else {
      setSelectedTickets([...selectedTickets, index])
    }
  }

  const uniqueStatuses = [...new Set(ticketsData.map((t) => t.status))]

  return (
    <div className="p-6 relative">
      {/* Header Controls */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="p-4 flex flex-wrap items-center gap-3">
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
            <Filter className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
          >
            <option value="">{t("allStatuses")}</option>
            {uniqueStatuses.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-md ml-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder={t("searchForTicket")}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setPage(1)
              }}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-fixed">
            <thead className="bg-gray-50 dark:bg-gray-800 border-y border-gray-200 dark:border-gray-700">
              <tr>
                <th className="w-[40px] px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedTickets.length === paginatedTickets.length}
                    onChange={toggleSelectAll}
                    className="rounded border-gray-300 dark:border-gray-600"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                  ID
                </th>

                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                  {t("title")}
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                  {t("status")}
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                  {t("action")}
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedTickets.map((ticket, index) => (
                <tr
                  key={index}
                  className={`hover:bg-gray-50 dark:hover:bg-gray-800 ${
                    index % 2 === 1
                      ? "bg-gray-50 dark:bg-gray-800"
                      : "bg-white dark:bg-gray-900"
                  }`}
                >
                  <td className="w-[40px] px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedTickets.includes(index)}
                      onChange={() => toggleSelect(index)}
                      className="rounded border-gray-300 dark:border-gray-600"
                    />
                  </td>

                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{ticket.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 max-w-xs truncate">{ticket.title}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${statusStyles[ticket.status]}`}>
                      {ticket.status}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <button
                      onClick={() => setSelectedTicket(ticket)}
                      className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      {t("viewMore")}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


        {/* Pagination */}
        <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {`${startIdx + 1}-${endIdx} ${t("of") || "of"} ${filteredTickets.length}`}
          </p>
          <div className="flex items-center gap-2">
            <select
              value={linesPerPage}
              onChange={(e) => {
                setLinesPerPage(Number(e.target.value))
                setPage(1)
              }}
              className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200 rounded-lg"
            >
              {[10, 25, 50].map((num) => (
                <option key={num} value={num}>{`${t("linesPerPage") || "Lines per page"} ${num}`}</option>
              ))}
            </select>
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </button>
            <span className="text-sm text-gray-600 dark:text-gray-300">{`${page}/${totalPages || 1}`}</span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded disabled:opacity-50"
            >
              <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Overlay Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/60 backdrop-blur-sm transition-all">
          <div
            className="relative w-full max-w-lg rounded-2xl border border-gray-200 dark:border-gray-700
            bg-white dark:bg-gray-900 shadow-2xl overflow-hidden animate-fadeInUp"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                🧾 {t("ticketDetails")}
              </h2>
              <button
                onClick={() => setSelectedTicket(null)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    ID
                  </label>
                  <input
                    type="text"
                    value={selectedTicket.id}
                    readOnly
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    {t("status")}
                  </label>
                  <select
                    disabled
                    defaultValue={selectedTicket.status}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    <option>Open</option>
                    <option>Pending</option>
                    <option>In progress</option>
                    <option>Completed</option>
                    <option>Closed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  {t("title")}
                </label>
                <textarea
                  defaultValue={selectedTicket.title}
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 text-sm resize-none focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  {t("content")}
                </label>
                <textarea
                  defaultValue={selectedTicket.content}
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 text-sm resize-none focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                ></textarea>
              </div>

            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60">
              <button
                onClick={() => setSelectedTicket(null)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {t("cancel")}
              </button>
              <button
                onClick={() => setSelectedTicket(null)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
              >
                {t("saveChanges")}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
