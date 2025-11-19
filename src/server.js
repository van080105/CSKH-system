
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

import authRoutes from "./routes/authRoutes.js";
import protectedRoutes from "./routes/protectedRoutes.js";
import accountRoutes from "./routes/accountRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import faqRoutes from "./routes/faqRoutes.js";
import chatbotRoutes from "./routes/chatbotRoutes.js";
import agentRoutes from "./routes/agentRoutes.js";
import assignFormRoutes from "./routes/assignFormRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import agentSuggestionRoutes from "./routes/agentSuggestionRoutes.js";
import realtimeRoutes from "./routes/realtimeRoutes.js"; 

import { chatSocket } from "./sockets/chatSocket.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import { loadVectorStore } from "./rag/ragCore.js";

dotenv.config();

async function startServer() {
  const app = express();
  app.use(express.json());

  app.use(cors({
    origin: 'http://localhost:6660',
  }));
  app.use("/api/chat", chatRoutes);
  app.use("/api/realtime", realtimeRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api", protectedRoutes);
  app.use("/api/accounts", accountRoutes);
  app.use("/api/notifications", notificationRoutes);
  app.use("/api/faq", faqRoutes);
  app.use("/api/chatbots", chatbotRoutes);
  app.use("/api", agentRoutes);
  app.use("/api/forms", assignFormRoutes);
  app.use("/api/chat", chatRoutes);
  app.use("/api", agentSuggestionRoutes);

  app.use(errorHandler);

  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:6660"
      //origin: "*"
    }
  });

  chatSocket(io);
  console.log("Loading vector store...");
  await loadVectorStore();
  console.log("Vector store loaded successfully.");
  const port = process.env.PORT || 8080;
  server.listen(port, () => {
    console.log(`Server is running with socket.io on port ${port}`);
  });
}

startServer().catch((err) => {
  console.error("Fatal error starting server:", err);
});
