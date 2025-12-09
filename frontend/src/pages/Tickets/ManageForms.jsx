
import { useState, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Search, Filter, ChevronLeft, ChevronRight, X } from "lucide-react";

export function ManageForms() {
  const [ticketsData, setTicketsData] = useState([]);
  const [selectedTickets, setSelectedTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [linesPerPage, setLinesPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [warnings, setWarnings] = useState([]);
  const [suggestion, setSuggestion] = useState(null);
  const [forceReassign, setForceReassign] = useState(false);
  const { t } = useTranslation();

  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8080/admin/forms", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setTicketsData(data);
    } catch (err) {
      console.log("Error when fetch tickets:", err);
    }
  };

  const autoAssign = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8080/api/forms/assign-all", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.log("Error when auto assign:", err);
    }
  };

  const reAssign = async (selectedTicket) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8080/api/forms/reassign", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          formId: selectedTicket.FormID,
          agentId: selectedTicket.Agent_ID,
        }),
      });
      const data = await res.json();
      setWarnings(data.warnings || []);
      setSuggestion(data.suggestion || null);
      setSelectedTicket(null);
    } catch (err) {
      console.log("Error when re assign:", err);
    }
  };
const forceReassignTicket = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:8080/api/forms/reassign", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        formId: selectedTicket.FormID,
        agentId: selectedTicket.Agent_ID,
        force: true,  // Send force flag to force reassignment
      }),
    });
    const data = await res.json();
    setWarnings(data.warnings || []);
    setSuggestion(data.suggestion || null);
    setSelectedTicket(null);
  } catch (err) {
    console.log("Error when force reassign:", err);
  }
};

  useEffect(() => {
    fetchTickets();
    autoAssign();
  }, []);

  const escalatedTickets = [];
  const statusStyles = {
    "Chưa trả lời": "bg-orange-50 text-orange-700 dark:bg-orange-600/20 dark:text-orange-300",
    "Đã trả lời": "bg-emerald-50 text-emerald-700 dark:bg-emerald-600/20 dark:text-emerald-300",
    "Đang xử lý": "bg-blue-50 text-blue-700 dark:bg-blue-600/20 dark:text-blue-300",
  };

  // --- Filtering & Searching ---
  const filteredTickets = useMemo(() => {
    const normalize = (str) =>
      str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // loại bỏ dấu
        .trim();

    const search = normalize(searchTerm);

    return ticketsData.filter((ticket) => {
      const idMatch = ticket.FormID.toString().includes(search);
      const nameMatch = normalize(ticket.Cus_name).includes(search);
      const titleMatch = normalize(ticket.Title).includes(search);
      const statusMatch = normalize(ticket.Stt).includes(search);
      const categoryMatch = normalize(ticket.Typ).includes(search);

      const matchesSearch = idMatch || nameMatch || titleMatch || statusMatch || categoryMatch;
      const matchesStatus = statusFilter ? ticket.Stt === statusFilter : true;
      const matchesCategory = categoryFilter ? ticket.Typ === categoryFilter : true;
      const matchesName = nameFilter ? ticket.Cus_name === nameFilter : true;

      const isEscalated = escalatedTickets.includes(ticket.FormID);
      const matchesType =
        typeFilter === "escalated" ? isEscalated :
        typeFilter === "normal" ? !isEscalated :
        true;

      return matchesSearch && matchesStatus && matchesName && matchesCategory && matchesType;
    }).sort((a, b) => {
      const priority = {
        "Chưa trả lời": 2,
        "Đang xử lý": 1,
        "Đã trả lời": 3,
      };
      return priority[a.Stt] - priority[b.Stt];
    });
  }, [searchTerm, statusFilter, nameFilter, categoryFilter, typeFilter, ticketsData]);

  // --- Pagination ---
  const totalPages = Math.ceil(filteredTickets.length / linesPerPage);
  const startIdx = (page - 1) * linesPerPage;
  const endIdx = Math.min(startIdx + linesPerPage, filteredTickets.length);
  const paginatedTickets = filteredTickets.slice(startIdx, endIdx);

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

  const uniqueNames = [...new Set(ticketsData.map((t) => t.Cus_name))];
  const uniqueStatuses = [...new Set(ticketsData.map((t) => t.Stt))];
  const uniqueCategories = [...new Set(ticketsData.map((t) => t.Typ))];

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

          {/* Type Filter (Escalated / Normal) */}
          {/* <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
          >
            <option value="">{t("loại form")}</option>
            <option value="escalated">{t("escalatedFromAgent")}</option>
            {uniqueTypes.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
            <option value="normal">{t("form thường")}</option>
          </select> */}

          {/* Search Bar */}
          <div className="relative flex-1 max-w-md ml-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder={t("Tìm kiếm form")}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
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
                  {t("fullName")}
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
                  key={ticket.FormID}
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
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{ticket.FormID}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{ticket.Cus_name}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 max-w-xs truncate">{ticket.Title}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${statusStyles[ticket.Stt]}`}>
                      {ticket.Stt}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{ticket.Typ}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{ticket.Agent_ID}</td>
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
                setLinesPerPage(Number(e.target.value));
                setPage(1);
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
    <div className="relative w-full max-w-lg rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-2xl overflow-hidden animate-fadeInUp">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          🧾 {t("Chi tiết form")}
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
        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">ID</label>
          <input type="text" value={selectedTicket.FormID} readOnly
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 text-sm focus:outline-none"/>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{t("status")}</label>
            <select disabled defaultValue={selectedTicket.Stt}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none">
                  <option>Chưa trả lời</option>
                  <option>Đang xử lý</option>
                  <option>Đã trả lời</option>
            </select>
        </div>
        <div className="mt-4">
 						<label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{t("title")}</label>										
              <textarea
                readOnly
                defaultValue={selectedTicket.Title}
                rows={2}
								className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 text-sm resize-none"/>
				</div>

				<div className="mt-4">
						<label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{t("category")}</label>
              <input
                readOnly
                type="text"
                defaultValue={selectedTicket.Typ}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 text-sm"
              />
				</div>

				<div className="mt-4">
					<label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{t("content")}</label>
            <textarea
              readOnly
              defaultValue={selectedTicket.Content}
              rows={3}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 text-sm resize-none"
            />
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
              {t("responseContent")}
            </label>
            <textarea
              readOnly
              defaultValue={selectedTicket.responseContent}
              rows={3}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 text-sm resize-none"
            />
          </div>
        

        <div className="border-b border-gray-300 dark:border-gray-700 pb-4 mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
            {t("customerInfo")}
          </h2>

          <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{t("customerID")}</label>
          <input
            type="text"
            readOnly
            value={selectedTicket.Cus_ID}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 text-sm"
          />

          <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mt-3 mb-1">{t("fullname")}</label>
          <input
            readOnly
            type="text"
            defaultValue={selectedTicket.Cus_name}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 text-sm"
          />
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mt-3 mb-1">{t("email")}</label>
          <input 
            readOnly
            type="text"
            defaultValue={selectedTicket.Cus_email}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 text-sm mt-2"
          />
          <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mt-3 mb-1">{t("address")}</label>
          <input
            readOnly
            type="text"
            defaultValue={selectedTicket.Cus_addr}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 text-sm mt-2"
          />
        </div>

        {/* Agent ID Input */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
            Gán cho nhân viên
          </h2>

          <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mt-3 mb-1">
            ID nhân viên
          </label>
          <input
            type="text"
            value={selectedTicket.Agent_ID}
            onChange={(e) => {
              const updatedAgentId = e.target.value;
              setSelectedTicket({ ...selectedTicket, Agent_ID: updatedAgentId });
              reAssignWithSuggestion(updatedAgentId);  // Gửi lại yêu cầu với Agent_ID mới
            }}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 text-sm"
          />
        </div>

        {/* Show warnings and suggestion */}
        {warnings.length > 0 && (
          <div className="p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 mb-4">
            <strong>Cảnh báo:</strong>
            <ul>
              {warnings.map((warning, index) => (
                <li key={index}>{warning}</li>
              ))}
            </ul>
          </div>
        )}

        {suggestion && (
          <div className="p-4 bg-blue-100 border-l-4 border-blue-500 text-blue-700 mb-4">
            <strong>Gợi ý:</strong>
            <div>
              <p><strong>Nhân viên được gợi ý: </strong>{suggestion.Fullname}</p>
              <p><strong>Số form còn lại: </strong>{suggestion.cnt}</p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60">
        <button
          onClick={() => setSelectedTicket(null)}
          className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          {t("cancel")}
        </button>
        
        {/* Only show "Force Reassign" button if there are warnings or suggestions */}
        {(warnings.length > 0 || suggestion) && (
          <button
            onClick={forceReassignTicket} // Call the force reassign logic
            className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors"
          >
            Ép gán form
          </button>
        )}

        {/* Save Changes */}
        <button
          onClick={() => reAssign(selectedTicket)} // Cập nhật logic lưu thay đổi
          className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
        >
          {t("saveChanges")}
        </button>
      </div>
    </div>
  </div>
)}


    </div>
  );
}
