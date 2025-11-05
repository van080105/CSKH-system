import { useState, useEffect } from "react";
import { Menu, Search } from "lucide-react";
import { LanguageSwitcher } from "../LanguageSwitcher";
import NotificationDropdown from "../NotificationDropdown";
import { useTranslation } from "react-i18next";
import UserMenu from "../UserMenu";
import { NavLink } from "react-router-dom";
import MembershipDropdown from "../MembershipDropdown";

export function CustomerHeader({ onToggleSidebar }) {
  const { t } = useTranslation();

  // 🏅 Giả lập thông tin thành viên
  // test: Bronze, Silver, Gold, Platinum, Diamond
  const [membershipLevel, setMembershipLevel] = useState("Platinum"); 
  const points = 1840;
  const nextLevel = "Diamond";
  const requiredPoints = 2000;

  // 🌈 Theme cho từng hạng
  const levelThemes = {
    Bronze: {
      bg: "from-amber-600 to-orange-500 dark:from-amber-700 dark:to-orange-600",
      border: "border-amber-300 dark:border-amber-700",
      accent: "text-white",
      glow: "shadow-[0_0_12px_rgba(255,160,80,0.6)]",
      innerGlow: "shadow-inner shadow-amber-700/20",
    },
    Silver: {
      bg: "from-gray-400 to-gray-300 dark:from-gray-500 dark:to-gray-400",
      border: "border-gray-300 dark:border-gray-600",
      accent: "text-gray-900 dark:text-gray-100",
      glow: "shadow-[0_0_14px_rgba(200,200,200,0.6)]",
      innerGlow: "shadow-inner shadow-gray-600/20",
    },
    Gold: {
      bg: "from-yellow-400 to-amber-500 dark:from-yellow-500 dark:to-amber-600",
      border: "border-amber-400 dark:border-amber-700",
      accent: "text-yellow-900 dark:text-amber-100",
      glow: "shadow-[0_0_16px_rgba(255,220,120,0.65)]",
      innerGlow: "shadow-inner shadow-amber-600/20",
    },
    Platinum: {
      bg: "from-sky-400 to-indigo-500 dark:from-sky-500 dark:to-indigo-600",
      border: "border-sky-300 dark:border-indigo-600",
      accent: "text-white",
      glow: "shadow-[0_0_18px_rgba(130,200,255,0.6)]",
      innerGlow: "shadow-inner shadow-indigo-700/30",
    },
    Diamond: {
      bg: "from-cyan-400 to-blue-600 dark:from-cyan-500 dark:to-indigo-700",
      border: "border-cyan-300 dark:border-sky-700",
      accent: "text-white",
      glow: "shadow-[0_0_22px_rgba(100,230,255,0.7)]",
      innerGlow: "shadow-inner shadow-cyan-700/30",
    },
  };

  const theme = levelThemes[membershipLevel] || levelThemes.Silver;

  return (
    <header
      className={`relative h-16 border-b px-6 flex items-center gap-4 transition-all duration-1000 ease-in-out
        bg-gradient-to-r ${theme.bg} ${theme.border} ${theme.glow}`}
    >
      {/* Nút toggle sidebar */}
      <button
        onClick={onToggleSidebar}
        className="p-2 hover:bg-white/40 dark:hover:bg-black/20 rounded-lg transition-colors z-10"
      >
        <Menu className={`h-5 w-5 ${theme.accent}`} />
      </button>

      {/* Ô tìm kiếm */}
      <div className="relative flex-1 max-w-md z-10">
        <Search
          className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60 ${theme.accent}`}
        />
        <input
          type="text"
          placeholder={t("search")}
          className="w-full pl-9 pr-4 py-2 bg-white/60 dark:bg-gray-800/50 backdrop-blur-md border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-gray-900 dark:text-gray-100"
        />
      </div>

      {/* Bên phải */}
      <div className="flex items-center gap-4 ml-auto z-10">
        <NotificationDropdown />
        <LanguageSwitcher />

        {/* Membership Dropdown */}
        <MembershipDropdown
          membershipLevel={membershipLevel}
          points={points}
          nextLevel={nextLevel}
          requiredPoints={requiredPoints}
          theme={theme}
        />

        {/* Contact */}
        <NavLink
          to="/customer/contact"
          className="relative text-sm font-medium px-3 py-1.5 rounded-lg
            text-gray-900 dark:text-gray-100
            bg-white/40 dark:bg-gray-800/50
            backdrop-blur-md border border-white/30 dark:border-gray-700/40
            hover:bg-white/60 dark:hover:bg-gray-800/70
            hover:shadow-md hover:text-indigo-600 dark:hover:text-indigo-400
            transition-all duration-300"
        >
          {t("contact")}
        </NavLink>

        <UserMenu />
      </div>
    </header>
  );
}
