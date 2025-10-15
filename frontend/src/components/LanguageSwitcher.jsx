import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { useTranslation } from "react-i18next"

export function LanguageSwitcher() {
  const [open, setOpen] = useState(false)
  const { i18n } = useTranslation()
  const langRef = useRef(null)

  const currentLang = i18n.language === "en" ? "English" : "Việt Nam"
  const flagSrc = i18n.language === "en" ? "UK-Flag.jpg" : "VietNam.png"

  const changeLang = (lng) => {
    i18n.changeLanguage(lng)
    setOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={langRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-100 rounded-lg"
      >
        <img src={flagSrc} alt={currentLang} className="h-4 w-6 object-cover rounded" />
        <span className="text-sm">{currentLang}</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 bg-white shadow-md border rounded-lg w-36 z-50">
          <button
            onClick={() => changeLang("vi")}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
          >
            🇻🇳 Tiếng Việt
          </button>
          <button
            onClick={() => changeLang("en")}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
          >
            🇬🇧 English
          </button>
        </div>
      )}
    </div>
  )
}
