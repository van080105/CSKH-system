import { useState, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Search, Filter, ChevronLeft, ChevronRight, X } from "lucide-react";

const statusStyles = {
  "Chưa trả lời":
    "bg-orange-50 text-orange-700 dark:bg-orange-600/20 dark:text-orange-300",
  "Đã trả lời":
    "bg-emerald-50 text-emerald-700 dark:bg-emerald-600/20 dark:text-emerald-300",
  "Đang xử lý":
    "bg-blue-50 text-blue-700 dark:bg-blue-600/20 dark:text-blue-300",
};

export default function AgentTickets() {
  const [ticketsData, setTicketsData] = useState([]); // ✔ dữ liệu thật từ API
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [selectedTickets, setSelectedTickets] = useState([]);
  const [escalatedTickets, setEscalatedTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [linesPerPage, setLinesPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const { t } = useTranslation();
  // ============================
  // 🚀 FETCH API
  // ============================
  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:8080/agent/form", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch");

      const data = await response.json();
      console.log(data)
      setTicketsData(data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const filteredTickets = useMemo(() => {
    const normalize = (value) =>
      value
        ?.toString()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    return ticketsData.filter((ticket) => {
      const id = ticket.FormID?.join("") || "";
      const name = ticket.AgentID?.toString() || "";
      const title = ticket.Title || "";
      const status = ticket.Stt || "";

      const matchesSearch =
        normalize(id).includes(normalize(searchTerm)) ||
        normalize(name).includes(normalize(searchTerm)) ||
        normalize(title).includes(normalize(searchTerm)) ||
        normalize(status).includes(normalize(searchTerm));

      const matchesStatus = statusFilter ? ticket.Stt === statusFilter : true;
      const matchesCategory = categoryFilter ? ticket.Typ === categoryFilter : true;
      const matchesName = nameFilter ? ticket.AgentID.toString() === nameFilter : true;

      const isEscalated = escalatedTickets.includes(ticket.FormID); // ID của ticket bị escalate
      const matchesType =
        typeFilter === "escalated" ? isEscalated :
        typeFilter === "normal" ? !isEscalated :
        true;

      return matchesSearch && matchesStatus && matchesCategory && matchesName && matchesType;
    }).sort((a,b) => {
			const priority = {
				"Chưa trả lời": 1,
				"Đang xử lý": 2,
				"Đã trả lời": 3,
			};
			return priority[a.Stt] - priority[b.Stt];			
		});
  }, [searchTerm, statusFilter, categoryFilter, nameFilter,typeFilter, ticketsData]);

    const toggleSelectAll = () => {
    if (selectedTickets.length === paginatedTickets.length) {
      setSelectedTickets([]);
    } else {
      setSelectedTickets(paginatedTickets.map((_, i) => i));
    }
  };

  const toggleSelect = (index) => {
    if (selectedTickets.includes(index)) {
      setSelectedTickets(selectedTickets.filter((i) => i !== index));
    } else {
      setSelectedTickets([...selectedTickets, index]);
    }
  };
  // --- Pagination ---
  const totalPages = Math.ceil(filteredTickets.length / linesPerPage);
  const startIdx = (page - 1) * linesPerPage;
  const endIdx = Math.min(startIdx + linesPerPage, filteredTickets.length);
  const paginatedTickets = filteredTickets.slice(startIdx, endIdx);

  const uniqueNames = [...new Set(ticketsData.map((t) => t.AgentID?.toString()))];
  const uniqueStatuses = [...new Set(ticketsData.map((t) => t.Stt))];
  const uniqueCategories = [...new Set(ticketsData.map((t) => t.Typ))];

  // ============================
  // 📌 ESCALATE HANDLER
  // ============================
  const handleEscalate = (ticket) => {
    setEscalatedTickets([...escalatedTickets, ticket]);
  };

  return (
    <div className="p-6 relative">
      {/* HEADER FILTERS */}
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

          {/* Type Filter (Escalated / Normal) */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
          >
            <option value="">{t("allTicketsType")}</option>
            <option value="escalated">{t("escalatedFromAgent")}</option>
            <option value="normal">{t("normalTickets")}</option>
          </select>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
          >
            <option value="">{t("allCategories")}</option>
            {uniqueCategories.map((c) => (
              <option key={c} value={c}>{c}</option>
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
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* TABLE */}
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
                  {t("category")}
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                  {t("action")}
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {paginatedTickets.map((ticket,index) => (
                <tr 
                  key={ticket.FormID?.[0]}
                  className={`${
                    index % 2 === 1 ? "bg-gray-50 dark:bg-gray-800" : "bg-white dark:bg-gray-900"
                  } hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors`}                  
                >
                  <td className="w-[40px] px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedTickets.includes(index)}
                      onChange={() => toggleSelect(index)}
                      className="rounded border-gray-300 dark:border-gray-600"
                    />
                  </td>                  
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{ticket.FormID?.[0]}</td>

                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 max-w-xs truncate">
                    {ticket.Title}
                  </td>

                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${statusStyles[ticket.Stt]}`}>
                      {ticket.Stt}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{ticket.Typ}</td>

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

        {/* PAGINATION */}
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

      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/60 backdrop-blur-sm transition-all">
          <div
            className="relative w-full max-w-lg rounded-2xl border border-gray-200 dark:border-gray-700
            bg-white dark:bg-gray-900 shadow-2xl overflow-hidden animate-fadeInUp"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                🧾 Chi tiết Ticket #{selectedTicket.FormID?.[0]}
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

              {/* ID + Status */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    ID
                  </label>
                  <input
                    type="text"
                    value={selectedTicket.FormID?.[0]}
                    readOnly
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 
                    dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    Trạng thái
                  </label>
                  <input
                    readOnly
                    value={selectedTicket.Stt}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 
                    dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 text-sm"
                  />
                </div>
              </div>

              {/* Agent */}
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Agent ID
                </label>
                <input
                  readOnly
                  value={selectedTicket.AgentID}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 
                  dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 text-sm"
                />
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Tiêu đề
                </label>
                <textarea
                  readOnly
                  rows={3}
                  value={selectedTicket.Title}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 
                  dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 text-sm resize-none"
                ></textarea>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Loại
                </label>
                <input
                  readOnly
                  value={selectedTicket.Typ}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 
                  dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 text-sm"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Nội dung khách gửi
                </label>
                <textarea
                  readOnly
                  rows={3}
                  value={selectedTicket.Content}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 
                  dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 text-sm resize-none"
                ></textarea>
              </div>

              {/* Response */}
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Nội dung phản hồi
                </label>
                <textarea
                  rows={3}
                  defaultValue={selectedTicket.resContent}
                  readOnly={escalatedTickets.some(
                    (t) => t.FormID?.[0] === selectedTicket.FormID?.[0]
                  )}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 
                  dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 text-sm resize-none"
                ></textarea>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60">

              {/* Cancel */}
              <button
                onClick={() => setSelectedTicket(null)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 
                hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                Đóng
              </button>

              {/* Escalate */}
              <button
                onClick={() => handleEscalate(selectedTicket)}
                disabled={escalatedTickets.some(
                  (t) => t.FormID?.[0] === selectedTicket.FormID?.[0]
                )}
                className={`px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors
                  ${
                    escalatedTickets.some(
                      (t) => t.FormID?.[0] === selectedTicket.FormID?.[0]
                    )
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-orange-500 hover:bg-orange-600"
                  }`}
              >
                Chuyển lên Admin
              </button>

              {/* Save */}
              <button
                disabled={escalatedTickets.some(
                  (t) => t.FormID?.[0] === selectedTicket.FormID?.[0]
                )}
                onClick={() => setSelectedTicket(null)}
                className={`px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors
                  ${
                    escalatedTickets.some(
                      (t) => t.FormID?.[0] === selectedTicket.FormID?.[0]
                    )
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
              >
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
