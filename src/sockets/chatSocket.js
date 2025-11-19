
import { addMessage, createSession, endSession } from "../services/sessionManager.js";

export function chatSocket(io) {
    io.on("connection", (socket) => {
        console.log("Client connected:", socket.id);

        // USER JOIN
        socket.on("user_join", ({ sessionId }) => {
            createSession(sessionId);
            socket.join(`session_${sessionId}`);
            console.log(`User joined -> session_${sessionId}`);
        });

        // AGENT JOIN
        socket.on("agent_join", ({ agentId, sessionId }) => {
            socket.join(`session_${sessionId}`);
            console.log(`Agent ${agentId} joined -> session_${sessionId}`);
        });

        // USER SEND MESSAGE
        socket.on("user_message", ({ sessionId, msg }) => {
            addMessage(sessionId, "user", msg);

            io.to(`session_${sessionId}`).emit("receive_message", {
                from: "user",
                msg
            });
        });

        // AGENT SEND MESSAGE
        socket.on("agent_message", ({ sessionId, agentId, msg }) => {
            addMessage(sessionId, "agent", msg);

            io.to(`session_${sessionId}`).emit("receive_message", {
                from: "agent",
                agentId,
                msg
            });
        });

        // AUTO CLOSE
        socket.on("close_session", ({ sessionId }) => {
            endSession(sessionId);
            io.to(`session_${sessionId}`).emit("session_closed");
        });
    });
}
