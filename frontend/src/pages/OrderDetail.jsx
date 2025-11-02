"use client"

import { useTranslation } from "react-i18next"
import { X } from "lucide-react"
import { useTheme } from "../hooks/useTheme"

export function OrderDetail({ order, onClose }) {
  const { t } = useTranslation()
  const { theme } = useTheme()

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)

  // Mock order steps - in real app, this would come from order data
  const orderSteps = [
    { label: t("confirmOrder"), date: "T5, 2/10", status: "completed" },
    { label: t("startDelivery"), date: "T6, 3/10", status: "completed" },
    { label: t("arrived"), date: "T7, 4/10", status: "completed" },
    { 
      label: t("delivered"), 
      date: `${t("estimated")}, CN 5/10`, 
      status: order?.status === "Completed" ? "completed" : "pending" 
    },
  ]

  // Mock products - in real app, this would come from order data
  const products = [
    {
      name: "Iphone 17 Pro",
      color: "Nâu",
      specs: "64GB | 1 TB",
      price: "37.990.000đ",
      quantity: 10,
      image: "📱",
    },
    {
      name: "Iphone 16 Pro",
      color: "Trắng",
      specs: "64GB | 1 TB",
      price: "30.390.000đ",
      quantity: 10,
      image: "📱",
    },
    {
      name: "Iphone 15 Pro max",
      color: "Đen",
      specs: "64GB | 1 TB",
      price: "26.990.000đ",
      quantity: 10,
      image: "📱",
    },
  ]

  // Format date from order
  const formatOrderDate = (dateString) => {
    if (!dateString) return ""
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("vi-VN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    } catch {
      return dateString
    }
  }

  return (
    <div className="relative bg-white dark:bg-gray-800">
      {/* Header with Close Button */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-6 py-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          {t("orderId")}: {order?.id || "3354654654526"}
        </h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          aria-label={t("close")}
        >
          <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      <div className="p-6 space-y-6">
        {/* Order Header Info */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-8 text-gray-600 dark:text-gray-400">
            <div>
              <p className="text-sm mb-1">{t("orderDate")}</p>
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                {formatOrderDate(order?.date) || "2 tháng 10, 2025"}
              </p>
            </div>
            <div className="text-green-600 dark:text-green-400">
              <p className="text-sm mb-1">{t("estimatedDelivery")}</p>
              <p className="font-semibold">5 tháng 10, 2025</p>
            </div>
          </div>
        </div>

        {/* Order Timeline */}
        <div className="py-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">
            {t("orderTimeline")}
          </h3>
          <div className="flex flex-wrap justify-between items-start gap-4">
            {orderSteps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center flex-1 min-w-[120px]">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors ${
                    step.status === "completed"
                      ? "bg-green-500 text-white"
                      : "bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300"
                  }`}
                >
                  {step.status === "completed" ? "✓" : "○"}
                </div>
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 text-center mb-1">
                  {step.label}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                  {step.date}
                </p>
                {idx < orderSteps.length - 1 && (
                  <div className="hidden sm:block w-0.5 h-12 bg-gray-300 dark:bg-gray-600 mt-2 mx-auto" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Products */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {t("products")}
          </h2>
          <div className="space-y-4">
            {products.map((product, idx) => (
              <div
                key={idx}
                className="flex gap-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
              >
                <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center text-3xl flex-shrink-0">
                  {product.image}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {product.color} | {product.specs}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-gray-900 dark:text-gray-100 mb-1">
                    {product.price}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t("quantity")}: {product.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Payment */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4">
              {t("payment")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-2">Visa **56</p>
            <div className="flex gap-2 items-center">
              <span className="text-lg">💳</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">Visa</span>
            </div>
          </div>

          {/* Shipping */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4">
              {t("shipping")}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              {t("shippingAddress")}
            </p>
            <p className="text-gray-900 dark:text-gray-100">
              {order?.address || "Khu 1, phường 2,"}
              <br />
              Tp.HCM
            </p>
          </div>
        </div>

        {/* Order Total */}
        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4">
            {t("orderSummary")}
          </h3>
          <div className="space-y-3 text-gray-600 dark:text-gray-400">
            <div className="flex justify-between">
              <span>{t("totalAmount")}</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                953.700.000đ
              </span>
            </div>
            <div className="flex justify-between">
              <span>{t("discount")}</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                (30%) - 286.110.000đ
              </span>
            </div>
            <div className="flex justify-between">
              <span>{t("shippingFee")}</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                $0.00
              </span>
            </div>
            <div className="flex justify-between">
              <span>{t("tax")}</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                +47.685.000đ
              </span>
            </div>
            <div className="border-t border-gray-300 dark:border-gray-700 pt-3 flex justify-between">
              <span className="font-bold text-gray-900 dark:text-gray-100">
                {t("totalPayment")}
              </span>
              <span className="font-bold text-gray-900 dark:text-gray-100 text-lg">
                715.275.000đ
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
