import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

export default function useChatSocket({ sessionId, role = "user", agentId = null, onMessage, onSessionClose }) {
  const socketRef = useRef(null);

  useEffect(() => {
    if (!sessionId) return;

    const socket = io("http://localhost:8080", {
      transports: ["websocket"],
    });

    socketRef.current = socket;

    // JOIN ROOM (user or agent)
    if (role === "agent") {
      socket.emit("agent_join", { agentId, sessionId });
    } else {
      socket.emit("user_join", { sessionId });
    }

    // RECEIVE MESSAGE
    socket.on("receive_message", (data) => {
      onMessage && onMessage(data);
    });

    // SESSION CLOSED
    socket.on("session_closed", () => {
      onSessionClose && onSessionClose();
    });

    return () => {
      socket.disconnect();
    };
  }, [sessionId, role, agentId]);

  const sendMessage = (msg) => {
    if (!socketRef.current) return;
    if (role === "agent") {
      socketRef.current.emit("agent_message", { sessionId, agentId, msg });
    } else {
      socketRef.current.emit("user_message", { sessionId, msg });
    }
  };

  return { sendMessage };
}
