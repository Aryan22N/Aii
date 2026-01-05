import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import SyllabusUpload from './pages/SyllabusUpload';
import QuestionPaper from './pages/QuestionPaper';
import StudyPlanner from './pages/StudyPlanner';
import ChatBot from './components/ChatBot';

function App() {
    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-1 bg-gray-50 p-4">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/syllabus-upload" element={<SyllabusUpload />} />
                        <Route path="/question-paper" element={<QuestionPaper />} />
                        <Route path="/study-planner" element={<StudyPlanner />} />
                    </Routes>
                     <ChatBot />
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
