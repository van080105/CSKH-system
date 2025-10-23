import { Building2, Headphones, ShoppingCart } from "lucide-react"
import { useTranslation } from "react-i18next"
import { ChatWidget } from "./ChatWidget"

export function MainContent() {
  const { t } = useTranslation()
  return (
    <div className="container max-w-5xl mx-auto py-12 px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance leading-tight text-gray-900 dark:text-white">
          {t("homeTitle")} <span className="text-indigo-600">Mockstack!</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          {t("homeSubTitle")}
        </p>
      </div>

      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 dark:text-white">
          {t("homeTitle2")} <span className="text-indigo-600">{t("homeTitle2_")}</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg transition-shadow">
            <div className="pt-12 pb-8 px-6 text-center">
              <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-200 flex items-center justify-center mx-auto mb-6">
                <Building2 className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{t("businessOwner")}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {t("businessOwnerContent")}
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg transition-shadow">
            <div className="pt-12 pb-8 px-6 text-center">
              <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-200 flex items-center justify-center mx-auto mb-6">
                <Headphones className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{t("customerSupportTeam")}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {t("customerSupportTeamContent")}
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg transition-shadow">
            <div className="pt-12 pb-8 px-6 text-center">
              <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-200 flex items-center justify-center mx-auto mb-6">
                <ShoppingCart className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{t("eCommerceBrands")}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {t("eCommerceBrandsContent")}
              </p>
            </div>
          </div>

          <ChatWidget />
        </div>
      </div>
    </div>
  )
}
