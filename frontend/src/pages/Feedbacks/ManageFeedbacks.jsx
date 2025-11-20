"use client"

import { useEffect, useState } from "react"
import FeedbackTable from "../../components/FeedbackTable"
import ModernTabs from "../../components/ModernTabs"

export default function ManageFeedbacks() {
  const [activeTab, setActiveTab] = useState("service")
  const [serviceData, setServiceData] = useState([])
  const [chatbotData, setChatbotData] = useState([])

  const fetchServiceFeedbacks = async () => {
    const token = localStorage.getItem("token")
    const res = await fetch("http://localhost:8080/admin/fb_form", {
      headers: { "Authorization": `Bearer ${token}` }
    })
    const data = await res.json()
    setServiceData(data.PromiseResult || data)
  }

  const fetchChatbotFeedbacks = async () => {
    const token = localStorage.getItem("token")
    const res = await fetch("http://localhost:8080/admin/fb_chatbot", {
      headers: { "Authorization": `Bearer ${token}` }
    })
    const data = await res.json()
    setChatbotData(data.PromiseResult || data)
  }

  useEffect(() => {
    fetchServiceFeedbacks()
    fetchChatbotFeedbacks()
  }, [])

  const serviceColumns = [
    { key: "FormID", label: "FormID" },
    { key: "Cus_Id", label: "CustomerID" },
    { key: "Cus_Name", label: "CustomerName" },
    { key: "Cus_addr", label: "CustomerAddress" },
    { key: "Cus_email", label: "CustomerEmail" },
    { 
      key: "Rating", 
      label: "Rating",
      custom: (value) => <span className="text-yellow-500 font-semibold">{value} ⭐</span>
    },
    { key: "Content", label: "Content" },
    { key: "SentDate", label: "Sent Date" }
  ]

  const chatbotColumns = [
    { key: "Cus_Id", label: "Customer ID" },
    { key: "Cus_Name", label: "Customer Name" },
    { key: "Cus_addr", label: "Customer Address" },
    { key: "Cus_email", label: "Customer Email" },
    { 
      key: "Rating", 
      label: "Rating",
      custom: (value) => <span className="text-yellow-500 font-semibold">{value} ⭐</span>
    },
    { key: "Vers", label: "Version" }
  ]

  return (
    <div className="p-6">

      <ModernTabs
        tabs={[
          { key: "service", label: "Service Feedback" },
          { key: "chatbot", label: "Chatbot Feedback" }
        ]}
        initialKey="service"
        onChange={(key) => setActiveTab(key)}
      />

      {activeTab === "service" && (
        <FeedbackTable data={serviceData} columns={serviceColumns} />
      )}

      {activeTab === "chatbot" && (
        <FeedbackTable data={chatbotData} columns={chatbotColumns} />
      )}
      
    </div>
  )
}
