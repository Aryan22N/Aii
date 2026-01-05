const express = require("express");
const router = express.Router();
const {
  createQuestionPaper,
  downloadQuestionPaperPDF,
} = require("../controllers/questionPaperController");

router.post("/", createQuestionPaper);
router.get("/download/:syllabusId", downloadQuestionPaperPDF);

module.exports = router;
