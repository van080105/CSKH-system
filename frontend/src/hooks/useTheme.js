import { useEffect, useState } from "react"

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "system"
    }
    return "system"
  })

  useEffect(() => {
    const root = window.document.documentElement

    const applyTheme = (mode) => {
      if (mode === "dark") {
        root.classList.add("dark")
      } else if (mode === "light") {
        root.classList.remove("dark")
      } else {
        // system
        const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
        root.classList.toggle("dark", isDark)
      }
    }

    applyTheme(theme)

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = () => {
      if (localStorage.getItem("theme") === "system") {
        applyTheme("system")
      }
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [theme])

  const changeTheme = (newTheme) => {
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
  }

  return { theme, changeTheme }
}
