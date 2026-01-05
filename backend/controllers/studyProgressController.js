const StudyPlan = require("../models/StudyPlan");

const updateProgress = async (req, res) => {
  try {
    const { planId, day, task } = req.body;

    const studyPlan = await StudyPlan.findById(planId);
    if (!studyPlan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    const dayPlan = studyPlan.plan.find((d) => d.day === day);
    if (!dayPlan) {
      return res.status(404).json({ message: "Day not found" });
    }

    if (!dayPlan.completedTasks.includes(task)) {
      dayPlan.completedTasks.push(task);
    }

    await studyPlan.save();
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Progress update failed" });
  }
};

module.exports = { updateProgress };
