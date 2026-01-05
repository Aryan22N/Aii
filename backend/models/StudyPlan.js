const mongoose = require('mongoose');

const studyPlanSchema = new mongoose.Schema({
    syllabusId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Syllabus',
        required: true
    },
    examDate: String,
    hoursPerDay: Number,

    plan: [
        {
            day: String,
            tasks: [String],
            completedTasks: {
                type: [String],
                default: []
            }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('StudyPlan', studyPlanSchema);
