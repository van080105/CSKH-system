"use client"

import { useState } from "react"
import { Heart, Star, X } from "lucide-react"
import { Dialog, Transition } from "@headlessui/react"
import { Fragment } from "react"
import { motion } from "framer-motion"

export function ProductPage() {
  const [favorites, setFavorites] = useState({
    1: true,
    2: false,
    3: false,
    4: false,
    5: true,
  })

  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

  const products = [
    {
      id: 1,
      name: "Iphone 17 Pro",
      price: "80,000,000 VNĐ",
      rating: 4,
      reviews: 131,
      image: "/iphone-17-pro.jpg",
      description: "Chi tiết sản phẩm Iphone 17 Pro với nhiều tính năng cao cấp.",
      specs: {
        RAM: "12GB",
        Storage: "512GB",
        Camera: "108MP + 12MP Ultra Wide",
        Battery: "4500mAh",
        Display: "6.7 inch OLED",
      },
    },
    {
      id: 2,
      name: "Iphone 17",
      price: "54,000,000 VNĐ",
      rating: 4,
      reviews: 64,
      image: "/iphone-17.jpg",
      description: "Iphone 17 - thiết kế hiện đại, hiệu năng mạnh mẽ.",
      specs: {
        RAM: "8GB",
        Storage: "256GB",
        Camera: "48MP + 12MP Ultra Wide",
        Battery: "4000mAh",
        Display: "6.1 inch OLED",
      },
    },
    {
      id: 3,
      name: "Iphone 16-e",
      price: "50,600,000 VNĐ",
      rating: 5,
      reviews: 63,
      image: "/iphone-16e.jpg",
      description: "Iphone 16-e - lựa chọn hoàn hảo cho trải nghiệm mượt mà.",
      specs: {
        RAM: "6GB",
        Storage: "128GB",
        Camera: "48MP",
        Battery: "3800mAh",
        Display: "6.1 inch LCD",
      },
    },
    {
      id: 4,
      name: "Iphone 16",
      price: "45,000,000 VNĐ",
      rating: 4,
      reviews: 131,
      image: "/iphone-16.jpg",
      description: "Iphone 16 - ổn định, sang trọng và tiện dụng.",
      specs: {
        RAM: "6GB",
        Storage: "256GB",
        Camera: "48MP + 12MP",
        Battery: "4000mAh",
        Display: "6.5 inch OLED",
      },
    },
    {
      id: 5,
      name: "Iphone Air",
      price: "40,000,000 VNĐ",
      rating: 4,
      reviews: 64,
      image: "/iphone-air.jpg",
      description: "Iphone Air - nhẹ, mạnh mẽ, lý tưởng cho người trẻ năng động.",
      specs: {
        RAM: "4GB",
        Storage: "128GB",
        Camera: "12MP",
        Battery: "3500mAh",
        Display: "6.1 inch LCD",
      },
    },
  ]

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const openModal = (product) => {
    setSelectedProduct(product)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    setSelectedProduct(null)
  }

  return (
    <div className="p-6 space-y-6 bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <h1 className="text-3xl font-bold text-center mb-8">Các sản phẩm nổi bật</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="rounded-xl border overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 duration-300 bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700 cursor-pointer"
          >
            <div className="relative h-64 flex items-center justify-center overflow-hidden group">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                onClick={() => openModal(product)}
              />
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  toggleFavorite(product.id)
                }}
                className="absolute top-4 right-4 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-shadow"
              >
                <Heart
                  className="h-5 w-5"
                  fill={favorites[product.id] ? "#ef4444" : "none"}
                  stroke={favorites[product.id] ? "#ef4444" : "currentColor"}
                />
              </button>
            </div>

            <div className="p-4">
              <h3 className="font-semibold mb-1">{product.name}</h3>
              <p className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-2">{product.price}</p>
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
              <button
                onClick={() => openModal(product)}
                className="w-full px-4 py-2 rounded-lg font-medium transition-colors bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
              >
                Chi tiết sản phẩm
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <Dialog.Title className="text-2xl text-gray-900 dark:text-white font-bold">{selectedProduct?.name}</Dialog.Title>
                    <button
                      onClick={closeModal}
                      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                      <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                    </button>
                  </div>

                  <div className="flex flex-col md:flex-row gap-6">
                    <img
                      src={selectedProduct?.image}
                      alt={selectedProduct?.name}
                      className="w-full md:w-1/2 object-cover rounded-xl"
                    />
                    <div className="flex-1 space-y-4">
                      <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{selectedProduct?.price}</p>
                      <div className="flex items-center gap-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className="h-5 w-5"
                            fill={i < selectedProduct?.rating ? "#fbbf24" : "none"}
                            stroke={i < selectedProduct?.rating ? "#fbbf24" : "currentColor"}
                          />
                        ))}
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          ({selectedProduct?.reviews} reviews)
                        </span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">{selectedProduct?.description}</p>

                      {/* Specs Table */}
                      {selectedProduct?.specs && (
                        <div className="grid grid-cols-2 gap-4 text-gray-800 dark:text-gray-200">
                          {Object.entries(selectedProduct.specs).map(([key, value]) => (
                            <div key={key} className="flex justify-between items-center py-2 border-b">
                              <span className="font-medium text-gray-700 dark:text-gray-300">{key}</span>
                              <span className="text-gray-600 dark:text-gray-400">{value}</span>
                            </div>
                          ))}
                        </div>
                      )}

                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}
