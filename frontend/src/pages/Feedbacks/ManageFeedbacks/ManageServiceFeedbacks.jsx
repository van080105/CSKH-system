"use client"

import { useEffect, useState, useMemo } from "react"
import { Search, Filter, ChevronLeft, ChevronRight, X } from "lucide-react"

export default function ManageFeedbackForm() {
  const [data, setData] = useState([])
  const [selected, setSelected] = useState(null)

  const [search, setSearch] = useState("")
  const [ratingFilter, setRatingFilter] = useState("")
  const [linesPerPage, setLinesPerPage] = useState(10)
  const [page, setPage] = useState(1)

  useEffect(() => {
    const load = async () => {
      try {
        const token = localStorage.getItem("token")
        const res = await fetch("http://localhost:8080/admin/fb_form", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        })

        const json = await res.json()
        const rows = json.PromiseResult || json
        setData(rows)
      } catch (err) {
        console.error("API error:", err)
      }
    }
    load()
  }, [])

  const normalize = (str) =>
    str
      ?.toLowerCase()
      ?.normalize("NFD")
      ?.replace(/[\u0300-\u036f]/g, "")

  const filtered = useMemo(() => {
    return data.filter((item) => {
      const matchSearch =
        normalize(item.Content)?.includes(normalize(search)) ||
        item.FormID.toString().includes(search) ||
        item.CustomerID.toString().includes(search)

      const matchRating = ratingFilter ? item.Rating == ratingFilter : true

      return matchSearch && matchRating
    })
  }, [data, search, ratingFilter])

  const totalPages = Math.ceil(filtered.length / linesPerPage)
  const startIdx = (page - 1) * linesPerPage
  const paginated = filtered.slice(startIdx, startIdx + linesPerPage)

  const formatDate = (d) => d ? new Date(d).toISOString().split("T")[0] : ""

  return (
    <div className="p-6 relative">
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">

        {/* HEADER */}
        <div className="p-4 flex flex-wrap items-center gap-3 text-gray-800 dark:text-gray-200"> 
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
            <Filter className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>

          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
          >
            <option value="">Tất cả đánh giá</option>
            <option value="5">5 sao</option>
            <option value="4">4 sao</option>
            <option value="3">3 sao</option>
            <option value="2">2 sao</option>
            <option value="1">1 sao</option>
          </select>

          <div className="relative flex-1 max-w-md ml-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPage(1)
              }}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg 
              bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full table-fixed">
            <thead className="bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold">FormID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold">CustomerID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold">Rating</th>
                <th className="px-4 py-3 text-left text-xs font-semibold">Content</th>
                <th className="px-4 py-3 text-left text-xs font-semibold">Sent Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 text-gray-800 dark:text-gray-200">
              {paginated.map((fb, i) => (
                <tr
                  key={fb.FormID}
                  className={i % 2 ? "bg-gray-50 dark:bg-gray-800" : "bg-white dark:bg-gray-900"}
                >
                  <td className="px-4 py-3">{fb.FormID}</td>
                  <td className="px-4 py-3">{fb.CustomerID}</td>
                  <td className="px-4 py-3 text-yellow-500 font-semibold">{fb.Rating} ⭐</td>
                  <td className="px-4 py-3 max-w-xs truncate">{fb.Content}</td>
                  <td className="px-4 py-3">{formatDate(fb.SentDate)}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setSelected(fb)}
                      className="text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      Xem
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200">
          <p className="text-sm">
            {startIdx + 1}-{Math.min(startIdx + linesPerPage, filtered.length)} / {filtered.length}
          </p>

          <div className="flex items-center gap-2">
            <select
              value={linesPerPage}
              onChange={(e) => {
                setLinesPerPage(Number(e.target.value))
                setPage(1)
              }}
              className="px-3 py-1.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
            >
              {[10, 25, 50].map((n) => (
                <option key={n} value={n}>{n} dòng</option>
              ))}
            </select>

            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4 text-gray-700 dark:text-gray-300" />
            </button>

            <span>{page}/{totalPages || 1}</span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
            >
              <ChevronRight className="w-4 h-4 text-gray-700 dark:text-gray-300" />
            </button>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-full max-w-lg shadow-xl relative text-gray-800 dark:text-gray-200">
            <button
              onClick={() => setSelected(null)}
              className="absolute right-3 top-3 p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
            >
              <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>

            <h2 className="text-xl font-semibold mb-4">📄 Chi tiết Feedback</h2>

            <div className="space-y-3">
              <p><b>FormID:</b> {selected.FormID}</p>
              <p><b>CustomerID:</b> {selected.CustomerID}</p>
              <p><b>Rating:</b> {selected.Rating} ⭐</p>
              <p><b>Nội dung:</b> {selected.Content}</p>
              <p><b>Ngày gửi:</b> {formatDate(selected.SentDate)}</p>
            </div>

            <div className="text-right mt-5">
              <button
                className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                onClick={() => setSelected(null)}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
