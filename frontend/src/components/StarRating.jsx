"use client"

import { motion } from "framer-motion"
import { useState } from "react"

export function StarRating({ value, onChange }) {
  const [hovered, setHovered] = useState(0)

  const stars = [1, 2, 3, 4, 5]

  return (
    <div className="flex gap-2">
      {stars.map((star) => {
        const isActive = star <= (hovered || value)

        return (
          <motion.button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            animate={{
              scale: isActive ? 1.2 : 1,
              color: isActive ? "#facc15" : "#d1d5db", // yellow-400 : gray-300
            }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="text-3xl focus:outline-none select-none"
          >
            ★
          </motion.button>
        )
      })}
    </div>
  )
}
