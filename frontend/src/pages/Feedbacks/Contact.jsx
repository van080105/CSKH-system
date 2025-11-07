"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, CheckCircle, Mail, Sparkles } from "lucide-react"
import { Smartphone, ShoppingBag, CreditCard, ShieldCheck, Headphones, MessageSquare } from "lucide-react"
import Particles from "react-tsparticles"
import { loadFull } from "tsparticles"
import { useTranslation } from "react-i18next"

export default function Contact() {
  const { t } = useTranslation() // 🔑 Hook dịch
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    title: "",
    category: "",
    message: "",
  })
  const [status, setStatus] = useState("idle")
  const [hint, setHint] = useState("")

  // --- SMART HINT SYSTEM ---
  useEffect(() => {
    const { message } = formData
    if (!message) return setHint("")
    if (message.toLowerCase().includes("đăng nhập"))
      setHint(t("hint_login"))
    else if (message.toLowerCase().includes("thanh toán"))
      setHint(t("hint_payment"))
    else if (message.length > 80)
      setHint(t("hint_detail"))
    else setHint("")
  }, [formData.message, t])

  // --- PARTICLES SETUP ---
  const particlesInit = async (main) => {
    await loadFull(main)
  }

  // --- SOUND FEEDBACK ---
  const playSound = (success = true) => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const now = ctx.currentTime

    const osc1 = ctx.createOscillator()
    const osc2 = ctx.createOscillator()
    const gain = ctx.createGain()

    osc1.connect(gain)
    osc2.connect(gain)
    gain.connect(ctx.destination)

    if (success) {
      osc1.frequency.setValueAtTime(660, now)
      osc2.frequency.setValueAtTime(880, now + 0.05)
    } else {
      osc1.frequency.setValueAtTime(180, now)
      osc2.frequency.setValueAtTime(160, now + 0.05)
    }

    gain.gain.setValueAtTime(0.15, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6)

    osc1.type = "sine"
    osc2.type = "triangle"

    osc1.start(now)
    osc2.start(now + 0.05)
    osc1.stop(now + 0.6)
    osc2.stop(now + 0.6)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus("sending")
    try {
      await new Promise((res) => setTimeout(res, 1500))
      playSound(true)
      setStatus("success")
      setFormData({ fullName: "", email: "", title: "", message: "" })
    } catch {
      playSound(false)
      setStatus("error")
    }
  }

  const resetForm = () => setStatus("idle")

  const categories = [
    { id: "general", icon: Smartphone, label: t("categories.general") },
    { id: "order", icon: ShoppingBag, label: t("categories.order") },
    { id: "payment", icon: CreditCard, label: t("categories.payment") },
    { id: "warranty", icon: ShieldCheck, label: t("categories.warranty") },
    { id: "support", icon: Headphones, label: t("categories.support") },
    { id: "feedback", icon: MessageSquare, label: t("categories.feedback") },
  ]

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-black overflow-hidden px-6 py-16">
      {/* 🌌 Animated Star Particles Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: { value: "transparent" } },
          fpsLimit: 60,
          particles: {
            color: { value: "#a78bfa" },
            links: { enable: false },
            move: {
              enable: true,
              speed: 0.3,
              direction: "none",
              random: true,
              straight: false,
              outModes: "out",
            },
            number: { value: 60 },
            opacity: { value: 0.3 },
            shape: { type: "circle" },
            size: { value: { min: 0.5, max: 2 } },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 z-0"
      />

      {/* 🌈 Background Glow */}
      <motion.div
        className="absolute w-[700px] h-[700px] bg-gradient-to-r from-indigo-400/20 to-purple-500/20 rounded-full blur-3xl"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
      />

      {/* 🪄 Main Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-lg p-8 rounded-3xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 shadow-[0_8px_40px_rgba(0,0,0,0.1)] backdrop-blur-xl"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex justify-center mb-3"
          >
            <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900/40">
              <Mail className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
          </motion.div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {t("contact_us")}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            {t("contact_description")}
          </p>
        </div>

        {/* 🎭 Dynamic Form / Success States */}
        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="text-center py-10"
            >
              <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-3 animate-bounce" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                {t("thank_you")}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {t("message_sent_success")}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetForm}
                className="px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 transition"
              >
                {t("send_another")}
              </motion.button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {[
                {
                  label: t("full_name"),
                  name: "fullName",
                  type: "text",
                  placeholder: "Nguyễn Văn A",
                },
                {
                  label: t("email"),
                  name: "email",
                  type: "email",
                  placeholder: "you@example.com",
                },
                {
                  label: t("subject"),
                  name: "title",
                  type: "text",
                  placeholder: t("subject_placeholder"),
                },
              ].map((f, i) => (
                <motion.div
                  key={f.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                >
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    {f.label}
                  </label>
                  <input
                    type={f.type}
                    name={f.name}
                    value={formData[f.name]}
                    onChange={handleChange}
                    placeholder={f.placeholder}
                    required
                    className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-300 hover:shadow-[0_0_0_2px_rgba(99,102,241,0.1)]"
                  />
                </motion.div>
              ))}

              {/* 🗂️ Danh mục (Category) */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
              >
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                  {t("category")}
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {categories.map(({ id, icon: Icon, label }) => (
                    <motion.button
                      key={id}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, category: id }))}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all text-sm font-medium
                        ${
                          formData.category === id
                            ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-transparent shadow-lg shadow-indigo-500/20 animate-shimmer"
                            : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-indigo-400 dark:hover:border-indigo-500 animate-shimmer"
                        }`}
                    >
                      <Icon
                        className={`w-6 h-6 mb-2 ${
                          formData.category === id ? "text-white" : "text-indigo-500 dark:text-indigo-400"
                        }`}
                      />
                      <span>{label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Nội dung */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  {t("message")}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder={t("message_placeholder")}
                  required
                  className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-2.5 text-sm resize-none focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-300 hover:shadow-[0_0_0_2px_rgba(99,102,241,0.1)]"
                ></textarea>

                {hint && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 mt-2 text-sm text-indigo-600 dark:text-indigo-400"
                  >
                    <Sparkles className="w-4 h-4" />
                    {hint}
                  </motion.div>
                )}
              </motion.div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={status === "sending"}
                  onClick={() =>
                    setFormData({ fullName: "", email: "", title: "", message: "" })
                  }
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  {t("cancel")}
                </motion.button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={status === "sending"}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 transition disabled:opacity-70"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> {t("sending")}
                    </>
                  ) : (
                    t("send_message")
                  )}
                </motion.button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
