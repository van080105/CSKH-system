import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { Send, X, Minimize2, Maximize2, User, Headphones, Phone, Mail } from 'lucide-react';

// Socket connection
let socket = null;

const initSocket = () => {
  if (!socket) {
    socket = io('http://localhost:8080', {
      transports: ['polling','websocket'],
      autoConnect: false,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
      timeout: 10000
    });
  }
  return socket;
};

// ChatMessage Component
const ChatMessage = ({ message, isOwn }) => {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-[70%] ${isOwn ? 'order-2' : 'order-1'}`}>
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
        </div>
      </div>
    </div>
  );
};

// ChatHeader Component
const ChatHeader = ({ agentInfo, onClose, onMinimize, isMinimized }) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <Headphones className="w-6 h-6 text-blue-600" />
          </div>
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
        </div>
        <div>
          <h3 className="font-semibold text-sm">
            {agentInfo ? `Nhân viên ${agentInfo.name}` : 'Đang kết nối...'}
          </h3>
          <p className="text-xs text-blue-100">
            {agentInfo ? 'Đang hoạt động' : 'Vui lòng chờ trong giây lát'}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onMinimize}
          className="p-2 hover:bg-blue-500 rounded-full transition-colors"
          title={isMinimized ? "Mở rộng" : "Thu nhỏ"}
        >
          {isMinimized ? <Maximize2 className="w-5 h-5" /> : <Minimize2 className="w-5 h-5" />}
        </button>
        <button
          onClick={onClose}
          className="p-2 hover:bg-red-500 rounded-full transition-colors"
          title="Đóng chat"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

// ChatInput Component
const ChatInput = ({ onSend, disabled }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
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
          placeholder={disabled ? "Đang kết nối..." : "Nhập tin nhắn..."}
          disabled={disabled}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
        <button
          onClick={handleSubmit}
          disabled={disabled || !message.trim()}
          className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

// SystemMessage Component
const SystemMessage = ({ message }) => {
  return (
    <div className="flex justify-center my-4">
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-2 rounded-full text-xs">
        {message}
      </div>
    </div>
  );
};

// ChatWelcome Component
const ChatWelcome = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
      <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
        <Headphones className="w-10 h-10 text-blue-600" />
      </div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        Chào mừng bạn đến với tư vấn iPhone
      </h2>
      <p className="text-gray-600 mb-6 max-w-sm">
        Chúng tôi sẵn sàng hỗ trợ bạn tìm kiếm chiếc iPhone phù hợp nhất
      </p>
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <div className="flex items-center gap-3 text-left p-3 bg-gray-50 rounded-lg">
          <Phone className="w-5 h-5 text-blue-600" />
          <div>
            <p className="text-sm font-medium text-gray-800">Hotline</p>
            <p className="text-xs text-gray-600">1900-xxxx</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-left p-3 bg-gray-50 rounded-lg">
          <Mail className="w-5 h-5 text-blue-600" />
          <div>
            <p className="text-sm font-medium text-gray-800">Email</p>
            <p className="text-xs text-gray-600">support@iphone.vn</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main CustomerChat Component
const CustomerChat = () => {
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [agentInfo, setAgentInfo] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize chat session
  useEffect(() => {
    if (!isChatOpen) return;

    const newSessionId = sessionId || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    if (!sessionId) setSessionId(newSessionId);
    
    const currentSocket = initSocket();
    
    // Chỉ setup listeners nếu chưa có
    if (currentSocket.listeners('receive_message').length === 0) {
      console.log('🔧 Setting up socket listeners...');
      
      currentSocket.on('receive_message', (data) => {
        console.log('📨 Customer received message:', data);
        const newMessage = {
          from: data.from,
          msg: data.msg,
          time: Date.now(),
          agentId: data.agentId
        };
        setMessages((prev) => [...prev, newMessage]);

        // Set agent info when first message from agent
        if (data.from === 'agent') {
          setAgentInfo((prevInfo) => {
            if (!prevInfo) {
              return {
                id: data.agentId,
                name: `#${data.agentId?.substr(0, 6)}`
              };
            }
            return prevInfo;
          });
        }
      });

      currentSocket.on('agent_joined', (data) => {
        console.log('👨‍💼 Agent joined:', data);
        setAgentInfo({
          id: data.agentId,
          name: `#${data.agentId?.substr(0, 6)}`
        });
        
        setMessages((prev) => [
          ...prev,
          {
            from: 'system',
            msg: data.message || 'Nhân viên tư vấn đã tham gia',
            time: Date.now()
          }
        ]);
      });

      currentSocket.on('session_closed', () => {
        setMessages((prev) => [
          ...prev,
          {
            from: 'system',
            msg: 'Phiên chat đã kết thúc',
            time: Date.now()
          }
        ]);
      });
    }
    
    // Connect nếu chưa connected
    if (!currentSocket.connected) {
      currentSocket.connect();
    }

    currentSocket.on('connect', () => {
      console.log('✅ Customer connected:', currentSocket.id);
      setIsConnected(true);
      currentSocket.emit('user_join', { sessionId: newSessionId });
      console.log('📤 Emitted user_join:', newSessionId);
    });

    currentSocket.on('connect_error', (error) => {
      console.error('❌ Connection error:', error.message);
      setIsConnected(false);
    });

    currentSocket.on('disconnect', (reason) => {
      console.log('⚠️ Disconnected:', reason);
      setIsConnected(false);
    });

    // Nếu đã connected, emit user_join ngay
    if (currentSocket.connected) {
      currentSocket.emit('user_join', { sessionId: newSessionId });
      console.log('📤 Emitted user_join (already connected):', newSessionId);
    }

    return () => {
      // Cleanup connection handlers only, keep message listeners
      currentSocket.off('connect');
      currentSocket.off('connect_error'); 
      currentSocket.off('disconnect');
    };
  }, [isChatOpen]); // Chỉ phụ thuộc vào isChatOpen

  const handleSendMessage = (message) => {
    if (sessionId && isConnected && socket) {
      console.log('📤 Customer sending:', { sessionId, msg: message });
      socket.emit('user_message', {
        sessionId,
        msg: message
      });
      // BỎ optimistic update - chỉ hiện khi nhận từ server
    } else {
      console.error('❌ Cannot send:', { sessionId, isConnected, hasSocket: !!socket });
    }
  };

  const handleCloseChat = () => {
    if (sessionId && socket?.connected) {
      socket.emit('close_session', { sessionId });
      socket.disconnect();
    }
    setIsChatOpen(false);
    setSessionId(null);
    setMessages([]);
    setAgentInfo(null);
    setIsConnected(false);
    setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Button */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110"
        >
          <Headphones className="w-8 h-8" />
        </button>
      )}

      {/* Chat Window */}
      {isChatOpen && (
        <div
          className={`bg-white rounded-2xl shadow-2xl transition-all duration-300 ${
            isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
          } flex flex-col overflow-hidden`}
        >
          <ChatHeader
            agentInfo={agentInfo}
            onClose={handleCloseChat}
            onMinimize={toggleMinimize}
            isMinimized={isMinimized}
          />

          {!isMinimized && (
            <>
              {/* Messages Area */}
              <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-4 bg-gray-50"
                style={{ scrollBehavior: 'smooth' }}
              >
                {messages.length === 0 ? (
                  <ChatWelcome />
                ) : (
                  <>
                    {messages.map((message, index) => {
                      if (message.from === 'system') {
                        return <SystemMessage key={index} message={message.msg} />;
                      }
                      return (
                        <ChatMessage
                          key={index}
                          message={message}
                          isOwn={message.from === 'user'}
                        />
                      );
                    })}
                    <div ref={messagesEndRef} />
                  </>
                )}
              </div>

              {/* Input Area */}
              <ChatInput onSend={handleSendMessage} disabled={!isConnected} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomerChat;