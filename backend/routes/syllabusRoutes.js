const express = require('express');
const router = express.Router();
const { uploadSyllabus } = require('../controllers/syllabusController');
const Syllabus = require('../models/Syllabus');

// Upload syllabus
router.post('/', uploadSyllabus);

// Get all syllabi for dropdown
router.get('/', async (req, res) => {
    try {
        const syllabi = await Syllabus.find();
        res.json({ success: true, syllabi }); // return array
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to fetch syllabi' });
    }
});

module.exports = router;
