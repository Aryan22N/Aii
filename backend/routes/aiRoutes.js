import express from "express";
import {
    generateQuestionPaper,
    generateStudyPlan,
    chatWithAI
} from "../controllers/aiController.js";

const router = express.Router();

// 📄 Generate Question Paper
router.post("/generate-paper", generateQuestionPaper);

// 📚 Generate Study Plan
router.post("/generate-study-plan", generateStudyPlan);

// 🤖 AI Chatbot
router.post("/chat", chatWithAI);

export default router;
