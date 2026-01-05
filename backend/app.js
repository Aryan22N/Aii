// // backend/app.js
// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");

// const chatRoutes = require("./routes/chatRoutes");

// const syllabusRoutes = require("./routes/syllabusRoutes");
// const questionPaperRoutes = require("./routes/questionPaperRoutes");

// const app = express();

// // Middleware
// app.use(express.json());        // ✅ MUST be here
// app.use(express.urlencoded({ extended: true }));
// app.use(cors());
// app.use(bodyParser.json());

// // Routes
// app.use("/api/syllabus", syllabusRoutes);
// app.use("/api/question-paper", questionPaperRoutes);
// app.use('/api/study-plan', require('./routes/studyPlannerRoutes'));
// app.use('/api/study-todos', require('./routes/studyTodoRoutes'));
// app.use('/api/chatbot', require('./routes/chatbotRoutes'));
// app.use('/api/study-progress', require('./routes/studyProgressRoutes'));
// app.use("/api/chat", chatRoutes);
// app.get("/", (req, res) => {
//   res.send("Smart Exam AI Backend Running");
// });

// module.exports = app;

// app.get("/api/test", (req, res) => {
//   res.json({ message: "Backend is working perfectly 🚀" });
// });
// backend/app.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const chatRoutes = require("./routes/chatRoutes");
const syllabusRoutes = require("./routes/syllabusRoutes");
const questionPaperRoutes = require("./routes/questionPaperRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use("/api/syllabus", syllabusRoutes);
app.use("/api/question-paper", questionPaperRoutes);
app.use("/api/study-plan", require("./routes/studyPlannerRoutes"));
app.use("/api/study-todos", require("./routes/studyTodoRoutes"));
app.use("/api/chatbot", require("./routes/chatbotRoutes"));
app.use("/api/study-progress", require("./routes/studyProgressRoutes"));
app.use("/api/chat", chatRoutes);

// Test routes
app.get("/", (req, res) => {
  res.send("Smart Exam AI Backend Running");
});

app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working perfectly 🚀" });
});

// ✅ EXPORT AT END
module.exports = app;
