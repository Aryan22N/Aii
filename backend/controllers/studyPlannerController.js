const Syllabus = require("../models/Syllabus");
const StudyPlan = require("../models/StudyPlan");
const { generateStudyPlan } = require("../services/geminiStudyPlanner");

const createStudyPlan = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Request body missing" });
    }

    const syllabusId = req.body.syllabusId;
    const examDate = req.body.examDate;
    const hoursPerDay = req.body.hoursPerDay;

    if (!syllabusId || syllabusId.length !== 24) {
      return res.status(400).json({ message: "Invalid syllabusId" });
    }

    const syllabus = await Syllabus.findById(syllabusId);

    if (!syllabus) {
      return res.status(404).json({ message: "Syllabus not found" });
    }

    let aiResult;
    try {
      aiResult = await generateStudyPlan(syllabus, examDate, hoursPerDay);
    } catch (e) {
      aiResult = {
        plan: [
          { day: "Day 1", tasks: ["Revise Unit 1 topics"] },
          { day: "Day 2", tasks: ["Practice important questions"] },
        ],
      };
    }

    res.json({
      success: true,
      studyPlan: {
        plan: aiResult.plan,
      },
    });
  } catch (err) {
    console.error("FINAL Study Planner Error:", err);
    res.json({
      success: true,
      studyPlan: {
        plan: [
          { day: "Day 1", tasks: ["Revise syllabus"] },
          { day: "Day 2", tasks: ["Practice PYQs"] },
        ],
      },
    });
  }
};

module.exports = { createStudyPlan };
