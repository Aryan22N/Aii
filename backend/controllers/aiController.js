import { GoogleGenerativeAI } from "@google/generative-ai";
import Syllabus from "../models/Syllabus.js";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

/* --------------------------------------------------
   1️⃣ Generate Question Paper
---------------------------------------------------*/
export const generateQuestionPaper = async (req, res) => {
    try {
        const { syllabusId, difficulty = "medium", totalMarks = 70 } = req.body;

        const syllabus = await Syllabus.findById(syllabusId);
        if (!syllabus) {
            return res.status(404).json({ message: "Syllabus not found" });
        }

        const prompt = `
You are an Indian college exam paper setter.

Syllabus:
Course: ${syllabus.courseName}
Units & Topics: ${syllabus.units.join(", ")}

Generate a ${totalMarks}-mark question paper with ${difficulty} difficulty.
Ensure:
- Balanced topic coverage
- Mix of short, medium, and long questions
- Proper numbering and marks distribution
- Exam-oriented Indian college format
`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        res.status(200).json({
            success: true,
            questionPaper: text
        });

    } catch (error) {
        console.error("Question Paper Error:", error);
        res.status(500).json({ message: "Failed to generate question paper" });
    }
};

/* --------------------------------------------------
   2️⃣ Generate Study Plan
---------------------------------------------------*/
export const generateStudyPlan = async (req, res) => {
    try {
        const { syllabusId, examDate, hoursPerDay } = req.body;

        const syllabus = await Syllabus.findById(syllabusId);
        if (!syllabus) {
            return res.status(404).json({ message: "Syllabus not found" });
        }

        const prompt = `
You are an AI study planner for Indian college students.

Syllabus:
Course: ${syllabus.courseName}
Units & Topics: ${syllabus.units.join(", ")}

Exam Date: ${examDate}
Daily Study Time: ${hoursPerDay} hours

Create a realistic day-wise study plan.
Ensure:
- Proper topic distribution
- Revision days
- Exam-focused preparation
- Simple, student-friendly format
`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        res.status(200).json({
            success: true,
            studyPlan: text
        });

    } catch (error) {
        console.error("Study Plan Error:", error);
        res.status(500).json({ message: "Failed to generate study plan" });
    }
};

/* --------------------------------------------------
   3️⃣ AI Chatbot
---------------------------------------------------*/
export const chatWithAI = async (req, res) => {
    try {
        const { message, syllabusId } = req.body;

        let syllabusText = "";
        if (syllabusId) {
            const syllabus = await Syllabus.findById(syllabusId);
            if (syllabus) {
                syllabusText = `
Course: ${syllabus.courseName}
Topics: ${syllabus.units.join(", ")}
`;
            }
        }

        const prompt = `
You are a smart AI study assistant for Indian college students.

${syllabusText}

Student question:
"${message}"

Answer clearly, simply, and exam-oriented.
`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        res.status(200).json({
            success: true,
            reply: text
        });

    } catch (error) {
        console.error("Chatbot Error:", error);
        res.status(500).json({ message: "AI assistant failed to respond" });
    }
};
