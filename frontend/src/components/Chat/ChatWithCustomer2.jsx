import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Clock, MessageSquare, CheckCircle, XCircle, Search, Phone, Mail, Package } from 'lucide-react';
import socket from "../../utils/socket";

// SessionCard Component - Hiển thị từng session khách hàng
const SessionCard = ({ session, isActive, onClick, unreadCount }) => {
  const lastMessage = session.messages[session.messages.length - 1];
  
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return 'Vừa xong';
    if (diff < 3600000) return `${Math.floor(diff / 60000)} phút trước`;
    if (diff < 86400000) return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
  };

  return (
    <div
      onClick={onClick}
      className={`p-4 border-b border-gray-200 cursor-pointer transition-all hover:bg-gray-50 ${
        isActive ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">
              Khách #{session.sessionId.substr(-6)}
            </h4>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatTime(session.lastActivity)}
            </p>
          </div>
        </div>
        {unreadCount > 0 && (
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {unreadCount}
          </span>
        )}
      </div>
      
      {lastMessage && (
        <p className="text-sm text-gray-600 truncate ml-13">
          {lastMessage.from === 'agent' ? 'Bạn: ' : ''}
          {lastMessage.msg}
        </p>
      )}
    </div>
  );
};

// ChatMessage Component
const ChatMessage = ({ message, isOwn, agentId }) => {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[70%] ${isOwn ? 'order-2' : 'order-1'}`}>
        {!isOwn && (
          <div className="flex items-center gap-2 mb-1 px-2">
            <User className="w-4 h-4 text-gray-400" />
            <span className="text-xs font-medium text-gray-600">Khách hàng</span>
          </div>
        )}
        <div
          className={`px-4 py-2 rounded-2xl ${
            isOwn
              ? 'bg-blue-500 text-white rounded-br-sm'
              : 'bg-gray-100 text-gray-800 rounded-bl-sm'
          }`}
        >
          <p className="text-sm leading-relaxed">{message.msg}</p>
        </div>
        <div className={`flex items-center gap-1 mt-1 px-2 ${isOwn ? 'justify-end' : 'justify-start'}`}>
          <span className="text-xs text-gray-400">
            {formatTime(message.time)}
          </span>
          {isOwn && <CheckCircle className="w-3 h-3 text-green-500" />}
        </div>
      </div>
    </div>
  );
};

// ChatInput Component
const ChatInput = ({ onSend, disabled }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 bg-white border-t border-gray-200">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={disabled ? "Chọn một cuộc hội thoại..." : "Nhập tin nhắn..."}
          disabled={disabled}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
        <button
          onClick={handleSend}
          disabled={disabled || !message.trim()}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
      
      {/* Quick Replies */}
      <div className="flex gap-2 mt-3 flex-wrap">
        <button
          onClick={() => !disabled && onSend('Xin chào! Tôi có thể giúp gì cho bạn?')}
          disabled={disabled}
          className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors disabled:opacity-50"
        >
          Chào hỏi
        </button>
        <button
          onClick={() => !disabled && onSend('Bạn đang quan tâm đến dòng iPhone nào ạ?')}
          disabled={disabled}
          className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors disabled:opacity-50"
        >
          Hỏi sản phẩm
        </button>
        <button
          onClick={() => !disabled && onSend('Chúng tôi có chương trình ưu đãi đặc biệt. Bạn có muốn tìm hiểu không?')}
          disabled={disabled}
          className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors disabled:opacity-50"
        >
          Ưu đãi
        </button>
        <button
          onClick={() => !disabled && onSend('Cảm ơn bạn! Chúc bạn một ngày tốt lành! 😊')}
          disabled={disabled}
          className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors disabled:opacity-50"
        >
          Kết thúc
        </button>
      </div>
    </div>
  );
};

