import { useState, useEffect, useMemo } from "react";
import { Search, Filter, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import GlassmorphismModal from "../../components/Modal/GlassMorphismModal";
import FloatingInput from "../../components/Form/FloatingInput"; 
import normalize from "../../utils/normalize";

export function CustomerTickets() {
  const [ticketsData, setTicketsData] = useState([]);
  const [selectedTickets, setSelectedTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [linesPerPage, setLinesPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const { t } = useTranslation();

  const fetchTicketsData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/customer/form", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch tickets data");
      }
      const data = await response.json();
      setTicketsData(data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  // Fetch dữ liệu API
  useEffect(() => {
    fetchTicketsData();
  }, []);

  // --- Filtering & Searching ---
  const filteredTickets = useMemo(() => {

    const search = normalize(searchTerm);

    return ticketsData.filter((ticket) => {
      const idMatch = ticket.CustomerID.toString().includes(search);
      const titleMatch = normalize(ticket.Title).includes(search);
      const statusMatch = normalize(ticket.Stt).includes(search);

      const matchesSearch = idMatch || titleMatch || statusMatch;
      const matchesStatus = statusFilter ? ticket.Stt === statusFilter : true;

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter, ticketsData]);

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

  const uniqueStatuses = [...new Set(ticketsData.map((t) => t.Stt))];

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
    setIsOverlayVisible(true);
  };

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
              <option key={s} value={s}>
                {s}
              </option>
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
                  Form ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                  {t("title")}
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                  {t("status")}
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                  {t("sentDate")}
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                  {t("content")}
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedTickets.map((ticket, index) => (
                <tr
                  key={index}
                  onClick={() => handleTicketClick(ticket)}
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

                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                    {ticket.FormID[0]}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 max-w-xs truncate">
                    {ticket.Title}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded ${
                        ticket.Stt === "Chưa trả lời"
                          ? "bg-orange-50 text-orange-700 dark:bg-orange-600/20 dark:text-orange-300"
                          : "bg-emerald-50 text-emerald-700 dark:bg-emerald-600/20 dark:text-emerald-300"
                      }`}
                    >
                      {ticket.Stt}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                    {new Date(ticket.SentDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">
                    {ticket.Content}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg disabled:opacity-50"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg disabled:opacity-50"
            >
              <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          {/* Lines Per Page */}
          <select
            value={linesPerPage}
            onChange={(e) => setLinesPerPage(Number(e.target.value))}
            className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>

          {/* Modal */}
          {isOverlayVisible && selectedTicket && (
            <GlassmorphismModal onClose={() => setIsOverlayVisible(false)}>
              <div className="space-y-4">

                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-semibold text-white">
                    {selectedTicket.Title}
                  </h3>
                  <button onClick={() => setIsOverlayVisible(false)} className="text-white">
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Left Column */}
                  <div>
                    <FloatingInput label="Form ID" value={selectedTicket.FormID[0]} readOnly />
                    <FloatingInput label="Status" value={selectedTicket.Stt} readOnly />
                  </div>

                  {/* Right Column */}
                  <div>
                    <FloatingInput
                      label="Sent Date"
                      value={new Date(selectedTicket.SentDate).toLocaleDateString()}
                      readOnly
                    />
                    <div className="relative pt-5">
                      <textarea
                        value={selectedTicket.Content}
                        readOnly
                        rows={6}
                        className="w-full px-4 py-3 rounded-xl backdrop-blur peer outline-none transition-all bg-white/20 border border-white/40 text-white/40 cursor-not-allowed focus:border-blue-400 focus:ring-2 focus:ring-blue-500/40 resize-none"
                      />
                      <label
                        className="absolute left-4 top-0 text-sm transition-all pointer-events-none text-white/40 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm"
                      >
                        Content
                      </label>
                    </div>
                  </div>
                </div>

              </div>
            </GlassmorphismModal>
          )}
        
        </div>
      </div>
    </div>
  );
}
