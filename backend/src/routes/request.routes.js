import express from "express";
import { analyzeRequest,getRequestStatus, getDepartmentRequests, updateStatus } from "../controllers/request.controller.js";

const router = express.Router();

router.post("/analyze", analyzeRequest);
router.get("/department/:name", getDepartmentRequests);
router.get("/:id", getRequestStatus);
router.put("/:id/status", updateStatus);

export default router;