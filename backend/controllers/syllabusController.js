const Syllabus = require('../models/Syllabus');

const uploadSyllabus = async (req, res) => {
    try {
        const { courseName, units } = req.body;

        if (!courseName || !units || !units.length) {
            return res.status(400).json({ message: 'Course name and units are required' });
        }

        // Validate each unit
        for (let u of units) {
            if (!u.unitName || !u.topics || !u.topics.length) {
                return res.status(400).json({ message: 'Each unit must have a name and at least one topic' });
            }
        }

        const syllabus = new Syllabus({ courseName, units });
        await syllabus.save();

        res.status(201).json({ success: true, message: 'Syllabus uploaded', syllabus });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { uploadSyllabus };
