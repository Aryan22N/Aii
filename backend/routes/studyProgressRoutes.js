const express = require('express');
const router = express.Router();
const { updateProgress } = require('../controllers/studyProgressController');

router.post('/', updateProgress);

module.exports = router;
