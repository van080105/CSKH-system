import { Search, Filter, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"

export function ManageCustomers() {
  const [selectedUsers, setSelectedUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [nameFilter, setNameFilter] = useState("")
  const [emailFilter, setEmailFilter] = useState("")
  const [membershipFilter, setMembershipFilter] = useState("")
  const [users, setUsers] = useState([]) 
  const [loading, setLoading] = useState(true) 
  const { t } = useTranslation()

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      try {
        const token = localStorage.getItem('token')
        const response = await fetch('http://localhost:8080/api/accounts/manage', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        })
        const data = await response.json()

				if (data && data.Customers) {
					setUsers(data.Customers)
				}
      } catch (error) {
        console.error('Error fetching users:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  },[]) 

  const normalize = (str) =>
    (str || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim()

  const search = normalize(searchTerm);

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.CustomerID.toString().includes(search) || 
      normalize(u.CustomerName).includes(search) || 
      normalize(u.CustomerEmail).includes(search);

    const matchesName = nameFilter ? normalize(u.CustomerName).includes(normalize(nameFilter)) : true;

    const matchesEmail = emailFilter ? normalize(u.CustomerEmail).includes(normalize(emailFilter)) : true;

    const matchesMembership = membershipFilter 
      ? normalize(u.Membership).includes(normalize(membershipFilter.trim())) 
      : true;

    return matchesSearch && matchesName && matchesEmail && matchesMembership;
  });

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

  return (
    <div className="p-6 space-y-6">
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
            {[...new Set(users.map((u) => u.CustomerName))].map((name, idx) => (
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
            {[...new Set(users.map((u) => u.CustomerEmail))].map((email, idx) => (
              <option key={idx} value={email}>
                {email}
              </option>
            ))}
          </select>

          {/* Dropdown lọc theo Membership */}
            <select
              value={membershipFilter}
              onChange={(e) => setMembershipFilter(e.target.value)}
              className="px-2 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm"
            >
              <option value="">{t("filterByMembership")}</option>
							{[...new Set(users.map((u) => u.Membership))].map((membership, idx) => (
								<option key={idx} value={membership}>
									{membership}
								</option>
							))}
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
                  {t("id")}
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                  {t("name")}
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                  {t("email")}
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
                  {t("address")}
                </th>
								<th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase">
									{t("membership")}
								</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="text-center py-3">
                    Loading...
                  </td>
                </tr>

              ) : (
                filteredUsers.map((user, index) => (
                  <tr
                    key={user.CustomerID}
                    className={`${
                      selectedUsers.includes(index) ? "bg-indigo-50 dark:bg-indigo-900" : "hover:bg-gray-50 dark:hover:bg-gray-800"
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
                    <td className="px-4 py-3 text-sm text-gray-400 dark:text-gray-200">{user.CustomerID}</td>
                    <td className="px-4 py-3 text-sm text-gray-400 dark:text-gray-200">{user.CustomerName}</td>
                    <td className="px-4 py-3 text-sm text-gray-400 dark:text-gray-200">{user.CustomerEmail}</td>
                    <td className="px-4 py-3 text-sm text-gray-400 dark:text-gray-200">{user.AddressAcc}</td>
										<td className="px-4 py-3 text-sm text-gray-400 dark:text-gray-200">{user.Membership}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
