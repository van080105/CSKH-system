import { addMessage, createSession, endSession, getSession } from "../services/sessionManager.js";

export function chatSocket(io) {
    console.log("✅ Chat socket initialized");

    io.on("connection", (socket) => {
        console.log("✅ Client connected:", socket.id);

        // USER JOIN - Khi khách hàng vào chat
        socket.on("user_join", ({ sessionId }) => {
            createSession(sessionId);
            socket.join(sessionId); // Bỏ "session_" prefix
            console.log(`👤 User joined -> ${sessionId}`);

            // QUAN TRỌNG: Thông báo cho tất cả agents về session mới
            io.emit("new_session", {
                sessionId,
                customerType: "guest",
                lastActivity: Date.now(),
                messages: []
            });
        });

        // AGENT JOIN - Khi nhân viên vào xem danh sách
        socket.on("agent_join", ({ agentId, sessionId }) => {
            socket.join(sessionId); // Bỏ "session_" prefix
            console.log(`👨‍💼 Agent ${agentId} joined -> ${sessionId}`);

            // Gửi thông báo cho user rằng agent đã vào
            io.to(sessionId).emit("agent_joined", {
                agentId,
                message: "Nhân viên tư vấn đã tham gia cuộc trò chuyện"
            });
        });

        // USER SEND MESSAGE
        socket.on("user_message", ({ sessionId, msg }) => {
            addMessage(sessionId, "user", msg);
            console.log(`💬 User message in ${sessionId}:`, msg);

            // Broadcast cho tất cả NGOẠI TRỪ người gửi
            socket.broadcast.to(sessionId).emit("receive_message", {
                from: "user",
                msg,
                sessionId
            });
            
            // Gửi confirm lại cho chính user
            socket.emit("receive_message", {
                from: "user",
                msg,
                sessionId
            });
        });

        // AGENT SEND MESSAGE
        socket.on("agent_message", ({ sessionId, agentId, msg }) => {
            addMessage(sessionId, "agent", msg);
            console.log(`💼 Agent ${agentId} message in ${sessionId}:`, msg);

            // Broadcast cho tất cả NGOẠI TRỪ agent gửi
            socket.broadcast.to(sessionId).emit("receive_message", {
                from: "agent",
                agentId,
                msg,
                sessionId
            });
            
            // Gửi confirm lại cho chính agent
            socket.emit("receive_message", {
                from: "agent",
                agentId,
                msg,
                sessionId
            });
        });

        // AUTO CLOSE
        socket.on("close_session", ({ sessionId }) => {
            console.log(`🔴 Closing session: ${sessionId}`);
            endSession(sessionId);
            io.to(sessionId).emit("session_closed", { sessionId });
        });

        // DISCONNECT
        socket.on("disconnect", () => {
            console.log("❌ Client disconnected:", socket.id);
        });
    });
}