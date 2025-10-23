import { useState, useEffect } from "react"

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

export function CalendarPage({ selectedDate, onChange }) {
  const today = new Date()
  const [year, setYear] = useState(selectedDate ? selectedDate.getFullYear() : today.getFullYear())
  const [month, setMonth] = useState(selectedDate ? selectedDate.getMonth() : today.getMonth())
  const [currentDate, setCurrentDate] = useState(selectedDate || null)

  useEffect(() => {
    if (selectedDate) {
      setYear(selectedDate.getFullYear())
      setMonth(selectedDate.getMonth())
      setCurrentDate(selectedDate)
    }
  }, [selectedDate])

  // Điều chỉnh ngày nếu ngày vượt số ngày tháng mới
  useEffect(() => {
    if (currentDate) {
      const daysInMonth = new Date(year, month + 1, 0).getDate()
      if (currentDate.getDate() > daysInMonth) {
        const newDate = new Date(year, month, daysInMonth)
        setCurrentDate(newDate)
        onChange && onChange(newDate)
      } else {
        const newDate = new Date(year, month, currentDate.getDate())
        setCurrentDate(newDate)
        onChange && onChange(newDate)
      }
    }
  }, [year, month])

  const getDaysInMonth = (y, m) => new Date(y, m + 1, 0).getDate()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = new Date(year, month, 1).getDay()

  const years = []
  for (let y = 2000; y <= 2030; y++) years.push(y)

  function handleDayClick(day) {
    const newDate = new Date(year, month, day)
    setCurrentDate(newDate)
    onChange && onChange(newDate)
  }

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded shadow w-72 select-none">
      {/* Year + Month selectors */}
      <div className="flex justify-between mb-4 items-center">
        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="border rounded px-2 py-1 dark:bg-gray-700 dark:text-white"
          aria-label="Select year"
        >
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>

        <select
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          className="border rounded px-2 py-1 dark:bg-gray-700 dark:text-white"
          aria-label="Select month"
        >
          {MONTH_NAMES.map((name, i) => (
            <option key={i} value={i}>{name}</option>
          ))}
        </select>
      </div>

      {/* Weekday header */}
      <div className="grid grid-cols-7 text-center mb-2 text-xs font-semibold text-gray-500 dark:text-gray-300">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {[...Array(firstDay).keys()].map((_, i) => (
          <div key={"empty-" + i}>&nbsp;</div>
        ))}

        {[...Array(daysInMonth).keys()].map((_, i) => {
          const day = i + 1
          const isSelected =
            currentDate &&
            currentDate.getFullYear() === year &&
            currentDate.getMonth() === month &&
            currentDate.getDate() === day
          const isToday =
            today.getFullYear() === year &&
            today.getMonth() === month &&
            today.getDate() === day
          return (
            <button
              key={day}
              onClick={() => handleDayClick(day)}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm
                ${
                  isSelected
                    ? "bg-blue-600 text-white"
                    : isToday
                    ? "text-blue-600 font-semibold"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }
              `}
              type="button"
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}
