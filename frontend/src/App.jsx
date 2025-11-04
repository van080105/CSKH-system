import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { ForgotPassword } from './pages/ForgotPassword';
import { DevTeamPage } from './pages/DevTeam';
import { ProductPage } from './pages/ProductPage';

import AdminLayout from "./layouts/AdminLayout";
import AgentLayout from "./layouts/AgentLayout";
import CustomerLayout from "./layouts/CustomerLayout" 
import GuestLayout from "./layouts/GuestLayout"

import ProtectedRoute from "./components/ProtectedRoute";
import { MainContent } from "./components/MainContent";
import { Dashboard } from "./pages/Dashboard";
import { ManageUsers } from "./pages/ManageUsers";
import { ManageTickets } from "./pages/ManageTickets";
import { AgentTickets } from "./pages/AgentTickets";
import { Profile } from "./pages/Profile";

import FAQ from "./pages/FAQ";
import { ReportForm } from "./pages/ReportForm";
import Settings from "./pages/Settings";
import Unauthorized from "./pages/Unauthorized"; // Đảm bảo Unauthorized được import
import { ChangePassword } from "./pages/ChangePassword"

import { ChatbotFeedback } from "./pages/ChatbotFeedback"
import { ServiceFeedback } from "./pages/ServiceFeedback"
import { OrderLists } from "./pages/OrderLists"
import { OrderDetail } from "./pages/OrderDetail"
import { Inbox } from "./pages/Inbox"
import Contact from "./pages/Contact"

import "./App.css";
import "./lib/i18n";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes cho các trang không yêu cầu đăng nhập */}
        {/* Guest */}
        <Route path="/*" element={
            <GuestLayout />
        }>
          <Route index element={<MainContent />} />
          <Route path="faq" element={<FAQ showModify={false}/>}/>
          <Route path="settings" element={<Settings showElement={false}/>} />
          <Route path="dev-team" element={<DevTeamPage />} />
          <Route path="products" element={<ProductPage />} />
          <Route path="contact" element={<Contact />} /> 
        </Route>

        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Route cho admin, với ProtectedRoute */}
        <Route path="/admin/*" element={
          <ProtectedRoute role="admin">
            <AdminLayout />
          </ProtectedRoute>
        }>
          {/* Các trang của admin */}
          <Route index element={<MainContent />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="tickets" element={<ManageTickets />} />
          <Route path="profile" element={<Profile />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="report" element={<ReportForm />} />
          <Route path="settings/*" element={<Settings />} > 
            <Route path="change-password" element={<ChangePassword />} />
          </Route>
        </Route>

        {/* Route cho agent, với ProtectedRoute */}
        <Route path="/agent/*" element={
          <ProtectedRoute role="agent">
            <AgentLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Inbox />} />
          <Route path="tickets" element={<AgentTickets />} />
          <Route path="profile" element={<Profile />} />
          <Route path="faq" element={<FAQ showModify={false}/>} />
          <Route path="products" element={<ProductPage />} />
          <Route path="dev-team" element={<DevTeamPage />} />
          <Route path="settings/*" element={<Settings />} > 
            <Route path="change-password" element={<ChangePassword />} />
          </Route>
        </Route>

        <Route path="/customer/*" element={
          <ProtectedRoute role="customer">
            <CustomerLayout />
          </ProtectedRoute>
        }>
          <Route index element={<MainContent />} />
          <Route path="profile" element={<Profile />} />
          <Route path="faq" element={<FAQ showModify = {false} />} />
          <Route path="chatbot-feedback" element={<ChatbotFeedback />} />
          <Route path="service-feedback" element={<ServiceFeedback />} />
          <Route path="orders" element={<OrderLists />} />
          <Route path="contact" element={<Contact />} /> 
          <Route path="products" element={<ProductPage />} />
          <Route path="orders/:id" element={<OrderDetail />} />
          <Route path="settings/*" element={<Settings />} > 
            <Route path="change-password" element={<ChangePassword />} />
          </Route>
        </Route>

        {/* Trang Unauthorized */}
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
