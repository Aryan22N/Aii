const express = require('express');
const router = express.Router();
const controller = require('../controllers/studyTodoController');

router.post('/', controller.addTodo);
router.get('/', controller.getTodos);
router.patch('/:id', controller.toggleTodo);
router.delete('/:id', controller.deleteTodo);

module.exports = router;
