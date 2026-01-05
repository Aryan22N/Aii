const mongoose = require('mongoose');

const unitSchema = new mongoose.Schema({
    unitName: { type: String, required: true },
    topics: [{ type: String, required: true }]
});

const syllabusSchema = new mongoose.Schema({
    courseName: { type: String, required: true },
    units: [unitSchema]
}, { timestamps: true });

module.exports = mongoose.model('Syllabus', syllabusSchema);
