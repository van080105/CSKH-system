import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

export default function useChatSocket({
  sessionId,
  role = "user",
  agentId = null,
  onMessage,
  onSessionClose,
  onInvite
}) {
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = io("http://localhost:8080", {
      transports: ["websocket"],
    });

    socketRef.current = socket;

    // USER JOIN
    if (role === "user" && sessionId) {
      socket.emit("user_join", { sessionId });
    }

    // AGENT REGISTER
    if (role === "agent") {
      socket.emit("agent_join", { agentId, sessionId });
    }

    // ⭐ Agent nhận lời mời
    socket.on("invite_agent", ({ sessionId }) => {
      if (role === "agent" && onInvite) {
        onInvite(sessionId);

        // Agent JOIN room đúng session
        socket.emit("agent_join", { agentId, sessionId });
      }
    });

    // RECEIVE MESSAGE
    socket.on("receive_message", (data) => {
      onMessage && onMessage(data);
    });

    // SESSION CLOSED
    socket.on("session_closed", () => {
      onSessionClose && onSessionClose();
    });

    return () => socket.disconnect();
  }, [sessionId, role, agentId]);

  const sendMessage = (msg) => {
    if (!socketRef.current) return;

    if (role === "agent") {
      socketRef.current.emit("agent_message", { sessionId, agentId, msg });
    } else {
      socketRef.current.emit("user_message", { sessionId, msg });
    }
  };

  return { sendMessage, socket: socketRef.current };
}
