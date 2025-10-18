import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Sidebar } from "./components/Sidebar"
import { Header } from "./components/Header"
import { MainContent } from "./components/MainContent"
import { ChatWidget } from "./components/ChatWidget"
import { Dashboard } from "./pages/Dashboard"
import { ManageUsers } from "./pages/ManageUsers"
import { ManageTickets } from "./pages/ManageTickets"
import { Profile } from "./pages/Profile"
import FAQ  from "./pages/FAQ"

import { SignUp } from "./pages/SignUp"
import { SignIn } from "./pages/SignIn"
import { ForgotPassword } from "./pages/ForgotPassword"
import { ChatbotFeedback } from "./pages/ChatbotFeedback"
import { ServiceFeedback } from "./pages/ServiceFeedback"
import { ReportForm } from "./pages/ReportForm"
import { OrderLists } from "./pages/OrderLists"
import { OrderDetail } from "./pages/OrderDetail"

import Settings from "./pages/Settings"

import "./App.css"
import './lib/i18n'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route
          path="/*"
          element={
            <div className="flex h-screen overflow-hidden bg-gray-50">
              <Sidebar />
              <div className="flex flex-1 flex-col h-full">
                <Header />
                <main className="flex-1 overflow-y-auto">
                  <Routes>
                    <Route path="/" element={<MainContent />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/users" element={<ManageUsers />} />
                    <Route path="/tickets" element={<ManageTickets />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/chatbot-feedback" element={<ChatbotFeedback />} />
                    <Route path="/service-feedback" element={<ServiceFeedback />} />
                    <Route path="/report" element={<ReportForm />} />
                    <Route path="/orders" element={<OrderLists />} />
                    <Route path="/orders/:id" element={<OrderDetail />} />
                    <Route path="/settings" element={<Settings />} />
                  </Routes>
                </main>
              </div>
              <ChatWidget />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
