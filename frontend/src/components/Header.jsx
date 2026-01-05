import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-linear-to-r from-purple-600 to-purple-800 text-white p-4 shadow-md flex justify-between items-center">
            <h1 className="text-2xl font-bold">Smart Exam AI</h1>
            <nav className="space-x-4">
                <Link to="/" className="hover:text-gray-400">Home</Link>
                <Link to="/syllabus-upload" className="hover:text-gray-400">Upload Syllabus</Link>
                <Link to="/question-paper" className="hover:text-gray-400">Question Paper</Link>
                <Link to="/study-planner" className="hover:text-gray-400">Study Planner</Link>
            </nav>
        </header>
    );
};

export default Header;