// CustomerInfo Component - Thông tin khách hàng
const CustomerInfo = ({ sessionId }) => {
  return (
    <div className="p-4 bg-white border-l border-gray-200 w-80">
      <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <User className="w-5 h-5" />
        Thông tin khách hàng
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
          <User className="w-5 h-5 text-gray-600 mt-0.5" />
          <div>
            <p className="text-xs text-gray-500 mb-1">Mã khách hàng</p>
            <p className="text-sm font-medium text-gray-800">#{sessionId?.substr(-8)}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
          <Phone className="w-5 h-5 text-gray-600 mt-0.5" />
          <div>
            <p className="text-xs text-gray-500 mb-1">Số điện thoại</p>
            <p className="text-sm font-medium text-gray-800">Chưa cập nhật</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
          <Mail className="w-5 h-5 text-gray-600 mt-0.5" />
          <div>
            <p className="text-xs text-gray-500 mb-1">Email</p>
            <p className="text-sm font-medium text-gray-800">Chưa cập nhật</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
          <Package className="w-5 h-5 text-gray-600 mt-0.5" />
          <div>
            <p className="text-xs text-gray-500 mb-1">Đơn hàng gần nhất</p>
            <p className="text-sm font-medium text-gray-800">Chưa có đơn hàng</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Ghi chú</h4>
        <textarea
          placeholder="Thêm ghi chú về khách hàng..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows="4"
        />
      </div>
    </div>
  );
};

// EmptyState Component
const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <MessageSquare className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        Chưa có cuộc hội thoại nào
      </h3>
      <p className="text-gray-600 max-w-sm">
        Các cuộc trò chuyện với khách hàng sẽ hiển thị ở đây. Chọn một cuộc hội thoại để bắt đầu tư vấn.
      </p>
    </div>
  );
};

