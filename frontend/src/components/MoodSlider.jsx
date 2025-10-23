"use client"

import { motion } from "framer-motion"
import "../components-css/mood-slider.css"

export function MoodSlider({ value, onChange }) {
  const emojiMap = ["😡", "😞", "😐", "🙂", "😊", "😍"]

  const getLeftPercent = () => `${(value / 5) * 100}%`

  const gradient = `linear-gradient(to right,
    #ef4444 0%, 
    #facc15 ${(value / 5) * 50}%, 
    #22c55e ${(value / 5) * 100}%, 
    #e5e7eb ${(value / 5) * 100}%, 
    #e5e7eb 100%)`

  return (
    <div className="relative w-full max-w-xl mx-auto mt-8">
      {/* Emojis */}
      <div className="flex justify-between text-xl mb-2 select-none">
        {emojiMap.map((e, i) => (
          <motion.span
            key={i}
            animate={{
              scale: i === value ? 1.4 : 1,
              opacity: i === value ? 1 : 0.5,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            {e}
          </motion.span>
        ))}
      </div>

      {/* Tooltip */}
      <motion.div
        className="absolute -top-8 transform -translate-x-1/2 pointer-events-none"
        animate={{ left: getLeftPercent() }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <motion.div
          key={value}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="text-sm font-semibold text-blue-600 bg-white px-2 py-1 border border-blue-200 rounded shadow"
        >
          {value}
        </motion.div>
      </motion.div>

      {/* Slider */}
      <input
        type="range"
        min="0"
        max="5"
        step="1"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-3 rounded-lg appearance-none cursor-pointer transition-all duration-200"
        style={{
          background: gradient,
        }}
      />
    </div>
  )
}
