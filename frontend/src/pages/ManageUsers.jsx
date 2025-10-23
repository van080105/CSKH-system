"use client"

import { Plus, Search, Filter, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import { useTranslation } from "react-i18next"

const users = [
  { id: 42323, name: "Nguyễn Văn A", email: "nguyenvana@gmail.com", status: "Active", role: "Nhân viên" },
  { id: 42323, name: "Nguyễn Văn A", email: "nguyenvana@gmail.com", status: "Inactive", role: "Nhân viên" },
  { id: 42323, name: "Nguyễn Văn A", email: "nguyenvana@gmail.com", status: "Active", role: "Nhân viên" },
  { id: 42323, name: "Nguyễn Văn A", email: "nguyenvana@gmail.com", status: "Inactive", role: "Nhân viên" },
  { id: 42323, name: "Nguyễn Văn A", email: "nguyenvana@gmail.com", status: "Active", role: "Nhân viên" },
  { id: 42323, name: "Nguyễn Văn A", email: "nguyenvana@gmail.com", status: "Active", role: "Nhân viên" },
  { id: 42323, name: "Nguyễn Văn A", email: "nguyenvana@gmail.com", status: "Active", role: "Nhân viên" },
  { id: 42323, name: "Nguyễn Văn A", email: "nguyenvana@gmail.com", status: "Active", role: "Nhân viên" },
  { id: 42323, name: "Nguyễn Văn A", email: "nguyenvana@gmail.com", status: "Active", role: "Nhân viên" },
  { id: 42323, name: "Nguyễn Văn A", email: "nguyenvana@gmail.com", status: "Active", role: "Nhân viên" },
]

export function ManageUsers() {
  const [activeTab, setActiveTab] = useState("staff")
  const [selectedUsers, setSelectedUsers] = useState([])

  const toggleSelectAll = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(users.map((_, i) => i))
    }
  }

  const toggleSelect = (index) => {
    if (selectedUsers.includes(index)) {
      setSelectedUsers(selectedUsers.filter((i) => i !== index))
    } else {
      setSelectedUsers([...selectedUsers, index])
    }
  }
  const { t } = useTranslation()
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex gap-3">
        <button
          onClick={() => setActiveTab("staff")}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            activeTab === "staff"
              ? "bg-indigo-600 text-white"
              : "bg-gray-300 text-gray-700 hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          }`}
        >
          {t("agent")}
        </button>
        <button
          onClick={() => setActiveTab("customer")}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            activeTab === "customer"
              ? "bg-indigo-600 text-white"
              : "bg-gray-300 text-gray-700 hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          }`}
        >
          {t("customer")}
        </button>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="p-4 flex items-center gap-3">
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
            <Filter className="h-5 w-5 text-gray-600 dark:text-gray-300" />
          </button>
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder={t("searchForUser")}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          <button className="ml-auto flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
            <Plus className="h-4 w-4" />
            {t("addUser")}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800 border-y border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === users.length}
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
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">{t("email")}</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                  <div className="flex items-center gap-1">
                    {t("status")} <ChevronDown className="h-3 w-3" />
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">{t("role")}</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">{t("action")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {users.map((user, index) => (
                <tr
                  key={index}
                  className={`hover:bg-gray-50 dark:hover:bg-gray-800 ${
                    index % 2 === 1 ? "bg-gray-50 dark:bg-gray-800" : "bg-white dark:bg-gray-900"
                  }`}
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(index)}
                      onChange={() => toggleSelect(index)}
                      className="rounded border-gray-300 dark:border-gray-600"
                    />
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">{user.id}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">{user.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{user.email}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded ${
                        user.status === "Active"
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-200"
                          : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">{user.role}</td>
                  <td className="px-4 py-3">
                    <button className="text-sm text-gray-600 dark:text-indigo-400 hover:text-indigo-600 underline">
                      {t("viewMore")}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-300">{"1-10" + " " + t("of") + " 97"}</p>
          <div className="flex items-center gap-2">
            <select className="px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-800 dark:text-white">
              <option>{t("linesPerPage") + " 10"}</option>
              <option>{t("linesPerPage") + " 25"}</option>
              <option>{t("linesPerPage") + " 50"}</option>
            </select>
            <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
              <ChevronLeft className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </button>
            <span className="text-sm text-gray-600 dark:text-gray-300">1/10</span>
            <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
              <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )

}
