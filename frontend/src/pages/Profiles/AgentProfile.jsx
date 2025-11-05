import { useState } from "react";
import { useTranslation } from 'react-i18next';
import EditProfileForm from "../../components/EditProfileForm";

export function AgentProfile() {
  const [showEditForm, setShowEditForm] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="min-h-full">
      <div className="h-32 bg-gradient-to-r from-indigo-600 to-indigo-700"></div>

      <div className="max-w-4xl mx-auto px-6 -mt-16">
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-8">
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-6">
              <img
                src="/diverse-woman-avatar.png"
                alt="Moni Roy"
                className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Moni Roy</h1>
                <p className="text-gray-600 dark:text-gray-300">Agent</p>
              </div>
            </div>

            <button
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              onClick={() => setShowEditForm(true)}
            >
              {t("modify")}
            </button>

            {showEditForm && <EditProfileForm onClose={() => setShowEditForm(false)} />}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">ID</label>
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-300">523233</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("fullNameProfile")}</label>
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-300">Nguyễn Văn A</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("phoneNumber")}</label>
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-300">0909123456</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("address")}</label>
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-300">Khu 1, phường 2, TPHCM</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("emailProfile")}</label>
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-300">nguyenvana@gmail.com</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("role")}</label>
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-300">{ "Chăm sóc khách hàng" || t("customerSupport")}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
