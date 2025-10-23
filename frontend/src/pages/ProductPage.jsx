"use client"

import { useState } from "react"
import { Heart, Star } from "lucide-react"
import { useTranslation } from "react-i18next"

export function ProductPage() {
  const [favorites, setFavorites] = useState({
    1: true,
    2: false,
    3: false,
    4: false,
    5: true,
    6: false,
  })

  const products = [
    { id: 1, name: "Iphone 17 Pro", price: "$3200.00", rating: 4, reviews: 131, image: "/iphone-17-pro.jpg" },
    { id: 2, name: "Iphone 17", price: "$2160.00", rating: 4, reviews: 64, image: "/iphone-17.jpg" },
    { id: 3, name: "Iphone 16-e", price: "$2024.00", rating: 5, reviews: 63, image: "/iphone-16e.jpg" },
    { id: 4, name: "Iphone 16", price: "$1800.00", rating: 4, reviews: 131, image: "/iphone-16.jpg" },
    { id: 5, name: "Iphone Air", price: "$1600.00", rating: 4, reviews: 64, image: "/iphone-air.jpg" },
  ]

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const { t } = useTranslation()
  return (
    <div className="p-6 space-y-6 bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <h1 className="text-3xl font-bold">Các sản phẩm</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="rounded-lg border overflow-hidden hover:shadow-lg transition-shadow 
              bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700"
          >
            {/* Product Image */}
            <div className="relative bg-gray-100 dark:bg-gray-700 h-64 flex items-center justify-center overflow-hidden group">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform"
              />
              <button
                onClick={() => toggleFavorite(product.id)}
                className="absolute top-4 right-4 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-shadow"
              >
                <Heart
                  className="h-5 w-5"
                  fill={favorites[product.id] ? "#ef4444" : "none"}
                  stroke={favorites[product.id] ? "#ef4444" : "currentColor"}
                />
              </button>
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h3 className="font-semibold mb-2">{product.name}</h3>
              <p className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-2">{product.price}</p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4"
                      fill={i < product.rating ? "#fbbf24" : "none"}
                      stroke={i < product.rating ? "#fbbf24" : "currentColor"}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">({product.reviews})</span>
              </div>

              <button className="w-full px-4 py-2 rounded-lg font-medium transition-colors
                bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                {t("productInfo")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
