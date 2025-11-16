import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import protectedRoutes from "./routes/protectedRoutes.js";
import accountRoutes from "./routes/accountRoutes.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import { verifyToken } from "./middlewares/authMiddleware.js";
import notificationRoutes from './routes/notificationRoutes.js';
import faqRoutes from './routes/faqRoutes.js';
import chatbotRoutes from "./routes/chatbotRoutes.js";
import agentRoutes from "./routes/agentRoutes.js";
import assignFormRoutes from "./routes/assignFormRoutes.js";
import customerRoutes from './routes/customer/index.js';
import adminRoute from './routes/admin/index.js';
import guestRoutes from './routes/guest/index.js';
import agentRoutes from './routes/agent/index.js';
import cors  from ('cors');
app.use(cors({
  origin: 'http://localhost:6660' 
}));
dotenv.config();
const app = express();
app.use(express.json());
app.use('/customer', customerRoutes);
app.use('/admin', adminRoute);
app.use('/guest', guestRoutes);
app.use('/agent', agentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes); 
app.use("/api/accounts", accountRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/faq', faqRoutes);
app.use("/api/chatbots", chatbotRoutes);
app.use("/api", agentRoutes);
app.use("/api/forms", assignFormRoutes);
app.use(errorHandler);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on port ${port}`));
