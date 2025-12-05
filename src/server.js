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
import classifyTableRoutes from './routes/class_Tb_routes.js'
import chatRoutes from "./routes/chatRoutes.js";
import agentSuggestionRoutes from "./routes/agentSuggestionRoutes.js";
import realtimeRoutes from "./routes/realtimeRoutes.js"; 

import { chatSocket } from "./sockets/chatSocket.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import { loadVectorStore } from "./rag/ragCore.js";

import customerRoutes from './routes/customer/index.js';
import adminRoute from './routes/admin/index.js';
import guestRoutes from './routes/guest/index.js';
import agent_Route from './routes/agent/index.js'

const start_server = async () => {
  dotenv.config();
  
  const app = express();
  
  // CORS cho Express
  app.use(cors({
    origin: 'http://localhost:6660',
    credentials: true
  }));

  app.use(express.json());
  
  // Routes
  app.use('/classifyTable', classifyTableRoutes);
  app.use('/customer', customerRoutes);
  app.use('/admin', adminRoute);
  app.use('/guest', guestRoutes);
  app.use('/agent', agent_Route);
  app.use('/agent', agentRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api", protectedRoutes); 
  app.use("/api/accounts", accountRoutes);
  app.use('/api/notifications', notificationRoutes);
  app.use('/api/faq', faqRoutes);
  app.use("/api/chatbots", chatbotRoutes);
  app.use("/api", agentRoutes);
  app.use("/api/forms", assignFormRoutes);
  app.use("/api/realtime", realtimeRoutes);
  app.use("/api/chat", chatRoutes);
  app.use("/api", agentSuggestionRoutes);

  app.use(errorHandler);

  // Tạo HTTP server
  const server = http.createServer(app);
  
  // Cấu hình Socket.IO với CORS đúng
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:6660",
      methods: ["GET", "POST"],
      credentials: true
    },
    // Thêm các options này để tránh lỗi
    transports: ['websocket', 'polling'],
    allowEIO3: true
  });

  // Khởi tạo Socket handlers
  chatSocket(io);
  
  console.log("Loading vector store...");
  await loadVectorStore();
  console.log("Vector store loaded successfully.");
  
  const port = process.env.PORT || 8080;
  server.listen(port, () => {
    console.log(`✅ Server is running on http://localhost:${port}`);
    console.log(`✅ Socket.IO is ready on ws://localhost:${port}`);
  });
};

(async () => {
  try {
    await start_server();
  } catch (error) {
    console.error('❌ Failed to start the server:', error);
  }
})();