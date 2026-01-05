const Syllabus = require("../models/Syllabus");
const { generateQuestionPaper } = require("../services/geminiService");
const generatePDF = require("../utils/pdfGenerator");

const createQuestionPaper = async (req, res) => {
  try {
    const { syllabusId } = req.body;

    if (!syllabusId) {
      return res.status(400).json({ message: "Syllabus ID required" });
    }

    const syllabus = await Syllabus.findById(syllabusId);
    if (!syllabus) {
      return res.status(404).json({ message: "Syllabus not found" });
    }

    const questionPaper = await generateQuestionPaper(syllabus);

    res.json({ success: true, questionPaper });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to generate question paper" });
  }
};

const downloadQuestionPaperPDF = async (req, res) => {
  try {
    const { syllabusId } = req.params;

    const syllabus = await Syllabus.findById(syllabusId);
    if (!syllabus) {
      return res.status(404).json({ message: "Syllabus not found" });
    }

    const questionPaper = await generateQuestionPaper(syllabus);

    generatePDF(questionPaper, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to generate PDF" });
  }
};

module.exports = { createQuestionPaper, downloadQuestionPaperPDF };
