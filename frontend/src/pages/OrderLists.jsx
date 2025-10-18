"use client"

import { useState } from "react"

const orderData = [
  { id: "00001", name: "Chris", address: "123 Main St", date: "15 Feb 2019", type: "Electric", status: "Completed" },
  { id: "00002", name: "Rosie", address: "456 Oak Ave", date: "20 Feb 2019", type: "Book", status: "Processing" },
  { id: "00003", name: "Dan", address: "789 Pine Rd", date: "25 Feb 2019", type: "Medicine", status: "Rejected" },
  { id: "00004", name: "Gilbe", address: "321 Elm St", date: "28 Feb 2019", type: "Mobile", status: "Completed" },
  {
    id: "00005",
    name: "Alan Cain",
    address: "042 Mylene Throughway",
    date: "29 Jul 2019",
    type: "Watch",
    status: "Processing",
  },
  {
    id: "00006",
    name: "Alfred Murray",
    address: "543 Weimann Mountain",
    date: "15 Aug 2019",
    type: "Medicine",
    status: "Completed",
  },
  {
    id: "00007",
    name: "Maggie Sullivan",
    address: "New Scottieberg",
    date: "21 Dec 2019",
    type: "Watch",
    status: "Processing",
  },
  { id: "00008", name: "Rosie Todd", address: "New Jon", date: "30 Apr 2019", type: "Medicine", status: "On Hold" },
  {
    id: "00009",
    name: "Dollie Hines",
    address: "124 Lyla Forge Suite 975",
    date: "09 Jan 2019",
    type: "Book",
    status: "In Transit",
  },
]

const statusColors = {
  Completed: "bg-teal-100 text-teal-700",
  Processing: "bg-purple-100 text-purple-700",
  Rejected: "bg-red-100 text-red-700",
  "On Hold": "bg-orange-100 text-orange-700",
  "In Transit": "bg-purple-100 text-purple-700",
}

export function OrderLists() {
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [selectedTypes, setSelectedTypes] = useState(["Health & Medicine"])

  const orderTypes = [
    "Health & Medicine",
    "Book & Stationary",
    "Services & Industry",
    "Fashion & Beauty",
    "Home & Living",
    "Electronics",
    "Mobile & Phone",
    "Accessories",
  ]

  const toggleType = (type) => {
    setSelectedTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Order Lists</h1>
      </div>

      {/* Filters */}
      <div className="mb-8 flex gap-4 items-center">
        <button
          onClick={() => setShowFilterModal(true)}
          className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded hover:bg-gray-100"
        >
          <span>⚙️</span>
          <span>Filter By</span>
        </button>
        <select className="border border-gray-300 px-4 py-2 rounded">
          <option>14 Feb 2019</option>
        </select>
        <select className="border border-gray-300 px-4 py-2 rounded">
          <option>Order Type</option>
        </select>
        <select className="border border-gray-300 px-4 py-2 rounded">
          <option>Order Status</option>
        </select>
        <button className="ml-auto text-red-600 hover:text-red-700 font-semibold flex items-center gap-2">
          <span>↻</span>
          Reset Filter
        </button>
      </div>

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Select Order Type</h2>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {orderTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => toggleType(type)}
                  className={`px-4 py-2 rounded font-semibold transition ${
                    selectedTypes.includes(type)
                      ? "bg-blue-600 text-white"
                      : "border border-gray-300 text-gray-700 hover:border-gray-400"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-600 mb-6">*You can choose multiple Order type</p>
            <button
              onClick={() => setShowFilterModal(false)}
              className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700"
            >
              Apply Now
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                <input type="checkbox" />
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">NAME</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">ADDRESS</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">DATE</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">TYPE</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {orderData.map((order, idx) => (
              <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-4">
                  <input type="checkbox" />
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{order.id}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{order.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{order.address}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{order.date}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{order.type}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-gray-600">Showing 1-09 of 78</p>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100">←</button>
          <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100">→</button>
        </div>
      </div>
    </div>
  )
}
