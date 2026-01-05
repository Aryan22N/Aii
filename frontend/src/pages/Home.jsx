import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-12">

            {/* HERO SECTION */}
            <section className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
                    Smart Exam Paper Generator & AI Study Copilot
                </h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    An AI-powered platform using <span className="font-semibold">Gemini AI</span> to generate
                    balanced exam question papers and personalized study plans for Indian college students.
                </p>

                <div className="mt-8 flex justify-center gap-4 flex-wrap">
                    <Link
                        to="/syllabus-upload"
                        className="bg-linear-to-r from-purple-600 to-purple-600 text-white px-6 py-3 rounded-lg shadow hover:opacity-85 transition"
                    >
                        Upload Syllabus
                    </Link>

                    <Link
                        to="/study-planner"
                        className="bg-linear-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg shadow hover:opacity-90 transition"
                    >
                        Create Study Plan
                    </Link>
                </div>
            </section>

            {/* FEATURES SECTION */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">

                <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                    <h3 className="text-xl font-semibold mb-2">📄 Smart Question Papers</h3>
                    <p className="text-gray-600">
                        Generate balanced exam papers using syllabus analysis and AI-based difficulty control.
                    </p>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                    <h3 className="text-xl font-semibold mb-2">📚 Personalized Study Plans</h3>
                    <p className="text-gray-600">
                        Get daily study schedules based on your syllabus, exam date, and available time.
                    </p>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                    <h3 className="text-xl font-semibold mb-2">🤖 AI Study Assistant</h3>
                    <p className="text-gray-600">
                        Chat with an AI assistant that understands your syllabus and guides your preparation.
                    </p>
                </div>

            </section>

            {/* HOW IT WORKS */}
            <section className="bg-white shadow-lg rounded-lg p-8 mb-16">
                <h2 className="text-2xl font-bold mb-6 text-center">How It Works</h2>

                <ol className="list-decimal list-inside space-y-3 text-gray-700 max-w-3xl mx-auto">
                    <li>Upload your college syllabus</li>
                    <li>Let Gemini AI analyze topics and difficulty</li>
                    <li>Generate question papers or study plans instantly</li>
                    <li>Use the AI assistant for doubt-solving and revision</li>
                </ol>
            </section>

            {/* CTA SECTION */}
            <section className="text-center">
                <h2 className="text-2xl font-bold mb-4">
                    Start Your Smart Exam Preparation Today 🚀
                </h2>
                <Link
                    to="/syllabus-upload"
                    className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg shadow hover:bg-purple-800 transition"
                >
                    Get Started
                </Link>
            </section>

        </div>
    );
};

export default Home;
