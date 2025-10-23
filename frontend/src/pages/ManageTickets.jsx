"use client"

import {
  Plus,
  Search,
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useState } from "react"
import { useTranslation } from "react-i18next"

const tickets = [
  {
    id: 42323,
    name: "Nguyễn Văn A",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...",
    status: "Open",
    role: "Nhân viên",
  },
  {
    id: 42323,
    name: "Nguyễn Văn A",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...",
    status: "Pending",
    role: "Nhân viên",
  },
  {
    id: 42323,
    name: "Nguyễn Văn A",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...",
    status: "Completed",
    role: "Nhân viên",
  },
  {
    id: 42323,
    name: "Nguyễn Văn A",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...",
    status: "Closed",
    role: "Nhân viên",
  },
  {
    id: 42323,
    name: "Nguyễn Văn A",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...",
    status: "Open",
    role: "Nhân viên",
  },
  {
    id: 42323,
    name: "Nguyễn Văn A",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...",
    status: "In progress",
    role: "Nhân viên",
  },
  {
    id: 42323,
    name: "Nguyễn Văn A",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...",
    status: "In progress",
    role: "Nhân viên",
  },
  {
    id: 42323,
    name: "Nguyễn Văn A",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...",
    status: "Open",
    role: "Nhân viên",
  },
  {
    id: 42323,
    name: "Nguyễn Văn A",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...",
    status: "Open",
    role: "Nhân viên",
  },
  {
    id: 42323,
    name: "Nguyễn Văn A",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla...",
    status: "Open",
    role: "Nhân viên",
  },
]

const statusStyles = {
  Open: "bg-blue-50 text-blue-700 dark:bg-blue-600/20 dark:text-blue-300",
  Pending: "bg-orange-50 text-orange-700 dark:bg-orange-600/20 dark:text-orange-300",
  Completed: "bg-emerald-50 text-emerald-700 dark:bg-emerald-600/20 dark:text-emerald-300",
  Closed: "bg-red-50 text-red-700 dark:bg-red-600/20 dark:text-red-300",
  "In progress": "bg-blue-50 text-blue-700 dark:bg-blue-600/20 dark:text-blue-300",
}

export function ManageTickets() {
  const [selectedTickets, setSelectedTickets] = useState([])
  const { t } = useTranslation()

  const toggleSelectAll = () => {
    if (selectedTickets.length === tickets.length) {
      setSelectedTickets([])
    } else {
      setSelectedTickets(tickets.map((_, i) => i))
    }
  }

  const toggleSelect = (index) => {
    if (selectedTickets.includes(index)) {
      setSelectedTickets(selectedTickets.filter((i) => i !== index))
    } else {
      setSelectedTickets([...selectedTickets, index])
    }
  }

  return (
    <div className="p-6">
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="p-4 flex items-center gap-3">
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
            <Filter className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder={t("searchForTicket")}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button className="ml-auto flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
            <Plus className="h-4 w-4" />
            {t("addTicket")}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800 border-y border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedTickets.length === tickets.length}
                    onChange={toggleSelectAll}
                    className="rounded border-gray-300 dark:border-gray-600"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                  <div className="flex items-center gap-1">
                    ID <ChevronDown className="h-3 w-3" />
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                  <div className="flex items-center gap-1">
                    {t("fullName")} <ChevronDown className="h-3 w-3" />
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                  {t("title")}
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                  <div className="flex items-center gap-1">
                    {t("status")} <ChevronDown className="h-3 w-3" />
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                  {t("role")}
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                  {t("action")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {tickets.map((ticket, index) => (
                <tr
                  key={index}
                  className={`hover:bg-gray-50 dark:hover:bg-gray-800 ${
                    index % 2 === 1
                      ? "bg-gray-50 dark:bg-gray-800"
                      : "bg-white dark:bg-gray-900"
                  }`}
                >
                  <td className="px-4 py-3">
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
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded ${statusStyles[ticket.status]}`}
                    >
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{ticket.role}</td>
                  <td className="px-4 py-3">
                    <button className="text-sm text-gray-600 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 underline">
                      {t("viewMore")}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {"1-10" + " " + t("of") + " 97"}
          </p>
          <div className="flex items-center gap-2">
            <select className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200 rounded-lg">
              <option>{t("linesPerPage") + " 10"}</option>
              <option>{t("linesPerPage") + " 25"}</option>
              <option>{t("linesPerPage") + " 50"}</option>
            </select>
            <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
              <ChevronLeft className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </button>
            <span className="text-sm text-gray-600 dark:text-gray-300">1/10</span>
            <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
              <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
