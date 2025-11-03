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

  { id: 41323, name: "Nguyễn Văn B", email: "nguyenvanb@gmail.com", status: "Active", role: "Khách hàng" },
  { id: 41323, name: "Nguyễn Văn B", email: "nguyenvanb@gmail.com", status: "Active", role: "Khách hàng" },
  { id: 41323, name: "Nguyễn Văn B", email: "nguyenvanb@gmail.com", status: "Active", role: "Khách hàng" },
  { id: 41323, name: "Nguyễn Văn B", email: "nguyenvanb@gmail.com", status: "Active", role: "Khách hàng" },
  { id: 41323, name: "Nguyễn Văn B", email: "nguyenvanb@gmail.com", status: "Active", role: "Khách hàng" },
  { id: 41323, name: "Nguyễn Văn B", email: "nguyenvanb@gmail.com", status: "Active", role: "Khách hàng" },
  { id: 41323, name: "Nguyễn Văn B", email: "nguyenvanb@gmail.com", status: "Active", role: "Khách hàng" },
  { id: 41323, name: "Nguyễn Văn B", email: "nguyenvanb@gmail.com", status: "Active", role: "Khách hàng" },
  { id: 41323, name: "Nguyễn Văn B", email: "nguyenvanb@gmail.com", status: "Active", role: "Khách hàng" },
]

export function ManageUsers() {
  const [activeTab, setActiveTab] = useState("staff")
  const [selectedUsers, setSelectedUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [nameFilter, setNameFilter] = useState("")
  const [emailFilter, setEmailFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [selectedUser, setSelectedUser] = useState(null)

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

  const normalize = (str) =>
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim()

  const search = normalize(searchTerm)

  const filteredUsers = users
    .filter((u) =>
      activeTab === "staff" ? u.role === "Nhân viên" : u.role === "Khách hàng"
    )
    .filter((u) => {
      const matchesSearch =
        u.id.toString().includes(search) ||
        normalize(u.name).includes(search) ||
        normalize(u.email).includes(search) ||
        normalize(u.status).includes(search)

      const matchesName = nameFilter ? u.name === nameFilter : true
      const matchesEmail = emailFilter ? u.email === emailFilter : true
      const matchesStatus = statusFilter ? u.status === statusFilter : true

      return matchesSearch && matchesName && matchesEmail && matchesStatus
    })

  return (
    <div className="p-6 space-y-6">
      <div className="flex gap-3 transition-all duration-200">
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

          {/* Dropdown lọc theo tên */}
          <select
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            className="px-2 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm"
          >
            <option value="">{t("filterByName")}</option>
            {[...new Set(users.map((u) => u.name))].map((name, idx) => (
              <option key={idx} value={name}>
                {name}
              </option>
            ))}
          </select>

          {/* Dropdown lọc theo email */}
          <select
            value={emailFilter}
            onChange={(e) => setEmailFilter(e.target.value)}
            className="px-2 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm"
          >
            <option value="">{t("filterByEmail")}</option>
            {[...new Set(users.map((u) => u.email))].map((email, idx) => (
              <option key={idx} value={email}>
                {email}
              </option>
            ))}
          </select>

          {/* Dropdown lọc theo trạng thái */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm"
          >
            <option value="">{t("filterByStatus")}</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder={t("searchForUser")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
              {filteredUsers.map((user, index) => (
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
                    <button 
                      onClick={() => setSelectedUser(user)} 
                      className="text-sm text-gray-600 dark:text-indigo-400 hover:text-indigo-600 underline"
                    >
                      {t("viewMore")}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/60 backdrop-blur-sm transition-all">
            <div className="relative w-full max-w-lg rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-2xl overflow-hidden animate-fadeInUp">
              
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  🧑 {t("userDetails")}
                </h2>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Body */}
              <div className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{t("id")}</label>
                    <input
                      type="text"
                      value={selectedUser.id}
                      readOnly
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 text-sm focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{t("status")}</label>
                    <select
                      defaultValue={selectedUser.status}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    >
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{t("fullName")}</label>
                  <input
                    type="text"
                    defaultValue={selectedUser.name}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{t("email")}</label>
                  <input
                    type="email"
                    defaultValue={selectedUser.email}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{t("role")}</label>
                  <input
                    type="text"
                    defaultValue={selectedUser.role}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60">
                <button
                  onClick={() => setSelectedUser(null)}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  {t("cancel")}
                </button>
                <button
                  onClick={() => {
                    // Logic lưu thay đổi ở đây
                    setSelectedUser(null)
                  }}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                >
                  {t("saveChanges")}
                </button>
              </div>
            </div>
          </div>
        )}


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
