import { Building2, Headphones, ShoppingCart, Apple, Star, Gift, Users } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ChatWidget } from "./Chat/ChatWidget";
import { useState } from "react";
import ChatWithAgent from "./Chat/ChatWithAgent2";

const cardVariants = {
  offscreen: { y: 50, opacity: 0 },
  onscreen: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", bounce: 0.3, duration: 0.8 }
  }
};

const sectionVariants = {
  offscreen: { y: 50, opacity: 0 },
  onscreen: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", bounce: 0.3, duration: 0.8 }
  }
};

export function MainContent() {
  const { t } = useTranslation();

  const [modalContent, setModalContent] = useState(""); 
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (content) => {
    setModalContent(content);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

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
          {t("homeTitle")} <span className="bg-gradient-to-r from-indigo-500 via-blue-600 to-blue-800 bg-clip-text text-transparent animate-gradient-x">Mockstack!</span>
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
          { icon: ShoppingCart, title: t("eCommerceBrands"), content: t("eCommerceBrandsContent") }
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
        {/* <motion.div
          variants={cardVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.3 }}
        >
          <ChatWithAgent />
        </motion.div> */}

        <motion.div
          variants={cardVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.3 }}
        >
          <ChatWidget />
        </motion.div>
      </div>

      {/* Featured iPhone Models */}
      <div className="mt-16">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-10"
        >
          {t("featuredModels")}
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[ 
            { img: "/iphone-17.jpg", name: "iPhone 17", description: t("iphone17Description") },
            { img: "/iphone-17-pro.jpg", name: "iPhone 17 Pro", description: t("iphone17ProDescription") },
            { img: "/iphone-SE.jpg", name: "iPhone SE", description: t("iphoneSEDescription") }
          ].map((phone, i) => (
            <motion.div 
              key={i} 
              variants={cardVariants}
              initial="offscreen"
              whileInView="onscreen"
              className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-lg hover:scale-105 transition-transform"
            >
              <img src={phone.img} alt={phone.name} className="w-full h-56 object-cover rounded-lg mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{phone.name}</h3>
              <p className="text-gray-600 dark:text-gray-400">{phone.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Why Choose Us? */}
      <div className="mt-16">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-10"
        >
          {t("whyChooseUs")}
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[ 
            { icon: Apple, title: t("premiumQuality"), content: t("premiumQualityContent") },
            { icon: Gift, title: t("specialOffers"), content: t("specialOffersContent") },
            { icon: Users, title: t("customerCare"), content: t("customerCareContent") },
            { icon: Star, title: t("trustedBrand"), content: t("trustedBrandContent") }
          ].map(({ icon: Icon, title, content }, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              initial="offscreen"
              whileInView="onscreen"
              className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform"
            >
              <div className="mb-4">
                <Icon className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{content}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="mt-16">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-10"
        >
          {t("customerReviews")}
        </motion.h2>
        <div className="flex justify-center">
          <div className="max-w-3xl space-y-4">
            {[ 
              { name: "Nguyễn Văn A", review: t("review1") },
              { name: "Trần Văn B", review: t("review2") },
            ].map((review, i) => (
              <motion.div 
                key={i} 
                variants={cardVariants}
                initial="offscreen"
                whileInView="onscreen"
                className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform"
              >
                <p className="text-lg italic text-gray-600 dark:text-gray-400">{review.review}</p>
                <p className="font-semibold text-gray-900 dark:text-white mt-4">- {review.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        variants={sectionVariants}
        initial="offscreen"
        whileInView="onscreen"
        className="bg-gradient-to-r from-indigo-500 via-blue-600 to-blue-800 
                  dark:bg-gradient-to-r dark:from-indigo-600 dark:via-blue-700 dark:to-blue-900 
                  text-white py-12 mt-16"
      >
        <div className="container max-w-6xl mx-auto text-center">
          <div className="flex justify-center space-x-6 mb-6">
            <button
              onClick={() => openModal(t('privacyPolicyContent'))}
              className="text-lg font-semibold hover:text-blue-300 dark:hover:text-blue-400 transition duration-300"
            >
              {t('privacyPolicy')}
            </button>

            <button
              onClick={() => openModal(t('termsOfServiceContent'))}
              className="text-lg font-semibold hover:text-blue-300 dark:hover:text-blue-400 transition duration-300"
            >
              {t('termsOfService')}
            </button>

            <button
              onClick={() => openModal(t('contactUsContent'))}
              className="text-lg font-semibold hover:text-blue-300 dark:hover:text-blue-400 transition duration-300"
            >
              {t('contactUs')}
            </button>
          </div>

          <p className="text-gray-200 text-sm">&copy; 2025 Mockstack. {t('allRightsReserved')}</p>
        </div>
      </motion.footer>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-xl p-6 max-w-lg w-full shadow-2xl relative"
            onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
          >
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-white transition"
              onClick={closeModal}
            >
              ✕
            </button>
            <div className="text-left space-y-4">
              <p>{modalContent}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