// Main AgentChatDashboard Component
const AgentChatDashboard = () => {
  const [agentId] = useState(`agent_${Math.random().toString(36).substr(2, 9)}`);
  const [sessions, setSessions] = useState({});
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [unreadMessages, setUnreadMessages] = useState({});
  const messagesEndRef = useRef(null);
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user)
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [sessions, activeSessionId]);

  // Initialize socket connection
  useEffect(() => {
    console.log("🔧 Setting up Agent socket listeners...");

    // Ref để lưu activeSessionId hiện tại
    const activeSessionRef = { current: activeSessionId };

    // Cập nhật ref khi activeSessionId thay đổi
    const updateActiveSessionRef = (id) => {
      activeSessionRef.current = id;
    };

    // Listener session mới
    const handleNewSession = (data) => {
      console.log("🆕 New session:", data);

      setSessions((prev) => {
        if (prev[data.sessionId]) return prev; // tránh duplicate
        return {
          ...prev,
          [data.sessionId]: {
            sessionId: data.sessionId,
            customerType: data.customerType || "guest",
            agentId: null,
            lastActivity: data.lastActivity || Date.now(),
            messages: data.messages || []
          }
        };
      });

      setUnreadMessages((prev) => ({
        ...prev,
        [data.sessionId]: 1
      }));
    };

    // Listener tin nhắn
    const handleReceiveMessage = (data) => {
      console.log("📨 Agent received:", data);
      const { from, msg, sessionId: msgSessionId } = data;
      if (!msgSessionId) return;

      setSessions((prev) => {
        const prevSession = prev[msgSessionId] || {
          sessionId: msgSessionId,
          customerType: "guest",
          agentId: null,
          lastActivity: Date.now(),
          messages: []
        };

        return {
          ...prev,
          [msgSessionId]: {
            ...prevSession,
            messages: [
              ...prevSession.messages,
              { from, msg, time: Date.now() }
            ],
            lastActivity: Date.now()
          }
        };
      });

      // Tăng unread nếu user nhắn mà agent đang không mở session đó
      if (from === "user" && msgSessionId !== activeSessionRef.current) {
        setUnreadMessages((prev) => ({
          ...prev,
          [msgSessionId]: (prev[msgSessionId] || 0) + 1
        }));
      }
    };

    // Listener session bị đóng
    const handleSessionClosed = ({ sessionId }) => {
      console.log("🔴 Session closed:", sessionId);

      setSessions((prev) => {
        const updated = { ...prev };
        delete updated[sessionId];
        return updated;
      });

      if (activeSessionRef.current === sessionId) {
        updateActiveSessionRef(null);
        setActiveSessionId(null);
      }
    };

    // Attach listeners
    socket.on("new_session", handleNewSession);
    socket.on("receive_message", handleReceiveMessage);
    socket.on("session_closed", handleSessionClosed);

    // Kết nối socket
    if (!socket.connected) socket.connect();
    socket.on("connect", () => {
      console.log("✅ Agent connected:", socket.id);
      setIsConnected(true);
    });
    socket.on("disconnect", () => {
      console.log("⚠️ Agent disconnected");
      setIsConnected(false);
    });
    socket.on("connect_error", (err) => {
      console.log("❌ Connect error:", err.message);
      setIsConnected(false);
    });

    // Cleanup khi unmount
    return () => {
      socket.off("new_session", handleNewSession);
      socket.off("receive_message", handleReceiveMessage);
      socket.off("session_closed", handleSessionClosed);
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect_error");
    };
  }, [activeSessionId]);

  // Join session khi chọn
  const handleSelectSession = (sessionId) => {
    setActiveSessionId(sessionId);
    
    // Reset unread count
    setUnreadMessages((prev) => ({
      ...prev,
      [sessionId]: 0
    }));
    
    // Join session
    if (!sessions[sessionId]?.agentId && socket) {
      console.log('🔗 Agent joining session:', sessionId);
      socket.emit('agent_join', { agentId, sessionId });
      
      setSessions((prev) => ({
        ...prev,
        [sessionId]: {
          ...prev[sessionId],
          agentId
        }
      }));
    }
  };

  // Gửi tin nhắn
  const handleSendMessage = (message) => {
    if (activeSessionId && isConnected && socket) {
      console.log('📤 Agent sending:', { sessionId: activeSessionId, agentId, msg: message });
      socket.emit('agent_message', {
        sessionId: activeSessionId,
        agentId,
        msg: message
      });
      // BỎ optimistic update - chỉ hiện khi nhận từ server
    } else {
      console.error('❌ Cannot send:', { activeSessionId, isConnected, hasSocket: !!socket });
    }
  };

  // Close session
  const handleCloseSession = (sessionId) => {
    if (socket) {
      socket.emit('close_session', { sessionId });
    }
    setSessions((prev) => {
      const updated = { ...prev };
      delete updated[sessionId];
      return updated;
    });
    
    if (sessionId === activeSessionId) {
      setActiveSessionId(null);
    }
  };

  const activeSession = activeSessionId ? sessions[activeSessionId] : null;
  const sessionList = Object.values(sessions).sort((a, b) => b.lastActivity - a.lastActivity);
  
  const filteredSessions = searchTerm
    ? sessionList.filter(s => s.sessionId.includes(searchTerm))
    : sessionList;

  const totalUnread = Object.values(unreadMessages).reduce((sum, count) => sum + count, 0);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - Danh sách sessions */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">Tin nhắn khách hàng</h2>
            <div className="flex items-center gap-2">
              <span className="text-xs text-blue-100">Agent #{agentId.substr(-6)}</span>
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}></div>
            </div>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm cuộc hội thoại..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-blue-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="p-4 bg-blue-50 border-b border-gray-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Tổng cuộc hội thoại:</span>
            <span className="font-bold text-blue-600">{sessionList.length}</span>
          </div>
          {totalUnread > 0 && (
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-gray-600">Tin nhắn chưa đọc:</span>
              <span className="font-bold text-red-600">{totalUnread}</span>
            </div>
          )}
        </div>

        {/* Sessions List */}
        <div className="flex-1 overflow-y-auto">
          {filteredSessions.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <MessageSquare className="w-12 h-12 mx-auto mb-2 text-gray-300" />
              <p className="text-sm">Chưa có cuộc hội thoại nào</p>
            </div>
          ) : (
            filteredSessions.map((session) => (
              <SessionCard
                key={session.sessionId}
                session={session}
                isActive={session.sessionId === activeSessionId}
                onClick={() => handleSelectSession(session.sessionId)}
                unreadCount={unreadMessages[session.sessionId] || 0}
              />
            ))
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {activeSession ? (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Khách hàng #{activeSession.sessionId.substr(-6)}
                    </h3>
                    <span className="text-xs text-green-600 flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Đang hoạt động
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleCloseSession(activeSessionId)}
                  className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2"
                >
                  <XCircle className="w-4 h-4" />
                  Kết thúc
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {activeSession.messages.map((message, index) => (
                <ChatMessage
                  key={index}
                  message={message}
                  isOwn={message.from === 'agent'}
                  agentId={agentId}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <ChatInput onSend={handleSendMessage} disabled={!isConnected} />
          </>
        ) : (
          <EmptyState />
        )}
      </div>

      {/* Right Sidebar - Customer Info */}
      {/* {activeSession && <CustomerInfo sessionId={activeSessionId} />} */}
    </div>
  );
};

export default AgentChatDashboard;