const express = require('express');
const router = express.Router();
const { createStudyPlan } = require('../controllers/studyPlannerController');

router.post('/', createStudyPlan);

module.exports = router;
