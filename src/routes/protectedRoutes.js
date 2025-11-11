import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { authorizeRole } from "../middlewares/roleMiddleware.js";

const router = express.Router();


router.get("/admin", verifyToken, authorizeRole("Admin"), (req, res) => {
  res.json({ message: "Hello Admin" });
});


router.get("/agent", verifyToken, authorizeRole("Admin", "Agent"), (req, res) => {
  res.json({ message: "Hello Agent" });
});

router.get("/user", verifyToken, (req, res) => {
  res.json({ message: "Hello User" });
});

export default router;
