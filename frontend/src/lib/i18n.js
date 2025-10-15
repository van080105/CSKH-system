import i18n from "i18next"
import { initReactI18next } from "react-i18next"

i18n.use(initReactI18next).init({
  resources: {
    vi: {
      translation: {
        welcome: "Xin chào",
        send: "Gửi",
        typeMessage: "Trả lời ...",
        chatWithAI: "Chat với AI",
        search: "Tìm kiếm",
        homepage: "Trang chủ",
        homeTitle: "Tư vấn và chăm sóc khách hàng thông minh cùng",
        homeSubTitle : "Trợ lý ảo đột phá giúp quý khách làm việc thông minh và hiệu quả hơn mỗi ngày",
        homeTitle2 : "Phù hợp", homeTitle2_ : "với ai?",
        businessOwner : "Chủ doanh nghiệp",
        customerSupportTeam : "Đội ngũ chăm sóc khách hàng",
        eCommerceBrands : "Thương hiệu thương mại điện tử",
        businessOwnerContent : "Tự động hóa tương tác khách hàng & nâng cao hiệu suất làm việc",
        customerSupportTeamContent : "Phản hồi nhanh chóng, thông minh với chatbot AI",
        eCommerceBrandsContent : "Tăng doanh số nhờ trợ lý mua sắm được hỗ trợ bởi AI",
        // Thêm các key khác...
      },
    },
    en: {
      translation: {
        welcome : "Hello",
        send : "Send",
        typeMessage : "Type a message...",
        chatWithAI : "Chat with AI",
        search : "Search",
        homepage: "Home",
        homeTitle : "Get smart customer care and consultation with",
        homeSubTitle : "A breakthrough virtual assistant that helps you work smarter and more efficiently every day",
        homeTitle2 : "Suitable", homeTitle2_ : "for whom?",
        businessOwner : "Business owners",
        customerSupportTeam : "Customer support teams",
        eCommerceBrands : "E-Commerce brands",
        businessOwnerContent : "Automate customer interactions & boost productivity",
        customerSupportTeamContent : "Respond quickly and intelligently with an AI-powered chatbot",
        eCommerceBrandsContent : "Increase sales with an AI-assisted shopping assistant",
        // Add more keys...
      },
    },
  },
  lng: "vi",
  fallbackLng: "vi",
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
