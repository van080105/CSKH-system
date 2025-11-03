import { Building2, Headphones, ShoppingCart } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ChatWidget } from "./ChatWidget";

const cardVariants = {
  offscreen: { y: 50, opacity: 0 },
  onscreen: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", bounce: 0.3, duration: 0.8 }
  }
};

export function MainContent() {
  const { t } = useTranslation();

  return (
    <div className="container max-w-6xl mx-auto py-16 px-6">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-extrabold mb-4 text-gray-900 dark:text-white leading-tight tracking-tight"
        >
          {t("homeTitle")} <span className="text-indigo-600 bg-gradient-to-r from-indigo-400 via-pink-500 to-purple-500 bg-clip-text text-transparent animate-gradient-x">Mockstack!</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-gray-600 dark:text-gray-400 text-lg"
        >
          {t("homeSubTitle")}
        </motion.p>
      </div>

      {/* Cards Section */}
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { icon: Building2, title: t("businessOwner"), content: t("businessOwnerContent") },
          { icon: Headphones, title: t("customerSupportTeam"), content: t("customerSupportTeamContent") },
          { icon: ShoppingCart, title: t("eCommerceBrands"), content: t("eCommerceBrandsContent") },
        ].map(({ icon: Icon, title, content }, i) => (
          <motion.div 
            key={i}
            variants={cardVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl hover:shadow-2xl hover:scale-105 transition-transform cursor-pointer"
          >
            <div className="pt-12 pb-8 px-6 text-center">
              <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-200 flex items-center justify-center mx-auto mb-6 hover:scale-110 transition-transform">
                <Icon className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{content}</p>
            </div>
          </motion.div>
        ))}

        {/* Chat Widget */}
        <motion.div
          variants={cardVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.3 }}
          className="col-span-full md:col-span-3 mt-8"
        >
          <ChatWidget />
        </motion.div>
      </div>
    </div>
  );
}
