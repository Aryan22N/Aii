const StudyTodo = require('../models/StudyTodo');

exports.addTodo = async (req, res) => {
    try {
        const { title, date } = req.body;

        if (!title || !date) {
            return res.status(400).json({ message: 'Title and date required' });
        }

        const todo = new StudyTodo({ title, date });
        await todo.save();

        res.json(todo);
    } catch (err) {
        res.status(500).json({ message: 'Add failed' });
    }
};

exports.getTodos = async (req, res) => {
    try {
        const { date } = req.query;
        const todos = await StudyTodo.find({ date });
        res.json(todos);
    } catch {
        res.status(500).json({ message: 'Fetch failed' });
    }
};

exports.toggleTodo = async (req, res) => {
    try {
        const todo = await StudyTodo.findById(req.params.id);
        todo.completed = !todo.completed;
        await todo.save();
        res.json(todo);
    } catch {
        res.status(500).json({ message: 'Update failed' });
    }
};

exports.deleteTodo = async (req, res) => {
    try {
        await StudyTodo.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch {
        res.status(500).json({ message: 'Delete failed' });
    }
};
