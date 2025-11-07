"use client"

import { useNavigate } from "react-router-dom"

export function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md text-center">
        {/* Browser Window Illustration */}
        <div className="mb-8 flex justify-center">
          <div className="w-64 h-48 bg-gradient-to-b from-blue-400 to-blue-600 rounded-lg shadow-lg relative">
            {/* Browser Header */}
            <div className="bg-gray-100 px-4 py-3 rounded-t-lg flex items-center gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1 bg-gray-200 h-2 rounded ml-4"></div>
            </div>
            {/* 404 Content */}
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="text-6xl font-bold text-orange-400 mb-2">404</div>
                <div className="text-white text-sm">= ...</div>
              </div>
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-6">Looks like you've got lost.....</h1>

        <button
          onClick={() => navigate("/")}
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  )
}
