import express from "express";
import { assignAllForms, reassignForm } from "../controllers/assignFormController.js";

const router = express.Router();

router.post("/assign-all", assignAllForms);       // gán tất cả form chưa gán
router.put("/reassign", reassignForm);    // admin gán lại 1 form

export default router;
