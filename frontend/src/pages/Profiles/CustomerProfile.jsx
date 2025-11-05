import { useState } from "react";
import { useTranslation } from "react-i18next";
import EditProfileForm from "../../components/EditProfileForm";

export function CustomerProfile() {
  const [showEditForm, setShowEditForm] = useState(false);
  const { t } = useTranslation();

  const theme = {
    bg: "from-indigo-500 to-indigo-600",
    glow: "shadow-[0_0_15px_rgba(99,102,241,0.4)]",
    innerGlow: "bg-opacity-80",
    border: "border border-indigo-400",
    accent: "text-white",
  };

  // Mock data user
  const user = {
    id: "523233",
    name: "Nguyễn Văn A",
    role: "Customer",
    phone: "0909123456",
    address: "Khu 1, phường 2, TPHCM",
    email: "nguyenvana@gmail.com",
    membership: "Platinum",
    points: 1780,
    nextLevel: "Diamond",
    requiredPoints: 2000,
  };

  return (
    <div className="min-h-full bg-gray-50 dark:bg-gray-900">
      {/* Header gradient */}
      <div className="h-36 bg-gradient-to-r from-indigo-600 to-indigo-700 shadow-lg" />

      {/* Main card */}
      <div className="max-w-5xl mx-auto px-6 -mt-24">
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-xl">
          <div className="flex flex-col md:flex-row items-start justify-between mb-8 gap-6">
            {/* Avatar + Info */}
            <div className="flex items-center gap-6">
              <img
                src="/diverse-woman-avatar.png"
                alt={user.name}
                className="h-28 w-28 rounded-full object-cover border-4 border-white shadow-xl"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
                <p className="text-gray-600 dark:text-gray-300 text-lg">{user.role}</p>
              </div>
            </div>

            {/* Edit Button */}
            <button
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium shadow-lg"
              onClick={() => setShowEditForm(true)}
            >
              {t("modify")}
            </button>

            {showEditForm && <EditProfileForm onClose={() => setShowEditForm(false)} />}
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">ID</label>
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-200 shadow-sm">{user.id}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("fullNameProfile")}</label>
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-200 shadow-sm">{user.name}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("phoneNumber")}</label>
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-200 shadow-sm">{user.phone}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("address")}</label>
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-200 shadow-sm">{user.address}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("emailProfile")}</label>
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-200 shadow-sm">{user.email}</div>
            </div>

            {/* Membership */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("membershipLevel")}</label>
                <div
                  className={`inline-block px-4 py-1.5 rounded-full font-semibold uppercase tracking-wide
                  bg-gradient-to-r from-indigo-500 to-indigo-600
                  text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]
                  text-sm`}
                >
                  {user.membership}
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
