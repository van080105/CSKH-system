"use client"

import {
  Plus,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react"
import { useState, useMemo } from "react"
import { useTranslation } from "react-i18next"

const ticketsData = [
  { 
    id: 42321, 
    name: "Nguyễn Văn A", 
    title: "Không thể đăng nhập vào tài khoản", 
    status: "Open", 
    role: "Khách hàng",
    content: "Tôi không thể đăng nhập vào tài khoản của mình sau khi reset mật khẩu.",
    responseContent: "Chúng tôi đã kiểm tra và xác nhận tài khoản của bạn đang bị khóa do thử đăng nhập sai nhiều lần. Vui lòng thử lại sau 30 phút.",
    assignedTo : "Lê Văn A",
  },
  { 
    id: 42322, 
    name: "Nguyễn Văn B", 
    title: "Yêu cầu hoàn tiền đơn hàng #1234", 
    status: "Pending", 
    role: "Khách hàng",
    content: "Tôi yêu cầu hoàn tiền cho đơn hàng vì sản phẩm không đúng như mô tả.",
    responseContent: "Chúng tôi đã nhận được yêu cầu hoàn tiền của bạn và sẽ xử lý trong vòng 7 ngày làm việc.",
    assignedTo: "Lê Văn B",
  },
  { 
    id: 42323, 
    name: "Nguyễn Văn C", 
    title: "Lỗi khi thanh toán bằng thẻ VISA", 
    status: "In progress", 
    role: "Khách hàng",
    content: "Tôi không thể thanh toán đơn hàng sử dụng thẻ VISA. Lỗi xảy ra khi nhập thông tin thẻ.",
    responseContent: "Chúng tôi đã xác nhận lỗi thanh toán và đang tiến hành kiểm tra với ngân hàng phát hành thẻ VISA.",
    assignedTo: "Lê Văn C",
  },
  { 
    id: 42324, 
    name: "Nguyễn Văn D", 
    title: "Không nhận được email xác nhận", 
    status: "Completed", 
    role: "Khách hàng",
    content: "Tôi đã đăng ký tài khoản nhưng không nhận được email xác nhận.",
    responseContent: "Chúng tôi đã xác nhận email của bạn và đã gửi lại email xác nhận. Vui lòng kiểm tra hộp thư rác nếu không thấy.",
    assignedTo: "Lê Văn D",
  },
  { 
    id: 42325, 
    name: "Nguyễn Văn E", 
    title: "Đề xuất tính năng mới", 
    status: "Closed", 
    role: "Khách hàng",
    content: "Tôi đề xuất tính năng hỗ trợ thanh toán qua ví điện tử.",
    responseContent: "Cảm ơn bạn đã đóng góp ý kiến. Chúng tôi sẽ xem xét và cập nhật trong phiên bản tiếp theo.",
    assignedTo: "Lê Văn E",
  },
  { 
    id: 42326, 
    name: "Nguyễn Văn A", 
    title: "Cần hỗ trợ đổi mật khẩu", 
    status: "Open", 
    role: "Khách hàng",
    content: "Tôi yêu cầu hỗ trợ thay đổi mật khẩu vì quên mật khẩu hiện tại.",
    responseContent: "Chúng tôi đã gửi yêu cầu đặt lại mật khẩu qua email của bạn. Vui lòng làm theo hướng dẫn trong email.",
    assignedTo: "Lê Văn G",
  },
  { 
    id: 42327, 
    name: "Nguyễn Văn B", 
    title: "Giao diện bị lỗi trên mobile", 
    status: "Pending", 
    role: "Khách hàng",
    content: "Tôi phản ánh rằng giao diện của trang web bị lỗi khi truy cập trên thiết bị di động.",
    responseContent: "Chúng tôi đã ghi nhận lỗi này và đang tiến hành kiểm tra để cập nhật bản vá lỗi trong thời gian sớm nhất.",
    assignedTo: "Lê Văn H",
  },
  { 
    id: 42328, 
    name: "Nguyễn Văn F", 
    title: "Không tải được tài liệu hướng dẫn", 
    status: "Open", 
    role: "Khách hàng",
    content: "Tôi không thể tải được tài liệu hướng dẫn từ website.",
    responseContent: "Chúng tôi đã kiểm tra và đang tiến hành khắc phục sự cố tải tài liệu. Bạn có thể thử lại sau.",
    assignedTo: "Lê Văn T",
  },
  { 
    id: 42329, 
    name: "Nguyễn Văn G", 
    title: "Hỗ trợ kích hoạt tài khoản công ty", 
    status: "In progress", 
    role: "Khách hàng",
    content: "Tôi muốn hỗ trợ kích hoạt tài khoản cho công ty.",
    responseContent: "Chúng tôi đã nhận yêu cầu và sẽ tiến hành kích hoạt tài khoản trong vòng 48 giờ làm việc.",
    assignedTo: "Lê Văn K",
  },
  { 
    id: 42330, 
    name: "Nguyễn Văn H", 
    title: "Thanh toán thất bại nhiều lần", 
    status: "Open", 
    role: "Khách hàng",
    content: "Tôi gặp sự cố khi thanh toán, thanh toán liên tục thất bại dù đã thử nhiều lần.",
    responseContent: "Chúng tôi đang kiểm tra sự cố và sẽ liên hệ với bạn ngay khi có kết quả.",
    assignedTo: "Lê Văn L",
  }
];

const statusStyles = {
  Open: "bg-blue-50 text-blue-700 dark:bg-blue-600/20 dark:text-blue-300",
  Pending: "bg-orange-50 text-orange-700 dark:bg-orange-600/20 dark:text-orange-300",
  Completed: "bg-emerald-50 text-emerald-700 dark:bg-emerald-600/20 dark:text-emerald-300",
  Closed: "bg-red-50 text-red-700 dark:bg-red-600/20 dark:text-red-300",
  "In progress": "bg-blue-50 text-blue-700 dark:bg-blue-600/20 dark:text-blue-300",
}

export function ManageTickets() {
  const [selectedTickets, setSelectedTickets] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [nameFilter, setNameFilter] = useState("")
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
      const nameMatch = normalize(ticket.name).includes(search)
      const titleMatch = normalize(ticket.title).includes(search)
      const statusMatch = normalize(ticket.status).includes(search)

      const matchesSearch = idMatch || nameMatch || titleMatch || statusMatch
      const matchesStatus = statusFilter ? ticket.status === statusFilter : true
      const matchesName = nameFilter ? ticket.name === nameFilter : true

      return matchesSearch && matchesStatus && matchesName
    })
  }, [searchTerm, statusFilter, nameFilter])


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

  const uniqueNames = [...new Set(ticketsData.map((t) => t.name))]
  const uniqueStatuses = [...new Set(ticketsData.map((t) => t.status))]

  return (
    <div className="p-6 relative">
      {/* Header Controls */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="p-4 flex flex-wrap items-center gap-3">
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
            <Filter className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>

          {/* Name Filter */}
          <select
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
          >
            <option value="">{t("allNames")}</option>
            {uniqueNames.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>

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

          <button className="ml-auto flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
            <Plus className="h-4 w-4" />
            {t("addTicket")}
          </button>
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
                  {t("fullName")}
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                  {t("title")}
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                  {t("status")}
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                  {t("role")}
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                  {t("assignedTo")}
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
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{ticket.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 max-w-xs truncate">{ticket.title}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${statusStyles[ticket.status]}`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{ticket.role}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{ticket.assignedTo}</td>
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
                  {t("fullName")}
                </label>
                <input
                  type="text"
                  defaultValue={selectedTicket.name}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
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
                  {t("role")}
                </label>
                <input
                  type="text"
                  defaultValue={selectedTicket.role}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  {t("content")}
                </label>
                <textarea
                  readOnly
                  defaultValue={selectedTicket.content}
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 text-sm resize-none focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  {t("responseContent")}
                </label>
                <textarea
                  defaultValue={selectedTicket.responseContent}
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 text-sm resize-none focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                ></textarea>
              </div>

              {/* Assign Agent */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  {t("assignToAgent")}
                </label>
                <input
                  type="text"
                  placeholder="Agent Full Name"
                  defaultValue={selectedTicket.assignedTo}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
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
