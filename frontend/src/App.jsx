import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignIn } from './pages/Authorization/SignIn';
import { SignUp } from './pages/Authorization/SignUp';
import { ForgotPassword } from './pages/Authorization/ForgotPassword';
import { DevTeamPage } from './pages/Decorators/DevTeam';
import { ProductPage } from './pages/Decorators/ProductPage';

import AdminLayout from "./layouts/AdminLayout";
import AgentLayout from "./layouts/AgentLayout";
import CustomerLayout from "./layouts/CustomerLayout" 
import GuestLayout from "./layouts/GuestLayout"

import ProtectedRoute from "./components/ProtectedRoute";
import { MainContent } from "./components/MainContent";
import { Dashboard } from "./pages/Statistics/Dashboard";
import { ManageUsers } from "./pages/Users/ManageUsers";
import { ManageCustomers } from "./pages/Users/ManageCustomers";
import { ReportForm } from "./pages/Statistics/ReportForm";

import { ManageForms } from "./pages/Tickets/ManageForms";
import  AgentTickets  from "./pages/Tickets/AgentTickets";
import { CustomerTickets } from "./pages/Tickets/CustomerTickets";

import { Profile } from "./pages/Profile";

import FAQ from "./pages/FAQ";
import Settings from "./pages/Settings";

import Unauthorized from "./pages/Authorization/Unauthorized";
import { NotFoundPage } from "./pages/Authorization/NotFound";

import { ChangePassword } from "./pages/Authorization/ChangePassword"

import { ChatbotFeedback } from "./pages/Feedbacks/ChatbotFeedback"
import { ServiceFeedback } from "./pages/Feedbacks/ServiceFeedback"
import ManageFeedbacks from "./pages/Feedbacks/ManageFeedbacks";

import Contact from "./pages/Feedbacks/Contact"

import { OrderLists } from "./pages/OrderLists"
import { OrderDetail } from "./pages/OrderDetail"

import { Inbox } from "./pages/Inbox"
import { InboxDetail } from "./pages/InboxDetail";

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
          <Route path="service-feedback" element={<ServiceFeedback showCustomerInfo={false} />} />
          <Route path="dev-team" element={<DevTeamPage />} />
          <Route path="products" element={<ProductPage />} />
          <Route path="contact" element={<Contact />} /> 
          <Route path="*" element={<NotFoundPage />} />
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
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="tickets" element={<ManageForms />} />
          <Route path="manage-service-feedback" element={<ManageFeedbacks />} />
          <Route path="profile" element={<Profile />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="report" element={<ReportForm />} />
          <Route path="settings/*" element={<Settings />} > 
            <Route path="change-password" element={<ChangePassword />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Route cho agent, với ProtectedRoute */}
        <Route path="/agent/*" element={
          <ProtectedRoute role="agent">
            <AgentLayout />
          </ProtectedRoute>
        }>
          <Route path="inbox" element={<Inbox />}>
            <Route path=":id" element={<InboxDetail />} /> 
          </Route>
          <Route path="customers" element={<ManageCustomers />} />
          <Route path="tickets" element={<AgentTickets />} />
          <Route path="profile" element={<Profile />} />
          <Route path="faq" element={<FAQ showModify={false}/>} />
          <Route path="products" element={<ProductPage />} />
          <Route path="dev-team" element={<DevTeamPage />} />
          <Route path="settings/*" element={<Settings />} > 
            <Route path="change-password" element={<ChangePassword />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
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
          <Route path="tickets" element={<CustomerTickets />} />
          <Route path="orders" element={<OrderLists />} />
          <Route path="contact" element={<Contact />} /> 
          <Route path="products" element={<ProductPage />} />
          <Route path="orders/:id" element={<OrderDetail />} />
          <Route path="settings/*" element={<Settings />} > 
            <Route path="change-password" element={<ChangePassword />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Trang Unauthorized */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
