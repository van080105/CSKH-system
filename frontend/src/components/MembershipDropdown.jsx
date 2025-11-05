import { useState, useRef, useEffect } from "react";
import { Crown, ChevronDown, Star, Gift } from "lucide-react";

export default function MembershipDropdown({ membershipLevel, points, nextLevel, requiredPoints, theme }) {
  const [open, setOpen] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const [showBenefits, setShowBenefits] = useState(false);
  const dropdownRef = useRef(null);

  const progress = Math.min((points / requiredPoints) * 100, 100);
  const remainingPoints = requiredPoints - points;

  // Celebration khi lên hạng
  useEffect(() => {
    setCelebrating(true);
    const timer = setTimeout(() => setCelebrating(false), 2000);
    return () => clearTimeout(timer);
  }, [membershipLevel]);

  // Đóng dropdown khi click ngoài
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
        setShowBenefits(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Quyền lợi theo hạng
  const benefitsByLevel = {
    Bronze: [
      "Hỗ trợ kỹ thuật cơ bản qua chat/email",
      "Ưu tiên bảo hành tiêu chuẩn tại cửa hàng",
      "Thông tin khuyến mãi sản phẩm mới",
    ],
    Silver: [
      "Hỗ trợ kỹ thuật nhanh hơn qua chat/email",
      "Ưu tiên sửa chữa nhanh chóng tại cửa hàng",
      "Giảm giá 5% phụ kiện iPhone",
      "Thông báo sớm các chương trình khuyến mãi",
    ],
    Gold: [
      "Hỗ trợ kỹ thuật 24/7 qua chat, email và hotline",
      "Ưu tiên sửa chữa tại Apple Store hoặc trung tâm ủy quyền",
      "Giảm giá 10% phụ kiện iPhone",
      "Truy cập thử nghiệm phần mềm mới",
      "Thông tin khuyến mãi đặc biệt và chương trình đổi cũ lấy mới",
    ],
    Platinum: [
      "Hỗ trợ VIP 24/7 qua chat, hotline và tư vấn cá nhân",
      "Đặt lịch sửa chữa ưu tiên, nhận máy nhanh chóng",
      "Giảm giá 15% phụ kiện & sản phẩm mới",
      "Trải nghiệm sản phẩm mới trước khi bán ra",
      "Quà sinh nhật, voucher và sự kiện khách hàng thân thiết",
      "Tư vấn cá nhân hóa cho nâng cấp thiết bị",
    ],
    Diamond: [
      "Hỗ trợ hạng nhất 24/7 với tư vấn cá nhân và kỹ thuật viên riêng",
      "Dịch vụ sửa chữa nhanh nhất, nhận/trả máy tận nơi",
      "Giảm giá 20% phụ kiện & các sản phẩm iPhone mới",
      "Trải nghiệm thử iPhone và iOS beta trước tất cả khách hàng",
      "Quà sinh nhật, voucher cao cấp & sự kiện VIP offline",
      "Tư vấn nâng cấp thiết bị cá nhân hóa, check-up định kỳ miễn phí",
      "Mời tham dự sự kiện ra mắt iPhone và workshop đặc quyền",
    ],
  };

  const benefits = benefitsByLevel[membershipLevel] || benefitsByLevel.Silver;

  // Theme popup riêng theo hạng
  const popupThemes = {
    Bronze: {
      bg: "from-amber-50 to-orange-100 dark:from-amber-800 dark:to-orange-900",
      text: "text-amber-800 dark:text-amber-100",
      icon: "text-amber-500",
    },
    Silver: {
      bg: "from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800",
      text: "text-gray-900 dark:text-gray-100",
      icon: "text-gray-500",
    },
    Gold: {
      bg: "from-yellow-50 to-amber-100 dark:from-yellow-700 dark:to-amber-800",
      text: "text-yellow-900 dark:text-amber-100",
      icon: "text-yellow-500",
    },
    Platinum: {
      bg: "from-sky-50 to-indigo-100 dark:from-sky-800 dark:to-indigo-900",
      text: "text-indigo-900 dark:text-indigo-100",
      icon: "text-indigo-500",
    },
    Diamond: {
      bg: "from-cyan-50 to-blue-100 dark:from-cyan-800 dark:to-blue-900",
      text: "text-cyan-900 dark:text-cyan-100",
      icon: "text-cyan-500",
    },
  };

  const popupTheme = popupThemes[membershipLevel] || popupThemes.Silver;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Button chính */}
      <button
        onClick={() => setOpen(!open)}
        className={`relative flex items-center gap-2 px-4 py-1.5 rounded-full font-semibold uppercase tracking-wide
          bg-gradient-to-r ${theme.bg} ${theme.glow} ${theme.innerGlow} ${theme.border}
          text-sm ${theme.accent} shadow-md hover:shadow-lg transition-all duration-500 overflow-hidden backdrop-blur-sm`}
      >
        <Crown className="h-4 w-4 drop-shadow-md z-10" />
        <span className="z-10">{membershipLevel}</span>
        <ChevronDown className="h-3 w-3 opacity-90 z-10" />
      </button>

      {/* Celebration particles */}
      {celebrating && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="animate-celebrate absolute w-full h-full bg-[radial-gradient(circle_at_30%_70%,rgba(255,255,255,0.2),transparent_60%)]" />
        </div>
      )}

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-80 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 p-4 z-50 animate-fade-in-up bg-white dark:bg-gray-800">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-full bg-gradient-to-r ${theme.bg} shadow-md`}>
              <Crown className={`h-5 w-5 ${theme.accent}`} />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                {membershipLevel} Member
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {points} pts · {remainingPoints} pts to {nextLevel}
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-3 w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
            <div
              className={`h-2 rounded-full bg-gradient-to-r ${theme.bg}`}
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Summary lợi ích */}
          <ul className="mt-3 text-xs text-gray-600 dark:text-gray-300 space-y-1">
            <li>• Ưu tiên hỗ trợ khách hàng</li>
            <li>• Ưu đãi độc quyền cho cấp {membershipLevel}</li>
            <li>• Truy cập sớm tính năng mới</li>
          </ul>

          {/* Nút xem quyền lợi */}
          <button
            onClick={() => setShowBenefits(!showBenefits)}
            className="mt-4 w-full py-2 flex items-center justify-center gap-2 text-sm font-medium text-white bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 rounded-lg shadow-md transition-colors"
          >
            <Gift className="h-4 w-4" />
            {showBenefits ? "Đóng quyền lợi" : "Xem quyền lợi"}
          </button>

          {/* Popup quyền lợi chi tiết */}
          {showBenefits && (
            <div className={`mt-3 p-4 rounded-xl shadow-lg animate-fade-in-up bg-gradient-to-r ${popupTheme.bg} ${popupTheme.text}`}>
              <h5 className="font-semibold mb-2 text-sm flex items-center gap-2">
                <Star className={`h-4 w-4 ${popupTheme.icon}`} />
                Quyền lợi {membershipLevel} Member
              </h5>
              <ul className="text-xs space-y-1">
                {benefits.map((b, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Star className={`h-3 w-3 ${popupTheme.icon}`} />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
