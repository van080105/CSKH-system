import {
  Plus,
  TrendingUp,
  TrendingDown,
  Users,
  MessageSquare,
  Clock
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts"
import { useTranslation } from "react-i18next"
import { ReportForm } from "./ReportForm"
import { useState } from "react"

const ticketData = [
  { name: "T1", 2025: 10000, 2024: 8000 },
  { name: "T3", 2025: 15000, 2024: 12000 },
  { name: "T5", 2025: 18000, 2024: 14000 },
  { name: "T7", 2025: 22000, 2024: 16000 },
  { name: "T9", 2025: 21000, 2024: 18000 },
  { name: "T11", 2025: 23000, 2024: 19000 },
]

const satisfactionData = [
  { name: "T1", 2025: 75, 2024: 70 },
  { name: "T3", 2025: 80, 2024: 75 },
  { name: "T5", 2025: 85, 2024: 78 },
  { name: "T7", 2025: 88, 2024: 82 },
  { name: "T9", 2025: 90, 2024: 85 },
  { name: "T11", 2025: 89.31, 2024: 87 },
]

export function Dashboard() {
  const [showReportForm, setShowReportForm] = useState(false)
  const { t } = useTranslation()

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <button
          onClick={() => setShowReportForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
        >
          <Plus className="h-4 w-4" />
          {t("addReport")}
        </button>

        {showReportForm && <ReportForm onClose={() => setShowReportForm(false)} />}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Users */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{t("totalUsers")}</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">17,689</p>
              <div className="flex items-center gap-1 mt-2 text-sm">
                <TrendingUp className="h-4 w-4 text-emerald-500" />
                <span className="text-emerald-500 font-medium">8.5%</span>
                <span className="text-gray-500 dark:text-gray-400">{t("increased")} {t("compareTo")} {t("yesterday")}</span>
              </div>
            </div>
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900 rounded-lg">
              <Users className="h-6 w-6 text-indigo-600" />
            </div>
          </div>
        </div>

        {/* Total Feedback */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{t("totalTicketsFeedback")}</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">41,187</p>
              <div className="flex items-center gap-1 mt-2 text-sm">
                <TrendingDown className="h-4 w-4 text-red-500" />
                <span className="text-red-500 font-medium">4.3%</span>
                <span className="text-gray-500 dark:text-gray-400">{t("decreased")} {t("compareTo")} {t("yesterday")}</span>
              </div>
            </div>
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900 rounded-lg">
              <MessageSquare className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
        </div>

        {/* Pending */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{t("totalPending")}</p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">2040</p>
              <div className="flex items-center gap-1 mt-2 text-sm">
                <TrendingUp className="h-4 w-4 text-emerald-500" />
                <span className="text-emerald-500 font-medium">1.8%</span>
                <span className="text-gray-500 dark:text-gray-400">{t("increased")} {t("compareTo")} {t("yesterday")}</span>
              </div>
            </div>
            <div className="p-3 bg-orange-50 dark:bg-orange-900 rounded-lg">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ticket Line Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{t("totalTickets")}</h2>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">22,192 tickets</p>
              <div className="flex items-center gap-1 mt-1 text-sm">
                <TrendingUp className="h-3 w-3 text-emerald-500" />
                <span className="text-emerald-500 font-medium">37.8%</span>
                <span className="text-gray-500 dark:text-gray-400">{t("compareTo")} 8/9/2025</span>
              </div>
            </div>

            <div className="flex gap-2 flex-wrap">
              {/* Dropdown thời gian */}
              <select className="px-3 py-1.5 w-32 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-800 dark:text-white">
                <option>{t("selectTimeRange")}</option>
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>All time</option>
              </select>

              {/* Dropdown phòng ban */}
              <select className="px-3 py-1.5 w-32 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-800 dark:text-white">
                <option>{t("selectDepartment")}</option>
                <option>Sales</option>
                <option>Support</option>
                <option>Marketing</option>
                <option>Development</option>
              </select>

              {/* Dropdown nhân viên */}
              <select className="px-3 py-1.5 w-32 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-800 dark:text-white">
                <option>{t("selectEmployee")}</option>
                <option>John Doe</option>
                <option>Jane Smith</option>
                <option>Mark Johnson</option>
                <option>Alice Williams</option>
              </select>

              {/* Dropdown khu vực */}
              <select
                className="border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white px-4 py-2 rounded"
              >
                <option>Khu vực</option>
              </select>

            </div>
          </div>


          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={ticketData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: "#1f2937", color: "#fff" }} />
              <Legend />
              <Line type="monotone" dataKey="2025" stroke="#4f46e5" strokeWidth={2} dot={{ fill: "#4f46e5" }} />
              <Line type="monotone" dataKey="2024" stroke="#9ca3af" strokeWidth={2} strokeDasharray="5 5" dot={{ fill: "#9ca3af" }} />
            </LineChart>
          </ResponsiveContainer>

          <div className="flex items-center justify-center gap-8 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-300">1/1-31/11, 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
              <span className="text-gray-400">1/1-31/11, 2025</span>
            </div>
          </div>
        </div>

        {/* Satisfaction Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{t("customerSatisfaction")}</h2>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">89.31 %</p>
              <div className="flex items-center gap-1 mt-1 text-sm">
                <TrendingUp className="h-3 w-3 text-emerald-500" />
                <span className="text-emerald-500 font-medium">3.6%</span>
                <span className="text-gray-500 dark:text-gray-400">{t("compareTo")} 8/9/2025</span>
              </div>
            </div>

            <div className="flex gap-4 flex-wrap">
              {/* Dropdown cho thời gian */}
              <select className="px-3 py-1.5 w-32 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-800 dark:text-white">
                <option>{t("selectTimeRange")}</option>
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>All time</option>
              </select>

              {/* Dropdown cho phòng ban */}
              <select className="px-3 py-1.5 w-32 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-800 dark:text-white">
                <option>{t("selectDepartment")}</option>
                <option>Sales</option>
                <option>Support</option>
                <option>Marketing</option>
                <option>Development</option>
              </select>

              {/* Dropdown cho nhân viên */}
              <select className="px-3 py-1.5 w-32 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-800 dark:text-white">
                <option>{t("selectEmployee")}</option>
                <option>John Doe</option>
                <option>Jane Smith</option>
                <option>Mark Johnson</option>
                <option>Alice Williams</option>
              </select>

              {/* Dropdown khu vực */}
              <select
                className="border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white px-4 py-2 rounded"
              >
                <option>Khu vực</option>
              </select>
                            
            </div>
          </div>


          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={satisfactionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: "#1f2937", color: "#fff" }} />
              <Legend />
              <Line type="monotone" dataKey="2025" stroke="#4f46e5" strokeWidth={2} dot={{ fill: "#4f46e5" }} />
              <Line type="monotone" dataKey="2024" stroke="#9ca3af" strokeWidth={2} strokeDasharray="5 5" dot={{ fill: "#9ca3af" }} />
            </LineChart>
          </ResponsiveContainer>

          <div className="flex items-center justify-center gap-8 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-300">1/1-31/11, 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
              <span className="text-gray-400">1/1-31/11, 2025</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
